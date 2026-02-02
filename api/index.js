import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';

import { connectDb } from '../backend/src/utils/connectDb.js';
import postsRouter from '../backend/src/routes/posts.js';
import authRouter from '../backend/src/routes/auth.js';
import { notFound } from '../backend/src/middleware/notFound.js';

dotenv.config({ path: new URL('../backend/.env', import.meta.url) });

const app = express();

// CORS middleware
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
);
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// Routes
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

// 404 handler
app.use(notFound);

// Error handler
app.use((err, req, res, next) => {
  const status = Number(err?.status) || 500;
  const message = err?.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

// Database connection (cached for serverless)
let dbConnected = false;

async function handler(req, res) {
  // Connect to database if not already connected
  if (!dbConnected) {
    await connectDb(process.env.MONGODB_URI);
    dbConnected = true;
  }
  
  // Handle the request with Express
  return app(req, res);
}

export default handler;
