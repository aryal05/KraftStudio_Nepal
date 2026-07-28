"use client";

import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Star, TrendingUp, Award, Sparkles } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import { DroppingLetters, WalkingText, FloatingText } from "@/lib/animations";
import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";

const fadeInUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.3,
    },
  },
};

// Smooth fade in/out looping animation with direction change
const FadeLoopText = ({ 
  texts, 
  className = "", 
  duration = 4 
}: { 
  texts: string[]; 
  className?: string; 
  duration?: number 
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(prev => Math.random() > 0.5 ? 'forward' : 'backward');
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, duration * 1000);

    return () => clearInterval(interval);
  }, [texts.length, duration]);

  return (
    <div className={`relative ${className}`} style={{ minHeight: '1em' }}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ 
            opacity: 0, 
            x: direction === 'forward' ? 100 : -100,
            filter: 'blur(10px)'
          }}
          animate={{ 
            opacity: 1, 
            x: 0,
            filter: 'blur(0px)'
          }}
          exit={{ 
            opacity: 0, 
            x: direction === 'forward' ? -100 : 100,
            filter: 'blur(10px)'
          }}
          transition={{ 
            duration: 1.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="absolute inset-0 flex items-center justify-center whitespace-nowrap"
        >
          {texts[currentIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Fetch featured categories from database
  const { data: featuredCategories = [] } = trpc.categories.getFeatured.useQuery({ limit: 3 });

  // Fetch color swatches and reviews from database
  const { data: colorSwatches = [] } = trpc.colorSwatches.getAll.useQuery();
  const { data: reviews = [] } = trpc.reviews.getAll.useQuery();

  // Debug logging
  console.log("Featured categories on frontend:", featuredCategories);
  console.log("Featured categories count:", featuredCategories.length);

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navigation />

      {/* Hero Section - Full Width with Parallax */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax */}
        <motion.div
          style={{ y: heroY }}
          className="absolute inset-0 bg-cover bg-center scale-110"
        >
          <div
            className="w-full h-full bg-cover bg-center"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop&q=80')",
            }}
          />
        </motion.div>

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />

        {/* Animated Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-6 text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <WalkingText text="NEW COLLECTION 2026" className="tracking-wide text-sm font-['Space_Grotesk']" />
            </motion.div>

            {/* Floating Hero Text with Dropping Animation */}
            <FloatingText duration={4} distance={15}>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light text-white mb-4 leading-tight tracking-tight font-['DM_Serif_Display'] px-4 overflow-hidden">
                <DroppingLetters
                  text="Elevate Your Space"
                  delay={0.3}
                />
              </div>
              <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-normal text-white mb-8 leading-tight tracking-tight font-['DM_Serif_Display'] px-4 overflow-hidden">
                <DroppingLetters
                  text="with Timeless Design"
                  delay={0.9}
                />
              </div>
            </FloatingText>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 2 }}
              className="text-base sm:text-lg md:text-xl text-white/95 mb-10 leading-relaxed max-w-3xl mx-auto font-['Space_Grotesk'] px-4"
            >
              <WalkingText 
                text="Discover our curated collection of contemporary furniture and home decor designed for the modern lifestyle." 
                delay={2.2}
              />
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/furniture">
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 px-10 py-6 text-base font-medium tracking-wide shadow-2xl font-['Syne']"
                  >
                    <span className="flex items-center gap-2">
                      EXPLORE COLLECTION
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </Link>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href="/about">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-gray-900 px-10 py-6 text-base font-medium tracking-wide font-['Syne']"
                  >
                    LEARN MORE
                  </Button>
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full p-1"
          >
            <motion.div className="w-1 h-2 bg-white/80 rounded-full mx-auto" />
          </motion.div>
        </motion.div>
        </motion.div>
      </section>

      {/* Category Showcase Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 font-['Cormorant_Garamond']">
              Shop by Category
            </h2>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-lg font-['Space_Grotesk']"
            >
              <WalkingText text="Explore our carefully curated collections" delay={0.6} />
            </motion.div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredCategories.length > 0 ? (
              featuredCategories.map((cat: any, index: number) => (
                <motion.div
                  key={cat.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/category/${cat.slug}`}>
                    <motion.div
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="group block"
                    >
                      <Card className="overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 bg-white">
                        <div className="relative h-72 overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            src={cat.imageUrl || "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop&q=80"}
                            alt={cat.name}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop&q=80";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-8 bg-white">
                          <h3 className="text-2xl font-normal text-gray-900 mb-3 font-['Cormorant_Garamond']">
                            {cat.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-5 leading-relaxed font-['Space_Grotesk']">
                            {cat.description || "Explore our collection"}
                          </p>
                          <div className="flex items-center text-gray-900 font-medium text-sm group-hover:gap-3 gap-2 transition-all font-['Syne']">
                            Explore Collection
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </motion.div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <p className="text-gray-500">No featured categories available</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <AnimatedSection delay={0.1}>
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6"
                >
                  <TrendingUp className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 mb-3 font-['Syne']">
                  <WalkingText text="Premium Quality" />
                </h3>
                <p className="text-gray-600 leading-relaxed font-['Space_Grotesk']">
                  Hand-selected materials and expert craftsmanship in every piece
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6"
                >
                  <Award className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 mb-3 font-['Syne']">
                  <WalkingText text="Award Winning Design" />
                </h3>
                <p className="text-gray-600 leading-relaxed font-['Space_Grotesk']">
                  Internationally recognized designs that stand the test of time
                </p>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center p-8 rounded-2xl hover:bg-gray-50 transition-all duration-300"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-full mb-6"
                >
                  <Sparkles className="w-8 h-8" />
                </motion.div>
                <h3 className="text-xl font-medium text-gray-900 mb-3 font-['Syne']">
                  <WalkingText text="Personalized Service" />
                </h3>
                <p className="text-gray-600 leading-relaxed font-['Space_Grotesk']">
                  Expert consultations to bring your vision to life
                </p>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Contemporary Furniture Section */}
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        {/* Background decoration image */}
        <div className="absolute inset-0 opacity-10">
          <img 
            src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=1920&h=1080&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-4xl md:text-5xl font-light mb-2 leading-tight font-['DM_Serif_Display']">
                Contemporary Furniture
              </h2>
              <h2 className="text-4xl md:text-5xl font-normal mb-6 leading-tight font-['DM_Serif_Display']">
                & Home Decor
              </h2>
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="text-gray-300 text-lg leading-relaxed mb-8 font-['Space_Grotesk']"
              >
                REVYLO provides furniture and design solutions for modern homes and
                workspaces. Our collection merges minimalist aesthetics with functional
                excellence, creating spaces that inspire.
              </motion.p>
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
              >
                <Link href="/furniture">
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 text-base font-medium tracking-wide font-['Syne']"
                  >
                    <span className="flex items-center gap-2">
                      Browse All Products
                      <ArrowRight className="w-5 h-5" />
                    </span>
                  </Button>
                </Link>
              </motion.div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="grid grid-cols-3 gap-6">
              {colorSwatches.length > 0 ? (
                colorSwatches.map((swatch: any, index: number) => (
                  <motion.div
                    key={swatch.id}
                    initial={{ opacity: 0, y: 50, rotate: -10 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: index * 0.2,
                      type: "spring",
                      stiffness: 100,
                      damping: 10
                    }}
                    whileHover={{ y: -10, scale: 1.05 }}
                    className="text-center"
                  >
                    <div
                      className="w-full h-48 rounded-xl mb-4 shadow-2xl cursor-pointer"
                      style={{ backgroundColor: swatch.color }}
                    />
                    <h3 className="text-sm font-normal text-white mb-2 font-['Cormorant_Garamond']">
                      {swatch.name}
                    </h3>
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(swatch.rating / 10)
                              ? "fill-white text-white"
                              : "text-gray-600"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-400 mt-1 font-['Space_Grotesk']">
                      {swatch.reviews} reviews
                    </p>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-400">No color swatches available</p>
                </div>
              )}
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-light text-gray-900 mb-4 font-['Cormorant_Garamond']">
              What Our Clients Say
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 text-lg font-['Space_Grotesk']"
            >
              <WalkingText text="Hear from satisfied customers about their experience" delay={0.6} />
            </motion.p>
          </AnimatedSection>

          {/* Marquee Container - Infinite Scroll */}
          <div className="relative overflow-hidden">
            <motion.div
              className="flex gap-8"
              animate={{
                x: [0, -50 * reviews.length * 6]
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 40,
                  ease: "linear",
                },
              }}
              whileHover={{ animationPlayState: "paused" }}
            >
              {/* Show unique reviews only */}
              {reviews.length > 0 ? (
                reviews.map((review: any) => (
                  <motion.div
                    key={review.id}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 w-[400px]"
                  >
                    <Card className="p-8 border-0 shadow-md hover:shadow-xl transition-all duration-500 h-full bg-white">
                      <div className="flex gap-1 mb-6">
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
                      <p className="text-gray-700 mb-8 leading-relaxed text-base italic font-['Space_Grotesk']">
                        "{review.comment}"
                      </p>
                      <div className="flex items-center gap-4 pt-6 border-t border-gray-200">
                        <div className="w-14 h-14 rounded-full bg-[#2d4a3e] flex items-center justify-center text-white font-semibold text-lg">
                          {review.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900 font-['Syne']">
                            {review.name}
                          </p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <div className="w-full text-center py-12">
                  <p className="text-gray-500">No reviews yet</p>
                </div>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter Section - Commented Out */}
      {/*
      <section className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <img 
            src="https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=1920&h=800&fit=crop&q=80"
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <AnimatedSection>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
            >
              <Sparkles className="w-12 h-12 mx-auto mb-6 text-white" />
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-light mb-6 font-['DM_Serif_Display']">
              Stay Inspired
            </h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="text-gray-300 text-lg mb-10 leading-relaxed font-['Space_Grotesk']"
            >
              <WalkingText 
                text="Subscribe to our newsletter for the latest furniture trends, design tips, and exclusive offers delivered to your inbox."
                delay={1}
              />
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.5 }}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-lg text-gray-900 bg-white focus:outline-none focus:ring-2 focus:ring-white text-base font-['Space_Grotesk']"
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-medium text-base w-full sm:w-auto font-['Syne']">
                  Subscribe
                </Button>
              </motion.div>
            </motion.div>
          </AnimatedSection>
        </div>
      </section>
      */}

        <Footer />
      </div>
    </PageTransition>
  );
}
