import mongoose from 'mongoose';

const kitSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  items_included: { type: String, required: true },
});

export default mongoose.model('Kit', kitSchema);
