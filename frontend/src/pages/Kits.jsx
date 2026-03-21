import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import WhyRitualsMatter from '../components/WhyRitualsMatter';
import { Search } from 'lucide-react';

export default function KitsPage({ onAddToCart }) {
  const [kits, setKits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchKits = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/ritual-kits');
        
        if (!response.ok) {
          throw new Error(`Error fetching kits: ${response.status}`);
        }
        
        const result = await response.json();
        // Since the backend returns { success: true, count: X, data: [...] }
        setKits(result.data || []);
      } catch (err) {
        console.error('Failed to fetch ritual kits:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchKits();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-[#FF6F00]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center">
          <h2 className="text-2xl font-bold mb-2">Oops! Something went wrong.</h2>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-red-600 text-white px-6 py-2 rounded-xl"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const filteredKits = kits.filter(kit => {
    const searchLower = searchQuery.toLowerCase();
    const itemsIncludedStr = Array.isArray(kit.itemsIncluded) ? kit.itemsIncluded.join(' ') : (kit.itemsIncluded || kit.items_included || '');
    
    return (
      kit.name.toLowerCase().includes(searchLower) ||
      (kit.category && kit.category.toLowerCase().includes(searchLower)) ||
      itemsIncludedStr.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mt-10">
      <div className="text-center mb-10 space-y-4">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">Divine Ritual Kits</h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto cursor-default">
          Thoughtfully curated, complete pooja sets containing all essential samagri for your specific Vedic ceremonies and celebrations.
        </p>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mt-8 relative">
          <div className="relative flex items-center w-full h-12 rounded-full focus-within:shadow-lg bg-white overflow-hidden border border-gray-200 hover:border-orange-300 transition-colors duration-300">
            <div className="grid place-items-center h-full w-12 text-gray-400">
              <Search size={20} />
            </div>
            <input
              className="peer h-full w-full outline-none text-sm text-gray-700 pr-2 bg-transparent"
              type="text"
              id="search"
              placeholder="Search by kit name, category or items included..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      {filteredKits.length === 0 ? (
        <div className="text-center text-gray-500 py-10">
          <p className="text-xl">{searchQuery ? `No kits found matching "${searchQuery}"` : "No ritual kits available at the moment."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredKits.map((kit) => {
            const itemsStr = Array.isArray(kit.itemsIncluded) 
                ? kit.itemsIncluded.join(', ') 
                : (kit.itemsIncluded || kit.items_included || '');
            const itemsArr = itemsStr.split(',').map(i => i.trim()).filter(Boolean);
            
            return (
              <motion.div
                key={kit._id || kit.id}
                whileHover={{ y: -6 }}
                className="bg-white rounded-2xl flex flex-col border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="relative h-56 w-full bg-orange-50 overflow-hidden group flex items-center justify-center">
                  <img
                    src={kit.image}
                    alt={kit.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                    onError={(e) => { 
                      // If the original URL fails (like unsplash blocks), show a safe geometric fallback using ui-avatars
                      const fallbackText = kit.name.split(' ').map(n => n[0]).join('').substring(0, 2);
                      e.target.onerror = null; 
                      e.target.src = `https://ui-avatars.com/api/?name=${fallbackText}&background=FF6F00&color=fff&size=256&font-size=0.33`;
                    }}
                  />
                  {kit.category && (
                    <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm text-orange-600 text-xs font-bold px-3 py-1 rounded-full shadow-sm">
                      {kit.category}
                    </div>
                  )}
                </div>
                
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1" title={kit.name}>{kit.name}</h3>
                  
                  {kit.description && (
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2" title={kit.description}>
                      {kit.description}
                    </p>
                  )}
                  
                  <div className="mb-6 flex-1 bg-orange-50/50 rounded-xl p-3 border border-orange-100/50">
                    <h4 className="text-[10px] font-bold text-orange-600 uppercase tracking-widest mb-2">Essential Items Included:</h4>
                    <ul className="text-sm text-gray-700 space-y-1.5">
                      {itemsArr.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="text-orange-400 mr-2 text-xs mt-0.5">●</span>
                          <span className="truncate">{item}</span>
                        </li>
                      ))}
                      {itemsArr.length > 3 && (
                        <li className="text-xs font-medium text-gray-400 italic pt-1 pl-4">
                          + {itemsArr.length - 3} more sacred items
                        </li>
                      )}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto pt-2">
                    <div className="flex flex-col">
                      <span className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Price</span>
                      <span className="text-2xl font-extrabold text-gray-900">₹{kit.price}</span>
                    </div>
                    <button
                      onClick={() => onAddToCart(kit)}
                      className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white px-5 py-2.5 rounded-lg font-semibold transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* New Section Placed Here */}
      <WhyRitualsMatter />
    </div>
  );
}
