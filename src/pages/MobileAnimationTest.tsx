import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Smartphone,
  Monitor,
  Zap,
  Settings,
  Eye,
  AlertTriangle,
} from "lucide-react";
import {
  ElegantReveal,
  StaggerContainer,
  PremiumCard,
  TextReveal,
  ScrollReveal,
} from "../components/animations/ElegantAnimations";
import {
  FadeReveal,
  StaggerReveal,
  StaggerChild,
} from "../components/animations/SophisticatedAnimations";
import {
  isMobileDevice,
  isTablet,
  isTouchDevice,
  getViewportSize,
  prefersReducedMotion,
  getAnimationPerformanceLevel,
  PerformanceLevel,
} from "../utils/mobileDetection";

const MobileAnimationTest: React.FC = () => {
  const [deviceInfo, setDeviceInfo] = useState({
    isMobile: false,
    isTablet: false,
    isTouch: false,
    viewport: { width: 0, height: 0 },
    reducedMotion: false,
    performanceLevel: PerformanceLevel.HIGH,
  });

  const [animationCount, setAnimationCount] = useState(0);

  useEffect(() => {
    const initializeDeviceInfo = async () => {
      const performanceLevel = await getAnimationPerformanceLevel();

      setDeviceInfo({
        isMobile: isMobileDevice(),
        isTablet: isTablet(),
        isTouch: isTouchDevice(),
        viewport: getViewportSize(),
        reducedMotion: prefersReducedMotion(),
        performanceLevel,
      });
    };

    initializeDeviceInfo();

    // Update viewport on resize
    const handleResize = () => {
      setDeviceInfo((prev) => ({
        ...prev,
        viewport: getViewportSize(),
      }));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const incrementAnimationCount = () => {
    setAnimationCount((prev) => prev + 1);
  };

  const getStatusColor = (condition: boolean) => {
    return condition ? "text-green-600" : "text-red-600";
  };

  const getPerformanceColor = (level: PerformanceLevel) => {
    switch (level) {
      case PerformanceLevel.HIGH:
        return "text-green-600";
      case PerformanceLevel.MEDIUM:
        return "text-yellow-600";
      case PerformanceLevel.LOW:
        return "text-orange-600";
      case PerformanceLevel.DISABLED:
        return "text-red-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-cream-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-playfair text-mocha-800 mb-2">
            Mobile Animation Test Lab 🧪
          </h1>
          <p className="text-mocha-600">
            Comprehensive mobile animation debugging and testing
          </p>
        </motion.div>

        {/* Device Info Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-playfair text-mocha-800 mb-4 flex items-center">
            <Settings className="w-6 h-6 mr-2" />
            Device & Performance Status
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  {deviceInfo.isMobile ? (
                    <Smartphone className="w-4 h-4 mr-2" />
                  ) : (
                    <Monitor className="w-4 h-4 mr-2" />
                  )}
                  Device Type:
                </span>
                <span className={getStatusColor(deviceInfo.isMobile)}>
                  {deviceInfo.isMobile ? "Mobile" : "Desktop"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Is Tablet:</span>
                <span className={getStatusColor(deviceInfo.isTablet)}>
                  {deviceInfo.isTablet ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Touch Device:</span>
                <span className={getStatusColor(deviceInfo.isTouch)}>
                  {deviceInfo.isTouch ? "Yes" : "No"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Viewport:</span>
                <span className="text-mocha-600">
                  {deviceInfo.viewport.width}×{deviceInfo.viewport.height}
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Performance Level:
                </span>
                <span
                  className={getPerformanceColor(deviceInfo.performanceLevel)}
                >
                  {deviceInfo.performanceLevel.toUpperCase()}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Reduced Motion:</span>
                <span className={getStatusColor(!deviceInfo.reducedMotion)}>
                  {deviceInfo.reducedMotion ? "Enabled" : "Disabled"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span>Animations Triggered:</span>
                <span className="text-mocha-600 font-bold">
                  {animationCount}
                </span>
              </div>

              <button
                onClick={() => setAnimationCount(0)}
                className="w-full px-4 py-2 bg-dusty-rose-100 text-dusty-rose-700 rounded-md hover:bg-dusty-rose-200 transition-colors"
              >
                Reset Counter
              </button>
            </div>
          </div>
        </motion.div>

        {/* Animation Tests */}
        <div className="space-y-8">
          {/* Basic Reveal Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-playfair text-mocha-800 mb-4">
              1. Basic Elegant Reveal Test
            </h3>
            <ElegantReveal delay={0} className="p-4 bg-cream-50 rounded-lg">
              <div
                onAnimationStart={incrementAnimationCount}
                className="text-center"
              >
                <Eye className="w-8 h-8 mx-auto mb-2 text-dusty-rose-600" />
                <p className="text-mocha-700">
                  This should fade in smoothly on mobile!
                </p>
              </div>
            </ElegantReveal>
          </div>

          {/* Stagger Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-playfair text-mocha-800 mb-4">
              2. Stagger Animation Test
            </h3>
            <StaggerReveal className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((num) => (
                <StaggerChild
                  key={num}
                  className="p-4 bg-cream-50 rounded-lg text-center"
                >
                  <div onAnimationStart={incrementAnimationCount}>
                    <div className="w-8 h-8 bg-dusty-rose-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                      <span className="text-dusty-rose-700 font-bold">
                        {num}
                      </span>
                    </div>
                    <p className="text-mocha-600">Item {num}</p>
                  </div>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>

          {/* Premium Card Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-playfair text-mocha-800 mb-4">
              3. Premium Card Hover Test
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <PremiumCard className="p-6 bg-gradient-to-br from-dusty-rose-50 to-cream-100 rounded-lg border border-dusty-rose-200">
                <div
                  onAnimationStart={incrementAnimationCount}
                  className="text-center"
                >
                  <h4 className="font-playfair text-lg text-mocha-800 mb-2">
                    Touch/Hover Me!
                  </h4>
                  <p className="text-mocha-600">
                    This card should respond to touch on mobile
                  </p>
                </div>
              </PremiumCard>

              <PremiumCard
                delay={0.2}
                className="p-6 bg-gradient-to-br from-cream-100 to-warm-blush-50 rounded-lg border border-warm-blush-200"
              >
                <div
                  onAnimationStart={incrementAnimationCount}
                  className="text-center"
                >
                  <h4 className="font-playfair text-lg text-mocha-800 mb-2">
                    Me Too!
                  </h4>
                  <p className="text-mocha-600">Delayed entrance animation</p>
                </div>
              </PremiumCard>
            </div>
          </div>

          {/* Text Reveal Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-playfair text-mocha-800 mb-4">
              4. Text Reveal Animation
            </h3>
            <TextReveal className="text-center">
              <div onAnimationStart={incrementAnimationCount}>
                <h2 className="text-3xl font-playfair text-mocha-800 mb-2">
                  Beautiful Typography
                </h2>
                <p className="text-lg text-mocha-600">
                  This text should reveal smoothly with elegant timing
                </p>
              </div>
            </TextReveal>
          </div>

          {/* Scroll Reveal Test */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-xl font-playfair text-mocha-800 mb-4">
              5. Scroll Reveal Test
            </h3>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((num) => (
                <ScrollReveal key={num} delay={num * 0.1}>
                  <div
                    onAnimationStart={incrementAnimationCount}
                    className="p-4 bg-cream-50 rounded-lg flex items-center"
                  >
                    <div className="w-12 h-12 bg-dusty-rose-200 rounded-full flex items-center justify-center mr-4">
                      <span className="text-dusty-rose-700 font-bold">
                        {num}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium text-mocha-800">
                        Scroll Item {num}
                      </h4>
                      <p className="text-mocha-600">
                        This should animate when it comes into view
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Performance Warning */}
          {(deviceInfo.reducedMotion ||
            deviceInfo.performanceLevel === PerformanceLevel.LOW) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-yellow-50 border border-yellow-200 rounded-lg p-6"
            >
              <div className="flex items-start">
                <AlertTriangle className="w-6 h-6 text-yellow-600 mr-3 mt-0.5" />
                <div>
                  <h3 className="text-lg font-medium text-yellow-800 mb-2">
                    Performance Notice
                  </h3>
                  <div className="text-yellow-700 space-y-1">
                    {deviceInfo.reducedMotion && (
                      <p>
                        • Reduced motion preference detected - animations may be
                        simplified
                      </p>
                    )}
                    {deviceInfo.performanceLevel === PerformanceLevel.LOW && (
                      <p>
                        • Low performance device detected - animations are
                        optimized for performance
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* Instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6"
        >
          <h3 className="text-lg font-playfair text-blue-800 mb-3">
            Testing Instructions
          </h3>
          <ul className="text-blue-700 space-y-2">
            <li>
              • <strong>Mobile:</strong> Open this page on your mobile device
            </li>
            <li>
              • <strong>Scroll:</strong> Scroll up and down to trigger
              scroll-based animations
            </li>
            <li>
              • <strong>Touch:</strong> Tap the premium cards to test touch
              interactions
            </li>
            <li>
              • <strong>Monitor:</strong> Watch the animation counter to see if
              animations are firing
            </li>
            <li>
              • <strong>Performance:</strong> Check if the performance level
              matches your device
            </li>
          </ul>
        </motion.div>

        {/* Debug Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 p-4 bg-gray-50 border rounded-lg"
        >
          <details>
            <summary className="cursor-pointer font-medium text-gray-700 mb-2">
              Debug Information (Click to expand)
            </summary>
            <pre className="text-xs text-gray-600 bg-white p-3 rounded border overflow-auto">
              {JSON.stringify(
                {
                  userAgent: navigator.userAgent,
                  platform: navigator.platform,
                  deviceMemory: (navigator as any).deviceMemory,
                  hardwareConcurrency: navigator.hardwareConcurrency,
                  connection: (navigator as any).connection?.effectiveType,
                  viewport: deviceInfo.viewport,
                  deviceInfo: deviceInfo,
                },
                null,
                2,
              )}
            </pre>
          </details>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileAnimationTest;
