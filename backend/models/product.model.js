import mongoose from "mongoose";

/*
name						str
description			str
price						num
image						str
category				str
weblink					str
isFeatured			bool
flavor					str
stock						num
*/

const productSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			min: 0,
			required: true,
		},
		images: [{
			type: String
		}],
		category: {
			type: String,
			required: true,
		},
		weblink: {
			type: String,
			required: true,
		},
		isFeatured: {
			type: Boolean,
			default: false,
		},
		flavor: {
			type: String,
			required: true,
		},
		stock: {
			type: Number,
			default: 100,
		}
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
