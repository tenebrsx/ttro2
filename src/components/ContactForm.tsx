import React, { useState } from "react";
import { Send, Calendar, Users, Heart, MessageCircle } from "lucide-react";
import Button from "./Button";
import { sendEmail } from "../services/emailService";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guests: string;
  budget: string;
  message: string;
  allergies: string;
}

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guests: "",
    budget: "",
    message: "",
    allergies: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Add submission timestamp
      const submissionData = {
        ...formData,
        submittedAt: new Date().toISOString(),
      };

      // Map form data to EmailTemplateData format
      const emailData = {
        name: submissionData.name,
        email: submissionData.email,
        phone: submissionData.phone,
        requestType: submissionData.eventType,
        eventDate: submissionData.eventDate,
        guestCount: submissionData.guests,
        message: submissionData.message,
        submittedAt: submissionData.submittedAt,
        allergies: submissionData.allergies,
        budget: submissionData.budget,
      };

      // Send email using the email service
      const success = await sendEmail(emailData);

      setLoading(false);

      if (success) {
        setSubmitted(true);
        // Reset form after 3 seconds on success
        setTimeout(() => {
          setSubmitted(false);
          setFormData({
            name: "",
            email: "",
            phone: "",
            eventType: "",
            eventDate: "",
            guests: "",
            budget: "",
            message: "",
            allergies: "",
          });
        }, 3000);
      } else {
        // Handle error case
        alert(
          "Hubo un problema al enviar el formulario. Por favor, inténtelo de nuevo.",
        );
      }
    } catch (error) {
      console.error("Error in form submission:", error);
      setLoading(false);
      alert(
        "Hubo un error al procesar su solicitud. Por favor, inténtelo de nuevo.",
      );
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-sage" />
        </div>
        <h3 className="text-2xl font-cormorant text-mocha mb-4">
          ¡Gracias por tu mensaje!
        </h3>
        <p className="text-mocha/70 font-karla">
          Te contactaré pronto para conversar sobre tu dulce celebración.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-mocha mb-2 font-karla">
            Nombre completo *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-sage/20 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors font-karla"
            placeholder="Tu nombre"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-mocha mb-2 font-karla">
            Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-sage/20 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors font-karla"
            placeholder="tu@email.com"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-mocha mb-2 font-karla">
            Teléfono/WhatsApp
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-sage/20 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors font-karla"
            placeholder="(809) 658-1245"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-mocha mb-2 font-karla">
            Tipo de evento *
          </label>
          <select
            name="eventType"
            required
            value={formData.eventType}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-sage/20 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors font-karla"
          >
            <option value="">Selecciona un tipo</option>
            <option value="birthday">Cumpleaños</option>
            <option value="wedding">Boda</option>
            <option value="anniversary">Aniversario</option>
            <option value="baby-shower">Baby Shower</option>
            <option value="corporate">Evento Corporativo</option>
            <option value="other">Otro</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-mocha mb-2 font-karla">
            <Calendar className="inline w-4 h-4 mr-1" />
            Fecha del evento
          </label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-sage/20 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors font-karla"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-mocha mb-2 font-karla">
            <Users className="inline w-4 h-4 mr-1" />
            Número de invitados
          </label>
          <input
            type="number"
            name="guests"
            value={formData.guests}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-sage/20 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors font-karla"
            placeholder="Ej: 20"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-mocha mb-2 font-karla">
          Presupuesto estimado
        </label>
        <select
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-sage/20 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors font-karla"
        >
          <option value="">Selecciona un rango</option>
          <option value="under-50">Menos de $50</option>
          <option value="50-100">$50 - $100</option>
          <option value="100-200">$100 - $200</option>
          <option value="200-500">$200 - $500</option>
          <option value="over-500">Más de $500</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-mocha mb-2 font-karla">
          Alergias o restricciones dietéticas
        </label>
        <input
          type="text"
          name="allergies"
          value={formData.allergies}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg border border-sage/20 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors font-karla"
          placeholder="Ej: Sin gluten, vegano, sin nueces"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-mocha mb-2 font-karla">
          <MessageCircle className="inline w-4 h-4 mr-1" />
          Cuéntame sobre tu visión *
        </label>
        <textarea
          name="message"
          required
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-sage/20 focus:border-sage focus:ring-2 focus:ring-sage/20 transition-colors font-karla resize-none"
          placeholder="Describe tu evento soñado, sabores que te gustan, estilo visual, o cualquier detalle especial que tengas en mente..."
        />
      </div>

      <div className="text-center">
        <Button
          type="submit"
          loading={loading}
          icon={Send}
          iconPosition="right"
          size="lg"
          className="px-12"
        >
          {loading ? "Enviando..." : "Enviar Consulta"}
        </Button>
        <p className="text-sm text-mocha/60 mt-4 font-karla">
          Te responderé en 24 horas para conversar sobre tu dulce celebración
        </p>
      </div>
    </form>
  );
};

export default ContactForm;
