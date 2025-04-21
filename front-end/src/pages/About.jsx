import React, { useState, useEffect } from 'react';
import { 
  ShieldCheckIcon, 
  TruckIcon,
  CurrencyDollarIcon,
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Dark mode detection
  useEffect(() => {
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    setIsDarkMode(darkModeMediaQuery.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    darkModeMediaQuery.addEventListener('change', handleChange);
    return () => darkModeMediaQuery.removeEventListener('change', handleChange);
  }, []);

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

      {/* Enhanced About Hero Section */}
      <section className="relative overflow-hidden">
        <div className="relative bg-gradient-to-r from-purple-900 via-indigo-800 to-purple-900 py-24 px-4">
          {/* Hero background decorations */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
            <div className="absolute -top-32 -left-32 w-96 h-96 bg-purple-400 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute top-1/3 -right-32 w-96 h-96 bg-indigo-400 rounded-full filter blur-3xl opacity-30"></div>
            <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-purple-300 rounded-full filter blur-3xl opacity-20"></div>
            <div className="absolute top-10 right-1/4 w-32 h-32 bg-indigo-400 rounded-full filter blur-2xl opacity-20"></div>
          </div>
          
          {/* Grid pattern overlay */}
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          
          <div className="max-w-7xl mx-auto relative">
            <div className="md:flex md:items-center md:justify-between gap-12">
              <div className="text-center md:text-left md:w-1/2">
                <div className="inline-flex items-center px-4 py-1 rounded-full bg-purple-700/80 text-purple-100 text-sm font-medium mb-6 shadow-lg backdrop-blur-sm">
                  <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  About HUB64
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-white leading-tight">
                  Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-indigo-300">Trusted Partner</span> for Premium Tech
                </h1>
                <p className="text-lg mb-8 text-indigo-100 max-w-xl mx-auto md:mx-0">
                  Dedicated to bringing you the best laptops and tech accessories at competitive prices with exceptional service and support.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <a
                    href="/catalog"
                    className="bg-transparent border-2 border-purple-300 text-white px-8 py-3 rounded-lg font-medium hover:bg-purple-800/50 hover:border-purple-200 transition duration-300 flex items-center justify-center backdrop-blur-sm"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                    Our Products
                  </a>
                  <a
                    href="#"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white px-8 py-3 rounded-lg font-medium transition duration-300 flex items-center justify-center shadow-lg"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Contact Us
                  </a>
                </div>
              </div>
              
              {/* Stats and company highlights replacing the image */}
              <div className="md:w-2/5 mt-12 md:mt-0">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl blur-sm opacity-75"></div>
                  <div className="relative bg-white/10 backdrop-blur-md rounded-xl p-6 shadow-xl border border-white/20">
                    <h3 className="text-xl font-semibold text-white mb-6">Our Impact</h3>
                    
                    {/* Stats grid */}
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                        <div className="text-3xl font-bold text-indigo-300 mb-1">50+</div>
                        <div className="text-sm text-indigo-100">Happy Customers</div>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg backdrop-blur-sm">
                        <div className="text-3xl font-bold text-indigo-300 mb-1">24/7</div>
                        <div className="text-sm text-indigo-100">Customer Support</div>
                      </div>
                    </div>
                    
                    {/* Feature list */}
                    <h4 className="font-medium text-white mb-3">Why Choose HUB64</h4>
                    <ul className="space-y-3">
                      {['Premium Quality Products', 'Expert Technical Support', 'Competitive Pricing', 'Fast & Reliable Delivery'].map((feature, index) => (
                        <li key={index} className="flex items-center text-indigo-100">
                          <div className="bg-purple-500/20 p-1 rounded-full mr-3">
                            <svg className="w-4 h-4 text-purple-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={`${isDarkMode ? 'text-gray-900' : 'text-gray-50'}`}>
          <svg viewBox="0 0 1440 80" fill="currentColor" preserveAspectRatio="none">
            <path d="M0,64L80,80C160,96,320,128,480,122.7C640,117,800,75,960,64C1120,53,1280,75,1360,85.3L1440,96L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"></path>
          </svg>
        </div>
      </section>
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Company Information */}
          <div className={`col-span-2 rounded-xl overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
            <h2 className="text-2xl font-bold mb-4">About Us</h2>
            <p className="mb-6">
              Welcome to HUB64, your number one source for high-quality laptops at the best local prices. 
              We are dedicated to giving you the very best of laptops, with a focus on dependability, customer service, and uniqueness.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className={`p-5 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-indigo-50'}`}>
                <h3 className="text-xl font-bold mb-3">Our Mission</h3>
                <p>
                  To provide our customers with the best laptops and accessories, ensuring quality and satisfaction.
                </p>
              </div>
              
              <div className={`p-5 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-indigo-50'}`}>
                <h3 className="text-xl font-bold mb-3">Our Vision</h3>
                <p>
                  To be the leading provider of laptops in the local market, known for our exceptional service and quality products.
                </p>
              </div>
            </div>
            
            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-gray-100'} mb-8`}>
              <h3 className="text-xl font-bold mb-4">Why Choose Us?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex flex-col items-center text-center p-4">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} mb-3`}>
                    <TruckIcon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="font-bold mb-2">Local Delivery</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Fast and reliable delivery right to your doorstep</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} mb-3`}>
                    <ShieldCheckIcon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="font-bold mb-2">Warranty Included</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>All products come with manufacturer warranty</p>
                </div>
                
                <div className="flex flex-col items-center text-center p-4">
                  <div className={`p-3 rounded-full ${isDarkMode ? 'bg-indigo-900' : 'bg-indigo-100'} mb-3`}>
                    <CurrencyDollarIcon className="h-8 w-8 text-indigo-600" />
                  </div>
                  <h4 className="font-bold mb-2">Competitive Pricing</h4>
                  <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Best prices guaranteed in the local market</p>
                </div>
              </div>
            </div>

            <div className={`p-6 rounded-lg ${isDarkMode ? 'bg-gray-750' : 'bg-indigo-50'}`}>
              <h3 className="text-xl font-bold mb-4">Our Story</h3>
              <p className="mb-4">
                Founded in 2025, HUB64 began with a simple mission: to make high-quality tech accessible to everyone. What started as a small operation has grown into a trusted name in the local tech industry.
              </p>
              <p>
                Our team consists of tech enthusiasts who are passionate about finding the perfect laptop solutions for our customers. We personally test each product we offer to ensure it meets our standards of performance, reliability, and value.
              </p>
            </div>
          </div>
          
          {/* Contact Information */}
          <div className="col-span-1">
            <div className={`rounded-xl overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6 mb-6`}>
              <h3 className="text-xl font-bold mb-4">Contact Us</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-750' : 'bg-indigo-100'} mr-3`}>
                    <PhoneIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>WhatsApp</p>
                    <p className="font-medium">++233 59 176 5036</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-750' : 'bg-indigo-100'} mr-3`}>
                    <PhoneIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone</p>
                    <p className="font-medium">+233 59 176 50 36</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-750' : 'bg-indigo-100'} mr-3`}>
                    <EnvelopeIcon className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                    <p className="font-medium">info@hub64.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className={`rounded-xl overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6 mb-6`}>
              <h3 className="text-xl font-bold mb-4">Business Hours</h3>
              <div className={`space-y-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>8:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>8:00 AM - 9:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            
            <div className={`rounded-xl overflow-hidden transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg p-6`}>
              <h3 className="text-xl font-bold mb-4">Our Location</h3>
              <div className="flex items-start">
                <div className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-750' : 'bg-indigo-100'} mr-3 mt-1`}>
                  <MapPinIcon className="h-5 w-5 text-indigo-600" />
                </div>
                <div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    GPS: GM-169-5820<br />
                    Adenta, Accra<br />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <section className={`px-4 py-12 ${isDarkMode ? 'bg-gray-800' : 'bg-indigo-50'}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
            <h2 className="text-2xl font-bold">What Our Customers Say</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className={`p-6 rounded-xl shadow-lg ${isDarkMode ? 'bg-gray-750' : 'bg-white'}`}
              >
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, j) => (
                      <svg 
                        key={j} 
                        xmlns="http://www.w3.org/2000/svg" 
                        className={`h-5 w-5 ${j < 5 ? 'text-yellow-400' : 'text-gray-300'}`} 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className={`mb-4 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  "I purchased a laptop from HUB64 last month and couldn't be happier with my purchase. The quality is excellent, and their customer service was outstanding throughout the process."
                </p>
                <div className="flex items-center">
                  <div className={`w-10 h-10 rounded-full ${isDarkMode ? 'bg-gray-600' : 'bg-indigo-100'} flex items-center justify-center mr-3`}>
                    <span className="font-bold text-indigo-600">
                      {String.fromCharCode(65 + i - 1)}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium">Customer {i}</p>
                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Verified Buyer</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        .bg-gray-750 { background-color: #2a2d3a; }
      `}</style>
    </div>
  );
};

export default About;