import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import useProducts from '../hooks/useProducts';
import ProductTable from '../components/ProductTable';
import AdminHeader from '../components/AdminHeader';

const Dashboard = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const { products, addProduct, updateProduct, deleteProduct } = useProducts('All');
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener('change', handleChange);
    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      deleteProduct(id);
    }
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'
      }`}
    >
      <div className="absolute inset-0">
        <div
          className={`absolute top-10 left-10 w-64 h-64 rounded-full ${
            isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-500/10'
          } blur-3xl`}
        ></div>
        <div
          className={`absolute top-40 right-20 w-96 h-96 rounded-full ${
            isDarkMode ? 'bg-purple-900/20' : 'bg-purple-500/10'
          } blur-3xl`}
        ></div>
        <div
          className={`absolute -bottom-20 -left-20 w-80 h-80 rounded-full ${
            isDarkMode ? 'bg-blue-900/20' : 'bg-blue-500/10'
          } blur-3xl`}
        ></div>
      </div>

      <AdminHeader isDarkMode={isDarkMode} />

      <div className="container relative z-10 mx-auto py-8 px-4">
        <ProductTable
          products={products}
          onAdd={addProduct}
          onUpdate={updateProduct}
          onDelete={handleDeleteProduct}
          isDarkMode={isDarkMode}
        />
      </div>
    </div>
  );
};

export default Dashboard;