import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, MessageCircle, Instagram } from "lucide-react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg border-b border-dusty-rose/30"
          : "bg-gradient-to-r from-cream-100 via-white to-cream-100 shadow-md border-b border-dusty-rose/20"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo
              size="md"
              className="group-hover:opacity-80 transition-opacity duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/"
              className={`font-playfair font-semibold px-5 py-3 rounded-full transition-all duration-300 ${
                isActive("/")
                  ? "text-dusty-rose-600 bg-dusty-rose-50 shadow-gentle"
                  : "text-mocha-600 hover:text-dusty-rose-600 hover:bg-dusty-rose-50/70"
              }`}
            >
              Inicio
            </Link>
            <div className="flex items-center justify-center px-2">
              <div className="w-1.5 h-1.5 bg-dusty-rose-400 rounded-full"></div>
            </div>
            <Link
              to="/about"
              className={`font-playfair font-semibold px-5 py-3 rounded-full transition-all duration-300 ${
                isActive("/about")
                  ? "text-dusty-rose-600 bg-dusty-rose-50 shadow-gentle"
                  : "text-mocha-600 hover:text-dusty-rose-600 hover:bg-dusty-rose-50/70"
              }`}
            >
              Acerca de
            </Link>
            <div className="flex items-center justify-center px-2">
              <div className="w-1.5 h-1.5 bg-dusty-rose-400 rounded-full"></div>
            </div>
            <Link
              to="/menu"
              className={`font-playfair font-semibold px-5 py-3 rounded-full transition-all duration-300 ${
                isActive("/menu")
                  ? "text-dusty-rose-600 bg-dusty-rose-50 shadow-gentle"
                  : "text-mocha-600 hover:text-dusty-rose-600 hover:bg-dusty-rose-50/70"
              }`}
            >
              Menú
            </Link>
            <div className="flex items-center justify-center px-2">
              <div className="w-1.5 h-1.5 bg-dusty-rose-400 rounded-full"></div>
            </div>
            <a
              href="https://www.instagram.com/cucinanostrard/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-playfair font-semibold px-5 py-3 rounded-full transition-all duration-300 text-mocha-600 hover:text-dusty-rose-600 hover:bg-dusty-rose-50/70 flex items-center space-x-2"
            >
              <Instagram className="h-4 w-4" />
              <span>Instagram</span>
            </a>

            {/* Desktop WhatsApp Button */}
            <a
              href="https://api.whatsapp.com/send/?phone=18096581245&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 px-4 py-3 text-mocha-600 hover:text-dusty-rose-600 transition-all duration-300 rounded-full hover:bg-dusty-rose-50 hover:shadow-gentle ml-2 font-playfair font-semibold"
            >
              <MessageCircle className="h-5 w-5" />
              <span>WhatsApp</span>
            </a>

            {/* Prominent Pink Button */}
            <Link
              to="/contact"
              className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white px-6 py-3 rounded-full hover:from-dusty-rose-600 hover:to-dusty-rose-700 hover:shadow-warm transition-all duration-300 transform hover:scale-105 font-playfair font-bold tracking-wide shadow-md ml-4"
            >
              Crea tu pedido personalizado
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-3 text-mocha-600 hover:text-dusty-rose-600 transition-all duration-300 rounded-full hover:bg-dusty-rose-50 border border-dusty-rose-200"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t border-dusty-rose-200 rounded-b-2xl shadow-xl overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-3">
                <Link
                  to="/"
                  className={`block w-full text-left px-6 py-4 rounded-full font-playfair font-semibold transition-all duration-300 ${
                    isActive("/")
                      ? "text-dusty-rose-600 bg-dusty-rose-50 shadow-gentle"
                      : "text-mocha-600 hover:text-dusty-rose-600 hover:bg-dusty-rose-50/70"
                  }`}
                >
                  Inicio
                </Link>
                <Link
                  to="/about"
                  className={`block w-full text-left px-6 py-4 rounded-full font-playfair font-semibold transition-all duration-300 ${
                    isActive("/about")
                      ? "text-dusty-rose-600 bg-dusty-rose-50 shadow-gentle"
                      : "text-mocha-600 hover:text-dusty-rose-600 hover:bg-dusty-rose-50/70"
                  }`}
                >
                  Acerca de
                </Link>
                <Link
                  to="/menu"
                  className={`block w-full text-left px-6 py-4 rounded-full font-playfair font-semibold transition-all duration-300 ${
                    isActive("/menu")
                      ? "text-dusty-rose-600 bg-dusty-rose-50 shadow-gentle"
                      : "text-mocha-600 hover:text-dusty-rose-600 hover:bg-dusty-rose-50/70"
                  }`}
                >
                  Menú
                </Link>
                <a
                  href="https://www.instagram.com/cucinanostrard/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-left px-6 py-4 rounded-full font-playfair font-semibold transition-all duration-300 text-mocha-600 hover:text-dusty-rose-600 hover:bg-dusty-rose-50/70 flex items-center space-x-3"
                >
                  <Instagram className="h-5 w-5" />
                  <span>Instagram</span>
                </a>

                {/* Separator */}
                <div className="w-full h-px bg-gradient-to-r from-dusty-rose-200 via-dusty-rose-400 to-dusty-rose-200 my-4"></div>

                {/* Mobile WhatsApp Button */}
                <a
                  href="https://api.whatsapp.com/send/?phone=18096581245&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center space-x-3 px-6 py-4 text-mocha-600 hover:text-dusty-rose-600 hover:bg-dusty-rose-50/70 transition-all duration-300 font-playfair font-semibold rounded-full border border-dusty-rose-200 hover:border-dusty-rose-300"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WhatsApp</span>
                </a>

                {/* Mobile Custom Order Button - Prominent Pink Bubble */}
                <Link
                  to="/contact"
                  className="block w-full text-center px-6 py-5 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white rounded-full hover:from-dusty-rose-600 hover:to-dusty-rose-700 hover:shadow-warm transition-all duration-300 font-playfair font-bold text-lg mt-6 shadow-lg transform hover:scale-105 border-2 border-dusty-rose-400 hover:border-dusty-rose-500"
                >
                  ✨ Crea tu pedido personalizado
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
