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
import { trpc } from "@/lib/trpc";

// Helper function to parse gallery images from colors array
function parseGalleryImages(colors: any[] | null): string[] {
  if (!colors || colors.length === 0) return [];
  if (colors[0] && colors[0].images && Array.isArray(colors[0].images)) {
    return colors[0].images;
  }
  return [];
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

export default function ProductDetail({ productSlug }: { productSlug: string }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<any>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewForm, setReviewForm] = useState({
    name: '',
    email: '',
    rating: 5,
    comment: ''
  });

  // Check if the slug is actually a numeric ID
  const isNumericId = /^\d+$/.test(productSlug);
  const productId = isNumericId ? parseInt(productSlug) : null;

  const { data: dbProduct, isLoading: isProductLoading } = isNumericId
    ? trpc.products.getById.useQuery({ id: productId! }, { enabled: !!productId })
    : trpc.products.getBySlug.useQuery({ slug: productSlug }, { enabled: !!productSlug });

  const { data: dbProducts = [] } = trpc.products.getAll.useQuery({ limit: 100 });
  const { data: categories = [] } = trpc.categories.getAll.useQuery();
  const { data: reviews = [] } = trpc.reviews.getByProduct.useQuery(
    { productId: product?.id || 0 },
    { enabled: !!product?.id }
  );
  const createReviewMutation = trpc.reviews.create.useMutation();

  // Load product data when dbProduct changes
  useEffect(() => {
    if (dbProduct) {
      setProduct(dbProduct);
      
      // Load related products from same category
      const related = dbProducts
        .filter((p: any) => p.categoryId === dbProduct.categoryId && p.id !== dbProduct.id)
        .slice(0, 4);
      setRelatedProducts(related);
      
      setIsLoading(false);
    } else if (!isProductLoading) {
      setIsLoading(false);
    }
  }, [dbProduct, dbProducts, isProductLoading]);

  // Parse gallery images
  const galleryImages = product ? parseGalleryImages(product.colors) : [];
  const allImages = galleryImages.length > 0 ? galleryImages : [];

  const handleAddToCart = async () => {
    if (!product) return;
    toast.success("Added to cart!");
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    try {
      await createReviewMutation.mutateAsync({
        productId: product.id,
        name: reviewForm.name,
        email: reviewForm.email,
        rating: reviewForm.rating,
        comment: reviewForm.comment,
      });
      toast.success("Review submitted! It will be visible after approval.");
      setShowReviewForm(false);
      setReviewForm({ name: '', email: '', rating: 5, comment: '' });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit review");
    }
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
  const formattedOriginalPrice = null; // No originalPrice in database schema
  const savings = null;
  // Calculate average rating from reviews
  const avgRating = reviews.length > 0
    ? reviews.reduce((sum: number, r: any) => sum + (r.rating / 10), 0) / reviews.length
    : formatRating(product.rating);
  const rating = avgRating;
  const isInStock = product.inStock;
  const categoryName = categories.find((c: any) => c.id === product.categoryId)?.name || 'Products';

  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        <Navigation />

        {/* Breadcrumb */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6 py-4">
            <Link href="/categories">
              <motion.div
                whileHover={{ x: -5 }}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                Back to {categoryName}
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
                      {rating.toFixed(1)} ({reviews.length} reviews)
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
                        Available
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
                        onClick={() => {
                          const message = `Hi, I'm interested in ${product.name}. Can you provide more details?`;
                          const whatsappUrl = `https://wa.me/9779769682175?text=${encodeURIComponent(message)}`;
                          window.open(whatsappUrl, '_blank');
                        }}
                        disabled={!isInStock}
                      >
                        BOOK NOW
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
                        <Link href={`/product/${relatedProduct.slug || relatedProduct.id}`}>
                          <motion.div
                            whileHover={{ y: -8 }}
                            transition={{ duration: 0.3 }}
                            className="group block"
                          >
                            <Card className="overflow-hidden hover:shadow-xl transition-all duration-500 border-0">
                              <div className="relative h-64 overflow-hidden bg-gray-100">
                                {relatedProduct.colors && relatedProduct.colors.length > 0 && relatedProduct.colors[0].images?.[0] ? (
                                  <motion.img
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ duration: 0.6 }}
                                    src={relatedProduct.colors[0].images[0]}
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

            {/* Reviews Section */}
            <AnimatedSection className="mt-24 pt-16 border-t border-gray-200">
              <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-semibold text-gray-900">Customer Reviews</h3>
                    <p className="text-sm text-gray-500 mt-1">Reviews for: {product.name}</p>
                  </div>
                  <Button
                    onClick={() => setShowReviewForm(!showReviewForm)}
                    className="bg-[#2d4a3e] hover:bg-[#1e352b] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                  >
                    {showReviewForm ? 'Cancel' : 'Write a Review'}
                  </Button>
                </div>

                {showReviewForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="bg-gray-50 p-6 rounded-lg mb-6"
                  >
                    <form onSubmit={handleReviewSubmit} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                          <input
                            type="text"
                            required
                            value={reviewForm.name}
                            onChange={(e) => setReviewForm({ ...reviewForm, name: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder:text-gray-400"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                          <input
                            type="email"
                            required
                            value={reviewForm.email}
                            onChange={(e) => setReviewForm({ ...reviewForm, email: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder:text-gray-400"
                            placeholder="your@email.com"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                        <div className="flex items-center gap-2">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setReviewForm({ ...reviewForm, rating: star })}
                              className="focus:outline-none"
                            >
                              <Star
                                className={`w-6 h-6 ${
                                  star <= reviewForm.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Review</label>
                        <textarea
                          required
                          value={reviewForm.comment}
                          onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-900 focus:border-transparent placeholder:text-gray-400 resize-none"
                          placeholder="Share your experience with this product..."
                        />
                      </div>
                      <Button 
                        type="submit" 
                        className="w-full bg-[#2d4a3e] hover:bg-[#1e352b] text-white py-3 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                      >
                        Submit Review
                      </Button>
                    </form>
                  </motion.div>
                )}

                {reviews.length > 0 ? (
                  <div className="space-y-4">
                    {reviews.map((review: any) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-0">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= (review.rating / 10)
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="font-medium text-gray-900">{review.name}</span>
                        </div>
                        <p className="text-gray-600 text-sm">{review.comment}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
                )}
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
