import { useState } from "react";
import { Mail, MapPin, Send, MessageCircle, Heart } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    guests: "",
    style: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      guests: "",
      style: "",
      message: "",
    });
  };

  return (
    <section
      id="contact"
      className="py-20 bg-gradient-to-br from-cream via-white to-cream bg-texture"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-sage/40"></div>
            <span className="mx-4 text-sm font-karla text-sage/70 uppercase tracking-wider">
              Creaciones Únicas
            </span>
            <div className="w-16 h-px bg-sage/40"></div>
          </div>

          <h2 className="text-4xl sm:text-5xl font-cormorant text-mocha mb-6 text-shadow-soft">
            <span className="text-dusty-rose font-bold">Convirtamos</span> Tu Sueño en
            <span className="block text-dusty-rose italic mt-2 font-bold">
              Realidad
            </span>
          </h2>

          <div className="w-24 h-px bg-sage/40 mx-auto mb-6"></div>

          <p className="text-lg text-mocha/70 max-w-2xl mx-auto font-karla font-light leading-relaxed">
            Cada pedido especial comienza con una conversación íntima sobre tu
            momento único.
            <span className="block mt-2 italic text-mocha/60">
              Porque los detalles perfectos nacen cuando dos corazones se
              encuentran.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-cormorant mb-6 text-shadow-soft">
                Conectemos Nuestros <span className="text-dusty-rose font-bold">Corazones</span>
              </h3>
              <div className="space-y-6">
                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center shadow-gentle group-hover:shadow-warm transition-all duration-300">
                    <Mail className="h-6 w-6 text-sage" />
                  </div>
                  <div>
                    <p className="text-mocha font-medium font-karla">Email</p>
                    <p className="text-mocha/70 font-karla">
                      hello@cucinanostrard.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center shadow-gentle group-hover:shadow-warm transition-all duration-300">
                    <MessageCircle className="h-6 w-6 text-sage" />
                  </div>
                  <div>
                    <p className="text-mocha font-medium font-karla">
                      WhatsApp
                    </p>
                    <p className="text-mocha/70 font-karla">(809) 658-1245</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4 group">
                  <div className="w-12 h-12 bg-sage/20 rounded-full flex items-center justify-center shadow-gentle group-hover:shadow-warm transition-all duration-300">
                    <MapPin className="h-6 w-6 text-sage" />
                  </div>
                  <div>
                    <p className="text-mocha font-medium font-karla">
                      Ubicación
                    </p>
                    <p className="text-mocha/70 font-karla">
                      Santo Domingo, RD
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-sage/10 p-6 rounded-lg shadow-gentle">
              <div className="flex items-center mb-4">
                <Heart className="h-5 w-5 text-sage mr-2" />
                <h4 className="text-lg font-cormorant">
                  <span className="text-dusty-rose font-bold">Una Promesa Personal</span>
                </h4>
              </div>
              <p className="text-mocha/70 font-karla font-light leading-relaxed">
                Tu celebración será única, como tú. Cada detalle será
                cuidadosamente pensado para crear no solo un postre, sino una
                experiencia que perdure en el corazón de quienes amas.
              </p>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-gentle">
            <h3 className="text-2xl font-cormorant mb-6 text-shadow-soft">
              <span className="text-dusty-rose font-bold">Cuéntame</span> Tu Historia
            </h3>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-mocha mb-2 font-karla"
                  >
                    Tu Nombre *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-300 font-karla"
                    placeholder="¿Cómo te llamas?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-mocha mb-2 font-karla"
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-300 font-karla"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="eventType"
                  className="block text-sm font-medium text-mocha mb-2 font-karla"
                >
                  Tipo de Celebración
                </label>
                <select
                  id="eventType"
                  name="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-300 font-karla"
                >
                  <option value="">Selecciona tu celebración</option>
                  <option value="cumpleanos">Cumpleaños</option>
                  <option value="boda">Boda</option>
                  <option value="aniversario">Aniversario</option>
                  <option value="baby-shower">Baby Shower</option>
                  <option value="graduacion">Graduación</option>
                  <option value="corporativo">Evento Corporativo</option>
                  <option value="otro">Otro</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-mocha mb-2 font-karla"
                >
                  Comparte Tu Visión
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full px-4 py-3 border border-sage/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-sage focus:border-transparent transition-all duration-300 font-karla"
                  placeholder="Cuéntame sobre tu celebración especial, tus sabores favoritos, alergias, inspiraciones... Todo lo que haga único este momento"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-sage text-cream px-8 py-4 rounded-lg text-lg font-karla font-medium hover:bg-sage/90 transition-all duration-300 transform hover:scale-105 shadow-gentle hover:shadow-warm flex items-center justify-center space-x-2"
              >
                <Send className="h-5 w-5" />
                <span>Comenzar Mi Historia Dulce</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
