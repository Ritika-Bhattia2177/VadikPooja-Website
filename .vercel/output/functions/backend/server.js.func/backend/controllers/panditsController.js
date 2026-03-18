import Pandit from '../models/Pandit.js';

export async function getPandits(_req, res) {
  try {
    const pandits = await Pandit.find({}).lean();
    return res.json(pandits);
  } catch (error) {
    console.error('Get pandits failed', error);
    return res.status(500).json({ error: 'Failed to fetch pandits' });
  }
}
