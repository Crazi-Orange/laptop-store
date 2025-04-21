import React from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Accessories = () => {
    // Auto-detect dark mode
  const [isDarkMode, setIsDarkMode] = useState(false);
  useEffect(() => {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeQuery.addEventListener('change', handleChange);
    return () => darkModeQuery.removeEventListener('change', handleChange);
  }, []);
    
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'}`}>
      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className={`rounded-2xl overflow-hidden border ${
          isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'
        } shadow-lg p-10 text-center max-w-3xl mx-auto`}>
          
          {/* Page Title with Gradient */}
          <div className="mb-8 relative inline-block">
            <h2 className={`text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode 
                ? 'from-indigo-300 via-purple-300 to-blue-300' 
                : 'from-indigo-600 via-purple-600 to-blue-600'
            }`}>
              Accessories
            </h2>
            
            {/* Short Underline with Gradient */}
            <span className="absolute -bottom-1 left-0 right-0 mx-auto w-24 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"></span>
          </div>

          {/* Empty State Illustration */}
          <div className="mb-8 flex justify-center">
            <div className={`w-40 h-40 rounded-full flex items-center justify-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            }`}>
              <svg className="w-20 h-20 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
            </div>
          </div>

          {/* Message */}
          <h3 className={`text-xl mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
            Coming Soon!
          </h3>
          
          <p className={`text-lg mb-8 max-w-lg mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            We're working on bringing you the best accessories for your tech devices. 
            Check back soon for our latest collection!
          </p>

          {/* Optional: Return Button */}
          <Link
            to="/"
            className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
              isDarkMode 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-indigo-500 hover:bg-indigo-600 text-white'
            }`}
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
            </svg>
            Return to Homepage
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Accessories;