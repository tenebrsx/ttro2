import React, { useRef, useEffect, useState } from "react";
import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";

// ==================== SOPHISTICATED EASING CURVES ====================
export const sophisticatedEasing = [0.25, 0.1, 0.25, 1]; // Smooth, professional
export const subtleEasing = [0.4, 0.0, 0.2, 1]; // Material design inspired
export const elegantEasing = [0.19, 1, 0.22, 1]; // Luxury feel

// ==================== MINIMAL FADE REVEAL ====================
interface FadeRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  distance?: number;
}

export const FadeReveal: React.FC<FadeRevealProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  direction = "up",
  distance = 30,
}) => {
  const getInitialState = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: distance };
      case "down":
        return { opacity: 0, y: -distance };
      case "left":
        return { opacity: 0, x: distance };
      case "right":
        return { opacity: 0, x: -distance };
      case "none":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: distance };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialState()}
      whileInView={{
        opacity: 1,
        y: 0,
        x: 0,
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: sophisticatedEasing,
      }}
    >
      {children}
    </motion.div>
  );
};

// ==================== STAGGER REVEAL SYSTEM ====================
interface StaggerRevealProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  childDelay?: number;
}

export const StaggerReveal: React.FC<StaggerRevealProps> = ({
  children,
  className = "",
  staggerDelay = 0.1,
  childDelay = 0.6,
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: childDelay,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {children}
    </motion.div>
  );
};

export const StaggerChild: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = "" }) => {
  const childVariants = {
    hidden: {
      opacity: 0,
      y: 20,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: sophisticatedEasing,
      },
    },
  };

  return (
    <motion.div className={className} variants={childVariants}>
      {children}
    </motion.div>
  );
};

// ==================== PROXIMITY MAGNETIC EFFECT ====================
interface ProximityMagnetProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  threshold?: number;
}

export const ProximityMagnet: React.FC<ProximityMagnetProps> = ({
  children,
  className = "",
  strength = 0.15,
  threshold = 150,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isNear, setIsNear] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2),
      );

      if (distance < threshold) {
        setIsNear(true);
        const x = (e.clientX - centerX) * strength;
        const y = (e.clientY - centerY) * strength;
        setMousePos({ x, y });
      } else {
        setIsNear(false);
        setMousePos({ x: 0, y: 0 });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [strength, threshold]);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        x: mousePos.x,
        y: mousePos.y,
      }}
      transition={{
        type: "spring",
        stiffness: 150,
        damping: 15,
        mass: 0.1,
      }}
    >
      {children}
    </motion.div>
  );
};

// ==================== SMOOTH PARALLAX SCROLL ====================
interface ParallaxScrollProps {
  children: React.ReactNode;
  className?: string;
  speed?: number;
  direction?: "up" | "down";
}

export const ParallaxScroll: React.FC<ParallaxScrollProps> = ({
  children,
  className = "",
  speed = 0.5,
  direction = "up",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    direction === "up"
      ? [100 * speed, -100 * speed]
      : [-100 * speed, 100 * speed],
  );

  return (
    <motion.div ref={ref} className={className} style={{ y }}>
      {children}
    </motion.div>
  );
};

// ==================== ELEGANT TEXT REVEAL ====================
interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  staggerDelay?: number;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  children,
  className = "",
  delay = 0,
  staggerDelay = 0.08,
}) => {
  const words = children.split(" ");

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: staggerDelay, delayChildren: delay }}
    >
      {words.map((word, i) => (
        <motion.span
          key={i}
          className="inline-block mr-2"
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: {
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.6,
                ease: sophisticatedEasing,
              },
            },
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
};

// ==================== SMOOTH HOVER LIFT ====================
interface HoverLiftProps {
  children: React.ReactNode;
  className?: string;
  liftHeight?: number;
  duration?: number;
}

export const HoverLift: React.FC<HoverLiftProps> = ({
  children,
  className = "",
  liftHeight = 8,
  duration = 0.3,
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -liftHeight,
        transition: {
          duration,
          ease: subtleEasing,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// ==================== SCALE ON HOVER ====================
interface ScaleHoverProps {
  children: React.ReactNode;
  className?: string;
  scale?: number;
  duration?: number;
}

export const ScaleHover: React.FC<ScaleHoverProps> = ({
  children,
  className = "",
  scale = 1.02,
  duration = 0.3,
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        transition: {
          duration,
          ease: subtleEasing,
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// ==================== SMOOTH MORPHING CONTAINER ====================
interface MorphContainerProps {
  children: React.ReactNode;
  className?: string;
  hoverRadius?: number;
  duration?: number;
}

export const MorphContainer: React.FC<MorphContainerProps> = ({
  children,
  className = "",
  hoverRadius = 24,
  duration = 0.4,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className={className}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      animate={{
        borderRadius: isHovered ? hoverRadius : 16,
      }}
      transition={{
        duration,
        ease: elegantEasing,
      }}
    >
      {children}
    </motion.div>
  );
};

// ==================== PROGRESSIVE BLUR ====================
interface ProgressiveBlurProps {
  children: React.ReactNode;
  className?: string;
  blurAmount?: number;
}

export const ProgressiveBlur: React.FC<ProgressiveBlurProps> = ({
  children,
  className = "",
  blurAmount = 4,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const blur = useTransform(scrollYProgress, [0, 0.5, 1], [0, blurAmount, 0]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        filter: useTransform(blur, (value) => `blur(${value}px)`),
      }}
    >
      {children}
    </motion.div>
  );
};

// ==================== SOPHISTICATED ENTRANCE ====================
interface EntranceProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  type?: "fade" | "slide" | "scale";
}

export const Entrance: React.FC<EntranceProps> = ({
  children,
  className = "",
  delay = 0,
  duration = 0.8,
  type = "fade",
}) => {
  const getInitialState = () => {
    switch (type) {
      case "fade":
        return { opacity: 0 };
      case "slide":
        return { opacity: 0, y: 30 };
      case "scale":
        return { opacity: 0, scale: 0.9 };
      default:
        return { opacity: 0 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitialState()}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
      }}
      transition={{
        duration,
        delay,
        ease: sophisticatedEasing,
      }}
    >
      {children}
    </motion.div>
  );
};

// ==================== SCROLL OPACITY ====================
interface ScrollOpacityProps {
  children: React.ReactNode;
  className?: string;
}

export const ScrollOpacity: React.FC<ScrollOpacityProps> = ({
  children,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div ref={ref} className={className} style={{ opacity }}>
      {children}
    </motion.div>
  );
};

// ==================== BUTTON WITH SOPHISTICATED HOVER ====================
interface SophisticatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "primary" | "secondary" | "ghost";
}

export const SophisticatedButton: React.FC<SophisticatedButtonProps> = ({
  children,
  onClick,
  className = "",
  variant = "primary",
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const baseClasses =
    "relative overflow-hidden rounded-full px-8 py-4 font-medium cursor-pointer transition-all duration-300";
  const variantClasses = {
    primary:
      "bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white",
    secondary: "bg-white text-dusty-rose-600 border border-dusty-rose-300",
    ghost: "bg-transparent text-dusty-rose-600 border border-dusty-rose-300/50",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -2,
        transition: {
          duration: 0.2,
          ease: subtleEasing,
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: {
          duration: 0.1,
          ease: subtleEasing,
        },
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{
          duration: 0.6,
          ease: elegantEasing,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};
