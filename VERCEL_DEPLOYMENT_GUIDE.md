# Vercel Deployment Guide for Revylo

## Prerequisites
- GitHub account (already done ✅)
- Vercel account
- MySQL database (PlanetScale, Railway, or any MySQL provider)

## Step 1: Setup MySQL Database

### Option A: PlanetScale (Recommended)
1. Go to https://planetscale.com
2. Sign up for free account
3. Create new database named `revylo`
4. Click "Connect" → Copy connection string
5. Save this connection string - you'll need it!

### Option B: Railway
1. Go to https://railway.app
2. Sign up and create new project
3. Add MySQL service
4. Copy the connection URL from settings

## Step 2: Run Database Migrations

Before deploying, you need to create tables in your database:

```bash
# 1. Add your DATABASE_URL to .env file
DATABASE_URL=mysql://username:password@host/database

# 2. Run migrations to create tables
npm run db:push
```

This creates:
- users table
- products table
- cartItems table
- bookings table

## Step 3: Seed Database with Products (Optional)

Since the current code has hardcoded product data, you need to add products to database:

```sql
-- Connect to your MySQL database and run:
INSERT INTO products (name, slug, category, price, description, imageUrl, inStock, stockQuantity) VALUES
('Modern Leather Sofa', 'modern-leather-sofa', 'furniture', 129900, 'Luxury leather sofa', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc', 1, 10),
('Pendant Light Fixture', 'pendant-light', 'lighting', 29900, 'Industrial pendant light', 'https://images.unsplash.com/photo-1565182999555-2142eac8bb46', 1, 15),
('Abstract Canvas Art', 'abstract-canvas-art', 'decor', 24900, 'Modern wall art', 'https://images.unsplash.com/photo-1561214115-f2f134cc4912', 1, 8);
```

## Step 4: Deploy to Vercel

### Via Vercel Dashboard:

1. **Go to Vercel**
   - Visit https://vercel.com
   - Sign in with GitHub

2. **Import Project**
   - Click "Add New" → "Project"
   - Select your `KraftStudio` repository
   - Click "Import"

3. **Configure Build Settings**
   
   Vercel should auto-detect, but verify:
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   ```env
   # Database (REQUIRED)
   DATABASE_URL=mysql://your-connection-string-here
   
   # Server Config
   NODE_ENV=production
   
   # OAuth (Optional - for login features)
   VITE_OAUTH_PORTAL_URL=your-oauth-url
   VITE_APP_ID=revylo-app
   OAUTH_SERVER_URL=your-oauth-url
   ```

5. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your site will be live! 🎉

### Via Vercel CLI:

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts and add environment variables
```

## Step 5: Post-Deployment

1. **Test the Website**
   - Visit your Vercel URL
   - Check if pages load
   - Try browsing products

2. **Check Database Connection**
   - Try adding to cart (if you have auth setup)
   - Check bookings form
   - Test admin dashboard

3. **Monitor Logs**
   - Go to Vercel Dashboard
   - Click on your project
   - View "Functions" tab for server logs

## Common Issues & Solutions

### Issue 1: "DATABASE_URL is required"
**Solution:** Add DATABASE_URL to environment variables in Vercel dashboard

### Issue 2: "Connection timeout"
**Solution:** 
- Check if your MySQL database allows connections from Vercel IPs
- PlanetScale: Enable "Connect from anywhere"
- Railway: Should work by default

### Issue 3: "Products not showing"
**Solution:** 
- You need to seed database with products
- Or modify code to use hardcoded products initially

### Issue 4: Build fails
**Solution:**
- Check build logs in Vercel
- Make sure all dependencies are in package.json
- Try building locally first: `npm run build`

## Alternative: Deploy Without Database

If you want to deploy quickly without database:

1. **Comment out database checks** in `server/db.ts`
2. **Use hardcoded data** from existing code
3. **Disable auth features** temporarily
4. Deploy and it will work as a static showcase

Later you can add database when ready!

## Environment Variables Reference

### Required
```env
DATABASE_URL=mysql://user:pass@host:port/dbname
```

### Optional (for full features)
```env
NODE_ENV=production
VITE_OAUTH_PORTAL_URL=https://your-oauth-server.com
VITE_APP_ID=revylo-app
OAUTH_SERVER_URL=https://your-oauth-server.com
```

## Next Steps After Deployment

1. **Custom Domain**
   - Add your domain in Vercel dashboard
   - Update DNS records

2. **SSL Certificate**
   - Automatic with Vercel ✅

3. **Analytics**
   - Enable Vercel Analytics
   - Add Google Analytics

4. **Performance**
   - Check Lighthouse scores
   - Optimize images

## Need Help?

- Vercel Docs: https://vercel.com/docs
- PlanetScale Docs: https://planetscale.com/docs
- Drizzle ORM: https://orm.drizzle.team

---

## Quick Deploy Checklist

- [ ] Create MySQL database
- [ ] Copy DATABASE_URL
- [ ] Run `npm run db:push` locally
- [ ] Push code to GitHub
- [ ] Import project in Vercel
- [ ] Add DATABASE_URL to env vars
- [ ] Deploy
- [ ] Test website
- [ ] Add custom domain (optional)

**Estimated Time:** 15-30 minutes

Good luck! 🚀
