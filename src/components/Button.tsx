import React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "gradient" | "text";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  loadingVariant?: "spin" | "pulse" | "dots";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  rounded?: "organic" | "soft" | "gentle" | "full" | "none";
  animateOnHover?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "left",
  loading = false,
  loadingVariant = "spin",
  disabled = false,
  onClick,
  className = "",
  type = "button",
  fullWidth = false,
  rounded = "organic",
  animateOnHover = true,
}) => {
  // Base classes with enhanced typography and spacing
  const baseClasses = `
    inline-flex items-center justify-center
    font-playfair font-medium
    tracking-wide
    transition-all duration-500 ease-out
    focus:outline-none focus:ring-2 focus:ring-dusty-rose-400/20 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden
    transform-gpu
    will-change-transform
    select-none
  `;

  // Width classes
  const widthClasses = fullWidth ? "w-full" : "";

  // Organic rounded corner classes with more natural curves
  const roundedClasses = {
    organic: "rounded-[2rem] before:rounded-[2rem] after:rounded-[2rem]",
    soft: "rounded-[1.5rem] before:rounded-[1.5rem] after:rounded-[1.5rem]",
    gentle: "rounded-[1rem] before:rounded-[1rem] after:rounded-[1rem]",
    full: "rounded-full before:rounded-full after:rounded-full",
    none: "rounded-none before:rounded-none after:rounded-none",
  };

  // Enhanced variant styling with organic gradients and artisanal feel
  const variantClasses = {
    primary: `
      bg-gradient-to-br from-dusty-rose-400 via-dusty-rose-500 to-dusty-rose-600
      hover:from-dusty-rose-500 hover:via-dusty-rose-600 hover:to-dusty-rose-700
      text-white font-semibold
      shadow-[0_8px_32px_rgba(198,156,156,0.3)]
      hover:shadow-[0_12px_48px_rgba(198,156,156,0.4)]
      border border-dusty-rose-300/30
      before:absolute before:inset-0
      before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent
      before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
      after:absolute after:inset-[1px]
      after:bg-gradient-to-br after:from-transparent after:via-white/5 after:to-transparent
      backdrop-blur-sm
    `,
    secondary: `
      bg-gradient-to-br from-cream-50 via-warm-ivory to-cream-100
      hover:from-dusty-rose-50 hover:via-warm-blush-50 hover:to-dusty-rose-100
      text-dusty-rose-700 hover:text-dusty-rose-800
      font-medium
      shadow-[0_6px_24px_rgba(198,156,156,0.15)]
      hover:shadow-[0_10px_36px_rgba(198,156,156,0.25)]
      border border-dusty-rose-200/40 hover:border-dusty-rose-300/60
      before:absolute before:inset-0
      before:bg-gradient-to-br before:from-dusty-rose-100/30 before:via-transparent before:to-transparent
      before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
      backdrop-blur-sm
    `,
    outline: `
      bg-gradient-to-br from-white/80 via-white/90 to-white/95
      hover:from-dusty-rose-50/80 hover:via-dusty-rose-50/90 hover:to-dusty-rose-100/95
      text-dusty-rose-600 hover:text-dusty-rose-700
      font-medium
      shadow-[0_4px_16px_rgba(198,156,156,0.1)]
      hover:shadow-[0_8px_32px_rgba(198,156,156,0.2)]
      border-2 border-dusty-rose-300/50 hover:border-dusty-rose-400/70
      before:absolute before:inset-0
      before:bg-gradient-to-br before:from-dusty-rose-100/20 before:via-transparent before:to-transparent
      before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
      backdrop-blur-md
    `,
    ghost: `
      bg-transparent hover:bg-gradient-to-br hover:from-dusty-rose-50/50 hover:to-dusty-rose-100/50
      text-dusty-rose-600 hover:text-dusty-rose-700
      font-medium
      shadow-none hover:shadow-[0_4px_16px_rgba(198,156,156,0.1)]
      border border-transparent hover:border-dusty-rose-200/30
      before:absolute before:inset-0
      before:bg-gradient-to-br before:from-dusty-rose-100/30 before:via-transparent before:to-transparent
      before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
      backdrop-blur-sm
    `,
    gradient: `
      bg-gradient-to-br from-dusty-rose-400 via-mocha-400 to-dusty-rose-600
      hover:from-dusty-rose-500 hover:via-mocha-500 hover:to-dusty-rose-700
      text-white font-semibold
      shadow-[0_8px_32px_rgba(198,156,156,0.3)]
      hover:shadow-[0_12px_48px_rgba(198,156,156,0.4)]
      border border-dusty-rose-300/30
      before:absolute before:inset-0
      before:bg-gradient-to-br before:from-white/20 before:via-transparent before:to-transparent
      before:opacity-0 hover:before:opacity-100
      before:transition-opacity before:duration-300
      after:absolute after:inset-[1px]
      after:bg-gradient-to-br after:from-transparent after:via-white/5 after:to-transparent
      backdrop-blur-sm
    `,
    text: `
      bg-transparent hover:bg-dusty-rose-50/30
      text-dusty-rose-600 hover:text-dusty-rose-700
      font-medium
      shadow-none
      border border-transparent
      relative
      after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
      after:w-0 hover:after:w-full
      after:h-0.5 after:bg-gradient-to-r after:from-dusty-rose-400 after:to-dusty-rose-600
      after:transition-all after:duration-300
      after:rounded-full
    `,
  };

  // Enhanced size classes with better proportions
  const sizeClasses = {
    xs: "px-4 py-2 text-sm min-h-[2rem] gap-2",
    sm: "px-6 py-3 text-sm min-h-[2.5rem] gap-2",
    md: "px-8 py-4 text-base min-h-[3rem] gap-3",
    lg: "px-10 py-5 text-lg min-h-[3.5rem] gap-3",
    xl: "px-12 py-6 text-xl min-h-[4rem] gap-4",
  };

  // Icon size based on button size
  const iconSizeClasses = {
    xs: "w-4 h-4",
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
    xl: "w-7 h-7",
  };

  // Map button size to loading spinner size
  const spinnerSizeMap = {
    xs: "small",
    sm: "small",
    md: "small",
    lg: "medium",
    xl: "medium",
  } as const;

  // Map button variant to loading spinner color
  const spinnerColorMap = {
    primary: "cream",
    secondary: "dusty-rose",
    outline: "dusty-rose",
    ghost: "dusty-rose",
    gradient: "cream",
    text: "dusty-rose",
  } as const;

  // Enhanced button animation variants
  const buttonVariants = {
    initial: {
      scale: 1,
      y: 0,
      rotateX: 0,
    },
    hover: {
      scale: animateOnHover ? 1.02 : 1,
      y: animateOnHover ? -2 : 0,
      rotateX: animateOnHover ? 5 : 0,
      transition: {
        duration: 0.3,
        ease: [0.23, 1, 0.32, 1],
      },
    },
    tap: {
      scale: animateOnHover ? 0.98 : 1,
      y: animateOnHover ? 0 : 0,
      rotateX: animateOnHover ? 0 : 0,
      transition: {
        duration: 0.15,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  // Ripple effect animation
  const rippleVariants = {
    initial: {
      scale: 0,
      opacity: 0.5,
    },
    animate: {
      scale: 4,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        ${baseClasses}
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${roundedClasses[rounded]}
        ${widthClasses}
        ${className}
      `}
      variants={buttonVariants}
      initial="initial"
      whileHover={animateOnHover ? "hover" : undefined}
      whileTap={animateOnHover ? "tap" : undefined}
      style={{
        transformStyle: "preserve-3d",
        perspective: 1000,
      }}
    >
      {/* Subtle shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12"
        initial={{ x: "-100%" }}
        animate={{ x: "100%" }}
        transition={{
          repeat: Infinity,
          duration: 3,
          ease: "linear",
          repeatDelay: 2,
        }}
      />

      {/* Content container */}
      <div className="relative z-10 flex items-center justify-center">
        {loading ? (
          <LoadingSpinner
            size={spinnerSizeMap[size]}
            variant={loadingVariant}
            color={spinnerColorMap[variant]}
            className={iconPosition === "left" ? "mr-2" : "ml-2"}
          />
        ) : (
          Icon &&
          iconPosition === "left" && (
            <Icon
              className={`${iconSizeClasses[size]} transition-transform duration-300 group-hover:scale-110`}
            />
          )
        )}

        <span
          className={`${loading ? "opacity-80" : ""} transition-opacity duration-300`}
        >
          {children}
        </span>

        {!loading && Icon && iconPosition === "right" && (
          <Icon
            className={`${iconSizeClasses[size]} transition-transform duration-300 group-hover:scale-110`}
          />
        )}
      </div>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 bg-white/20 pointer-events-none"
        variants={rippleVariants}
        initial="initial"
        animate="initial"
        whileTap="animate"
      />
    </motion.button>
  );
};

export default Button;
