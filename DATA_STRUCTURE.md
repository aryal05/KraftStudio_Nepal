# REVYLO Data Structure & Schema

## Database Tables

### Users Table
- `id` (int, primary key, auto-increment)
- `openId` (varchar, unique) - Manus OAuth identifier
- `name` (text)
- `email` (varchar)
- `loginMethod` (varchar)
- `role` (enum: 'user' | 'admin')
- `createdAt` (timestamp)
- `updatedAt` (timestamp)
- `lastSignedIn` (timestamp)

### Products Table
- `id` (int, primary key, auto-increment)
- `name` (varchar) - Product name
- `slug` (varchar, unique) - URL-friendly identifier
- `description` (text) - Long product description
- `shortDescription` (text) - Short description for listings
- `category` (enum: 'furniture' | 'lighting' | 'decor' | 'workspace')
- `price` (decimal) - Product price
- `originalPrice` (decimal, nullable) - Original price for discounts
- `imageUrl` (text) - Main product image URL
- `galleryImages` (json) - Array of gallery image URLs
- `inStock` (boolean)
- `stockQuantity` (int)
- `rating` (decimal) - Average rating (0-5)
- `reviewCount` (int)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Cart Items Table
- `id` (int, primary key, auto-increment)
- `userId` (int, foreign key) - References users.id
- `productId` (int, foreign key) - References products.id
- `quantity` (int)
- `addedAt` (timestamp)

### Bookings Table
- `id` (int, primary key, auto-increment)
- `userId` (int, foreign key, nullable) - References users.id
- `firstName` (varchar)
- `lastName` (varchar)
- `email` (varchar)
- `phone` (varchar)
- `bookingDate` (date) - Requested consultation date
- `bookingTime` (varchar) - Time slot (e.g., "10:00 AM", "2:00 PM")
- `message` (text) - Additional notes/requests
- `status` (enum: 'pending' | 'confirmed' | 'completed' | 'cancelled')
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

### Orders Table (Future)
- `id` (int, primary key, auto-increment)
- `userId` (int, foreign key) - References users.id
- `orderNumber` (varchar, unique)
- `totalAmount` (decimal)
- `status` (enum: 'pending' | 'processing' | 'shipped' | 'delivered')
- `shippingAddress` (text)
- `createdAt` (timestamp)
- `updatedAt` (timestamp)

## Product Categories

1. **Furniture** - Sofas, chairs, tables, storage, beds
2. **Lighting** - Pendant lights, floor lamps, chandeliers, wall sconces
3. **Decor** - Accessories, artwork, plants, textiles, rugs
4. **Workspace** - Desks, office chairs, shelving, organization

## Sample Product Data Structure

```json
{
  "id": 1,
  "name": "Modern Leather Sofa",
  "slug": "modern-leather-sofa",
  "description": "Premium leather sofa with contemporary design...",
  "category": "furniture",
  "price": 1299.99,
  "imageUrl": "/manus-storage/sofa-main.jpg",
  "galleryImages": [
    "/manus-storage/sofa-1.jpg",
    "/manus-storage/sofa-2.jpg",
    "/manus-storage/sofa-3.jpg"
  ],
  "inStock": true,
  "stockQuantity": 5,
  "rating": 4.8,
  "reviewCount": 24
}
```

## API Procedures (tRPC)

### Products
- `products.getAll(category?, page?, limit?)` - Get all products with filtering
- `products.getBySlug(slug)` - Get single product by slug
- `products.getFeatured()` - Get featured products
- `products.getNewArrivals()` - Get new arrivals
- `products.search(query)` - Search products

### Cart
- `cart.getItems()` - Get current user's cart items (protected)
- `cart.addItem(productId, quantity)` - Add item to cart (protected)
- `cart.removeItem(cartItemId)` - Remove item from cart (protected)
- `cart.updateQuantity(cartItemId, quantity)` - Update item quantity (protected)
- `cart.clear()` - Clear entire cart (protected)

### Bookings
- `bookings.create(data)` - Create new booking request (public)
- `bookings.getMyBookings()` - Get user's bookings (protected)
- `bookings.getAll()` - Get all bookings (admin only)

## Color Palette (Dark & Warm Aesthetic)

- **Primary Dark**: #1a1410 (Deep charcoal-brown)
- **Secondary Dark**: #2d2620 (Warm dark gray)
- **Accent Warm**: #c9a961 (Warm gold)
- **Accent Warm Alt**: #b8956a (Muted gold)
- **Light Neutral**: #f5f1ed (Off-white)
- **Text Primary**: #1a1410 (On light backgrounds)
- **Text Secondary**: #f5f1ed (On dark backgrounds)
- **Border**: #e8e4df (Light border)

## Typography

- **Headlines**: Playfair Display (serif) - Editorial, luxury feel
- **Body**: Inter (sans-serif) - Clean, modern readability
- **Accent**: Montserrat (sans-serif) - Navigation, labels

## Image Specifications

- **Hero Image**: 1920x1080px (or 16:9 aspect ratio)
- **Product Main**: 600x600px (square)
- **Product Gallery**: 600x600px (square)
- **Category Banner**: 1200x400px (3:1 ratio)
- **Blog Featured**: 1200x600px (2:1 ratio)
- **Testimonial Avatar**: 80x80px (square)
