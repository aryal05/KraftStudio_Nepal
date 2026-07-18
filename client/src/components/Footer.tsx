import { Link } from "wouter";
import { Mail, Phone, MapPin, MessageCircle } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-20">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-white text-gray-900 flex items-center justify-center font-bold text-lg">
                K
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-xl font-bold">KRAFTSTUDIO</span>
                <span className="text-xs text-gray-400 tracking-wider">
                  DESIGN THAT FEELS BUILT
                </span>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed mb-4">
              Thoughtfully crafted furniture and custom-made pieces for living. 
              Creating spaces that inspire and endure.
            </p>
            <p className="text-xs text-gray-400">
              🇳🇵 Proudly serving Nepal
            </p>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/furniture">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Furniture
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/lighting">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Lighting
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/decor">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Decor
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/workspace">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Workspace
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Custom Orders
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Home
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    About Us
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Blog & Inspiration
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/booking">
                  <a className="text-gray-300 hover:text-white transition-colors">
                    Book Consultation
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif font-bold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                <a
                  href="tel:+9779769682175"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  +977 9769682175
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MessageCircle className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                <a
                  href="https://wa.me/9779769682175"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  WhatsApp
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                <a
                  href="mailto:info@kraftstudio.com"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  info@kraftstudio.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-gray-400" />
                <span className="text-gray-300">
                  Nepal
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 KRAFTSTUDIO. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a 
              href="https://www.facebook.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Facebook
            </a>
            <a 
              href="https://www.instagram.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Instagram
            </a>
            <a 
              href="https://wa.me/9779769682175" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
