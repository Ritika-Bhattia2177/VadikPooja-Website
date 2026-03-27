// Panchang Controller using Prokerala OAuth
import axios from 'axios';

async function getProkeralaAccessToken() {
  const clientId = process.env.PROKERALA_CLIENT_ID;
  const clientSecret = process.env.PROKERALA_CLIENT_SECRET;
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');
  params.append('client_id', clientId);
  params.append('client_secret', clientSecret);
  const response = await axios.post('https://api.prokerala.com/token', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  });
  if (!response.data.access_token) {
    throw new Error('Prokerala token error: ' + JSON.stringify(response.data));
  }
  return response.data.access_token;
}

export async function getProkeralaPanchang(req, res) {
  try {
    const {
      ayanamsa = 1,
      latitude = 28.6139,
      longitude = 77.2090,
      datetime,
      la = 'en'
    } = req.query;

    // Default datetime to now if not provided
    let dt = datetime;
    if (!dt) {
      const now = new Date();
      const offset = -now.getTimezoneOffset();
      const sign = offset >= 0 ? '+' : '-';
      const pad = n => n.toString().padStart(2, '0');
      const tz = `${sign}${pad(Math.floor(Math.abs(offset) / 60))}:${pad(Math.abs(offset) % 60)}`;
      dt = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}T${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}${tz}`;
    }
    const coordinates = `${latitude},${longitude}`;
    const accessToken = await getProkeralaAccessToken();
    const response = await axios.get('https://api.prokerala.com/v2/astrology/panchang/advanced', {
      params: {
        ayanamsa,
        coordinates,
        datetime: dt,
        la
      },
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    res.json(response.data);
  } catch (err) {
    console.error('Prokerala Panchang error', err?.response?.data || err);
    res.status(500).json({ error: err.message, details: err?.response?.data });
  }
}
