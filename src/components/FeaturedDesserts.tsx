import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { formatPriceFrom, formatPriceWithUnit } from "../utils/currency";
import { useFeaturedProducts } from "../contexts/FirebaseProductsContext";
import {
  FadeReveal,
  StaggerReveal,
  StaggerChild,
  TextReveal,
  CinematicReveal,
} from "./animations/SophisticatedAnimations";

import EnhancedDessertCard from "./EnhancedDessertCard";

const FeaturedDesserts = () => {
  const { featuredProducts, loading, error } = useFeaturedProducts();

  const featuredDesserts = featuredProducts.slice(0, 4).map((product) => ({
    id: product.id,
    name: product.name,
    description: product.description,
    image:
      product.thumbnailImage ||
      product.images[0] ||
      "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
    price: product.price,
    priceDisplay: formatPriceWithUnit(
      product.price,
      (product as any).priceUnit,
    ),
    story: product.shortDescription,
    rating: product.rating,
    preparationTime: product.preparationTime,
    tags: product.tags,
    popularity: "bestseller" as const,
  }));

  const handleWhatsAppOrder = (dessert: (typeof featuredDesserts)[0]) => {
    const message = `Hola! Me interesa ordenar: ${dessert.name} - ${dessert.priceDisplay}`;
    const whatsappUrl = `https://api.whatsapp.com/send/?phone=18096581245&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
    window.open(whatsappUrl, "_blank");
  };

  // Show loading state
  if (loading) {
    return (
      <section className="featured-desserts py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden scroll-optimized">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <CinematicReveal direction="center" delay={0.2} duration={1.2}>
              <div className="h-8 bg-sage-200/50 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-sage-100/50 rounded w-96 mx-auto mb-8"></div>
            </CinematicReveal>
            <StaggerReveal
              staggerDelay={0.2}
              className="grid grid-cols-1 lg:grid-cols-3 gap-10"
            >
              {[1, 2, 3, 4].map((i) => (
                <StaggerChild key={i} className="bg-white/90 rounded-3xl p-6">
                  <div className="h-56 bg-gray-200/50 rounded-t-3xl mb-4"></div>
                  <div className="h-6 bg-gray-200/50 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-10 bg-gray-200 rounded"></div>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error) {
    return (
      <section className="featured-desserts py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden scroll-optimized">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <FadeReveal delay={0.4} duration={1.2} direction="none">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
                <span className="mx-6 text-base font-academy text-sage-600 uppercase tracking-widest font-medium">
                  Los Más Pedidos
                </span>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
              </div>
            </FadeReveal>

            <div className="mb-8">
              <TextReveal
                delay={0.3}
                staggerDelay={0.2}
                className="text-5xl sm:text-6xl md:text-7xl font-academy leading-elegant block text-cocoa-500 text-shadow-elegant tracking-academy-hero"
              >
                Deliciosos postres
              </TextReveal>
              <div className="mt-2 relative">
                <TextReveal
                  delay={0.5}
                  staggerDelay={0.2}
                  className="text-3xl sm:text-4xl md:text-5xl font-academy leading-elegant block text-sage-500 italic tracking-academy-subhead"
                >
                  hechos con amor
                </TextReveal>
              </div>
            </div>

            <FadeReveal delay={0.6} duration={0.8} direction="up" distance={20}>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft border border-sage-100/50 p-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-2xl">⚠️</div>
                  </div>
                  <h3 className="text-2xl font-academy text-cocoa-500 font-normal mb-4 leading-elegant tracking-academy-normal">
                    Error al cargar los postres
                  </h3>
                  <p className="text-lg font-bodoni text-cocoa-500/80 mb-6 leading-body-elegant font-normal">
                    Hubo un problema al conectar con nuestro catálogo de
                    postres. Por favor, intenta recargar la página o contacta
                    con nosotros.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-6 py-3 rounded-button font-bodoni font-medium shadow-premium hover:shadow-luxury transition-all duration-500 tracking-button-refined btn-contrast-high"
                    >
                      <span>Recargar</span>
                    </button>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-white text-sage-600 border-2 border-sage-600 hover:bg-sage-50 px-6 py-3 rounded-button font-bodoni font-medium transition-all duration-500 tracking-button-refined btn-contrast-high"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Contactar</span>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeReveal>
          </div>
        </div>
      </section>
    );
  }

  // Show empty state if no featured products
  if (featuredDesserts.length === 0) {
    return (
      <section className="featured-desserts py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <FadeReveal delay={0.4} duration={0.8} direction="none">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
                <span className="mx-6 text-base font-academy text-sage-600 uppercase tracking-widest font-medium">
                  Los Más Pedidos
                </span>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
              </div>
            </FadeReveal>

            <div className="mb-8">
              <TextReveal
                delay={0.3}
                staggerDelay={0.2}
                className="text-5xl sm:text-6xl md:text-7xl font-academy leading-elegant block text-cocoa-500 text-shadow-elegant tracking-academy-hero"
              >
                Deliciosos postres
              </TextReveal>
              <div className="mt-2 relative">
                <TextReveal
                  delay={0.5}
                  staggerDelay={0.2}
                  className="text-3xl sm:text-4xl md:text-5xl font-academy leading-elegant block text-sage-500 italic tracking-academy-subhead"
                >
                  hechos con amor
                </TextReveal>
                <FadeReveal
                  delay={0.7}
                  duration={0.8}
                  direction="none"
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
                >
                  <div></div>
                </FadeReveal>
              </div>
            </div>

            <FadeReveal delay={0.3} duration={0.6} direction="up" distance={20}>
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-premium border border-dusty-rose-100/50 p-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-dusty-rose-100 to-warm-blush-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-2xl">🍰</div>
                  </div>
                  <h3 className="text-2xl font-academy text-cocoa-500 font-normal mb-4 leading-elegant tracking-academy-normal">
                    No hay postres disponibles aún
                  </h3>
                  <p className="text-lg font-bodoni text-cocoa-500/80 mb-6 leading-body-elegant font-normal">
                    Estamos preparando deliciosos postres artesanales para ti.
                    Regresa pronto para descubrir nuestras creaciones más
                    especiales.
                  </p>
                  <div className="flex justify-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-8 py-3 rounded-button font-bodoni font-medium shadow-premium hover:shadow-luxury transition-all duration-500 tracking-button-refined"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>Contactar para Pedidos</span>
                    </Link>
                  </div>
                </div>
              </div>
            </FadeReveal>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="featured-desserts py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <FadeReveal delay={0.4} duration={0.8} direction="none">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
              <span className="mx-6 text-base font-bodoni text-sage-600 uppercase tracking-widest font-medium">
                Los Más Pedidos
              </span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
            </div>
          </FadeReveal>

          <div className="mb-8">
            <TextReveal
              delay={0.3}
              staggerDelay={0.2}
              className="text-5xl sm:text-6xl md:text-7xl font-academy font-normal leading-elegant block text-cocoa-500 text-shadow-elegant tracking-academy-hero"
            >
              Sabores que
            </TextReveal>
            <div className="mt-2 relative">
              <TextReveal
                delay={0.5}
                staggerDelay={0.2}
                className="text-5xl sm:text-6xl md:text-7xl font-academy font-normal leading-elegant block text-sage-500 italic tracking-academy-hero"
              >
                Enamoran
              </TextReveal>
              <FadeReveal
                delay={0.7}
                duration={0.8}
                direction="none"
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
              >
                <div></div>
              </FadeReveal>
            </div>
          </div>

          <FadeReveal delay={0.6} duration={0.8} direction="up" distance={30}>
            <p className="text-xl sm:text-2xl font-bodoni max-w-3xl mx-auto leading-body-elegant font-normal">
              Estos son los postres artesanales que más solicitan nuestros
              clientes. Cada uno está hecho con ingredientes de calidad y el
              amor de la
              <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                {" "}
                repostería casera
              </span>
              .
            </p>
          </FadeReveal>
        </div>

        <StaggerReveal
          staggerDelay={0.2}
          childDelay={0.3}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {featuredDesserts.map((dessert, index) => (
            <StaggerChild key={index}>
              <EnhancedDessertCard
                id={dessert.id}
                name={dessert.name}
                image={dessert.image}
                price={dessert.priceDisplay}
                story={dessert.story}
                preparationTime={dessert.preparationTime}
                onClick={() => handleWhatsAppOrder(dessert)}
              />
            </StaggerChild>
          ))}
        </StaggerReveal>

        <FadeReveal
          delay={0.65}
          duration={1.0}
          direction="up"
          distance={30}
          className="text-center mt-20"
        >
          <div className="relative mb-12">
            <CinematicReveal direction="iris" delay={0.39} duration={1.5}>
              <TextReveal
                delay={0.26}
                staggerDelay={0.08}
                className="text-2xl font-bodoni font-normal italic leading-body-elegant text-shadow-elegant text-cocoa-500 tracking-bodoni-elegant"
              >
                Cada postre cuenta una historia de tradición y sabor
              </TextReveal>
            </CinematicReveal>
            <FadeReveal
              delay={0.78}
              duration={0.8}
              direction="none"
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-sage-300 via-sage-400 to-sage-300 rounded-full"
            >
              <div></div>
            </FadeReveal>
          </div>

          <motion.div
            whileHover={{ y: -2 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-12 py-5 rounded-3xl text-xl font-bodoni font-medium shadow-warm hover:shadow-glow transition-all duration-500 relative overflow-hidden group tracking-button-refined"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
              <span className="relative z-10">Ver Todos Nuestros Postres</span>
            </Link>
          </motion.div>
        </FadeReveal>
      </div>
    </section>
  );
};

export default FeaturedDesserts;
