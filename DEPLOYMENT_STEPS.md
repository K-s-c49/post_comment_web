# 🚀 Vercel Deployment Steps

Complete guide to deploy this MERN app to Vercel.

---

## 📋 Pre-Deployment Checklist

- [ ] GitHub account with this repository
- [ ] Vercel account (free - [sign up here](https://vercel.com/signup))
- [ ] MongoDB Atlas account (free - [sign up here](https://www.mongodb.com/cloud/atlas/register))

---

## 🗄️ STEP 1: Create MongoDB Database (5 minutes)

### 1.1 Create a Free Cluster

1. Go to **[MongoDB Atlas](https://cloud.mongodb.com/)**
2. Click **"Create"** (or "Build a Database")
3. Choose **"M0 FREE"** tier
4. Select a cloud provider and region (closest to your users)
5. Click **"Create Cluster"** and wait 1-3 minutes

### 1.2 Create Database User

1. In MongoDB Atlas, click **"Database Access"** (left sidebar)
2. Click **"Add New Database User"**
3. Choose **"Password"** authentication
4. Set username: `admin` (or your choice)
5. Click **"Autogenerate Secure Password"** and **SAVE IT!**
6. Select **"Atlas Admin"** role
7. Click **"Add User"**

### 1.3 Allow Network Access

1. Click **"Network Access"** (left sidebar)
2. Click **"Add IP Address"**
3. Click **"Allow Access from Anywhere"** (0.0.0.0/0)
4. Click **"Confirm"**

> ⚠️ **Important**: For production, you should restrict this to specific IPs

### 1.4 Get Connection String

1. Click **"Database"** (left sidebar)
2. Click **"Connect"** on your cluster
3. Click **"Connect your application"**
4. Copy the connection string (looks like):
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/
   ```
5. Replace `<username>` with your database username
6. Replace `<password>` with your password (from step 1.2)
7. Add database name at the end: `/post_comment_manager`

**Final connection string example:**
```
mongodb+srv://admin:MyP@ssw0rd@cluster0.abcde.mongodb.net/post_comment_manager?retryWrites=true&w=majority
```

**SAVE THIS STRING** - you'll need it in Step 3!

---

## ☁️ STEP 2: Deploy to Vercel (3 minutes)

### 2.1 Import Project

1. Go to **[Vercel Dashboard](https://vercel.com/dashboard)**
2. Click **"Add New..."** → **"Project"**
3. Find your GitHub repository in the list
4. Click **"Import"**

### 2.2 Configure Project (Don't Deploy Yet!)

1. **Framework Preset**: Leave as detected (should say "Other")
2. **Root Directory**: Leave as `./` (default)
3. **Build Command**: Auto-detected from `vercel.json`
4. **Output Directory**: Auto-detected from `vercel.json`
5. **Install Command**: Auto-detected from `vercel.json`

**DO NOT CLICK DEPLOY YET!** We need to add environment variables first.

---

## 🔐 STEP 3: Add Environment Variables (2 minutes)

### 3.1 Add Required Variables

Still on the Vercel import page, scroll down to **"Environment Variables"** section.

#### Variable 1: MONGODB_URI

- **Key**: `MONGODB_URI`
- **Value**: Your MongoDB connection string from Step 1.4
  ```
  mongodb+srv://admin:MyP@ssw0rd@cluster0.abcde.mongodb.net/post_comment_manager?retryWrites=true&w=majority
  ```
- Click **"Add"**

#### Variable 2: JWT_SECRET

- **Key**: `JWT_SECRET`
- **Value**: Generate a random secret:
  
  **Option A** - Run this in your terminal:
  ```bash
  openssl rand -base64 32
  ```
  
  **Option B** - Use a random string (at least 32 characters):
  ```
  my-super-secret-jwt-key-change-this-12345678
  ```
- Click **"Add"**

#### Variable 3 (Optional): CORS_ORIGIN

- **Key**: `CORS_ORIGIN`
- **Value**: Leave blank for now (or use `*`)
- You can update this after deployment with your Vercel URL
- Click **"Add"**

---

## 🎯 STEP 4: Deploy! (1 minute)

1. Click **"Deploy"** button
2. Wait 1-3 minutes while Vercel:
   - Installs dependencies
   - Builds your frontend
   - Deploys serverless functions
3. You'll see a success screen with your deployment URL!

**Your app is now live!** 🎉

---

## ✅ STEP 5: Verify Deployment (2 minutes)

### 5.1 Check Frontend

1. Click on your deployment URL (e.g., `https://your-app.vercel.app`)
2. The frontend should load with the login/register page

### 5.2 Check API

1. Add `/api/health` to your URL
2. Visit: `https://your-app.vercel.app/api/health`
3. You should see: `{"ok":true}`

### 5.3 Test the Application

1. **Register** a new account
2. **Login** with your credentials
3. **Create a post** with an image URL and caption
4. **Add a comment** to your post
5. **Verify** everything works!

---

## 🎊 SUCCESS!

Your MERN stack app is now live on Vercel!

**Your URLs:**
- Frontend: `https://your-app-name.vercel.app`
- API: `https://your-app-name.vercel.app/api/*`

---

## 🔧 Post-Deployment (Optional)

### Update CORS_ORIGIN

For better security:

1. Go to Vercel Dashboard → Your Project → **"Settings"** → **"Environment Variables"**
2. Edit `CORS_ORIGIN`
3. Set to your Vercel URL: `https://your-app-name.vercel.app`
4. Click **"Save"**
5. Go to **"Deployments"** tab
6. Click **"..."** on latest deployment → **"Redeploy"**

### Add Custom Domain

1. Go to **"Settings"** → **"Domains"**
2. Add your custom domain
3. Follow Vercel's DNS configuration instructions

### Enable Auto-Deploy

Already enabled! Every push to your main branch will auto-deploy.

---

## 🐛 Troubleshooting

### Problem: "Cannot connect to database"

**Solutions:**
- Verify your `MONGODB_URI` is correct (no typos!)
- Check MongoDB Atlas Network Access allows 0.0.0.0/0
- Ensure password doesn't have special characters that need encoding
- Verify database name is included in the connection string

### Problem: "API returns 404"

**Solutions:**
- Wait 2-3 minutes (first deployment takes longer)
- Hard refresh: Press `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Check Vercel **Functions** tab for error logs

### Problem: "CORS error in browser console"

**Solutions:**
- Add `CORS_ORIGIN` environment variable
- Set to `*` for testing or your Vercel URL for production
- Redeploy after changing environment variables

### Problem: "Build failed"

**Solutions:**
- Check build logs in Vercel dashboard
- Verify all dependencies are in `package.json` files
- Ensure code is error-free

### Problem: "Function timeout"

**Solutions:**
- Check MongoDB connection is successful
- Verify MongoDB cluster is running
- Check Vercel function logs for specific errors

---

## 📱 Quick Reference

| Action | How To |
|--------|--------|
| View logs | Vercel Dashboard → Project → **Functions** tab |
| Redeploy | Vercel Dashboard → **Deployments** → **...** → **Redeploy** |
| Update env vars | Vercel Dashboard → **Settings** → **Environment Variables** |
| View builds | Vercel Dashboard → **Deployments** tab |
| Auto-deploy | Just `git push` to main branch! |

---

## 📚 Additional Resources

- **[DEPLOYMENT_CHECKLIST.md](./DEPLOYMENT_CHECKLIST.md)** - Detailed verification checklist
- **[VERCEL_DEPLOYMENT.md](./VERCEL_DEPLOYMENT.md)** - Comprehensive deployment guide
- **[QUICK_REFERENCE.md](./QUICK_REFERENCE.md)** - Architecture diagrams
- **[README.md](./README.md)** - Project overview

---

## 🎓 What You've Deployed

```
┌─────────────────────────────────────┐
│         Vercel Platform             │
│  ┌──────────┐      ┌──────────┐    │
│  │ Frontend │◄────►│ Backend  │    │
│  │  React   │      │ Express  │    │
│  │  (Vite)  │      │   API    │    │
│  └──────────┘      └─────┬────┘    │
│                          │          │
└──────────────────────────┼──────────┘
                           │
                           ▼
                    ┌──────────┐
                    │ MongoDB  │
                    │  Atlas   │
                    └──────────┘
```

**Features:**
✅ Auto-scaling serverless backend  
✅ Global CDN for fast frontend delivery  
✅ Automatic HTTPS/SSL  
✅ Auto-deploy on git push  
✅ Preview deployments for PRs  
✅ Free tier available  

---

## 💡 Pro Tips

1. **Environment Variables**: Changes require redeployment
2. **Logs**: Check function logs for debugging API issues
3. **Previews**: Every PR gets its own preview URL
4. **Analytics**: Enable Vercel Analytics for insights
5. **Custom Domain**: Add for professional look

---

**Need Help?** Check the troubleshooting section above or review the detailed documentation files.

**Happy deploying! 🚀**
