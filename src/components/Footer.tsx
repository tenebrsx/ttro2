import { Link } from "react-router-dom";
import { Instagram } from "lucide-react";
import { HeartMail, ChatBubble, HeartLocation } from "./icons/ArtisanalIcons";

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
  { path: "/menu", label: "Menú" },
  { path: "/about", label: "Acerca de" },
  { path: "/contact", label: "Crea tu pedido personalizado" },
] as const;

// Utility styles
const linkStyles =
  "text-[#FAFAFA] hover:text-[#FAFAFA] transition-all duration-500 font-bodoni font-normal tracking-button-refined hover:bg-black/10 rounded-premium px-3 py-1";
const sectionHeaderStyles =
  "text-lg font-academy mb-4 text-[#FAFAFA] font-normal leading-elegant tracking-academy-normal px-3 py-2";

// Sub-components
const CompanyInfo = () => (
  <div className="space-y-4 md:col-span-2">
    <div className="flex items-center space-x-2">
      <div className="relative">
        <img
          src="/logo.png"
          alt="Cucina - homemade goods"
          className="h-20 w-auto object-contain filter brightness-0 invert"
        />
      </div>
    </div>
    <p className="text-[#FAFAFA] leading-body-elegant font-bodoni font-normal max-w-md">
      Creando postres artesanales con amor, ingredientes de calidad y la
      tradición de la repostería casera.
    </p>
    <div className="flex items-center space-x-4">
      <a
        href={SOCIAL_LINKS.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[#FAFAFA] hover:text-[#FAFAFA] transition-all duration-500 hover:bg-black/10 rounded-button p-2"
        aria-label="Visit our Instagram page"
      >
        <Instagram className="h-5 w-5 text-[#FAFAFA]" />
      </a>
      <span className="text-[#FAFAFA] font-bodoni text-sm font-normal px-3 py-1">
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
          <Instagram className="h-4 w-4 text-[#FAFAFA]" />
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
          <div className="[&_svg]:!stroke-white [&_path]:!stroke-white [&_rect]:!stroke-white [&_circle]:!fill-white">
            <ChatBubble size={20} />
          </div>
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
  <div className="flex items-center space-x-3 px-3 py-2 hover:bg-black/10 transition-all duration-500">
    <div className="bg-black/20 rounded-button p-1 [&_svg]:!stroke-white [&_path]:!stroke-white [&_rect]:!stroke-white [&_circle]:!fill-white">
      <Icon size={16} />
    </div>
    <span className="text-[#FAFAFA] font-bodoni text-sm">{text}</span>
  </div>
);

const ContactSection = () => (
  <div>
    <h4 className={sectionHeaderStyles}>Contacto</h4>
    <div className="space-y-3">
      <ContactInfoItem icon={HeartMail} text={CONTACT_INFO.email} />
      <ContactInfoItem icon={ChatBubble} text={CONTACT_INFO.phone} />
      <ContactInfoItem icon={HeartLocation} text={CONTACT_INFO.location} />
    </div>
  </div>
);

const Copyright = () => (
  <div className="border-t border-[#FAFAFA]/20 mt-8 pt-8 text-center">
    <p className="text-[#FAFAFA] font-bodoni px-6 py-3">
      © 2024 Cucina. Postres artesanales hechos con amor.
    </p>
  </div>
);

const Footer = () => {
  return (
    <footer
      className="py-12"
      style={{ backgroundColor: "#8C9594", color: "#FAFAFA" }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <CompanyInfo />
          </div>
          <div>
            <NavigationSection />
          </div>
          <div>
            <ContactSection />
          </div>
        </div>
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
