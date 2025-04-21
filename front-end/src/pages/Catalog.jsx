import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useWishlist from '../hooks/useWishlist';
import { MagnifyingGlassIcon, AdjustmentsHorizontalIcon, ChevronDownIcon, SparklesIcon, AcademicCapIcon, BriefcaseIcon, RocketLaunchIcon, ChevronRightIcon, HeartIcon } from '@heroicons/react/24/outline';
import dell from '../assets/dell.png';
import hp from '../assets/hp.png';
import lenovo from '../assets/lenovo.png';
import apple from '../assets/apple.png';
import asus from '../assets/asus.png';
import acer from '../assets/acer.png';


const EnhancedProductCard = ({ product, isDarkMode, toggleWishlist, isInWishlist }) => {
  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transform hover:-translate-y-2`}>
      <div className="relative">
        <div className="absolute w-40 h-40 rounded-full bg-indigo-500 opacity-5 -top-20 -right-20"></div>
        <div className="absolute w-40 h-40 rounded-full bg-purple-500 opacity-5 -bottom-20 -left-20"></div>
        <div className="absolute top-4 right-4 z-10">
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'}`}>
            {product.condition || "New"}
          </span>
        </div>
        <div className={`p-4 ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
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
                onClick={() => toggleWishlist(product.id)}
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

const Catalog = () => {
  const { products } = useProducts('All'); // Updated to use 'All' for consistency
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
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

  const studentLaptopsRef = useRef(null);
  const businessLaptopsRef = useRef(null);
  const gamingLaptopsRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const categories = ['All', 'Student', 'Business', 'Gaming'];

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
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
    <div className={`absolute rounded-full opacity-10 ${className}`}></div>
  );

  const ProductSkeleton = () => (
    <div className={`rounded-xl overflow-hidden shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
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

    const brands = [
    { name: 'Dell', logo: dell },
    { name: 'HP', logo: hp },
    { name: 'Lenovo', logo: lenovo },
    { name: 'Apple', logo: apple },
    { name: 'Asus', logo: asus },
    { name: 'Acer', logo: acer }
    ];
  
  return (
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} relative overflow-hidden`}>
      {isDarkMode ? (
        <>
          <CircleDecoration className="bg-indigo-700 w-96 h-96 -top-40 -right-20 z-0" />
          <CircleDecoration className="bg-purple-700 w-80 h-80 bottom-1/4 -left-20 z-0" />
        </>
      ) : (
        <>
          <CircleDecoration className="bg-indigo-500 w-96 h-96 -top-40 -right-20 z-0" />
          <CircleDecoration className="bg-purple-500 w-80 h-80 bottom-1/4 -left-20 z-0" />
        </>
      )}

      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 py-20 px-4">
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-30"></div>
          </div>
          <div className="max-w-7xl mx-auto relative">
            <div className="text-center md:text-left">
              <div className="inline-block px-4 py-1 rounded-full bg-indigo-700 text-indigo-100 text-sm font-medium mb-6 shadow-lg">
                Explore 100+ Options
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Find Your Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">Laptop</span>
              </h1>
              <p className="text-lg mb-8 text-indigo-100 max-w-2xl mx-auto md:mx-0">
                Browse through our curated collection of premium laptops from top brands. Compare specs, prices, and features to make the right choice.
              </p>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <button onClick={() => scrollToSection(studentLaptopsRef)} className="bg-transparent border-2 border-indigo-300 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-800 transition duration-200 flex items-center">
                  <AcademicCapIcon className="w-5 h-5 mr-2" />
                  Student Laptops
                </button>
                <button onClick={() => scrollToSection(businessLaptopsRef)} className="bg-transparent border-2 border-indigo-300 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-800 transition duration-200 flex items-center">
                  <BriefcaseIcon className="w-5 h-5 mr-2" />
                  Business Laptops
                </button>
                <button onClick={() => scrollToSection(gamingLaptopsRef)} className="bg-transparent border-2 border-indigo-300 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-800 transition duration-200 flex items-center">
                  <RocketLaunchIcon className="w-5 h-5 mr-2" />
                  Gaming Laptops
                </button>
              </div>
              <div className="mt-8 grid grid-cols-3 md:grid-cols-6 gap-4 opacity-70 max-w-3xl mx-auto">
                {brands.map((brand) => (
                  <div 
                    key={brand.name} 
                    className={`p-2 flex items-center justify-center ${
                      isDarkMode ? 'opacity-80' : 'opacity-60'
                    }`}
                  >
                    <img 
                      src={brand.logo} 
                      alt={`${brand.name} logo`} 
                      className={`h-6 w-auto object-contain ${
                        isDarkMode ? 'brightness-0 invert' : 'grayscale'
                      }`} 
                    />
                  </div>
                ))}
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

      <section className="px-4 pt-6 pb-12 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className={`p-6 rounded-xl shadow-lg mb-8 relative overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="absolute top-0 right-0 w-40 h-40 bg-indigo-500 opacity-5 rounded-full transform translate-x-20 -translate-y-20"></div>
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-purple-500 opacity-5 rounded-full transform -translate-x-20 translate-y-20"></div>
            <div className="relative mb-6">
              <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                <MagnifyingGlassIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
              </div>
              <input
                type="text"
                placeholder="Search laptops..."
                className={`pl-12 pr-4 py-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                  isDarkMode ? 'bg-gray-700 text-white border-gray-600 placeholder-gray-400' : 'bg-gray-100 text-gray-800 border-gray-200 placeholder-gray-500'
                }`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-4">
              <div className="flex flex-col sm:flex-row gap-4 flex-grow">
                <div className="relative flex-grow">
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className={`w-full pl-4 pr-10 py-2.5 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                      isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none mt-6">
                    <ChevronDownIcon className={`h-5 w-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                  </div>
                </div>
                <div className="relative flex-grow">
                  <label className={`block text-sm font-medium mb-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className={`w-full pl-4 pr-10 py-2.5 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all duration-300 ${
                      isDarkMode ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-200'
                    }`}
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
          </div>

          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-400 rounded-full blur-md opacity-30"></div>
                <SparklesIcon className="h-6 w-6 text-indigo-500 relative" />
              </div>
              <h2 className="text-xl font-bold">{isLoading ? "Loading..." : `${sortedProducts.length} Products`}</h2>
            </div>
            {!isLoading && (
              <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Showing all {sortedProducts.length} results</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {isLoading ? (
              [...Array(6)].map((_, index) => <ProductSkeleton key={index} />)
            ) : sortedProducts.length > 0 ? (
              sortedProducts.map((product) => (
                <Link key={product.id} to={`/product/${product.id}`} className="block">
                  <EnhancedProductCard 
                    product={product} 
                    isDarkMode={isDarkMode} 
                    toggleWishlist={toggleWishlist}
                    isInWishlist={isInWishlist}
                  />
                </Link>
              ))
            ) : (
              <div className={`col-span-full p-10 text-center rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md`}>
                <div className="flex flex-col items-center">
                  <div className={`p-4 rounded-full ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'} mb-4`}>
                    <MagnifyingGlassIcon className="h-10 w-10 text-indigo-500" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No products found</h3>
                  <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-500'} mb-4`}>
                    Try adjusting your search or filter to find what you're looking for.
                  </p>
                  <button 
                    onClick={() => { setSearchTerm(''); setSelectedCategory('All'); setSortBy('featured'); }}
                    className={`px-4 py-2 rounded-lg transition-all duration-300 ${isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-500 hover:bg-indigo-600'} text-white`}
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          <div ref={studentLaptopsRef} className="mb-16 pt-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-blue-400 rounded-full blur-md opacity-30"></div>
                  <AcademicCapIcon className="h-8 w-8 text-blue-500 relative" />
                </div>
               <div className="mb-10 relative inline-block">
              <h2 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-indigo-300 via-purple-300 to-blue-300' 
                  : 'from-indigo-600 via-purple-600 to-blue-600'
              }`}>
                Student Laptops
              </h2>
              
              {/* Short Underline with Gradient */}
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"></span>
            </div>
              </div>
              <Link to="/student-laptops" className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${isDarkMode ? 'text-blue-300 hover:text-blue-200' : 'text-blue-600 hover:text-blue-700'}`}>
                View More <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? 
                [...Array(3)].map((_, index) => <ProductSkeleton key={index} />) : 
                products.filter(product => product.category === 'Student')
                  .slice(0, 3)
                  .map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="block">
                      <EnhancedProductCard
                        product={product}
                        isDarkMode={isDarkMode}
                        toggleWishlist={toggleWishlist}
                        isInWishlist={isInWishlist}
                      />
                    </Link>
                  ))
              }
            </div>
          </div>

          <div ref={businessLaptopsRef} className="mb-16 pt-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-gray-400 rounded-full blur-md opacity-30"></div>
                  <BriefcaseIcon className="h-8 w-8 text-gray-500 relative" />
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-indigo-300 via-purple-300 to-blue-300' 
                    : 'from-indigo-600 via-purple-600 to-blue-600'
                  }`}>
                  Business Laptops
                </h2>
              </div>
              <Link to="/business-laptops" className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${isDarkMode ? 'text-gray-300 hover:text-gray-200' : 'text-gray-600 hover:text-gray-700'}`}>
                View More <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? 
                [...Array(3)].map((_, index) => <ProductSkeleton key={index} />) : 
                products.filter(product => product.category === 'Business')
                  .slice(0, 3)
                  .map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="block">
                      <EnhancedProductCard
                        product={product}
                        isDarkMode={isDarkMode}
                        toggleWishlist={toggleWishlist}
                        isInWishlist={isInWishlist}
                      />
                    </Link>
                  ))
              }
            </div>
          </div>

          <div ref={gamingLaptopsRef} className="mb-16 pt-8">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-red-400 rounded-full blur-md opacity-30"></div>
                  <RocketLaunchIcon className="h-8 w-8 text-red-500 relative" />
                </div>
                <h2 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                  isDarkMode 
                    ? 'from-indigo-300 via-purple-300 to-blue-300' 
                    : 'from-indigo-600 via-purple-600 to-blue-600'
                   }`}>
                  Gaming Laptops
                </h2>
              </div>
              <Link to="/gaming-laptops" className={`px-4 py-2 rounded-lg text-sm font-medium flex items-center ${isDarkMode ? 'text-red-300 hover:text-red-200' : 'text-red-600 hover:text-red-700'}`}>
                View More <ChevronRightIcon className="w-4 h-4 ml-1" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {isLoading ? 
                [...Array(3)].map((_, index) => <ProductSkeleton key={index} />) : 
                products.filter(product => product.category === 'Gaming')
                  .slice(0, 3)
                  .map((product) => (
                    <Link key={product.id} to={`/product/${product.id}`} className="block">
                      <EnhancedProductCard
                        product={product}
                        isDarkMode={isDarkMode}
                        toggleWishlist={toggleWishlist}
                        isInWishlist={isInWishlist}
                      />
                    </Link>
                  ))
              }
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-gray-750 { background-color: #2a2d3a; }
        @keyframes pulse { 0%, 100% { opacity: 0.2; } 50% { opacity: 0.3; } }
        .animate-pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
      `}</style>
    </div>
  );
};

export default Catalog;