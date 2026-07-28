# Architecture Overview

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         CLIENT (Browser)                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────────────┐         ┌──────────────────────────┐  │
│  │   Main Website      │         │     Admin Panel          │  │
│  │                     │         │                          │  │
│  │  • Home             │         │  • Login Page            │  │
│  │  • Blog             │         │  • Category Management   │  │
│  │  • Category ▼       │         │  • Messages              │  │
│  │    - Dynamic Menu   │         │  • (Hidden pages)        │  │
│  │  • Contact          │         │                          │  │
│  └─────────────────────┘         └──────────────────────────┘  │
│            │                                │                    │
│            └────────────────┬───────────────┘                    │
│                             │                                    │
└─────────────────────────────┼────────────────────────────────────┘
                              │
                    ┌─────────▼──────────┐
                    │   tRPC API Layer   │
                    │                    │
                    │  • categories.*    │
                    │  • products.*      │
                    │  • messages.*      │
                    │  • auth.*          │
                    │  • cart.*          │
                    │  • bookings.*      │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Server Functions  │
                    │   (src/server/)    │
                    │                    │
                    │  • db.ts           │
                    │  • routers.ts      │
                    │  • context.ts      │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │   Drizzle ORM      │
                    │                    │
                    │  • Query Builder   │
                    │  • Type Safety     │
                    │  • Migrations      │
                    └─────────┬──────────┘
                              │
                    ┌─────────▼──────────┐
                    │  Neon PostgreSQL   │
                    │                    │
                    │  • users           │
                    │  • categories ✨   │
                    │  • products 🔄     │
                    │  • messages ✨     │
                    │  • cartItems       │
                    │  • bookings        │
                    └────────────────────┘
```

---

## Data Flow

### Creating a Category

```
Admin Panel (Browser)
    │
    │ 1. Fill form (name, slug, image)
    ├─── POST request ────────────────────┐
    │                                      │
    ▼                                      ▼
tRPC: categories.create            Server validates
    │                                      │
    │ 2. Call database function            │
    ├─────────────────────────────────────┤
    │                                      │
    ▼                                      ▼
db.createCategory()                Drizzle ORM
    │                                      │
    │ 3. Insert into database              │
    ├─────────────────────────────────────┤
    │                                      │
    ▼                                      ▼
PostgreSQL: INSERT INTO categories  Return created category
    │                                      │
    │ 4. Return result                     │
    └──────────────────┬───────────────────┘
                       │
                       ▼
              Admin Panel receives
                 confirmation
                       │
                       │ 5. Category now available
                       ▼
           Main Website: categories.getAll()
                       │
                       ▼
           Navbar mega-menu updates
              automatically! ✨
```

---

## Component Hierarchy

### Main Website

```
app/layout.tsx
  ├── Navigation.tsx ✨ (Redesigned)
  │   ├── Desktop Nav
  │   │   ├── Logo
  │   │   ├── Nav Items (Home, Blog, Contact)
  │   │   ├── Category Mega-Menu ✨
  │   │   │   └── Dynamic categories from DB
  │   │   └── Search Icon
  │   └── Mobile Nav
  │       ├── Top Bar (Logo, Search)
  │       └── Bottom Nav Bar
  │
  ├── [Page Content]
  │   ├── app/page.tsx (Home)
  │   ├── app/contact/page.tsx ✨
  │   ├── app/categories/page.tsx ✨
  │   ├── app/category/[slug]/page.tsx ✨
  │   └── app/blog/page.tsx
  │
  └── Footer.tsx
```

### Admin Panel

```
app/admin/
  ├── AdminLayout.tsx
  │   ├── AdminSidebar.tsx 🔄 (Simplified)
  │   │   ├── Logo
  │   │   ├── Main Menu
  │   │   │   ├── Category Management ✨
  │   │   │   └── Messages ✨
  │   │   ├── Logout
  │   │   └── User Profile
  │   │
  │   └── [Admin Page Content]
  │       ├── categories/page.tsx ✨
  │       ├── messages/page.tsx ✨
  │       └── [Hidden pages] 💤
  │
  └── login/page.tsx ✨
```

---

## Database Schema Relationships

```
┌──────────────┐
│    users     │
│──────────────│
│ id (PK)      │
│ email        │
│ password     │──────────┐
│ role         │          │ Admin manages
└──────────────┘          │
                          │
                          ▼
              ┌──────────────────┐
              │   categories ✨  │
              │──────────────────│
              │ id (PK)          │
              │ name             │
              │ slug             │────┐ Appears in
              │ imageUrl         │    │ navbar
              │ displayOrder     │    │
              │ isActive         │◄───┘
              └─────────┬────────┘
                        │
                        │ 1:N relationship
                        │
              ┌─────────▼────────┐
              │   products 🔄   │
              │──────────────────│
              │ id (PK)          │
              │ name             │
              │ categoryId (FK)  │
              │ price            │
              │ colors (JSON)    │───┐ Array of
              │ inStock          │   │ {name, hex,
              └─────────┬────────┘   │  images[]}
                        │            │
                        │            └─► 5+ images
                        │                per color
                        │ M:N via cartItems
                        │
              ┌─────────▼────────┐
              │   cartItems      │
              │──────────────────│
              │ id (PK)          │
              │ userId           │
              │ productId (FK)   │
              │ selectedColor ✨ │
              │ quantity         │
              └──────────────────┘

                          
              ┌──────────────────┐
              │   messages ✨    │
              │──────────────────│
              │ id (PK)          │
              │ name             │
              │ email            │
              │ message          │
              │ status           │───► unread/read
              └──────────────────┘
                        │
                        │ Displayed in
                        │ Admin Messages
                        ▼
              ┌──────────────────┐
              │  Admin Panel     │
              │  Messages Page   │
              └──────────────────┘
```

---

## Request/Response Flow

### Example: View Category Page

```
1. USER: Clicks "Furniture" in navbar mega-menu
   └─> Browser navigates to /category/furniture

2. NEXT.JS: Loads page component
   └─> app/category/[slug]/page.tsx

3. COMPONENT: Makes tRPC queries
   ├─> trpc.categories.getBySlug({ slug: "furniture" })
   └─> trpc.products.getByCategorySlug({ slug: "furniture" })

4. SERVER: Processes queries
   ├─> routers.ts → categories.getBySlug
   │   └─> db.ts → getCategoryBySlug()
   │       └─> SELECT * FROM categories WHERE slug = 'furniture'
   │
   └─> routers.ts → products.getByCategorySlug
       └─> db.ts → getProductsByCategorySlug()
           └─> SELECT * FROM products WHERE categoryId = X

5. DATABASE: Returns data
   └─> Category: { id, name, slug, imageUrl, description }
   └─> Products: [{ id, name, price, colors, ... }, ...]

6. COMPONENT: Receives data, renders UI
   ├─> Category header with image
   ├─> Breadcrumb navigation
   └─> Product grid with color variants

7. USER: Sees fully rendered category page ✨
```

---

## Authentication Flow

### Admin Login

```
1. USER: Visits /admin/login
   └─> Enters email and password

2. COMPONENT: Calls tRPC mutation
   └─> trpc.auth.login.mutate({ email, password })

3. SERVER: Validates credentials
   ├─> db.getUserByEmail(email)
   ├─> bcrypt.compare(password, hashedPassword)
   └─> Returns user (without password) if valid

4. CLIENT: Receives response
   ├─> Sets session cookie
   └─> Redirects to /admin/categories

5. PROTECTED ROUTES: Check session
   ├─> Context reads session cookie
   ├─> Fetches user from database
   └─> Returns user or null

6. COMPONENT: Renders based on auth
   ├─> If authenticated: Show admin panel
   └─> If not: Redirect to login
```

---

## Hidden Features Architecture

### Preservation Strategy

```
src/components/AdminSidebar.tsx
    │
    ├─ VISIBLE SECTION (Currently Active)
    │  ├─ Category Management
    │  ├─ Messages
    │  └─ Logout
    │
    └─ COMMENTED SECTION (Preserved)
       ├─ Dashboard
       ├─ Products
       ├─ Orders
       ├─ Bookings
       ├─ Customers
       ├─ Blog Posts
       ├─ Furniture Catalog
       ├─ Lighting Catalog
       ├─ Decor Items
       ├─ Analytics
       ├─ Help & Support
       └─ Settings

All pages still exist:
✓ app/admin/dashboard/page.tsx
✓ app/admin/products/page.tsx
✓ app/admin/orders/page.tsx
✓ ... (all preserved)

To restore: Uncomment menu items in AdminSidebar.tsx
```

---

## Technology Stack

```
┌────────────────────────────────────────┐
│         Frontend Layer                  │
├────────────────────────────────────────┤
│ • Next.js 16 (React 19)                │
│ • TypeScript                            │
│ • Tailwind CSS                          │
│ • Framer Motion                         │
│ • shadcn/ui + Radix UI                  │
└────────────────────────────────────────┘
                  │
┌─────────────────▼──────────────────────┐
│         API Layer                       │
├────────────────────────────────────────┤
│ • tRPC (Type-safe APIs)                 │
│ • Zod (Validation)                      │
│ • SuperJSON (Serialization)             │
└────────────────────────────────────────┘
                  │
┌─────────────────▼──────────────────────┐
│         Server Layer                    │
├────────────────────────────────────────┤
│ • Node.js                               │
│ • Next.js API Routes                    │
│ • bcryptjs (Password hashing)           │
│ • jose (JWT - future)                   │
└────────────────────────────────────────┘
                  │
┌─────────────────▼──────────────────────┐
│         ORM Layer                       │
├────────────────────────────────────────┤
│ • Drizzle ORM                           │
│ • Type-safe queries                     │
│ • Migration management                  │
└────────────────────────────────────────┘
                  │
┌─────────────────▼──────────────────────┐
│         Database Layer                  │
├────────────────────────────────────────┤
│ • Neon PostgreSQL (Serverless)          │
│ • SSL connections                       │
│ • Auto-scaling                          │
└────────────────────────────────────────┘
```

---

## File Organization

```
revylo-nextjs/
│
├─ src/
│  ├─ app/                    # Next.js 16 App Router
│  │  ├─ admin/               # Admin pages
│  │  │  ├─ categories/ ✨   # New
│  │  │  ├─ messages/ ✨     # New
│  │  │  ├─ login/ ✨        # New
│  │  │  └─ [others]/ 💤     # Hidden
│  │  ├─ category/[slug]/ ✨ # Dynamic routes
│  │  ├─ categories/ ✨      # List page
│  │  ├─ contact/ ✨         # Contact form
│  │  └─ ...                  # Other pages
│  │
│  ├─ components/             # React components
│  │  ├─ Navigation.tsx 🔄   # Redesigned
│  │  ├─ AdminSidebar.tsx 🔄 # Simplified
│  │  ├─ ui/                  # shadcn components
│  │  └─ ...
│  │
│  ├─ server/                 # Backend logic
│  │  ├─ db.ts 🔄           # Database queries
│  │  ├─ routers.ts 🔄      # tRPC endpoints
│  │  ├─ trpc.ts             # tRPC setup
│  │  └─ context.ts          # Request context
│  │
│  └─ lib/                    # Utilities
│     ├─ trpc.ts             # Client setup
│     ├─ const.ts            # Constants
│     └─ ...
│
├─ drizzle/                   # Database
│  └─ schema.ts 🔄          # PostgreSQL schema
│
├─ public/                    # Static assets
│
├─ create-admin.js ✨        # Admin creation
├─ view-database.js ✨       # Database viewer
├─ .env 🔄                   # Environment vars
├─ package.json 🔄           # Dependencies
└─ drizzle.config.ts 🔄     # Drizzle config
```

---

## Deployment Architecture

```
┌──────────────────────────────────────────┐
│           Vercel Edge Network             │
│  (CDN, Edge Functions, Caching)           │
└────────────────┬─────────────────────────┘
                 │
      ┌──────────▼──────────┐
      │  Next.js Server     │
      │  (Serverless)       │
      └──────────┬──────────┘
                 │
      ┌──────────▼──────────┐
      │  Database           │
      │  (Neon PostgreSQL)  │
      │  (Serverless)       │
      └─────────────────────┘

Optional:
┌─────────────────────┐
│  AWS S3             │  ← Image storage
│  (Future feature)   │
└─────────────────────┘
```

---

This architecture provides:
- ✅ Type safety end-to-end
- ✅ Serverless scalability
- ✅ Fast development
- ✅ Easy maintenance
- ✅ Production ready
