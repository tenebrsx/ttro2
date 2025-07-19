/**
 * Standardized Animation Timing Configuration
 *
 * This file provides consistent animation timing values across the entire homepage.
 * All delays and durations are based on a systematic approach for smooth, professional animations.
 */

// Base timing units (in seconds)
const BASE_UNIT = 0.2;

/**
 * Standard durations for different types of animations
 */
export const DURATIONS = {
  // Quick interactions and micro-animations
  instant: 0.375,
  fast: 0.66,

  // Standard content animations
  normal: 0.94,
  medium: 1.22,

  // Slower, more dramatic animations
  slow: 1.5,
  elegant: 1.88,
  dramatic: 2.35,

  // Background and ambient animations
  ambient: 2.82,
} as const;

/**
 * Sequential delays for homepage sections
 * Each section gets a base delay, then elements within the section use incremental delays
 */
export const SECTION_DELAYS = {
  hero: {
    base: 0, // First section - no delay
    logo: 0.4,
    subtitle: 0.8,
    anchor: 1.2,
    buttons: 1.6,
  },

  featuredDesserts: {
    base: 0, // Progressive delay - breathing room after hero
    divider: 0.1,
    title: 0.2,
    subtitle: 0.3,
    underline: 0.5, // After subtitle finishes animating
    content: 0.4,
    cards: 0.4,
    cta: 0.6,
  },

  emotionalStory: {
    base: 0, // More breathing room
    title: 0.1,
    subtitle: 0.2,
    underline: 0.4, // After subtitle finishes animating
    content: 0.3,
    values: 0.5,
    buttons: 0.7,
  },

  aboutPreview: {
    base: 0, // Even more breathing room
    divider: 0.1,
    image: 0.2,
    title: 0.3,
    subtitle: 0.4,
    underline: 0.6, // After subtitle finishes animating
    content: 0.5,
    quote: 0.7,
    cta: 0.9,
  },

  testimonials: {
    base: 0, // First - starts immediately when in view
    divider: 0.1,
    title: 0.2,
    subtitle: 0.3,
    underline: 0.5, // After subtitle finishes animating
    cards: 0.4,
  },

  faq: {
    base: 0.8, // Waits for testimonials to settle
    divider: 0.9,
    title: 1.0,
    subtitle: 1.1,
    underline: 1.3, // After subtitle finishes animating
    search: 1.2,
    items: 1.3,
    cta: 1.5,
  },

  contact: {
    base: 1.6, // Waits for FAQ to settle
    divider: 1.7,
    title: 1.8,
    content: 1.9,
    underline: 2.1, // After subtitle finishes animating
    form: 2.0,
    info: 2.1,
  },
} as const;

/**
 * Stagger delays for multiple items (like cards, list items, etc.)
 */
export const STAGGER_DELAYS = {
  fast: 0.05, // Quick succession
  normal: 0.1, // Standard stagger
  slow: 0.15, // Deliberate stagger
  dramatic: 0.2, // Very noticeable stagger
} as const;

/**
 * Special animation delays for background and ambient elements
 */
export const AMBIENT_DELAYS = {
  particles: 0,
  backgroundShapes: 0.5,
  floatingElements: 1.0,
} as const;

/**
 * Distance values for fade/slide animations
 */
export const DISTANCES = {
  subtle: 10,
  normal: 20,
  medium: 30,
  dramatic: 50,
} as const;

/**
 * Helper functions to calculate timing
 */
export const timing = {
  /**
   * Get delay for a specific section and element
   */
  getDelay: (section: keyof typeof SECTION_DELAYS, element: string): number => {
    const sectionDelays = SECTION_DELAYS[section] as Record<string, number>;
    return sectionDelays[element] ?? 0;
  },

  /**
   * Calculate staggered delay for child elements
   */
  getStaggerDelay: (
    baseDelay: number,
    index: number,
    staggerAmount: number = STAGGER_DELAYS.normal,
  ): number => {
    return baseDelay + index * staggerAmount;
  },

  /**
   * Get sequential timing for multiple elements in the same section
   */
  getSequentialDelay: (
    baseDelay: number,
    step: number,
    increment: number = BASE_UNIT,
  ): number => {
    return baseDelay + step * increment;
  },
};

/**
 * Pre-defined animation configurations for common patterns
 */
export const ANIMATION_PRESETS = {
  // Section dividers and decorative elements
  divider: {
    delay: 0.1,
    duration: DURATIONS.medium,
  },

  // Main headings
  mainTitle: {
    delay: 0.2,
    duration: DURATIONS.elegant,
    staggerDelay: STAGGER_DELAYS.normal,
  },

  // Subtitles and secondary text
  subtitle: {
    delay: 0.3,
    duration: DURATIONS.normal,
    staggerDelay: STAGGER_DELAYS.fast,
  },

  // Body content and paragraphs
  content: {
    delay: 0.4,
    duration: DURATIONS.medium,
  },

  // Cards and grid items
  card: {
    delay: 0.4,
    duration: DURATIONS.normal,
    staggerDelay: STAGGER_DELAYS.normal,
  },

  // Call-to-action buttons
  cta: {
    delay: 0.6,
    duration: DURATIONS.elegant,
  },

  // Background decorative elements
  ambient: {
    delay: 0,
    duration: DURATIONS.ambient,
  },
} as const;

/**
 * CSS Transition Duration Classes
 * Maps standardized durations to Tailwind CSS classes
 */
export const CSS_DURATIONS = {
  instant: "duration-[375ms]", // 0.375s
  fast: "duration-[660ms]", // 0.66s
  normal: "duration-[940ms]", // 0.94s
  medium: "duration-[1220ms]", // 1.22s
  slow: "duration-[1500ms]", // 1.5s
  elegant: "duration-[1880ms]", // 1.88s
  dramatic: "duration-[2350ms]", // 2.35s
  ambient: "duration-[2820ms]", // 2.82s
} as const;

/**
 * Helper function to get CSS duration class
 */
export const getCSSTransition = (
  speed: keyof typeof CSS_DURATIONS = "medium",
): string => {
  return `transition-all ${CSS_DURATIONS[speed]} ease-out`;
};

/**
 * Transform duration classes for hover effects
 */
export const TRANSFORM_DURATIONS = {
  instant: "duration-[375ms]",
  fast: "duration-[660ms]",
  normal: "duration-[940ms]",
  medium: "duration-[1220ms]",
  slow: "duration-[1500ms]",
} as const;

/**
 * Helper for transform transitions
 */
export const getTransformTransition = (
  speed: keyof typeof TRANSFORM_DURATIONS = "medium",
): string => {
  return `transition-transform ${TRANSFORM_DURATIONS[speed]} ease-out`;
};

export default {
  DURATIONS,
  SECTION_DELAYS,
  STAGGER_DELAYS,
  AMBIENT_DELAYS,
  DISTANCES,
  timing,
  ANIMATION_PRESETS,
  CSS_DURATIONS,
  getCSSTransition,
  TRANSFORM_DURATIONS,
  getTransformTransition,
};
