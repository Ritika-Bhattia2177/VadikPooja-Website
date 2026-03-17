import PanditCard from '../components/PanditCard.jsx';

export default function PanditsPage({ pandits, onBook }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">Vedic Scholars</h1>
          <p className="text-gray-500 text-lg">Book experienced and verified pandits for authentic Vedic rituals at your home or office.</p>
        </div>
        <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
          <button className="px-6 py-2 bg-[#FF6F00] text-white rounded-xl font-bold">All Pandits</button>
          <button className="px-6 py-2 text-gray-500 hover:text-[#FF6F00]">By Experience</button>
          <button className="px-6 py-2 text-gray-500 hover:text-[#FF6F00]">By Rating</button>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {pandits.map((pandit) => (
          <PanditCard key={pandit.id} pandit={pandit} onBook={onBook} />
        ))}
      </div>
    </div>
  );
}
