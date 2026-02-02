# Post and Comment Manager (MERN)

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing posts with images and comments. Fully configured for deployment on Vercel.

## 🚀 Deploy to Vercel in 13 Minutes!

This project is **100% ready** for Vercel deployment with complete step-by-step guides!

### Quick Start

📖 **[DEPLOYMENT_STEPS.md](./DEPLOYMENT_STEPS.md)** ⭐ **START HERE!**
- Complete visual step-by-step guide
- MongoDB Atlas setup instructions
- Environment variables configuration
- Troubleshooting section

### Additional Documentation

- 🚀 [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) - 5-minute quick start
- 📋 [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Verification checklist
- 🎯 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md) - Architecture & diagrams
- 📘 [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Comprehensive guide

### What You Need

- ✅ GitHub account (you have this!)
- ✅ [Vercel account](https://vercel.com/signup) (free)
- ✅ [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) (free)

**Deployment Time:** ~13 minutes | **Cost:** $0 (free tier)

## Local Development Setup

### Prerequisites
- Node.js 18+ (recommended)
- MongoDB (local or Atlas)

1) Install dependencies

```powershell
npm run install:all
```

2) Configure environment variables

- Backend env file: `backend/.env`

```ini
# copy from backend/.env.example
MONGODB_URI=mongodb://127.0.0.1:27017/post_comment_manager
PORT=5000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_secret_key_here
```

3) Run dev servers (backend + frontend)

```powershell
npm run dev
```

- Frontend: http://localhost:5173
- Backend health: http://localhost:5000/api/health

## API
- `GET /api/posts`
- `POST /api/posts` body: `{ "imageUrl": "...", "caption": "..." }`
- `GET /api/posts/:id/comments`
- `POST /api/posts/:id/comments` body: `{ "text": "..." }`
- (Optional) `DELETE /api/posts/:id`
- (Optional) `DELETE /api/posts/:id/comments/:commentId`

## Project Structure

```
.
├── api/              # Vercel serverless functions
├── backend/          # Express API
│   └── src/
│       ├── routes/   # API routes
│       ├── models/   # MongoDB models
│       └── utils/    # Utilities
├── frontend/         # React + Vite
│   └── src/
│       ├── components/
│       └── lib/
└── vercel.json       # Vercel configuration
```

## Features

- ✅ User authentication (register/login)
- ✅ Create posts with images and captions
- ✅ Add comments to posts
- ✅ Delete posts and comments
- ✅ Responsive design
- ✅ Ready for Vercel deployment
