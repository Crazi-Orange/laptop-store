import React, { useState, useEffect, useImperativeHandle, forwardRef } from 'react';

const ProductForm = forwardRef(({ onSubmit, product = null, isDarkMode = false, disabled = false }, ref) => {
  const initialFormData = {
    id: '',
    name: '',
    salePrice: '',
    originalPrice: '',
    discount: '',
    category: '',
    features: '',
    condition: 'Brand New',
    images: ['', '', ''], // Changed from image to images array
  };

  const [formData, setFormData] = useState(initialFormData);

  useEffect(() => {
    if (product) {
      setFormData({
        id: product.id || '',
        name: product.name || '',
        salePrice: product.salePrice || '',
        originalPrice: product.originalPrice || '',
        discount: product.discount || '',
        category: product.category || '',
        features: product.features ? product.features.join(', ') : '',
        condition: product.condition || 'Brand New',
        images: product.images?.length ? [...product.images, ...['', '', ''].slice(product.images.length)] : ['', '', ''], // Pad with empty strings
      });
    } else {
      setFormData(initialFormData);
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('image')) {
      const index = parseInt(name.replace('image', ''), 10);
      setFormData((prev) => ({
        ...prev,
        images: prev.images.map((img, i) => (i === index ? value : img)),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: name === 'salePrice' || name === 'originalPrice' || name === 'discount'
          ? parseFloat(value) || ''
          : value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalData = {
      ...formData,
      features: formData.features
        ? formData.features.split(',').map((f) => f.trim())
        : [],
      images: formData.images.filter((img) => img.trim() !== ''), // Remove empty URLs
    };
    onSubmit(finalData);
  };

  // Expose resetForm to parent via ref
  useImperativeHandle(ref, () => ({
    resetForm: () => {
      setFormData(initialFormData);
    },
  }));

  const inputClass = `mt-1 block w-full px-3 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
    isDarkMode
      ? 'bg-gray-700 border-gray-600 text-white'
      : 'bg-white border-gray-300 text-gray-900'
  } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;

  const labelClass = `block text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className={labelClass}>Product Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={inputClass}
          placeholder="e.g., Dell XPS"
          required
          disabled={disabled}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Sale Price</label>
          <input
            type="number"
            name="salePrice"
            step="0.01"
            value={formData.salePrice}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g., 99.99"
            required
            disabled={disabled}
          />
        </div>
        <div>
          <label className={labelClass}>Original Price</label>
          <input
            type="number"
            name="originalPrice"
            step="0.01"
            value={formData.salePrice}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g., 129.99"
            disabled={disabled}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Discount (%)</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g., 10"
            disabled={disabled}
          />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={inputClass}
            placeholder="e.g., Student"
            required
            disabled={disabled}
          />
        </div>
      </div>

      <div>
        <label className={labelClass}>Image URLs</label>
        <div className="space-y-2">
          {[1, 2, 3].map((num, index) => (
            <input
              key={index}
              type="text"
              name={`image${index}`}
              value={formData.images[index]}
              onChange={handleChange}
              className={inputClass}
              placeholder={`e.g., https://example.com/image${num}.jpg`}
              disabled={disabled}
            />
          ))}
        </div>
      </div>

      <div>
        <label className={labelClass}>Features (comma-separated)</label>
        <input
          type="text"
          name="features"
          value={formData.features}
          onChange={handleChange}
          className={inputClass}
          placeholder="e.g.,13-inch 4K display, Intel i5 12th Gen, 8GB RAM, 256GB SSD"
          disabled={disabled}
        />
      </div>

      <div>
        <label className={labelClass}>Condition</label>
        <select
          name="condition"
          value={formData.condition}
          onChange={handleChange}
          className={inputClass}
          disabled={disabled}
        >
          <option value="Brand New">Brand New</option>
          <option value="New">New</option>
          <option value="Refurbished">Refurbished</option>
          <option value="Used">Used</option>
        </select>
      </div>

      <div>
        <button
          type="submit"
          disabled={disabled}
          className={`w-full py-3 px-4 rounded-lg shadow-sm text-sm font-medium text-white transition-all duration-300 ${
            isDarkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'
          } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {formData.id ? 'Update Product' : 'Add Product'}
        </button>
      </div>
    </form>
  );
});

export default ProductForm;