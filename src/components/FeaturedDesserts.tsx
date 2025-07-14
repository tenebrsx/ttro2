import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { formatPriceFrom } from "../utils/currency";
import { useFeaturedProducts } from "../contexts/FirebaseProductsContext";

const FeaturedDesserts = () => {
  const { featuredProducts, loading } = useFeaturedProducts();

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
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
          <div className="text-center">
            <div className="animate-pulse">
              <div className="h-8 bg-dusty-rose-200 rounded w-64 mx-auto mb-4"></div>
              <div className="h-4 bg-dusty-rose-100 rounded w-96 mx-auto mb-8"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {[1, 2, 3, 4].map((i) => (
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
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-10 right-10 w-40 h-40 bg-dusty-rose-100 rounded-full opacity-20 animate-pulse-soft"></div>
      <div className="absolute bottom-20 left-10 w-32 h-32 bg-warm-blush-100 rounded-full opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 relative z-10">
        <div className="text-center mb-20 animate-fade-in-up">
          <div className="flex items-center justify-center mb-8">
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
            <span className="mx-6 text-base font-karla text-dusty-rose-600 uppercase tracking-widest font-medium">
              Los Más Pedidos
            </span>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-playfair mb-8 font-bold leading-tight">
            <span className="block text-black-bold text-shadow-elegant">
              Sabores que
            </span>
            <span className="block text-dusty-rose-elegant italic mt-2 relative">
              Enamoran
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-dusty-rose-300 to-warm-blush-300 rounded-full"></div>
            </span>
          </h2>

          <p className="text-xl sm:text-2xl body-elegant max-w-3xl mx-auto leading-relaxed font-medium">
            Estos son los postres que mis clientes piden una y otra vez. Los que han acompañado sus celebraciones más importantes y se han convertido en
            <span className="accent-dusty-rose font-semibold italic">
              {" "}
              tradiciones familiares
            </span>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {featuredDesserts.map((dessert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: index * 0.1,
                ease: "easeOut",
              }}
              viewport={{ once: true }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
              className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-soft hover:shadow-elegant transition-all duration-300 overflow-hidden group border border-dusty-rose-100/50"
            >
              <div className="relative overflow-hidden rounded-t-3xl">
                <img
                  src={dessert.image}
                  alt={dessert.name}
                  className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-400 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500 ease-out"></div>

                {/* Price overlay on hover */}
                <div className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm text-dusty-rose-600 px-3 py-2 rounded-xl font-cormorant font-bold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-gentle">
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
                    className="flex-1 text-center bg-gradient-to-r from-cream-100 to-warm-ivory text-mocha py-3 px-5 rounded-2xl font-karla font-semibold hover:from-dusty-rose-100 hover:to-warm-blush-100 hover:text-dusty-rose-700 transition-all duration-300 text-base shadow-gentle hover:shadow-warm border border-dusty-rose-100/30"
                  >
                    Ver Detalles
                  </Link>
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => handleWhatsAppOrder(dessert)}
                    className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white py-3 px-4 rounded-2xl font-karla font-semibold transition-all duration-300 flex items-center space-x-2 text-sm shadow-warm hover:shadow-glow"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Ordenar</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-20 animate-fade-in-up">
          <div className="relative mb-12">
            <p className="text-2xl text-elegant font-medium italic leading-relaxed text-shadow-elegant">
              Cada postre es una carta de amor escrita con azúcar
            </p>
            <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-dusty-rose-300 via-warm-blush-300 to-dusty-rose-300 rounded-full"></div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white px-12 py-5 rounded-3xl text-xl font-karla font-bold shadow-warm hover:shadow-glow transition-all duration-500 relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <span className="relative z-10">Explorar Todos Mis Postres</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesserts;
