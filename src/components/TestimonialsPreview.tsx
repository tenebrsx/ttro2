import { Quote } from "lucide-react";
import { motion } from "framer-motion";
import {
  FadeInUp,
  StaggerChildren,
  StaggerChild,
} from "./animations/AnimationComponents";
import { HandDrawnDivider } from "./animations/TextureComponents";

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
        transition={{ delay: i * 0.1, duration: 0.3 }}
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
            transition={{ delay: i * 0.1 + 0.2, duration: 0.2 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-2 h-2 bg-warm-blush rounded-full opacity-60" />
          </motion.div>
        )}
      </motion.div>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInUp>
          <div className="text-center mb-16">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-px bg-sage/40"></div>
              <span className="mx-4 text-sm font-source-serif text-sage/70 uppercase tracking-wider">
                Testimonios
              </span>
              <div className="w-16 h-px bg-sage/40"></div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-academy text-black-bold text-shadow-elegant mb-6">
              Palabras <span className="text-dusty-rose">Dulces</span>
            </h2>

            <HandDrawnDivider className="mb-6" />

            <p className="text-lg body-elegant max-w-2xl mx-auto font-light leading-relaxed">
              La mayor alegría viene de saber que mis postres se convierten en
              parte de los recuerdos{" "}
              <span className="accent-dusty-rose font-dancing italic">
                entrañables
              </span>{" "}
              de alguien.
            </p>
          </div>
        </FadeInUp>

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <StaggerChild key={index}>
              <motion.div
                className="bg-elegant-cream backdrop-blur-sm p-8 rounded-2xl shadow-dusty-rose border border-dusty-rose group relative overflow-hidden"
                whileHover={{ y: -8, scale: 1.03 }}
                transition={{ duration: 0.3 }}
              >
                <motion.div
                  className="absolute top-0 left-0 w-full h-1 bg-dusty-rose-gradient"
                  initial={{ scaleX: 0 }}
                  whileHover={{ scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />

                {/* Header with name and rating */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="bg-dusty-rose/10 rounded-full p-2">
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
                  <Quote className="absolute -top-2 -left-1 h-8 w-8 text-dusty-rose/20 transform rotate-180" />
                  <p className="body-elegant italic mb-4 leading-relaxed font-light pl-4 pr-2 text-shadow-elegant">
                    &quot;{testimonial.text}&quot;
                  </p>
                  <Quote className="absolute -bottom-2 -right-1 h-8 w-8 text-dusty-rose/20" />
                </div>

                {/* Decorative elements */}
                <motion.div
                  className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-dusty-rose/5 to-transparent rounded-tl-full"
                  animate={{
                    opacity: [0.3, 0.5, 0.3],
                    scale: [1, 1.05, 1],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </motion.div>
            </StaggerChild>
          ))}
        </StaggerChildren>
      </div>
    </section>
  );
};

export default TestimonialsPreview;
