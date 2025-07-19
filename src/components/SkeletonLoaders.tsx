import React from "react";
import { motion } from "framer-motion";

// Base skeleton animation
const skeletonAnimation = {
  animate: {
    opacity: [0.6, 1, 0.6],
  },
  transition: {
    duration: 0.4,
    repeat: Infinity,
    ease: "easeInOut",
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

// Shimmer effect for enhanced loading
const shimmerVariants = {
  animate: {
    x: ["-100%", "100%"],
  },
  transition: {
    duration: 0.8,
    repeat: Infinity,
    ease: "easeInOut",
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
} as any;

// Basic skeleton line component
const SkeletonLine: React.FC<{
  width?: string;
  height?: string;
  className?: string;
  rounded?: boolean;
}> = ({ width = "w-full", height = "h-4", className = "", rounded = true }) => (
  <motion.div
    className={`bg-gradient-to-r from-warm-grey/20 via-warm-grey/40 to-warm-grey/20 ${width} ${height} ${rounded ? "rounded-md" : ""} ${className} relative overflow-hidden`}
    {...skeletonAnimation}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
      variants={shimmerVariants}
      animate="animate"
    />
  </motion.div>
);

// Skeleton circle for avatars/icons
const SkeletonCircle: React.FC<{ size?: string; className?: string }> = ({
  size = "w-12 h-12",
  className = "",
}) => (
  <motion.div
    className={`bg-gradient-to-r from-warm-grey/20 via-warm-grey/40 to-warm-grey/20 ${size} rounded-full ${className} relative overflow-hidden`}
    {...skeletonAnimation}
  >
    <motion.div
      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full"
      variants={shimmerVariants}
      animate="animate"
    />
  </motion.div>
);

// Dessert card skeleton
export const DessertCardSkeleton: React.FC = () => (
  <div className="bg-white/60 backdrop-blur-sm rounded-3xl overflow-hidden shadow-gentle border border-dusty-rose/10 animate-pulse">
    {/* Image skeleton */}
    <div className="relative h-[28rem] bg-gradient-to-r from-warm-grey/20 via-warm-grey/40 to-warm-grey/20 overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        variants={shimmerVariants}
        animate="animate"
      />
    </div>

    {/* Content skeleton */}
    <div className="p-6 space-y-4">
      {/* Tags */}
      <div className="flex space-x-2">
        <SkeletonLine width="w-16" height="h-5" />
        <SkeletonLine width="w-20" height="h-5" />
      </div>

      {/* Title */}
      <SkeletonLine width="w-3/4" height="h-6" />

      {/* Rating and time */}
      <div className="flex items-center justify-between">
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <SkeletonCircle key={i} size="w-3 h-3" />
          ))}
        </div>
        <SkeletonLine width="w-16" height="h-4" />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <SkeletonLine width="w-full" height="h-4" />
        <SkeletonLine width="w-5/6" height="h-4" />
        <SkeletonLine width="w-4/6" height="h-4" />
      </div>

      {/* Price and action */}
      <div className="flex items-center justify-between pt-2">
        <SkeletonLine width="w-20" height="h-6" />
        <SkeletonLine width="w-24" height="h-4" />
      </div>
    </div>
  </div>
);

// Hero section skeleton
export const HeroSkeleton: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-dusty-rose/30 via-warm-blush/20 to-soft-rose/30">
    <div className="text-center max-w-4xl mx-auto px-4 space-y-8">
      {/* Logo skeleton */}
      <SkeletonCircle size="w-16 h-16" className="mx-auto" />

      {/* Title skeleton */}
      <div className="space-y-4">
        <SkeletonLine width="w-96" height="h-12" className="mx-auto" />
        <SkeletonLine width="w-80" height="h-10" className="mx-auto" />
        <SkeletonLine width="w-72" height="h-10" className="mx-auto" />
      </div>

      {/* Divider */}
      <SkeletonLine width="w-24" height="h-px" className="mx-auto" />

      {/* Description */}
      <div className="space-y-2 max-w-2xl mx-auto">
        <SkeletonLine width="w-full" height="h-6" />
        <SkeletonLine width="w-5/6" height="h-6" className="mx-auto" />
        <SkeletonLine width="w-4/6" height="h-6" className="mx-auto" />
      </div>

      {/* Buttons */}
      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <SkeletonLine
          width="w-48"
          height="h-14"
          rounded={false}
          className="rounded-full"
        />
        <SkeletonLine
          width="w-56"
          height="h-14"
          rounded={false}
          className="rounded-full"
        />
      </div>
    </div>
  </div>
);

// Navigation skeleton
export const NavigationSkeleton: React.FC = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 bg-cream/95 backdrop-blur-sm shadow-gentle">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-center h-16">
        {/* Logo */}
        <SkeletonCircle size="w-8 h-8" />

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {[...Array(5)].map((_, i) => (
            <SkeletonLine key={i} width="w-16" height="h-5" />
          ))}
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden">
          <SkeletonCircle size="w-6 h-6" />
        </div>
      </div>
    </div>
  </nav>
);

// Gallery skeleton
export const GallerySkeleton: React.FC = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(9)].map((_, i) => (
      <div key={i} className="relative group">
        <div className="aspect-square bg-gradient-to-r from-warm-grey/20 via-warm-grey/40 to-warm-grey/20 rounded-lg overflow-hidden relative">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
            variants={shimmerVariants}
            animate="animate"
          />
        </div>
      </div>
    ))}
  </div>
);

// Testimonial skeleton
export const TestimonialSkeleton: React.FC = () => (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-gentle border border-sage/10">
    <div className="space-y-4">
      {/* Quote icon and stars */}
      <div className="flex items-center justify-between">
        <SkeletonCircle size="w-8 h-8" />
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <SkeletonCircle key={i} size="w-4 h-4" />
          ))}
        </div>
      </div>

      {/* Testimonial text */}
      <div className="space-y-2">
        <SkeletonLine width="w-full" height="h-4" />
        <SkeletonLine width="w-5/6" height="h-4" />
        <SkeletonLine width="w-4/6" height="h-4" />
      </div>

      {/* Author info */}
      <div className="flex items-center space-x-3 pt-4">
        <SkeletonCircle size="w-12 h-12" />
        <div className="space-y-2">
          <SkeletonLine width="w-24" height="h-5" />
          <SkeletonLine width="w-32" height="h-4" />
        </div>
      </div>
    </div>
  </div>
);

// FAQ skeleton
export const FAQSkeleton: React.FC = () => (
  <div className="space-y-4">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className="bg-white/60 backdrop-blur-sm rounded-2xl border border-sage/10 overflow-hidden"
      >
        <div className="px-6 py-4 flex items-center justify-between">
          <SkeletonLine width="w-3/4" height="h-6" />
          <SkeletonCircle size="w-5 h-5" />
        </div>
      </div>
    ))}
  </div>
);

// Contact form skeleton
export const ContactFormSkeleton: React.FC = () => (
  <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-gentle">
    <div className="space-y-6">
      {/* Form fields */}
      {[...Array(6)].map((_, i) => (
        <div key={i} className="space-y-2">
          <SkeletonLine width="w-24" height="h-5" />
          <SkeletonLine width="w-full" height="h-12" />
        </div>
      ))}

      {/* Submit button */}
      <SkeletonLine
        width="w-full"
        height="h-12"
        rounded={false}
        className="rounded-lg"
      />
    </div>
  </div>
);

// Page transition skeleton
export const PageSkeleton: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.3 }}
    className="min-h-screen"
  >
    {children}
  </motion.div>
);

// Loading overlay
export const LoadingOverlay: React.FC<{ message?: string }> = ({
  message = "Preparando algo especial...",
}) => (
  <motion.div
    className="fixed inset-0 bg-cream/90 backdrop-blur-sm flex items-center justify-center z-50"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="text-center space-y-6">
      {/* Animated logo/icon */}
      <motion.div
        className="w-16 h-16 mx-auto"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-full h-full bg-gradient-to-r from-dusty-rose to-warm-blush rounded-full flex items-center justify-center">
          <motion.div
            className="w-8 h-8 bg-cream rounded-full"
            animate={{
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </motion.div>

      {/* Loading message */}
      <motion.p
        className="text-mocha font-source-serif text-lg"
        animate={{
          opacity: [0.5, 1, 0.5],
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {message}
      </motion.p>

      {/* Loading dots */}
      <div className="flex space-x-2 justify-center">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2 h-2 bg-dusty-rose rounded-full"
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  </motion.div>
);

// Instagram post skeleton
export const InstagramPostSkeleton: React.FC = () => (
  <div className="bg-white rounded-lg overflow-hidden shadow-gentle">
    {/* Image */}
    <div className="aspect-square bg-gradient-to-r from-warm-grey/20 via-warm-grey/40 to-warm-grey/20 relative overflow-hidden">
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
        variants={shimmerVariants}
        animate="animate"
      />
    </div>

    {/* Content */}
    <div className="p-4 space-y-3">
      <div className="flex items-center justify-between">
        <SkeletonLine width="w-32" height="h-4" />
        <div className="flex space-x-2">
          <SkeletonCircle size="w-4 h-4" />
          <SkeletonCircle size="w-4 h-4" />
        </div>
      </div>

      <div className="space-y-2">
        <SkeletonLine width="w-full" height="h-4" />
        <SkeletonLine width="w-3/4" height="h-4" />
      </div>
    </div>
  </div>
);

export default {
  DessertCardSkeleton,
  HeroSkeleton,
  NavigationSkeleton,
  GallerySkeleton,
  TestimonialSkeleton,
  FAQSkeleton,
  ContactFormSkeleton,
  PageSkeleton,
  LoadingOverlay,
  InstagramPostSkeleton,
  SkeletonLine,
  SkeletonCircle,
};
