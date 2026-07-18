// Static product database
export interface ProductData {
  id: number;
  slug: string;
  name: string;
  price: number; // in cents
  originalPrice?: number;
  rating: number; // 0-500 scale
  reviewCount: number;
  description: string;
  shortDescription: string;
  category: "furniture" | "lighting" | "decor" | "workspace";
  imageUrl: string;
  galleryImages: string[];
  inStock: number; // 1 or 0
  stockQuantity: number;
}

export const staticProducts: ProductData[] = [
  {
    id: 1,
    slug: "modern-leather-sofa",
    name: "Modern Leather Sofa",
    price: 12990000, // NPR 129,900 in cents
    originalPrice: 15990000,
    rating: 480, // 4.8 out of 5
    reviewCount: 24,
    description:
      "Experience luxury and comfort with our premium Modern Leather Sofa. Crafted with genuine Italian leather and a solid wood frame, this contemporary piece is perfect for any modern living space. The sleek design features clean lines, plush cushioning, and exceptional durability.",
    shortDescription: "Premium leather sofa with modern design",
    category: "furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1000&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 8,
  },
  {
    id: 2,
    slug: "minimalist-armchair",
    name: "Minimalist Armchair",
    price: 5990000, // NPR 59,900
    originalPrice: 7990000,
    rating: 460, // 4.6
    reviewCount: 18,
    description:
      "This minimalist armchair combines comfort with contemporary design. Featuring a sturdy wooden frame and premium fabric upholstery, it's perfect for reading nooks, bedrooms, or living spaces. The ergonomic design ensures maximum comfort during extended sitting sessions.",
    shortDescription: "Contemporary armchair with ergonomic design",
    category: "furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=1000&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 15,
  },
  {
    id: 3,
    slug: "modern-coffee-table",
    name: "Modern Coffee Table",
    price: 3990000, // NPR 39,900
    originalPrice: 4990000,
    rating: 470, // 4.7
    reviewCount: 32,
    description:
      "Elevate your living room with this stunning modern coffee table. Crafted from premium oak wood with a tempered glass top, it combines functionality with sophisticated style. The spacious surface and lower shelf provide ample storage space for books, magazines, and decorative items.",
    shortDescription: "Oak and glass coffee table with storage",
    category: "furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1565191999001-551c187427bb?w=1000&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 12,
  },
  {
    id: 4,
    slug: "decorative-side-table",
    name: "Decorative Side Table",
    price: 2490000, // NPR 24,900
    rating: 450, // 4.5
    reviewCount: 21,
    description:
      "Add a touch of elegance to any room with this decorative side table. Featuring a unique geometric base and marble top, it serves as both functional furniture and a statement piece. Perfect for displaying lamps, plants, or decorative objects.",
    shortDescription: "Marble top side table with geometric base",
    category: "furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1565192979914-89167a98a34f?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1550254478-ead40cc54513?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 20,
  },
  {
    id: 5,
    slug: "industrial-pendant-light",
    name: "Industrial Pendant Light",
    price: 1890000, // NPR 18,900
    originalPrice: 2490000,
    rating: 490, // 4.9
    reviewCount: 45,
    description:
      "This industrial-style pendant light adds character and warmth to any space. Featuring a black metal shade with exposed Edison bulb, it's perfect for kitchens, dining rooms, or commercial spaces. The adjustable cord length allows for customizable hanging height.",
    shortDescription: "Industrial pendant with Edison bulb",
    category: "lighting",
    imageUrl:
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=1000&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 30,
  },
  {
    id: 6,
    slug: "modern-floor-lamp",
    name: "Modern Floor Lamp",
    price: 2990000, // NPR 29,900
    rating: 460, // 4.6
    reviewCount: 28,
    description:
      "Illuminate your space with this sleek modern floor lamp. The minimalist design features an adjustable arm and head, making it perfect for reading or task lighting. The sturdy metal construction ensures stability, while the contemporary finish complements any decor.",
    shortDescription: "Adjustable modern floor lamp",
    category: "lighting",
    imageUrl:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 18,
  },
  {
    id: 7,
    slug: "velvet-throw-pillows",
    name: "Velvet Throw Pillows",
    price: 890000, // NPR 8,900
    originalPrice: 1290000,
    rating: 480, // 4.8
    reviewCount: 67,
    description:
      "Add a luxurious touch to your sofa or bed with these velvet throw pillows. Made from premium velvet fabric with hidden zipper closures, they come in a set of 2. The plush filling provides optimal comfort while maintaining shape over time.",
    shortDescription: "Set of 2 luxury velvet pillows",
    category: "decor",
    imageUrl:
      "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 50,
  },
  {
    id: 8,
    slug: "geometric-wall-art",
    name: "Geometric Wall Art",
    price: 1590000, // NPR 15,900
    rating: 470, // 4.7
    reviewCount: 39,
    description:
      "Transform your walls with this stunning geometric wall art. Hand-crafted from wood with a sophisticated metallic finish, this three-piece set creates a striking focal point. The abstract design works beautifully in modern, contemporary, or minimalist interiors.",
    shortDescription: "3-piece geometric wall art set",
    category: "decor",
    imageUrl:
      "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 25,
  },
  {
    id: 9,
    slug: "ergonomic-office-chair",
    name: "Ergonomic Office Chair",
    price: 8990000, // NPR 89,900
    originalPrice: 11990000,
    rating: 490, // 4.9
    reviewCount: 156,
    description:
      "Maximize productivity and comfort with this premium ergonomic office chair. Features adjustable lumbar support, armrests, and seat height. The breathable mesh back keeps you cool during long work sessions, while the padded seat provides all-day comfort.",
    shortDescription: "Premium ergonomic chair with lumbar support",
    category: "workspace",
    imageUrl:
      "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=1000&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1598300188816-83325e3d2c58?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 22,
  },
  {
    id: 10,
    slug: "standing-desk",
    name: "Adjustable Standing Desk",
    price: 15990000, // NPR 159,900
    originalPrice: 19990000,
    rating: 480, // 4.8
    reviewCount: 89,
    description:
      "Promote better health and productivity with this electric standing desk. Features smooth height adjustment at the touch of a button, spacious work surface, and cable management system. The sturdy steel frame supports up to 120kg, perfect for multiple monitors and equipment.",
    shortDescription: "Electric height-adjustable desk",
    category: "workspace",
    imageUrl:
      "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&h=1000&fit=crop",
      "https://images.unsplash.com/photo-1595513229096-5f8928422b72?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 10,
  },
  {
    id: 11,
    slug: "scandinavian-bookshelf",
    name: "Scandinavian Bookshelf",
    price: 6990000, // NPR 69,900
    rating: 460, // 4.6
    reviewCount: 43,
    description:
      "This Scandinavian-inspired bookshelf brings clean lines and functionality to your space. Made from sustainable oak wood, it features five spacious shelves perfect for books, plants, and decorative items. The minimalist design fits seamlessly into any room.",
    shortDescription: "5-tier oak bookshelf",
    category: "furniture",
    imageUrl:
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 14,
  },
  {
    id: 12,
    slug: "crystal-chandelier",
    name: "Crystal Chandelier",
    price: 12990000, // NPR 129,900
    originalPrice: 16990000,
    rating: 490, // 4.9
    reviewCount: 52,
    description:
      "Make a statement with this elegant crystal chandelier. Featuring cascading crystals and a polished chrome finish, it creates stunning light reflections throughout your space. Perfect for dining rooms, entryways, or grand living spaces.",
    shortDescription: "Elegant crystal chandelier",
    category: "lighting",
    imageUrl:
      "https://images.unsplash.com/photo-1565080381408-7a7a0f6e3b6e?w=1000&h=1000&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1000&h=1000&fit=crop",
    ],
    inStock: 1,
    stockQuantity: 7,
  },
];

// Helper function to get product by ID or slug
export function getProductById(id: number): ProductData | undefined {
  return staticProducts.find((p) => p.id === id);
}

export function getProductBySlug(slug: string): ProductData | undefined {
  return staticProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(
  category: string,
  limit?: number
): ProductData[] {
  const filtered = staticProducts.filter((p) => p.category === category);
  return limit ? filtered.slice(0, limit) : filtered;
}

export function getAllProducts(limit?: number): ProductData[] {
  return limit ? staticProducts.slice(0, limit) : staticProducts;
}
