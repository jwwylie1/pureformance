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
		if (!user) {
			toast.error("Please login to add products to cart", { id: "login" });
			return;
		} else {
			// add to cart
			addToCart(product);
		}
	};

	return (
		<div className='product-card' 
			onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
			<Link to={"/item/" + product.weblink}>
				<div className="product-img-ctr">
					<img className='product-img' src={product.images[isHovered && product.images[1] ? 1 : 0]}  
					alt={product.name + ' image'} />
				</div>

				<div className='product-info'>
            <div className='product-details'>
                <h5 className='product-name'>{product.name}</h5>
                <p className='product-price'>${product.price}</p>
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
