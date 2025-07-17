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
      title: "Amor en Cada Creación",
      description:
        "Los mejores sabores nacen del corazón y la dedicación. Cada postre lleva el cariño de la repostería artesanal.",
    },
    {
      icon: Clock,
      title: "Tradición Casera",
      description:
        "Recetas tradicionales perfeccionadas con técnicas artesanales, respetando los tiempos y procesos naturales.",
    },
    {
      icon: Award,
      title: "Ingredientes Premium",
      description:
        "Solo utilizamos ingredientes de la más alta calidad: vainilla natural, chocolate fino, frutas frescas de temporada.",
    },
    {
      icon: Users,
      title: "Personalizado Para Ti",
      description:
        "Cada pedido es único. Trabajamos contigo para crear postres que reflejen tu estilo y ocasión especial.",
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
                <div className="w-16 h-px bg-sage/40"></div>
                <span className="mx-4 text-sm font-academy text-sage/70 uppercase tracking-wider">
                  Nuestra Historia
                </span>
                <div className="w-16 h-px bg-sage/40"></div>
              </div>

              <h1 className="text-4xl sm:text-5xl font-academy text-cocoa-500 text-shadow-elegant mb-6">
                cucina
                <span className="block text-sage-500 italic font-bodoni text-3xl">
                  homemade goods
                </span>
              </h1>

              <HandDrawnDivider className="mb-8" />

              <p className="text-lg body-elegant leading-relaxed font-bodoni font-light max-w-2xl mx-auto">
                Creamos postres artesanales que transforman momentos ordinarios
                en celebraciones especiales, llevando la tradición de la
                repostería casera a tu mesa.
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
                    alt="El equipo de Cucina - artesanos de la repostería"
                    className="w-full h-96 lg:h-[500px] object-cover rounded-2xl shadow-gentle"
                  />
                  <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-sage/20 rounded-full blur-xl"></div>
                  <div className="absolute -top-4 -left-4 w-16 h-16 bg-sage/30 rounded-full blur-lg"></div>
                </div>
              </FadeIn>

              <FadeIn direction="right">
                <div>
                  <h2 className="text-3xl font-academy text-cocoa-500 text-shadow-elegant mb-6">
                    Nuestra Pasión,
                    <span className="block text-sage-500 italic font-bodoni">
                      el alma de cada dulce
                    </span>
                  </h2>

                  <div className="space-y-6 body-elegant text-lg leading-relaxed font-bodoni font-light">
                    <p>
                      Todo comenzó con la tradición de la repostería casera,
                      donde los sabores auténticos se llenaban del aroma a
                      canela y vainilla. Aquí aprendimos que un postre no es
                      solo azúcar y harina—es cariño que toma forma, es memoria
                      que se puede saborear.
                    </p>

                    <p>
                      Hoy, en nuestra cocina, cada ingrediente es elegido con el
                      mismo amor tradicional. No usamos atajos ni sabores
                      artificiales, porque creemos que lo auténtico se siente en
                      cada bocado. Trabajamos con nuestras manos, seguimos el
                      ritmo de las estaciones, y dejamos que el tiempo haga su
                      magia.
                    </p>

                    <p>
                      Para nosotros, cada pedido es personal. Ya sea una torta
                      de cumpleaños que dibuje sonrisas o unos petit fours para
                      una reunión íntima, ponemos nuestro corazón en crear
                      dulces que sepan a hogar, pero con esa elegancia que hace
                      especial el momento.
                    </p>
                  </div>

                  <div className="mt-10 p-6 bg-cream-100 backdrop-blur-sm rounded-2xl border border-sage shadow-cucina">
                    <blockquote className="text-2xl font-bodoni text-sage-600 italic text-center text-shadow-elegant">
                      <HandwrittenAccent>
                        &ldquo;No solo horneamos postres—
                        <span className="block mt-1">
                          creamos pequeños momentos de felicidad&rdquo;
                        </span>
                      </HandwrittenAccent>
                    </blockquote>
                    <cite className="block text-center text-sm body-elegant mt-3 font-bodoni">
                      - Cucina
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
                <h2 className="text-3xl font-academy text-cocoa-500 text-shadow-elegant mb-6">
                  Lo que Hace Especial
                  <span className="block text-sage-500 italic font-bodoni">
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
                    <div className="w-16 h-16 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-sage/30 transition-all duration-300 group-hover:scale-110">
                      <value.icon className="h-8 w-8 text-sage" />
                    </div>
                    <h3 className="text-lg font-academy text-cocoa-500 text-shadow-elegant mb-3">
                      {value.title}
                    </h3>
                    <p className="body-elegant font-bodoni font-light text-sm leading-relaxed">
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
              <h2 className="text-3xl font-academy text-cocoa-500 text-shadow-elegant mb-8">
                Nuestra Filosofía Dulce
              </h2>

              <div className="space-y-8 body-elegant text-lg leading-relaxed font-bodoni font-light">
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
