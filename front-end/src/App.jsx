// src/App.jsx
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import ProductDetail from './pages/ProductDetail'
import AdminLogin from './pages/AdminLogin'
import Dashboard from './pages/Dashboard'
import About from './pages/About'
import Deals from './pages/Deals'
import Wishlist from './pages/Wishlist'
import ProtectedRoute from './components/ProtectedRoute'
import Header from './components/Header'
import Footer from './components/Footer'
import { AuthProvider } from './context/AuthContext'
import ScrollToTop from './components/ScrollToTop'
import StudentLaptops from './pages/StudentLaptops';
import BusinessLaptops from './pages/BusinessLaptops';
import GamingLaptops from './pages/GamingLaptops';
import Accessories from './pages/Accessories'
import AdminStats from './pages/AdminStats'
import SettingsPage from './pages/SettingsPage'


function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Header />
        <div className="min-h-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/catalog" element={<Catalog />} />
            <Route path="/deals" element={<Deals />} />
            <Route path="/about" element={<About />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/student-laptops" element={<StudentLaptops />} />
            <Route path="/business-laptops" element={<BusinessLaptops />} />
            <Route path="/gaming-laptops" element={<GamingLaptops />} />
            <Route path="/accessories" element={<Accessories />} />
            <Route path="/admin/settings" element={<SettingsPage />} />
            <Route path="/admin/stats" element={<AdminStats />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>
        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;