import { useNavigate } from "react-router-dom";

import {
  FadeReveal,
  TextReveal,
  ParallaxScroll,
  SophisticatedButton,
  ParticleSystem,
  MagneticField,
  CinematicReveal,
  FluidCursor,
  PerspectiveHover,
} from "./animations/SophisticatedAnimations";
import { SECTION_DELAYS, DURATIONS } from "../config/animationTiming";

const Hero = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/menu");
  };

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <FluidCursor className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <ParticleSystem
        particleCount={25}
        particleColor="#929B9A"
        className="absolute inset-0"
      >
        <div />
      </ParticleSystem>
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center overflow-hidden mobile-section-consistent md:pt-0 scroll-optimized"
        aria-label="Sección de inicio"
        role="region"
      >
        {/* Background Video/Image */}
        <div className="absolute inset-0">
          {/* Placeholder for background video - replace src with actual video when available */}
          {/* <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/dessert-montage.mp4" type="video/mp4" />
        </video> */}

          {/* Background image montage */}
          <div className="w-full h-full" style={{ backgroundColor: "#F9F6F4" }}>
            <img
              src="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
              alt="Dessert montage background"
              className="w-full h-full object-cover opacity-30 mix-blend-soft-light"
            />
          </div>

          {/* Overlay for better text readability */}
          <div className="absolute inset-0 hero-overlay-subtle"></div>
        </div>

        {/* Subtle Background Elements */}
        <ParallaxScroll speed={0.2} className="absolute inset-0 z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-sage-100/10 to-sage-200/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cream-200/10 to-sage-100/10 rounded-full blur-3xl"></div>
        </ParallaxScroll>

        <div className="relative z-30 text-center mobile-padding max-w-5xl mx-auto">
          {/* Main Heading - Logo */}
          <div className="mobile-heading-consistent pt-8 md:pt-12">
            <span className="sr-only">Cucina - homemade goods</span>
            <CinematicReveal
              direction="horizontal"
              delay={SECTION_DELAYS.hero.base}
            >
              <FadeReveal
                delay={SECTION_DELAYS.hero.logo}
                duration={DURATIONS.elegant}
                direction="up"
                distance={20}
                className="flex justify-center"
              >
                <img
                  src="/logo.png"
                  alt="Cucina - homemade goods"
                  className="h-36 sm:h-40 md:h-36 lg:h-40 xl:h-44 w-auto max-w-full object-contain"
                />
              </FadeReveal>
            </CinematicReveal>
          </div>

          {/* Subtitle */}
          <FadeReveal
            delay={SECTION_DELAYS.hero.subtitle}
            duration={DURATIONS.elegant}
            direction="up"
            distance={20}
            className="relative mobile-content-consistent mt-6 md:mt-8"
          >
            <p className="font-bodoni text-lg sm:text-xl md:text-2xl lg:text-3xl text-cocoa-500 max-w-4xl mx-auto leading-body-elegant text-contrast-high mobile-content-consistent">
              Creamos postres artesanales que despiertan memorias y celebran
              momentos únicos. Cada creación lleva el sabor de{" "}
              <span className="text-sage-600 italic underline decoration-sage-600/50 decoration-2 underline-offset-4">
                la auténtica repostería casera
              </span>
              , hecha con amor y dedicación.
            </p>

            {/* Visual Flow Anchor */}
            <FadeReveal
              delay={SECTION_DELAYS.hero.anchor}
              duration={DURATIONS.medium}
              direction="up"
              distance={15}
              className="mt-8 md:mt-10 flex justify-center"
            >
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-sage-400 rounded-full flow-anchor-pulse"></div>
              </div>
            </FadeReveal>
          </FadeReveal>

          {/* CTA Buttons */}
          <FadeReveal
            delay={SECTION_DELAYS.hero.buttons}
            duration={DURATIONS.elegant}
            direction="up"
            distance={30}
            className="flex flex-col sm:flex-row cta-mobile-spacing-improved justify-center items-center mobile-content-consistent mt-8 md:mt-12"
          >
            <PerspectiveHover rotationIntensity={8}>
              <MagneticField strength={0.15} radius={120}>
                <SophisticatedButton
                  onClick={goToContact}
                  variant="primary"
                  className="px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl w-full sm:w-auto hero-btn-primary tracking-button-refined mobile-content-consistent"
                  aria-label="Crear tu pedido especial"
                >
                  Crea Tu Pedido Especial
                </SophisticatedButton>
              </MagneticField>
            </PerspectiveHover>

            <PerspectiveHover rotationIntensity={8}>
              <MagneticField strength={0.15} radius={120}>
                <SophisticatedButton
                  onClick={goToMenu}
                  variant="secondary"
                  className="px-8 py-4 md:px-10 md:py-5 text-lg md:text-xl w-full sm:w-auto hero-btn-secondary tracking-button-refined uppercase mobile-content-consistent"
                  aria-label="Ver el menú de postres"
                >
                  Ver el menú
                </SophisticatedButton>
              </MagneticField>
            </PerspectiveHover>
          </FadeReveal>
        </div>
      </section>
    </FluidCursor>
  );
};

export default Hero;
