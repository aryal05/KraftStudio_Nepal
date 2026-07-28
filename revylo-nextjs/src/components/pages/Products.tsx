"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, Plus, Eye, Edit, Trash2, MoreVertical, Package, Upload, X, RefreshCw, Star } from "lucide-react";
import { FlyingProduct, SearchResultItem } from "@/lib/adminAnimations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

const statusColors = {
  active: "bg-emerald-100 text-emerald-700",
  low_stock: "bg-yellow-100 text-yellow-700",
  out_of_stock: "bg-red-100 text-red-700",
};

interface ProductImage {
  id: string;
  url: string;
  isMain: boolean;
}

export default function AdminProducts() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [productImages, setProductImages] = useState<ProductImage[]>([]);
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    sku: "",
    description: "",
    price: "",
    originalPrice: "",
    stock: "10",
    categoryId: "",
    isActive: true,
  });

  const { data: dbCategories = [] } = trpc.categories.getAll.useQuery();
  const { data: dbProducts = [], refetch: refetchProducts } = trpc.products.getAll.useQuery({ limit: 100 });
  const createProductMutation = trpc.products.create.useMutation();
  const updateProductMutation = trpc.products.update.useMutation();
  const deleteProductMutation = trpc.products.delete.useMutation();

  const filteredProducts = dbProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.categoryId === parseInt(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && productImages.length < 5) {
      for (const file of Array.from(files)) {
        if (productImages.length >= 5) break;
        
        try {
          const formData = new FormData();
          formData.append('file', file);
          
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error || 'Upload failed');
          }
          
          const data = await response.json();
          
          const newImage: ProductImage = {
            id: Math.random().toString(36).substr(2, 9),
            url: data.url,
            isMain: productImages.length === 0,
          };
          setProductImages(prev => [...prev, newImage]);
        } catch (error) {
          console.error('Error uploading image:', error);
          alert('Failed to upload image. Please try again.');
        }
      }
    }
  };

  const handleImageUrlAdd = () => {
    if (tempImageUrl && productImages.length < 5) {
      const newImage: ProductImage = {
        id: Math.random().toString(36).substr(2, 9),
        url: tempImageUrl,
        isMain: productImages.length === 0,
      };
      setProductImages(prev => [...prev, newImage]);
      setTempImageUrl("");
    }
  };

  const setMainImage = (id: string) => {
    setProductImages(prev => prev.map(img => ({
      ...img,
      isMain: img.id === id
    })));
  };

  const removeImage = (id: string) => {
    setProductImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      if (filtered.length > 0 && !filtered.some(img => img.isMain)) {
        filtered[0].isMain = true;
      }
      return filtered;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const mainImage = productImages.find(img => img.isMain)?.url || productImages[0]?.url;
      const otherImages = productImages.filter(img => !img.isMain).map(img => img.url);

      const productData = {
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        categoryId: parseInt(formData.categoryId),
        price: parseFloat(formData.price),
        description: formData.description,
        imageUrl: mainImage,
        images: [mainImage, ...otherImages],
        stockQuantity: parseInt(formData.stock),
        inStock: parseInt(formData.stock) > 0,
      };

      if (editingProduct) {
        await updateProductMutation.mutateAsync({
          id: editingProduct.id,
          ...productData,
        });
        toast.success("Product updated successfully!");
        refetchProducts();
      } else {
        await createProductMutation.mutateAsync(productData);
        toast.success("Product created successfully!");
        refetchProducts();
      }
      
      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save product");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      sku: "",
      description: "",
      price: "",
      originalPrice: "",
      stock: "",
      categoryId: "",
      isActive: true,
    });
    setProductImages([]);
    setTempImageUrl("");
    setImageMode("url");
    setEditingProduct(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));

    // Auto-generate slug from name
    if (name === "name") {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleEdit = (product: any) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      slug: product.slug,
      sku: "",
      description: product.description || "",
      price: (product.price / 100).toString(),
      originalPrice: "",
      stock: product.stockQuantity.toString(),
      categoryId: product.categoryId.toString(),
      isActive: true,
    });

    // Load images from product - check multiple possible structures
    let images: ProductImage[] = [];
    if (product.colors && product.colors.length > 0 && product.colors[0].images) {
      images = product.colors[0].images.map((url: string, index: number) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: url,
        isMain: index === 0,
      }));
    } else if (product.images && product.images.length > 0) {
      images = product.images.map((url: string, index: number) => ({
        id: Math.random().toString(36).substr(2, 9),
        url: url,
        isMain: index === 0,
      }));
    } else if (product.imageUrl) {
      images = [{
        id: Math.random().toString(36).substr(2, 9),
        url: product.imageUrl,
        isMain: true,
      }];
    }
    setProductImages(images);

    setIsDialogOpen(true);
  };

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
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 bg-white">
              {/* Header */}
              <div className="px-8 pt-6 pb-5 border-b border-gray-200">
                <DialogTitle className="text-2xl font-bold text-[#1E293B] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {editingProduct ? "Edit Product" : "Add New Product"}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  {editingProduct 
                    ? "Update the product information to refine your inventory" 
                    : "Fill in the details to create a new product"}
                </DialogDescription>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col" style={{ height: 'calc(90vh - 180px)' }}>
                {/* Form Body - Scrollable */}
                <div className="flex-1 overflow-y-auto px-8 py-6">
                  <div className="space-y-6">
                    {/* Name + Slug (Two Columns) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-2">
                          Product Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g., Modern Leather Sofa"
                          className="h-12 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-slate-700 mb-2">
                          URL Slug <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="slug"
                          name="slug"
                          type="text"
                          required
                          value={formData.slug}
                          onChange={handleChange}
                          placeholder="modern-leather-sofa"
                          className="h-12 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                        />
                        <p className="text-xs text-gray-500 mt-1.5">Used in the URL, must be unique</p>
                      </div>
                    </div>

                    {/* Category (Full Width) */}
                    <div>
                      <label htmlFor="categoryId" className="block text-sm font-medium text-slate-700 mb-2">
                        Category <span className="text-red-500">*</span>
                      </label>
                      <Select value={formData.categoryId} onValueChange={(value) => setFormData(prev => ({ ...prev, categoryId: value }))}>
                        <SelectTrigger className="h-12 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all">
                          <SelectValue placeholder="Select category" className="placeholder:text-gray-400" />
                        </SelectTrigger>
                        <SelectContent>
                          {dbCategories.map((cat: any) => (
                            <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Price / Stock (Two Columns) */}
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="price" className="block text-sm font-medium text-slate-700 mb-2">
                          Price (NPR) <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          required
                          value={formData.price || ''}
                          onChange={handleChange}
                          placeholder="e.g., 129900"
                          className="h-12 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="stock" className="block text-sm font-medium text-slate-700 mb-2">
                          Stock Quantity <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="stock"
                          name="stock"
                          type="number"
                          required
                          value={formData.stock || ''}
                          onChange={handleChange}
                          placeholder="e.g., 24"
                          className="h-12 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                        />
                      </div>
                    </div>

                    {/* Description (Full Width) */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                        Full Description
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write a detailed description of the product..."
                        rows={4}
                        className="px-4 py-3 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all resize-y placeholder:text-gray-400"
                      />
                      <p className="text-xs text-gray-500 mt-1.5">Optional: Describe the product features and details</p>
                    </div>

                    {/* Active Toggle */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Product Status
                        </label>
                        <p className="text-xs text-gray-500">Enable to make this product visible on the store</p>
                      </div>
                      <Switch
                        checked={formData.isActive}
                        onCheckedChange={(checked) => setFormData(prev => ({ ...prev, isActive: checked }))}
                        className="data-[state=checked]:bg-[#4F46E5]"
                      />
                    </div>

                    {/* Product Images Section */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Product Images (Up to 5)
                      </label>
                      
                      {/* Image Mode Toggle */}
                      <div className="flex gap-2 mb-3">
                        <button
                          type="button"
                          onClick={() => setImageMode("url")}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            imageMode === "url"
                              ? "bg-[#4F46E5] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Image URL
                        </button>
                        <button
                          type="button"
                          onClick={() => setImageMode("upload")}
                          className={`flex-1 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            imageMode === "upload"
                              ? "bg-[#4F46E5] text-white"
                              : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                          }`}
                        >
                          Upload Images
                        </button>
                      </div>

                      {/* Image URL Input */}
                      {imageMode === "url" && (
                        <div className="flex gap-2">
                          <Input
                            value={tempImageUrl}
                            onChange={(e) => setTempImageUrl(e.target.value)}
                            placeholder="https://example.com/images/product.jpg"
                            className="flex-1 h-12 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                          />
                          <Button
                            type="button"
                            onClick={handleImageUrlAdd}
                            disabled={!tempImageUrl || productImages.length >= 5}
                            className="px-4 bg-[#4F46E5] hover:bg-[#4338CA] text-white"
                          >
                            Add
                          </Button>
                        </div>
                      )}

                      {/* Image Upload */}
                      {imageMode === "upload" && (
                        <div>
                          <div className="relative">
                            <input
                              type="file"
                              id="imageUpload"
                              accept="image/*"
                              multiple
                              onChange={handleImageUpload}
                              className="hidden"
                              disabled={productImages.length >= 5}
                            />
                            <label
                              htmlFor="imageUpload"
                              className={`flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                                productImages.length >= 5
                                  ? "border-gray-200 bg-gray-50 cursor-not-allowed"
                                  : "border-gray-300 hover:border-[#4F46E5] hover:bg-gray-50"
                              }`}
                            >
                              <Upload className="w-5 h-5 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {productImages.length >= 5 
                                  ? "Maximum 5 images reached" 
                                  : `Click to upload images (${productImages.length}/5)`}
                              </span>
                            </label>
                          </div>
                        </div>
                      )}

                      {/* Images Grid with Main Selection */}
                      {productImages.length > 0 && (
                        <div className="mt-4">
                          <p className="text-xs font-medium text-[#334155] mb-2">
                            Images ({productImages.length}/5) - Click to set as main:
                          </p>
                          <div className="grid grid-cols-5 gap-2">
                            {productImages.map((image) => (
                              <div
                                key={image.id}
                                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                  image.isMain
                                    ? "border-[#4F46E5] ring-2 ring-[#E0E7FF]"
                                    : "border-gray-200 hover:border-gray-300"
                                }`}
                                onClick={() => setMainImage(image.id)}
                              >
                                <img
                                  src={image.url}
                                  alt="Product image"
                                  className="w-full h-full object-cover"
                                />
                                {image.isMain && (
                                  <div className="absolute top-1 left-1 bg-[#4F46E5] text-white text-xs px-1.5 py-0.5 rounded">
                                    Main
                                  </div>
                                )}
                                <button
                                  type="button"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(image.id);
                                  }}
                                  className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer - Fixed at Bottom */}
                <div className="flex items-center justify-end gap-3 px-8 py-4 border-t border-gray-200 bg-gray-50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}
                    className="px-6 py-2.5 border border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-all"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createProductMutation.isPending || updateProductMutation.isPending}
                    className="px-6 py-2.5 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createProductMutation.isPending || updateProductMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        {editingProduct ? "Updating..." : "Creating..."}
                      </span>
                    ) : (
                      <span>{editingProduct ? "Update Product" : "Create Product"}</span>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
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
                className="pl-10 bg-gray-50 border-0 placeholder:text-gray-400"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[180px] bg-gray-50 border-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Categories</SelectItem>
                {dbCategories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id.toString()}>{cat.name}</SelectItem>
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
                            src={product.colors?.[0]?.images?.[0] || 'https://via.placeholder.com/400x300'}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute top-3 right-3 flex gap-2">
                            <Badge className={product.inStock ? statusColors.active : statusColors.out_of_stock}>
                              {product.inStock ? 'In Stock' : 'Out of Stock'}
                            </Badge>
                          </div>
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                            <Button size="sm" variant="secondary" className="gap-2">
                              <Eye className="w-4 h-4" />
                              View
                            </Button>
                            <Button size="sm" variant="secondary" className="gap-2" onClick={() => handleEdit(product)}>
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
                              <p className="text-xs text-gray-500">{product.slug}</p>
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
                                <DropdownMenuItem onClick={() => handleEdit(product)}>
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

                          <Badge variant="outline" className="mb-3">{dbCategories.find(c => c.id === product.categoryId)?.name || 'Unknown'}</Badge>

                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center gap-1">
                              <svg className="w-4 h-4 text-yellow-400 fill-yellow-400" viewBox="0 0 24 24">
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                              </svg>
                              <span className="text-sm font-medium text-gray-700">{(product.rating / 100).toFixed(1)}</span>
                              <span className="text-xs text-gray-500">({product.reviewCount})</span>
                            </div>
                            <p className="text-xl font-bold text-gray-900">NPR {(product.price / 100).toLocaleString()}</p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-3 border-t border-gray-100">
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Stock</p>
                              <p className="text-sm font-semibold text-gray-900">{product.stockQuantity} units</p>
                            </div>
                            <div>
                              <p className="text-xs text-gray-500 mb-1">Status</p>
                              <p className="text-sm font-semibold text-gray-900">{product.inStock ? 'In Stock' : 'Out of Stock'}</p>
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
                            <AvatarImage src={product.colors?.[0]?.images?.[0]} />
                            <AvatarFallback className="rounded-lg bg-gray-100">
                              <Package className="w-6 h-6 text-gray-400" />
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-gray-900">{product.name}</p>
                            <p className="text-xs text-gray-500">{product.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline">{dbCategories.find(c => c.id === product.categoryId)?.name || 'Unknown'}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-semibold text-gray-900">NPR {(product.price / 100).toLocaleString()}</p>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-gray-700">{product.stockQuantity} units</p>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={product.inStock ? statusColors.active : statusColors.out_of_stock}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </Badge>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => handleEdit(product)}>
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
