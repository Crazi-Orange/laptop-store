import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Bars3Icon,
  XMarkIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { ComputerDesktopIcon } from '@heroicons/react/24/solid';
import useWishlist from '../hooks/useWishlist';

const Header = () => {
  const location = useLocation();
  const { wishlist } = useWishlist();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const isActive = (path) => {
    return location.pathname === path;
  };

  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Shop', href: '/catalog' },
    { name: 'Deals', href: '/deals' },
    { name: 'About', href: '/about' },
  ];

  return (
    <header 
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-white text-gray-800'
      } ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}
    >
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 justify-between items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center gap-2 text-xl font-bold">
                  <div className={`p-1 rounded-md ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                    <ComputerDesktopIcon className="h-6 w-6 text-indigo-500" />
                  </div>
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">HUB64</span>
                </Link>
              </div>
              <nav className="hidden md:ml-8 md:flex md:space-x-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={`relative inline-flex items-center px-1 py-2 text-sm font-medium transition duration-200 ${
                      isActive(item.href) 
                        ? `${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-indigo-500` 
                        : `${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-700 hover:text-indigo-600'}`
                    }`}
                  >
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>

            <div className="flex items-center gap-1 md:gap-3">
              <div className="hidden md:flex items-center gap-3">
                <Link
                  to="/wishlist"
                  className={`relative inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium shadow-sm transition duration-200 ${
                    isDarkMode 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                  }`}
                >
                  <HeartIcon className="h-4 w-4 mr-2" />
                  Wishlist
                  {wishlist.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlist.length}
                    </span>
                  )}
                </Link>
              </div>
              <button
                type="button"
                className={`inline-flex items-center justify-center rounded-md p-2 md:hidden ${
                  isDarkMode 
                    ? 'text-gray-300 hover:bg-gray-800 hover:text-white' 
                    : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600'
                }`}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Toggle mobile menu"
              >
                <span className="sr-only">Open menu</span>
                {mobileMenuOpen ? (
                  <XMarkIcon className="h-6 w-6" />
                ) : (
                  <Bars3Icon className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className={`md:hidden absolute w-full shadow-lg animate-fadeIn ${
            isDarkMode ? 'bg-gray-800' : 'bg-white'
          }`}>
            <div className="space-y-1 pb-4 pt-2 px-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center py-3 px-2 text-base font-medium rounded-md transition duration-200 ${
                    isActive(item.href) 
                      ? isDarkMode 
                        ? 'text-indigo-400 bg-gray-700' 
                        : 'text-indigo-600 bg-indigo-50'
                      : isDarkMode
                        ? 'text-gray-300 hover:bg-gray-700 hover:text-indigo-400'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="mt-2">
                <Link
                  to="/wishlist"
                  className={`w-full flex items-center justify-center py-3 rounded-lg font-medium ${
                    isDarkMode 
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HeartIcon className="h-5 w-5 mr-2" />
                  Wishlist {wishlist.length > 0 && `(${wishlist.length})`}
                </Link>
              </div>

            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;