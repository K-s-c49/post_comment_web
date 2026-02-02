# Post and Comment Manager (MERN)

## Prerequisites
- Node.js 18+ (recommended)
- MongoDB (local or Atlas)

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
