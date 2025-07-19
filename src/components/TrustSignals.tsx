import React from "react";
import { motion } from "framer-motion";
import { Shield, Clock, Award, Users, Heart, CheckCircle } from "lucide-react";

const TrustSignals = () => {
  const trustElements = [
    {
      icon: Shield,
      title: "Ingredientes Premium",
      description:
        "Solo uso ingredientes de la más alta calidad, muchos importados directamente de Europa.",
      highlight: "100% Natural",
    },
    {
      icon: Clock,
      title: "Frescura Garantizada",
      description:
        "Cada postre se prepara máximo 24 horas antes de la entrega para asegurar frescura óptima.",
      highlight: "Recién Horneado",
    },
    {
      icon: Award,
      title: "Técnicas Artesanales",
      description:
        "Formación en repostería francesa clásica con más de 8 años perfeccionando cada técnica.",
      highlight: "Experiencia Comprobada",
    },
    {
      icon: Users,
      title: "127+ Clientes Felices",
      description:
        "Cada evento es único y cada cliente se convierte en parte de nuestra familia artesanal.",
      highlight: "Satisfacción 100%",
    },
  ];

  const certifications = [
    "Certificación en Manipulación de Alimentos",
    "Cocina Certificada por Salud Pública",
    "Ingredientes Trazables y Seguros",
    "Proceso de Higiene Estricto",
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-white to-cream/30">
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
            <div className="w-16 h-px bg-sage/40"></div>
            <span className="mx-4 text-sm font-academy text-sage/70 uppercase tracking-wider">
              Confianza y Calidad
            </span>
            <div className="w-16 h-px bg-sage/40"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-academy text-cocoa-500 mb-6">
            Tu <span className="text-sage-600 font-bold">Tranquilidad</span> es
            <span className="block text-sage-600 italic mt-2 font-bold">
              Mi Prioridad
            </span>
          </h2>

          <p className="text-lg text-cocoa-500/70 max-w-2xl mx-auto font-bodoni font-light leading-relaxed">
            Cada detalle importa cuando se trata de crear momentos especiales.
            Por eso me comprometo con los más altos estándares de calidad y
            servicio.
          </p>
        </motion.div>

        {/* Trust Elements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {trustElements.map((element, index) => {
            const IconComponent = element.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-sage/10 to-sage/20 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-105 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-sage-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 bg-sage-600 text-white text-xs px-2 py-1 rounded-full font-bodoni font-medium">
                    {element.highlight}
                  </div>
                </div>

                <h3 className="text-xl font-academy mb-3 font-medium">
                  <span className="text-sage-600 font-bold">
                    {element.title}
                  </span>
                </h3>

                <p className="text-cocoa-500/70 text-sm font-bodoni font-light leading-relaxed">
                  {element.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-sage/10 shadow-gentle"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-academy mb-4">
              Certificaciones y{" "}
              <span className="text-sage-600 font-bold">Estándares</span>
            </h3>
            <p className="text-cocoa-500/70 font-bodoni font-light">
              Cumplimos con todos los requisitos de seguridad alimentaria
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 bg-white/40 rounded-xl"
              >
                <CheckCircle className="w-5 h-5 text-sage-600 flex-shrink-0" />
                <span className="text-cocoa-500/80 font-bodoni text-sm">
                  {cert}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Promise Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-16 p-8 bg-gradient-to-r from-dusty-rose/5 to-warm-blush/5 rounded-2xl border border-dusty-rose/10"
        >
          <Heart className="w-12 h-12 text-dusty-rose mx-auto mb-6" />
          <h3 className="text-3xl font-academy mb-4">
            Mi Promesa{" "}
            <span className="text-dusty-rose font-bold">Personal</span>
          </h3>
          <p className="text-lg text-mocha/80 font-karla font-light leading-relaxed max-w-3xl mx-auto">
            "Cada postre que sale de mi cocina lleva mi nombre y mi reputación.
            Me comprometo a que tu experiencia sea tan especial como mis
            creaciones, desde el primer contacto hasta el último bocado."
          </p>
          <div className="mt-6">
            <p className="text-dusty-rose font-bodoni text-xl italic">
              — Con amor, el equipo de Cucinanostrard
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignals;
