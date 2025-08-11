import express from 'express';
import { 
  addToCart, 
  removeAllFromCart,
  updateQuantity,
  getCartItems } from '../controllers/cart.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post("/", protectRoute, addToCart);
router.delete("/", protectRoute, removeAllFromCart);
router.put("/:id", protectRoute, updateQuantity);
router.get("/", protectRoute, getCartItems);

export default router;