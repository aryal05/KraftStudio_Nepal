import { pgTable, serial, varchar, text, timestamp, integer, boolean, json, index } from "drizzle-orm/pg-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = pgTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: serial("id").primaryKey(),
  /** Admin email for authentication */
  email: varchar("email", { length: 320 }).notNull().unique(),
  /** Hashed password */
  password: text("password").notNull(),
  name: text("name"),
  role: varchar("role", { length: 20 }).default("admin").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Dynamic categories table
export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull().unique(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  imageUrl: text("imageUrl"),
  displayOrder: integer("displayOrder").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  isFeatured: boolean("isFeatured").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (table) => ({
  isActiveIdx: index("categories_isActive_idx").on(table.isActive),
  isFeaturedIdx: index("categories_isFeatured_idx").on(table.isFeatured),
  displayOrderIdx: index("categories_displayOrder_idx").on(table.displayOrder),
}));

export type Category = typeof categories.$inferSelect;
export type InsertCategory = typeof categories.$inferInsert;

// Subcategories table
export const subcategories = pgTable("subcategories", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  categoryId: integer("categoryId").notNull().references(() => categories.id, { onDelete: "cascade" }),
  description: text("description"),
  imageUrl: text("imageUrl"),
  productCount: integer("productCount").default(0).notNull(),
  displayOrder: integer("displayOrder").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Subcategory = typeof subcategories.$inferSelect;
export type InsertSubcategory = typeof subcategories.$inferInsert;
export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  slug: varchar("slug", { length: 255 }).notNull().unique(),
  description: text("description"),
  shortDescription: text("shortDescription"),
  categoryId: integer("categoryId").notNull().references(() => categories.id, { onDelete: "cascade" }),
  subcategoryId: integer("subcategoryId").references(() => subcategories.id, { onDelete: "set null" }),
  price: integer("price").notNull(), // Store as cents to avoid float issues
  originalPrice: integer("originalPrice"),
  inStock: boolean("inStock").default(true).notNull(),
  stockQuantity: integer("stockQuantity").default(0).notNull(),
  rating: integer("rating").default(0), // 0-500 representing 0-5.0
  reviewCount: integer("reviewCount").default(0),
  colors: json("colors").$type<{ name: string; hex: string; images: string[] }[]>().default([]),
  defaultColor: varchar("defaultColor", { length: 50 }),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Product = typeof products.$inferSelect;
export type InsertProduct = typeof products.$inferInsert;

export const cartItems = pgTable("cartItems", {
  id: serial("id").primaryKey(),
  userId: integer("userId").notNull(),
  productId: integer("productId").notNull(),
  selectedColor: varchar("selectedColor", { length: 50 }),
  quantity: integer("quantity").default(1).notNull(),
  addedAt: timestamp("addedAt").defaultNow().notNull(),
});

export type CartItem = typeof cartItems.$inferSelect;
export type InsertCartItem = typeof cartItems.$inferInsert;

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  userId: integer("userId"),
  firstName: varchar("firstName", { length: 255 }).notNull(),
  lastName: varchar("lastName", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  bookingDate: varchar("bookingDate", { length: 10 }).notNull(), // YYYY-MM-DD format
  bookingTime: varchar("bookingTime", { length: 20 }).notNull(), // HH:MM format
  message: text("message"),
  status: varchar("status", { length: 20 }).default("pending").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = typeof bookings.$inferInsert;

// Contact messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  subject: varchar("subject", { length: 255 }),
  message: text("message").notNull(),
  status: varchar("status", { length: 20 }).default("unread").notNull(), // unread, read, replied, archived
  isStarred: boolean("isStarred").default(false).notNull(),
  priority: varchar("priority", { length: 20 }).default("normal").notNull(), // normal, urgent
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = typeof messages.$inferInsert;

// Color swatches table
export const colorSwatches = pgTable("colorSwatches", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  color: varchar("color", { length: 50 }).notNull(),
  rating: integer("rating").default(0).notNull(), // 0-50 representing 0-5.0
  reviews: integer("reviews").default(0).notNull(),
  displayOrder: integer("displayOrder").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (table) => ({
  isActiveIdx: index("colorSwatches_isActive_idx").on(table.isActive),
  displayOrderIdx: index("colorSwatches_displayOrder_idx").on(table.displayOrder),
}));

export type ColorSwatch = typeof colorSwatches.$inferSelect;
export type InsertColorSwatch = typeof colorSwatches.$inferInsert;

// Testimonials table
export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  role: varchar("role", { length: 255 }).notNull(),
  content: text("content").notNull(),
  image: text("image").notNull(),
  rating: integer("rating").default(5).notNull(), // 0-50 representing 0-5.0
  displayOrder: integer("displayOrder").default(0).notNull(),
  isActive: boolean("isActive").default(true).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (table) => ({
  isActiveIdx: index("testimonials_isActive_idx").on(table.isActive),
  displayOrderIdx: index("testimonials_displayOrder_idx").on(table.displayOrder),
}));

export type Testimonial = typeof testimonials.$inferSelect;
export type InsertTestimonial = typeof testimonials.$inferInsert;

// Product reviews table
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("productId").notNull().references(() => products.id, { onDelete: "cascade" }),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 320 }).notNull(),
  rating: integer("rating").notNull(), // 1-50 representing 1-5.0
  comment: text("comment").notNull(),
  isApproved: boolean("isApproved").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (table) => ({
  productIdIdx: index("reviews_productId_idx").on(table.productId),
  isApprovedIdx: index("reviews_isApproved_idx").on(table.isApproved),
}));

export type Review = typeof reviews.$inferSelect;
export type InsertReview = typeof reviews.$inferInsert;
