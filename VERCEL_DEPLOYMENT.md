# Vercel Deployment Guide

This project is configured for deployment on Vercel with a React (Vite) frontend and Express backend.

## Architecture

- **Frontend**: React + Vite (deployed as static site)
- **Backend**: Express API (deployed as serverless functions)
- **Database**: MongoDB (requires external MongoDB instance)

## Prerequisites

1. A Vercel account
2. A MongoDB database (MongoDB Atlas recommended)
3. GitHub repository connected to Vercel

## Deployment Steps

### 1. Push to GitHub

Make sure all your code is committed and pushed to GitHub.

### 2. Import Project to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your GitHub repository
4. Vercel will auto-detect the configuration from `vercel.json`

### 3. Configure Environment Variables

In your Vercel project settings, add the following environment variables:

#### Required Variables

- `MONGODB_URI`: Your MongoDB connection string
  - Example: `mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority`
  - Get this from MongoDB Atlas or your MongoDB provider

- `JWT_SECRET`: A long random string for JWT token encryption
  - Example: Generate with: `openssl rand -base64 32`

#### Optional Variables

- `CORS_ORIGIN`: Allowed CORS origin (defaults to `*` if not set)
  - For production, set to your Vercel domain: `https://your-app.vercel.app`

### 4. Deploy

Click "Deploy" in Vercel. The deployment will:
1. Install backend dependencies
2. Build the frontend
3. Deploy the frontend as a static site
4. Deploy the backend as serverless functions under `/api`

### 5. Access Your Application

After deployment:
- **Frontend**: `https://your-app.vercel.app`
- **API**: `https://your-app.vercel.app/api/health`

## Local Development

For local development, continue using the existing setup:

```bash
# Install all dependencies
npm run install:all

# Run both frontend and backend
npm run dev
```

The local development uses:
- Frontend: `http://localhost:5173` (with Vite proxy to backend)
- Backend: `http://localhost:5000`

## Environment Variables

### Local (.env files)

**Backend** (`backend/.env`):
```env
MONGODB_URI=mongodb://localhost:27017/post_comment_manager
PORT=5000
CORS_ORIGIN=http://localhost:5173
JWT_SECRET=your_local_secret_key
```

**Frontend** (`frontend/.env`):
```env
# Empty or use proxy - the Vite proxy handles API calls locally
VITE_API_BASE_URL=
```

### Production (Vercel)

Set in Vercel Dashboard → Project Settings → Environment Variables:
- `MONGODB_URI` (required)
- `JWT_SECRET` (required)
- `CORS_ORIGIN` (optional, recommended for security)

## Troubleshooting

### Database Connection Issues

If you get database connection errors:
1. Make sure your MongoDB URI is correct
2. Whitelist Vercel's IP addresses in MongoDB Atlas (or allow from anywhere: 0.0.0.0/0)
3. Check that your MongoDB user has proper permissions

### CORS Issues

If you encounter CORS errors:
1. Set `CORS_ORIGIN` environment variable in Vercel to your frontend URL
2. Make sure the frontend is making requests to the same domain (relative URLs)

### API 404 Errors

If API endpoints return 404:
1. Check that your API routes start with `/api/`
2. Verify `vercel.json` rewrites configuration
3. Check Vercel function logs in the dashboard

### Build Failures

If the build fails:
1. Check Vercel build logs for specific errors
2. Make sure all dependencies are in `package.json`
3. Verify Node.js version compatibility (check `engines` in package.json if specified)

## Project Structure

```
.
├── api/                  # Serverless API functions for Vercel
│   └── index.js         # Main API handler
├── backend/             # Backend source code
│   ├── src/
│   │   ├── routes/      # API routes
│   │   ├── models/      # MongoDB models
│   │   ├── middleware/  # Express middleware
│   │   ├── utils/       # Utility functions
│   │   └── server.js    # Local development server
│   └── package.json
├── frontend/            # Frontend source code
│   ├── src/
│   ├── dist/           # Build output (generated)
│   └── package.json
├── vercel.json         # Vercel configuration
└── package.json        # Root package for scripts
```

## Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Deploying Express on Vercel](https://vercel.com/guides/using-express-with-vercel)
- [MongoDB Atlas Setup](https://www.mongodb.com/cloud/atlas)
