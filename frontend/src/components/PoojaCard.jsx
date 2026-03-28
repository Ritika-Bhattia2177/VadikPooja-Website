import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function PoojaCard({ pooja }) {
  const navigate = useNavigate();
  const image = pooja?.image || 'https://via.placeholder.com/1200x800?text=Pooja';
  const name = pooja?.name || 'Untitled Pooja';
  const shortDesc = pooja?.shortDescription || pooja?.description || '';
  const price = pooja?.price;

  const go = () => {
    if (pooja && pooja.id) navigate(`/pooja/${pooja.id}`);
  };

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      go();
    }
  };

  return (
    <article
      className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm transform transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`Open details for ${name}`}
      onClick={go}
      onKeyDown={onKey}
    >
      <div className="w-full h-44 sm:h-48 md:h-40 lg:h-44 overflow-hidden bg-gray-100">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="p-4 sm:p-5 flex flex-col justify-between h-44">
        <div>
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 line-clamp-2">{name}</h3>
          {shortDesc && (
            <p className="text-sm text-gray-600 mt-2 line-clamp-3">{shortDesc}</p>
          )}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div>
            {price ? (
              <span className="text-lg font-extrabold text-[#FF6F00]">₹{price}</span>
            ) : (
              <span className="text-sm text-gray-500">Contact for price</span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              go();
            }}
            className="inline-block bg-[#FF6F00] hover:bg-[#ff8f33] text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            aria-label={`View details for ${name}`}
          >
            View Details
          </button>
        </div>
      </div>
    </article>
  );
}
