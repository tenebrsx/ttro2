import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface AnimationProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
}

// Fade in animation
export const FadeIn = ({ children, className = '', delay = 0, direction = 'up' }: AnimationProps) => {
  const getInitialProps = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: 30 };
      case 'down':
        return { opacity: 0, y: -30 };
      case 'left':
        return { opacity: 0, x: -30 };
      case 'right':
        return { opacity: 0, x: 30 };
      default:
        return { opacity: 0 };
    }
  };

  const getAnimateProps = () => {
    switch (direction) {
      case 'up':
      case 'down':
        return { opacity: 1, y: 0 };
      case 'left':
      case 'right':
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

// Fade in from bottom
export const FadeInUp = ({ children, className = '', delay = 0 }: AnimationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Scale on hover
export const ScaleOnHover = ({ children, className = '' }: AnimationProps) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Gentle tilt on hover
export const TiltOnHover = ({ children, className = '' }: AnimationProps) => {
  return (
    <motion.div
      whileHover={{ rotate: 1, scale: 1.02 }}
      whileTap={{ rotate: 0, scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Stagger children animations
export const StaggerChildren = ({ children, className = '' }: AnimationProps) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Individual child for stagger
export const StaggerChild = ({ children, className = '' }: AnimationProps) => {
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
export const TypeWriter = ({ children, className = '' }: AnimationProps) => {
  return (
    <motion.div
      initial={{ width: 0 }}
      animate={{ width: '100%' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`overflow-hidden whitespace-nowrap ${className}`}
    >
      {children}
    </motion.div>
  );
};

// Floating animation
export const FloatingElement = ({ children, className = '' }: AnimationProps) => {
  return (
    <motion.div
      animate={{
        y: [0, -10, 0],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// Parallax effect
export const ParallaxElement = ({ children, className = '', speed = 0.5 }: AnimationProps & { speed?: number }) => {
  return (
    <motion.div
      initial={{ y: 0 }}
      animate={{ y: -20 * speed }}
      transition={{ duration: 1, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
