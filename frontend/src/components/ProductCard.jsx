import React from 'react';
import { ShoppingCart, Star } from 'lucide-react';
export default function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 group">
      <div className="relative h-56 overflow-hidden bg-gray-50/50 p-4 flex items-center justify-center">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-white/90 backdrop-blur-sm text-[#FF6F00] text-xs font-bold px-2 py-1 rounded-full shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{product.name}</h3>
        <p className="text-gray-500 text-sm mb-4 line-clamp-2 h-10">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-[#FF6F00]">₹{product.price}</span>
          <button 
            onClick={() => onAddToCart(product)}
            className="bg-[#FF6F00] hover:bg-[#FF9933] text-white p-2 rounded-xl transition-colors shadow-sm"
          >
            <ShoppingCart size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
