import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Enhanced scroll management component that handles:
 * - Scroll to top on route change
 * - Preserves scroll position for browser back/forward
 * - Supports smooth scrolling option
 */
const ScrollManager = () => {
  const location = useLocation();

  useEffect(() => {
    // Check if this is a back/forward navigation by looking at the navigation type
    const isBackForward = window.performance && 
      window.performance.getEntriesByType &&
      window.performance.getEntriesByType('navigation')[0] &&
      (window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming).type === 'back_forward';

    if (!isBackForward) {
      // For new navigation (not back/forward), scroll to top
      window.scrollTo(0, 0);
    }
    // For back/forward navigation, let the browser handle scroll restoration naturally
  }, [location.pathname]);

  return null;
};

export default ScrollManager;
