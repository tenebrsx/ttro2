import React from "react";
import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export const FloatingActionButton: React.FC = () => {
  const handleWhatsAppClick = () => {
    const phoneNumber = "18096581245";
    const message =
      "¡Hola! Me interesa conocer más sobre sus postres artesanales. ¿Podrían ayudarme con información sobre pedidos personalizados?";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <motion.div
        className="flex items-center space-x-3"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {/* WhatsApp Label */}
        <motion.div
          className="bg-white/95 backdrop-blur-sm px-3 py-2 rounded-lg shadow-gentle border border-dusty-rose/10 hidden sm:block"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          <span className="text-sm font-medium text-mocha whitespace-nowrap">
            WhatsApp
          </span>
        </motion.div>

        {/* WhatsApp Button */}
        <motion.button
          onClick={handleWhatsAppClick}
          className="w-14 h-14 bg-green-500 hover:bg-green-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all duration-300 relative overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <MessageCircle className="w-6 h-6" />

          {/* Pulse effect */}
          <motion.div
            className="absolute inset-0 bg-white/30 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FloatingActionButton;
