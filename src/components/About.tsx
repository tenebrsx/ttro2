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
              <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-dusty-rose/20 rounded-full blur-xl"></div>
              <div className="absolute -top-4 -left-4 w-16 h-16 bg-clay/30 rounded-full blur-lg"></div>
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2">
            <div className="flex items-center mb-4">
              <div className="w-12 h-px bg-dusty-rose/40"></div>
              <span className="mx-4 text-sm font-karla text-dusty-rose/70 uppercase tracking-wider">
                About
              </span>
              <div className="w-12 h-px bg-dusty-rose/40"></div>
            </div>

            <h2 className="text-4xl sm:text-5xl font-playfair mb-8 font-bold leading-tight">
              <span className="block text-black-bold text-shadow-elegant">
                Detrás de Cada Postre
              </span>
              <span className="block text-dusty-rose-elegant italic mt-2 relative">
                Hay una Historia
                <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-dusty-rose-300 to-warm-blush-300 rounded-full"></div>
              </span>
            </h2>

            <div className="space-y-6 text-mocha/80 text-lg leading-relaxed font-karla font-light">
              <p>
                Todo comenzó con tardes de domingo experimentando en mi cocina. Lo que empezó como un hobby se transformó en mi pasión: crear postres que no solo se ven hermosos, sino que cuentan historias y crean memorias especiales en cada bocado.
              </p>

              <p>
                En Cucinanostrard no usamos mezclas comerciales ni atajos. Cada ganache se templa a mano, cada macaron se forma con la técnica francesa tradicional, y cada decoración se piensa específicamente para quien lo va a disfrutar.
              </p>

              <p>
                Trabajo con ingredientes importados de Francia para los macarons, chocolates belgas para las ganaches, y frutas frescas dominicanas para darle ese toque local que nos hace únicos. Porque los mejores postres nacen cuando la técnica se encuentra con la pasión.
              </p>
            </div>

            <div className="mt-10 p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-dusty-rose/10">
              <blockquote className="text-2xl font-cormorant text-dusty-rose italic text-center">
                &quot;No solo hornéo postres—
                <span className="block mt-1">
                  creo momentos que se saborean para siempre.&quot;
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
