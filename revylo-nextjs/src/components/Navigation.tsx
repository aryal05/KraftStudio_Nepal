"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, Home, ChevronDown, FileText, Phone } from "lucide-react";

const staticNavItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Blog", href: "/blog", icon: FileText },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Navigation */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 lg:block hidden bg-white border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo/Brand - Left Side */}
            <Link href="/">
              <div className="flex items-center gap-3 cursor-pointer">
                <div className="w-10 h-10 bg-gray-900 text-white flex items-center justify-center font-bold text-lg">
                  K
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-xl font-bold text-gray-900 tracking-wide">
                    KRAFTSTUDIO
                  </span>
                  <span className="text-xs text-gray-600 tracking-wider">
                    DESIGN THAT FEELS BUILT
                  </span>
                </div>
              </div>
            </Link>

            {/* Desktop Navigation - Center */}
            <div className="flex items-center justify-center flex-1 gap-8 mx-12">
              {staticNavItems.map((item) => (
                <Link key={item.href} href={item.href}>
                  <div className={`relative text-sm font-medium tracking-wide ${
                    pathname === item.href
                      ? "text-gray-900"
                      : "text-gray-600"
                  }`}>
                    {item.label}
                    {pathname === item.href && (
                      <div className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-gray-900" />
                    )}
                  </div>
                </Link>
              ))}

              {/* Categories Link */}
              <Link href="/categories">
                <div className={`relative text-sm font-medium tracking-wide ${
                  pathname === "/categories" || pathname.startsWith("/category/")
                    ? "text-gray-900"
                    : "text-gray-600"
                }`}>
                  Categories
                  {(pathname === "/categories" || pathname.startsWith("/category/")) && (
                    <div className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-gray-900" />
                  )}
                </div>
              </Link>

              <Link href="/contact">
                <div className={`relative text-sm font-medium tracking-wide ${
                  pathname === "/contact"
                    ? "text-gray-900"
                    : "text-gray-600"
                }`}>
                  Contact
                  {pathname === "/contact" && (
                    <div className="absolute -bottom-[29px] left-0 right-0 h-0.5 bg-gray-900" />
                  )}
                </div>
              </Link>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-white border-t border-gray-200 shadow-lg"
        style={{ '--bottom-nav-height': '56px' } as React.CSSProperties}
      >
        <div className="flex items-center justify-around px-2 py-1">
          {staticNavItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex-1">
              <div className={`flex flex-col items-center justify-center py-1 px-1 ${
                pathname === item.href
                  ? "text-gray-900"
                  : "text-gray-500"
              }`}>
                <div className="relative">
                  <item.icon className="w-5 h-5" />
                  {pathname === item.href && (
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-gray-900 rounded-full" />
                  )}
                </div>
                <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
              </div>
            </Link>
          ))}

          {/* Categories Link for Mobile */}
          <Link href="/categories" className="flex-1">
            <div className={`flex flex-col items-center justify-center py-1 px-1 ${
              pathname === "/categories" || pathname.startsWith("/category/")
                ? "text-gray-900"
                : "text-gray-500"
            }`}>
              <ChevronDown className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 font-medium">Category</span>
            </div>
          </Link>

          <Link href="/contact" className="flex-1">
            <div className={`flex flex-col items-center justify-center py-1 px-1 ${
              pathname === "/contact"
                ? "text-gray-900"
                : "text-gray-500"
            }`}>
              <Search className="w-5 h-5" />
              <span className="text-[10px] mt-0.5 font-medium">Contact</span>
            </div>
          </Link>
        </div>
      </nav>

      {/* Mobile Top Bar (Logo + Call Button) */}
      <div
        className="fixed top-0 left-0 right-0 z-40 lg:hidden bg-white border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-12">
            {/* Logo/Brand */}
            <Link href="/">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <div className="w-6 h-6 bg-gray-900 text-white flex items-center justify-center font-bold text-xs">
                  K
                </div>
                <div className="flex flex-col">
                  <span className="font-serif text-sm font-bold text-gray-900 tracking-wide">
                    KRAFTSTUDIO
                  </span>
                </div>
              </div>
            </Link>

            {/* Call Button */}
            <a href="tel:+9779769682175">
              <div className="relative">
                <div className="relative w-9 h-9 bg-[#8b7355] text-white rounded-full flex items-center justify-center shadow-lg">
                  <Phone className="w-4 h-4" />
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
