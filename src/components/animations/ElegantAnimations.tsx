import { motion, useInView } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";
import {
  elegantAnimations,
  viewportSettings,
  mobileViewportSettings,
} from "../../utils/animations";
import {
  isMobileDevice,
  prefersReducedMotion,
  getAnimationPerformanceLevel,
  PerformanceLevel,
  getMobileAnimationSettings,
} from "../../utils/mobileDetection";

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Hook for mobile-optimized animations
const useMobileOptimizedAnimation = () => {
  const [animationSettings, setAnimationSettings] = useState(
    getMobileAnimationSettings(PerformanceLevel.HIGH),
  );
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const initializeSettings = async () => {
      const mobile = isMobileDevice();
      const performanceLevel = await getAnimationPerformanceLevel();
      const settings = getMobileAnimationSettings(performanceLevel);

      setIsMobile(mobile);
      setAnimationSettings(settings);
    };

    initializeSettings();
  }, []);

  return { animationSettings, isMobile };
};

// Elegant reveal animation - replaces basic fade-in
export const ElegantReveal = ({
  children,
  className = "",
  delay = 0,
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const { animationSettings, isMobile } = useMobileOptimizedAnimation();

  // Use mobile-optimized viewport settings
  const viewport = isMobile
    ? { once: true, amount: 0.05 }
    : { once: true, amount: 0.1 };
  const isInView = useInView(ref, viewport);

  // Don't animate if settings are disabled
  if (!animationSettings.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} ${isMobile ? "mobile-animations-enabled" : ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...elegantAnimations.elegantReveal,
        visible: {
          ...elegantAnimations.elegantReveal.visible,
          transition: {
            ...elegantAnimations.elegantReveal.visible.transition,
            duration: animationSettings.duration,
            delay: delay * (animationSettings.staggerDelay || 0.1),
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Staggered container for multiple elements
export const StaggerContainer = ({
  children,
  className = "",
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const { animationSettings, isMobile } = useMobileOptimizedAnimation();

  const viewport = isMobile
    ? { once: true, amount: 0.05 }
    : { once: true, amount: 0.1 };
  const isInView = useInView(ref, viewport);

  if (!animationSettings.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} ${isMobile ? "mobile-animations-enabled" : ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...elegantAnimations.staggerContainer,
        visible: {
          ...elegantAnimations.staggerContainer.visible,
          transition: {
            ...elegantAnimations.staggerContainer.visible.transition,
            staggerChildren: animationSettings.staggerDelay || 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Premium card animation
export const PremiumCard = ({
  children,
  className = "",
  delay = 0,
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const { animationSettings, isMobile } = useMobileOptimizedAnimation();

  const viewport = isMobile
    ? { once: true, amount: 0.05 }
    : { once: true, amount: 0.1 };
  const isInView = useInView(ref, viewport);

  if (!animationSettings.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} ${isMobile ? "mobile-animations-enabled touch-optimized" : ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover={isMobile ? undefined : "hover"}
      whileTap={isMobile ? "hover" : undefined}
      variants={{
        hidden: elegantAnimations.premiumCard.hidden,
        visible: {
          ...elegantAnimations.premiumCard.visible,
          transition: {
            duration: animationSettings.duration,
            delay: delay * (animationSettings.staggerDelay || 0.1),
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Sophisticated text reveal
export const TextReveal = ({
  children,
  className = "",
  delay = 0,
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const { animationSettings, isMobile } = useMobileOptimizedAnimation();

  const viewport = isMobile
    ? { once: true, amount: 0.05 }
    : { once: true, amount: 0.1 };
  const isInView = useInView(ref, viewport);

  if (!animationSettings.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} ${isMobile ? "mobile-animations-enabled" : ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...elegantAnimations.textReveal,
        visible: {
          ...elegantAnimations.textReveal.visible,
          transition: {
            ...elegantAnimations.textReveal.visible.transition,
            duration: animationSettings.duration,
            delay: delay * (animationSettings.staggerDelay || 0.1),
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Elegant button with hover effects
export const ElegantButton = ({
  children,
  className = "",
  onClick,
  ...props
}: AnimationWrapperProps & { onClick?: () => void; [key: string]: any }) => {
  return (
    <motion.button
      className={className}
      onClick={onClick}
      initial={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Breathing decorative element
export const BreathingElement = ({
  children,
  className = "",
}: AnimationWrapperProps) => {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.7, 0.9, 0.7],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Parallax element
export const ParallaxElement = ({
  children,
  className = "",
  speed = "slow",
}: AnimationWrapperProps & { speed?: "slow" | "medium" }) => {
  const animation =
    speed === "slow"
      ? elegantAnimations.parallaxSlow
      : elegantAnimations.parallaxMedium;

  return (
    <motion.div
      className={className}
      animate={{
        y: speed === "slow" ? [0, -30] : [0, -50],
      }}
      transition={{
        duration: speed === "slow" ? 20 : 15,
        repeat: Infinity,
        repeatType: "reverse",
        ease: "linear",
      }}
    >
      {children}
    </motion.div>
  );
};

// Image reveal with sophisticated blur effect
export const ImageReveal = ({
  children,
  className = "",
  delay = 0,
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const { animationSettings, isMobile } = useMobileOptimizedAnimation();

  const viewport = isMobile
    ? { once: true, amount: 0.05 }
    : { once: true, amount: 0.1 };
  const isInView = useInView(ref, viewport);

  if (!animationSettings.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} ${isMobile ? "mobile-animations-enabled" : ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...elegantAnimations.imageReveal,
        visible: {
          ...elegantAnimations.imageReveal.visible,
          transition: {
            ...elegantAnimations.imageReveal.visible.transition,
            duration: animationSettings.duration,
            delay: delay * (animationSettings.staggerDelay || 0.1),
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};

// Magnetic hover effect for interactive elements
export const MagneticHover = ({
  children,
  className = "",
}: AnimationWrapperProps) => {
  return (
    <motion.div
      className={className}
      whileHover={{
        scale: 1.1,
        rotate: [0, -2, 2, 0],
      }}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      {children}
    </motion.div>
  );
};

// Scroll-triggered reveal
export const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const { animationSettings, isMobile } = useMobileOptimizedAnimation();

  // Use mobile-optimized margin for scroll reveal
  const viewport = isMobile
    ? { once: true, amount: 0.05 }
    : { once: true, amount: 0.2 };
  const isInView = useInView(ref, viewport);

  if (!animationSettings.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={`${className} ${isMobile ? "mobile-animations-enabled force-animations" : ""}`}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...elegantAnimations.scrollReveal,
        visible: {
          ...elegantAnimations.scrollReveal.visible,
          transition: {
            ...elegantAnimations.scrollReveal.visible.transition,
            duration: animationSettings.duration,
            delay: delay * (animationSettings.staggerDelay || 0.1),
            ease: "easeOut",
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};
