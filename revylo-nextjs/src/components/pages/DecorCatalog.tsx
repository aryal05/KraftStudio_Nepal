"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Eye, Edit, Trash2, MoreVertical, Frame } from "lucide-react";
import { FlyingProduct } from "@/lib/adminAnimations";
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

const decorProducts = [
  {
    id: 1,
    name: "Abstract Canvas Art",
    subcategory: "Wall Art",
    price: 24900,
    stock: 78,
    sold: 234,
    status: "active",
    image: "https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400&h=400&fit=crop",
    sku: "DEC-012",
    material: "Canvas",
    dimensions: "90x120cm"
  },
  {
    id: 2,
    name: "Ceramic Vase Set",
    subcategory: "Vases",
    price: 8900,
    stock: 145,
    sold: 456,
    status: "active",
    image: "https://images.unsplash.com/photo-1578500351865-d0d6b5d96081?w=400&h=400&fit=crop",
    sku: "DEC-045",
    material: "Ceramic",
    dimensions: "Set of 3"
  },
  {
    id: 3,
    name: "Decorative Wall Mirror",
    subcategory: "Mirrors",
    price: 34900,
    stock: 34,
    sold: 123,
    status: "active",
    image: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=400&h=400&fit=crop",
    sku: "DEC-067",
    material: "Metal & Glass",
    dimensions: "Ø80cm"
  },
  {
    id: 4,
    name: "Throw Pillow Collection",
    subcategory: "Textiles",
    price: 12900,
    stock: 89,
    sold: 567,
    status: "active",
    image: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=400&h=400&fit=crop",
    sku: "DEC-089",
    material: "Cotton & Velvet",
    dimensions: "45x45cm"
  },
  {
    id: 5,
    name: "Macrame Wall Hanging",
    subcategory: "Wall Decor",
    price: 15900,
    stock: 56,
    sold: 189,
    status: "active",
    image: "https://images.unsplash.com/photo-1615876234886-fd9a39fda97f?w=400&h=400&fit=crop",
    sku: "DEC-023",
    material: "Cotton Rope",
    dimensions: "60x90cm"
  },
  {
    id: 6,
    name: "Decorative Bookends",
    subcategory: "Accessories",
    price: 6900,
    stock: 0,
    sold: 298,
    status: "out_of_stock",
    image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&h=400&fit=crop",
    sku: "DEC-034",
    material: "Brass",
    dimensions: "12x18cm"
  },
];

const subcategories = ["All", "Wall Art", "Vases", "Mirrors", "Textiles", "Wall Decor", "Accessories"];
const statusConfig = {
  active: "bg-emerald-100 text-emerald-700",
  low_stock: "bg-yellow-100 text-yellow-700",
  out_of_stock: "bg-red-100 text-red-700",
};

const stats = [
  { label: "Total Decor", value: "234", change: "+18" },
  { label: "In Stock", value: "201", change: "+12" },
  { label: "Low Stock", value: "28", change: "+5" },
  { label: "Total Value", value: "NPR 35.8L", change: "+22%" },
];

export default function DecorCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("All");

  const filteredProducts = decorProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSubcategory = subcategoryFilter === "All" || product.subcategory === subcategoryFilter;
    return matchesSearch && matchesSubcategory;
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
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Frame className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Decor Items Catalog
                </h1>
                <p className="text-gray-500 mt-1">{filteredProducts.length} items in collection</p>
              </div>
            </div>
          </div>
          <Button className="bg-[#2d4a3e] hover:bg-[#234136] text-white gap-2">
            <Plus className="w-4 h-4" />
            Add Decor Item
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="p-8">
        {/* Stats Cards */}
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
                <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', monospace", fontVariantNumeric: "tabular-nums" }}>
                  {stat.value}
                </h3>
                <span className="text-sm font-semibold text-emerald-600">{stat.change}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Filters */}
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
                placeholder="Search decor items by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0"
              />
            </div>
            <Select value={subcategoryFilter} onValueChange={setSubcategoryFilter}>
              <SelectTrigger className="w-full md:w-[180px] bg-gray-50 border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {subcategories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, index) => (
              <FlyingProduct key={product.id} index={index} delay={0.1}>
                <motion.div layout whileHover={{ y: -4 }}>
                  <Card className="bg-white border-0 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                    <CardContent className="p-0">
                      {/* Product Image */}
                      <div className="relative h-56 bg-gray-100 overflow-hidden group">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3">
                          <Badge className={statusConfig[product.status as keyof typeof statusConfig]}>
                            {product.status.replace("_", " ")}
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

                      {/* Product Info */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{product.name}</h3>
                            <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreVertical className="w-4 h-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Eye className="w-4 h-4 mr-2" />
                                View Details
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

                        <Badge variant="outline" className="mb-3">{product.subcategory}</Badge>

                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-500">Material:</span>
                            <span className="font-medium text-gray-900">{product.material}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-500">Dimensions:</span>
                            <span className="font-medium text-gray-900">{product.dimensions}</span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between mb-3 pt-3 border-t border-gray-100">
                          <p className="text-2xl font-bold text-purple-600" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', monospace", fontVariantNumeric: "tabular-nums" }}>
                            NPR {product.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Stock</p>
                            <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{product.stock} units</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Sold</p>
                            <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{product.sold} units</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </FlyingProduct>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
