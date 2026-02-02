# Quick Deploy to Vercel

Deploy this MERN stack app to Vercel in 5 minutes!

## Prerequisites

1. A [Vercel account](https://vercel.com/signup) (free)
2. A [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas/register) (free tier available)
3. Your code pushed to GitHub

## Step 1: Set Up MongoDB Atlas (5 minutes)

1. Go to [MongoDB Atlas](https://cloud.mongodb.com/)
2. Create a new cluster (choose Free tier)
3. Create a database user:
   - Click "Database Access" → "Add New Database User"
   - Username: `your_username`
   - Password: `your_password` (save this!)
   - Privileges: "Atlas admin"
4. Allow network access:
   - Click "Network Access" → "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm
5. Get your connection string:
   - Click "Database" → "Connect" → "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password
   - Replace `<dbname>` with your database name (e.g., `post_comment_manager`)

Example:
```
mongodb+srv://myuser:mypassword@cluster0.xxxxx.mongodb.net/post_comment_manager?retryWrites=true&w=majority
```

## Step 2: Deploy to Vercel (3 minutes)

### Option A: Deploy with Vercel Button (Fastest)

Click this button to deploy:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/K-s-c49/post_comment_web)

### Option B: Manual Import

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Click "Import"

## Step 3: Configure Environment Variables (2 minutes)

In the Vercel project settings, add these environment variables:

### Required Variables

**MONGODB_URI**
```
Your MongoDB connection string from Step 1
```

**JWT_SECRET**
```
Generate a secure random string. Run this command in terminal:
openssl rand -base64 32

Or use any long random string like:
super-secret-jwt-key-change-me-in-production-12345
```

### Optional (Recommended for Production)

**CORS_ORIGIN**
```
https://your-app-name.vercel.app
(Replace with your actual Vercel URL after first deployment)
```

## Step 4: Deploy! 🚀

1. Click "Deploy" button
2. Wait 1-3 minutes for deployment
3. Your app is live!

## Step 5: Verify Deployment ✅

1. **Visit your app**: `https://your-app-name.vercel.app`
2. **Test API**: Go to `https://your-app-name.vercel.app/api/health`
   - Should show: `{"ok":true}`
3. **Register an account** in the UI
4. **Create a post** with an image URL and caption
5. **Add a comment** to the post

## 🎉 Success!

Your MERN app is now deployed on Vercel!

## Next Steps

- Set `CORS_ORIGIN` to your Vercel URL for better security
- Share your app URL with others
- Make changes to your code and push to GitHub (Vercel auto-deploys)

## Common Issues

### "Cannot connect to database"
- Check your MongoDB connection string is correct
- Ensure MongoDB Atlas allows access from 0.0.0.0/0
- Verify username and password in connection string

### "API returns 404"
- Wait 1-2 minutes after deployment
- Try a hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check Vercel function logs

### "CORS error"
- Set `CORS_ORIGIN` environment variable
- Redeploy after changing environment variables

## Need Help?

See detailed guides:
- [DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md) - Step-by-step verification
- [VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md) - Complete deployment guide
- [README.md](./README.md) - Project overview

## Update Your Deployment

When you make code changes:
1. Commit and push to GitHub
2. Vercel automatically redeploys
3. Check deployment status in Vercel dashboard

That's it! Happy coding! 🚀
