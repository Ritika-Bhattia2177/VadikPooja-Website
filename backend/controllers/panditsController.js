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

export async function createPandit(req, res) {
  try {
    const { name, experience, languages, city, image, rating } = req.body || {};

    if (!name || experience === undefined || !languages || !city) {
      return res.status(400).json({ error: 'name, experience, languages, and city are required' });
    }

    const languagesArray = Array.isArray(languages)
      ? languages
      : String(languages)
          .split(',')
          .map((l) => l.trim())
          .filter(Boolean);

    const pandit = await Pandit.create({
      name,
      experience,
      languages: languagesArray,
      city,
      image,
      rating: rating ?? undefined,
    });

    return res.status(201).json(pandit);
  } catch (error) {
    console.error('Create pandit failed', error);
    return res.status(500).json({ error: 'Failed to create pandit' });
  }
}
