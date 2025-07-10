import { useState } from 'react';
import { X, ChevronLeft, ChevronRight, Instagram, ExternalLink } from 'lucide-react';

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images = [
    {
      src: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      alt: "Tarta artesanal con decoración natural",
      caption: "Nuestras tartas son obras de arte comestibles",
      emotion: "Belleza que se saborea"
    },
    {
      src: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      alt: "Tartaletas delicadas con hierbas frescas",
      caption: "Sabores frescos que despiertan los sentidos",
      emotion: "Frescura que abraza el alma"
    },
    {
      src: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      alt: "Galletas rústicas sobre superficie de madera",
      caption: "Tradición y sabor en cada mordisco",
      emotion: "Nostalgia dulce y hogareña"
    },
    {
      src: "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      alt: "Panna cotta elegante con frutos rojos",
      caption: "Elegancia italiana en cada cucharada 🫐",
      emotion: "Sofisticación que conquista"
    },
    {
      src: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      alt: "Trufas de chocolate artesanales",
      caption: "Chocolate premium, hecho con amor",
      emotion: "Lujo que se derrite en tu boca"
    },
    {
      src: "https://images.pexels.com/photos/1028704/pexels-photo-1028704.jpeg?auto=compress&cs=tinysrgb&w=800&h=800&fit=crop",
      alt: "Arreglo colorido de macarons",
      caption: "Colores vibrantes, sabores únicos",
      emotion: "Alegría en cada bocado"
    }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (selectedImage !== null) {
      setSelectedImage((selectedImage - 1 + images.length) % images.length);
    }
  };

  return (
    <section id="gallery" className="py-20 bg-gradient-to-br from-cream via-white to-cream bg-texture">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-px bg-dusty-rose/40"></div>
            <span className="mx-4 text-sm font-karla text-dusty-rose/70 uppercase tracking-wider">Galería de Dulces Momentos</span>
            <div className="w-16 h-px bg-dusty-rose/40"></div>
          </div>
          
          <h2 className="text-4xl sm:text-5xl font-cormorant text-mocha mb-6 text-shadow-soft">
            Momentos que
            <span className="block text-dusty-rose italic mt-2 font-bold">
              Endulzan la Vida
            </span>
          </h2>
          
          <div className="w-24 h-px bg-dusty-rose/40 mx-auto mb-6"></div>
          
          <p className="text-lg text-mocha/70 max-w-2xl mx-auto font-karla font-light leading-relaxed">
            Un vistazo íntimo a los postres que he creado con amor. 
            Cada uno hecho con intención, cuidado y un toque de magia.
            <span className="block mt-2 italic text-mocha/60">
              Porque cada creación cuenta una historia única.
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) => (
            <div 
              key={index}
              className="group cursor-pointer overflow-hidden rounded-lg shadow-gentle hover:shadow-warm transition-all duration-300 transform hover:scale-105 hover:rotate-1 relative border border-dusty-rose/10"
              onClick={() => openLightbox(index)}
            >
              <img 
                src={image.src} 
                alt={image.alt}
                className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mocha/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-center">
                <div className="text-center text-white p-4">
                  <p className="text-sm font-karla font-light italic mb-1">
                    {image.emotion}
                  </p>
                  <Instagram className="w-6 h-6 mx-auto" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <div className="bg-dusty-rose/10 rounded-lg p-8 max-w-2xl mx-auto shadow-gentle">
            <Instagram className="w-12 h-12 text-dusty-rose mx-auto mb-4" />
            <h3 className="text-2xl font-cormorant mb-4 text-shadow-soft">
              Síguenos en <span className="text-dusty-rose font-bold">Instagram</span>
            </h3>
            <p className="text-mocha/70 font-karla font-light leading-relaxed mb-6">
              Creaciones dulces, momentos especiales y el día a día 
              de nuestra cocina en nuestro perfil de Instagram.
            </p>
            <a 
              href="https://www.instagram.com/cucinanostrard/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-dusty-rose text-cream px-6 py-3 rounded-full font-karla font-medium hover:bg-dusty-rose/90 transition-all duration-300 transform hover:scale-105 shadow-gentle hover:shadow-warm"
            >
              <Instagram className="w-5 h-5" />
              <span>@cucinanostrard</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <img 
              src={images[selectedImage].src}
              alt={images[selectedImage].alt}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 text-center">
              <p className="text-white text-lg font-karla bg-black/50 rounded-lg p-2">
                {images[selectedImage].caption}
              </p>
            </div>
            <button 
              onClick={closeLightbox}
              className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
            >
              <X className="w-8 h-8" />
            </button>
            <button 
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight className="w-8 h-8" />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;