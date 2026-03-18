import mongoose from 'mongoose';

const panditSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: Number, required: true },
  languages: { type: [String], required: true },
  rating: { type: Number, default: 0 },
  city: { type: String, required: true },
  image: String,
});

export default mongoose.model('Pandit', panditSchema);
