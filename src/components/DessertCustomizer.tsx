import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChefHat, Cake, Heart, Star, Clock, Users, X } from "lucide-react";
import { formatPrice } from "../utils/currency";

interface DessertOption {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  popular?: boolean;
}

interface CustomizationStep {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  required: boolean;
  options: DessertOption[];
}

interface CustomDessert {
  base: string;
  size: string;
  flavor: string;
  filling: string;
  decoration: string;
  extras: string[];
  message: string;
  servings: number;
  deliveryDate: string;
}

const DessertCustomizer: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [customDessert, setCustomDessert] = useState<CustomDessert>({
    base: "",
    size: "",
    flavor: "",
    filling: "",
    decoration: "",
    extras: [],
    message: "",
    servings: 8,
    deliveryDate: "",
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const customizationSteps: CustomizationStep[] = [
    {
      id: "base",
      title: "Tipo de Postre",
      description: "Elige la base de tu creación",
      icon: <Cake className="w-6 h-6" />,
      required: true,
      options: [
        {
          id: "torta",
          name: "Torta Clásica",
          description: "Perfecta para celebraciones especiales",
          price: 45,
          image:
            "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=300",
          popular: true,
        },
        {
          id: "cupcakes",
          name: "Cupcakes",
          description: "Ideales para compartir",
          price: 30,
          image:
            "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: "macarons",
          name: "Macarons",
          description: "Elegancia francesa en cada bocado",
          price: 40,
          image:
            "https://images.pexels.com/photos/1028704/pexels-photo-1028704.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
        {
          id: "tartaletas",
          name: "Tartaletas",
          description: "Delicadas y sofisticadas",
          price: 35,
          image:
            "https://images.pexels.com/photos/1998634/pexels-photo-1998634.jpeg?auto=compress&cs=tinysrgb&w=300",
        },
      ],
    },
    {
      id: "size",
      title: "Tamaño",
      description: "Selecciona el tamaño perfecto",
      icon: <Users className="w-6 h-6" />,
      required: true,
      options: [
        {
          id: "small",
          name: "Pequeño (6-8 personas)",
          description: "Perfecto para reuniones íntimas",
          price: 0,
          image: "",
        },
        {
          id: "medium",
          name: "Mediano (10-12 personas)",
          description: "Ideal para fiestas familiares",
          price: 15,
          image: "",
          popular: true,
        },
        {
          id: "large",
          name: "Grande (15-20 personas)",
          description: "Para grandes celebraciones",
          price: 30,
          image: "",
        },
        {
          id: "xlarge",
          name: "Extra Grande (25+ personas)",
          description: "Para eventos especiales",
          price: 50,
          image: "",
        },
      ],
    },
    {
      id: "flavor",
      title: "Sabor Principal",
      description: "El alma de tu postre",
      icon: <Heart className="w-6 h-6" />,
      required: true,
      options: [
        {
          id: "vanilla",
          name: "Vainilla Madagascar",
          description: "Clásica y aromática",
          price: 0,
          image: "",
          popular: true,
        },
        {
          id: "chocolate",
          name: "Chocolate Belga",
          description: "Rico y profundo",
          price: 5,
          image: "",
        },
        {
          id: "strawberry",
          name: "Fresa Natural",
          description: "Fresca y delicada",
          price: 5,
          image: "",
        },
        {
          id: "lemon",
          name: "Limón Meyer",
          description: "Cítrica y refrescante",
          price: 5,
          image: "",
        },
        {
          id: "earl-grey",
          name: "Earl Grey",
          description: "Sofisticada y aromática",
          price: 10,
          image: "",
        },
        {
          id: "red-velvet",
          name: "Red Velvet",
          description: "Terciopelo rojo clásico",
          price: 8,
          image: "",
        },
      ],
    },
    {
      id: "filling",
      title: "Relleno",
      description: "La sorpresa en cada capa",
      icon: <Star className="w-6 h-6" />,
      required: false,
      options: [
        {
          id: "none",
          name: "Sin Relleno",
          description: "Simpleza perfecta",
          price: 0,
          image: "",
        },
        {
          id: "cream-cheese",
          name: "Crema de Queso",
          description: "Suave y cremosa",
          price: 8,
          image: "",
          popular: true,
        },
        {
          id: "fruit-compote",
          name: "Compota de Frutas",
          description: "Frutas de temporada",
          price: 10,
          image: "",
        },
        {
          id: "chocolate-ganache",
          name: "Ganache de Chocolate",
          description: "Intenso y sedoso",
          price: 12,
          image: "",
        },
        {
          id: "dulce-leche",
          name: "Dulce de Leche",
          description: "Caramelo artesanal",
          price: 10,
          image: "",
        },
      ],
    },
    {
      id: "decoration",
      title: "Decoración",
      description: "El toque final artístico",
      icon: <ChefHat className="w-6 h-6" />,
      required: true,
      options: [
        {
          id: "classic",
          name: "Clásica",
          description: "Elegante y atemporal",
          price: 0,
          image: "",
          popular: true,
        },
        {
          id: "floral",
          name: "Flores Comestibles",
          description: "Naturaleza en tu postre",
          price: 20,
          image: "",
        },
        {
          id: "artistic",
          name: "Diseño Artístico",
          description: "Obra de arte comestible",
          price: 35,
          image: "",
        },
        {
          id: "minimalist",
          name: "Minimalista",
          description: "Menos es más",
          price: 15,
          image: "",
        },
        {
          id: "themed",
          name: "Temática Personalizada",
          description: "Tu imaginación hecha realidad",
          price: 50,
          image: "",
        },
      ],
    },
  ];

  const extras = [
    { id: "vegan", name: "Opción Vegana", price: 15 },
    { id: "gluten-free", name: "Sin Gluten", price: 12 },
    { id: "sugar-free", name: "Sin Azúcar", price: 10 },
    { id: "organic", name: "Ingredientes Orgánicos", price: 18 },
    { id: "gift-box", name: "Caja de Regalo", price: 8 },
    { id: "candles", name: "Velas Especiales", price: 5 },
  ];

  const calculateTotalPrice = useCallback(() => {
    let total = 0;

    // Base price
    const baseOption = customizationSteps[0].options.find(
      (opt) => opt.id === customDessert.base,
    );
    if (baseOption) total += baseOption.price;

    // Size price
    const sizeOption = customizationSteps[1].options.find(
      (opt) => opt.id === customDessert.size,
    );
    if (sizeOption) total += sizeOption.price;

    // Flavor price
    const flavorOption = customizationSteps[2].options.find(
      (opt) => opt.id === customDessert.flavor,
    );
    if (flavorOption) total += flavorOption.price;

    // Filling price
    const fillingOption = customizationSteps[3].options.find(
      (opt) => opt.id === customDessert.filling,
    );
    if (fillingOption) total += fillingOption.price;

    // Decoration price
    const decorationOption = customizationSteps[4].options.find(
      (opt) => opt.id === customDessert.decoration,
    );
    if (decorationOption) total += decorationOption.price;

    // Extras price
    customDessert.extras.forEach((extraId) => {
      const extra = extras.find((e) => e.id === extraId);
      if (extra) total += extra.price;
    });

    // Size multiplier for servings
    const servingMultiplier = customDessert.servings / 8;
    total *= servingMultiplier;

    setTotalPrice(Math.round(total));
  }, [customDessert, customizationSteps, extras]);

  useEffect(() => {
    calculateTotalPrice();
  }, [calculateTotalPrice]);

  const handleOptionSelect = (stepId: string, optionId: string) => {
    setCustomDessert((prev) => ({
      ...prev,
      [stepId]: optionId,
    }));
  };

  const handleExtraToggle = (extraId: string) => {
    setCustomDessert((prev) => ({
      ...prev,
      extras: prev.extras.includes(extraId)
        ? prev.extras.filter((id) => id !== extraId)
        : [...prev.extras, extraId],
    }));
  };

  const canProceed = () => {
    const currentStepData = customizationSteps[currentStep];
    if (!currentStepData.required) return true;

    const fieldName = currentStepData.id as keyof CustomDessert;
    return customDessert[fieldName] !== "";
  };

  const nextStep = () => {
    if (currentStep < customizationSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsComplete(true);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Handle order submission
    console.log("Pedido personalizado:", customDessert);
    console.log("Precio total:", totalPrice);
    onClose();
  };

  if (isComplete) {
    return (
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
        >
          <div className="text-center space-y-6">
            <motion.div
              className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
            >
              <Heart className="w-10 h-10 text-green-600" />
            </motion.div>

            <div>
              <h2 className="text-3xl font-playfair text-dark-cocoa mb-4">
                ¡Tu Postre Personalizado está Listo!
              </h2>
              <p className="text-mocha/70 font-source-serif">
                Hemos creado una propuesta única especialmente para ti
              </p>
            </div>

            <div className="bg-cream/50 rounded-2xl p-6 text-left">
              <h3 className="text-xl font-cormorant text-mocha mb-4">
                Resumen de tu Pedido
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Tipo:</span>
                  <span className="font-medium">
                    {
                      customizationSteps[0].options.find(
                        (opt) => opt.id === customDessert.base,
                      )?.name
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Tamaño:</span>
                  <span className="font-medium">
                    {
                      customizationSteps[1].options.find(
                        (opt) => opt.id === customDessert.size,
                      )?.name
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Sabor:</span>
                  <span className="font-medium">
                    {
                      customizationSteps[2].options.find(
                        (opt) => opt.id === customDessert.flavor,
                      )?.name
                    }
                  </span>
                </div>
                {customDessert.filling && (
                  <div className="flex justify-between">
                    <span>Relleno:</span>
                    <span className="font-medium">
                      {
                        customizationSteps[3].options.find(
                          (opt) => opt.id === customDessert.filling,
                        )?.name
                      }
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Decoración:</span>
                  <span className="font-medium">
                    {
                      customizationSteps[4].options.find(
                        (opt) => opt.id === customDessert.decoration,
                      )?.name
                    }
                  </span>
                </div>
                {customDessert.extras.length > 0 && (
                  <div className="flex justify-between">
                    <span>Extras:</span>
                    <span className="font-medium">
                      {customDessert.extras
                        .map(
                          (extraId) =>
                            extras.find((e) => e.id === extraId)?.name,
                        )
                        .join(", ")}
                    </span>
                  </div>
                )}
              </div>

              <div className="border-t border-dusty-rose/20 mt-4 pt-4">
                <div className="flex justify-between text-lg font-medium">
                  <span>Total Estimado:</span>
                  <span className="text-dusty-rose">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setIsComplete(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-medium hover:bg-gray-300 transition-colors"
              >
                Modificar
              </button>
              <button
                onClick={handleSubmit}
                className="flex-1 bg-dusty-rose text-white py-3 rounded-full font-medium hover:bg-mocha transition-colors"
              >
                Confirmar Pedido
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-dusty-rose to-warm-blush text-white p-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-playfair">Personaliza tu Postre</h2>
              <p className="text-white/80 font-source-serif">
                Paso {currentStep + 1} de {customizationSteps.length}
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Progress bar */}
          <div className="mt-4 bg-white/20 rounded-full h-2">
            <motion.div
              className="bg-white rounded-full h-2"
              initial={{ width: 0 }}
              animate={{
                width: `${((currentStep + 1) / customizationSteps.length) * 100}%`,
              }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-12 h-12 bg-dusty-rose/10 rounded-full flex items-center justify-center">
                    {customizationSteps[currentStep].icon}
                  </div>
                </div>
                <h3 className="text-2xl font-cormorant text-dark-cocoa mb-2">
                  {customizationSteps[currentStep].title}
                </h3>
                <p className="text-mocha/70 font-source-serif">
                  {customizationSteps[currentStep].description}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {customizationSteps[currentStep].options.map((option) => {
                  const isSelected =
                    customDessert[
                      customizationSteps[currentStep].id as keyof CustomDessert
                    ] === option.id;

                  return (
                    <motion.button
                      key={option.id}
                      onClick={() =>
                        handleOptionSelect(
                          customizationSteps[currentStep].id,
                          option.id,
                        )
                      }
                      className={`p-4 rounded-2xl border-2 text-left transition-all duration-300 ${
                        isSelected
                          ? "border-dusty-rose bg-dusty-rose/10"
                          : "border-gray-200 hover:border-dusty-rose/50 hover:bg-gray-50"
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex items-start space-x-4">
                        {option.image && (
                          <img
                            src={option.image}
                            alt={option.name}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                        )}
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-dark-cocoa">
                              {option.name}
                            </h4>
                            {option.popular && (
                              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                                Popular
                              </span>
                            )}
                          </div>
                          <p className="text-sm text-mocha/70 mb-2">
                            {option.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-dusty-rose">
                              {option.price > 0
                                ? `+${formatPrice(option.price)}`
                                : "Incluido"}
                            </span>
                            {isSelected && (
                              <div className="w-5 h-5 bg-dusty-rose rounded-full flex items-center justify-center">
                                <div className="w-2 h-2 bg-white rounded-full" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {/* Extras step */}
              {currentStep === customizationSteps.length - 1 && (
                <div className="mt-8">
                  <h4 className="text-lg font-cormorant text-dark-cocoa mb-4">
                    Extras Opcionales
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {extras.map((extra) => (
                      <label
                        key={extra.id}
                        className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-gray-50 cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={customDessert.extras.includes(extra.id)}
                          onChange={() => handleExtraToggle(extra.id)}
                          className="w-4 h-4 text-dusty-rose border-gray-300 rounded focus:ring-dusty-rose"
                        />
                        <div className="flex-1">
                          <span className="text-sm font-medium text-dark-cocoa">
                            {extra.name}
                          </span>
                          <span className="text-sm text-dusty-rose ml-2">
                            +{formatPrice(extra.price)}
                          </span>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Message input */}
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-dark-cocoa mb-2">
                      Mensaje especial (opcional)
                    </label>
                    <textarea
                      value={customDessert.message}
                      onChange={(e) =>
                        setCustomDessert((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      placeholder="¿Algún detalle especial que te gustaría agregar?"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dusty-rose focus:border-transparent"
                      rows={3}
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="bg-gray-50 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-lg font-medium text-dark-cocoa">
                Total Estimado:{" "}
              </span>
              <span className="text-2xl font-bold text-dusty-rose">
                {formatPrice(totalPrice)}
              </span>
            </div>
            <div className="text-sm text-mocha/70">
              <Clock className="w-4 h-4 inline mr-1" />
              Preparación: 2-3 días
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
            >
              Anterior
            </button>
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className="flex-1 bg-dusty-rose text-white py-3 rounded-full font-medium disabled:opacity-50 disabled:cursor-not-allowed hover:bg-mocha transition-colors"
            >
              {currentStep === customizationSteps.length - 1
                ? "Finalizar"
                : "Siguiente"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default DessertCustomizer;
