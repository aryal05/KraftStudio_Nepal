# 🎨 Add Category Modal - Visual Reference

## Complete Modal Layout

```
╔════════════════════════════════════════════════════════════════╗
║  Add New Category                                              ║
║  Create a new category to organize your products effectively   ║
╠════════════════════════════════════════════════════════════════╣
║                                                                ║
║  Category Name *              URL Slug *                       ║
║  ┌────────────────────┐      ┌────────────────────┐          ║
║  │ Living Room...     │      │ living-room-fur... │          ║
║  └────────────────────┘      └────────────────────┘          ║
║                               Used in URL, must be unique      ║
║                                                                ║
║  Description                                                   ║
║  ┌──────────────────────────────────────────────────┐        ║
║  │ Write a brief description of this category...    │        ║
║  │                                                   │        ║
║  │                                                   │        ║
║  └──────────────────────────────────────────────────┘        ║
║  Optional: Describe the types of products                     ║
║                                                                ║
║  Category Image URL                                           ║
║  ┌──────────────────────────────────────────────────┐        ║
║  │ https://example.com/images/...                   │        ║
║  └──────────────────────────────────────────────────┘        ║
║  Recommended size: 800x600px or larger                        ║
║                                                                ║
║  Preview:                                                     ║
║  ┌──────────────────────────────────────────────────┐        ║
║  │                                                   │        ║
║  │            [Image Preview]                        │        ║
║  │                                                   │        ║
║  └──────────────────────────────────────────────────┘        ║
║                                                                ║
║  Display Order                Category Status                 ║
║  ┌────────────────────┐      ┌────────────────────┐          ║
║  │ 0                  │      │ ⚪─⚫ Active & Visible│         ║
║  └────────────────────┘      └────────────────────┘          ║
║  Lower numbers first          Toggle to show/hide            ║
║                                                                ║
╠════════════════════════════════════════════════════════════════╣
║                                    [ Cancel ] [ Create Category ]║
╚════════════════════════════════════════════════════════════════╝
```

## Color Samples

```
┌─────────────────────────────────────────────────────┐
│ CATEGORY MODAL COLOR PALETTE                        │
├─────────────────────────────────────────────────────┤
│                                                     │
│ Primary Accent (Focus & Buttons)                   │
│ ████████ #4F46E5 Indigo-600                        │
│ ████████ #4338CA Indigo-700 (Hover)                │
│ ████████ #E0E7FF Indigo-100 (Focus Ring)           │
│                                                     │
│ Text Colors                                        │
│ ████████ #1E293B Slate-800 (Headings)             │
│ ████████ #334155 Slate-700 (Labels)               │
│ ████████ #64748B Slate-500 (Helper text)          │
│ ████████ #EF4444 Red-500 (Required)               │
│                                                     │
│ Borders & Backgrounds                              │
│ ████████ #D1D5DB Gray-300 (Borders)               │
│ ████████ #E5E7EB Gray-200 (Dividers)              │
│ ████████ #F9FAFB Gray-50 (Footer BG)              │
│ ████████ #FFFFFF White (Modal BG)                  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

## Input Field States

### Default State
```
┌────────────────────────────────────┐
│ Living Room Furniture              │  Border: #D1D5DB (gray-300)
└────────────────────────────────────┘  Background: white
```

### Focus State
```
┌════════════════════════════════════┐
║ Living Room Furniture              ║  Border: #4F46E5 (indigo-600)
╚════════════════════════════════════╝  Ring: 2px #E0E7FF (indigo-100)
     ^^^^ Focus ring visible ^^^^
```

### With Helper Text
```
┌────────────────────────────────────┐
│ living-room-furniture              │
└────────────────────────────────────┘
  Used in the URL, must be unique
  ^^^ 12px gray-500 helper text
```

## Button Styles

### Primary Button (Default)
```
┌─────────────────────┐
│  Create Category    │  BG: #4F46E5 (indigo-600)
└─────────────────────┘  Text: White, bold
                         Shadow: subtle
```

### Primary Button (Hover)
```
┌═════════════════════┐
│  Create Category    │  BG: #4338CA (indigo-700)
└═════════════════════┘  Text: White, bold
    ^^^^^^^^^^^^           Shadow: medium
```

### Primary Button (Loading)
```
┌─────────────────────┐
│  ⟳ Creating...      │  BG: #4F46E5 (indigo-600)
└─────────────────────┘  Disabled, spinner visible
```

### Secondary Button (Default)
```
┌─────────────────────┐
│     Cancel          │  Border: 2px #D1D5DB
└─────────────────────┘  Text: #374151 (gray-700)
                         BG: transparent
```

### Secondary Button (Hover)
```
┌─────────────────────┐
│     Cancel          │  Border: 2px #D1D5DB
└─────────────────────┘  Text: #374151
                         BG: #F3F4F6 (gray-100)
```

## Toggle Switch States

### Off (Hidden)
```
Category Status
┌──────────────────────┐
│  ⚫─────⚪  Hidden    │  BG: Gray
└──────────────────────┘  Circle: Left
```

### On (Active)
```
Category Status
┌──────────────────────┐
│  ⚪─────⚫  Active    │  BG: #4F46E5 (indigo)
└──────────────────────┘  Circle: Right
```

## Spacing System

```
Modal Layout:
├─ Header
│  ├─ Padding: 32px (h), 24px (top), 20px (bottom)
│  └─ Bottom border: 1px gray-200
│
├─ Body (Scrollable)
│  ├─ Padding: 32px (h), 24px (v)
│  ├─ Field groups: 24px gap
│  ├─ Label to input: 8px
│  └─ Helper text: 6px below input
│
└─ Footer (Fixed)
   ├─ Padding: 32px (h), 16px (v)
   ├─ Top border: 1px gray-200
   └─ Button gap: 12px
```

## Typography Scale

```
Modal Title:      24px / Bold / Cormorant Garamond
Subtitle:         14px / Normal / Inter, gray-500
Labels:           14px / Medium / Inter, slate-700
Input text:       16px / Normal / Inter, slate-900
Helper text:      12px / Normal / Inter, slate-500
Button text:      16px / Semibold / Inter
Required mark:    14px / Bold / Red-500
```

## Field Dimensions

```
Input Height:     44px (h-11)
Textarea Rows:    4 rows (~96px)
Input Padding:    16px horizontal, 12px vertical
Border Radius:    8px (rounded-lg)
Border Width:     1px (2px for focus ring)

Image Preview:
Width:            100% of container
Height:           192px (h-48)
Border:           2px gray-200
Radius:           8px
```

## Grid Layout

### Two-Column Fields
```
┌────────────────────────┬────────────────────────┐
│                        │                        │
│  Category Name *       │  URL Slug *            │
│  [Input 50%]          │  [Input 50%]          │
│                        │                        │
└────────────────────────┴────────────────────────┘
     ^^^^^^^^^^ gap-4 (16px) ^^^^^^^^^^
```

### Full-Width Fields
```
┌──────────────────────────────────────────────────┐
│  Description                                     │
│  [Textarea 100%]                                 │
└──────────────────────────────────────────────────┘
```

## Component Hierarchy

```
Dialog
└─ DialogContent (max-w-2xl, white, p-0)
   ├─ Header Section (px-8, pt-6, pb-5)
   │  ├─ DialogTitle (serif, 2xl, bold)
   │  └─ DialogDescription (sm, gray-500)
   │
   ├─ Form (flex column, height calc)
   │  ├─ Body (flex-1, overflow-y-auto, px-8, py-6)
   │  │  └─ Fields Container (space-y-6)
   │  │     ├─ Name + Slug (grid-cols-2, gap-4)
   │  │     ├─ Description (full width)
   │  │     ├─ Image URL (full width)
   │  │     │  └─ Preview (conditional)
   │  │     └─ Order + Status (grid-cols-2, gap-4)
   │  │
   │  └─ Footer (px-8, py-4, gray-50)
   │     └─ Buttons (flex, justify-end, gap-3)
   │        ├─ Cancel (outline)
   │        └─ Submit (primary)
```

## Accessibility Indicators

```
✅ Required Fields:
   Category Name *  ← Red asterisk
   URL Slug *       ← Red asterisk

✅ Focus Visible:
   [Input with blue ring around it]

✅ Helper Text:
   Used in the URL, must be unique
   ^^^ Provides context for field

✅ Loading State:
   [ ⟳ Creating... ]  ← Disabled + spinner

✅ Labels Associated:
   <label htmlFor="name">
   <Input id="name">  ← Proper association
```

## Responsive Breakpoints

### Desktop (>768px)
- Modal width: 640px
- Two-column layout active
- All spacing maintained

### Mobile (<768px)
- Modal width: 90vw
- Single column layout
- Slightly reduced padding
- Touch-friendly button sizes

---

**This visual reference shows exactly how the modal should appear!**
