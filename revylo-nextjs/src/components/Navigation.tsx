"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Home, ChevronDown, FileText } from "lucide-react";
import { motion } from "framer-motion";

const staticNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Blog", href: "/blog", icon: FileText },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
              {staticNavItems.map((item) => (
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

              {/* Categories Link */}
              <Link href="/categories">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`relative text-sm font-medium tracking-wide transition-colors ${
                    pathname === "/categories" || pathname.startsWith("/category/")
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Categories
                  {(pathname === "/categories" || pathname.startsWith("/category/")) && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-gray-900"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>

              <Link href="/contact">
                <motion.div
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                  className={`relative text-sm font-medium tracking-wide transition-colors ${
                    pathname === "/contact"
                      ? "text-gray-900"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Contact
                  {pathname === "/contact" && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-gray-900"
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </motion.div>
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
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
          {staticNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex-1">
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                  pathname === item.href
                    ? "text-gray-900"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                <motion.div whileHover={{ y: -2 }} className="relative">
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

          {/* Categories Link for Mobile */}
          <Link href="/categories" className="flex-1">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                pathname === "/categories" || pathname.startsWith("/category/")
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ChevronDown className="w-6 h-6" />
              <span className="text-xs mt-1 font-medium">Category</span>
            </motion.div>
          </Link>

          <Link href="/contact" className="flex-1">
            <motion.div
              whileTap={{ scale: 0.9 }}
              className={`flex flex-col items-center justify-center py-2 px-1 transition-colors ${
                pathname === "/contact"
                  ? "text-gray-900"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Search className="w-6 h-6" />
              <span className="text-xs mt-1 font-medium">Contact</span>
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
          </div>
        </div>
      </motion.div>
    </>
  );
}
