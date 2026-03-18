import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import kitRoutes from './routes/kitRoutes.js';
import panditRoutes from './routes/panditRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import horoscopeRoutes from './routes/horoscopeRoutes.js';

dotenv.config();

const { PORT = 4000 } = process.env;

async function startServer() {
  await connectDB();

  const app = express();

  app.use(cors());
  app.use(express.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/products', productRoutes);
  app.use('/api/kits', kitRoutes);
  app.use('/api/pandits', panditRoutes);
  app.use('/api/bookings', bookingRoutes);
  app.use('/api/orders', orderRoutes);
  app.use('/api/horoscope', horoscopeRoutes);

  if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  }

  return app;
}

const appPromise = startServer();

export default async function (req, res) {
  const app = await appPromise;
  return app(req, res);
}
