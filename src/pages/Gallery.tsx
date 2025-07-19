import React, { useState } from "react";
import { Instagram } from "lucide-react";
import PageTransition from "../components/PageTransition";
import { ImageLightbox, useLightbox } from "../components/ui/ImageLightbox";
import { CustomerPhotoShowcase } from "../components/ui/CustomerPhotoShowcase";
import { useCustomerPhotoShowcase } from "../hooks/photo/useCustomerPhotoShowcase";

const Gallery = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState<"gallery" | "customer-photos">(
    "gallery",
  );

  const categories = [
    { id: "all", name: "Todas las Fotos" },
    { id: "cakes", name: "Tortas" },
    { id: "events", name: "Eventos" },
    { id: "process", name: "Detrás de Escena" },
  ];

  const images = [
    {
      src: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Torta artesanal con estilo natural",
      category: "cakes",
      title: "Torta Earl Grey Lavanda",
    },
    {
      src: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Delicadas tartaletas con hierbas frescas",
      category: "events",
      title: "Tartaletas de Limón y Tomillo para Fiesta de Jardín",
    },
    {
      src: "https://images.pexels.com/photos/1028714/pexels-photo-1028714.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Galletas rústicas en superficie de madera",
      category: "process",
      title: "Recién Salidas del Horno",
    },
    {
      src: "https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Elegante panna cotta con frutas del bosque",
      category: "events",
      title: "Postre de Cena de Aniversario",
    },
    {
      src: "https://images.pexels.com/photos/918327/pexels-photo-918327.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Trufas de chocolate artesanales",
      category: "process",
      title: "Trufas Hechas a Mano",
    },
    {
      src: "https://images.pexels.com/photos/1028704/pexels-photo-1028704.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Arreglo de macarons coloridos",
      category: "cakes",
      title: "Torre de Macarons para Boda",
    },
    {
      src: "https://images.pexels.com/photos/3992204/pexels-photo-3992204.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Baker working in natural light",
      category: "process",
      title: "Morning Prep",
    },
    {
      src: "https://images.pexels.com/photos/1126359/pexels-photo-1126359.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Celebration cake setup",
      category: "events",
      title: "Birthday Celebration",
    },
    {
      src: "https://images.pexels.com/photos/1055272/pexels-photo-1055272.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
      alt: "Dessert table arrangement",
      category: "events",
      title: "Baby Shower Dessert Table",
    },
  ];

  const filteredImages =
    activeCategory === "all"
      ? images
      : images.filter((image) => image.category === activeCategory);

  // Convert images to lightbox format
  const lightboxImages = filteredImages.map((image) => ({
    src: image.src,
    alt: image.alt,
    title: image.alt,
    description: `Beautiful ${image.category} creation`,
    tags: [image.category],
    likes: Math.floor(Math.random() * 100),
    comments: Math.floor(Math.random() * 20),
  }));

  const {
    isOpen: lightboxOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
    goToNext,
    goToPrevious,
  } = useLightbox(lightboxImages);

  const { photos, loadPhotos } = useCustomerPhotoShowcase();

  // Load customer photos on component mount
  React.useEffect(() => {
    if (activeTab === "customer-photos" && photos.length === 0) {
      loadPhotos();
    }
  }, [activeTab, photos.length, loadPhotos]);

  const handleImageClick = (index: number) => {
    openLightbox(index);
  };

  const handleLoadMore = () => {
    loadPhotos();
  };

  return (
    <PageTransition>
      <div className="pt-16">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500 bg-texture">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="w-16 h-px bg-dusty-rose/40"></div>
              <span className="mx-4 text-sm font-karla text-dusty-rose/70 uppercase tracking-wider">
                Gallery
              </span>
              <div className="w-16 h-px bg-dusty-rose/40"></div>
            </div>

            <h1 className="text-4xl sm:text-5xl font-playfair text-black-bold text-shadow-elegant mb-6">
              Momentos Especiales &
              <span className="block text-dusty-rose-elegant italic">
                Recuerdos Hermosos
              </span>
            </h1>

            <div className="w-24 h-px bg-dusty-rose/40 mx-auto mb-8"></div>

            <p className="text-lg body-elegant leading-relaxed font-karla font-light max-w-2xl mx-auto">
              Un vistazo íntimo a los postres que he creado con amor y las
              celebraciones de las que han sido parte. Cada uno hecho con
              intención, cuidado y un toque de magia.
            </p>
          </div>
        </section>

        {/* Tab Navigation */}
        <section className="py-8 bg-cream-500 border-b border-dusty-rose/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center mb-8">
              <div className="flex space-x-2 bg-gray-100 p-2 rounded-lg">
                <button
                  onClick={() => setActiveTab("gallery")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === "gallery"
                      ? "bg-dusty-rose-gradient text-white shadow-dusty-rose"
                      : "body-elegant hover:bg-dusty-rose/20"
                  }`}
                >
                  Nuestra Galería
                </button>
                <button
                  onClick={() => setActiveTab("customer-photos")}
                  className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    activeTab === "customer-photos"
                      ? "bg-dusty-rose-gradient text-white shadow-dusty-rose"
                      : "body-elegant hover:bg-dusty-rose/20"
                  }`}
                >
                  Fotos de Clientes
                </button>
              </div>
            </div>

            {/* Category Filter - Only show for gallery tab */}
            {activeTab === "gallery" && (
              <div className="flex flex-wrap justify-center gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.id)}
                    className={`px-6 py-2 rounded-full font-karla transition-all duration-300 ${
                      activeCategory === category.id
                        ? "bg-dusty-rose-gradient text-white shadow-dusty-rose"
                        : "bg-elegant-cream body-elegant hover:bg-dusty-rose/20"
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Gallery Content */}
        {activeTab === "gallery" && (
          <section className="py-20 bg-cream-500 bg-texture">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredImages.map((image, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer overflow-hidden rounded-2xl shadow-dusty-rose hover:shadow-warm transition-all duration-500 transform hover:scale-105 hover:-translate-y-2"
                    onClick={() => handleImageClick(index)}
                  >
                    <div className="relative">
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-4 left-4 text-white">
                          <p className="text-sm font-karla font-light capitalize">
                            {image.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Customer Photos Content */}
        {activeTab === "customer-photos" && (
          <section className="py-20 bg-cream-500">
            <CustomerPhotoShowcase
              photos={photos}
              showFilters={true}
              showLightbox={true}
              columnsDesktop={4}
              columnsTablet={3}
              columnsMobile={2}
              maxPhotosToShow={20}
              enableInfiniteScroll={true}
              showSocialHandles={true}
              allowReporting={true}
              onLoadMore={handleLoadMore}
            />
          </section>
        )}

        {/* Instagram CTA */}
        <section className="py-20 bg-gradient-to-br from-cream-400 to-cream-500 bg-texture">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Instagram className="h-8 w-8 text-dusty-rose mr-3" />
              <h2 className="text-3xl font-playfair text-black-bold text-shadow-elegant">
                Sigue Mi Viaje Creativo
              </h2>
            </div>

            <p className="text-lg body-elegant mb-8 font-karla font-light">
              Mira lo que he estado horneando e inspírate para tu próxima
              celebración
            </p>

            <a
              href="https://www.instagram.com/cucinanostrard/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-dusty-rose-gradient text-white px-10 py-4 rounded-full text-lg hover:bg-mocha transition-all duration-500 transform hover:scale-105 shadow-dusty-rose hover:shadow-warm font-karla font-medium"
            >
              @cucinanostrard
            </a>
          </div>
        </section>

        {/* Advanced Lightbox */}
        <ImageLightbox
          images={lightboxImages}
          currentIndex={currentIndex}
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrevious={goToPrevious}
          showSocialActions={true}
          showThumbnails={true}
          autoPlayInterval={0}
        />
      </div>
    </PageTransition>
  );
};

export default Gallery;
