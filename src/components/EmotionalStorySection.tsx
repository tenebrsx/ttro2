import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FadeInUp } from "./animations/AnimationComponents";
import * as TextureComponents from "./animations/TextureComponents";
import { scrollToTop } from "../hooks/useScrollToTop";
import Button from "./Button";
import { isMobileDevice } from "../utils/mobileDetection";

const EmotionalStorySection = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    setIsMobile(isMobileDevice());

    // Emergency fallback timeout for mobile
    const fallbackTimeout = setTimeout(() => {
      if (isMobileDevice()) {
        setShowFallback(true);
      }
    }, 3000);

    return () => clearTimeout(fallbackTimeout);
  }, []);

  const goToMenu = () => {
    navigate("/menu");
    setTimeout(() => scrollToTop(), 100);
  };

  const goToContact = () => {
    navigate("/contact");
    setTimeout(() => scrollToTop(), 100);
  };
  return (
    <section
      className={`relative py-20 bg-gradient-to-br from-cream-400 to-cream-500 overflow-hidden ${isMobile ? "mobile-content-visible" : ""} ${showFallback ? "animation-fallback" : ""}`}
    >
      {/* Background texture */}
      <TextureComponents.GrainTexture />

      {/* Background image with parallax effect */}
      <div className="absolute inset-0">
        <motion.div
          initial={
            isMobile ? { scale: 1, opacity: 0.6 } : { scale: 1.1, opacity: 0.3 }
          }
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: isMobile ? 0.3 : 1, ease: "easeOut" }}
          className="w-full h-full"
        >
          <img
            src="https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Postres artesanales con frutos rojos"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-creamy-beige/80 to-cream/70" />
        </motion.div>
      </div>

      <div
        className={`relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${isMobile ? "mobile-visible" : ""}`}
      >
        <div className="text-center">
          {/* Main title */}
          {showFallback || isMobile ? (
            <div className="mb-8 mobile-content-visible">
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-academy mb-8 font-bold leading-tight">
                <span className="block text-cocoa-500 text-shadow-elegant">
                  Cada Dulce Nace
                </span>
                <span className="block text-sage-500 italic font-academy mt-2 relative">
                  de una Emoción
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"></div>
                </span>
              </h2>
            </div>
          ) : (
            <FadeInUp delay={0.2}>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="mb-8"
              >
                <h2 className="text-5xl sm:text-6xl md:text-7xl font-academy mb-8 font-bold leading-tight">
                  <span className="block text-cocoa-500 text-shadow-elegant">
                    Cada Dulce Nace
                  </span>
                  <span className="block text-sage-500 italic font-academy mt-2 relative">
                    de una Emoción
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"></div>
                  </span>
                </h2>
              </motion.div>
            </FadeInUp>
          )}

          {/* Subtitle */}
          {showFallback || isMobile ? (
            <div className="mb-12 mobile-content-visible">
              <p className="text-lg sm:text-xl text-cocoa-500 font-bodoni font-normal leading-body-elegant max-w-2xl mx-auto">
                <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                  Postres artesanales
                </span>{" "}
                hechos a mano con{" "}
                <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                  ingredientes reales
                </span>
                .
              </p>
            </div>
          ) : (
            <FadeInUp delay={0.6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="mb-12"
              >
                <p className="text-lg sm:text-xl text-cocoa-500 font-bodoni font-normal leading-body-elegant max-w-2xl mx-auto">
                  <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                    Postres artesanales
                  </span>{" "}
                  hechos a mano con{" "}
                  <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                    ingredientes reales
                  </span>
                  .
                </p>
              </motion.div>
            </FadeInUp>
          )}

          {/* Call to action buttons */}
          {showFallback || isMobile ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mobile-content-visible">
              <Button
                onClick={goToMenu}
                variant="primary"
                size="lg"
                className="px-8 py-4 text-lg"
              >
                Ver Menú
              </Button>
              <Button
                onClick={goToContact}
                variant="secondary"
                size="lg"
                className="px-8 py-4 text-lg"
              >
                Contactar
              </Button>
            </div>
          ) : (
            <FadeInUp delay={1.0}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.6 }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  onClick={goToMenu}
                  variant="primary"
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  Ver Menú
                </Button>

                <Button
                  onClick={goToContact}
                  variant="secondary"
                  size="lg"
                  className="px-8 py-4 text-lg"
                >
                  Haz Pedido
                </Button>
              </motion.div>
            </FadeInUp>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmotionalStorySection;
