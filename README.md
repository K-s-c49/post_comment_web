# Post and Comment Manager (MERN)

A full-stack MERN (MongoDB, Express, React, Node.js) application for managing posts with images and comments. Fully configured for deployment on Vercel.

## Prerequisites
- Node.js 18+ (recommended)
- MongoDB (local or Atlas)

## 🚀 Deployment

This project is ready to deploy on Vercel! See [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) for complete deployment instructions.

**Quick Deploy:**
1. Push to GitHub
2. Import to Vercel
3. Add environment variables (MONGODB_URI, JWT_SECRET)
4. Deploy!

## Setup

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
