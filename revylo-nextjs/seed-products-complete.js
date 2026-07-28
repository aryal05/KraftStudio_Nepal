const { neon } = require('@neondatabase/serverless');
require('dotenv').config();

async function seedProducts() {
  console.log('🌱 Starting product seeding...\n');

  const sql = neon(process.env.DATABASE_URL);

  try {
    // Get all categories
    const categories = await sql`SELECT * FROM categories ORDER BY id`;
    
    if (categories.length === 0) {
      console.log('❌ No categories found. Please create categories first via admin panel.');
      return;
    }

    console.log(`Found ${categories.length} categories:`);
    categories.forEach(cat => console.log(`  - ${cat.name} (ID: ${cat.id})`));
    console.log('');

    // Sample products for each category
    const productsData = {
      'Furniture': [
        {
          name: 'Modern Leather Sofa',
          slug: 'modern-leather-sofa',
          description: 'Luxurious three-seater leather sofa with premium Italian leather upholstery. Features solid hardwood frame, high-density foam cushions, and elegant design perfect for contemporary living spaces.',
          shortDescription: 'Premium Italian leather sofa with modern design',
          price: 129900, // NPR 1,299.00
          originalPrice: 159900,
          inStock: true,
          stockQuantity: 15,
          rating: 480, // 4.8/5
          reviewCount: 124,
          colors: [
            {
              name: 'Charcoal Gray',
              hex: '#4a4a4a',
              images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800']
            },
            {
              name: 'Cognac Brown',
              hex: '#8b7355',
              images: ['https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800']
            }
          ],
          defaultColor: 'Charcoal Gray'
        },
        {
          name: 'Minimalist Armchair',
          slug: 'minimalist-armchair',
          description: 'Scandinavian-inspired armchair crafted with premium fabric and solid oak legs. Perfect blend of comfort and minimalist aesthetics for modern homes.',
          shortDescription: 'Scandinavian style armchair with oak legs',
          price: 59900,
          inStock: true,
          stockQuantity: 28,
          rating: 460,
          reviewCount: 89,
          colors: [
            { name: 'Light Gray', hex: '#e5e5e5', images: ['https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800'] }
          ],
          defaultColor: 'Light Gray'
        },
        {
          name: 'Velvet Dining Chair',
          slug: 'velvet-dining-chair',
          description: 'Elegant dining chair upholstered in luxurious velvet fabric with gold-finished metal legs. Adds sophistication to any dining space.',
          shortDescription: 'Luxury velvet dining chair with gold legs',
          price: 44900,
          inStock: true,
          stockQuantity: 42,
          rating: 470,
          reviewCount: 156,
          colors: [
            { name: 'Emerald Green', hex: '#2c5f2d', images: ['https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800'] },
            { name: 'Navy Blue', hex: '#1e3a5f', images: ['https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800'] }
          ],
          defaultColor: 'Emerald Green'
        },
        {
          name: 'Scandinavian Coffee Table',
          slug: 'scandinavian-coffee-table',
          description: 'Beautiful solid oak coffee table with clean lines and natural finish. Features spacious tabletop and minimalist design perfect for modern living rooms.',
          shortDescription: 'Solid oak coffee table with natural finish',
          price: 39900,
          inStock: true,
          stockQuantity: 20,
          rating: 490,
          reviewCount: 203,
          colors: [
            { name: 'Natural Oak', hex: '#d4a574', images: ['https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800'] }
          ],
          defaultColor: 'Natural Oak'
        },
        {
          name: 'Luxury Sectional Sofa',
          slug: 'luxury-sectional-sofa',
          description: 'Spacious L-shaped sectional sofa perfect for large living spaces. Features premium fabric upholstery, reversible chaise, and plush cushioning for ultimate comfort.',
          shortDescription: 'Premium L-shaped sectional with reversible chaise',
          price: 219900,
          inStock: true,
          stockQuantity: 8,
          rating: 490,
          reviewCount: 245,
          colors: [
            { name: 'Charcoal', hex: '#4a4a4a', images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800'] },
            { name: 'Light Gray', hex: '#d3d3d3', images: ['https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800'] }
          ],
          defaultColor: 'Charcoal'
        },
        {
          name: 'Industrial Bookshelf',
          slug: 'industrial-bookshelf',
          description: 'Contemporary bookshelf combining solid wood shelves with black metal frame. Features five spacious tiers perfect for books, decor, and display items.',
          shortDescription: 'Wood and metal industrial bookshelf',
          price: 79900,
          inStock: true,
          stockQuantity: 12,
          rating: 450,
          reviewCount: 87,
          colors: [
            { name: 'Walnut & Black', hex: '#3e2723', images: ['https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800'] }
          ],
          defaultColor: 'Walnut & Black'
        }
      ],
      'Lighting': [
        {
          name: 'Industrial Pendant Light',
          slug: 'industrial-pendant-light',
          description: 'Vintage-inspired pendant light fixture with antique brass finish and Edison bulb compatibility. Perfect for kitchen islands, dining areas, or entryways.',
          shortDescription: 'Vintage brass pendant with Edison bulb',
          price: 29900,
          inStock: true,
          stockQuantity: 35,
          rating: 490,
          reviewCount: 178,
          colors: [
            { name: 'Antique Brass', hex: '#d4a574', images: ['https://images.unsplash.com/photo-1565182999555-2142eac8bb46?w=800'] },
            { name: 'Matte Black', hex: '#2c2c2c', images: ['https://images.unsplash.com/photo-1565182999555-2142eac8bb46?w=800'] }
          ],
          defaultColor: 'Antique Brass'
        },
        {
          name: 'Modern Desk Lamp',
          slug: 'modern-desk-lamp',
          description: 'Sleek LED desk lamp with adjustable arm and touch controls. Features three brightness levels and USB charging port.',
          shortDescription: 'LED desk lamp with USB charging',
          price: 14900,
          inStock: true,
          stockQuantity: 50,
          rating: 470,
          reviewCount: 92,
          colors: [
            { name: 'Matte Black', hex: '#2c2c2c', images: ['https://images.unsplash.com/photo-1565636192335-14f4d7cb6ed1?w=800'] },
            { name: 'White', hex: '#ffffff', images: ['https://images.unsplash.com/photo-1565636192335-14f4d7cb6ed1?w=800'] }
          ],
          defaultColor: 'Matte Black'
        },
        {
          name: 'Arc Floor Lamp',
          slug: 'arc-floor-lamp',
          description: 'Statement arc floor lamp with marble base and adjustable arm. Creates ambient lighting perfect for reading nooks and living spaces.',
          shortDescription: 'Modern arc lamp with marble base',
          price: 44900,
          inStock: true,
          stockQuantity: 18,
          rating: 480,
          reviewCount: 134,
          colors: [
            { name: 'Brass & Marble', hex: '#d4a574', images: ['https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800'] }
          ],
          defaultColor: 'Brass & Marble'
        },
        {
          name: 'Crystal Chandelier',
          slug: 'crystal-chandelier',
          description: 'Elegant crystal chandelier with 8 lights and premium K9 crystals. Creates stunning light refraction and adds luxury to any dining room or foyer.',
          shortDescription: 'Luxury 8-light crystal chandelier',
          price: 89900,
          originalPrice: 119900,
          inStock: true,
          stockQuantity: 6,
          rating: 490,
          reviewCount: 267,
          colors: [
            { name: 'Gold & Crystal', hex: '#ffd700', images: ['https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800'] }
          ],
          defaultColor: 'Gold & Crystal'
        }
      ],
      'Decor': [
        {
          name: 'Abstract Wall Art Set',
          slug: 'abstract-wall-art-set',
          description: 'Set of 3 canvas prints featuring contemporary abstract designs. Museum-quality prints with vibrant colors, perfect for modern interiors.',
          shortDescription: 'Set of 3 modern abstract canvas prints',
          price: 19900,
          inStock: true,
          stockQuantity: 45,
          rating: 460,
          reviewCount: 98,
          colors: [
            { name: 'Multi-color', hex: '#8b9db0', images: ['https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800'] }
          ],
          defaultColor: 'Multi-color'
        },
        {
          name: 'Ceramic Vase Collection',
          slug: 'ceramic-vase-collection',
          description: 'Set of 3 handcrafted ceramic vases in varying heights. Features matte finish and modern geometric shapes perfect for fresh or dried flowers.',
          shortDescription: 'Set of 3 modern ceramic vases',
          price: 8900,
          inStock: true,
          stockQuantity: 60,
          rating: 470,
          reviewCount: 234,
          colors: [
            { name: 'White', hex: '#ffffff', images: ['https://images.unsplash.com/photo-1578500351865-d0d6b5d96081?w=800'] },
            { name: 'Gray', hex: '#808080', images: ['https://images.unsplash.com/photo-1578500351865-d0d6b5d96081?w=800'] }
          ],
          defaultColor: 'White'
        },
        {
          name: 'Round Wall Mirror',
          slug: 'round-wall-mirror',
          description: 'Large circular mirror with brass-finished metal frame. Perfect statement piece for entryways, living rooms, or bedrooms.',
          shortDescription: 'Large brass-framed round mirror',
          price: 34900,
          inStock: true,
          stockQuantity: 22,
          rating: 480,
          reviewCount: 167,
          colors: [
            { name: 'Brass', hex: '#d4a574', images: ['https://images.unsplash.com/photo-1618220179428-22790b461013?w=800'] },
            { name: 'Matte Black', hex: '#2c2c2c', images: ['https://images.unsplash.com/photo-1618220179428-22790b461013?w=800'] }
          ],
          defaultColor: 'Brass'
        },
        {
          name: 'Throw Pillow Set',
          slug: 'throw-pillow-set',
          description: 'Set of 4 decorative throw pillows with removable covers. Features bohemian patterns and premium cotton-linen blend fabric.',
          shortDescription: 'Set of 4 bohemian throw pillows',
          price: 12900,
          inStock: true,
          stockQuantity: 70,
          rating: 450,
          reviewCount: 312,
          colors: [
            { name: 'Boho Mix', hex: '#8b9db0', images: ['https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800'] }
          ],
          defaultColor: 'Boho Mix'
        }
      ]
    };

    // Insert products for each category
    let totalInserted = 0;
    
    for (const category of categories) {
      const categoryProducts = productsData[category.name] || [];
      
      if (categoryProducts.length === 0) {
        console.log(`⚠️  No sample products for "${category.name}" category`);
        continue;
      }

      console.log(`\n📦 Adding ${categoryProducts.length} products to "${category.name}"...`);

      for (const product of categoryProducts) {
        try {
          await sql`
            INSERT INTO products (
              name, slug, description, "shortDescription",
              "categoryId", price, "originalPrice",
              "inStock", "stockQuantity", rating, "reviewCount",
              colors, "defaultColor"
            ) VALUES (
              ${product.name},
              ${product.slug},
              ${product.description},
              ${product.shortDescription},
              ${category.id},
              ${product.price},
              ${product.originalPrice || null},
              ${product.inStock},
              ${product.stockQuantity},
              ${product.rating},
              ${product.reviewCount},
              ${JSON.stringify(product.colors)},
              ${product.defaultColor}
            )
            ON CONFLICT (slug) DO UPDATE SET
              name = EXCLUDED.name,
              description = EXCLUDED.description,
              price = EXCLUDED.price
          `;
          console.log(`  ✅ ${product.name}`);
          totalInserted++;
        } catch (error) {
          console.log(`  ❌ Failed to insert ${product.name}: ${error.message}`);
        }
      }
    }

    // Verify the results
    const productCount = await sql`SELECT COUNT(*)::int as count FROM products`;
    
    console.log('\n' + '='.repeat(50));
    console.log('✅ Product seeding complete!');
    console.log('='.repeat(50));
    console.log(`📊 Total products in database: ${productCount[0].count}`);
    console.log(`✨ New products added this run: ${totalInserted}`);
    console.log('\n💡 Next steps:');
    console.log('1. Visit http://localhost:5000/categories to see categories');
    console.log('2. Click on any category to see products');
    console.log('3. Visit http://localhost:5000/admin/products to manage products');
    console.log('4. Login with: admin@kraftstudio.com / Admin@123\n');

  } catch (error) {
    console.error('❌ Error seeding products:', error);
    throw error;
  }
}

// Run the seeding function
seedProducts()
  .then(() => {
    console.log('🎉 Seeding script completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('💥 Seeding script failed:', error);
    process.exit(1);
  });
