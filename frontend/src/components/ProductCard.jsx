import toast from "react-hot-toast";
import { useState } from "react";
import { ShoppingCart, Plus } from "lucide-react";
import { Link } from "react-router-dom"
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";

const ProductCard = ({ product }) => {
	const { user } = useUserStore();
	const { addToCart } = useCartStore();

	const [isHovered, setIsHovered] = useState(false);

	const handleAddToCart = () => {
		addToCart(product);
	};

	return (
		<div className='product-card' 
			onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
			<Link to={"/item/" + product.weblink}>
				<div className="product-card-img-ctr">
					<img className='product-card-img' src={product.images[isHovered && product.images[1] ? 1 : 0]}  
					alt={product.name + ' image'} />
				</div>

				<div className='product-card-info'>
            <div className='product-card-details'>
                <h5 className='product-card-name'>{product.name}</h5>
								<p className='product-card-flavor'>Yuzu Mint</p>
                <p className='product-card-price'>${product.price}</p>
            </div>
            
            <Plus 
                size={24} 
                className='plus-icon'
                onClick={(e) => {
                    e.preventDefault(); // Prevents the link navigation
                    e.stopPropagation(); // Stops the event from bubbling up
                    handleAddToCart(); // Your add to cart function
                }}
            />
        </div>
			</Link>
		</div>
	);
};
export default ProductCard;
