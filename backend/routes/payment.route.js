import express from "express";
import { protectRoute } from "../middleware/auth.middleware.js";
import { checkoutSuccess, createCheckoutSession, createGuestCheckoutSession } from "../controllers/payment.controller.js";

const router = express.Router();

router.post("/create-checkout-session", protectRoute, createCheckoutSession);
router.post("/create-guest-checkout-session", createGuestCheckoutSession)
router.post("/checkout-success", checkoutSuccess);

export default router;
