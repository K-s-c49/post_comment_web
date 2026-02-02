import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const PostSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    imageUrl: {
      type: String,
      required: true,
      trim: true,
      maxlength: 2000,
    },
    caption: {
      type: String,
      required: true,
      trim: true,
      maxlength: 500,
    },
    comments: {
      type: [CommentSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

export const Post = mongoose.model('Post', PostSchema);
