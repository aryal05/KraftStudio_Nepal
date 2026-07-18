# 🚀 Deployment Guide - GitHub & Vercel

## ✅ Pre-Deployment Checklist

All fixes have been applied:
- ✅ TypeScript config fixed (root & Next.js)
- ✅ Build errors resolved
- ✅ Currency changed to NPR
- ✅ Workspace buttons fixed
- ✅ Project structure cleaned

---

## 📦 Step 1: Push to GitHub

### Initialize Git (if not already done)
```bash
# In the root directory (revylo/)
git init
git branch -M main
```

### Add All Files
```bash
git add .
```

### Commit Changes
```bash
git commit -m "feat: Complete Next.js migration with NPR currency and fixes

- Migrated from React/Vite to Next.js 14
- Changed all currency displays to NPR (Nepali Rupees)
- Fixed workspace page button visibility
- Cleaned up project structure
- Resolved all build errors
- Fixed TypeScript configuration"
```

### Create GitHub Repository
1. Go to https://github.com/new
2. Create a new repository (e.g., "revylo-nextjs")
3. **DO NOT** initialize with README, .gitignore, or license

### Push to GitHub
```bash
# Replace YOUR_USERNAME and YOUR_REPO with your actual values
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

---

## 🚀 Step 2: Deploy to Vercel

### Method 1: Vercel CLI (Recommended)

#### Install Vercel CLI
```bash
npm i -g vercel
```

#### Login to Vercel
```bash
vercel login
```

#### Deploy
```bash
cd revylo-nextjs
vercel
```

Follow the prompts:
- **Set up and deploy?** → Yes
- **Which scope?** → Your account
- **Link to existing project?** → No
- **Project name?** → revylo-nextjs (or your choice)
- **Directory?** → ./ (current directory)
- **Override settings?** → No

#### Deploy to Production
```bash
vercel --prod
```

---

### Method 2: Vercel Dashboard

1. **Go to** https://vercel.com/new
2. **Import Git Repository**
   - Click "Import Project"
   - Select your GitHub repository
3. **Configure Project**
   - Framework Preset: **Next.js**
   - Root Directory: **revylo-nextjs**
   - Build Command: `pnpm build` (auto-detected)
   - Output Directory: `.next` (auto-detected)
   - Install Command: `pnpm install` (auto-detected)

4. **Environment Variables**
   Add these in Vercel dashboard:
   ```
   DATABASE_URL=your_database_connection_string
   NEXTAUTH_SECRET=your_secret_key_here
   NEXTAUTH_URL=https://your-domain.vercel.app
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Your site will be live!

---

## 🔧 Environment Variables

### Required Variables

Create these in Vercel Dashboard → Settings → Environment Variables:

```env
# Database
DATABASE_URL=mysql://user:password@host:port/database

# Authentication (if using)
NEXTAUTH_SECRET=generate_a_random_secret_here
NEXTAUTH_URL=https://your-domain.vercel.app

# Optional: Other API Keys
# Add any other API keys your app needs
```

### Generate NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

---

## 📁 Vercel Project Settings

### Root Directory
Set this in Vercel if needed:
```
revylo-nextjs
```

### Build & Development Settings
```json
{
  "buildCommand": "pnpm build",
  "devCommand": "pnpm dev",
  "installCommand": "pnpm install",
  "outputDirectory": ".next"
}
```

### Node.js Version
Vercel should auto-detect, but if needed:
```
18.x or 20.x
```

---

## 🧪 Testing Deployment

### Test Locally Before Deploying
```bash
cd revylo-nextjs

# Build production bundle
pnpm build

# Test production build
pnpm start

# Open http://localhost:3000
```

### Verify These Work
- [ ] Homepage loads
- [ ] Navigation works
- [ ] Product pages load
- [ ] Cart functionality
- [ ] All prices show in NPR
- [ ] Workspace buttons visible
- [ ] Admin panel accessible (if applicable)
- [ ] No console errors

---

## 🔍 Troubleshooting

### Build Fails on Vercel

**Check TypeScript Errors**
```bash
cd revylo-nextjs
pnpm tsc --noEmit
```

**Check Build Locally**
```bash
pnpm build
```

### Environment Variables Missing
- Go to Vercel Dashboard → Settings → Environment Variables
- Add all required variables
- Redeploy

### Database Connection Issues
- Verify DATABASE_URL is correct
- Check if database allows connections from Vercel IPs
- Test connection string locally first

### Module Not Found Errors
- Check all imports use `@/` alias correctly
- Verify tsconfig.json paths are correct
- Run `pnpm install` to ensure all dependencies are installed

---

## 🎯 Post-Deployment

### Get Your Live URL
After deployment, Vercel provides:
- Production URL: `https://your-project.vercel.app`
- Preview URLs for each commit/branch

### Custom Domain (Optional)
1. Go to Vercel Dashboard → Settings → Domains
2. Add your custom domain
3. Configure DNS as instructed

### Enable Analytics (Optional)
- Go to Vercel Dashboard → Analytics
- Enable Web Analytics
- View performance metrics

---

## 📊 Deployment Checklist

### Before Pushing to GitHub
- [ ] All TypeScript errors fixed
- [ ] Build succeeds locally (`pnpm build`)
- [ ] .env files not committed (in .gitignore)
- [ ] All documentation updated
- [ ] Test all features work

### Before Deploying to Vercel
- [ ] Code pushed to GitHub
- [ ] Environment variables ready
- [ ] Database accessible (if using)
- [ ] Domain configured (if using custom domain)

### After Deployment
- [ ] Test live URL
- [ ] Check all pages load
- [ ] Verify prices show in NPR
- [ ] Test on mobile devices
- [ ] Check browser console for errors
- [ ] Monitor Vercel logs for issues

---

## 🔗 Useful Commands

### Git Commands
```bash
# Check status
git status

# Add specific files
git add file1 file2

# Add all files
git add .

# Commit with message
git commit -m "your message"

# Push to GitHub
git push origin main

# Pull latest changes
git pull origin main
```

### Vercel Commands
```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View logs
vercel logs

# List deployments
vercel ls

# Remove deployment
vercel rm deployment-url
```

---

## 📞 Support Resources

- **Vercel Docs**: https://vercel.com/docs
- **Next.js Deployment**: https://nextjs.org/docs/deployment
- **GitHub Docs**: https://docs.github.com

---

## 🎉 Success!

Once deployed:
- ✅ Your site is live on Vercel
- ✅ Automatic deployments on git push
- ✅ Preview URLs for each branch
- ✅ SSL certificate (HTTPS) automatically
- ✅ Global CDN for fast loading

**Congratulations! Your Revylo e-commerce site is now live! 🚀**
