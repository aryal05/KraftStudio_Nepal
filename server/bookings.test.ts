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

describe("booking procedures", () => {
  it("should create a booking request", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const bookingData = {
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      bookingDate: "2024-12-25",
      bookingTime: "10:00 AM",
      message: "I'm interested in furniture consultation",
    };

    const result = await caller.bookings.create(bookingData);

    expect(result).toBeDefined();
    expect(result.id).toBeDefined();
    expect(result.firstName).toBe("John");
    expect(result.email).toBe("john@example.com");
  });

  it("should validate required fields", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.bookings.create({
        firstName: "",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1234567890",
        bookingDate: "2024-12-25",
        bookingTime: "10:00 AM",
        message: "",
      });
      expect.fail("Should have thrown an error for empty firstName");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should validate email format", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    try {
      await caller.bookings.create({
        firstName: "John",
        lastName: "Doe",
        email: "invalid-email",
        phone: "+1234567890",
        bookingDate: "2024-12-25",
        bookingTime: "10:00 AM",
        message: "",
      });
      expect.fail("Should have thrown an error for invalid email");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should validate booking date is in future", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    const pastDate = new Date();
    pastDate.setDate(pastDate.getDate() - 1);

    try {
      await caller.bookings.create({
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        phone: "+1234567890",
        bookingDate: pastDate.toISOString().split("T")[0],
        bookingTime: "10:00 AM",
        message: "",
      });
      expect.fail("Should have thrown an error for past date");
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it("should get user bookings", async () => {
    const ctx = createAuthContext();
    const caller = appRouter.createCaller(ctx);

    // Create a booking
    await caller.bookings.create({
      firstName: "John",
      lastName: "Doe",
      email: "john@example.com",
      phone: "+1234567890",
      bookingDate: "2024-12-25",
      bookingTime: "10:00 AM",
      message: "Test booking",
    });

    // Get bookings
    const bookings = await caller.bookings.getMyBookings();

    expect(Array.isArray(bookings)).toBe(true);
  });
});
