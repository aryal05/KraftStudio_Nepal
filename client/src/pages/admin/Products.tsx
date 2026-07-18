import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, Eye, Edit, Trash2, MoreVertical, Package } from "lucide-react";
import { FlyingProduct, SearchResultItem } from "@/lib/adminAnimations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
import { Switch } from "@/components/ui/switch";

// Sample product data
const products = [
  {
    id: 1,
    name: "Mid-Century Modern Sofa",
    category: "Furniture",
    price: 129900,
    stock: 24,
    sold: 156,
    status: "active",
    image: "/api/placeholder/80/80",
    sku: "FUR-001",
    rating: 4.8,
    reviews: 89
  },
  {
    id: 2,
    name: "Industrial Desk Lamp",
    category: "Lighting",
    price: 8990,
    stock: 156,
    sold: 342,
    status: "active",
    image: "/api/placeholder/80/80",
    sku: "LIT-045",
    rating: 4.6,
    reviews: 124
  },
  {
    id: 3,
    name: "Minimalist Coffee Table",
    category: "Furniture",
    price: 44900,
    stock: 8,
    sold: 78,
    status: "low_stock",
    image: "/api/placeholder/80/80",
    sku: "FUR-023",
    rating: 4.9,
    reviews: 56
  },
  {
    id: 4,
    name: "Ceramic Vase Set",
    category: "Decor",
    price: 6500,
    stock: 0,
    sold: 203,
    status: "out_of_stock",
    image: "/api/placeholder/80/80",
    sku: "DEC-089",
    rating: 4.7,
    reviews: 167
  },
  {
    id: 5,
    name: "Scandinavian Pendant Light",
    category: "Lighting",
    price: 17990,
    stock: 45,
    sold: 98,
    status: "active",
    image: "/api/placeholder/80/80",
    sku: "LIT-067",
    rating: 4.5,
    reviews: 43
  },
  {
    id: 6,
    name: "Ergonomic Office Chair",
    category: "Workspace",
    price: 39900,
    stock: 18,
    sold: 124,
    status: "active",
    image: "/api/placeholder/80/80",
    sku: "WRK-012",
    rating: 4.8,
    reviews: 98
  },
];

const categories = ["All", "Furniture", "Lighting", "Decor", "Workspace"];
const statusColors = {
  active: "bg-emerald-100 text-emerald-700",
  low_stock: "bg-yellow-100 text-yellow-700",
  out_of_stock: "bg-red-100 text-red-700",
};

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
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
            <h1 className="text-3xl font-bold text-gray-900">Products</h1>
            <p className="text-gray-500 mt-1">{filteredProducts.length} total products</p>
          </div>
          <Button className="bg-[#2d4a3e] hover:bg-[#234136] text-white gap-2">
            <Plus className="w-4 h-4" />
            Add Product
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="p-8">
        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="Search products by name or SKU..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-50 border-0"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px] bg-gray-50 border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("grid")}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <line x1="3" y1="6" x2="3.01" y2="6" />
                  <line x1="3" y1="12" x2="3.01" y2="12" />
                  <line x1="3" y1="18" x2="3.01" y2="18" />
                </svg>
              </Button>
              <Button variant="ghost" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Grid View */}
        {viewMode === "grid" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <FlyingProduct key={product.id} index={index} delay={0.1}>
                  <motion.div
                    layout
                    whileHover={{ y: -4 }}
                  >
                    <Card className="bg-white border-0 shadow-sm hover:shadow-lg transition-all overflow-hidden">
                      <CardContent className="p-0">
                        {/* Product Image */}
                        <div className="relative h-48 bg-gray-100 overflow-hidden group">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <Badge className={statusColors[product.status as keyof typeof statusColors]}>
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
                                  Edit Product
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>

                          <Badge variant="outline" className="mb-3">{product.category}</Badge>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              <span className="text-sm font-medium text-gray-700">{product.rating}</span>
                              <span className="text-xs text-gray-500">({product.reviews})</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900">NPR {product.price.toLocaleString()}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Stock</p>
                              <p className="text-sm font-semibold text-gray-900">{product.stock} units</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Sold</p>
                              <p className="text-sm font-semibold text-gray-900">{product.sold} units</p>
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
        )}

        {/* List View */}
        {viewMode === "list" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-white rounded-lg shadow-sm overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Product</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Price</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Stock</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Sold</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredProducts.map((product, index) => (
                    <motion.tr
                      key={product.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * index }}
                      whileHover={{ backgroundColor: '#f9fafb' }}
                      className="transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <Avatar className="w-12 h-12 rounded-lg">
                            <AvatarImage src={product.image} />
                            <AvatarFallback className="rounded-lg bg-gray-100">
                              <Package className="w-6 h-6 text-gray-400" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">SKU: {product.sku}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">{product.category}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">NPR {product.price.toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{product.stock} units</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{product.sold} units</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={statusColors[product.status as keyof typeof statusColors]}>
                          {product.status.replace("_", " ")}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-red-600">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
