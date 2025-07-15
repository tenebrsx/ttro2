import { Variants } from "framer-motion";

// Sophisticated animation variants for a luxury pastry brand
export const elegantAnimations = {
  // Elegant reveal - smooth, luxurious entrance
  elegantReveal: {
    hidden: {
      opacity: 0,
      y: 30, // Reduced for mobile performance
      scale: 0.98, // Less dramatic scale for mobile
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8, // Faster for mobile
        ease: [0.25, 0.4, 0.25, 1],
        staggerChildren: 0.1, // Faster stagger for mobile
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
      y: 20, // Reduced movement for mobile
      scale: 0.95, // Less dramatic scale
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6, // Faster for mobile
        ease: [0.22, 1, 0.36, 1],
      },
    },
    hover: {
      y: -4, // Less movement on mobile
      scale: 1.01, // Subtle scale for mobile
      transition: {
        duration: 0.3, // Faster response
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
  },

  // Sophisticated text reveal
  textReveal: {
    hidden: {
      opacity: 0,
      y: 20, // Simplified for mobile performance
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6, // Faster for mobile
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
      scale: 1.05, // Removed blur for mobile performance
    },
    animate: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5, // Faster for mobile
        ease: [0.25, 0.4, 0.25, 1],
      },
    },
    exit: {
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.3, // Faster exit for mobile
        ease: [0.4, 0, 0.6, 1],
      },
    },
  },

  // Sophisticated image reveal
  imageReveal: {
    hidden: {
      opacity: 0,
      scale: 1.05, // Reduced scale, removed blur for mobile performance
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8, // Faster for mobile
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

// Viewport animation settings for sophisticated reveals - mobile optimized
export const viewportSettings = {
  once: true,
  margin: "-20px", // Mobile-friendly margin
  amount: 0.1, // Lower threshold for mobile
};

// Mobile-specific viewport settings
export const mobileViewportSettings = {
  once: true,
  margin: "0px",
  amount: 0.05,
};
