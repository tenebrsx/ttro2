import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FadeReveal,
  TextReveal,
  StaggerReveal,
  StaggerChild,
  CinematicReveal,
} from "./animations/SophisticatedAnimations";
import {
  SECTION_DELAYS,
  DURATIONS,
  STAGGER_DELAYS,
} from "../config/animationTiming";
import Button from "./Button";

interface FAQItem {
  question: string;
  answer: string;
}

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeCategory, setActiveCategory] = useState<string>("all");

  // Categories for filtering
  const categories = [
    { id: "all", label: "Todos" },
    { id: "orders", label: "Pedidos" },
    { id: "delivery", label: "Entregas" },
    { id: "payment", label: "Pagos" },
    { id: "customization", label: "Personalización" },
  ];

  const faqItems: (FAQItem & { category: string })[] = [
    {
      question: "¿Con cuánto tiempo debo hacer mi pedido?",
      answer:
        "Recomiendo hacer pedidos con al menos 2-3 semanas de anticipación para eventos especiales. Para pedidos más simples, una semana es suficiente. Durante temporadas altas (diciembre, febrero, mayo), sugiero reservar con más tiempo.",
      category: "orders",
    },
    {
      question: "¿Ofrecen opciones sin gluten o veganas?",
      answer:
        "¡Absolutamente! Trabajo con harinas alternativas y ingredientes veganos para crear versiones deliciosas de mis postres. Solo necesito saberlo al momento del pedido para asegurar la mejor calidad.",
      category: "customization",
    },
    {
      question: "¿Cuál es el área de entrega?",
      answer:
        "Entrego en todo Santo Domingo y áreas cercanas. Para eventos fuera de la ciudad, puedo coordinar la entrega con un costo adicional dependiendo de la distancia.",
      category: "delivery",
    },
    {
      question: "¿Pueden personalizar el diseño de las tortas?",
      answer:
        "¡Por supuesto! Cada torta es única. Trabajo contigo para crear el diseño perfecto que refleje tu visión y el estilo de tu evento. Puedo recrear inspiraciones o crear algo completamente nuevo.",
      category: "customization",
    },
    {
      question: "¿Qué métodos de pago aceptan?",
      answer:
        "Acepto efectivo, transferencias bancarias, y pagos móviles. Para pedidos grandes, pido un depósito del 50% para confirmar la fecha, y el resto se paga en la entrega.",
      category: "payment",
    },
    {
      question: "¿Qué pasa si necesito cancelar mi pedido?",
      answer:
        "Entiendo que los planes pueden cambiar. Si cancelas con más de 48 horas de anticipación, puedo reembolsar el depósito. Para cancelaciones de último minuto, trabajamos caso por caso.",
      category: "orders",
    },
    {
      question: "¿Puedo probar sabores antes de decidir?",
      answer:
        "Para bodas y eventos grandes, ofrezco degustaciones por una pequeña tarifa que se descuenta del pedido final. Para eventos más pequeños, podemos conversar sobre las opciones disponibles.",
      category: "orders",
    },
    {
      question: "¿Qué incluye el servicio de postres para eventos?",
      answer:
        "Incluyo la preparación, decoración, empaque especial, y entrega. Para eventos grandes, puedo coordinar el montaje en el lugar. También proporciono utensilios de servir si es necesario.",
      category: "delivery",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Filter FAQ items based on search query and active category
  const filteredFAQItems = faqItems.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section className="mobile-section-consistent bg-gradient-to-br from-cream-400 to-cream-500 relative texture-grain overflow-hidden scroll-optimized">
      <div className="max-w-4xl mx-auto mobile-padding">
        <div className="text-center mobile-heading-consistent">
          <FadeReveal
            delay={SECTION_DELAYS.faq.divider}
            duration={DURATIONS.elegant}
            direction="none"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
              <span className="mx-6 text-base font-academy text-sage-600 uppercase tracking-widest font-medium">
                Preguntas Frecuentes
              </span>
              <div className="w-12 md:w-16 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
            </div>
          </FadeReveal>

          <div className="mb-8">
            <TextReveal
              delay={SECTION_DELAYS.faq.title}
              staggerDelay={STAGGER_DELAYS.normal}
              className="text-5xl sm:text-6xl md:text-7xl font-academy leading-elegant block text-cocoa-500 text-shadow-elegant tracking-academy-hero font-bold"
            >
              Preguntas que
            </TextReveal>
            <div className="mt-2 relative">
              <TextReveal
                delay={SECTION_DELAYS.faq.subtitle}
                staggerDelay={STAGGER_DELAYS.normal}
                className="text-5xl sm:text-6xl md:text-7xl font-academy leading-elegant block text-sage-500 italic tracking-academy-subhead font-bold"
              >
                Respuestas que Necesitas
              </TextReveal>
              <FadeReveal
                delay={SECTION_DELAYS.faq.underline}
                duration={DURATIONS.elegant}
                direction="none"
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
              >
                <div></div>
              </FadeReveal>
            </div>
          </div>

          <FadeReveal
            delay={SECTION_DELAYS.faq.subtitle}
            duration={DURATIONS.dramatic}
            direction="up"
            distance={20}
          >
            <p className="text-xl md:text-2xl font-bodoni text-cocoa-500/80 font-medium leading-relaxed text-contrast-high max-w-3xl mx-auto">
              Respuestas a las preguntas más comunes sobre pedidos
              personalizados y nuestro
              <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                {" "}
                proceso artesanal
              </span>
              .
            </p>
          </FadeReveal>
        </div>

        {/* Search and filter */}
        <FadeReveal
          delay={SECTION_DELAYS.faq.search}
          duration={DURATIONS.elegant}
          direction="up"
          distance={30}
        >
          <div className="mobile-content-consistent space-y-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar pregunta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 pl-10 rounded-full input-high-contrast font-bodoni text-base transition-all duration-500 backdrop-blur-sm bg-white/95 border border-sage-100/50 shadow-premium hover:shadow-luxury focus:shadow-luxury"
              />
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-mocha/40" />
            </div>

            <StaggerReveal
              staggerDelay={0.1}
              childDelay={0.8}
              className="flex flex-wrap gap-2 justify-center"
            >
              {categories.map((category) => (
                <StaggerChild key={category.id}>
                  <motion.button
                    onClick={() => setActiveCategory(category.id)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`px-4 py-2 text-sm rounded-full font-academy tracking-wide transition-all duration-500 ${
                      activeCategory === category.id
                        ? "bg-cocoa-500 text-white btn-contrast-high shadow-premium"
                        : "bg-white text-cocoa-600 hover:bg-cream-100 hover:text-cocoa-700 contrast-high shadow-elegant hover:shadow-premium"
                    }`}
                  >
                    {category.label}
                  </motion.button>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>
        </FadeReveal>

        <StaggerReveal
          staggerDelay={0.1}
          childDelay={1.0}
          className="space-y-4 mt-8"
        >
          {filteredFAQItems.length > 0 ? (
            filteredFAQItems.map((item, index) => (
              <StaggerChild key={index}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -2, scale: 1.01 }}
                  className="bg-white/90 backdrop-blur-sm rounded-2xl border border-sage-200 overflow-hidden shadow-premium hover:shadow-luxury transition-all duration-500 group"
                >
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-sage-50 transition-all duration-500 hover:shadow-inner-soft group-hover:bg-sage-50/50"
                    aria-expanded={openIndex === index}
                    aria-controls={`faq-answer-${index}`}
                  >
                    <h3 className="text-lg md:text-xl font-academy text-cocoa-600 font-semibold tracking-wide text-contrast-high pr-4 group-hover:text-cocoa-700">
                      {item.question}
                    </h3>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                      className="relative"
                    >
                      <ChevronDown className="w-5 h-5 text-sage-500 flex-shrink-0 group-hover:text-sage-600" />
                      {/* Subtle glow effect on hover */}
                      <div className="absolute inset-0 bg-sage-200/30 rounded-full scale-0 group-hover:scale-150 transition-transform duration-500 -z-10"></div>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        id={`faq-answer-${index}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4">
                          <CinematicReveal
                            direction="horizontal"
                            delay={SECTION_DELAYS.faq.items}
                            duration={DURATIONS.elegant}
                          >
                            <div className="w-full h-px bg-gradient-to-r from-transparent via-sage-200 to-transparent my-4 shadow-inner-soft"></div>
                          </CinematicReveal>
                          <FadeReveal
                            delay={SECTION_DELAYS.faq.items}
                            duration={DURATIONS.slow}
                            direction="up"
                            distance={15}
                          >
                            <p className="text-base md:text-lg font-bodoni text-cocoa-500/80 font-normal leading-relaxed text-contrast-high">
                              <span className="bg-gradient-to-r from-cream-50/30 to-transparent rounded-premium px-4 py-2 shadow-inner-soft backdrop-blur-sm inline-block">
                                {item.answer}
                              </span>
                            </p>
                          </FadeReveal>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Sophisticated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-2xl"></div>
                </motion.div>
              </StaggerChild>
            ))
          ) : (
            <FadeReveal
              delay={SECTION_DELAYS.faq.items}
              duration={DURATIONS.elegant}
              direction="up"
              distance={20}
            >
              <div className="text-center py-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-premium border border-sage-100/50">
                <div className="w-16 h-16 bg-gradient-to-br from-sage-100 to-sage-200 rounded-full flex items-center justify-center mx-auto mb-6">
                  <div className="text-2xl">🔍</div>
                </div>
                <p className="font-bodoni text-cocoa-500/70 italic text-contrast-high mb-4">
                  No se encontraron preguntas que coincidan con tu búsqueda.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="text-sage-600 hover:text-cocoa-600 hover:underline text-sm font-academy tracking-wide transition-all duration-300 hover:bg-sage-50/50 px-3 py-1 rounded-full"
                >
                  Mostrar todas las preguntas
                </button>
              </div>
            </FadeReveal>
          )}
        </StaggerReveal>

        <FadeReveal
          delay={SECTION_DELAYS.faq.cta}
          duration={DURATIONS.dramatic}
          direction="up"
          distance={30}
          className="text-center mobile-content-consistent mt-16"
        >
          <div className="relative mb-8">
            <CinematicReveal direction="iris" delay={0.4} duration={2.2}>
              <TextReveal
                delay={0.3}
                staggerDelay={0.12}
                className="text-2xl font-bodoni font-normal italic leading-body-elegant text-shadow-elegant text-cocoa-500 tracking-bodoni-elegant"
              >
                ¿Tienes otra pregunta? No dudes en contactarme directamente
              </TextReveal>
            </CinematicReveal>
            <FadeReveal
              delay={1.4}
              duration={1.2}
              direction="none"
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-sage-300 via-sage-400 to-sage-300 rounded-full"
            >
              <div></div>
            </FadeReveal>
          </div>

          <motion.div
            whileHover={{ y: -2, scale: 1.02 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Button
              variant="primary"
              size="lg"
              className="shadow-premium hover:shadow-luxury transition-all duration-500 px-8 py-4 text-lg relative overflow-hidden group"
              onClick={() => (window.location.href = "/contact")}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              <span className="relative z-10">Contactar</span>
            </Button>
          </motion.div>
        </FadeReveal>
      </div>
    </section>
  );
};

export default FAQ;
