import { ShoppingCart, UserRound, LogIn, LogOut, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { useUserStore } from "../stores/useUserStore";
import { useCartStore } from "../stores/useCartStore";
import fullLogo from '../assets/logo-full.png';

const Navbar = () => {
	const { user, logout } = useUserStore();
	const isAdmin = user?.role === "admin";
	const { cart } = useCartStore();

	return (
		<header className='fixed w-100'>
			<div className='header-ctr flex'>
				<Link to='/' className='logo-link'>
					<img src={fullLogo} className='header-logo'/>
				</Link>

				<nav>
					<div className="links-ctr">
						<Link to={"/"} className='navbtn'>
							Home
						</Link>
						<Link to={"/products"} className='navbtn'>
							Products
						</Link>
						<Link to={"/ingredients"} className='navbtn'>
							Ingredients
						</Link>
						<Link to={"/ambassadors"} className='navbtn'>
							Ambassadors
						</Link>
						<Link to={"/contact"} className='navbtn'>
							Contact
						</Link>
					</div>

					<div className="symbol-ctr">
						<Link to={"/cart"} className="symbol-link">
							<ShoppingCart size={24} />
							{cart.length > 0 && (
								<span className='cart-number transition duration-300 ease-in-out'>
									{cart.length}
								</span>
							)}
						</Link>

						{user ? (
							<Link to="/account" className="symbol-link">
								<UserRound size={24} />
							</Link>
						) : (
							<Link to={"/login"}>
								<UserRound size={24} />
							</Link>
						)}

						{isAdmin && (
							<Link to={"/secret-dashboard"} className='symbol-link'>
								<Lock className='inline-block mr-1' size={24} />
							</Link>
						)}
					</div>
				</nav>
				
			</div>
		</header>
	);
};
export default Navbar;