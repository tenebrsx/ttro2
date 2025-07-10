import React, { useState } from "react";
import {
  Send,
  User,
  Mail,
  MessageCircle,
  Calendar,
  Users,
  Cake,
  Heart,
  AlertCircle,
} from "lucide-react";
import { EmailTemplateData } from "../services/emailService";

interface FormData {
  name: string;
  email: string;
  phone: string;
  requestType: string;
  eventDate: string;
  guestCount: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  requestType?: string;
  eventDate?: string;
  guestCount?: string;
  message?: string;
}

const ContactPageForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    requestType: "",
    eventDate: "",
    guestCount: "",
    message: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const requestTypes = [
    { value: "cumpleanos", label: "Cumpleaños Personal" },
    { value: "aniversario", label: "Aniversario" },
    { value: "graduacion", label: "Graduación" },
    { value: "boda", label: "Boda" },
    { value: "baby-shower", label: "Baby Shower" },
    { value: "corporativo", label: "Evento Corporativo" },
    { value: "cena-romantica", label: "Cena Romántica" },
    { value: "celebracion-familiar", label: "Celebración Familiar" },
    { value: "postre-especial", label: "Postre Especial" },
    { value: "otro", label: "Otro" },
  ];

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres";
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "El email es requerido";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Por favor ingresa un email válido";
    }

    // Phone validation (optional but if provided, should be valid)
    if (formData.phone.trim()) {
      const phoneRegex = /^[\d\s+\-()]+$/;
      if (
        !phoneRegex.test(formData.phone) ||
        formData.phone.trim().length < 10
      ) {
        newErrors.phone = "Por favor ingresa un número de teléfono válido";
      }
    }

    // Request type validation
    if (!formData.requestType) {
      newErrors.requestType = "Por favor selecciona el tipo de solicitud";
    }

    // Event date validation (optional but if provided, should be future date)
    if (formData.eventDate) {
      const selectedDate = new Date(formData.eventDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (selectedDate < today) {
        newErrors.eventDate = "La fecha debe ser futura";
      }
    }

    // Guest count validation (optional but if provided, should be positive)
    if (formData.guestCount) {
      const count = parseInt(formData.guestCount);
      if (isNaN(count) || count < 1 || count > 1000) {
        newErrors.guestCount =
          "Por favor ingresa un número válido entre 1 y 1000";
      }
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "El mensaje es requerido";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "El mensaje debe tener al menos 10 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepare email data
      const emailData: EmailTemplateData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        requestType: formData.requestType,
        eventDate: formData.eventDate,
        guestCount: formData.guestCount,
        message: formData.message,
        submittedAt: new Date().toISOString(),
      };

      // Here you would integrate with your preferred email service:
      // 1. EmailJS - for client-side email sending
      // 2. Formspree - simple form handling service
      // 3. Netlify Forms - if deploying to Netlify
      // 4. Your own backend API

      console.log("Email data to be sent:", emailData);

      // For now, we'll show the data in console and simulate success
      // In production, replace this with actual email service integration

      // Example integrations:
      // const success = await sendEmailWithEmailJS(emailData);
      // const success = await sendEmailWithFormspree(emailData);
      // const success = await sendEmail(emailData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Send WhatsApp message data to console (for development)
      const whatsappMessage = `Nueva solicitud de ${formData.name}:\n\nTipo: ${requestTypes.find((t) => t.value === formData.requestType)?.label}\nEmail: ${formData.email}\n${formData.phone ? `Teléfono: ${formData.phone}\n` : ""}${formData.eventDate ? `Fecha: ${formData.eventDate}\n` : ""}${formData.guestCount ? `Personas: ${formData.guestCount}\n` : ""}\nMensaje: ${formData.message}`;

      console.log("WhatsApp message preview:", whatsappMessage);

      setIsSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        requestType: "",
        eventDate: "",
        guestCount: "",
        message: "",
      });
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Hubo un error al enviar tu mensaje. Por favor intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  if (isSubmitted) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="h-8 w-8 text-green-600" />
        </div>
        <h3 className="text-2xl font-cormorant text-mocha mb-4">
          ¡Mensaje Enviado!
        </h3>
        <p className="text-mocha/70 font-karla mb-4">
          Gracias por contactarme. He recibido tu solicitud y te responderé
          dentro de las próximas 24 horas.
        </p>
        <p className="text-sm text-mocha/60 font-karla">
          Para consultas urgentes, puedes contactarme por WhatsApp al (809)
          658-1245
        </p>
        <button
          onClick={() => setIsSubmitted(false)}
          className="mt-6 text-dusty-rose hover:text-dusty-rose/80 font-karla text-sm transition-colors"
        >
          Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-cormorant text-mocha mb-2">
          Cuéntame Tu Idea
        </h3>
        <p className="text-mocha/70 font-karla">
          Completa el formulario y te responderé con ideas y opciones
          personalizadas
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-mocha mb-2"
          >
            Nombre Completo *
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-5 w-5 text-dusty-rose/50" />
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-dusty-rose/20 focus:border-dusty-rose transition-colors ${
                errors.name ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="Tu nombre completo"
            />
          </div>
          {errors.name && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.name}
            </p>
          )}
        </div>

        {/* Email Field */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-mocha mb-2"
          >
            Email *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-5 w-5 text-sage/50" />
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-dusty-rose/20 focus:border-dusty-rose transition-colors ${
                errors.email ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="tu@email.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone Field */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-mocha mb-2"
          >
            Teléfono (opcional)
          </label>
          <div className="relative">
            <MessageCircle className="absolute left-3 top-3 h-5 w-5 text-sage/50" />
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-dusty-rose/20 focus:border-dusty-rose transition-colors ${
                errors.phone ? "border-red-300" : "border-gray-300"
              }`}
              placeholder="(809) 658-1245"
            />
          </div>
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.phone}
            </p>
          )}
        </div>

        {/* Request Type Field */}
        <div>
          <label
            htmlFor="requestType"
            className="block text-sm font-medium text-mocha mb-2"
          >
            Tipo de Solicitud *
          </label>
          <div className="relative">
            <Cake className="absolute left-3 top-3 h-5 w-5 text-sage/50" />
            <select
              id="requestType"
              name="requestType"
              value={formData.requestType}
              onChange={handleChange}
              className={`pl-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-dusty-rose/20 focus:border-dusty-rose transition-colors ${
                errors.requestType ? "border-red-300" : "border-gray-300"
              }`}
            >
              <option value="">Selecciona el tipo de solicitud</option>
              {requestTypes.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          {errors.requestType && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.requestType}
            </p>
          )}
        </div>

        {/* Event Date and Guest Count Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Event Date Field */}
          <div>
            <label
              htmlFor="eventDate"
              className="block text-sm font-medium text-mocha mb-2"
            >
              Fecha del Evento (opcional)
            </label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-sage/50" />
              <input
                type="date"
                id="eventDate"
                name="eventDate"
                value={formData.eventDate}
                onChange={handleChange}
                className={`pl-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-dusty-rose/20 focus:border-dusty-rose transition-colors ${
                  errors.eventDate ? "border-red-300" : "border-gray-300"
                }`}
              />
            </div>
            {errors.eventDate && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.eventDate}
              </p>
            )}
          </div>

          {/* Guest Count Field */}
          <div>
            <label
              htmlFor="guestCount"
              className="block text-sm font-medium text-mocha mb-2"
            >
              Número de Personas (opcional)
            </label>
            <div className="relative">
              <Users className="absolute left-3 top-3 h-5 w-5 text-sage/50" />
              <input
                type="number"
                id="guestCount"
                name="guestCount"
                value={formData.guestCount}
                onChange={handleChange}
                min="1"
                max="1000"
                className={`pl-10 w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-dusty-rose/20 focus:border-dusty-rose transition-colors ${
                  errors.guestCount ? "border-red-300" : "border-gray-300"
                }`}
                placeholder="Ej: 12"
              />
            </div>
            {errors.guestCount && (
              <p className="mt-1 text-sm text-red-600 flex items-center">
                <AlertCircle className="h-4 w-4 mr-1" />
                {errors.guestCount}
              </p>
            )}
          </div>
        </div>

        {/* Message Field */}
        <div>
          <label
            htmlFor="message"
            className="block text-sm font-medium text-mocha mb-2"
          >
            Cuéntame tu Idea *
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={5}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-dusty-rose/20 focus:border-dusty-rose transition-colors ${
              errors.message ? "border-red-300" : "border-gray-300"
            }`}
            placeholder="Describe tu visión: ¿qué tipo de postre tienes en mente? ¿Hay algún sabor especial que te gustaría? ¿Tienes alguna inspiración o tema en particular?"
          />
          {errors.message && (
            <p className="mt-1 text-sm text-red-600 flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-dusty-rose text-white py-3 px-6 rounded-lg font-karla font-medium transition-all transform hover:scale-[1.02] hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-dusty-rose/20 ${
            isSubmitting
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-dusty-rose/90"
          }`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Enviando...
            </span>
          ) : (
            <span className="flex items-center justify-center">
              <Send className="h-5 w-5 mr-2" />
              Enviar Mensaje
            </span>
          )}
        </button>
      </form>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-cream/30 rounded-lg">
        <p className="text-sm text-mocha/70 font-karla text-center">
          <strong>Tiempo de respuesta:</strong> 24 horas •{" "}
          <strong>Consultas urgentes:</strong> WhatsApp (809) 658-1245
        </p>
      </div>
    </div>
  );
};

export default ContactPageForm;
