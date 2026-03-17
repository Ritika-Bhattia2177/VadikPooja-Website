import ProductCard from '../components/ProductCard.jsx';

export default function ItemsPage({ products, onAddToCart }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
        <div>
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Sacred Collection</h1>
          <p className="text-gray-500 text-lg">Authentic essentials for your daily rituals and sacred space.</p>
        </div>
        <div className="flex gap-4">
          <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#FF6F00]">
            <option>All Categories</option>
            <option>Incense</option>
            <option>Brass</option>
            <option>Idols</option>
          </select>
          <select className="px-4 py-2 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#FF6F00]">
            <option>Sort by: Popularity</option>
            <option>Price: Low to High</option>
            <option>Price: High to Low</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </div>
  );
}
