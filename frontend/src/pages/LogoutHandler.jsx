import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useUserStore } from '../stores/useUserStore';

const LogoutHandler = () => {
  const { logout } = useUserStore(); // or however you handle auth

  useEffect(() => {
    logout(); // Clear user data, tokens, etc.
  }, [logout]);

  return <Navigate to='/' replace />;
};

export default LogoutHandler