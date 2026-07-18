"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, RefreshCw, Star, Trash2, Archive, MoreVertical, Phone, Mail, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

// Sample message data
const messages = [
  {
    id: 1,
    sender: "testing123",
    email: "aryal.rajat05@gmail.com",
    phone: "21323323232",
    subject: "Welcome to Auth",
    preview: "test",
    content: "test",
    timestamp: "Jul 16, 11:28 PM",
    unread: true,
    starred: false,
    urgent: false,
    avatar: "/api/placeholder/40/40",
    avatarBg: "bg-yellow-500"
  },
  {
    id: 2,
    sender: "Rajat Aryal",
    email: "aryal.rajat05@gmail.com",
    phone: "21323323232",
    subject: "Partnership Inquiry",
    preview: "test",
    content: "Hello! I'm interested in partnering with your company. Could we schedule a call to discuss potential collaboration opportunities?",
    timestamp: "Jul 1, 12:33 PM",
    unread: false,
    starred: false,
    urgent: false,
    avatar: "/api/placeholder/40/40",
    avatarBg: "bg-gray-500"
  },
  {
    id: 3,
    sender: "Amanda Collins",
    email: "amanda.collins@email.com",
    phone: "15551234567",
    subject: "Partnership Inquiry",
    preview: "Hi! I'm impressed with your products...",
    content: "Hi! I'm impressed with your products. Would like to discuss partnership opportunities for our retail chain.",
    timestamp: "Jun 30, 3:45 PM",
    unread: false,
    starred: false,
    urgent: false,
    avatar: "/api/placeholder/40/40",
    avatarBg: "bg-blue-500"
  },
];

const messageStats = [
  { label: "Total Messages", value: 6, color: "bg-blue-500" },
  { label: "Unread", value: 2, color: "bg-orange-500" },
  { label: "Urgent", value: 1, color: "bg-red-500" },
  { label: "Starred", value: 2, color: "bg-yellow-500" },
];

const filterOptions = ["All", "Unread", "Starred", "Urgent", "Replied"];

export default function AdminMessages() {
  const [selectedMessage, setSelectedMessage] = useState(messages[0]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredMessages = messages.filter((msg) => {
    const matchesSearch = 
      msg.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.preview.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeFilter === "All") return matchesSearch;
    if (activeFilter === "Unread") return matchesSearch && msg.unread;
    if (activeFilter === "Starred") return matchesSearch && msg.starred;
    if (activeFilter === "Urgent") return matchesSearch && msg.urgent;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f5]">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-8 py-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
            <p className="text-gray-500 mt-1">2 unread messages</p>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          {messageStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className="bg-white rounded-lg p-6 border-0 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className={`w-12 h-1 ${stat.color} rounded-full mb-4`} />
              <h2 className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</h2>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Messages Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 bg-white rounded-lg shadow-sm"
          >
            <div className="p-4 border-b border-gray-200">
              {/* Search and Actions */}
              <div className="flex items-center gap-2 mb-4">
                <div className="relative flex-1">
                  <Input
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-gray-50 border-0"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                </div>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <RefreshCw className="w-4 h-4" />
                </Button>
              </div>

              {/* Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto pb-2">
                {filterOptions.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`
                      px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap
                      ${activeFilter === filter
                        ? 'bg-yellow-500 text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }
                    `}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              <Button className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white">
                New
              </Button>
            </div>

            {/* Message List */}
            <ScrollArea className="h-[600px]">
              <div className="p-2">
                {filteredMessages.map((message) => (
                  <motion.div
                    key={message.id}
                    whileHover={{ backgroundColor: '#f9fafb' }}
                    onClick={() => setSelectedMessage(message)}
                    className={`
                      p-4 rounded-lg cursor-pointer transition-all mb-2 border-l-4
                      ${selectedMessage.id === message.id
                        ? 'bg-yellow-50 border-l-yellow-500'
                        : 'bg-white border-l-transparent hover:border-l-gray-300'
                      }
                    `}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar className={`w-10 h-10 ${message.avatarBg} text-white`}>
                          <AvatarFallback className={`${message.avatarBg} text-white`}>
                            {message.sender.substring(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {message.unread && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className={`text-sm font-semibold truncate ${message.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                            {message.sender}
                          </h3>
                          {message.starred && <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />}
                        </div>
                        <p className={`text-sm mb-1 truncate ${message.unread ? 'font-medium text-gray-900' : 'text-gray-600'}`}>
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-500 truncate">{message.preview}</p>
                        <div className="flex items-center justify-between mt-2">
                          <p className="text-xs text-gray-400">{message.timestamp}</p>
                          {message.unread && (
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 text-xs">
                              New
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </ScrollArea>
          </motion.div>

          {/* Message Detail */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedMessage.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-white rounded-lg shadow-sm"
            >
              {/* Message Header */}
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedMessage.subject}</h2>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Star className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Archive className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Trash2 className="w-5 h-5" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Avatar className={`w-12 h-12 ${selectedMessage.avatarBg} text-white`}>
                    <AvatarFallback className={`${selectedMessage.avatarBg} text-white text-lg`}>
                      {selectedMessage.sender.substring(0, 1).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{selectedMessage.sender}</h3>
                    <div className="flex items-center gap-4 mt-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{selectedMessage.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{selectedMessage.phone}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <ScrollArea className="h-[400px]">
                <div className="p-6">
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="bg-gray-50 rounded-lg p-6 mb-6"
                  >
                    <p className="text-gray-700 leading-relaxed">{selectedMessage.content}</p>
                  </motion.div>

                  {/* Customer Details Card */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-4"
                  >
                    <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
                      <div className="flex items-center gap-2 mb-3">
                        <User className="w-5 h-5 text-blue-600" />
                        <h4 className="font-semibold text-gray-900">Customer Details</h4>
                      </div>
                      <div className="space-y-2">
                        <div>
                          <p className="text-xs text-gray-500">Name</p>
                          <p className="text-sm font-medium text-gray-900">{selectedMessage.sender}</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Email</p>
                          <p className="text-sm font-medium text-gray-900">{selectedMessage.email}</p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-100">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-5 h-5 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 6 12 12 16 14" />
                        </svg>
                        <h4 className="font-semibold text-gray-900">Received</h4>
                      </div>
                      <div>
                        <p className="text-lg font-bold text-orange-600">{selectedMessage.timestamp.split(',')[0]}</p>
                        <p className="text-sm text-gray-600">{selectedMessage.timestamp.split(',')[1]}</p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </ScrollArea>

              {/* Reply Section */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex gap-3">
                  <Avatar className="w-10 h-10 bg-gray-200">
                    <AvatarFallback className="bg-gray-200 text-gray-600">
                      <User className="w-5 h-5" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <Input
                      placeholder="Type your reply..."
                      className="mb-3"
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                          </svg>
                        </Button>
                        <Button variant="ghost" size="sm">
                          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <rect x="3" y="3" width="18" height="18" rx="2" />
                            <circle cx="8.5" cy="8.5" r="1.5" />
                            <path d="M20.4 14.5L16 10 4 20" />
                          </svg>
                        </Button>
                      </div>
                      <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                        Send Reply
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
