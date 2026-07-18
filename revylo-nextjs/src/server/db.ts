// @ts-nocheck
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, products, cartItems, bookings } from "../../drizzle/schema";

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  // For static deployment, return null - no database needed
  if (!process.env.DATABASE_URL) {
    return null;
  }
  
  if (!_db) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    // @ts-ignore - Drizzle ORM type compatibility issue
    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Products queries
export async function getAllProducts(category?: string, limit: number = 12, offset: number = 0) {
  const db = await getDb();
  if (!db) return [];
  
  if (category) {
    return db.select().from(products).where(eq(products.category, category as any)).limit(limit).offset(offset);
  }
  
  return db.select().from(products).limit(limit).offset(offset);
}

export async function getProductBySlug(slug: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(products).where(eq(products.slug, slug)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getFeaturedProducts(limit: number = 6) {
  const db = await getDb();
  if (!db) return [];

  return db.select().from(products).limit(limit);
}

// Cart queries
export async function getUserCartItems(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return db
    .select({
      id: cartItems.id,
      userId: cartItems.userId,
      productId: cartItems.productId,
      quantity: cartItems.quantity,
      product: products,
    })
    .from(cartItems)
    .innerJoin(products, eq(cartItems.productId, products.id))
    .where(eq(cartItems.userId, userId));
}

export async function addToCart(userId: number, productId: number, quantity: number = 1) {
  const db = await getDb();
  if (!db) return undefined;

  await db.insert(cartItems).values({ userId, productId, quantity });
  
  // Fetch and return the created item
  const created = await db.select().from(cartItems).where(eq(cartItems.userId, userId)).orderBy((t) => t.id).limit(1);
  return created.length > 0 ? created[0] : undefined;
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

  await db.update(cartItems).set({ quantity }).where(eq(cartItems.id, cartItemId));
  
  // Fetch and return the updated item
  const updated = await db.select().from(cartItems).where(eq(cartItems.id, cartItemId)).limit(1);
  return updated.length > 0 ? updated[0] : undefined;
}

export async function clearUserCart(userId: number) {
  const db = await getDb();
  if (!db) return false;

  await db.delete(cartItems).where(eq(cartItems.userId, userId));
  return true;
}

// Bookings queries
export async function createBooking(data: any) {
  const db = await getDb();
  if (!db) return undefined;

  await db.insert(bookings).values(data);
  
  // Fetch and return the created booking
  const created = await db.select().from(bookings).orderBy((t) => t.id).limit(1);
  return created.length > 0 ? created[0] : undefined;
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
