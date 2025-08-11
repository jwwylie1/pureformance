import express, { application } from "express";
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js";
import { viewAnalytics } from "../controllers/analytics.controller.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, viewAnalytics)

export default router;