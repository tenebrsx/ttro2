import { Heart, Clock, Award, Users } from "lucide-react";
import PageTransition from "../components/PageTransition";
import {
  FadeIn,
  StaggerChildren,
  StaggerChild,
} from "../components/animations/AnimationComponents";
import {
  HandwrittenAccent,
  HandDrawnDivider,
} from "../components/animations/TextureComponents";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Amor en Cada Migaja",
      description:
        "Porque los mejores sabores nacen del corazón, no de las prisas. Cada postre lleva mi cariño y dedicación.",
    },
    {
      icon: Clock,
      title: "Tradición que Abraza",
      description:
        "Recetas que mi abuela me susurraba mientras yo lamía la cuchara, ahora reinventadas con mi toque personal.",
    },
    {
      icon: Award,
      title: "Solo lo Mejor",
      description:
        "Ingredientes que hablan por sí solos: vainilla de Madagascar, chocolate belga, frutas del mercado dominical.",
    },
    {
      icon: Users,
      title: "Hecho Para Ti",
      description:
        "Tu historia es única, y tu postre también debe serlo. Creamos juntos algo que refleje tu momento especial.",
    },
  ];

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-cream-500 to-cream-400 bg-texture">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-px bg-dusty-rose/40"></div>
                <span className="mx-4 text-sm font-source-serif text-dusty-rose/70 uppercase tracking-wider">
                  Mi Historia
                </span>
                <div className="w-16 h-px bg-dusty-rose/40"></div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-playfair text-black-bold text-shadow-elegant mb-6">
                Donde Cada Dulce
                <span className="block text-dusty-rose-elegant italic">
                  Cuenta una Historia
                </span>
              </h1>

              <HandDrawnDivider className="mb-8" />

              <p className="text-lg body-elegant leading-relaxed font-source-serif font-light max-w-2xl mx-auto">
                Soy Rosa, y esta es la historia de cómo transformé domingos de
                nostalgia en una pasión que endulza los momentos más preciados
                de la vida.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* Main Story */}
        <section className="py-20 bg-cream-500">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeIn direction="left">
                <div className="relative">
                  <img
                    src="/images/chef-photo.png"
                    alt="Rosa y su equipo - el alma de Cucinanostrard"
                    className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-gentle"
                  />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-dusty-rose/20 rounded-full blur-xl"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-dusty-rose/30 rounded-full blur-lg"></div>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div>
                  <h2 className="text-3xl font-playfair text-black-bold text-shadow-elegant mb-6">
                    Hola, soy Rosa,
                    <span className="block text-dusty-rose-elegant italic">
                      el alma de cada dulce
                    </span>
                  </h2>

                  <div className="space-y-6 body-elegant text-lg leading-relaxed font-source-serif font-light">
                    <p>
                      Todo comenzó en la cocina de mi abuela, donde los domingos
                      se llenaban del aroma a canela y vainilla. Ahí aprendí que
                      un postre no es solo azúcar y harina—es cariño que toma
                      forma, es memoria que se puede saborear.
                    </p>

                    <p>
                      Hoy, en mi propia cocina, cada ingrediente es elegido con
                      el mismo amor que ella me enseñó. No uso atajos ni sabores
                      artificiales, porque creo que lo auténtico se siente en
                      cada bocado. Trabajo con mis manos, sigo el ritmo de las
                      estaciones, y dejo que el tiempo haga su magia.
                    </p>

                    <p>
                      Para mí, cada pedido es personal. Ya sea una torta de
                      cumpleaños que dibuje sonrisas o unos petit fours para una
                      reunión íntima, pongo mi corazón en crear dulces que sepan
                      a hogar, pero con esa elegancia que hace especial el
                      momento.
                    </p>
                  </div>

                  <div className="mt-10 p-6 bg-elegant-cream backdrop-blur-sm rounded-2xl border border-dusty-rose shadow-dusty-rose">
                    <blockquote className="text-2xl font-playfair text-dusty-rose-elegant italic text-center text-shadow-elegant">
                      <HandwrittenAccent>
                        &ldquo;No solo horneo postres—
                        <span className="block mt-1">
                          creo pequeños momentos de felicidad&rdquo;
                        </span>
                      </HandwrittenAccent>
                    </blockquote>
                    <cite className="block text-center text-sm body-elegant mt-3 font-source-serif">
                      - Rosa
                    </cite>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500 bg-texture">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <FadeIn>
              <div className="text-center mb-16">
                <h2 className="text-3xl font-playfair text-black-bold text-shadow-elegant mb-6">
                  Lo que Hace Especial
                  <span className="block text-dusty-rose-elegant italic">
                    Cada Creación
                  </span>
                </h2>
                <HandDrawnDivider />
              </div>
            </FadeIn>

            <StaggerChildren className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <StaggerChild key={index}>
                  <div className="text-center group">
                    <div className="w-16 h-16 bg-dusty-rose/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-dusty-rose/30 transition-all duration-300 group-hover:scale-110">
                      <value.icon className="h-8 w-8 text-dusty-rose" />
                    </div>
                    <h3 className="text-lg font-playfair text-black-bold text-shadow-elegant mb-3">
                      {value.title}
                    </h3>
                    <p className="body-elegant font-source-serif font-light text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </StaggerChild>
              ))}
            </StaggerChildren>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20 bg-cream-500">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <FadeIn>
              <h2 className="text-3xl font-playfair text-black-bold text-shadow-elegant mb-8">
                Mi Filosofía Dulce
              </h2>

              <div className="space-y-8 body-elegant text-lg leading-relaxed font-source-serif font-light">
                <p>
                  Creo firmemente que los mejores postres nacen de la alegría y
                  la intención. Cada ingrediente es elegido con cuidado, cada
                  técnica honrada con paciencia, y cada creación está impregnada
                  del amor que hace que la comida sea realmente nutritiva para
                  el alma.
                </p>

                <p>
                  Las estaciones guían mi menú—fresas jugosas en verano,
                  especias cálidas en invierno, y los cítricos brillantes de la
                  primavera. Compro local cuando es posible, apoyando a nuestra
                  comunidad mientras aseguro que los sabores más frescos lleguen
                  a tu mesa.
                </p>

                <p>
                  Lo más importante es que veo cada pedido como una oportunidad
                  de ser parte de tu historia. Ya sea una celebración íntima de
                  cumpleaños o una boda soñada, mis postres están diseñados para
                  complementar tu momento, no opacarlo.
                  <HandwrittenAccent className="text-dusty-rose-elegant">
                    Porque al final, lo que importa es la sonrisa.
                  </HandwrittenAccent>
                </p>
              </div>
            </FadeIn>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
