import Kit from '../models/Kit.js';

export async function getKits(_req, res) {
  try {
    const kits = await Kit.find({}).lean();
    return res.json(kits);
  } catch (error) {
    console.error('Get kits failed', error);
    return res.status(500).json({ error: 'Failed to fetch kits' });
  }
}
