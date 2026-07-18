"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { DroppingLetters, WalkingText, FloatingText } from "@/lib/animations";
import { Sparkles, ChevronDown } from "lucide-react";

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

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    alert("Booking request submitted successfully!");
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      bookingDate: "",
      bookingTime: "",
      message: "",
    });
    setIsSubmitting(false);
  };

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section */}
        <section className="relative h-[50vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1920&h=1080&fit=crop&q=80"
              alt="Booking hero"
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-900/50 to-gray-900" />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-transparent to-gray-900/70" />

          <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 text-center py-12">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 15, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm mb-8"
            >
              <Sparkles className="w-4 h-4" />
              <WalkingText text="DESIGN CONSULTATION" className="tracking-wide font-['Syne']" />
            </motion.div>

            <FloatingText duration={4} distance={12}>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight font-['DM_Serif_Display'] overflow-hidden">
                <DroppingLetters text="Book Your" delay={0.4} />
              </div>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-normal text-white mb-8 leading-tight font-['DM_Serif_Display'] overflow-hidden">
                <DroppingLetters text="Consultation" delay={1} />
              </div>
            </FloatingText>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.6 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto font-['Space_Grotesk'] px-4"
            >
              Let our design experts help you create your perfect space
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ChevronDown className="w-8 h-8 text-white/70" />
            </motion.div>
          </motion.div>
        </section>

        {/* Booking Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="lg:col-span-2"
              >
                <Card className="p-8 bg-white shadow-lg border-0">
                  <h2 className="font-serif text-3xl font-semibold text-gray-900 mb-2">
                    Request a Consultation
                  </h2>
                  <p className="text-gray-600 mb-8 font-['Space_Grotesk']">
                    Fill out the form below and our design team will get back to you within 24 hours.
                  </p>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2 font-['Syne']">
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
                        <label className="block text-sm font-semibold text-gray-900 mb-2 font-['Syne']">
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
                        <label className="block text-sm font-semibold text-gray-900 mb-2 font-['Syne']">
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
                        <label className="block text-sm font-semibold text-gray-900 mb-2 font-['Syne']">
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
                      <label className="block text-sm font-semibold text-gray-900 mb-2 font-['Syne']">
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
                      <label className="block text-sm font-semibold text-gray-900 mb-4 font-['Syne']">
                        Preferred Time *
                      </label>
                      <div className="grid grid-cols-4 gap-3">
                        {timeSlots.map((time) => (
                          <button
                            key={time}
                            type="button"
                            onClick={() => handleTimeSelect(time)}
                            className={`py-2 px-3 rounded-lg font-semibold transition-all font-['Space_Grotesk'] ${
                              formData.bookingTime === time
                                ? "bg-gray-900 text-white"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                            }`}
                          >
                            {time}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2 font-['Syne']">
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
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-gray-900 hover:bg-gray-800 text-white px-8 py-6 text-base font-medium font-['Syne']"
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? "SUBMITTING..." : "REQUEST CONSULTATION"}
                      </Button>
                    </motion.div>
                  </form>
                </Card>
              </motion.div>

              {/* Info Sidebar */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Card className="p-8 sticky top-24 bg-white shadow-lg border-0">
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                    Why Book a Consultation?
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 font-['Syne']">
                        Expert Guidance
                      </h3>
                      <p className="text-gray-600 text-sm font-['Space_Grotesk']">
                        Our design experts will help you select the perfect pieces for your space.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 font-['Syne']">
                        Personalized Recommendations
                      </h3>
                      <p className="text-gray-600 text-sm font-['Space_Grotesk']">
                        Get tailored suggestions based on your style, budget, and needs.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 font-['Syne']">
                        Virtual or In-Person
                      </h3>
                      <p className="text-gray-600 text-sm font-['Space_Grotesk']">
                        Choose between a virtual consultation or visit our showroom.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2 font-['Syne']">
                        Exclusive Offers
                      </h3>
                      <p className="text-gray-600 text-sm font-['Space_Grotesk']">
                        Receive special pricing and exclusive deals for consultation clients.
                      </p>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-4 font-['Syne']">
                      Contact Information
                    </h3>
                    <div className="space-y-3 text-sm text-gray-600 font-['Space_Grotesk']">
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
    </PageTransition>
  );
}
