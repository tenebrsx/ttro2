import { Heart, Clock, Award, Users } from "lucide-react";
import PageTransition from "../components/PageTransition";
import {
  FadeReveal,
  TextReveal,
  StaggerReveal,
  StaggerChild,
  CinematicReveal,
} from "../components/animations/SophisticatedAnimations";
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
        <section className="py-20 bg-gradient-to-br from-cream-500 to-cream-400 bg-texture relative overflow-hidden">
          {/* Background decorative elements */}
          <FadeReveal delay={0.5} duration={2.0} direction="none">
            <div className="absolute top-20 right-20 w-40 h-40 bg-sage-100 rounded-full opacity-20 animate-pulse-soft shadow-sage"></div>
          </FadeReveal>
          <FadeReveal delay={0.8} duration={2.0} direction="none">
            <div className="absolute bottom-10 left-10 w-32 h-32 bg-sage-100 rounded-full opacity-30 shadow-warm"></div>
          </FadeReveal>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <FadeReveal delay={0.2} duration={0.8} direction="none">
              <div className="flex items-center justify-center mb-8">
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
                <span className="mx-6 text-base font-academy text-sage-600 uppercase tracking-widest font-medium">
                  Nuestra Historia
                </span>
                <div className="w-20 h-px bg-gradient-to-r from-transparent via-sage-400 to-transparent"></div>
              </div>
            </FadeReveal>

            <CinematicReveal direction="center" delay={0.4} duration={1.5}>
              <FadeReveal
                delay={0.6}
                duration={1.0}
                direction="up"
                distance={30}
                className="flex justify-center mb-8"
              >
                <img
                  src="/logo.png"
                  alt="Cucina - homemade goods"
                  className="h-36 sm:h-40 md:h-36 lg:h-40 xl:h-44 w-auto max-w-full object-contain"
                />
              </FadeReveal>
            </CinematicReveal>

            <CinematicReveal direction="horizontal" delay={0.8} duration={1.2}>
              <HandDrawnDivider className="mb-8" />
            </CinematicReveal>

            <FadeReveal delay={1.4} duration={1.0} direction="up" distance={20}>
              <p className="text-lg font-bodoni text-cocoa-500/80 leading-body-elegant font-normal max-w-2xl mx-auto">
                Creamos postres artesanales que transforman momentos ordinarios
                en celebraciones especiales, llevando la tradición de la
                <span className="text-sage-600 font-normal italic tracking-bodoni-elegant">
                  {" "}
                  repostería casera
                </span>{" "}
                a tu mesa.
              </p>
            </FadeReveal>
          </div>
        </section>

        {/* Main Story */}
        <section className="py-20 bg-cream-500 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <FadeReveal
                delay={0.4}
                duration={1.0}
                direction="left"
                distance={60}
              >
                <div className="relative group">
                  <div className="relative overflow-hidden rounded-3xl">
                    <img
                      src="/images/chef-photo.png"
                      alt="El equipo de Cucina - artesanos de la repostería"
                      className="w-full h-96 lg:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Sophisticated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>

                  <FadeReveal delay={1.0} duration={1.5} direction="none">
                    <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-sage-200/40 rounded-full blur-2xl animate-pulse-soft shadow-warm"></div>
                  </FadeReveal>
                  <FadeReveal delay={0.8} duration={1.5} direction="none">
                    <div className="absolute -top-6 -left-6 w-24 h-24 bg-sage-200/50 rounded-full blur-xl shadow-sage"></div>
                  </FadeReveal>
                </div>
              </FadeReveal>

              <div className="space-y-8">
                <div className="mb-8">
                  <TextReveal
                    delay={0.6}
                    staggerDelay={0.1}
                    className="text-3xl font-academy leading-elegant block text-cocoa-500 text-shadow-elegant tracking-academy-hero"
                  >
                    Nuestra Pasión,
                  </TextReveal>
                  <div className="mt-2 relative">
                    <TextReveal
                      delay={1.2}
                      staggerDelay={0.12}
                      className="text-3xl font-academy leading-elegant block text-sage-500 italic tracking-academy-subhead font-bodoni"
                    >
                      el alma de cada creación
                    </TextReveal>
                    <FadeReveal
                      delay={1.8}
                      duration={0.8}
                      direction="none"
                      className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
                    >
                      <div></div>
                    </FadeReveal>
                  </div>
                </div>

                <StaggerReveal
                  staggerDelay={0.3}
                  childDelay={2.0}
                  className="space-y-6 font-bodoni text-lg leading-body-elegant font-normal text-cocoa-500/80"
                >
                  <StaggerChild>
                    <FadeReveal
                      delay={0.2}
                      duration={0.8}
                      direction="up"
                      distance={20}
                    >
                      <p>
                        Todo comenzó con la tradición de la repostería casera,
                        donde los sabores auténticos se llenaban del aroma a
                        canela y vainilla. Aquí aprendimos que un postre no es
                        solo azúcar y harina—es
                        <span className="text-sage-600 font-normal italic">
                          {" "}
                          cariño que toma forma
                        </span>
                        , es memoria que se puede saborear.
                      </p>
                    </FadeReveal>
                  </StaggerChild>

                  <StaggerChild>
                    <FadeReveal
                      delay={0.4}
                      duration={0.8}
                      direction="up"
                      distance={20}
                    >
                      <p>
                        Hoy, en nuestra cocina, cada ingrediente es elegido con
                        el mismo amor tradicional. No usamos atajos ni sabores
                        artificiales, porque creemos que
                        <span className="text-sage-600 font-normal italic">
                          {" "}
                          lo auténtico se siente
                        </span>{" "}
                        en cada bocado. Trabajamos con nuestras manos, seguimos
                        el ritmo de las estaciones, y dejamos que el tiempo haga
                        su magia.
                      </p>
                    </FadeReveal>
                  </StaggerChild>

                  <StaggerChild>
                    <FadeReveal
                      delay={0.6}
                      duration={0.8}
                      direction="up"
                      distance={20}
                    >
                      <p>
                        Para nosotros, cada pedido es personal. Ya sea una torta
                        de cumpleaños que dibuje sonrisas o unos petit fours
                        para una reunión íntima, ponemos nuestro corazón en
                        crear postres que sepan a hogar, pero con esa
                        <span className="text-sage-600 font-normal italic">
                          {" "}
                          elegancia que hace especial
                        </span>{" "}
                        el momento.
                      </p>
                    </FadeReveal>
                  </StaggerChild>
                </StaggerReveal>

                <FadeReveal
                  delay={3.0}
                  duration={1.0}
                  direction="up"
                  distance={30}
                >
                  <div className="p-8 bg-white/90 backdrop-blur-sm rounded-3xl border border-sage-100/50 shadow-premium hover:shadow-luxury transition-all duration-500 relative overflow-hidden group">
                    {/* Sophisticated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>

                    <CinematicReveal
                      direction="iris"
                      delay={0.5}
                      duration={1.5}
                    >
                      <blockquote className="text-2xl font-bodoni text-sage-600 italic text-center text-shadow-elegant leading-body-elegant relative z-10">
                        <HandwrittenAccent>
                          &ldquo;No solo horneamos postres—
                          <span className="block mt-2">
                            creamos pequeños momentos de felicidad&rdquo;
                          </span>
                        </HandwrittenAccent>
                      </blockquote>
                      <cite className="block text-center text-sm font-bodoni mt-4 text-cocoa-500/70 relative z-10">
                        - Cucina
                      </cite>
                    </CinematicReveal>
                  </div>
                </FadeReveal>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500 bg-texture relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16">
              <div className="mb-8">
                <TextReveal
                  delay={0.2}
                  staggerDelay={0.1}
                  className="text-3xl font-academy leading-elegant block text-cocoa-500 text-shadow-elegant tracking-academy-hero"
                >
                  Lo que Hace Especial
                </TextReveal>
                <div className="mt-2 relative">
                  <TextReveal
                    delay={0.8}
                    staggerDelay={0.12}
                    className="text-3xl font-academy leading-elegant block text-sage-500 italic tracking-academy-subhead font-bodoni"
                  >
                    Cada Creación
                  </TextReveal>
                  <FadeReveal
                    delay={1.4}
                    duration={0.8}
                    direction="none"
                    className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
                  >
                    <div></div>
                  </FadeReveal>
                </div>
              </div>

              <CinematicReveal
                direction="horizontal"
                delay={1.0}
                duration={1.2}
              >
                <HandDrawnDivider />
              </CinematicReveal>
            </div>

            <StaggerReveal
              staggerDelay={0.2}
              childDelay={1.6}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            >
              {values.map((value, index) => (
                <StaggerChild key={index}>
                  <div className="text-center group relative">
                    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-8 shadow-premium hover:shadow-luxury transition-all duration-700 border border-sage-100/50 group-hover:border-sage-200/80 relative overflow-hidden transform group-hover:-translate-y-2 group-hover:scale-105">
                      {/* Elegant gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-sage-50/60 to-cream-100/60 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                      {/* Premium icon container */}
                      <div className="relative w-20 h-20 bg-gradient-to-br from-sage-100 to-sage-200 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:from-sage-200 group-hover:to-sage-300 transition-all duration-700 shadow-elegant group-hover:shadow-premium group-hover:scale-110 group-hover:rotate-6">
                        <value.icon className="h-9 w-9 text-sage-600 group-hover:text-sage-700 transition-colors duration-500" />
                        {/* Sophisticated shimmer effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>
                      </div>

                      <div className="relative z-10">
                        <h3 className="text-lg font-academy text-cocoa-500 font-medium text-shadow-elegant mb-4 group-hover:text-cocoa-600 transition-colors duration-500 leading-elegant tracking-academy-normal">
                          {value.title}
                        </h3>
                        <p className="font-bodoni font-normal text-sm leading-body-elegant text-cocoa-500/80 group-hover:text-cocoa-500 transition-colors duration-500 tracking-bodoni-elegant">
                          {value.description}
                        </p>
                      </div>

                      {/* Subtle decorative corner accent */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-br from-sage-300 to-sage-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    </div>
                  </div>
                </StaggerChild>
              ))}
            </StaggerReveal>
          </div>
        </section>

        {/* Philosophy */}
        <section className="py-20 bg-cream-500 relative overflow-hidden">
          {/* Background decorative elements */}
          <FadeReveal delay={0.5} duration={2.0} direction="none">
            <div className="absolute top-20 left-20 w-36 h-36 bg-sage-100 rounded-full opacity-15 animate-pulse-soft shadow-sage"></div>
          </FadeReveal>
          <FadeReveal delay={0.8} duration={2.0} direction="none">
            <div className="absolute bottom-20 right-20 w-28 h-28 bg-sage-100 rounded-full opacity-20 shadow-warm"></div>
          </FadeReveal>

          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <div className="mb-8">
              <TextReveal
                delay={0.2}
                staggerDelay={0.1}
                className="text-3xl font-academy leading-elegant text-cocoa-500 text-shadow-elegant tracking-academy-hero"
              >
                Nuestra Filosofía Artesanal
              </TextReveal>
              <FadeReveal
                delay={0.8}
                duration={0.8}
                direction="none"
                className="mt-4 mx-auto w-24 h-1 bg-gradient-to-r from-sage-300 to-sage-400 rounded-full"
              >
                <div></div>
              </FadeReveal>
            </div>

            <StaggerReveal
              staggerDelay={0.4}
              childDelay={1.0}
              className="space-y-8 font-bodoni text-lg leading-body-elegant font-normal text-cocoa-500/80"
            >
              <StaggerChild>
                <FadeReveal
                  delay={0.2}
                  duration={0.8}
                  direction="up"
                  distance={20}
                >
                  <p>
                    Creo firmemente que los mejores postres nacen de la
                    <span className="text-sage-600 font-normal italic">
                      {" "}
                      alegría y la intención
                    </span>
                    . Cada ingrediente es elegido con cuidado, cada técnica
                    honrada con paciencia, y cada creación está impregnada del
                    amor que hace que la comida sea realmente nutritiva para el
                    alma.
                  </p>
                </FadeReveal>
              </StaggerChild>

              <StaggerChild>
                <FadeReveal
                  delay={0.4}
                  duration={0.8}
                  direction="up"
                  distance={20}
                >
                  <p>
                    Las estaciones guían mi menú—
                    <span className="text-sage-600 font-normal italic">
                      fresas jugosas en verano, especias cálidas en invierno
                    </span>
                    , y los cítricos brillantes de la primavera. Compro local
                    cuando es posible, apoyando a nuestra comunidad mientras
                    aseguro que los sabores más frescos lleguen a tu mesa.
                  </p>
                </FadeReveal>
              </StaggerChild>

              <StaggerChild>
                <FadeReveal
                  delay={0.6}
                  duration={0.8}
                  direction="up"
                  distance={20}
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 border border-sage-100/50 shadow-premium hover:shadow-luxury transition-all duration-500 relative overflow-hidden group">
                    {/* Sophisticated shimmer effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out rounded-3xl"></div>

                    <p className="relative z-10">
                      Lo más importante es que veo cada pedido como una
                      oportunidad de ser parte de tu historia. Ya sea una
                      celebración íntima de cumpleaños o una boda soñada, mis
                      postres están diseñados para complementar tu momento, no
                      opacarlo.
                      <span className="block mt-4">
                        <HandwrittenAccent className="text-sage-600 text-xl">
                          Porque al final, lo que importa es la sonrisa.
                        </HandwrittenAccent>
                      </span>
                    </p>
                  </div>
                </FadeReveal>
              </StaggerChild>
            </StaggerReveal>

            <FadeReveal
              delay={2.8}
              duration={1.0}
              direction="up"
              distance={30}
              className="mt-12"
            >
              <div className="relative">
                <CinematicReveal direction="iris" delay={0.3} duration={1.5}>
                  <TextReveal
                    delay={0.2}
                    staggerDelay={0.08}
                    className="text-xl font-bodoni font-normal italic leading-body-elegant text-shadow-elegant text-sage-600 tracking-bodoni-elegant"
                  >
                    Cada postre es una pequeña obra de arte comestible
                  </TextReveal>
                </CinematicReveal>
                <FadeReveal
                  delay={1.0}
                  duration={0.8}
                  direction="none"
                  className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-sage-300 via-sage-400 to-sage-300 rounded-full"
                >
                  <div></div>
                </FadeReveal>
              </div>
            </FadeReveal>
          </div>
        </section>
      </div>
    </PageTransition>
  );
};

export default About;
