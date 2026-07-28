"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  SlidersHorizontal, 
  Grid3x3, 
  LayoutGrid,
  Sparkles,
  ChevronDown
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { trpc } from "@/lib/trpc";
import { DroppingLetters, WalkingText, FadeSlideIn, ScaleFade, FloatingText } from "@/lib/animations";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategoriesPage() {
  // Fetch all categories from database
  const { data: categories = [], isLoading } = trpc.categories.getAll.useQuery();

  // Fetch all products to count them manually
  const { data: allProducts = [] } = trpc.products.getAll.useQuery({ limit: 1000 });

  const [sortBy, setSortBy] = useState("featured");
  const [filterOpen, setFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [mounted, setMounted] = useState(false);

  // Calculate product counts manually from all products
  const productCounts = categories.reduce((acc: any, category: any) => {
    const count = allProducts.filter((p: any) => p.categoryId === category.id).length;
    acc[category.id] = count;
    return acc;
  }, {});

  // Debug logging
  useEffect(() => {
    console.log('Categories:', categories);
    console.log('All products:', allProducts);
    console.log('Product counts:', productCounts);
  }, [categories, allProducts, productCounts]);

  // Handle hydration
  useEffect(() => {
    setMounted(true);
  }, []);

  // Create dynamic filter tabs based on categories - only on client
  const categoryFilters = mounted ? [
    { name: "All", count: categories.length },
    ...categories.map((cat: any) => ({
      name: cat.name,
      count: productCounts[cat.id] || 0
    }))
  ] : [];

  // Filter categories based on selected filter
  let filteredCategories = [...categories];
  if (selectedFilter !== "All") {
    filteredCategories = filteredCategories.filter((cat: any) => cat.name === selectedFilter);
  }

  // Sort categories
  const sortedCategories = [...filteredCategories].sort((a: any, b: any) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "products") return (productCounts[b.id] || 0) - (productCounts[a.id] || 0);
    return 0;
  });

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
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1080&fit=crop"
              alt="Categories collection"
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
              <WalkingText text="EXPLORE OUR COLLECTION" className="tracking-wide font-['Syne']" />
            </motion.div>

            <FloatingText duration={4} distance={12}>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight font-['DM_Serif_Display'] overflow-hidden">
                <DroppingLetters text="Categories" delay={0.4} />
              </div>
            </FloatingText>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto font-['Space_Grotesk'] px-4"
            >
              Explore our curated collection of furniture, lighting, and decor
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="#categories">
                  <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 font-['Syne']">
                    EXPLORE COLLECTION
                  </Button>
                </Link>
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

        {/* Category Filter Pills */}
        {mounted && categoryFilters.length > 0 && (
          <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                {categoryFilters.map((filter, index) => (
                  <FadeSlideIn key={filter.name} direction="down" delay={index * 0.05}>
                    <motion.button
                      onClick={() => setSelectedFilter(filter.name)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium whitespace-nowrap transition-all font-['Syne'] ${
                        selectedFilter === filter.name
                          ? "bg-gray-900 text-white shadow-lg"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      <Grid3x3 className="w-4 h-4" />
                      <span>{filter.name}</span>
                      <Badge variant="secondary" className="ml-1">
                        {filter.count}
                      </Badge>
                    </motion.button>
                  </FadeSlideIn>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Main Content */}
        <section id="categories" className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            {/* Toolbar */}
            <FadeSlideIn direction="right">
              <Card className="p-6 mb-8 bg-white shadow-sm border-0">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <p className="text-gray-900 font-semibold text-lg font-['Syne']">
                      {sortedCategories.length} Categories Found
                    </p>
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
                        <SelectItem value="name">Name: A-Z</SelectItem>
                        <SelectItem value="products">Most Products</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </Card>
            </FadeSlideIn>

            {/* Categories Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`${sortBy}-${selectedFilter}`}
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
                {isLoading ? (
                  <div className="text-center py-20 col-span-full">
                    <p className="text-gray-500 text-lg">Loading categories...</p>
                  </div>
                ) : sortedCategories.length > 0 ? (
                  sortedCategories.map((category: any, index: number) => {
                    const productCount = productCounts[category.id] || 0;
                    
                    return (
                      <ScaleFade key={category.id} delay={index * 0.05}>
                        <Link href={`/category/${category.slug}`}>
                          <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="group block h-full"
                          >
                            <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white border-0">
                              {/* Category Image */}
                              <div className="relative h-80 overflow-hidden bg-gray-100">
                                <motion.img
                                  whileHover={{ scale: 1.1 }}
                                  transition={{ duration: 0.6 }}
                                  src={category.imageUrl || "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop"}
                                  alt={category.name}
                                  className="w-full h-full object-cover"
                                  onError={(e) => {
                                    e.currentTarget.src = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop";
                                  }}
                                />
                                
                                {/* Product Count Badge */}
                                {mounted && (
                                  <div className="absolute top-4 left-4">
                                    <Badge className="bg-white/95 text-gray-900 backdrop-blur-sm font-['Syne']">
                                      {productCount} Products
                                    </Badge>
                                  </div>
                                )}

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                              </div>

                              {/* Category Info */}
                              <div className="p-6 flex-1 flex flex-col">
                                <h3 className="text-xl font-medium text-gray-900 mb-2 line-clamp-2 group-hover:text-gray-700 transition-colors font-['Cormorant_Garamond']">
                                  {category.name}
                                </h3>

                                {category.description && (
                                  <p className="text-sm text-gray-600 mb-4 font-['Space_Grotesk'] line-clamp-2">
                                    {category.description}
                                  </p>
                                )}

                                {/* Explore Link */}
                                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200">
                                  <span className="text-sm text-gray-500 font-['Space_Grotesk']">
                                    Browse Collection
                                  </span>
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
                    );
                  })
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-20 col-span-full"
                  >
                    <p className="text-gray-500 text-lg">
                      No categories available yet
                    </p>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      </div>

      <Footer />
    </PageTransition>
  );
}
