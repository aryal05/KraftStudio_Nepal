"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Star, Check, X, Trash2, RefreshCw, Edit2, Square, CheckSquare2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import AdminLayout from "@/components/AdminLayout";

export default function ReviewsPage() {
  const { data: reviews = [], refetch } = trpc.reviews.getAll.useQuery();
  const { data: products = [] } = trpc.products.getAll.useQuery({ limit: 100 });
  const approveMutation = trpc.reviews.update.useMutation();
  const deleteMutation = trpc.reviews.delete.useMutation();
  const [selectedReviews, setSelectedReviews] = useState<Set<number>>(new Set());
  const [editingReview, setEditingReview] = useState<any>(null);
  const [editForm, setEditForm] = useState({ name: '', email: '', rating: 5, comment: '' });

  const getProductName = (productId: number) => {
    const product = products.find((p: any) => p.id === productId);
    return product?.name || `Product ${productId}`;
  };

  const toggleSelectReview = (reviewId: number) => {
    const newSelected = new Set(selectedReviews);
    if (newSelected.has(reviewId)) {
      newSelected.delete(reviewId);
    } else {
      newSelected.add(reviewId);
    }
    setSelectedReviews(newSelected);
  };

  const toggleSelectAll = () => {
    if (selectedReviews.size === reviews.length) {
      setSelectedReviews(new Set());
    } else {
      setSelectedReviews(new Set(reviews.map((r: any) => r.id)));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedReviews.size === 0) {
      toast.error("No reviews selected");
      return;
    }
    if (!confirm(`Are you sure you want to delete ${selectedReviews.size} review(s)?`)) return;
    
    try {
      await Promise.all(
        Array.from(selectedReviews).map((id) => deleteMutation.mutateAsync({ id }))
      );
      toast.success(`${selectedReviews.size} review(s) deleted successfully!`);
      setSelectedReviews(new Set());
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete reviews");
    }
  };

  const handleBulkApprove = async () => {
    const pendingReviews = reviews.filter((r: any) => !r.isApproved);
    if (pendingReviews.length === 0) {
      toast.error("No pending reviews to approve");
      return;
    }
    if (!confirm(`Are you sure you want to approve all ${pendingReviews.length} pending review(s)?`)) return;
    
    try {
      await Promise.all(
        pendingReviews.map((review: any) => 
          approveMutation.mutateAsync({ id: review.id, isApproved: true })
        )
      );
      toast.success(`${pendingReviews.length} review(s) approved successfully!`);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to approve reviews");
    }
  };

  const handleEdit = (review: any) => {
    setEditingReview(review);
    setEditForm({
      name: review.name,
      email: review.email,
      rating: review.rating / 10,
      comment: review.comment,
    });
  };

  const handleSaveEdit = async () => {
    try {
      await approveMutation.mutateAsync({
        id: editingReview.id,
        name: editForm.name,
        email: editForm.email,
        rating: editForm.rating,
        comment: editForm.comment,
      });
      toast.success("Review updated successfully!");
      setEditingReview(null);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update review");
    }
  };

  const handleApprove = async (review: any) => {
    try {
      await approveMutation.mutateAsync({
        id: review.id,
        isApproved: !review.isApproved,
      });
      toast.success(`Review ${review.isApproved ? 'unapproved' : 'approved'} successfully!`);
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to update review");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this review?")) return;
    
    try {
      await deleteMutation.mutateAsync({ id });
      toast.success("Review deleted successfully!");
      refetch();
    } catch (error: any) {
      toast.error(error.message || "Failed to delete review");
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const normalizedRating = rating / 10; // Convert from 1-50 to 1-5
    
    for (let i = 1; i <= 5; i++) {
      if (i <= normalizedRating) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <AdminLayout>
      <div className="p-4 sm:p-6 lg:p-8 bg-[#F8FAFC] min-h-screen">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-serif">Review Management</h1>
            <p className="text-slate-500 mt-1 sm:mt-2 text-sm">Manage and moderate product reviews</p>
          </div>
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            {reviews.filter((r: any) => !r.isApproved).length > 0 && (
              <Button
                onClick={handleBulkApprove}
                variant="outline"
                className="flex items-center gap-2 rounded-lg border-green-200 text-green-600 hover:bg-green-50 transition-all duration-200 text-sm"
              >
                <Check className="w-4 h-4" />
                <span className="hidden sm:inline">Approve All</span>
                <span className="sm:hidden">All</span>
                <span className="hidden sm:inline">({reviews.filter((r: any) => !r.isApproved).length})</span>
              </Button>
            )}
            {selectedReviews.size > 0 && (
              <Button
                onClick={handleBulkDelete}
                variant="outline"
                className="flex items-center gap-2 rounded-lg border-red-200 text-red-600 hover:bg-red-50 transition-all duration-200 text-sm"
              >
                <Trash2 className="w-4 h-4" />
                <span className="hidden sm:inline">Delete Selected</span>
                <span className="sm:hidden">Delete</span>
                <span className="hidden sm:inline">({selectedReviews.size})</span>
              </Button>
            )}
            <Button
              onClick={() => refetch()}
              variant="outline"
              className="flex items-center gap-2 rounded-lg border-gray-200 hover:bg-gray-100 transition-all duration-200 text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <Card className="border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-l-blue-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Total Reviews</p>
                  <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-1">{reviews.length}</p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Star className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-l-green-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Approved</p>
                  <p className="text-2xl sm:text-3xl font-bold text-green-600 mt-1">
                    {reviews.filter((r: any) => r.isApproved).length}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Check className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="border border-gray-200 shadow-sm rounded-xl hover:shadow-md hover:-translate-y-0.5 transition-all duration-200 border-l-4 border-l-amber-500">
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500 font-medium">Pending</p>
                  <p className="text-2xl sm:text-3xl font-bold text-amber-600 mt-1">
                    {reviews.filter((r: any) => !r.isApproved).length}
                  </p>
                </div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <X className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reviews List */}
        <div className="space-y-4">
          {reviews.length > 0 && (
            <div className="flex items-center gap-2 mb-4">
              <button
                onClick={toggleSelectAll}
                className="flex items-center gap-2 text-sm text-slate-600 hover:text-slate-900 transition-colors"
              >
                {selectedReviews.size === reviews.length ? (
                  <CheckSquare2 className="w-5 h-5" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
                Select All
              </button>
            </div>
          )}
          
          {reviews.length === 0 ? (
            <Card className="border border-gray-200 shadow-sm rounded-xl">
              <CardContent className="p-12 text-center">
                <Star className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-slate-500">No reviews yet</p>
              </CardContent>
            </Card>
          ) : (
            reviews.map((review: any) => (
              <motion.div
                key={review.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`border border-gray-200 shadow-sm rounded-xl hover:shadow-md transition-all duration-200 ${selectedReviews.has(review.id) ? 'ring-2 ring-blue-500' : ''}`}>
                  <CardContent className="p-4 sm:p-6">
                    <div className="flex items-start gap-3 sm:gap-4">
                      <button
                        onClick={() => toggleSelectReview(review.id)}
                        className="mt-1 flex-shrink-0"
                      >
                        {selectedReviews.has(review.id) ? (
                          <CheckSquare2 className="w-5 h-5 text-blue-600" />
                        ) : (
                          <Square className="w-5 h-5 text-gray-400" />
                        )}
                      </button>
                      <div className="flex-1 min-w-0">
                        {editingReview?.id === review.id ? (
                          <div className="space-y-3 sm:space-y-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                <input
                                  type="text"
                                  value={editForm.name}
                                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                <input
                                  type="email"
                                  value={editForm.email}
                                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                  className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Rating</label>
                              <div className="flex items-center gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => setEditForm({ ...editForm, rating: star })}
                                    className="focus:outline-none"
                                  >
                                    <Star
                                      className={`w-6 h-6 ${
                                        star <= editForm.rating
                                          ? 'fill-yellow-400 text-yellow-400'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  </button>
                                ))}
                              </div>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-slate-700 mb-1">Review</label>
                              <textarea
                                value={editForm.comment}
                                onChange={(e) => setEditForm({ ...editForm, comment: e.target.value })}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                              />
                            </div>
                            <div className="flex items-center gap-2">
                              <Button 
                                onClick={handleSaveEdit} 
                                className="bg-[#2d4a3e] hover:bg-[#1e352b] text-white px-6 py-2 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg"
                              >
                                Save Changes
                              </Button>
                              <Button 
                                onClick={() => setEditingReview(null)} 
                                variant="outline"
                                className="border-gray-200 text-slate-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                              >
                                Cancel
                              </Button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="flex items-center gap-1">
                                {renderStars(review.rating)}
                              </div>
                              <Badge
                                className={
                                  review.isApproved
                                    ? "bg-green-50 text-green-700 border-green-200 rounded-full text-xs font-medium px-3 py-1"
                                    : "bg-amber-50 text-amber-700 border-amber-200 rounded-full text-xs font-medium px-3 py-1"
                                }
                              >
                                {review.isApproved ? "Approved" : "Pending"}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-slate-900 mb-1 text-base">{review.name}</h3>
                            <p className="text-sm text-slate-500 mb-3">{review.email}</p>
                            <p className="text-gray-700 text-sm leading-relaxed mb-4">{review.comment}</p>
                            <div className="pt-3 border-t border-gray-100">
                              <p className="text-xs text-slate-400">
                                {getProductName(review.productId)} • {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                      {editingReview?.id !== review.id && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEdit(review)}
                            className="border-gray-200 text-slate-600 hover:bg-gray-50 rounded-lg transition-all duration-200"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleApprove(review)}
                            className={
                              review.isApproved
                                ? "border-yellow-200 text-yellow-600 hover:bg-yellow-50 rounded-lg transition-all duration-200"
                                : "border-green-200 text-green-600 hover:bg-green-50 rounded-lg transition-all duration-200"
                            }
                          >
                            {review.isApproved ? (
                              <X className="w-4 h-4" />
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(review.id)}
                            className="border-red-200 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
