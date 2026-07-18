import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  ArrowRight, 
  SlidersHorizontal, 
  X, 
  Grid3x3, 
  LayoutGrid,
  Check,
  ChevronDown,
  Sparkles,
  Monitor,
  Laptop,
  Briefcase,
  Home,
  Sofa,
  Lamp,
  Frame
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { DroppingLetters, WalkingText, FadeSlideIn, ScaleFade, FloatingText } from "@/lib/animations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

const workspaceProducts = [
  {
    id: 1,
    name: "Executive Desk Pro",
    price: 1299,
    originalPrice: 1599,
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&h=800&fit=crop&q=80",
    rating: 4.9,
    reviews: 128,
    colors: ["#2c2c2c", "#d4a574", "#8b7355"],
    tags: ["Best Seller", "Premium"],
    category: "Desks",
    material: "Wood",
    style: "Modern",
    inStock: true,
  },
  {
    id: 2,
    name: "Ergonomic Office Chair Ultra",
    price: 649,
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=800&h=800&fit=crop&q=80",
    rating: 4.8,
    reviews: 256,
    colors: ["#4a4a4a", "#2c2c2c", "#8b9db0"],
    tags: ["Ergonomic", "Best Rated"],
    category: "Chairs",
    material: "Mesh",
    style: "Contemporary",
    inStock: true,
  },
  {
    id: 3,
    name: "Standing Desk Converter Premium",
    price: 449,
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=800&fit=crop&q=80",
    rating: 4.7,
    reviews: 89,
    colors: ["#2c2c2c", "#e5e5e5"],
    tags: ["Health", "Adjustable"],
    category: "Desks",
    material: "Metal",
    style: "Industrial",
    inStock: true,
  },
  {
    id: 4,
    name: "Designer Task Chair",
    price: 399,
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop&q=80",
    rating: 4.6,
    reviews: 74,
    colors: ["#8b9db0", "#4a4a4a", "#d4a574"],
    tags: ["Designer", "Compact"],
    category: "Chairs",
    material: "Fabric",
    style: "Modern",
    inStock: true,
  },
  {
    id: 5,
    name: "Minimalist Workstation",
    price: 799,
    image: "https://images.unsplash.com/photo-1551732998-7b75d41ec768?w=800&h=800&fit=crop&q=80",
    rating: 4.9,
    reviews: 145,
    colors: ["#e5e5e5", "#2c2c2c"],
    tags: ["Minimalist", "Cable Management"],
    category: "Desks",
    material: "Wood",
    style: "Scandinavian",
    inStock: true,
  },
  {
    id: 6,
    name: "Monitor Arm Dual Setup",
    price: 249,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop&q=80",
    rating: 4.8,
    reviews: 203,
    colors: ["#2c2c2c"],
    tags: ["Accessory", "Adjustable"],
    category: "Accessories",
    material: "Metal",
    style: "Modern",
    inStock: true,
  },
  {
    id: 7,
    name: "L-Shaped Corner Desk",
    price: 899,
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=800&h=800&fit=crop&q=80",
    rating: 4.7,
    reviews: 112,
    colors: ["#2c2c2c", "#d4a574"],
    tags: ["Spacious", "Corner"],
    category: "Desks",
    material: "Wood",
    style: "Modern",
    inStock: true,
  },
  {
    id: 8,
    name: "Executive Leather Chair",
    price: 1099,
    originalPrice: 1299,
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=800&fit=crop&q=80",
    rating: 4.9,
    reviews: 187,
    colors: ["#2c2c2c", "#8b7355"],
    tags: ["Luxury", "Executive"],
    category: "Chairs",
    material: "Leather",
    style: "Classic",
    inStock: true,
  },
];

const categories = [
  { name: "All", icon: Grid3x3, count: workspaceProducts.length },
  { name: "Desks", icon: Monitor, count: workspaceProducts.filter(p => p.category === "Desks").length },
  { name: "Chairs", icon: Briefcase, count: workspaceProducts.filter(p => p.category === "Chairs").length },
  { name: "Accessories", icon: Laptop, count: workspaceProducts.filter(p => p.category === "Accessories").length },
];

const materials = ["Wood", "Metal", "Fabric", "Leather", "Mesh"];
const styles = ["Modern", "Contemporary", "Scandinavian", "Industrial", "Classic"];

export default function ProductListing() {
  const [location] = useLocation();
  const category = location.split("/")[1]; // Get category from URL
  
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2500]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Category-specific configuration
  const categoryConfig: Record<string, {
    title: string;
    description: string;
    icon: any;
    heroImage: string;
    badge: string;
    subcategories: { name: string; icon: any; count: number }[];
    products: any[];
    materials: string[];
    styles: string[];
  }> = {
    furniture: {
      title: "Furniture",
      description: "Discover our curated collection of contemporary furniture pieces designed to elevate your living spaces with timeless elegance and modern comfort.",
      icon: Sofa,
      heroImage: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop&q=80",
      badge: "LUXURY LIVING",
      subcategories: [
        { name: "All", icon: Grid3x3, count: 6 },
        { name: "Sofas", icon: Sofa, count: 2 },
        { name: "Chairs", icon: Home, count: 2 },
        { name: "Tables", icon: Frame, count: 2 },
      ],
      materials: ["Leather", "Fabric", "Wood", "Velvet", "Metal"],
      styles: ["Modern", "Contemporary", "Scandinavian", "Classic", "Minimalist"],
      products: [
        {
          id: 1,
          name: "Modern Leather Sofa",
          price: 1299,
          originalPrice: 1599,
          image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=800&fit=crop&q=80",
          rating: 4.8,
          reviews: 124,
          colors: ["#4a4a4a", "#8b7355", "#2c2c2c"],
          tags: ["Best Seller", "Sale"],
          category: "Sofas",
          material: "Leather",
          style: "Modern",
          inStock: true,
        },
        {
          id: 2,
          name: "Minimalist Armchair",
          price: 599,
          image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=800&fit=crop&q=80",
          rating: 4.6,
          reviews: 89,
          colors: ["#e5e5e5", "#4a4a4a", "#d4a574"],
          tags: ["Minimalist"],
          category: "Chairs",
          material: "Fabric",
          style: "Scandinavian",
          inStock: true,
        },
        {
          id: 7,
          name: "Velvet Dining Chair",
          price: 449,
          image: "https://images.unsplash.com/photo-1598300056393-4aac492f4344?w=800&h=800&fit=crop&q=80",
          rating: 4.7,
          reviews: 156,
          colors: ["#2c5f2d", "#8b9db0", "#4a4a4a"],
          tags: ["Premium"],
          category: "Chairs",
          material: "Velvet",
          style: "Contemporary",
          inStock: true,
        },
        {
          id: 8,
          name: "Scandinavian Coffee Table",
          price: 399,
          image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=800&h=800&fit=crop&q=80",
          rating: 4.9,
          reviews: 203,
          colors: ["#d4a574", "#f5f5f5"],
          tags: ["Best Rated"],
          category: "Tables",
          material: "Wood",
          style: "Scandinavian",
          inStock: true,
        },
        {
          id: 9,
          name: "Contemporary Bookshelf",
          price: 799,
          image: "https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=800&h=800&fit=crop&q=80",
          rating: 4.5,
          reviews: 87,
          colors: ["#2c2c2c", "#d4a574"],
          tags: ["Spacious"],
          category: "Storage",
          material: "Wood",
          style: "Contemporary",
          inStock: true,
        },
        {
          id: 10,
          name: "Luxury Sectional Sofa",
          price: 2199,
          image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800&h=800&fit=crop&q=80",
          rating: 4.9,
          reviews: 245,
          colors: ["#4a4a4a", "#8b9db0", "#2c2c2c"],
          tags: ["Luxury", "Premium"],
          category: "Sofas",
          material: "Fabric",
          style: "Modern",
          inStock: true,
        },
      ],
    },
    lighting: {
      title: "Lighting",
      description: "Illuminate your home with our sophisticated lighting collection, featuring designs that blend functionality with artistic expression.",
      icon: Lamp,
      heroImage: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=1920&h=1080&fit=crop&q=80",
      badge: "ILLUMINATE YOUR SPACE",
      subcategories: [
        { name: "All", icon: Grid3x3, count: 4 },
        { name: "Pendant", icon: Lamp, count: 2 },
        { name: "Floor", icon: Lamp, count: 1 },
        { name: "Table", icon: Lamp, count: 1 },
      ],
      materials: ["Metal", "Glass", "Brass", "Wood", "Crystal"],
      styles: ["Modern", "Industrial", "Contemporary", "Classic", "Art Deco"],
      products: [
        {
          id: 3,
          name: "Pendant Light Fixture",
          price: 299,
          image: "https://images.unsplash.com/photo-1565182999555-2142eac8bb46?w=800&h=800&fit=crop&q=80",
          rating: 4.9,
          reviews: 178,
          colors: ["#d4a574", "#2c2c2c", "#e5e5e5"],
          tags: ["Best Seller", "Designer"],
          category: "Pendant",
          material: "Metal",
          style: "Industrial",
          inStock: true,
        },
        {
          id: 4,
          name: "Modern Desk Lamp",
          price: 149,
          image: "https://images.unsplash.com/photo-1565636192335-14f4d7cb6ed1?w=800&h=800&fit=crop&q=80",
          rating: 4.7,
          reviews: 92,
          colors: ["#2c2c2c", "#e5e5e5"],
          tags: ["Compact"],
          category: "Table",
          material: "Metal",
          style: "Modern",
          inStock: true,
        },
        {
          id: 11,
          name: "Arc Floor Lamp",
          price: 449,
          image: "https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=800&h=800&fit=crop&q=80",
          rating: 4.8,
          reviews: 134,
          colors: ["#d4a574", "#2c2c2c"],
          tags: ["Statement Piece"],
          category: "Floor",
          material: "Brass",
          style: "Contemporary",
          inStock: true,
        },
        {
          id: 12,
          name: "Crystal Chandelier",
          price: 899,
          originalPrice: 1199,
          image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=800&fit=crop&q=80",
          rating: 4.9,
          reviews: 267,
          colors: ["#d4a574", "#e5e5e5"],
          tags: ["Luxury", "Sale"],
          category: "Pendant",
          material: "Crystal",
          style: "Classic",
          inStock: true,
        },
      ],
    },
    decor: {
      title: "Decor",
      description: "Transform your space with our carefully selected decorative pieces that add personality and charm to every room.",
      icon: Frame,
      heroImage: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=1920&h=1080&fit=crop&q=80",
      badge: "PERSONAL TOUCH",
      subcategories: [
        { name: "All", icon: Grid3x3, count: 4 },
        { name: "Wall Art", icon: Frame, count: 1 },
        { name: "Vases", icon: Home, count: 1 },
        { name: "Mirrors", icon: Frame, count: 1 },
        { name: "Textiles", icon: Home, count: 1 },
      ],
      materials: ["Ceramic", "Glass", "Metal", "Canvas", "Fabric"],
      styles: ["Modern", "Abstract", "Minimalist", "Bohemian", "Classic"],
      products: [
        {
          id: 13,
          name: "Abstract Wall Art",
          price: 199,
          image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=800&h=800&fit=crop&q=80",
          rating: 4.6,
          reviews: 98,
          colors: ["#2c5f2d", "#d4a574", "#8b9db0"],
          tags: ["Artistic"],
          category: "Wall Art",
          material: "Canvas",
          style: "Abstract",
          inStock: true,
        },
        {
          id: 14,
          name: "Ceramic Vase Set",
          price: 89,
          image: "https://images.unsplash.com/photo-1578500351865-d0d6b5d96081?w=800&h=800&fit=crop&q=80",
          rating: 4.7,
          reviews: 234,
          colors: ["#e5e5e5", "#4a4a4a", "#d4a574"],
          tags: ["Set", "Best Seller"],
          category: "Vases",
          material: "Ceramic",
          style: "Minimalist",
          inStock: true,
        },
        {
          id: 15,
          name: "Decorative Mirror",
          price: 349,
          image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&h=800&fit=crop&q=80",
          rating: 4.8,
          reviews: 167,
          colors: ["#d4a574", "#2c2c2c"],
          tags: ["Statement"],
          category: "Mirrors",
          material: "Metal",
          style: "Modern",
          inStock: true,
        },
        {
          id: 16,
          name: "Throw Pillow Collection",
          price: 129,
          image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&h=800&fit=crop&q=80",
          rating: 4.5,
          reviews: 312,
          colors: ["#8b9db0", "#d4a574", "#2c5f2d", "#e5e5e5"],
          tags: ["Set", "Cozy"],
          category: "Textiles",
          material: "Fabric",
          style: "Bohemian",
          inStock: true,
        },
      ],
    },
  };

  const config = categoryConfig[category] || categoryConfig.furniture;
  const allProducts = config.products;

  // Filter products
  let filteredProducts = [...allProducts];

  if (selectedCategory !== "All") {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  if (selectedMaterials.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedMaterials.includes(p.material));
  }

  if (selectedStyles.length > 0) {
    filteredProducts = filteredProducts.filter(p => selectedStyles.includes(p.style));
  }

  filteredProducts = filteredProducts.filter(
    p => p.price >= priceRange[0] && p.price <= priceRange[1]
  );

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    if (sortBy === "popular") return b.reviews - a.reviews;
    return 0;
  });

  const toggleMaterial = (material: string) => {
    setSelectedMaterials(prev =>
      prev.includes(material)
        ? prev.filter(m => m !== material)
        : [...prev, material]
    );
  };

  const toggleStyle = (style: string) => {
    setSelectedStyles(prev =>
      prev.includes(style)
        ? prev.filter(s => s !== style)
        : [...prev, style]
    );
  };

  const clearFilters = () => {
    setSelectedCategory("All");
    setSelectedMaterials([]);
    setSelectedStyles([]);
    setPriceRange([0, 2500]);
  };

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    selectedMaterials.length +
    selectedStyles.length +
    (priceRange[0] !== 0 || priceRange[1] !== 2500 ? 1 : 0);

  const materials = config.materials;
  const styles = config.styles;
  const categories = config.subcategories;

  return (
    <PageTransition>
      <div className="min-h-screen bg-gray-50">
        <Navigation />

        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src={config.heroImage}
              alt={`${config.title} collection`}
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Gradient Overlays */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-transparent to-gray-900/70" />

          {/* Content */}
          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center py-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <WalkingText text={config.badge} className="tracking-wide font-['Syne']" />
            </motion.div>

            <FloatingText duration={4} distance={12}>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight font-['DM_Serif_Display'] overflow-hidden">
                <DroppingLetters text={config.title} delay={0.4} />
              </div>
            </FloatingText>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto font-['Space_Grotesk'] px-4"
            >
              {config.description}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 font-['Syne']">
                  <a href="#products">EXPLORE COLLECTION</a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 font-['Syne']">
                  DESIGN CONSULTATION
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 text-white/70" />
            </motion.div>
          </motion.div>
        </section>

        {/* Category Pills */}
        <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {categories.map((cat, index) => (
                <FadeSlideIn key={cat.name} direction="down" delay={index * 0.05}>
                  <motion.button
                    onClick={() => setSelectedCategory(cat.name)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all font-['Syne'] ${
                      selectedCategory === cat.name
                        ? "bg-gray-900 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    <cat.icon className="w-4 h-4" />
                    <span>{cat.name}</span>
                    <Badge variant="secondary" className="ml-1">
                      {cat.count}
                    </Badge>
                  </motion.button>
                </FadeSlideIn>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section id="products" className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex gap-8">
              {/* Sidebar Filters - Desktop */}
              <FadeSlideIn direction="left" className="hidden lg:block w-80 flex-shrink-0">
                <div className="sticky top-32">
                  <Card className="p-6 bg-white shadow-lg border-0">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-semibold font-['Syne']">Filters</h3>
                      {activeFiltersCount > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={clearFilters}
                          className="text-sm"
                        >
                          Clear ({activeFiltersCount})
                        </Button>
                      )}
                    </div>

                    {/* Price Range */}
                    <div className="mb-8">
                      <h4 className="font-medium mb-4 font-['Syne']">Price Range</h4>
                      <div className="space-y-4">
                        <Slider
                          value={priceRange}
                          onValueChange={setPriceRange}
                          max={2500}
                          step={50}
                          className="mb-2"
                        />
                        <div className="flex items-center justify-between text-sm text-gray-600 font-['Space_Grotesk']">
                          <span>${priceRange[0]}</span>
                          <span>${priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Materials */}
                    <div className="mb-8">
                      <h4 className="font-medium mb-4 font-['Syne']">Material</h4>
                      <div className="space-y-3">
                        {materials.map((material) => (
                          <label key={material} className="flex items-center gap-3 cursor-pointer group">
                            <Checkbox
                              checked={selectedMaterials.includes(material)}
                              onCheckedChange={() => toggleMaterial(material)}
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900 font-['Space_Grotesk']">
                              {material}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Styles */}
                    <div className="mb-8">
                      <h4 className="font-medium mb-4 font-['Syne']">Style</h4>
                      <div className="space-y-3">
                        {styles.map((style) => (
                          <label key={style} className="flex items-center gap-3 cursor-pointer group">
                            <Checkbox
                              checked={selectedStyles.includes(style)}
                              onCheckedChange={() => toggleStyle(style)}
                            />
                            <span className="text-sm text-gray-700 group-hover:text-gray-900 font-['Space_Grotesk']">
                              {style}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* In Stock Only */}
                    <div className="pt-6 border-t border-gray-200">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <Checkbox defaultChecked />
                        <span className="text-sm text-gray-700 font-['Space_Grotesk']">In Stock Only</span>
                      </label>
                    </div>
                  </Card>
                </div>
              </FadeSlideIn>

              {/* Products Grid */}
              <div className="flex-1">
                {/* Toolbar */}
                <FadeSlideIn direction="right">
                  <Card className="p-6 mb-8 bg-white shadow-sm border-0">
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                      <div className="flex items-center gap-4">
                        <p className="text-gray-900 font-semibold text-lg font-['Syne']">
                          {sortedProducts.length} Products Found
                        </p>
                        
                        {/* Mobile Filter Button */}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setFilterOpen(!filterOpen)}
                          className="lg:hidden flex items-center gap-2"
                        >
                          <SlidersHorizontal className="w-4 h-4" />
                          Filters
                          {activeFiltersCount > 0 && (
                            <Badge variant="default" className="ml-1">
                              {activeFiltersCount}
                            </Badge>
                          )}
                        </Button>
                      </div>

                      <div className="flex items-center gap-4 w-full lg:w-auto">
                        {/* View Mode Toggle */}
                        <div className="hidden md:flex items-center gap-2 bg-gray-100 p-1 rounded-lg">
                          <button
                            onClick={() => setViewMode("grid")}
                            className={`p-2 rounded transition-colors ${
                              viewMode === "grid" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                            }`}
                          >
                            <LayoutGrid className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => setViewMode("list")}
                            className={`p-2 rounded transition-colors ${
                              viewMode === "list" ? "bg-white shadow-sm" : "hover:bg-gray-200"
                            }`}
                          >
                            <Grid3x3 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Sort */}
                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-full lg:w-48 bg-white">
                            <SelectValue placeholder="Sort by" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="featured">Featured</SelectItem>
                            <SelectItem value="popular">Most Popular</SelectItem>
                            <SelectItem value="price-low">Price: Low to High</SelectItem>
                            <SelectItem value="price-high">Price: High to Low</SelectItem>
                            <SelectItem value="rating">Highest Rated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </Card>
                </FadeSlideIn>

                {/* Products Grid */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`${selectedCategory}-${sortBy}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className={
                      viewMode === "grid"
                        ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                        : "flex flex-col gap-6"
                    }
                  >
                    {sortedProducts.map((product, index) => (
                      <ScaleFade key={product.id} delay={index * 0.05}>
                        <Link href={`/product/${product.slug}`}>
                          <motion.a
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="group block h-full"
                          >
                            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white border-0">
                              {/* Product Image */}
                              <div className="relative h-80 overflow-hidden bg-gray-100">
                                <motion.img
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.6 }}
                                  src={product.image}
                                  alt={product.name}
                                  className="w-full h-full object-cover"
                                />
                                
                                {/* Tags */}
                                <div className="absolute top-4 left-4 flex flex-col gap-2">
                                  {product.tags.map((tag) => (
                                    <Badge key={tag} className="bg-white/95 text-gray-900 backdrop-blur-sm font-['Syne']">
                                      {tag}
                                    </Badge>
                                  ))}
                                  {product.originalPrice && (
                                    <Badge className="bg-red-600 text-white font-['Syne']">
                                      SALE
                                    </Badge>
                                  )}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                                {/* Color Options */}
                                <div className="absolute bottom-4 left-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  {product.colors.map((color, i) => (
                                    <motion.div
                                      key={i}
                                      whileHover={{ scale: 1.2 }}
                                      className="w-8 h-8 rounded-full border-2 border-white shadow-lg cursor-pointer"
                                      style={{ backgroundColor: color }}
                                    />
                                  ))}
                                </div>

                                {/* Quick View */}
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  whileHover={{ opacity: 1, y: 0 }}
                                  className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                >
                                  <Button size="sm" className="bg-white text-gray-900 hover:bg-gray-100 font-['Syne']">
                                    Quick View
                                  </Button>
                                </motion.div>
                              </div>

                              {/* Product Info */}
                              <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-start justify-between mb-2">
                                  <Badge variant="outline" className="font-['Space_Grotesk']">
                                    {product.category}
                                  </Badge>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                                    <span className="text-sm font-medium font-['Space_Grotesk']">{product.rating}</span>
                                    <span className="text-xs text-gray-500 font-['Space_Grotesk']">
                                      ({product.reviews})
                                    </span>
                                  </div>
                                </div>

                                <h3 className="text-xl font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors font-['Cormorant_Garamond']">
                                  {product.name}
                                </h3>

                                <p className="text-sm text-gray-600 mb-4 font-['Space_Grotesk']">
                                  {product.material} • {product.style}
                                </p>

                                {/* Price */}
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200">
                                  <div>
                                    <div className="flex items-baseline gap-2">
                                      <span className="text-2xl font-semibold text-gray-900 font-['Syne']">
                                        ${product.price}
                                      </span>
                                      {product.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through font-['Space_Grotesk']">
                                          ${product.originalPrice}
                                        </span>
                                      )}
                                    </div>
                                  </div>
                                  <motion.div
                                    whileHover={{ x: 5 }}
                                    transition={{ duration: 0.2 }}
                                  >
                                    <ArrowRight className="w-5 h-5 text-gray-900" />
                                  </motion.div>
                                </div>
                              </div>
                            </Card>
                          </motion.a>
                        </Link>
                      </ScaleFade>
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Empty State */}
                {sortedProducts.length === 0 && (
                  <ScaleFade>
                    <Card className="p-16 text-center bg-white">
                      <Home className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-xl font-medium mb-2 font-['Syne']">No products found</h3>
                      <p className="text-gray-600 mb-6 font-['Space_Grotesk']">
                        Try adjusting your filters to see more results
                      </p>
                      <Button onClick={clearFilters} className="font-['Syne']">
                        Clear All Filters
                      </Button>
                    </Card>
                  </ScaleFade>
                )}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
