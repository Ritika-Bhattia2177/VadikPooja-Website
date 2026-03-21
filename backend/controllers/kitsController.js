import Kit from '../models/Kit.js';

export async function getKits(req, res) {
  try {
    const { category, sort } = req.query || {};
    
    // Filtering
    let query = {};
    if (category) {
      query.category = category;
    }

    // Sorting
    let sortOption = {};
    if (sort === 'price_low_high') {
      sortOption.price = 1; // Price Low to High
    } else if (sort === 'newest') {
      sortOption.createdAt = -1; // Newest first
    }

    const kits = await Kit.find(query).sort(sortOption).lean();
    
    return res.status(200).json({
      success: true,
      count: kits.length,
      data: kits
    });
  } catch (error) {
    console.error('Get kits failed', error);
    return res.status(500).json({ error: 'Failed to fetch kits', details: error.message });
  }
}

export async function createKit(req, res) {
  try {
    const { name, description, price, category, image, itemsIncluded, stock } = req.body || {};

    // Basic validation
    if (!name || !price) {
      return res.status(400).json({ error: 'Name and price are required fields' });
    }

    const kit = await Kit.create({ 
      name, 
      description, 
      price, 
      category, 
      image, 
      itemsIncluded, 
      stock 
    });
    
    return res.status(201).json({
      success: true,
      message: 'Ritual Kit created successfully',
      data: kit
    });
  } catch (error) {
    console.error('Create kit failed', error);
    return res.status(500).json({ error: 'Failed to create kit', details: error.message });
  }
}

export async function getKitById(req, res) {
  try {
    const { id } = req.params;
    const kit = await Kit.findById(id).lean();

    if (!kit) {
      return res.status(404).json({ success: false, error: 'Ritual Kit not found' });
    }

    return res.status(200).json({
      success: true,
      data: kit
    });
  } catch (error) {
    console.error('Get kit by ID failed', error);
    return res.status(500).json({ error: 'Failed to fetch the kit', details: error.message });
  }
}

export async function updateKit(req, res) {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedKit = await Kit.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedKit) {
      return res.status(404).json({ success: false, error: 'Ritual Kit not found' });
    }

    return res.status(200).json({
      success: true,
      message: 'Ritual Kit updated successfully',
      data: updatedKit
    });
  } catch (error) {
    console.error('Update kit failed', error);
    return res.status(500).json({ error: 'Failed to update the kit', details: error.message });
  }
}

export async function deleteKit(req, res) {
  try {
    const { id } = req.params;

    const deletedKit = await Kit.findByIdAndDelete(id);

    if (!deletedKit) {
      return res.status(404).json({ success: false, error: 'Ritual Kit not found or already deleted' });
    }

    return res.status(200).json({
      success: true,
      message: 'Ritual Kit deleted successfully'
    });
  } catch (error) {
    console.error('Delete kit failed', error);
    return res.status(500).json({ error: 'Failed to delete the kit', details: error.message });
  }
}
