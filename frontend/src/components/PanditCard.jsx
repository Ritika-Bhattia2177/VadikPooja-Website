import React from 'react';
import { Star, MapPin, Languages, Award } from 'lucide-react';
export default function PanditCard({ pandit, onBook }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col sm:flex-row">
      <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
        <img 
          src={pandit.image} 
          alt={pandit.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{pandit.name}</h3>
            <div className="flex items-center bg-orange-50 text-[#FF6F00] px-2 py-1 rounded-lg text-sm font-bold">
              <Star size={14} className="mr-1 fill-current" />
              {pandit.rating}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-gray-600 text-sm">
              <Award size={16} className="mr-2 text-[#FF6F00]" />
              <span>{pandit.experience} Years Experience</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm">
              <MapPin size={16} className="mr-2 text-[#FF6F00]" />
              <span>{pandit.city}</span>
            </div>
            <div className="flex items-center text-gray-600 text-sm col-span-full">
              <Languages size={16} className="mr-2 text-[#FF6F00]" />
              <span>{pandit.languages}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button 
            onClick={() => onBook(pandit)}
            className="bg-[#FF6F00] hover:bg-[#FF9933] text-white px-6 py-2 rounded-xl font-bold transition-colors shadow-sm"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
