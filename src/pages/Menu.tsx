import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  HandDrawnDivider,
  HandwrittenAccent,
} from "../components/animations/TextureComponents";
import {
  CinematicReveal,
  FadeReveal,
  TextReveal,
  StaggerReveal,
  StaggerChild,
} from "../components/animations/SophisticatedAnimations";
import * as TextureComponents from "../components/animations/TextureComponents";

import SEO from "../components/SEO";
import PageTransition from "../components/PageTransition";
import EnhancedDessertCard from "../components/EnhancedDessertCard";
import { useProducts } from "../contexts/FirebaseProductsContext";
import { formatPriceFrom, formatPriceWithUnit } from "../utils/currency";

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
      story: `${product.shortDescription || product.description || "Delicioso postre artesanal"} - ${product.preparationTime} de preparación.`,
      image:
        product.thumbnailImage ||
        product.images[0] ||
        "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      priceRange: formatPriceWithUnit(
        product.price,
        (product as any).priceUnit,
      ),
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
              {/* Background decorative elements */}
              <FadeReveal delay={0.5} duration={2.0} direction="none">
                <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 animate-pulse-soft shadow-sage"></div>
              </FadeReveal>
              <FadeReveal delay={0.8} duration={2.0} direction="none">
                <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30 shadow-warm"></div>
              </FadeReveal>

              <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <CinematicReveal
                    direction="center"
                    delay={0.2}
                    duration={1.0}
                  >
                    <FadeReveal delay={0.4} duration={0.8} direction="none">
                      <div className="flex items-center justify-center mb-8">
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
                        <span className="mx-6 text-base font-academy text-sage-600 uppercase tracking-widest font-medium">
                          Cargando Menú
                        </span>
                        <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
                      </div>
                    </FadeReveal>
                  </CinematicReveal>

                  <div className="mb-8">
                    <div className="h-8 bg-sage-200/50 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                    <div className="h-4 bg-sage-100/50 rounded w-96 mx-auto mb-8 animate-pulse"></div>
                  </div>

                  <StaggerReveal
                    staggerDelay={0.1}
                    childDelay={0.6}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-10"
                  >
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <StaggerChild key={i}>
                        <div className="bg-white/90 rounded-3xl p-6 shadow-premium border border-sage-100/50">
                          <div className="h-56 bg-gray-200/50 rounded-t-3xl mb-4 animate-pulse"></div>
                          <div className="h-6 bg-gray-200/50 rounded mb-2 animate-pulse"></div>
                          <div className="h-4 bg-gray-200/30 rounded mb-4 animate-pulse"></div>
                          <div className="h-10 bg-gray-200/30 rounded animate-pulse"></div>
                        </div>
                      </StaggerChild>
                    ))}
                  </StaggerReveal>
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

            {/* Background decorative elements */}
            <FadeReveal delay={0.5} duration={2.0} direction="none">
              <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 animate-pulse-soft shadow-sage"></div>
            </FadeReveal>
            <FadeReveal delay={0.8} duration={2.0} direction="none">
              <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30 shadow-warm"></div>
            </FadeReveal>

            <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
              <div className="text-center mb-16">
                <FadeReveal delay={0.2} duration={0.8} direction="none">
                  <div className="flex items-center justify-center mb-8">
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
                    <span className="mx-6 text-base font-academy text-sage-600 uppercase tracking-widest font-medium">
                      Nuestro Menú Artesanal
                    </span>
                    <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
                  </div>
                </FadeReveal>

                <div className="mb-8">
                  <TextReveal
                    delay={0.6}
                    staggerDelay={0.1}
                    className="text-4xl sm:text-5xl lg:text-6xl font-academy leading-elegant block text-cocoa-500 text-shadow-elegant tracking-academy-hero"
                  >
                    Menú de
                  </TextReveal>
                  <div className="mt-2 relative">
                    <TextReveal
                      delay={1.2}
                      staggerDelay={0.12}
                      className="text-4xl sm:text-5xl lg:text-6xl font-academy leading-elegant block text-sage-600 italic tracking-academy-subhead"
                    >
                      Postres Artesanales
                    </TextReveal>
                    <FadeReveal
                      delay={1.8}
                      duration={0.8}
                      direction="none"
                      className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
                    >
                      <div></div>
                    </FadeReveal>
                  </div>
                </div>

                <CinematicReveal
                  direction="horizontal"
                  delay={1.0}
                  duration={1.2}
                >
                  <HandDrawnDivider className="mb-8" />
                </CinematicReveal>

                <FadeReveal
                  delay={2.2}
                  duration={1.0}
                  direction="up"
                  distance={20}
                >
                  <p className="text-xl font-bodoni text-cocoa-500/80 leading-body-elegant font-normal max-w-3xl mx-auto">
                    Descubre nuestra colección de postres artesanales, cada uno
                    creado con
                    <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                      {" "}
                      ingredientes premium
                    </span>{" "}
                    y el amor de la repostería tradicional.
                  </p>
                </FadeReveal>
              </div>
            </div>
          </section>

          {/* Menu Items */}
          <section className="py-12 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden">
            {/* Background decorative elements */}
            <FadeReveal delay={0.5} duration={2.0} direction="none">
              <div className="absolute top-10 right-10 w-40 h-40 bg-sage-100 rounded-full opacity-20 animate-pulse-soft"></div>
            </FadeReveal>
            <FadeReveal delay={0.8} duration={2.0} direction="none">
              <div className="absolute bottom-20 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30"></div>
            </FadeReveal>

            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
              <StaggerReveal
                staggerDelay={0.15}
                childDelay={0.2}
                className="grid grid-cols-1 lg:grid-cols-3 gap-10"
              >
                {menuItems.map((item, index) => (
                  <StaggerChild key={index}>
                    <EnhancedDessertCard
                      id={item.id}
                      name={item.name}
                      image={item.image}
                      price={item.priceRange}
                      story={item.story}
                      preparationTime={item.preparationTime}
                      onClick={() => {
                        const message = `Hola! Me interesa ordenar: ${item.name} - ${item.priceRange}`;
                        const whatsappUrl = `https://api.whatsapp.com/send/?phone=18096581245&text=${encodeURIComponent(message)}&type=phone_number&app_absent=0`;
                        window.open(whatsappUrl, "_blank");
                      }}
                    />
                  </StaggerChild>
                ))}
              </StaggerReveal>
            </div>
          </section>

          {/* Call to Action */}
          <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500 relative overflow-hidden">
            {/* Background decorative elements */}
            <FadeReveal delay={0.5} duration={2.0} direction="none">
              <div className="absolute top-20 left-20 w-36 h-36 bg-sage-100 rounded-full opacity-15 animate-pulse-soft shadow-sage"></div>
            </FadeReveal>
            <FadeReveal delay={0.8} duration={2.0} direction="none">
              <div className="absolute bottom-20 right-20 w-28 h-28 bg-sage-100 rounded-full opacity-20 shadow-warm"></div>
            </FadeReveal>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <FadeReveal
                delay={0.2}
                duration={0.8}
                direction="up"
                distance={30}
              >
                <HandwrittenAccent className="text-2xl mb-6 block text-sage-600">
                  ¿Algo especial en mente?
                </HandwrittenAccent>
              </FadeReveal>

              <div className="mb-8">
                <TextReveal
                  delay={0.6}
                  staggerDelay={0.1}
                  className="text-3xl font-academy leading-elegant text-cocoa-500 text-shadow-elegant tracking-academy-hero"
                >
                  Creemos Juntos Tu Postre Perfecto
                </TextReveal>
                <FadeReveal
                  delay={1.2}
                  duration={0.8}
                  direction="none"
                  className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
                >
                  <div></div>
                </FadeReveal>
              </div>

              <FadeReveal
                delay={1.6}
                duration={1.0}
                direction="up"
                distance={20}
              >
                <p className="text-lg font-bodoni text-cocoa-500/80 mb-8 leading-body-elegant font-normal max-w-2xl mx-auto">
                  Cada ocasión especial merece un toque único. Comparte tu
                  visión y trabajemos juntos para crear algo que cuente
                  exactamente
                  <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                    {" "}
                    tu historia
                  </span>
                  .
                </p>
              </FadeReveal>

              <StaggerReveal
                staggerDelay={0.2}
                childDelay={2.0}
                className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              >
                <StaggerChild>
                  <motion.div
                    whileHover={{ y: -2, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative overflow-hidden rounded-full"
                  >
                    <Link
                      to="/contact"
                      className="inline-block bg-gradient-to-r from-sage-500 to-sage-600 hover:from-sage-600 hover:to-sage-700 text-white px-10 py-4 rounded-full text-lg font-bodoni font-medium shadow-premium hover:shadow-luxury border border-sage-400/20 relative overflow-hidden transition-all duration-500 btn-contrast-high tracking-button-refined group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                      <span className="relative z-10">
                        Crear Mi Postre Especial
                      </span>
                    </Link>
                  </motion.div>
                </StaggerChild>

                <StaggerChild>
                  <motion.a
                    href="https://wa.me/18096581245?text=¡Hola!%20Me%20interesa%20crear%20un%20postre%20personalizado.%20¿Podemos%20conversar%20sobre%20las%20opciones%20disponibles?"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 py-4 rounded-full text-lg font-bodoni font-medium shadow-premium hover:shadow-luxury transition-all duration-500 relative overflow-hidden btn-contrast-high tracking-button-refined group"
                    whileHover={{ y: -2, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                    <svg
                      className="w-5 h-5 flex-shrink-0 relative z-10"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                    </svg>
                    <span className="relative z-10">Hablemos en WhatsApp</span>
                  </motion.a>
                </StaggerChild>
              </StaggerReveal>

              <FadeReveal
                delay={2.8}
                duration={1.0}
                direction="up"
                distance={30}
                className="mt-12"
              >
                <div className="relative">
                  <CinematicReveal direction="iris" delay={0.3} duration={1.5}>
                    <TextReveal
                      delay={0.2}
                      staggerDelay={0.08}
                      className="text-xl font-bodoni font-normal italic leading-body-elegant text-shadow-elegant text-sage-600 tracking-bodoni-elegant"
                    >
                      Cada postre es una obra de arte comestible esperando ser
                      creada
                    </TextReveal>
                  </CinematicReveal>
                  <FadeReveal
                    delay={1.0}
                    duration={0.8}
                    direction="none"
                    className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-sage-300 via-sage-400 to-sage-300 rounded-full"
                  >
                    <div></div>
                  </FadeReveal>
                </div>
              </FadeReveal>
            </div>
          </section>
        </div>
      </PageTransition>
    </>
  );
};

export default Menu;
