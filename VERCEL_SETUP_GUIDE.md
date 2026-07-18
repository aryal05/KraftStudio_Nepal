# KraftStudio Nepal - Vercel Deployment Guide

## Repository
- **GitHub**: https://github.com/aryal05/KraftStudio_Nepal

## Project Structure
This is a monorepo with the Next.js application in the `revylo-nextjs` subdirectory.

## Vercel Configuration

The root `vercel.json` is configured to build the Next.js app from the subdirectory:

```json
{
  "buildCommand": "cd revylo-nextjs && pnpm build",
  "outputDirectory": "revylo-nextjs/.next",
  "framework": "nextjs",
  "installCommand": "cd revylo-nextjs && pnpm install",
  "devCommand": "cd revylo-nextjs && pnpm dev"
}
```

## Deployment Steps

### 1. Import Project to Vercel
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "Add New..." → "Project"
3. Import from GitHub: `aryal05/KraftStudio_Nepal`

### 2. Configure Environment Variables
Add these environment variables in Vercel project settings:

**Required:**
- `DATABASE_URL` - Your MySQL/PlanetScale database connection string
- `NODE_ENV` - Set to `production`

**Optional (if using AWS S3):**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `AWS_S3_BUCKET`

### 3. Build Settings
Vercel will automatically detect the `vercel.json` configuration. Verify these settings:

- **Framework Preset**: Next.js
- **Root Directory**: `.` (leave as root)
- **Build Command**: `cd revylo-nextjs && pnpm build`
- **Output Directory**: `revylo-nextjs/.next`
- **Install Command**: `cd revylo-nextjs && pnpm install`

### 4. Deploy
Click "Deploy" and Vercel will:
1. Clone the repository
2. Install dependencies in `revylo-nextjs`
3. Build the Next.js application
4. Deploy to production

## Troubleshooting

### Build Errors
If you encounter build errors:

1. **TypeScript errors**: The project uses `strict: false` for development. Check `revylo-nextjs/tsconfig.json`

2. **Missing dependencies**: Ensure all dependencies are in `revylo-nextjs/package.json`

3. **Database connection**: Verify `DATABASE_URL` environment variable is set correctly

### Local Testing
Test the build locally before deploying:

```bash
cd revylo-nextjs
pnpm install
pnpm build
pnpm start
```

## Post-Deployment

### Database Setup
Run database migrations after first deployment:

```bash
cd revylo-nextjs
pnpm db:push
```

### Custom Domain
1. Go to Vercel project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions

## Monitoring
- View deployment logs in Vercel Dashboard
- Monitor runtime logs in Vercel project → "Logs"
- Check analytics in Vercel project → "Analytics"

## Updates
To deploy updates:
1. Push changes to GitHub `main` branch
2. Vercel automatically deploys new commits
3. Preview deployments created for pull requests

## Support
- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Troubleshooting Guide](https://vercel.com/docs/concepts/deployments/troubleshoot-a-build)
