# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Method 1: Deploy with Vercel CLI (Recommended)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project directory:**
   ```bash
   cd pixel-forge-website
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? **Y**
   - Which scope? **Your account**
   - Link to existing project? **N**
   - Project name: **pixel-forge-website** (or your preferred name)
   - Directory: **./pixel-forge-website**
   - Override settings? **N**

### Method 2: Deploy with GitHub

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure settings

## 🔧 Environment Variables

Set these in your Vercel dashboard:

### Required Variables:
```
# ⚠️ SECURITY: Never commit actual MongoDB URI to version control
# Get your connection string from MongoDB Atlas Dashboard
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
NODE_ENV=production
```

### Optional Variables:
```
NEXT_PUBLIC_GA_ID=your-google-analytics-id
```

## 📝 Step-by-Step Instructions

### 1. Prepare Your Code
```bash
# Make sure you're in the project directory
cd pixel-forge-website

# Install dependencies
npm install

# Test locally
npm run dev
```

### 2. Deploy with Vercel CLI
```bash
# Install Vercel CLI globally
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production deployment
vercel --prod
```

### 3. Set Environment Variables in Vercel Dashboard

1. Go to your project dashboard on Vercel
2. Click on "Settings" tab
3. Click on "Environment Variables"
4. Add the following variables:

| Name | Value | Environment |
|------|-------|-------------|
| `MONGODB_URI` | `mongodb+srv://username:password@cluster.mongodb.net/...` | Production, Preview, Development |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.vercel.app` | Production, Preview, Development |
| `NODE_ENV` | `production` | Production |

### 4. Redeploy After Setting Environment Variables
```bash
vercel --prod
```

## 🔍 Verify Deployment

1. **Check the deployment URL** provided by Vercel
2. **Test the contact form** to ensure MongoDB connection works
3. **Check all pages** (/, /services, /portfolio, /contact)
4. **Verify responsive design** on mobile and desktop

## 🛠️ Troubleshooting

### Common Issues:

1. **Build Errors:**
   - Check that all dependencies are in `package.json`
   - Ensure TypeScript compilation passes locally

2. **MongoDB Connection Issues:**
   - Verify the connection string is correct
   - Check that your IP is whitelisted in MongoDB Atlas
   - Ensure the database user has proper permissions

3. **Environment Variables:**
   - Make sure all required variables are set in Vercel dashboard
   - Redeploy after adding new environment variables

### Useful Commands:
```bash
# Check deployment status
vercel ls

# View deployment logs
vercel logs [deployment-url]

# Remove deployment
vercel remove [project-name]
```

## 📊 Post-Deployment

1. **Update DNS** (if using custom domain)
2. **Set up monitoring** (optional)
3. **Configure analytics** (optional)
4. **Test all functionality**
5. **Update README** with live URL

## 🎉 Success!

Your Pixel Forge website should now be live on Vercel! 🚀
