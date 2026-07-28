/**
 * Database Seeding Script
 * Adds categories and products with images
 * 
 * Run: node seed-database.js
 */

const { neon } = require('@neondatabase/serverless');
require('dotenv').config({ path: '../.env' });

const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('❌ DATABASE_URL not found');
  process.exit(1);
}

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...\n');
    const sql = neon(DATABASE_URL);

    // ===== CATEGORIES =====
    console.log('📁 Creating categories...');
    
    const categoryInserts = [
      ['Chairs', 'chairs', 'Comfortable seating for every room', 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800', 1],
      ['Sofas', 'sofas', 'Luxurious sofas and sectionals', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 2],
      ['Tables', 'tables', 'Dining coffee and side tables', 'https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800', 3],
      ['Office', 'office', 'Ergonomic desks and chairs', 'https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800', 4],
      ['Dining', 'dining', 'Complete dining sets', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800', 5],
      ['Bedroom', 'bedroom', 'Beds and bedroom furniture', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800', 6],
      ['Storage', 'storage', 'Bookcases and cabinets', 'https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800', 7],
      ['Lighting', 'lighting', 'Pendant lights and lamps', 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800', 8],
      ['Decor', 'decor', 'Mirrors and decorative accents', 'https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800', 9],
      ['Outdoor', 'outdoor', 'Patio furniture', 'https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800', 10],
    ];

    for (const [name, slug, desc, img, order] of categoryInserts) {
      await sql`
        INSERT INTO categories (name, slug, description, "imageUrl", "displayOrder", "isActive", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${img}, ${order}, true, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET 
          name = ${name},
          description = ${desc},
          "imageUrl" = ${img},
          "displayOrder" = ${order},
          "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    // Get category IDs
    const cats = await sql`SELECT id, slug FROM categories`;
    const catMap = {};
    cats.forEach(c => catMap[c.slug] = c.id);

    // ===== PRODUCTS =====
    console.log('\n🛋️  Adding products...\n');

    // CHAIRS PRODUCTS
    console.log('Adding Chairs products...');
    const chairProducts = [
      ['Modern Accent Chair', 'modern-accent-chair', 'Contemporary accent chair with plush cushioning', 'Comfortable modern accent chair', 34900, 44900, 15, 450, 28, '[{"name":"Gray","hex":"#808080","images":["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800"]}]', 'Gray'],
      ['Velvet Dining Chair', 'velvet-dining-chair', 'Elegant velvet chair with gold legs', 'Luxurious velvet dining chair', 27900, 35900, 24, 480, 42, '[{"name":"Navy","hex":"#000080","images":["https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800"]}]', 'Navy'],
      ['Ergonomic Office Chair', 'ergonomic-office-chair', 'High-back ergonomic chair', 'Professional office chair', 42900, 54900, 18, 470, 56, '[{"name":"Black","hex":"#000000","images":["https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800"]}]', 'Black'],
      ['Scandinavian Lounge Chair', 'scandinavian-lounge-chair', 'Mid-century modern lounge chair', 'Classic Scandinavian design', 39900, null, 12, 460, 34, '[{"name":"Oak","hex":"#DEB887","images":["https://images.unsplash.com/photo-1503602642458-232111445657?w=800"]}]', 'Oak'],
      ['Rocking Chair', 'rocking-chair', 'Classic wooden rocking chair', 'Traditional rocking chair', 32900, null, 10, 440, 19, '[{"name":"Walnut","hex":"#5C4033","images":["https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800"]}]', 'Walnut'],
    ];

    for (const [name, slug, desc, short, price, orig, stock, rating, reviews, colors, defColor] of chairProducts) {
      await sql`
        INSERT INTO products (name, slug, description, "shortDescription", "categoryId", price, "originalPrice", "inStock", "stockQuantity", rating, "reviewCount", colors, "defaultColor", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${short}, ${catMap.chairs}, ${price}, ${orig}, true, ${stock}, ${rating}, ${reviews}, ${colors}::jsonb, ${defColor}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET
          name = ${name},
          description = ${desc},
          price = ${price},
          "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    // SOFAS PRODUCTS
    console.log('Adding Sofas products...');
    const sofaProducts = [
      ['Modern Sectional Sofa', 'modern-sectional-sofa', 'Spacious L-shaped sectional with deep seating', 'Large sectional with chaise', 129900, 159900, 8, 490, 67, '[{"name":"Gray","hex":"#808080","images":["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"]}]', 'Gray'],
      ['Velvet Chesterfield Sofa', 'velvet-chesterfield-sofa', 'Classic tufted Chesterfield sofa', 'Elegant tufted sofa', 149900, 189900, 6, 485, 45, '[{"name":"Navy","hex":"#000080","images":["https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800"]}]', 'Navy'],
      ['Mid-Century Modern Sofa', 'mid-century-modern-sofa', 'Clean lines and tapered wooden legs', 'Retro style sofa', 119900, null, 10, 475, 52, '[{"name":"Tan","hex":"#D2B48C","images":["https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800"]}]', 'Tan'],
      ['Sleeper Sofa', 'sleeper-sofa', 'Convertible sofa bed for guests', 'Sofa with pull-out bed', 139900, 169900, 7, 465, 38, '[{"name":"Charcoal","hex":"#36454F","images":["https://images.unsplash.com/photo-1550581190-9c1c48d21d6c?w=800"]}]', 'Charcoal'],
    ];

    for (const [name, slug, desc, short, price, orig, stock, rating, reviews, colors, defColor] of sofaProducts) {
      await sql`
        INSERT INTO products (name, slug, description, "shortDescription", "categoryId", price, "originalPrice", "inStock", "stockQuantity", rating, "reviewCount", colors, "defaultColor", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${short}, ${catMap.sofas}, ${price}, ${orig}, true, ${stock}, ${rating}, ${reviews}, ${colors}::jsonb, ${defColor}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET name = ${name}, price = ${price}, "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    // TABLES PRODUCTS
    console.log('Adding Tables products...');
    const tableProducts = [
      ['Round Dining Table', 'round-dining-table', 'Elegant round table for 4-6 people', 'Modern round dining table', 79900, 99900, 12, 470, 41, '[{"name":"Oak","hex":"#C19A6B","images":["https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800"]}]', 'Oak'],
      ['Coffee Table with Storage', 'coffee-table-storage', 'Contemporary coffee table with hidden storage', 'Functional coffee table', 54900, 69900, 15, 455, 33, '[{"name":"Walnut","hex":"#5C4033","images":["https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800"]}]', 'Walnut'],
      ['Console Table', 'console-table', 'Narrow console table for entryways', 'Sleek console table', 42900, null, 18, 460, 27, '[{"name":"White","hex":"#FFFFFF","images":["https://images.unsplash.com/photo-1557048322-d2d2c8e8e5c8?w=800"]}]', 'White'],
      ['Extendable Dining Table', 'extendable-dining-table', 'Expandable table for large gatherings', 'Versatile dining table', 109900, 139900, 9, 480, 56, '[{"name":"Cherry","hex":"#D2691E","images":["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800"]}]', 'Cherry'],
      ['Side Table Set', 'side-table-set', 'Nesting side tables set of 2', 'Space-saving side tables', 34900, null, 20, 450, 22, '[{"name":"Gold","hex":"#FFD700","images":["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"]}]', 'Gold'],
    ];

    for (const [name, slug, desc, short, price, orig, stock, rating, reviews, colors, defColor] of tableProducts) {
      await sql`
        INSERT INTO products (name, slug, description, "shortDescription", "categoryId", price, "originalPrice", "inStock", "stockQuantity", rating, "reviewCount", colors, "defaultColor", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${short}, ${catMap.tables}, ${price}, ${orig}, true, ${stock}, ${rating}, ${reviews}, ${colors}::jsonb, ${defColor}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET name = ${name}, price = ${price}, "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    // OFFICE PRODUCTS
    console.log('Adding Office products...');
    const officeProducts = [
      ['Executive Desk', 'executive-desk', 'Large executive desk with drawers', 'Professional office desk', 89900, 119900, 11, 475, 48, '[{"name":"Espresso","hex":"#3C2F2F","images":["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"]}]', 'Espresso'],
      ['Standing Desk', 'standing-desk', 'Height-adjustable standing desk', 'Ergonomic standing desk', 74900, 94900, 14, 485, 62, '[{"name":"White","hex":"#FFFFFF","images":["https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800"]}]', 'White'],
      ['Bookshelf Unit', 'bookshelf-unit', '5-tier open bookshelf', 'Modern bookshelf', 39900, null, 16, 460, 34, '[{"name":"Black","hex":"#000000","images":["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800"]}]', 'Black'],
      ['Filing Cabinet', 'filing-cabinet', '3-drawer metal filing cabinet', 'Secure file storage', 29900, 39900, 22, 440, 18, '[{"name":"Gray","hex":"#808080","images":["https://images.unsplash.com/photo-1631679706869-34d5e5e6db34?w=800"]}]', 'Gray'],
      ['Computer Desk', 'computer-desk', 'Compact desk with keyboard tray', 'Space-saving desk', 34900, null, 19, 455, 29, '[{"name":"Oak","hex":"#C19A6B","images":["https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800"]}]', 'Oak'],
    ];

    for (const [name, slug, desc, short, price, orig, stock, rating, reviews, colors, defColor] of officeProducts) {
      await sql`
        INSERT INTO products (name, slug, description, "shortDescription", "categoryId", price, "originalPrice", "inStock", "stockQuantity", rating, "reviewCount", colors, "defaultColor", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${short}, ${catMap.office}, ${price}, ${orig}, true, ${stock}, ${rating}, ${reviews}, ${colors}::jsonb, ${defColor}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET name = ${name}, price = ${price}, "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    // DINING PRODUCTS
    console.log('Adding Dining products...');
    const diningProducts = [
      ['6-Piece Dining Set', '6-piece-dining-set', 'Complete set with table and 6 chairs', 'Full dining room set', 139900, 179900, 6, 490, 58, '[{"name":"Walnut","hex":"#5C4033","images":["https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800"]}]', 'Walnut'],
      ['Bar Stool Set', 'bar-stool-set', 'Counter height stools set of 4', 'Modern bar stools', 64900, 84900, 13, 465, 41, '[{"name":"Black","hex":"#000000","images":["https://images.unsplash.com/photo-1551298370-9d3d53740c72?w=800"]}]', 'Black'],
      ['Buffet Cabinet', 'buffet-cabinet', 'Storage cabinet for dining room', 'Elegant buffet', 79900, null, 9, 470, 36, '[{"name":"Gray","hex":"#808080","images":["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"]}]', 'Gray'],
      ['Bar Cart', 'bar-cart', 'Rolling bar cart with glass shelves', 'Modern bar cart', 44900, 59900, 15, 455, 24, '[{"name":"Gold","hex":"#FFD700","images":["https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=800"]}]', 'Gold'],
      ['China Cabinet', 'china-cabinet', 'Glass-front display cabinet', 'Classic china cabinet', 99900, 129900, 7, 475, 31, '[{"name":"Cherry","hex":"#D2691E","images":["https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800"]}]', 'Cherry'],
    ];

    for (const [name, slug, desc, short, price, orig, stock, rating, reviews, colors, defColor] of diningProducts) {
      await sql`
        INSERT INTO products (name, slug, description, "shortDescription", "categoryId", price, "originalPrice", "inStock", "stockQuantity", rating, "reviewCount", colors, "defaultColor", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${short}, ${catMap.dining}, ${price}, ${orig}, true, ${stock}, ${rating}, ${reviews}, ${colors}::jsonb, ${defColor}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET name = ${name}, price = ${price}, "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    // BEDROOM PRODUCTS
    console.log('Adding Bedroom products...');
    const bedroomProducts = [
      ['King Platform Bed', 'king-platform-bed', 'Modern platform bed with upholstered headboard', 'Luxury platform bed', 129900, 159900, 8, 490, 72, '[{"name":"Gray","hex":"#808080","images":["https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800"]}]', 'Gray'],
      ['Nightstand Set', 'nightstand-set', 'Matching nightstands set of 2', 'Bedroom nightstands', 54900, 69900, 14, 470, 45, '[{"name":"White","hex":"#FFFFFF","images":["https://images.unsplash.com/photo-1556020685-ae41abfc9365?w=800"]}]', 'White'],
      ['Dresser with Mirror', 'dresser-with-mirror', '6-drawer dresser with large mirror', 'Complete dresser set', 89900, 114900, 10, 480, 53, '[{"name":"Oak","hex":"#C19A6B","images":["https://images.unsplash.com/photo-1594402472000-048d90a10e5e?w=800"]}]', 'Oak'],
      ['Wardrobe Closet', 'wardrobe-closet', 'Freestanding wardrobe with shelves', 'Storage wardrobe', 79900, null, 9, 465, 38, '[{"name":"Walnut","hex":"#5C4033","images":["https://images.unsplash.com/photo-1565191999001-551c187427bb?w=800"]}]', 'Walnut'],
      ['Storage Bench', 'storage-bench', 'Upholstered bench with storage', 'Bedroom bench', 39900, 49900, 16, 455, 28, '[{"name":"Beige","hex":"#F5F5DC","images":["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800"]}]', 'Beige'],
      ['Vanity Table', 'vanity-table', 'Makeup vanity with lighted mirror', 'Modern vanity table', 64900, 84900, 11, 475, 41, '[{"name":"White","hex":"#FFFFFF","images":["https://images.unsplash.com/photo-1600210491369-e753d80a41f3?w=800"]}]', 'White'],
    ];

    for (const [name, slug, desc, short, price, orig, stock, rating, reviews, colors, defColor] of bedroomProducts) {
      await sql`
        INSERT INTO products (name, slug, description, "shortDescription", "categoryId", price, "originalPrice", "inStock", "stockQuantity", rating, "reviewCount", colors, "defaultColor", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${short}, ${catMap.bedroom}, ${price}, ${orig}, true, ${stock}, ${rating}, ${reviews}, ${colors}::jsonb, ${defColor}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET name = ${name}, price = ${price}, "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    // STORAGE PRODUCTS
    console.log('Adding Storage products...');
    const storageProducts = [
      ['Tall Bookcase', 'tall-bookcase', '6-shelf tall bookcase', 'Modern bookshelf', 54900, 69900, 12, 470, 39, '[{"name":"Black","hex":"#000000","images":["https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800"]}]', 'Black'],
      ['Storage Ottoman', 'storage-ottoman', 'Large ottoman with hidden storage', 'Functional ottoman', 34900, null, 18, 455, 26, '[{"name":"Gray","hex":"#808080","images":["https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800"]}]', 'Gray'],
      ['Media Console', 'media-console', 'TV stand with storage cabinets', 'Entertainment center', 64900, 84900, 10, 480, 51, '[{"name":"Walnut","hex":"#5C4033","images":["https://images.unsplash.com/photo-1593184065383-00e28c93d2ae?w=800"]}]', 'Walnut'],
      ['Storage Cabinet', 'storage-cabinet', 'Multi-purpose storage cabinet', 'Versatile cabinet', 49900, 64900, 14, 460, 33, '[{"name":"White","hex":"#FFFFFF","images":["https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800"]}]', 'White'],
      ['Cube Storage Unit', 'cube-storage-unit', '9-cube organizer with bins', 'Modular storage', 39900, null, 20, 450, 28, '[{"name":"Oak","hex":"#C19A6B","images":["https://images.unsplash.com/photo-1616464233850-f7073aa5d6a4?w=800"]}]', 'Oak'],
    ];

    for (const [name, slug, desc, short, price, orig, stock, rating, reviews, colors, defColor] of storageProducts) {
      await sql`
        INSERT INTO products (name, slug, description, "shortDescription", "categoryId", price, "originalPrice", "inStock", "stockQuantity", rating, "reviewCount", colors, "defaultColor", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${short}, ${catMap.storage}, ${price}, ${orig}, true, ${stock}, ${rating}, ${reviews}, ${colors}::jsonb, ${defColor}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET name = ${name}, price = ${price}, "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    // LIGHTING PRODUCTS
    console.log('Adding Lighting products...');
    const lightingProducts = [
      ['Pendant Light Set', 'pendant-light-set', 'Modern pendant lights set of 3', 'Contemporary pendants', 44900, 59900, 16, 480, 47, '[{"name":"Gold","hex":"#FFD700","images":["https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800"]}]', 'Gold'],
      ['Arc Floor Lamp', 'arc-floor-lamp', 'Modern arched floor lamp', 'Statement floor lamp', 34900, null, 19, 470, 35, '[{"name":"Black","hex":"#000000","images":["https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800"]}]', 'Black'],
      ['Chandelier', 'crystal-chandelier', 'Elegant crystal chandelier', 'Luxury chandelier', 129900, 169900, 5, 495, 68, '[{"name":"Crystal","hex":"#E0E0E0","images":["https://images.unsplash.com/photo-1565183997392-2f3d5e8b6c35?w=800"]}]', 'Crystal'],
      ['Table Lamp Pair', 'table-lamp-pair', 'Modern table lamps set of 2', 'Bedside lamps', 29900, 39900, 22, 460, 31, '[{"name":"White","hex":"#FFFFFF","images":["https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800"]}]', 'White'],
      ['Track Lighting Kit', 'track-lighting-kit', 'Adjustable track lighting system', 'Flexible track lights', 54900, 74900, 13, 465, 29, '[{"name":"Black","hex":"#000000","images":["https://images.unsplash.com/photo-1565183928294-d8f5e0e8aac1?w=800"]}]', 'Black'],
      ['Wall Sconce Set', 'wall-sconce-set', 'Modern wall sconces set of 2', 'Decorative wall lights', 39900, null, 17, 455, 24, '[{"name":"Brass","hex":"#B5A642","images":["https://images.unsplash.com/photo-1582582494310-02382c70f776?w=800"]}]', 'Brass'],
    ];

    for (const [name, slug, desc, short, price, orig, stock, rating, reviews, colors, defColor] of lightingProducts) {
      await sql`
        INSERT INTO products (name, slug, description, "shortDescription", "categoryId", price, "originalPrice", "inStock", "stockQuantity", rating, "reviewCount", colors, "defaultColor", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${short}, ${catMap.lighting}, ${price}, ${orig}, true, ${stock}, ${rating}, ${reviews}, ${colors}::jsonb, ${defColor}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET name = ${name}, price = ${price}, "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    // DECOR PRODUCTS
    console.log('Adding Decor products...');
    const decorProducts = [
      ['Large Wall Mirror', 'large-wall-mirror', 'Round decorative mirror 36 inch', 'Statement wall mirror', 39900, 49900, 15, 475, 42, '[{"name":"Gold","hex":"#FFD700","images":["https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800"]}]', 'Gold'],
      ['Ceramic Vase Set', 'ceramic-vase-set', 'Modern ceramic vases set of 3', 'Decorative vases', 24900, null, 25, 455, 28, '[{"name":"White","hex":"#FFFFFF","images":["https://images.unsplash.com/photo-1578500494198-246f612d3b3d?w=800"]}]', 'White'],
      ['Wall Art Canvas', 'wall-art-canvas', 'Abstract canvas art 48x36 inch', 'Modern wall art', 34900, 44900, 18, 465, 35, '[{"name":"Multicolor","hex":"#000000","images":["https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800"]}]', 'Multicolor'],
      ['Throw Pillow Set', 'throw-pillow-set', 'Decorative pillows set of 4', 'Accent pillows', 19900, 29900, 30, 450, 21, '[{"name":"Gray","hex":"#808080","images":["https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800"]}]', 'Gray'],
      ['Area Rug', 'modern-area-rug', 'Contemporary area rug 8x10 ft', 'Living room rug', 64900, 84900, 12, 480, 48, '[{"name":"Gray","hex":"#808080","images":["https://images.unsplash.com/photo-1600166898405-da9535204843?w=800"]}]', 'Gray'],
    ];

    for (const [name, slug, desc, short, price, orig, stock, rating, reviews, colors, defColor] of decorProducts) {
      await sql`
        INSERT INTO products (name, slug, description, "shortDescription", "categoryId", price, "originalPrice", "inStock", "stockQuantity", rating, "reviewCount", colors, "defaultColor", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${short}, ${catMap.decor}, ${price}, ${orig}, true, ${stock}, ${rating}, ${reviews}, ${colors}::jsonb, ${defColor}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET name = ${name}, price = ${price}, "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    // OUTDOOR PRODUCTS
    console.log('Adding Outdoor products...');
    const outdoorProducts = [
      ['Patio Dining Set', 'patio-dining-set', 'Weather-resistant dining set for 6', 'Outdoor dining set', 99900, 129900, 8, 485, 52, '[{"name":"Gray","hex":"#808080","images":["https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800"]}]', 'Gray'],
      ['Adirondack Chair', 'adirondack-chair', 'Classic wooden Adirondack chair', 'Outdoor lounge chair', 34900, null, 16, 470, 38, '[{"name":"Natural","hex":"#C19A6B","images":["https://images.unsplash.com/photo-1601551015936-39bf0c1ba8e6?w=800"]}]', 'Natural'],
      ['Outdoor Sectional', 'outdoor-sectional', 'Modular patio sectional with cushions', 'Patio seating set', 149900, 189900, 6, 480, 45, '[{"name":"Wicker","hex":"#8B7355","images":["https://images.unsplash.com/photo-1599750461563-eea7a0cd08f9?w=800"]}]', 'Wicker'],
      ['Fire Pit Table', 'fire-pit-table', 'Propane fire pit table with cover', 'Outdoor fire table', 89900, 119900, 9, 475, 41, '[{"name":"Black","hex":"#000000","images":["https://images.unsplash.com/photo-1605902004417-e38200f56fcf?w=800"]}]', 'Black'],
    ];

    for (const [name, slug, desc, short, price, orig, stock, rating, reviews, colors, defColor] of outdoorProducts) {
      await sql`
        INSERT INTO products (name, slug, description, "shortDescription", "categoryId", price, "originalPrice", "inStock", "stockQuantity", rating, "reviewCount", colors, "defaultColor", "createdAt", "updatedAt")
        VALUES (${name}, ${slug}, ${desc}, ${short}, ${catMap.outdoor}, ${price}, ${orig}, true, ${stock}, ${rating}, ${reviews}, ${colors}::jsonb, ${defColor}, NOW(), NOW())
        ON CONFLICT (slug) DO UPDATE SET name = ${name}, price = ${price}, "updatedAt" = NOW()
      `;
      console.log(`  ✓ ${name}`);
    }

    console.log('\n✅ Database seeding complete!');
    console.log('\n📊 Summary:');
    console.log('   - 10 Categories added');
    console.log('   - 50 Products added');
    console.log('   - All with images and details\n');

  } catch (error) {
    console.error('❌ Seeding failed:', error.message);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seedDatabase();
