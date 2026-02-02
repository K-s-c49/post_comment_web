import express from 'express';
import bcrypt from 'bcryptjs';
import { User } from '../models/User.js';
import { signAccessToken } from '../utils/auth.js';

const router = express.Router();

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    const normalizedUsername = String(username).trim();
    const passwordStr = String(password);

    if (normalizedUsername.length < 3) {
      return res.status(400).json({ error: 'username must be at least 3 characters' });
    }

    if (passwordStr.length < 6) {
      return res.status(400).json({ error: 'password must be at least 6 characters' });
    }

    const existing = await User.findOne({ username: normalizedUsername });
    if (existing) {
      return res.status(409).json({ error: 'username already exists' });
    }

    const passwordHash = await bcrypt.hash(passwordStr, 10);
    const user = await User.create({ username: normalizedUsername, passwordHash });

    const token = signAccessToken({ sub: user._id.toString(), username: user.username });

    res.status(201).json({ token, user });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body ?? {};

    if (!username || !password) {
      return res.status(400).json({ error: 'username and password are required' });
    }

    const normalizedUsername = String(username).trim();
    const passwordStr = String(password);

    const user = await User.findOne({ username: normalizedUsername });
    if (!user) {
      return res.status(401).json({ error: 'invalid credentials' });
    }

    const ok = await bcrypt.compare(passwordStr, user.passwordHash);
    if (!ok) {
      return res.status(401).json({ error: 'invalid credentials' });
    }

    const token = signAccessToken({ sub: user._id.toString(), username: user.username });
    res.json({ token, user });
  } catch (err) {
    next(err);
  }
});

router.get('/me', async (req, res, next) => {
  try {
    // optional convenience endpoint if frontend wants it later
    res.status(404).json({ error: 'Not implemented. Use token payload on client.' });
  } catch (err) {
    next(err);
  }
});

export default router;
