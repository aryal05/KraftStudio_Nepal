# 🚀 Quick Start - Revylo Next.js

## Start Development in 3 Steps

### 1️⃣ Navigate to Project
```bash
cd revylo-nextjs
```

### 2️⃣ Start Dev Server
```bash
pnpm dev
```

### 3️⃣ Open Browser
```
http://localhost:3000
```

---

## 🎯 Essential Commands

```bash
# Development
pnpm dev              # Start development server
pnpm build            # Build for production
pnpm start            # Run production build

# Database
pnpm db:push          # Sync database schema
pnpm db:studio        # Open database UI

# Code Quality
pnpm lint             # Check for issues
```

---

## 📄 Main Pages

| Page | URL | Description |
|------|-----|-------------|
| Home | `/` | Landing page |
| Workspace | `/workspace` | Workspace solutions (✅ Buttons fixed!) |
| Furniture | `/furniture` | Furniture catalog |
| Lighting | `/lighting` | Lighting products |
| Decor | `/decor` | Decor items |
| About | `/about` | About us |
| Admin | `/admin` | Admin dashboard |

---

## 📁 Project Structure

```
src/
├── app/           # Pages (file-based routing)
├── components/    # React components
│   ├── pages/    # Page components
│   └── ui/       # UI components
├── server/        # Server-side logic
├── lib/           # Utilities
└── hooks/         # Custom hooks
```

---

## 🔧 Quick Fixes

### Port in Use
```bash
npx kill-port 3000
```

### Clear Cache
```bash
rm -rf .next
```

### Reinstall
```bash
rm -rf node_modules && pnpm install
```

---

## ✨ What's Fixed

✅ **Workspace page buttons** - Now clearly visible with shadows
✅ **Project structure** - Clean Next.js-only setup
✅ **Documentation** - Complete guides available

---

## 📚 Documentation

- `README_NEXTJS.md` - Complete project guide
- `BUTTON_FIX_DETAILS.md` - CSS fix details
- `SUMMARY.md` - Project overview
- Parent folder has migration docs

---

## 🎨 Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Database**: Drizzle ORM + MySQL
- **API**: tRPC
- **Forms**: React Hook Form + Zod

---

## 🚀 Ready to Code!

Your environment is set up and ready. Start by:
1. Running `pnpm dev`
2. Opening http://localhost:3000
3. Checking out the code in `src/`
4. Making your first changes!

**Happy coding!** 💻✨
