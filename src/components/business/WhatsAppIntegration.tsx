import React, { useState } from "react";
import { motion } from "framer-motion";
import { formatPrice } from "../../utils/currency";
import {
  MessageCircle,
  Phone,
  Clock,
  MapPin,
  CreditCard,
  Banknote,
  Copy,
  Check,
  User,
  ShoppingCart,
  Info,
} from "lucide-react";

interface WhatsAppProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  preparationTime: string;
  serves: string;
  customizations: string[];
  allergens: string[];
}

interface WhatsAppOrder {
  items: Array<{
    product: WhatsAppProduct;
    quantity: number;
    customizations: string[];
    notes?: string;
  }>;
  customerInfo: {
    name: string;
    phone: string;
    deliveryType: "pickup" | "delivery";
    address?: string;
    preferredTime: string;
    specialInstructions?: string;
  };
  paymentMethod: "cash" | "bank_transfer";
  total: number;
}

interface WhatsAppIntegrationProps {
  businessPhone: string;
  businessName: string;
  products?: WhatsAppProduct[];
  enableCatalog?: boolean;
  enableQuickOrder?: boolean;
  showPaymentInfo?: boolean;
}

export const WhatsAppIntegration: React.FC<WhatsAppIntegrationProps> = ({
  businessPhone = "+1234567890",
  businessName = "Cucinanostrard",
  products = [],
  enableCatalog = true,
  enableQuickOrder = true, // eslint-disable-line @typescript-eslint/no-unused-vars
  showPaymentInfo = true,
}) => {
  const [selectedProducts, setSelectedProducts] = useState<
    WhatsAppOrder["items"]
  >([]);
  const [showOrderForm, setShowOrderForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<
    WhatsAppOrder["customerInfo"]
  >({
    name: "",
    phone: "",
    deliveryType: "pickup",
    preferredTime: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<"cash" | "bank_transfer">(
    "cash",
  );
  const [copied, setCopied] = useState<string | null>(null);

  // Mock products for demo
  const mockProducts: WhatsAppProduct[] = [
    {
      id: "1",
      name: "Tarta de Chocolate Premium",
      description: "Deliciosa tarta de chocolate con ganache y frutos rojos",
      price: 45.0,
      image: "/api/placeholder/300/200",
      category: "Tartas",
      preparationTime: "24 horas",
      serves: "8-10 personas",
      customizations: [
        "Sin gluten",
        "Decoración personalizada",
        "Mensaje especial",
      ],
      allergens: ["Gluten", "Huevos", "Lácteos"],
    },
    {
      id: "2",
      name: "Macarons Franceses",
      description: "Caja de 12 macarons artesanales en sabores variados",
      price: 24.0,
      image: "/api/placeholder/300/200",
      category: "Macarons",
      preparationTime: "48 horas",
      serves: "3-4 personas",
      customizations: [
        "Colores personalizados",
        "Sabores especiales",
        "Caja de regalo",
      ],
      allergens: ["Frutos secos", "Huevos"],
    },
    {
      id: "3",
      name: "Cupcakes Temáticos",
      description: "Set de 6 cupcakes con decoración temática personalizada",
      price: 18.0,
      image: "/api/placeholder/300/200",
      category: "Cupcakes",
      preparationTime: "12 horas",
      serves: "6 personas",
      customizations: [
        "Tema personalizado",
        "Colores específicos",
        "Toppers incluidos",
      ],
      allergens: ["Gluten", "Huevos", "Lácteos"],
    },
  ];

  const displayProducts = products.length > 0 ? products : mockProducts;

  const generateWhatsAppMessage = (
    type: "catalog" | "quick_order" | "inquiry" | "order",
    data?: WhatsAppOrder | WhatsAppProduct | null,
  ) => {
    const baseUrl = `https://wa.me/${businessPhone.replace(/[^\d]/g, "")}`;
    let message = "";

    switch (type) {
      case "catalog":
        message = `¡Hola! Me interesa conocer más sobre sus deliciosos postres artesanales. ¿Podrían enviarme su catálogo completo?`;
        break;

      case "quick_order":
        message = `¡Hola! Me gustaría hacer un pedido personalizado. ¿Podrían ayudarme con los detalles?`;
        break;

      case "inquiry":
        message = `¡Hola! Tengo algunas preguntas sobre sus servicios de repostería. ¿Podrían ayudarme?`;
        break;

      case "order":
        if (data && "items" in data) {
          message = generateOrderMessage(data as WhatsAppOrder);
        }
        break;
    }

    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  };

  const generateOrderMessage = (order: WhatsAppOrder) => {
    let message = `*NUEVO PEDIDO - ${businessName}*\n\n`;

    message += `*Cliente:* ${order.customerInfo.name}\n`;
    message += `*Teléfono:* ${order.customerInfo.phone}\n`;
    message += `*Fecha preferida:* ${order.customerInfo.preferredTime}\n`;
    message += `*Tipo:* ${order.customerInfo.deliveryType === "delivery" ? "Entrega a domicilio" : "Recoger en tienda"}\n`;

    if (order.customerInfo.address) {
      message += `*Dirección:* ${order.customerInfo.address}\n`;
    }

    message += `\n*PRODUCTOS:*\n`;

    order.items.forEach((item, index) => {
      message += `\n${index + 1}. *${item.product.name}*\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio: ${formatPrice(item.product.price)} c/u\n`;

      if (item.customizations.length > 0) {
        message += `   Personalizaciones: ${item.customizations.join(", ")}\n`;
      }

      if (item.notes) {
        message += `   Notas: ${item.notes}\n`;
      }

      message += `   Subtotal: ${formatPrice(item.product.price * item.quantity)}\n`;
    });

    message += `\n*TOTAL: ${formatPrice(order.total)}*\n`;
    message += `*Pago:* ${paymentMethod === "cash" ? "Efectivo" : "Transferencia bancaria"}\n`;

    if (order.customerInfo.specialInstructions) {
      message += `\n*Instrucciones especiales:*\n${order.customerInfo.specialInstructions}\n`;
    }

    message += `\n¡Esperamos su confirmación!`;

    return message;
  };

  const addToOrder = (product: WhatsAppProduct) => {
    setSelectedProducts((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { product, quantity: 1, customizations: [] }];
    });
  };

  const removeFromOrder = (productId: string) => {
    setSelectedProducts((prev) =>
      prev.filter((item) => item.product.id !== productId),
    );
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromOrder(productId);
      return;
    }

    setSelectedProducts((prev) =>
      prev.map((item) =>
        item.product.id === productId ? { ...item, quantity } : item,
      ),
    );
  };

  const calculateTotal = () => {
    return selectedProducts.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0,
    );
  };

  const handleSendOrder = () => {
    const order: WhatsAppOrder = {
      items: selectedProducts,
      customerInfo,
      paymentMethod,
      total: calculateTotal(),
    };

    const whatsappUrl = generateWhatsAppMessage("order", order);
    window.open(whatsappUrl, "_blank");
  };

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(type);
      setTimeout(() => setCopied(null), 2000);
    } catch (error) {
      console.error("Failed to copy:", error);
    }
  };

  return (
    <div className="space-y-8">
      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <motion.a
          href={generateWhatsAppMessage("catalog")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 bg-green-500 text-white p-4 rounded-lg hover:bg-green-600 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="font-medium">Ver Catálogo</span>
        </motion.a>

        <motion.a
          href={generateWhatsAppMessage("quick_order")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 bg-sage text-white p-4 rounded-lg hover:bg-sage/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <ShoppingCart className="w-5 h-5" />
          <span className="font-medium">Pedido Rápido</span>
        </motion.a>

        <motion.a
          href={generateWhatsAppMessage("inquiry")}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center space-x-3 bg-clay text-white p-4 rounded-lg hover:bg-clay/90 transition-colors"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Phone className="w-5 h-5" />
          <span className="font-medium">Consultar</span>
        </motion.a>
      </div>

      {/* Business Info */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
          <MessageCircle className="w-5 h-5 text-green-500" />
          <span>Contacto WhatsApp</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <Phone className="w-4 h-4" />
              <span className="font-medium">{businessPhone}</span>
              <button
                onClick={() => copyToClipboard(businessPhone, "phone")}
                className="text-gray-400 hover:text-gray-600"
              >
                {copied === "phone" ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </button>
            </div>
            <div className="flex items-center space-x-2 text-gray-600 mb-2">
              <Clock className="w-4 h-4" />
              <span>Lun-Sáb: 9:00 AM - 7:00 PM</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>Respuesta promedio: 30 minutos</span>
            </div>
          </div>

          <div className="bg-green-50 rounded-lg p-4">
            <h4 className="font-semibold text-green-800 mb-2">
              Tips para WhatsApp
            </h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• Incluye fotos de referencia si tienes</li>
              <li>• Menciona la fecha del evento</li>
              <li>• Especifica número de personas</li>
              <li>• Pregunta por descuentos en pedidos grandes</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Product Catalog */}
      {enableCatalog && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              Catálogo de Productos
            </h3>
            <span className="text-sm text-gray-500">
              {selectedProducts.length} productos seleccionados
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayProducts.map((product) => {
              const inOrder = selectedProducts.find(
                (item) => item.product.id === product.id,
              );

              return (
                <motion.div
                  key={product.id}
                  className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-6">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-semibold text-gray-900">
                        {product.name}
                      </h4>
                      <span className="text-lg font-bold text-sage">
                        {formatPrice(product.price)}
                      </span>
                    </div>

                    <p className="text-gray-600 text-sm mb-3">
                      {product.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center space-x-2 text-xs text-gray-500">
                        <Clock className="w-3 h-3" />
                        <span>{product.preparationTime}</span>
                        <User className="w-3 h-3 ml-2" />
                        <span>{product.serves}</span>
                      </div>

                      {product.allergens.length > 0 && (
                        <div className="flex items-center space-x-2 text-xs text-orange-600">
                          <Info className="w-3 h-3" />
                          <span>Contiene: {product.allergens.join(", ")}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex items-center justify-between">
                      {inOrder ? (
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              updateQuantity(product.id, inOrder.quantity - 1)
                            }
                            className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                          >
                            -
                          </button>
                          <span className="font-medium">
                            {inOrder.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(product.id, inOrder.quantity + 1)
                            }
                            className="w-8 h-8 bg-sage rounded-full text-white flex items-center justify-center hover:bg-sage/90"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <button
                          onClick={() => addToOrder(product)}
                          className="bg-sage text-white px-4 py-2 rounded-lg hover:bg-sage/90 transition-colors"
                        >
                          Añadir
                        </button>
                      )}

                      <button
                        onClick={() => {
                          const message = `¡Hola! Me interesa el *${product.name}* (${formatPrice(product.price)}). ¿Podrían darme más información? 🧁`;
                          window.open(
                            `https://wa.me/${businessPhone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`,
                            "_blank",
                          );
                        }}
                        className="text-green-500 hover:text-green-600"
                      >
                        <MessageCircle className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Order Summary */}
      {selectedProducts.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Resumen del Pedido
          </h3>

          <div className="space-y-3 mb-4">
            {selectedProducts.map((item) => (
              <div
                key={item.product.id}
                className="flex items-center justify-between"
              >
                <div>
                  <span className="font-medium">{item.product.name}</span>
                  <span className="text-gray-500 ml-2">x{item.quantity}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                  <button
                    onClick={() => removeFromOrder(item.product.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    ×
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total:</span>
              <span className="text-sage">${calculateTotal().toFixed(2)}</span>
            </div>
          </div>

          <button
            onClick={() => setShowOrderForm(true)}
            className="w-full mt-4 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Enviar por WhatsApp</span>
          </button>
        </div>
      )}

      {/* Payment Information */}
      {showPaymentInfo && (
        <div className="bg-gradient-to-r from-sage/5 to-clay/5 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center space-x-2">
            <CreditCard className="w-5 h-5" />
            <span>Métodos de Pago</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3 mb-3">
                <Banknote className="w-6 h-6 text-green-600" />
                <h4 className="font-semibold text-gray-900">Efectivo</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Pago al momento de la entrega</li>
                <li>• Pago al recoger en tienda</li>
                <li>• Se requiere confirmar monto exacto</li>
                <li>• Descuento 5% en pedidos +$100</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg p-4 border">
              <div className="flex items-center space-x-3 mb-3">
                <CreditCard className="w-6 h-6 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Transferencia</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Banco: BBVA</li>
                <li>• Cuenta: 0123456789</li>
                <li>• CLABE: 012345678901234567</li>
                <li>• Enviar comprobante por WhatsApp</li>
              </ul>
              <button
                onClick={() => copyToClipboard("012345678901234567", "clabe")}
                className="mt-2 text-blue-600 hover:text-blue-700 text-sm flex items-center space-x-1"
              >
                {copied === "clabe" ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
                <span>Copiar CLABE</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Order Form Modal */}
      {showOrderForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Información del Pedido
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo
                </label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Teléfono
                </label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      phone: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de entrega
                </label>
                <select
                  value={customerInfo.deliveryType}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      deliveryType: e.target.value as "pickup" | "delivery",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                >
                  <option value="pickup">Recoger en tienda</option>
                  <option value="delivery">Entrega a domicilio</option>
                </select>
              </div>

              {customerInfo.deliveryType === "delivery" && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Dirección de entrega
                  </label>
                  <textarea
                    value={customerInfo.address || ""}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                    rows={3}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fecha y hora preferida
                </label>
                <input
                  type="datetime-local"
                  value={customerInfo.preferredTime}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      preferredTime: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Método de pago
                </label>
                <select
                  value={paymentMethod}
                  onChange={(e) =>
                    setPaymentMethod(e.target.value as "cash" | "bank_transfer")
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                >
                  <option value="cash">Efectivo</option>
                  <option value="bank_transfer">Transferencia bancaria</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Instrucciones especiales (opcional)
                </label>
                <textarea
                  value={customerInfo.specialInstructions || ""}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      specialInstructions: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                  rows={3}
                  placeholder="Ej: Sin azúcar, decoración específica, etc."
                />
              </div>
            </div>

            <div className="flex items-center space-x-3 mt-6">
              <button
                onClick={() => setShowOrderForm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancelar
              </button>
              <button
                onClick={handleSendOrder}
                disabled={
                  !customerInfo.name ||
                  !customerInfo.phone ||
                  !customerInfo.preferredTime
                }
                className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Enviar a WhatsApp
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WhatsAppIntegration;
