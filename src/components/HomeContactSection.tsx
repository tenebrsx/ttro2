import React, { useState } from "react";
import { Heart, Send, Calendar, MessageCircle } from "lucide-react";
import Button from "./Button";

const HomeContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventDate: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);

      // Reset form after success message
      setTimeout(() => {
        setSubmitted(false);
        setFormData({
          name: "",
          email: "",
          phone: "",
          eventDate: "",
          message: "",
        });
      }, 4000);
    }, 2000);
  };

  if (submitted) {
    return (
      <section className="py-20 bg-gradient-to-br from-sage/10 to-clay/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-elegant-cream backdrop-blur-sm p-12 rounded-2xl border border-dusty-rose shadow-dusty-rose">
            <div className="w-20 h-20 bg-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-10 h-10 text-dusty-rose" />
            </div>
            <h3 className="text-3xl font-playfair text-black-bold text-shadow-elegant mb-4">
              ¡Mensaje Enviado!
            </h3>
            <p className="text-lg body-elegant font-karla leading-relaxed max-w-lg mx-auto">
              Gracias por contactarme. Te responderé dentro de 24 horas para
              conversar sobre tu dulce celebración.
            </p>
            <div className="mt-6 flex items-center justify-center space-x-2">
              <div className="w-2 h-2 bg-dusty-rose rounded-full"></div>
              <div className="w-2 h-2 bg-dusty-rose rounded-full"></div>
              <div className="w-2 h-2 bg-dusty-rose rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-dusty-rose/40"></div>
            <span className="mx-4 text-sm font-karla text-dusty-rose/70 uppercase tracking-wider">
              Comencemos
            </span>
            <div className="w-16 h-px bg-dusty-rose/40"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-playfair text-black-bold text-shadow-elegant mb-6">
            ¿Listo para Endulzar
            <span className="block text-dusty-rose-elegant italic">
              Tu Próxima Ocasión?
            </span>
          </h2>

          <div className="w-24 h-px bg-dusty-rose/40 mx-auto mb-6"></div>

          <p className="text-lg body-elegant max-w-2xl mx-auto font-karla font-light leading-relaxed">
            Cuéntame sobre tu ocasión especial y creemos juntos el postre
            perfecto que hará que tu momento sea verdaderamente inolvidable.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-elegant-cream backdrop-blur-sm p-8 rounded-2xl border border-dusty-rose shadow-dusty-rose">
            <div className="mb-6">
              <h3 className="text-2xl font-playfair text-black-bold text-shadow-elegant mb-2">
                Envíame Tu Idea
              </h3>
              <p className="body-elegant font-karla">
                Completa este formulario rápido y te contactaré pronto
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black-bold mb-1 font-karla">
                    Nombre *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-dusty-rose focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 transition-colors font-karla text-sm"
                    placeholder="Tu nombre"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black-bold mb-1 font-karla">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-dusty-rose focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 transition-colors font-karla text-sm"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black-bold mb-1 font-karla">
                    WhatsApp
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-dusty-rose focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 transition-colors font-karla text-sm"
                    placeholder="(809) 658-1245"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-black-bold mb-1 font-karla">
                    <Calendar className="inline w-4 h-4 mr-1" />
                    Fecha deseada
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-dusty-rose focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 transition-colors font-karla text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-black-bold mb-1 font-karla">
                  <MessageCircle className="inline w-4 h-4 mr-1" />
                  Cuéntame qué tienes en mente *
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-dusty-rose focus:border-dusty-rose focus:ring-2 focus:ring-dusty-rose/20 transition-colors font-karla text-sm resize-none"
                  placeholder="¿Para qué ocasión es? ¿Cuántas personas? ¿Algún sabor favorito o restricción alimentaria?"
                />
              </div>

              <Button
                type="submit"
                loading={loading}
                icon={Send}
                iconPosition="right"
                size="lg"
                className="w-full"
              >
                {loading ? "Enviando..." : "Iniciar Mi Consulta"}
              </Button>
            </form>
          </div>

          {/* Info & Benefits */}
          <div className="space-y-8">
            <div className="bg-elegant-cream backdrop-blur-sm p-6 rounded-2xl border border-dusty-rose shadow-dusty-rose">
              <h4 className="text-xl font-playfair text-black-bold text-shadow-elegant mb-4">
                ¿Qué Sucede Después?
              </h4>
              <div className="space-y-3">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-dusty-rose-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-medium">1</span>
                  </div>
                  <p className="body-elegant font-karla text-sm">
                    <span className="font-medium">Respuesta rápida:</span> Te
                    contacto en 24 horas
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-dusty-rose-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-medium">2</span>
                  </div>
                  <p className="body-elegant font-karla text-sm">
                    <span className="font-medium">Consulta personalizada:</span>{" "}
                    Conversamos sobre tu visión
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-dusty-rose-gradient rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-medium">3</span>
                  </div>
                  <p className="body-elegant font-karla text-sm">
                    <span className="font-medium">Propuesta a medida:</span>{" "}
                    Diseño y presupuesto personalizado
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;
