import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import {
  formatPriceFrom,
  formatPriceFromWithQuantity,
} from "../utils/currency";
import { useCart } from "../contexts/CartContext";

const FeaturedDesserts = () => {
  const { addItem } = useCart();

  const featuredDesserts = [
    {
      id: "triple-chocolate-mousse",
      name: "Triple Chocolate Mousse",
      description:
        "Decadent layers of dark, milk, and white chocolate mousse with rich ganache and delicate chocolate shavings.",
      image:
        "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: 14.99,
      priceDisplay: formatPriceFrom(14.99),
      story: "A chocolate lover's dream come true",
      rating: 5,
      preparationTime: "2-3 días",
      tags: ["Premium", "Chocolate"],
      popularity: "bestseller" as const,
    },
    {
      id: "key-lime-pie",
      name: "Key Lime Pie",
      description:
        "Tangy key lime filling in a graham cracker crust with whipped cream and lime zest garnish.",
      image:
        "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: 11.99,
      priceDisplay: formatPriceFrom(11.99),
      story: "A refreshing citrus escape in every bite",
      rating: 5,
      preparationTime: "1-2 días",
      tags: ["Citrus", "Classic"],
      popularity: "trending" as const,
    },
    {
      id: "dark-chocolate-truffle-cake",
      name: "Dark Chocolate Truffle Cake",
      description:
        "Rich chocolate cake layered with velvety truffle ganache and finished with dark chocolate glaze.",
      image:
        "https://images.pexels.com/photos/1028704/pexels-photo-1028704.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: 16.99,
      priceDisplay: formatPriceFrom(16.99),
      story: "An indulgent masterpiece for special occasions",
      rating: 5,
      preparationTime: "2-3 días",
      tags: ["Premium", "Truffle"],
      popularity: "bestseller" as const,
    },
    {
      id: "chocolate-hazelnut-mousse",
      name: "Chocolate Hazelnut Mousse",
      description:
        "Silky smooth chocolate mousse infused with roasted hazelnuts and topped with candied hazelnut pieces.",
      image:
        "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: 13.99,
      priceDisplay: formatPriceFrom(13.99),
      story: "A nutty twist on the classic chocolate mousse",
      rating: 4.8,
      preparationTime: "1 día",
      tags: ["Chocolate", "Hazelnut"],
      popularity: "classic" as const,
    },
  ];

  const handleAddToCart = (dessert: (typeof featuredDesserts)[0]) => {
    addItem({
      id: dessert.id,
      name: dessert.name,
      price: dessert.price,
      image: dessert.image,
    });
  };

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
              Mis Favoritos
            </span>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-dusty-rose-400 to-transparent"></div>
          </div>

          <h2 className="text-5xl sm:text-6xl md:text-7xl font-playfair mb-8 font-bold leading-tight">
            <span className="block text-black-bold text-shadow-elegant">
              Dulces que Abrazan
            </span>
            <span className="block text-dusty-rose-elegant italic mt-2 relative">
              el Alma
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-dusty-rose-300 to-warm-blush-300 rounded-full"></div>
            </span>
          </h2>

          <p className="text-xl sm:text-2xl body-elegant max-w-3xl mx-auto leading-relaxed font-medium">
            Cada uno de estos postres nació de un
            <span className="accent-dusty-rose font-semibold italic">
              {" "}
              momento especial
            </span>
            , una emoción, una historia que quería compartir contigo a través
            del
            <span className="accent-dusty-rose font-semibold italic">
              {" "}
              sabor
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
                    onClick={() => handleAddToCart(dessert)}
                    className="bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 hover:from-dusty-rose-600 hover:to-dusty-rose-700 text-white py-3 px-6 rounded-2xl font-karla font-semibold transition-all duration-300 flex items-center space-x-2 text-base shadow-warm hover:shadow-glow"
                  >
                    <ShoppingBag className="w-5 h-5" />
                    <span>Agregar</span>
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
              <span className="relative z-10">Explorar Todos Mis Dulces</span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedDesserts;
