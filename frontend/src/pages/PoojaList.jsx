import React, { useEffect, useState } from 'react';
import PoojaCard from '../components/PoojaCard.jsx';
import Faq from '../components/Faq.jsx';

const API = import.meta.env.VITE_API_URL || 'https://api.vaidikpooja.in';

export default function PoojaList() {
  const [poojas, setPoojas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`${API}/api/poojas`);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);
        const data = await res.json();
        if (!mounted) return;
        setPoojas(Array.isArray(data) ? data : []);
      } catch (err) {
        if (!mounted) return;
        console.error('Failed to load poojas:', err);
        setError(err.message || 'Failed to load poojas');
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => { mounted = false };
  }, []);

  return (
    <div className="container mx-auto pt-28 pb-12 px-4 sm:px-6 lg:px-8">
      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <ol className="list-reset flex items-center space-x-2">
          <li>
            <a href="/" className="hover:underline">Home</a>
          </li>
          <li className="text-gray-300">/</li>
          <li className="font-medium text-gray-800">Poojas</li>
        </ol>
      </nav>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">All Poojas</h2>
        <div className="w-full sm:w-1/3 ml-0 sm:ml-6">
          <label htmlFor="pooja-search" className="sr-only">Search poojas</label>
          <input
            id="pooja-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for pooja or ritual (name, description)..."
            className="w-full border border-gray-200 rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-[#FF6F00]"
          />
        </div>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-64 bg-white rounded-2xl p-4 border border-gray-100 shadow-sm animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-600">Error: {error}</div>
      ) : (
        (() => {
          const q = query.trim().toLowerCase();
          const filtered = q
            ? poojas.filter((p) => {
                const name = p.name || '';
                const desc = p.description || p.shortDescription || '';
                return (name + ' ' + desc).toLowerCase().includes(q);
              })
            : poojas;

          if (!filtered || filtered.length === 0) {
            return <div className="text-center py-16 text-gray-500">No poojas found for "{query}".</div>;
          }

          return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <PoojaCard key={p.id} pooja={p} />
              ))}
            </div>
          );
        })()
      )}

      {/* FAQ section for poojas page */}
      <div className="mt-12">
        <Faq />
      </div>
    </div>
  );
}
