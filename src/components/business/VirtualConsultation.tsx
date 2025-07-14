import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Video,
  MessageCircle,
  Heart,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  Star,
} from "lucide-react";
import { Mail } from "lucide-react";

interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
  date: string;
  type: "video" | "phone" | "whatsapp";
}

interface ConsultationType {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  icon: React.ReactNode;
  features: string[];
  color: string;
  popular?: boolean;
}

interface VirtualConsultationProps {
  businessPhone?: string;
  businessEmail?: string;
  showPricing?: boolean;
  enableBooking?: boolean;
  availableTypes?: ConsultationType[];
}

export const VirtualConsultation: React.FC<VirtualConsultationProps> = ({
  businessPhone = "18096581245",
  businessEmail = "contact@cucinanostrard.com",
  availableTypes,
}) => {
  const [selectedType, setSelectedType] = useState<ConsultationType | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTime, setSelectedTime] = useState<TimeSlot | null>(null);
  const [currentStep, setCurrentStep] = useState<
    "select" | "schedule" | "details" | "confirmation"
  >("select");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guestCount: "",
    budget: "",
    preferences: "",
    inspiration: "",
  });

  const defaultConsultationTypes: ConsultationType[] = [
    {
      id: "quick-chat",
      name: "Consulta Rápida",
      description: "Conversación de 15 minutos para resolver dudas básicas",
      duration: 15,
      price: 0,
      icon: <MessageCircle className="w-6 h-6" />,
      features: [
        "Preguntas sobre productos",
        "Información de precios",
        "Disponibilidad general",
        "Recomendaciones básicas",
      ],
      color: "from-green-400 to-green-600",
    },
    {
      id: "design-session",
      name: "Sesión de Diseño",
      description: "Consulta detallada para planificar tu postre perfecto",
      duration: 45,
      price: 25,
      icon: <Heart className="w-6 h-6" />,
      features: [
        "Análisis detallado del evento",
        "Propuestas de diseño personalizadas",
        "Selección de sabores",
        "Cotización precisa",
        "Bocetos digitales incluidos",
      ],
      color: "from-sage to-clay",
      popular: true,
    },
    {
      id: "premium-planning",
      name: "Planificación Premium",
      description: "Consulta completa con seguimiento personalizado",
      duration: 60,
      price: 50,
      icon: <Star className="w-6 h-6" />,
      features: [
        "Todo lo de Sesión de Diseño",
        "Cronograma detallado",
        "Seguimiento por WhatsApp",
        "Cambios incluidos",
        "Garantía de satisfacción",
        "Descuento 10% en el pedido",
      ],
      color: "from-purple-400 to-pink-600",
    },
  ];

  const consultationTypes = availableTypes || defaultConsultationTypes;

  // Generate available time slots
  const generateTimeSlots = (date: string): TimeSlot[] => {
    const slots: TimeSlot[] = [];
    const times = [
      "09:00",
      "09:30",
      "10:00",
      "10:30",
      "11:00",
      "11:30",
      "14:00",
      "14:30",
      "15:00",
      "15:30",
      "16:00",
      "16:30",
      "17:00",
      "17:30",
      "18:00",
    ];

    times.forEach((time) => {
      slots.push({
        id: `${date}-${time}`,
        time,
        date,
        available: Math.random() > 0.3, // 70% chance of being available
        type: selectedType?.duration === 15 ? "whatsapp" : "video",
      });
    });

    return slots;
  };

  // Generate next 14 days
  const getAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip Sundays
      if (date.getDay() !== 0) {
        dates.push({
          date: date.toISOString().split("T")[0],
          displayDate: date.toLocaleDateString("es-ES", {
            weekday: "short",
            month: "short",
            day: "numeric",
          }),
          dayName: date.toLocaleDateString("es-ES", { weekday: "long" }),
        });
      }
    }

    return dates;
  };

  const availableDates = getAvailableDates();
  const timeSlots = selectedDate ? generateTimeSlots(selectedDate) : [];

  const handleTypeSelection = (type: ConsultationType) => {
    setSelectedType(type);
    setCurrentStep("schedule");
  };

  const handleDateSelection = (date: string) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelection = (slot: TimeSlot) => {
    if (slot.available) {
      setSelectedTime(slot);
    }
  };

  const handleNextStep = () => {
    if (currentStep === "schedule" && selectedTime) {
      setCurrentStep("details");
    } else if (currentStep === "details") {
      setCurrentStep("confirmation");
    }
  };

  const handleBookConsultation = () => {
    if (!selectedType || !selectedTime || !customerInfo.name) return;

    // Generate WhatsApp message
    const message = generateConsultationMessage();
    const whatsappUrl = `https://wa.me/${businessPhone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  const generateConsultationMessage = () => {
    if (!selectedType || !selectedTime) return "";

    let message = `*SOLICITUD DE CONSULTA VIRTUAL*\n\n`;

    message += `*Tipo de Consulta:* ${selectedType.name}\n`;
    message += `⏰ *Duración:* ${selectedType.duration} minutos\n`;
    message += `*Fecha:* ${new Date(selectedTime.date).toLocaleDateString(
      "es-ES",
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    )}\n`;
    message += `*Hora:* ${selectedTime.time}\n`;
    message += `*Modalidad:* ${selectedTime.type === "video" ? "Videollamada" : "WhatsApp"}\n\n`;

    message += `*INFORMACIÓN DEL CLIENTE:*\n`;
    message += `Nombre: ${customerInfo.name}\n`;
    message += `Email: ${customerInfo.email}\n`;
    message += `Teléfono: ${customerInfo.phone}\n\n`;

    if (customerInfo.eventType) {
      message += `*DETALLES DEL EVENTO:*\n`;
      message += `Tipo: ${customerInfo.eventType}\n`;
      if (customerInfo.eventDate)
        message += `Fecha del evento: ${customerInfo.eventDate}\n`;
      if (customerInfo.guestCount)
        message += `Número de invitados: ${customerInfo.guestCount}\n`;
      if (customerInfo.budget)
        message += `Presupuesto estimado: $${customerInfo.budget}\n\n`;
    }

    if (customerInfo.preferences) {
      message += `*PREFERENCIAS:*\n${customerInfo.preferences}\n\n`;
    }

    if (customerInfo.inspiration) {
      message += `*INSPIRACIÓN:*\n${customerInfo.inspiration}\n\n`;
    }

    if (selectedType.price > 0) {
      message += `*Costo de consulta:* RD$${selectedType.price} DOP\n`;
      message += `*Pago:* Se realiza después de confirmar la cita\n\n`;
    }

    message += `¡Esperamos tu confirmación!`;

    return message;
  };

  const resetForm = () => {
    setSelectedType(null);
    setSelectedDate("");
    setSelectedTime(null);
    setCurrentStep("select");
    setCustomerInfo({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      guestCount: "",
      budget: "",
      preferences: "",
      inspiration: "",
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Video className="w-8 h-8 text-sage" />
          <h2 className="text-3xl font-bold text-gray-900">Consulta Virtual</h2>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Conversemos sobre tu evento especial desde la comodidad de tu hogar.
          Planificamos juntos el postre perfecto para tu celebración.
        </p>
      </motion.div>

      {/* Progress Indicator */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-2">
          {["select", "schedule", "details", "confirmation"].map(
            (step, index) => (
              <React.Fragment key={step}>
                <div
                  className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  currentStep === step ||
                  (step === "select" &&
                    ["schedule", "details", "confirmation"].includes(
                      currentStep,
                    )) ||
                  (step === "schedule" &&
                    ["details", "confirmation"].includes(currentStep)) ||
                  (step === "details" && currentStep === "confirmation")
                    ? "bg-sage text-white"
                    : "bg-gray-200 text-gray-600"
                }
              `}
                >
                  {index + 1}
                </div>
                {index < 3 && (
                  <div
                    className={`w-12 h-1 ${
                      (step === "select" &&
                        ["schedule", "details", "confirmation"].includes(
                          currentStep,
                        )) ||
                      (step === "schedule" &&
                        ["details", "confirmation"].includes(currentStep)) ||
                      (step === "details" && currentStep === "confirmation")
                        ? "bg-sage"
                        : "bg-gray-200"
                    }`}
                  />
                )}
              </React.Fragment>
            ),
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {/* Step 1: Select Consultation Type */}
        {currentStep === "select" && (
          <motion.div
            key="select"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <h3 className="text-xl font-semibold text-gray-900 text-center mb-6">
              ¿Qué tipo de consulta necesitas?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {consultationTypes.map((type) => (
                <motion.div
                  key={type.id}
                  className={`
                    relative bg-white rounded-lg shadow-sm border-2 cursor-pointer transition-all duration-300
                    hover:shadow-lg hover:scale-105
                    ${type.popular ? "border-sage ring-2 ring-sage/20" : "border-gray-200 hover:border-sage"}
                  `}
                  onClick={() => handleTypeSelection(type)}
                  whileHover={{ y: -5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {type.popular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <span className="bg-sage text-white px-3 py-1 rounded-full text-xs font-medium">
                        Más Popular
                      </span>
                    </div>
                  )}

                  <div
                    className={`h-32 bg-gradient-to-br ${type.color} rounded-t-lg flex items-center justify-center text-white`}
                  >
                    {type.icon}
                  </div>

                  <div className="p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {type.name}
                    </h4>
                    <p className="text-gray-600 text-sm mb-4">
                      {type.description}
                    </p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Duración:</span>
                        <span className="font-medium">{type.duration} min</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-500">Precio:</span>
                        <span className="font-medium text-sage">
                          {type.price === 0 ? "Gratis" : `RD$${type.price} DOP`}
                        </span>
                      </div>
                    </div>

                    <div className="space-y-1 mb-4">
                      {type.features.slice(0, 3).map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2 text-xs text-gray-600"
                        >
                          <CheckCircle className="w-3 h-3 text-green-500" />
                          <span>{feature}</span>
                        </div>
                      ))}
                      {type.features.length > 3 && (
                        <div className="text-xs text-gray-500">
                          +{type.features.length - 3} beneficios más
                        </div>
                      )}
                    </div>

                    <button className="w-full bg-sage text-white py-2 rounded-lg hover:bg-sage/90 transition-colors">
                      Seleccionar
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Step 2: Schedule Consultation */}
        {currentStep === "schedule" && (
          <motion.div
            key="schedule"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Agenda tu {selectedType?.name}
              </h3>
              <p className="text-gray-600">
                Selecciona el día y horario que mejor te convenga
              </p>
            </div>

            {/* Selected Type Summary */}
            <div className="bg-sage/5 rounded-lg p-4 border border-sage/20">
              <div className="flex items-center space-x-3">
                <div
                  className={`p-3 bg-gradient-to-br ${selectedType?.color} rounded-lg text-white`}
                >
                  {selectedType?.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {selectedType?.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedType?.duration} minutos •{" "}
                    {selectedType?.price === 0
                      ? "Gratis"
                      : `RD$${selectedType?.price} DOP`}
                  </p>
                </div>
              </div>
            </div>

            {/* Date Selection */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3">
                Selecciona una fecha:
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {availableDates.slice(0, 8).map((dateOption) => (
                  <button
                    key={dateOption.date}
                    onClick={() => handleDateSelection(dateOption.date)}
                    className={`
                      p-3 rounded-lg border-2 transition-all text-center
                      ${
                        selectedDate === dateOption.date
                          ? "border-sage bg-sage text-white"
                          : "border-gray-200 hover:border-sage hover:bg-sage/5"
                      }
                    `}
                  >
                    <div className="text-sm font-medium">
                      {dateOption.displayDate}
                    </div>
                    <div className="text-xs opacity-75">
                      {dateOption.dayName}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Time Selection */}
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <h4 className="font-medium text-gray-900 mb-3">
                  Horarios disponibles:
                </h4>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-3">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.id}
                      onClick={() => handleTimeSelection(slot)}
                      disabled={!slot.available}
                      className={`
                        p-2 rounded-lg border text-sm font-medium transition-all
                        ${
                          !slot.available
                            ? "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                            : selectedTime?.id === slot.id
                              ? "border-sage bg-sage text-white"
                              : "border-gray-200 hover:border-sage hover:bg-sage/5"
                        }
                      `}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6">
              <button
                onClick={() => setCurrentStep("select")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              {selectedTime && (
                <button
                  onClick={handleNextStep}
                  className="bg-sage text-white px-6 py-2 rounded-lg hover:bg-sage/90 transition-colors"
                >
                  Continuar
                </button>
              )}
            </div>
          </motion.div>
        )}

        {/* Step 3: Customer Details */}
        {currentStep === "details" && (
          <motion.div
            key="details"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Cuéntanos sobre tu evento
              </h3>
              <p className="text-gray-600">
                Esta información nos ayudará a prepararnos mejor para la
                consulta
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">
                  Información Personal
                </h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre completo *
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
                    Email *
                  </label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Teléfono *
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
              </div>

              {/* Event Information */}
              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">
                  Detalles del Evento
                </h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de evento
                  </label>
                  <select
                    value={customerInfo.eventType}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        eventType: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                  >
                    <option value="">Seleccionar tipo</option>
                    <option value="Cumpleaños">Cumpleaños</option>
                    <option value="Boda">Boda</option>
                    <option value="Aniversario">Aniversario</option>
                    <option value="Graduación">Graduación</option>
                    <option value="Baby Shower">Baby Shower</option>
                    <option value="Corporativo">Evento Corporativo</option>
                    <option value="Otro">Otro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Fecha del evento
                  </label>
                  <input
                    type="date"
                    value={customerInfo.eventDate}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        eventDate: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Número de invitados
                  </label>
                  <input
                    type="number"
                    value={customerInfo.guestCount}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        guestCount: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                    placeholder="Ej: 25"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Presupuesto estimado (MXN)
                  </label>
                  <input
                    type="number"
                    value={customerInfo.budget}
                    onChange={(e) =>
                      setCustomerInfo((prev) => ({
                        ...prev,
                        budget: e.target.value,
                      }))
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                    placeholder="Ej: 1500"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Preferencias o restricciones alimentarias
                </label>
                <textarea
                  value={customerInfo.preferences}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      preferences: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                  rows={3}
                  placeholder="Ej: Sin gluten, vegano, alérgico a frutos secos..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Inspiración o ideas que tienes en mente
                </label>
                <textarea
                  value={customerInfo.inspiration}
                  onChange={(e) =>
                    setCustomerInfo((prev) => ({
                      ...prev,
                      inspiration: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sage focus:border-sage"
                  rows={3}
                  placeholder="Describe tu visión, colores, tema, estilo..."
                />
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6">
              <button
                onClick={() => setCurrentStep("schedule")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              <button
                onClick={handleNextStep}
                disabled={
                  !customerInfo.name ||
                  !customerInfo.email ||
                  !customerInfo.phone
                }
                className="bg-sage text-white px-6 py-2 rounded-lg hover:bg-sage/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Revisar
              </button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Confirmation */}
        {currentStep === "confirmation" && (
          <motion.div
            key="confirmation"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                ¡Confirma tu consulta!
              </h3>
              <p className="text-gray-600">
                Revisa los detalles antes de enviar tu solicitud
              </p>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 space-y-4">
              <div className="flex items-center space-x-3 pb-4 border-b">
                <div
                  className={`p-3 bg-gradient-to-br ${selectedType?.color} rounded-lg text-white`}
                >
                  {selectedType?.icon}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {selectedType?.name}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {selectedType?.duration} minutos •{" "}
                    {selectedType?.price === 0
                      ? "Gratis"
                      : `RD$${selectedType?.price} DOP`}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">
                    Fecha y Hora
                  </h5>
                  <p className="text-gray-600">
                    {selectedTime &&
                      new Date(selectedTime.date).toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                  </p>
                  <p className="text-gray-600">{selectedTime?.time}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Modalidad</h5>
                  <p className="text-gray-600">
                    {selectedTime?.type === "video"
                      ? "Videollamada"
                      : "WhatsApp"}
                  </p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Cliente</h5>
                  <p className="text-gray-600">{customerInfo.name}</p>
                  <p className="text-gray-600">{customerInfo.email}</p>
                  <p className="text-gray-600">{customerInfo.phone}</p>
                </div>

                <div>
                  <h5 className="font-medium text-gray-900 mb-2">Evento</h5>
                  <p className="text-gray-600">
                    {customerInfo.eventType || "No especificado"}
                  </p>
                  {customerInfo.eventDate && (
                    <p className="text-gray-600">
                      {new Date(customerInfo.eventDate).toLocaleDateString(
                        "es-ES",
                      )}
                    </p>
                  )}
                  {customerInfo.guestCount && (
                    <p className="text-gray-600">
                      {customerInfo.guestCount} invitados
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Important Notes */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h5 className="font-medium text-blue-900 mb-2 flex items-center space-x-2">
                <AlertCircle className="w-4 h-4" />
                <span>Información importante:</span>
              </h5>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>
                  • Recibirás un WhatsApp de confirmación en las próximas horas
                </li>
                <li>
                  • Te enviaremos el enlace de videollamada 24 horas antes
                </li>
                {selectedType?.price && selectedType.price > 0 && (
                  <li>
                    • El pago se realiza después de confirmar la disponibilidad
                  </li>
                )}
                <li>• Puedes reprogramar con 24 horas de anticipación</li>
              </ul>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between pt-6">
              <button
                onClick={() => setCurrentStep("details")}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Volver</span>
              </button>

              <div className="flex items-center space-x-3">
                <button
                  onClick={resetForm}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Empezar de nuevo
                </button>
                <button
                  onClick={handleBookConsultation}
                  className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center space-x-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Enviar solicitud</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contact Information */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-12 bg-gradient-to-r from-sage/10 to-clay/10 rounded-lg p-6 text-center"
      >
        <h4 className="font-semibold text-gray-900 mb-2">
          ¿Prefieres contactarnos directamente?
        </h4>
        <p className="text-gray-600 mb-4">
          También puedes escribirnos directamente para agendar tu consulta
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
          <a
            href={`https://wa.me/${businessPhone.replace(/[^\d]/g, "")}?text=${encodeURIComponent(
              "¡Hola! Me gustaría agendar una consulta virtual para planificar un postre personalizado. ¿Podrían ayudarme con los horarios disponibles?",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp directo</span>
          </a>
          <a
            href={`mailto:${businessEmail}?subject=Solicitud de Consulta Virtual&body=Hola,%0A%0AMe gustaría agendar una consulta virtual para planificar un postre personalizado.%0A%0AGracias!`}
            className="flex items-center space-x-2 bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email</span>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default VirtualConsultation;
