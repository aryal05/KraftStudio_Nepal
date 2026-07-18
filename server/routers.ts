import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router } from "./_core/trpc";
import {
  getAllProducts,
  getProductBySlug,
  getFeaturedProducts,
  getUserCartItems,
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
  clearUserCart,
  createBooking,
  getUserBookings,
} from "./db";

export const appRouter = router({
  system: systemRouter,
  
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  products: router({
    getAll: publicProcedure
      .input((val: any) => ({
        category: val?.category,
        page: val?.page ?? 1,
        limit: val?.limit ?? 12,
      }))
      .query(async ({ input }) => {
        const offset = (input.page - 1) * input.limit;
        return getAllProducts(input.category, input.limit, offset);
      }),
    
    getBySlug: publicProcedure
      .input((val: any) => val?.slug as string)
      .query(async ({ input }) => {
        return getProductBySlug(input);
      }),
    
    getFeatured: publicProcedure
      .input((val: any) => ({ limit: val?.limit ?? 6 }))
      .query(async ({ input }) => {
        return getFeaturedProducts(input.limit);
      }),
  }),

  cart: router({
    getItems: publicProcedure.query(async ({ ctx }) => {
      if (!ctx.user) return [];
      return getUserCartItems(ctx.user.id);
    }),
    
    addItem: publicProcedure
      .input((val: any) => ({
        productId: val?.productId as number,
        quantity: val?.quantity ?? 1,
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Not authenticated");
        return addToCart(ctx.user.id, input.productId, input.quantity);
      }),
    
    removeItem: publicProcedure
      .input((val: any) => val?.cartItemId as number)
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Not authenticated");
        return removeFromCart(input);
      }),
    
    updateQuantity: publicProcedure
      .input((val: any) => ({
        cartItemId: val?.cartItemId as number,
        quantity: val?.quantity as number,
      }))
      .mutation(async ({ ctx, input }) => {
        if (!ctx.user) throw new Error("Not authenticated");
        return updateCartItemQuantity(input.cartItemId, input.quantity);
      }),
    
    clear: publicProcedure.mutation(async ({ ctx }) => {
      if (!ctx.user) throw new Error("Not authenticated");
      return clearUserCart(ctx.user.id);
    }),
  }),

  bookings: router({
    create: publicProcedure
      .input((val: any) => ({
        firstName: val?.firstName as string,
        lastName: val?.lastName as string,
        email: val?.email as string,
        phone: val?.phone as string,
        bookingDate: val?.bookingDate as string,
        bookingTime: val?.bookingTime as string,
        message: val?.message as string,
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
  }),
});

export type AppRouter = typeof appRouter;
