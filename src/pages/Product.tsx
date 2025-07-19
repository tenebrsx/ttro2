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
import OptimizedImage from "../components/OptimizedImage";
import { formatPrice, formatPriceWithUnit } from "../utils/currency";
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
        `Precio unitario: ${formatPriceWithUnit(product.price, (product as any).priceUnit)}\n` +
        `Total: ${formatPrice(product.price * quantity)}\n` +
        `Tiempo de preparación: ${product.preparationTime}\n` +
        `Sirve para: ${product.serves}${customizationsText}\n\n` +
        `¿Podrías confirmarme la disponibilidad y coordinar los detalles?`,
    );

    window.open(`https://wa.me/18096581245?text=${message}`, "_blank");
  };

  const handleShare = async () => {
    if (!product) return;

    const shareData = {
      title: `${product.name} - Tierra Del Repostero`,
      text: `¡Mira este delicioso ${product.name}! ${product.shortDescription || product.description || "Delicioso postre artesanal"}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (error) {
        console.log("Share failed:", error);
        // Fallback to copying URL
        navigator.clipboard.writeText(window.location.href);
        alert("Enlace copiado al portapapeles");
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      alert("Enlace copiado al portapapeles");
    }
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-400 to-cream-500 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 shadow-sage"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30 shadow-warm"></div>

        <div className="text-center relative z-10">
          <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-elegant relative overflow-hidden">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-sage-600"></div>
          </div>
          <p className="text-xl font-academy text-cocoa-500 tracking-academy-normal">
            Cargando producto...
          </p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cream-400 to-cream-500 relative overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 shadow-sage"></div>
        <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30 shadow-warm"></div>

        <div className="text-center relative z-10 max-w-2xl mx-auto px-4">
          <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
            <div className="text-3xl">🍰</div>
          </div>

          <h1 className="text-3xl font-academy text-cocoa-500 text-shadow-elegant mb-4 tracking-academy-hero">
            Producto no encontrado
          </h1>

          <p className="text-lg font-bodoni text-cocoa-500/80 mb-8 leading-body-elegant">
            Lo sentimos, no pudimos encontrar el producto que buscas. Te
            invitamos a explorar nuestro
            <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
              {" "}
              delicioso menú
            </span>
            .
          </p>

          <div className="relative overflow-hidden rounded-full">
            <Link
              to="/menu"
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-sage-500 to-sage-600 text-white px-8 py-4 rounded-full hover:from-sage-600 hover:to-sage-700 transition-all duration-500 font-academy font-medium shadow-premium hover:shadow-luxury relative overflow-hidden group"
            >
              <ArrowLeft className="w-5 h-5 relative z-10" />
              <span className="relative z-10">Volver al menú</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-br from-cream-400 to-cream-500 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 shadow-sage"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30 shadow-warm"></div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
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
      </div>

      {/* Main Product Section */}
      <section className="pb-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Product Images */}
            <div className="space-y-6">
              {/* Main Image */}
              <div className="relative aspect-square rounded-3xl overflow-hidden shadow-premium bg-gradient-to-br from-sage-50 to-cream-50 border border-sage-200/50 group">
                <OptimizedImage
                  src={
                    allImages[selectedImage] ||
                    "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                  }
                  alt={product.name}
                  className="w-full h-full transition-transform duration-700 group-hover:scale-105"
                  aspectRatio="square"
                  objectFit="contain"
                  priority={true}
                  fallbackSrc="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                />
              </div>

              {/* Thumbnail Images */}
              {allImages.length > 1 && (
                <div className="flex space-x-4 overflow-x-auto pb-2">
                  {allImages.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
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
                        className="w-full h-full transition-transform duration-500 group-hover:scale-110"
                        aspectRatio="square"
                        objectFit="contain"
                        fallbackSrc="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Information */}
            <div className="space-y-8">
              {/* Header */}
              <div className="space-y-6">
                <div className="flex items-center space-x-2 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-elegant border border-sage-100/50 w-fit">
                  <Sparkles className="w-5 h-5 text-sage-500" />
                  <span className="text-sage-600 font-academy font-medium uppercase tracking-wide text-sm">
                    Postre Artesanal
                  </span>
                </div>

                <div className="mb-6">
                  <h1 className="text-4xl lg:text-5xl font-academy leading-elegant text-cocoa-500 text-shadow-elegant tracking-academy-hero font-bold">
                    {product.name}
                  </h1>
                  <div className="mt-2 w-24 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"></div>
                </div>

                <p className="text-xl font-bodoni text-cocoa-500/80 leading-body-elegant font-normal">
                  {product.shortDescription}
                </p>

                {/* Quick Info Pills */}
                <div className="flex flex-wrap gap-3">
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-sage-200/50 shadow-elegant hover:shadow-premium transition-all duration-500 group">
                    <Clock className="w-4 h-4 text-sage-600 group-hover:text-sage-700 transition-colors duration-300" />
                    <span className="text-sm text-cocoa-500 font-academy font-medium">
                      {product.preparationTime}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-sage-200/50 shadow-elegant hover:shadow-premium transition-all duration-500 group">
                    <Users className="w-4 h-4 text-sage-600 group-hover:text-sage-700 transition-colors duration-300" />
                    <span className="text-sm text-cocoa-500 font-academy font-medium">
                      {product.serves}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full border border-sage-200/50 shadow-elegant hover:shadow-premium transition-all duration-500 group">
                    <ChefHat className="w-4 h-4 text-sage-600 group-hover:text-sage-700 transition-colors duration-300" />
                    <span className="text-sm text-cocoa-500 font-academy font-medium">
                      {product.difficulty}
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Section */}
              <div className="bg-gradient-to-r from-sage-50 to-cream-50 rounded-3xl p-8 border border-sage-200/50 shadow-premium hover:shadow-luxury transition-all duration-500 relative overflow-hidden group">
                <div className="flex items-center justify-between relative z-10">
                  <div className="space-y-1">
                    <span className="text-4xl font-academy font-bold text-cocoa-500 text-shadow-elegant">
                      {formatPriceWithUnit(
                        product.price,
                        (product as any).priceUnit,
                      )}
                    </span>
                    {product.originalPrice &&
                      product.originalPrice > product.price && (
                        <div className="flex items-center space-x-3">
                          <span className="text-lg text-cocoa-400 line-through font-bodoni">
                            {formatPriceWithUnit(
                              product.originalPrice,
                              (product as any).priceUnit,
                            )}
                          </span>
                          <span className="bg-gradient-to-r from-red-500 to-red-600 text-white px-3 py-1 rounded-full text-sm font-academy font-medium shadow-elegant">
                            ¡Oferta!
                          </span>
                        </div>
                      )}
                  </div>
                </div>
              </div>

              {/* Quantity & Total */}
              <div className="space-y-4 bg-white/90 backdrop-blur-sm rounded-3xl p-6 border border-sage-200/50 shadow-premium">
                <div className="flex items-center justify-between">
                  <label className="text-lg font-academy font-semibold text-cocoa-500">
                    Cantidad
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center hover:bg-sage-100 transition-all duration-500 shadow-elegant hover:shadow-premium group"
                    >
                      <Minus className="w-5 h-5 text-sage-600 group-hover:text-sage-700 transition-colors duration-300" />
                    </button>
                    <span className="w-20 text-center font-academy font-bold text-2xl text-cocoa-500">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-full bg-sage-50 border border-sage-200 flex items-center justify-center hover:bg-sage-100 transition-all duration-500 shadow-elegant hover:shadow-premium group"
                    >
                      <Plus className="w-5 h-5 text-sage-600 group-hover:text-sage-700 transition-colors duration-300" />
                    </button>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-cocoa-500/80 font-bodoni">Total: </span>
                  <span className="text-2xl font-academy font-bold text-sage-600">
                    {formatPrice(product.price * quantity)}
                  </span>
                </div>
              </div>

              {/* Customizations */}
              {product.customizations.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-academy font-semibold text-cocoa-500">
                    Personalizaciones disponibles
                  </h3>
                  <div className="space-y-3">
                    {product.customizations.map((customization, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-3 p-4 rounded-xl border border-sage-200/50 hover:bg-sage-50 transition-all duration-500 cursor-pointer bg-white/90 backdrop-blur-sm shadow-elegant hover:shadow-premium group"
                      >
                        <input
                          type="checkbox"
                          checked={selectedCustomizations.includes(
                            customization,
                          )}
                          onChange={() => toggleCustomization(customization)}
                          className="w-5 h-5 rounded border-sage-300 text-sage-600 focus:border-sage-500 focus:ring-sage-500/20 transition-all duration-300"
                        />
                        <span className="text-cocoa-500 font-bodoni group-hover:text-cocoa-600 transition-colors duration-300">
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
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-4 px-6 rounded-full font-academy font-bold text-lg hover:from-green-600 hover:to-green-700 transition-all duration-500 shadow-premium hover:shadow-luxury flex items-center justify-center space-x-3 relative overflow-hidden group"
                >
                  <MessageCircle className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Pedir por WhatsApp</span>
                </button>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleShare}
                    className="flex items-center justify-center space-x-2 py-3 px-4 border border-sage-300 rounded-full hover:bg-sage-50 transition-all duration-500 font-academy font-medium text-cocoa-500 shadow-elegant hover:shadow-premium relative overflow-hidden group bg-white/90 backdrop-blur-sm"
                  >
                    <Share2 className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Compartir</span>
                  </button>
                  <button
                    onClick={() => {
                      if (!product) return;
                      const message = encodeURIComponent(
                        `¡Hola! Me interesa agendar un pedido de:\n\n` +
                          `*${product.name}*\n` +
                          `Precio: ${formatPriceWithUnit(product.price, (product as any).priceUnit)}\n` +
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
                    <Calendar className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Agendar</span>
                  </button>
                </div>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-sage-200/50">
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-elegant group-hover:shadow-premium transition-all duration-500 group-hover:scale-110">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs text-cocoa-500 font-academy font-medium group-hover:text-cocoa-600 transition-colors duration-300">
                    Calidad Garantizada
                  </span>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-elegant group-hover:shadow-premium transition-all duration-500 group-hover:scale-110">
                    <Shield className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-xs text-cocoa-500 font-academy font-medium group-hover:text-cocoa-600 transition-colors duration-300">
                    Ingredientes Premium
                  </span>
                </div>
                <div className="text-center group">
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-3 shadow-elegant group-hover:shadow-premium transition-all duration-500 group-hover:scale-110">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-xs text-cocoa-500 font-academy font-medium group-hover:text-cocoa-600 transition-colors duration-300">
                    Hecho a Mano
                  </span>
                </div>
              </div>
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
              <div className="bg-gradient-to-br from-cream-50 to-white rounded-3xl shadow-gentle p-8 border border-dusty-rose-100">
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
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="space-y-6">
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
            </div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-20 bg-gradient-to-br from-cream-100 via-white to-cream-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              {relatedProducts.map((relatedProduct) => (
                <div key={relatedProduct.id}>
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
                        className="w-full h-full group-hover:scale-110 transition-transform duration-500"
                        aspectRatio="square"
                        objectFit="contain"
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
                          {formatPriceWithUnit(
                            relatedProduct.price,
                            (relatedProduct as any).priceUnit,
                          )}
                        </span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Product;
