"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  MessageCircle, 
  Calendar,
  FileText, 
  TrendingUp, 
  Lightbulb,
  Sofa,
  Sparkles,
  HelpCircle,
  Settings,
  LogOut,
  ChevronRight
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const mainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
  { icon: MessageCircle, label: "Messages", href: "/admin/messages", badge: 2 },
];

const contentMenuItems = [
  { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
  { icon: Sofa, label: "Furniture Catalog", href: "/admin/furniture" },
  { icon: Lightbulb, label: "Lighting Catalog", href: "/admin/lighting" },
  { icon: Sparkles, label: "Decor Items", href: "/admin/decor" },
];

const analyticsMenuItems = [
  { icon: TrendingUp, label: "Analytics", href: "/admin/analytics" },
];

const accountItems = [
  { icon: HelpCircle, label: "Help & Support", href: "/admin/help" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-[280px] bg-[#2d4a3e] h-screen fixed left-0 top-0 flex flex-col text-white overflow-y-auto"
      style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}
    >
      {/* Logo */}
      <div className="p-6 flex items-center gap-3 border-b border-white/10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="w-10 h-10 bg-white text-[#2d4a3e] flex items-center justify-center font-bold text-lg rounded"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          K
        </motion.div>
        <div className="flex flex-col">
          <span className="text-lg font-bold tracking-wider" style={{ fontFamily: "'Poppins', sans-serif" }}>
            KRAFTSTUDIO
          </span>
          <span className="text-[10px] text-white/70 tracking-wider" style={{ fontFamily: "'Inter', sans-serif" }}>
            ADMIN PANEL
          </span>
        </div>
        <button className="ml-auto text-white/60 hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Search */}
      <div className="px-4 py-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-[#234136] text-white placeholder-white/40 rounded-lg px-4 py-2 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
            style={{ fontFamily: "'Inter', sans-serif" }}
          />
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-white/40" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Main Menu */}
      <div className="px-4 py-2">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          Main Menu
        </h3>
        <nav className="space-y-1">
          {mainMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer
                    ${active 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }
                  `}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge className="bg-red-500 text-white border-0 h-5 min-w-5 flex items-center justify-center text-xs font-semibold">
                      {item.badge}
                    </Badge>
                  )}
                  {active && (
                    <motion.div
                      layoutId="active-indicator"
                      className="w-1.5 h-1.5 rounded-full bg-white"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Content Management */}
      <div className="px-4 py-2 mt-4">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          Content
        </h3>
        <nav className="space-y-1">
          {contentMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer
                    ${active 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }
                  `}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Analytics */}
      <div className="px-4 py-2 mt-4">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          Analytics
        </h3>
        <nav className="space-y-1">
          {analyticsMenuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer
                    ${active 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }
                  `}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Account */}
      <div className="px-4 py-2 mt-auto">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          Account
        </h3>
        <nav className="space-y-1">
          {accountItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.98 }}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer
                    ${active 
                      ? 'bg-white/10 text-white shadow-sm' 
                      : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }
                  `}
                  style={{ fontFamily: "'Inter', sans-serif" }}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                </motion.div>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User Profile */}
      <div className="p-4 mt-4 border-t border-white/10">
        <motion.div
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors"
        >
          <Avatar className="w-10 h-10 border-2 border-white/20">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="bg-[#234136] text-white" style={{ fontFamily: "'Poppins', sans-serif" }}>
              AD
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-white truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
              Admin User
            </p>
            <p className="text-xs text-white/60 truncate" style={{ fontFamily: "'Inter', sans-serif" }}>
              admin@kraftstudio.com
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="text-white/60 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
}
