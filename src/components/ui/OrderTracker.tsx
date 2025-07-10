import React, { useState, useEffect } from "react";
import {
  Clock,
  CheckCircle,
  Truck,
  ChefHat,
  Package,
  MapPin,
  Phone,
  Calendar,
  Star,
} from "lucide-react";
import { Notification } from "./NotificationSystem";

interface OrderStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  estimatedTime: number; // in minutes
  actualTime?: number;
  status: "pending" | "in-progress" | "completed" | "delayed";
  timestamp?: Date;
  notes?: string;
}

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
  customizations?: string[];
  image?: string;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress?: string;
  deliveryDate: Date;
  deliveryTime: string;
  specialInstructions?: string;
  paymentStatus: "pending" | "paid" | "failed";
  orderType: "pickup" | "delivery";
  createdAt: Date;
  estimatedCompletion: Date;
  priority: "normal" | "high" | "urgent";
}

interface OrderTrackerProps {
  orderId: string;
  onStatusUpdate?: (status: string) => void;
  showEstimates?: boolean;
  showCustomerInfo?: boolean;
  allowFeedback?: boolean;
}

export const OrderTracker: React.FC<OrderTrackerProps> = ({
  orderId,
  onStatusUpdate,
  showEstimates = true,
  showCustomerInfo = true,
  allowFeedback = true,
}) => {
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);
  const [orderSteps, setOrderSteps] = useState<OrderStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState("");

  // Mock data - in a real app, this would come from an API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        const mockOrderDetails: OrderDetails = {
          id: orderId,
          orderNumber: "CNC-2024-001",
          items: [
            {
              id: "1",
              name: "Tarta de Chocolate Premium",
              quantity: 1,
              price: 45.0,
              customizations: ["Sin gluten", "Decoración especial"],
              image: "/api/placeholder/100/100",
            },
            {
              id: "2",
              name: "Macarons Variados",
              quantity: 12,
              price: 24.0,
              customizations: ["Sabores: Vainilla, Chocolate, Fresa"],
            },
          ],
          total: 69.0,
          customerName: "María González",
          customerPhone: "+1-555-0123",
          deliveryAddress: "Av. Principal 123, Ciudad",
          deliveryDate: new Date(Date.now() + 24 * 60 * 60 * 1000),
          deliveryTime: "15:30",
          specialInstructions: "Favor tocar el timbre dos veces",
          paymentStatus: "paid",
          orderType: "delivery",
          createdAt: new Date(),
          estimatedCompletion: new Date(Date.now() + 18 * 60 * 60 * 1000),
          priority: "normal",
        };

        const mockOrderSteps: OrderStep[] = [
          {
            id: "order-received",
            title: "Pedido Recibido",
            description:
              "Tu pedido ha sido confirmado y está en cola de preparación",
            icon: <CheckCircle className="w-5 h-5" />,
            estimatedTime: 0,
            status: "completed",
            timestamp: new Date(),
            notes: "Pago confirmado exitosamente",
          },
          {
            id: "preparation",
            title: "En Preparación",
            description:
              "Nuestro chef está preparando tu pedido con ingredientes frescos",
            icon: <ChefHat className="w-5 h-5" />,
            estimatedTime: 120,
            status: "in-progress",
            timestamp: new Date(Date.now() + 5 * 60 * 1000),
            notes: "Ingredientes seleccionados y masa en preparación",
          },
          {
            id: "baking",
            title: "En Horneado",
            description: "Tu pedido está siendo horneado con amor y precisión",
            icon: <Clock className="w-5 h-5" />,
            estimatedTime: 180,
            status: "pending",
            notes: "Temperatura perfecta para resultados óptimos",
          },
          {
            id: "decoration",
            title: "Decoración",
            description:
              "Añadiendo los toques finales y decoraciones especiales",
            icon: <Star className="w-5 h-5" />,
            estimatedTime: 45,
            status: "pending",
          },
          {
            id: "packaging",
            title: "Empaque",
            description:
              "Empacando cuidadosamente tu pedido para mantener su frescura",
            icon: <Package className="w-5 h-5" />,
            estimatedTime: 15,
            status: "pending",
          },
          {
            id: "delivery",
            title:
              mockOrderDetails.orderType === "delivery"
                ? "En Camino"
                : "Listo para Recoger",
            description:
              mockOrderDetails.orderType === "delivery"
                ? "Tu pedido está en camino a tu dirección"
                : "Tu pedido está listo para recoger en nuestra tienda",
            icon:
              mockOrderDetails.orderType === "delivery" ? (
                <Truck className="w-5 h-5" />
              ) : (
                <MapPin className="w-5 h-5" />
              ),
            estimatedTime: mockOrderDetails.orderType === "delivery" ? 30 : 0,
            status: "pending",
          },
        ];

        setOrderDetails(mockOrderDetails);
        setOrderSteps(mockOrderSteps);
        setCurrentStep(1); // Currently in preparation
        setLoading(false);
      } catch {
        setError("Error al cargar los detalles del pedido");
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId]);

  // Simulate real-time updates
  useEffect(() => {
    if (!orderSteps.length) return;

    const interval = setInterval(() => {
      setOrderSteps((prev) =>
        prev.map((step, index) => {
          if (index === currentStep && step.status === "in-progress") {
            // Simulate progress
            const progress = Math.random();
            if (progress > 0.8) {
              // Move to next step
              setCurrentStep((curr) => Math.min(curr + 1, prev.length - 1));
              onStatusUpdate?.(step.title);
              return { ...step, status: "completed", timestamp: new Date() };
            }
          }
          return step;
        }),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [currentStep, orderSteps, onStatusUpdate]);

  const getStepStatus = (index: number) => {
    if (index < currentStep) return "completed";
    if (index === currentStep) return "in-progress";
    return "pending";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-green-600 bg-green-100";
      case "in-progress":
        return "text-sage bg-sage/10";
      case "pending":
        return "text-gray-400 bg-gray-100";
      case "delayed":
        return "text-red-600 bg-red-100";
      default:
        return "text-gray-400 bg-gray-100";
    }
  };

  const formatTimeRemaining = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const handleSubmitFeedback = () => {
    // In a real app, this would send feedback to the backend
    console.log("Feedback submitted:", { rating, feedback, orderId });
    setShowFeedbackForm(false);
    // Show success notification
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <div className="text-red-600 mb-2">Error</div>
          <p className="text-red-800">{error}</p>
        </div>
      </div>
    );
  }

  if (!orderDetails) return null;

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">
            Seguimiento del Pedido
          </h1>
          <div className="flex items-center space-x-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${
                orderDetails.priority === "urgent"
                  ? "bg-red-100 text-red-800"
                  : orderDetails.priority === "high"
                    ? "bg-orange-100 text-orange-800"
                    : "bg-gray-100 text-gray-800"
              }`}
            >
              {orderDetails.priority === "urgent"
                ? "Urgente"
                : orderDetails.priority === "high"
                  ? "Alta"
                  : "Normal"}
            </span>
            <span className="text-gray-500">#{orderDetails.orderNumber}</span>
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Estado Actual
              </h3>
              <div className="flex items-center space-x-2">
                <div
                  className={`p-2 rounded-full ${getStatusColor(orderSteps[currentStep]?.status || "pending")}`}
                >
                  {orderSteps[currentStep]?.icon}
                </div>
                <div>
                  <p className="font-medium text-gray-900">
                    {orderSteps[currentStep]?.title}
                  </p>
                  <p className="text-sm text-gray-500">
                    {orderSteps[currentStep]?.description}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">
                {orderDetails.orderType === "delivery" ? "Entrega" : "Recogida"}
              </h3>
              <div className="flex items-center space-x-2 text-gray-600">
                <Calendar className="w-4 h-4" />
                <span className="text-sm">
                  {orderDetails.deliveryDate.toLocaleDateString("es-ES", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 mt-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{orderDetails.deliveryTime}</span>
              </div>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Total</h3>
              <p className="text-2xl font-bold text-sage">
                ${orderDetails.total.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                {orderDetails.paymentStatus === "paid" ? "Pagado" : "Pendiente"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Timeline */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">
          Progreso del Pedido
        </h2>
        <div className="relative">
          {/* Progress Line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
          <div
            className="absolute left-6 top-0 w-0.5 bg-sage transition-all duration-1000"
            style={{
              height: `${(currentStep / (orderSteps.length - 1)) * 100}%`,
            }}
          ></div>

          {/* Steps */}
          <div className="space-y-8">
            {orderSteps.map((step, index) => {
              const status = getStepStatus(index);
              const isActive = index === currentStep;

              return (
                <div
                  key={step.id}
                  className="relative flex items-start space-x-4"
                >
                  {/* Step Icon */}
                  <div
                    className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 ${
                      status === "completed"
                        ? "bg-sage border-sage text-white"
                        : status === "in-progress"
                          ? "bg-sage/10 border-sage text-sage animate-pulse"
                          : "bg-white border-gray-200 text-gray-400"
                    }`}
                  >
                    {step.icon}
                  </div>

                  {/* Step Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3
                        className={`font-semibold ${
                          status === "completed"
                            ? "text-sage"
                            : status === "in-progress"
                              ? "text-sage"
                              : "text-gray-500"
                        }`}
                      >
                        {step.title}
                      </h3>

                      {showEstimates && step.estimatedTime > 0 && (
                        <span className="text-sm text-gray-500">
                          {status === "completed" && step.timestamp
                            ? `Completado ${step.timestamp.toLocaleTimeString(
                                "es-ES",
                                {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}`
                            : status === "in-progress"
                              ? `En progreso...`
                              : `~${formatTimeRemaining(step.estimatedTime)}`}
                        </span>
                      )}
                    </div>

                    <p className="text-gray-600 text-sm mb-2">
                      {step.description}
                    </p>

                    {step.notes && (
                      <p className="text-xs text-gray-500 bg-gray-50 p-2 rounded">
                        {step.notes}
                      </p>
                    )}

                    {/* Progress Bar for Active Step */}
                    {isActive && status === "in-progress" && (
                      <div className="mt-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-sage h-2 rounded-full transition-all duration-500"
                            style={{ width: `${Math.random() * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Order Items */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Artículos del Pedido
        </h2>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 divide-y">
          {orderDetails.items.map((item) => (
            <div key={item.id} className="p-6 flex items-center space-x-4">
              {item.image && (
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900">{item.name}</h3>
                <p className="text-sm text-gray-500">
                  Cantidad: {item.quantity}
                </p>
                {item.customizations && (
                  <div className="mt-2">
                    <p className="text-xs text-gray-500 mb-1">
                      Personalizaciones:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {item.customizations.map((customization, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-clay/20 text-clay text-xs rounded"
                        >
                          {customization}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">
                  ${item.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Info */}
      {showCustomerInfo && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Información de Contacto
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Cliente</h3>
                <p className="text-gray-600">{orderDetails.customerName}</p>
                <div className="flex items-center space-x-2 text-gray-600 mt-1">
                  <Phone className="w-4 h-4" />
                  <span>{orderDetails.customerPhone}</span>
                </div>
              </div>

              {orderDetails.orderType === "delivery" &&
                orderDetails.deliveryAddress && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Dirección de Entrega
                    </h3>
                    <div className="flex items-start space-x-2 text-gray-600">
                      <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{orderDetails.deliveryAddress}</span>
                    </div>
                    {orderDetails.specialInstructions && (
                      <p className="text-sm text-gray-500 mt-2">
                        <strong>Instrucciones especiales:</strong>{" "}
                        {orderDetails.specialInstructions}
                      </p>
                    )}
                  </div>
                )}
            </div>
          </div>
        </div>
      )}

      {/* Feedback Section */}
      {allowFeedback && currentStep === orderSteps.length - 1 && (
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              ¡Tu Pedido Está Listo!
            </h2>

            {!showFeedbackForm ? (
              <div className="text-center">
                <p className="text-gray-600 mb-4">
                  Esperamos que disfrutes tu pedido. ¿Te gustaría dejarnos una
                  reseña?
                </p>
                <button
                  onClick={() => setShowFeedbackForm(true)}
                  className="bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage/90 transition-colors"
                >
                  Dejar Reseña
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Calificación
                  </label>
                  <div className="flex items-center space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className={`w-8 h-8 ${
                          star <= rating ? "text-yellow-400" : "text-gray-300"
                        } hover:text-yellow-400 transition-colors`}
                      >
                        <Star className="w-full h-full fill-current" />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Comentarios (opcional)
                  </label>
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                    rows={4}
                    placeholder="Cuéntanos sobre tu experiencia..."
                  />
                </div>

                <div className="flex items-center space-x-4">
                  <button
                    onClick={handleSubmitFeedback}
                    disabled={rating === 0}
                    className="bg-sage text-white px-6 py-2 rounded-lg hover:bg-sage/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Enviar Reseña
                  </button>
                  <button
                    onClick={() => setShowFeedbackForm(false)}
                    className="text-gray-500 hover:text-gray-700 transition-colors"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Hook for order tracking
export const useOrderTracking = (orderId: string) => {
  const [isTracking, setIsTracking] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const startTracking = () => {
    setIsTracking(true);
    // In a real implementation, this would start tracking the specific order
    console.log(`Starting to track order: ${orderId}`);
  };

  const stopTracking = () => {
    setIsTracking(false);
  };

  const addNotification = (
    message: string,
    type: Notification["type"] = "info",
  ) => {
    const id = Date.now().toString() + Math.random();
    const newNotification: Notification = {
      id,
      message,
      type,
      duration: 5000,
    };
    setNotifications((prev) => [...prev, newNotification]);

    const timer = setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);

    return () => clearTimeout(timer);
  };

  return {
    isTracking,
    notifications,
    startTracking,
    stopTracking,
    addNotification,
  };
};
