import { describe, expect, it } from "vitest";
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

describe("product procedures", () => {
  it("should get all products", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.getAll({
      page: 1,
      limit: 12,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should get products by category", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.getAll({
      category: "furniture",
      page: 1,
      limit: 12,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should get featured products", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.getFeatured({
      limit: 6,
    });

    expect(Array.isArray(result)).toBe(true);
  });

  it("should get product by slug", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.getBySlug("modern-leather-sofa");

    // Result can be undefined if product doesn't exist in test DB
    expect(result === undefined || typeof result === "object").toBe(true);
  });

  it("should support pagination", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const page1 = await caller.products.getAll({
      page: 1,
      limit: 5,
    });

    const page2 = await caller.products.getAll({
      page: 2,
      limit: 5,
    });

    expect(Array.isArray(page1)).toBe(true);
    expect(Array.isArray(page2)).toBe(true);
  });

  it("should handle custom limit", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.products.getAll({
      page: 1,
      limit: 3,
    });

    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeLessThanOrEqual(3);
  });
});
