import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const { JWT_SECRET = 'vaidik-pooja-secret-key' } = process.env;

export async function register(req, res) {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    
    // If they try to sign up but already exist, just seamlessly verify their password and log them in!
    if (user) {
      const passwordMatches = await bcrypt.compare(password, user.password);
      if (!passwordMatches) {
        return res.status(401).json({ error: 'Email already registered. Incorrect password entered.' });
      }
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      user = await User.create({ name, email, password: hashedPassword });
    }

    const token = jwt.sign({ id: user._id, email }, JWT_SECRET);
    res.json({ token, user: { id: user._id, name: user.name, email } });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed' });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: 'User not found. Please register first.' });
    }
    // User exists, verify password
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return res.status(401).json({ error: 'Incorrect password for this email.' });
    }
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET);
    return res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (error) {
    console.error('Seamless Login/Signup failed', error);
    return res.status(500).json({ error: 'Authentication failed' });
  }
}
