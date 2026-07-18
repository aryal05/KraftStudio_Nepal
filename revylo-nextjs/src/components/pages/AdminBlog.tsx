"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Plus, Eye, Edit, Trash2, MoreVertical, Calendar, User, Heart, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample blog data
const blogPosts = [
  {
    id: 1,
    title: "10 Modern Furniture Trends for 2024",
    excerpt: "Discover the latest furniture trends shaping interior design this year...",
    category: "Trends",
    author: "Priya Sharma",
    publishDate: "2024-02-15",
    status: "published",
    views: 2450,
    likes: 156,
    comments: 23,
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
  },
  {
    id: 2,
    title: "How to Choose the Perfect Sofa for Your Living Room",
    excerpt: "A comprehensive guide to selecting the right sofa that matches your style...",
    category: "Guide",
    author: "Rajesh Thapa",
    publishDate: "2024-02-12",
    status: "published",
    views: 3120,
    likes: 234,
    comments: 45,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
  },
  {
    id: 3,
    title: "Minimalist Home Design: Less is More",
    excerpt: "Embrace minimalism with these simple yet elegant design principles...",
    category: "Design Tips",
    author: "Sita Rai",
    publishDate: "2024-02-18",
    status: "draft",
    views: 0,
    likes: 0,
    comments: 0,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
  },
  {
    id: 4,
    title: "Lighting Ideas to Transform Your Space",
    excerpt: "Learn how proper lighting can completely change the ambiance of your home...",
    category: "Lighting",
    author: "Anil Gurung",
    publishDate: "2024-02-10",
    status: "published",
    views: 1890,
    likes: 142,
    comments: 18,
    image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&h=600&fit=crop",
  },
  {
    id: 5,
    title: "Creating a Productive Home Office",
    excerpt: "Tips and tricks for designing a workspace that boosts productivity...",
    category: "Workspace",
    author: "Priya Sharma",
    publishDate: "2024-02-08",
    status: "scheduled",
    views: 0,
    likes: 0,
    comments: 0,
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&h=600&fit=crop",
  },
];

const statusConfig = {
  published: { color: "bg-emerald-100 text-emerald-700", label: "Published" },
  draft: { color: "bg-gray-100 text-gray-700", label: "Draft" },
  scheduled: { color: "bg-blue-100 text-blue-700", label: "Scheduled" },
};

const stats = [
  { label: "Total Posts", value: "48", change: "+5", positive: true },
  { label: "Published", value: "32", change: "+3", positive: true },
  { label: "Draft", value: "12", change: "-2", positive: false },
  { label: "Total Views", value: "45.2K", change: "+18.5%", positive: true },
];

export default function AdminBlog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || post.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-[#f5f5f5]" style={{ fontFamily: "'Inter', 'Segoe UI', system-ui, sans-serif" }}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white border-b border-gray-200 px-8 py-6"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
              Blog Management
            </h1>
            <p className="text-gray-500 mt-1">{filteredPosts.length} articles found</p>
          </div>
          <Button className="bg-[#2d4a3e] hover:bg-[#234136] text-white gap-2">
            <Plus className="w-4 h-4" />
            New Article
          </Button>
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
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              whileHover={{ y: -4 }}
              className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all"
            >
              <p className="text-sm text-gray-500 mb-2">{stat.label}</p>
              <div className="flex items-end justify-between">
                <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  {stat.value}
                </h3>
                <span className={`text-sm font-semibold ${stat.positive ? 'text-emerald-600' : 'text-gray-600'}`}>
                  {stat.change}
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-gray-50 border-0">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="scheduled">Scheduled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index }}
              whileHover={{ y: -4 }}
            >
              <Card className="bg-white border-0 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                <CardContent className="p-0">
                  {/* Post Image */}
                  <div className="relative h-48 bg-gray-100 overflow-hidden group">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute top-3 right-3">
                      <Badge className={statusConfig[post.status as keyof typeof statusConfig].color}>
                        {statusConfig[post.status as keyof typeof statusConfig].label}
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      <Button size="sm" variant="secondary" className="gap-2">
                        <Eye className="w-4 h-4" />
                        View
                      </Button>
                      <Button size="sm" variant="secondary" className="gap-2">
                        <Edit className="w-4 h-4" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="outline" className="text-xs">
                        {post.category}
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-red-600">
                            <Trash2 className="w-4 h-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>

                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 text-lg">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center gap-2 mb-4 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{post.author}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{post.publishDate}</span>
                      </div>
                    </div>

                    {post.status === "published" && (
                      <div className="flex items-center gap-4 pt-4 border-t border-gray-100 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-4 h-4" />
                          <span>{post.comments}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
