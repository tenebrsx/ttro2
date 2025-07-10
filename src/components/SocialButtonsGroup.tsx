import React from "react";
import { motion } from "framer-motion";
import { Instagram, MessageCircle } from "lucide-react";

const SocialButtonsGroup = () => {
  const handleWhatsApp = () => {
    const phoneNumber = "18096581245";
    const message =
      "¡Hola! Me interesa conocer más sobre sus postres artesanales.";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  const handleInstagram = () => {
    window.open(
      "https://instagram.com/cucinanostrard",
      "_blank",
      "noopener,noreferrer",
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed right-4 top-1/2 -translate-y-1/2 z-50 md:right-6 flex flex-col space-y-3"
    >
      {/* Instagram Button */}
      <motion.div
        className="group relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, -2, 0],
        }}
        transition={{
          y: {
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <button
          onClick={handleInstagram}
          className="relative w-12 h-12 bg-gradient-to-br from-dusty-rose to-sage rounded-full shadow-lg flex items-center justify-center text-white group-hover:shadow-xl transition-all duration-300"
          aria-label="Síguenos en Instagram"
        >
          <Instagram className="w-6 h-6" />

          {/* Soft pulse effect */}
          <motion.div
            className="absolute inset-0 bg-dusty-rose/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </button>

        {/* Expandable text */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-3"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg whitespace-nowrap">
            <span className="text-sm font-source-serif text-dark-cocoa">
              @cucinanostrard
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* WhatsApp Button */}
      <motion.div
        className="group relative"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          y: [0, 2, 0],
        }}
        transition={{
          y: {
            duration: 2.5,
            repeat: Infinity,
            ease: "easeInOut",
          },
        }}
      >
        <button
          onClick={handleWhatsApp}
          className="relative w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-full shadow-lg flex items-center justify-center text-white group-hover:shadow-xl transition-all duration-300"
          aria-label="Contactar por WhatsApp"
        >
          <MessageCircle className="w-6 h-6" />

          {/* Soft pulse effect */}
          <motion.div
            className="absolute inset-0 bg-green-500/30 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </button>

        {/* Expandable text */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: "auto", opacity: 1 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden absolute left-0 top-1/2 -translate-y-1/2 -translate-x-full pr-3"
        >
          <div className="bg-white/95 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg whitespace-nowrap">
            <span className="text-sm font-source-serif text-dark-cocoa">
              ¡Hablemos!
            </span>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default SocialButtonsGroup;
