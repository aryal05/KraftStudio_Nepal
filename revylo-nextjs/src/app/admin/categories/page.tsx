"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Edit, Trash2, Image as ImageIcon, Eye, EyeOff, RefreshCw, Upload, X, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import AdminLayout from "@/components/AdminLayout";
import { Switch } from "@/components/ui/switch";
import { useQueryClient } from "@tanstack/react-query";

export default function CategoriesPage() {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<any>(null);
  const [imageMode, setImageMode] = useState<"url" | "upload">("url");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    description: "",
    imageUrl: "",
    displayOrder: 0,
    isFeatured: false,
  });

  const { data: categories = [], refetch } = trpc.categories.getAll.useQuery();
  const createCategoryMutation = trpc.categories.create.useMutation();
  const updateCategoryMutation = trpc.categories.update.useMutation();
  const deleteCategoryMutation = trpc.categories.delete.useMutation();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result as string);
        setFormData(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const finalImageUrl = imageMode === "upload" ? uploadedImage : formData.imageUrl;
      
      if (editingCategory) {
        await updateCategoryMutation.mutateAsync({
          id: editingCategory.id,
          ...formData,
          imageUrl: finalImageUrl || formData.imageUrl,
        });
        toast.success("Category updated successfully!");
      } else {
        await createCategoryMutation.mutateAsync({
          ...formData,
          imageUrl: finalImageUrl || formData.imageUrl,
        });
        toast.success("Category created successfully!");
      }
      
      refetch();
      resetForm();
      setIsDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Failed to save category");
    }
  };

  const handleEdit = (category: any) => {
    setEditingCategory(category);
    setFormData({
      name: category.name,
      slug: category.slug,
      description: category.description || "",
      imageUrl: category.imageUrl || "",
      displayOrder: category.displayOrder,
      isFeatured: category.isFeatured || false,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category? All products in this category will also be deleted.")) {
      return;
    }

    try {
      await deleteCategoryMutation.mutateAsync({ id });
      toast.success("Category deleted successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete category");
    }
  };

  const handleToggleActive = async (category: any) => {
    try {
      await updateCategoryMutation.mutateAsync({
        id: category.id,
        isActive: !category.isActive,
      });
      toast.success(`Category ${category.isActive ? 'hidden' : 'activated'} successfully!`);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update category");
    }
  };

  const handleToggleFeatured = async (category: any) => {
    try {
      await updateCategoryMutation.mutateAsync({
        id: category.id,
        isFeatured: !category.isFeatured,
      });
      toast.success(`Category ${category.isFeatured ? 'removed from featured' : 'marked as featured'} successfully!`);
      refetch();
      // Invalidate queries to update data across the app
      queryClient.invalidateQueries({ queryKey: ['categories', 'getAll'] });
      queryClient.invalidateQueries({ queryKey: ['categories', 'getFeatured'] });
    } catch (error: any) {
      toast.error(error.message || "Failed to update category");
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      slug: "",
      description: "",
      imageUrl: "",
      displayOrder: 0,
      isFeatured: false,
    });
    setEditingCategory(null);
    setImageMode("url");
    setUploadedImage(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "displayOrder" ? parseInt(value) || 0 : value,
    }));

    // Auto-generate slug from name
    if (name === "name") {
      const slug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleFeaturedToggle = (checked: boolean) => {
    setFormData(prev => ({ ...prev, isFeatured: checked }));
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Category Management</h1>
            <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Create and manage product categories</p>
          </div>

          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) resetForm();
          }}>
            <DialogTrigger asChild>
              <Button className="flex items-center gap-2">
                <Plus className="w-4 h-4" />
                Add Category
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-hidden p-0 bg-white">
              {/* Header */}
              <div className="px-8 pt-6 pb-5 border-b border-gray-200">
                <DialogTitle className="text-2xl font-bold text-[#1E293B] mb-2" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
                  {editingCategory ? "Edit Category" : "Add New Category"}
                </DialogTitle>
                <DialogDescription className="text-sm text-gray-500">
                  {editingCategory 
                    ? "Update the category information to refine your product organization" 
                    : "Create a new category to organize your products effectively"}
                </DialogDescription>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col" style={{ height: 'calc(90vh - 180px)' }}>
                {/* Form Body - Scrollable */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Name + Slug (Two Columns) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-[#334155] mb-2">
                          Category Name <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="e.g., Living Room Furniture"
                          className="h-11 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-[#E0E7FF] transition-all placeholder:text-gray-400"
                        />
                      </div>

                      <div>
                        <label htmlFor="slug" className="block text-sm font-medium text-[#334155] mb-2">
                          URL Slug <span className="text-red-500">*</span>
                        </label>
                        <Input
                          id="slug"
                          name="slug"
                          type="text"
                          required
                          value={formData.slug}
                          onChange={handleChange}
                          placeholder="living-room-furniture"
                          className="h-11 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-[#E0E7FF] transition-all placeholder:text-gray-400"
                        />
                        <p className="text-xs text-gray-500 mt-1.5">Used in the URL, must be unique</p>
                      </div>
                    </div>

                    {/* Description (Full Width) */}
                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-[#334155] mb-2">
                        Description
                      </label>
                      <Textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Write a brief description of this category to help customers understand what products they'll find here..."
                        rows={4}
                        className="px-4 py-3 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-[#E0E7FF] transition-all resize-y placeholder:text-gray-400"
                      />
                      <p className="text-xs text-gray-500 mt-1.5">Optional: Describe the types of products in this category</p>
                    </div>

                    {/* Image Section - URL or Upload */}
                    <div>
                      <label className="block text-sm font-medium text-[#334155] mb-2">
                        Category Image
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
                          Upload Image
                        </button>
                      </div>

                      {/* Image URL Input */}
                      {imageMode === "url" && (
                        <div>
                          <Input
                            id="imageUrl"
                            name="imageUrl"
                            type="url"
                            value={formData.imageUrl}
                            onChange={handleChange}
                            placeholder="https://example.com/images/category-image.jpg"
                            className="h-11 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-[#E0E7FF] transition-all placeholder:text-gray-400"
                          />
                          <p className="text-xs text-gray-500 mt-1.5">Recommended size: 800x600px or larger</p>
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
                              onChange={handleImageUpload}
                              className="hidden"
                            />
                            <label
                              htmlFor="imageUpload"
                              className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#4F46E5] hover:bg-gray-50 transition-all"
                            >
                              <Upload className="w-5 h-5 text-gray-400" />
                              <span className="text-sm text-gray-600">
                                {uploadedImage ? "Change image" : "Click to upload image"}
                              </span>
                            </label>
                          </div>
                          <p className="text-xs text-gray-500 mt-1.5">Supported formats: JPG, PNG, WEBP (Max 5MB)</p>
                        </div>
                      )}

                      {/* Image Preview */}
                      {(formData.imageUrl || uploadedImage) && (
                        <div className="mt-3 relative">
                          <p className="text-xs font-medium text-[#334155] mb-2">Preview:</p>
                          <div className="relative">
                            <img 
                              src={imageMode === "upload" ? uploadedImage || "" : formData.imageUrl} 
                              alt="Preview" 
                              className="w-full h-48 object-cover rounded-lg border-2 border-gray-200"
                              onError={(e) => {
                                e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100'%3E%3Crect fill='%23f0f0f0' width='100' height='100'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='14'%3EInvalid Image%3C/text%3E%3C/svg%3E";
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => {
                                setFormData(prev => ({ ...prev, imageUrl: "" }));
                                setUploadedImage(null);
                              }}
                              className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Display Order + Active Toggle + Featured Toggle (Three Columns) */}
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <label htmlFor="displayOrder" className="block text-sm font-medium text-[#334155] mb-2">
                          Display Order
                        </label>
                        <Input
                          id="displayOrder"
                          name="displayOrder"
                          type="number"
                          value={formData.displayOrder}
                          onChange={handleChange}
                          placeholder="0"
                          className="h-11 px-4 border-gray-300 rounded-lg focus:border-[#4F46E5] focus:ring-2 focus:ring-[#E0E7FF] transition-all placeholder:text-gray-400"
                        />
                        <p className="text-xs text-gray-500 mt-1.5">Lower numbers appear first</p>
                      </div>

                      <div>
                        <label htmlFor="isActive" className="block text-sm font-medium text-[#334155] mb-2">
                          Category Status
                        </label>
                        <div className="flex items-center h-11 px-4 border border-gray-300 rounded-lg bg-gray-50">
                          <Switch
                            id="isActive"
                            checked={editingCategory?.isActive ?? true}
                            onCheckedChange={(checked) => {
                              if (editingCategory) {
                                setEditingCategory({ ...editingCategory, isActive: checked });
                              }
                            }}
                            className="data-[state=checked]:bg-[#4F46E5]"
                          />
                          <label htmlFor="isActive" className="ml-3 text-sm text-[#334155] cursor-pointer">
                            {editingCategory?.isActive ?? true ? 'Active' : 'Hidden'}
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5">Show/hide category</p>
                      </div>

                      <div>
                        <label htmlFor="isFeatured" className="block text-sm font-medium text-[#334155] mb-2">
                          Featured
                        </label>
                        <div className="flex items-center h-11 px-4 border border-gray-300 rounded-lg bg-gray-50">
                          <Switch
                            id="isFeatured"
                            checked={formData.isFeatured}
                            onCheckedChange={handleFeaturedToggle}
                            className="data-[state=checked]:bg-[#4F46E5]"
                          />
                          <label htmlFor="isFeatured" className="ml-3 text-sm text-[#334155] cursor-pointer">
                            {formData.isFeatured ? 'Featured' : 'Not Featured'}
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-1.5">Show on homepage</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer - Fixed at Bottom */}
                <div className="flex items-center justify-end gap-3 px-4 sm:px-6 lg:px-8 py-4 border-t border-gray-200 bg-gray-50">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      resetForm();
                      setIsDialogOpen(false);
                    }}
                    className="px-5 py-2 border-2 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition-all"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createCategoryMutation.isPending || updateCategoryMutation.isPending}
                    className="px-6 py-2 bg-[#4F46E5] hover:bg-[#4338CA] text-white rounded-lg font-semibold shadow-sm hover:shadow-md transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {createCategoryMutation.isPending || updateCategoryMutation.isPending ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="w-4 h-4 animate-spin" />
                        {editingCategory ? "Updating..." : "Creating..."}
                      </span>
                    ) : (
                      <span>{editingCategory ? "Update Category" : "Create Category"}</span>
                    )}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {categories.map((category: any) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              {/* Category Image */}
              <div className="relative h-48 bg-gray-100">
                {category.imageUrl ? (
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300'%3E%3Crect fill='%23f0f0f0' width='400' height='300'/%3E%3Ctext fill='%23999' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='18'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <ImageIcon className="w-16 h-16 text-gray-400" />
                  </div>
                )}

                {/* Badges */}
                <div className="absolute top-2 right-2 flex flex-col gap-2">
                  {/* Featured Badge */}
                  <button
                    onClick={() => handleToggleFeatured(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      category.isFeatured
                        ? "bg-yellow-500 text-white"
                        : "bg-gray-400 text-white"
                    }`}
                  >
                    <span className="flex items-center gap-1">
                      <Star className="w-3 h-3" /> {category.isFeatured ? 'Featured' : 'Not Featured'}
                    </span>
                  </button>
                  {/* Active/Inactive Badge */}
                  <button
                    onClick={() => handleToggleActive(category)}
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      category.isActive
                        ? "bg-green-500 text-white"
                        : "bg-gray-500 text-white"
                    }`}
                  >
                    {category.isActive ? (
                      <span className="flex items-center gap-1">
                        <Eye className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1">
                        <EyeOff className="w-3 h-3" /> Hidden
                      </span>
                    )}
                  </button>
                </div>
              </div>

              {/* Category Info */}
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-bold text-lg text-gray-900">{category.name}</h3>
                    <p className="text-sm text-gray-500">/{category.slug}</p>
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    Order: {category.displayOrder}
                  </span>
                </div>

                {category.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {category.description}
                  </p>
                )}

                {/* Actions */}
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => window.location.href = `/admin/categories/${category.id}`}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View Products
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(category)}
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:text-red-700 hover:border-red-600"
                    onClick={() => handleDelete(category.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}

          {categories.length === 0 && (
            <div className="col-span-full text-center py-12">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No categories yet</p>
              <Button onClick={() => setIsDialogOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Category
              </Button>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
