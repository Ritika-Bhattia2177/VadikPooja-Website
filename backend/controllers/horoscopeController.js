// Prokerala Horoscope Service
async function getProkeralaAccessToken() {
  const clientId = process.env.PROKERALA_CLIENT_ID;
  const clientSecret = process.env.PROKERALA_CLIENT_SECRET;
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  const response = await fetch('https://api.prokerala.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error('Prokerala token error: ' + text);
  }
  const data = await response.json();
  return data.access_token;
}

export async function getProkeralaHoroscope(req, res) {
  try {
    const sign = (req.query.sign || 'aries').toLowerCase();
    const type = (req.query.type || 'general').toLowerCase();
    const datetime = req.query.datetime || new Date().toISOString().slice(0, 19) + '+05:30';
    // Prokerala expects datetime in ISO format with timezone
    const accessToken = await getProkeralaAccessToken();
    const url = new URL('https://api.prokerala.com/v2/horoscope/daily/advanced');
    url.searchParams.append('sign', sign);
    url.searchParams.append('type', type);
    url.searchParams.append('datetime', datetime);
    const response = await fetch(url.toString(), {
      headers: { 'Authorization': `Bearer ${accessToken}` }
    });
    if (!response.ok) {
      const text = await response.text();
      return res.status(response.status).json({ error: text || 'Prokerala API error' });
    }
    const data = await response.json();
    return res.json(data);
  } catch (err) {
    console.error('Prokerala Horoscope error', err);
    return res.status(500).json({ error: err.message || 'Internal server error' });
  }
}
// Only Prokerala endpoint remains
