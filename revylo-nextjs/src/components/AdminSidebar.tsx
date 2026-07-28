"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  MessageCircle, 
  LogOut,
  ChevronRight,
  Layers,
  Star
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { trpc } from "@/lib/trpc";

// ========== HIDDEN MENU ITEMS (Commented out as per requirements) ==========
// Uncomment these items to restore them in the sidebar
// You'll also need to uncomment the imports below:
// import { LayoutDashboard, Package, ShoppingBag, Users, Calendar, FileText, TrendingUp, Lightbulb, Sofa, Sparkles, HelpCircle, Settings } from "lucide-react";
/*
const hiddenMainMenuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin/dashboard" },
  { icon: Package, label: "Products", href: "/admin/products" },
  { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
  { icon: Calendar, label: "Bookings", href: "/admin/bookings" },
  { icon: Users, label: "Customers", href: "/admin/customers" },
];

const hiddenContentMenuItems = [
  { icon: FileText, label: "Blog Posts", href: "/admin/blog" },
  { icon: Sofa, label: "Furniture Catalog", href: "/admin/furniture" },
  { icon: Lightbulb, label: "Lighting Catalog", href: "/admin/lighting" },
  { icon: Sparkles, label: "Decor Items", href: "/admin/decor" },
];

const hiddenAnalyticsMenuItems = [
  { icon: TrendingUp, label: "Analytics", href: "/admin/analytics" },
];

const hiddenAccountItems = [
  { icon: HelpCircle, label: "Help & Support", href: "/admin/help" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];
*/
// ========== END HIDDEN MENU ITEMS ==========

// Active menu items (currently visible)
const menuItems = [
  { icon: Layers, label: "Category Management", href: "/admin/categories" },
  { icon: Star, label: "Reviews", href: "/admin/reviews" },
  { icon: MessageCircle, label: "Messages", href: "/admin/messages", badge: true },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: unreadCount = 0 } = trpc.messages.getUnreadCount.useQuery();

  const isActive = (href: string) => pathname === href;

  const handleLogout = () => {
    // Clear session and redirect to login
    document.cookie = "admin-session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    router.push("/admin/login");
  };

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

      {/* Main Menu */}
      <div className="px-4 py-6 flex-1">
        <h3 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3 px-3" style={{ fontFamily: "'Inter', sans-serif" }}>
          Main Menu
        </h3>
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            const badgeCount = item.badge ? unreadCount : 0;
            
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
                  {item.badge && badgeCount > 0 && (
                    <Badge className="bg-red-500 text-white border-0 h-5 min-w-5 flex items-center justify-center text-xs font-semibold">
                      {badgeCount}
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

      {/* Logout Button */}
      <div className="px-4 py-4 border-t border-white/10">
        <motion.button
          onClick={handleLogout}
          whileHover={{ x: 4 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-white/70 hover:bg-white/5 hover:text-white transition-all w-full cursor-pointer"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className="flex-1 text-left">Logout</span>
        </motion.button>
      </div>

      {/* User Profile */}
      <div className="p-4 border-t border-white/10">
        <motion.div
          whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
          className="flex items-center gap-3 p-2 rounded-lg cursor-pointer transition-colors"
        >
          <Avatar className="w-10 h-10 border-2 border-white/20">
            <AvatarImage src="" />
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
        </motion.div>
      </div>
    </motion.div>
  );
}
