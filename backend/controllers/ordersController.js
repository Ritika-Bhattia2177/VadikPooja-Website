import Order from '../models/Order.js';

export async function createOrder(req, res) {
  const { userId, items, totalPrice } = req.body;
  try {
    const order = await Order.create({ userId, items, total_price: totalPrice });
    res.json({ id: order._id });
  } catch (error) {
    res.status(500).json({ error: 'Order failed' });
  }
}

export async function getOrders(req, res) {
  try {
    const orders = await Order.find({ userId: req.params.userId }).sort({ created_at: -1 }).lean();
    res.json(orders);
  } catch (error) {
    console.error('Get orders failed', error);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
}
