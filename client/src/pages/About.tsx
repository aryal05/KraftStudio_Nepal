import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Target, Heart, Globe, Lightbulb, Sparkles, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import { DroppingLetters, WalkingText, FloatingText } from "@/lib/animations";

const teamMembers = [
  {
    name: "Sarah Anderson",
    role: "Founder & Creative Director",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
    bio: "15+ years of experience in interior design and furniture curation",
  },
  {
    name: "Michael Chen",
    role: "Head of Product Design",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
    bio: "Award-winning designer with a passion for sustainable materials",
  },
  {
    name: "Emma Williams",
    role: "Customer Experience Lead",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
    bio: "Dedicated to creating exceptional customer journeys",
  },
  {
    name: "David Rodriguez",
    role: "Operations Director",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
    bio: "Expert in logistics and supply chain management",
  },
];

const values = [
  {
    icon: Target,
    title: "Quality First",
    description:
      "We source only the finest materials and work with master craftsmen to ensure every piece meets our exacting standards.",
  },
  {
    icon: Heart,
    title: "Customer Focused",
    description:
      "Your satisfaction is our priority. We're committed to providing exceptional service from consultation to delivery.",
  },
  {
    icon: Globe,
    title: "Sustainable Practices",
    description:
      "We're dedicated to environmental responsibility through sustainable sourcing and eco-friendly production methods.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Constantly pushing boundaries with fresh designs that blend timeless elegance with modern functionality.",
  },
];

export default function About() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white pt-20">
        <Navigation />

        {/* Hero Section */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <div
              className="w-full h-full bg-cover bg-center"
              style={{
                backgroundImage:
                  "url('https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1920&h=1080&fit=crop')",
              }}
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
              <WalkingText text="SINCE 2010" className="tracking-wide font-['Syne']" />
            </motion.div>

            <FloatingText duration={4} distance={12}>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-8 leading-tight font-['DM_Serif_Display'] overflow-hidden">
                <DroppingLetters text="Our Story" delay={0.4} />
              </div>
            </FloatingText>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 leading-relaxed max-w-4xl mx-auto font-['Space_Grotesk'] px-4"
            >
              Crafting exceptional furniture experiences with passion and dedication
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

        {/* Mission Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <AnimatedSection direction="left">
                <div>
                  <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                    Redefining Modern
                    <br />
                    <span className="font-medium">Living Spaces</span>
                  </h2>
                  <p className="text-gray-700 text-lg leading-relaxed mb-6">
                    REVYLO was founded with a simple yet powerful vision: to bring
                    exceptional design and quality to every home. We believe that
                    furniture is more than just functional—it's an expression of who
                    you are and how you live.
                  </p>
                  <p className="text-gray-700 text-lg leading-relaxed mb-8">
                    Our team of designers, craftsmen, and customer care specialists
                    work tirelessly to curate and create pieces that not only look
                    beautiful but stand the test of time. Every product in our
                    collection is chosen for its quality, design, and ability to
                    transform spaces.
                  </p>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-6 text-base font-medium"
                      asChild
                    >
                      <Link href="/furniture">
                        <a className="flex items-center gap-2">
                          Explore Our Collection
                          <ArrowRight className="w-5 h-5" />
                        </a>
                      </Link>
                    </Button>
                  </motion.div>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right">
                <div className="grid grid-cols-2 gap-6">
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="col-span-2 rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1556912173-3bb406ef7e77?w=800&h=500&fit=crop"
                      alt="Our Workshop"
                      className="w-full h-80 object-cover"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=400&fit=crop"
                      alt="Craftsmanship"
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="rounded-2xl overflow-hidden shadow-xl"
                  >
                    <img
                      src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=400&h=400&fit=crop"
                      alt="Modern Design"
                      className="w-full h-64 object-cover"
                    />
                  </motion.div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
              {[
                { number: "15+", label: "Years Experience" },
                { number: "50K+", label: "Happy Customers" },
                { number: "1000+", label: "Products" },
                { number: "20+", label: "Awards Won" },
              ].map((stat, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="text-center"
                  >
                    <div className="font-serif text-5xl md:text-6xl font-bold mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-400 text-sm md:text-base uppercase tracking-wider">
                      {stat.label}
                    </div>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Our Values
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                The principles that guide everything we do
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="p-8 border-0 shadow-md hover:shadow-xl transition-all duration-500 h-full">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-900 text-white rounded-2xl mb-6">
                        <value.icon className="w-8 h-8" />
                      </div>
                      <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                        {value.title}
                      </h3>
                      <p className="text-gray-700 leading-relaxed">
                        {value.description}
                      </p>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="text-center mb-16">
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Passionate individuals dedicated to bringing you the best
              </p>
            </AnimatedSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {teamMembers.map((member, index) => (
                <AnimatedSection key={index} delay={index * 0.1}>
                  <motion.div
                    whileHover={{ y: -12 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-500">
                      <div className="relative h-80 overflow-hidden bg-gray-200">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-6 bg-white">
                        <h3 className="font-serif text-xl font-semibold text-gray-900 mb-1">
                          {member.name}
                        </h3>
                        <p className="text-gray-600 font-medium text-sm mb-3">
                          {member.role}
                        </p>
                        <p className="text-gray-600 text-sm leading-relaxed">
                          {member.bio}
                        </p>
                      </div>
                    </Card>
                  </motion.div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-white">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <AnimatedSection>
              <h2 className="font-serif text-4xl md:text-5xl font-light text-gray-900 mb-6">
                Ready to Transform Your Space?
              </h2>
              <p className="text-gray-700 text-lg mb-10 leading-relaxed">
                Explore our curated collection and discover pieces that speak to
                your style. Our team is here to help you create the home of your
                dreams.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-6 text-base font-medium"
                    asChild
                  >
                    <Link href="/furniture">
                      <a className="flex items-center gap-2">
                        Browse Collection
                        <ArrowRight className="w-5 h-5" />
                      </a>
                    </Link>
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="px-10 py-6 text-base font-medium"
                    asChild
                  >
                    <Link href="/booking">
                      <a>Book Consultation</a>
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
