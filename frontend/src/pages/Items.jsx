import React, { useState, useMemo } from 'react';
import ProductCard from '../components/ProductCard.jsx';
import { ShieldCheck, Truck, Users, Award, Search } from 'lucide-react';

export default function ItemsPage({ products, onAddToCart }) {
  const [category, setCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("Sort by: Popularity");
  const [searchQuery, setSearchQuery] = useState("");

  const categories = useMemo(() => {
    const cats = products.map(p => p.category).filter(Boolean);
    return ["All Categories", ...new Set(cats)];
  }, [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Search Filter
    if (searchQuery.trim() !== '') {
      const lowerQuery = searchQuery.toLowerCase();
      result = result.filter(p => {
        const nameMatch = p.name ? p.name.toLowerCase().includes(lowerQuery) : false;
        const descMatch = p.description ? p.description.toLowerCase().includes(lowerQuery) : false;
        return nameMatch || descMatch;
      });
    }

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
  }, [products, category, sortBy, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Sacred Collection</h1>
          <p className="text-gray-500 text-lg">Authentic essentials for your daily rituals and sacred space.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <div className="relative flex-grow sm:flex-grow-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text" 
              placeholder="Search items..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#FF6F00] w-full sm:w-56"
            />
          </div>
          <select 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#FF6F00] flex-grow sm:flex-grow-0"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <select 
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#FF6F00] flex-grow sm:flex-grow-0"
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
