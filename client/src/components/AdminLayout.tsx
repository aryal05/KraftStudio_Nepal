import { ReactNode } from "react";
import AdminSidebar from "./AdminSidebar";
import { motion } from "framer-motion";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <div className="flex min-h-screen bg-[#f5f5f5]">
      <AdminSidebar />
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="flex-1 ml-[280px]"
      >
        {children}
      </motion.main>
    </div>
  );
}
