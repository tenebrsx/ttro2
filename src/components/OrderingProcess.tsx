import { motion } from "framer-motion";
// Artisanal Icons - Custom brand-specific icons
import {
  HeartTalk,
  MagicWand,
  ArtisanBowl,
  PerfectGift,
} from "./icons/ArtisanalIcons";

const OrderingProcess = () => {
  const steps = [
    {
      icon: HeartTalk,
      title: "Compartamos tu Sueño",
      description:
        "Cada postre comienza con una historia. Cuéntame sobre ese momento especial que quieres celebrar, y juntas daremos vida a tu visión más hermosa.",
      details: "Conversación personalizada • Respuesta en 2 horas",
      color: "from-sage-300 to-cream-300",
      accent: "sage-500",
    },
    {
      icon: MagicWand,
      title: "Diseñemos la Magia",
      description:
        "Entre sabores que despiertan memorias y diseños que cuentan tu historia, crearemos el postre perfecto que hará brillar tu celebración única.",
      details: "Bocetos incluidos • Degustación disponible",
      color: "from-cream-300 to-sage-200",
      accent: "cocoa-500",
    },
    {
      icon: ArtisanBowl,
      title: "Artesanía con Alma",
      description:
        "En la quietud de mi cocina, cada ingrediente se transforma con paciencia y amor. Tu postre nace de técnicas tradicionales y pasión genuina.",
      details: "Fotos del proceso incluidas • Ingredientes premium",
      color: "from-sage-200 to-cream-200",
      accent: "sage-600",
    },
    {
      icon: PerfectGift,
      title: "El Momento Perfecto",
      description:
        "Cuando llega el día, entrego más que un postre: entrego una experiencia que permanecerá en el corazón de quienes lo prueben para siempre.",
      details: "Entrega puntual • Presentación impecable",
      color: "from-cream-200 to-sage-100",
      accent: "cocoa-600",
    },
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-cream-400 via-cream-300 to-cream-500 overflow-hidden">
      {/* Subtle background texture */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-10 left-10 w-32 h-32 bg-sage-200/20 rounded-full blur-xl pulse-soft"></div>
        <div className="absolute top-1/3 right-20 w-24 h-24 bg-cocoa-200/20 rounded-full blur-lg float-gentle"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-sage-100/30 rounded-full blur-2xl pulse-soft-delayed"></div>
        <div className="absolute bottom-10 right-10 w-28 h-28 bg-cream-200/40 rounded-full blur-xl float-gentle-delayed"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400/60 to-transparent"></div>
            <div className="mx-6 flex items-center space-x-2">
              <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
              <span className="text-sm font-bodoni text-cocoa-500/70 uppercase tracking-wide font-normal">
                Nuestra Historia Juntas
              </span>
              <div className="w-2 h-2 bg-sage-400 rounded-full"></div>
            </div>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400/60 to-transparent"></div>
          </div>

          <motion.h2
            className="font-academy text-5xl sm:text-6xl md:text-7xl text-cocoa-500 mb-6 leading-elegant tracking-academy-hero -mt-2"
            style={{
              fontFamily: '"Academy Engraved LET", serif',
              fontWeight: 400,
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            De la Idea al
            <span
              className="block font-academy text-4xl sm:text-5xl md:text-6xl text-sage-500 mt-2 relative leading-elegant tracking-academy-subhead"
              style={{
                fontFamily: '"Academy Engraved LET", serif',
                fontWeight: 400,
              }}
            >
              Momento Perfecto
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-cocoa-300 rounded-full"></div>
            </span>
          </motion.h2>

          <motion.p
            className="font-bodoni text-xl sm:text-2xl max-w-3xl mx-auto leading-relaxed mt-8"
            style={{
              fontFamily: '"Bodoni Moda", "Bodoni 72", serif',
              fontWeight: 400,
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Cada postre que creamos es una promesa: transformar tus sueños en
            realidad tangible, donde cada bocado cuenta una historia y cada
            detalle susurra
            <span
              className="font-bodoni mx-1 italic font-normal tracking-bodoni-elegant"
              style={{ color: "rgba(146, 155, 154, 0.7)" }}
            >
              el amor artesanal
            </span>
            que solo las manos cuidadosas pueden ofrecer.
          </motion.p>
        </motion.div>

        {/* Process Steps - Organic Flow */}
        <div className="relative mb-24">
          {/* Flowing Connection Path */}
          <div className="hidden lg:block absolute inset-0 z-0">
            <svg
              className="w-full h-full"
              viewBox="0 0 1200 400"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M50 200 Q 350 120, 400 200 T 800 200 Q 1050 280, 1150 200"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                className="opacity-40 flowing-path"
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#929b9a" />
                  <stop offset="50%" stopColor="#372813" />
                  <stop offset="100%" stopColor="#929b9a" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16 relative z-10">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.8,
                    delay: index * 0.15,
                    type: "spring",
                    bounce: 0.3,
                  }}
                  className="group relative"
                >
                  {/* Refined Background Card */}
                  <div className="bg-gradient-to-b from-white/95 to-cream-50/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 shadow-inner border border-sage-100/40 group-hover:border-sage-200/60 transition-all duration-500 hover:shadow-lg hover:-translate-y-1 relative overflow-hidden">
                    {/* Subtle gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-sage-50/30 via-transparent to-cream-100/20 rounded-2xl"></div>

                    {/* Elegant Icon */}
                    <div className="relative mb-10 flex justify-center z-10">
                      <div
                        className={`relative w-24 h-24 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-md group-hover:scale-105 transition-all duration-500`}
                      >
                        <IconComponent
                          className={`text-${step.accent}`}
                          size={48}
                        />
                        {/* Subtle number indicator */}
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-sage-200/80 text-cocoa-600 rounded-full flex items-center justify-center text-xs font-bodoni font-medium backdrop-blur-sm">
                          {index + 1}
                        </div>
                      </div>
                    </div>

                    <div className="text-center space-y-6 relative z-10">
                      <h3
                        className="font-academy text-2xl text-cocoa-600 leading-elegant tracking-academy-normal"
                        style={{
                          fontFamily: '"Academy Engraved LET", serif',
                          fontWeight: 400,
                        }}
                      >
                        {step.title}
                      </h3>

                      <p
                        className="font-bodoni text-base leading-relaxed text-cocoa-500/90"
                        style={{
                          fontFamily: '"Bodoni Moda", "Bodoni 72", serif',
                          fontWeight: 400,
                        }}
                      >
                        {step.description}
                      </p>

                      {/* Refined details caption */}
                      <div className="pt-6">
                        <div
                          className="bg-sage-50/50 text-cocoa-500/80 px-4 py-3 rounded-xl text-sm font-bodoni italic mx-auto inline-block border border-sage-100/30"
                          style={{
                            fontFamily: '"Bodoni Moda", "Bodoni 72", serif',
                            fontWeight: 400,
                          }}
                        >
                          {step.details}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mobile divider */}
                  {index < steps.length - 1 && (
                    <div className="md:hidden mt-8 flex justify-center">
                      <div className="w-12 h-px bg-gradient-to-r from-transparent via-sage-300 to-transparent"></div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

// Export the OrderingProcess component with artisanal icons
export default OrderingProcess;
