import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { formatPriceFrom } from "../utils/currency";
import { useFeaturedProducts } from "../contexts/FirebaseProductsContext";
import {
  FadeReveal,
  StaggerReveal,
  StaggerChild,
  HoverLift,
  ScaleHover,
  TextReveal,
  SophisticatedButton,
  CinematicReveal,
  HolographicShimmer,
  PremiumReveal,
} from "./animations/SophisticatedAnimations";

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
    priceDisplay: formatPriceFrom(product.price),
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
      <section className="py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden">
        <HolographicShimmer
          intensity={0.2}
          color="dusty-rose"
          direction="diagonal"
          trigger="visible"
          speed={4}
          className="absolute inset-0"
        >
          <div></div>
        </HolographicShimmer>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <CinematicReveal direction="center" delay={0.2} duration={1.0}>
              <div className="h-8 bg-dusty-rose-200/50 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-dusty-rose-100/50 rounded w-96 mx-auto mb-8"></div>
            </CinematicReveal>
            <StaggerReveal
              staggerDelay={0.1}
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
      <section className="py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <FadeReveal delay={0.2} duration={0.8} direction="none">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
                <span className="mx-6 text-base font-karla text-dusty-rose-600 uppercase tracking-widest font-medium">
                  Los Más Pedidos
                </span>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
              </div>
            </FadeReveal>

            <div className="mb-8">
              <TextReveal
                delay={0.6}
                staggerDelay={0.1}
                className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold leading-tight block text-black-bold text-shadow-elegant"
              >
                Sabores que
              </TextReveal>
              <div className="mt-2 relative">
                <TextReveal
                  delay={1.2}
                  staggerDelay={0.12}
                  className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold leading-tight block text-dusty-rose-elegant italic"
                >
                  Enamoran
                </TextReveal>
              </div>
            </div>

            <FadeReveal delay={1.8} duration={1.0} direction="up" distance={20}>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft border border-dusty-rose-100/50 p-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-2xl">⚠️</div>
                  </div>
                  <h3 className="text-2xl font-playfair text-black-bold font-bold mb-4">
                    Error al cargar los postres
                  </h3>
                  <p className="text-lg body-elegant text-warm-grey-600 mb-6 leading-relaxed">
                    Hubo un problema al conectar con nuestro catálogo de
                    postres. Por favor, intenta recargar la página o contacta
                    con nosotros.
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => window.location.reload()}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white px-6 py-3 rounded-2xl font-karla font-semibold shadow-warm hover:shadow-glow transition-all duration-500"
                    >
                      <span>Recargar</span>
                    </button>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-white text-dusty-rose-600 border-2 border-dusty-rose-600 hover:bg-dusty-rose-50 px-6 py-3 rounded-2xl font-karla font-semibold transition-all duration-500"
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
      <section className="py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden">
        <HolographicShimmer
          intensity={0.2}
          color="dusty-rose"
          direction="diagonal"
          trigger="visible"
          speed={4}
          className="absolute inset-0"
        >
          <div></div>
        </HolographicShimmer>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <FadeReveal delay={0.2} duration={0.8} direction="none">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
                <span className="mx-6 text-base font-karla text-dusty-rose-600 uppercase tracking-widest font-medium">
                  Los Más Pedidos
                </span>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
              </div>
            </FadeReveal>

            <div className="mb-8">
              <TextReveal
                delay={0.6}
                staggerDelay={0.1}
                className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold leading-tight block text-black-bold text-shadow-elegant"
              >
                Sabores que
              </TextReveal>
              <div className="mt-2 relative">
                <TextReveal
                  delay={1.2}
                  staggerDelay={0.12}
                  className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold leading-tight block text-dusty-rose-elegant italic"
                >
                  Enamoran
                </TextReveal>
                <FadeReveal
                  delay={1.8}
                  duration={0.8}
                  direction="none"
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-dusty-rose-300 to-warm-blush-300 rounded-full"
                >
                  <div></div>
                </FadeReveal>
              </div>
            </div>

            <FadeReveal delay={2.2} duration={1.0} direction="up" distance={20}>
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft border border-dusty-rose-100/50 p-12 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-dusty-rose-100 to-warm-blush-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <div className="text-2xl">🍰</div>
                  </div>
                  <h3 className="text-2xl font-playfair text-black-bold font-bold mb-4">
                    No hay postres disponibles aún
                  </h3>
                  <p className="text-lg body-elegant text-warm-grey-600 mb-6 leading-relaxed">
                    Estamos preparando deliciosos postres artesanales para ti.
                    Regresa pronto para descubrir nuestras creaciones más
                    especiales.
                  </p>
                  <div className="flex justify-center">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white px-8 py-3 rounded-2xl font-karla font-semibold shadow-warm hover:shadow-glow transition-all duration-500"
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
    <section className="py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden">
      <HolographicShimmer
        intensity={0.2}
        color="dusty-rose"
        direction="diagonal"
        trigger="visible"
        speed={4}
        className="absolute inset-0"
      >
        <div></div>
      </HolographicShimmer>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-20">
          <FadeReveal delay={0.2} duration={0.8} direction="none">
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
              <span className="mx-6 text-base font-karla text-dusty-rose-600 uppercase tracking-widest font-medium">
                Los Más Pedidos
              </span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
            </div>
          </FadeReveal>

          <div className="mb-8">
            <TextReveal
              delay={0.6}
              staggerDelay={0.1}
              className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold leading-tight block text-black-bold text-shadow-elegant"
            >
              Sabores que
            </TextReveal>
            <div className="mt-2 relative">
              <TextReveal
                delay={1.2}
                staggerDelay={0.12}
                className="text-5xl sm:text-6xl md:text-7xl font-playfair font-bold leading-tight block text-dusty-rose-elegant italic"
              >
                Enamoran
              </TextReveal>
              <FadeReveal
                delay={1.8}
                duration={0.8}
                direction="none"
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-dusty-rose-300 to-warm-blush-300 rounded-full"
              >
                <div></div>
              </FadeReveal>
            </div>
          </div>

          <FadeReveal delay={2.2} duration={1.0} direction="up" distance={20}>
            <p className="text-xl sm:text-2xl body-elegant max-w-3xl mx-auto leading-relaxed font-medium">
              Estos son los postres que mis clientes piden una y otra vez. Los
              que han acompañado sus celebraciones más importantes y se han
              convertido en
              <span className="accent-dusty-rose font-semibold italic">
                {" "}
                tradiciones familiares
              </span>
              .
            </p>
          </FadeReveal>
        </div>

        <StaggerReveal
          staggerDelay={0.15}
          childDelay={0.8}
          className="grid grid-cols-1 lg:grid-cols-3 gap-10"
        >
          {featuredDesserts.map((dessert, index) => (
            <StaggerChild key={index}>
              <PremiumReveal effect="cinematic-shimmer" delay={index * 0.2}>
                <HoverLift liftHeight={12} duration={0.4}>
                  <ScaleHover scale={1.02} duration={0.3}>
                    <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-500 overflow-hidden group border border-dusty-rose-100/50">
                      <div className="relative overflow-hidden rounded-t-3xl">
                        <img
                          src={dessert.image}
                          alt={dessert.name}
                          className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        {/* Subtle shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                        {/* Price overlay on hover */}
                        <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-dusty-rose-600 px-3 py-2 rounded-xl font-cormorant font-bold text-lg opacity-0 group-hover:opacity-100 transition-all duration-500 shadow-gentle transform translate-y-2 group-hover:translate-y-0">
                          {dessert.priceDisplay}
                        </div>
                      </div>

                      <div className="p-8">
                        <div className="mb-4">
                          <h3 className="text-2xl font-playfair text-black-bold font-bold leading-tight">
                            {dessert.name}
                          </h3>
                        </div>

                        <p className="body-elegant text-base mb-6 line-clamp-3 leading-relaxed">
                          {dessert.description}
                        </p>

                        <div className="flex items-center justify-between mb-5">
                          <p className="text-dusty-rose-elegant font-bold text-2xl font-playfair">
                            {dessert.priceDisplay}
                          </p>
                          <span className="text-sm text-warm-grey-500 bg-cream-100 px-3 py-2 rounded-xl font-karla font-medium">
                            {dessert.preparationTime}
                          </span>
                        </div>

                        <div className="bg-elegant-cream p-4 rounded-2xl mb-6 border border-dusty-rose">
                          <p className="text-sm body-elegant italic leading-relaxed text-shadow-elegant">
                            {dessert.story}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <Link
                            to={`/product/${dessert.id}`}
                            className="flex-1 text-center bg-gradient-to-r from-cream-100 to-warm-ivory text-mocha py-3 px-5 rounded-2xl font-karla font-semibold hover:from-dusty-rose-100 hover:to-warm-blush-100 hover:text-dusty-rose-700 transition-all duration-500 text-base shadow-gentle hover:shadow-warm border border-dusty-rose-100/30 hover:-translate-y-0.5"
                          >
                            Ver Detalles
                          </Link>
                          <SophisticatedButton
                            onClick={() => handleWhatsAppOrder(dessert)}
                            variant="primary"
                            className="py-3 px-4 text-sm flex items-center space-x-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            <span>Ordenar</span>
                          </SophisticatedButton>
                        </div>
                      </div>
                    </div>
                  </ScaleHover>
                </HoverLift>
              </PremiumReveal>
            </StaggerChild>
          ))}
        </StaggerReveal>

        <FadeReveal
          delay={0.5}
          duration={1.0}
          direction="up"
          distance={30}
          className="text-center mt-20"
        >
          <div className="relative mb-12">
            <CinematicReveal direction="iris" delay={0.3} duration={1.5}>
              <TextReveal
                delay={0.2}
                staggerDelay={0.08}
                className="text-2xl text-elegant font-medium italic leading-relaxed text-shadow-elegant"
              >
                Cada postre es una carta de amor escrita con azúcar
              </TextReveal>
            </CinematicReveal>
            <FadeReveal
              delay={1.0}
              duration={0.8}
              direction="none"
              className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-dusty-rose-300 via-warm-blush-300 to-dusty-rose-300 rounded-full"
            >
              <div></div>
            </FadeReveal>
          </div>

          <HolographicShimmer
            intensity={0.4}
            color="white"
            direction="horizontal"
            trigger="hover"
            speed={2}
          >
            <HoverLift liftHeight={4} duration={0.3}>
              <Link
                to="/menu"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white px-12 py-5 rounded-3xl text-xl font-karla font-bold shadow-warm hover:shadow-glow transition-all duration-500 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                <span className="relative z-10">
                  Explorar Todos Mis Postres
                </span>
              </Link>
            </HoverLift>
          </HolographicShimmer>
        </FadeReveal>
      </div>
    </section>
  );
};

export default FeaturedDesserts;
