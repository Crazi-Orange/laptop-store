import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProducts from '../hooks/useProducts';
import useWishlist from '../hooks/useWishlist';
import {
  ChevronLeftIcon,
  ShoppingCartIcon,
  HeartIcon,
  ShareIcon,
  CheckIcon,
  TruckIcon,
  ShieldCheckIcon,
  StarIcon,
} from '@heroicons/react/24/outline';

// Enhanced Product Card for Similar Products
const EnhancedProductCard = ({ product, isDarkMode, toggleWishlist, isInWishlist }) => {
  return (
    <div
      className={`group rounded-xl overflow-hidden shadow-md transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl relative ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className="relative">
        <div className="absolute w-40 h-40 rounded-full bg-indigo-500 opacity-5 -top-20 -right-20"></div>
        <div className="absolute w-40 h-40 rounded-full bg-purple-500 opacity-5 -bottom-20 -left-20"></div>
        <div className={`p-4 ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'}`}>
          <img
            src={product.image || '/api/placeholder/150/100'}
            alt={product.name}
            className="w-full h-32 object-contain mx-auto transition-all duration-500 hover:scale-105"
            onError={(e) => (e.target.src = '/api/placeholder/150/100')}
          />
        </div>
        <div className="p-4">
          <h3 className="font-medium text-sm mb-1 truncate">{product.name}</h3>
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="h-3 w-3 fill-current" />
              ))}
            </div>
            <span className={`ml-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(24)</span>
          </div>
          <div className="flex justify-between items-center">
            <div className="font-bold">GHS {product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}</div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

// Image Skeleton Component
const ImageSkeleton = ({ className }) => (
  <div
    className={`bg-gray-300 ${className}`}
  ></div>
);


const ProductDetail = () => {
  const { id } = useParams();
  const { products } = useProducts('All');
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const product = products.find((p) => p.id === id);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [selectedImage, setSelectedImage] = useState(0);
  const [imageLoading, setImageLoading] = useState(true);

  // Detect system preference for dark mode
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Scroll to top when product ID changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id]);

  const toggleWishlist = (productId) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(productId);
    }
  };

  const CircleDecoration = ({ className }) => (
    <div className={`absolute rounded-full opacity-10 ${className}`}></div>
  );

  if (!product) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'
        }`}
      >
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link
            to="/catalog"
            className="inline-block px-6 py-3 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-700 transition-all duration-300"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const productImages = [
    product.image || '/api/placeholder/300/200',
    product.image?.replace('.jpg', '-alt1.jpg') || '/api/placeholder/300/200',
    product.image?.replace('.jpg', '-alt2.jpg') || '/api/placeholder/300/200',
  ];

  return (
    <div
      className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-800'} relative overflow-hidden pb-16`}
    >
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

      <div className="max-w-7xl mx-auto px-4 py-4 relative z-10">
        <div className="flex items-center text-sm">
          <Link
            to="/"
            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors duration-200`}
          >
            Home
          </Link>
          <ChevronLeftIcon className="h-4 w-4 mx-2 transform rotate-180" />
          <Link
            to="/catalog"
            className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-600 hover:text-gray-800'} transition-colors duration-200`}
          >
            Catalog
          </Link>
          <ChevronLeftIcon className="h-4 w-4 mx-2 transform rotate-180" />
          <span className={`${isDarkMode ? 'text-gray-200' : 'text-gray-800'} font-medium`}>{product.name}</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="relative">
            <div
              className={`rounded-xl overflow-hidden relative ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500 opacity-5 rounded-full transform translate-x-10 -translate-y-10"></div>
              <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500 opacity-5 rounded-full transform -translate-x-10 translate-y-10"></div>
              <div className="relative aspect-w-16 aspect-h-9 overflow-hidden rounded-lg">
                <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                  <div className={`absolute inset-0 ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                    <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
                  </div>
                  {imageLoading && <ImageSkeleton className="w-full h-full rounded-lg" />}
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    style={{ minHeight: '320px' }}
                    className={`object-contain w-full h-full max-h-80 relative z-10 transition-opacity duration-500 ${
                      imageLoading ? 'opacity-0' : 'opacity-100'
                    }`}
                    onLoad={() => setImageLoading(false)}
                    onError={(e) => {
                      e.target.src = '/api/placeholder/300/200';
                      setImageLoading(false);
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-center gap-4">
              {productImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedImage(index);
                    setImageLoading(true);
                  }}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                    selectedImage === index
                      ? `ring-2 ${isDarkMode ? 'ring-indigo-400' : 'ring-indigo-500'} transform scale-105`
                      : `${isDarkMode ? 'bg-gray-800' : 'bg-white'} opacity-70 hover:opacity-100`
                  } shadow-md`}
                >
                  {imageLoading && selectedImage === index ? (
                    <ImageSkeleton className="w-full h-full rounded-lg" />
                  ) : (
                    <img
                      src={img}
                      alt={`${product.name} view ${index + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => (e.target.src = '/api/placeholder/300/200')}
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="mb-6">
              <div
                className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                  isDarkMode ? 'bg-indigo-800 text-indigo-200' : 'bg-indigo-100 text-indigo-800'
                }`}
              >
                In Stock
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold relative inline-block">
                {product.name}
                <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
              </h1>
              <div className="flex items-center mt-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="h-5 w-5 fill-current" />
                  ))}
                </div>
                <span className={`ml-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>(42 reviews)</span>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex items-baseline">
                <span className="text-3xl font-bold mr-3">
                  GHS {product.salePrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
                {product.originalPrice && product.originalPrice > product.salePrice && (
                  <span className={`text-lg line-through ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                    GHS {product.originalPrice.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                  </span>
                )}
                {product.discount && product.discount > 0 && (
                  <span className="ml-3 text-sm px-2 py-1 rounded bg-green-100 text-green-800 font-medium">
                    Save {product.discount}%
                  </span>
                )}
              </div>
            </div>

            <div
              className={`p-6 rounded-xl mb-6 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-md relative overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-5"></div>
              <h3 className="text-lg font-medium mb-4 relative inline-block">
                Product Specifications
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
              </h3>
              <div className="space-y-3">
                <div className="flex items-start">
                  <CheckIcon
                    className={`h-5 w-5 mr-2 flex-shrink-0 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                  />
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Features:</span>{' '}
                    {product.features ? product.features.join(', ') : 'Not specified'}
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckIcon
                    className={`h-5 w-5 mr-2 flex-shrink-0 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                  />
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Condition:</span> {product.condition || 'New'}
                  </p>
                </div>
                <div className="flex items-start">
                  <CheckIcon
                    className={`h-5 w-5 mr-2 flex-shrink-0 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`}
                  />
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    <span className="font-medium">Warranty:</span> 1 Year Local Warranty
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href={`https://wa.me/?text=I'm interested in ${encodeURIComponent(product.name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-white opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
                  <ShoppingCartIcon className="h-5 w-5" />
                  <span>Buy on WhatsApp</span>
                </a>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg relative overflow-hidden group ${
                    isDarkMode ? 'bg-gray-800 text-white border border-gray-700' : 'bg-white text-gray-800 border border-gray-200'
                  }`}
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-10 transition-opacity duration-300"></span>
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
                  <span>{isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
              <button
                className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                  isDarkMode
                    ? 'bg-gray-800 text-white border border-gray-700 hover:bg-gray-700'
                    : 'bg-white text-gray-800 border border-gray-200 hover:bg-gray-50'
                }`}
              >
                <ShareIcon className="h-5 w-5" />
                <span>Share Product</span>
              </button>
            </div>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                  <TruckIcon className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
                <div>
                  <p className="font-medium">Free Delivery</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>2-3 business days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                  <ShieldCheckIcon className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'}`} />
                </div>
                <div>
                  <p className="font-medium">Warranty Included</p>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    12 months manufacturer warranty
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 relative z-10">
        <div
          className={`rounded-xl p-8 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg relative overflow-hidden`}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-purple-500 opacity-5"></div>
          <h2 className="text-2xl font-bold mb-6 relative inline-block">
            About This Product
            <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
          </h2>
          <div
            className={`prose max-w-none ${isDarkMode ? 'text-gray-300 prose-headings:text-gray-100' : 'text-gray-700 prose-headings:text-gray-900'}`}
          >
            <p>
              Experience premium performance with the {product.name}. This powerful laptop is designed for{' '}
              {product.condition === 'New' ? 'professionals and enthusiasts' : 'budget-conscious buyers'} who need
              reliable computing capabilities.
            </p>
            <p className="mt-4">
              With {product.features ? product.features.join(', ') : 'advanced specifications'}, this laptop delivers
              exceptional speed and responsiveness for all your computing needs. Whether you're working on demanding
              projects, enjoying multimedia content, or gaming, this device provides a smooth and responsive experience.
            </p>
            <h3 className="text-xl font-medium mt-6 mb-3">Key Features:</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>Powerful performance with advanced processor</li>
              <li>Ample memory and storage for multitasking and file storage</li>
              <li>Vibrant display for immersive viewing experience</li>
              <li>Enhanced graphics capabilities for content creation and gaming</li>
              <li>Extended battery life for all-day productivity</li>
            </ul>
            <p className="mt-6">
              Backed by our comprehensive warranty and dedicated customer support, the {product.name} offers peace of mind
              with your purchase.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 mt-16 relative z-10">
        <h2 className="text-2xl font-bold mb-8 relative inline-block">
          Similar Products
          <span className="absolute bottom-0 left-0 w-1/3 h-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full"></span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products
            .filter((p) => p.id !== product.id && p.category === product.category)
            .slice(0, 4)
            .map((similarProduct) => (
              <Link key={similarProduct.id} to={`/product/${similarProduct.id}`} className="block">
                <EnhancedProductCard
                  product={similarProduct}
                  isDarkMode={isDarkMode}
                  toggleWishlist={toggleWishlist}
                  isInWishlist={isInWishlist}
                />
              </Link>
            ))}
          {products.filter((p) => p.id !== product.id && p.category === product.category).length === 0 && (
            <p className={`text-center col-span-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
              No similar products available.
            </p>
          )}
        </div>
      </div>

      <style jsx>{`
        .bg-grid-pattern {
          background-image: linear-gradient(to right, rgba(99, 102, 241, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.05) 1px, transparent 1px);
          background-size: 20px 20px;
        }
        .bg-gray-750 {
          background-color: #2a2d3a;
        }
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
};

export default ProductDetail;