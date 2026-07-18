"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, LogOut, Search, Home, Armchair, Lightbulb, Sparkles, Monitor, FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getLoginUrl } from "@/lib/const";
import { trpc } from "@/lib/trpc";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Furniture", href: "/furniture", icon: Armchair },
  { label: "Lighting", href: "/lighting", icon: Lightbulb },
  { label: "Decor", href: "/decor", icon: Sparkles },
  { label: "Workspace", href: "/workspace", icon: Monitor },
  { label: "Blog", href: "/blog", icon: FileText },
  { label: "About", href: "/about", icon: Info },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { data: cartItems = [] } = trpc.cart.getItems.useQuery();
  const cartCount = cartItems.length;
  
  // Mock auth state - TODO: Implement proper auth
  const isAuthenticated = false;
  const user: { name: string } | null = isAuthenticated ? { name: "User" } : null;

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    // TODO: Implement logout with tRPC
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 lg:block hidden ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand - Left Side */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-3 group cursor-pointer"
              >
                <div className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center font-bold text-lg">
                  K
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold text-gray-900 tracking-wide group-hover:text-gray-700 transition-colors">
                    KRAFTSTUDIO
                  </span>
                  <span className="text-xs text-gray-600 tracking-wider">
                    DESIGN THAT FEELS BUILT
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="flex items-center justify-center flex-1 gap-8 mx-12">
              {navItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <motion.div
                    whileHover={{ y: -2 }}
                    transition={{ duration: 0.2 }}
                    className={`relative text-sm font-medium tracking-wide transition-colors ${
                      pathname === item.href
                        ? "text-gray-900"
                        : "text-gray-600 hover:text-gray-900"
                    }`}
                  >
                    {item.label}
                    {pathname === item.href && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-gray-900"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.div>
                </Link>
              ))}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Search Icon */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <Search className="w-5 h-5 text-gray-600" />
              </motion.button>

              {/* Cart Icon */}
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ShoppingCart className="w-5 h-5 text-gray-600" />
                  <AnimatePresence>
                    {cartCount > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center"
                      >
                        {cartCount}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.div>
              </Link>

              {/* Auth Actions */}
              {isAuthenticated ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-gray-600">Hi, {user?.name}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </div>
              ) : (
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="tracking-wide font-medium"
                  >
                    <a href={getLoginUrl()}>LOGIN</a>
                  </Button>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Bottom Navigation */}
      <motion.nav
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-lg"
      >
        <div className="flex items-center justify-around px-2 py-2">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                  pathname === item.href
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <motion.div
                  whileHover={{ y: -2 }}
                  className="relative"
                >
                  <item.icon className="w-6 h-6" />
                  {pathname === item.href && (
                    <motion.div
                      layoutId="mobile-indicator"
                      className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </motion.div>
            </Link>
          ))}
          
          {/* Cart Button in Bottom Nav */}
          <Link href="/cart" className="flex-1">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className="flex flex-col items-center justify-center py-2 px-1 text-gray-500 hover:text-gray-700"
            >
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-gray-900 text-white text-xs font-bold w-4 h-4 rounded-full flex items-center justify-center"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="text-xs mt-1 font-medium">Cart</span>
            </motion.div>
          </Link>
        </div>
      </motion.nav>

      {/* Mobile Top Bar (Logo Only) */}
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 lg:hidden ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-white border-b border-gray-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 group cursor-pointer"
              >
                <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center font-bold text-sm">
                  K
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-base font-bold text-gray-900 tracking-wide group-hover:text-gray-700 transition-colors">
                    KRAFTSTUDIO
                  </span>
                </div>
              </motion.div>
            </Link>

            {/* Search Icon */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <Search className="w-5 h-5 text-gray-600" />
            </motion.button>
          </div>
        </div>
      </motion.div>
    </>
  );
}
