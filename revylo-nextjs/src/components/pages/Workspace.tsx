import { formatNPR } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
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
  Home
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

export default function Workspace() {
  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedStyles, setSelectedStyles] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  // Filter products
  let filteredProducts = [...workspaceProducts];

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
    setPriceRange([0, 2000]);
  };

  const activeFiltersCount =
    (selectedCategory !== "All" ? 1 : 0) +
    selectedMaterials.length +
    selectedStyles.length +
    (priceRange[0] !== 0 || priceRange[1] !== 2000 ? 1 : 0);

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
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1080&fit=crop&q=80"
              alt="Workspace collection"
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
              <WalkingText text="PRODUCTIVITY REDEFINED" className="tracking-wide font-['Syne']" />
            </motion.div>

            <FloatingText duration={4} distance={12}>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-4 leading-tight font-['DM_Serif_Display'] overflow-hidden">
                <DroppingLetters text="Workspace" delay={0.4} />
              </div>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white mb-8 leading-tight font-['DM_Serif_Display'] overflow-hidden">
                <DroppingLetters text="Solutions" delay={1} />
              </div>
            </FloatingText>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto font-['Space_Grotesk'] px-4"
            >
              Create your ideal work environment with ergonomic designs, modern aesthetics, 
              and innovative solutions tailored for maximum productivity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2 }}
              className="flex flex-wrap justify-center gap-4 relative z-20"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#products">
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 font-['Syne']"
                  >
                    EXPLORE COLLECTION
                  </Button>
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="border-2 border-white bg-white/10 backdrop-blur-sm text-white hover:bg-white hover:text-gray-900 px-8 py-6 text-base font-semibold shadow-xl hover:shadow-2xl transition-all duration-300 font-['Syne']"
                >
                  DESIGN CONSULTATION
                </Button>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
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
                          max={2000}
                          step={50}
                          className="mb-2"
                        />
                        <div className="flex items-center justify-between text-sm text-gray-600 font-['Space_Grotesk']">
                          <span>{formatNPR(priceRange[0])}</span>
                          <span>{formatNPR(priceRange[1])}</span>
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
                        <Link href={`/product/${product.id}`}>
                          <motion.div
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
                                        {formatNPR(product.price)}
                                      </span>
                                      {product.originalPrice && (
                                        <span className="text-sm text-gray-500 line-through font-['Space_Grotesk']">
                                          {formatNPR(product.originalPrice)}
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
                          </motion.div>
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
