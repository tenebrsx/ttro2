import {
  HeartPeople,
  HeartCalendar,
  HeartUtensils,
  HandHeart,
} from "./icons/ArtisanalIcons";

const Services = () => {
  const services = [
    {
      icon: HeartPeople,
      title: "Cenas Íntimas",
      description:
        "Perfectas para parejas o grupos pequeños de 2-10 personas. Crearé una experiencia culinaria personalizada en la comodidad de tu hogar.",
      features: [
        "Menú personalizado",
        "Ingredientes frescos seleccionados",
        "Presentación profesional",
        "Limpieza incluida",
      ],
      emotion: "Intimidad que se saborea",
    },
    {
      icon: HeartCalendar,
      title: "Eventos Especiales",
      description:
        "Haz que tus ocasiones especiales sean inolvidables—cumpleaños, aniversarios, micro-bodas, o cualquier celebración que merezca comida excepcional.",
      features: [
        "Planificación de eventos",
        "Adaptaciones dietéticas",
        "Presentación elegante",
        "Estilos de servicio flexibles",
      ],
      emotion: "Celebraciones que perduren",
    },
    {
      icon: HeartUtensils,
      title: "Experiencias Únicas",
      description:
        "Desde clases de cocina hasta maridajes de vinos, diseñaré una experiencia culinaria que sea únicamente tuya.",
      features: [
        "Temas personalizados",
        "Cocina interactiva",
        "Selección de vinos",
        "Compartir recetas",
      ],
      emotion: "Momentos que nutren el alma",
    },
  ];

  return (
    <section
      id="services"
      className="py-20 bg-gradient-to-br from-cream via-white to-cream bg-texture relative texture-grain"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cream/10 to-transparent rounded-luxury opacity-60"></div>
          <div className="relative flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-sage/40 shadow-inner-soft"></div>
            <span className="mx-4 text-sm font-karla text-sage/70 uppercase tracking-wider bg-cream/20 rounded-premium px-4 py-2 shadow-inner-soft backdrop-blur-sm">
              Servicios del Corazón
            </span>
            <div className="w-16 h-px bg-sage/40 shadow-inner-soft"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-academy text-mocha mb-6 text-shadow-soft">
            Servicios que
            <span className="block text-dusty-rose italic mt-2 font-bold">
              Alegran tu Día
            </span>
          </h2>

          <div className="w-24 h-px bg-gradient-to-r from-transparent via-sage/40 to-transparent mx-auto mb-6 shadow-inner-soft"></div>

          <p className="text-lg text-mocha/70 max-w-2xl mx-auto font-karla font-light leading-relaxed bg-gradient-to-r from-cream/10 via-white/20 to-cream/10 rounded-2xl px-6 py-4 shadow-inner-soft backdrop-blur-sm">
            Cada servicio está hecho a medida para tu visión, tu espacio y tu
            gente. Creemos algo hermoso juntos.
            <span className="block mt-2 italic text-mocha/60 bg-sage/5 rounded-premium px-3 py-1 shadow-inner-soft">
              Porque cada experiencia debe ser tan única como tú.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-sage/5 via-transparent to-cream/5 rounded-luxury opacity-60"></div>
          {services.map((service, index) => (
            <div
              key={index}
              className="relative bg-white/80 backdrop-blur-md rounded-2xl p-8 shadow-premium hover:shadow-luxury transition-all duration-500 border border-sage/10 group transform hover:scale-105 hover:-rotate-1 surface-elegant"
            >
              <div className="flex items-center justify-center w-16 h-16 bg-sage/20 rounded-luxury mb-6 group-hover:bg-sage/30 transition-all duration-500 shadow-elegant group-hover:shadow-premium backdrop-blur-sm">
                <service.icon
                  className="text-sage transition-transform duration-500 group-hover:scale-110"
                  size={32}
                />
              </div>

              <h3 className="text-2xl font-academy text-mocha mb-4 text-shadow-soft bg-gradient-to-r from-mocha/5 to-transparent rounded-premium px-3 py-1 shadow-inner-soft">
                {service.title}
              </h3>

              <p className="text-mocha/70 mb-6 leading-relaxed font-karla font-light bg-cream/10 rounded-card px-4 py-3 shadow-inner-soft backdrop-blur-sm">
                {service.description}
              </p>

              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-center text-mocha/60 font-karla"
                  >
                    <HandHeart
                      className="text-sage mr-2 flex-shrink-0"
                      size={16}
                    />
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-4 border-t border-sage/20 relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-sage/5 to-transparent rounded-premium"></div>
                <p className="relative text-sage/80 text-sm italic font-karla text-center bg-sage/5 rounded-premium px-4 py-2 shadow-inner-soft backdrop-blur-sm">
                  {service.emotion}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 relative">
          <div className="bg-sage/10 p-8 rounded-2xl shadow-premium hover:shadow-luxury transition-all duration-500 max-w-2xl mx-auto backdrop-blur-sm surface-premium">
            <p className="text-mocha/70 font-karla font-light leading-relaxed mb-6 bg-gradient-to-r from-cream/10 via-white/20 to-cream/10 rounded-premium px-4 py-3 shadow-inner-soft">
              "Mi pasión es crear experiencias que nutran no solo el cuerpo,
              sino también el alma. Cada servicio está impregnado con la
              intención de hacer que tus momentos especiales sean verdaderamente
              únicos."
            </p>
            <h3 className="text-2xl font-academy mb-4 text-shadow-soft bg-gradient-to-r from-mocha/5 to-transparent rounded-premium px-4 py-2 shadow-inner-soft">
              ¿Listo para{" "}
              <span className="text-dusty-rose font-bold bg-dusty-rose/10 rounded-premium px-2 py-1 shadow-inner-soft">
                Personalizar
              </span>{" "}
              tu Evento?
            </h3>
            <p className="text-sage font-cormorant text-lg italic bg-sage/10 rounded-premium px-4 py-2 shadow-inner-soft backdrop-blur-sm">
              — Con amor desde mi corazón hasta tu mesa
            </p>
          </div>
        </div>

        <div className="mt-16 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber/5 to-transparent rounded-luxury"></div>
          <blockquote className="relative text-xl font-academy text-amber-700 italic mb-4 bg-amber/5 rounded-2xl px-6 py-4 shadow-premium backdrop-blur-sm">
            "Rosa convirtió nuestro aniversario en pura magia. Cada bocado era
            una carta de amor."
          </blockquote>
          <p className="text-stone-600 bg-stone/5 rounded-premium px-4 py-2 shadow-inner-soft backdrop-blur-sm inline-block">
            — María & Santiago, Cena de Aniversario
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
