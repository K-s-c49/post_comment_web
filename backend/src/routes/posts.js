import express from 'express';
import mongoose from 'mongoose';
import { Post } from '../models/Post.js';
import { requireAuth } from '../middleware/requireAuth.js';

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { imageUrl, caption } = req.body ?? {};

    if (!imageUrl || !caption) {
      return res.status(400).json({ error: 'imageUrl and caption are required' });
    }

    const doc = await Post.create({ owner: req.user.sub, imageUrl, caption });
    res.status(201).json(doc);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    if (String(post.owner) !== String(req.user.sub)) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    await post.deleteOne();

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

router.get('/:id/comments', async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }

    const post = await Post.findById(id).select('comments');
    if (!post) return res.status(404).json({ error: 'Post not found' });

    res.json(post.comments);
  } catch (err) {
    next(err);
  }
});

router.post('/:id/comments', requireAuth, async (req, res, next) => {
  try {
    const { id } = req.params;
    const { text } = req.body ?? {};

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }
    if (!text) {
      return res.status(400).json({ error: 'text is required' });
    }

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post.comments.push({ text, author: req.user.sub });
    await post.save();

    const created = post.comments.at(-1);
    res.status(201).json(created);
  } catch (err) {
    next(err);
  }
});

router.delete('/:id/comments/:commentId', requireAuth, async (req, res, next) => {
  try {
    const { id, commentId } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ error: 'Invalid post id' });
    }
    if (!mongoose.isValidObjectId(commentId)) {
      return res.status(400).json({ error: 'Invalid comment id' });
    }

    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ error: 'Post not found' });

    const sub = post.comments.id(commentId);
    if (!sub) return res.status(404).json({ error: 'Comment not found' });

    // Only the comment author OR post owner may delete
    const isAuthor = String(sub.author) === String(req.user.sub);
    const isPostOwner = String(post.owner) === String(req.user.sub);
    if (!isAuthor && !isPostOwner) {
      return res.status(403).json({ error: 'Forbidden' });
    }

    sub.deleteOne();
    await post.save();

    res.json({ ok: true });
  } catch (err) {
    next(err);
  }
});

export default router;
