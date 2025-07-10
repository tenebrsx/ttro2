import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface ScrollToTopProps {
  smooth?: boolean;
  delay?: number;
}

const ScrollToTop = ({ smooth = false, delay = 0 }: ScrollToTopProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollToTop = () => {
      if (smooth) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
      } else {
        window.scrollTo(0, 0);
      }
    };

    if (delay > 0) {
      // Add a small delay to ensure the page has rendered
      const timeoutId = setTimeout(scrollToTop, delay);
      return () => clearTimeout(timeoutId);
    } else {
      scrollToTop();
    }
  }, [pathname, smooth, delay]);

  return null;
};

export default ScrollToTop;
