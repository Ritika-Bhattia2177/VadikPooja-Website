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

export async function updatePandit(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }

    const { name, experience, languages, city, image, rating } = req.body || {};

    const update = {};
    if (name !== undefined) update.name = name;
    if (experience !== undefined) update.experience = experience;
    if (languages !== undefined) {
      update.languages = Array.isArray(languages)
        ? languages
        : String(languages)
            .split(',')
            .map((l) => l.trim())
            .filter(Boolean);
    }
    if (city !== undefined) update.city = city;
    if (image !== undefined) update.image = image;
    if (rating !== undefined) update.rating = rating;

    const updated = await Pandit.findByIdAndUpdate(id, update, { new: true, runValidators: true });
    if (!updated) {
      return res.status(404).json({ error: 'Pandit not found' });
    }

    return res.json(updated);
  } catch (error) {
    console.error('Update pandit failed', error);
    return res.status(500).json({ error: 'Failed to update pandit' });
  }
}

export async function deletePandit(req, res) {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'id is required' });
    }

    const deleted = await Pandit.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ error: 'Pandit not found' });
    }

    return res.json({ success: true, id });
  } catch (error) {
    console.error('Delete pandit failed', error);
    return res.status(500).json({ error: 'Failed to delete pandit' });
  }
}
