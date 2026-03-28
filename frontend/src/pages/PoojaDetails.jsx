import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PoojaCard from '../components/PoojaCard.jsx';
import Faq from '../components/Faq.jsx';

const API = import.meta.env.VITE_API_URL || 'https://api.vaidikpooja.in';

export default function PoojaDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [pooja, setPooja] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;

    async function loadOne() {
      try {
        const res = await fetch(`${API}/api/poojas/${id}`);
        if (!res.ok) throw new Error(`Server returned ${res.status}`);

        const data = await res.json();
        if (mounted) setPooja(data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    loadOne();
    return () => { mounted = false };
  }, [id]);

  // ✅ Normalize benefits/items
  const normalizeList = (val) => {
    if (!val) return [];
    if (Array.isArray(val)) return val;

    try {
      const parsed = JSON.parse(val);
      if (Array.isArray(parsed)) return parsed;
    } catch {}

    return val.split(',').map(v => v.trim());
  };

  const benefitsArr = normalizeList(pooja?.benefits);
  const itemsArr = normalizeList(pooja?.items);

  // ✅ FIXED KEYS (IMPORTANT)
  const sectionKeys = [
    { key: 'religious_philosophy', title: 'Religious Philosophy' },
    { key: 'puja_vidhi', title: 'Puja Vidhi' },
    { key: 'samagri', title: 'Samagri' }, // ✅ FIX
    { key: 'cultural_acceptance', title: 'Cultural Acceptance' } // ✅ FIX
  ];

  // ✅ Simple mapping
  const getSectionContent = (key) => {
    if (!pooja) return null;
    return pooja[key];
  };

  const renderSection = (content) => {
    if (!content) {
      return <p className="text-gray-500 text-sm">Content will be added soon.</p>;
    }

    return (
      <p className="text-gray-700 text-sm leading-relaxed">
        {content}
      </p>
    );
  };

  // ================= UI =================

  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;
  if (!pooja) return <div className="p-10">Pooja not found</div>;

  return (
    <div className="max-w-6xl mx-auto px-4 pt-28 pb-16">

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
        <ol className="list-reset flex items-center space-x-2">
          <li>
            <Link to="/" className="hover:underline">Home</Link>
          </li>
          <li className="text-gray-300">/</li>
          <li>
            <Link to="/poojas" className="hover:underline">Poojas</Link>
          </li>
          <li className="text-gray-300">/</li>
          <li className="font-medium text-gray-800">{pooja.name}</li>
        </ol>
      </nav>

      {/* IMAGE */}
      <img
        src={pooja.image}
        alt={pooja.name}
        className="w-full h-80 object-cover rounded-xl mb-6"
      />

      <div className="grid md:grid-cols-3 gap-6">

        {/* LEFT */}
        <div className="md:col-span-2">
          <h1 className="text-3xl font-bold">{pooja.name}</h1>

          <p className="mt-3 text-gray-600">
            {pooja.description}
          </p>

          {/* BENEFITS */}
          {benefitsArr.length > 0 && (
            <>
              <h2 className="mt-6 font-semibold text-xl">Benefits</h2>
              <ul className="list-disc ml-6 mt-2">
                {benefitsArr.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            </>
          )}
        </div>

        {/* RIGHT CARD */}
        <div className="bg-gray-100 p-6 rounded-xl shadow">

          <p className="text-lg font-semibold">Price</p>
          <p className="text-orange-500 text-2xl font-bold">
            ₹{pooja.price}
          </p>

          <h3 className="mt-4 font-semibold">Required Items</h3>
          <ul className="list-disc ml-5 mt-2">
            {itemsArr.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <button
            onClick={() => navigate('/pandits')}
            className="mt-6 w-full bg-orange-500 text-white py-3 rounded-lg"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* ACCORDION */}
      <div className="mt-10">
        {sectionKeys.map((section) => (
          <details key={section.key} className="mb-4">
            <summary className="bg-orange-500 text-white px-4 py-3 rounded cursor-pointer flex justify-between items-center">
              {section.title}
              <span>▼</span>
            </summary>

            <div className="p-4 border rounded mt-2 bg-white">
              {renderSection(getSectionContent(section.key))}
            </div>
          </details>
        ))}
      </div>

      {/* RELATED */}
      <div className="mt-12">
        <h3 className="text-xl font-semibold mb-4">Related Poojas</h3>
        <RelatedPoojas currentId={pooja.id} />
      </div>

      {/* FAQ */}
      <div className="mt-12">
        <Faq />
      </div>

    </div>
  );
}

// ================= RELATED =================

function RelatedPoojas({ currentId }) {
  const [list, setList] = useState([]);

  useEffect(() => {
    fetch(`${API}/api/poojas`)
      .then(res => res.json())
      .then(data => {
        const filtered = data.filter(p => p.id !== currentId).slice(0, 4);
        setList(filtered);
      });
  }, [currentId]);

  return (
    <div className="grid md:grid-cols-4 gap-4">
      {list.map((p) => (
        <PoojaCard key={p.id} pooja={p} />
      ))}
    </div>
  );
}