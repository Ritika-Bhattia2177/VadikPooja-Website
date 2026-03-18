import Booking from '../models/Booking.js';

export async function createBooking(req, res) {
  const { userId, panditId, poojaType, date, location } = req.body;
  try {
    const booking = await Booking.create({ userId, panditId, poojaType, date, location });
    res.json({ id: booking._id });
  } catch (error) {
    res.status(500).json({ error: 'Booking failed' });
  }
}
