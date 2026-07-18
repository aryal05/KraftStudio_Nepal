# Admin Dashboard Documentation

## Overview
A fully-functional, modern admin dashboard inspired by the Vizora dashboard design. Built with React, TypeScript, Tailwind CSS, and Framer Motion for smooth animations.

## 🎨 Design Features

### Color Theme
- **Primary Color**: Dark green (`#2d4a3e`) - matching the reference sidebar
- **Background**: Light gray (`#f5f5f5`) - clean, professional look
- **Accent Colors**: Emerald green for positive metrics, yellow for warnings, red for alerts
- **Card Design**: White cards with subtle shadows and hover effects

### Animation Features
- Smooth page transitions using Framer Motion
- Staggered animations for list items and cards
- Hover effects on interactive elements
- Slide-in animations for sidebars and modals
- Loading skeletons for data fetching states

## 📁 File Structure

```
client/src/
├── components/
│   ├── AdminSidebar.tsx        # Dark green sidebar navigation
│   └── AdminLayout.tsx         # Layout wrapper with sidebar
└── pages/
    └── admin/
        ├── index.tsx           # Dashboard page wrapper
        ├── Dashboard.tsx       # Main dashboard with stats & charts
        ├── MessagesPage.tsx    # Messages page wrapper
        ├── Messages.tsx        # Message inbox & conversation view
        ├── Products.tsx        # Product management (grid/list view)
        └── Orders.tsx          # Order management table
```

## 🚀 Pages Overview

### 1. Dashboard (`/admin/dashboard`)
**Features:**
- **Stats Cards**: New Net Income, Average Sales, Total Orders, Impressions
- **Charts**: Area chart showing sales trends over time with dual lines
- **Conversion Rate**: Funnel metrics with progress bars
- **Premium Plan Upgrade**: CTA card with performance metrics
- **Product List**: Quick view table with search and filters

**Key Components:**
- Responsive grid layout (1-4 columns based on screen size)
- Interactive charts using Recharts library
- Real-time percentage changes with trend indicators
- Smooth hover effects on all cards

### 2. Messages (`/admin/messages` or `/admin/chat`)
**Features:**
- **Message Stats**: Total, Unread, Urgent, Starred counts with color-coded cards
- **Message List**: Left panel with search, filters, and message previews
- **Conversation View**: Right panel showing full message details
- **Customer Info Cards**: Display customer details and received time
- **Reply Section**: Quick reply input with attachment options

**Filter Options:**
- All Messages
- Unread
- Starred
- Urgent
- Replied

**Key Features:**
- Selected message highlighting with yellow accent
- Unread indicators with red dots
- Avatar with colored backgrounds
- Smooth transitions between conversations

### 3. Products (`/admin/products`)
**Features:**
- **View Modes**: Toggle between Grid and List views
- **Search & Filter**: By name, SKU, category
- **Product Cards**: Image, name, SKU, price, stock, ratings
- **Status Badges**: Active, Low Stock, Out of Stock
- **Actions**: View, Edit, Delete options

**Grid View:**
- 3-column responsive layout
- Image hover zoom effect
- Overlay action buttons on hover
- Rating display with stars

**List View:**
- Full data table with sortable columns
- Avatar images for products
- Inline action buttons
- Hover row highlighting

### 4. Orders (`/admin/orders`)
**Features:**
- **Order Stats**: Total, Pending, Processing, Delivered counts
- **Search & Filter**: By order ID, customer name, email, status
- **Order Table**: Complete order details with customer info
- **Status Tracking**: Visual badges with icons for each status
- **Payment Status**: Paid, Pending, Refunded indicators

**Status Types:**
- Pending (Yellow) - Clock icon
- Processing (Blue) - Package icon
- Shipping (Purple) - Truck icon
- Delivered (Green) - CheckCircle icon
- Cancelled (Red) - XCircle icon

## 🎯 Sidebar Navigation

### Main Menu
- Dashboard - Overview with stats and charts
- Products - Product management
- Order - Order tracking and management
- Customer - Customer database (placeholder)
- Chat - Message center with badge count

### Other
- Email - Email management (placeholder)
- Analytics - Detailed analytics (placeholder)
- Integration - Third-party integrations (placeholder)
- Performance - Performance metrics (placeholder)

### Account
- Help Center - Support documentation (placeholder)
- Settings - User settings (placeholder)

## 🎨 Component Library Used

### UI Components (from shadcn/ui)
- Card, CardContent, CardHeader
- Button (with variants: default, ghost, outline)
- Input, Select, Switch
- Badge (with color variants)
- Avatar, AvatarImage, AvatarFallback
- ScrollArea
- DropdownMenu
- Tooltip, TooltipProvider

### Chart Library
- Recharts: AreaChart, LineChart, ResponsiveContainer
- CartesianGrid, XAxis, YAxis, Tooltip

### Icons
- Lucide React: Full icon set for all UI elements

## 🔧 How to Add New Admin Pages

1. **Create the page component:**
```tsx
// client/src/pages/admin/NewPage.tsx
export default function NewPage() {
  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <h1 className="text-3xl font-bold text-gray-900">New Page</h1>
      </div>
      
      {/* Content */}
      <div className="p-8">
        {/* Your content here */}
      </div>
    </div>
  );
}
```

2. **Create a wrapper with AdminLayout:**
```tsx
// client/src/pages/admin/NewPageWrapper.tsx
import AdminLayout from "@/components/AdminLayout";
import NewPage from "./NewPage";

export default function NewPageWrapper() {
  return (
    <AdminLayout>
      <NewPage />
    </AdminLayout>
  );
}
```

3. **Add route to App.tsx:**
```tsx
import NewPageWrapper from "./pages/admin/NewPageWrapper";

// In Router function:
<Route path="/admin/newpage" component={NewPageWrapper} />
```

4. **Add to sidebar navigation:**
```tsx
// In AdminSidebar.tsx
const mainMenuItems = [
  // ...existing items
  { icon: YourIcon, label: "New Page", href: "/admin/newpage" },
];
```

## 🎨 Styling Guidelines

### Colors
```css
/* Primary Dark Green */
bg-[#2d4a3e]
hover:bg-[#234136]

/* Background */
bg-[#f5f5f5]  /* Page background */
bg-white      /* Card background */

/* Status Colors */
bg-emerald-100 text-emerald-700  /* Success/Active */
bg-yellow-100 text-yellow-700    /* Warning/Pending */
bg-red-100 text-red-700          /* Error/Cancelled */
bg-blue-100 text-blue-700        /* Info/Processing */
```

### Animations
```tsx
// Page entry
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ delay: 0.1 }}
>

// Hover effect
<motion.div
  whileHover={{ y: -4 }}
  className="transition-shadow hover:shadow-lg"
>

// Staggered list
{items.map((item, index) => (
  <motion.div
    key={item.id}
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.05 * index }}
  >
))}
```

## 📱 Responsive Design

All pages are fully responsive with breakpoints:
- **Mobile**: Single column, stacked layout
- **Tablet** (md): 2 columns for stats, adjusted spacing
- **Desktop** (lg): Full multi-column layouts, sidebar visible

### Sidebar Behavior
- Fixed position on desktop (280px width)
- Content offset by sidebar width (ml-[280px])
- Mobile: Consider adding collapse/hamburger menu

## 🚀 Next Steps

### Recommended Enhancements:
1. **Authentication**: Add login/logout functionality
2. **API Integration**: Connect to real backend endpoints
3. **Real-time Updates**: WebSocket for live data
4. **Export Functionality**: PDF/CSV export for reports
5. **Notifications**: Toast notifications for actions
6. **Dark Mode**: Toggle between light/dark themes
7. **Mobile Sidebar**: Collapsible sidebar for mobile devices
8. **Data Pagination**: For large datasets in tables
9. **Advanced Filters**: Date ranges, multi-select filters
10. **User Permissions**: Role-based access control

### Pages to Add:
- Customers page
- Analytics dashboard
- Settings page
- Email management
- Integration management
- Performance metrics
- Help center

## 🎯 Access the Dashboard

1. Start your development server:
```bash
npm run dev
```

2. Navigate to the admin routes:
- Dashboard: `http://localhost:5000/admin/dashboard`
- Messages: `http://localhost:5000/admin/messages`
- Products: `http://localhost:5000/admin/products`
- Orders: `http://localhost:5000/admin/orders`

## 💡 Tips for Customization

1. **Change Theme Colors**: Update the `bg-[#2d4a3e]` colors throughout
2. **Adjust Animations**: Modify Framer Motion `transition` props
3. **Custom Charts**: Configure Recharts with different chart types
4. **Add More Stats**: Duplicate stat card components with new data
5. **Modify Layout**: Adjust grid columns in `grid-cols-{n}` classes

---

**Built with ❤️ for KRAFTSTUDIO**

Matching the Vizora dashboard design with your company branding!
