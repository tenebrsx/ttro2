import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { HeartMail, ChatBubble, HeartLocation } from "./icons/ArtisanalIcons";
import Logo from "./Logo";

// Constants
const CONTACT_INFO = {
  email: "hello@cucinanostrard.com",
  phone: "(809) 658-1245",
  location: "Santo Domingo, DR",
} as const;

const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/cucinanostrard/",
  whatsapp:
    "https://api.whatsapp.com/send/?phone=18096581245&text&type=phone_number&app_absent=0",
} as const;

const NAVIGATION_ITEMS = [
  { path: "/", label: "Inicio" },
  { path: "/about", label: "Acerca de" },
  { path: "/menu", label: "Menú" },
  { path: "/contact", label: "Crea tu pedido personalizado" },
] as const;

// Utility styles
const linkStyles =
  "text-cream/80 hover:text-sage transition-all duration-500 font-bodoni font-normal tracking-button-refined hover:bg-sage/10 rounded-premium px-3 py-1 shadow-hover-elegant backdrop-blur-sm";
const sectionHeaderStyles =
  "text-lg font-academy mb-4 text-sage font-normal text-shadow-elegant leading-elegant tracking-academy-normal bg-gradient-to-r from-sage/10 to-transparent rounded-premium px-3 py-2 shadow-inner-soft";

// Sub-components
const CompanyInfo = () => (
  <div className="space-y-4 md:col-span-2">
    <div className="flex items-center space-x-2">
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent rounded-luxury blur-xl scale-110 opacity-60"></div>
        <Logo
          size="md"
          className="relative filter brightness-0 invert shadow-luxury"
        />
      </div>
    </div>
    <p className="text-cream/80 leading-body-elegant font-bodoni font-normal max-w-md text-shadow-elegant bg-gradient-to-r from-cream/5 to-transparent rounded-elegant px-4 py-3 shadow-inner-soft backdrop-blur-sm">
      Creando postres artesanales con amor, ingredientes de calidad y la
      tradición de la repostería casera.
    </p>
    <div className="flex items-center space-x-4">
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cream/80 hover:text-sage transition-all duration-500 hover:bg-sage/10 rounded-button p-2 shadow-hover-premium backdrop-blur-sm"
        aria-label="Visit our Instagram page"
      >
        <Instagram className="h-5 w-5" />
      </a>
      <span className="text-cream/60 font-bodoni text-sm font-normal bg-cream/5 rounded-premium px-3 py-1 shadow-inner-soft">
        @cucina
      </span>
    </div>
  </div>
);

const NavigationSection = () => (
  <div>
    <h4 className={sectionHeaderStyles}>Navegación</h4>
    <ul className="space-y-2">
      {NAVIGATION_ITEMS.map((item) => (
        <li key={item.path}>
          <Link to={item.path} className={linkStyles}>
            {item.label}
          </Link>
        </li>
      ))}
      <li>
        <a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkStyles} flex items-center space-x-2 shadow-elegant hover:shadow-premium`}
        >
          <Instagram className="h-4 w-4" />
          <span>Instagram</span>
        </a>
      </li>
      <li>
        <a
          href={SOCIAL_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkStyles} flex items-center space-x-2 shadow-elegant hover:shadow-premium`}
        >
          <ChatBubble className="text-current" size={20} />
          <span>WhatsApp</span>
        </a>
      </li>
    </ul>
  </div>
);

const ContactInfoItem = ({
  icon: Icon,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  text: string;
}) => (
  <div className="flex items-center space-x-3 bg-gradient-to-r from-cream/5 to-transparent rounded-premium px-3 py-2 shadow-inner-soft backdrop-blur-sm hover:bg-cream/10 transition-all duration-500">
    <div className="bg-sage/20 rounded-button p-1 shadow-elegant">
      <Icon className="text-sage" size={16} />
    </div>
    <span className="text-cream/80 font-bodoni text-sm text-shadow-elegant">
      {text}
    </span>
  </div>
);

const ContactSection = () => (
  <div className="relative">
    <div className="absolute inset-0 bg-gradient-to-br from-sage/5 to-transparent rounded-luxury blur-xl opacity-60"></div>
    <div className="relative">
      <h4 className={sectionHeaderStyles}>Contacto</h4>
      <div className="space-y-3">
        <ContactInfoItem icon={HeartMail} text={CONTACT_INFO.email} />
        <ContactInfoItem icon={ChatBubble} text={CONTACT_INFO.phone} />
        <ContactInfoItem icon={HeartLocation} text={CONTACT_INFO.location} />
      </div>
    </div>
  </div>
);

const Copyright = () => (
  <div className="border-t border-cream/20 mt-8 pt-8 text-center relative">
    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/5 to-transparent rounded-luxury"></div>
    <p className="relative text-cream/60 font-bodoni text-shadow-elegant bg-gradient-to-r from-transparent via-cream/5 to-transparent rounded-premium px-6 py-3 shadow-inner-soft backdrop-blur-sm">
      © 2024 Cucina. Postres artesanales hechos con amor.
    </p>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-cocoa text-cream py-12 relative texture-grain">
      <div className="absolute inset-0 bg-gradient-to-t from-cocoa-600/50 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-sage/5 via-transparent to-cream/5 rounded-luxury opacity-60 shadow-luxury"></div>
          <div className="relative">
            <CompanyInfo />
          </div>
          <div className="relative">
            <NavigationSection />
          </div>
          <div className="relative">
            <ContactSection />
          </div>
        </div>
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
