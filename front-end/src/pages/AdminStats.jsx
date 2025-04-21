import React, { useState, useEffect, useContext } from 'react';
import {
  CurrencyDollarIcon,
  ShoppingBagIcon,
  TagIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AdminHeader from '../components/AdminHeader';

const AdminStats = ({ products = [] }) => {
  const { isAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [stats, setStats] = useState({
    totalProducts: 0,
    averagePrice: 0,
    totalValue: 0,
    categoryCounts: {},
    lowStockItems: 0,
  });
  const [loadingStats, setLoadingStats] = useState(true);
  const [timeRange, setTimeRange] = useState('month');

  // Auth check
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    } else {
      setAuthLoading(false);
    }
  }, [isAuthenticated, navigate]);

  // Detect system dark mode preference
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    
    const handleDarkModeChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleDarkModeChange);
    
    return () => darkModeMediaQuery.removeEventListener('change', handleDarkModeChange);
  }, []);

  // Calculate stats when products change
  useEffect(() => {
    if (products?.length > 0) {
      calculateStats();
    } else {
      setLoadingStats(false);
    }
  }, [products]);

  const calculateStats = () => {
    setLoadingStats(true);

    if (!products || products.length === 0) {
      setStats({
        totalProducts: 0,
        averagePrice: 0,
        totalValue: 0,
        categoryCounts: {},
        lowStockItems: 0,
      });
      setLoadingStats(false);
      return;
    }

    const totalProducts = products.length;
    const totalStock = products.reduce((sum, product) => sum + (product.stock ?? 10), 0);
    const totalValue = products.reduce((sum, product) => sum + (product.salePrice * (product.stock ?? 10)), 0);
    const averagePrice = totalStock > 0 ? totalValue / totalStock : 0;

    const categoryCounts = products.reduce((acc, product) => {
      const category = product.category || 'Uncategorized';
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    }, {});

    const lowStockItems = products.filter((product) => (product.stock ?? 10) < 5).length;

    setStats({
      totalProducts,
      averagePrice,
      totalValue,
      categoryCounts,
      lowStockItems,
    });

    setLoadingStats(false);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getCategoryChartData = () => {
    if (!stats.categoryCounts || Object.keys(stats.categoryCounts).length === 0) {
      return [{ name: 'No Data', value: 1 }];
    }
    return Object.entries(stats.categoryCounts).map(([category, count]) => ({
      name: category,
      value: count,
    }));
  };

  const getSalesData = () => {
    let data;
    if (timeRange === 'week') {
      data = [
        { name: 'Mon', sales: 1200 },
        { name: 'Tue', sales: 1900 },
        { name: 'Wed', sales: 1500 },
        { name: 'Thu', sales: 2200 },
        { name: 'Fri', sales: 2800 },
        { name: 'Sat', sales: 2100 },
        { name: 'Sun', sales: 1800 },
      ];
    } else if (timeRange === 'month') {
      data = [
        { name: 'Week 1', sales: 8500 },
        { name: 'Week 2', sales: 11200 },
        { name: 'Week 3', sales: 9800 },
        { name: 'Week 4', sales: 12500 },
      ];
    } else {
      data = [
        { name: 'Jan', sales: 28000 },
        { name: 'Feb', sales: 32000 },
        { name: 'Mar', sales: 30000 },
        { name: 'Apr', sales: 34000 },
        { name: 'May', sales: 37000 },
        { name: 'Jun', sales: 41000 },
      ];
    }
    return data;
  };

  const COLORS = ['#6366F1', '#8B5CF6', '#EC4899', '#F43F5E', '#F97316'];

  // Skeleton loaders
  const StatCardSkeleton = () => (
    <div className="rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg animate-pulse w-full">
      <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
      <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
      <div className="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );

  const ChartSkeleton = () => (
    <div className="rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg animate-pulse w-full">
      <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
      <div className="h-52 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
  );

  if (authLoading) {
    return null; // Prevent rendering until auth is checked
  }

  return (
    <div className={`min-h-screen relative transition-all duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="dark:bg-gray-900 bg-gray-50 text-gray-800 dark:text-gray-200 min-h-screen">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden -z-10">
          <div className="absolute animate-pulse top-10 left-10 w-64 h-64 rounded-full bg-indigo-500/10 dark:bg-indigo-900/20 blur-3xl"></div>
          <div className="absolute animate-bounce-slow top-40 right-20 w-96 h-96 rounded-full bg-purple-500/10 dark:bg-purple-900/20 blur-3xl"></div>
          <div className="absolute animate-pulse-slow -bottom-20 -left-20 w-80 h-80 rounded-full bg-blue-500/10 dark:bg-blue-900/20 blur-3xl"></div>
        </div>

        <AdminHeader isDarkMode={isDarkMode} />

        <div className="container mx-auto py-12 px-4 space-y-6">
          <div className="text-center mb-8">
            <h2 className={`text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
              isDarkMode ? 'from-indigo-300 via-purple-300 to-blue-300' : 'from-indigo-600 via-purple-600 to-blue-600'
              }`}>
              Dashboard Analytics
            </h2>
            <span className="inline-block w-16 h-1 mt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"></span>
          </div>          
          {/* Stats cards with glassmorphism */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loadingStats ? (
              <>
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
                <StatCardSkeleton />
              </>
            ) : (
              <>
                <div className="rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg transition-transform duration-300 hover:scale-105">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Products
                      </p>
                      <h3 className="text-2xl font-bold mt-1">{stats.totalProducts}</h3>
                      <p className="flex items-center text-sm text-green-500 mt-2">
                        <span className="inline-block mr-1">↑</span>
                        <span>12% from last month</span>
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-indigo-100 dark:bg-indigo-900">
                      <ShoppingBagIcon className="w-6 h-6 text-indigo-600 dark:text-indigo-200" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg transition-transform duration-300 hover:scale-105">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Total Inventory Value
                      </p>
                      <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.totalValue)}</h3>
                      <p className="flex items-center text-sm text-green-500 mt-2">
                        <span className="inline-block mr-1">↑</span>
                        <span>8% from last month</span>
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-green-100 dark:bg-green-900">
                      <CurrencyDollarIcon className="w-6 h-6 text-green-600 dark:text-green-200" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg transition-transform duration-300 hover:scale-105">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Average Price
                      </p>
                      <h3 className="text-2xl font-bold mt-1">{formatCurrency(stats.averagePrice)}</h3>
                      <p className="flex items-center text-sm text-red-500 mt-2">
                        <span className="inline-block mr-1">↓</span>
                        <span>3% from last month</span>
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-purple-100 dark:bg-purple-900">
                      <TagIcon className="w-6 h-6 text-purple-600 dark:text-purple-200" />
                    </div>
                  </div>
                </div>

                <div className="rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg transition-transform duration-300 hover:scale-105">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Low Stock Items
                      </p>
                      <h3 className="text-2xl font-bold mt-1">{stats.lowStockItems}</h3>
                      <p className={`text-sm ${stats.lowStockItems > 3 ? 'text-red-500' : 'text-green-500'} mt-2`}>
                        {stats.lowStockItems > 3 ? 'Action needed' : 'Stock levels good'}
                      </p>
                    </div>
                    <div className="p-3 rounded-lg bg-red-100 dark:bg-red-900">
                      <ChartBarIcon className="w-6 h-6 text-red-600 dark:text-red-200" />
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Charts with enhanced visuals */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {loadingStats ? (
              <>
                <ChartSkeleton />
                <ChartSkeleton />
              </>
            ) : (
              <>
                <div className="rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-3 sm:space-y-0">
                    <h3 className="text-lg font-medium">Sales Overview</h3>
                    <div className="flex space-x-2">
                      {['week', 'month', 'year'].map((range) => (
                        <button
                          key={range}
                          onClick={() => setTimeRange(range)}
                          className={`px-3 py-1 text-sm rounded-md transition-colors ${
                            timeRange === range
                              ? 'bg-indigo-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                          }`}
                        >
                          {range.charAt(0).toUpperCase() + range.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={getSalesData()}
                        margin={{ top: 0, right: 0, left: -15, bottom: 0 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" stroke={isDarkMode ? '#374151' : '#e5e7eb'} />
                        <XAxis
                          dataKey="name"
                          tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280', fontSize: '0.75rem' }}
                          axisLine={{ stroke: isDarkMode ? '#4B5563' : '#D1D5DB' }}
                        />
                        <YAxis
                          tick={{ fill: isDarkMode ? '#9CA3AF' : '#6B7280', fontSize: '0.75rem' }}
                          axisLine={{ stroke: isDarkMode ? '#4B5563' : '#D1D5DB' }}
                          width={40}
                        />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                            borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                            color: isDarkMode ? '#F9FAFB' : '#111827',
                          }}
                        />
                        <Bar dataKey="sales" fill="#6366F1" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg">
                  <h3 className="text-lg font-medium mb-6">Product Categories</h3>
                  <div className="flex items-center justify-center h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={getCategoryChartData()}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {getCategoryChartData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: isDarkMode ? '#1F2937' : '#FFFFFF',
                            borderColor: isDarkMode ? '#4B5563' : '#E5E7EB',
                            color: isDarkMode ? '#F9FAFB' : '#111827',
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">
                    {getCategoryChartData().map((category, index) => (
                      <div key={category.name} className="flex items-center">
                        <div
                          className="w-3 h-3 rounded-full mr-2"
                          style={{ backgroundColor: COLORS[index % COLORS.length] }}
                        ></div>
                        <span className="text-sm truncate">{category.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Top products section */}
          <div className="rounded-xl p-6 bg-white/80 dark:bg-gray-800/80 backdrop-blur-lg shadow-lg">
            <h3 className="text-lg font-medium mb-4">Top Products</h3>
            <div className="space-y-4">
              {loadingStats ? (
                <div className="animate-pulse space-y-3">
                  {[...Array(5)].map((_, index) => (
                    <div key={index} className="flex items-center p-3 rounded-lg bg-gray-100 dark:bg-gray-700">
                      <div className="w-10 h-10 bg-gray-200 dark:bg-gray-600 rounded-lg mr-4"></div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-3/4"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-1/2 mt-2"></div>
                      </div>
                      <div className="text-right">
                        <div className="h-4 bg-gray-200 dark:bg-gray-600 rounded w-16"></div>
                        <div className="h-3 bg-gray-200 dark:bg-gray-600 rounded w-12 mt-2"></div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                (products || []).slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center p-3 rounded-lg bg-gray-50/80 dark:bg-gray-700/80 backdrop-blur-sm hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150"
                  >
                    <img
                      src={Array.isArray(product.images) ? product.images[0] : product.image || '/placeholder.png'}
                      alt={product.name || 'Product'}
                      className="w-10 h-10 object-cover rounded-lg mr-4"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-base truncate">{product.name || 'Unknown'}</h4>
                      <p className="text-sm truncate text-gray-500 dark:text-gray-400">
                        {product.category || 'Uncategorized'}
                      </p>
                    </div>
                    <div className="text-right ml-2">
                      <p className="font-medium text-base">{formatCurrency(product.salePrice || 0)}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Stock: {product.stock ?? 10}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminStats;