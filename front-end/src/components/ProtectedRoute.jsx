// src/components/ProtectedRoute.jsx
import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  console.log('ProtectedRoute check:', { isAuthenticated, path: window.location.pathname });
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
};

export default ProtectedRoute;
