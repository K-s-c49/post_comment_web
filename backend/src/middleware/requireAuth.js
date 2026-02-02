import { verifyAccessToken } from '../utils/auth.js';

export function requireAuth(req, res, next) {
  try {
    const header = req.headers.authorization || '';
    const [scheme, token] = header.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({ error: 'Missing Bearer token' });
    }

    const payload = verifyAccessToken(token);
    req.user = payload;
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
