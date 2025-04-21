import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Initialize from local storage on first render
    const storedAuth = localStorage.getItem('adminAuth');
    console.log('Initializing isAuthenticated:', storedAuth === 'true');
    return storedAuth === 'true';
  });

  // Sync isAuthenticated to local storage
  useEffect(() => {
    localStorage.setItem('adminAuth', isAuthenticated);
    console.log('Auth state synced:', { isAuthenticated });
  }, [isAuthenticated]);

  const login = (username, password) => {
    if (username === 'admin' && password === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('adminAuth', 'true');
      console.log('Login successful:', { username });
      return true;
    }
    console.log('Login failed:', { username });
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.setItem('adminAuth', 'false');
    localStorage.removeItem('resetToken');
    console.log('Logged out');
  };

  const resetPassword = (username) => {
    console.log(`Password reset requested for username: ${username}`);
    localStorage.setItem('resetToken', `token-${username}-${Date.now()}`);
    return true;
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, resetPassword }}>
      {children}
    </AuthContext.Provider>
  );
};