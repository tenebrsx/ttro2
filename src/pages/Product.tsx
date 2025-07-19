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
import {
  FadeReveal,
  TextReveal,
  StaggerReveal,
  StaggerChild,
  CinematicReveal,
} from "../components/animations/SophisticatedAnimations";
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
  const [quantity, setQuantity] = useState(1);

  const { products } = useProducts();
  const { getProductById } = useProductSearch();

  // Combine thumbnailImage and images array for display
  const allImages = product
    ? [
        ...(product.thumbnailImage ? [product.thumbnailImage] : []),
        ...(product.images || []).filter((img) => img && img.trim() !== ""),
      ].filter((img, index, arr) => arr.indexOf(img) === index)
    : []; // Remove duplicates

  useEffect(() => {
    const loadProduct = async () => {
      if (id) {
        console.log("🔍 Product page - Loading product with ID:", id);
        setLoading(true);
        try {
          const productData = await getProductById(id);
          console.log("📦 Product page - Product data received:", productData);
          if (productData) {
            console.log("✅ Product page - Product found, setting product");
            setProduct(productData);
          } else {
            console.log(
              "❌ Product page - Product not found, redirecting to menu",
            );
            navigate("/menu");
          }
        } catch (error) {
          console.error("💥 Product page - Error loading product:", error);
          navigate("/menu");
        } finally {
          setLoading(false);
        }
      } else {
        console.log("⚠️ Product page - No ID provided in URL params");
      }
    };

    loadProduct();
  }, [id, getProductById, navigate]);

  // Reset selected image when product changes
  useEffect(() => {
    setSelectedImage(0);
  }, [product]);

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
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-400 to-cream-500 relative overflow-hidden">
          {/* Background decorative elements */}
          <FadeReveal delay={0.5} duration={2.0} direction="none">
            <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 animate-pulse-soft shadow-sage"></div>
          </FadeReveal>
          <FadeReveal delay={0.8} duration={2.0} direction="none">
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30 shadow-warm"></div>
          </FadeReveal>

          <div className="text-center relative z-10">
            <CinematicReveal direction="center" delay={0.2} duration={1.5}>
              <FadeReveal
                delay={0.4}
                duration={0.8}
                direction="up"
                distance={30}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-elegant relative overflow-hidden">
                  <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sage-600"></div>
                  {/* Sophisticated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer transition-transform duration-2000 ease-out rounded-3xl"></div>
                </div>
              </FadeReveal>
            </CinematicReveal>

            <TextReveal
              delay={0.8}
              staggerDelay={0.1}
              className="text-xl font-academy text-cocoa-500 tracking-academy-normal"
            >
              Cargando producto...
            </TextReveal>
          </div>
        </div>
      </PageTransition>
    );
  }

  if (!product) {
    return (
      <PageTransition>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-400 to-cream-500 relative overflow-hidden">
          {/* Background decorative elements */}
          <FadeReveal delay={0.5} duration={2.0} direction="none">
            <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 animate-pulse-soft shadow-sage"></div>
          </FadeReveal>
          <FadeReveal delay={0.8} duration={2.0} direction="none">
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30 shadow-warm"></div>
          </FadeReveal>

          <div className="text-center relative z-10 max-w-2xl mx-auto px-4">
            <CinematicReveal direction="iris" delay={0.2} duration={1.5}>
              <FadeReveal
                delay={0.4}
                duration={0.8}
                direction="up"
                distance={30}
              >
                <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
                  <div className="text-3xl">🍰</div>
                </div>
              </FadeReveal>
            </CinematicReveal>

            <TextReveal
              delay={0.8}
              staggerDelay={0.1}
              className="text-3xl font-academy text-cocoa-500 text-shadow-elegant mb-4 tracking-academy-hero"
            >
              Producto no encontrado
            </TextReveal>

            <FadeReveal delay={1.4} duration={0.8} direction="up" distance={20}>
              <p className="text-lg font-bodoni text-cocoa-500/80 mb-8 leading-body-elegant">
                Lo sentimos, no pudimos encontrar el producto que buscas. Te
                invitamos a explorar nuestro
                <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                  {" "}
                  delicioso menú
                </span>
                .
              </p>
            </FadeReveal>

            <FadeReveal delay={1.8} duration={0.8} direction="up" distance={30}>
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="relative overflow-hidden rounded-full"
              >
                <Link
                  to="/menu"
                  className="inline-flex items-center space-x-2 bg-gradient-to-r from-sage-500 to-sage-600 text-white px-8 py-4 rounded-full hover:from-sage-600 hover:to-sage-700 transition-all duration-500 font-academy font-medium shadow-premium hover:shadow-luxury relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                  <ArrowLeft className="w-5 h-5 relative z-10" />
                  <span className="relative z-10">Volver al menú</span>
                </Link>
              </motion.div>
            </FadeReveal>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="pt-20 min-h-screen bg-gradient-to-br from-cream-400 to-cream-500 relative overflow-hidden">
        {/* Background decorative elements */}
        <FadeReveal delay={0.5} duration={2.0} direction="none">
          <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 animate-pulse-soft shadow-sage"></div>
        </FadeReveal>
        <FadeReveal delay={0.8} duration={2.0} direction="none">
          <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30 shadow-warm"></div>
        </FadeReveal>

        {/* Breadcrumb */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
          <FadeReveal delay={0.2} duration={0.8} direction="left" distance={30}>
            <div className="flex items-center space-x-2 text-sm text-cocoa-500/80 mb-8 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-elegant border border-sage-100/50 w-fit">
              <Link
                to="/"
                className="hover:text-sage-600 transition-colors duration-300 font-academy font-medium tracking-wide"
              >
                Inicio
              </Link>
              <span className="text-sage-300">•</span>
              <Link
                to="/menu"
                className="hover:text-sage-600 transition-colors duration-300 font-academy font-medium tracking-wide"
              >
                Menú
              </Link>
              <span className="text-sage-300">•</span>
              <span className="text-sage-600 font-academy font-medium tracking-wide">
                {product.name}
              </span>
            </div>
          </FadeReveal>
        </div>

        {/* Main Product Section */}
        <section className="pb-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Product Images */}
              <FadeReveal
                delay={0.4}
                duration={1.0}
                direction="left"
                distance={50}
                className="space-y-6"
              >
                {/* Main Image */}
                <div className="relative aspect-square rounded-3xl overflow-hidden shadow-premium bg-gradient-to-br from-sage-50 to-cream-50 border border-sage-200/50 group">
                  <OptimizedImage
                    src={
                      allImages[selectedImage] ||
                      "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    aspectRatio="square"
                    priority={true}
                    fallbackSrc="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  />
                  {/* Sophisticated shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                </div>

                {/* Thumbnail Images */}
                {allImages.length > 1 && (
                  <StaggerReveal
                    staggerDelay={0.1}
                    childDelay={0.8}
                    className="flex space-x-4 overflow-x-auto pb-2"
                  >
                    {allImages.map((image, index) => (
                      <StaggerChild key={index}>
                        <motion.button
                          onClick={() => setSelectedImage(index)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`flex-shrink-0 w-24 h-24 rounded-xl overflow-hidden border-2 transition-all duration-500 relative group ${
                            selectedImage === index
                              ? "border-sage-500 shadow-premium"
                              : "border-sage-200 hover:border-sage-400 shadow-elegant hover:shadow-premium"
                          }`}
                        >
                          <OptimizedImage
                            src={
                              image ||
                              "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                            }
                            alt={`${product.name} ${index + 1}`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            aspectRatio="square"
                            fallbackSrc="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                          />
                          {/* Subtle shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                        </motion.button>
                      </StaggerChild>
                    ))}
                  </StaggerReveal>
                )}
              </FadeReveal>

              {/* Product Information */}
              <div className="space-y-8">
                {/* Header */}
                <div className="space-y-6">
                  <FadeReveal delay={0.6} duration={0.8} direction="none">
                    <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-elegant border border-sage-100/50 w-fit">
                      <Sparkles className="w-5 h-5 text-sage-500" />
                      <span className="text-sage-600 font-academy font-medium uppercase tracking-wide text-sm">
                        Postre Artesanal
                      </span>
                    </div>
                  </FadeReveal>

                  <div className="mb-6">
                    <TextReveal
                      delay={0.8}
                      staggerDelay={0.1}
                      className="text-4xl lg:text-5xl font-academy leading-elegant text-cocoa-500 text-shadow-elegant tracking-academy-hero font-bold"
                    >
                      {product.name}
                    </TextReveal>
                    <FadeReveal
                      delay={1.4}
                      duration={0.8}
                      direction="none"
                      className="mt-2 w-24 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
                    >
                      <div></div>
                    </FadeReveal>
                  </div>

                  <FadeReveal
                    delay={1.8}
                    duration={0.8}
                    direction="up"
                    distance={20}
                  >
                    <p className="text-xl font-bodoni text-cocoa-500/80 leading-body-elegant font-normal">
                      {product.shortDescription}
                    </p>
                  </FadeReveal>

                  {/* Quick Info Pills */}
                  <StaggerReveal
                    staggerDelay={0.1}
                    childDelay={2.2}
                    className="flex flex-wrap gap-3"
                  >
                    <StaggerChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-sage-200/50 shadow-elegant hover:shadow-premium transition-all duration-500 group"
                      >
                        <Clock className="w-4 h-4 text-sage-600 group-hover:text-sage-700 transition-colors duration-300" />
                        <span className="text-sm text-cocoa-500 font-academy font-medium">
                          {product.preparationTime}
                        </span>
                      </motion.div>
                    </StaggerChild>
                    <StaggerChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-sage-200/50 shadow-elegant hover:shadow-premium transition-all duration-500 group"
                      >
                        <Users className="w-4 h-4 text-sage-600 group-hover:text-sage-700 transition-colors duration-300" />
                        <span className="text-sm text-cocoa-500 font-academy font-medium">
                          {product.serves}
                        </span>
                      </motion.div>
                    </StaggerChild>
                    <StaggerChild>
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-sage-200/50 shadow-elegant hover:shadow-premium transition-all duration-500 group"
                      >
                        <ChefHat className="w-4 h-4 text-sage-600 group-hover:text-sage-700 transition-colors duration-300" />
                        <span className="text-sm text-cocoa-500 font-academy font-medium">
                          {product.difficulty}
                        </span>
                      </motion.div>
                    </StaggerChild>
                  </StaggerReveal>
                </div>

                {/* Price Section */}
                <FadeReveal
                  delay={2.6}
                  duration={0.8}
                  direction="up"
                  distance={30}
                >
                  <div className="bg-gradient-to-r from-sage-50 to-cream-50 rounded-3xl p-8 border border-sage-200/50 shadow-premium hover:shadow-luxury transition-all duration-500 relative overflow-hidden group">
                    {/* Sophisticated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>

                    <div className="flex items-center justify-between relative z-10">
                      <div className="space-y-1">
                        <span className="text-4xl font-academy font-bold text-cocoa-500 text-shadow-elegant">
                          {formatPrice(product.price)}
                        </span>
                        {product.originalPrice &&
                          product.originalPrice > product.price && (
                            <div className="flex items-center space-x-3">
                              <span className="text-lg text-cocoa-400 line-through font-bodoni">
                                {formatPrice(product.originalPrice)}
                              </span>
                              <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-academy font-medium shadow-elegant">
                                ¡Oferta!
                              </span>
                            </div>
                          )}
                      </div>
                    </div>
                  </div>
                </FadeReveal>

                {/* Quantity & Total */}
                <FadeReveal
                  delay={3.0}
                  duration={0.8}
                  direction="up"
                  distance={20}
                >
                  <div className="space-y-4 bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-sage-200/50 shadow-premium">
                    <div className="flex items-center justify-between">
                      <label className="text-lg font-academy font-semibold text-cocoa-500">
                        Cantidad
                      </label>
                      <div className="flex items-center space-x-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(Math.max(1, quantity - 1))}
                          className="w-12 h-12 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center hover:bg-sage-100 transition-all duration-500 shadow-elegant hover:shadow-premium group"
                        >
                          <Minus className="w-5 h-5 text-sage-600 group-hover:text-sage-700 transition-colors duration-300" />
                        </motion.button>
                        <span className="w-20 text-center font-academy font-bold text-2xl text-cocoa-500">
                          {quantity}
                        </span>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => setQuantity(quantity + 1)}
                          className="w-12 h-12 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center hover:bg-sage-100 transition-all duration-500 shadow-elegant hover:shadow-premium group"
                        >
                          <Plus className="w-5 h-5 text-sage-600 group-hover:text-sage-700 transition-colors duration-300" />
                        </motion.button>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="text-cocoa-500/80 font-bodoni">
                        Total:{" "}
                      </span>
                      <span className="text-2xl font-academy font-bold text-sage-600">
                        {formatPrice(product.price * quantity)}
                      </span>
                    </div>
                  </div>
                </FadeReveal>

                {/* Customizations */}
                {product.customizations.length > 0 && (
                  <FadeReveal
                    delay={3.4}
                    duration={0.8}
                    direction="up"
                    distance={30}
                  >
                    <div className="space-y-4">
                      <TextReveal
                        delay={0.2}
                        staggerDelay={0.08}
                        className="text-lg font-academy font-semibold text-cocoa-500"
                      >
                        Personalizaciones disponibles
                      </TextReveal>
                      <StaggerReveal
                        staggerDelay={0.1}
                        childDelay={0.4}
                        className="space-y-3"
                      >
                        {product.customizations.map((customization, index) => (
                          <StaggerChild key={index}>
                            <motion.label
                              whileHover={{ scale: 1.02, x: 4 }}
                              className="flex items-center space-x-3 p-4 rounded-xl border border-sage-200/50 hover:bg-sage-50 transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm shadow-elegant hover:shadow-premium group"
                            >
                              <input
                                type="checkbox"
                                checked={selectedCustomizations.includes(
                                  customization,
                                )}
                                onChange={() =>
                                  toggleCustomization(customization)
                                }
                                className="w-5 h-5 rounded border-sage-300 text-sage-600 focus:border-sage-500 focus:ring-sage-500/20 transition-all duration-300"
                              />
                              <span className="text-cocoa-500 font-bodoni group-hover:text-cocoa-600 transition-colors duration-300">
                                {customization}
                              </span>
                            </motion.label>
                          </StaggerChild>
                        ))}
                      </StaggerReveal>
                    </div>
                  </FadeReveal>
                )}

                {/* Action Buttons */}
                <StaggerReveal
                  staggerDelay={0.2}
                  childDelay={3.8}
                  className="space-y-4"
                >
                  <StaggerChild>
                    <motion.button
                      onClick={handleWhatsAppOrder}
                      whileHover={{ y: -2, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-full font-academy font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-500 shadow-premium hover:shadow-luxury flex items-center justify-center space-x-3 relative overflow-hidden group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                      <MessageCircle className="w-6 h-6 relative z-10" />
                      <span className="relative z-10">Pedir por WhatsApp</span>
                    </motion.button>
                  </StaggerChild>

                  <div className="grid grid-cols-2 gap-4">
                    <StaggerChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex items-center justify-center space-x-2 py-3 px-4 border border-sage-300 rounded-full hover:bg-sage-50 transition-all duration-500 font-academy font-medium text-cocoa-500 shadow-elegant hover:shadow-premium relative overflow-hidden group bg-white/90 backdrop-blur-sm"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-sage-50/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                        <Share2 className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Compartir</span>
                      </motion.button>
                    </StaggerChild>
                    <StaggerChild>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
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
                        className="flex items-center justify-center space-x-2 py-3 px-4 bg-gradient-to-r from-sage-100 to-sage-200 text-sage-700 rounded-full hover:from-sage-200 hover:to-sage-300 transition-all duration-500 font-academy font-medium shadow-elegant hover:shadow-premium relative overflow-hidden group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                        <Calendar className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Agendar</span>
                      </motion.button>
                    </StaggerChild>
                  </div>
                </StaggerReveal>

                {/* Trust Signals */}
                <FadeReveal
                  delay={4.2}
                  duration={0.8}
                  direction="up"
                  distance={30}
                >
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t border-sage-200/50">
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="text-center group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-elegant group-hover:shadow-premium transition-all duration-500 group-hover:scale-110">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <span className="text-xs text-cocoa-500 font-academy font-medium group-hover:text-cocoa-600 transition-colors duration-300">
                        Calidad Garantizada
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="text-center group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-elegant group-hover:shadow-premium transition-all duration-500 group-hover:scale-110">
                        <Shield className="w-6 h-6 text-blue-600" />
                      </div>
                      <span className="text-xs text-cocoa-500 font-academy font-medium group-hover:text-cocoa-600 transition-colors duration-300">
                        Ingredientes Premium
                      </span>
                    </motion.div>
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="text-center group"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-elegant group-hover:shadow-premium transition-all duration-500 group-hover:scale-110">
                        <Award className="w-6 h-6 text-purple-600" />
                      </div>
                      <span className="text-xs text-cocoa-500 font-academy font-medium group-hover:text-cocoa-600 transition-colors duration-300">
                        Hecho a Mano
                      </span>
                    </motion.div>
                  </div>
                </FadeReveal>
              </div>
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
                  <div className="w-24 h-1 bg-gradient-to-r from-sage-400 to-sage-600 mx-auto rounded-full"></div>
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
