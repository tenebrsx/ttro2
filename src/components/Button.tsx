import * as React from "react";
import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import LoadingSpinner from "./LoadingSpinner";
import { DURATIONS, getCSSTransition } from "../config/animationTiming";

// Types
interface ButtonProps {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: "left" | "right";
  loading?: boolean;
  loadingVariant?: "spin" | "pulse" | "dots";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit" | "reset";
  fullWidth?: boolean;
  rounded?: ButtonRounding;
  animateOnHover?: boolean;
  as?: keyof JSX.IntrinsicElements;
  href?: string;
  target?: string;
  rel?: string;
}

type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost"
  | "gradient"
  | "text";
type ButtonSize = "xs" | "sm" | "md" | "lg" | "xl";
type ButtonRounding = "full" | "lg" | "md" | "sm" | "none";

// Constants
const VARIANT_STYLES: Record<ButtonVariant, string> = {
  primary:
    "bg-cocoa-500 hover:bg-cocoa-600 text-white border border-cocoa-400/30 relative overflow-hidden group btn-contrast-high font-medium backdrop-blur-sm hover:backdrop-blur-md rounded-full",
  secondary:
    "bg-white text-cocoa-500 hover:bg-cream-100 border-2 border-cocoa-500 hover:border-cocoa-600 relative overflow-hidden group contrast-high font-medium backdrop-blur-sm hover:backdrop-blur-md rounded-full",
  outline:
    "border-2 border-cocoa-500 text-cocoa-600 hover:bg-cocoa-500 hover:text-white hover:border-cocoa-600 backdrop-blur-md bg-white/90 relative overflow-hidden group font-medium hover:backdrop-blur-lg rounded-full",
  ghost:
    "text-cocoa-600 hover:bg-sage-100 hover:text-cocoa-700 relative overflow-hidden group text-contrast-high font-normal backdrop-blur-sm hover:backdrop-blur-md rounded-full",
  gradient:
    "bg-gradient-to-r from-sage-500 to-cocoa-500 hover:from-sage-600 hover:to-cocoa-600 text-white border border-sage-400/30 relative overflow-hidden group btn-contrast-high font-medium backdrop-blur-sm hover:backdrop-blur-md rounded-full",
  text: "text-cocoa-600 hover:text-cocoa-700 hover:underline hover:underline-offset-4 decoration-cocoa-400/60 relative group text-contrast-high font-normal hover:bg-cocoa-50/30 rounded-full px-2 py-1",
};

const SIZE_STYLES: Record<ButtonSize, string> = {
  xs: "px-4 py-2 text-xs",
  sm: "px-6 py-3 text-sm",
  md: "px-8 py-4 text-base",
  lg: "px-10 py-5 text-lg",
  xl: "px-12 py-6 text-xl",
};

const ICON_SIZES: Record<ButtonSize, string> = {
  xs: "w-3 h-3",
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
  xl: "w-7 h-7",
};

const ROUNDED_STYLES: Record<ButtonRounding, string> = {
  full: "rounded-button",
  lg: "rounded-elegant",
  md: "rounded-card",
  sm: "rounded-premium",
  none: "rounded-none",
};

const SPINNER_SIZE_MAP: Record<ButtonSize, "small" | "medium"> = {
  xs: "small",
  sm: "small",
  md: "small",
  lg: "medium",
  xl: "medium",
};

const SPINNER_COLOR_MAP: Record<ButtonVariant, "cream" | "sage"> = {
  primary: "cream",
  secondary: "cream",
  outline: "sage",
  ghost: "sage",
  gradient: "cream",
  text: "sage",
};

const VARIANTS_WITH_HOVER_EFFECT: ButtonVariant[] = [
  "primary",
  "secondary",
  "gradient",
  "outline",
];

// Base styles
const BASE_STYLES = `inline-flex items-center justify-center font-bodoni font-medium tracking-button-refined ${getCSSTransition("elegant")} focus:outline-none focus:ring-2 focus:ring-cocoa-400/40 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed text-contrast-high transform hover:-translate-y-0.5 active:translate-y-0`;

// Utility functions
const getButtonClasses = ({
  variant,
  size,
  rounded,
  fullWidth,
  animateOnHover,
  className,
}: {
  variant: ButtonVariant;
  size: ButtonSize;
  rounded: ButtonRounding;
  fullWidth: boolean;
  animateOnHover: boolean;
  className: string;
}) => {
  const widthClass = fullWidth ? "w-full" : "";
  const hoverAnimationClass = animateOnHover
    ? ""
    : "transform hover:scale-105 active:scale-95";

  return [
    BASE_STYLES,
    VARIANT_STYLES[variant],
    SIZE_STYLES[size],
    ROUNDED_STYLES[rounded],
    widthClass,
    hoverAnimationClass,
    className,
  ]
    .filter(Boolean)
    .join(" ");
};

const getAnimationVariants = (animateOnHover: boolean) => ({
  hover: {
    scale: animateOnHover ? 1.02 : 1,
    y: animateOnHover ? -2 : 0,
    transition: { duration: DURATIONS.fast, ease: [0.4, 0, 0.2, 1] },
  },
  tap: {
    scale: animateOnHover ? 0.98 : 1,
    y: animateOnHover ? 0 : 0,
    transition: { duration: DURATIONS.instant, ease: [0.4, 0, 0.2, 1] },
  },
});

// Sub-components
const HoverEffect = ({ variant }: { variant: ButtonVariant }) => {
  if (!VARIANTS_WITH_HOVER_EFFECT.includes(variant)) {
    return null;
  }

  return (
    <div
      className={`absolute inset-0 bg-gradient-to-r from-white/5 via-white/20 to-white/5 opacity-0 group-hover:opacity-100 ${getCSSTransition("elegant")} rounded-inherit`}
    />
  );
};

const ButtonIcon = ({
  Icon,
  size,
  position,
  loading,
}: {
  Icon?: LucideIcon;
  size: ButtonSize;
  position: "left" | "right";
  loading: boolean;
}) => {
  if (!Icon || loading) return null;

  const marginClass = position === "left" ? "mr-2" : "ml-2";

  return (
    <Icon className={`${ICON_SIZES[size]} ${marginClass} relative z-10`} />
  );
};

const ButtonSpinner = ({
  loading,
  size,
  variant,
  loadingVariant,
}: {
  loading: boolean;
  size: ButtonSize;
  variant: ButtonVariant;
  loadingVariant: "spin" | "pulse" | "dots";
}) => {
  if (!loading) return null;

  return (
    <LoadingSpinner
      size={SPINNER_SIZE_MAP[size]}
      variant={loadingVariant}
      color={SPINNER_COLOR_MAP[variant]}
      className="mr-2 relative z-10"
    />
  );
};

const ButtonContent = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading: boolean;
}) => (
  <span
    className={`${loading ? "opacity-90" : ""} relative z-10 tracking-button-refined font-medium`}
  >
    {children}
  </span>
);

// Main component
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
  rounded = "full",
  animateOnHover = true,
  as = "button",
  href,
  target,
  rel,
}) => {
  const buttonClasses = getButtonClasses({
    variant,
    size,
    rounded,
    fullWidth,
    animateOnHover,
    className,
  });

  const animationVariants = getAnimationVariants(animateOnHover);

  const commonProps = {
    onClick,
    disabled: disabled || loading,
    className: buttonClasses,
    whileHover: animateOnHover ? "hover" : undefined,
    whileTap: animateOnHover ? "tap" : undefined,
    variants: animationVariants,
  };

  const buttonContent = (
    <>
      <HoverEffect variant={variant} />
      <ButtonSpinner
        loading={loading}
        size={size}
        variant={variant}
        loadingVariant={loadingVariant}
      />
      <ButtonIcon
        Icon={Icon}
        size={size}
        position="left"
        loading={loading || iconPosition !== "left"}
      />
      <ButtonContent loading={loading}>{children}</ButtonContent>
      <ButtonIcon
        Icon={Icon}
        size={size}
        position="right"
        loading={loading || iconPosition !== "right"}
      />
    </>
  );

  if (as === "a") {
    return (
      <motion.a {...commonProps} href={href} target={target} rel={rel}>
        {buttonContent}
      </motion.a>
    );
  }

  return (
    <motion.button {...commonProps} type={type}>
      {buttonContent}
    </motion.button>
  );
};

export default Button;
