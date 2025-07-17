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
  "text-cream/80 hover:text-sage transition-colors duration-200 font-bodoni font-normal tracking-button-refined";
const sectionHeaderStyles =
  "text-lg font-academy mb-4 text-sage font-normal text-shadow-elegant leading-elegant tracking-academy-normal";

// Sub-components
const CompanyInfo = () => (
  <div className="space-y-4 md:col-span-2">
    <div className="flex items-center space-x-2">
      <Logo size="md" className="filter brightness-0 invert" />
    </div>
    <p className="text-cream/80 leading-body-elegant font-bodoni font-normal max-w-md text-shadow-elegant">
      Creando postres artesanales con amor, ingredientes de calidad y la
      tradición de la repostería casera.
    </p>
    <div className="flex items-center space-x-4">
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-cream/80 hover:text-sage transition-colors duration-200"
        aria-label="Visit our Instagram page"
      >
        <Instagram className="h-5 w-5" />
      </a>
      <span className="text-cream/60 font-bodoni text-sm font-normal">
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
          className={`${linkStyles} flex items-center space-x-2`}
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
          className={`${linkStyles} flex items-center space-x-2`}
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
  <div className="flex items-center space-x-3">
    <Icon className="text-sage" size={16} />
    <span className="text-cream/80 font-bodoni text-sm">{text}</span>
  </div>
);

const ContactSection = () => (
  <div>
    <h4 className={sectionHeaderStyles}>Contacto</h4>
    <div className="space-y-2">
      <ContactInfoItem icon={HeartMail} text={CONTACT_INFO.email} />
      <ContactInfoItem icon={ChatBubble} text={CONTACT_INFO.phone} />
      <ContactInfoItem icon={HeartLocation} text={CONTACT_INFO.location} />
    </div>
  </div>
);

const Copyright = () => (
  <div className="border-t border-cream/20 mt-8 pt-8 text-center">
    <p className="text-cream/60 font-bodoni text-shadow-elegant">
      © 2024 Cucina. Postres artesanales hechos con amor.
    </p>
  </div>
);

const Footer = () => {
  return (
    <footer className="bg-cocoa text-cream py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <CompanyInfo />
          <NavigationSection />
          <ContactSection />
        </div>
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
