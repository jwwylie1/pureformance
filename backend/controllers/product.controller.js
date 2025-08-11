import { redis } from "../lib/redis.js";
import cloudinary from "../lib/cloudinary.js";
import Product from "../models/product.model.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json({ products });
  } catch (error) {
    console.log("Get all products error:", error.message);
    res.status(500).json({ message: "Failed to retrieve products", error: error.message });
  }
}

export const getFeaturedProducts = async (req, res) => {
  try {
    // check Redis cache first
    let featuredProducts = await redis.get("featuredProducts");
    if (featuredProducts) {
      return res.json(JSON.parse(featuredProducts));
    }

    // .lean() returns plain JavaScript objects instead of Mongoose documents
    // this is more efficient for read-only operations
    featuredProducts = await Product.find({ isFeatured: true }).lean();

    if (featuredProducts.length === 0) {
      return res.status(404).json({ message: "No featured products found" });
    }

    // store in Redis cache for 1 hour quick access
    await redis.set("featuredProducts", JSON.stringify(featuredProducts), "EX", 3600);

    res.json(featuredProducts);

  } catch (error) {
    console.log("Get featured products error:", error.message);
    res.status(500).json({ message: "Failed to retrieve featured products", error: error.message });
  }
}

export const getReccomendedProducts = async (req, res) => {
  try {
    const products = await Product.aggregate([
      { $sample: {size:3}},
      { $project: { _id: 1, name: 1, description: 1, price: 1, image: 1, category: 1 } }
    ])

    res.json(products);

  } catch (error) {
    console.log("Get recommended products error:", error.message);
    res.status(500).json({ message: "Failed to retrieve recommended products", error: error.message });
  }
}

export const getProductsByCategory = async (req, res) => {
  try {
    const { category } = req.params;

    const products = await Product.find({ category }).lean();
    res.json({products});

  } catch (error) {
    console.log("Get products by category error:", error.message);
    res.status(500).json({ message: "Failed to retrieve products by category", error: error.message });
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category } = req.body;

    let cloudinaryResponse = null;
    if (image) {
      cloudinaryResponse = await cloudinary.uploader.upload(image, {folder: "products"});
    }

    const newProduct = await Product.create({
      name,
      description,
      price,
      image: cloudinaryResponse?.secure_url ? cloudinaryResponse.secure_url : null,
      category
    });

    res.status(201).json(newProduct);

  } catch (error) {
    console.log("Create product error:", error.message);
    res.status(500).json({ message: "Failed to create product", error: error.message });
  }
}

export const toggleFeaturedProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      product.isFeatured = !product.isFeatured;
      const updatedProduct = await product.save();

      // clear cache after toggling featured status
      await updateFeaturedProductsCache();
      res.json({ message: `Product ${product.isFeatured ? "featured" : "unfeatured"} successfully`, product });
    } else {
      return res.status(404).json({ message: "Product not found" });
    }
  } catch (error) {
    console.log("Toggle featured product error:", error.message);
    res.status(500).json({ message: "Failed to toggle featured product", error: error.message });
  }
}

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

		if (!product) {
			return res.status(404).json({ message: "Product not found" });
		}

		if (product.image) {
			const publicId = product.image.split("/").pop().split(".")[0];
			try {
				await cloudinary.uploader.destroy(`products/${publicId}`);
				console.log("deleted image from cloduinary");
			} catch (error) {
				console.log("error deleting image from cloduinary", error);
			}
		}

		await Product.findByIdAndDelete(req.params.id);

		res.json({ message: "Product deleted successfully" });

  } catch (error) {
    console.log("Delete product error:", error.message);
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
}

async function updateFeaturedProductsCache() {
  try {
    const featuredProducts = await Product.find({ isFeatured: true }).lean();
    await redis.set("featuredProducts", JSON.stringify(featuredProducts), "EX", 3600);
  } catch (error) {
    console.log("Update featured products cache error:", error.message);
  }
}