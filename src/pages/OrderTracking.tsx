import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Check } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { OrderTracker, useOrderTracking } from "../components/ui/OrderTracker";
import { NotificationSystem } from "../components/ui/NotificationSystem";

const OrderTracking = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [searchOrderId, setSearchOrderId] = useState("");
  const [showTracker, setShowTracker] = useState(false);

  const {
    isTracking,
    notifications,
    startTracking,
    stopTracking,
    addNotification,
  } = useOrderTracking(orderId || "");

  useEffect(() => {
    if (orderId) {
      setShowTracker(true);
      startTracking();

      return () => {
        stopTracking();
      };
    }
  }, [orderId, startTracking, stopTracking]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchOrderId.trim()) {
      navigate(`/order-tracking/${searchOrderId.trim()}`);
    }
  };

  const handleCopyOrderId = async () => {
    if (orderId) {
      try {
        await navigator.clipboard.writeText(orderId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error("Failed to copy order ID:", error);
      }
    }
  };

  const handleStatusUpdate = (status: string) => {
    addNotification(`Estado actualizado: ${status}`);
  };

  return (
    <PageTransition>
      <div className="pt-16 min-h-screen bg-gray-50">
        {/* Header */}
        <section className="py-12 bg-white shadow-sm">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2 text-gray-600 hover:text-sage transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Volver</span>
              </button>

              {orderId && (
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">ID del pedido:</span>
                  <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded-lg">
                    <span className="font-mono text-sm text-gray-900">
                      {orderId}
                    </span>
                    <button
                      onClick={handleCopyOrderId}
                      className="text-gray-400 hover:text-gray-600 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  <div
                    className={`flex items-center space-x-1.5 ml-4 px-2.5 py-1 rounded-full text-xs font-medium ${
                      isTracking
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    <div
                      className={`h-2 w-2 rounded-full ${
                        isTracking
                          ? "bg-green-500 animate-pulse"
                          : "bg-yellow-500"
                      }`}
                    />
                    <span>{isTracking ? "Rastreando" : "En espera"}</span>
                  </div>
                </div>
              )}
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Seguimiento de Pedido
              </h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Sigue el progreso de tu pedido en tiempo real. Desde la
                preparación hasta la entrega, mantente informado de cada paso
                del proceso.
              </p>
            </div>
          </div>
        </section>

        {/* Search Section */}
        {!showTracker && (
          <section className="py-12">
            <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">
                  Buscar Pedido
                </h2>
                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Número de Pedido
                    </label>
                    <input
                      type="text"
                      value={searchOrderId}
                      onChange={(e) => setSearchOrderId(e.target.value)}
                      placeholder="Ej: CNC-2024-001"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-sage text-white py-3 px-4 rounded-lg hover:bg-sage/90 transition-colors font-medium"
                  >
                    Buscar Pedido
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-900 mb-3">
                    ¿Necesitas ayuda?
                  </h3>
                  <div className="space-y-2 text-sm text-gray-600">
                    <p>
                      • El número de pedido se encuentra en tu confirmación por
                      email
                    </p>
                    <p>• Formato: CNC-YYYY-XXX</p>
                    <p>• Para pedidos antiguos, contacta nuestro soporte</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Order Tracker */}
        {showTracker && orderId && (
          <section className="py-8">
            <OrderTracker
              orderId={orderId}
              onStatusUpdate={handleStatusUpdate}
              showEstimates={true}
              showCustomerInfo={true}
              allowFeedback={true}
            />
          </section>
        )}

        {/* Help Section */}
        <section className="py-12 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Preguntas Frecuentes
              </h2>
              <p className="text-gray-600">
                Respuestas rápidas a las preguntas más comunes sobre el
                seguimiento de pedidos
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  ¿Cuándo recibiré mi número de seguimiento?
                </h3>
                <p className="text-gray-600 text-sm">
                  Recibirás tu número de seguimiento por email inmediatamente
                  después de confirmar tu pedido. Revisa tu carpeta de spam si
                  no lo encuentras.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  ¿Con qué frecuencia se actualiza el estado?
                </h3>
                <p className="text-gray-600 text-sm">
                  El estado se actualiza en tiempo real. Recibirás
                  notificaciones por email en cada etapa importante del proceso.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  ¿Qué hago si mi pedido se retrasa?
                </h3>
                <p className="text-gray-600 text-sm">
                  Los retrasos son raros, pero si ocurren, te notificaremos
                  inmediatamente con una nueva fecha estimada y explicación del
                  motivo.
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-3">
                  ¿Puedo modificar mi pedido después de confirmarlo?
                </h3>
                <p className="text-gray-600 text-sm">
                  Las modificaciones son posibles solo antes de que comience la
                  preparación. Contacta nuestro soporte lo antes posible.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Support */}
        <section className="py-12 bg-sage text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl font-bold mb-4">
              ¿Necesitas Ayuda Adicional?
            </h2>
            <p className="mb-6 text-sage-100">
              Nuestro equipo está aquí para ayudarte con cualquier pregunta
              sobre tu pedido
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:support@cucinanostrard.com"
                className="bg-white text-sage px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors font-medium"
              >
                Enviar Email
              </a>
              <a
                href="tel:+1234567890"
                className="bg-white/20 text-white px-6 py-3 rounded-lg hover:bg-white/30 transition-colors font-medium"
              >
                Llamar Soporte
              </a>
              <a
                href="https://wa.me/18096581245"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </section>

        {/* Notification System */}
        <NotificationSystem notifications={notifications} />
      </div>
    </PageTransition>
  );
};

export default OrderTracking;
