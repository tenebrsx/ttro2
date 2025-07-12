import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import Button from "./Button";

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

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-15 z-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNkNGE1YTUiIGZpbGwtb3BhY2l0eT0iMC4xNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] animate-float"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-dusty-rose-100 rounded-full opacity-30 animate-pulse-soft z-20"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-warm-blush-100 rounded-full opacity-40 z-20"></div>
      <div className="absolute top-1/2 left-5 w-16 h-16 bg-soft-gold-200 rounded-full opacity-25 animate-float z-20"></div>

      <div className="relative z-30 text-center px-6 sm:px-8 lg:px-12 max-w-5xl mx-auto">
        {/* Logo */}
        <div className="mb-12 animate-fade-in-up">
          <div className="relative inline-block">
            <Logo
              size="lg"
              className="h-24 sm:h-28 md:h-32 lg:h-36 mx-auto drop-shadow-warm transition-transform duration-500 hover:scale-105"
              alt="Cucinanostrard Logo"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dusty-rose-100/20 to-transparent rounded-full blur-xl"></div>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="font-playfair text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-mocha mb-8 leading-tight animate-fade-in-up">
          <span className="sr-only">Cucinanostrard - </span>
          <span className="block text-black-bold text-shadow-elegant">
            Hecho con Amor,
          </span>
          <span className="block text-dusty-rose-elegant italic mt-2 relative">
            De Mi Cocina a la Tuya
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-dusty-rose-300 to-warm-blush-300 rounded-full"></div>
          </span>
        </h1>

        {/* Subtitle */}
        <div className="relative mb-16">
          <p className="font-source-serif text-xl sm:text-2xl md:text-3xl text-warm-grey-700 max-w-4xl mx-auto leading-relaxed animate-fade-in-up font-medium">
            Cucinanostrard no es una tienda, es un diario de recetas vivas. Cada
            dulce es pensado, horneado y decorado
            <span className="text-dusty-rose-600 font-semibold italic underline decoration-dusty-rose-600/40 decoration-1 underline-offset-2">
              {" "}
              por mí, para ti
            </span>
            .
          </p>
          <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-dusty-rose-300 to-warm-blush-300 rounded-full"></div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center items-center mb-20 animate-fade-in-up">
          <Button
            onClick={goToMenu}
            variant="primary"
            size="lg"
            className="px-10 py-5 text-xl w-full sm:w-auto"
            aria-label="Ver el menú de postres"
          >
            Ver el menú
          </Button>

          <Button
            onClick={goToContact}
            variant="outline"
            size="lg"
            className="px-10 py-5 text-xl w-full sm:w-auto"
            aria-label="Hacer un pedido personalizado"
          >
            Haz un pedido personalizado
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
