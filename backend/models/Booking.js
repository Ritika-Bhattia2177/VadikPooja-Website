import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  panditId: { type: mongoose.Schema.Types.ObjectId, ref: 'Pandit' },
  poojaType: { type: String, required: true },
  date: { type: String, required: true },
  location: { type: String, required: true },
});

export default mongoose.model('Booking', bookingSchema);
