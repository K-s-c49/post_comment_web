import jwt from 'jsonwebtoken';

export function signAccessToken(payload) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err = new Error('Missing JWT_SECRET in backend/.env');
    err.status = 500;
    throw err;
  }

  return jwt.sign(payload, secret, { expiresIn: '7d' });
}

export function verifyAccessToken(token) {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    const err = new Error('Missing JWT_SECRET in backend/.env');
    err.status = 500;
    throw err;
  }

  return jwt.verify(token, secret);
}
