import React, { useEffect, useState } from "react";
import { useProductStore } from '../stores/useProductStore';
import { useCartStore } from "../stores/useCartStore";
import { useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';

const ItemPage = () => {

	const { fetchProductByWeblink, product } = useProductStore();

	const { weblink } = useParams();

	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [selectedFlavor, setSelectedFlavor] = useState('');

	useEffect(() => {
		console.log("useEffect is running");
		fetchProductByWeblink(weblink);
	}, [weblink]);

	useEffect(() => {
		if (product?.flavor) {
			setSelectedFlavor(product.flavor);
		}
	}, [product]);

	//const availableFlavors = ["Yuzu Mint", "Berry Blast", "Tropical Storm", "Classic"];

	const handleQuantityChange = (change) => {
		const newQuantity = quantity + change;
		if (newQuantity >= 1 && newQuantity <= product?.stock) {
			setQuantity(newQuantity);
		}
	};

	const { addToCart } = useCartStore();
		const [isHovered, setIsHovered] = useState(false);
	
	const handleAddToCart = () => {
		addToCart(product);
	};

	return (
		<div className="item-page-ctr">
			{/* Left side - Images */}
			<div>
				{/* Main Image */}
				<div className="product-img-ctr w-100">
					<img
						src={product?.images[selectedImage]}
						alt={product?.name}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover'
						}}
					/>
				</div>

				{/* Thumbnail Images */}
				<div className="thumbnail-imgs-ctr">
					{product?.images.map((image, index) => (
						<button
							key={index}
							onClick={() => setSelectedImage(index)}
							className={`thumbnail-btn ${selectedImage === index ? 'selected-img' : ''}`}
						>
							<img
								src={image}
								alt={`${product?.name} view ${index + 1}`}
								style={{
									width: '100%',
									height: '100%',
									objectFit: 'cover'
								}}
							/>
						</button>
					))}
				</div>
			</div>

			{/* Right side - Product Details */}
			<div>
				{/* Breadcrumb */}
				<div className="breadcrumb">
					Home / {product?.category} / {product?.name}
				</div>

				{/* Product Title */}
				<h1 className="product-name">
					{product?.name}
				</h1>

				{/* Price */}
				<div className="product-price">
						${product?.price}
				</div>

				{/* Description */}
				<p className='product-description'>
					{product?.description}
				</p>

				{/* Flavor Selection 
				<div style={{ marginBottom: '24px' }}>
					<label style={{
						display: 'block',
						fontSize: '16px',
						fontWeight: '600',
						marginBottom: '8px'
					}}>
						Flavor: <span style={{ color: '#f59e0b' }}>{selectedFlavor}</span>
					</label>
					<div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
						{availableFlavors.map((flavor) => (
							<button
								key={flavor}
								onClick={() => setSelectedFlavor(flavor)}
								style={{
									padding: '8px 16px',
									border: selectedFlavor === flavor ? '2px solid #f59e0b' : '2px solid #e5e7eb',
									borderRadius: '6px',
									backgroundColor: selectedFlavor === flavor ? '#fef3c7' : 'white',
									cursor: 'pointer',
									fontSize: '14px',
									fontWeight: '500'
								}}
							>
								{flavor}
							</button>
						))}
					</div>
				</div>
				*/}

				{/* Quantity and Add to Cart */}
				<div className='cart-options-ctr'>
					<label>
						Quantity
					</label>
					<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
						{/* Quantity Controls */}
						<div className="quantity-controls">
							<button
								onClick={() => handleQuantityChange(-1)}
								disabled={quantity <= 1}
								style={{
									cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
	  							color: quantity <= 1 ? '#9ca3af' : '#374151'
								}}
							>
								<Minus size={16} />
							</button>
							<span>
								{quantity}
							</span>
							<button
								onClick={() => handleQuantityChange(1)}
								disabled={quantity >= product?.stock}
								style={{
									cursor: quantity >= product?.stock ? 'not-allowed' : 'pointer',
									color: quantity >= product?.stock ? '#9ca3af' : '#374151'
								}}
							>
								<Plus size={16} />
							</button>
						</div>

						{/* Add to Cart Button */}
						<button
							onClick={handleAddToCart}
							className="add-to-cart-btn"
							onMouseEnter={(e) => e.target.style.backgroundColor = '#2e90a4'}
							onMouseLeave={(e) => e.target.style.backgroundColor = '#4ab9cf'}
						>
							<ShoppingCart size={20} />
							Add to Cart
						</button>
					</div>
				</div>

				{/* Stock Status */}
				<div className="stock-line" style={{
					color: product?.stock > 10 ? '#059669' : product?.stock > 0 ? '#d97706' : '#dc2626',
				}}>
					{product?.stock > 10 ? `${product?.stock} in stock` :
						product?.stock > 0 ? `Only ${product?.stock} left!` :
							'Out of stock'}
				</div>
			</div>
		</div>
	);
}

export default ItemPage;

/*
				<div style={{
					border: '1px solid #e5e7eb',
					borderRadius: '8px',
					padding: '20px'
				}}>
					<div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
						<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
							<Truck size={20} color="#f59e0b" />
							<span style={{ fontSize: '14px', color: '#374151' }}>Free shipping on orders over $50</span>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
							<Shield size={20} color="#f59e0b" />
							<span style={{ fontSize: '14px', color: '#374151' }}>2 year warranty included</span>
						</div>
						<div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
							<RotateCcw size={20} color="#f59e0b" />
							<span style={{ fontSize: '14px', color: '#374151' }}>30-day return policy</span>
						</div>
					</div>
				</div>
				*/