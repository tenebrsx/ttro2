/**
 * Mobile detection and optimization utilities
 * Provides device detection and mobile-optimized animation settings
 */

// Device detection utilities
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check user agent for mobile patterns
  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const mobileRegex = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i;

  return mobileRegex.test(userAgent);
};

export const isTablet = (): boolean => {
  if (typeof window === 'undefined') return false;

  const userAgent = navigator.userAgent || navigator.vendor || (window as any).opera;
  const tabletRegex = /ipad|android(?!.*mobile)|tablet/i;

  return tabletRegex.test(userAgent);
};

export const isTouchDevice = (): boolean => {
  if (typeof window === 'undefined') return false;

  return 'ontouchstart' in window ||
         navigator.maxTouchPoints > 0 ||
         (navigator as any).msMaxTouchPoints > 0;
};

// Viewport detection
export const getViewportSize = () => {
  if (typeof window === 'undefined') return { width: 0, height: 0 };

  return {
    width: window.innerWidth,
    height: window.innerHeight
  };
};

export const isSmallScreen = (): boolean => {
  const { width } = getViewportSize();
  return width < 768; // Tailwind's md breakpoint
};

export const isMobileViewport = (): boolean => {
  const { width } = getViewportSize();
  return width < 640; // Tailwind's sm breakpoint
};

// Performance detection
export const hasLowPerformance = (): boolean => {
  if (typeof window === 'undefined') return false;

  // Check for low-end device indicators
  const connection = (navigator as any).connection ||
                    (navigator as any).mozConnection ||
                    (navigator as any).webkitConnection;

  // Slow connection indicator
  if (connection && (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g')) {
    return true;
  }

  // Low memory indicator
  if ((navigator as any).deviceMemory && (navigator as any).deviceMemory < 4) {
    return true;
  }

  // Hardware concurrency (CPU cores) indicator
  if (navigator.hardwareConcurrency && navigator.hardwareConcurrency < 4) {
    return true;
  }

  return false;
};

// Reduced motion preference detection
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false;

  const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  return mediaQuery.matches;
};

// Battery status for animation optimization
export const isLowBattery = async (): Promise<boolean> => {
  if (typeof navigator === 'undefined' || !(navigator as any).getBattery) {
    return false;
  }

  try {
    const battery = await (navigator as any).getBattery();
    return battery.level < 0.2 && !battery.charging;
  } catch {
    return false;
  }
};

// Combined mobile detection
export const isMobileDevice = (): boolean => {
  return isMobile() || isTablet() || isTouchDevice() || isSmallScreen();
};

// Animation performance level
export enum PerformanceLevel {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
  DISABLED = 'disabled'
}

export const getAnimationPerformanceLevel = async (): Promise<PerformanceLevel> => {
  // Check for disabled animations first
  if (prefersReducedMotion()) {
    return PerformanceLevel.DISABLED;
  }

  // Check for low performance indicators
  if (hasLowPerformance() || await isLowBattery()) {
    return PerformanceLevel.LOW;
  }

  // Mobile devices get medium performance by default
  if (isMobileDevice()) {
    return PerformanceLevel.MEDIUM;
  }

  // Desktop gets high performance
  return PerformanceLevel.HIGH;
};

// Mobile-optimized animation settings
export const getMobileAnimationSettings = (performanceLevel: PerformanceLevel) => {
  switch (performanceLevel) {
    case PerformanceLevel.DISABLED:
      return {
        duration: 0,
        enabled: false,
        useBlur: false,
        useComplexTransforms: false,
        viewportMargin: '0px',
        viewportAmount: 0
      };

    case PerformanceLevel.LOW:
      return {
        duration: 0.3,
        enabled: true,
        useBlur: false,
        useComplexTransforms: false,
        viewportMargin: '50px',
        viewportAmount: 0.1,
        staggerDelay: 0.05
      };

    case PerformanceLevel.MEDIUM:
      return {
        duration: 0.5,
        enabled: true,
        useBlur: false,
        useComplexTransforms: false,
        viewportMargin: '20px',
        viewportAmount: 0.1,
        staggerDelay: 0.1
      };

    case PerformanceLevel.HIGH:
      return {
        duration: 0.8,
        enabled: true,
        useBlur: true,
        useComplexTransforms: true,
        viewportMargin: '-20px',
        viewportAmount: 0.2,
        staggerDelay: 0.15
      };

    default:
      return getMobileAnimationSettings(PerformanceLevel.MEDIUM);
  }
};

// Debounced resize handler for mobile optimization
export const createResizeHandler = (callback: () => void, delay: number = 250) => {
  let timeoutId: NodeJS.Timeout;

  return () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(callback, delay);
  };
};

// Touch event optimization
export const optimizeTouchEvents = () => {
  if (typeof document === 'undefined') return;

  // Add passive event listeners for better scroll performance
  const passiveOptions = { passive: true };

  document.addEventListener('touchstart', () => {}, passiveOptions);
  document.addEventListener('touchmove', () => {}, passiveOptions);
  document.addEventListener('touchend', () => {}, passiveOptions);
};

// CSS custom properties for mobile optimization
export const setMobileCSSVariables = (performanceLevel: PerformanceLevel) => {
  if (typeof document === 'undefined') return;

  const settings = getMobileAnimationSettings(performanceLevel);
  const root = document.documentElement;

  root.style.setProperty('--animation-duration', `${settings.duration}s`);
  root.style.setProperty('--animation-enabled', settings.enabled ? '1' : '0');
  root.style.setProperty('--viewport-margin', settings.viewportMargin);
  root.style.setProperty('--stagger-delay', `${settings.staggerDelay || 0.1}s`);
};

// Initialize mobile optimizations
export const initializeMobileOptimizations = async () => {
  if (typeof window === 'undefined') return;

  const performanceLevel = await getAnimationPerformanceLevel();

  // Set CSS variables
  setMobileCSSVariables(performanceLevel);

  // Optimize touch events if on touch device
  if (isTouchDevice()) {
    optimizeTouchEvents();
  }

  // Add resize handler for responsive adjustments
  const handleResize = createResizeHandler(() => {
    setMobileCSSVariables(performanceLevel);
  });

  window.addEventListener('resize', handleResize);

  return performanceLevel;
};

// Hook for React components
export const useMobileOptimization = () => {
  if (typeof window === 'undefined') {
    return {
      isMobile: false,
      performanceLevel: PerformanceLevel.HIGH,
      animationSettings: getMobileAnimationSettings(PerformanceLevel.HIGH)
    };
  }

  const mobile = isMobileDevice();
  const performanceLevel = mobile ? PerformanceLevel.MEDIUM : PerformanceLevel.HIGH;
  const animationSettings = getMobileAnimationSettings(performanceLevel);

  return {
    isMobile: mobile,
    performanceLevel,
    animationSettings
  };
};
