"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mail, 
  Trash2, 
  Star, 
  Archive,
  Phone, 
  Clock,
  User,
  Search,
  MoreVertical,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { format } from "date-fns";

export default function MessagesPage() {
  const [selectedMessage, setSelectedMessage] = useState<any>(null);
  const [activeFilter, setActiveFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: messages = [], refetch, isLoading } = trpc.messages.getAll.useQuery();
  const updateStatusMutation = trpc.messages.updateStatus.useMutation();
  const deleteMessageMutation = trpc.messages.delete.useMutation();
  const toggleStarMutation = trpc.messages.toggleStar.useMutation();

  const handleViewMessage = async (message: any) => {
    setSelectedMessage(message);
    if (message.status === "unread") {
      try {
        await updateStatusMutation.mutateAsync({ id: message.id, status: "read" });
        refetch();
      } catch (error) {
        console.error("Failed to update message status");
      }
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await deleteMessageMutation.mutateAsync({ id });
      toast.success("Message deleted successfully!");
      refetch();
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to delete message");
    }
  };

  const handleToggleStar = async (id: number, currentStarred: boolean) => {
    try {
      await toggleStarMutation.mutateAsync({ id, isStarred: !currentStarred });
      refetch();
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, isStarred: !currentStarred });
      }
      toast.success(currentStarred ? "Removed from starred" : "Added to starred");
    } catch (error: any) {
      toast.error(error.message || "Failed to toggle star");
    }
  };

  const handleArchive = async (id: number) => {
    try {
      await updateStatusMutation.mutateAsync({ id, status: "archived" });
      toast.success("Message archived successfully!");
      refetch();
      if (selectedMessage?.id === id) setSelectedMessage(null);
    } catch (error: any) {
      toast.error(error.message || "Failed to archive message");
    }
  };

  // Filter messages based on active filter and search query
  const filteredMessages = messages.filter((m: any) => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        m.name?.toLowerCase().includes(query) ||
        m.email?.toLowerCase().includes(query) ||
        m.subject?.toLowerCase().includes(query) ||
        m.message?.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Status filters
    if (activeFilter === "unread") return m.status === "unread";
    if (activeFilter === "urgent") return m.priority === "urgent";
    if (activeFilter === "starred") return m.isStarred === true;
    if (activeFilter === "replied") return m.status === "replied";
    return true;
  });

  const totalMessages = messages.length;
  const unreadCount = messages.filter((m: any) => m.status === "unread").length;
  const urgentCount = messages.filter((m: any) => m.priority === "urgent").length;
  const starredCount = messages.filter((m: any) => m.isStarred === true).length;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const getAvatarColor = (index: number) => {
    const colors = [
      'bg-[#8b6f47]', // Warm tan (brand color)
      'bg-[#6b8e7e]', // Sage green
      'bg-[#9b7e5e]', // Brown
      'bg-[#7a9b8e]', // Teal
      'bg-[#a68a64]', // Golden tan
      'bg-[#5a7d6f]', // Forest green
    ];
    return colors[index % colors.length];
  };

  return (
    <AdminLayout>
      <div className="flex flex-col h-screen bg-[#f8f8f8]">
        {/* Page Header - Full Width */}
        <div className="bg-white border-b border-gray-200 px-6 py-6">
          <div className="flex items-center justify-between mb-1">
            <h1 className="text-2xl font-bold text-gray-800" style={{ fontFamily: "'Inter', sans-serif" }}>
              Messages
            </h1>
            <Button 
              size="sm" 
              variant="ghost" 
              className="h-8 w-8 p-0 text-gray-500 hover:text-[#8b6f47] hover:bg-[#8b6f47]/10"
              onClick={() => refetch()}
              disabled={isLoading}
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
          <p className="text-sm text-gray-500">
            {unreadCount} unread message{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Stats Row - Full Width */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Total Card */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveFilter("all")}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all"
            >
              <div className="h-[3px] bg-[#6b9bd6] rounded-t-xl"></div>
              <div className="p-5 text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {totalMessages}
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 whitespace-nowrap px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Total
                </div>
              </div>
            </motion.div>

            {/* Unread Card */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveFilter("unread")}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all"
            >
              <div className="h-[3px] bg-[#c9a56a] rounded-t-xl"></div>
              <div className="p-5 text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {unreadCount}
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 whitespace-nowrap px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Unread
                </div>
              </div>
            </motion.div>

            {/* Urgent Card */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveFilter("urgent")}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all"
            >
              <div className="h-[3px] bg-[#d97171] rounded-t-xl"></div>
              <div className="p-5 text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {urgentCount}
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 whitespace-nowrap px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Urgent
                </div>
              </div>
            </motion.div>

            {/* Starred Card */}
            <motion.div
              whileHover={{ y: -2, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              onClick={() => setActiveFilter("starred")}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md cursor-pointer transition-all"
            >
              <div className="h-[3px] bg-[#e8b84d] rounded-t-xl"></div>
              <div className="p-5 text-center">
                <div className="text-3xl font-bold text-slate-900 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                  {starredCount}
                </div>
                <div className="text-xs uppercase tracking-wide text-gray-500 whitespace-nowrap px-4" style={{ fontFamily: "'Inter', sans-serif" }}>
                  Starred
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar Left - Message List */}
          <div className="w-[380px] bg-white border-r border-gray-200 flex flex-col shadow-sm">
            {/* Search Bar */}
          <div className="p-4 border-b border-gray-100 bg-white">
            <div className="relative flex items-center gap-2">
              <label className="relative flex-1">
                <input type="checkbox" className="peer sr-only" />
                <div className="w-4 h-4 border-2 border-gray-300 rounded peer-checked:bg-[#8b6f47] peer-checked:border-[#8b6f47] flex items-center justify-center cursor-pointer transition-all">
                  <svg className="w-3 h-3 text-white hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </label>
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input 
                  placeholder="Search messages..." 
                  className="pl-9 h-9 bg-gray-50 border-gray-200 text-sm focus:ring-1 focus:ring-[#8b6f47] focus:border-[#8b6f47]" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button 
                size="sm" 
                variant="ghost" 
                className="h-9 w-9 p-0 text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              >
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Filter Buttons */}
          <div className="px-4 py-3 border-b border-gray-100 bg-white">
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                  activeFilter === "all"
                    ? "bg-[#8b6f47] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                All
              </button>
              <button
                onClick={() => setActiveFilter("unread")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                  activeFilter === "unread"
                    ? "bg-[#8b6f47] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Unread
              </button>
              <button
                onClick={() => setActiveFilter("starred")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                  activeFilter === "starred"
                    ? "bg-[#8b6f47] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Starred
              </button>
              <button
                onClick={() => setActiveFilter("urgent")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                  activeFilter === "urgent"
                    ? "bg-[#8b6f47] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Urgent
              </button>
              <button
                onClick={() => setActiveFilter("replied")}
                className={`px-4 py-1.5 text-xs font-medium rounded-full whitespace-nowrap transition-all ${
                  activeFilter === "replied"
                    ? "bg-[#8b6f47] text-white shadow-sm"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
                style={{ fontFamily: "'Inter', sans-serif" }}
              >
                Replied
              </button>
            </div>
            
            {/* Pagination */}
            <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
              <div className="flex items-center gap-1">
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 w-7 p-0 text-gray-400 hover:text-gray-700 hover:bg-gray-100"
                  disabled
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <div className="w-24 h-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-1/3 bg-[#8b6f47] rounded-full"></div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="h-7 w-7 p-0 text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Message List */}
          <div className="flex-1 overflow-y-auto">
            {filteredMessages.map((message: any, index: number) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: index * 0.03 }}
                onClick={() => handleViewMessage(message)}
                className={`px-4 py-3 border-b border-gray-100 cursor-pointer transition-all hover:bg-gray-50 ${
                  selectedMessage?.id === message.id ? "bg-[#8b6f47]/5 border-l-4 border-l-[#8b6f47]" : "border-l-4 border-l-transparent"
                }`}
              >
                <div className="flex gap-3 items-start">
                  {/* Checkbox */}
                  <label className="mt-1" onClick={(e) => e.stopPropagation()}>
                    <input type="checkbox" className="peer sr-only" />
                    <div className="w-4 h-4 border-2 border-gray-300 rounded peer-checked:bg-[#8b6f47] peer-checked:border-[#8b6f47] flex items-center justify-center cursor-pointer transition-all">
                      <svg className="w-3 h-3 text-white hidden peer-checked:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </label>

                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm flex-shrink-0 ${getAvatarColor(index)}`}>
                    {getInitials(message.name)}
                  </div>

                  {/* Message Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <span className={`font-semibold text-sm ${message.status === 'unread' ? 'text-gray-900' : 'text-gray-600'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                        {message.name}
                      </span>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleStar(message.id, message.isStarred);
                        }}
                        className="text-gray-400 hover:text-[#e8b84d] transition-colors"
                      >
                        <Star className={`w-4 h-4 ${message.isStarred ? 'fill-[#e8b84d] text-[#e8b84d]' : ''}`} />
                      </button>
                    </div>
                    <p className={`text-xs mb-1 line-clamp-1 ${message.status === 'unread' ? 'font-medium text-gray-800' : 'text-gray-600'}`} style={{ fontFamily: "'Inter', sans-serif" }}>
                      {message.subject || "No subject"}
                    </p>
                    <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
                      {message.message}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-[10px] text-gray-400">
                        {format(new Date(message.createdAt), "MMM d, h:mm a")}
                      </span>
                      {message.status === "unread" && (
                        <Badge className="bg-[#6b9bd6] text-white text-[9px] px-2 py-0 h-4 font-medium">
                          New
                        </Badge>
                      )}
                      {message.priority === "urgent" && (
                        <Badge className="bg-[#d97171] text-white text-[9px] px-2 py-0 h-4 font-medium">
                          Urgent
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
            {filteredMessages.length === 0 && (
              <div className="text-center py-16">
                <Mail className="w-16 h-16 text-gray-300 mx-auto mb-3" />
                <p className="text-sm font-medium text-gray-900 mb-1">No messages found</p>
                <p className="text-xs text-gray-500">
                  {searchQuery ? "Try adjusting your search" : "Messages will appear here"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Main Content - Message Detail */}
        <div className="flex-1 bg-white overflow-y-auto">
          <AnimatePresence mode="wait">
            {selectedMessage ? (
              <motion.div 
                key={selectedMessage.id} 
                initial={{ opacity: 0, x: 20 }} 
                animate={{ opacity: 1, x: 0 }} 
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="p-8"
              >
                {/* Header with Actions */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b border-gray-100">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                        {selectedMessage.subject || "Customer Inquiry"}
                      </h1>
                      {selectedMessage.status === "unread" && (
                        <Badge className="bg-[#6b9bd6] text-white text-xs px-3 py-1">
                          New
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-500" style={{ fontFamily: "'Inter', sans-serif" }}>
                      {format(new Date(selectedMessage.createdAt), "MMMM d, yyyy · h:mm a")}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-9 w-9 p-0 text-gray-400 hover:text-[#e8b84d] hover:bg-[#e8b84d]/10 transition-colors"
                      onClick={() => handleToggleStar(selectedMessage.id, selectedMessage.isStarred)}
                    >
                      <Star className={`w-5 h-5 ${selectedMessage.isStarred ? 'fill-[#e8b84d] text-[#e8b84d]' : ''}`} />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-9 w-9 p-0 text-gray-400 hover:text-[#7a9b8e] hover:bg-[#7a9b8e]/10 transition-colors"
                      onClick={() => handleArchive(selectedMessage.id)}
                    >
                      <Archive className="w-5 h-5" />
                    </Button>
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-9 w-9 p-0 text-gray-400 hover:text-[#d97171] hover:bg-[#d97171]/10 transition-colors"
                      onClick={() => handleDelete(selectedMessage.id)}
                    >
                      <Trash2 className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* User Info Card - Top */}
                <div className="bg-gradient-to-br from-[#f8f6f3] to-[#f2ede7] rounded-xl p-5 mb-6 border border-[#e8e4de]">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md ${getAvatarColor(0)}`}>
                      {getInitials(selectedMessage.name)}
                    </div>
                    <div className="flex-1">
                      <p className="font-bold text-base text-gray-900 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {selectedMessage.name}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-[#8b6f47]" />
                          {selectedMessage.email}
                        </span>
                        {selectedMessage.phone && (
                          <span className="flex items-center gap-1.5">
                            <Phone className="w-3.5 h-3.5 text-[#8b6f47]" />
                            {selectedMessage.phone}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Message Content */}
                <div className="mb-6">
                  <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
                    {selectedMessage.message}
                  </p>
                </div>

                {/* Info Cards - Side by Side Below Message */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="bg-gradient-to-br from-[#e8f2f9] to-[#d4e7f5] rounded-lg p-4 border border-[#c5ddef] shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 bg-[#6b9bd6] rounded-lg flex items-center justify-center">
                        <User className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm text-[#6b9bd6]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Customer Details
                      </h3>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {selectedMessage.name}
                      </p>
                      <p className="text-xs text-[#6b9bd6] font-medium break-all">
                        {selectedMessage.email}
                      </p>
                      {selectedMessage.phone && (
                        <p className="text-xs text-gray-600">
                          {selectedMessage.phone}
                        </p>
                      )}
                    </div>
                  </motion.div>

                  <motion.div 
                    whileHover={{ y: -2 }}
                    className="bg-gradient-to-br from-[#fff7ed] to-[#ffecd1] rounded-lg p-4 border border-[#f5dfc4] shadow-sm transition-shadow hover:shadow-md"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-9 h-9 bg-[#e8b84d] rounded-lg flex items-center justify-center">
                        <Clock className="w-4 h-4 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm text-[#d4a03a]" style={{ fontFamily: "'Inter', sans-serif" }}>
                        Received
                      </h3>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'Inter', sans-serif" }}>
                        {format(new Date(selectedMessage.createdAt), "MMMM d, yyyy")}
                      </p>
                      <p className="text-xs text-[#d4a03a] font-medium">
                        {format(new Date(selectedMessage.createdAt), "h:mm a")}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button 
                    className="flex-1 bg-[#8b6f47] hover:bg-[#73593a] text-white font-semibold py-2.5 rounded-lg shadow-sm transition-all hover:shadow-md"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Reply to Customer
                  </Button>
                  <Button 
                    variant="outline"
                    className="px-5 py-2.5 border-2 border-[#8b6f47] text-[#8b6f47] hover:bg-[#8b6f47]/5 font-semibold rounded-lg transition-all"
                    style={{ fontFamily: "'Inter', sans-serif" }}
                  >
                    Mark as Replied
                  </Button>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-center"
                >
                  <div className="w-24 h-24 bg-gradient-to-br from-[#8b6f47] to-[#6b563a] rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                    <Mail className="w-12 h-12 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-3" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                    Select a message
                  </h3>
                  <p className="text-sm text-gray-500 max-w-sm" style={{ fontFamily: "'Inter', sans-serif" }}>
                    Choose a message from the list to view its details and respond to your customers
                  </p>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
        </div>
      </div>
    </AdminLayout>
  );
}
