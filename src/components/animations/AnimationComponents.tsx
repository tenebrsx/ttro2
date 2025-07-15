import { motion, useInView } from "framer-motion";
import { ReactNode, useRef, useEffect, useState } from "react";
import {
  isMobileDevice,
  prefersReducedMotion,
  getAnimationPerformanceLevel,
  PerformanceLevel,
  getMobileAnimationSettings,
} from "../../utils/mobileDetection";

interface AnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
}

// Fade in animation
export const FadeIn = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: AnimationProps) => {
  const getInitialProps = () => {
    switch (direction) {
      case "up":
        return { opacity: 0, y: 30 };
      case "down":
        return { opacity: 0, y: -30 };
      case "left":
        return { opacity: 0, x: -30 };
      case "right":
        return { opacity: 0, x: 30 };
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateProps = () => {
    switch (direction) {
      case "up":
      case "down":
        return { opacity: 1, y: 0 };
      case "left":
      case "right":
        return { opacity: 1, x: 0 };
      default:
        return { opacity: 1 };
    }
  };

  return (
    <motion.div
      initial={getInitialProps()}
      animate={getAnimateProps()}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Fade in from bottom - Mobile optimized
export const FadeInUp = ({
  children,
  className = "",
  delay = 0,
}: AnimationProps) => {
  const ref = useRef(null);
  const [animationSettings, setAnimationSettings] = useState(
    getMobileAnimationSettings(PerformanceLevel.HIGH),
  );
  const [isMobile, setIsMobile] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const initializeSettings = async () => {
      try {
        const mobile = isMobileDevice();
        const performanceLevel = await getAnimationPerformanceLevel();
        const settings = getMobileAnimationSettings(performanceLevel);

        setIsMobile(mobile);
        setAnimationSettings(settings);
      } catch (error) {
        console.warn("Animation settings failed, using fallback:", error);
        setShowFallback(true);
      }
    };

    initializeSettings();

    // Fallback timeout to ensure content appears
    const fallbackTimeout = setTimeout(() => {
      setShowFallback(true);
    }, 2000);

    return () => clearTimeout(fallbackTimeout);
  }, []);

  // Use viewport detection for mobile optimization
  const isInView = useInView(ref, {
    once: true,
    amount: isMobile ? 0.05 : 0.1,
    margin: isMobile ? "0px" : "-20px",
  });

  // Don't animate if disabled or fallback is needed
  if (!animationSettings.enabled || showFallback) {
    return (
      <div className={className} style={{ opacity: 1 }}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: isMobile ? 20 : 30 }}
      animate={
        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: isMobile ? 20 : 30 }
      }
      transition={{
        duration: animationSettings.duration,
        delay: delay * (animationSettings.staggerDelay || 0.1),
        ease: "easeOut",
      }}
      className={`${className} ${isMobile ? "mobile-animations-enabled" : ""}`}
    >
      {children}
    </motion.div>
  );
};

// Scale on hover - Mobile optimized
export const ScaleOnHover = ({ children, className = "" }: AnimationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <motion.div
      whileHover={isMobile ? undefined : { scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`${className} ${isMobile ? "touch-optimized" : ""}`}
    >
      {children}
    </motion.div>
  );
};

// Gentle tilt on hover - Mobile optimized
export const TiltOnHover = ({ children, className = "" }: AnimationProps) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());
  }, []);

  return (
    <motion.div
      whileHover={isMobile ? undefined : { scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`${className} ${isMobile ? "touch-optimized" : ""}`}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animations - Mobile optimized
export const StaggerChildren = ({
  children,
  className = "",
}: AnimationProps) => {
  const ref = useRef(null);
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

  const isInView = useInView(ref, {
    once: true,
    amount: isMobile ? 0.05 : 0.1,
  });

  if (!animationSettings.enabled) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        visible: {
          transition: {
            staggerChildren: animationSettings.staggerDelay || 0.1,
          },
        },
      }}
      className={`${className} ${isMobile ? "mobile-animations-enabled" : ""}`}
    >
      {children}
    </motion.div>
  );
};

// Individual child for stagger
export const StaggerChild = ({ children, className = "" }: AnimationProps) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.3 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Typewriter effect
export const TypeWriter = ({ children, className = "" }: AnimationProps) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Floating animation
export const FloatingElement = ({
  children,
  className = "",
}: AnimationProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Parallax effect
export const ParallaxElement = ({
  children,
  className = "",
  speed = 0.5,
}: AnimationProps & { speed?: number }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: -20 * speed }}
      transition={{ duration: 1, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
