# Quick Setup Guide - Website Redesign

Follow these steps to get your redesigned website up and running:

## Step 1: Install Dependencies

```bash
cd revylo-nextjs
pnpm install
```

This will install all required packages including:
- `@neondatabase/serverless` (PostgreSQL driver)
- `bcryptjs` (Password hashing)
- All other dependencies

## Step 2: Setup Database Tables

The database connection is already configured in `.env`. Now create the tables:

```bash
pnpm db:push
```

This will create all necessary tables in your Neon PostgreSQL database:
- `users` (admin authentication)
- `categories` (dynamic categories)
- `products` (with color variants)
- `cartItems` (shopping cart)
- `bookings` (appointment bookings)
- `messages` (contact form submissions)

## Step 3: Create Admin User

Run the admin creation script:

```bash
node create-admin.js
```

**Default credentials created:**
- Email: `admin@kraftstudio.com`
- Password: `Admin@123`

⚠️ **IMPORTANT:** You can edit `create-admin.js` to change these credentials before running!

## Step 4: Start Development Server

```bash
pnpm dev
```

Your site will be available at: `http://localhost:3000`

## Step 5: Login to Admin Panel

1. Navigate to: `http://localhost:3000/admin/login`
2. Use the credentials from Step 3
3. You should see the simplified admin panel with:
   - Category Management
   - Messages
   - Logout button

## Step 6: Create Your First Category

1. In the admin panel, click **"Category Management"**
2. Click **"Add Category"** button
3. Fill in the form:
   - **Name:** e.g., "Furniture"
   - **Slug:** Auto-generated (e.g., "furniture")
   - **Description:** Brief description
   - **Image URL:** Paste an image URL
   - **Display Order:** 0 (lower numbers appear first)
4. Click **"Create Category"**

The category will **automatically appear** in the main website navbar under "Category"!

## Step 7: Test the Contact Page

1. Visit: `http://localhost:3000/contact`
2. Fill out the contact form
3. Submit it
4. Go to Admin → Messages
5. You should see your message with an unread badge

---

## 🎉 You're All Set!

Your website redesign is complete with:

✅ Dynamic category system
✅ Premium navbar with mega-menu
✅ Contact page (replaced About)
✅ Simplified admin panel
✅ All old features preserved (just hidden)

---

## Troubleshooting

### Database Connection Error
If you get a database connection error:
1. Check `.env` file has correct `DATABASE_URL`
2. Make sure Neon database is accessible
3. Verify SSL mode is set to `require`

### Admin Login Not Working
1. Make sure you ran `create-admin.js`
2. Check browser console for errors
3. Verify credentials match what's in the database

### Categories Not Showing in Navbar
1. Make sure category is marked as "Active" (toggle in admin)
2. Check `displayOrder` is set correctly
3. Refresh the page

### TypeScript Errors
```bash
# If you see type errors, restart the TypeScript server
# In VS Code: Ctrl+Shift+P → "TypeScript: Restart TS Server"
```

---

## Next Steps

1. **Add More Categories:** Create Lighting, Decor, Workspace, etc.
2. **Add Products:** Products will be added with color variants (future feature)
3. **Customize Styles:** All styling is in Tailwind CSS classes
4. **Deploy:** Follow Vercel deployment guide when ready

---

## Need to Restore Hidden Admin Features?

Open `src/components/AdminSidebar.tsx` and uncomment the menu items you want to restore. Full instructions in `WEBSITE_REDESIGN_COMPLETE.md`.

---

**Questions?** Check `WEBSITE_REDESIGN_COMPLETE.md` for detailed documentation.
