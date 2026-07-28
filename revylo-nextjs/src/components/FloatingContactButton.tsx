"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, MessageCircle, Phone, X } from "lucide-react";

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:kraftstudio.np@gmail.com",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/9779769682175",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      name: "Call",
      icon: Phone,
      href: "tel:+9779769682175",
      color: "bg-purple-500 hover:bg-purple-600",
    },
  ];

  return (
    <div className="fixed bottom-[80px] sm:bottom-6 right-4 sm:right-6 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex flex-col gap-3"
          >
            {contacts.map((contact, index) => (
              <motion.a
                key={contact.name}
                href={contact.href}
                target={contact.name === "WhatsApp" ? "_blank" : undefined}
                rel={contact.name === "WhatsApp" ? "noopener noreferrer" : undefined}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg ${contact.color} transition-colors`}
              >
                <span className="text-sm font-medium whitespace-nowrap">{contact.name}</span>
                <contact.icon size={20} />
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="w-14 h-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center transition-colors hover:bg-black/90"
        style={{
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <MessageCircle size={24} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
