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
