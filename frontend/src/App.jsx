import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import LogoutHandler from "./pages/LogoutHandler"
import AdminPage from "./pages/AdminPage";
import CategoryPage from "./pages/CategoryPage";
import ItemPage from "./pages/ItemPage";
import Products from "./pages/ProductsPage";
import IngredientsPage from "./pages/IngredientsPage";

import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import { useUserStore } from "./stores/useUserStore";
import { useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import CartPage from "./pages/CartPage";
import { useCartStore } from "./stores/useCartStore";
import PurchaseSuccessPage from "./pages/PurchaseSuccessPage";
import PurchaseCancelPage from "./pages/PurchaseCancelPage";

function App() {
	const { user, checkAuth, checkingAuth } = useUserStore();
	const { initializeCart } = useCartStore(); // Add this
	const { getCartItems } = useCartStore();

	useEffect(() => {
			checkAuth();
	}, [checkAuth]);

	useEffect(() => {
			// Initialize cart whenever user state changes
			initializeCart(user);
	}, [initializeCart, user]); // This replaces your old getCartItems logic

	if (checkingAuth) return <LoadingSpinner />;

	return (
		<>
			<div>
				<Navbar />
				<div className='navbar-margin'>
					<Routes>
						<Route path='/' element={<HomePage />} />
						<Route path='/ingredients' element={<IngredientsPage />} />
						<Route path='/signup' element={!user ? <SignUpPage /> : <Navigate to='/' />} />
						<Route path='/account' element={user ? <HomePage /> : <Navigate to='/login' />} />
						<Route path='/login' element={!user ? <LoginPage /> : <Navigate to='/' />} />
						<Route path='/logout' element={<LogoutHandler />} />
						<Route 
							path='/secret-dashboard'
							element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />}
						/>
						<Route path='/cart' element={<CartPage />} />
						<Route
							path='/purchase-success'
							element={<PurchaseSuccessPage />}
						/>
						<Route path='/purchase-cancel' element={user ? <PurchaseCancelPage /> : <Navigate to='/login' />} />

						<Route path='/products' element={<Products />} />

						<Route path='/item/:item' element={<ItemPage />} />
						<Route path='/:category' element={<CategoryPage />} />
					</Routes>
				</div>
			</div>
			<Toaster />
		</>
	);
}

export default App;
