import { useState, useEffect } from 'react';

const initialProducts = [
  // AllProducts array
  {
    id: '1',
    name: 'Dell XPS 13',
    originalPrice: 1299.99,
    salePrice: 999.99,
    discount: 23,
    image: '/assets/images/dell-xps-13.jpg',
    features: ['13-inch 4K display', 'Intel i5 12th Gen', '8GB RAM', '256GB SSD'],
    condition: 'New',
    category: 'Student'
  },
  {
    id: '2',
    name: 'HP Spectre x360',
    originalPrice: 1499.99,
    salePrice: 1099.99,
    discount: 27,
    image: '/assets/images/hp-spectre-x360.jpg',
    features: ['13-inch OLED display', 'Intel i7 12th Gen', '16GB RAM', '512GB SSD'],
    condition: 'New',
    category: 'Business'
  },
  {
    id: '3',
    name: 'HP Pavilion x360',
    originalPrice: 1199.99,
    salePrice: 1000.00,
    discount: 17,
    image: '/assets/images/hp-pavilion-x360.jpg',
    features: ['14-inch touch display', 'Intel i5 11th Gen', '8GB RAM', '512GB SSD'],
    condition: 'New',
    category: 'Student'
  },
  {
    id: '4',
    name: 'ASUS ROG Zephyrus',
    originalPrice: 1799.99,
    salePrice: 1299.99,
    discount: 28,
    image: '/assets/images/gaming-laptop.jpg',
    features: ['15.6-inch 144Hz display', 'AMD Ryzen 9', '16GB RAM', 'NVIDIA RTX 3060'],
    condition: 'New',
    category: 'Gaming'
  },
  {
    id: '5',
    name: 'Lenovo ThinkPad X1 Carbon',
    originalPrice: 1899.99,
    salePrice: 1499.99,
    discount: 21,
    image: '/assets/images/thinkpad-x1.jpg',
    features: ['14-inch QHD display', 'Intel i7 12th Gen', '32GB RAM', '1TB SSD'],
    condition: 'New',
    category: 'Business'
  },
  {
    id: '6',
    name: 'Acer Aspire 5',
    originalPrice: 799.99,
    salePrice: 599.99,
    discount: 25,
    image: '/assets/images/acer-aspire-5.jpg',
    features: ['15.6-inch Full HD', 'AMD Ryzen 5', '8GB RAM', '256GB SSD'],
    condition: 'New',
    category: 'Student'
  },
  {
    id: '7',
    name: 'MSI Stealth 15M',
    originalPrice: 1599.99,
    salePrice: 1199.99,
    discount: 25,
    image: '/assets/images/msi-stealth.jpg',
    features: ['15.6-inch 144Hz display', 'Intel i7 11th Gen', '16GB RAM', 'NVIDIA RTX 2060'],
    condition: 'New',
    category: 'Gaming'
  },
  {
    id: '8',
    name: 'Apple MacBook Air M2',
    originalPrice: 1499.99,
    salePrice: 1299.99,
    discount: 13,
    image: '/assets/images/macbook-air-m2.jpg',
    features: ['13.6-inch Retina display', 'Apple M2 chip', '8GB RAM', '256GB SSD'],
    condition: 'New',
    category: 'Student'
  },
  {
    id: '9',
    name: 'Surface Laptop 4',
    originalPrice: 1399.99,
    salePrice: 1099.99,
    discount: 21,
    image: '/assets/images/surface-laptop-4.jpg',
    features: ['13.5-inch touch display', 'Intel i5 11th Gen', '16GB RAM', '512GB SSD'],
    condition: 'New',
    category: 'Business'
  },
  {
    id: '10',
    name: 'Razer Blade 14',
    originalPrice: 2199.99,
    salePrice: 1799.99,
    discount: 18,
    image: '/assets/images/razer-blade-14.jpg',
    features: ['14-inch QHD 165Hz', 'AMD Ryzen 9', '16GB RAM', 'NVIDIA RTX 3070'],
    condition: 'New',
    category: 'Gaming'
  },
  {
    id: '11',
    name: 'ASUS ZenBook 14',
    originalPrice: 1299.99,
    salePrice: 999.99,
    discount: 23,
    image: '/assets/images/zenbook-14.jpg',
    features: ['14-inch OLED display', 'Intel i5 12th Gen', '16GB RAM', '512GB SSD'],
    condition: 'New',
    category: 'Business'
  },
  {
    id: '12',
    name: 'Acer Nitro 5',
    originalPrice: 1099.99,
    salePrice: 849.99,
    discount: 23,
    image: '/assets/images/acer-nitro-5.jpg',
    features: ['15.6-inch 144Hz display', 'AMD Ryzen 5', '8GB RAM', 'NVIDIA GTX 1650'],
    condition: 'New',
    category: 'Gaming'
  },
  {
    id: '13',
    name: 'Dell Inspiron 15',
    originalPrice: 999.99,
    salePrice: 799.99,
    discount: 20,
    image: '/assets/images/dell-inspiron-15.jpg',
    features: ['15.6-inch Full HD', 'Intel i5 11th Gen', '8GB RAM', '512GB SSD'],
    condition: 'New',
    category: 'Student'
  },
  {
    id: '14',
    name: 'HP Envy 13',
    originalPrice: 1399.99,
    salePrice: 1099.99,
    discount: 21,
    image: '/assets/images/hp-envy-13.jpg',
    features: ['13.3-inch 4K display', 'Intel i7 11th Gen', '16GB RAM', '512GB SSD'],
    condition: 'New',
    category: 'Business'
  }
];

const useProducts = (category = 'All') => {
  const [products, setProducts] = useState(() => {
    const saved = localStorage.getItem('products');
    return saved ? JSON.parse(saved) : initialProducts;
  });

  // Sync products to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Filter products by category
  const getFilteredProducts = () => {
    if (category === 'All') {
      return products;
    }
    return products.filter(product => product.category === category);
  };

  // CRUD Operations
  const addProduct = (newProduct) => {
    setProducts(prev => [...prev, { ...newProduct, id: `${Date.now()}` }]);
  };

  const updateProduct = (id, updatedProduct) => {
    setProducts(prev =>
      prev.map(product =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(product => product.id !== id));
  };

  return {
    products: getFilteredProducts(),
    addProduct,
    updateProduct,
    deleteProduct,
    allProducts: products // Expose all products for admin use
  };
};

export default useProducts;