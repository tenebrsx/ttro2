import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FadeInUp } from "./animations/AnimationComponents";
import * as TextureComponents from "./animations/TextureComponents";
import { scrollToTop } from "../hooks/useScrollToTop";
import Button from "./Button";

const EmotionalStorySection = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/menu");
    setTimeout(() => scrollToTop(), 100);
  };

  const goToContact = () => {
    navigate("/contact");
    setTimeout(() => scrollToTop(), 100);
  };
  return (
    <section className="relative py-20 bg-gradient-to-br from-cream-400 to-cream-500 overflow-hidden">
      {/* Background texture */}
      <TextureComponents.GrainTexture />

      {/* Background image with parallax effect */}
      <div className="absolute inset-0">
        <motion.div
          initial={{ scale: 1.1, opacity: 0.3 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 1, ease: "easeOut" }}
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

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Main title */}
          <FadeInUp delay={0.2}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="mb-8"
            >
              <h2 className="text-5xl sm:text-6xl md:text-7xl font-playfair mb-8 font-bold leading-tight">
                <span className="block text-black-bold text-shadow-elegant">
                  Cada Dulce Nace
                </span>
                <span className="block text-dusty-rose-elegant italic mt-2 relative">
                  de una Emoción
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-dusty-rose-300 to-warm-blush-300 rounded-full"></div>
                </span>
              </h2>
            </motion.div>
          </FadeInUp>

          {/* Subtitle */}
          <FadeInUp delay={0.6}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="mb-12"
            >
              <p className="text-lg sm:text-xl text-mocha/80 font-source-serif font-light leading-relaxed max-w-2xl mx-auto">
                <span className="text-dusty-rose font-semibold">
                  Postres artesanales
                </span>{" "}
                hechos a mano con{" "}
                <span className="text-dusty-rose font-semibold">
                  ingredientes reales
                </span>
                .
              </p>
            </motion.div>
          </FadeInUp>

          {/* Call to action buttons */}
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
        </div>
      </div>
    </section>
  );
};

export default EmotionalStorySection;
