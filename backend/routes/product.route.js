import express from "express";
import { 
  getAllProducts, 
  getFeaturedProducts, 
  getReccomendedProducts, 
  getProductsByCategory,
  createProduct, 
  toggleFeaturedProduct,
  deleteProduct 
} from "../controllers/product.controller.js"
import { protectRoute, adminRoute } from "../middleware/auth.middleware.js"

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.get("/featured", getFeaturedProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/reccomendatations", protectRoute, getReccomendedProducts);
router.post("/", protectRoute, adminRoute, createProduct);
router.patch("/:id", protectRoute, adminRoute, toggleFeaturedProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);


export default router;