import { motion, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { elegantAnimations, viewportSettings } from "../../utils/animations";

interface AnimationWrapperProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

// Elegant reveal animation - replaces basic fade-in
export const ElegantReveal = ({ 
  children, 
  className = "", 
  delay = 0 
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportSettings);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...elegantAnimations.elegantReveal,
        visible: {
          ...elegantAnimations.elegantReveal.visible,
          transition: {
            ...elegantAnimations.elegantReveal.visible.transition,
            delay,
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
  className = "" 
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportSettings);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={elegantAnimations.staggerContainer}
    >
      {children}
    </motion.div>
  );
};

// Premium card animation
export const PremiumCard = ({ 
  children, 
  className = "",
  delay = 0
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportSettings);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      whileHover="hover"
      variants={{
        ...elegantAnimations.premiumCard,
        visible: {
          ...elegantAnimations.premiumCard.visible,
          transition: {
            ...elegantAnimations.premiumCard.visible.transition,
            delay,
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
  delay = 0
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportSettings);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...elegantAnimations.textReveal,
        visible: {
          ...elegantAnimations.textReveal.visible,
          transition: {
            ...elegantAnimations.textReveal.visible.transition,
            delay,
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
      variants={elegantAnimations.elegantButton}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      {...props}
    >
      {children}
    </motion.button>
  );
};

// Breathing decorative element
export const BreathingElement = ({ 
  children, 
  className = "" 
}: AnimationWrapperProps) => {
  return (
    <motion.div
      className={className}
      animate={elegantAnimations.breathe}
    >
      {children}
    </motion.div>
  );
};

// Parallax element
export const ParallaxElement = ({ 
  children, 
  className = "",
  speed = "slow" 
}: AnimationWrapperProps & { speed?: "slow" | "medium" }) => {
  const animation = speed === "slow" 
    ? elegantAnimations.parallaxSlow 
    : elegantAnimations.parallaxMedium;

  return (
    <motion.div
      className={className}
      animate={animation}
    >
      {children}
    </motion.div>
  );
};

// Image reveal with sophisticated blur effect
export const ImageReveal = ({ 
  children, 
  className = "",
  delay = 0
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, viewportSettings);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...elegantAnimations.imageReveal,
        visible: {
          ...elegantAnimations.imageReveal.visible,
          transition: {
            ...elegantAnimations.imageReveal.visible.transition,
            delay,
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
  className = "" 
}: AnimationWrapperProps) => {
  return (
    <motion.div
      className={className}
      whileHover={elegantAnimations.magnetic.hover}
    >
      {children}
    </motion.div>
  );
};

// Scroll-triggered reveal
export const ScrollReveal = ({ 
  children, 
  className = "",
  delay = 0
}: AnimationWrapperProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        ...elegantAnimations.scrollReveal,
        visible: {
          ...elegantAnimations.scrollReveal.visible,
          transition: {
            ...elegantAnimations.scrollReveal.visible.transition,
            delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
};