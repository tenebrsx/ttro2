import React, { useState, useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Clock, ChefHat } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface DessertCardProps {
  id: string;
  name: string;
  image: string;
  price: string;
  story: string;
  preparationTime?: string;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  onClick?: () => void;
}

const EnhancedDessertCard: React.FC<DessertCardProps> = ({
  id,
  name,
  image,
  price,
  story,
  preparationTime = "2-3 días",
  isVegan = false,
  isGlutenFree = false,
  onClick,
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative cursor-pointer h-[28rem]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Main Card with Full Image Background */}
      <motion.div
        className="relative w-full h-full rounded-3xl overflow-hidden shadow-gentle border border-white/20"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        whileHover={{
          boxShadow:
            "0 25px 50px -12px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Image Zoom Effect */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${image})`,
            scale: isHovered ? 1.1 : 1,
            filter: isHovered
              ? "brightness(1.1) saturate(1.3)"
              : "brightness(1) saturate(1)",
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />

        {/* Base Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Enhanced Hover Overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />

        {/* Top Section - Dietary Info and Time */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
          {/* Dietary Information */}
          <div className="flex flex-wrap gap-2">
            {isVegan && (
              <span className="text-xs bg-green-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full font-medium shadow-lg">
                Vegano
              </span>
            )}
            {isGlutenFree && (
              <span className="text-xs bg-blue-500/80 backdrop-blur-sm text-white px-3 py-1 rounded-full font-medium shadow-lg">
                Sin Gluten
              </span>
            )}
          </div>

          {/* Preparation Time */}
          <motion.div
            className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm rounded-full px-3 py-2 shadow-lg"
            whileHover={{ scale: 1.05 }}
          >
            <Clock className="w-4 h-4 text-white" />
            <span className="text-sm text-white font-medium">
              {preparationTime}
            </span>
          </motion.div>
        </div>

        {/* Center Section - Title (visible on hover) */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20,
          }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="text-center px-6">
            <h3 className="text-3xl font-academy text-white mb-3 drop-shadow-2xl font-bold">
              {name}
            </h3>
            <p className="text-sm text-white/90 font-source-serif leading-relaxed drop-shadow-lg max-w-xs">
              {story}
            </p>
          </div>
        </motion.div>

        {/* Bottom Section - Always Visible Info */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          {/* Title and Price - Always Visible */}
          <div className="mb-3">
            <motion.h3
              className="text-3xl font-academy text-white mb-2 drop-shadow-2xl font-bold"
              animate={{
                opacity: isHovered ? 0 : 1,
              }}
              transition={{ duration: 0.3 }}
            >
              {name}
            </motion.h3>

            <div className="flex items-center justify-between">
              <span className="text-lg font-source-serif font-medium text-white/90 drop-shadow-lg">
                {price}
              </span>
              <motion.div
                className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 cursor-pointer"
                whileHover={{ scale: 1.05 }}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/product/${id}`);
                }}
              >
                <ChefHat className="w-4 h-4 text-white" />
                <span className="text-sm text-white font-medium">
                  Ver Detalles
                </span>
              </motion.div>
            </div>
          </div>

          {/* Hover Action Button */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <motion.button
              className="w-full bg-white/90 backdrop-blur-sm text-black py-3 rounded-full text-sm font-bold transition-all duration-300 relative overflow-hidden shadow-2xl"
              whileHover={{
                scale: 1.02,
                backgroundColor: "rgba(255, 255, 255, 1)",
              }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                const message = `Hola! Me interesa personalizar: ${name} - ${price}`;
                const whatsappUrl = `https://api.whatsapp.com/send/?phone=18096581245&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
                window.open(whatsappUrl, "_blank");
              }}
            >
              <span className="relative z-10">Personalizar Pedido</span>
              <motion.div
                className="absolute inset-0 bg-dusty-rose"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* Subtle Effect Highlight */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-3xl pointer-events-none"
          style={{
            opacity: isHovered ? 0.6 : 0.2,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Decorative Corner Accent */}
        <motion.div
          className="absolute top-4 right-4 w-12 h-12 border-2 border-white/30 rounded-full"
          animate={{
            scale: isHovered ? 1.2 : 1,
            rotate: isHovered ? 180 : 0,
          }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-2 bg-white/20 rounded-full backdrop-blur-sm" />
        </motion.div>
      </motion.div>

      {/* Enhanced Shadow */}
      <motion.div
        className="absolute inset-0 bg-black/20 rounded-3xl blur-2xl -z-10"
        animate={{
          scale: isHovered ? 1.05 : 0.95,
          opacity: isHovered ? 0.8 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default EnhancedDessertCard;
