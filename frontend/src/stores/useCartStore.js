/* import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create((set, get) => ({
	cart: [],
	coupon: null,
	total: 0,
	subtotal: 0,
	isCouponApplied: false,

	getMyCoupon: async () => {
		try {
			const response = await axios.get("/coupons");
			set({ coupon: response.data });
		} catch (error) {
			console.error("Error fetching coupon:", error);
		}
	},
	applyCoupon: async (code) => {
		try {
			const response = await axios.post("/coupons/validate", { code });
			set({ coupon: response.data, isCouponApplied: true });
			get().calculateTotals();
			toast.success("Coupon applied successfully");
		} catch (error) {
			toast.error(error.response?.data?.message || "Failed to apply coupon");
		}
	},
	removeCoupon: () => {
		set({ coupon: null, isCouponApplied: false });
		get().calculateTotals();
		toast.success("Coupon removed");
	},

	getCartItems: async () => {
		try {
			const res = await axios.get("/cart");
			set({ cart: res.data });
			get().calculateTotals();
		} catch (error) {
			set({ cart: [] });
			toast.error(error.response.data.message || "An error occurred");
		}
	},
	clearCart: async () => {
		set({ cart: [], coupon: null, total: 0, subtotal: 0 });
	},
	/* addToCart: async (product) => {
		try {
			await axios.post("/cart", { productId: product._id });
			toast.success("Product added to cart");

			set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				const newCart = existingItem
					? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
						)
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});
			get().calculateTotals();
		} catch (error) {
			toast.error(error.response.data.message || "An error occurred");
		}
	}, 
	addToCart: async (product) => {
		try {
			// Try to add to backend (works for logged-in users)
			const response = await axios.post("/cart", { productId: product._id });

			// Update local state
			set((prevState) => {
				const existingItem = prevState.cart.find((item) => item._id === product._id);
				const newCart = existingItem
					? prevState.cart.map((item) =>
						item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
					)
					: [...prevState.cart, { ...product, quantity: 1 }];
				return { cart: newCart };
			});

			get().calculateTotals();
			toast.success("Product added to cart");

		} catch (error) {
			// If user is not logged in (401/403), handle as guest cart
			if (error.response?.status === 401 || error.response?.status === 403) {
				// Update local state only (guest mode)
				set((prevState) => {
					const existingItem = prevState.cart.find((item) => item._id === product._id);
					const newCart = existingItem
						? prevState.cart.map((item) =>
							item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
						)
						: [...prevState.cart, { ...product, quantity: 1 }];
					return { cart: newCart };
				});

				get().calculateTotals();
				toast.success("Product added to cart");
			} else {
				console.error("Error adding to cart:", error);
				toast.error(error.response?.data?.message || "Failed to add product to cart");
			}
		}
	},
	removeFromCart: async (productId) => {
		await axios.delete(`/cart`, { data: { productId } });
		set((prevState) => ({ cart: prevState.cart.filter((item) => item._id !== productId) }));
		get().calculateTotals();
	},
	updateQuantity: async (productId, quantity) => {
		if (quantity === 0) {
			get().removeFromCart(productId);
			return;
		}

		await axios.put(`/cart/${productId}`, { quantity });
		set((prevState) => ({
			cart: prevState.cart.map((item) => (item._id === productId ? { ...item, quantity } : item)),
		}));
		get().calculateTotals();
	},
	calculateTotals: () => {
		const { cart, coupon } = get();
		const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
		let total = subtotal;

		if (coupon) {
			const discount = subtotal * (coupon.discountPercentage / 100);
			total = subtotal - discount;
		}

		set({ subtotal, total });
	},
}));
 */


import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useCartStore = create(
	persist(
		(set, get) => ({
			cart: [],
			coupon: null,
			total: 0,
			subtotal: 0,
			isCouponApplied: false,
			isGuest: true,

			// Initialize cart based on user login status
			initializeCart: async (user) => {
				if (user) {
					console.log("USER");
					// Get guest cart BEFORE changing isGuest status
					const guestCart = get().cart;
					const wasGuest = get().isGuest; // Store the previous guest status

					set({ isGuest: false });

					// If there are items in guest cart, merge them
					if (guestCart.length > 0 && wasGuest) {
						await get().mergeGuestCart(guestCart);
					} else {
						// Load user's cart from server
						await get().getCartItems();
					}
				} else {
					// User is not logged in - use guest mode
					console.log("NO USER")
					set({ isGuest: true });
					get().calculateTotals(); // Ensure totals are calculated for guest cart
				}
			},

			// Merge guest cart with user cart when they log in
			mergeGuestCart: async (guestCartItems) => {
				try {
					await axios.post("/cart/merge", { guestCartItems });
					await get().getCartItems(); // Refresh cart from server
					toast.success("Cart items merged successfully");
				} catch (error) {
					console.error("Error merging cart:", error);
					// Fallback: just load user's existing cart
					await get().getCartItems();
				}
			},

			getMyCoupon: async () => {
				if (get().isGuest) return; // Guests can't have personal coupons

				try {
					const response = await axios.get("/coupons");
					set({ coupon: response.data });
				} catch (error) {
					console.error("Error fetching coupon:", error);
				}
			},

			applyCoupon: async (code) => {
				try {
					const response = await axios.post("/coupons/validate", { code });
					set({ coupon: response.data, isCouponApplied: true });
					get().calculateTotals();
					toast.success("Coupon applied successfully");
				} catch (error) {
					toast.error(error.response?.data?.message || "Failed to apply coupon");
				}
			},

			removeCoupon: () => {
				set({ coupon: null, isCouponApplied: false });
				get().calculateTotals();
				toast.success("Coupon removed");
			},

			getCartItems: async () => {
				if (get().isGuest) {
					// For guests, cart is already in local state
					get().calculateTotals();
					return;
				}

				try {
					const res = await axios.get("/cart");
					set({ cart: res.data });
					console.log("Cart: ", res.data)
					get().calculateTotals();
				} catch (error) {
					set({ cart: [] });
					toast.error(error.response?.data?.message || "An error occurred");
				}
			},

			clearCart: async () => {
				if (!get().isGuest) {
					try {
						await axios.delete("/cart/clear");
					} catch (error) {
						console.error("Error clearing cart on server:", error);
					}
				}
				set({ cart: [], coupon: null, total: 0, subtotal: 0 });
			},

			addToCart: async (product) => {
				const { isGuest } = get();

				if (isGuest) {
					// Handle as guest - local storage only
					set((prevState) => {
						const existingItem = prevState.cart.find((item) => item._id === product._id);
						const newCart = existingItem
							? prevState.cart.map((item) =>
								item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
							)
							: [...prevState.cart, { ...product, quantity: 1 }];
						return { cart: newCart };
					});

					get().calculateTotals();
					toast.success("Product added to cart");
				} else {
					// Handle as logged-in user
					try {
						await axios.post("/cart", { productId: product._id });

						// Update local state
						set((prevState) => {
							const existingItem = prevState.cart.find((item) => item._id === product._id);
							const newCart = existingItem
								? prevState.cart.map((item) =>
									item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
								)
								: [...prevState.cart, { ...product, quantity: 1 }];
							return { cart: newCart };
						});

						get().calculateTotals();
						toast.success("Product added to cart");
					} catch (error) {
						console.error("Error adding to cart:", error);
						toast.error(error.response?.data?.message || "Failed to add product to cart");
					}
				}
			},

			removeFromCart: async (productId) => {
				const { isGuest } = get();

				if (!isGuest) {
					try {
						await axios.delete(`/cart`, { data: { productId } });
					} catch (error) {
						console.error("Error removing from cart:", error);
						toast.error("Failed to remove item from cart");
						return;
					}
				}

				set((prevState) => ({
					cart: prevState.cart.filter((item) => item._id !== productId)
				}));
				get().calculateTotals();
			},

			updateQuantity: async (productId, quantity) => {
				if (quantity === 0) {
					get().removeFromCart(productId);
					return;
				}

				const { isGuest } = get();

				if (!isGuest) {
					try {
						await axios.put(`/cart/${productId}`, { quantity });
					} catch (error) {
						console.error("Error updating quantity:", error);
						toast.error("Failed to update quantity");
						return;
					}
				}

				set((prevState) => ({
					cart: prevState.cart.map((item) =>
						item._id === productId ? { ...item, quantity } : item
					),
				}));
				get().calculateTotals();
			},

			calculateTotals: () => {
				const { cart, coupon } = get();
				const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
				let total = subtotal;

				if (coupon) {
					const discount = subtotal * (coupon.discountPercentage / 100);
					total = subtotal - discount;
				}

				set({ subtotal, total });
			},
		}),
		{
			name: "cart-storage", // localStorage key
			partialize: (state) => ({
				cart: state.cart,
				isGuest: state.isGuest,
				coupon: state.coupon,
				isCouponApplied: state.isCouponApplied,
			}), // Only persist these fields
		}
	)
);