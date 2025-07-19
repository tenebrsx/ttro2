const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-cream to-white bg-texture"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/3992204/pexels-photo-3992204.jpeg?auto=compress&cs=tinysrgb&w=800&h=1000&fit=crop"
                alt="Baker in kitchen with natural light"
                className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-soft"
              />
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-sage/20 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-sage/30 rounded-full blur-lg"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center mb-4">
              <div className="w-12 h-px bg-sage/40"></div>
              <span className="mx-4 text-sm font-academy text-sage/70 uppercase tracking-wider">
                Nuestra Historia
              </span>
              <div className="w-12 h-px bg-sage/40"></div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-academy mb-8 font-bold leading-tight">
              <span className="block text-cocoa-500">
                Detrás de Cada Postre
              </span>
              <span className="block text-sage-500 italic font-academy mt-2 relative">
                Hay una Historia
                <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"></div>
              </span>
            </h2>

            <div className="space-y-6 text-cocoa-500 text-lg leading-relaxed font-bodoni font-light">
              <p>
                Todo comenzó con la tradición de la repostería casera, donde los
                domingos se llenaban de aromas y sabores auténticos. Lo que
                empezó como amor por la tradición se transformó en nuestra
                pasión: crear postres artesanales que cuentan historias y crean
                memorias especiales en cada bocado.
              </p>

              <p>
                En Cucina no usamos mezclas comerciales ni atajos. Cada ganache
                se templa a mano, cada creación se forma con técnicas
                artesanales tradicionales, y cada decoración se piensa
                específicamente para quien lo va a disfrutar.
              </p>

              <p>
                Trabajamos con ingredientes premium: chocolates finos para las
                ganaches, vainilla natural, y frutas frescas de temporada para
                darle ese toque auténtico que nos hace únicos. Porque los
                mejores postres nacen cuando la técnica artesanal se encuentra
                con la pasión por lo casero.
              </p>
            </div>

            <div className="mt-10 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-sage/10">
              <blockquote className="text-2xl font-bodoni text-sage-600 italic text-center">
                &quot;No solo horneamos postres—
                <span className="block mt-1">
                  creamos momentos que se saborean para siempre.&quot;
                </span>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
