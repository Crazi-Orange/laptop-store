import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useWishlist from '../hooks/useWishlist';
import { HeartIcon, TrashIcon } from '@heroicons/react/24/outline';

const Wishlist = () => {
  const { products } = useProducts('All');
  const { wishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect dark mode
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Filter wishlist products and handle deleted products
  const wishlistProducts = products.filter((product) => isInWishlist(product.id));

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} relative overflow-hidden pb-16`}>
      {isDarkMode ? (
        <>
          <div className="absolute rounded-full bg-indigo-700 w-96 h-96 -top-40 -right-20 z-0 opacity-10"></div>
          <div className="absolute rounded-full bg-purple-700 w-80 h-80 bottom-1/4 -left-20 z-0 opacity-10"></div>
        </>
      ) : (
        <>
          <div className="absolute rounded-full bg-indigo-500 w-96 h-96 -top-40 -right-20 z-0 opacity-10"></div>
          <div className="absolute rounded-full bg-purple-500 w-80 h-80 bottom-1/4 -left-20 z-0 opacity-10"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        {wishlistProducts.length === 0 ? (
          <div className="text-center py-12">
            <HeartIcon className="h-16 w-16 mx-auto text-gray-400 mb-4" />
            <p className="text-lg mb-6">Your wishlist is empty.</p>
            <Link
              to="/catalog"
              className="inline-block px-6 py-3 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                className={`rounded-xl overflow-hidden shadow-md transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                } hover:shadow-xl`}
              >
                <div className="relative">
                  <div className="absolute w-40 h-40 rounded-full bg-indigo-500 opacity-5 -top-20 -right-20"></div>
                  <div className="absolute w-40 h-40 rounded-full bg-purple-500 opacity-5 -bottom-20 -left-20"></div>
                  <div className={`p-4 ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
                    <img
                      src={product.image || `/api/placeholder/300/200`}
                      alt={product.name}
                      className="w-full h-48 object-contain mx-auto"
                      onError={(e) => (e.target.src = `/api/placeholder/300/200`)}
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                    <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      {product.features ? product.features.join(', ') : 'Specifications not available'}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-lg">GHS {product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                      <div className="flex space-x-2">
                        <Link
                          to={`/product/${product.id}`}
                          className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${
                            isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'
                          }`}
                        >
                          View Details
                        </Link>
                        <button
                          onClick={() => removeFromWishlist(product.id)}
                          className={`p-2 rounded-full transition-all duration-300 ${
                            isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                          aria-label="Remove from wishlist"
                        >
                          <TrashIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .bg-gray-750 {
          background-color: #2a2d3a;
        }
      `}</style>
    </div>
  );
};

export default Wishlist;