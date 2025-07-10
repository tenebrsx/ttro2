import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Instagram,
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  Camera,
  ExternalLink,
  Play,
  Pause,
} from "lucide-react";

interface InstagramPost {
  id: string;
  imageUrl: string;
  thumbnailUrl?: string;
  caption: string;
  likes: number;
  comments: number;
  timestamp: Date;
  postUrl: string;
  hashtags: string[];
  customerTag?: string;
  isVideo?: boolean;
  duration?: string;
}

interface InstagramGalleryProps {
  showTitle?: boolean;
  showFilters?: boolean;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  postsToShow?: number;
  showStats?: boolean;
  showCTA?: boolean;
  instagramHandle?: string;
  instagramUrl?: string;
}

const EnhancedInstagramGallery: React.FC<InstagramGalleryProps> = ({
  showTitle = true,
  showFilters = true,
  autoPlay = true,
  autoPlayInterval = 5000,
  postsToShow = 6,
  showStats = true,
  showCTA = true,
  instagramHandle = "@cucinanostrard",
  instagramUrl = "https://www.instagram.com/cucinanostrard/?hl=en",
}) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [isAutoPlaying, setIsAutoPlaying] = useState(autoPlay);
  const [isLoading, setIsLoading] = useState(true);

  // Sample Instagram posts data
  const instagramPosts: InstagramPost[] = [
    {
      id: "post-001",
      imageUrl: "/images/instagram/chocolate-raspberry-tart.jpg",
      thumbnailUrl:
        "/images/instagram/thumbs/chocolate-raspberry-tart-thumb.jpg",
      caption:
        "Proceso de decoración de un pastel de bodas. Cada detalle cuenta cuando se trata de hacer realidad los sueños de nuestros clientes. #PastelDeBodas #HechoConAmor #Cucinanostrard",
      likes: 203,
      comments: 45,
      timestamp: new Date("2024-12-01"),
      postUrl: `${instagramUrl}/p/example1/`,
      hashtags: ["#PastelDeBodas", "#HechoConAmor", "#Cucinanostrard"],
      customerTag: "@cliente_feliz",
      isVideo: false,
    },
    {
      id: "post-002",
      imageUrl: "/images/instagram/vanilla-caramel-macarons.jpg",
      thumbnailUrl:
        "/images/instagram/thumbs/vanilla-caramel-macarons-thumb.jpg",
      caption:
        "Macarons frescos del día en colores pasteles. La técnica francesa en cada bocado. ¿Cuál es tu sabor favorito? #MacaronsFranceses #Artesanal #TecnicaFrancesa",
      likes: 156,
      comments: 31,
      timestamp: new Date("2024-11-28"),
      postUrl: `${instagramUrl}/p/example2/`,
      hashtags: ["#MacaronsFranceses", "#Artesanal", "#TecnicaFrancesa"],
      isVideo: false,
    },
    {
      id: "post-003",
      imageUrl: "/images/instagram/berry-cheesecake.jpg",
      thumbnailUrl: "/images/instagram/thumbs/berry-cheesecake-thumb.jpg",
      caption:
        "Cheesecake de frutos rojos que conquista corazones. Cremoso, fresco y con el equilibrio perfecto de dulzura. #Cheesecake #FrutosRojos #PostreGourmet",
      likes: 189,
      comments: 28,
      timestamp: new Date("2024-11-25"),
      postUrl: `${instagramUrl}/p/example3/`,
      hashtags: ["#Cheesecake", "#FrutosRojos", "#PostreGourmet"],
      customerTag: "@maria_gonzalez",
      isVideo: false,
    },
    {
      id: "post-004",
      imageUrl: "/images/instagram/decorated-cookies.jpg",
      thumbnailUrl: "/images/instagram/thumbs/decorated-cookies-thumb.jpg",
      caption:
        "Galletas decoradas para baby shower. Cada una pintada a mano con royal icing. Un dulce recuerdo para celebrar la llegada del bebé. #BabyShower #GalletasDecoradas #RoyalIcing",
      likes: 241,
      comments: 52,
      timestamp: new Date("2024-11-22"),
      postUrl: `${instagramUrl}/p/example4/`,
      hashtags: ["#BabyShower", "#GalletasDecoradas", "#RoyalIcing"],
      isVideo: true,
      duration: "0:45",
    },
    {
      id: "post-005",
      imageUrl: "/images/instagram/strawberry-cupcakes.jpg",
      thumbnailUrl: "/images/instagram/thumbs/strawberry-cupcakes-thumb.jpg",
      caption:
        "Cupcakes de fresa con buttercream de vainilla. Perfectos para cualquier celebración. El sabor del verano en cada bocado. #CupcakesFresa #Buttercream #SaborVerano",
      likes: 178,
      comments: 39,
      timestamp: new Date("2024-11-20"),
      postUrl: `${instagramUrl}/p/example5/`,
      hashtags: ["#CupcakesFresa", "#Buttercream", "#SaborVerano"],
      customerTag: "@ana_sofia",
      isVideo: false,
    },
    {
      id: "post-006",
      imageUrl: "/images/instagram/buttercream-class.jpg",
      thumbnailUrl: "/images/instagram/thumbs/buttercream-class-thumb.jpg",
      caption:
        "Detrás de cámaras: Preparando buttercream artesanal. La base de nuestras decoraciones más hermosas. #DetrasDelTelón #ButtercreamArtesanal #Proceso",
      likes: 134,
      comments: 22,
      timestamp: new Date("2024-11-18"),
      postUrl: `${instagramUrl}/p/example6/`,
      hashtags: ["#DetrasDelTelón", "#ButtercreamArtesanal", "#Proceso"],
      isVideo: true,
      duration: "1:20",
    },
  ];

  const filters = [
    { id: "all", label: "Todos", count: instagramPosts.length },
    {
      id: "tartas",
      label: "Tartas",
      count: instagramPosts.filter((post) =>
        post.hashtags.some(
          (tag) => tag.includes("Pastel") || tag.includes("Tarta"),
        ),
      ).length,
    },
    {
      id: "macarons",
      label: "Macarons",
      count: instagramPosts.filter((post) =>
        post.hashtags.some((tag) => tag.includes("Macaron")),
      ).length,
    },
    {
      id: "cupcakes",
      label: "Cupcakes",
      count: instagramPosts.filter((post) =>
        post.hashtags.some((tag) => tag.includes("Cupcake")),
      ).length,
    },
    {
      id: "proceso",
      label: "Proceso",
      count: instagramPosts.filter((post) =>
        post.hashtags.some(
          (tag) => tag.includes("Proceso") || tag.includes("DetrasDelTelón"),
        ),
      ).length,
    },
  ];

  const filteredPosts =
    selectedFilter === "all"
      ? instagramPosts
      : instagramPosts.filter((post) => {
          switch (selectedFilter) {
            case "tartas":
              return post.hashtags.some(
                (tag) => tag.includes("Pastel") || tag.includes("Tarta"),
              );
            case "macarons":
              return post.hashtags.some((tag) => tag.includes("Macaron"));
            case "cupcakes":
              return post.hashtags.some((tag) => tag.includes("Cupcake"));
            case "proceso":
              return post.hashtags.some(
                (tag) =>
                  tag.includes("Proceso") || tag.includes("DetrasDelTelón"),
              );
            default:
              return true;
          }
        });

  const postsToDisplay = filteredPosts.slice(0, postsToShow);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || postsToDisplay.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % postsToDisplay.length);
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, autoPlayInterval, postsToDisplay.length]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % postsToDisplay.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + postsToDisplay.length) % postsToDisplay.length,
    );
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const handleFilterChange = (filterId: string) => {
    setSelectedFilter(filterId);
    setCurrentSlide(0);
  };

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Hace menos de 1h";
    if (diffInHours < 24) return `Hace ${diffInHours}h`;

    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `Hace ${diffInDays}d`;

    return date.toLocaleDateString("es-ES", { day: "numeric", month: "short" });
  };

  const currentPost = postsToDisplay[currentSlide];

  if (isLoading) {
    return (
      <section className="py-20 bg-gradient-to-br from-sage/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto mb-12"></div>
            <div className="bg-gray-200 rounded-lg h-96 w-full max-w-4xl mx-auto"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-sage/5 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iMS41IiBmaWxsPSIjOTNBM0IxIiBmaWxsLW9wYWNpdHk9IjAuMSIvPgo8L3N2Zz4K')] opacity-40"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section */}
        {showTitle && (
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex items-center justify-center mb-6">
                <div className="w-16 h-px bg-sage/40"></div>
                <span className="mx-4 text-sm font-karla text-sage/70 uppercase tracking-wider">
                  Síguenos en Instagram
                </span>
                <div className="w-16 h-px bg-sage/40"></div>
              </div>

              <h2 className="text-4xl sm:text-5xl font-cormorant text-dark-cocoa mb-6">
                Momentos
                <span className="block text-sage italic">Dulces</span>
              </h2>

              <div className="w-24 h-px bg-sage/40 mx-auto mb-8"></div>

              <p className="text-lg text-dark-cocoa/70 leading-relaxed font-karla max-w-2xl mx-auto">
                Descubre el proceso detrás de cada creación y los momentos
                especiales que hacemos posibles.
              </p>
            </motion.div>
          </div>
        )}

        {/* Filters */}
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => handleFilterChange(filter.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                  selectedFilter === filter.id
                    ? "bg-sage text-white shadow-lg"
                    : "bg-white text-dark-cocoa hover:bg-sage/10 border border-gray-200"
                }`}
              >
                <span className="font-karla text-sm">{filter.label}</span>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    selectedFilter === filter.id
                      ? "bg-white/20 text-white"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Instagram Feed Display */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative max-w-4xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(autoPlay)}
        >
          {/* Main Instagram Post */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-sage to-dusty-rose rounded-full flex items-center justify-center">
                  <Instagram className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-karla font-semibold text-dark-cocoa">
                    {instagramHandle}
                  </h3>
                  <p className="text-sm text-dark-cocoa/60">
                    Santo Domingo, RD
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  {isAutoPlaying ? (
                    <Pause className="w-4 h-4 text-dark-cocoa" />
                  ) : (
                    <Play className="w-4 h-4 text-dark-cocoa" />
                  )}
                </button>
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4 text-dark-cocoa" />
                </a>
              </div>
            </div>

            {/* Image Container */}
            <div className="relative aspect-square overflow-hidden">
              <AnimatePresence mode="wait">
                {currentPost && (
                  <motion.div
                    key={currentPost.id}
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={currentPost.imageUrl}
                      alt={currentPost.caption}
                      className="w-full h-full object-cover"
                    />
                    {currentPost.isVideo && (
                      <div className="absolute top-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                        {currentPost.duration}
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Navigation Arrows */}
              {postsToDisplay.length > 1 && (
                <>
                  <button
                    onClick={prevSlide}
                    className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 group"
                  >
                    <ChevronLeft className="w-5 h-5 text-dark-cocoa group-hover:scale-110 transition-transform" />
                  </button>

                  <button
                    onClick={nextSlide}
                    className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-all duration-200 group"
                  >
                    <ChevronRight className="w-5 h-5 text-dark-cocoa group-hover:scale-110 transition-transform" />
                  </button>
                </>
              )}
            </div>

            {/* Post Content */}
            {currentPost && (
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-1 text-red-500 hover:text-red-600 transition-colors"
                    >
                      <Heart className="w-6 h-6" />
                      <span className="font-karla text-sm">
                        {currentPost.likes}
                      </span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="flex items-center space-x-1 text-dark-cocoa hover:text-sage transition-colors"
                    >
                      <MessageCircle className="w-6 h-6" />
                      <span className="font-karla text-sm">
                        {currentPost.comments}
                      </span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="text-dark-cocoa hover:text-sage transition-colors"
                    >
                      <Share2 className="w-6 h-6" />
                    </motion.button>
                  </div>
                  <span className="text-sm text-dark-cocoa/60 font-karla">
                    {formatTimeAgo(currentPost.timestamp)}
                  </span>
                </div>

                <p className="text-dark-cocoa font-karla leading-relaxed mb-4">
                  <span className="font-semibold">cucinanostrard</span>{" "}
                  {currentPost.caption}
                </p>

                {currentPost.customerTag && (
                  <p className="text-sm text-sage font-karla mb-2">
                    Foto compartida por {currentPost.customerTag}
                  </p>
                )}

                <div className="flex flex-wrap gap-2">
                  {currentPost.hashtags.map((hashtag, index) => (
                    <span
                      key={index}
                      className="text-sm text-sage hover:text-sage/80 cursor-pointer transition-colors"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Dots Indicator */}
          {postsToDisplay.length > 1 && (
            <div className="flex justify-center mt-6 space-x-2">
              {postsToDisplay.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide
                      ? "bg-sage w-6"
                      : "bg-dark-cocoa/30 hover:bg-sage/50"
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>

        {/* Stats Section */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="grid grid-cols-3 gap-8 mt-12 max-w-2xl mx-auto"
          >
            <div className="text-center">
              <div className="text-2xl font-cormorant text-dark-cocoa mb-1">
                {instagramPosts
                  .reduce((total, post) => total + post.likes, 0)
                  .toLocaleString()}
              </div>
              <div className="text-sm text-dark-cocoa/70 font-karla">
                Me gusta
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-cormorant text-dark-cocoa mb-1">
                {instagramPosts.length}
              </div>
              <div className="text-sm text-dark-cocoa/70 font-karla">
                Publicaciones
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-cormorant text-dark-cocoa mb-1">
                2.5K
              </div>
              <div className="text-sm text-dark-cocoa/70 font-karla">
                Seguidores
              </div>
            </div>
          </motion.div>
        )}

        {/* Call to Action */}
        {showCTA && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href={instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-3 bg-gradient-to-r from-sage to-dusty-rose text-white rounded-full font-karla font-medium hover:shadow-lg transition-all duration-300 group"
              >
                <Instagram className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Síguenos en Instagram
              </a>

              <button className="inline-flex items-center px-8 py-3 bg-white text-dark-cocoa border-2 border-sage rounded-full font-karla font-medium hover:bg-sage hover:text-white transition-all duration-300 group">
                <Camera className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                Comparte tu foto
              </button>
            </div>

            <p className="text-sm text-dark-cocoa/60 font-karla mt-4">
              Etiquétanos en tus fotos y aparece en nuestra galería
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default EnhancedInstagramGallery;
