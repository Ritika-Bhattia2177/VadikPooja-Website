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

export async function createKit(req, res) {
  try {
    const { name, price, items_included, image } = req.body || {};

    if (!name || !price || !items_included || !image) {
      return res.status(400).json({ error: 'name, price, items_included, and image are required' });
    }

    const kit = await Kit.create({ name, price, items_included, image });
    return res.status(201).json(kit);
  } catch (error) {
    console.error('Create kit failed', error);
    return res.status(500).json({ error: 'Failed to create kit' });
  }
}
