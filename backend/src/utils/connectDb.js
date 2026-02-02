import mongoose from 'mongoose';

export async function connectDb(mongoUri) {
  if (!mongoUri) {
    const err = new Error(
      'Missing MONGODB_URI. Create backend/.env and set MONGODB_URI=mongodb://localhost:27017/post_comment_manager'
    );
    err.status = 500;
    throw err;
  }

  // In serverless environments, check if already connected
  if (mongoose.connection.readyState === 1) {
    return;
  }

  mongoose.set('strictQuery', true);
  await mongoose.connect(mongoUri);
}
