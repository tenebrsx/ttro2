import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FadeInUp } from "../components/animations/AnimationComponents";
import {
  HandDrawnDivider,
  HandwrittenAccent,
} from "../components/animations/TextureComponents";
import {
  CinematicReveal,
  HolographicShimmer,
  PremiumReveal,
  FadeReveal,
  TextReveal,
} from "../components/animations/SophisticatedAnimations";
import * as TextureComponents from "../components/animations/TextureComponents";
import { MessageCircle } from "lucide-react";

import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";
import { useProducts } from "../contexts/FirebaseProductsContext";
import { formatPriceFrom } from "../utils/currency";

const Menu = () => {
  const { products, loading } = useProducts();

  // Use Firebase products data with real-time updates
  const menuItems = products
    .filter((product) => product.available)
    .map((product) => ({
      id: product.id,
      category: product.featured ? "mas-amor" : product.category,
      type: product.subcategory || product.category,
      name: product.name,
      description: product.description,
      story: `${product.shortDescription} - ${product.preparationTime} de preparación.`,
      image:
        product.thumbnailImage ||
        product.images[0] ||
        "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      priceRange: formatPriceFrom(product.price),
      tags: [...product.tags, "todos"],
      rating: product.rating,
      preparationTime: product.preparationTime,
      serves: product.serves,
      addOns: product.customizations.map((custom) => ({
        name: custom,
        price: Math.floor(Math.random() * 15) + 5,
      })),
    }));

  // Debug logging to track product IDs
  console.log("🍰 Menu page - Products loaded:", products.length);
  console.log("🍰 Menu page - Menu items created:", menuItems.length);
  console.log(
    "🍰 Menu page - Sample menu item IDs:",
    menuItems.slice(0, 3).map((item) => ({ id: item.id, name: item.name })),
  );

  // Show loading state while products are being fetched
  if (loading) {
    return (
      <>
        <SEO
          title="Menú Postres Artesanales | Precios Pesos Dominicanos | Cucinanostrard Santo Domingo"
          description="🍰 Menú completo de postres artesanales en Santo Domingo, RD. Macarons franceses desde RD$150, tartas personalizadas desde RD$1,500, cupcakes gourmet RD$350. Ingredientes premium importados, técnicas parisinas, sabores dominicanos. Entrega en DN y Santiago."
          keywords={[
            "menú postres artesanales santo domingo",
            "precios macarons república dominicana",
            "tartas personalizadas precios RD",
            "cupcakes gourmet santo domingo precio",
            "repostería francesa menú dominicana",
            "postres artesanales precios pesos dominicanos",
            "macarons auténticos precio RD",
            "menú repostería santo domingo",
            "tartas bodas precio república dominicana",
            "postres franceses menú RD",
            "cupcakes personalizados precio santo domingo",
            "repostería gourmet menú dominicana",
          ]}
          image="/images/menu-postres-cucinanostrard-rd.jpg"
          type="website"
          price={150}
          currency="DOP"
        />
        <PageTransition>
          <div className="pt-16">
            <section className="relative py-20 bg-gradient-to-br from-cream-400 to-cream-500 overflow-hidden">
              <HolographicShimmer
                intensity={0.2}
                color="dusty-rose"
                direction="diagonal"
                trigger="visible"
                speed={4}
                className="absolute inset-0"
              />
              <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <div className="animate-pulse">
                    <div className="h-8 bg-dusty-rose-200 rounded w-64 mx-auto mb-4"></div>
                    <div className="h-4 bg-dusty-rose-100 rounded w-96 mx-auto mb-8"></div>
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="bg-white/90 rounded-3xl p-6 animate-pulse"
                      >
                        <div className="h-56 bg-gray-200 rounded-t-3xl mb-4"></div>
                        <div className="h-6 bg-gray-200 rounded mb-2"></div>
                        <div className="h-4 bg-gray-200 rounded mb-4"></div>
                        <div className="h-10 bg-gray-200 rounded"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        </PageTransition>
      </>
    );
  }

  return (
    <>
      <SEO
        title="Menú Postres Artesanales | Precios Pesos Dominicanos | Cucinanostrard Santo Domingo"
        description="🍰 Menú completo de postres artesanales en Santo Domingo, RD. Macarons franceses desde RD$150, tartas personalizadas desde RD$1,500, cupcakes gourmet RD$350. Ingredientes premium importados, técnicas parisinas, sabores dominicanos. Entrega en DN y Santiago."
        keywords={[
          "menú postres artesanales santo domingo",
          "precios macarons república dominicana",
          "tartas personalizadas precios RD",
          "cupcakes gourmet santo domingo precio",
          "repostería francesa menú dominicana",
          "postres artesanales precios pesos dominicanos",
          "macarons auténticos precio RD",
          "menú repostería santo domingo",
          "tartas bodas precio república dominicana",
          "postres franceses menú RD",
          "cupcakes personalizados precio santo domingo",
          "repostería gourmet menú dominicana",
        ]}
        image="/images/menu-postres-cucinanostrard-rd.jpg"
        type="website"
        price={150}
        currency="DOP"
      />
      <PageTransition>
        <div className="pt-16">
          {/* Hero Section */}
          <section className="relative py-20 bg-gradient-to-br from-cream-400 to-cream-500 overflow-hidden">
            <TextureComponents.GrainTexture className="opacity-20" />

            <HolographicShimmer
              intensity={0.3}
              color="gold"
              direction="horizontal"
              trigger="visible"
              speed={3}
              className="absolute inset-0"
            />
            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <CinematicReveal direction="curtain" delay={0.2} duration={1.5}>
                <div className="text-center mb-16">
                  <FadeReveal delay={0.5} duration={0.8} direction="up">
                    <div className="flex items-center justify-center mb-6">
                      <div className="w-16 h-px bg-dusty-rose/40"></div>
                      <span className="mx-4 text-sm font-source-serif text-dusty-rose/70 uppercase tracking-wider">
                        Mi Diario de Postres
                      </span>
                      <div className="w-16 h-px bg-dusty-rose/40"></div>
                    </div>
                  </FadeReveal>

                  <TextReveal delay={0.8} staggerDelay={0.1}>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair text-black-bold text-shadow-elegant mb-6">
                      Menú de{" "}
                      <span className="text-dusty-rose-600">
                        Postres Artesanales
                      </span>
                    </h1>
                  </TextReveal>

                  <FadeReveal delay={1.2} duration={0.8} direction="none">
                    <HandDrawnDivider className="mb-8" />
                  </FadeReveal>
                </div>
              </CinematicReveal>
            </div>
          </section>

          {/* Menu Content */}
          <>
            {/* Menu Items */}
            <section className="py-12 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden">
              {/* Background decorative elements */}
              <div className="absolute top-10 right-10 w-40 h-40 bg-dusty-rose-100 rounded-full opacity-20 animate-pulse-soft"></div>
              <div className="absolute bottom-20 left-10 w-32 h-32 bg-warm-blush-100 rounded-full opacity-30"></div>

              <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                  {menuItems.map((item, index) => (
                    <PremiumReveal
                      key={index}
                      effect={
                        index % 3 === 0
                          ? "cinematic-shimmer"
                          : index % 3 === 1
                            ? "holographic-reveal"
                            : "luxury-entrance"
                      }
                      delay={index * 0.15}
                    >
                      <motion.div
                        whileHover={{ y: -8, transition: { duration: 0.2 } }}
                        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden group border border-dusty-rose-100/50"
                      >
                        <div className="relative overflow-hidden rounded-t-3xl">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-400 ease-out"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/images/placeholder-dessert.jpg";
                            }}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>

                          {/* Price overlay on hover */}
                          <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-dusty-rose-600 px-3 py-2 rounded-xl font-cormorant font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-gentle">
                            {item.priceRange}
                          </div>
                        </div>

                        <div className="p-8">
                          <div className="mb-4">
                            <h3 className="text-2xl font-playfair text-black-bold font-bold leading-tight">
                              {item.name}
                            </h3>
                          </div>

                          <p className="body-elegant text-base mb-6 line-clamp-3 leading-relaxed">
                            {item.description}
                          </p>

                          <div className="flex items-center justify-between mb-5">
                            <p className="text-dusty-rose-elegant font-bold text-2xl font-playfair">
                              {item.priceRange}
                            </p>
                            <span className="text-sm text-warm-grey-500 bg-cream-100 px-3 py-2 rounded-xl font-karla font-medium">
                              {item.preparationTime}
                            </span>
                          </div>

                          <div className="bg-elegant-cream p-4 rounded-2xl mb-6 border border-dusty-rose">
                            <p className="text-sm body-elegant italic leading-relaxed text-shadow-elegant">
                              {item.story}
                            </p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex space-x-3">
                            <Link
                              to={`/product/${item.id}`}
                              onClick={() => {
                                console.log(
                                  "🔗 Menu page - Clicking Ver Detalles for product:",
                                  item.id,
                                  item.name,
                                );
                                console.log(
                                  "🔗 Menu page - Navigating to:",
                                  `/product/${item.id}`,
                                );
                              }}
                              className="flex-1 text-center bg-gradient-to-r from-cream-100 to-warm-ivory text-mocha py-3 px-5 rounded-2xl font-karla font-semibold hover:from-dusty-rose-100 hover:to-warm-blush-100 hover:text-dusty-rose-700 transition-all duration-300 text-base shadow-gentle hover:shadow-warm border border-dusty-rose-100/30"
                            >
                              Ver Detalles
                            </Link>
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              whileHover={{ scale: 1.02 }}
                              onClick={() => {
                                const message = `Hola! Me interesa ordenar: ${item.name} - ${item.priceRange}`;
                                const whatsappUrl = `https://api.whatsapp.com/send/?phone=18096581245&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
                                window.open(whatsappUrl, "_blank");
                              }}
                              className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white py-3 px-4 rounded-2xl font-karla font-semibold transition-all duration-300 flex items-center space-x-2 text-sm shadow-warm hover:shadow-glow"
                            >
                              <MessageCircle className="w-4 h-4" />
                              <span>Ordenar</span>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    </PremiumReveal>
                  ))}
                </div>
              </div>
            </section>
          </>

          {/* Call to Action */}
          <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <FadeInUp>
                <HandwrittenAccent className="text-2xl mb-4 block">
                  ¿Algo especial en mente?
                </HandwrittenAccent>

                <h2 className="text-3xl font-playfair text-black-bold text-shadow-elegant mb-6">
                  Creemos Juntos Tu Postre Perfecto
                </h2>

                <p className="text-lg body-elegant mb-8 font-source-serif font-light leading-relaxed">
                  Cada ocasión especial merece un toque único. Comparte tu
                  visión y trabajemos juntos para crear algo que cuente
                  exactamente tu historia.
                </p>

                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                >
                  <Link
                    to="/contact"
                    className="inline-block bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white px-10 py-4 rounded-full text-lg font-source-serif font-medium shadow-warm hover:shadow-elegant border border-dusty-rose-400/20 relative overflow-hidden transition-all duration-300"
                  >
                    <span className="relative z-10">
                      Crear Mi Postre Especial
                    </span>
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-dusty-rose-600 to-dusty-rose-700"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "0%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>

                {/* WhatsApp Contact Button */}
                <motion.a
                  href="https://wa.me/18096581245?text=¡Hola!%20Me%20interesa%20crear%20un%20postre%20personalizado.%20¿Podemos%20conversar%20sobre%20las%20opciones%20disponibles?"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-source-serif font-medium shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg
                    className="w-5 h-5 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span className="relative z-10">Hablemos en WhatsApp</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700"
                    initial={{ x: "-100%" }}
                    whileHover={{ x: "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.a>
              </FadeInUp>
            </div>
          </section>
        </div>
      </PageTransition>
    </>
  );
};

export default Menu;
