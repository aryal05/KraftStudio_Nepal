"use client";

import { useState, use } from "react";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Plus, 
  Edit, 
  Trash2, 
  Image as ImageIcon,
  Package,
  DollarSign,
  Eye,
  EyeOff,
  Search,
  Filter,
  Upload,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription,
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";
import { formatNPR } from "@/lib/utils";
import Link from "next/link";

export default function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const categoryId = parseInt(id);

  const [isProductDialogOpen, setIsProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [imageMode, setImageMode] = useState<"url" | "upload">("upload");
  const [tempImageUrl, setTempImageUrl] = useState("");
  const [productImages, setProductImages] = useState<any[]>([]);

  const [productFormData, setProductFormData] = useState({
    name: "",
    slug: "",
    description: "",
    shortDescription: "",
    price: 0,
    stockQuantity: 0,
    inStock: true,
    colors: [{ name: "Default", hex: "#000000", images: [""] }],
    defaultColor: "Default",
  });

  // Fetch category details
  const { data: categories = [], isLoading: isCategoriesLoading } = trpc.categories.getAll.useQuery();
  const category = categories.find((c: any) => c.id === categoryId);

  // Fetch products for this category
  const { data: allProducts = [], refetch: refetchProducts } = trpc.products.getAll.useQuery({
    categoryId,
    limit: 100,
  });

  const createProductMutation = trpc.products.create.useMutation();
  const updateProductMutation = trpc.products.update.useMutation();
  const deleteProductMutation = trpc.products.delete.useMutation();

  // Filter products based on search
  const filteredProducts = allProducts.filter((product: any) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleProductSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const mainImage = productImages.find(img => img.isMain)?.url || productImages[0]?.url;
      const otherImages = productImages.filter(img => !img.isMain).map(img => img.url);

      const productData = {
        ...productFormData,
        categoryId,
        price: Math.round(productFormData.price * 100), // Convert to cents
        colors: [{ name: "Default", hex: "#000000", images: [mainImage, ...otherImages].filter(Boolean) }],
      };

      if (editingProduct) {
        await updateProductMutation.mutateAsync({
          id: editingProduct.id,
          ...productData,
        });
        toast.success("Product updated successfully!");
      } else {
        await createProductMutation.mutateAsync(productData);
        toast.success("Product created successfully!");
      }
      
      refetchProducts();
      resetProductForm();
      setIsProductDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save product");
    }
  };

  const handleEditProduct = (product: any) => {
    setEditingProduct(product);
    setProductFormData({
      name: product.name,
      slug: product.slug,
      description: product.description || "",
      shortDescription: product.shortDescription || "",
      price: product.price / 100, // Convert from cents
      stockQuantity: product.stockQuantity,
      inStock: product.inStock,
      colors: product.colors && product.colors.length > 0 
        ? product.colors 
        : [{ name: "Default", hex: "#000000", images: [""] }],
      defaultColor: product.defaultColor || "Default",
    });
    setIsProductDialogOpen(true);
  };

  const handleDeleteProduct = async (productId: number) => {
    if (!confirm("Are you sure you want to delete this product?")) {
      return;
    }

    try {
      await deleteProductMutation.mutateAsync({ id: productId });
      toast.success("Product deleted successfully!");
      refetchProducts();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete product");
    }
  };

  const resetProductForm = () => {
    setProductFormData({
      name: "",
      slug: "",
      description: "",
      shortDescription: "",
      price: 0,
      stockQuantity: 0,
      inStock: true,
      colors: [{ name: "Default", hex: "#000000", images: [""] }],
      defaultColor: "Default",
    });
    setEditingProduct(null);
    setProductImages([]);
    setTempImageUrl("");
  };

  const handleProductChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProductFormData(prev => ({
      ...prev,
      [name]: ["price", "stockQuantity"].includes(name)
        ? parseFloat(value) || 0
        : value,
    }));

    // Auto-generate slug from name
    if (name === "name" && !editingProduct) {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setProductFormData(prev => ({ ...prev, slug }));
    }
  };

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
          
          const newImage = {
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
      const newImage = {
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

  if (isCategoriesLoading) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="text-center py-20">
            <div className="w-16 h-16 border-4 border-gray-200 border-t-[#8b6f47] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Loading category...</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!category) {
    return (
      <AdminLayout>
        <div className="p-8">
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">Category not found</p>
            <Link href="/admin/categories">
              <Button className="mt-4">Back to Categories</Button>
            </Link>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin/categories">
            <Button variant="outline" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
              <Badge variant={category.isActive ? "default" : "secondary"}>
                {category.isActive ? "Active" : "Inactive"}
              </Badge>
            </div>
            <p className="text-gray-600">
              Manage products in this category • {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>

          <Dialog open={isProductDialogOpen} onOpenChange={(open) => {
            setIsProductDialogOpen(open);
            if (!open) resetProductForm();
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

              <form onSubmit={handleProductSubmit} className="flex flex-col" style={{ height: 'calc(90vh - 180px)' }}>
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
                          value={productFormData.name}
                          onChange={handleProductChange}
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
                          value={productFormData.slug}
                          onChange={handleProductChange}
                          placeholder="modern-leather-sofa"
                          className="h-12 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                        />
                        <p className="text-xs text-gray-500 mt-1.5">Used in the URL, must be unique</p>
                      </div>
                    </div>

                    {/* Short Description (Full Width) */}
                    <div>
                      <label htmlFor="shortDescription" className="block text-sm font-medium text-slate-700 mb-2">
                        Short Description
                      </label>
                      <Input
                        id="shortDescription"
                        name="shortDescription"
                        value={productFormData.shortDescription}
                        onChange={handleProductChange}
                        placeholder="Brief one-line description"
                        className="h-12 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                      />
                    </div>

                    {/* Full Description (Full Width) */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
                        Full Description
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        value={productFormData.description}
                        onChange={handleProductChange}
                        placeholder="Detailed product description..."
                        rows={4}
                        className="px-4 py-3 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all resize-y placeholder:text-gray-400"
                      />
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
                          step="0.01"
                          required
                          value={productFormData.price || ''}
                          onChange={handleProductChange}
                          placeholder="1299.00"
                          className="h-12 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="stockQuantity" className="block text-sm font-medium text-slate-700 mb-2">
                          Stock Quantity <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="stockQuantity"
                          name="stockQuantity"
                          type="number"
                          required
                          value={productFormData.stockQuantity || ''}
                          onChange={handleProductChange}
                          placeholder="10"
                          className="h-12 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-indigo-100 transition-all placeholder:text-gray-400"
                        />
                      </div>
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
                          <p className="text-xs font-medium text-slate-700 mb-2">
                            Images ({productImages.length}/5) - Click to set as main:
                          </p>
                          <div className="grid grid-cols-5 gap-2">
                            {productImages.map((image) => (
                              <div
                                key={image.id}
                                className={`relative aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                                  image.isMain
                                    ? "border-[#4F46E5] ring-2 ring-indigo-100"
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

                    {/* Active Toggle */}
                    <div className="flex items-center justify-between">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-1">
                          Product Status
                        </label>
                        <p className="text-xs text-gray-500">Enable to make this product visible on the store</p>
                      </div>
                      <input
                        type="checkbox"
                        id="inStock"
                        checked={productFormData.inStock}
                        onChange={(e) => setProductFormData(prev => ({ ...prev, inStock: e.target.checked }))}
                        className="sr-only peer"
                      />
                      <label
                        htmlFor="inStock"
                        className="relative inline-flex h-6 w-11 items-center rounded-full peer-checked:bg-[#4F46E5] bg-gray-200 transition-colors cursor-pointer"
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${productFormData.inStock ? 'translate-x-6' : 'translate-x-1'}`} />
                      </label>
                    </div>

                  </div>
                </div>

                {/* Footer - Fixed at Bottom */}
                <div className="flex items-center justify-end gap-3 px-8 py-4 border-t border-gray-200 bg-gray-50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetProductForm();
                      setIsProductDialogOpen(false);
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
                      <span>{editingProduct ? "Updating..." : "Creating..."}</span>
                    ) : (
                      <span>{editingProduct ? "Update Product" : "Create Product"}</span>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product: any) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="relative h-48 bg-gray-100">
                {product.colors && product.colors[0]?.images[0] ? (
                  <img
                    src={product.colors[0].images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                
                {/* Stock Badge */}
                <div className="absolute top-2 right-2">
                  <Badge variant={product.inStock ? "default" : "secondary"} className="text-xs">
                    {product.inStock ? `${product.stockQuantity} in stock` : "Out of stock"}
                  </Badge>
                </div>

                {/* Sale Badge */}
                {product.originalPrice && product.originalPrice > product.price && (
                  <div className="absolute top-2 left-2">
                    <Badge variant="destructive" className="text-xs">
                      SALE
                    </Badge>
                  </div>
                )}
              </div>

              {/* Product Info */}
              <div className="p-4">
                <h3 className="font-bold text-base text-gray-900 mb-2 line-clamp-2">
                  {product.name}
                </h3>
                
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-lg font-bold text-gray-900">
                    {formatNPR(product.price / 100)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <span className="text-sm text-gray-500 line-through">
                      {formatNPR(product.originalPrice / 100)}
                    </span>
                  )}
                </div>

                {product.shortDescription && (
                  <p className="text-xs text-gray-600 mb-3 line-clamp-2">
                    {product.shortDescription}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEditProduct(product)}
                  >
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:border-red-600"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {filteredProducts.length === 0 && (
            <div className="col-span-full text-center py-20">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">
                {searchQuery ? "No products found matching your search" : "No products in this category yet"}
              </p>
              <Button onClick={() => setIsProductDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Product
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
