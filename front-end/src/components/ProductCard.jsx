// src/components/ProductCard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({ product }) => {
  return (
    <div className="border rounded p-4">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover mb-2"
      />
      <h3 className="font-bold text-lg">{product.title}</h3>
      <p className="text-gray-700">GHS {product.price}</p>
      <div className="mt-2 flex justify-between">
        <Link to={`/product/${product.id}`} className="text-blue-500">
          View Details
        </Link>
        <a
          href={`https://wa.me/?text=I'm interested in ${product.title}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-500 text-white px-2 py-1 rounded"
        >
          Buy on WhatsApp
        </a>
      </div>
    </div>
  )
}

export default ProductCard
