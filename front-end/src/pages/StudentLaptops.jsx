import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useWishlist from '../hooks/useWishlist';
import { 
  MagnifyingGlassIcon, 
  ChevronDownIcon, 
  SparklesIcon, 
  AcademicCapIcon, 
  HeartIcon,
  ComputerDesktopIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const EnhancedProductCard = ({ product, isDarkMode, toggleWishlist, isInWishlist }) => {
  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} shadow-lg hover:shadow-xl transform hover:-translate-y-2`}>
      <div className="relative">
        <div className="absolute w-40 h-40 rounded-full bg-indigo-500 opacity-5 -top-20 -right-20"></div>
        <div className="absolute w-40 h-40 rounded-full bg-purple-500 opacity-5 -bottom-20 -left-20"></div>
        <div className="absolute top-4 right-4 z-10">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${isDarkMode ? 'bg-indigo-900/80 text-indigo-200 backdrop-blur-sm' : 'bg-indigo-100/90 text-indigo-800 backdrop-blur-sm'}`}>
            {product.condition || "New"}
          </span>
        </div>
        <div className={`p-4 ${isDarkMode ? 'bg-gray-750/70 backdrop-blur-sm' : 'bg-gray-100/80 backdrop-blur-sm'}`}>
          <img
            src={product.image || `/api/placeholder/300/200`}
            alt={product.name}
            className="w-full h-48 object-contain mx-auto transition-all duration-500 hover:scale-105"
          />
        </div>
        <div className="p-5">
          <h3 className="font-bold text-lg mb-2">{product.name}</h3>
          <p className={`text-sm mb-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {product.features ? product.features.join(', ') : "Specifications not available"}
          </p>
          <div className="flex justify-between items-center mt-4">
            <span className="font-bold text-lg">GHS {product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
            <div className="flex space-x-2">
              <Link 
                to={`/product/${product.id}`} 
                className={`px-3 py-2 rounded-lg font-medium text-sm transition-all duration-300 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-indigo-500 hover:bg-indigo-600 text-white'}`}
              >
                View Details
              </Link>
              <a
                href={`https://wa.me/?text=I'm interested in ${encodeURIComponent(product.name)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300"
              >
                Buy on WhatsApp
              </a>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  toggleWishlist(product.id);
                }}
                className={`p-2 rounded-full transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                }`}
                aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
              >
                <HeartIcon className={`h-5 w-5 ${isInWishlist(product.id) ? isDarkMode ? 'text-red-400 fill-current' : 'text-red-500 fill-current' : isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ProductSkeleton = ({ isDarkMode }) => (
  <div className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800/80 backdrop-blur-sm' : 'bg-white/80 backdrop-blur-sm'}`}>
    <div className={`${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} h-48 animate-pulse`}></div>
    <div className="p-5">
      <div className={`h-4 w-3/4 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-3 animate-pulse`}></div>
      <div className={`h-3 w-1/2 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded mb-4 animate-pulse`}></div>
      <div className="flex justify-between items-center">
        <div className={`h-6 w-16 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
        <div className={`h-8 w-28 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded animate-pulse`}></div>
      </div>
    </div>
  </div>
);

const StudentLaptops = () => {
  const { products } = useProducts('All');
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('featured');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (products.length > 0) setIsLoading(false);
  }, [products]);

  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = product.category === 'Student';
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'priceLow': return a.salePrice - b.salePrice;
      case 'priceHigh': return b.salePrice - a.salePrice;
      default: return 0;
    }
  });

  const CircleDecoration = ({ className }) => (
    <div className={`absolute rounded-full ${className}`}></div>
  );

  return (
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} relative overflow-hidden`}>
      {/* Background decorations for entire page */}
      {isDarkMode ? (
        <>
          <CircleDecoration className="bg-indigo-700 opacity-10 w-96 h-96 -top-40 -right-20 z-0 blur-lg" />
          <CircleDecoration className="bg-purple-700 opacity-10 w-80 h-80 bottom-1/4 -left-20 z-0 blur-lg" />
          <CircleDecoration className="bg-blue-700 opacity-5 w-64 h-64 top-1/2 right-1/4 z-0 blur-lg" />
          <CircleDecoration className="bg-indigo-700 opacity-5 w-60 h-60 bottom-20 right-40 z-0 blur-md" />
        </>
      ) : (
        <>
          <CircleDecoration className="bg-indigo-500 opacity-10 w-96 h-96 -top-40 -right-20 z-0 blur-lg" />
          <CircleDecoration className="bg-purple-500 opacity-10 w-80 h-80 bottom-1/4 -left-20 z-0 blur-lg" />
          <CircleDecoration className="bg-blue-400 opacity-5 w-64 h-64 top-1/2 right-1/4 z-0 blur-lg" />
          <CircleDecoration className="bg-indigo-400 opacity-5 w-60 h-60 bottom-20 right-40 z-0 blur-md" />
        </>
      )}

      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 py-24 px-4">
          {/* Hero background decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-300 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute top-10 right-1/4 w-32 h-32 bg-pink-400 rounded-full filter blur-2xl opacity-20"></div>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="md:flex md:items-center md:justify-between">
              <div className="text-center md:text-left md:w-1/2">
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-indigo-700/80 text-indigo-100 text-sm font-medium mb-6 shadow-lg backdrop-blur-sm">
                  <LightBulbIcon className="h-4 w-4 mr-2" />
                  Designed for Learning
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  Student <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Laptops</span>
                </h1>
                <p className="text-lg mb-8 text-indigo-100 max-w-xl mx-auto md:mx-0">
                  Discover lightweight, affordable laptops perfect for studying, note-taking, and online classes. Built for the modern student experience.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <Link
                    to="/catalog"
                    className="bg-transparent border-2 border-indigo-300 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-800/50 hover:border-indigo-200 transition duration-300 flex items-center justify-center backdrop-blur-sm"
                  >
                    <AcademicCapIcon className="w-5 h-5 mr-2" />
                    Back to Catalog
                  </Link>
                  <Link
                    to="catalog"
                    className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center shadow-lg"
                  >
                    <ComputerDesktopIcon className="w-5 h-5 mr-2" />
                    View Laptops
                  </Link>
                </div>
              </div>
              
              {/* Feature highlight section */}
              <div className="hidden md:block md:w-2/5">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl mt-8 md:mt-0 border border-white/20">
                  <h3 className="text-xl font-semibold text-white mb-4">Perfect for Students</h3>
                  <ul className="space-y-3">
                    {['Lightweight design', 'Long battery life', 'Affordable pricing', 'Performance for coursework'].map((feature, index) => (
                      <li key={index} className="flex items-center text-indigo-100">
                        <div className="bg-indigo-500/20 p-1 rounded-full mr-3">
                          <svg className="w-4 h-4 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${isDarkMode ? 'text-gray-900' : 'text-gray-50'}`}>
          <svg viewBox="0 0 1440 80" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        </div>
      </section>

      {/* Content Section with search and filtering */}
      <section id="products" className="px-4 pt-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Search and Filter Panel */}
          <div className={`p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden ${isDarkMode ? 'bg-gray-800/80 backdrop-blur-md' : 'bg-white/80 backdrop-blur-md'} border ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 opacity-5 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 opacity-5 rounded-full transform -translate-x-20 translate-y-20"></div>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <MagnifyingGlassIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="text"
                placeholder="Search student laptops..."
                className={`pl-12 pr-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-700/90 text-white border-gray-600 placeholder-gray-400' : 'bg-gray-100/90 text-gray-800 border-gray-200 placeholder-gray-500'
                } backdrop-blur-sm`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="relative flex-grow">
                <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`w-full pl-4 pr-10 py-2.5 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                    isDarkMode ? 'bg-gray-700/90 text-white border-gray-600' : 'bg-gray-100/90 text-gray-800 border-gray-200'
                  } backdrop-blur-sm`}
                >
                  <option value="featured">Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                  <ChevronDownIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                </div>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-400 rounded-full blur-md opacity-30"></div>
                <SparklesIcon className="h-6 w-6 text-indigo-500 relative" />
              </div>
              <h2 className="text-xl font-bold">{isLoading ? "Loading..." : `${sortedProducts.length} Student Laptops`}</h2>
            </div>
            {!isLoading && sortedProducts.length > 0 && (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Showing all {sortedProducts.length} results
              </p>
            )}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [...Array(6)].map((_, index) => <ProductSkeleton key={index} isDarkMode={isDarkMode} />)
            ) : sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <div key={product.id} className="group">
                  <EnhancedProductCard 
                    product={product} 
                    isDarkMode={isDarkMode} 
                    toggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist}
                  />
                </div>
              ))
            ) : (
              <div className={`col-span-full p-10 text-center rounded-xl ${isDarkMode ? 'bg-gray-800/90 backdrop-blur-sm' : 'bg-white/90 backdrop-blur-sm'} shadow-md border ${isDarkMode ? 'border-gray-700/50' : 'border-gray-200/50'}`}>
                <div className="flex flex-col items-center">
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-700/80' : 'bg-gray-100/80'} mb-4 backdrop-blur-sm`}>
                    <MagnifyingGlassIcon className="h-10 w-10 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No student laptops found</h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                    Try adjusting your search to find what you're looking for.
                  </p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSortBy('featured'); }}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-gray-750 { background-color: #2a2d3a; }
        @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.3; } }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        .bg-grid-pattern {
          background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  );
};

export default StudentLaptops;