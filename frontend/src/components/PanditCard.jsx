import React from 'react';
import { Star, MapPin, Languages, Award } from 'lucide-react';

export default function PanditCard({ pandit, onBook }) {

  // 🔥 HANDLE STRING → ARRAY (MAIN FIX)
  const languages = typeof pandit.languages === "string"
    ? JSON.parse(pandit.languages)
    : pandit.languages || [];

  const specialization = typeof pandit.specialization === "string"
    ? JSON.parse(pandit.specialization)
    : pandit.specialization || [];

  const poojaTypes = typeof pandit.poojaTypes === "string"
    ? JSON.parse(pandit.poojaTypes)
    : pandit.poojaTypes || [];

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100 flex flex-col sm:flex-row">
      
      {/* IMAGE */}
      <div className="w-full sm:w-48 h-48 sm:h-auto overflow-hidden">
        <img 
          src={pandit.image} 
          alt={pandit.name} 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* CONTENT */}
      <div className="p-6 flex-1 flex flex-col justify-between">
        
        <div>
          {/* NAME + RATING */}
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-bold text-gray-800">{pandit.name}</h3>
            <div className="flex items-center bg-orange-50 text-[#FF6F00] px-2 py-1 rounded-lg text-sm font-bold">
              <Star size={14} className="mr-1 fill-current" />
              {pandit.rating}
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
            
            <div className="flex items-center text-gray-600 text-sm">
              <Award size={16} className="mr-2 text-[#FF6F00]" />
              <span>{pandit.experience} Years Experience</span>
            </div>

            <div className="flex items-center text-gray-600 text-sm">
              <MapPin size={16} className="mr-2 text-[#FF6F00]" />
              <span>{pandit.city}</span>
            </div>

            {/* ✅ LANGUAGES FIX */}
            <div className="flex items-center text-gray-600 text-sm col-span-full">
              <Languages size={16} className="mr-2 text-[#FF6F00]" />
              <span>{languages.join(", ")}</span>
            </div>
          </div>

          {/* ✅ SPECIALIZATION */}
          {specialization.length > 0 && (
            <p className="text-sm text-gray-700 mb-1">
              <strong>Specialization:</strong> {specialization.join(", ")}
            </p>
          )}

          {/* ✅ DESCRIPTION */}
          {pandit.description && (
            <p className="text-sm text-gray-500 mb-2">
              {pandit.description}
            </p>
          )}

          {/* 🔥 MAIN FIX: POOJA TYPES */}
          {poojaTypes.length > 0 && (
            <div className="mb-3 mt-2">
              <strong className="text-sm text-gray-800 block mb-2">Pooja:</strong>
              <div className="flex flex-wrap gap-2">
                {poojaTypes.map((pooja, index) => (
                  <span
                    key={index}
                    className="text-xs bg-orange-50 border border-orange-200 text-[#FF6F00] font-bold px-3 py-1 rounded-full shadow-sm"
                  >
                    {pooja}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* PRICE + AVAILABILITY */}
          <div className="flex items-center justify-between mt-2">
            
            {/* PRICE */}
            {pandit.price && (
              <span className="text-lg font-bold text-[#FF6F00]">
                ₹{pandit.price}
              </span>
            )}

            {/* AVAILABILITY */}
            {pandit.availability && (
              <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                pandit.availability === "Available"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-600"
              }`}>
                {pandit.availability}
              </span>
            )}
          </div>

        </div>

        {/* BUTTON */}
        <div className="flex justify-end mt-4">
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