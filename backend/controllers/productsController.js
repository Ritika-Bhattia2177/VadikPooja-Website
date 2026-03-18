import Product from '../models/Product.js';

export async function getProducts(_req, res) {
  try {
    const products = await Product.find({}).lean();
    return res.json(products);
  } catch (error) {
    console.error('Get products failed', error);
    return res.status(500).json({ error: 'Failed to fetch products' });
  }
}

export async function createProduct(req, res) {
  try {
    const { name, image, price, description = '', category } = req.body || {};

    if (!name || !image || !price || !category) {
      return res.status(400).json({ error: 'name, image, price, and category are required' });
    }

    const product = await Product.create({ name, image, price, description, category });
    return res.status(201).json(product);
  } catch (error) {
    console.error('Create product failed', error);
    return res.status(500).json({ error: 'Failed to create product' });
  }
}
