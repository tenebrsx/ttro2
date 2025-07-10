import {
  formatPriceFromWithQuantity,
  formatPriceFrom,
} from "../utils/currency";

const Desserts = () => {
  const desserts = [
    {
      name: "Earl Grey Lavender Cake",
      description:
        "Delicate sponge infused with bergamot, kissed with lavender cream",
      image:
        "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: formatPriceFrom(45),
    },
    {
      name: "Lemon Thyme Tarts",
      description:
        "Buttery pastry shells filled with bright lemon curd and fresh thyme sugar",
      image:
        "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: formatPriceFromWithQuantity(30, "docena"),
    },
    {
      name: "Honey Rosemary Shortbread",
      description:
        "Crumbly, golden cookies with wildflower honey and garden rosemary",
      image:
        "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: formatPriceFromWithQuantity(25, "docena"),
    },
    {
      name: "Vanilla Bean Panna Cotta",
      description:
        "Silky custard with Madagascar vanilla, topped with seasonal fruit",
      image:
        "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: formatPriceFromWithQuantity(8, "cada"),
    },
    {
      name: "Chocolate Orange Truffles",
      description: "Rich dark chocolate ganache with candied orange peel",
      image:
        "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: formatPriceFromWithQuantity(35, "docena"),
    },
    {
      name: "Almond Rose Macarons",
      description:
        "Delicate shells filled with rose-scented buttercream and almond",
      image:
        "https://images.pexels.com/photos/1028704/pexels-photo-1028704.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      price: formatPriceFromWithQuantity(40, "docena"),
    },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="desserts" className="py-20 bg-white bg-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-sage/40"></div>
            <span className="mx-4 text-sm font-karla text-sage/70 uppercase tracking-wider">
              Menu
            </span>
            <div className="w-16 h-px bg-sage/40"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-cormorant text-mocha mb-6 text-shadow-soft">
            <span className="text-dusty-rose font-bold">Dulces</span> Creaciones
            <span className="block text-dusty-rose italic mt-2 font-bold">
              Hechas con Amor
            </span>
          </h2>

          <div className="w-24 h-px bg-sage/40 mx-auto mb-6"></div>

          <p className="text-lg text-mocha/70 max-w-2xl mx-auto font-karla font-light leading-relaxed">
            Each dessert is crafted with seasonal ingredients and made to order.
            <span className="block mt-2 italic text-mocha/60">
              Every bite tells a story of careful attention and genuine love for
              the craft.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {desserts.map((dessert, index) => (
            <div
              key={index}
              className="group cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
            >
              <div className="bg-gradient-to-br from-cream/60 to-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-gentle hover:shadow-soft transition-all duration-500 border border-sage/10">
                <img
                  src={dessert.image}
                  alt={dessert.name}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="p-6 relative">
                  <div className="absolute top-0 left-6 w-8 h-px bg-sage/30 transform -translate-y-3"></div>

                  <h3 className="text-xl font-cormorant text-mocha mb-3 text-shadow-soft">
                    {dessert.name}
                  </h3>
                  <p className="text-mocha/70 leading-relaxed mb-4 font-karla font-light text-sm">
                    {dessert.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-sage font-medium font-karla italic">
                      {dessert.price}
                    </span>
                    <div className="w-4 h-4 rounded-full bg-sage/20 group-hover:bg-sage/40 transition-colors duration-300"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <div className="w-16 h-px bg-sage/40 mx-auto mb-6"></div>

          <p className="text-mocha/70 mb-8 font-karla font-light italic">
            Every event is unique. Let&apos;s make something just for yours.
          </p>

          <button
            onClick={() => scrollToSection("contact")}
            className="bg-sage text-cream px-10 py-4 rounded-full text-lg hover:bg-mocha transition-all duration-500 transform hover:scale-105 shadow-gentle hover:shadow-soft font-karla font-medium"
          >
            Explora Nuestro <span className="text-dusty-rose font-bold">Menú Completo</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Desserts;
