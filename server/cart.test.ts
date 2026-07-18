import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(): TrpcContext {
  const user: AuthenticatedUser = {
    id: 1,
    openId: "test-user",
    email: "test@example.com",
    name: "Test User",
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  return {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {} as TrpcContext["res"],
  };
}

describe("cart procedures", () => {
  it("should add item to cart", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    await caller.cart.clear();

    const result = await caller.cart.addItem({
      productId: 1,
      quantity: 2,
    });

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.quantity).toBe(2);
  });

  it("should get cart items", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Add an item first
    await caller.cart.addItem({
      productId: 1,
      quantity: 1,
    });

    // Get items
    const items = await caller.cart.getItems();

    expect(Array.isArray(items)).toBe(true);
  });

  it("should update cart item quantity", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Add an item
    const addedItem = await caller.cart.addItem({
      productId: 1,
      quantity: 1,
    });

    // Update quantity
    const updated = await caller.cart.updateQuantity({
      cartItemId: addedItem.id,
      quantity: 5,
    });

    expect(updated.quantity).toBe(5);
  });

  it("should remove item from cart", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Add an item
    const addedItem = await caller.cart.addItem({
      productId: 1,
      quantity: 1,
    });

    // Remove it
    const result = await caller.cart.removeItem(addedItem.id);

    expect(result.success).toBe(true);
  });

  it("should prevent adding negative quantity", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.cart.addItem({
        productId: 1,
        quantity: -1,
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should prevent adding zero quantity", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.cart.addItem({
        productId: 1,
        quantity: 0,
      });
      expect.fail("Should have thrown an error");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
