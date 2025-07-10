import { FC } from "react";
import { motion } from "framer-motion";
import { ShoppingBag, Plus, Minus, Trash2, ArrowLeft } from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";
import { formatPrice } from "../utils/currency";
import PageTransition from "../components/PageTransition";
import SEO from "../components/SEO";

const Cart: FC = () => {
  const { items, updateQuantity, removeItem, clearCart, total, itemCount } =
    useCart();
  const navigate = useNavigate();

  const handleWhatsAppCheckout = () => {
    if (items.length === 0) return;

    const orderDetails = items
      .map(
        (item) =>
          `• ${item.name} (x${item.quantity}) - ${formatPrice(item.price * item.quantity)}`,
      )
      .join("\n");

    const message = `¡Hola! Me gustaría hacer el siguiente pedido:\n\n${orderDetails}\n\nTotal: ${formatPrice(total)}\n\n¡Gracias!`;

    const whatsappUrl = `https://wa.me/18096581245?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  if (items.length === 0) {
    return (
      <PageTransition>
        <SEO
          title="Carrito de Compras - Cucinanostrard"
          description="Tu carrito de compras está vacío. Explora nuestros deliciosos postres artesanales."
        />
        <div className="min-h-screen bg-gradient-to-br from-cream to-white pt-24 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <ShoppingBag className="w-24 h-24 text-dusty-rose/30 mx-auto mb-6" />
                <h1 className="text-3xl font-playfair text-dark-cocoa mb-4">
                  Tu carrito está vacío
                </h1>
                <p className="text-mocha/70 font-source-serif mb-8">
                  Explora nuestros deliciosos postres artesanales y encuentra tu
                  favorito.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center">
                  <button
                    onClick={() => navigate("/menu")}
                    className="w-full sm:w-auto bg-dusty-rose text-white px-8 py-3 rounded-full hover:bg-dusty-rose/90 transition-colors font-medium"
                  >
                    Ver Menú
                  </button>
                  <button
                    onClick={() => navigate("/")}
                    className="w-full sm:w-auto border-2 border-dusty-rose text-dusty-rose px-8 py-3 rounded-full hover:bg-dusty-rose hover:text-white transition-colors font-medium"
                  >
                    Volver al Inicio
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <SEO
        title="Carrito de Compras - Cucinanostrard"
        description="Revisa tu selección de postres artesanales y procede a realizar tu pedido por WhatsApp."
      />
      <div className="min-h-screen bg-gradient-to-br from-cream to-white pt-24 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-dusty-rose hover:text-dusty-rose/80 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Volver
            </button>
            <h1 className="text-3xl font-playfair text-dark-cocoa mb-2">
              Tu Carrito
            </h1>
            <p className="text-mocha/70 font-source-serif">
              {itemCount} {itemCount === 1 ? "artículo" : "artículos"} en tu
              carrito
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white rounded-2xl shadow-gentle p-6 border border-dusty-rose/10"
              >
                <div className="space-y-6">
                  {items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-center space-x-4 p-4 border border-dusty-rose/10 rounded-xl hover:shadow-md transition-shadow"
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/images/placeholder-dessert.jpg";
                        }}
                      />

                      <div className="flex-1">
                        <h3 className="font-playfair text-dark-cocoa text-lg mb-1">
                          {item.name}
                        </h3>
                        <p className="text-dusty-rose font-medium">
                          {formatPrice(item.price)}
                        </p>
                        {item.notes && (
                          <p className="text-sm text-mocha/60 mt-1">
                            Nota: {item.notes}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity - 1)
                          }
                          className="w-8 h-8 rounded-full bg-dusty-rose/10 text-dusty-rose hover:bg-dusty-rose hover:text-white transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-medium text-dark-cocoa">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(item.id, item.quantity + 1)
                          }
                          className="w-8 h-8 rounded-full bg-dusty-rose/10 text-dusty-rose hover:bg-dusty-rose hover:text-white transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-red-500 hover:text-red-700 transition-colors p-2"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </motion.div>
                  ))}
                </div>

                {/* Clear Cart Button */}
                <div className="mt-6 pt-6 border-t border-dusty-rose/10">
                  <button
                    onClick={clearCart}
                    className="text-red-500 hover:text-red-700 transition-colors text-sm"
                  >
                    Vaciar carrito
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-2xl shadow-gentle p-6 border border-dusty-rose/10 sticky top-24"
              >
                <h2 className="text-xl font-playfair text-dark-cocoa mb-6">
                  Resumen del pedido
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span className="text-mocha/70">
                        {item.name} x{item.quantity}
                      </span>
                      <span className="text-dark-cocoa font-medium">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-dusty-rose/10 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-medium">
                    <span className="text-dark-cocoa">Total</span>
                    <span className="text-dusty-rose">
                      {formatPrice(total)}
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleWhatsAppCheckout}
                  className="w-full bg-green-500 text-white py-3 rounded-full hover:bg-green-600 transition-colors font-medium mb-4"
                >
                  Pedir por WhatsApp
                </button>

                <div className="text-center">
                  <p className="text-xs text-mocha/60">
                    Al hacer clic en &quot;Pedir por WhatsApp&quot;, serás
                    redirigido a WhatsApp para completar tu pedido.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Cart;
