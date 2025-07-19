import * as React from "react";
const { useRef, useEffect, useState } = React;
import {
  motion,
  useTransform,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { DURATIONS } from "../../config/animationTiming";

// ==================== SOPHISTICATED EASING CURVES ====================
export const sophisticatedEasing = [0.25, 0.1, 0.25, 1] as const; // Smooth, professional
export const subtleEasing = [0.4, 0.0, 0.2, 1] as const; // Material design inspired
export const elegantEasing = [0.19, 1, 0.22, 1] as const; // Luxury feel

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
  duration = DURATIONS.elegant,
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
      viewport={{ once: true, margin: "-63px" }}
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
  staggerDelay = 0.15,
  childDelay = 0.8,
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
      viewport={{ once: true, margin: "-32px" }}
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
        duration: DURATIONS.elegant,
        ease: sophisticatedEasing as any,
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
  children: React.ReactNode;
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
  // Safely convert children to string for text animation
  const childrenString =
    typeof children === "string"
      ? children
      : typeof children === "number"
        ? children.toString()
        : React.isValidElement(children)
          ? "" // For JSX elements, fall back to empty string
          : String(children || "");

  const words = childrenString.split(" ").filter((word) => word.length > 0);

  // If we have no words to animate (JSX elements or empty content), render children directly
  if (words.length === 0 || React.isValidElement(children)) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-63px" }}
        transition={{
          duration: DURATIONS.elegant,
          ease: sophisticatedEasing,
          delay,
        }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-63px" }}
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
                duration: DURATIONS.elegant,
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
  duration = DURATIONS.fast,
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        y: -liftHeight,
        transition: {
          duration,
          ease: subtleEasing as any,
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
  scale = 1.05,
  duration = DURATIONS.fast,
}) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale,
        transition: {
          duration,
          ease: subtleEasing as any,
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
  duration = DURATIONS.instant,
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
        ease: elegantEasing as any,
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
  duration = DURATIONS.medium,
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
        ease: sophisticatedEasing as any,
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
    "relative overflow-hidden rounded-full px-8 py-4 font-bodoni font-medium cursor-pointer transition-all duration-300 tracking-button-refined";
  const variantClasses = {
    primary:
      "bg-cocoa-500 text-white font-medium border-2 border-cocoa-500 shadow-lg",
    secondary:
      "bg-transparent text-cocoa-500 border-2 border-cocoa-500 font-medium",
    ghost: "bg-transparent text-sage-600 border border-sage-300/50 font-normal",
  };

  return (
    <motion.button
      className={`${baseClasses} ${variantClasses[variant]} ${className}`}
      onClick={onClick}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        y: -2,
        scale: variant === "primary" ? 1.02 : 1.01,
        transition: {
          duration: DURATIONS.instant,
          ease: subtleEasing as any,
        },
      }}
      whileTap={{
        scale: 0.98,
        transition: {
          duration: DURATIONS.instant,
          ease: subtleEasing as any,
        },
      }}
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
        initial={{ x: "-100%" }}
        animate={{ x: isHovered ? "100%" : "-100%" }}
        transition={{
          duration: DURATIONS.fast,
          ease: elegantEasing as any,
        }}
      />
      <span className="relative z-10">{children}</span>
    </motion.button>
  );
};

// ==================== CUTTING-EDGE ANIMATIONS ====================

// ==================== PARTICLE SYSTEM ====================
interface ParticleSystemProps {
  children: React.ReactNode;
  className?: string;
  particleCount?: number;
  particleColor?: string;
}

export const ParticleSystem: React.FC<ParticleSystemProps> = ({
  children,
  className = "",
  particleCount = 20,
  particleColor = "#c78787",
}) => {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 2,
      }));
      setParticles(newParticles);
    };

    generateParticles();
  }, [particleCount]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {/* Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute w-1 h-1 rounded-full opacity-30"
            style={{
              backgroundColor: particleColor,
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.8, 0.3],
              scale: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              delay: particle.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
      {children}
    </div>
  );
};

// ==================== MAGNETIC FIELD INTERACTION ====================
interface MagneticFieldProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  radius?: number;
}

export const MagneticField: React.FC<MagneticFieldProps> = ({
  children,
  className = "",
  strength = 0.3,
  radius = 200,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [magnetPosition, setMagnetPosition] = useState({ x: 0, y: 0 });
  const [isInField, setIsInField] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!ref.current) return;

      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distance = Math.sqrt(
        Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2),
      );

      if (distance < radius) {
        setIsInField(true);
        const x = (e.clientX - centerX) * strength;
        const y = (e.clientY - centerY) * strength;
        setMagnetPosition({ x, y });
      } else {
        setIsInField(false);
        setMagnetPosition({ x: 0, y: 0 });
      }
    };

    document.addEventListener("mousemove", handleMouseMove);
    return () => document.removeEventListener("mousemove", handleMouseMove);
  }, [strength, radius]);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        x: magnetPosition.x,
        y: magnetPosition.y,
        scale: isInField ? 1.02 : 1,
      }}
      transition={{
        type: "spring",
        stiffness: 200,
        damping: 20,
      }}
    >
      {children}
    </motion.div>
  );
};

// ==================== ADVANCED HOLOGRAPHIC SHIMMER ====================
interface HolographicShimmerProps {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
  speed?: number;
  color?: "white" | "rainbow" | "gold" | "sage" | "custom";
  direction?: "horizontal" | "vertical" | "diagonal";
  trigger?: "auto" | "hover" | "visible";
  customColor?: string;
}

export const HolographicShimmer: React.FC<HolographicShimmerProps> = ({
  children,
  className = "",
  intensity = 0.3,
  speed = 3,
  color = "white",
  direction = "horizontal",
  trigger = "auto",
  customColor = "#ffffff",
}) => {
  const [isActive, setIsActive] = useState(trigger === "auto");
  const [isVisible, setIsVisible] = useState(false);

  const getGradientColor = () => {
    switch (color) {
      case "white":
        return `rgba(255,255,255,${intensity})`;
      case "rainbow":
        return `linear-gradient(45deg,
          rgba(255,0,150,${intensity * 0.8}),
          rgba(0,255,255,${intensity}),
          rgba(255,255,0,${intensity * 0.8}))`;
      case "gold":
        return `rgba(255,215,0,${intensity})`;
      case "sage":
        return `rgba(146,155,154,${intensity})`;
      case "custom":
        return customColor;
      default:
        return `rgba(255,255,255,${intensity})`;
    }
  };

  const getDirection = () => {
    switch (direction) {
      case "horizontal":
        return {
          background:
            color === "rainbow"
              ? getGradientColor()
              : `linear-gradient(90deg, transparent 30%, ${getGradientColor()} 50%, transparent 70%)`,
          animate: { x: ["-100%", "200%"] },
        };
      case "vertical":
        return {
          background:
            color === "rainbow"
              ? getGradientColor()
              : `linear-gradient(0deg, transparent 30%, ${getGradientColor()} 50%, transparent 70%)`,
          animate: { y: ["-100%", "200%"] },
        };
      case "diagonal":
        return {
          background:
            color === "rainbow"
              ? getGradientColor()
              : `linear-gradient(45deg, transparent 30%, ${getGradientColor()} 50%, transparent 70%)`,
          animate: { x: ["-100%", "200%"], y: ["-50%", "50%"] },
        };
      default:
        return {
          background: `linear-gradient(90deg, transparent 30%, ${getGradientColor()} 50%, transparent 70%)`,
          animate: { x: ["-100%", "200%"] },
        };
    }
  };

  const directionConfig = getDirection();

  useEffect(() => {
    if (trigger === "visible" && isVisible) {
      setIsActive(true);
      const timer = setTimeout(() => setIsActive(false), speed * 1000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, trigger, speed]);

  const shouldAnimate =
    trigger === "auto" ||
    (trigger === "hover" && isActive) ||
    (trigger === "visible" && isActive);

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      onHoverStart={() => trigger === "hover" && setIsActive(true)}
      onHoverEnd={() => trigger === "hover" && setIsActive(false)}
      onViewportEnter={() => trigger === "visible" && setIsVisible(true)}
      viewport={{ once: false }}
    >
      <AnimatePresence>
        {shouldAnimate && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: directionConfig.background,
              mixBlendMode: color === "rainbow" ? "screen" : "normal",
            }}
            initial={{
              x:
                direction === "horizontal" || direction === "diagonal"
                  ? "-100%"
                  : "0%",
              y:
                direction === "vertical" || direction === "diagonal"
                  ? "-100%"
                  : "0%",
              opacity: 0,
            }}
            animate={{
              ...directionConfig.animate,
              opacity: [0, 1, 0],
            }}
            exit={{ opacity: 0 }}
            transition={{
              duration: speed,
              repeat: trigger === "auto" ? Infinity : 0,
              ease: "linear",
              opacity: { duration: speed * 0.3 },
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </motion.div>
  );
};

// ==================== ADVANCED CINEMATIC REVEAL ====================
interface CinematicRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?:
    | "horizontal"
    | "vertical"
    | "diagonal"
    | "center"
    | "iris"
    | "wipe-left"
    | "wipe-right"
    | "curtain";
  delay?: number;
  duration?: number;
  easing?: "smooth" | "dramatic" | "elegant";
}

export const CinematicReveal: React.FC<CinematicRevealProps> = ({
  children,
  className = "",
  direction = "horizontal",
  delay = 0,
  duration = DURATIONS.dramatic,
  easing = "dramatic",
}) => {
  const getEasing = () => {
    switch (easing) {
      case "smooth":
        return sophisticatedEasing as any;
      case "dramatic":
        return [0.16, 1, 0.3, 1] as any;
      case "elegant":
        return elegantEasing as any;
      default:
        return elegantEasing as any;
    }
  };

  const getClipPath = () => {
    switch (direction) {
      case "horizontal":
        return {
          hidden: "inset(0 100% 0 0)",
          visible: "inset(0 0 0 0)",
        };
      case "vertical":
        return {
          hidden: "inset(100% 0 0 0)",
          visible: "inset(0 0 0 0)",
        };
      case "diagonal":
        return {
          hidden: "inset(0 100% 100% 0)",
          visible: "inset(0 0 0 0)",
        };
      case "center":
        return {
          hidden: "inset(50% 50% 50% 50%)",
          visible: "inset(0 0 0 0)",
        };
      case "iris":
        return {
          hidden: "circle(0% at 50% 50%)",
          visible: "circle(100% at 50% 50%)",
        };
      case "wipe-left":
        return {
          hidden: "inset(0 0 0 100%)",
          visible: "inset(0 0 0 0)",
        };
      case "wipe-right":
        return {
          hidden: "inset(0 100% 0 0)",
          visible: "inset(0 0 0 0)",
        };
      case "curtain":
        return {
          hidden: "inset(0 50% 0 50%)",
          visible: "inset(0 0 0 0)",
        };
      default:
        return {
          hidden: "inset(0 100% 0 0)",
          visible: "inset(0 0 0 0)",
        };
    }
  };

  const clipPaths = getClipPath();

  const maskVariants = {
    hidden: {
      clipPath: clipPaths.hidden,
    },
    visible: {
      clipPath: clipPaths.visible,
      transition: {
        duration,
        delay,
        ease: getEasing(),
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-32px" }}
      variants={maskVariants}
    >
      {children}
    </motion.div>
  );
};

// ==================== FLUID CURSOR FOLLOWER ====================
interface FluidCursorProps {
  children: React.ReactNode;
  className?: string;
  fluidSize?: number;
}

export const FluidCursor: React.FC<FluidCursorProps> = ({
  children,
  className = "",
  fluidSize = 100,
}) => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      setCursorPosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <AnimatePresence>
        {isHovering && (
          <motion.div
            className="absolute pointer-events-none z-50"
            style={{
              width: fluidSize,
              height: fluidSize,
              left: cursorPosition.x - fluidSize / 2,
              top: cursorPosition.y - fluidSize / 2,
              background:
                "radial-gradient(circle, rgba(199, 135, 135, 0.1) 0%, transparent 70%)",
              borderRadius: "50%",
              filter: "blur(10px)",
            }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{
              type: "spring",
              stiffness: 500,
              damping: 30,
            }}
          />
        )}
      </AnimatePresence>
      {children}
    </div>
  );
};

// ==================== GLITCH EFFECT ====================
interface GlitchEffectProps {
  children: React.ReactNode;
  className?: string;
  trigger?: "hover" | "auto";
  intensity?: number;
}

export const GlitchEffect: React.FC<GlitchEffectProps> = ({
  children,
  className = "",
  trigger = "hover",
  intensity = 0.5,
}) => {
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (trigger === "auto") {
      const interval = setInterval(() => {
        setIsGlitching(true);
        setTimeout(() => setIsGlitching(false), 200);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [trigger]);

  const glitchIntensity = intensity * 4; // Scale intensity for better effect

  const glitchVariants = {
    normal: {
      x: 0,
      skew: 0,
      filter: "hue-rotate(0deg)",
    },
    glitch: {
      x: [
        -glitchIntensity,
        glitchIntensity,
        -glitchIntensity,
        glitchIntensity,
        0,
      ],
      skew: [
        -glitchIntensity,
        glitchIntensity,
        -glitchIntensity,
        glitchIntensity,
        0,
      ],
      filter: [
        "hue-rotate(0deg)",
        `hue-rotate(${90 * intensity}deg)`,
        "hue-rotate(0deg)",
      ],
      transition: {
        duration: DURATIONS.instant,
        times: [0, 0.25, 0.5, 0.75, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={glitchVariants}
      animate={isGlitching ? "glitch" : "normal"}
      onHoverStart={() => trigger === "hover" && setIsGlitching(true)}
      onHoverEnd={() => trigger === "hover" && setIsGlitching(false)}
    >
      {children}
    </motion.div>
  );
};

// ==================== 3D PERSPECTIVE HOVER ====================
interface PerspectiveHoverProps {
  children: React.ReactNode;
  className?: string;
  rotationIntensity?: number;
}

export const PerspectiveHover: React.FC<PerspectiveHoverProps> = ({
  children,
  className = "",
  rotationIntensity = 15,
}) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateXValue =
      ((e.clientY - centerY) / rect.height) * rotationIntensity;
    const rotateYValue =
      ((e.clientX - centerX) / rect.width) * -rotationIntensity;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        transformStyle: "preserve-3d",
        transformOrigin: "center center",
      }}
      animate={{
        rotateX,
        rotateY,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 30,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
};

// ==================== PREMIUM EFFECTS COMBO ====================
interface PremiumRevealProps {
  children: React.ReactNode;
  className?: string;
  effect?: "cinematic-shimmer" | "holographic-reveal" | "luxury-entrance";
  delay?: number;
}

export const PremiumReveal: React.FC<PremiumRevealProps> = ({
  children,
  className = "",
  effect = "cinematic-shimmer",
  delay = 0,
}) => {
  if (effect === "cinematic-shimmer") {
    return (
      <CinematicReveal
        direction="iris"
        delay={delay}
        duration={DURATIONS.elegant}
        easing="dramatic"
        className={className}
      >
        <HolographicShimmer
          intensity={0.4}
          color="sage"
          direction="diagonal"
          trigger="visible"
          speed={2}
        >
          {children}
        </HolographicShimmer>
      </CinematicReveal>
    );
  }

  if (effect === "holographic-reveal") {
    return (
      <CinematicReveal
        direction="curtain"
        delay={delay}
        duration={DURATIONS.dramatic}
        easing="elegant"
        className={className}
      >
        <HolographicShimmer
          intensity={0.6}
          color="rainbow"
          direction="horizontal"
          trigger="visible"
          speed={1.5}
        >
          <PerspectiveHover rotationIntensity={5}>{children}</PerspectiveHover>
        </HolographicShimmer>
      </CinematicReveal>
    );
  }

  if (effect === "luxury-entrance") {
    return (
      <CinematicReveal
        direction="center"
        delay={delay}
        duration={DURATIONS.elegant}
        easing="dramatic"
        className={className}
      >
        <MagneticField strength={0.2} radius={150}>
          <HolographicShimmer
            intensity={0.3}
            color="gold"
            direction="diagonal"
            trigger="hover"
            speed={2.5}
          >
            {children}
          </HolographicShimmer>
        </MagneticField>
      </CinematicReveal>
    );
  }

  return <div className={className}>{children}</div>;
};
