import { publicProcedure, router } from "./trpc";
import { z } from "zod";
import { sql } from "drizzle-orm";
import { eq } from "drizzle-orm";
import { products } from "../../drizzle/schema";
import { getDb } from "./db";
import {
  getAllCategories,
  getFeaturedCategories,
  getCategoriesWithSubcategories,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
  getAllSubcategories,
  getSubcategoriesByCategoryId,
  getSubcategoryBySlug,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  getAllProducts,
  getProductBySlug,
  getProductsByCategorySlug,
  getProductsBySubcategorySlug,
  getFeaturedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getUserCartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearUserCart,
  createBooking,
  getUserBookings,
  getAllBookings,
  createMessage,
  getAllMessages,
  updateMessageStatus,
  deleteMessage,
  toggleMessageStar,
  getUserByEmail,
  getAllColorSwatches,
  createColorSwatch,
  updateColorSwatch,
  deleteColorSwatch,
  getAllTestimonials,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getReviewsByProduct,
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} from "./db";
import * as bcrypt from "bcryptjs";

// ========== CATEGORY ROUTER ==========
const categoryRouter = router({
  getAll: publicProcedure.query(async () => {
    return getAllCategories();
  }),

  getFeatured: publicProcedure
    .input(z.object({ limit: z.number().default(3) }).optional())
    .query(async ({ input }) => {
      return getFeaturedCategories(input?.limit || 3);
    }),

  getAllWithSubs: publicProcedure.query(async () => {
    return getCategoriesWithSubcategories();
  }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return getCategoryBySlug(input.slug);
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      slug: z.string(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
      displayOrder: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      return createCategory(input);
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      slug: z.string().optional(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
      displayOrder: z.number().optional(),
      isActive: z.boolean().optional(),
      isFeatured: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateCategory(id, data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return deleteCategory(input.id);
    }),
});

// ========== SUBCATEGORY ROUTER ==========
const subcategoryRouter = router({
  getAll: publicProcedure.query(async () => {
    return getAllSubcategories();
  }),

  getByCategoryId: publicProcedure
    .input(z.object({ categoryId: z.number() }))
    .query(async ({ input }) => {
      return getSubcategoriesByCategoryId(input.categoryId);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return getSubcategoryBySlug(input.slug);
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      slug: z.string(),
      categoryId: z.number(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
      productCount: z.number().default(0),
      displayOrder: z.number().default(0),
    }))
    .mutation(async ({ input }) => {
      return createSubcategory(input);
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      slug: z.string().optional(),
      categoryId: z.number().optional(),
      description: z.string().optional(),
      imageUrl: z.string().optional(),
      productCount: z.number().optional(),
      displayOrder: z.number().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateSubcategory(id, data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return deleteSubcategory(input.id);
    }),
});

// ========== PRODUCT ROUTER ==========
const productRouter = router({
  getAll: publicProcedure
    .input(z.object({
      categoryId: z.number().optional(),
      page: z.number().default(1),
      limit: z.number().default(12),
    }))
    .query(async ({ input }) => {
      const offset = (input.page - 1) * input.limit;
      return getAllProducts(input.categoryId, input.limit, offset);
    }),

  getByCategorySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return getProductsByCategorySlug(input.slug);
    }),

  getBySubcategorySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return getProductsBySubcategorySlug(input.slug);
    }),

  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(async ({ input }) => {
      return getProductBySlug(input.slug);
    }),

  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input }) => {
      const db = await getDb();
      if (!db) return undefined;
      const result = await db.select().from(products).where(eq(products.id, input.id));
      return result.length > 0 ? result[0] : undefined;
    }),

  getFeatured: publicProcedure
    .input(z.object({ limit: z.number().default(6) }))
    .query(async ({ input }) => {
      return getFeaturedProducts(input.limit);
    }),

  getCountsByCategory: publicProcedure
    .query(async () => {
      try {
        const db = await getDb();
        if (!db) return {};

        const allProducts = await db.select({
          categoryId: products.categoryId
        }).from(products);

        // Count products by categoryId
        const counts: any = {};
        allProducts.forEach((product: any) => {
          if (product.categoryId) {
            counts[product.categoryId] = (counts[product.categoryId] || 0) + 1;
          }
        });

        console.log('Product counts by category:', counts);
        return counts;
      } catch (error) {
        console.error('Error fetching product counts by category:', error);
        return {}; // Return empty object on error
      }
    }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      slug: z.string(),
      description: z.string().optional(),
      shortDescription: z.string().optional(),
      categoryId: z.number(),
      subcategoryId: z.number().optional(),
      price: z.number(),
      originalPrice: z.number().optional(),
      inStock: z.boolean().default(true),
      stockQuantity: z.number().default(0),
      colors: z.array(z.object({
        name: z.string(),
        hex: z.string(),
        images: z.array(z.string()),
      })).optional(),
      defaultColor: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      return createProduct(input);
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      slug: z.string().optional(),
      description: z.string().optional(),
      shortDescription: z.string().optional(),
      categoryId: z.number().optional(),
      subcategoryId: z.number().optional(),
      price: z.number().optional(),
      inStock: z.boolean().optional(),
      stockQuantity: z.number().optional(),
      colors: z.array(z.object({
        name: z.string(),
        hex: z.string(),
        images: z.array(z.string()),
      })).optional(),
      defaultColor: z.string().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateProduct(id, data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return deleteProduct(input.id);
    }),
});

// ========== CART ROUTER ==========
const cartRouter = router({
  getItems: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) return [];
    return getUserCartItems(ctx.user.id);
  }),

  addItem: publicProcedure
    .input(z.object({
      productId: z.number(),
      quantity: z.number().default(1),
      selectedColor: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return addToCart(ctx.user.id, input.productId, input.quantity, input.selectedColor);
    }),

  removeItem: publicProcedure
    .input(z.object({ cartItemId: z.number() }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return removeFromCart(input.cartItemId);
    }),

  updateQuantity: publicProcedure
    .input(z.object({
      cartItemId: z.number(),
      quantity: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return updateCartItemQuantity(input.cartItemId, input.quantity);
    }),

  clear: publicProcedure.mutation(async ({ ctx }) => {
    if (!ctx.user) throw new Error("Not authenticated");
    return clearUserCart(ctx.user.id);
  }),
});

// ========== BOOKING ROUTER ==========
const bookingRouter = router({
  create: publicProcedure
    .input(z.object({
      firstName: z.string(),
      lastName: z.string(),
      email: z.string().email(),
      phone: z.string().optional(),
      bookingDate: z.string(),
      bookingTime: z.string(),
      message: z.string().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return createBooking({
        userId: ctx.user?.id,
        ...input,
        status: "pending",
      });
    }),

  getMyBookings: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.user) return [];
    return getUserBookings(ctx.user.id);
  }),

  getAll: publicProcedure.query(async () => {
    return getAllBookings();
  }),
});

// ========== MESSAGE ROUTER ==========
const messageRouter = router({
  create: publicProcedure
    .input(z.object({
      name: z.string(),
      email: z.string().email(),
      phone: z.string().optional(),
      subject: z.string().optional(),
      message: z.string(),
    }))
    .mutation(async ({ input }) => {
      return createMessage(input);
    }),

  getAll: publicProcedure.query(async () => {
    return getAllMessages();
  }),

  getUnreadCount: publicProcedure.query(async () => {
    const messages = await getAllMessages();
    return messages.filter(m => m.status === "unread").length;
  }),

  updateStatus: publicProcedure
    .input(z.object({
      id: z.number(),
      status: z.string(),
    }))
    .mutation(async ({ input }) => {
      return updateMessageStatus(input.id, input.status);
    }),

  toggleStar: publicProcedure
    .input(z.object({
      id: z.number(),
      isStarred: z.boolean(),
    }))
    .mutation(async ({ input }) => {
      return toggleMessageStar(input.id, input.isStarred);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return deleteMessage(input.id);
    }),
});

// ========== AUTH ROUTER ==========
const authRouter = router({
  login: publicProcedure
    .input(z.object({
      email: z.string().email(),
      password: z.string(),
    }))
    .mutation(async ({ input }) => {
      const user = await getUserByEmail(input.email);
      
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const validPassword = await bcrypt.compare(input.password, user.password);
      
      if (!validPassword) {
        throw new Error("Invalid credentials");
      }

      // Return user without password
      const { password, ...userWithoutPassword } = user;
      return {
        success: true,
        user: userWithoutPassword,
      };
    }),

  me: publicProcedure.query(opts => opts.ctx.user),

  logout: publicProcedure.mutation(({ ctx }) => {
    return {
      success: true,
    } as const;
  }),
});

// ========== COLOR SWATCH ROUTER ==========
const colorSwatchRouter = router({
  getAll: publicProcedure.query(async () => {
    return getAllColorSwatches();
  }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      color: z.string(),
      rating: z.number().default(0),
      reviews: z.number().default(0),
      displayOrder: z.number().default(0),
      isActive: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      return createColorSwatch(input);
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      color: z.string().optional(),
      rating: z.number().optional(),
      reviews: z.number().optional(),
      displayOrder: z.number().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateColorSwatch(id, data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return deleteColorSwatch(input.id);
    }),
});

// ========== TESTIMONIAL ROUTER ==========
const testimonialRouter = router({
  getAll: publicProcedure.query(async () => {
    return getAllTestimonials();
  }),

  create: publicProcedure
    .input(z.object({
      name: z.string(),
      role: z.string(),
      content: z.string(),
      image: z.string(),
      rating: z.number().default(5),
      displayOrder: z.number().default(0),
      isActive: z.boolean().default(true),
    }))
    .mutation(async ({ input }) => {
      return createTestimonial(input);
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      role: z.string().optional(),
      content: z.string().optional(),
      image: z.string().optional(),
      rating: z.number().optional(),
      displayOrder: z.number().optional(),
      isActive: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateTestimonial(id, data);
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return deleteTestimonial(input.id);
    }),
});

// ========== REVIEW ROUTER ==========
const reviewRouter = router({
  getByProduct: publicProcedure
    .input(z.object({ productId: z.number() }))
    .query(async ({ input }) => {
      return getReviewsByProduct(input.productId);
    }),

  getAll: publicProcedure.query(async () => {
    return getAllReviews();
  }),

  create: publicProcedure
    .input(z.object({
      productId: z.number(),
      name: z.string(),
      email: z.string().email(),
      rating: z.number().min(1).max(5),
      comment: z.string(),
    }))
    .mutation(async ({ input }) => {
      return createReview({
        ...input,
        rating: input.rating * 10, // Convert to 1-50 scale
        isApproved: false,
      });
    }),

  update: publicProcedure
    .input(z.object({
      id: z.number(),
      name: z.string().optional(),
      email: z.string().email().optional(),
      rating: z.number().min(1).max(5).optional(),
      comment: z.string().optional(),
      isApproved: z.boolean().optional(),
    }))
    .mutation(async ({ input }) => {
      const { id, ...data } = input;
      return updateReview(id, {
        ...data,
        rating: data.rating !== undefined ? data.rating * 10 : undefined,
      });
    }),

  delete: publicProcedure
    .input(z.object({ id: z.number() }))
    .mutation(async ({ input }) => {
      return deleteReview(input.id);
    }),
});

// ========== APP ROUTER ==========
export const appRouter = router({
  auth: authRouter,
  categories: categoryRouter,
  subcategories: subcategoryRouter,
  products: productRouter,
  cart: cartRouter,
  bookings: bookingRouter,
  messages: messageRouter,
  colorSwatches: colorSwatchRouter,
  testimonials: testimonialRouter,
  reviews: reviewRouter,
});

export type AppRouter = typeof appRouter;
