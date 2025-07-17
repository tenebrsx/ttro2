import React from "react";
import { motion } from "framer-motion";

// Types
interface LoadingSpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  color?: SpinnerColor;
  className?: string;
}

type SpinnerSize = "small" | "medium" | "large";
type SpinnerVariant = "spin" | "pulse" | "dots";
type SpinnerColor = "sage" | "cocoa" | "coffee" | "cream";

// Constants
const SIZE_CLASSES: Record<SpinnerSize, string> = {
  small: "w-4 h-4",
  medium: "w-8 h-8",
  large: "w-12 h-12",
};

const DOT_SIZES: Record<SpinnerSize, string> = {
  small: "w-1.5 h-1.5",
  medium: "w-2.5 h-2.5",
  large: "w-3 h-3",
};

const DOT_SPACING: Record<SpinnerSize, string> = {
  small: "space-x-1",
  medium: "space-x-2",
  large: "space-x-3",
};

const COLOR_CLASSES: Record<
  SpinnerColor,
  { bg: string; border: string; borderLight: string }
> = {
  sage: {
    bg: "bg-sage",
    border: "border-t-sage",
    borderLight: "border-sage/30",
  },
  cocoa: {
    bg: "bg-cocoa",
    border: "border-t-cocoa",
    borderLight: "border-cocoa/30",
  },
  coffee: {
    bg: "bg-coffee",
    border: "border-t-coffee",
    borderLight: "border-coffee/30",
  },
  cream: {
    bg: "bg-cream",
    border: "border-t-cream",
    borderLight: "border-cream/30",
  },
};

// Animation configurations
const ANIMATION_CONFIG = {
  dots: {
    initial: { opacity: 0.3 },
    animate: { opacity: 1 },
    transition: {
      duration: 0.8,
      repeat: Infinity,
      repeatType: "reverse" as const,
    },
  },
  pulse: {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.6, 0.8, 0.6],
    },
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut" as const,
    },
  },
} as const;

// Sub-components
const DotsSpinner = ({
  size,
  color,
  className,
}: {
  size: SpinnerSize;
  color: SpinnerColor;
  className: string;
}) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div className={`flex ${DOT_SPACING[size]}`}>
      {Array.from({ length: 3 }, (_, index) => (
        <motion.div
          key={index}
          className={`${DOT_SIZES[size]} rounded-full ${COLOR_CLASSES[color].bg}`}
          initial={ANIMATION_CONFIG.dots.initial}
          animate={ANIMATION_CONFIG.dots.animate}
          transition={{
            ...ANIMATION_CONFIG.dots.transition,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  </div>
);

const PulseSpinner = ({
  size,
  color,
  className,
}: {
  size: SpinnerSize;
  color: SpinnerColor;
  className: string;
}) => (
  <div className={`flex items-center justify-center ${className}`}>
    <motion.div
      className={`${SIZE_CLASSES[size]} rounded-full ${COLOR_CLASSES[color].bg}/80`}
      animate={ANIMATION_CONFIG.pulse.animate}
      transition={ANIMATION_CONFIG.pulse.transition}
    />
  </div>
);

const SpinSpinner = ({
  size,
  color,
  className,
}: {
  size: SpinnerSize;
  color: SpinnerColor;
  className: string;
}) => (
  <div className={`flex items-center justify-center ${className}`}>
    <div
      className={`
        ${SIZE_CLASSES[size]}
        animate-spin
        rounded-full
        border-2
        ${COLOR_CLASSES[color].borderLight}
        ${COLOR_CLASSES[color].border}
      `}
    />
  </div>
);

// Main component
const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "medium",
  variant = "spin",
  color = "sage",
  className = "",
}) => {
  const commonProps = { size, color, className };

  switch (variant) {
    case "dots":
      return <DotsSpinner {...commonProps} />;
    case "pulse":
      return <PulseSpinner {...commonProps} />;
    case "spin":
    default:
      return <SpinSpinner {...commonProps} />;
  }
};

export default LoadingSpinner;
