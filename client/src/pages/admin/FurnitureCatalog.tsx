import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Plus, Eye, Edit, Trash2, MoreVertical, Sofa } from "lucide-react";
import { FlyingProduct } from "@/lib/adminAnimations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
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

const furnitureProducts = [
  {
    id: 1,
    name: "Mid-Century Modern Sofa",
    subcategory: "Sofas",
    price: 129900,
    stock: 24,
    sold: 156,
    status: "active",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&h=400&fit=crop",
    sku: "FUR-001",
    material: "Leather",
    dimensions: "220x90x85cm"
  },
  {
    id: 2,
    name: "Minimalist Coffee Table",
    subcategory: "Tables",
    price: 44900,
    stock: 8,
    sold: 78,
    status: "low_stock",
    image: "https://images.unsplash.com/photo-1611269154421-4e27233ac5c7?w=400&h=400&fit=crop",
    sku: "FUR-023",
    material: "Oak Wood",
    dimensions: "120x60x45cm"
  },
  {
    id: 3,
    name: "Scandinavian Bookshelf",
    subcategory: "Storage",
    price: 69900,
    stock: 14,
    sold: 43,
    status: "active",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=400&h=400&fit=crop",
    sku: "FUR-034",
    material: "Oak Wood",
    dimensions: "180x30x200cm"
  },
  {
    id: 4,
    name: "Lounge Armchair",
    subcategory: "Chairs",
    price: 59900,
    stock: 18,
    sold: 92,
    status: "active",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=400&fit=crop",
    sku: "FUR-012",
    material: "Fabric",
    dimensions: "75x80x85cm"
  },
  {
    id: 5,
    name: "Dining Table Set",
    subcategory: "Dining",
    price: 89900,
    stock: 6,
    sold: 34,
    status: "active",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=400&h=400&fit=crop",
    sku: "FUR-045",
    material: "Walnut Wood",
    dimensions: "160x90x75cm"
  },
  {
    id: 6,
    name: "Bed Frame - King Size",
    subcategory: "Bedroom",
    price: 119900,
    stock: 0,
    sold: 67,
    status: "out_of_stock",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400&h=400&fit=crop",
    sku: "FUR-056",
    material: "Solid Wood",
    dimensions: "200x180x120cm"
  },
];

const subcategories = ["All", "Sofas", "Tables", "Chairs", "Storage", "Dining", "Bedroom"];
const statusConfig = {
  active: "bg-emerald-100 text-emerald-700",
  low_stock: "bg-yellow-100 text-yellow-700",
  out_of_stock: "bg-red-100 text-red-700",
};

const stats = [
  { label: "Total Furniture", value: "145", change: "+12" },
  { label: "In Stock", value: "128", change: "+8" },
  { label: "Low Stock", value: "15", change: "+3" },
  { label: "Total Value", value: "NPR 98.5L", change: "+15%" },
];

export default function FurnitureCatalog() {
  const [searchQuery, setSearchQuery] = useState("");
  const [subcategoryFilter, setSubcategoryFilter] = useState("All");

  const filteredProducts = furnitureProducts.filter((product) => {
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
              <div className="w-12 h-12 bg-[#2d4a3e]/10 rounded-lg flex items-center justify-center">
                <Sofa className="w-6 h-6 text-[#2d4a3e]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
                  Furniture Catalog
                </h1>
                <p className="text-gray-500 mt-1">{filteredProducts.length} items in collection</p>
              </div>
            </div>
          </div>
          <Button className="bg-[#2d4a3e] hover:bg-[#234136] text-white gap-2">
            <Plus className="w-4 h-4" />
            Add Furniture
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
                <h3 className="text-3xl font-bold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>
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
                placeholder="Search furniture by name or SKU..."
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
                          <p className="text-2xl font-bold text-[#2d4a3e]" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>
                            NPR {product.price.toLocaleString()}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Stock</p>
                            <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{product.stock} units</p>
                          </div>
                          <div>
                            <p className="text-xs text-gray-500 mb-1">Sold</p>
                            <p className="text-sm font-semibold text-gray-900" style={{ fontFamily: "'JetBrains Mono', 'Roboto Mono', 'SF Mono', monospace", fontVariantNumeric: "tabular-nums" }}>{product.sold} units</p>
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
