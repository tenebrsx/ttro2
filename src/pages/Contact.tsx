import React, { useState } from "react";
import {
  Mail,
  MessageCircle,
  Clock,
  Heart,
  MapPin,
  Phone,
  Instagram,
  Send,
} from "lucide-react";
import PageTransition from "../components/PageTransition";
import { motion } from "framer-motion";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Form submitted:", formData);
  };

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "¡Hola! Me gustaría hacer una consulta sobre un pedido personalizado para mi evento especial. ¿Podrías ayudarme con los detalles?",
    );
    window.open(`https://wa.me/18096581245?text=${message}`, "_blank");
  };

  const eventTypes = [
    "Cumpleaños",
    "Boda",
    "Aniversario",
    "Quinceañera",
    "Baby Shower",
    "Graduación",
    "Corporativo",
    "Otro",
  ];

  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: "Teléfono",
      value: "+1 (809) 658-1245",
      href: "tel:+18096581245",
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      value: "hola@cucinanostrard.com",
      href: "mailto:hola@cucinanostrard.com",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: "Ubicación",
      value: "Santo Domingo, República Dominicana",
      href: "#",
    },
    {
      icon: <Instagram className="w-5 h-5" />,
      title: "Instagram",
      value: "@cucinanostrard",
      href: "https://instagram.com/cucinanostrard",
    },
  ];

  return (
    <PageTransition>
      <div className="pt-16 min-h-screen bg-gradient-to-br from-cream-500 via-cream-400 to-cream-500">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-px bg-dusty-rose/40"></div>
                <span className="mx-4 text-sm font-source-serif text-dusty-rose/70 uppercase tracking-wider">
                  Conversemos
                </span>
                <div className="w-16 h-px bg-dusty-rose/40"></div>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-academy text-black-bold text-shadow-elegant mb-6">
                Hagamos Realidad
                <span className="block text-dusty-rose-elegant italic mt-2">
                  Tu Dulce Especial
                </span>
              </h1>

              <div className="w-24 h-px bg-dusty-rose/40 mx-auto mb-8"></div>

              <p className="text-lg body-elegant leading-relaxed font-source-serif font-light max-w-2xl mx-auto">
                Cada celebración tiene su propia historia. Comparte conmigo los
                detalles de tu evento y juntos crearemos el postre perfecto para
                ese momento especial.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-elegant-cream rounded-3xl shadow-dusty-rose p-8 border border-dusty-rose"
              >
                <div className="mb-8">
                  <h2 className="text-2xl font-academy text-black-bold text-shadow-elegant mb-4">
                    Cuéntame sobre tu evento
                  </h2>
                  <p className="body-elegant font-source-serif font-light">
                    Mientras más detalles compartir, mejor podré ayudarte a
                    crear algo único y especial.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-black-bold mb-2">
                        Nombre completo
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none transition-colors font-source-serif"
                        placeholder="Tu nombre"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black-bold mb-2">
                        Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none transition-colors font-source-serif"
                        placeholder="tu@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-black-bold mb-2">
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none transition-colors font-source-serif"
                        placeholder="(809) 658-1245"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black-bold mb-2">
                        Tipo de evento
                      </label>
                      <select
                        name="eventType"
                        value={formData.eventType}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none transition-colors font-source-serif"
                        required
                      >
                        <option value="">Selecciona un tipo</option>
                        {eventTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-black-bold mb-2">
                        Fecha del evento
                      </label>
                      <input
                        type="date"
                        name="eventDate"
                        value={formData.eventDate}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none transition-colors font-source-serif"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-black-bold mb-2">
                        Número de invitados
                      </label>
                      <input
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none transition-colors font-source-serif"
                        placeholder="20"
                        min="1"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black-bold mb-2">
                      Cuéntame sobre tu visión
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      className="w-full px-4 py-3 rounded-lg border border-dusty-rose/20 focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 outline-none transition-colors font-source-serif resize-none"
                      placeholder="Describe tu evento, tus preferencias de sabores, colores, tema o cualquier idea especial que tengas en mente..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-dusty-rose-gradient text-white py-3 px-6 rounded-lg font-medium hover:bg-dusty-rose/90 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-dusty-rose hover:shadow-warm"
                  >
                    <Send className="w-5 h-5" />
                    <span>Enviar consulta</span>
                  </button>
                </form>
              </motion.div>

              {/* Contact Information */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="space-y-8"
              >
                {/* WhatsApp Quick Contact */}
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-3xl p-8 border border-green-200">
                  <div className="flex items-center space-x-4 mb-6">
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-academy text-black-bold text-shadow-elegant">
                        Respuesta inmediata
                      </h3>
                      <p className="text-green-700 font-source-serif font-light">
                        WhatsApp es la forma más rápida
                      </p>
                    </div>
                  </div>

                  <p className="text-green-700 mb-6 font-source-serif font-light">
                    Si tienes prisa o prefieres una conversación más directa,
                    envíame un mensaje por WhatsApp. Normalmente respondo en
                    minutos.
                  </p>

                  <button
                    onClick={handleWhatsAppClick}
                    className="w-full bg-green-500 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-600 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-gentle hover:shadow-soft"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>Abrir WhatsApp</span>
                  </button>
                </div>

                {/* Contact Information */}
                <div className="bg-elegant-cream rounded-3xl shadow-dusty-rose p-8 border border-dusty-rose">
                  <h3 className="text-xl font-playfair text-black-bold text-shadow-elegant mb-6">
                    Información de contacto
                  </h3>

                  <div className="space-y-4">
                    {contactInfo.map((item, index) => (
                      <a
                        key={index}
                        href={item.href}
                        className="flex items-center space-x-4 p-4 rounded-lg hover:bg-dusty-rose/5 transition-colors duration-300 group"
                      >
                        <div className="w-10 h-10 bg-dusty-rose/10 rounded-full flex items-center justify-center text-dusty-rose group-hover:bg-dusty-rose group-hover:text-white transition-colors duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium body-elegant">
                            {item.title}
                          </p>
                          <p className="text-black-bold font-source-serif">
                            {item.value}
                          </p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Business Hours */}
                <div className="bg-elegant-cream rounded-3xl shadow-dusty-rose p-8 border border-dusty-rose">
                  <div className="flex items-center space-x-3 mb-6">
                    <Clock className="w-6 h-6 text-dusty-rose" />
                    <h3 className="text-xl font-playfair text-black-bold text-shadow-elegant">
                      Horarios
                    </h3>
                  </div>

                  <div className="space-y-2 body-elegant font-source-serif">
                    <div className="flex justify-between">
                      <span>Lunes - Viernes</span>
                      <span>8:00 AM - 6:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sábado</span>
                      <span>9:00 AM - 4:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Domingo</span>
                      <span>Solo por cita</span>
                    </div>
                  </div>

                  <div className="mt-6 p-4 bg-dusty-rose/10 rounded-lg">
                    <p className="text-sm body-elegant font-source-serif font-light">
                      <Heart className="w-4 h-4 inline text-dusty-rose mr-1" />
                      Para eventos especiales, estoy disponible fuera del
                      horario regular. ¡Solo pregúntame!
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Contact;
