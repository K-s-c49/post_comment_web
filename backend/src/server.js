import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { connectDb } from './utils/connectDb.js';
import postsRouter from './routes/posts.js';
import { notFound } from './middleware/notFound.js';
import authRouter from './routes/auth.js';

dotenv.config({ path: new URL('../.env', import.meta.url) });

const app = express();

app.get('/', (req, res) => {
  res.type('text').send('Post & Comment Manager API. Try GET /api/health');
});

app.use(
  cors({
    origin: process.env.CORS_ORIGIN || '*',
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);

app.use(notFound);

app.use((err, req, res, next) => {
  const status = Number(err?.status) || 500;
  const message = err?.message || 'Internal Server Error';
  res.status(status).json({ error: message });
});

const port = Number(process.env.PORT) || 5000;

await connectDb(process.env.MONGODB_URI);

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});
