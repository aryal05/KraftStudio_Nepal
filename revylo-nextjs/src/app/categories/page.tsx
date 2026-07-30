"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowRight, 
  Grid3x3, 
  LayoutGrid,
  Sparkles,
  ChevronDown
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedFilter, setSelectedFilter] = useState("All");

  // Calculate product counts manually from all products
  const productCounts = useMemo(() => {
    return categories.reduce((acc: any, category: any) => {
      const count = allProducts.filter((p: any) => p.categoryId === category.id).length;
      acc[category.id] = count;
      return acc;
    }, {});
  }, [categories, allProducts]);

  // Create dynamic filter tabs based on categories
  const categoryFilters = useMemo(() => [
    { name: "All", count: categories.length },
    ...categories.map((cat: any) => ({
      name: cat.name,
      count: productCounts[cat.id] || 0
    }))
  ], [categories, productCounts]);

  // Filter categories based on selected filter
  const filteredCategories = useMemo(() => {
    if (selectedFilter === "All") return [...categories];
    return categories.filter((cat: any) => cat.name === selectedFilter);
  }, [categories, selectedFilter]);

  // Sort categories
  const sortedCategories = useMemo(() => {
    return [...filteredCategories].sort((a: any, b: any) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "products") return (productCounts[b.id] || 0) - (productCounts[a.id] || 0);
      return 0;
    });
  }, [filteredCategories, sortBy, productCounts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

        {/* Hero Section */}
        <section className="relative h-[70vh] min-h-[500px] flex items-center justify-center overflow-hidden bg-gray-900 pt-20">
          {/* Background Image */}
          <div className="absolute inset-0 bg-gray-900">
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1080&fit=crop"
              alt="Categories collection"
              className="w-full h-full object-cover opacity-30"
              loading="eager"
            />
          </div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-transparent to-gray-900/70" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center py-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-white text-sm mb-8">
            <Sparkles className="w-4 h-4" />
            <span className="tracking-wide font-['Syne']">EXPLORE OUR COLLECTION</span>
          </div>

          <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight font-['DM_Serif_Display']">
            Categories
          </div>

          <p className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto font-['Space_Grotesk'] px-4">
            Explore our curated collection of furniture, lighting, and decor
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Link href="#categories">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 font-['Syne']">
                EXPLORE COLLECTION
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-gray-900 px-8 py-6 font-['Syne']">
              DESIGN CONSULTATION
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <ChevronDown className="w-8 h-8 text-white/70" />
        </div>
      </section>

      {/* Category Filter Pills */}
      <section className="py-6 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0">
            {categoryFilters.map((filter) => (
              <button
                key={filter.name}
                onClick={() => setSelectedFilter(filter.name)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-full font-medium whitespace-nowrap font-['Syne'] flex-shrink-0 ${
                  selectedFilter === filter.name
                    ? "bg-gray-900 text-white shadow-lg"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                <Grid3x3 className="w-4 h-4" />
                <span className="text-sm sm:text-base">{filter.name}</span>
                <Badge variant="secondary" className="ml-1 text-xs">
                  {filter.count}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section id="categories" className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          {/* Toolbar */}
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

          {/* Categories Grid */}
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "flex flex-col gap-6"
            }
          >
            {sortedCategories.length > 0 ? (
              sortedCategories.map((category: any) => {
                const productCount = productCounts[category.id] || 0;
                
                return (
                  <Link key={category.id} href={`/category/${category.slug}`}>
                    <div className="block h-full">
                      <Card className="overflow-hidden h-full flex flex-col bg-white border-0">
                        {/* Category Image */}
                        <div className="relative h-80 overflow-hidden bg-gray-100">
                          <img
                            src={category.imageUrl || "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop"}
                            alt={category.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=800&fit=crop";
                            }}
                          />
                          
                          {/* Product Count Badge */}
                          <div className="absolute top-4 left-4">
                            <Badge className="bg-white/95 text-gray-900 font-['Syne']">
                              {productCount} Products
                            </Badge>
                          </div>
                        </div>

                        {/* Category Info */}
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-xl font-medium text-gray-900 mb-2 line-clamp-2 font-['Cormorant_Garamond']">
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
                            <div>
                              <ArrowRight className="w-5 h-5 text-gray-900" />
                            </div>
                          </div>
                        </div>
                      </Card>
                    </div>
                  </Link>
                );
              })
            ) : (
              <div className="text-center py-20 col-span-full">
                <p className="text-gray-500 text-lg">
                  No categories available yet
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
