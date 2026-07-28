# 📱 Admin Messages Page - Visual Reference

## Complete Layout Breakdown

```
╔════════════════════════════════════════════════════════════════════════════╗
║                           ADMIN MESSAGES PAGE                               ║
╠═══════════════════════════╦═══════════════════════════════════════════════╣
║  LEFT SIDEBAR (380px)     ║       RIGHT DETAIL VIEW (flex-1)              ║
║                           ║                                                ║
║ ┌───────────────────────┐ ║  ┌──────────────────────────────────────┐    ║
║ │  Messages         🔄  │ ║  │  Welcome to Auth            ⭐ 📦 🗑️ │    ║
║ │  2 unread messages    │ ║  │  July 16, 2026 · 11:28 PM           │    ║
║ └───────────────────────┘ ║  └──────────────────────────────────────┘    ║
║                           ║                                                ║
║ ┌─┬─────┬──────┬────────┐ ║  ┌──────────────────────────────────────┐    ║
║ │6│  2  │  1   │   2    │ ║  │  👤  testing123                      │    ║
║ │ │Unrd │Urgent│Starred │ ║  │      📧 aryal.rajat05@gmail.com     │    ║
║ └─┴─────┴──────┴────────┘ ║  │      📱 21323323232                  │    ║
║                           ║  └──────────────────────────────────────┘    ║
║ ┌───────────────────────┐ ║                                                ║
║ │ ☐ 🔍 Search messages  │ ║  test message content here...                 ║
║ └───────────────────────┘ ║                                                ║
║                           ║  ┌──────────────┬──────────────────────┐      ║
║ [All][Unread][Star][Urg] ║  │ Customer     │  Received            │      ║
║ [Replied]                 ║  │ Details      │  July 16, 2026       │      ║
║ ━━━━━━━━▓▓░░░░░░ ‹ ›    ║  │              │  11:28 PM            │      ║
║                           ║  └──────────────┴──────────────────────┘      ║
║ ┌───────────────────────┐ ║                                                ║
║ │☐ (T) testing123    ⭐│ ║  [📧 Reply] [Mark as Replied]                 ║
║ │   Welcome to Auth     │ ║                                                ║
║ │   test              │ ║                                                ║
║ │   Jul 16, 11:28 PM  │ ║                                                ║
║ │   [New]              │ ║                                                ║
║ ├───────────────────────┤ ║                                                ║
║ │☐ (RA) Rajat Aryal  ⭐│ ║                                                ║
║ │   test                │ ║                                                ║
║ │   test                │ ║                                                ║
║ │   Jul 1, 12:33 PM    │ ║                                                ║
║ │   [New]              │ ║                                                ║
║ ├───────────────────────┤ ║                                                ║
║ │☐ (AC) Amanda Col... ⭐│ ║                                                ║
║ │   Partnership Inquiry │ ║                                                ║
║ │   Hi I'm a premi...  │ ║                                                ║
║ │   Jul 12              │ ║                                                ║
║ └───────────────────────┘ ║                                                ║
║          ...              ║                                                ║
╚═══════════════════════════╩═══════════════════════════════════════════════╝
```

## Color Palette Visual

```
┌─────────────────────────────────────────────────────────────┐
│  KRAFTSTUDIO MESSAGES COLOR SCHEME                          │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  Primary Brand (Buttons, Active States)                    │
│  ████████  #8b6f47  Warm Tan                               │
│                                                             │
│  Stat Bar Colors                                           │
│  ████████  #7a9b8e  Teal (Total Messages)                  │
│  ████████  #c9a56a  Golden Tan (Unread)                    │
│  ████████  #d97171  Red (Urgent)                           │
│  ████████  #e8b84d  Gold (Starred)                         │
│                                                             │
│  Info Card Colors                                          │
│  ████████  #6b9bd6  Blue (Customer Details)                │
│  ████████  #e8b84d  Gold (Received Time)                   │
│                                                             │
│  Avatar Colors (Rotating)                                  │
│  ████████  #8b6f47  Warm Tan                               │
│  ████████  #6b8e7e  Sage Green                             │
│  ████████  #9b7e5e  Brown                                  │
│  ████████  #7a9b8e  Teal                                   │
│  ████████  #a68a64  Golden Tan                             │
│  ████████  #5a7d6f  Forest Green                           │
│                                                             │
│  Badge Colors                                              │
│  ████████  #6b9bd6  Blue (New Badge)                       │
│  ████████  #d97171  Red (Urgent Badge)                     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

## Stat Cards Detail

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  ▂▂▂▂▂▂▂▂  │  ▂▂▂▂▂▂▂▂  │  ▂▂▂▂▂▂▂▂  │  ▂▂▂▂▂▂▂▂  │
│   (teal)     │   (gold)     │   (red)      │  (yellow)    │
│      6       │      2       │      1       │      2       │
│  Total Msg   │   Unread     │   Urgent     │   Starred    │
└──────────────┴──────────────┴──────────────┴──────────────┘
     Hover effect: bg-gray-50 transition
```

## Filter Buttons

```
Active State (Brand Color):          Inactive State (Gray):
┌──────────────┐                     ┌──────────────┐
│   All        │  #8b6f47           │   Unread     │  Gray-100
└──────────────┘  White text         └──────────────┘  Gray-600
    Rounded-full                          Rounded-full
    Shadow-sm                             No shadow
```

## Message Card States

```
UNREAD MESSAGE (Bold text):
┌─────────────────────────────────────┐
│ ☐  (AB)  Alice Brown           ⭐ │
│          Urgent: Need Help        │  ← Font Weight: 600
│          Please contact me...     │
│          Jul 16, 11:28 PM  [New] │
└─────────────────────────────────────┘
    Background: white
    Border-left: transparent

READ MESSAGE (Normal text):
┌─────────────────────────────────────┐
│ ☐  (JD)  John Doe              ⭐ │
│          Question about product   │  ← Font Weight: 400
│          I would like to know...  │
│          Jul 15, 3:45 PM          │
└─────────────────────────────────────┘
    Background: white
    Border-left: transparent

SELECTED MESSAGE (Highlighted):
┌─────────────────────────────────────┐
│ ☐  (MJ)  Mary Jane            ⭐  │
│          Partnership inquiry       │
│          Hi, I'm interested...     │
│          Jul 14, 9:20 AM           │
└─────────────────────────────────────┘
    Background: #8b6f47/5 (5% opacity)
    Border-left: 4px solid #8b6f47
```

## Info Card Gradients

```
CUSTOMER DETAILS CARD:
┌────────────────────────────────────┐
│  ┌──┐  Customer Details           │  Gradient:
│  │👤│                              │  from-[#f0f5f9]
│  └──┐                              │  to-[#e3eef7]
│      John Doe                      │  Border: #d4e4f1
│      john@example.com              │
│      (555) 123-4567                │
└────────────────────────────────────┘

RECEIVED TIME CARD:
┌────────────────────────────────────┐
│  ┌──┐  Received                    │  Gradient:
│  │🕐│                              │  from-[#fff4ed]
│  └──┐                              │  to-[#ffe8d9]
│      July 16, 2026                 │  Border: #f5d8c4
│      11:28 PM                      │
└────────────────────────────────────┘
```

## Typography Hierarchy

```
PAGE TITLE
┌─────────────────────────────────────┐
│  Messages                            │  Font: Cormorant Garamond
│  2xl · Bold · Gray-800               │  Size: 24px
└─────────────────────────────────────┘

MESSAGE SUBJECT (Detail View)
┌─────────────────────────────────────┐
│  Welcome to Auth                     │  Font: Cormorant Garamond
│  3xl · Bold · Gray-900               │  Size: 30px
└─────────────────────────────────────┘

BODY TEXT
┌─────────────────────────────────────┐
│  Message content goes here...        │  Font: Space Grotesk
│  base · Regular · Gray-700           │  Size: 16px
└─────────────────────────────────────┘

UI ELEMENTS
┌─────────────────────────────────────┐
│  All  Unread  Starred               │  Font: Inter
│  xs · Medium · Various               │  Size: 12px
└─────────────────────────────────────┘

TIMESTAMPS
┌─────────────────────────────────────┐
│  Jul 16, 11:28 PM                    │  Font: Inter
│  xs · Regular · Gray-400             │  Size: 12px
└─────────────────────────────────────┘
```

## Animation Specifications

```
MESSAGE SELECTION
Duration: 300ms
Easing: ease-out
Effect: opacity 0 → 1, x: 20 → 0

MESSAGE LIST ITEMS
Duration: 200ms
Delay: Staggered (index * 30ms)
Effect: opacity 0 → 1, y: 10 → 0

HOVER EFFECTS
Duration: 150ms
Effect: translateY(-2px) on cards
        bg color transition on buttons

STAR ICON
Duration: 200ms
Effect: Scale 1 → 1.2 → 1 on toggle
        Fill color transition
```

## Spacing System

```
SIDEBAR
├─ Width: 380px
├─ Padding: 24px (p-6)
└─ Border: 1px solid gray-200

STAT CARDS
├─ Padding: 16px (p-4)
├─ Gap: 0 (no gap)
└─ Border-right: 1px solid gray-100

SEARCH BAR
├─ Height: 36px (h-9)
├─ Padding: 12px horizontal
└─ Icon left: 12px

FILTER BUTTONS
├─ Padding: 6px 16px (py-1.5 px-4)
├─ Gap: 8px (gap-2)
└─ Border radius: 9999px (full)

MESSAGE CARD
├─ Padding: 12px 16px (py-3 px-4)
├─ Gap: 12px (gap-3)
└─ Border-bottom: 1px solid gray-100

DETAIL VIEW
├─ Padding: 32px (p-8)
├─ Section gap: 24px (mb-6)
└─ Card padding: 20px (p-5)
```

## Responsive Breakpoints (Future)

```
Desktop (Current)
├─ Sidebar: 380px fixed
└─ Detail: flex-1

Tablet (1024px)
├─ Sidebar: 320px fixed
└─ Detail: flex-1

Mobile (768px)
├─ Sidebar: Full width
└─ Detail: Modal/slide-over
```

## Icon Usage

```
📧 Mail         - Email addresses, reply buttons
📱 Phone        - Phone numbers
👤 User         - Customer details card
🕐 Clock        - Received time card
⭐ Star         - Favorite/starred messages
🗑️ Trash        - Delete action
📦 Archive      - Archive action
🔍 Search       - Search input
🔄 Refresh      - Reload messages
‹ › Chevrons    - Pagination navigation
```

## Component Props (TypeScript)

```typescript
// Message Card Props
interface MessageCardProps {
  id: number;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  status: 'unread' | 'read' | 'replied' | 'archived';
  isStarred: boolean;
  priority: 'normal' | 'urgent';
  createdAt: Date;
  isSelected: boolean;
  onSelect: (id: number) => void;
  onToggleStar: (id: number, current: boolean) => void;
}

// Filter Types
type FilterType = 'all' | 'unread' | 'starred' | 'urgent' | 'replied';

// Stat Card Data
interface StatCard {
  label: string;
  count: number;
  color: string; // Tailwind color class
}
```

---

**This document provides exact visual specifications for implementing or modifying the Messages page design.**
