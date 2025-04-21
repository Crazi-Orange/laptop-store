import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPinIcon,
  EnvelopeIcon,
  PhoneIcon,
  ChevronUpIcon
} from '@heroicons/react/24/outline';
import {
  ComputerDesktopIcon
} from '@heroicons/react/24/solid';
import { AuthContext } from '../context/AuthContext';

const Footer = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const { isAuthenticated } = useContext(AuthContext);
  
  // Detect system preference for dark mode
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);
  
    // Determine admin link based on auth status
  const adminLink = isAuthenticated ? '/admin/dashboard' : '/admin/login';


  // Handle scroll for back to top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  const footerLinks = [
    {
      title: 'Shop',
      links: [
        { name: 'All Products', href: '/catalog' },
        { name: 'Student Deals', href: '/student-laptops' },
        { name: 'Business Laptops', href: '/business-laptops' },
        { name: 'Gaming Laptops', href: '/gaming-laptops' },
        { name: 'Accessories', href: '/accessories' },
      ]
    },
  ];
  
  const socialLinks = [
    { name: 'Facebook', href: '#', icon: 'M19,3H5C3.895,3,3,3.895,3,5v14c0,1.105,0.895,2,2,2h7.621v-6.961h-2.343v-2.725h2.343V9.309 c0-2.324,1.421-3.591,3.495-3.591c0.699-0.002,1.397,0.034,2.092,0.105v2.43h-1.428c-1.13,0-1.35,0.534-1.35,1.322v1.735h2.7 l-0.351,2.725h-2.365V21H19c1.105,0,2-0.895,2-2V5C21,3.895,20.105,3,19,3z' },
    { name: 'Twitter', href: '#', icon: 'M22,5.8a8.6,8.6,0,0,1-2.36.65,4.07,4.07,0,0,0,1.8-2.27,8.1,8.1,0,0,1-2.6,1,4.1,4.1,0,0,0-7,3.74A11.64,11.64,0,0,1,3,4.9a4.16,4.16,0,0,0-.55,2.07,4.09,4.09,0,0,0,1.82,3.41,4.05,4.05,0,0,1-1.86-.51v0A4.11,4.11,0,0,0,5.72,14a4.2,4.2,0,0,1-1.08.14,3.69,3.69,0,0,1-.77-.07A4.11,4.11,0,0,0,7.57,17.2a8.22,8.22,0,0,1-5.08,1.76A7.93,7.93,0,0,1,1.53,19,11.57,11.57,0,0,0,8,21,11.59,11.59,0,0,0,19.74,9.5c0-.18,0-.35,0-.53A8.43,8.43,0,0,0,22,6.8Z' },
    { name: 'Instagram', href: '#', icon: 'M12,7a5,5,0,1,0,5,5A5,5,0,0,0,12,7Zm0,8a3,3,0,1,1,3-3A3,3,0,0,1,12,15Zm6-8.5a1.5,1.5,0,1,1-1.5-1.5A1.5,1.5,0,0,1,18,6.5ZM21.94,8a5.32,5.32,0,0,0-.33-1.8A3.8,3.8,0,0,0,20.37,5a3.93,3.93,0,0,0-1.77-.75A10.44,10.44,0,0,0,12,4,10.26,10.26,0,0,0,5.4,4.2,3.93,3.93,0,0,0,3.63,5a3.8,3.8,0,0,0-1.24,1.2A5.32,5.32,0,0,0,2.06,8,21.07,21.07,0,0,0,2,12a21.07,21.07,0,0,0,.06,4,5.32,5.32,0,0,0,.33,1.8A3.8,3.8,0,0,0,3.63,19a3.89,3.89,0,0,0,1.77.74A10.44,10.44,0,0,0,12,20a10.44,10.44,0,0,0,6.6-.26A3.89,3.89,0,0,0,20.37,19a3.8,3.8,0,0,0,1.24-1.2,5.32,5.32,0,0,0,.33-1.8A21.07,21.07,0,0,0,22,12,21.07,21.07,0,0,0,21.94,8ZM19.74,15.6a3.12,3.12,0,0,1-.77,1.12,3,3,0,0,1-1.12.74A9.11,9.11,0,0,1,12,18a9.11,9.11,0,0,1-5.85-.54A3,3,0,0,1,5,16.72a3.12,3.12,0,0,1-.77-1.12A9.09,9.09,0,0,1,4,9.61a9.09,9.09,0,0,1,.18-5.88A3.12,3.12,0,0,1,5,2.61,3,3,0,0,1,6.15,1.87a9.11,9.11,0,0,1,5.85-.54,9.11,9.11,0,0,1,5.85.54A3,3,0,0,1,19,2.61a3.12,3.12,0,0,1,.77,1.12,9.09,9.09,0,0,1,.54,5.88A9.09,9.09,0,0,1,19.74,15.6Z' },
    { name: 'LinkedIn', href: '#', icon: 'M20.5,3.8c-0.3-0.2-0.8-0.3-1.3-0.3H4.9c-0.5,0-1,0.1-1.3,0.3C3.2,4,3,4.3,3,4.7v14.7c0,0.3,0.2,0.6,0.5,0.8c0.3,0.2,0.8,0.3,1.3,0.3 h14.3c0.5,0,1-0.1,1.3-0.3c0.3-0.2,0.5-0.5,0.5-0.8V4.7C21,4.3,20.8,4,20.5,3.8z M8.7,18.6H6V10h2.8V18.6z M7.3,8.9 c-0.9,0-1.6-0.7-1.6-1.6c0-0.9,0.7-1.6,1.6-1.6c0.9,0,1.6,0.7,1.6,1.6C8.9,8.2,8.2,8.9,7.3,8.9z M18.6,18.6h-2.8v-4.3 c0-1,0-2.3-1.4-2.3c-1.4,0-1.6,1.1-1.6,2.2v4.4H10V10h2.7v1.2h0c0.4-0.7,1.2-1.4,2.5-1.4c2.7,0,3.2,1.8,3.2,4.1V18.6z' },
    { name: 'YouTube', href: '#', icon: 'M21.593,7.203c-0.23-0.858-0.905-1.535-1.762-1.766C18.265,5.007,12,5,12,5S5.736,4.993,4.169,5.404c-0.84,0.229-1.534,0.921-1.766,1.778c-0.413,1.566-0.417,4.814-0.417,4.814s-0.004,3.264,0.406,4.814c0.23,0.857,0.905,1.534,1.763,1.765c1.582,0.43,7.83,0.437,7.83,0.437s6.265,0.007,7.831-0.403c0.856-0.23,1.534-0.906,1.767-1.763C21.997,15.281,22,12.034,22,12.034S22.02,8.769,21.593,7.203z M9.996,15.005l0.005-6l5.207,3.005L9.996,15.005z' },
  ];

  // Add decorative circle elements
  const CircleDecoration = ({ className }) => (
    <div className={`absolute rounded-full opacity-10 ${className}`}></div>
  );

  return (
    <footer className={`${
      isDarkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gradient-to-b from-gray-50 to-gray-100 text-gray-800'
    } relative overflow-hidden`}>
      {/* Decorative Circles for Light/Dark Mode */}
      {isDarkMode ? (
        <>
          <CircleDecoration className="bg-indigo-700 w-64 h-64 -top-20 -left-20" />
          <CircleDecoration className="bg-purple-700 w-96 h-96 -bottom-40 -right-20" />
          <CircleDecoration className="bg-indigo-500 w-40 h-40 top-40 right-20" />
        </>
      ) : (
        <>
          <CircleDecoration className="bg-indigo-500 w-64 h-64 -top-20 -left-20" />
          <CircleDecoration className="bg-purple-500 w-96 h-96 -bottom-40 -right-20" />
          <CircleDecoration className="bg-indigo-300 w-40 h-40 top-40 right-20" />
        </>
      )}
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 relative">
            <Link to="/" className="flex items-center gap-2 text-xl font-bold mb-6">
              <div className={`p-1 rounded-md ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'}`}>
                <ComputerDesktopIcon className="h-6 w-6 text-indigo-500" />
              </div>
              <span className="bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">HUB64</span>
            </Link>
            <p className={`mb-6 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Your trusted source for premium laptops and tech accessories. We provide quality products with excellent customer service.
            </p>
            
            {/* Contact Info with enhanced design */}
            <div className="space-y-4 relative">
              {/* Subtle background glow for address section */}
              <div className="absolute w-full h-full bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-2xl -z-10" />
              
              <div className="flex items-start p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10">
                <MapPinIcon className={`h-5 w-5 mt-0.5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} flex-shrink-0`} />
                <p className={`ml-3 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  GPS: GM-169-5820<br />
                  Adenta,Accra
                </p>
              </div>
              <div className="flex items-center p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10">
                <EnvelopeIcon className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} flex-shrink-0`} />
                <a href="mailto:info@hub64.com" className={`ml-3 hover:underline ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}`}>
                  info@hub64.com
                </a>
              </div>
              <div className="flex items-center p-4 rounded-xl transition-all duration-300 hover:bg-gradient-to-r hover:from-indigo-500/10 hover:to-purple-500/10">
                <PhoneIcon className={`h-5 w-5 ${isDarkMode ? 'text-indigo-400' : 'text-indigo-600'} flex-shrink-0`} />
                <a href="tel:+14155550123" className={`ml-3 hover:underline ${isDarkMode ? 'text-gray-300 hover:text-indigo-400' : 'text-gray-600 hover:text-indigo-600'}`}>
                  (233) 59-176-5036
                </a>
              </div>
            </div>
          </div>
          
          {/* Links Columns with enhanced design */}
          {footerLinks.map((column) => (
            <div key={column.title} className="relative">
              {/* Subtle radial gradient background for shop section */}
              <div className="absolute inset-0 bg-radial-gradient rounded-2xl opacity-5 -z-10" />
              
              <h3 className="font-bold text-lg mb-5 relative">
                <span className="relative z-10 bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">{column.title}</span>
                <span className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full"></span>
              </h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link 
                      to={link.href} 
                      className={`hover:underline transition duration-200 flex items-center p-2 rounded-lg hover:bg-gradient-to-r ${
                        isDarkMode 
                          ? 'text-gray-300 hover:text-indigo-400 hover:from-indigo-900/30 hover:to-purple-900/30' 
                          : 'text-gray-600 hover:text-indigo-600 hover:from-indigo-100 hover:to-purple-100'
                      }`}
                    >
                      <span className="w-1 h-1 rounded-full bg-indigo-500 mr-2 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></span>
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className={`${
        isDarkMode 
          ? 'bg-gray-950' 
          : 'bg-white'
      } py-6 relative z-10`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-center md:text-left">
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>
                &copy; {new Date().getFullYear()} HUB64. All rights reserved.
              </p>
              <div className="flex flex-wrap gap-4 mt-2 justify-center md:justify-start">
                <Link to="#" className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} hover:underline`}>
                  Privacy Policy
                </Link>
                <Link to="#" className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} hover:underline`}>
                  Terms of Service
                </Link>
                <Link to={adminLink} className={`text-xs ${isDarkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-600 hover:text-gray-800'} hover:underline`}>
                  Cookie Policy
                </Link>
              </div>
            </div>
            
            {/* Social Icons */}
            <div className="flex space-x-4 mt-4 md:mt-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className={`transition-all duration-300 hover:scale-110 p-2 rounded-full ${
                    isDarkMode 
                      ? 'text-gray-400 hover:text-indigo-400 hover:bg-indigo-900/30' 
                      : 'text-gray-500 hover:text-indigo-600 hover:bg-indigo-100'
                  }`}
                  aria-label={social.name}
                >
                  <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className={`fixed bottom-6 right-6 p-3 rounded-full shadow-lg transition-all duration-300 z-50 ${
            isDarkMode 
              ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
              : 'bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white'
          }`}
          aria-label="Back to top"
        >
          <ChevronUpIcon className="h-5 w-5" />
        </button>
      )}

      {/* Add missing CSS for radial gradient */}
      <style jsx>{`
        .bg-radial-gradient {
          background: radial-gradient(circle at center, var(--tw-gradient-from, #6366f1) 0%, var(--tw-gradient-to, #a855f7) 100%);
        }
      `}</style>
    </footer>
  );
};

export default Footer;