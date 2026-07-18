"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { DroppingLetters, WalkingText, FloatingText } from "@/lib/animations";
import { Sparkles, ChevronDown } from "lucide-react";
import { formatNPR } from "@/lib/utils";

// Mock cart data
const mockCartItems = [
  {
    id: 1,
    productId: 1,
    name: "Modern Leather Sofa",
    shortDescription: "Premium leather sofa with contemporary design",
    price: 1299,
    imageUrl: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    quantity: 1,
  },
  {
    id: 2,
    productId: 2,
    name: "Minimalist Armchair",
    shortDescription: "Scandinavian style armchair",
    price: 599,
    imageUrl: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop",
    quantity: 2,
  },
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(mockCartItems);

  const handleRemoveItem = (cartItemId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleUpdateQuantity = (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === cartItemId ? { ...item, quantity } : item
      )
    );
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section className="relative h-[40vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&h=1080&fit=crop&q=80"
              alt="Cart hero"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-transparent to-gray-900/70" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center py-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <WalkingText text="SHOPPING CART" className="tracking-wide font-['Syne']" />
            </motion.div>

            <FloatingText duration={4} distance={12}>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight font-['DM_Serif_Display'] overflow-hidden">
                <DroppingLetters text="Your Cart" delay={0.4} />
              </div>
            </FloatingText>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
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

        {/* Cart Content */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            {cartItems.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-20"
              >
                <p className="text-2xl text-gray-600 mb-8 font-['Space_Grotesk']">
                  Your cart is empty
                </p>
                <Link href="/furniture">
                  <Button className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-base font-medium font-['Syne']">
                    CONTINUE SHOPPING
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Cart Items */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="lg:col-span-2"
                >
                  <div className="space-y-6">
                    <AnimatePresence>
                      {cartItems.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="p-6 flex gap-6 bg-white shadow-md border-0">
                            {/* Product Image */}
                            <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gray-200">
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                className="w-full h-full object-cover"
                              />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1">
                              <h3 className="font-serif font-bold text-gray-900 mb-2 font-['Cormorant_Garamond']">
                                {item.name}
                              </h3>
                              <p className="text-gray-600 text-sm mb-4 font-['Space_Grotesk']">
                                {item.shortDescription}
                              </p>
                              <p className="font-serif text-lg font-bold text-gray-900 font-['Cormorant_Garamond']">
                                {formatNPR(item.price)}
                              </p>
                            </div>

                            {/* Quantity and Actions */}
                            <div className="flex flex-col items-end justify-between">
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-red-600"
                              >
                                <Trash2 className="w-5 h-5" />
                              </button>

                              {/* Quantity Controls */}
                              <div className="flex items-center border border-gray-300 rounded-lg">
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item.id, item.quantity - 1)
                                  }
                                  className="px-3 py-1 hover:bg-gray-100 transition-colors font-['Space_Grotesk']"
                                >
                                  −
                                </button>
                                <span className="px-4 py-1 font-semibold font-['Space_Grotesk']">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() =>
                                    handleUpdateQuantity(item.id, item.quantity + 1)
                                  }
                                  className="px-3 py-1 hover:bg-gray-100 transition-colors font-['Space_Grotesk']"
                                >
                                  +
                                </button>
                              </div>

                              {/* Line Total */}
                              <p className="font-serif font-bold text-gray-900 font-['Cormorant_Garamond']">
                                {formatNPR(item.price * item.quantity)}
                              </p>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Continue Shopping */}
                  <div className="mt-8">
                    <Link href="/furniture">
                      <motion.div className="flex items-center gap-2 text-gray-900 hover:text-gray-700 transition-colors cursor-pointer">
                        <ArrowLeft className="w-4 h-4" />
                        <span className="font-['Space_Grotesk']">Continue Shopping</span>
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>

                {/* Order Summary */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <Card className="p-8 sticky top-24 bg-white shadow-lg border-0">
                    <h2 className="font-serif text-2xl font-bold text-gray-900 mb-8 font-['Cormorant_Garamond']">
                      Order Summary
                    </h2>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between text-gray-900 font-['Space_Grotesk']">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-900 font-['Space_Grotesk']">
                        <span>Shipping</span>
                        <span>FREE</span>
                      </div>
                      <div className="flex justify-between text-gray-900 font-['Space_Grotesk']">
                        <span>Tax (10%)</span>
                        <span>${tax.toFixed(2)}</span>
                      </div>
                      <div className="border-t border-gray-200 pt-4 flex justify-between font-serif text-xl font-bold text-gray-900 font-['Cormorant_Garamond']">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        size="lg"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-base font-medium mb-4 font-['Syne']"
                      >
                        PROCEED TO CHECKOUT
                      </Button>
                    </motion.div>

                    <Link href="/furniture">
                      <Button
                        size="lg"
                        variant="outline"
                        className="w-full font-['Syne']"
                      >
                        CONTINUE SHOPPING
                      </Button>
                    </Link>

                    {/* Trust Badges */}
                    <div className="mt-8 pt-8 border-t border-gray-200 space-y-4 text-sm text-gray-600 font-['Space_Grotesk']">
                      <div className="flex items-start gap-3">
                        <span className="text-lg">✓</span>
                        <span>Free shipping on orders over $100</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-lg">✓</span>
                        <span>30-day money-back guarantee</span>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="text-lg">✓</span>
                        <span>Secure checkout with SSL encryption</span>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
