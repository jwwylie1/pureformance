import { Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { use, useEffect } from 'react'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import Navbar from './components/Navbar.jsx'
import LoadingSpinner from './components/LoadingSpinner.jsx'
import AdminPage from './pages/AdminPage.jsx'
import CartPage from './pages/CartPage.jsx'
import CategoryPage from './pages/CategoryPage.jsx'
import { useUserStore } from './stores/useUserStore.js'
import { useCartStore } from './stores/useCartStore.js'



function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();
  const { getCartItems } = useCartStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  useEffect(() => {
    getCartItems()
  }, [getCartItems])

  if (checkingAuth) { return <LoadingSpinner />; }

  return (
    <div className="relative z-50 pt-20">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={!user ? <SignUpPage /> : <Navigate to='/' />} />
        <Route path="/login" element={!user ? <LoginPage /> : <Navigate to='/' />} />
        <Route path="/secret-dashboard" element={user?.role === "admin" ? <AdminPage /> : <Navigate to='/login' />} />
        <Route path="/cart" element={user ? <CartPage /> : <Navigate to='/' /> } />
        <Route path="/:category" element={ <CategoryPage /> } />
        {/* <Route path="/:item" element={ <ItemPage /> } /> */}

      </Routes>
      <Toaster />
    </div>
  )
}

export default App
