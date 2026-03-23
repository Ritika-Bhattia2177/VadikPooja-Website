import mongoose from 'mongoose';

export async function connectDB(mongoUri) {
  const uri = mongoUri || process.env.MONGO_URI;

  if (!uri) {
    throw new Error('MONGO_URI environment variable is not set');
  }

  try {
    const conn = await mongoose.connect(uri, { dbName: 'vaidikpooja' });
    const { host, port, name } = conn.connection;
    console.log(`Mongo connected -> ${host}:${port}/${name}`);
  } catch (err) {
    console.error('Mongo connection failed', err);
    throw err;
  }
}
