import React, { useState, useEffect } from 'react';
import { UserCircleIcon, KeyIcon } from '@heroicons/react/24/outline';
import AdminHeader from '../components/AdminHeader';

const SettingsPage = () => {
  // System dark mode detection
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => setIsDarkMode(e.matches);
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const [userProfile, setUserProfile] = useState({
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'Administrator',
    avatar: '',
    phone: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [showPasswordForm, setShowPasswordForm] = useState(false);

  const handleUserChange = (e) => {
    setUserProfile({ ...userProfile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setPasswordForm({ ...passwordForm, [e.target.name]: e.target.value });
  };

  const saveSettings = () => {
    console.log('Saving settings:', { userProfile });
  };

  const changePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    console.log('Changing password:', passwordForm);
  };

  return (
    <div
      className={`min-h-screen relative overflow-hidden transition-all duration-500 ${
        isDarkMode ? 'bg-gray-900 text-gray-200' : 'bg-gray-50 text-gray-800'
      }`}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div
          className={`absolute top-0 left-0 w-96 h-96 rounded-full opacity-30 ${
            isDarkMode ? 'bg-indigo-900' : 'bg-indigo-400'
          } blur-3xl animate-pulse`}
          style={{ animationDuration: '8s' }}
        ></div>
        <div
          className={`absolute top-1/4 right-0 w-64 h-64 rounded-full opacity-20 ${
            isDarkMode ? 'bg-purple-900' : 'bg-purple-400'
          } blur-3xl animate-pulse`}
          style={{ animationDuration: '12s' }}
        ></div>
        <div
          className={`absolute bottom-0 left-1/4 w-80 h-80 rounded-full opacity-25 ${
            isDarkMode ? 'bg-blue-900' : 'bg-blue-400'
          } blur-3xl animate-pulse`}
          style={{ animationDuration: '10s' }}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 w-72 h-72 rounded-full opacity-20 ${
            isDarkMode ? 'bg-pink-900' : 'bg-pink-400'
          } blur-3xl animate-pulse`}
          style={{ animationDuration: '14s' }}
        ></div>
      </div>

      <AdminHeader isDarkMode={isDarkMode} />

      <div className="container mx-auto py-8 px-4 space-y-6 pb-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Settings */}
          <div className="lg:col-span-2">
            <div
              className={`rounded-2xl overflow-hidden shadow-xl backdrop-blur-lg ${
                isDarkMode ? 'bg-gray-800/40' : 'bg-white/40'
              } border ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}
            >
              <div className="px-6 py-5 border-b border-gray-700/30">
                <div className="flex items-center">
                  <UserCircleIcon
                    className={`w-6 h-6 mr-3 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}
                  />
                  <h2 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
                    isDarkMode ? 'from-indigo-300 via-purple-300 to-blue-300' : 'from-indigo-600 via-purple-600 to-blue-600'
                  }`}>
                    Profile Settings
                  </h2>
                </div>
              </div>

              <div className="p-8 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8">
                  <div className="mb-6 sm:mb-0 flex flex-col items-center">
                    <div
                      className={`w-28 h-28 rounded-full flex items-center justify-center overflow-hidden ring-4 ${
                        isDarkMode ? 'ring-indigo-500/30 bg-gray-700/70' : 'ring-indigo-500/20 bg-gray-100/70'
                      }`}
                    >
                      {userProfile.avatar ? (
                        <img
                          src={userProfile.avatar}
                          alt={userProfile.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <UserCircleIcon
                          className={`w-full h-full ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`}
                        />
                      )}
                    </div>
                    <button
                      className={`mt-4 px-4 py-2 text-sm rounded-lg backdrop-blur-sm ${
                        isDarkMode
                          ? 'bg-gray-700/80 hover:bg-gray-600/80 text-gray-200'
                          : 'bg-white/80 hover:bg-gray-100/80 text-gray-800'
                      } transition-all duration-300 shadow-sm`}
                    >
                      Change Avatar
                    </button>
                  </div>

                  <div className="flex-1 space-y-5">
                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}
                      >
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={userProfile.name}
                        onChange={handleUserChange}
                        className={`w-full rounded-lg p-3 backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-700/40 border-gray-600/40 text-white focus:bg-gray-700/60'
                            : 'bg-white/40 border-gray-300/40 text-gray-900 focus:bg-white/60'
                        } focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={userProfile.email}
                        onChange={handleUserChange}
                        className={`w-full rounded-lg p-3 backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-700/40 border-gray-600/40 text-white focus:bg-gray-700/60'
                            : 'bg-white/40 border-gray-300/40 text-gray-900 focus:bg-white/60'
                        } focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                      />
                    </div>

                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}
                      >
                        Phone
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={userProfile.phone}
                        onChange={handleUserChange}
                        placeholder="+2333 (59) 176-5036"
                        className={`w-full rounded-lg p-3 backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-700/40 border-gray-600/40 text-white focus:bg-gray-700/60'
                            : 'bg-white/40 border-gray-300/40 text-gray-900 focus:bg-white/60'
                        } focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    } mb-1`}
                  >
                    Role
                  </label>
                  <div
                    className={`flex items-center w-full rounded-lg p-3 backdrop-blur-sm ${
                      isDarkMode
                        ? 'bg-gray-700/40 border-gray-600/40 text-gray-400'
                        : 'bg-gray-100/40 border-gray-300/40 text-gray-500'
                    } cursor-not-allowed`}
                  >
                    <span>{userProfile.role}</span>
                    <span className="ml-auto text-xs bg-indigo-500/20 text-indigo-500 px-2 py-1 rounded-full">
                      System assigned
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-gray-500">
                    Contact administrator to change role
                  </p>
                </div>

                {/* Save Profile Button */}
                <div className="flex justify-end pt-4">
                  <button
                    onClick={saveSettings}
                    className={`px-6 py-2.5 rounded-lg shadow-lg backdrop-blur-sm ${
                      isDarkMode
                        ? 'bg-indigo-600/90 hover:bg-indigo-700/90'
                        : 'bg-indigo-500/90 hover:bg-indigo-600/90'
                    } text-white transition-all duration-300`}
                  >
                    Save Profile
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="lg:col-span-1">
            <div
              className={`rounded-2xl overflow-hidden shadow-xl backdrop-blur-lg ${
                isDarkMode ? 'bg-gray-800/40' : 'bg-white/40'
              } border ${isDarkMode ? 'border-gray-700/40' : 'border-gray-200/40'}`}
            >
              <div className="px-6 py-5 border-b border-gray-700/30">
                <div className="flex items-center">
                  <KeyIcon
                    className={`w-5 h-5 mr-2 ${isDarkMode ? 'text-indigo-300' : 'text-indigo-600'}`}
                  />
                  <h2 className="text-xl font-semibold">Security</h2>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <button
                  className={`flex items-center w-full px-4 py-3 rounded-lg ${
                    isDarkMode
                      ? 'bg-gray-700/60 hover:bg-gray-600/60 text-indigo-300'
                      : 'bg-white/60 hover:bg-gray-100/60 text-indigo-600'
                  } transition-all duration-300 backdrop-blur-sm`}
                  onClick={() => setShowPasswordForm(!showPasswordForm)}
                >
                  <KeyIcon className="w-5 h-5 mr-3" />
                  <span className="font-medium">
                    {showPasswordForm ? 'Hide Password Form' : 'Change Password'}
                  </span>
                </button>

                {showPasswordForm && (
                  <div className="space-y-4 mt-6 p-4 rounded-lg backdrop-blur-sm bg-gray-500/10">
                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}
                      >
                        Current Password
                      </label>
                      <input
                        type="password"
                        name="currentPassword"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className={`w-full rounded-lg p-3 backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-700/40 border-gray-600/40 text-white focus:bg-gray-700/60'
                            : 'bg-white/40 border-gray-300/40 text-gray-900 focus:bg-white/60'
                        } focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}
                      >
                        New Password
                      </label>
                      <input
                        type="password"
                        name="newPassword"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className={`w-full rounded-lg p-3 backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-700/40 border-gray-600/40 text-white focus:bg-gray-700/60'
                            : 'bg-white/40 border-gray-300/40 text-gray-900 focus:bg-white/60'
                        } focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                      />
                    </div>
                    <div>
                      <label
                        className={`block text-sm font-medium ${
                          isDarkMode ? 'text-gray-300' : 'text-gray-700'
                        } mb-1`}
                      >
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        name="confirmPassword"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`w-full rounded-lg p-3 backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-gray-700/40 border-gray-600/40 text-white focus:bg-gray-700/60'
                            : 'bg-white/40 border-gray-300/40 text-gray-900 focus:bg-white/60'
                        } focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300`}
                      />
                    </div>
                    <div className="flex justify-end">
                      <button
                        onClick={changePassword}
                        className={`px-4 py-2 mt-2 rounded-lg shadow-md backdrop-blur-sm ${
                          isDarkMode
                            ? 'bg-indigo-600/90 hover:bg-indigo-700/90'
                            : 'bg-indigo-500/90 hover:bg-indigo-600/90'
                        } text-white transition-all duration-300`}
                      >
                        Update Password
                      </button>
                    </div>
                  </div>
                )}

                {/* Additional security options could go here */}
                <div
                  className={`mt-6 pt-4 border-t ${
                    isDarkMode ? 'border-gray-700/30' : 'border-gray-200/30'
                  }`}
                >
                  <h3 className="text-sm font-medium uppercase text-gray-500 mb-4">Account Protection</h3>
                  
                  <div
                    className={`p-4 rounded-lg mb-4 backdrop-blur-sm ${
                      isDarkMode ? 'bg-gray-700/40' : 'bg-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-100'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium">Two-Factor Authentication</div>
                          <div className="text-xs text-gray-500">Secure your account with 2FA</div>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-600'
                        }`}
                      >
                        Enable
                      </button>
                    </div>
                  </div>
                  
                  <div
                    className={`p-4 rounded-lg backdrop-blur-sm ${
                      isDarkMode ? 'bg-gray-700/40' : 'bg-white/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          isDarkMode ? 'bg-indigo-500/20' : 'bg-indigo-100'
                        }`}>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium">Login Activity</div>
                          <div className="text-xs text-gray-500">Review recent logins</div>
                        </div>
                      </div>
                      <button
                        className={`px-3 py-1 rounded-md text-xs font-medium ${
                          isDarkMode ? 'bg-indigo-500/20 text-indigo-300' : 'bg-indigo-100 text-indigo-600'
                        }`}
                      >
                        View
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;