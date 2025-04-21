import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useWishlist from '../hooks/useWishlist';
import { 
  ClockIcon,
  FireIcon,
  SparklesIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

// DealProductCard component with wishlist toggle
const DealProductCard = ({ product, isDarkMode, toggleWishlist, isInWishlist }) => {
  return (
    <div className={`rounded-xl overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg hover:shadow-xl transform hover:-translate-y-2`}>
      <div className="relative">
        <div className="absolute w-40 h-40 rounded-full bg-indigo-500 opacity-5 -top-20 -right-20"></div>
        <div className="absolute w-40 h-40 rounded-full bg-purple-500 opacity-5 -bottom-20 -left-20"></div>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Deals = () => {
  const { products } = useProducts('All');
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [featuredDeals, setFeaturedDeals] = useState([]);
  const [flashDeals, setFlashDeals] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 5, minutes: 45, seconds: 30 });

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Filter deals from products
  useEffect(() => {
    if (products.length > 0) {
      const deals = products.filter(product => product.discount && product.discount > 0);
      setFeaturedDeals(deals.slice(0, 6));
      setFlashDeals(deals.slice(6, 12));
    }
  }, [products]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        let { hours, minutes, seconds } = prevTime;
        if (seconds > 0) seconds--;
        else {
          seconds = 59;
          if (minutes > 0) minutes--;
          else {
            minutes = 59;
            if (hours > 0) hours--;
            else {
              hours = 5;
              minutes = 45;
              seconds = 30;
            }
          }
        }
        return { hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Toggle wishlist function
  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  return (
    <div className={`min-h-screen pb-16 ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} relative overflow-hidden`}>
      {/* Background Faded Circles */}
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

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-900 py-20 px-4">
          <div className="max-w-7xl mx-auto relative">
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
              <div className="md:w-1/2 text-center md:text-left">
                <div className="inline-block px-4 py-1 rounded-full bg-purple-700 text-purple-100 text-sm font-medium mb-6">
                  Limited Time Offers
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  Unbeatable <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">Deals & Discounts</span> on Premium Tech
                </h1>
                <p className="text-lg mb-8 text-indigo-100 max-w-lg">
                  Discover exclusive offers on our top-rated laptops and accessories.
                </p>
                <a href="#featured-deals" className="bg-white text-indigo-800 px-8 py-3 rounded-lg font-medium hover:bg-indigo-50 transition duration-200 shadow-lg">
                  See Deals
                </a>
              </div>
              <div className="md:w-1/2 relative">
                <div className="relative p-6 rounded-xl shadow-2xl bg-white dark:bg-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <FireIcon className="h-6 w-6 text-red-500 mr-2" />
                      <h3 className="text-xl font-bold">Flash Sale Ends In:</h3>
                    </div>
                    <span className={`px-3 py-1 text-xs font-semibold rounded-full ${isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
                      Today Only!
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className={`flex flex-col items-center justify-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                      <span className="text-3xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</span>
                      <span className="text-xs uppercase mt-1">Hours</span>
                    </div>
                    <div className={`flex flex-col items-center justify-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                      <span className="text-3xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</span>
                      <span className="text-xs uppercase mt-1">Minutes</span>
                    </div>
                    <div className={`flex flex-col items-center justify-center p-4 rounded-lg ${isDarkMode ? 'bg-gray-700' : 'bg-indigo-50'}`}>
                      <span className="text-3xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</span>
                      <span className="text-xs uppercase mt-1">Seconds</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Deals Section */}
      <section id="featured-deals" className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div className="flex items-center gap-3">
              <SparklesIcon className="h-6 w-6 text-indigo-500" />
              <h2 className="text-2xl font-bold">Featured Deals</h2>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {featuredDeals.length > 0 ? (
              featuredDeals.map((product) => (
                <DealProductCard 
                  key={product.id} 
                  product={product} 
                  isDarkMode={isDarkMode}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                />
              ))
            ) : (
              <p className={`text-center col-span-3 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No featured deals available.</p>
            )}
          </div>
        </div>
      </section>

      {/* Flash Deals Section */}
      <section className={`px-4 py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <FireIcon className="h-6 w-6 text-red-500" />
            <h2 className="text-2xl font-bold">Flash Deals</h2>
            <div className={`ml-4 px-3 py-1 text-xs font-medium rounded-full flex items-center ${isDarkMode ? 'bg-red-900 text-red-200' : 'bg-red-100 text-red-800'}`}>
              <ClockIcon className="h-4 w-4 mr-1" />
              Limited Time
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {flashDeals.length > 0 ? (
              flashDeals.map((product) => (
                <DealProductCard 
                  key={product.id} 
                  product={product} 
                  isDarkMode={isDarkMode}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                />
              ))
            ) : (
              <p className={`text-center col-span-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>No flash deals available.</p>
            )}
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-gray-750 { background-color: #2a2d3a; }
      `}</style>
    </div>
  );
};

export default Deals;