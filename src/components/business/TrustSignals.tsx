import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Shield,
  Award,
  MapPin,
  Clock,
  Users,
  Heart,
  Star,
  CheckCircle,
  Phone,
  Calendar,
  Truck,
  CreditCard,
  Lock,
} from "lucide-react";

interface Certification {
  id: string;
  name: string;
  issuer: string;
  year: string;
  image?: string;
  description: string;
}

interface LocalReview {
  id: string;
  customerName: string;
  rating: number;
  review: string;
  date: string;
  occasion: string;
  verified: boolean;
  photos?: string[];
}

interface BusinessMetric {
  label: string;
  value: string;
  icon: React.ReactNode;
  description: string;
}

interface TrustSignalsProps {
  showCertifications?: boolean;
  showLocalReviews?: boolean;
  showBusinessMetrics?: boolean;
  showSecurityFeatures?: boolean;
  showLocalPresence?: boolean;
}

export const TrustSignals: React.FC<TrustSignalsProps> = ({
  showCertifications = true,
  showLocalReviews = true,
  showBusinessMetrics = true,
  showSecurityFeatures = true,
  showLocalPresence = true,
}) => {
  const [selectedTab, setSelectedTab] = useState<
    "reviews" | "certifications" | "metrics"
  >("reviews");

  const certifications: Certification[] = [
    {
      id: "1",
      name: "Certificación en Manipulación de Alimentos",
      issuer: "Secretaría de Salud",
      year: "2024",
      description:
        "Certificación oficial para manejo seguro de alimentos y buenas prácticas de higiene",
    },
    {
      id: "2",
      name: "Registro Sanitario",
      issuer: "COFEPRIS",
      year: "2024",
      description:
        "Establecimiento registrado y autorizado para elaboración de alimentos",
    },
    {
      id: "3",
      name: "Certificación Artesanal",
      issuer: "Cámara de Comercio Local",
      year: "2023",
      description: "Reconocimiento como negocio artesanal de la comunidad",
    },
    {
      id: "4",
      name: "Empresa Socialmente Responsable",
      issuer: "Ayuntamiento Municipal",
      year: "2024",
      description:
        "Reconocimiento por contribución al desarrollo local y prácticas sustentables",
    },
  ];

  const localReviews: LocalReview[] = [
    {
      id: "1",
      customerName: "María González",
      rating: 5,
      review:
        "Increíble atención y sabor! Hice el pedido para el cumpleaños de mi hija y quedó perfecto. La tarta de chocolate estaba deliciosa y la decoración superó mis expectativas. Definitivamente volveré a pedirles.",
      date: "2024-01-15",
      occasion: "Cumpleaños",
      verified: true,
      photos: ["/api/placeholder/200/150", "/api/placeholder/200/150"],
    },
    {
      id: "2",
      customerName: "Carlos Ramírez",
      rating: 5,
      review:
        "Los macarons más ricos que he probado en la ciudad. Pedí una caja para mi aniversario y mi esposa quedó encantada. La calidad es excelente y el servicio muy profesional.",
      date: "2024-01-10",
      occasion: "Aniversario",
      verified: true,
    },
    {
      id: "3",
      customerName: "Ana Sofía López",
      rating: 5,
      review:
        "Excelente servicio desde el primer contacto por WhatsApp. Me ayudaron a elegir el postre perfecto para mi evento corporativo. Todos los invitados preguntaron quién había hecho los cupcakes!",
      date: "2024-01-08",
      occasion: "Evento Corporativo",
      verified: true,
    },
    {
      id: "4",
      customerName: "Roberto Mendoza",
      rating: 5,
      review:
        "La mejor repostería de la zona! He pedido varias veces y siempre superan mis expectativas. Los ingredientes se sienten frescos y la presentación es impecable. Muy recomendado!",
      date: "2024-01-05",
      occasion: "Pedido Regular",
      verified: true,
    },
  ];

  const businessMetrics: BusinessMetric[] = [
    {
      label: "Años de Experiencia",
      value: "8+",
      icon: <Calendar className="w-6 h-6" />,
      description: "Creando momentos dulces desde 2016",
    },
    {
      label: "Clientes Satisfechos",
      value: "500+",
      icon: <Users className="w-6 h-6" />,
      description: "Familias que confían en nosotros",
    },
    {
      label: "Pedidos Completados",
      value: "1,200+",
      icon: <CheckCircle className="w-6 h-6" />,
      description: "Celebraciones hechas realidad",
    },
    {
      label: "Tiempo de Respuesta",
      value: "< 30min",
      icon: <Clock className="w-6 h-6" />,
      description: "Respuesta promedio en WhatsApp",
    },
    {
      label: "Calificación Promedio",
      value: "4.9/5",
      icon: <Star className="w-6 h-6" />,
      description: "Basado en reseñas verificadas",
    },
    {
      label: "Entregas Puntuales",
      value: "98%",
      icon: <Truck className="w-6 h-6" />,
      description: "Cumplimos con los tiempos acordados",
    },
  ];

  const securityFeatures = [
    {
      icon: <Shield className="w-5 h-5" />,
      title: "Proceso Verificado",
      description: "Cada pedido se confirma por WhatsApp con detalles claros",
    },
    {
      icon: <Lock className="w-5 h-5" />,
      title: "Información Segura",
      description: "Tus datos personales están protegidos y no se comparten",
    },
    {
      icon: <CheckCircle className="w-5 h-5" />,
      title: "Garantía de Calidad",
      description: "Si no estás satisfecho, trabajamos para solucionarlo",
    },
    {
      icon: <CreditCard className="w-5 h-5" />,
      title: "Pago Seguro",
      description: "Efectivo o transferencia bancaria verificada",
    },
  ];

  const localPresenceFeatures = [
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Negocio Local",
      description: "Ubicados en el corazón de la comunidad desde 2016",
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: "Conocidos en la Zona",
      description: "Recomendados por vecinos y amigos",
    },
    {
      icon: <Truck className="w-5 h-5" />,
      title: "Entrega Local",
      description: "Conocemos cada rincón de la ciudad para entregas puntuales",
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Compromiso Comunitario",
      description: "Apoyamos eventos locales y causas benéficas",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < rating ? "text-yellow-400 fill-current" : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center space-x-3 mb-4"
        >
          <Shield className="w-8 h-8 text-sage" />
          <h2 className="text-3xl font-bold text-gray-900">
            Confianza y Calidad
          </h2>
        </motion.div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Tu tranquilidad es nuestra prioridad. Conoce por qué miles de familias
          confían en nosotros para sus momentos más especiales.
        </p>
      </div>

      {/* Business Metrics */}
      {showBusinessMetrics && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-r from-sage/5 to-clay/5 rounded-2xl p-8"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
            Números que Hablan por Nosotros
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {businessMetrics.map((metric, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full mx-auto mb-3 shadow-sm text-sage">
                  {metric.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm font-medium text-gray-700 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-gray-500">
                  {metric.description}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Tab Navigation */}
      <div className="flex justify-center">
        <div className="bg-gray-100 rounded-lg p-1 flex space-x-1">
          {[
            {
              id: "reviews",
              label: "Reseñas",
              icon: <Star className="w-4 h-4" />,
            },
            {
              id: "certifications",
              label: "Certificaciones",
              icon: <Award className="w-4 h-4" />,
            },
            {
              id: "metrics",
              label: "Confianza",
              icon: <Shield className="w-4 h-4" />,
            },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() =>
                setSelectedTab(
                  tab.id as "reviews" | "certifications" | "metrics",
                )
              }
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                selectedTab === tab.id
                  ? "bg-white shadow-sm text-sage"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.icon}
              <span className="font-medium">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reviews Tab */}
      {selectedTab === "reviews" && showLocalReviews && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Lo que Dicen Nuestros Clientes
            </h3>
            <p className="text-gray-600">
              Reseñas reales de familias de nuestra comunidad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {localReviews.map((review) => (
              <motion.div
                key={review.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <h4 className="font-semibold text-gray-900">
                        {review.customerName}
                      </h4>
                      {review.verified && (
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        {renderStars(review.rating)}
                      </div>
                      <span className="text-sm text-gray-500">•</span>
                      <span className="text-sm text-gray-500">
                        {review.occasion}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString("es-ES")}
                  </span>
                </div>

                <p className="text-gray-700 mb-4 leading-relaxed">
                  &ldquo;{review.review}&rdquo;
                </p>

                {review.photos && review.photos.length > 0 && (
                  <div className="flex space-x-2">
                    {review.photos.map((photo, index) => (
                      <img
                        key={index}
                        src={photo}
                        alt={`Foto del cliente ${index + 1}`}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button className="bg-sage text-white px-6 py-3 rounded-lg hover:bg-sage/90 transition-colors">
              Ver Más Reseñas
            </button>
          </div>
        </motion.div>
      )}

      {/* Certifications Tab */}
      {selectedTab === "certifications" && showCertifications && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Certificaciones y Reconocimientos
            </h3>
            <p className="text-gray-600">
              Avalados por las autoridades competentes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {certifications.map((cert) => (
              <motion.div
                key={cert.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-sage/10 rounded-lg flex items-center justify-center">
                    <Award className="w-8 h-8 text-sage" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">
                      {cert.name}
                    </h4>
                    <p className="text-sm text-gray-600 mb-2">
                      Emitido por:{" "}
                      <span className="font-medium">{cert.issuer}</span>
                    </p>
                    <p className="text-sm text-gray-600 mb-2">
                      Año: <span className="font-medium">{cert.year}</span>
                    </p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      {cert.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Trust Metrics Tab */}
      {selectedTab === "metrics" && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          {/* Security Features */}
          {showSecurityFeatures && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Tu Seguridad es Nuestra Prioridad
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {securityFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center text-green-600">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Local Presence */}
          {showLocalPresence && (
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">
                Compromiso con la Comunidad
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {localPresenceFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-sage/10 rounded-lg flex items-center justify-center text-sage">
                        {feature.icon}
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {feature.title}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}

      {/* Contact Information with Trust Signals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-sage to-clay text-white rounded-2xl p-8"
      >
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold mb-2">¿Tienes Dudas?</h3>
          <p className="text-sage-100">
            Estamos aquí para ayudarte. Contáctanos con confianza.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Phone className="w-8 h-8" />
            </div>
            <h4 className="font-semibold mb-1">WhatsApp</h4>
            <p className="text-sm text-sage-100 mb-2">
              Respuesta en menos de 30 min
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
              Enviar Mensaje
            </button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-8 h-8" />
            </div>
            <h4 className="font-semibold mb-1">Ubicación</h4>
            <p className="text-sm text-sage-100 mb-2">
              Zona céntrica de la ciudad
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
              Ver Mapa
            </button>
          </div>

          <div className="text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <Clock className="w-8 h-8" />
            </div>
            <h4 className="font-semibold mb-1">Horarios</h4>
            <p className="text-sm text-sage-100 mb-2">
              Lun-Sáb: 9:00 AM - 7:00 PM
            </p>
            <button className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg text-sm transition-colors">
              Agendar Cita
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TrustSignals;
