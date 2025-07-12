import { useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
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
    <section className="py-16 md:py-20 bg-gradient-to-br from-cream-400 to-cream-500">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 md:w-16 h-px bg-sage/40"></div>
            <span className="mx-4 text-sm font-karla text-sage/70 uppercase tracking-wider">
              Preguntas Frecuentes
            </span>
            <div className="w-12 md:w-16 h-px bg-sage/40"></div>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-playfair text-black-bold text-shadow-elegant mb-6">
            Preguntas que
            <span className="block text-dusty-rose-elegant italic mt-2 font-bold">
              Endulzan las Dudas
            </span>
          </h2>

          <div className="w-24 h-px bg-sage/40 mx-auto mb-6"></div>

          <p className="text-base md:text-lg body-elegant font-light leading-relaxed">
            Respuestas a las preguntas más comunes sobre pedidos personalizados
          </p>
        </motion.div>

        {/* Search and filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar pregunta..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 rounded-xl bg-elegant-cream backdrop-blur-sm border border-dusty-rose focus:border-dusty-rose focus:ring-1 focus:ring-dusty-rose/20 font-karla body-elegant placeholder-mocha/40 shadow-dusty-rose transition-all duration-300 focus:shadow-warm"
            />
            <Search className="absolute left-3 top-3.5 w-4 h-4 text-mocha/40" />
          </div>

          <div className="flex flex-wrap gap-2 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-3 py-1.5 text-xs md:text-sm rounded-full font-karla transition-all duration-300 ${activeCategory === category.id ? "bg-dusty-rose-gradient text-white shadow-dusty-rose" : "bg-elegant-cream body-elegant hover:bg-white hover:text-dusty-rose"}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filteredFAQItems.length > 0 ? (
            filteredFAQItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-elegant-cream backdrop-blur-sm rounded-2xl border border-dusty-rose overflow-hidden shadow-dusty-rose hover:shadow-warm transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 text-left flex items-center justify-between hover:bg-dusty-rose/5 transition-colors duration-200"
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-base md:text-lg font-playfair text-black-bold text-shadow-elegant font-medium pr-4">
                    {item.question}
                  </h3>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-dusty-rose flex-shrink-0" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 md:px-6 pb-4">
                        <div className="w-full h-px bg-dusty-rose/20 my-3 md:mb-4"></div>
                        <p className="text-sm md:text-base body-elegant font-light leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-8"
            >
              <p className="body-elegant font-karla italic">
                No se encontraron preguntas que coincidan con tu búsqueda.
              </p>
              <button
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="mt-4 text-dusty-rose hover:underline text-sm"
              >
                Mostrar todas las preguntas
              </button>
            </motion.div>
          )}
        </div>

        <motion.div
          className="text-center mt-10 md:mt-12"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="body-elegant font-karla font-light italic">
            ¿Tienes otra pregunta? No dudes en contactarme directamente
          </p>
          <Button
            variant="primary"
            size="sm"
            className="mt-4"
            onClick={() => (window.location.href = "/contact")}
          >
            Contactar
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
