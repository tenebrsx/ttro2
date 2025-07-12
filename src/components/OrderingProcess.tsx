import { motion } from "framer-motion";
import {
  MessageCircle,
  Calendar,
  ChefHat,
  Truck,
  Star,
  Clock,
} from "lucide-react";

const OrderingProcess = () => {
  const steps = [
    {
      icon: MessageCircle,
      title: "Conversemos",
      description:
        "Contáctame por WhatsApp para contarme sobre tu evento especial y tus ideas.",
      details: "Respondo en menos de 2 horas",
      color: "from-dusty-rose to-warm-blush",
    },
    {
      icon: Calendar,
      title: "Planifiquemos",
      description:
        "Juntos definimos sabores, diseño, cantidad y fecha de entrega perfecta.",
      details: "Cotización personalizada gratuita",
      color: "from-warm-blush to-soft-rose",
    },
    {
      icon: ChefHat,
      title: "Creo tu Dulce",
      description:
        "Con amor y dedicación, preparo tu postre usando solo ingredientes premium.",
      details: "Fotos del proceso incluidas",
      color: "from-soft-rose to-sage",
    },
    {
      icon: Truck,
      title: "Entrega Perfecta",
      description:
        "Llevo tu postre directamente a tu evento, fresco y listo para disfrutar.",
      details: "Puntualidad garantizada",
      color: "from-sage to-dusty-rose",
    },
  ];

  const guarantees = [
    {
      icon: Star,
      title: "Satisfacción 100%",
      description:
        "Si no estás completamente feliz, trabajamos juntos hasta lograrlo.",
    },
    {
      icon: Clock,
      title: "Entrega Puntual",
      description:
        "Tu evento es importante. Siempre llego a tiempo, sin excepciones.",
    },
    {
      icon: ChefHat,
      title: "Calidad Premium",
      description:
        "Solo uso ingredientes de primera calidad para resultados excepcionales.",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-dusty-rose/40"></div>
            <span className="mx-4 text-sm font-karla text-dusty-rose/70 uppercase tracking-wider">
              Proceso Simple
            </span>
            <div className="w-16 h-px bg-dusty-rose/40"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-playfair text-black-bold text-shadow-elegant mb-6">
            De la Idea al
            <span className="block text-dusty-rose-elegant italic mt-2">
              Momento Perfecto
            </span>
          </h2>

          <p className="text-lg body-elegant max-w-2xl mx-auto font-light leading-relaxed">
            Hacer tu pedido es tan fácil como enviar un mensaje. Te acompaño en
            cada paso para crear exactamente lo que sueñas.
          </p>
        </motion.div>

        {/* Process Steps */}
        <div className="relative mb-20">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-dusty-rose/20 via-dusty-rose/40 to-dusty-rose/20 transform -translate-y-1/2 z-0"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  className="text-center group"
                >
                  {/* Step Number */}
                  <div className="relative mb-6">
                    <div
                      className={`w-24 h-24 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto shadow-lg group-hover:scale-105 transition-transform duration-300`}
                    >
                      <IconComponent className="w-10 h-10 text-dusty-rose" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-mocha text-white rounded-full flex items-center justify-center text-sm font-karla font-bold">
                      {index + 1}
                    </div>
                  </div>

                  <h3 className="text-xl font-playfair text-black-bold text-shadow-elegant mb-3 font-medium">
                    {step.title}
                  </h3>

                  <p className="body-elegant text-sm font-light leading-relaxed mb-3">
                    {step.description}
                  </p>

                  <div className="inline-block bg-dusty-rose-gradient text-white px-3 py-1 rounded-full text-xs font-karla font-medium shadow-dusty-rose">
                    {step.details}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 p-8 bg-elegant-cream rounded-2xl border border-dusty-rose shadow-dusty-rose"
        >
          <h3 className="text-3xl font-playfair text-black-bold text-shadow-elegant mb-4">
            ¿Listo para Comenzar?
          </h3>
          <p className="text-lg body-elegant font-light mb-6 max-w-2xl mx-auto">
            Solo necesitas una idea y yo me encargo del resto. Conversemos sobre
            tu próximo evento especial.
          </p>
          <motion.a
            href="https://wa.me/18095551234?text=Hola! Me interesa hacer un pedido personalizado"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white px-8 py-4 rounded-full text-lg font-playfair font-bold shadow-lg hover:shadow-xl transition-all duration-300 hover:from-dusty-rose-600 hover:to-dusty-rose-700"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageCircle className="w-5 h-5" />
            <span>Empezar mi Pedido</span>
          </motion.a>
        </motion.div>

        {/* Guarantees */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {guarantees.map((guarantee, index) => {
            const IconComponent = guarantee.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 bg-elegant-cream backdrop-blur-sm rounded-2xl border border-dusty-rose shadow-dusty-rose hover:shadow-warm transition-all duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-dusty-rose/10 to-warm-blush/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <IconComponent className="w-8 h-8 text-dusty-rose" />
                </div>

                <h4 className="text-lg font-playfair text-black-bold text-shadow-elegant mb-2 font-medium">
                  {guarantee.title}
                </h4>

                <p className="body-elegant text-sm font-light leading-relaxed">
                  {guarantee.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OrderingProcess;
