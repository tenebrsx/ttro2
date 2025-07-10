import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  FadeInUp,
  StaggerChildren,
  StaggerChild,
  TiltOnHover,
} from "../components/animations/AnimationComponents";
import {
  HandDrawnDivider,
  HandwrittenAccent,
  GrainTexture,
} from "../components/animations/TextureComponents";
import { Heart, Clock, Star, Filter, Users } from "lucide-react";
import { useState } from "react";

import PageTransition from "../components/PageTransition";
import { products } from "../data/products";
import { formatPriceFrom } from "../utils/currency";

const Menu = () => {
  const [activeFilter, setActiveFilter] = useState("todos");

  const filters = [
    { id: "todos", label: "Todos", icon: Star },
    { id: "temporada", label: "Temporada", icon: Clock },
    { id: "veganos", label: "Veganos", icon: Filter },
    { id: "sin-gluten", label: "Sin Gluten", icon: Filter },
  ];

  // Use actual products from data
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

  const filteredItems =
    activeFilter === "todos"
      ? menuItems
      : menuItems.filter((item) => item.tags.includes(activeFilter));

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="relative py-20 bg-gradient-to-br from-cream-400 to-cream-500 overflow-hidden">
          <GrainTexture className="opacity-20" />

          <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeInUp>
              <div className="text-center mb-16">
                <div className="flex items-center justify-center mb-6">
                  <div className="w-16 h-px bg-dusty-rose/40"></div>
                  <span className="mx-4 text-sm font-source-serif text-dusty-rose/70 uppercase tracking-wider">
                    Mi Diario Dulce
                  </span>
                  <div className="w-16 h-px bg-dusty-rose/40"></div>
                </div>

                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-playfair text-black-bold text-shadow-elegant mb-6">
                  Menú de Dulces
                  <span className="block text-dusty-rose-elegant italic mt-2">
                    Artesanales
                  </span>
                </h1>

                <HandDrawnDivider className="mb-8" />

                <p className="text-lg body-elegant leading-relaxed font-source-serif font-light max-w-3xl mx-auto mb-8">
                  Cada postre es creado con amor, usando ingredientes frescos y
                  técnicas artesanales. Desde nuestros clásicos favoritos hasta
                  creaciones estacionales únicas.
                </p>
              </div>
            </FadeInUp>
          </div>
        </section>

        {/* Menu Content */}
        <>
          {/* Filter Section */}
          <section className="py-12 bg-cream-500">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <FadeInUp delay={0.2}>
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  {filters.map((filter) => {
                    const IconComponent = filter.icon;
                    return (
                      <motion.button
                        key={filter.id}
                        onClick={() => setActiveFilter(filter.id)}
                        className={`flex items-center px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                          activeFilter === filter.id
                            ? "bg-dusty-rose-gradient text-white shadow-dusty-rose scale-105"
                            : "bg-elegant-cream body-elegant hover:bg-dusty-rose/20"
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="w-4 h-4 mr-2" />
                        {filter.label}
                      </motion.button>
                    );
                  })}
                </div>
              </FadeInUp>
            </div>
          </section>

          {/* Menu Items */}
          <section className="py-20 bg-cream-500">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredItems.map((item) => (
                  <StaggerChild key={item.id}>
                    <TiltOnHover>
                      <Link
                        to={`/product/${item.id}`}
                        className="block bg-elegant-cream backdrop-blur-sm rounded-2xl overflow-hidden shadow-dusty-rose hover:shadow-warm transition-all duration-500 border border-dusty-rose group"
                      >
                        <div className="relative overflow-hidden">
                          <motion.img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-48 object-cover"
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.5 }}
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = "/images/placeholder-dessert.jpg";
                            }}
                          />

                          <div className="absolute top-4 left-4">
                            <span className="bg-dusty-rose-gradient text-white px-3 py-1 rounded-full text-xs font-medium shadow-dusty-rose">
                              {item.type}
                            </span>
                          </div>

                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="p-6">
                          <div className="flex items-start justify-between mb-3">
                            <h3 className="text-xl font-playfair text-black-bold text-shadow-elegant group-hover:text-dusty-rose transition-colors">
                              {item.name}
                            </h3>
                            <Heart className="w-5 h-5 text-dusty-rose/40 group-hover:text-dusty-rose transition-colors duration-300" />
                          </div>

                          <p className="body-elegant leading-relaxed mb-4 font-source-serif font-light text-sm line-clamp-3">
                            {item.description}
                          </p>

                          {/* Rating and Info */}
                          <div className="flex items-center justify-between mb-4 text-xs body-elegant">
                            <div className="flex items-center space-x-1">
                              <Star className="w-3 h-3 text-yellow-400 fill-current" />
                              <span>{item.rating}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Clock className="w-3 h-3" />
                              <span>{item.preparationTime}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Users className="w-3 h-3" />
                              <span>{item.serves}</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <span className="text-dusty-rose-elegant font-medium font-source-serif text-shadow-elegant">
                                {item.priceRange}
                              </span>
                              <span className="text-xs bg-dusty-rose-gradient text-white px-2 py-1 rounded-full shadow-dusty-rose">
                                Ver detalles →
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </TiltOnHover>
                  </StaggerChild>
                ))}
              </StaggerChildren>
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
                Creemos Juntos Tu Dulce Perfecto
              </h2>

              <p className="text-lg body-elegant mb-8 font-source-serif font-light leading-relaxed">
                Cada ocasión especial merece un toque único. Comparte tu visión
                y trabajemos juntos para crear algo que cuente exactamente tu
                historia.
              </p>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
              >
                <Link
                  to="/contact"
                  className="inline-block bg-dusty-rose-gradient text-white px-10 py-4 rounded-full text-lg font-source-serif font-medium shadow-dusty-rose relative overflow-hidden"
                >
                  <span className="relative z-10">Crear Mi Dulce Especial</span>
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-dusty-rose to-warm-blush"
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
                className="mt-6 inline-flex items-center space-x-2 bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-4 rounded-full text-lg font-source-serif font-medium shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Hablemos en WhatsApp</span>
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
  );
};

export default Menu;
