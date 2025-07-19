import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { ChefHat, ScrollText, Sparkles, Palette } from "lucide-react";
import {
  FadeInUp,
  StaggerChildren,
  StaggerChild,
} from "./animations/AnimationComponents";
import {
  FadeReveal,
  TextReveal,
  StaggerReveal,
} from "./animations/SophisticatedAnimations";
import * as TextureComponents from "./animations/TextureComponents";
import { scrollToTop } from "../hooks/useScrollToTop";
import Button from "./Button";
import { isMobileDevice } from "../utils/mobileDetection";
import {
  SECTION_DELAYS,
  DURATIONS,
  STAGGER_DELAYS,
} from "../config/animationTiming";

const EmotionalStorySection = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  const values = [
    {
      icon: ChefHat,
      title: "Amor en Cada Creación",
      description:
        "Los mejores sabores nacen del corazón y la dedicación artesanal.",
    },
    {
      icon: ScrollText,
      title: "Tradición Casera",
      description:
        "Recetas tradicionales perfeccionadas con técnicas artesanales.",
    },
    {
      icon: Sparkles,
      title: "Ingredientes Premium",
      description:
        "Solo ingredientes de calidad: vainilla natural, chocolate fino.",
    },
    {
      icon: Palette,
      title: "Personalizado Para Ti",
      description: "Cada pedido es único, diseñado para tu ocasión especial.",
    },
  ];

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
      className={`relative py-20 bg-gradient-to-br from-cream-400 to-cream-500 overflow-hidden scroll-optimized ${isMobile ? "mobile-content-visible" : ""} ${showFallback ? "animation-fallback" : ""}`}
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
            <div className="mb-8">
              <TextReveal
                delay={SECTION_DELAYS.emotionalStory.title}
                staggerDelay={STAGGER_DELAYS.normal}
                className="text-5xl sm:text-6xl md:text-7xl font-academy leading-elegant block text-cocoa-500 text-shadow-elegant tracking-academy-hero font-bold"
              >
                Cada Dulce Nace
              </TextReveal>
              <div className="mt-2 relative">
                <TextReveal
                  delay={SECTION_DELAYS.emotionalStory.subtitle}
                  staggerDelay={STAGGER_DELAYS.normal}
                  className="text-5xl sm:text-6xl md:text-7xl font-academy leading-elegant block text-sage-500 italic tracking-academy-subhead font-bold"
                >
                  de una Emoción
                </TextReveal>
                <FadeReveal
                  delay={SECTION_DELAYS.emotionalStory.underline}
                  duration={DURATIONS.elegant}
                  direction="none"
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
                >
                  <div></div>
                </FadeReveal>
              </div>
            </div>
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
            <FadeInUp delay={SECTION_DELAYS.emotionalStory.content}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATIONS.normal,
                  delay: SECTION_DELAYS.emotionalStory.content,
                }}
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

          {/* Values section */}
          {showFallback || isMobile ? (
            <div className="mb-12 mobile-content-visible">
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {values.map((value, index) => (
                  <motion.div
                    key={index}
                    className="group relative"
                    whileHover={{ y: -4 }}
                    transition={{ duration: DURATIONS.fast, ease: "easeOut" }}
                  >
                    <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center shadow-premium hover:shadow-luxury transition-all duration-[700ms] border border-sage-100/50 group-hover:border-sage-200/80">
                      {/* Decorative gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-sage-50/50 to-cream-100/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-[700ms]"></div>

                      {/* Enhanced icon container */}
                      <div className="relative w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:from-sage-200 group-hover:to-sage-300 transition-all duration-[700ms] shadow-inner-soft group-hover:scale-110 group-hover:rotate-3">
                        <value.icon className="h-9 w-9 text-sage-600 group-hover:text-sage-700 transition-colors duration-[700ms]" />
                        {/* Subtle shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-[1300ms] ease-out rounded-2xl"></div>
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-lg font-academy text-cocoa-500 font-medium text-shadow-elegant mb-3 group-hover:text-cocoa-600 transition-colors duration-300 leading-elegant tracking-academy-normal">
                          {value.title}
                        </h3>
                        <p className="font-bodoni font-normal text-sm leading-body-elegant text-cocoa-500/80 group-hover:text-cocoa-500 transition-colors duration-300">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ) : (
            <FadeReveal
              delay={SECTION_DELAYS.emotionalStory.values}
              duration={DURATIONS.dramatic}
              direction="up"
              distance={30}
            >
              <StaggerReveal
                staggerDelay={STAGGER_DELAYS.dramatic}
                childDelay={SECTION_DELAYS.emotionalStory.values}
                className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"
              >
                {values.map((value, index) => (
                  <StaggerChild key={index}>
                    <motion.div
                      className="group relative"
                      whileHover={{ y: -6, scale: 1.02 }}
                      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    >
                      <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-8 text-center shadow-premium hover:shadow-luxury transition-all duration-700 border border-sage-100/50 group-hover:border-sage-200/80 relative overflow-hidden">
                        {/* Elegant gradient background */}
                        <div className="absolute inset-0 bg-gradient-to-br from-sage-50/60 to-cream-100/60 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                        {/* Premium icon container */}
                        <div className="relative w-24 h-24 bg-gradient-to-br from-sage-100 to-sage-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-sage-200 group-hover:to-sage-300 transition-all duration-700 shadow-elegant group-hover:shadow-premium group-hover:scale-110 group-hover:rotate-6">
                          <value.icon className="h-11 w-11 text-sage-600 group-hover:text-sage-700 transition-colors duration-500" />
                          {/* Sophisticated shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>
                        </div>

                        <div className="relative z-10">
                          <h3 className="text-xl font-academy text-cocoa-500 font-medium text-shadow-elegant mb-4 group-hover:text-cocoa-600 transition-colors duration-500 leading-elegant tracking-academy-normal">
                            {value.title}
                          </h3>
                          <p className="font-bodoni font-normal text-base leading-body-elegant text-cocoa-500/80 group-hover:text-cocoa-500 transition-colors duration-500 tracking-bodoni-elegant">
                            {value.description}
                          </p>
                        </div>

                        {/* Subtle decorative corner accent */}
                        <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-sage-300 to-sage-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                      </div>
                    </motion.div>
                  </StaggerChild>
                ))}
              </StaggerReveal>
            </FadeReveal>
          )}

          {/* Call to action buttons */}
          {showFallback || isMobile ? (
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mobile-content-visible">
              <Button
                onClick={goToMenu}
                variant="primary"
                size="lg"
                className="px-8 py-4 text-lg text-white"
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
            <FadeReveal
              delay={SECTION_DELAYS.emotionalStory.buttons}
              duration={DURATIONS.dramatic}
              direction="up"
              distance={30}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: DURATIONS.medium,
                  delay: SECTION_DELAYS.emotionalStory.buttons,
                }}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <Button
                  onClick={goToMenu}
                  variant="primary"
                  size="lg"
                  className="px-8 py-4 text-lg text-white"
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
            </FadeReveal>
          )}
        </div>
      </div>
    </section>
  );
};

export default EmotionalStorySection;
