import { Users, Calendar, Utensils, Heart } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: Users,
      title: "Cenas Íntimas",
      description: "Perfectas para parejas o grupos pequeños de 2-10 personas. Crearé una experiencia culinaria personalizada en la comodidad de tu hogar.",
      features: ["Menú personalizado", "Ingredientes frescos seleccionados", "Presentación profesional", "Limpieza incluida"],
      emotion: "Intimidad que se saborea"
    },
    {
      icon: Calendar,
      title: "Eventos Especiales",
      description: "Haz que tus ocasiones especiales sean inolvidables—cumpleaños, aniversarios, micro-bodas, o cualquier celebración que merezca comida excepcional.",
      features: ["Planificación de eventos", "Adaptaciones dietéticas", "Presentación elegante", "Estilos de servicio flexibles"],
      emotion: "Celebraciones que perduren"
    },
    {
      icon: Utensils,
      title: "Experiencias Únicas",
      description: "Desde clases de cocina hasta maridajes de vinos, diseñaré una experiencia culinaria que sea únicamente tuya.",
      features: ["Temas personalizados", "Cocina interactiva", "Selección de vinos", "Compartir recetas"],
      emotion: "Momentos que nutren el alma"
    }
  ];

  return (
    <section id="services" className="py-20 bg-gradient-to-br from-cream via-white to-cream bg-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-sage/40"></div>
            <span className="mx-4 text-sm font-karla text-sage/70 uppercase tracking-wider">Servicios del Corazón</span>
            <div className="w-16 h-px bg-sage/40"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-cormorant text-mocha mb-6 text-shadow-soft">
            Servicios que
            <span className="block text-dusty-rose italic mt-2 font-bold">
              Endulzan tu Vida
            </span>
          </h2>
          
          <div className="w-24 h-px bg-sage/40 mx-auto mb-6"></div>
          
          <p className="text-lg text-mocha/70 max-w-2xl mx-auto font-karla font-light leading-relaxed">
            Cada servicio está hecho a medida para tu visión, tu espacio y tu gente. 
            Creemos algo hermoso juntos.
            <span className="block mt-2 italic text-mocha/60">
              Porque cada experiencia debe ser tan única como tú.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-gentle hover:shadow-warm transition-all duration-300 border border-sage/10 group transform hover:scale-105 hover:-rotate-1">
              <div className="flex items-center justify-center w-16 h-16 bg-sage/20 rounded-full mb-6 group-hover:bg-sage/30 transition-all duration-300">
                <service.icon className="h-8 w-8 text-sage" />
              </div>
              
              <h3 className="text-2xl font-cormorant text-mocha mb-4 text-shadow-soft">
                {service.title}
              </h3>
              
              <p className="text-mocha/70 mb-6 leading-relaxed font-karla font-light">
                {service.description}
              </p>
              
              <ul className="space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center text-mocha/60 font-karla">
                    <Heart className="h-4 w-4 text-sage mr-2 flex-shrink-0" />
                    <span className="font-light">{feature}</span>
                  </li>
                ))}
              </ul>
              
              <div className="pt-4 border-t border-sage/20">
                <p className="text-sage/80 text-sm italic font-karla text-center">
                  {service.emotion}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-sage/10 p-8 rounded-lg shadow-gentle max-w-2xl mx-auto">
            <p className="text-mocha/70 font-karla font-light leading-relaxed mb-6">
              "Mi pasión es crear experiencias que nutran no solo el cuerpo, sino también el alma. 
              Cada servicio está impregnado con la intención de hacer que tus momentos especiales sean verdaderamente únicos."
            </p>
            <h3 className="text-2xl font-cormorant mb-4 text-shadow-soft">
              ¿Listo para <span className="text-dusty-rose font-bold">Endulzar</span> tu Evento?
            </h3>
            <p className="text-sage font-cormorant text-lg italic">
              — Con amor desde mi corazón hasta tu mesa
            </p>
          </div>
        </div>

        <div className="mt-16 text-center">
          <blockquote className="text-xl font-playfair text-amber-700 italic mb-4">
            "Rosa convirtió nuestro aniversario en pura magia. Cada bocado era una carta de amor."
          </blockquote>
          <p className="text-stone-600">— María & Santiago, Cena de Aniversario</p>
        </div>
      </div>
    </section>
  );
};

export default Services;