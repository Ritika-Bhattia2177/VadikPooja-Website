import mongoose from 'mongoose';

export async function connectDB(mongoUri) {
  const uri = mongoUri || process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/vaidikpooja';

  try {
    const conn = await mongoose.connect(uri, { dbName: 'vaidikpooja' });
    const { host, port, name } = conn.connection;
    console.log(`Mongo connected -> ${host}:${port}/${name}`);
  } catch (err) {
    console.error('Mongo connection failed', err);
    throw err;
  }
}
