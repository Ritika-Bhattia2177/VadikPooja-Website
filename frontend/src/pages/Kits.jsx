import { motion } from 'motion/react';

export default function KitsPage({ kits, onAddToCart }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="text-center mb-16">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Ritual Kits</h1>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Thoughtfully curated sets containing everything you need for specific Vedic ceremonies and celebrations.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {kits.map((kit) => (
          <motion.div
            key={kit.id}
            whileHover={{ y: -5 }}
            className="bg-white rounded-[2.5rem] p-10 border border-orange-50 shadow-sm hover:shadow-xl transition-all flex flex-col md:flex-row gap-10"
          >
            <div className="w-full md:w-48 h-48 bg-linear-to-br from-orange-50 to-yellow-50 rounded-3xl flex items-center justify-center text-[#FF6F00] font-bold text-5xl shrink-0 shadow-inner">
              {kit.name.charAt(0)}
            </div>
            <div className="flex-1 flex flex-col">
              <h3 className="text-3xl font-bold text-gray-800 mb-4">{kit.name}</h3>
              <div className="bg-orange-50/50 p-4 rounded-2xl mb-8">
                <p className="text-gray-600 text-sm leading-relaxed">
                  <span className="font-bold text-[#FF6F00] block mb-1 uppercase tracking-widest text-xs">Included in Kit:</span>
                  {kit.items_included}
                </p>
              </div>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 uppercase font-bold tracking-widest">Price</span>
                  <span className="text-3xl font-bold text-[#FF6F00]">₹{kit.price}</span>
                </div>
                <button
                  onClick={() => onAddToCart(kit)}
                  className="bg-[#FF6F00] hover:bg-[#FF9933] text-white px-10 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-100 transform hover:scale-105"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
