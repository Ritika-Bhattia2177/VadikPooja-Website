import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { query } from './config/db.js';
import initTables from './config/initTables.js';

import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import kitRoutes from './routes/kitRoutes.js';
import panditRoutes from './routes/panditRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import horoscopeRoutes from './routes/horoscopeRoutes.js';
import panchangRoutes from './routes/panchangRoutes.js';
import poojaRoutes from './routes/poojaRoutes.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running', timestamp: new Date() });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/ritual-kits', kitRoutes);
app.use('/api/kits', kitRoutes);
app.use('/api/pandits', panditRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/horoscope', horoscopeRoutes);
app.use('/api/panchang', panchangRoutes);
app.use('/api/poojas', poojaRoutes);

// Initialize DB tables if they don't exist
initTables();

// Small endpoint to verify DB connectivity
app.get('/test-db', async (req, res) => {
  try {
    const data = await query('SELECT 1 AS ok');
    return res.json({ success: true, message: 'MySQL is connected ✅', data });
  } catch (err) {
    return res.status(500).json({ success: false, error: err && err.message ? err.message : String(err) });
  }
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`API server running http://localhost:${PORT}`);
});