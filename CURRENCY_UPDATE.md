# Currency Update - USD to NPR

## ✅ Completed

All prices throughout the application have been updated from USD ($) to NPR (Nepali Rupees).

## 📝 Changes Made

### 1. Created Currency Formatter Utility
**File**: `revylo-nextjs/src/lib/utils.ts`

Added `formatNPR()` function:
```typescript
formatNPR(amount: number, options?: {
  showDecimals?: boolean;
  shortForm?: boolean;
})
```

**Usage**:
- `formatNPR(1299)` → "NPR 1,299"
- `formatNPR(1299, { shortForm: true })` → "Rs. 1,299"
- `formatNPR(1299.50, { showDecimals: true })` → "NPR 1,299.50"

### 2. Updated Components

#### Frontend Pages (Customer-Facing)
- ✅ **Workspace.tsx** - Product cards and price filters
- ✅ **ProductListing.tsx** - All catalog pages (Furniture, Lighting, Decor)
- ✅ **Cart.tsx** - Cart items and totals
- ✅ **ProductDetail.tsx** - Already had NPR formatting

#### Admin Dashboard
- ✅ **Dashboard.tsx** - Sales charts, product table, revenue displays
  - Chart Y-axis: "Rs.20k" format
  - Revenue: "Rs. 53,500"
  - Product prices in table

### 3. Price Display Examples

**Before**:
```
$1,299
$1,599
Price: Low to High
```

**After**:
```
NPR 1,299
NPR 1,599
Price: Low to High
```

### 4. Files Modified

1. `src/lib/utils.ts` - Added formatNPR() function
2. `src/components/pages/Workspace.tsx` - Updated all price displays
3. `src/components/pages/ProductListing.tsx` - Updated all price displays
4. `src/components/pages/Cart.tsx` - Updated cart prices
5. `src/components/pages/Dashboard.tsx` - Updated admin dashboard

## 🎯 Verification Checklist

Test these pages to verify currency display:

### Customer Pages
- [ ] Homepage
- [ ] Furniture catalog (`/furniture`)
- [ ] Lighting catalog (`/lighting`)
- [ ] Decor catalog (`/decor`)
- [ ] Workspace page (`/workspace`)
- [ ] Product detail pages
- [ ] Shopping cart (`/cart`)

### Admin Pages
- [ ] Dashboard (`/admin`)
- [ ] Products page
- [ ] Orders page
- [ ] Analytics charts

## 📊 Currency Conversion Notes

If you need to convert existing USD prices to NPR:
- Typical conversion rate: 1 USD ≈ 130-135 NPR
- Example: $1,299 USD × 130 = NPR 168,870

Current mock data uses reasonable NPR values:
- Sofas: NPR 129,900 - 159,900
- Chairs: NPR 44,900 - 109,900
- Lamps: NPR 18,900 - 89,900
- Tables: NPR 44,900 - 84,900

## 🚀 Next Steps

If you're using real database data:
1. Update database to store prices in NPR (as integers, e.g., 129900 for NPR 1,299)
2. All formatNPR() calls will automatically display correctly
3. No need to change frontend code again

## 💡 Usage Tips

### In New Components
```typescript
import { formatNPR } from "@/lib/utils";

// In your JSX
<span>{formatNPR(product.price)}</span>

// With options
<span>{formatNPR(product.price, { shortForm: true })}</span>
```

### For Price Ranges
```typescript
<span>{formatNPR(minPrice)} - {formatNPR(maxPrice)}</span>
```

### For Charts (Short Form)
```typescript
tickFormatter={(value) => formatNPR(value, { shortForm: true })}
```

---

**Status**: ✅ Complete
**All Prices**: Now displayed in NPR
**Formatter**: Available globally via `@/lib/utils`
