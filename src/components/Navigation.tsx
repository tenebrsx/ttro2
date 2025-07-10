import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ShoppingBag } from "lucide-react";
import Logo from "./Logo";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "../contexts/CartContext";

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Safe cart context usage with fallback
  let itemCount = 0;

  try {
    const cartContext = useCart();
    itemCount = cartContext.itemCount;
  } catch (error) {
    console.warn("Cart context not available:", error);
  }

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
          ? "bg-gradient-to-r from-cream/95 via-white/95 to-cream/95 backdrop-blur-sm shadow-gentle border-b border-dusty-rose/10"
          : "bg-gradient-to-r from-white/85 via-cream/70 to-white/85 backdrop-blur-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <Logo
              size="md"
              className="group-hover:opacity-80 transition-opacity duration-200"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link
              to="/"
              className={`font-playfair font-medium px-4 py-3 rounded-full transition-all duration-300 text-shadow-soft ${
                isActive("/")
                  ? "text-dusty-rose bg-dusty-rose/10 shadow-gentle"
                  : "text-mocha hover:text-dusty-rose hover:bg-dusty-rose/5"
              }`}
            >
              Inicio
            </Link>
            <div className="flex items-center justify-center px-3">
              <div className="w-1 h-1 bg-dusty-rose/50 rounded-full shadow-sm"></div>
            </div>
            <Link
              to="/about"
              className={`font-playfair font-medium px-4 py-3 rounded-full transition-all duration-300 text-shadow-soft ${
                isActive("/about")
                  ? "text-dusty-rose bg-dusty-rose/10 shadow-gentle"
                  : "text-mocha hover:text-dusty-rose hover:bg-dusty-rose/5"
              }`}
            >
              Acerca de
            </Link>
            <div className="flex items-center justify-center px-3">
              <div className="w-1 h-1 bg-dusty-rose/50 rounded-full shadow-sm"></div>
            </div>
            <Link
              to="/menu"
              className={`font-playfair font-medium px-4 py-3 rounded-full transition-all duration-300 text-shadow-soft ${
                isActive("/menu")
                  ? "text-dusty-rose bg-dusty-rose/10 shadow-gentle"
                  : "text-mocha hover:text-dusty-rose hover:bg-dusty-rose/5"
              }`}
            >
              Menú
            </Link>
            <div className="flex items-center justify-center px-3">
              <div className="w-1 h-1 bg-dusty-rose/50 rounded-full shadow-sm"></div>
            </div>
            <Link
              to="/gallery"
              className={`font-playfair font-medium px-4 py-3 rounded-full transition-all duration-300 text-shadow-soft ${
                isActive("/gallery")
                  ? "text-dusty-rose bg-dusty-rose/10 shadow-gentle"
                  : "text-mocha hover:text-dusty-rose hover:bg-dusty-rose/5"
              }`}
            >
              Galería
            </Link>
            <div className="flex items-center justify-center px-4">
              <div className="w-12 h-px bg-gradient-to-r from-dusty-rose/30 via-dusty-rose/60 to-dusty-rose/30"></div>
            </div>
            <Link
              to="/contact"
              className="bg-gradient-to-r from-dusty-rose to-dusty-rose/90 text-white px-8 py-3 rounded-full hover:from-dusty-rose/90 hover:to-dusty-rose hover:shadow-gentle transition-all duration-300 transform hover:scale-105 font-playfair font-medium tracking-wide"
            >
              Pedidos Personalizados
            </Link>

            {/* Desktop Cart Button */}
            <button
              onClick={() => navigate("/cart")}
              className="relative p-3 text-mocha hover:text-dusty-rose transition-all duration-300 rounded-full hover:bg-dusty-rose/10 hover:shadow-gentle ml-3"
            >
              <ShoppingBag className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-dusty-rose text-white text-xs font-playfair font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-gentle">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-mocha hover:text-dusty-rose transition-all duration-300 rounded-full hover:bg-dusty-rose/10"
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
              className="md:hidden bg-gradient-to-b from-cream/95 to-white/95 backdrop-blur-sm border-t border-dusty-rose/20 rounded-b-2xl shadow-lg overflow-hidden"
            >
              <div className="px-3 pt-3 pb-4 space-y-2">
                <Link
                  to="/"
                  className={`block w-full text-left px-5 py-3 rounded-full font-playfair font-medium transition-all duration-300 ${
                    isActive("/")
                      ? "text-dusty-rose bg-dusty-rose/10 shadow-gentle"
                      : "text-mocha hover:text-dusty-rose hover:bg-dusty-rose/5"
                  }`}
                >
                  Inicio
                </Link>
                <Link
                  to="/about"
                  className={`block w-full text-left px-5 py-3 rounded-full font-playfair font-medium transition-all duration-300 ${
                    isActive("/about")
                      ? "text-dusty-rose bg-dusty-rose/10 shadow-gentle"
                      : "text-mocha hover:text-dusty-rose hover:bg-dusty-rose/5"
                  }`}
                >
                  Acerca de
                </Link>
                <Link
                  to="/menu"
                  className={`block w-full text-left px-5 py-3 rounded-full font-playfair font-medium transition-all duration-300 ${
                    isActive("/menu")
                      ? "text-dusty-rose bg-dusty-rose/10 shadow-gentle"
                      : "text-mocha hover:text-dusty-rose hover:bg-dusty-rose/5"
                  }`}
                >
                  Menú
                </Link>
                <Link
                  to="/gallery"
                  className={`block w-full text-left px-5 py-3 rounded-full font-playfair font-medium transition-all duration-300 ${
                    isActive("/gallery")
                      ? "text-dusty-rose bg-dusty-rose/10 shadow-gentle"
                      : "text-mocha hover:text-dusty-rose hover:bg-dusty-rose/5"
                  }`}
                >
                  Galería
                </Link>
                <div className="w-full h-px bg-gradient-to-r from-dusty-rose/30 via-dusty-rose/60 to-dusty-rose/30 my-3"></div>
                <Link
                  to="/contact"
                  className="block w-full text-center px-5 py-3 bg-gradient-to-r from-dusty-rose to-dusty-rose/90 text-white rounded-full hover:from-dusty-rose/90 hover:to-dusty-rose hover:shadow-gentle transition-all duration-300 font-playfair font-medium mt-3"
                >
                  Pedidos Personalizados
                </Link>

                {/* Mobile Cart Button */}
                <button
                  onClick={() => navigate("/cart")}
                  className="w-full flex items-center justify-center space-x-2 px-5 py-3 text-mocha hover:text-dusty-rose hover:bg-dusty-rose/5 transition-all duration-300 font-playfair font-medium mt-2 rounded-full border border-dusty-rose/20 hover:border-dusty-rose/40"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Mi Carrito</span>
                  {itemCount > 0 && (
                    <span className="bg-dusty-rose text-white text-xs px-2 py-1 rounded-full shadow-gentle">
                      {itemCount}
                    </span>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navigation;
