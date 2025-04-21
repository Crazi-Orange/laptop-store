import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useWishlist from '../hooks/useWishlist';
import {
  ChevronRightIcon,
  TruckIcon,
  ShieldCheckIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  StarIcon,
  ComputerDesktopIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PuzzlePieceIcon,
  ShoppingCartIcon,
  HeartIcon,
} from '@heroicons/react/24/outline';
import ASUS from '../assets/ASUS.png'
import manylap from '../assets/manylap.png'




// Product Card Component (based on EnhancedProductCard from ProductDetail.jsx)
const HomeProductCard = ({ product, isDarkMode, toggleWishlist, isInWishlist }) => {
  return (
    <div
      className={`group relative overflow-hidden rounded-xl transition-all duration-300 ${
        isDarkMode ? 'bg-gray-800 hover:bg-gray-750' : 'bg-white hover:bg-gray-50'
      } shadow-lg hover:shadow-xl transform hover:-translate-y-2`}
    >
      {/* Decorative elements */}
      <div className="absolute w-40 h-40 rounded-full bg-indigo-500 opacity-5 -top-20 -right-20"></div>
      <div className="absolute w-40 h-40 rounded-full bg-purple-500 opacity-5 -bottom-20 -left-20"></div>
      <div
        className={`absolute top-4 right-4 z-10 px-2 py-1 text-xs font-medium rounded-full ${
          isDarkMode ? 'bg-indigo-900 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
        }`}
      >
        New
      </div>

      <div className={`p-5 ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'} relative overflow-hidden`}>
        <div
          className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-5 transform origin-top-right transition-transform duration-500 group-hover:scale-110"
        ></div>
        <div className="flex justify-center items-center h-48 relative">
          <img
            src={product.image || '/api/placeholder/300/200'}
            alt={product.name}
            className="object-contain max-h-40 transform transition-all duration-500 group-hover:scale-110"
          />
        </div>
      </div>

      <div className="p-5 relative">
        <h3 className="font-medium text-lg mb-2 truncate">{product.name}</h3>
        <div className="flex items-center mb-3">
          <div className="flex text-yellow-400">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-4 w-4 fill-current" />
            ))}
          </div>
          <span className={`ml-2 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(120)</span>
        </div>
        <div className="flex justify-between items-center mt-4">
          <span className="font-bold text-lg">GHS {product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product.id);
              }}
              className={`p-2 rounded-full transition-all duration-300 ${
                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
              }`}
              aria-label={isInWishlist(product.id) ? 'Remove from wishlist' : 'Add to wishlist'}
            >
              <HeartIcon
                className={`h-5 w-5 ${
                  isInWishlist(product.id)
                    ? isDarkMode
                      ? 'text-red-400 fill-current'
                      : 'text-red-500 fill-current'
                    : isDarkMode
                      ? 'text-gray-400'
                      : 'text-gray-500'
                }`}
              />
            </button>
            <Link
              to={`/product/${product.id}`}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 relative overflow-hidden group-hover:shadow-lg ${
                isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white'
              }`}
            >
              <span className="relative z-10">View Details</span>
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const Home = () => {
  const { products } = useProducts('All');
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Detect system preference for dark mode
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Toggle wishlist
  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const categories = [
    { name: 'Products', icon: <ComputerDesktopIcon className="h-8 w-8" /> },
    { name: 'Student', icon: <AcademicCapIcon className="h-8 w-8" /> },
    { name: 'Business', icon: <BriefcaseIcon className="h-8 w-8" /> },
    { name: 'Gaming', icon: <PuzzlePieceIcon className="h-8 w-8" /> },
  ];

  // Select a featured product (first available or fallback)


  // Decorative circle elements
  const CircleDecoration = ({ className }) => <div className={`absolute rounded-full opacity-10 ${className}`}></div>;

  return (
  <div className={`space-y-16 pb-16 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} relative overflow-hidden`}>
    {/* Global decorative circles */}
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

    {/* HERO SECTION START */}
    <section className="relative overflow-hidden">
      {/* Background pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0 bg-repeat"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'20\' viewBox=\'0 0 20 20\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'%2300BFFF\' fill-opacity=\'0.7\' fill-rule=\'evenodd\'%3E%3Ccircle cx=\'3\' cy=\'3\' r=\'1\'/%3E%3Ccircle cx=\'13\' cy=\'13\' r=\'1\'/%3E%3C/g%3E%3C/svg%3E")',
          }}
        ></div>
      </div>

      {/* Main hero content with gradient background */}
      <div className="relative bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 py-20 px-4">
        {/* Animated background blobs */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-30 animate-pulse"></div>
          <div className="absolute top-1/3 -right-32 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl opacity-30"></div>
          <div
            className="absolute bottom-0 left-1/4 w-64 h-64 bg-indigo-400 rounded-full filter blur-3xl opacity-20 animate-pulse"
            style={{ animationDelay: '2s' }}
          ></div>
          <div
            className="absolute top-1/4 right-1/4 w-48 h-48 bg-pink-400 rounded-full filter blur-2xl opacity-20 animate-pulse"
            style={{ animationDelay: '1.5s' }}
          ></div>
        </div>

        {/* Grid pattern overlay for texture */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>

        <div className="max-w-7xl mx-auto relative">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            {/* Left side content */}
            <div className="md:w-1/2 text-center md:text-left">
              <div className="inline-flex items-center px-4 py-1 rounded-full bg-indigo-700 text-indigo-100 text-sm font-medium mb-6 shadow-lg backdrop-blur-sm bg-opacity-80">
                <SparklesIcon className="h-4 w-4 mr-2" />
                New Collection 2025
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                Premium <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 relative">
                  Laptops & Devices
                  <span className="absolute bottom-1 left-0 w-full h-1 bg-gradient-to-r from-blue-300 to-purple-300 opacity-50 rounded-full"></span>
                </span> For Every Need
              </h1>
              <p className="text-lg mb-8 text-indigo-100 max-w-lg">
                Discover our curated selection of high-performance laptops with local warranty, expert support, and flexible payment options.
              </p>

              {/* Feature highlights */}
              <div className="mb-8 grid grid-cols-2 gap-3 max-w-lg mx-auto md:mx-0">
                {['Local warranty', 'Expert support', 'Fast delivery', 'Easy returns'].map((feature, index) => (
                  <div key={index} className="flex items-center text-indigo-100">
                    <div className="bg-indigo-500/30 p-1 rounded-full mr-2">
                      <svg className="w-3 h-3 text-indigo-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <Link
                  to="/catalog"
                  className="bg-white text-indigo-800 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition-all duration-300 shadow-lg transform hover:-translate-y-1 hover:shadow-xl flex items-center"
                >
                  <ShoppingCartIcon className="h-5 w-5 mr-2" />
                  Shop Now
                </Link>
                <Link
                  to="/catalog"
                  className="bg-transparent border-2 border-indigo-300 text-white px-8 py-3 rounded-lg font-medium hover:bg-indigo-800 hover:border-indigo-200 transition-all duration-300 transform hover:-translate-y-1 flex items-center"
                >
                  Browse Catalog
                  <ChevronRightIcon className="h-5 w-5 ml-2" />
                </Link>
              </div>
            </div>

            {/* Right side - laptop showcase */}
            <div className="md:w-1/2 mt-8 md:mt-0 relative">
              <div className="relative z-10">
                <div className="relative bg-gradient-to-br from-indigo-600/20 to-purple-600/20 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-indigo-500/20 transform rotate-1 hover:rotate-0 transition-all duration-500">
                  <img 
                    src={manylap} 
                    alt="Premium Laptop Showcase" 
                    className="w-full h-auto object-contain rounded-lg transform transition-all duration-500 hover:scale-105"
                  />
                  <div className="absolute -top-4 -right-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-sm font-bold rounded-full w-16 h-16 flex items-center justify-center transform rotate-12 shadow-lg">
                    <div>
                      <div className="text-xs">Up to</div>
                      <div className="text-xl">10%</div>
                      <div className="text-xs">OFF</div>
                    </div>
                  </div>
                </div>

                {/* Decorative extras */}
                <div className="absolute -bottom-8 -left-10 w-32 h-auto bg-gradient-to-br from-blue-600/20 to-indigo-600/20 backdrop-blur-md rounded-lg p-2 shadow-xl border border-blue-500/20 transform -rotate-6 hover:rotate-0 transition-all duration-500">
                  <img 
                    src={ASUS} 
                    alt="Laptop Model" 
                    className="w-full h-auto object-contain rounded"
                  />
                </div>
              </div>

              {/* Glow background */}
              <div className="absolute inset-0 bg-indigo-500 rounded-full filter blur-3xl opacity-20 transform scale-95 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className={`${isDarkMode ? 'text-gray-900' : 'text-gray-50'}`}>
        <svg viewBox="0 0 1440 120" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
        </svg>
      </div>
      
    </section>

      {/* Featured Products */}
      <section className="px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-indigo-400 rounded-full blur-md opacity-30"></div>
                <SparklesIcon className="h-6 w-6 text-indigo-500 relative" />
              </div>
              <div className="mb-10 relative inline-block">
              <h2 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-indigo-300 via-purple-300 to-blue-300' 
                  : 'from-indigo-600 via-purple-600 to-blue-600'
              }`}>
                Featured Products
              </h2>
              
              {/* Short Underline with Gradient */}
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"></span>
            </div>
            </div>
            <Link to="/catalog" className="text-indigo-500 flex items-center text-sm font-medium group">
              View All <ChevronRightIcon className="h-4 w-4 ml-1 group-hover:ml-2 transition-all duration-300" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.slice(0, 4).map((product) => (
              <HomeProductCard
                key={product.id}
                product={product}
                isDarkMode={isDarkMode}
                toggleWishlist={toggleWishlist}
                isInWishlist={isInWishlist}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Animate Category Row */}
        <section className="relative py-6 px-4">
          {/* Main Container with Rounded Border */}
          <div className={`container mx-auto relative z-10 rounded-2xl overflow-hidden 
            ${isDarkMode 
              ? 'border border-gray-700 bg-gray-900/50' 
              : 'border border-gray-200 bg-gray-50/50'
            } shadow-lg p-8`}
          >
            {/* Decorative Background Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Large Blurred Circle - Top Left */}
              <div 
                className={`absolute -top-20 -left-20 w-64 h-64 rounded-full blur-3xl opacity-10 ${
                  isDarkMode ? 'bg-indigo-600' : 'bg-indigo-400'
                }`}
              ></div>
              
              {/* Medium Circle - Bottom Right */}
              <div 
                className={`absolute bottom-0 right-20 w-48 h-48 rounded-full blur-xl opacity-10 ${
                  isDarkMode ? 'bg-purple-600' : 'bg-purple-400'
                }`}
              ></div>
              
              {/* Small Circle - Center Left */}
              <div 
                className={`absolute top-1/2 left-10 w-24 h-24 rounded-full blur-lg opacity-10 ${
                  isDarkMode ? 'bg-blue-600' : 'bg-blue-400'
                }`}
              ></div>
            </div>
            
            {/* Section Header with Gradient and Underline */}
            <div className="mb-10 relative inline-block">
              <h2 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-indigo-300 via-purple-300 to-blue-300' 
                  : 'from-indigo-600 via-purple-600 to-blue-600'
              }`}>
                Browse Categories
              </h2>
              
              {/* Short Underline with Gradient */}
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"></span>
            </div>
            
            {/* Categories Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {categories.map((category, index) => (
                <Link
                  key={category.name}
                  to={`/catalog?category=${category.name.toLowerCase()}`}
                  className={`flex flex-col items-center justify-center rounded-lg p-4 text-center transition-all duration-300 transform hover:scale-105 ${
                    isDarkMode
                      ? 'bg-gray-800 hover:bg-gray-700 text-gray-200'
                      : 'bg-white hover:bg-indigo-50 text-gray-800'
                  } shadow-md group h-28 relative overflow-hidden`}
                >
                  {/* Category Card Gradient Overlay on Hover */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${
                      index % 3 === 0
                        ? 'from-indigo-500 to-purple-500'
                        : index % 3 === 1
                        ? 'from-purple-500 to-blue-500'
                        : 'from-blue-500 to-indigo-500'
                    } opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                  ></div>
                  
                  {/* Small Decorative Circle Inside Card */}
                  <div className={`absolute -bottom-6 -right-6 w-12 h-12 rounded-full opacity-5 ${
                    isDarkMode ? 'bg-gray-400' : 'bg-indigo-400'
                  }`}></div>
                  
                  {/* Icon */}
                  <div className="mb-2 text-xl relative transform transition-transform duration-300 group-hover:scale-110">
                    {category.icon}
                  </div>
                  
                  {/* Category Name */}
                  <span className="text-sm font-medium relative">
                    {category.name}
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-indigo-400 to-purple-400 transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100"></span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

      {/* Why Shop With Us */}
      <section className="px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto">
            <div className="mb-10 relative inline-block">
              <h2 className={`text-2xl md:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                isDarkMode 
                  ? 'from-indigo-300 via-purple-300 to-blue-300' 
                  : 'from-indigo-600 via-purple-600 to-blue-600'
              }`}>
                Why Choose Us
              </h2>
              
              {/* Short Underline with Gradient */}
              <span className="absolute -bottom-1 left-0 w-16 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"></span>
            </div>
          <p className={`max-w-xl mx-auto text-center mb-12 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            We're committed to providing the best technology shopping experience with quality products and exceptional service.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div
              className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
              <div
                className={`${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} p-4 rounded-full inline-flex items-center justify-center mb-6 relative group-hover:shadow-md transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-indigo-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <ShieldCheckIcon className="h-8 w-8 text-indigo-500 relative z-10" />
              </div>
              <h3 className="font-bold text-xl mb-4 group-hover:text-indigo-500 transition-colors duration-300">Quality Guarantee</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                All laptops come with verified quality checks and local warranty support for your peace of mind.
              </p>
              <Link to="/about" className={`inline-flex items-center mt-6 font-medium group ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                <span>Learn More</span>
                <ChevronRightIcon className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            <div
              className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500 to-purple-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500 opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
              <div
                className={`${isDarkMode ? 'bg-purple-900' : 'bg-purple-100'} p-4 rounded-full inline-flex items-center justify-center mb-6 relative group-hover:shadow-md transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-purple-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <CurrencyDollarIcon className="h-8 w-8 text-purple-500 relative z-10" />
              </div>
              <h3 className="font-bold text-xl mb-4 group-hover:text-purple-500 transition-colors duration-300">Best Price Promise</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                We offer competitive pricing with regular deals and price-matching to ensure you get the best value.
              </p>
              <Link to="/deals" className={`inline-flex items-center mt-6 font-medium group ${isDarkMode ? 'text-purple-400' : 'text-purple-600'}`}>
                <span>View Deals</span>
                <ChevronRightIcon className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>

            <div
              className={`p-8 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative overflow-hidden group`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500 opacity-10 rounded-full transform translate-x-10 -translate-y-10"></div>
              <div
                className={`${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} p-4 rounded-full inline-flex items-center justify-center mb-6 relative group-hover:shadow-md transition-all duration-300`}
              >
                <div className="absolute inset-0 bg-blue-500 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <TruckIcon className="h-8 w-8 text-blue-500 relative z-10" />
              </div>
              <h3 className="font-bold text-xl mb-4 group-hover:text-blue-500 transition-colors duration-300">Fast Delivery</h3>
              <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                Same-day delivery available for local orders placed before 2PM, with tracking on all shipments.
              </p>
              <Link to="/shipping" className={`inline-flex items-center mt-6 font-medium group ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`}>
                <span>Shipping Info</span>
                <ChevronRightIcon className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div
            className={`rounded-2xl overflow-hidden shadow-xl relative ${
              isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-indigo-600 to-purple-700'
            }`}
          >
            <div className="absolute top-0 right-0 -mt-12 -mr-12 w-64 h-64 rounded-full bg-white opacity-5"></div>
            <div className="absolute top-0 left-1/3 -mt-6 w-32 h-32 rounded-full bg-white opacity-5"></div>
            <div className="absolute bottom-0 left-0 -mb-12 -ml-12 w-64 h-64 rounded-full bg-white opacity-5"></div>
            <div
              className="absolute bottom-0 right-1/4 -mb-8 w-48 h-48 rounded-full bg-white opacity-5 animate-pulse"
              style={{ animationDuration: '6s' }}
            ></div>

            <div className="relative p-8 md:p-12">
              <div className="relative flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="md:w-1/2 text-center md:text-left">
                  <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">Join Our Tech Community</h3>
                  <p className="mb-2 text-indigo-100">Get exclusive deals, tech tips, and early access to new products!</p>
                  <p className="text-sm text-indigo-200 mb-6">Join 5,000+ tech enthusiasts who get our weekly newsletter.</p>
                </div>
                <div className="md:w-1/2 w-full">
                  <div className="flex flex-col sm:flex-row gap-3 relative">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-white shadow-inner backdrop-blur-sm"
                    />
                    <button
                      className="px-6 py-3 rounded-lg font-medium transition-all duration-300 bg-indigo-800 text-white hover:bg-indigo-900 shadow-lg transform hover:-translate-y-1 hover:shadow-xl relative overflow-hidden group"
                    >
                      <span className="relative z-10">Subscribe</span>
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                  </div>
                  <p className="mt-3 text-xs text-indigo-200 text-center sm:text-left">We respect your privacy. Unsubscribe anytime.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .bg-gray-750 {
          background-color: #2a2d3a;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.2;
          }
          50% {
            opacity: 0.3;
          }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.05); }
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .animate-pulse {
          animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default Home;
