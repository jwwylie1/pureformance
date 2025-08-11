import stripe from '../lib/stripe.js';
import dotenv from 'dotenv';
import Coupon from '../models/coupon.model.js';
import Order from '../models/order.model.js';

dotenv.config();

export const createCheckoutSession = async (req, res) => {
  try {
    const { products, couponCode } = req.body;

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ error: "Products array is required" });
    }

    // Calculate total amount for checkout
    let totalAmount = 0;
    
    const lineItems = products.map(product => {
      const amount = Math.round(product.price * 100); // Convert to cents
      totalAmount += amount * product.quantity;

      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: product.name,
            images: [product.image],
          },
          unit_amount: amount,
        }
      }
    });

    let coupon = null;
    if (couponCode) {
      coupon = await Coupon.findOne({ code: couponCode, isActive: true });

      if (coupon) {
        const discountAmount = Math.round(totalAmount * (coupon.discountPercentage / 100));
        totalAmount -= discountAmount;
      }
    }

    // Create a checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.CLIENT_URL}/purchase-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/purchase-cancel`,
      discounts: coupon ? [
        { 
          coupon: await createStripeCoupon(coupon.discountPercentage)
        }
      ] : [],
      metadata: {
        userId: req.user._id.toString(),
        couponCode: couponCode || "",
        products: JSON.stringify(
          products.map((p) => ({
            id: p.id,
            quantity: p.quantity,
            price: p.price,
          }))
        )
      },
    });

    // Give coupon is purchase over $200
    if (totalAmount >= 200 * 100) {
      await createNewCoupon(req.user._id);
    }

    // Return session ID and total amount in dollars
    res.status(200).json({ id:session.id, totalAmount: totalAmount / 100 });
  } catch (error) {
    console.error("Error creating checkout session:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

export const checkoutSuccess = async (req, res) => {
  try {
    const { sessionId } = req.body;
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (session.payment_status === 'paid') { // payment was successful
      // remove coupon if it was used
      if (session.metadata.couponCode) {
        await Coupon.findOneAndUpdate({ 
          code: session.metadata.couponCode, userId: session.metadata.userId 
        }, {
          isActive: false
        });
      }

      // create a new order
      const products = JSON.parse(session.metadata.products || '[]');
      const newOrder = new Order({
        user: session.metadata.userId,
        products: products.map(p => ({
          product: p.id,
          quantity: p.quantity,
          price: p.price,
          size: p.size || null
        })),
        totalAmount: session.amount_total / 100, // convert cents to dollars
        stripeSessionId: sessionId,
      })

      await newOrder.save();
    }
  } catch (error) {
    console.error("Error processing checkout success:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}

async function createStripeCoupon(discountPercentage) {
  try {
    const coupon = await stripe.coupons.create({
      percent_off: discountPercentage,
      duration: 'once',
    });
    return coupon.id;
  } catch (error) {
    console.error("Error creating Stripe coupon:", error);
    throw new Error("Failed to create Stripe coupon");
  }
}

async function createNewCoupon(userId) {
  const newCoupon = new Coupon({
    code: "GIFT" + Math.random().toString(36).substring(2, 8).toUpperCase(),
    discountPercentage: 10, // Example discount percentage
    expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
    userId: userId,
  })

  await newCoupon.save();

  return newCoupon;
}