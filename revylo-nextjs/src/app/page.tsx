"use client";

import { motion, useScroll, useTransform, useAnimationControls } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  ArrowRight, 
  Star, 
  Users,
  Clock,
  Heart,
  Sparkles,
  Compass,
  Palette,
  Hammer,
  Target,
  Leaf,
  ShieldCheck
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";

// Next.js page config
export const dynamic = 'force-dynamic';

export default function Home() {
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const [isMarquee1Paused, setIsMarquee1Paused] = useState(false);
  const [isMarquee2Paused, setIsMarquee2Paused] = useState(false);
  const [isMarquee3Paused, setIsMarquee3Paused] = useState(false);
  
  const marquee1Controls = useAnimationControls();
  const marquee2Controls = useAnimationControls();
  const marquee3Controls = useAnimationControls();

  useEffect(() => {
    if (isMarquee1Paused) {
      marquee1Controls.stop();
    } else {
      marquee1Controls.start({
        x: ["0%", "-100%"],
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 120,
          ease: "linear",
        },
      });
    }
  }, [isMarquee1Paused, marquee1Controls]);

  useEffect(() => {
    if (isMarquee2Paused) {
      marquee2Controls.stop();
    } else {
      marquee2Controls.start({
        x: ["0%", "-100%"],
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 140,
          ease: "linear",
        },
      });
    }
  }, [isMarquee2Paused, marquee2Controls]);

  useEffect(() => {
    if (isMarquee3Paused) {
      marquee3Controls.stop();
    } else {
      marquee3Controls.start({
        x: ["0%", "-100%"],
        transition: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 130,
          ease: "linear",
        },
      });
    }
  }, [isMarquee3Paused, marquee3Controls]);

  // Fetch data from database
  const { data: featuredCategories = [] } = trpc.categories.getFeatured.useQuery({ limit: 3 });
  const { data: colorSwatches = [] } = trpc.colorSwatches.getAll.useQuery();
  const { data: reviews = [] } = trpc.reviews.getAll.useQuery();

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* HERO SECTION - Bold Split Typography */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#f7f7f7]">
          {/* Background with Parallax */}
          <motion.div
            style={{ y: heroY }}
            className="absolute inset-0 scale-110"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage: "url('https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1920&h=1080&fit=crop&q=80')",
              }}
            />
          </motion.div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/70" />

          {/* Hero Content */}
          <motion.div
            style={{ opacity: heroOpacity }}
            className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center"
          >
            {/* Small Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-12"
            >
              <div className="flex items-center gap-3 px-5 py-3 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Compass className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-white text-sm tracking-[0.2em] font-['Syne'] font-medium">
                  DESIGN THAT FEELS BUILT
                </span>
              </div>
            </motion.div>

            {/* MASSIVE Split Typography with Interactive Effects */}
            <div className="mb-12 overflow-visible">
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -10, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.4 },
                  y: { 
                    duration: 4, 
                    delay: 1.5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.02,
                  textShadow: "0 0 30px rgba(255, 255, 255, 0.5)"
                }}
                className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.9] tracking-tight uppercase font-['DM_Serif_Display'] mb-4 cursor-default"
                style={{
                  background: "linear-gradient(to right, #ffffff 0%, #f0f0f0 50%, #ffffff 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% center", "100% center", "0% center"]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  style={{
                    background: "linear-gradient(90deg, #ffffff, #d4d4d4, #ffffff)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block"
                  }}
                >
                  ELEVATE YOUR
                </motion.span>
              </motion.h1>
              <motion.h1
                initial={{ opacity: 0, y: 100 }}
                animate={{ 
                  opacity: 1, 
                  y: [0, -10, 0]
                }}
                transition={{ 
                  opacity: { duration: 0.8, delay: 0.6 },
                  y: { 
                    duration: 4, 
                    delay: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{ 
                  scale: 1.02,
                  textShadow: "0 0 30px rgba(139, 115, 85, 0.8)"
                }}
                className="text-[clamp(3rem,15vw,12rem)] font-bold leading-[0.9] tracking-tight uppercase font-['DM_Serif_Display'] cursor-default"
                style={{
                  background: "linear-gradient(to right, #ffffff 0%, #8b7355 50%, #ffffff 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundSize: "200% auto",
                }}
              >
                <motion.span
                  animate={{
                    backgroundPosition: ["0% center", "100% center", "0% center"]
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                    delay: 0.5
                  }}
                  style={{
                    background: "linear-gradient(90deg, #ffffff, #8b7355, #ffffff)",
                    backgroundSize: "200% auto",
                    backgroundClip: "text",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    display: "inline-block"
                  }}
                >
                  LIVING SPACE
                </motion.span>
              </motion.h1>
            </div>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-white/90 text-xl md:text-2xl mb-12 max-w-2xl mx-auto font-['Space_Grotesk'] leading-relaxed"
            >
              Thoughtfully crafted furniture that transforms
              <br className="hidden md:block" />
              houses into homes
            </motion.p>

            {/* Primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.2 }}
            >
              <Link href="/categories">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-block"
                >
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-8 text-lg font-bold tracking-[0.1em] uppercase shadow-2xl font-['Syne'] rounded-none"
                  >
                    <span className="flex items-center gap-3">
                      EXPLORE COLLECTION
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 1 }}
              className="absolute bottom-12 left-1/2 -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-8 h-12 border-2 border-white/50 rounded-full p-2"
              >
                <motion.div className="w-2 h-2 bg-white/80 rounded-full mx-auto" />
              </motion.div>
            </motion.div>
          </motion.div>
        </section>

        {/* CATEGORIES SECTION - Right After Hero */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="text-6xl md:text-7xl font-bold text-gray-900 leading-[0.95] mb-6 uppercase font-['DM_Serif_Display']"
              >
                EXPLORE<br />
                <span className="text-[#8b7355]">OUR COLLECTIONS</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="text-gray-600 text-lg max-w-2xl mx-auto font-['Space_Grotesk']"
              >
                Curated collections for every room and every style
              </motion.p>
            </motion.div>

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredCategories.length > 0 ? (
                featuredCategories.map((cat: any, index: number) => (
                  <motion.div
                    key={cat.id}
                    initial={{ opacity: 0, y: 80, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ 
                      delay: index * 0.15, 
                      duration: 0.7,
                      type: "spring",
                      stiffness: 100
                    }}
                  >
                    <Link href={`/category/${cat.slug}`}>
                      <motion.div
                        whileHover={{ y: -12 }}
                        transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                        className="group relative overflow-hidden bg-white"
                      >
                        {/* Image Container */}
                        <div className="relative h-[400px] overflow-hidden">
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            src={cat.imageUrl || "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop&q=80"}
                            alt={cat.name}
                            className="w-full h-full object-cover rounded-none"
                            onError={(e) => {
                              e.currentTarget.src = "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop&q=80";
                            }}
                          />
                          
                          {/* Overlay on hover */}
                          <motion.div 
                            initial={{ opacity: 0 }}
                            whileHover={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                          />
                          
                          {/* Category Name Overlay */}
                          <motion.div 
                            className="absolute inset-0 flex items-end justify-center pb-8"
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <span className="text-white text-3xl font-bold uppercase font-['DM_Serif_Display'] tracking-wide">
                              {cat.name}
                            </span>
                          </motion.div>
                        </div>

                        {/* Content Below */}
                        <div className="p-6 bg-white border-2 border-gray-900 border-t-0">
                          <motion.h3 
                            className="text-xl font-bold text-gray-900 mb-3 uppercase font-['Syne'] tracking-wider group-hover:text-[#8b7355] transition-colors"
                          >
                            {cat.name}
                          </motion.h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4 font-['Space_Grotesk']">
                            {cat.description || "Discover our handpicked collection"}
                          </p>
                          
                          {/* Animated Arrow */}
                          <motion.div 
                            className="flex items-center gap-2 text-gray-900 font-medium text-sm uppercase tracking-wide font-['Syne'] group-hover:gap-4 transition-all"
                          >
                            View Collection
                            <motion.div
                              animate={{ x: [0, 5, 0] }}
                              transition={{ duration: 1.5, repeat: Infinity }}
                            >
                              <ArrowRight className="w-4 h-4" />
                            </motion.div>
                          </motion.div>
                        </div>

                        {/* Corner Accent */}
                        <motion.div
                          initial={{ scale: 0, rotate: -45 }}
                          whileHover={{ scale: 1, rotate: 0 }}
                          transition={{ duration: 0.4 }}
                          className="absolute top-4 right-4 w-12 h-12 bg-[#8b7355] flex items-center justify-center z-10"
                        >
                          <ArrowRight className="w-6 h-6 text-white" />
                        </motion.div>
                      </motion.div>
                    </Link>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <motion.p 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-gray-500 text-lg font-['Space_Grotesk']"
                  >
                    Collections coming soon...
                  </motion.p>
                </div>
              )}
            </div>

            {/* View All CTA */}
            {featuredCategories.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="text-center mt-16"
              >
                <Link href="/categories">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-12 py-7 text-base font-bold tracking-[0.1em] uppercase font-['Syne'] rounded-none"
                    >
                      <span className="flex items-center gap-3">
                        VIEW ALL CATEGORIES
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            )}
          </div>
        </section>

        {/* MARQUEE SECTION 1 */}
        <section 
          className="py-6 bg-gray-900 overflow-hidden"
          onMouseEnter={() => setIsMarquee1Paused(true)}
          onMouseLeave={() => setIsMarquee1Paused(false)}
        >
          <div className="flex">
            <motion.div
              animate={marquee1Controls}
              className="flex gap-12 whitespace-nowrap min-w-max pr-12"
            >
              {[...Array(20)].map((_, i) => (
                <div key={i} className="flex items-center gap-12">
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    CRAFTING EXCELLENCE
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    TIMELESS DESIGN
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    PREMIUM QUALITY
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    MODERN ELEGANCE
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    BESPOKE FURNITURE
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              animate={marquee1Controls}
              className="flex gap-12 whitespace-nowrap min-w-max pr-12"
            >
              {[...Array(20)].map((_, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-12">
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    CRAFTING EXCELLENCE
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    TIMELESS DESIGN
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    PREMIUM QUALITY
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    MODERN ELEGANCE
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    BESPOKE FURNITURE
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* IMAGE GRID SECTION */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Images Grid */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-2 gap-6"
              >
                {[
                  "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=500&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400&h=500&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=400&h=500&fit=crop&q=80",
                  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400&h=500&fit=crop&q=80"
                ].map((img, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 60, rotate: -5 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.7 }}
                    whileHover={{ scale: 1.05, rotate: 2 }}
                    className={`${index % 2 === 1 ? 'mt-12' : ''}`}
                  >
                    <img
                      src={img}
                      alt="Furniture showcase"
                      className="w-full h-80 object-cover rounded-none shadow-xl"
                    />
                  </motion.div>
                ))}
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-6xl md:text-7xl font-bold text-gray-900 leading-[0.95] mb-8 uppercase font-['DM_Serif_Display']"
                >
                  FIND YOUR<br />
                  <span className="text-[#8b7355]">PERFECT STYLE</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="text-gray-600 text-lg leading-relaxed mb-10 font-['Space_Grotesk']"
                >
                  Every space tells a story. From minimalist modern to warm traditional, discover furniture that reflects who you are and how you live.
                </motion.p>
                <Link href="/categories">
                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      className="bg-gray-900 text-white hover:bg-gray-800 px-10 py-7 text-base font-bold tracking-[0.1em] uppercase font-['Syne'] rounded-none"
                    >
                      <span className="flex items-center gap-3">
                        EXPLORE STYLES
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>

        {/* MARQUEE SECTION 2 */}
        <section 
          className="py-6 bg-[#2d4a3e] overflow-hidden"
          onMouseEnter={() => setIsMarquee2Paused(true)}
          onMouseLeave={() => setIsMarquee2Paused(false)}
        >
          <div className="flex">
            <motion.div
              animate={marquee2Controls}
              className="flex gap-12 whitespace-nowrap min-w-max pr-12"
            >
              {[...Array(20)].map((_, i) => (
                <div key={i} className="flex items-center gap-12">
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    HANDCRAFTED QUALITY
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    SUSTAINABLE MATERIALS
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    BUILT TO LAST
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    ARTISAN CRAFTED
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    ECO-FRIENDLY DESIGN
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    HERITAGE QUALITY
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              animate={marquee2Controls}
              className="flex gap-12 whitespace-nowrap min-w-max pr-12"
            >
              {[...Array(20)].map((_, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-12">
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    HANDCRAFTED QUALITY
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    SUSTAINABLE MATERIALS
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    BUILT TO LAST
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    ARTISAN CRAFTED
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    ECO-FRIENDLY DESIGN
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    HERITAGE QUALITY
                  </span>
                  <span className="text-[#8b7355] text-2xl md:text-3xl">—</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* HOME SERVICE SECTION - Reversed Layout */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Content First (Mobile), Image Second */}
              <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="order-2 lg:order-1"
              >
                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-5xl md:text-6xl font-bold text-gray-900 leading-[0.95] mb-8 uppercase font-['DM_Serif_Display']"
                >
                  CUSTOM FURNITURE,<br />
                  IN THE COMFORT OF<br />
                  <span className="text-[#8b7355]">YOUR OWN HOME</span>
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="text-gray-600 text-lg leading-relaxed mb-10 font-['Space_Grotesk']"
                >
                  We bring the showroom to you. Our designers visit your space, understand your vision, and create custom solutions that fit perfectly.
                </motion.p>
                <Link href="/contact">
                  <motion.div
                    whileHover={{ x: 10 }}
                    transition={{ duration: 0.3 }}
                    className="inline-block"
                  >
                    <Button
                      size="lg"
                      className="bg-gray-900 text-white hover:bg-gray-800 px-10 py-7 text-base font-bold tracking-[0.1em] uppercase font-['Syne'] rounded-none"
                    >
                      <span className="flex items-center gap-3">
                        LEARN MORE
                        <ArrowRight className="w-5 h-5" />
                      </span>
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Large Image */}
              <motion.div
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                className="relative h-[600px] order-1 lg:order-2"
              >
                <img
                  src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=800&h=1000&fit=crop&q=80"
                  alt="Custom furniture consultation"
                  className="w-full h-full object-cover rounded-none shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* STATS SECTION */}
        <section className="py-20 bg-gray-900 text-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { number: "5000+", label: "HAPPY CUSTOMERS", icon: Users },
                { number: "15+", label: "YEARS EXPERIENCE", icon: Clock },
                { number: "200+", label: "UNIQUE DESIGNS", icon: Sparkles },
                { number: "98%", label: "SATISFACTION RATE", icon: Heart },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                    className="inline-flex items-center justify-center w-16 h-16 mb-6"
                  >
                    <stat.icon className="w-10 h-10 text-[#8b7355]" />
                  </motion.div>
                  <p className="text-5xl font-bold mb-2 font-['DM_Serif_Display']">
                    {stat.number}
                  </p>
                  <p className="text-gray-400 text-sm tracking-wider font-['Syne']">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-32 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-7xl font-bold text-gray-900 leading-[0.95] mb-16 text-center uppercase font-['DM_Serif_Display']"
            >
              OUR REPUTATION<br />
              <span className="text-[#8b7355]">SPEAKS FOR ITSELF</span>
            </motion.h2>

            {/* Horizontal Scroll */}
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
                {reviews.length > 0 ? (
                  reviews.map((review: any) => (
                    <motion.div
                      key={review.id}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 w-[400px]"
                    >
                      <Card className="p-8 border-0 shadow-md hover:shadow-xl transition-all duration-500 h-full bg-white rounded-none">
                        <div className="flex gap-1 mb-6">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= (review.rating / 10)
                                  ? 'fill-[#8b7355] text-[#8b7355]'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-gray-700 mb-8 leading-relaxed text-base font-['Space_Grotesk']">
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
                    <p className="text-gray-500">Building our reputation, one piece at a time</p>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </section>

        {/* COLOR SWATCHES SECTION */}
        <section className="py-32 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="text-center mb-20"
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
                className="inline-flex items-center gap-3 px-5 py-3 bg-[#2d4a3e]/10 rounded-full text-[#2d4a3e] text-sm mb-6"
              >
                <Palette className="w-5 h-5" />
                <span className="tracking-[0.2em] font-['Syne'] font-medium uppercase">
                  SIGNATURE FINISHES
                </span>
              </motion.div>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3, duration: 0.7 }}
                className="text-6xl md:text-7xl font-bold text-gray-900 leading-[0.95] mb-6 uppercase font-['DM_Serif_Display']"
              >
                COLORS THAT<br />
                <span className="text-[#8b7355]">TELL YOUR STORY</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 text-lg max-w-2xl mx-auto font-['Space_Grotesk']"
              >
                Each finish is carefully developed to bring warmth and character to your space
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {colorSwatches.length > 0 ? (
                colorSwatches.map((swatch: any, index: number) => (
                  <motion.div
                    key={swatch.id}
                    initial={{ opacity: 0, y: 60, rotate: -10, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ y: -15, scale: 1.05, rotate: 5 }}
                    className="text-center group cursor-pointer"
                  >
                    <motion.div
                      className="relative w-full h-48 rounded-none mb-4 shadow-xl overflow-hidden"
                      style={{ backgroundColor: swatch.color }}
                      whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Palette className="w-8 h-8 text-white drop-shadow-lg" />
                      </motion.div>
                    </motion.div>
                    <motion.h3 
                      className="text-sm font-medium text-gray-900 mb-2 font-['Syne'] group-hover:text-[#2d4a3e] transition-colors uppercase tracking-wider"
                    >
                      {swatch.name}
                    </motion.h3>
                    <div className="flex items-center justify-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(swatch.rating / 10)
                              ? "fill-[#8b7355] text-[#8b7355]"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1 font-['Space_Grotesk']">
                      {swatch.reviews} reviews
                    </p>
                  </motion.div>
                ))
              ) : (
                // Fallback: Show sample furniture color finishes when no database data
                [
                  { name: "Walnut", color: "#5D4037", desc: "Rich & Warm" },
                  { name: "Maple", color: "#D4A574", desc: "Light & Bright" },
                  { name: "White Oak", color: "#E8DCC4", desc: "Soft & Elegant" },
                  { name: "Ebony", color: "#2C2416", desc: "Bold & Dramatic" },
                  { name: "Teak", color: "#B8956A", desc: "Tropical & Classic" },
                  { name: "Charcoal", color: "#36454F", desc: "Modern & Sleek" },
                ].map((swatch, index) => (
                  <motion.div
                    key={swatch.name}
                    initial={{ opacity: 0, y: 60, rotate: -10, scale: 0.8 }}
                    whileInView={{ opacity: 1, y: 0, rotate: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                      delay: index * 0.1,
                      duration: 0.7,
                      type: "spring",
                      stiffness: 100,
                      damping: 15
                    }}
                    whileHover={{ y: -15, scale: 1.05, rotate: 5 }}
                    className="text-center group cursor-pointer"
                  >
                    <motion.div
                      className="relative w-full h-48 rounded-none mb-4 shadow-xl overflow-hidden"
                      style={{ backgroundColor: swatch.color }}
                      whileHover={{ boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)" }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                      <motion.div
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                      >
                        <Palette className="w-8 h-8 text-white drop-shadow-lg" />
                      </motion.div>
                    </motion.div>
                    <motion.h3 
                      className="text-sm font-medium text-gray-900 mb-2 font-['Syne'] group-hover:text-[#2d4a3e] transition-colors uppercase tracking-wider"
                    >
                      {swatch.name}
                    </motion.h3>
                    <p className="text-xs text-gray-500 mt-1 font-['Space_Grotesk']">
                      {swatch.desc}
                    </p>
                  </motion.div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* FINAL CTA SECTION */}
        <section className="relative py-32 bg-gray-900 text-white overflow-hidden">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=1920&h=800&fit=crop&q=80"
              alt="Luxury interior"
              className="w-full h-full object-cover opacity-20"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-br from-[#2d4a3e]/90 to-[#8b7355]/90" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-5xl md:text-7xl font-bold mb-8 uppercase font-['DM_Serif_Display'] leading-[0.95]"
            >
              WORK WITH PEOPLE<br />
              <span className="text-white/80">WHO KNOW YOUR HOME</span>
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-gray-200 text-xl mb-12 leading-relaxed font-['Space_Grotesk'] max-w-2xl mx-auto"
            >
              Whether you're curious about our process, want to learn more about sustainable furniture, or simply have questions—we're here to share, educate, and inspire.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link href="/contact">
                <motion.div 
                  whileHover={{ scale: 1.05, x: 5 }} 
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="bg-white text-gray-900 hover:bg-gray-100 px-12 py-7 text-lg font-bold tracking-[0.1em] uppercase font-['Syne'] rounded-none"
                  >
                    <span className="flex items-center gap-3">
                      CONTACT US
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </motion.div>
                    </span>
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
          </div>
        </section>

        {/* MARQUEE SECTION 3 - Before Footer */}
        <section 
          className="py-6 bg-[#8b7355] overflow-hidden"
          onMouseEnter={() => setIsMarquee3Paused(true)}
          onMouseLeave={() => setIsMarquee3Paused(false)}
        >
          <div className="flex">
            <motion.div
              animate={marquee3Controls}
              className="flex gap-12 whitespace-nowrap min-w-max pr-12"
            >
              {[...Array(20)].map((_, i) => (
                <div key={i} className="flex items-center gap-12">
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    YOUR HOME, YOUR STORY
                  </span>
                  <span className="text-gray-900 text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    DESIGNED WITH PASSION
                  </span>
                  <span className="text-gray-900 text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    BUILT WITH CARE
                  </span>
                  <span className="text-gray-900 text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    FURNITURE THAT LASTS
                  </span>
                  <span className="text-gray-900 text-2xl md:text-3xl">—</span>
                </div>
              ))}
            </motion.div>
            <motion.div
              animate={marquee3Controls}
              className="flex gap-12 whitespace-nowrap min-w-max pr-12"
            >
              {[...Array(20)].map((_, i) => (
                <div key={`dup-${i}`} className="flex items-center gap-12">
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    YOUR HOME, YOUR STORY
                  </span>
                  <span className="text-gray-900 text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    DESIGNED WITH PASSION
                  </span>
                  <span className="text-gray-900 text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    BUILT WITH CARE
                  </span>
                  <span className="text-gray-900 text-2xl md:text-3xl">—</span>
                  <span className="text-white text-xl md:text-2xl font-bold tracking-[0.15em] uppercase font-['Syne']">
                    FURNITURE THAT LASTS
                  </span>
                  <span className="text-gray-900 text-2xl md:text-3xl">—</span>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
