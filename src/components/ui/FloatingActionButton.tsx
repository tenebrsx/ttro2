import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

// Constants
const WHATSAPP_CONFIG = {
  phoneNumber: "18096581245",
  defaultMessage:
    "¡Hola! Me interesa conocer más sobre sus postres artesanales. ¿Podrían ayudarme con información sobre pedidos personalizados?",
} as const;

const ANIMATION_CONFIG = {
  initial: { opacity: 0, scale: 0.8, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.6, delay: 0.3, ease: "easeOut" },
  buttonHover: { scale: 1.05, y: -2 },
  buttonTap: { scale: 0.95 },
  springConfig: { type: "spring" as const, stiffness: 300, damping: 25 },
  pulseAnimation: {
    scale: [1, 1.1, 1] as number[],
    opacity: [0.7, 0.3, 0.7] as number[],
  },
  pulseTransition: {
    duration: 2.5,
    repeat: Infinity,
    ease: "easeInOut" as const,
  },
} as const;

// Utility function
const createWhatsAppUrl = (phoneNumber: string, message: string): string => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
};

const openWhatsApp = (url: string): void => {
  window.open(url, "_blank", "noopener,noreferrer");
};

// Sub-components
const PulseEffect = () => (
  <motion.div
    className="absolute inset-0 bg-sage-400/15 rounded-full"
    animate={ANIMATION_CONFIG.pulseAnimation}
    transition={ANIMATION_CONFIG.pulseTransition}
  />
);

const WhatsAppIcon = () => (
  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
);

const ButtonText = () => (
  <span className="text-white font-bodoni font-medium text-sm sm:text-base whitespace-nowrap tracking-button-refined">
    Hablemos en WhatsApp
  </span>
);

// Main component
export const FloatingActionButton: React.FC = () => {
  const handleWhatsAppClick = (): void => {
    const whatsappUrl = createWhatsAppUrl(
      WHATSAPP_CONFIG.phoneNumber,
      WHATSAPP_CONFIG.defaultMessage,
    );
    openWhatsApp(whatsappUrl);
  };

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={ANIMATION_CONFIG.initial}
      animate={ANIMATION_CONFIG.animate}
      transition={ANIMATION_CONFIG.transition}
    >
      <motion.button
        onClick={handleWhatsAppClick}
        className="
          flex items-center gap-3 px-4 py-3 sm:px-6 sm:py-4
          bg-gradient-to-r from-sage-500 to-sage-600
          hover:from-sage-600 hover:to-sage-700
          text-white rounded-button
          shadow-premium hover:shadow-luxury
          border border-sage-400/30
          transition-all duration-300
          relative overflow-hidden
          group
          min-h-[48px]
          backdrop-blur-sm
          btn-contrast-high
          tracking-button-refined
        "
        whileHover={ANIMATION_CONFIG.buttonHover}
        whileTap={ANIMATION_CONFIG.buttonTap}
        transition={ANIMATION_CONFIG.springConfig}
        aria-label="Contactar por WhatsApp"
      >
        {/* Pulse effect */}
        <PulseEffect />

        {/* Content */}
        <div className="relative z-10 flex items-center gap-2 sm:gap-3">
          <WhatsAppIcon />
          <div className="hidden sm:block">
            <ButtonText />
          </div>
        </div>

        {/* Mobile-only text (shows below icon on very small screens) */}
        <div className="sm:hidden absolute -bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="bg-cocoa-800/90 backdrop-blur-sm px-3 py-1.5 rounded-md text-white text-xs font-bodoni font-normal whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-brand-soft">
            WhatsApp
          </div>
        </div>

        {/* Shine effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      </motion.button>
    </motion.div>
  );
};

export default FloatingActionButton;
