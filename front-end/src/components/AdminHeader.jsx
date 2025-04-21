import React, { useContext } from 'react';
import { Command, LogOut, Home, Settings, ChartBar } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminHeader = ({ isDarkMode }) => {
  const { logout } = useContext(AuthContext);
  const location = useLocation();

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      logout();
    }
  };

  return (
    <header className="py-6 px-4 bg-transparent backdrop-blur-md relative z-10">
      <div className="container mx-auto">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div
              className={`p-2 rounded-lg ${
                isDarkMode ? 'bg-indigo-600/20' : 'bg-indigo-100/40'
              } backdrop-blur-sm`}
            >
              <Command
                size={24}
                className={`${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}
              />
            </div>
            <h1
              className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                isDarkMode
                  ? 'from-indigo-300 via-purple-300 to-blue-300'
                  : 'from-indigo-600 via-purple-600 to-blue-600'
              }`}
            >
              Admin Dashboard
            </h1>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600/90 text-white rounded-lg font-medium hover:bg-red-700 transition-all duration-300 flex items-center space-x-2 shadow-md backdrop-blur-sm"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>

        {/* Breadcrumb Navigation */}
        <div className="mt-4 overflow-x-auto">
          <div className="flex space-x-8 min-w-max">
            <Link
              to="/admin/dashboard"
              className={`py-2 font-medium flex items-center space-x-2 transition-all duration-300 relative ${
                location.pathname === '/admin/dashboard'
                  ? isDarkMode
                    ? 'text-white'
                    : 'text-gray-800'
                  : isDarkMode
                  ? 'text-gray-300'
                  : 'text-gray-600'
              } ${
                location.pathname === '/admin/dashboard'
                  ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-indigo-600 after:to-blue-600'
                  : 'hover:after:opacity-100 after:opacity-0 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-gray-400 after:to-gray-600 after:transition-opacity'
              }`}
            >
              <Home size={18} />
              <span>Products</span>
            </Link>
            <Link
              to="/admin/settings"
              className={`py-2 font-medium flex items-center space-x-2 transition-all duration-300 relative ${
                location.pathname === '/admin/settings'
                  ? isDarkMode
                    ? 'text-white'
                    : 'text-gray-800'
                  : isDarkMode
                  ? 'text-gray-300'
                  : 'text-gray-600'
              } ${
                location.pathname === '/admin/settings'
                  ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-indigo-600 after:to-blue-600'
                  : 'hover:after:opacity-100 after:opacity-0 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-gray-400 after:to-gray-600 after:transition-opacity'
              }`}
            >
              <Settings size={18} />
              <span>Settings</span>
            </Link>
            <Link
              to="/admin/stats"
              className={`py-2 font-medium flex items-center space-x-2 transition-all duration-300 relative ${
                location.pathname === '/admin/stats'
                  ? isDarkMode
                    ? 'text-white'
                    : 'text-gray-800'
                  : isDarkMode
                  ? 'text-gray-300'
                  : 'text-gray-600'
              } ${
                location.pathname === '/admin/stats'
                  ? 'after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-indigo-600 after:to-blue-600'
                  : 'hover:after:opacity-100 after:opacity-0 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-gradient-to-r after:from-gray-400 after:to-gray-600 after:transition-opacity'
              }`}
            >
              <ChartBar size={18} />
              <span>Stats</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;