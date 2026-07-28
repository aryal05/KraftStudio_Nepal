/**
 * Database Viewer Script
 * 
 * Run this to see what's in your database:
 * node view-database.js
 */

const { neon } = require('@neondatabase/serverless');

// Get database URL from environment
require('dotenv').config({ path: '../.env' });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found in environment variables');
  process.exit(1);
}

async function viewDatabase() {
  try {
    console.log('🔍 Connecting to database...\n');
    const sql = neon(DATABASE_URL);

    // Get users
    console.log('👤 USERS:');
    console.log('─'.repeat(80));
    const users = await sql`SELECT id, email, name, role, "createdAt" FROM users ORDER BY id`;
    if (users.length === 0) {
      console.log('  No users found. Run create-admin.js first.');
    } else {
      users.forEach(u => {
        console.log(`  ID: ${u.id} | Email: ${u.email} | Name: ${u.name || 'N/A'} | Role: ${u.role}`);
      });
    }
    console.log();

    // Get categories
    console.log('📁 CATEGORIES:');
    console.log('─'.repeat(80));
    const categories = await sql`SELECT id, name, slug, "isActive", "displayOrder" FROM categories ORDER BY "displayOrder", id`;
    if (categories.length === 0) {
      console.log('  No categories found. Create some in the admin panel.');
    } else {
      categories.forEach(c => {
        const status = c.isActive ? '✅ Active' : '❌ Hidden';
        console.log(`  ID: ${c.id} | ${c.name} (/${c.slug}) | Order: ${c.displayOrder} | ${status}`);
      });
    }
    console.log();

    // Get products
    console.log('📦 PRODUCTS:');
    console.log('─'.repeat(80));
    const products = await sql`SELECT id, name, slug, "categoryId", price, "inStock" FROM products ORDER BY id`;
    if (products.length === 0) {
      console.log('  No products found. Products can be added via admin panel.');
    } else {
      products.forEach(p => {
        const price = (p.price / 100).toFixed(2);
        const stock = p.inStock ? '✅ In Stock' : '❌ Out of Stock';
        console.log(`  ID: ${p.id} | ${p.name} | $${price} | Category ID: ${p.categoryId} | ${stock}`);
      });
    }
    console.log();

    // Get messages
    console.log('💬 MESSAGES:');
    console.log('─'.repeat(80));
    const messages = await sql`SELECT id, name, email, status, "createdAt" FROM messages ORDER BY "createdAt" DESC LIMIT 10`;
    if (messages.length === 0) {
      console.log('  No messages found. Test the contact form on the website.');
    } else {
      messages.forEach(m => {
        const status = m.status === 'unread' ? '🔵 Unread' : '✅ Read';
        const date = new Date(m.createdAt).toLocaleString();
        console.log(`  ID: ${m.id} | ${m.name} (${m.email}) | ${status} | ${date}`);
      });
    }
    console.log();

    // Get cart items
    console.log('🛒 CART ITEMS:');
    console.log('─'.repeat(80));
    const cartItems = await sql`SELECT id, "userId", "productId", quantity, "selectedColor" FROM "cartItems" ORDER BY id`;
    if (cartItems.length === 0) {
      console.log('  No cart items found.');
    } else {
      cartItems.forEach(c => {
        console.log(`  ID: ${c.id} | User ID: ${c.userId} | Product ID: ${c.productId} | Qty: ${c.quantity} | Color: ${c.selectedColor || 'N/A'}`);
      });
    }
    console.log();

    // Get bookings
    console.log('📅 BOOKINGS:');
    console.log('─'.repeat(80));
    const bookings = await sql`SELECT id, "firstName", "lastName", email, "bookingDate", status FROM bookings ORDER BY "createdAt" DESC LIMIT 10`;
    if (bookings.length === 0) {
      console.log('  No bookings found.');
    } else {
      bookings.forEach(b => {
        console.log(`  ID: ${b.id} | ${b.firstName} ${b.lastName} | ${b.bookingDate} | Status: ${b.status}`);
      });
    }
    console.log();

    // Summary
    console.log('📊 SUMMARY:');
    console.log('─'.repeat(80));
    console.log(`  Users: ${users.length}`);
    console.log(`  Categories: ${categories.length} (${categories.filter(c => c.isActive).length} active)`);
    console.log(`  Products: ${products.length}`);
    console.log(`  Messages: ${messages.length} (${messages.filter(m => m.status === 'unread').length} unread)`);
    console.log(`  Cart Items: ${cartItems.length}`);
    console.log(`  Bookings: ${bookings.length}`);
    console.log();

  } catch (error) {
    console.error('❌ Error viewing database:', error.message);
    process.exit(1);
  }
}

viewDatabase();
