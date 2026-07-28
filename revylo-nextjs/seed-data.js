require('dotenv').config({ path: '.env' });
const { drizzle } = require('drizzle-orm/postgres-js');
const postgres = require('postgres');
const { categories, products } = require('./drizzle/schema.ts');

// Database connection
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
  console.error('DATABASE_URL is not set in .env file');
  process.exit(1);
}

const client = postgres(connectionString);
const db = drizzle(client);

// Comprehensive seed data
const seedData = {
  categories: [
    {
      name: "Chairs",
      slug: "chairs",
      description: "Comfortable seating for every room in your home",
      imageUrl: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800&h=600&fit=crop",
      displayOrder: 1,
      isActive: true
    },
    {
      name: "Sofas",
      slug: "sofas",
      description: "Luxurious sofas and sectionals for your living room",
      imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      displayOrder: 2,
      isActive: true
    },
    {
      name: "Tables",
      slug: "tables",
      description: "Dining, coffee, and side tables for every occasion",
      imageUrl: "https://images.unsplash.com/photo-1517705008128-361805f42e86?w=800&h=600&fit=crop",
      displayOrder: 3,
      isActive: true
    },
    {
      name: "Office",
      slug: "office",
      description: "Ergonomic desks and chairs for your home office",
      imageUrl: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop",
      displayOrder: 4,
      isActive: true
    },
    {
      name: "Dining",
      slug: "dining",
      description: "Complete dining sets and individual pieces",
      imageUrl: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=800&h=600&fit=crop",
      displayOrder: 5,
      isActive: true
    },
    {
      name: "Bedroom",
      slug: "bedroom",
      description: "Beds, nightstands, and bedroom furniture",
      imageUrl: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&h=600&fit=crop",
      displayOrder: 6,
      isActive: true
    },
    {
      name: "Storage",
      slug: "storage",
      description: "Bookcases, cabinets, and storage solutions",
      imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=600&fit=crop",
      displayOrder: 7,
      isActive: true
    },
    {
      name: "Lighting",
      slug: "lighting",
      description: "Pendant lights, floor lamps, and fixtures",
      imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop",
      displayOrder: 8,
      isActive: true
    },
    {
      name: "Decor",
      slug: "decor",
      description: "Mirrors, plants, and decorative accents",
      imageUrl: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=600&fit=crop",
      displayOrder: 9,
      isActive: true
    },
    {
      name: "Outdoor",
      slug: "outdoor",
      description: "Patio furniture and outdoor living essentials",
      imageUrl: "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=600&fit=crop",
      displayOrder: 10,
      isActive: true
    }
  ],

  // Products will be added after categories are created
  products: {
    chairs: [
      {
        name: "Modern Accent Chair",
        slug: "modern-accent-chair",
        description: "Contemporary accent chair with clean lines and plush cushioning. Perfect for living rooms or bedrooms.",
        shortDescription: "Comfortable modern accent chair",
        price: 34900, // $349.00
        originalPrice: 44900,
        inStock: true,
        stockQuantity: 15,
        rating: 450, // 4.5/5
        reviewCount: 28,
        colors: [
          { name: "Gray", hex: "#808080", images: ["https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=800&fit=crop"] },
          { name: "Beige", hex: "#F5F5DC", images: ["https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=800&fit=crop"] }
        ],
        defaultColor: "Gray"
      },
      {
        name: "Velvet Dining Chair",
        slug: "velvet-dining-chair",
        description: "Elegant velvet dining chair with gold metal legs. Adds a touch of luxury to any dining space.",
        shortDescription: "Luxurious velvet dining chair",
        price: 27900,
        originalPrice: 35900,
        inStock: true,
        stockQuantity: 24,
        rating: 480,
        reviewCount: 42,
        colors: [
          { name: "Navy Blue", hex: "#000080", images: ["https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=800&h=800&fit=crop"] },
          { name: "Emerald Green", hex: "#50C878", images: ["https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop"] }
        ],
        defaultColor: "Navy Blue"
      },
      {
        name: "Ergonomic Office Chair",
        slug: "ergonomic-office-chair",
        description: "High-back ergonomic office chair with lumbar support and adjustable features for maximum comfort.",
        shortDescription: "Professional ergonomic office chair",
        price: 42900,
        originalPrice: 54900,
        inStock: true,
        stockQuantity: 18,
        rating: 470,
        reviewCount: 56,
        colors: [
          { name: "Black", hex: "#000000", images: ["https://images.unsplash.com/photo-1505843513577-22bb7d21e455?w=800&h=800&fit=crop"] }
        ],
        defaultColor: "Black"
      },
      {
        name: "Scandinavian Lounge Chair",
        slug: "scandinavian-lounge-chair",
        description: "Mid-century modern lounge chair with wooden frame and comfortable fabric upholstery.",
        shortDescription: "Classic Scandinavian design chair",
        price: 39900,
        inStock: true,
        stockQuantity: 12,
        rating: 460,
        reviewCount: 34,
        colors: [
          { name: "Light Oak", hex: "#DEB887", images: ["https://images.unsplash.com/photo-1503602642458-232111445657?w=800&h=800&fit=crop"] }
        ],
        defaultColor: "Light Oak"
      },
      {
        name: "Rocking Chair",
        slug: "rocking-chair",
        description: "Classic wooden rocking chair with curved arms and comfortable seat cushion.",
        shortDescription: "Traditional rocking chair",
        price: 32900,
        inStock: true,
        stockQuantity: 10,
        rating: 440,
        reviewCount: 19,
        colors: [
          { name: "Walnut", hex: "#5C4033", images: ["https://images.unsplash.com/photo-1519947486511-46149fa0a254?w=800&h=800&fit=crop"] }
        ],
        defaultColor: "Walnut"
      }
    ],

    sofas: [
      {
        name: "Modern Sectional Sofa",
        slug: "modern-sectional-sofa",
        description: "Spacious L-shaped sectional sofa with deep seating and reversible chaise. Perfect for family gatherings.",
        shortDescription: "Large sectional with chaise",
        price: 129900,
        originalPrice: 159900,
        inStock: true,
        stockQuantity: 8,
        rating: 490,
        reviewCount: 67,
