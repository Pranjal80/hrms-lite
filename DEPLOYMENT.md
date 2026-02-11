# HRMS Lite - Detailed Deployment Guide

This guide provides step-by-step instructions for deploying HRMS Lite to production.

## 🎯 Deployment Overview

- **Backend**: Railway or Render (with PostgreSQL)
- **Frontend**: Vercel
- **Total Time**: 15-20 minutes

## 📝 Pre-Deployment Checklist

- [ ] GitHub repository created
- [ ] Code pushed to GitHub
- [ ] .env files are NOT committed (use .env.example)
- [ ] Requirements.txt and package.json are up to date

## 🚂 Backend Deployment - Railway (Recommended)

### Step 1: Create Railway Account
1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Authorize Railway to access your repositories

### Step 2: Create New Project
1. Click "New Project"
2. Select "Deploy from GitHub repo"
3. Choose your HRMS Lite repository
4. Railway will detect the backend automatically

### Step 3: Add PostgreSQL Database
1. In your project dashboard, click "New"
2. Select "Database" → "Add PostgreSQL"
3. Railway automatically creates a PostgreSQL instance
4. The `DATABASE_URL` environment variable is automatically set

### Step 4: Configure Backend Service
1. Click on your backend service
2. Go to "Settings" tab
3. Set these configurations:
   - **Root Directory**: `backend`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   - **Python Version**: 3.11

4. Environment Variables (auto-configured):
   - `DATABASE_URL` - automatically set by Railway PostgreSQL
   - `PORT` - automatically set by Railway

### Step 5: Deploy
1. Railway automatically deploys on code push
2. Wait for deployment to complete (2-3 minutes)
3. Click "View Logs" to monitor deployment
4. Once deployed, copy your backend URL (e.g., `https://your-app.railway.app`)

### Step 6: Test Backend
1. Visit `https://your-app.railway.app/docs`
2. Verify API documentation loads
3. Test the `/health` endpoint

## 🎨 Frontend Deployment - Vercel

### Step 1: Create Vercel Account
1. Go to [vercel.com](https://vercel.com)
2. Sign up with GitHub
3. Authorize Vercel to access your repositories

### Step 2: Import Project
1. Click "Add New" → "Project"
2. Select your HRMS Lite repository
3. Vercel detects Vite automatically

### Step 3: Configure Build Settings
1. **Framework Preset**: Vite
2. **Root Directory**: `frontend`
3. **Build Command**: `npm run build` (auto-detected)
4. **Output Directory**: `dist` (auto-detected)

### Step 4: Add Environment Variables
1. Click "Environment Variables"
2. Add variable:
   - **Key**: `VITE_API_URL`
   - **Value**: `https://your-backend.railway.app` (your Railway URL)
   - **Environment**: All (Production, Preview, Development)

### Step 5: Deploy
1. Click "Deploy"
2. Wait for build and deployment (2-3 minutes)
3. Vercel provides a URL like `https://hrms-lite.vercel.app`

### Step 6: Test Frontend
1. Visit your Vercel URL
2. Verify the dashboard loads
3. Test creating an employee
4. Test marking attendance

## 🔧 Alternative: Render Deployment

### Backend on Render

1. **Create Render Account**: [render.com](https://render.com)

2. **Create PostgreSQL Database**:
   - Dashboard → New → PostgreSQL
   - Name: `hrms-lite-db`
   - Plan: Free
   - Create Database
   - Copy "Internal Database URL"

3. **Create Web Service**:
   - New → Web Service
   - Connect your GitHub repository
   - Configuration:
     - **Name**: `hrms-lite-api`
     - **Root Directory**: `backend`
     - **Environment**: Python 3
     - **Build Command**: `pip install -r requirements.txt`
     - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
   
4. **Environment Variables**:
   - `DATABASE_URL`: Paste Internal Database URL from step 2
   - `PYTHON_VERSION`: `3.11.0`

5. **Deploy**: Click "Create Web Service"

6. **Get Backend URL**: Copy from dashboard (e.g., `https://hrms-lite-api.onrender.com`)

### Frontend on Render (Optional)

1. **Create Static Site**:
   - New → Static Site
   - Connect repository
   - Configuration:
     - **Name**: `hrms-lite`
     - **Root Directory**: `frontend`
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`

2. **Environment Variables**:
   - `VITE_API_URL`: Your backend URL

3. **Deploy**: Render builds and deploys

## 🔄 Continuous Deployment

### Automatic Deployments
- Railway: Auto-deploys on push to main branch
- Vercel: Auto-deploys on push to main branch
- Render: Auto-deploys on push to main branch

### Manual Deployments
- Railway: Click "Redeploy" in dashboard
- Vercel: Click "Redeploy" in deployments tab
- Render: Click "Manual Deploy" → "Deploy latest commit"

## 🐛 Troubleshooting

### Backend Issues

**Error: "Module not found"**
- Solution: Check `requirements.txt` includes all dependencies
- Run `pip freeze > requirements.txt` locally

**Error: "Database connection failed"**
- Check `DATABASE_URL` environment variable
- Verify PostgreSQL service is running
- Check database credentials

**Error: "Port already in use"**
- Railway/Render handle ports automatically
- Ensure using `$PORT` environment variable

### Frontend Issues

**Error: "Failed to fetch"**
- Verify `VITE_API_URL` environment variable
- Check backend is deployed and running
- Test backend `/health` endpoint
- Check CORS configuration in backend

**Error: "Build failed"**
- Check all dependencies in `package.json`
- Verify Node.js version compatibility
- Check for syntax errors in code

**Blank page after deployment**
- Check browser console for errors
- Verify API URL is correct
- Check backend CORS settings

## 📊 Post-Deployment Verification

### Backend Checklist
- [ ] Backend URL accessible
- [ ] `/docs` endpoint shows API documentation
- [ ] `/health` endpoint returns healthy status
- [ ] Database connection working
- [ ] All API endpoints responding

### Frontend Checklist
- [ ] Frontend URL accessible
- [ ] Dashboard loads with stats
- [ ] Can create employees
- [ ] Can mark attendance
- [ ] Can view attendance records
- [ ] All filters working
- [ ] Responsive design working

### Integration Checklist
- [ ] Frontend connects to backend
- [ ] Data persists after refresh
- [ ] Error messages display correctly
- [ ] Loading states work properly
- [ ] No console errors

## 🔐 Production Best Practices

### Security (For Production Use)
1. Enable CORS only for your frontend domain
2. Use HTTPS for all connections
3. Implement rate limiting
4. Add authentication
5. Validate all inputs server-side
6. Use environment variables for secrets

### Performance
1. Enable caching where appropriate
2. Optimize database queries
3. Use connection pooling
4. Minimize bundle size
5. Enable compression

### Monitoring
1. Set up error tracking (e.g., Sentry)
2. Monitor API response times
3. Track database performance
4. Set up uptime monitoring
5. Configure logging

## 📞 Support

### Platform Documentation
- Railway: [docs.railway.app](https://docs.railway.app)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Render: [render.com/docs](https://render.com/docs)

### Common Issues
If you encounter issues:
1. Check deployment logs
2. Verify environment variables
3. Test backend independently
4. Check browser console
5. Verify CORS configuration

## ✅ Deployment Complete!

Once deployed, update your README.md with:
- Live Frontend URL
- Backend API URL
- Any deployment-specific notes

Share these URLs in your submission!
