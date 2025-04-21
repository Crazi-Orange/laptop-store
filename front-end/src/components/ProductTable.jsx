import React, { useState, useRef } from 'react';
import ProductForm from './ProductForm';

const ProductTable = ({ products, onAdd, onUpdate, onDelete, isDarkMode }) => {
  const [editingProduct, setEditingProduct] = useState(null);
  const [error, setError] = useState('');
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  const formRef = useRef(null);

  const handleFormSubmit = (productData) => {
    if (!productData.name || !productData.salePrice || !productData.category) {
      setError('Name, sale price, and category are required');
      return;
    }

    setError('');

    if (editingProduct) {
      onUpdate(productData);
      setEditingProduct(null);
      setIsFormDisabled(true); // Disable form after update
    } else {
      productData.id = Date.now().toString();
      onAdd(productData);
      setIsFormDisabled(true); // Disable form after add
    }

    // Reset and re-enable form after a short delay
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.resetForm(); // Reset form fields to default
      }
      setIsFormDisabled(false);
    }, 1000);
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setIsFormDisabled(false); // Ensure form is active when starting edit
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingProduct(null);
    setIsFormDisabled(true); // Disable form after canceling edit
    // Reset and re-enable form after a short delay
    setTimeout(() => {
      if (formRef.current) {
        formRef.current.resetForm(); // Reset form fields to default
      }
      setIsFormDisabled(false);
    }, 1000);
  };

  return (
    <div className="space-y-10">
      <div className={`relative rounded-2xl overflow-hidden border shadow-lg ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'
      }`}>
        <div className="p-6 border-b border-gray-200">
          <h2 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode ? 'from-indigo-300 via-purple-300 to-blue-300' : 'from-indigo-600 via-purple-600 to-blue-600'
          }`}>
            {editingProduct ? 'Edit Product' : 'Add New Product'}
          </h2>
          <span className="block w-16 h-1 mt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"></span>
        </div>

        <div className="p-6 space-y-4">
          {error && <p className="text-sm text-red-600">{error}</p>}
          <ProductForm
            ref={formRef}
            product={editingProduct}
            onSubmit={handleFormSubmit}
            isDarkMode={isDarkMode}
            disabled={isFormDisabled}
          />
          {editingProduct && (
            <button
              onClick={handleCancelEdit}
              className={`w-full py-2 px-4 border rounded-lg shadow-sm text-sm font-medium transition-all duration-300 ${
                isDarkMode
                  ? 'border-gray-600 bg-gray-700 hover:bg-gray-600 text-gray-200'
                  : 'border-gray-300 bg-white hover:bg-gray-50 text-gray-700'
              }`}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className={`relative rounded-2xl overflow-hidden border shadow-lg ${
        isDarkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-white/50'
      }`}>
        <div className="p-6 border-b border-gray-200">
          <h2 className={`text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${
            isDarkMode ? 'from-indigo-300 via-purple-300 to-blue-300' : 'from-indigo-600 via-purple-600 to-blue-600'
          }`}>
            Manage Products
          </h2>
          <span className="block w-16 h-1 mt-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500 rounded-full"></span>
        </div>

        <div className="p-6">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center mb-4 ${
                isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
              }`}>
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                No products available. Add your first product above.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <div key={product.id} className={`relative rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg ${
                  isDarkMode ? 'bg-gray-700 border border-gray-600' : 'bg-white border border-gray-100 shadow-sm'
                }`}>
                  <div className={`h-40 overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
                    <img
                      src={product.images && product.images.length > 0 ? product.images[0] : '/api/placeholder/300/200'}
                      alt={product.name}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  <div className="p-4">
                    <div className="mb-4">
                      <h3 className={`text-lg font-medium mb-2 ${isDarkMode ? 'text-gray-100' : 'text-gray-900'}`}>
                        {product.name}
                      </h3>
                      <div className="flex justify-between items-center mb-1">
                        <p className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          GHS {product.salePrice.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                        </p>
                        {product.discount > 0 && (
                          <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded">
                            {product.discount}% OFF
                          </span>
                        )}
                      </div>
                      <p className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Category: {product.category}
                      </p>
                    </div>

                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleEdit(product)}
                        className="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all duration-300"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => onDelete(product.id)}
                        className="flex-1 py-2 px-3 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-all duration-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductTable;