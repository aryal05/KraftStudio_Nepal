"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Heart, Share2, ChevronLeft, Check, ShoppingCart, Truck, Shield, RotateCcw, Loader2 } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import { toast } from "sonner";

// Sample product data
const productsDB: Record<string, any> = {
  "1": {
    id: 1,
    name: "Modern Leather Sofa",
    slug: "modern-leather-sofa",
    price: 129900,
    originalPrice: 159900,
    rating: 450,
    reviewCount: 128,
    inStock: 1,
    stockQuantity: 15,
    category: "furniture",
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=600&fit=crop",
    ],
    description: "A luxurious modern leather sofa that combines comfort with contemporary design. Perfect for living rooms, this sofa features premium leather upholstery, sturdy wooden legs, and plush cushioning for ultimate relaxation.",
    shortDescription: "Luxurious modern leather sofa with premium upholstery and plush cushioning."
  },
  "2": {
    id: 2,
    name: "Industrial Pendant Light",
    slug: "industrial-pendant-light",
    price: 18900,
    originalPrice: 22900,
    rating: 420,
    reviewCount: 89,
    inStock: 1,
    stockQuantity: 25,
    category: "lighting",
    imageUrl: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=800&h=600&fit=crop",
    ],
    description: "An industrial-style pendant light that adds character to any space. Features a metal shade, adjustable height, and warm LED lighting perfect for dining areas or kitchen islands.",
    shortDescription: "Industrial-style pendant light with metal shade and warm LED lighting."
  },
  "3": {
    id: 3,
    name: "Scandinavian Bookshelf",
    slug: "scandinavian-bookshelf",
    price: 69900,
    originalPrice: 84900,
    rating: 480,
    reviewCount: 156,
    inStock: 1,
    stockQuantity: 8,
    category: "furniture",
    imageUrl: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=600&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop",
    ],
    description: "A minimalist Scandinavian bookshelf with clean lines and natural wood finish. Perfect for displaying books, plants, and decorative items while maintaining a clutter-free aesthetic.",
    shortDescription: "Minimalist Scandinavian bookshelf with clean lines and natural wood finish."
  }
};

// Helper function to parse gallery images
function parseGalleryImages(galleryImages: string[] | string | null): string[] {
  if (!galleryImages) return [];
  if (Array.isArray(galleryImages)) return galleryImages;
  try {
    const parsed = JSON.parse(galleryImages);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

// Helper function to format price from cents
function formatPrice(cents: number): string {
  return (cents / 100).toLocaleString('en-NP');
}

// Helper function to format rating from 0-500 to 0-5.0
function formatRating(rating: number | null): number {
  if (!rating) return 0;
  return rating / 100;
}

export default function ProductDetail({ productId }: { productId: string }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<any>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load product data on mount or when productId changes
  useEffect(() => {
    setIsLoading(true);
    
    // Get product by ID
    const foundProduct = productsDB[productId] || productsDB["1"];
    
    setProduct(foundProduct);
    
    // Load related products (sample data)
    if (foundProduct) {
      const related = Object.values(productsDB)
        .filter((p: any) => p.id !== foundProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
    }
    
    setIsLoading(false);
    setSelectedImage(0);
  }, [productId]);

  // Parse gallery images
  const galleryImages = product ? parseGalleryImages(product.galleryImages) : [];
  const allImages = product?.imageUrl 
    ? [product.imageUrl, ...galleryImages]
    : galleryImages;

  const handleAddToCart = async () => {
    if (!product) return;
    toast.success("Added to cart!");
  };

  // Loading state
  if (isLoading) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-white pt-20">
          <Navigation />
          <div className="flex items-center justify-center min-h-[60vh]">
            <Loader2 className="w-12 h-12 animate-spin text-gray-900" />
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  // Error or not found state
  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-screen bg-white pt-20">
          <Navigation />
          <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
            <h1 className="font-serif text-3xl font-semibold text-gray-900 mb-4">
              Product Not Found
            </h1>
            <p className="text-gray-600 mb-8">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/furniture">
              <Button>Back to Products</Button>
            </Link>
          </div>
          <Footer />
        </div>
      </PageTransition>
    );
  }

  const formattedPrice = formatPrice(product.price);
  const formattedOriginalPrice = product.originalPrice ? formatPrice(product.originalPrice) : null;
  const savings = product.originalPrice ? formatPrice(product.originalPrice - product.price) : null;
  const rating = formatRating(product.rating);
  const isInStock = product.inStock === 1;

  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        <Navigation />

        {/* Breadcrumb */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link href="/furniture">
              <motion.div
                whileHover={{ x: -5 }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to Furniture
              </motion.div>
            </Link>
          </div>
        </div>

        {/* Product Section */}
        <section className="py-12">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Image Gallery */}
              <AnimatedSection direction="left">
                <div className="sticky top-24">
                  {/* Main Image */}
                  <motion.div
                    key={selectedImage}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 rounded-2xl overflow-hidden bg-gray-100"
                  >
                    {allImages.length > 0 ? (
                      <img
                        src={allImages[selectedImage]}
                        alt={product.name}
                        className="w-full h-[600px] object-cover"
                      />
                    ) : (
                      <div className="w-full h-[600px] flex items-center justify-center bg-gray-200">
                        <p className="text-gray-400">No image available</p>
                      </div>
                    )}
                  </motion.div>

                  {/* Thumbnail Grid */}
                  {allImages.length > 1 && (
                    <div className="grid grid-cols-4 gap-4">
                      {allImages.map((image, index) => (
                        <motion.button
                          key={index}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setSelectedImage(index)}
                          className={`rounded-xl overflow-hidden border-2 transition-all ${
                            selectedImage === index
                              ? "border-gray-900 shadow-lg"
                              : "border-gray-200 hover:border-gray-400"
                          }`}
                        >
                          <img
                            src={image}
                            alt={`View ${index + 1}`}
                            className="w-full h-24 object-cover"
                          />
                        </motion.button>
                      ))}
                    </div>
                  )}
                </div>
              </AnimatedSection>

              {/* Product Info */}
              <AnimatedSection direction="right">
                <div>
                  {/* Product Title */}
                  <h1 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4 leading-tight">
                    {product.name}
                  </h1>

                  {/* Rating */}
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-gray-200">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(rating)
                              ? "fill-gray-900 text-gray-900"
                              : "fill-gray-300 text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600 font-medium">
                      {rating.toFixed(1)} ({product.reviewCount || 0} reviews)
                    </span>
                  </div>

                  {/* Price */}
                  <div className="flex items-center gap-4 mb-8">
                    <span className="font-serif text-5xl font-semibold text-gray-900">
                      NPR {formattedPrice}
                    </span>
                    {formattedOriginalPrice && savings && (
                      <div className="flex flex-col">
                        <span className="text-xl text-gray-500 line-through">
                          NPR {formattedOriginalPrice}
                        </span>
                        <span className="text-sm text-green-600 font-semibold">
                          Save NPR {savings}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Stock Status */}
                  <div className="mb-8">
                    {isInStock ? (
                      <p className="flex items-center gap-2 text-green-600 font-semibold">
                        <Check className="w-5 h-5" />
                        In Stock ({product.stockQuantity} available)
                      </p>
                    ) : (
                      <p className="text-red-600 font-semibold">Out of Stock</p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                    {product.description || product.shortDescription || "No description available."}
                  </p>

                  {/* Quantity Selector */}
                  <div className="flex items-center gap-6 mb-8">
                    <span className="text-gray-900 font-semibold text-lg">
                      Quantity:
                    </span>
                    <div className="flex items-center border-2 border-gray-300 rounded-xl overflow-hidden">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-6 py-3 hover:bg-gray-100 transition-colors text-lg font-semibold"
                      >
                        −
                      </motion.button>
                      <span className="px-8 py-3 font-semibold text-lg min-w-[60px] text-center">
                        {quantity}
                      </span>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() =>
                          setQuantity(
                            Math.min(product.stockQuantity, quantity + 1)
                          )
                        }
                        className="px-6 py-3 hover:bg-gray-100 transition-colors text-lg font-semibold"
                        disabled={!isInStock}
                      >
                        +
                      </motion.button>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-4 mb-8">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        size="lg"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white py-6 text-lg font-medium tracking-wide"
                        onClick={handleAddToCart}
                        disabled={!isInStock}
                      >
                        <ShoppingCart className="w-5 h-5 mr-2" />
                        ADD TO CART
                      </Button>
                    </motion.div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full py-6 text-lg font-medium tracking-wide"
                        asChild
                      >
                        <Link href="/booking">
                          BOOK A CONSULTATION
                        </Link>
                      </Button>
                    </motion.div>
                  </div>

                  {/* Wishlist & Share */}
                  <div className="flex items-center gap-4 pt-8 border-t border-gray-200">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setIsWishlisted(!isWishlisted)}
                      className={`p-3 rounded-full transition-all ${
                        isWishlisted
                          ? "bg-red-50 text-red-600"
                          : "bg-gray-100 hover:bg-gray-200 text-gray-600"
                      }`}
                    >
                      <Heart
                        className={`w-6 h-6 ${isWishlisted ? "fill-current" : ""}`}
                      />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                      onClick={() => {
                        navigator.clipboard.writeText(window.location.href);
                        toast.success("Link copied to clipboard!");
                      }}
                    >
                      <Share2 className="w-6 h-6 text-gray-600" />
                    </motion.button>
                  </div>

                  {/* Service Icons */}
                  <div className="mt-10 pt-8 border-t border-gray-200 grid grid-cols-3 gap-6">
                    <div className="text-center">
                      <Truck className="w-8 h-8 mx-auto mb-2 text-gray-900" />
                      <p className="text-sm font-medium text-gray-900">Free Delivery</p>
                      <p className="text-xs text-gray-600">On orders over NPR 50,000</p>
                    </div>
                    <div className="text-center">
                      <Shield className="w-8 h-8 mx-auto mb-2 text-gray-900" />
                      <p className="text-sm font-medium text-gray-900">Quality Guaranteed</p>
                      <p className="text-xs text-gray-600">Premium products</p>
                    </div>
                    <div className="text-center">
                      <RotateCcw className="w-8 h-8 mx-auto mb-2 text-gray-900" />
                      <p className="text-sm font-medium text-gray-900">Easy Returns</p>
                      <p className="text-xs text-gray-600">30 day policy</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Related Products */}
            {relatedProducts.length > 0 && (
              <AnimatedSection className="mt-24 pt-16 border-t border-gray-200">
                <div className="text-center mb-12">
                  <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-4">
                    Similar Products
                  </h2>
                  <p className="text-gray-600 text-lg">
                    Products that pair perfectly with your selection
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {relatedProducts.map((relatedProduct, index) => {
                    const relatedPrice = formatPrice(relatedProduct.price);
                    const relatedRating = formatRating(relatedProduct.rating);
                    return (
                      <motion.div
                        key={relatedProduct.id}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link href={`/product/${relatedProduct.id}`}>
                          <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="group block"
                          >
                            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-0">
                              <div className="relative h-64 overflow-hidden bg-gray-100">
                                {relatedProduct.imageUrl ? (
                                  <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    src={relatedProduct.imageUrl}
                                    alt={relatedProduct.name}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <div className="w-full h-full flex items-center justify-center">
                                    <p className="text-gray-400">No image</p>
                                  </div>
                                )}
                              </div>
                              <div className="p-6">
                                <h3 className="font-serif font-semibold text-gray-900 mb-3 text-lg">
                                  {relatedProduct.name}
                                </h3>
                                <div className="flex items-center justify-between">
                                  <span className="font-serif text-xl font-semibold text-gray-900">
                                    NPR {relatedPrice}
                                  </span>
                                  <div className="flex items-center gap-1">
                                    <Star className="w-4 h-4 fill-gray-900 text-gray-900" />
                                    <span className="text-sm text-gray-600 font-medium">
                                      {relatedRating.toFixed(1)}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>
              </AnimatedSection>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
