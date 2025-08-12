import mongoose from "mongoose";

/*
name						str
description			str
price						num
image						str
category				str
weblink					str
isFeatured			bool
variants				arr
	> colors			str
	> hex					str
	> sizes				arr
		> size			str
		> inStock 	bool
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
		image: {
			type: String,
			required: [true, "Image is required"],
		},
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
		variants: [
      {
        color: {
          type: String,
          required: true,
        },
				hex: {
					type: String,
					required: true,
				},
        sizes: [
					{
						size: {
							type: String,
							required: true,
						},
						inStock: {
							type: Boolean,
							default: true,
						}
        	}
				]
      },
    ],
	},
	{ timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
