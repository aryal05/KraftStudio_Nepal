"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageCircle,
  Sparkles,
  ChevronDown,
  ArrowRight,
  Facebook,
  Instagram,
  Palette,
  Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { DroppingLetters, WalkingText, FloatingText, FadeSlideIn, ScaleFade } from "@/lib/animations";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const createMessageMutation = trpc.messages.create.useMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await createMessageMutation.mutateAsync(formData);
      toast.success("Message sent successfully! We'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      toast.error("Failed to send message. Please try again.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactMethods = [
    {
      icon: Phone,
      title: "Phone",
      content: "+977 976-9682175",
      description: "Mon-Sat, 9AM-6PM",
      href: "tel:+9779769682175",
      color: "blue"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      content: "+977 976-9682175",
      description: "Chat with us anytime",
      href: "https://wa.me/9779769682175",
      color: "green"
    },
    {
      icon: Mail,
      title: "Email",
      content: "kraftstudio.np@gmail.com",
      description: "We reply within 24 hours",
      href: "mailto:kraftstudio.np@gmail.com",
      color: "purple"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      content: "Bhaktapur, Nepal",
      description: "View on Google Maps",
      href: "#map",
      color: "red"
    },
  ];

  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Section with Background */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop"
              alt="Contact us"
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
              <WalkingText text="GET IN TOUCH" className="tracking-wide font-['Syne']" />
            </motion.div>

            <FloatingText duration={4} distance={12}>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight font-['DM_Serif_Display'] overflow-hidden">
                <DroppingLetters text="Contact Us" delay={0.4} />
              </div>
            </FloatingText>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto font-['Space_Grotesk'] px-4"
            >
              Have a question? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
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

        {/* Contact Methods - Quick Links */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <FadeSlideIn key={method.title} direction="up" delay={index * 0.1}>
                  <a href={method.href} target={method.title === "WhatsApp" ? "_blank" : undefined} rel={method.title === "WhatsApp" ? "noopener noreferrer" : undefined}>
                    <motion.div
                      whileHover={{ y: -8, scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      className="group block h-full"
                    >
                      <Card className="p-6 h-full hover:shadow-2xl transition-all duration-500 border-0 bg-white">
                        <div className={`w-14 h-14 rounded-2xl bg-${method.color}-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                          <method.icon className={`w-7 h-7 text-${method.color}-600`} />
                        </div>
                        <h3 className="font-['Syne'] font-bold text-xl text-gray-900 mb-2">
                          {method.title}
                        </h3>
                        <p className="font-['Space_Grotesk'] font-semibold text-gray-900 mb-1">
                          {method.content}
                        </p>
                        <p className="text-sm text-gray-600 mb-3">
                          {method.description}
                        </p>
                        <div className="flex items-center text-gray-900 font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                          {method.title === "WhatsApp" ? "Chat Now" : "Contact"}
                          <ArrowRight className="w-4 h-4" />
                        </div>
                      </Card>
                    </motion.div>
                  </a>
                </FadeSlideIn>
              ))}
            </div>
          </div>
        </section>

        {/* Main Contact Section */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <FadeSlideIn direction="left">
                <Card className="p-8 lg:p-10 border-0 shadow-xl bg-white">
                  <h2 className="font-['DM_Serif_Display'] text-3xl md:text-4xl font-light text-gray-900 mb-3">
                    Send Us a Message
                  </h2>
                  <p className="text-gray-600 mb-8 font-['Space_Grotesk']">
                    Fill out the form below and our team will get back to you within 24 hours.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 font-['Syne']">
                          Full Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          type="text"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 font-['Syne']">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Enter your email address"
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2 font-['Syne']">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="Enter your phone number"
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all duration-200"
                        />
                      </div>

                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2 font-['Syne']">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          type="text"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="What is this regarding?"
                          className="w-full h-12 rounded-xl border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all duration-200"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2 font-['Syne']">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Please describe your inquiry in detail..."
                        rows={6}
                        className="w-full rounded-xl border-gray-200 focus:border-gray-300 focus:ring-2 focus:ring-gray-100 transition-all duration-200 resize-none"
                      />
                    </div>

                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full h-14 text-base font-['Syne'] rounded-xl bg-[#8b6f47] hover:bg-[#73593a] text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        disabled={createMessageMutation.isPending}
                      >
                        {createMessageMutation.isPending ? (
                          <>Sending...</>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </motion.div>
                  </form>
                </Card>
              </FadeSlideIn>

              {/* Contact Information & Map */}
              <div className="space-y-6">
                <FadeSlideIn direction="right" delay={0.2}>
                  <Card className="p-8 border-0 shadow-xl bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                    <h2 className="font-['DM_Serif_Display'] text-3xl font-light mb-6">
                      Visit Our Showroom
                    </h2>
                    
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-['Syne'] font-semibold text-lg mb-1">Address</h3>
                          <p className="text-white/80 font-['Space_Grotesk']">
                            Bhaktapur, Nepal
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="font-['Syne'] font-semibold text-lg mb-1">Business Hours</h3>
                          <p className="text-white/80 font-['Space_Grotesk']">
                            Monday - Friday: 9:00 AM - 6:00 PM<br />
                            Saturday: 10:00 AM - 5:00 PM<br />
                            Sunday: Closed
                          </p>
                        </div>
                      </div>

                      <div className="pt-6 border-t border-white/10">
                        <h3 className="font-['Syne'] font-semibold text-lg mb-4">Follow Us</h3>
                        <div className="flex gap-3">
                          {[Facebook, Instagram].map((Icon, i) => (
                            <motion.a
                              key={i}
                              whileHover={{ scale: 1.1, y: -2 }}
                              href={Icon === Instagram ? "https://www.instagram.com/kraftstudio.np/" : "https://www.facebook.com/profile.php?id=61582688310885"}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                            >
                              <Icon className="w-5 h-5" />
                            </motion.a>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                </FadeSlideIn>

                {/* Map */}
                <FadeSlideIn direction="right" delay={0.4}>
                  <Card id="map" className="overflow-hidden border-0 shadow-xl h-96">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.2876849744537!2d85.42839731506196!3d27.67903908280099!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb18fc1f7898db%3A0xbe5c8e6084f1c1e5!2sBhaktapur%2C%20Nepal!5e0!3m2!1sen!2snp!4v1234567890123!5m2!1sen!2snp"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </Card>
                </FadeSlideIn>
              </div>
            </div>
          </div>
        </section>

        {/* Why Choose Us Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <FadeSlideIn>
              <div className="text-center mb-16">
                <h2 className="font-['DM_Serif_Display'] text-4xl md:text-5xl font-light text-gray-900 mb-4">
                  Why Choose KraftStudio?
                </h2>
                <p className="text-gray-600 text-lg font-['Space_Grotesk'] max-w-2xl mx-auto">
                  Experience excellence in every detail with our premium furniture and design solutions
                </p>
              </div>
            </FadeSlideIn>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  title: "Premium Quality",
                  description: "We source only the finest materials and work with skilled artisans to create exceptional furniture pieces that stand the test of time.",
                  icon: <Sparkles className="w-12 h-12" />
                },
                {
                  title: "Custom Solutions",
                  description: "Every space is unique. We offer extensive customization options to make your vision a reality and perfectly match your style.",
                  icon: <Palette className="w-12 h-12" />
                },
                {
                  title: "Expert Support",
                  description: "Our experienced team is here to help you every step of the way, from initial consultation to delivery and beyond.",
                  icon: <Briefcase className="w-12 h-12" />
                }
              ].map((feature, index) => (
                <ScaleFade key={feature.title} delay={index * 0.1}>
                  <Card className="p-8 h-full hover:shadow-2xl transition-all duration-500 border-0 bg-white group">
                    <div className="mb-4 group-hover:scale-110 transition-transform duration-300 text-gray-900">
                      {feature.icon}
                    </div>
                    <h3 className="font-['Syne'] font-bold text-xl text-gray-900 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 font-['Space_Grotesk'] leading-relaxed">
                      {feature.description}
                    </p>
                  </Card>
                </ScaleFade>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <FadeSlideIn>
              <h2 className="font-['DM_Serif_Display'] text-4xl md:text-5xl font-light mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-white/80 text-lg mb-10 leading-relaxed font-['Space_Grotesk']">
                Book a free consultation with our design experts and let's bring your vision to life
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button 
                    asChild
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-6 rounded-xl font-['Syne'] font-semibold text-base"
                  >
                    <a href="https://wa.me/9779769682175" target="_blank" rel="noopener noreferrer">
                      <MessageCircle className="w-5 h-5 mr-2" />
                      WhatsApp Us
                    </a>
                  </Button>
                </motion.div>
              </div>
            </FadeSlideIn>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
