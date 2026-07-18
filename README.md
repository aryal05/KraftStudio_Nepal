# Revylo - Interior Design & Furniture E-commerce

Modern Next.js e-commerce platform for furniture, lighting, and home decor.

## 🚀 Quick Start

```bash
cd revylo-nextjs
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
revylo/
├── revylo-nextjs/       # Main Next.js application
├── drizzle/             # Database schema & migrations  
├── references/          # API documentation
└── .env                 # Environment configuration
```

## 💻 Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI**: Tailwind CSS + Framer Motion
- **Database**: MySQL + Drizzle ORM
- **API**: tRPC
- **Forms**: React Hook Form + Zod

## 🎯 Key Features

- Modern responsive design
- Product catalog with filtering
- Shopping cart functionality
- Appointment booking system
- Admin dashboard
- All prices in NPR (Nepali Rupees)

## 📄 Main Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/furniture` | Furniture catalog |
| `/lighting` | Lighting products |
| `/decor` | Decor items |
| `/workspace` | Office solutions |
| `/cart` | Shopping cart |
| `/admin` | Admin dashboard |

## 🛠️ Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm build            # Build for production
pnpm start            # Run production build

# Database
pnpm db:push          # Sync schema
pnpm db:studio        # Open DB UI

# Code quality
pnpm lint             # Run linter
```

## 💰 Currency

All prices displayed in **NPR (Nepali Rupees)**
- Uses `formatNPR()` utility from `@/lib/utils`
- Example: NPR 1,299 or Rs. 1,299

## 📚 Documentation

- `CURRENCY_UPDATE.md` - Currency conversion guide
- `revylo-nextjs/QUICK_START.md` - Detailed setup guide

## 🔗 Important Links

- **Main App**: `revylo-nextjs/` directory
- **Database Schema**: `drizzle/schema.ts`
- **API Routes**: `revylo-nextjs/src/app/api/`
- **Components**: `revylo-nextjs/src/components/`

## 🆘 Troubleshooting

**Port in use?**
```bash
npx kill-port 3000
```

**Clear cache:**
```bash
cd revylo-nextjs
rm -rf .next
pnpm dev
```

**Reinstall:**
```bash
rm -rf node_modules
pnpm install
```

## 📞 Support

Check the documentation files or refer to:
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Drizzle ORM](https://orm.drizzle.team/docs)

---

**Status**: ✅ Production Ready
**Last Updated**: Migration to Next.js complete
**Currency**: NPR (Nepali Rupees)
