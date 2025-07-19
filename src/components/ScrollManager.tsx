import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Enhanced scroll management component that handles:
 * - Scroll to top on route change with smooth behavior
 * - Preserves scroll position for browser back/forward
 * - Optimizes scroll performance
 * - Enhances smooth scrolling experience
 */
const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Enhance scroll behavior for better performance
    const setupSmoothScrolling = () => {
      // Add CSS for enhanced scroll behavior
      if (!document.getElementById("scroll-enhancement-styles")) {
        const style = document.createElement("style");
        style.id = "scroll-enhancement-styles";
        style.textContent = `
          html {
            scroll-behavior: smooth !important;
            scroll-padding-top: 80px;
          }

          body {
            overscroll-behavior-y: contain;
            scroll-behavior: smooth;
          }

          /* Enhanced momentum scrolling for webkit */
          * {
            -webkit-overflow-scrolling: touch;
          }

          /* Smooth scroll for all scroll containers */
          [data-scroll-container] {
            scroll-behavior: smooth;
          }
        `;
        document.head.appendChild(style);
      }
    };

    setupSmoothScrolling();

    // Check if this is a back/forward navigation by looking at the navigation type
    const isBackForward =
      window.performance &&
      window.performance.getEntriesByType &&
      window.performance.getEntriesByType("navigation")[0] &&
      (
        window.performance.getEntriesByType(
          "navigation",
        )[0] as PerformanceNavigationTiming
      ).type === "back_forward";

    if (!isBackForward) {
      // For new navigation (not back/forward), scroll to top smoothly
      // Use a slight delay to ensure the page has rendered
      const scrollToTop = () => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: "smooth",
        });
      };

      // Small delay to ensure smooth transition
      setTimeout(scrollToTop, 50);
    }
    // For back/forward navigation, let the browser handle scroll restoration naturally
  }, [location.pathname]);

  // Add scroll optimization on mount
  useEffect(() => {
    // Optimize scroll performance
    const optimizeScrolling = () => {
      // Reduce scroll jank by optimizing will-change
      document.body.style.willChange = "scroll-position";

      // Enhanced scroll behavior for mobile
      if ("ontouchstart" in window) {
        (document.body.style as any).webkitOverflowScrolling = "touch";
        (document.body.style as any).overflowScrolling = "touch";
      }
    };

    optimizeScrolling();

    // Cleanup on unmount
    return () => {
      document.body.style.willChange = "auto";
    };
  }, []);

  return null;
};

export default ScrollManager;
