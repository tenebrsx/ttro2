import React from "react";
import { motion } from "framer-motion";

// Subtle dust particles overlay
export const DustParticles = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div className="absolute inset-0 opacity-20">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-sage/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Hand-drawn style divider
export const HandDrawnDivider = ({
  className = "",
}: {
  className?: string;
}) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg
        width="200"
        height="20"
        viewBox="0 0 200 20"
        className="text-sage/40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M10 10 Q 50 5 100 10 T 190 10"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 2, ease: "easeInOut" }}
        />
        <motion.circle
          cx="100"
          cy="10"
          r="3"
          fill="currentColor"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1, duration: 0.5 }}
        />
      </svg>
    </div>
  );
};

// Soft wave divider
export const WaveDivider = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`w-full ${className}`}>
      <svg
        viewBox="0 0 1200 120"
        className="w-full h-8 text-creamy-beige"
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
      >
        <motion.path
          d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 3, ease: "easeInOut" }}
        />
      </svg>
    </div>
  );
};

// Texture overlay for buttons and sections
export const TextureOverlay = ({
  className = "",
  intensity = "low",
}: {
  className?: string;
  intensity?: "low" | "medium" | "high";
}) => {
  const opacityMap = {
    low: "opacity-5",
    medium: "opacity-10",
    high: "opacity-20",
  };

  return (
    <div
      className={`absolute inset-0 pointer-events-none ${opacityMap[intensity]} ${className}`}
    >
      <div className="w-full h-full bg-texture-subtle"></div>
    </div>
  );
};

// Handwritten accent text
export const HandwrittenAccent = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={`font-dancing text-dusty-rose relative ${className}`}>
      {children}
      <motion.div
        className="absolute -bottom-1 left-0 w-full h-0.5 bg-dusty-rose/40"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </span>
  );
};

// Grain texture background
export const GrainTexture = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      <div
        className="w-full h-full opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: "multiply",
        }}
      />
    </div>
  );
};

// Floating shapes background
export const FloatingShapes = ({ className = "" }: { className?: string }) => {
  return (
    <div
      className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}
    >
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute opacity-10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            x: [0, 30, 0],
            y: [0, -20, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-8 h-8 bg-sage/20 rounded-full" />
        </motion.div>
      ))}
    </div>
  );
};
