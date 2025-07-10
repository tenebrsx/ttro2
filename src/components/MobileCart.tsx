import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  Plus,
  Minus,
  ShoppingBag,
  MessageCircle,
  Trash2,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { formatPrice } from "../utils/currency";
import Button from "./Button";

const MobileCart: React.FC = () => {
  const {
    items,
    isOpen,
    total,
    itemCount,
    updateQuantity,
    removeItem,
    closeCart,
    clearCart,
  } = useCart();

  const generateWhatsAppMessage = () => {
    const businessPhone = "+1809XXXXXXX"; // Replace with actual WhatsApp business number

    let message =
      "¡Hola! Me gustaría hacer un pedido de los siguientes postres:\n\n";

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: ${formatPrice(item.price)}\n`;
      if (item.customizations && item.customizations.length > 0) {
        message += `   Personalizaciones: ${item.customizations.join(", ")}\n`;
      }
      if (item.notes) {
        message += `   Notas: ${item.notes}\n`;
      }
      message += "\n";
    });

    message += `Total: ${formatPrice(total)}\n\n`;
    message +=
      "Por favor, confírmenme la disponibilidad y el tiempo de preparación. ¡Gracias!";

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${businessPhone}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
    clearCart();
    closeCart();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 lg:hidden"
            onClick={closeCart}
          />

          {/* Cart Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-sm bg-white z-50 lg:hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-dusty-rose/20 bg-cream/30">
              <div className="flex items-center space-x-2">
                <ShoppingBag className="w-5 h-5 text-dusty-rose" />
                <h2 className="text-lg font-cormorant text-mocha font-medium">
                  Mi Pedido
                </h2>
                {itemCount > 0 && (
                  <span className="bg-dusty-rose text-white text-xs px-2 py-1 rounded-full">
                    {itemCount}
                  </span>
                )}
              </div>

              <button
                onClick={closeCart}
                className="p-2 text-mocha/70 hover:text-mocha rounded-full hover:bg-dusty-rose/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Content */}
            <div className="flex flex-col h-full">
              {items.length === 0 ? (
                /* Empty State */
                <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 bg-dusty-rose/10 rounded-full flex items-center justify-center mb-4">
                    <ShoppingBag className="w-8 h-8 text-dusty-rose/60" />
                  </div>
                  <h3 className="text-lg font-cormorant text-mocha mb-2">
                    Tu carrito está vacío
                  </h3>
                  <p className="text-mocha/60 font-karla text-sm mb-6">
                    Descubre nuestros deliciosos postres y agrega algunos a tu
                    carrito
                  </p>
                  <Button
                    variant="secondary"
                    size="md"
                    onClick={closeCart}
                    rounded="organic"
                    className="px-6"
                  >
                    Seguir Comprando
                  </Button>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    <AnimatePresence>
                      {items.map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, x: -100 }}
                          className="bg-white border border-dusty-rose/20 rounded-2xl p-4 shadow-gentle"
                        >
                          <div className="flex space-x-3">
                            {/* Product Image */}
                            <div className="w-16 h-16 rounded-xl overflow-hidden bg-dusty-rose/10 flex-shrink-0">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "/images/placeholder-dessert.jpg";
                                }}
                              />
                            </div>

                            {/* Product Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="font-cormorant text-mocha font-medium text-sm leading-tight mb-1">
                                {item.name}
                              </h4>
                              <p className="text-dusty-rose font-karla font-medium text-sm mb-2">
                                {formatPrice(item.price)}
                              </p>

                              {/* Customizations */}
                              {item.customizations &&
                                item.customizations.length > 0 && (
                                  <div className="mb-2">
                                    <p className="text-xs text-mocha/60 font-karla">
                                      {item.customizations.join(", ")}
                                    </p>
                                  </div>
                                )}

                              {/* Notes */}
                              {item.notes && (
                                <div className="mb-2">
                                  <p className="text-xs text-mocha/60 font-karla italic">
                                    &ldquo;{item.notes}&rdquo;
                                  </p>
                                </div>
                              )}

                              {/* Quantity Controls */}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity - 1)
                                    }
                                    className="w-7 h-7 rounded-full bg-dusty-rose/10 flex items-center justify-center text-dusty-rose hover:bg-dusty-rose hover:text-white transition-colors"
                                  >
                                    <Minus className="w-3 h-3" />
                                  </button>

                                  <span className="w-8 text-center font-karla font-medium text-sm text-mocha">
                                    {item.quantity}
                                  </span>

                                  <button
                                    onClick={() =>
                                      updateQuantity(item.id, item.quantity + 1)
                                    }
                                    className="w-7 h-7 rounded-full bg-dusty-rose/10 flex items-center justify-center text-dusty-rose hover:bg-dusty-rose hover:text-white transition-colors"
                                  >
                                    <Plus className="w-3 h-3" />
                                  </button>
                                </div>

                                <button
                                  onClick={() => removeItem(item.id)}
                                  className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>

                  {/* Total & Checkout */}
                  <div className="border-t border-dusty-rose/20 p-4 bg-cream/30">
                    {/* Total */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-cormorant text-lg text-mocha">
                        Total:
                      </span>
                      <span className="font-cormorant text-xl text-dusty-rose font-medium">
                        {formatPrice(total)}
                      </span>
                    </div>

                    {/* Delivery Note */}
                    <div className="bg-warm-blush/20 border border-warm-blush/30 rounded-xl p-3 mb-4">
                      <p className="text-xs text-mocha/70 font-karla text-center">
                        Los pedidos se coordinan por WhatsApp para confirmar
                        disponibilidad y tiempo de entrega
                      </p>
                    </div>

                    {/* WhatsApp Checkout Button */}
                    <Button
                      variant="gradient"
                      size="lg"
                      fullWidth
                      rounded="organic"
                      onClick={generateWhatsAppMessage}
                      icon={MessageCircle}
                      iconPosition="left"
                      className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 shadow-lg"
                    >
                      Continuar con WhatsApp
                    </Button>

                    {/* Clear Cart */}
                    <button
                      onClick={clearCart}
                      className="w-full mt-3 text-mocha/60 hover:text-mocha text-sm font-karla transition-colors"
                    >
                      Vaciar carrito
                    </button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileCart;
