import React, { useEffect, useState, useRef, ReactNode } from "react";

interface MobileFallbackProps {
  children: ReactNode;
  timeout?: number;
  className?: string;
  debug?: boolean;
  fallbackMessage?: string;
}

/**
 * Emergency mobile content fallback component
 * Ensures content is visible even if animations fail on mobile
 */
const MobileFallback: React.FC<MobileFallbackProps> = ({
  children,
  timeout = 2000,
  className = "",
  debug = false,
  fallbackMessage,
}) => {
  const [showFallback, setShowFallback] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [debugInfo, setDebugInfo] = useState<string[]>([]);
  const timeoutRef = useRef<NodeJS.Timeout>();
  const mountTimeRef = useRef<number>();

  const log = (message: string) => {
    if (debug) {
      console.log(`🆘 MobileFallback: ${message}`);
      setDebugInfo((prev) => [
        ...prev,
        `${new Date().toLocaleTimeString()}: ${message}`,
      ]);
    }
  };

  useEffect(() => {
    mountTimeRef.current = Date.now();

    // Detect mobile device
    const checkMobile = () => {
      const userAgent =
        navigator.userAgent || navigator.vendor || (window as any).opera;
      const mobile =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent,
        );
      const touch = "ontouchstart" in window;
      const smallScreen = window.innerWidth < 768;

      return mobile || touch || smallScreen;
    };

    const mobile = checkMobile();
    setIsMobile(mobile);

    log(`Mobile detected: ${mobile}`);
    log(`Viewport: ${window.innerWidth}x${window.innerHeight}`);
    log(`User agent: ${navigator.userAgent.substring(0, 50)}...`);

    // Set fallback timeout
    timeoutRef.current = setTimeout(() => {
      const elapsed = Date.now() - (mountTimeRef.current || 0);
      log(`Fallback activated after ${elapsed}ms`);
      setShowFallback(true);
    }, timeout);

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReducedMotion) {
      log("Reduced motion preference detected");
      setShowFallback(true);
    }

    // Check for slow network
    const connection = (navigator as any).connection;
    if (
      connection &&
      (connection.effectiveType === "2g" ||
        connection.effectiveType === "slow-2g")
    ) {
      log("Slow network detected, activating fallback");
      setShowFallback(true);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [timeout, debug]);

  // Force fallback for mobile devices immediately if needed
  useEffect(() => {
    if (isMobile) {
      const mobileTimeout = setTimeout(() => {
        log("Mobile-specific fallback activated");
        setShowFallback(true);
      }, 1000); // Shorter timeout for mobile

      return () => clearTimeout(mobileTimeout);
    }
  }, [isMobile]);

  const fallbackStyles: React.CSSProperties = {
    opacity: 1,
    visibility: "visible",
    transform: "none",
    transition: showFallback ? "opacity 0.3s ease-out" : undefined,
  };

  const containerStyles: React.CSSProperties = showFallback
    ? {
        ...fallbackStyles,
        // Force content visibility
        display: "block",
      }
    : {};

  return (
    <div
      className={`mobile-fallback-container ${className} ${showFallback ? "fallback-active mobile-content-visible" : ""}`}
      style={containerStyles}
      data-mobile={isMobile}
      data-fallback={showFallback}
    >
      {/* Emergency content visibility wrapper */}
      <div
        style={showFallback ? fallbackStyles : {}}
        className={showFallback ? "mobile-emergency-visible" : ""}
      >
        {children}
      </div>

      {/* Fallback message */}
      {showFallback && fallbackMessage && (
        <div className="fallback-message text-xs text-gray-500 mt-2">
          {fallbackMessage}
        </div>
      )}

      {/* Debug panel */}
      {debug && (
        <details className="debug-panel mt-4 p-2 bg-gray-100 rounded text-xs">
          <summary className="cursor-pointer font-bold">
            MobileFallback Debug ({debugInfo.length} events)
          </summary>
          <div className="mt-2 space-y-1">
            <div>Mobile: {isMobile ? "Yes" : "No"}</div>
            <div>Fallback: {showFallback ? "Active" : "Waiting"}</div>
            <div>Timeout: {timeout}ms</div>
            <div className="max-h-32 overflow-y-auto">
              {debugInfo.map((info, index) => (
                <div key={index} className="text-gray-600">
                  {info}
                </div>
              ))}
            </div>
          </div>
        </details>
      )}

      {/* Emergency CSS styles */}
      {showFallback && (
        <style>{`
          .mobile-emergency-visible,
          .mobile-emergency-visible * {
            opacity: 1 !important;
            visibility: visible !important;
            transform: none !important;
          }

          .fallback-active [data-framer-motion] {
            opacity: 1 !important;
            transform: none !important;
          }

          @media (max-width: 768px) {
            .mobile-fallback-container.fallback-active {
              animation: emergency-fadein 0.5s ease-out;
            }

            @keyframes emergency-fadein {
              from { opacity: 0; }
              to { opacity: 1; }
            }
          }
        `}</style>
      )}
    </div>
  );
};

export default MobileFallback;
