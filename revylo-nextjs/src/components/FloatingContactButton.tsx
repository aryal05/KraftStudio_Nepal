"use client";

import { useState } from "react";
import { Mail, MessageCircle, Phone, X } from "lucide-react";

export default function FloatingContactButton() {
  const [isOpen, setIsOpen] = useState(false);

  const contacts = [
    {
      name: "Email",
      icon: Mail,
      href: "mailto:kraftstudio.np@gmail.com",
      color: "bg-blue-500",
    },
    {
      name: "WhatsApp",
      icon: MessageCircle,
      href: "https://wa.me/9779769682175",
      color: "bg-green-500",
    },
    {
      name: "Call",
      icon: Phone,
      href: "tel:+9779769682175",
      color: "bg-purple-500",
    },
  ];

  return (
    <div className="fixed bottom-[80px] sm:bottom-6 right-4 sm:right-6 z-[60] flex flex-col items-end gap-3">
      {isOpen && (
        <div className="flex flex-col gap-3">
          {contacts.map((contact) => (
            <a
              key={contact.name}
              href={contact.href}
              target={contact.name === "WhatsApp" ? "_blank" : undefined}
              rel={contact.name === "WhatsApp" ? "noopener noreferrer" : undefined}
              className={`flex items-center gap-3 px-4 py-3 rounded-full text-white shadow-lg ${contact.color}`}
            >
              <span className="text-sm font-medium whitespace-nowrap">{contact.name}</span>
              <contact.icon size={20} />
            </a>
          ))}
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-black text-white shadow-lg flex items-center justify-center"
        style={{
          boxShadow: "0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)",
        }}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
