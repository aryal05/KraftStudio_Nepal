import { motion } from "framer-motion";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Calendar, User, Clock, Tag, Sparkles, ChevronDown } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import PageTransition from "@/components/PageTransition";
import { DroppingLetters, WalkingText, FloatingText } from "@/lib/animations";

const blogPosts = [
  {
    id: 1,
    title: "The Art of Minimalist Interior Design",
    excerpt:
      "Discover how to create a serene and spacious home with minimalist design principles. Learn the essentials of decluttering and choosing statement pieces that make a lasting impact.",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=600&fit=crop",
    author: "Sarah Johnson",
    date: "March 15, 2024",
    readTime: "8 min read",
    category: "Design Tips",
  },
  {
    id: 2,
    title: "Lighting Design: Transform Your Space",
    excerpt:
      "Explore how strategic lighting can completely transform the ambiance of your home. From pendant lights to floor lamps, we cover the complete guide to illuminating your space.",
    image: "https://images.unsplash.com/photo-1565182999555-2142eac8bb46?w=800&h=600&fit=crop",
    author: "Michael Chen",
    date: "March 10, 2024",
    readTime: "6 min read",
    category: "Lighting",
  },
  {
    id: 3,
    title: "Creating the Perfect Home Office",
    excerpt:
      "Work from home in style and comfort. Learn how to design a productive workspace that inspires creativity, maintains focus, and enhances your daily workflow.",
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?w=800&h=600&fit=crop",
    author: "Emma Williams",
    date: "March 5, 2024",
    readTime: "7 min read",
    category: "Workspace",
  },
  {
    id: 4,
    title: "Sustainable Furniture: Beauty with Conscience",
    excerpt:
      "Learn about eco-friendly furniture options that don't compromise on style. Discover how to furnish your home responsibly while supporting sustainable practices.",
    image: "https://images.unsplash.com/photo-1592078615290-033ee584e267?w=800&h=600&fit=crop",
    author: "Sarah Johnson",
    date: "February 28, 2024",
    readTime: "9 min read",
    category: "Sustainability",
  },
  {
    id: 5,
    title: "Color Psychology in Interior Design",
    excerpt:
      "Understand how colors influence mood and perception. Explore scientifically-backed color palettes that work for different rooms and design styles.",
    image: "https://images.unsplash.com/photo-1615874959474-d609969a20ed?w=800&h=600&fit=crop",
    author: "Michael Chen",
    date: "February 20, 2024",
    readTime: "10 min read",
    category: "Design Tips",
  },
  {
    id: 6,
    title: "Modern Furniture Trends 2026",
    excerpt:
      "Stay ahead of the curve with the latest furniture trends. From sustainable materials to bold designs, see what's defining interior design this year.",
    image: "https://images.unsplash.com/photo-1556912172-45b7abe8b7e1?w=800&h=600&fit=crop",
    author: "Emma Williams",
    date: "February 15, 2024",
    readTime: "5 min read",
    category: "Trends",
  },
];

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

export default function Blog() {
  return (
    <PageTransition>
      <div className="min-h-screen bg-white">
        <Navigation />

        {/* Hero Header with Background Image */}
        <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-black pt-20">
          {/* Background Image */}
          <motion.div
            initial={{ scale: 1.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 0.3 }}
            transition={{ duration: 1.5 }}
            className="absolute inset-0"
          >
            <img
              src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop"
              alt="Blog hero"
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
              <WalkingText text="DESIGN INSIGHTS" className="tracking-wide font-['Syne']" />
            </motion.div>

            <FloatingText duration={4} distance={12}>
              <div className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-white mb-6 leading-tight font-['DM_Serif_Display'] overflow-hidden">
                <DroppingLetters text="Our Blog" delay={0.4} />
              </div>
            </FloatingText>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-lg sm:text-xl md:text-2xl text-white/90 mb-12 leading-relaxed max-w-4xl mx-auto font-['Space_Grotesk'] px-4"
            >
              Discover design inspiration, expert tips, and the latest trends in interior design
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

        {/* Featured Post */}
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection>
              <Link href={`/blog/${blogPosts[0].id}`}>
                <motion.a
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="group block"
                >
                  <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 bg-white">
                    <div className="grid grid-cols-1 lg:grid-cols-2">
                      <div className="relative h-96 lg:h-full overflow-hidden bg-gray-200">
                        <motion.img
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.6 }}
                          src={blogPosts[0].image}
                          alt={blogPosts[0].title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-6 left-6">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white text-sm font-semibold rounded-full shadow-lg">
                            <Tag className="w-4 h-4" />
                            {blogPosts[0].category}
                          </span>
                        </div>
                        <div className="absolute top-6 right-6">
                          <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full shadow-lg uppercase tracking-wide">
                            Featured
                          </span>
                        </div>
                      </div>
                      <div className="p-10 lg:p-12 flex flex-col justify-center">
                        <h2 className="font-serif text-3xl md:text-4xl font-semibold text-gray-900 mb-6 leading-tight">
                          {blogPosts[0].title}
                        </h2>
                        <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                          {blogPosts[0].excerpt}
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-600 mb-8 pb-8 border-b border-gray-200">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span className="font-medium">{blogPosts[0].author}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{blogPosts[0].date}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{blogPosts[0].readTime}</span>
                          </div>
                        </div>
                        <div className="flex items-center text-gray-900 font-semibold text-lg group-hover:gap-4 gap-2 transition-all">
                          Read Article
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >
                            <ArrowRight className="w-5 h-5" />
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.a>
              </Link>
            </AnimatedSection>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-6">
            <AnimatedSection className="mb-12">
              <h2 className="font-serif text-4xl font-light text-gray-900 mb-4">
                Latest Articles
              </h2>
              <p className="text-gray-600 text-lg">
                Stay inspired with our newest design insights
              </p>
            </AnimatedSection>

            <motion.div
              variants={staggerContainer}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, margin: "-100px" }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {blogPosts.slice(1).map((post, index) => (
                <motion.div key={post.id} variants={fadeInUp}>
                  <Link href={`/blog/${post.id}`}>
                    <motion.a
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.3 }}
                      className="group block h-full"
                    >
                      <Card className="overflow-hidden border-0 shadow-md hover:shadow-2xl transition-all duration-500 h-full flex flex-col bg-white">
                        <div className="relative h-64 overflow-hidden bg-gray-200">
                          <motion.img
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.6 }}
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute top-4 left-4">
                            <span className="inline-flex items-center gap-1 px-3 py-1.5 bg-white/95 backdrop-blur-sm text-gray-900 text-xs font-bold rounded-full shadow-lg">
                              <Tag className="w-3 h-3" />
                              {post.category}
                            </span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        </div>
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3 line-clamp-2 group-hover:text-gray-700 transition-colors">
                            {post.title}
                          </h3>
                          <p className="text-gray-600 text-sm mb-4 flex-1 line-clamp-3 leading-relaxed">
                            {post.excerpt}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mb-4 pt-4 border-t border-gray-200">
                            <div className="flex items-center gap-1">
                              <User className="w-3 h-3" />
                              <span>{post.author}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              <span>{post.readTime}</span>
                            </div>
                          </div>
                          <div className="flex items-center text-gray-900 font-semibold text-sm group-hover:gap-3 gap-2 transition-all">
                            Read More
                            <ArrowRight className="w-4 h-4" />
                          </div>
                        </div>
                      </Card>
                    </motion.a>
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-24 bg-gray-900 text-white">
          <div className="max-w-3xl mx-auto px-6 text-center">
            <AnimatedSection>
              <h2 className="font-serif text-4xl md:text-5xl font-light mb-6">
                Never Miss an Update
              </h2>
              <p className="text-white/80 text-lg mb-10 leading-relaxed">
                Subscribe to our newsletter for the latest design tips, trends, and
                exclusive offers delivered straight to your inbox.
              </p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-6 py-4 rounded-xl bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white text-base"
                />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-base w-full sm:w-auto">
                    Subscribe
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatedSection>
          </div>
        </section>

        <Footer />
      </div>
    </PageTransition>
  );
}
