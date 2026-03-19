import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { ShieldCheck, Truck, Users, Award } from 'lucide-react';

export default function ItemsPage({ products, onAddToCart }) {
  const [category, setCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Sort by: Popularity");

  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean);
    return ["All Categories", ...new Set(cats)];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (category !== "All Categories") {
      result = result.filter(p => p.category === category);
    }

    // Sort
    if (sortBy === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    }

    return result;
  }, [products, category, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Sacred Collection</h1>
          <p className="text-gray-500 text-lg">Authentic essentials for your daily rituals and sacred space.</p>
        </div>
        <div className="flex gap-4">
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#FF6F00]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#FF6F00]"
          >
            <option>Sort by: Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {filteredAndSortedProducts.map((product) => (
          <ProductCard key={product._id || product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>

      {/* Why Choose Us Section */}
      <div className="mt-32 mb-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose Us</h2>
          <p className="text-gray-500 text-lg">We bring purity and divinity directly to your doorstep.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: ShieldCheck, title: "100% Authentic", desc: "Genuine pooja items sourced directly." },
            { icon: Truck, title: "Fast Delivery", desc: "Quick and secure shipping right to your door." },
            { icon: Users, title: "Trusted by Devotees", desc: "Thousands of satisfied customers worldwide." },
            { icon: Award, title: "Premium Quality", desc: "Highest standards for your sacred rituals." }
          ].map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-8 bg-orange-50 rounded-3xl hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-[#FF6F00] text-white rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                <feature.icon size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
