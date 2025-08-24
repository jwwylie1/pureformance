import React, { useEffect, useState } from "react";
import { useProductStore } from '../stores/useProductStore';
import { useParams } from "react-router-dom";
import { Minus, Plus, ShoppingCart, Star, Truck, Shield, RotateCcw } from 'lucide-react';

const ItemPage = () => {

	const fetchProductByWeblink = useProductStore(state => state.fetchProductByWeblink);
	const product = useProductStore(state => state.product ?? {});

	const { weblink } = useParams();

	console.log("Component render", { weblink, fetchProductByWeblink })

	useEffect(() => {
		if (!weblink) return; // safety check
		console.log("useEffect is running");
		fetchProductByWeblink(weblink);
	}, [weblink, fetchProductByWeblink]);

	console.log("Here: ", product);

	const [selectedImage, setSelectedImage] = useState(0);
	const [quantity, setQuantity] = useState(1);
	const [selectedFlavor, setSelectedFlavor] = useState(product.flavor);

	// Mock additional flavors for demo
	const availableFlavors = ["Yuzu Mint", "Berry Blast", "Tropical Storm", "Classic"];

	const handleQuantityChange = (change) => {
		const newQuantity = quantity + change;
		if (newQuantity >= 1 && newQuantity <= product.stock) {
			setQuantity(newQuantity);
		}
	};

	const handleAddToCart = () => {
		const productWithFlavor = {
			...product,
			flavor: selectedFlavor,
			quantity: quantity
		};
		console.log('Adding to cart:', productWithFlavor);
		// In real app: addToCart(productWithFlavor);
	};

	return (
		<div style={{
			maxWidth: '1200px',
			margin: '0 auto',
			padding: '40px 20px',
			display: 'grid',
			gridTemplateColumns: '1fr 1fr',
			gap: '60px',
			alignItems: 'start'
		}}>
			{/* Left side - Images */}
			<div>
				{/* Main Image */}
				<div style={{
					width: '100%',
					height: '500px',
					backgroundColor: '#f8f9fa',
					borderRadius: '12px',
					overflow: 'hidden',
					marginBottom: '20px'
				}}>
					<img
						src={product.images[selectedImage]}
						alt={product.name}
						style={{
							width: '100%',
							height: '100%',
							objectFit: 'cover'
						}}
					/>
				</div>

				{/* Thumbnail Images */}
				<div style={{
					display: 'flex',
					gap: '12px',
					justifyContent: 'center'
				}}>
					{product.images.map((image, index) => (
						<button
							key={index}
							onClick={() => setSelectedImage(index)}
							style={{
								width: '80px',
								height: '80px',
								border: selectedImage === index ? '2px solid #f59e0b' : '2px solid transparent',
								borderRadius: '8px',
								overflow: 'hidden',
								cursor: 'pointer'
							}}
						>
							<img
								src={image}
								alt={`${product.name} view ${index + 1}`}
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
				<div style={{
					fontSize: '14px',
					color: '#6b7280',
					marginBottom: '16px',
					textTransform: 'capitalize'
				}}>
					Home / {product.category} / {product.name}
				</div>

				{/* Product Title */}
				<h1 style={{
					fontSize: '32px',
					fontWeight: '900',
					marginBottom: '8px',
					lineHeight: '1.2'
				}}>
					{product.name}
				</h1>

				{/* Rating */}
				<div style={{
					display: 'flex',
					alignItems: 'center',
					gap: '8px',
					marginBottom: '16px'
				}}>
					<div style={{ display: 'flex', color: '#f59e0b' }}>
						{[...Array(5)].map((_, i) => (
							<Star key={i} size={16} fill="currentColor" />
						))}
					</div>
					<span style={{ fontSize: '14px', color: '#6b7280' }}>(127 reviews)</span>
				</div>

				{/* Price */}
				<div style={{ marginBottom: '24px' }}>
					<span style={{
						fontSize: '28px',
						fontWeight: '700',
						color: '#111827'
					}}>
						${product.price}
					</span>
				</div>

				{/* Description */}
				<p style={{
					color: '#4b5563',
					fontSize: '16px',
					lineHeight: '1.6',
					marginBottom: '32px'
				}}>
					{product.description}
				</p>

				{/* Flavor Selection */}
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

				{/* Quantity and Add to Cart */}
				<div style={{ marginBottom: '32px' }}>
					<label style={{
						display: 'block',
						fontSize: '16px',
						fontWeight: '600',
						marginBottom: '8px'
					}}>
						Quantity
					</label>
					<div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
						{/* Quantity Controls */}
						<div style={{
							display: 'flex',
							alignItems: 'center',
							border: '2px solid #e5e7eb',
							borderRadius: '6px'
						}}>
							<button
								onClick={() => handleQuantityChange(-1)}
								disabled={quantity <= 1}
								style={{
									padding: '8px 12px',
									border: 'none',
									backgroundColor: 'transparent',
									cursor: quantity <= 1 ? 'not-allowed' : 'pointer',
									color: quantity <= 1 ? '#9ca3af' : '#374151'
								}}
							>
								<Minus size={16} />
							</button>
							<span style={{
								padding: '8px 16px',
								fontSize: '16px',
								fontWeight: '600',
								minWidth: '50px',
								textAlign: 'center'
							}}>
								{quantity}
							</span>
							<button
								onClick={() => handleQuantityChange(1)}
								disabled={quantity >= product.stock}
								style={{
									padding: '8px 12px',
									border: 'none',
									backgroundColor: 'transparent',
									cursor: quantity >= product.stock ? 'not-allowed' : 'pointer',
									color: quantity >= product.stock ? '#9ca3af' : '#374151'
								}}
							>
								<Plus size={16} />
							</button>
						</div>

						{/* Add to Cart Button */}
						<button
							onClick={handleAddToCart}
							style={{
								flex: '1',
								padding: '12px 24px',
								backgroundColor: '#f59e0b',
								color: 'white',
								border: 'none',
								borderRadius: '6px',
								fontSize: '16px',
								fontWeight: '600',
								cursor: 'pointer',
								display: 'flex',
								alignItems: 'center',
								justifyContent: 'center',
								gap: '8px',
								transition: 'background-color 0.2s'
							}}
							onMouseEnter={(e) => e.target.style.backgroundColor = '#d97706'}
							onMouseLeave={(e) => e.target.style.backgroundColor = '#f59e0b'}
						>
							<ShoppingCart size={20} />
							Add to Cart
						</button>
					</div>
				</div>

				{/* Stock Status */}
				<div style={{ marginBottom: '32px' }}>
					<span style={{
						color: product.stock > 10 ? '#059669' : product.stock > 0 ? '#d97706' : '#dc2626',
						fontSize: '14px',
						fontWeight: '500'
					}}>
						{product.stock > 10 ? `${product.stock} in stock` :
							product.stock > 0 ? `Only ${product.stock} left!` :
								'Out of stock'}
					</span>
				</div>

				{/* Features */}
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
			</div>
		</div>
	);
}

export default ItemPage;