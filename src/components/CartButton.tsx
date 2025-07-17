import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

const CartButton: React.FC = () => {
  const { itemCount } = useCart();
  const navigate = useNavigate();

  if (itemCount === 0) return null;

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed bottom-24 right-6 z-50 lg:hidden"
    >
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/cart")}
        className="relative bg-sage text-white w-16 h-16 rounded-full shadow-xl hover:bg-cocoa transition-colors duration-200 flex items-center justify-center"
      >
        <ShoppingBag className="w-6 h-6" />

        {/* Item Count Badge */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 bg-mocha text-white text-xs font-karla font-bold w-6 h-6 rounded-full flex items-center justify-center border-2 border-white"
            >
              {itemCount > 99 ? "99+" : itemCount}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Pulse Animation */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.7, 0.3, 0.7],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-sage rounded-full -z-10"
        />
      </motion.button>
    </motion.div>
  );
};

export default CartButton;
