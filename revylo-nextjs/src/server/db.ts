// @ts-nocheck
import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import {
  InsertUser,
  InsertCategory,
  InsertSubcategory,
  InsertProduct,
  InsertMessage,
  InsertBooking,
  InsertColorSwatch,
  InsertTestimonial,
  InsertReview,
  users,
  products,
  categories,
  subcategories,
  cartItems,
  bookings,
  messages,
  colorSwatches,
  testimonials,
  reviews
} from "../../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance
export async function getDb() {
  if (!process.env.DATABASE_URL) {
    console.warn("[Database] DATABASE_URL not configured");
    return null;
  }
  
  if (!_db) {
    try {
      const sql = neon(process.env.DATABASE_URL);
      _db = drizzle(sql);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

// ========== USER QUERIES ==========
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createUser(userData: InsertUser) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(users).values(userData).returning();
  return result[0];
}

// ========== CATEGORY QUERIES ==========
export async function getAllCategories() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(categories).orderBy(categories.displayOrder);
}

export async function getFeaturedCategories(limit: number = 3) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(categories)
    .where(and(eq(categories.isFeatured, true), eq(categories.isActive, true)))
    .orderBy(categories.displayOrder)
    .limit(limit);
}

export async function getCategoriesWithSubcategories() {
  const db = await getDb();
  if (!db) return [];

  const cats = await db.select().from(categories).where(eq(categories.isActive, true)).orderBy(categories.displayOrder);
  
  const result = await Promise.all(
    cats.map(async (cat) => {
      const subs = await db
        .select()
        .from(subcategories)
        .where(eq(subcategories.categoryId, cat.id))
        .where(eq(subcategories.isActive, true))
        .orderBy(subcategories.displayOrder);
      return { ...cat, subcategories: subs };
    })
  );
  
  return result;
}

export async function getCategoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(categories).where(eq(categories.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createCategory(data: InsertCategory) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(categories).values(data).returning();
  return result[0];
}

export async function updateCategory(id: number, data: Partial<InsertCategory>) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.update(categories).set({ ...data, updatedAt: new Date() }).where(eq(categories.id, id)).returning();
  return result[0];
}

export async function deleteCategory(id: number) {
  const db = await getDb();
  if (!db) return false;

  await db.delete(categories).where(eq(categories.id, id));
  return true;
}

// ========== SUBCATEGORY QUERIES ==========
export async function getAllSubcategories() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(subcategories).where(eq(subcategories.isActive, true)).orderBy(subcategories.displayOrder);
}

export async function getSubcategoriesByCategoryId(categoryId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(subcategories)
    .where(eq(subcategories.categoryId, categoryId))
    .where(eq(subcategories.isActive, true))
    .orderBy(subcategories.displayOrder);
}

export async function getSubcategoryBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(subcategories).where(eq(subcategories.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function createSubcategory(data: InsertSubcategory) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(subcategories).values(data).returning();
  return result[0];
}

export async function updateSubcategory(id: number, data: Partial<InsertSubcategory>) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.update(subcategories).set({ ...data, updatedAt: new Date() }).where(eq(subcategories.id, id)).returning();
  return result[0];
}

export async function deleteSubcategory(id: number) {
  const db = await getDb();
  if (!db) return false;

  await db.delete(subcategories).where(eq(subcategories.id, id));
  return true;
}

// ========== PRODUCT QUERIES ==========
export async function getAllProducts(categoryId?: number, limit: number = 12, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  if (categoryId) {
    return db.select().from(products).where(eq(products.categoryId, categoryId)).limit(limit).offset(offset);
  }
  
  return db.select().from(products).limit(limit).offset(offset);
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getProductsByCategorySlug(categorySlug: string) {
  const db = await getDb();
  if (!db) return [];

  const category = await getCategoryBySlug(categorySlug);
  if (!category) return [];

  return db.select().from(products).where(eq(products.categoryId, category.id));
}

export async function getProductsBySubcategorySlug(subcategorySlug: string) {
  const db = await getDb();
  if (!db) return [];

  const subcategory = await getSubcategoryBySlug(subcategorySlug);
  if (!subcategory) return [];

  return db.select().from(products).where(eq(products.subcategoryId, subcategory.id));
}

export async function getFeaturedProducts(limit: number = 6) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(products).where(eq(products.inStock, true)).limit(limit);
}

export async function createProduct(data: InsertProduct) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(products).values(data).returning();
  return result[0];
}

export async function updateProduct(id: number, data: Partial<InsertProduct>) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.update(products).set({ ...data, updatedAt: new Date() }).where(eq(products.id, id)).returning();
  return result[0];
}

export async function deleteProduct(id: number) {
  const db = await getDb();
  if (!db) return false;

  await db.delete(products).where(eq(products.id, id));
  return true;
}

// ========== CART QUERIES ==========
export async function getUserCartItems(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      id: cartItems.id,
      userId: cartItems.userId,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      selectedColor: cartItems.selectedColor,
      product: products,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.userId, userId));
}

export async function addToCart(userId: number, productId: number, quantity: number = 1, selectedColor?: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(cartItems).values({ userId, productId, quantity, selectedColor }).returning();
  return result[0];
}

export async function removeFromCart(cartItemId: number) {
  const db = await getDb();
  if (!db) return { success: false };

  await db.delete(cartItems).where(eq(cartItems.id, cartItemId));
  return { success: true };
}

export async function updateCartItemQuantity(cartItemId: number, quantity: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, cartItemId)).returning();
  return result[0];
}

export async function clearUserCart(userId: number) {
  const db = await getDb();
  if (!db) return false;

  await db.delete(cartItems).where(eq(cartItems.userId, userId));
  return true;
}

// ========== BOOKING QUERIES ==========
export async function createBooking(data: InsertBooking) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(bookings).values(data).returning();
  return result[0];
}

export async function getUserBookings(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(bookings).where(eq(bookings.userId, userId));
}

export async function getAllBookings() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(bookings);
}

// ========== MESSAGE QUERIES ==========
export async function createMessage(data: InsertMessage) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(messages).values(data).returning();
  return result[0];
}

export async function getAllMessages() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(messages).orderBy(messages.createdAt);
}

export async function updateMessageStatus(id: number, status: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.update(messages).set({ status, updatedAt: new Date() }).where(eq(messages.id, id)).returning();
  return result[0];
}

export async function deleteMessage(id: number) {
  const db = await getDb();
  if (!db) return false;

  await db.delete(messages).where(eq(messages.id, id));
  return true;
}

// ========== COLOR SWATCH QUERIES ==========
export async function getAllColorSwatches() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(colorSwatches).where(eq(colorSwatches.isActive, true)).orderBy(colorSwatches.displayOrder);
}

export async function createColorSwatch(data: InsertColorSwatch) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(colorSwatches).values(data).returning();
  return result[0];
}

export async function updateColorSwatch(id: number, data: Partial<InsertColorSwatch>) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.update(colorSwatches).set({ ...data, updatedAt: new Date() }).where(eq(colorSwatches.id, id)).returning();
  return result[0];
}

export async function deleteColorSwatch(id: number) {
  const db = await getDb();
  if (!db) return false;

  await db.delete(colorSwatches).where(eq(colorSwatches.id, id));
  return true;
}

// ========== TESTIMONIAL QUERIES ==========
export async function getAllTestimonials() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(testimonials).where(eq(testimonials.isActive, true)).orderBy(testimonials.displayOrder);
}

export async function createTestimonial(data: InsertTestimonial) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(testimonials).values(data).returning();
  return result[0];
}

export async function updateTestimonial(id: number, data: Partial<InsertTestimonial>) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.update(testimonials).set({ ...data, updatedAt: new Date() }).where(eq(testimonials.id, id)).returning();
  return result[0];
}

export async function deleteTestimonial(id: number) {
  const db = await getDb();
  if (!db) return false;

  await db.delete(testimonials).where(eq(testimonials.id, id));
  return true;
}

// ========== REVIEW QUERIES ==========
export async function getReviewsByProduct(productId: number) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reviews).where(and(eq(reviews.productId, productId), eq(reviews.isApproved, true))).orderBy(reviews.createdAt);
}

export async function getAllReviews() {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(reviews).where(eq(reviews.isApproved, true)).orderBy(reviews.createdAt);
}

export async function createReview(data: InsertReview) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.insert(reviews).values({ ...data, isApproved: true }).returning();
  
  // Update product rating and review count
  const productReviews = await db.select().from(reviews).where(eq(reviews.productId, data.productId));
  const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
  const avgRating = Math.round((totalRating / productReviews.length) * 10); // Convert to 0-500 scale
  await db.update(products).set({
    rating: avgRating,
    reviewCount: productReviews.length,
    updatedAt: new Date()
  }).where(eq(products.id, data.productId));
  
  return result[0];
}

export async function updateReview(id: number, data: Partial<InsertReview>) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.update(reviews).set({ ...data, updatedAt: new Date() }).where(eq(reviews.id, id)).returning();
  
  // Recalculate product rating if approval status changed
  if (data.isApproved !== undefined) {
    const review = await db.select().from(reviews).where(eq(reviews.id, id)).limit(1);
    if (review.length > 0) {
      const productReviews = await db.select().from(reviews).where(and(eq(reviews.productId, review[0].productId), eq(reviews.isApproved, true)));
      const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
      const avgRating = productReviews.length > 0 ? Math.round((totalRating / productReviews.length) * 10) : 0;
      await db.update(products).set({
        rating: avgRating,
        reviewCount: productReviews.length,
        updatedAt: new Date()
      }).where(eq(products.id, review[0].productId));
    }
  }
  
  return result[0];
}

export async function deleteReview(id: number) {
  const db = await getDb();
  if (!db) return false;

  const review = await db.select().from(reviews).where(eq(reviews.id, id)).limit(1);
  await db.delete(reviews).where(eq(reviews.id, id));
  
  // Recalculate product rating
  if (review.length > 0) {
    const productReviews = await db.select().from(reviews).where(and(eq(reviews.productId, review[0].productId), eq(reviews.isApproved, true)));
    const totalRating = productReviews.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = productReviews.length > 0 ? Math.round((totalRating / productReviews.length) * 10) : 0;
    await db.update(products).set({
      rating: avgRating,
      reviewCount: productReviews.length,
      updatedAt: new Date()
    }).where(eq(products.id, review[0].productId));
  }
  
  return true;
}

export async function toggleMessageStar(id: number, isStarred: boolean) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .update(messages)
    .set({ isStarred, updatedAt: new Date() })
    .where(eq(messages.id, id))
    .returning();
  return result[0];
}
