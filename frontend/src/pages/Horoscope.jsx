import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, RefreshCcw, ShieldCheck } from 'lucide-react';

const SIGNS = [
  'aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'
];

const DAY_OPTIONS = [
  { label: 'Today', value: 'today' },
  { label: 'Yesterday', value: 'yesterday' },
  { label: 'Tomorrow', value: 'tomorrow' },
];

export default function HoroscopePage() {
  const [sign, setSign] = useState('aries');
  const [day, setDay] = useState('today');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [refreshTick, setRefreshTick] = useState(0);

  const title = useMemo(() => sign.charAt(0).toUpperCase() + sign.slice(1), [sign]);

  useEffect(() => {
    const fetchHoroscope = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/horoscope?sign=${sign}&day=${day}`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Failed to fetch horoscope');
        }
        const json = await res.json();
        setData(json);
      } catch (err) {
        setError(err.message || 'Something went wrong');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHoroscope();
  }, [sign, day, refreshTick]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <p className="text-[#FF6F00] font-bold tracking-widest uppercase text-xs">Daily Guidance</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Horoscope</h1>
          <p className="text-gray-500 mt-3 max-w-2xl">Powered by the free Aztro API. Select your sign and day to see your reading.</p>
        </div>
        <div className="flex gap-3 flex-wrap">
          <select
            value={sign}
            onChange={(e) => setSign(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#FF6F00] text-sm"
          >
            {SIGNS.map((s) => (
              <option key={s} value={s}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>
            ))}
          </select>
          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className="px-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:border-[#FF6F00] text-sm"
          >
            {DAY_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
          <button
            onClick={() => setRefreshTick((t) => t + 1)}
            className="inline-flex items-center gap-2 px-4 py-3 bg-orange-50 text-[#FF6F00] rounded-xl border border-orange-100 hover:bg-orange-100 transition-colors text-sm"
            title="Refresh"
          >
            <RefreshCcw size={16} />
            Refresh
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-50">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#FF6F00] font-bold">{day}</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-2">{title}</h2>
                {data?.date_range && (
                  <p className="text-gray-500 text-sm mt-1">Date range: {data.date_range}</p>
                )}
              </div>
              <div className="flex items-center gap-2 text-sm bg-orange-50 text-[#FF6F00] px-3 py-2 rounded-full border border-orange-100">
                <ShieldCheck size={16} />
                Free Aztro API
              </div>
            </div>

            {loading && (
              <div className="flex items-center justify-center py-12 text-gray-500">
                <Loader2 className="animate-spin mr-2" size={20} /> Loading horoscope...
              </div>
            )}

            {error && !loading && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm">
                {error}
              </div>
            )}

            {!loading && !error && data && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="md:col-span-2 bg-orange-50/60 border border-orange-100 rounded-2xl p-4">
                    <p className="text-sm uppercase tracking-[0.2em] text-[#FF6F00] font-bold mb-2">Summary</p>
                    <p className="text-base text-gray-800 leading-relaxed">{data.description}</p>
                  </div>
                  <div className="bg-white border border-orange-100 rounded-2xl p-4 shadow-[0_8px_30px_-16px_rgba(0,0,0,0.25)]">
                    <p className="text-xs uppercase tracking-[0.25em] text-gray-400 font-bold mb-2">Date</p>
                    <p className="text-lg font-semibold text-gray-900">{data.current_date}</p>
                    {data.date_range && <p className="text-xs text-gray-500 mt-1">Range: {data.date_range}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <Info label="Mood" value={data.mood} />
                  <Info label="Color" value={data.color} />
                  <Info label="Lucky Number" value={data.lucky_number} />
                  <Info label="Lucky Time" value={data.lucky_time} />
                  <Info label="Compatibility" value={data.compatibility} />
                  <Info label="Lucky Day" value={day} />
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-linear-to-br from-[#FF6F00] to-[#FF9933] text-white rounded-3xl p-6 shadow-lg">
            <p className="text-xs uppercase tracking-widest opacity-80">Tip</p>
            <h3 className="text-2xl font-bold mt-2 mb-3">Daily Refresh</h3>
            <p className="text-white/90 text-sm">Horoscope updates once a day. Switch day or sign to get fresh guidance.</p>
          </div>
          <div className="bg-white rounded-3xl p-6 border border-orange-50 shadow-sm">
            <p className="text-sm text-gray-600">API Source</p>
            <p className="font-bold text-gray-900 mt-1">aztro.sameerkumar.website</p>
            <p className="text-xs text-gray-500 mt-2">No API key needed. We POST with sign and day (today/yesterday/tomorrow).</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value, pill = false }) {
  return (
    <div className={`flex items-center gap-2 ${pill ? '' : 'bg-gray-50 p-3 rounded-xl border border-gray-100'}`}>
      <span className="text-xs uppercase tracking-widest text-gray-400 font-bold">{label}</span>
      <span className="font-semibold text-gray-800">{value || '—'}</span>
    </div>
  );
}
