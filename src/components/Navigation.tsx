import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Instagram } from "lucide-react";
import { ChatBubble } from "./icons/ArtisanalIcons";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "./Logo";

// Constants
const NAVIGATION_ITEMS = [
  { path: "/", label: "Inicio" },
  { path: "/about", label: "Acerca de" },
  { path: "/menu", label: "Menú" },
] as const;

const EXTERNAL_LINKS = {
  instagram: "https://www.instagram.com/cucinanostrard/",
  whatsapp:
    "https://api.whatsapp.com/send/?phone=18096581245&text&type=phone_number&app_absent=0",
} as const;

// Utility functions
const getScrollBasedStyles = (isScrolled: boolean) => ({
  background: isScrolled
    ? "bg-white shadow-luxury border-b border-sage/30 backdrop-blur-md"
    : "bg-gradient-to-r from-cream-100 via-white to-cream-100 shadow-premium border-b border-sage/20 backdrop-blur-sm",
});

const getNavLinkStyles = (isActive: boolean) => {
  const baseStyles =
    "font-bodoni font-medium px-5 py-3 rounded-button transition-all duration-500 tracking-button-refined";

  return isActive
    ? `${baseStyles} text-sage-600 bg-sage-50 shadow-premium backdrop-blur-sm`
    : `${baseStyles} text-cocoa-600 hover:text-sage-600 hover:bg-sage-50/70 hover:shadow-elegant`;
};

const getMobileNavLinkStyles = (isActive: boolean) => {
  const baseStyles =
    "block w-full text-left px-6 py-4 rounded-elegant font-bodoni font-medium transition-all duration-500 tracking-button-refined";

  return isActive
    ? `${baseStyles} text-sage-600 bg-sage-50 shadow-premium backdrop-blur-sm`
    : `${baseStyles} text-cocoa-600 hover:text-sage-600 hover:bg-sage-50/70 hover:shadow-elegant`;
};

// Sub-components
const NavDivider = () => (
  <div className="flex items-center justify-center px-2">
    <div className="w-1.5 h-1.5 bg-sage-400 rounded-full" />
  </div>
);

const NavigationLink = ({
  to,
  label,
  isActive,
  isMobile = false,
}: {
  to: string;
  label: string;
  isActive: boolean;
  isMobile?: boolean;
}) => (
  <Link
    to={to}
    className={
      isMobile ? getMobileNavLinkStyles(isActive) : getNavLinkStyles(isActive)
    }
  >
    {label}
  </Link>
);

const InstagramLink = ({ isMobile = false }: { isMobile?: boolean }) => {
  const baseStyles =
    "font-bodoni font-medium px-5 py-3 rounded-button transition-all duration-500 text-cocoa-600 hover:text-sage-600 hover:bg-sage-50/70 hover:shadow-elegant tracking-button-refined";
  const mobileStyles =
    "w-full text-left px-6 py-4 rounded-elegant font-bodoni font-medium transition-all duration-500 text-cocoa-600 hover:text-sage-600 hover:bg-sage-50/70 hover:shadow-elegant tracking-button-refined";

  return (
    <a
      href={EXTERNAL_LINKS.instagram}
      target="_blank"
      rel="noopener noreferrer"
      className={`${isMobile ? mobileStyles : baseStyles} flex items-center ${isMobile ? "space-x-3" : "space-x-2"}`}
    >
      <Instagram className={`${isMobile ? "h-5 w-5" : "h-4 w-4"}`} />
      <span>Instagram</span>
    </a>
  );
};

const WhatsAppButton = ({ isMobile = false }: { isMobile?: boolean }) => {
  const desktopStyles =
    "flex items-center space-x-2 px-4 py-3 text-cocoa-600 hover:text-sage-600 transition-all duration-500 rounded-button hover:bg-sage-50 hover:shadow-premium ml-2 font-bodoni font-medium tracking-button-refined backdrop-blur-sm";
  const mobileStyles =
    "flex items-center justify-center space-x-3 px-6 py-4 text-cocoa-600 hover:text-sage-600 hover:bg-sage-50/70 transition-all duration-500 font-bodoni font-medium rounded-elegant border border-sage-200 hover:border-sage-300 shadow-elegant hover:shadow-premium tracking-button-refined backdrop-blur-sm";

  return (
    <a
      href={EXTERNAL_LINKS.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className={isMobile ? mobileStyles : desktopStyles}
    >
      <ChatBubble className="text-current" size={20} />
      <span>WhatsApp</span>
    </a>
  );
};

const CustomOrderButton = ({ isMobile = false }: { isMobile?: boolean }) => {
  const baseStyles =
    "bg-gradient-to-r from-sage-500 to-sage-600 text-white rounded-button hover:from-sage-600 hover:to-sage-700 hover:shadow-luxury transition-all duration-500 transform hover:scale-105 font-bodoni font-medium backdrop-blur-sm";
  const desktopStyles = `${baseStyles} px-6 py-3 tracking-button-refined shadow-premium ml-4`;
  const mobileStyles = `${baseStyles} block w-full text-center px-6 py-5 text-lg mt-6 shadow-luxury border-2 border-sage-400 hover:border-sage-500 tracking-button-refined`;

  return (
    <Link to="/contact" className={isMobile ? mobileStyles : desktopStyles}>
      Crea tu pedido personalizado
    </Link>
  );
};

const DesktopNavigation = ({ currentPath }: { currentPath: string }) => (
  <div className="hidden md:flex items-center space-x-2">
    {NAVIGATION_ITEMS.map((item, index) => (
      <div key={item.path} className="flex items-center">
        <NavigationLink
          to={item.path}
          label={item.label}
          isActive={currentPath === item.path}
        />
        {index < NAVIGATION_ITEMS.length - 1 && <NavDivider />}
      </div>
    ))}

    <NavDivider />
    <InstagramLink />
    <WhatsAppButton />
    <CustomOrderButton />
  </div>
);

const MobileNavigation = ({
  isOpen,
  currentPath,
  onClose,
}: {
  isOpen: boolean;
  currentPath: string;
  onClose: () => void;
}) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: "auto" }}
        exit={{ opacity: 0, height: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="md:hidden bg-white border-t border-sage-200 rounded-b-luxury shadow-luxury overflow-hidden backdrop-blur-md surface-premium"
      >
        <div className="px-4 pt-4 pb-6 space-y-3 relative">
          {NAVIGATION_ITEMS.map((item) => (
            <NavigationLink
              key={item.path}
              to={item.path}
              label={item.label}
              isActive={currentPath === item.path}
              isMobile
            />
          ))}

          <InstagramLink isMobile />

          <div className="w-full h-px bg-gradient-to-r from-sage-200 via-sage-400 to-sage-200 my-4 shadow-inner-soft rounded-full" />

          <WhatsAppButton isMobile />
          <CustomOrderButton isMobile />
        </div>
      </motion.div>
    )}
  </AnimatePresence>
);

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const { background } = getScrollBasedStyles(isScrolled);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${background} texture-grain`}
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
          <DesktopNavigation currentPath={location.pathname} />

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="p-3 text-cocoa-600 hover:text-sage-600 transition-all duration-500 rounded-button hover:bg-sage-50 border border-sage-200 shadow-elegant hover:shadow-premium backdrop-blur-sm"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <MobileNavigation
          isOpen={isMobileMenuOpen}
          currentPath={location.pathname}
          onClose={() => setIsMobileMenuOpen(false)}
        />
      </div>
    </nav>
  );
};

export default Navigation;
