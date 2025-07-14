import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";
import {
  FadeReveal,
  TextReveal,
  ParallaxScroll,
  HoverLift,
  ScaleHover,
  Entrance,
  SophisticatedButton,
} from "./animations/SophisticatedAnimations";

const Hero = () => {
  const navigate = useNavigate();

  const goToMenu = () => {
    navigate("/menu");
  };

  const goToContact = () => {
    navigate("/contact");
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Sección de inicio"
      role="region"
    >
      {/* Background Video/Image */}
      <div className="absolute inset-0">
        {/* Placeholder for background video - replace src with actual video when available */}
        {/* <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/dessert-montage.mp4" type="video/mp4" />
        </video> */}

        {/* Placeholder background image montage */}
        <div className="w-full h-full bg-gradient-to-br from-cream-400 via-cream-500 to-cream-400">
          <img
            src="https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
            alt="Dessert montage background"
            className="w-full h-full object-cover opacity-30 mix-blend-soft-light"
          />
        </div>

        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream-500/80 via-cream-400/70 to-cream-500/80"></div>
      </div>

      {/* Subtle Background Elements */}
      <ParallaxScroll speed={0.2} className="absolute inset-0 z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-dusty-rose-100/10 to-warm-blush-100/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-br from-cream-200/10 to-dusty-rose-100/10 rounded-full blur-3xl"></div>
      </ParallaxScroll>

      <div className="relative z-30 text-center px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        {/* Logo */}
        <Entrance delay={0.2} duration={1.2} type="scale" className="mb-12">
          <HoverLift liftHeight={4} duration={0.4}>
            <Logo
              size="lg"
              className="h-24 sm:h-28 md:h-32 lg:h-36 mx-auto drop-shadow-warm"
              alt="Cucinanostrard Logo"
            />
          </HoverLift>
        </Entrance>

        {/* Main Heading */}
        <div className="mb-8">
          <span className="sr-only">Cucinanostrard - </span>
          <TextReveal
            delay={0.6}
            staggerDelay={0.12}
            className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-black-bold text-shadow-elegant leading-tight block"
          >
            Hecho con Amor,
          </TextReveal>
          <div className="mt-2 relative">
            <TextReveal
              delay={1.4}
              staggerDelay={0.15}
              className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-dusty-rose-elegant italic leading-tight block"
            >
              De Mi Cocina a la Tuya
            </TextReveal>
            <FadeReveal
              delay={2.2}
              duration={1.0}
              direction="none"
              className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-dusty-rose-300 to-warm-blush-300 rounded-full"
            ></FadeReveal>
          </div>
        </div>

        {/* Subtitle */}
        <FadeReveal
          delay={2.8}
          duration={1.2}
          direction="up"
          distance={20}
          className="relative mb-16"
        >
          <p className="font-source-serif text-xl sm:text-2xl md:text-3xl text-warm-grey-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Desde mi cocina en Santo Domingo, creo postres que despiertan
            memorias y celebran momentos únicos. Cada tarta, macaron y cupcake
            lleva el sabor de
            <span className="text-dusty-rose-600 font-semibold italic underline decoration-dusty-rose-600/40 decoration-1 underline-offset-2">
              {" "}
              la auténtica repostería artesanal
            </span>
            .
          </p>
          <FadeReveal
            delay={3.6}
            duration={0.8}
            direction="none"
            className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-dusty-rose-300 to-warm-blush-300 rounded-full"
          ></FadeReveal>
        </FadeReveal>

        {/* CTA Buttons */}
        <FadeReveal
          delay={4.2}
          duration={1.0}
          direction="up"
          distance={30}
          className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-20"
        >
          <SophisticatedButton
            onClick={goToMenu}
            variant="primary"
            className="px-10 py-5 text-xl w-full sm:w-auto"
            aria-label="Ver el menú de postres"
          >
            Ver el menú
          </SophisticatedButton>

          <SophisticatedButton
            onClick={goToContact}
            variant="secondary"
            className="px-10 py-5 text-xl w-full sm:w-auto"
            aria-label="Crear tu pedido especial"
          >
            Crea Tu Pedido Especial
          </SophisticatedButton>
        </FadeReveal>
      </div>
    </section>
  );
};

export default Hero;
