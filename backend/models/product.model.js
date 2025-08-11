import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "Product name is required"]
	},
	description: {
		type: String,
		required: [true, "Product description is required"]
	},
	price: {
		type: Number,
		required: [true, "Product price is required"],
		min: [0, "Price cannot be negative"]
	},
	image: {
		type: String,
		required: [true, "Product image URL is required"]
	},
	category: {
		type: String,
		required: [true, "Product category is required"]
	},
	isFeatured: {
		type: Boolean,
		default: false
	},
	stock: {
		S: { type: Boolean, default: true },
		M: { type: Boolean, default: true },
		L: { type: Boolean, default: true },
		XL: { type: Boolean, default: true },
		XXL: { type: Boolean, default: true }
	}

}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

export default Product;