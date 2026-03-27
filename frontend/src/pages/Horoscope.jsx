import { useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Loader2, RefreshCcw, ShieldCheck } from 'lucide-react';

const SIGNS = [
  'aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'
];



export default function HoroscopePage() {
  const [sign, setSign] = useState('aries');
  // Removed day selection, always 'today'
  const [refreshTick, setRefreshTick] = useState(0);
  // Prokerala states
  const [prokeralaData, setProkeralaData] = useState(null);
  const [prokeralaLoading, setProkeralaLoading] = useState(false);
  const [prokeralaError, setProkeralaError] = useState('');

  const title = useMemo(() => sign.charAt(0).toUpperCase() + sign.slice(1), [sign]);

  useEffect(() => {
    // Only Prokerala fetch
    const fetchProkerala = async () => {
      setProkeralaLoading(true);
      setProkeralaError('');
      setProkeralaData(null);
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const res = await fetch(`${apiUrl}/api/horoscope/prokerala?sign=${sign}&type=general`);
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || 'Failed to fetch Prokerala horoscope');
        }
        const json = await res.json();
        console.log('Prokerala API response:', json);
        setProkeralaData(json);
      } catch (err) {
        setProkeralaError(err.message || 'Something went wrong');
      } finally {
        setProkeralaLoading(false);
      }
    };
    fetchProkerala();
  }, [sign, refreshTick]);



  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <p className="text-[#FF6F00] font-bold tracking-widest uppercase text-xs">Daily Guidance</p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mt-2">Horoscope</h1>
          <p className="text-gray-500 mt-3 max-w-2xl">Get your daily horoscope. Select your sign to see your reading.</p>
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
          {/* Prokerala Horoscope Section ONLY */}
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-orange-50 mb-8">
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs uppercase tracking-widest text-[#FF6F00] font-bold">Prokerala Daily Horoscope</p>
                <h2 className="text-3xl font-bold text-gray-900 mt-2">{title}</h2>
              </div>
              <div className="flex items-center gap-2 text-sm bg-orange-50 text-[#FF6F00] px-3 py-2 rounded-full border border-orange-100">
                <ShieldCheck size={16} />
                Prokerala API
              </div>
            </div>
            {prokeralaLoading && (
              <div className="flex items-center justify-center py-12 text-gray-500">
                <Loader2 className="animate-spin mr-2" size={20} /> Loading horoscope...
              </div>
            )}
            {prokeralaError && !prokeralaLoading && (
              <div className="p-4 bg-red-50 border border-red-100 text-red-700 rounded-xl text-sm">{prokeralaError}</div>
            )}
            {!prokeralaLoading && !prokeralaError && prokeralaData && prokeralaData.data && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-bold text-[#FF6F00] mb-1">Sign</p>
                    <p className="text-lg font-semibold text-gray-900">{prokeralaData.data?.daily_predictions?.[0]?.sign?.name || '—'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#FF6F00] mb-1">Zodiac Symbol</p>
                    <p className="text-lg font-semibold text-gray-900">{prokeralaData.data?.daily_predictions?.[0]?.sign_info?.unicode_symbol || '—'}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-base text-gray-800 leading-relaxed"><span className="font-bold">Prediction:</span> {prokeralaData.data?.daily_predictions?.[0]?.predictions?.[0]?.prediction || '—'}</p>
                  <p className="text-base text-gray-800 leading-relaxed mt-2"><span className="font-bold">Seek:</span> {prokeralaData.data?.daily_predictions?.[0]?.predictions?.[0]?.seek || '—'}</p>
                  <p className="text-base text-gray-800 leading-relaxed mt-2"><span className="font-bold">Challenge:</span> {prokeralaData.data?.daily_predictions?.[0]?.predictions?.[0]?.challenge || '—'}</p>
                  <p className="text-base text-gray-800 leading-relaxed mt-2"><span className="font-bold">Insight:</span> {prokeralaData.data?.daily_predictions?.[0]?.predictions?.[0]?.insight || '—'}</p>
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-linear-to-br from-[#FF6F00] to-[#FF9933] text-white rounded-3xl p-6 shadow-lg">
            <p className="text-xs uppercase tracking-widest opacity-80">Tip</p>
            <h3 className="text-2xl font-bold mt-2 mb-3">Daily Refresh</h3>
            <p className="text-white/90 text-sm">Horoscope updates once a day. Switch sign to get fresh guidance.</p>
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
