import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FadeReveal,
  TextReveal,
  CinematicReveal,
  StaggerReveal,
  StaggerChild,
} from "./animations/SophisticatedAnimations";
import {
  SECTION_DELAYS,
  DURATIONS,
  STAGGER_DELAYS,
  getCSSTransition,
  getTransformTransition,
} from "../config/animationTiming";

const AboutPreview = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden scroll-optimized">
      {/* Background decorative elements */}
      <FadeReveal
        delay={SECTION_DELAYS.aboutPreview.base}
        duration={DURATIONS.ambient}
        direction="none"
      >
        <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 animate-pulse-soft shadow-sage"></div>
      </FadeReveal>
      <FadeReveal
        delay={SECTION_DELAYS.aboutPreview.base}
        duration={DURATIONS.ambient}
        direction="none"
      >
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30 shadow-warm"></div>
      </FadeReveal>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <FadeReveal
            delay={SECTION_DELAYS.aboutPreview.image}
            duration={DURATIONS.elegant}
            direction="left"
            distance={60}
            className="order-2 lg:order-1"
          >
            <div className="relative group">
              <div
                className={`absolute inset-0 bg-gradient-to-br from-sage-200/30 to-sage-200/30 rounded-luxury transform rotate-3 group-hover:rotate-6 ${getTransformTransition("elegant")} shadow-sage`}
              ></div>
              <div
                className={`relative w-full h-96 lg:h-[500px] bg-gradient-to-br from-sage-100 to-cream-200 rounded-luxury shadow-premium hover:shadow-luxury ${getCSSTransition("elegant")} group-hover:scale-105 border-4 border-white/50 flex items-center justify-center`}
              >
                <span className="text-2xl font-academy text-sage-500 italic">
                  foto tuya aqui
                </span>
              </div>
              <FadeReveal
                delay={SECTION_DELAYS.aboutPreview.content}
                duration={DURATIONS.ambient}
                direction="none"
              >
                <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sage-200/40 rounded-full blur-2xl animate-pulse-soft shadow-warm"></div>
              </FadeReveal>
              <FadeReveal
                delay={SECTION_DELAYS.aboutPreview.content}
                duration={DURATIONS.ambient}
                direction="none"
              >
                <div className="absolute -top-6 -left-6 w-24 h-24 bg-sage-200/50 rounded-full blur-xl shadow-sage"></div>
              </FadeReveal>

              {/* Shimmer effect */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full ${getTransformTransition("dramatic")} rounded-luxury`}
              ></div>
            </div>
          </FadeReveal>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <FadeReveal
              delay={SECTION_DELAYS.aboutPreview.divider}
              duration={DURATIONS.elegant}
              direction="none"
            >
              <div className="flex items-center mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
                <span className="mx-6 text-base font-academy text-sage-600 uppercase tracking-widest font-medium">
                  Nuestra Historia
                </span>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
              </div>
            </FadeReveal>

            <div className="mb-10">
              <TextReveal
                delay={SECTION_DELAYS.aboutPreview.title}
                staggerDelay={STAGGER_DELAYS.normal}
                className="text-5xl sm:text-6xl md:text-7xl font-academy leading-elegant block text-cocoa-500 text-shadow-elegant tracking-academy-hero font-bold"
              >
                La pasión artesanal
              </TextReveal>
              <div className="mt-2 relative">
                <TextReveal
                  delay={SECTION_DELAYS.aboutPreview.subtitle}
                  staggerDelay={STAGGER_DELAYS.normal}
                  className="text-5xl sm:text-6xl md:text-7xl font-academy leading-elegant block text-sage-500 italic tracking-academy-subhead font-bold"
                >
                  detrás de Cucina
                </TextReveal>
                <FadeReveal
                  delay={SECTION_DELAYS.aboutPreview.underline}
                  duration={DURATIONS.elegant}
                  direction="none"
                  className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
                >
                  <div></div>
                </FadeReveal>
              </div>
            </div>

            <StaggerReveal
              staggerDelay={STAGGER_DELAYS.slow}
              childDelay={SECTION_DELAYS.aboutPreview.content}
              className="space-y-8 body-elegant text-xl leading-relaxed font-medium"
            >
              <StaggerChild>
                <FadeReveal
                  delay={SECTION_DELAYS.aboutPreview.content}
                  duration={DURATIONS.elegant}
                  direction="up"
                  distance={20}
                >
                  <p>
                    Lo que comenzó como tradición de repostería casera se ha
                    convertido en algo hermoso—crear
                    <span className="accent-sage font-semibold italic">
                      {" "}
                      momentos dulces
                    </span>{" "}
                    que se convierten en recuerdos entrañables.
                  </p>
                </FadeReveal>
              </StaggerChild>

              <StaggerChild>
                <FadeReveal
                  delay={SECTION_DELAYS.aboutPreview.content}
                  duration={DURATIONS.elegant}
                  direction="up"
                  distance={20}
                >
                  <p>
                    En nuestra cocina, trabajamos con ingredientes de temporada
                    y técnicas artesanales, elaborando cada postre a mano. Sin
                    atajos, sin sabores artificiales—solo
                    <span className="accent-sage font-semibold italic">
                      {" "}
                      ingredientes puros
                    </span>{" "}
                    transformados en algo mágico.
                  </p>
                </FadeReveal>
              </StaggerChild>
            </StaggerReveal>

            <FadeReveal
              delay={SECTION_DELAYS.aboutPreview.quote}
              duration={DURATIONS.dramatic}
              direction="up"
              distance={30}
            >
              <div
                className={`mt-12 p-8 bg-cream-100 backdrop-blur-sm rounded-2xl border border-sage shadow-premium hover:shadow-luxury ${getCSSTransition("elegant")}`}
              >
                <CinematicReveal
                  direction="iris"
                  delay={SECTION_DELAYS.aboutPreview.quote}
                  duration={DURATIONS.ambient}
                >
                  <blockquote className="text-2xl sm:text-3xl font-bodoni text-elegant italic text-center leading-relaxed">
                    &ldquo;
                    <span className="text-cocoa-500">No solo horneamos</span>
                    &mdash;
                    <span className="block mt-2 text-sage-600">
                      creamos pequeños momentos comestibles.&rdquo;
                    </span>
                  </blockquote>
                </CinematicReveal>
              </div>
            </FadeReveal>

            <FadeReveal
              delay={SECTION_DELAYS.aboutPreview.cta}
              duration={DURATIONS.elegant}
              direction="up"
              distance={20}
            >
              <div className="mt-10">
                <Link
                  to="/about"
                  className={`group inline-flex items-center gap-3 text-sage-600 hover:text-sage-700 ${getCSSTransition("elegant")} font-academy font-semibold text-lg rounded-full px-4 py-2 hover:bg-sage-50/50`}
                >
                  <span>Lee nuestra historia completa</span>
                  <span
                    className={`group-hover:translate-x-2 ${getTransformTransition("elegant")}`}
                  >
                    →
                  </span>
                </Link>
              </div>
            </FadeReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
