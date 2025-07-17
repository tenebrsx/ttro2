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
        className="relative min-h-screen flex items-center justify-center overflow-hidden mobile-section-consistent md:pt-0 texture-grain-animated"
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

          {/* Clean background without image */}
          <div className="w-full h-full hero-clean-bg"></div>

          {/* Enhanced overlay for better text readability */}
          <div className="absolute inset-0 hero-overlay-subtle surface-elegant"></div>
        </div>

        {/* Subtle Background Elements */}
        <ParallaxScroll speed={0.2} className="absolute inset-0 z-10">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-sage-100/10 to-sage-200/10 rounded-full blur-3xl shadow-sage"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cream-200/10 to-sage-100/10 rounded-full blur-3xl shadow-warm"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-transparent via-cream-100/5 to-transparent rounded-luxury opacity-30"></div>
        </ParallaxScroll>

        <div className="relative z-30 text-center mobile-padding max-w-5xl mx-auto">
          {/* Main Heading - Logo */}
          <div className="mobile-heading-consistent pt-8 md:pt-12">
            <span className="sr-only">Cucina - homemade goods</span>
            <CinematicReveal direction="horizontal" delay={0.2}>
              <FadeReveal
                delay={0.3}
                duration={0.8}
                direction="up"
                distance={20}
                className="flex justify-center"
              >
                <div className="relative inline-block">
                  <div className="absolute inset-0 bg-gradient-radial from-white/10 via-transparent to-transparent rounded-luxury blur-2xl scale-110 opacity-60"></div>
                  <img
                    src="/logo.png"
                    alt="Cucina - homemade goods"
                    className="relative h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 w-auto max-w-full object-contain hero-logo-shadow shadow-luxury"
                  />
                </div>
              </FadeReveal>
            </CinematicReveal>
          </div>

          {/* Subtitle */}
          <FadeReveal
            delay={1.2}
            duration={0.8}
            direction="up"
            distance={20}
            className="relative mobile-content-consistent mt-6 md:mt-8"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-elegant blur-xl"></div>
              <p className="relative font-bodoni text-lg sm:text-xl md:text-2xl lg:text-3xl text-cocoa-500 max-w-4xl mx-auto leading-body-elegant text-contrast-high mobile-content-consistent bg-white/5 backdrop-blur-sm rounded-elegant px-6 py-4 shadow-inner-soft">
                Creamos postres artesanales que despiertan memorias y celebran
                momentos únicos. Cada creación lleva el sabor de{" "}
                <span className="text-sage-600 italic underline decoration-sage-600/50 decoration-2 underline-offset-4 bg-sage-50/30 px-2 py-1 rounded-premium shadow-inner-soft">
                  la auténtica repostería casera
                </span>
                , hecha con amor y dedicación.
              </p>
            </div>

            {/* Visual Flow Anchor */}
            <FadeReveal
              delay={1.6}
              duration={0.8}
              direction="up"
              distance={15}
              className="mt-8 md:mt-10 flex justify-center"
            >
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-sage-400 rounded-full flow-anchor-pulse shadow-sage"></div>
              </div>
            </FadeReveal>
          </FadeReveal>

          {/* CTA Buttons */}
          <FadeReveal
            delay={1.8}
            duration={0.8}
            direction="up"
            distance={30}
            className="flex flex-col sm:flex-row cta-mobile-spacing-improved justify-center items-center mobile-content-consistent mt-8 md:mt-12"
          >
            <PerspectiveHover rotationIntensity={8}>
              <MagneticField strength={0.15} radius={120}>
                <SophisticatedButton
                  onClick={goToContact}
                  variant="primary"
                  className="hero-btn-mobile-enhanced hero-btn-primary tracking-button-refined mobile-content-consistent shadow-premium hover:shadow-luxury"
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
                  className="hero-btn-mobile-enhanced hero-btn-secondary tracking-button-refined uppercase mobile-content-consistent shadow-elegant hover:shadow-premium"
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
