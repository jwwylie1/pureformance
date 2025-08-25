import Coupon from "../models/coupon.model.js";
import Order from "../models/order.model.js";
import Product from "../models/product.model.js";
import stockManager from "../utils/stockManager.js"
import { stripe } from "../lib/stripe.js";

export const createCheckoutSession = async (req, res) => {
	try {
		const { products, couponCode } = req.body;

		console.log("p1: ", products)


		if (!Array.isArray(products) || products.length === 0) {
			return res.status(400).json({ error: "Invalid or empty products array" });
		}

		let totalAmount = 0;

		const lineItems = products.map((product) => {
			const amount = Math.round(product.price * 100); // stripe wants u to send in the format of cents
			totalAmount += amount * product.quantity;

			return {
				price_data: {
					currency: "usd",
					product_data: {
						name: product.name,
						images: [product.image],
					},
					unit_amount: amount,
				},
				quantity: product.quantity || 1,
			};
		});

		let coupon = null;
		if (couponCode) {
			coupon = await Coupon.findOne({ code: couponCode, userId: req.user._id, isActive: true });
			if (coupon) {
				totalAmount -= Math.round((totalAmount * coupon.discountPercentage) / 100);
			}
		}

		const session = await stripe.checkout.sessions.create({
			payment_method_types: ["card"],
			line_items: lineItems,
			mode: "payment",
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			discounts: coupon
				? [
					{
						coupon: await createStripeCoupon(coupon.discountPercentage),
					},
				]
				: [],
			metadata: {
				userId: req.user._id.toString(),
				couponCode: couponCode || "",
				products: JSON.stringify(
					products.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			},
		});

		console.log("p2: ", session.metadata.products)

		if (totalAmount >= 20000) {
			await createNewCoupon(req.user._id);
		}
		res.status(200).json({ id: session.id, totalAmount: totalAmount / 100 });
	} catch (error) {
		console.error("Error processing checkout:", error);
		res.status(500).json({ message: "Error processing checkout", error: error.message });
	}
};

export const createGuestCheckoutSession = async (req, res) => {
	try {
		const { cartItems, couponCode, guestEmail } = req.body;

		// Validate cart items and get current prices from database
		const productIds = cartItems.map(item => item._id);
		const products = await Product.find({ _id: { $in: productIds } });

		if (products.length !== productIds.length) {
			return res.status(400).json({ message: "Some products not found" });
		}

		// Build line items from guest cart
		const lineItems = cartItems.map(cartItem => {
			const product = products.find(p => p._id.toString() === cartItem._id);
			if (!product) {
				throw new Error(`Product ${cartItem._id} not found`);
			}

			return {
				price_data: {
					currency: 'usd',
					product_data: {
						name: product.name,
						description: cartItem.flavor ? `Flavor: ${cartItem.flavor}` : '',
					},
					unit_amount: Math.round(product.price * 100),
				},
				quantity: cartItem.quantity,
			};
		});

		// Handle coupon if provided
		let discounts = [];
		if (couponCode) {
			const coupon = await Coupon.findOne({
				code: couponCode,
				isActive: true,
				expirationDate: { $gt: new Date() }
			});

			if (coupon) {
				// Create Stripe coupon or use existing
				const stripeCoupon = await stripe.coupons.create({
					percent_off: coupon.discountPercentage,
					duration: 'once',
				});
				discounts = [{ coupon: stripeCoupon.id }];
			}
		}

		const sessionConfig = {
			payment_method_types: ['card'],
			line_items: lineItems,
			mode: 'payment',
			success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
			cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
			metadata: {
				guestEmail: 'guest@email.com',
				couponCode: couponCode || "",
				products: JSON.stringify(
					cartItems.map((p) => ({
						id: p._id,
						quantity: p.quantity,
						price: p.price,
					}))
				),
			}
		};

		if (discounts.length > 0) {
			sessionConfig.discounts = discounts;
		}

		if (guestEmail) {
			sessionConfig.customer_email = guestEmail;
		}

		const session = await stripe.checkout.sessions.create(sessionConfig);

		res.json({ id: session.id, url: session.url });
	} catch (error) {
		console.error("Error creating guest checkout session:", error);
		res.status(500).json({
			message: "Server error",
			error: error.message
		});
	}
};

import mongoose from 'mongoose';
import StockManager from '../utils/stockManager.js'; // Adjust path as needed

export const checkoutSuccess = async (req, res) => {
	const mongoSession = await mongoose.startSession();
	
	try {
		await mongoSession.withTransaction(async () => {
			const { sessionId } = req.body;
			const session = await stripe.checkout.sessions.retrieve(sessionId);

			if (session.payment_status === "paid") {
				// Handle coupon deactivation
				if (session.metadata.couponCode) {
					await Coupon.findOneAndUpdate(
						{
							code: session.metadata.couponCode,
							userId: session.metadata.userId,
						},
						{
							isActive: false,
						},
						{ session: mongoSession }
					);
				}

				// Parse products and prepare for order creation
				const products = JSON.parse(session.metadata.products);
				console.log("JSON products: ", products);

				// Create order data
				const newOrder = new Order({
					user: session.metadata.userId,
					guestEmail: session.metadata.guestEmail,
					products: products.map((product) => ({
						product: product.id,
						quantity: product.quantity,
						price: product.price,
					})),
					totalAmount: session.amount_total / 100, // convert from cents to dollars,
					stripeSessionId: sessionId,
				});

				// Save the order
				const savedOrder = await newOrder.save({ session: mongoSession });

				// Prepare purchases array for stock reduction
				const purchases = products.map(product => ({
					productId: product.id, // This should match your Product._id
					quantity: product.quantity
				}));

				// Reduce stock using StockManager
				await StockManager.reduceStock(purchases, mongoSession);

				// Update order to mark stock as reduced
				await Order.findByIdAndUpdate(
					savedOrder._id,
					{ stockReduced: true },
					{ session: mongoSession }
				);

				res.status(200).json({
					success: true,
					message: "Payment successful, order created, stock updated, and coupon deactivated if used.",
					orderId: savedOrder._id,
				});
			} else {
				throw new Error("Payment not completed");
			}
		});

	} catch (error) {
		console.error("Error processing successful checkout:", error);
		
		// Handle specific stock-related errors
		if (error.message.includes('Insufficient stock')) {
			return res.status(400).json({ 
				success: false,
				message: "Some items are out of stock. Please try again.", 
				error: error.message 
			});
		}

		res.status(500).json({ 
			success: false,
			message: "Error processing successful checkout", 
			error: error.message 
		});
	} finally {
		await mongoSession.endSession();
	}
};

async function createStripeCoupon(discountPercentage) {
	const coupon = await stripe.coupons.create({
		percent_off: discountPercentage,
		duration: "once",
	});

	return coupon.id;
}

async function createNewCoupon(userId) {
	await Coupon.findOneAndDelete({ userId });

	const newCoupon = new Coupon({
		code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
		discountPercentage: 10,
		expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
		userId: userId,
	});

	await newCoupon.save();

	return newCoupon;
}
