import { useState, useMemo } from 'react';
import PanditCard from '../components/PanditCard.jsx';
import HowItWorks from '../components/HowItWorks.jsx';

export default function PanditsPage({ pandits, onBook }) {
  const [sortBy, setSortBy] = useState('all');

  const sortedPandits = useMemo(() => {
    if (!pandits) return [];
    const panditsCopy = [...pandits];
    
    switch (sortBy) {
      case 'experience':
        return panditsCopy.sort((a, b) => {
          const expA = parseInt((a.experience || '').toString().match(/\d+/)?.[0] || 0);
          const expB = parseInt((b.experience || '').toString().match(/\d+/)?.[0] || 0);
          return expB - expA;
        });
      case 'rating':
        return panditsCopy.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'all':
      default:
        return panditsCopy;
    }
  }, [pandits, sortBy]);

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="flex flex-col md:flex-row justify-between items-center mb-16 gap-8">
          <div className="max-w-2xl">
            <h1 className="text-5xl font-bold text-gray-800 mb-4">Vedic Scholars</h1>
            <p className="text-gray-500 text-lg">Book experienced and verified pandits for authentic Vedic rituals at your home or office.</p>
          </div>
          <div className="flex bg-white p-2 rounded-2xl border border-gray-100 shadow-sm">
            <button 
              onClick={() => setSortBy('all')}
              className={`px-6 py-2 rounded-xl font-bold transition-colors ${sortBy === 'all' ? 'bg-[#FF6F00] text-white' : 'text-gray-500 hover:text-[#FF6F00]'}`}
            >
              All Pandits
            </button>
            <button 
              onClick={() => setSortBy('experience')}
              className={`px-6 py-2 rounded-xl font-bold transition-colors ${sortBy === 'experience' ? 'bg-[#FF6F00] text-white' : 'text-gray-500 hover:text-[#FF6F00]'}`}
            >
              By Experience
            </button>
            <button 
              onClick={() => setSortBy('rating')}
              className={`px-6 py-2 rounded-xl font-bold transition-colors ${sortBy === 'rating' ? 'bg-[#FF6F00] text-white' : 'text-gray-500 hover:text-[#FF6F00]'}`}
            >
              By Rating
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 pb-16">
          {sortedPandits.map((pandit) => (
            <PanditCard key={pandit.id} pandit={pandit} onBook={onBook} />
          ))}
        </div>
      </div>
      <HowItWorks />
    </>
  );
}
