# Vercel Deployment Checklist

Use this checklist to ensure your deployment is successful.

## Pre-Deployment Checklist

- [ ] MongoDB database is set up (MongoDB Atlas recommended)
- [ ] MongoDB connection string is ready
- [ ] JWT secret is generated (use `openssl rand -base64 32` to generate one)
- [ ] Code is committed and pushed to GitHub
- [ ] GitHub repository is accessible

## Vercel Setup Checklist

### 1. Import Project
- [ ] Go to [Vercel Dashboard](https://vercel.com/dashboard)
- [ ] Click "Add New" → "Project"
- [ ] Select your GitHub repository
- [ ] Click "Import"

### 2. Configure Project Settings
- [ ] Framework Preset: Leave as "Other" (Vercel will auto-detect)
- [ ] Root Directory: Leave as default (`.`)
- [ ] Build Command: Should auto-detect from `vercel.json`
- [ ] Output Directory: Should auto-detect as `frontend/dist`
- [ ] Install Command: Should auto-detect from `vercel.json`

### 3. Add Environment Variables

Click on "Environment Variables" and add:

**Required:**
- [ ] `MONGODB_URI` = Your MongoDB connection string
  ```
  Example: mongodb+srv://username:password@cluster.mongodb.net/dbname?retryWrites=true&w=majority
  ```
- [ ] `JWT_SECRET` = Your JWT secret key
  ```
  Example: (generate with) openssl rand -base64 32
  ```

**Optional (Recommended):**
- [ ] `CORS_ORIGIN` = Your Vercel app URL
  ```
  Example: https://your-app.vercel.app
  ```

### 4. Deploy
- [ ] Click "Deploy"
- [ ] Wait for deployment to complete (usually 1-3 minutes)

## Post-Deployment Verification

### 1. Check Deployment Status
- [ ] Deployment shows "Ready" status in Vercel dashboard
- [ ] No build errors in deployment logs

### 2. Verify Frontend
- [ ] Visit your Vercel URL (e.g., `https://your-app.vercel.app`)
- [ ] Page loads without errors
- [ ] UI is displayed correctly
- [ ] No console errors in browser DevTools

### 3. Verify Backend API
- [ ] Visit `https://your-app.vercel.app/api/health`
- [ ] Should return: `{"ok":true}`

### 4. Test Authentication
- [ ] Register a new user account
- [ ] Login with the new account
- [ ] Verify JWT token is stored in browser localStorage

### 5. Test Posts Functionality
- [ ] Create a new post with image URL and caption
- [ ] Verify post appears in the list
- [ ] Delete a post (if implemented)

### 6. Test Comments Functionality
- [ ] Click on a post to view comments
- [ ] Add a comment to a post
- [ ] Verify comment appears
- [ ] Delete a comment (if implemented)

## Troubleshooting Guide

### Issue: Build Fails

**Check:**
- [ ] Build logs in Vercel dashboard for errors
- [ ] All dependencies are in `package.json` files
- [ ] No syntax errors in code

**Solutions:**
- Review error messages in build logs
- Ensure all npm packages are properly installed
- Check Node.js version compatibility

### Issue: API Returns 500 Error

**Check:**
- [ ] Function logs in Vercel dashboard (Functions tab)
- [ ] Environment variables are set correctly
- [ ] MongoDB connection string is valid

**Solutions:**
- Verify `MONGODB_URI` is correct
- Check MongoDB Atlas allows connections from anywhere (IP: 0.0.0.0/0)
- Ensure MongoDB user has correct permissions

### Issue: API Returns 404 Error

**Check:**
- [ ] API routes start with `/api/`
- [ ] `vercel.json` rewrites configuration
- [ ] `/api/index.js` exists and is deployed

**Solutions:**
- Verify routes in your code use `/api/` prefix
- Check that `api/index.js` is included in deployment
- Review Vercel deployment files

### Issue: CORS Errors

**Check:**
- [ ] Browser console shows CORS error
- [ ] `CORS_ORIGIN` environment variable

**Solutions:**
- Set `CORS_ORIGIN` to your Vercel URL or `*` for testing
- Ensure API requests are made to the same domain
- Check CORS configuration in `api/index.js`

### Issue: Database Connection Timeouts

**Check:**
- [ ] MongoDB Atlas network access settings
- [ ] MongoDB connection string format
- [ ] MongoDB user credentials

**Solutions:**
- In MongoDB Atlas, go to Network Access
- Add IP: `0.0.0.0/0` to allow connections from anywhere
- Verify username and password in connection string
- Ensure database name is correct in connection string

### Issue: Frontend Shows Wrong API URL

**Check:**
- [ ] `VITE_API_BASE_URL` environment variable (should NOT be set in production)
- [ ] API calls in frontend code

**Solutions:**
- Do NOT set `VITE_API_BASE_URL` in Vercel
- Frontend should use relative URLs (e.g., `/api/posts`)
- Clear browser cache and hard reload

## Redeploy

If you need to redeploy:

1. **Make code changes** in your repository
2. **Commit and push** to GitHub
3. Vercel will **automatically redeploy** when changes are pushed to the main branch

Or manually redeploy:
- [ ] Go to Vercel Dashboard → Your Project → Deployments
- [ ] Click "..." menu on latest deployment
- [ ] Click "Redeploy"

## Environment Variables Update

To update environment variables:
- [ ] Go to Vercel Dashboard → Your Project → Settings → Environment Variables
- [ ] Edit the variable
- [ ] Save
- [ ] Redeploy the project (changes require redeployment)

## Success Criteria

Your deployment is successful when:
- ✅ Frontend loads at your Vercel URL
- ✅ API health check returns `{"ok":true}`
- ✅ User registration works
- ✅ User login works
- ✅ Posts can be created and displayed
- ✅ Comments can be added to posts
- ✅ No errors in browser console
- ✅ No errors in Vercel function logs

## Resources

- [Vercel Documentation](https://vercel.com/docs)
- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Project README](./README.md)
- [Detailed Deployment Guide](./VERCEL_DEPLOYMENT.md)

## Support

If you encounter issues:
1. Check Vercel function logs
2. Check browser console for errors
3. Review MongoDB Atlas logs
4. Check this troubleshooting guide
5. Review the detailed deployment guide (VERCEL_DEPLOYMENT.md)
