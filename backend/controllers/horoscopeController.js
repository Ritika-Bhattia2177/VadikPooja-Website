export async function getHoroscope(req, res) {
  try {
    const sign = (req.query.sign || '').toLowerCase();
    const day = (req.query.day || 'today').toLowerCase();

    const validSigns = new Set([
      'aries','taurus','gemini','cancer','leo','virgo','libra','scorpio','sagittarius','capricorn','aquarius','pisces'
    ]);
    const validDays = new Set(['today', 'yesterday', 'tomorrow']);

    if (!validSigns.has(sign) || !validDays.has(day)) {
      return res.status(400).json({ error: 'Invalid sign or day' });
    }

    const upstream = await fetch(`https://aztro.sameerkumar.website/?sign=${encodeURIComponent(sign)}&day=${encodeURIComponent(day)}`, {
      method: 'POST'
    });

    if (!upstream.ok) {
      const text = await upstream.text();
      console.warn('Horoscope provider error', upstream.status, text);
      return res.status(200).json(getFallback(sign, day));
    }

    const data = await upstream.json();
    return res.json(data);
  } catch (err) {
    console.error('Horoscope fetch failed', err);
    return res.status(200).json(getFallback(req.query.sign || 'aries', req.query.day || 'today'));
  }
}

function getFallback(sign, day) {
  const title = `${capitalize(sign)} • ${capitalize(day)}`;
  return {
    date_range: 'Fallback',
    current_date: new Date().toLocaleDateString('en-IN'),
    description: `${title}: Horoscope service is temporarily unavailable. Please try again later.`,
    compatibility: 'N/A',
    mood: 'Patient',
    color: 'Orange',
    lucky_number: '7',
    lucky_time: '09:00 AM'
  };
}

function capitalize(str = '') {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
