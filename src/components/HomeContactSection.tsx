import React, { useState } from "react";
import { Heart, Send, Calendar, MessageCircle } from "lucide-react";
import {
  FadeReveal,
  TextReveal,
  StaggerReveal,
  StaggerChild,
  CinematicReveal,
} from "./animations/SophisticatedAnimations";
import {
  SECTION_DELAYS,
  DURATIONS,
  STAGGER_DELAYS,
} from "../config/animationTiming";
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
      <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <CinematicReveal
            direction="iris"
            delay={SECTION_DELAYS.contact.base}
            duration={DURATIONS.elegant}
          >
            <FadeReveal
              delay={SECTION_DELAYS.contact.divider}
              duration={DURATIONS.slow}
              direction="up"
              distance={30}
            >
              <div className="bg-white/90 backdrop-blur-sm p-12 rounded-3xl border border-sage-100/50 shadow-premium hover:shadow-luxury transition-all duration-500 relative overflow-hidden">
                {/* Sophisticated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shimmer transition-transform duration-2000 ease-out rounded-3xl"></div>

                <FadeReveal
                  delay={SECTION_DELAYS.contact.title}
                  duration={DURATIONS.medium}
                  direction="up"
                  distance={20}
                >
                  <div className="w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-elegant">
                    <Heart className="w-10 h-10 text-sage-600" />
                  </div>
                </FadeReveal>

                <TextReveal
                  delay={SECTION_DELAYS.contact.content}
                  staggerDelay={STAGGER_DELAYS.normal}
                  className="text-3xl font-academy text-cocoa-500 text-shadow-elegant mb-4 tracking-academy-normal"
                >
                  ¡Mensaje Enviado!
                </TextReveal>

                <FadeReveal
                  delay={SECTION_DELAYS.contact.content}
                  duration={DURATIONS.normal}
                  direction="up"
                  distance={15}
                >
                  <p className="text-lg font-bodoni text-cocoa-500/80 leading-body-elegant max-w-lg mx-auto">
                    Gracias por contactarme. Te responderé dentro de 24 horas
                    para conversar sobre tu dulce celebración.
                  </p>
                </FadeReveal>

                <FadeReveal
                  delay={SECTION_DELAYS.contact.content}
                  duration={DURATIONS.medium}
                  direction="none"
                >
                  <div className="mt-6 flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-sage-500 rounded-full animate-pulse"></div>
                    <div
                      className="w-2 h-2 bg-sage-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-sage-500 rounded-full animate-pulse"
                      style={{ animationDelay: "0.4s" }}
                    ></div>
                  </div>
                </FadeReveal>
              </div>
            </FadeReveal>
          </CinematicReveal>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500 relative overflow-hidden">
      {/* Background decorative elements */}
      <FadeReveal
        delay={SECTION_DELAYS.contact.base}
        duration={DURATIONS.ambient}
        direction="none"
      >
        <div className="absolute top-20 left-20 w-32 h-32 bg-sage-100 rounded-full opacity-20 animate-pulse-soft shadow-sage"></div>
      </FadeReveal>
      <FadeReveal
        delay={SECTION_DELAYS.contact.base}
        duration={DURATIONS.ambient}
        direction="none"
      >
        <div className="absolute bottom-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-15 shadow-warm"></div>
      </FadeReveal>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeReveal
            delay={SECTION_DELAYS.contact.divider}
            duration={DURATIONS.medium}
            direction="none"
          >
            <div className="flex items-center justify-center mb-8">
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
              <span className="mx-6 text-base font-academy text-sage-600 uppercase tracking-widest font-medium">
                Comencemos
              </span>
              <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
            </div>
          </FadeReveal>

          <div className="mb-8">
            <TextReveal
              delay={SECTION_DELAYS.contact.title}
              staggerDelay={STAGGER_DELAYS.normal}
              className="text-4xl sm:text-5xl font-academy leading-elegant block text-cocoa-500 text-shadow-elegant tracking-academy-hero"
            >
              ¿Listo para Crear
            </TextReveal>
            <div className="mt-2 relative">
              <TextReveal
                delay={SECTION_DELAYS.contact.content}
                staggerDelay={STAGGER_DELAYS.normal}
                className="text-4xl sm:text-5xl font-academy leading-elegant block text-sage-500 italic tracking-academy-subhead"
              >
                Tu Próxima Ocasión?
              </TextReveal>
              <FadeReveal
                delay={SECTION_DELAYS.contact.underline}
                duration={DURATIONS.medium}
                direction="none"
                className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
              >
                <div></div>
              </FadeReveal>
            </div>
          </div>

          <FadeReveal
            delay={SECTION_DELAYS.contact.content}
            duration={DURATIONS.slow}
            direction="up"
            distance={20}
          >
            <p className="text-lg font-bodoni max-w-2xl mx-auto leading-body-elegant font-normal">
              Cuéntame sobre tu ocasión especial y creemos juntos el postre
              perfecto que hará que tu momento sea verdaderamente
              <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                {" "}
                inolvidable
              </span>
              .
            </p>
          </FadeReveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <FadeReveal
            delay={SECTION_DELAYS.contact.form}
            duration={DURATIONS.slow}
            direction="left"
            distance={40}
          >
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-3xl border border-sage-100/50 shadow-premium hover:shadow-luxury transition-all duration-500 relative overflow-hidden group">
              {/* Sophisticated shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>

              <div className="mb-6 relative z-10">
                <TextReveal
                  delay={SECTION_DELAYS.contact.form}
                  staggerDelay={STAGGER_DELAYS.normal}
                  className="text-3xl font-academy text-cocoa-500 text-shadow-elegant mb-4 tracking-academy-normal"
                >
                  Envíame Tu Idea
                </TextReveal>
                <FadeReveal
                  delay={SECTION_DELAYS.contact.form}
                  duration={DURATIONS.normal}
                  direction="up"
                  distance={15}
                >
                  <p className="font-bodoni text-cocoa-500/80 leading-body-elegant">
                    Completa este formulario rápido y te contactaré pronto
                  </p>
                </FadeReveal>
              </div>

              <StaggerReveal
                staggerDelay={STAGGER_DELAYS.slow}
                childDelay={SECTION_DELAYS.contact.form}
                className="space-y-4 relative z-10"
              >
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StaggerChild>
                      <div>
                        <label className="block text-sm font-medium text-cocoa-500 mb-1 font-academy tracking-wide">
                          Nombre *
                        </label>
                        <input
                          type="text"
                          name="name"
                          required
                          value={formData.name}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 transition-all duration-500 font-bodoni text-sm bg-white/95 backdrop-blur-sm shadow-elegant hover:shadow-premium"
                          placeholder="Tu nombre"
                        />
                      </div>
                    </StaggerChild>

                    <StaggerChild>
                      <div>
                        <label className="block text-sm font-medium text-cocoa-500 mb-1 font-academy tracking-wide">
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 transition-all duration-500 font-bodoni text-sm bg-white/95 backdrop-blur-sm shadow-elegant hover:shadow-premium"
                          placeholder="tu@email.com"
                        />
                      </div>
                    </StaggerChild>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <StaggerChild>
                      <div>
                        <label className="block text-sm font-medium text-cocoa-500 mb-1 font-academy tracking-wide">
                          WhatsApp
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 transition-all duration-500 font-bodoni text-sm bg-white/95 backdrop-blur-sm shadow-elegant hover:shadow-premium"
                          placeholder="(809) 658-1245"
                        />
                      </div>
                    </StaggerChild>

                    <StaggerChild>
                      <div>
                        <label className="block text-sm font-medium text-cocoa-500 mb-1 font-academy tracking-wide">
                          <Calendar className="inline w-4 h-4 mr-1" />
                          Fecha deseada
                        </label>
                        <input
                          type="date"
                          name="eventDate"
                          value={formData.eventDate}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 transition-all duration-500 font-bodoni text-sm bg-white/95 backdrop-blur-sm shadow-elegant hover:shadow-premium"
                        />
                      </div>
                    </StaggerChild>
                  </div>

                  <StaggerChild>
                    <div>
                      <label className="block text-sm font-medium text-cocoa-500 mb-1 font-academy tracking-wide">
                        <MessageCircle className="inline w-4 h-4 mr-1" />
                        Cuéntame qué tienes en mente *
                      </label>
                      <textarea
                        name="message"
                        required
                        value={formData.message}
                        onChange={handleChange}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-sage-200 focus:border-sage-400 focus:ring-2 focus:ring-sage-200/50 transition-all duration-500 font-bodoni text-sm resize-none bg-white/95 backdrop-blur-sm shadow-elegant hover:shadow-premium"
                        placeholder="¿Para qué ocasión es? ¿Cuántas personas? ¿Algún sabor favorito o restricción alimentaria?"
                      />
                    </div>
                  </StaggerChild>

                  <StaggerChild>
                    <div className="relative overflow-hidden rounded-2xl">
                      <Button
                        type="submit"
                        loading={loading}
                        icon={Send}
                        iconPosition="right"
                        size="lg"
                        className="w-full shadow-premium hover:shadow-luxury transition-all duration-500 relative group"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"></div>
                        <span className="relative z-10">
                          {loading ? "Enviando..." : "Iniciar Mi Consulta"}
                        </span>
                      </Button>
                    </div>
                  </StaggerChild>
                </form>
              </StaggerReveal>
            </div>
          </FadeReveal>

          {/* Info & Benefits */}
          <FadeReveal
            delay={SECTION_DELAYS.contact.info}
            duration={DURATIONS.slow}
            direction="right"
            distance={40}
          >
            <div className="space-y-8">
              <div className="bg-white/90 backdrop-blur-sm p-6 rounded-3xl border border-sage-100/50 shadow-premium hover:shadow-luxury transition-all duration-500 relative overflow-hidden group">
                {/* Sophisticated shimmer effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>

                <div className="relative z-10">
                  <CinematicReveal
                    direction="horizontal"
                    delay={SECTION_DELAYS.contact.info}
                    duration={DURATIONS.slow}
                  >
                    <TextReveal
                      delay={SECTION_DELAYS.contact.info}
                      staggerDelay={STAGGER_DELAYS.fast}
                      className="text-xl font-academy text-cocoa-500 text-shadow-elegant mb-4 tracking-academy-normal"
                    >
                      ¿Qué Sucede Después?
                    </TextReveal>
                  </CinematicReveal>

                  <StaggerReveal
                    staggerDelay={STAGGER_DELAYS.dramatic}
                    childDelay={SECTION_DELAYS.contact.info}
                    className="space-y-3"
                  >
                    <StaggerChild>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-elegant">
                          <span className="text-white text-sm font-medium">
                            1
                          </span>
                        </div>
                        <p className="font-bodoni text-cocoa-500/80 text-sm leading-body-elegant">
                          <span className="font-medium text-cocoa-500">
                            Respuesta rápida:
                          </span>{" "}
                          Te contacto en 24 horas
                        </p>
                      </div>
                    </StaggerChild>

                    <StaggerChild>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-elegant">
                          <span className="text-white text-sm font-medium">
                            2
                          </span>
                        </div>
                        <p className="font-bodoni text-cocoa-500/80 text-sm leading-body-elegant">
                          <span className="font-medium text-cocoa-500">
                            Consulta personalizada:
                          </span>{" "}
                          Conversamos sobre tu visión
                        </p>
                      </div>
                    </StaggerChild>

                    <StaggerChild>
                      <div className="flex items-start space-x-3">
                        <div className="w-6 h-6 bg-gradient-to-br from-sage-500 to-sage-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 shadow-elegant">
                          <span className="text-white text-sm font-medium">
                            3
                          </span>
                        </div>
                        <p className="font-bodoni text-cocoa-500/80 text-sm leading-body-elegant">
                          <span className="font-medium text-cocoa-500">
                            Propuesta a medida:
                          </span>{" "}
                          Diseño y presupuesto personalizado
                        </p>
                      </div>
                    </StaggerChild>
                  </StaggerReveal>
                </div>
              </div>
            </div>
          </FadeReveal>
        </div>
      </div>
    </section>
  );
};

export default HomeContactSection;
