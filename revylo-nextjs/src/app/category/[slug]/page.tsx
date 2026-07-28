"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight, Grid, List } from "lucide-react";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const { data: category, isLoading: isCategoryLoading } = trpc.categories.getBySlug.useQuery({ slug });
  const { data: products = [] } = trpc.products.getByCategorySlug.useQuery({ slug });

  if (isCategoryLoading) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading category...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!category) {
    return (
      <>
        <Navigation />
        <main className="min-h-screen pt-32 pb-20 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4">
              Category Not Found
            </h1>
            <Link href="/">
              <Button>Back to Home</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      
      <main className="min-h-screen pt-32 pb-20 lg:pt-24 lg:pb-16">
        {/* Breadcrumb */}
        <section className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href="/categories" className="hover:text-gray-900">Categories</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium">{category.name}</span>
          </div>
        </section>

        {/* Category Header */}
        <section className="max-w-7xl mx-auto px-6 mb-16">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-5xl font-serif font-bold text-gray-900 mb-6">
                {category.name}
              </h1>
              {category.description && (
                <p className="text-lg text-gray-600 mb-6">
                  {category.description}
                </p>
              )}
              <div className="flex items-center gap-4">
                <span className="text-gray-600">
                  {products.length} {products.length === 1 ? 'Product' : 'Products'}
                </span>
                <div className="flex items-center gap-2 ml-auto">
                  <Button
                    size="sm"
                    variant={viewMode === "grid" ? "default" : "outline"}
                    onClick={() => setViewMode("grid")}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant={viewMode === "list" ? "default" : "outline"}
                    onClick={() => setViewMode("list")}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Category Image */}
            {category.imageUrl && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="relative h-96 rounded-2xl overflow-hidden shadow-2xl"
              >
                <img
                  src={category.imageUrl}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400'%3E%3Crect fill='%23f0f0f0' width='600' height='400'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24'%3ENo Image%3C/text%3E%3C/svg%3E";
                  }}
                />
              </motion.div>
            )}
          </div>
        </section>

        {/* Products Grid */}
        <section className="max-w-7xl mx-auto px-6">
          {products.length > 0 ? (
            <div className={
              viewMode === "grid"
                ? "grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-6"
            }>
              {products.map((product: any, index: number) => (
                <Link key={product.id} href={`/product/${product.slug || product.id}`}>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.05 }}
                    whileHover={{ y: -4 }}
                    className={`group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all ${
                      viewMode === "list" ? "flex gap-6" : ""
                    }`}
                  >
                    {/* Product Image */}
                    <div className={`relative bg-gray-100 overflow-hidden ${
                      viewMode === "list" ? "w-48 h-48" : "h-64"
                    }`}>
                      {product.colors && product.colors.length > 0 && product.colors[0].images?.[0] ? (
                        <img
                          src={product.colors[0].images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <span className="text-2xl text-gray-400">{product.name.charAt(0)}</span>
                        </div>
                      )}
                      
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                          <span className="text-white font-medium">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className={viewMode === "list" ? "flex-1 p-6" : "p-4"}>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-gray-700 transition-colors">
                        {product.name}
                      </h3>
                      
                      {product.shortDescription && viewMode === "list" && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                          {product.shortDescription}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-gray-900">
                            NPR {(product.price / 100).toFixed(2)}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              NPR {(product.originalPrice / 100).toFixed(2)}
                            </span>
                          )}
                        </div>
                        
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex gap-1">
                            {product.colors.slice(0, 3).map((color: any, i: number) => (
                              <div
                                key={i}
                                className="w-4 h-4 rounded-full border border-gray-300"
                                style={{ backgroundColor: color.hex }}
                                title={color.name}
                              />
                            ))}
                            {product.colors.length > 3 && (
                              <span className="text-xs text-gray-500">
                                +{product.colors.length - 3}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-gray-500 text-lg mb-4">
                No products in this category yet
              </p>
              <Link href="/categories">
                <Button>Browse Other Categories</Button>
              </Link>
            </motion.div>
          )}
        </section>
      </main>

      <Footer />
    </>
  );
}
