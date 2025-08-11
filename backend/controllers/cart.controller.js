import Product from "../models/product.model.js";

export const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user; // user is set by protectRoute middleware

    const existingItem = user.cartItems.find(item => item.id === productId);
    if (existingItem) {
      // If item already exists in cart, increment quantity
      existingItem.quantity += 1;
    } else {
      // If item does not exist, add it to the cart
      user.cartItems.push(productId);
    }

    await user.save(); // Save the updated cart to the database
    res.json(user.cartItems);

  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

// does not clear cart, removes all of one item from the cart
// regardless of quantity
export const removeAllFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user; // user is set by protectRoute middleware

    if (!productId) {
      user.cartItems = [];
    } else {
      user.cartItems = user.cartItems.filter(item => item.id !== productId);
    }

    await user.save(); // Save the updated cart to the database
    res.json(user.cartItems);

  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const updateQuantity = async (req, res) => {
  try {
    const { quantity } = req.body;
    const { id: productId } = req.params;
    const user = req.user; // user is set by protectRoute middleware

    const existingItem = user.cartItems.find(item => item.id === productId);
    if (existingItem) {
      if (quantity === 0) {
        user.cartItems = user.cartItems.filter(item => item.id !== productId);
        await user.save(); // Save the updated cart to the database
        return res.json(user.cartItems);
      } else {
        existingItem.quantity = quantity; // Update the quantity if it exists
        await user.save(); // Save the updated cart to the database
        return res.json(user.cartItems);
      }
    } else {
      return res.status(404).json({ message: "Item not found in cart" });
    }
  } catch (error) {
    console.error("Error updating quantity:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export const getCartItems = async (req, res) => {
  try {
    const products = await Product.find({_id:{$in:req.user.cartItems}});
    const cartItems = products.map(product => {
      const item = req.user.cartItems.find(cartItem => cartItem.id === product.id);
      return {
        ...product.toJSON(),
        quantity: item.quantity
      };
    });

    res.json(cartItems);
  } catch (error) {
    console.error("Error getting cart items:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}