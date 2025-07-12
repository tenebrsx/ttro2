import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  Clock,
  Users,
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
  ArrowLeft,
  Sparkles,
} from "lucide-react";
import { motion } from "framer-motion";
import PageTransition from "../components/PageTransition";
import OptimizedImage from "../components/OptimizedImage";
import { formatPrice } from "../utils/currency";
import {
  useProducts,
  useProductSearch,
} from "../contexts/FirebaseProductsContext";
import type { Product as ProductType } from "../data/products";

const Product: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedCustomizations, setSelectedCustomizations] = useState<
    string[]
  >([]);

  const { products } = useProducts();
  const { getProductById } = useProductSearch();

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        setLoading(true);
        try {
          const productData = await getProductById(id);
          if (productData) {
            setProduct(productData);
          } else {
            navigate("/menu");
          }
        } catch (error) {
          console.error("Error loading product:", error);
          navigate("/menu");
        } finally {
          setLoading(false);
        }
      }
    };

    loadProduct();
  }, [id, getProductById, navigate]);

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-100 via-white to-cream-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-dusty-rose-500 mx-auto mb-4"></div>
          <p className="text-mocha-600 font-playfair">Cargando producto...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-100 via-white to-cream-100">
        <div className="text-center">
          <h1 className="text-3xl font-playfair text-mocha-700 mb-4">
            Producto no encontrado
          </h1>
          <p className="text-mocha-600 mb-8">
            Lo sentimos, no pudimos encontrar el producto que buscas.
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-dusty-rose-500 to-dusty-rose-600 text-white px-8 py-4 rounded-full hover:from-dusty-rose-600 hover:to-dusty-rose-700 transition-all duration-300 transform hover:scale-105 font-playfair font-semibold shadow-lg"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Volver al menú</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <PageTransition>
      <div className="pt-20 min-h-screen bg-gradient-to-br from-cream-100 via-white to-cream-100">
        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-2 text-sm text-mocha-600 mb-8"
          >
            <Link
              to="/"
              className="hover:text-dusty-rose-600 transition-colors duration-200 font-playfair"
            >
              Inicio
            </Link>
            <span className="text-dusty-rose-300">•</span>
            <Link
              to="/menu"
              className="hover:text-dusty-rose-600 transition-colors duration-200 font-playfair"
            >
              Menú
            </Link>
            <span className="text-dusty-rose-300">•</span>
            <span className="text-dusty-rose-600 font-playfair font-medium">
              {product.name}
            </span>
          </motion.div>
        </div>

        {/* Main Product Section */}
        <section className="pb-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Product Images */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="space-y-6"
              >
                {/* Main Image */}
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-warm bg-gradient-to-br from-dusty-rose-50 to-cream-50 border border-dusty-rose-200">
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
                  <div className="flex space-x-4 overflow-x-auto pb-2">
                    {product.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(index)}
                        className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                          selectedImage === index
                            ? "border-dusty-rose-500 shadow-md"
                            : "border-dusty-rose-200 hover:border-dusty-rose-400"
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
              </motion.div>

              {/* Product Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="space-y-8"
              >
                {/* Header */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-dusty-rose-500" />
                    <span className="text-dusty-rose-600 font-playfair font-medium uppercase tracking-wide text-sm">
                      Postre Artesanal
                    </span>
                  </div>

                  <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-mocha-700 leading-tight">
                    {product.name}
                  </h1>

                  <p className="text-xl text-mocha-600 font-source-serif leading-relaxed">
                    {product.shortDescription}
                  </p>

                  {/* Quick Info Pills */}
                  <div className="flex flex-wrap gap-3">
                    <div className="flex items-center space-x-2 px-4 py-2 bg-dusty-rose-50 rounded-full border border-dusty-rose-200">
                      <Clock className="w-4 h-4 text-dusty-rose-600" />
                      <span className="text-sm text-mocha-600 font-playfair font-medium">
                        {product.preparationTime}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-dusty-rose-50 rounded-full border border-dusty-rose-200">
                      <Users className="w-4 h-4 text-dusty-rose-600" />
                      <span className="text-sm text-mocha-600 font-playfair font-medium">
                        {product.serves}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 px-4 py-2 bg-dusty-rose-50 rounded-full border border-dusty-rose-200">
                      <ChefHat className="w-4 h-4 text-dusty-rose-600" />
                      <span className="text-sm text-mocha-600 font-playfair font-medium">
                        {product.difficulty}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Price Section */}
                <div className="bg-gradient-to-r from-dusty-rose-50 to-warm-blush-50 rounded-2xl p-6 border border-dusty-rose-200 shadow-gentle">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <span className="text-4xl font-playfair font-bold text-mocha-700">
                        {formatPrice(product.price)}
                      </span>
                      {product.originalPrice &&
                        product.originalPrice > product.price && (
                          <div className="flex items-center space-x-3">
                            <span className="text-lg text-mocha-400 line-through font-playfair">
                              {formatPrice(product.originalPrice)}
                            </span>
                            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-playfair font-medium">
                              ¡Oferta!
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </div>

                {/* Quantity & Total */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <label className="text-lg font-playfair font-semibold text-mocha-700">
                      Cantidad
                    </label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-12 h-12 rounded-full bg-dusty-rose-50 border border-dusty-rose-200 flex items-center justify-center hover:bg-dusty-rose-100 transition-colors duration-200"
                      >
                        <Minus className="w-5 h-5 text-dusty-rose-600" />
                      </button>
                      <span className="w-20 text-center font-playfair font-bold text-2xl text-mocha-700">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-12 h-12 rounded-full bg-dusty-rose-50 border border-dusty-rose-200 flex items-center justify-center hover:bg-dusty-rose-100 transition-colors duration-200"
                      >
                        <Plus className="w-5 h-5 text-dusty-rose-600" />
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-mocha-600 font-playfair">
                      Total:{" "}
                    </span>
                    <span className="text-2xl font-playfair font-bold text-dusty-rose-600">
                      {formatPrice(product.price * quantity)}
                    </span>
                  </div>
                </div>

                {/* Customizations */}
                {product.customizations.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="text-lg font-playfair font-semibold text-mocha-700">
                      Personalizaciones disponibles
                    </h3>
                    <div className="space-y-3">
                      {product.customizations.map((customization, index) => (
                        <label
                          key={index}
                          className="flex items-center space-x-3 p-4 rounded-xl border border-dusty-rose-200 hover:bg-dusty-rose-50 transition-colors duration-200 cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedCustomizations.includes(
                              customization,
                            )}
                            onChange={() => toggleCustomization(customization)}
                            className="w-5 h-5 rounded border-dusty-rose-300 text-dusty-rose-600 focus:border-dusty-rose-500 focus:ring-dusty-rose-500/20"
                          />
                          <span className="text-mocha-600 font-playfair">
                            {customization}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={handleWhatsAppOrder}
                    className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-full font-playfair font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center space-x-3"
                  >
                    <MessageCircle className="w-6 h-6" />
                    <span>Pedir por WhatsApp</span>
                  </button>

                  <div className="grid grid-cols-2 gap-4">
                    <button className="flex items-center justify-center space-x-2 py-3 px-4 border border-dusty-rose-300 rounded-full hover:bg-dusty-rose-50 transition-all duration-200 font-playfair font-medium text-mocha-600">
                      <Share2 className="w-5 h-5" />
                      <span>Compartir</span>
                    </button>
                    <button
                      onClick={() => {
                        if (!product) return;
                        const message = encodeURIComponent(
                          `¡Hola! Me interesa agendar un pedido de:\n\n` +
                            `*${product.name}*\n` +
                            `Precio: ${formatPrice(product.price)}\n` +
                            `Tiempo de preparación: ${product.preparationTime}\n\n` +
                            `¿Podrías ayudarme a programar la fecha de entrega y coordinar los detalles?`,
                        );
                        window.open(
                          `https://wa.me/18096581245?text=${message}`,
                          "_blank",
                        );
                      }}
                      className="flex items-center justify-center space-x-2 py-3 px-4 bg-dusty-rose-100 text-dusty-rose-700 rounded-full hover:bg-dusty-rose-200 transition-all duration-200 font-playfair font-medium"
                    >
                      <Calendar className="w-5 h-5" />
                      <span>Agendar</span>
                    </button>
                  </div>
                </div>

                {/* Trust Signals */}
                <div className="grid grid-cols-3 gap-4 pt-6 border-t border-dusty-rose-200">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Shield className="w-6 h-6 text-green-600" />
                    </div>
                    <span className="text-sm text-mocha-600 font-playfair font-medium">
                      Ingredientes frescos
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="w-6 h-6 text-blue-600" />
                    </div>
                    <span className="text-sm text-mocha-600 font-playfair font-medium">
                      Hecho a mano
                    </span>
                  </div>
                  <div className="text-center">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="w-6 h-6 text-yellow-600" />
                    </div>
                    <span className="text-sm text-mocha-600 font-playfair font-medium">
                      Garantía de calidad
                    </span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Product Details */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Description */}
              <div className="lg:col-span-2">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="bg-gradient-to-br from-cream-50 to-white rounded-3xl shadow-gentle p-8 border border-dusty-rose-100"
                >
                  <h2 className="text-3xl font-playfair font-bold text-mocha-700 mb-6">
                    Descripción del Postre
                  </h2>
                  <p className="text-mocha-600 font-source-serif leading-relaxed text-lg mb-8">
                    {product.description}
                  </p>

                  {/* Ingredients */}
                  {product.ingredients.length > 0 && (
                    <div className="mb-8">
                      <h3 className="text-xl font-playfair font-semibold text-mocha-700 mb-4">
                        Ingredientes principales
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {product.ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-dusty-rose-50 text-dusty-rose-700 rounded-full text-sm font-playfair font-medium border border-dusty-rose-200"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Allergens */}
                  {product.allergens.length > 0 && (
                    <div>
                      <h3 className="text-xl font-playfair font-semibold text-mocha-700 mb-4 flex items-center space-x-2">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        <span>Información sobre alérgenos</span>
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {product.allergens.map((allergen, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-orange-50 text-orange-700 rounded-full text-sm font-playfair font-medium border border-orange-200"
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
                  <div className="bg-gradient-to-br from-cream-50 to-white rounded-3xl shadow-gentle p-6 border border-dusty-rose-100">
                    <h3 className="text-lg font-playfair font-semibold text-mocha-700 mb-4">
                      Información nutricional
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-mocha-600 font-playfair">
                          Calorías
                        </span>
                        <span className="font-playfair font-semibold text-mocha-700">
                          {product.nutritionalInfo.calories}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mocha-600 font-playfair">
                          Proteínas
                        </span>
                        <span className="font-playfair font-semibold text-mocha-700">
                          {product.nutritionalInfo.protein}g
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mocha-600 font-playfair">
                          Carbohidratos
                        </span>
                        <span className="font-playfair font-semibold text-mocha-700">
                          {product.nutritionalInfo.carbs}g
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-mocha-600 font-playfair">
                          Grasas
                        </span>
                        <span className="font-playfair font-semibold text-mocha-700">
                          {product.nutritionalInfo.fat}g
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Delivery Info */}
                <div className="bg-gradient-to-br from-cream-50 to-white rounded-3xl shadow-gentle p-6 border border-dusty-rose-100">
                  <h3 className="text-lg font-playfair font-semibold text-mocha-700 mb-4">
                    Información de entrega
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-dusty-rose-600 mt-1" />
                      <div>
                        <div className="font-playfair font-semibold text-mocha-700">
                          Tiempo de preparación
                        </div>
                        <div className="text-mocha-600 font-source-serif">
                          {product.preparationTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MapPin className="w-5 h-5 text-dusty-rose-600 mt-1" />
                      <div>
                        <div className="font-playfair font-semibold text-mocha-700">
                          Zona de entrega
                        </div>
                        <div className="text-mocha-600 font-source-serif">
                          Santo Domingo y alrededores
                        </div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <MessageCircle className="w-5 h-5 text-dusty-rose-600 mt-1" />
                      <div>
                        <div className="font-playfair font-semibold text-mocha-700">
                          Consultas
                        </div>
                        <div className="text-mocha-600 font-source-serif">
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
          <section className="py-20 bg-gradient-to-br from-cream-100 via-white to-cream-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-playfair font-bold text-mocha-700 mb-4">
                    También te podría
                    <span className="block text-dusty-rose-600 italic mt-2">
                      Encantar
                    </span>
                  </h2>
                  <div className="w-24 h-1 bg-gradient-to-r from-dusty-rose-400 to-dusty-rose-600 mx-auto rounded-full"></div>
                </div>

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
                        className="block bg-white rounded-3xl shadow-gentle hover:shadow-warm transition-all duration-300 overflow-hidden border border-dusty-rose-100 group transform hover:scale-105"
                      >
                        <div className="aspect-square bg-gradient-to-br from-dusty-rose-50 to-cream-50 overflow-hidden">
                          <OptimizedImage
                            src={
                              relatedProduct.thumbnailImage ||
                              "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                            }
                            alt={relatedProduct.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            aspectRatio="square"
                            fallbackSrc="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                          />
                        </div>
                        <div className="p-6">
                          <h3 className="text-xl font-playfair font-semibold text-mocha-700 mb-2">
                            {relatedProduct.name}
                          </h3>
                          <p className="text-mocha-600 font-source-serif text-sm mb-4 line-clamp-2">
                            {relatedProduct.shortDescription}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-dusty-rose-600 font-playfair font-bold text-lg">
                              {formatPrice(relatedProduct.price)}
                            </span>
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
