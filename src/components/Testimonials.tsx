import { Quote, Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      text: "Cada bocado era como un verso de amor. La torta no solo sabía a cielo, sino que llevaba el alma de quien la creó.",
      name: "Isabella Herrera",
      event: "Celebración de Cumpleaños",
      rating: 5,
      emotion: "Pura poesía comestible",
    },
    {
      text: "Transformó nuestra pequeña reunión en algo mágico. Los postres eran obras de arte que sabían aún mejor de lo que lucían.",
      name: "Carlos & María",
      event: "Aniversario de Bodas",
      rating: 5,
      emotion: "Magia hecha dulzura",
    },
    {
      text: "Trabajar con ella fue como tener una querida amiga creando algo especial solo para nosotros. Cada detalle fue extraordinario.",
      name: "Sofía Restrepo",
      event: "Baby Shower",
      rating: 5,
      emotion: "Amor en cada detalle",
    },
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? "text-sage fill-sage" : "text-sage/30"
        }`}
      />
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-br from-cream via-white to-cream bg-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-sage/40"></div>
            <span className="mx-4 text-sm font-karla text-sage/70 uppercase tracking-wider">
              Testimonios del Corazón
            </span>
            <div className="w-16 h-px bg-sage/40"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-academy text-mocha mb-6 text-shadow-soft">
            Palabras <span className="text-dusty-rose font-bold">Dulces</span>
          </h2>

          <div className="w-24 h-px bg-sage/40 mx-auto mb-6"></div>

          <p className="text-lg text-mocha/70 max-w-2xl mx-auto font-karla font-light leading-relaxed">
            La mayor alegría viene de saber que mis postres se convierten en
            parte de los recuerdos más preciados de alguien.
            <span className="block mt-2 italic text-mocha/60">
              Porque cada sonrisa es la verdadera recompensa de mi trabajo.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white/80 backdrop-blur-sm p-8 rounded-lg shadow-gentle hover:shadow-warm transition-all duration-300 border border-sage/10 group"
            >
              <div className="flex items-center justify-between mb-6">
                <Quote className="h-8 w-8 text-sage group-hover:text-sage/80 transition-colors duration-300" />
                <div className="flex items-center space-x-1">
                  {renderStars(testimonial.rating)}
                </div>
              </div>

              <p className="text-mocha/80 italic mb-6 leading-relaxed font-karla font-light">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="space-y-3">
                <div className="text-right">
                  <p className="font-bodoni text-mocha text-lg font-medium">
                    — {testimonial.name}
                  </p>
                  <p className="text-sage text-sm font-karla">
                    {testimonial.event}
                  </p>
                </div>

                <div className="pt-3 border-t border-sage/20">
                  <p className="text-sage/80 text-sm italic font-karla text-center">
                    {testimonial.emotion}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-sage/10 p-8 rounded-lg shadow-gentle max-w-2xl mx-auto">
            <p className="text-mocha/70 font-karla font-light leading-relaxed mb-4">
              &ldquo;Cada testimonio es un recordatorio de por qué hago lo que
              hago. No solo creo postres, creo momentos que permanecen en el
              corazón para siempre.&rdquo;
            </p>
            <p className="text-sage font-bodoni text-lg italic">
              — Con amor, desde mi cocina hasta tu corazón
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
