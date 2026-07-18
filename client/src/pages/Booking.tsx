import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

const timeSlots = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
  "04:00 PM",
];

export default function Booking() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    bookingDate: "",
    bookingTime: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createBookingMutation = trpc.bookings.create.useMutation();

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTimeSelect = (time: string) => {
    setFormData((prev) => ({ ...prev, bookingTime: time }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createBookingMutation.mutateAsync(formData);
      toast.success("Booking request submitted successfully!");
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        bookingDate: "",
        bookingTime: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to submit booking request");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Header */}
      <div className="border-b border-border">
        <div className="container mx-auto px-4 py-8">
          <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
            Book a Consultation
          </h1>
          <p className="text-muted-foreground">
            Let our design experts help you create your perfect space
          </p>
        </div>
      </div>

      {/* Booking Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <Card className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        First Name *
                      </label>
                      <Input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        placeholder="John"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Last Name *
                      </label>
                      <Input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        placeholder="Doe"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Email and Phone */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Email *
                      </label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="john@example.com"
                        className="w-full"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-foreground mb-2">
                        Phone
                      </label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+1 (555) 123-4567"
                        className="w-full"
                      />
                    </div>
                  </div>

                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Preferred Date *
                    </label>
                    <Input
                      type="date"
                      name="bookingDate"
                      value={formData.bookingDate}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-4">
                      Preferred Time *
                    </label>
                    <div className="grid grid-cols-4 gap-3">
                      {timeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleTimeSelect(time)}
                          className={`py-2 px-3 rounded-lg font-semibold transition-all ${
                            formData.bookingTime === time
                              ? "bg-accent text-foreground"
                              : "bg-muted text-foreground hover:bg-muted/80"
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Message (Optional)
                    </label>
                    <Textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Tell us about your project, style preferences, or any specific needs..."
                      className="w-full h-32"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-foreground nav-label"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "SUBMITTING..." : "REQUEST CONSULTATION"}
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Info Sidebar */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 sticky top-24">
                <h2 className="font-serif text-2xl font-bold text-foreground mb-6">
                  Why Book a Consultation?
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Expert Guidance
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Our design experts will help you select the perfect pieces for your space.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Personalized Recommendations
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Get tailored suggestions based on your style, budget, and needs.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Virtual or In-Person
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Choose between a virtual consultation or visit our showroom.
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground mb-2">
                      Exclusive Offers
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Receive special pricing and exclusive deals for consultation clients.
                    </p>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="mt-8 pt-8 border-t border-border">
                  <h3 className="font-semibold text-foreground mb-4">
                    Contact Information
                  </h3>
                  <div className="space-y-3 text-sm text-muted-foreground">
                    <p>
                      <span className="font-semibold">Phone:</span> +1 (555) 123-4567
                    </p>
                    <p>
                      <span className="font-semibold">Email:</span> hello@revylo.com
                    </p>
                    <p>
                      <span className="font-semibold">Hours:</span> Mon-Fri 9AM-6PM EST
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
