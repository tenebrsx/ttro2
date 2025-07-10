import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Star,
  Clock,
  Users,
  Heart,
  Share2,
  Plus,
  Minus,
  MessageCircle,
  CheckCircle,
  AlertCircle,
  ChefHat,
  Award,
  Shield,
  Calendar,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import OptimizedImage from "../components/OptimizedImage";
import { formatPrice } from "../utils/currency";
import { products, getProductById } from "../data/products";
import type { Product as ProductType } from "../data/products";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    string[]
  >([]);
  const [isLiked, setIsLiked] = useState(false);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const foundProduct = getProductById(id);
      if (foundProduct) {
        setProduct(foundProduct);
        setLoading(false);
      } else {
        // If product not found, redirect to menu
        navigate("/menu");
      }
    }
  }, [id, navigate]);

  const handleWhatsAppOrder = () => {
    if (!product) return;

    const customizationsText =
      selectedCustomizations.length > 0
        ? `\n\n*Personalizaciones:*\n${selectedCustomizations.map((c) => `• ${c}`).join("\n")}`
        : "";

    const message = encodeURIComponent(
      `¡Hola! Me interesa hacer un pedido de:\n\n` +
        `*${product.name}*\n` +
        `Cantidad: ${quantity}\n` +
        `Precio: ${formatPrice(product.price * quantity)}\n` +
        `Tiempo de preparación: ${product.preparationTime}\n` +
        `Sirve para: ${product.serves}${customizationsText}\n\n` +
        `¿Podrías confirmarme la disponibilidad y coordinar los detalles?`,
    );

    window.open(`https://wa.me/18096581245?text=${message}`, "_blank");
  };

  const toggleCustomization = (customization: string) => {
    setSelectedCustomizations((prev) =>
      prev.includes(customization)
        ? prev.filter((c) => c !== customization)
        : [...prev, customization],
    );
  };

  const relatedProducts = products
    .filter((p) => p.id !== product?.id && p.category === product?.category)
    .slice(0, 3);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-dusty-rose"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-playfair text-dark-cocoa mb-4">
            Producto no encontrado
          </h1>
          <Link
            to="/menu"
            className="text-dusty-rose hover:text-dusty-rose/80 transition-colors"
          >
            Volver al menú
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="pt-16 min-h-screen bg-gradient-to-br from-cream via-white to-cream">
        {/* Hero Section */}
        <section className="py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Breadcrumb */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-2 text-sm text-mocha/70 mb-8"
            >
              <Link to="/" className="hover:text-dusty-rose transition-colors">
                Inicio
              </Link>
              <span>/</span>
              <Link
                to="/menu"
                className="hover:text-dusty-rose transition-colors"
              >
                Menú
              </Link>
              <span>/</span>
              <span className="text-dusty-rose font-medium">
                {product.name}
              </span>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="space-y-4">
                  {/* Main Image */}
                  <div className="aspect-square rounded-3xl overflow-hidden shadow-gentle bg-gradient-to-br from-dusty-rose/10 to-cream/20">
                    <OptimizedImage
                      src={
                        product.images[selectedImage] ||
                        "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                      }
                      alt={product.name}
                      className="w-full h-full object-cover"
                      aspectRatio="square"
                      priority={true}
                      fallbackSrc="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                    />
                  </div>

                  {/* Thumbnail Images */}
                  {product.images.length > 1 && (
                    <div className="flex space-x-3 overflow-x-auto pb-2">
                      {product.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImage === index
                              ? "border-dusty-rose"
                              : "border-transparent"
                          }`}
                        >
                          <OptimizedImage
                            src={
                              image ||
                              "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                            }
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover"
                            aspectRatio="square"
                            fallbackSrc="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Product Info */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-6"
              >
                {/* Header */}
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h1 className="text-3xl lg:text-4xl font-playfair text-dark-cocoa mb-2">
                        {product.name}
                      </h1>
                      <p className="text-lg text-mocha/70 font-source-serif font-light">
                        {product.shortDescription}
                      </p>
                    </div>
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className="p-3 rounded-full hover:bg-dusty-rose/10 transition-colors"
                    >
                      <Heart
                        className={`w-6 h-6 transition-colors ${
                          isLiked
                            ? "fill-red-500 text-red-500"
                            : "text-mocha/40"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Rating & Reviews */}
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < product.rating
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-mocha/70 ml-2">
                        ({product.reviewsCount} reseñas)
                      </span>
                    </div>
                  </div>

                  {/* Quick Info */}
                  <div className="flex items-center space-x-6 text-sm text-mocha/70">
                    <div className="flex items-center space-x-2">
                      <Clock className="w-4 h-4" />
                      <span>{product.preparationTime}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4" />
                      <span>{product.serves}</span>
                    </div>
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        product.difficulty === "Fácil"
                          ? "bg-green-100 text-green-700"
                          : product.difficulty === "Intermedio"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-700"
                      }`}
                    >
                      {product.difficulty}
                    </span>
                  </div>
                </div>

                {/* Price */}
                <div className="bg-gradient-to-r from-dusty-rose/10 to-cream/20 rounded-2xl p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-3xl font-playfair text-dark-cocoa">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <span className="text-lg text-mocha/50 line-through ml-3">
                            {formatPrice(product.originalPrice)}
                          </span>
                        )}
                    </div>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          ¡Oferta!
                        </span>
                      )}
                  </div>
                </div>

                {/* Quantity Selector */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-mocha/80 mb-2">
                      Cantidad
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-10 h-10 rounded-full border border-dusty-rose/20 flex items-center justify-center hover:bg-dusty-rose/10 transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-16 text-center font-medium text-lg">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-full border border-dusty-rose/20 flex items-center justify-center hover:bg-dusty-rose/10 transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Total Price */}
                  <div className="text-right">
                    <span className="text-mocha/70">Total: </span>
                    <span className="text-xl font-medium text-dusty-rose">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>

                {/* Customizations */}
                {product.customizations.length > 0 && (
                  <div>
                    <h3 className="text-lg font-medium text-dark-cocoa mb-3">
                      Personalizaciones disponibles
                    </h3>
                    <div className="space-y-2">
                      {product.customizations.map((customization, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-3 p-3 rounded-lg border border-dusty-rose/20 hover:bg-dusty-rose/5 transition-colors cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCustomizations.includes(
                              customization,
                            )}
                            onChange={() => toggleCustomization(customization)}
                            className="rounded border-dusty-rose/20 text-dusty-rose focus:border-dusty-rose focus:ring-dusty-rose/20"
                          />
                          <span className="text-mocha/80">{customization}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-3">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-green-500 text-white py-4 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors flex items-center justify-center space-x-2 shadow-gentle hover:shadow-soft"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Pedir por WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-dusty-rose/20 rounded-lg hover:bg-dusty-rose/5 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span>Compartir</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 py-3 px-4 bg-dusty-rose/10 text-dusty-rose rounded-lg hover:bg-dusty-rose/20 transition-colors">
                      <Calendar className="w-5 h-5" />
                      <span>Agendar</span>
                    </button>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-3 gap-4 py-6 border-t border-dusty-rose/20">
                  <div className="text-center">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Shield className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-xs text-mocha/70">
                      Ingredientes frescos
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <Award className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-xs text-mocha/70">Hecho a mano</span>
                  </div>
                  <div className="text-center">
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-2">
                      <CheckCircle className="w-5 h-5 text-yellow-600" />
                    </div>
                    <span className="text-xs text-mocha/70">
                      Garantía de calidad
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Description */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-white rounded-3xl shadow-gentle p-8 border border-dusty-rose/10"
                >
                  <h2 className="text-2xl font-playfair text-dark-cocoa mb-6">
                    Descripción
                  </h2>
                  <p className="text-mocha/80 font-source-serif font-light leading-relaxed text-lg">
                    {product.description}
                  </p>

                  {/* Ingredients */}
                  {product.ingredients.length > 0 && (
                    <div className="mt-8">
                      <h3 className="text-lg font-medium text-dark-cocoa mb-4">
                        Ingredientes principales
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-dusty-rose/10 text-dusty-rose rounded-full text-sm"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Allergens */}
                  {product.allergens.length > 0 && (
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-dark-cocoa mb-4 flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        <span>Alérgenos</span>
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {product.allergens.map((allergen, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm"
                          >
                            {allergen}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Sidebar Info */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6"
              >
                {/* Nutritional Info */}
                {product.nutritionalInfo && (
                  <div className="bg-white rounded-3xl shadow-gentle p-6 border border-dusty-rose/10">
                    <h3 className="text-lg font-medium text-dark-cocoa mb-4">
                      Información nutricional
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between">
                        <span className="text-mocha/70">Calorías</span>
                        <span className="font-medium">
                          {product.nutritionalInfo.calories}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mocha/70">Proteínas</span>
                        <span className="font-medium">
                          {product.nutritionalInfo.protein}g
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mocha/70">Carbohidratos</span>
                        <span className="font-medium">
                          {product.nutritionalInfo.carbs}g
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mocha/70">Grasas</span>
                        <span className="font-medium">
                          {product.nutritionalInfo.fat}g
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delivery Info */}
                <div className="bg-white rounded-3xl shadow-gentle p-6 border border-dusty-rose/10">
                  <h3 className="text-lg font-medium text-dark-cocoa mb-4">
                    Información de entrega
                  </h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-dusty-rose mt-0.5" />
                      <div>
                        <div className="font-medium text-mocha">
                          Tiempo de preparación
                        </div>
                        <div className="text-mocha/70">
                          {product.preparationTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-dusty-rose mt-0.5" />
                      <div>
                        <div className="font-medium text-mocha">
                          Zona de entrega
                        </div>
                        <div className="text-mocha/70">
                          Santo Domingo y alrededores
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="w-5 h-5 text-dusty-rose mt-0.5" />
                      <div>
                        <div className="font-medium text-mocha">Consultas</div>
                        <div className="text-mocha/70">
                          WhatsApp disponible 8AM - 6PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <h2 className="text-3xl font-playfair text-dark-cocoa text-center mb-12">
                  También te podría gustar
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedProducts.map((relatedProduct, index) => (
                    <motion.div
                      key={relatedProduct.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
                    >
                      <Link
                        to={`/product/${relatedProduct.id}`}
                        className="block bg-white rounded-2xl shadow-gentle hover:shadow-soft transition-shadow overflow-hidden border border-dusty-rose/10 group"
                      >
                        <div className="aspect-square bg-gradient-to-br from-dusty-rose/10 to-cream/20 overflow-hidden">
                          <OptimizedImage
                            src={
                              relatedProduct.thumbnailImage ||
                              "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                            }
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            aspectRatio="square"
                            fallbackSrc="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-lg font-playfair text-dark-cocoa mb-2">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-mocha/70 text-sm mb-4 line-clamp-2">
                            {relatedProduct.shortDescription}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-dusty-rose font-medium">
                              {formatPrice(relatedProduct.price)}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm text-mocha/70">
                                {relatedProduct.rating}
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        )}
      </div>
    </PageTransition>
  );
};

export default Product;
