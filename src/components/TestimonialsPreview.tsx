import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import {
  FadeReveal,
  TextReveal,
  StaggerReveal,
  StaggerChild,
  CinematicReveal,
} from "./animations/SophisticatedAnimations";
import { HandDrawnDivider } from "./animations/TextureComponents";
import {
  SECTION_DELAYS,
  DURATIONS,
  STAGGER_DELAYS,
} from "../config/animationTiming";

const TestimonialsPreview = () => {
  const testimonials = [
    {
      text: "La torta era tan delicada que se sintió como una carta de amor. Cada bocado fue pura poesía.",
      name: "Isabella",
      event: "Celebración de Cumpleaños",
      image: "/images/testimonials/testimonial-1.jpg",
      rating: 5,
    },
    {
      text: "Convirtió nuestra pequeña reunión en algo mágico. Los postres eran obras de arte que sabían aún mejor de lo que se veían.",
      name: "Carlos & María",
      event: "Cena de Aniversario",
      image: "/images/testimonials/testimonial-2.jpg",
      rating: 5,
    },
    {
      text: "Trabajar con ella se sintió como tener una querida amiga creando algo especial solo para nosotros. La atención al detalle fue extraordinaria.",
      name: "Sofía",
      event: "Baby Shower",
      image: "/images/testimonials/testimonial-3.jpg",
      rating: 5,
    },
  ];

  // Function to render star ratings
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          delay: i * STAGGER_DELAYS.normal,
          duration: DURATIONS.fast,
          ease: [0.4, 0, 0.2, 1],
        }}
        className="relative"
      >
        <svg
          className={`w-5 h-5 ${i < rating ? "text-dusty-rose" : "text-sage/30"} transition-colors duration-300`}
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
        {i < rating && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: i * STAGGER_DELAYS.normal + DURATIONS.instant,
              duration: DURATIONS.fast,
              ease: [0.4, 0, 0.2, 1],
            }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-warm-blush rounded-full opacity-60 shadow-inner-soft" />
          </motion.div>
        )}
      </motion.div>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <FadeReveal
            delay={SECTION_DELAYS.testimonials.divider}
            duration={DURATIONS.medium}
            direction="none"
          >
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-px bg-sage/40"></div>
              <span className="mx-4 text-sm font-source-serif text-sage/70 uppercase tracking-wider">
                Testimonios
              </span>
              <div className="w-16 h-px bg-sage/40"></div>
            </div>
          </FadeReveal>

          <div className="mb-8">
            <TextReveal
              delay={SECTION_DELAYS.testimonials.title}
              staggerDelay={STAGGER_DELAYS.normal}
              className="text-4xl sm:text-5xl font-academy text-black-bold text-shadow-elegant block tracking-academy-hero"
            >
              Palabras
            </TextReveal>
            <div className="mt-2 relative">
              <TextReveal
                delay={SECTION_DELAYS.testimonials.subtitle}
                staggerDelay={STAGGER_DELAYS.normal}
                className="text-4xl sm:text-5xl font-academy text-sage-600 italic tracking-academy-subhead"
              >
                de Gratitud
              </TextReveal>
              <FadeReveal
                delay={SECTION_DELAYS.testimonials.underline}
                duration={DURATIONS.medium}
                direction="none"
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
              >
                <div></div>
              </FadeReveal>
            </div>
          </div>

          <CinematicReveal
            direction="center"
            delay={SECTION_DELAYS.testimonials.subtitle}
            duration={DURATIONS.elegant}
          >
            <HandDrawnDivider className="mb-6" />
          </CinematicReveal>

          <FadeReveal
            delay={SECTION_DELAYS.testimonials.content}
            duration={DURATIONS.slow}
            direction="up"
            distance={20}
          >
            <p className="text-lg body-elegant max-w-2xl mx-auto font-light leading-relaxed">
              La mayor alegría viene de saber que mis postres se convierten en
              parte de los recuerdos{" "}
              <span className="accent-dusty-rose font-dancing italic bg-dusty-rose/5 px-2 py-1 rounded-premium shadow-inner-soft">
                entrañables
              </span>{" "}
              de alguien.
            </p>
          </FadeReveal>
        </div>

        <StaggerReveal
          staggerDelay={STAGGER_DELAYS.slow}
          childDelay={SECTION_DELAYS.testimonials.cards}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial, index) => (
            <StaggerChild key={index}>
              <motion.div
                className="bg-elegant-cream backdrop-blur-sm p-8 rounded-2xl shadow-premium hover:shadow-luxury border border-dusty-rose group relative overflow-hidden"
                whileHover={{ y: -12, scale: 1.05 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-dusty-rose-gradient rounded-t-2xl"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                />

                {/* Header with name and rating */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-dusty-rose/10 rounded-full p-2 shadow-inner-soft">
                      <Quote className="h-5 w-5 text-dusty-rose" />
                    </div>
                    <div>
                      <p className="font-academy text-black-bold text-lg text-shadow-elegant">
                        {testimonial.name}
                      </p>
                      <p className="text-dusty-rose-elegant text-sm font-source-serif">
                        {testimonial.event}
                      </p>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    {renderStars(testimonial.rating)}
                  </div>
                </div>

                {/* Testimonial text */}
                <div className="relative">
                  <Quote className="absolute -top-1 -left-1 h-4 w-4 text-dusty-rose/30 transform rotate-180" />
                  <p className="body-elegant italic mb-4 leading-relaxed font-light pl-3 pr-3 text-shadow-elegant">
                    {testimonial.text}
                  </p>
                  <Quote className="absolute -bottom-1 -right-1 h-4 w-4 text-dusty-rose/30" />
                </div>

                {/* Sophisticated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl"></div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-dusty-rose/5 to-transparent rounded-tl-[28px] shadow-warm"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                />
              </motion.div>
            </StaggerChild>
          ))}
        </StaggerReveal>

        <FadeReveal
          delay={1.2}
          duration={1.0}
          direction="up"
          distance={30}
          className="text-center mt-16"
        >
          <div className="relative mb-8">
            <CinematicReveal direction="iris" delay={1.4} duration={1.5}>
              <TextReveal
                delay={1.4}
                staggerDelay={0.08}
                className="text-2xl font-bodoni font-normal italic leading-body-elegant text-shadow-elegant text-cocoa-500 tracking-bodoni-elegant"
              >
                Cada testimonio es una sonrisa que perdura en el tiempo
              </TextReveal>
            </CinematicReveal>
            <FadeReveal
              delay={1.6}
              duration={0.8}
              direction="none"
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-sage-300 via-sage-400 to-sage-300 rounded-full"
            >
              <div></div>
            </FadeReveal>
          </div>
        </FadeReveal>
      </div>
    </section>
  );
};

export default TestimonialsPreview;
