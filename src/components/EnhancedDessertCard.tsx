import React, { useState, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Heart, Clock, ChefHat } from "lucide-react";

interface DessertCardProps {
  name: string;
  description: string;
  image: string;
  price: string;
  story: string;
  preparationTime?: string;
  isVegan?: boolean;
  isGlutenFree?: boolean;
  onClick?: () => void;
}

const EnhancedDessertCard: React.FC<DessertCardProps> = ({
  name,
  description,
  image,
  price,
  story,
  preparationTime = "2-3 días",
  isVegan = false,
  isGlutenFree = false,
  onClick,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking for parallax effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring animations for smooth mouse following
  const rotateX = useSpring(mouseY, { damping: 20, stiffness: 300 });
  const rotateY = useSpring(mouseX, { damping: 20, stiffness: 300 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue = (e.clientY - centerY) / 10;
    const rotateYValue = (centerX - e.clientX) / 10;

    mouseX.set(rotateXValue);
    mouseY.set(rotateYValue);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="group relative cursor-pointer perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {/* Main Card */}
      <motion.div
        className="relative bg-gradient-to-br from-cream/90 to-white/95 backdrop-blur-sm rounded-3xl overflow-hidden shadow-gentle border border-dusty-rose/10"
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          boxShadow:
            "0 25px 50px -12px rgba(131, 106, 93, 0.25), 0 0 0 1px rgba(212, 165, 165, 0.1)",
        }}
        transition={{ duration: 0.2 }}
      >
        {/* Like Button */}
        <motion.button
          className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-gentle hover:shadow-soft transition-all duration-300"
          onClick={(e) => {
            e.stopPropagation();
            setIsLiked(!isLiked);
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Heart
            className={`w-5 h-5 transition-all duration-300 ${
              isLiked
                ? "fill-red-500 text-red-500 scale-110"
                : "text-mocha/60 hover:text-red-400"
            }`}
          />
        </motion.button>

        {/* Image Container */}
        <div className="relative overflow-hidden h-48">
          <motion.img
            src={image}
            alt={name}
            className="w-full h-full object-cover"
            style={{
              scale: isHovered ? 1.1 : 1,
              filter: isHovered
                ? "brightness(1.1) saturate(1.2)"
                : "brightness(1) saturate(1)",
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />

          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Floating Ingredients */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Ingredient particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white/60 rounded-full"
                style={{
                  left: `${20 + i * 12}%`,
                  top: `${30 + (i % 2) * 20}%`,
                }}
                animate={{
                  y: [0, -10, 0],
                  opacity: [0.6, 1, 0.6],
                  scale: [0.8, 1.2, 0.8],
                }}
                transition={{
                  duration: 1 + i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 relative">
          {/* Decorative line */}
          <motion.div
            className="absolute top-0 left-6 h-px bg-dusty-rose/60 transform -translate-y-3"
            initial={{ width: 0 }}
            animate={{ width: isHovered ? 48 : 32 }}
            transition={{ duration: 0.3 }}
          />

          {/* Dietary Information */}
          {(isVegan || isGlutenFree) && (
            <div className="flex flex-wrap gap-2 mb-4">
              {isVegan && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  Vegano
                </span>
              )}
              {isGlutenFree && (
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                  Sin Gluten
                </span>
              )}
            </div>
          )}

          {/* Title */}
          <h3 className="text-xl font-playfair text-dark-cocoa mb-2 group-hover:text-dusty-rose transition-colors duration-300">
            {name}
          </h3>

          {/* Preparation Time */}
          <div className="flex items-center justify-end mb-3">
            <div className="flex items-center space-x-1 text-xs text-mocha/60">
              <Clock className="w-3 h-3" />
              <span>{preparationTime}</span>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-mocha/70 mb-4 font-source-serif font-light leading-relaxed">
            {description}
          </p>

          {/* Story - appears on hover */}
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="border-t border-dusty-rose/20 pt-3 mb-4">
              <p className="text-xs text-dusty-rose/80 font-source-serif italic">
                {story}
              </p>
            </div>
          </motion.div>

          {/* Price and Chef Icon */}
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium text-dark-cocoa font-source-serif">
              {price}
            </span>
            <motion.div
              className="flex items-center space-x-2"
              whileHover={{ scale: 1.05 }}
            >
              <ChefHat className="w-4 h-4 text-dusty-rose" />
              <span className="text-xs text-dusty-rose font-medium">
                Hecho a mano
              </span>
            </motion.div>
          </div>

          {/* Hover Action Button */}
          <motion.div
            className="overflow-hidden mt-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: isHovered ? "auto" : 0,
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <motion.button
              className="w-full bg-dusty-rose text-cream py-3 rounded-full text-sm font-medium shadow-gentle hover:shadow-soft transition-all duration-300 relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={(e) => {
                e.stopPropagation();
                // Handle order action
              }}
            >
              <span className="relative z-10">Personalizar Pedido</span>
              <motion.div
                className="absolute inset-0 bg-mocha"
                initial={{ x: "-100%" }}
                whileHover={{ x: "0%" }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          </motion.div>
        </div>

        {/* 3D Effect Highlight */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent rounded-3xl pointer-events-none"
          style={{
            opacity: isHovered ? 0.5 : 0,
            transform: "translateZ(1px)",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      {/* Shadow */}
      <motion.div
        className="absolute inset-0 bg-dusty-rose/10 rounded-3xl blur-xl -z-10"
        animate={{
          scale: isHovered ? 1.05 : 0.95,
          opacity: isHovered ? 0.6 : 0.2,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default EnhancedDessertCard;
