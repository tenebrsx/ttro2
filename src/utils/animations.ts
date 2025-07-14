import { Variants } from "framer-motion";

// Sophisticated animation variants for a luxury pastry brand
export const elegantAnimations = {
  // Elegant reveal - smooth, luxurious entrance
  elegantReveal: {
    hidden: { 
      opacity: 0, 
      y: 60, 
      filter: "blur(10px)",
      scale: 0.95 
    },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.25, 0.4, 0.25, 1], // Sophisticated cubic-bezier
        staggerChildren: 0.15,
      },
    },
  },

  // Staggered children for elegant reveals
  staggerContainer: {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  },

  // Premium card entrance
  premiumCard: {
    hidden: { 
      opacity: 0, 
      y: 40, 
      rotateX: 15,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      rotateX: 5,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  },

  // Sophisticated text reveal
  textReveal: {
    hidden: { 
      opacity: 0, 
      y: 30,
      clipPath: "inset(100% 0 0 0)"
    },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: "inset(0% 0 0 0)",
      transition: {
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  },

  // Elegant button animations
  elegantButton: {
    initial: { scale: 1 },
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.3,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1,
      },
    },
  },

  // Parallax elements
  parallaxSlow: {
    y: [0, -30],
    transition: {
      duration: 20,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "linear",
    },
  },

  parallaxMedium: {
    y: [0, -50],
    x: [0, 20],
    transition: {
      duration: 15,
      repeat: Infinity,
      repeatType: "reverse" as const,
      ease: "linear",
    },
  },

  // Breathing animation for decorative elements
  breathe: {
    scale: [1, 1.05, 1],
    opacity: [0.7, 0.9, 0.7],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },

  // Magnetic hover effect
  magnetic: {
    hover: {
      scale: 1.1,
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 0.4,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  },

  // Premium loading animation
  premiumLoader: {
    animate: {
      rotate: 360,
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },

  // Elegant page transition
  pageTransition: {
    initial: { 
      opacity: 0, 
      scale: 1.1,
      filter: "blur(20px)" 
    },
    animate: { 
      opacity: 1, 
      scale: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      filter: "blur(10px)",
      transition: {
        duration: 0.5,
        ease: [0.4, 0, 0.6, 1],
      },
    },
  },

  // Sophisticated image reveal
  imageReveal: {
    hidden: { 
      opacity: 0, 
      scale: 1.1,
      filter: "brightness(0.8) blur(5px)"
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: "brightness(1) blur(0px)",
      transition: {
        duration: 1.2,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  },

  // Elegant scroll reveal
  scrollReveal: {
    hidden: { 
      opacity: 0, 
      y: 100,
      scale: 0.8,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  },

  // Luxury border animation
  luxuryBorder: {
    animate: {
      backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "linear",
      },
    },
  },
};

// Custom easing curves for premium feel
export const premiumEasing = {
  elegant: [0.25, 0.4, 0.25, 1],
  soft: [0.22, 1, 0.36, 1],
  smooth: [0.4, 0, 0.2, 1],
  bounce: [0.68, -0.55, 0.265, 1.55],
};

// Animation durations for consistency
export const animationDurations = {
  fast: 0.3,
  medium: 0.6,
  slow: 1,
  elegant: 1.2,
  luxurious: 1.5,
};

// Viewport animation settings for sophisticated reveals
export const viewportSettings = {
  once: true,
  margin: "-100px",
  amount: 0.3,
};