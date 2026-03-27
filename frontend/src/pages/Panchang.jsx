import { useEffect, useState } from 'react';


export default function PanchangPage() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [latitude, setLatitude] = useState(28.6139);
  const [longitude, setLongitude] = useState(77.2090);
  const [ayanamsa, setAyanamsa] = useState(1);
  const [la, setLa] = useState('en');

  const fetchPanchang = async (e) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError('');
    setData(null);
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      // datetime in ISO 8601 with time and timezone
      const dt = `${date}T10:00:00+05:30`;
      const params = new URLSearchParams({
        ayanamsa,
        latitude,
        longitude,
        datetime: dt,
        la
      });
      const res = await fetch(`${apiUrl}/api/panchang?${params.toString()}`);
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || 'Failed to fetch Panchang');
      }
      const json = await res.json();
      setData(json.data || json);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <p className="text-[#FF6F00] font-bold tracking-widest uppercase text-xs">Daily Guidance</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Panchang</h1>
          <p className="text-gray-500 mt-3 max-w-2xl">Get your daily Panchang. See today's Hindu calendar details including tithi, nakshatra, yoga, and more.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <div className="bg-orange-50 text-[#FF6F00] rounded-xl border border-orange-100 px-6 py-4 flex flex-col items-center justify-center min-w-45">
            <span className="font-bold text-lg mb-1">Tip</span>
            <span className="font-semibold text-base">Daily Refresh</span>
            <span className="text-xs text-gray-500 mt-1 text-center">Panchang updates once a day. Refresh the page to get the latest details.</span>
          </div>
        </div>
      </div>

      <form onSubmit={fetchPanchang} className="bg-white rounded-3xl p-8 shadow-sm border border-orange-50 mb-8 max-w-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-bold mb-2">Date</label>
            <input type="date" className="w-full px-4 py-3 border rounded-xl" value={date} onChange={e => setDate(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Ayanamsa</label>
            <select className="w-full px-4 py-3 border rounded-xl" value={ayanamsa} onChange={e => setAyanamsa(e.target.value)}>
              <option value={1}>Lahiri (1)</option>
              <option value={3}>Raman (3)</option>
              <option value={5}>KP (5)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Latitude</label>
            <input type="number" step="0.0001" className="w-full px-4 py-3 border rounded-xl" value={latitude} onChange={e => setLatitude(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Longitude</label>
            <input type="number" step="0.0001" className="w-full px-4 py-3 border rounded-xl" value={longitude} onChange={e => setLongitude(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-bold mb-2">Language</label>
            <select className="w-full px-4 py-3 border rounded-xl" value={la} disabled>
              <option value="en">English</option>
            </select>
          </div>
        </div>
        <button type="submit" className="bg-[#FF6F00] hover:bg-[#FF9933] text-white font-bold py-3 px-8 rounded-xl transition-colors shadow-lg">Get Panchang</button>
      </form>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-50 mb-8">
            {loading && (
              <div className="flex items-center justify-center py-12 text-gray-500">Loading Panchang...</div>
            )}
            {error && !loading && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm">{error}</div>
            )}
            {!loading && !error && data && (
              <div>
                <h2 className="text-2xl font-bold mb-4">Panchang for {date}</h2>
                {/* Sun/Moon Timings */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                  <div className="bg-yellow-50 rounded-xl p-4 flex flex-col items-center">
                    <span className="font-bold text-lg">Sunrise</span>
                    <span>{data.sunrise}</span>
                  </div>
                  <div className="bg-orange-50 rounded-xl p-4 flex flex-col items-center">
                    <span className="font-bold text-lg">Sunset</span>
                    <span>{data.sunset}</span>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 flex flex-col items-center">
                    <span className="font-bold text-lg">Moonrise</span>
                    <span>{data.moonrise}</span>
                  </div>
                  <div className="bg-indigo-50 rounded-xl p-4 flex flex-col items-center">
                    <span className="font-bold text-lg">Moonset</span>
                    <span>{data.moonset}</span>
                  </div>
                </div>

                {/* Transition Timing */}
                <div className="bg-red-50/30 rounded-2xl p-6 mb-8">
                  <h3 className="font-bold text-xl mb-4">Transition Timing</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Tithi Transition */}
                    {data.tithi?.[0] && (
                      <div className="border-2 border-pink-300 rounded-xl p-4">
                        <div className="font-bold">Tithi Ends</div>
                        <div>Next: {data.tithi?.[1]?.name || '—'}</div>
                        <div className="text-pink-600 font-bold text-xl mt-2">
                          {data.tithi?.[0]?.end ? new Date(data.tithi[0].end).toLocaleTimeString() : '—'}
                        </div>
                      </div>
                    )}
                    {/* Nakshatra Transition */}
                    {data.nakshatra?.[0] && (
                      <div className="border-2 border-orange-200 rounded-xl p-4">
                        <div className="font-bold">Nakshatra</div>
                        <div>Next: {data.nakshatra?.[1]?.name || '—'}</div>
                        <div className="text-orange-500 font-bold text-xl mt-2">
                          {data.nakshatra?.[0]?.end ? new Date(data.nakshatra[0].end).toLocaleTimeString() : '—'}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Nakshatra Section */}
                <div className="bg-yellow-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-lg mb-3">Nakshatra</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data.nakshatra?.map(n => (
                      <div key={n.id} className="border border-yellow-200 rounded-xl p-4">
                        <div className="font-semibold">{n.name} <span className="text-xs text-gray-500">(Lord: {n.lord?.name})</span></div>
                        <div className="text-sm text-gray-600">Start: {n.start}</div>
                        <div className="text-sm text-gray-600">End: {n.end}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tithi Section */}
                <div className="bg-pink-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-lg mb-3">Tithi</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data.tithi?.map(t => (
                      <div key={t.id} className="border border-pink-200 rounded-xl p-4">
                        <div className="font-semibold">{t.name} <span className="text-xs text-gray-500">({t.paksha})</span></div>
                        <div className="text-sm text-gray-600">Start: {t.start}</div>
                        <div className="text-sm text-gray-600">End: {t.end}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Karana Section */}
                <div className="bg-blue-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-lg mb-3">Karana</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data.karana?.map(k => (
                      <div key={k.id} className="border border-blue-200 rounded-xl p-4">
                        <div className="font-semibold">{k.name}</div>
                        <div className="text-sm text-gray-600">Start: {k.start}</div>
                        <div className="text-sm text-gray-600">End: {k.end}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Yoga Section */}
                <div className="bg-green-50 rounded-2xl p-6 mb-6">
                  <h3 className="font-bold text-lg mb-3">Yoga</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {data.yoga?.map(y => (
                      <div key={y.id} className="border border-green-200 rounded-xl p-4">
                        <div className="font-semibold">{y.name}</div>
                        <div className="text-sm text-gray-600">Start: {y.start}</div>
                        <div className="text-sm text-gray-600">End: {y.end}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
