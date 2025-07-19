import React from "react";

const Menu = () => {
  const dishes = [
    {
      name: "Risotto de Hongos Silvestres",
      description:
        "Arroz cremoso con hongos del bosque, aceite de trufa y hierbas frescas que despiertan el alma",
      image:
        "https://images.pexels.com/photos/1640772/pexels-photo-1640772.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "Platos Principales",
      emotion: "Una caricia de sabores que abraza tus sentidos",
    },
    {
      name: "Salmón con Costra de Hierbas",
      description:
        "Salmón fresco del Atlántico con eneldo, limón y vegetales de temporada, como un beso del mar",
      image:
        "https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "Platos Principales",
      emotion: "Frescura que transporta tu corazón a la orilla del mar",
    },
    {
      name: "Burrata con Tomates Reliquia",
      description:
        "Burrata cremosa con tomates del huerto, albahaca y balsámico añejo que susurra historias",
      image:
        "https://images.pexels.com/photos/1640770/pexels-photo-1640770.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "Entradas",
      emotion: "Simplicidad que toca el alma con cada bocado",
    },
    {
      name: "Panna Cotta de Lavanda",
      description:
        "Natilla sedosa infusionada con lavanda y miel, un poema de dulzura que calma el corazón",
      image:
        "https://images.pexels.com/photos/1640771/pexels-photo-1640771.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "Postres",
      emotion: "Serenidad hecha dulzura",
    },
    {
      name: "Costillas Estofadas",
      description:
        "Carne tierna cocida lentamente con vino tinto, vegetales y tomillo fresco, un abrazo de hogar",
      image:
        "https://images.pexels.com/photos/1640773/pexels-photo-1640773.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "Platos Principales",
      emotion: "Calidez que reconforta como un abrazo maternal",
    },
    {
      name: "Soufflé de Chocolate",
      description:
        "Soufflé tibio y esponjoso con helado de vainilla, un momento de pura felicidad",
      image:
        "https://images.pexels.com/photos/1640775/pexels-photo-1640775.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      category: "Postres",
      emotion: "Éxtasis que se derrite en tu boca",
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="menu"
      className="py-20 bg-gradient-to-br from-cream via-white to-cream bg-texture"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-sage/40"></div>
            <span className="mx-4 text-sm font-karla text-sage/70 uppercase tracking-wider">
              Creaciones Artesanales
            </span>
            <div className="w-16 h-px bg-sage/40"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-bodoni text-cocoa mb-6 text-shadow-soft">
            <span className="text-sage font-bold">Postres</span> Artesanales
            <span className="block text-sage italic mt-2 font-bold">
              Hechos con Amor
            </span>
          </h2>

          <div className="w-24 h-px bg-sage/40 mx-auto mb-6"></div>

          <p className="text-lg text-mocha/70 max-w-2xl mx-auto font-karla font-light leading-relaxed">
            Cada plato es una historia de amor, creada con ingredientes de
            temporada y el cuidado que solo las manos expertas pueden brindar.
            <span className="block mt-2 italic text-mocha/60">
              Porque cada celebración merece sabores que toquen el alma.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {dishes.map((dish, index) => (
            <div
              key={index}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105 hover:rotate-1"
            >
              <div className="bg-white rounded-lg overflow-hidden shadow-gentle hover:shadow-warm transition-all duration-300 border border-sage/10">
                <div className="relative overflow-hidden">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-48 object-contain bg-gray-50 group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = "/images/placeholder-dessert.jpg";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-mocha/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-sage font-medium mb-2 block font-karla uppercase tracking-wide">
                    {dish.category}
                  </span>
                  <h3 className="text-xl font-bodoni mb-3 text-shadow-soft">
                    Explora Nuestro{" "}
                    <span className="text-sage font-bold">Menú Completo</span>
                  </h3>
                  <p className="text-mocha/70 leading-relaxed font-karla font-light mb-3">
                    {dish.description}
                  </p>
                  <p className="text-sage text-sm italic font-karla font-light">
                    {dish.emotion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="mb-6">
            <p className="text-mocha/60 font-karla font-light italic">
              ¿Tienes una visión especial? Hagamos realidad tus sueños
              culinarios
            </p>
          </div>
          <button
            onClick={() => scrollToSection("contact")}
            className="bg-sage text-cream px-8 py-4 rounded-full text-lg font-karla font-medium hover:bg-sage/90 transition-all duration-300 transform hover:scale-105 shadow-gentle hover:shadow-warm"
          >
            Crear Mi Menú Personalizado
          </button>
        </div>
      </div>
    </section>
  );
};

export default Menu;
