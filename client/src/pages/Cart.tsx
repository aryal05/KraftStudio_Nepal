import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Trash2, ArrowLeft } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

export default function Cart() {
  const { data: cartItems = [] } = trpc.cart.getItems.useQuery();
  const removeItemMutation = trpc.cart.removeItem.useMutation();
  const updateQuantityMutation = trpc.cart.updateQuantity.useMutation();

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeItemMutation.mutateAsync(cartItemId);
      toast.success("Item removed from cart");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  const handleUpdateQuantity = async (cartItemId: number, quantity: number) => {
    if (quantity < 1) return;
    try {
      await updateQuantityMutation.mutateAsync({ cartItemId, quantity });
    } catch (error) {
      toast.error("Failed to update quantity");
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + (item.product?.price || 0) * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-serif text-4xl font-bold text-foreground">
            Shopping Cart
          </h1>
        </div>
      </div>

      {/* Cart Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {cartItems.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <p className="text-2xl text-muted-foreground mb-8">
                Your cart is empty
              </p>
              <Button asChild className="bg-accent hover:bg-accent/90">
                <Link href="/furniture">
                  <a>CONTINUE SHOPPING</a>
                </Link>
              </Button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Cart Items */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <div className="space-y-6">
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      <Card className="p-6 flex gap-6">
                        {/* Product Image */}
                        <div className="w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-muted">
                          <img
                            src={item.product?.imageUrl || ""}
                            alt={item.product?.name}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1">
                          <h3 className="font-serif font-bold text-foreground mb-2">
                            {item.product?.name}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4">
                            {item.product?.shortDescription}
                          </p>
                          <p className="font-serif text-lg font-bold text-accent">
                            ${item.product?.price}
                          </p>
                        </div>

                        {/* Quantity and Actions */}
                        <div className="flex flex-col items-end justify-between">
                          <button
                            onClick={() => handleRemoveItem(item.id)}
                            className="p-2 hover:bg-muted rounded-lg transition-colors text-destructive"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>

                          {/* Quantity Controls */}
                          <div className="flex items-center border border-border rounded-lg">
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-3 py-1 hover:bg-muted transition-colors"
                            >
                              −
                            </button>
                            <span className="px-4 py-1 font-semibold">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                handleUpdateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-3 py-1 hover:bg-muted transition-colors"
                            >
                              +
                            </button>
                          </div>

                          {/* Line Total */}
                          <p className="font-serif font-bold text-foreground">
                            ${(item.product?.price || 0) * item.quantity}
                          </p>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Continue Shopping */}
                <div className="mt-8">
                  <Link href="/furniture">
                    <a className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors">
                      <ArrowLeft className="w-4 h-4" />
                      Continue Shopping
                    </a>
                  </Link>
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 sticky top-24">
                  <h2 className="font-serif text-2xl font-bold text-foreground mb-8">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Shipping</span>
                      <span>FREE</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Tax (10%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <div className="border-t border-border pt-4 flex justify-between font-serif text-xl font-bold text-accent">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-foreground nav-label mb-4"
                  >
                    PROCEED TO CHECKOUT
                  </Button>

                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full nav-label"
                    asChild
                  >
                    <Link href="/furniture">
                      <a>CONTINUE SHOPPING</a>
                    </Link>
                  </Button>

                  {/* Trust Badges */}
                  <div className="mt-8 pt-8 border-t border-border space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-start gap-3">
                      <span className="text-lg">✓</span>
                      <span>Free shipping on orders over $100</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">✓</span>
                      <span>30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-lg">✓</span>
                      <span>Secure checkout with SSL encryption</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
