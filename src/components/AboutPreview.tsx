import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const AboutPreview = () => {
  return (
    <section className="py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 animate-pulse-soft"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <motion.div
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-sage-200/30 to-sage-200/30 rounded-3xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300"></div>
              <img
                src="/images/placeholder-dessert.jpg"
                alt="Chef and team behind Cucina"
                className="relative w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-elegant hover:shadow-glow transition-all duration-300 group-hover:scale-105 border-4 border-white/50"
              />
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sage-200/40 rounded-full blur-2xl animate-pulse-soft"></div>
              <div className="absolute -top-6 -left-6 w-24 h-24 bg-sage-200/50 rounded-full blur-xl"></div>

              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out rounded-3xl"></div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            className="order-1 lg:order-2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
              <span className="mx-6 text-base font-academy text-sage-600 uppercase tracking-widest font-medium">
                Nuestra Historia
              </span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
            </div>

            <h2 className="text-5xl sm:text-6xl md:text-7xl font-academy mb-10 font-bold leading-tight">
              <span className="block text-cocoa-500 text-shadow-elegant">
                La pasión artesanal
              </span>
              <span className="block text-sage-500 italic font-academy mt-2 relative">
                detrás de Cucina
                <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"></div>
              </span>
            </h2>

            <div className="space-y-8 body-elegant text-xl leading-relaxed font-medium">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Lo que comenzó como tradición de repostería casera se ha
                convertido en algo hermoso—crear
                <span className="accent-sage font-semibold italic">
                  {" "}
                  momentos dulces
                </span>{" "}
                que se convierten en recuerdos entrañables.
              </motion.p>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                En nuestra cocina, trabajamos con ingredientes de temporada y
                técnicas artesanales, elaborando cada postre a mano. Sin atajos,
                sin sabores artificiales—solo
                <span className="accent-sage font-semibold italic">
                  {" "}
                  ingredientes puros
                </span>{" "}
                transformados en algo mágico.
              </motion.p>
            </div>

            <motion.div
              className="mt-12 p-8 bg-cream-100 backdrop-blur-sm rounded-3xl border border-sage shadow-cucina"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <blockquote className="text-2xl sm:text-3xl font-bodoni text-elegant italic text-center leading-relaxed">
                &ldquo;<span className="text-cocoa-500">No solo horneamos</span>
                &mdash;
                <span className="block mt-2 text-sage-600">
                  creamos pequeños momentos comestibles.&rdquo;
                </span>
              </blockquote>
            </motion.div>

            <motion.div
              className="mt-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
              viewport={{ once: true }}
            >
              <Link
                to="/about"
                className="group inline-flex items-center gap-3 text-sage-600 hover:text-sage-700 transition-all duration-300 font-academy font-semibold text-lg"
              >
                <span>Lee nuestra historia completa</span>
                <span className="group-hover:translate-x-2 transition-transform duration-300">
                  →
                </span>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
