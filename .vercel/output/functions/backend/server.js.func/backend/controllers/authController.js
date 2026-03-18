import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const { JWT_SECRET = 'vaidik-pooja-secret-key' } = process.env;

export async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ error: 'Email already exists' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ id: user._id, email }, JWT_SECRET);
    res.json({ token, user: { id: user._id, name, email } });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const passwordMatches = user && (await bcrypt.compare(password, user.password));

    if (!user || !passwordMatches) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Login failed', error);
    return res.status(500).json({ error: 'Login failed' });
  }
}
