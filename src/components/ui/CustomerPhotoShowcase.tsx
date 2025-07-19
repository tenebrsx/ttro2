import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Share2,
  ChevronLeft,
  ChevronRight,
  Camera,
  X,
  Instagram,
  User,
  MapPin,
  Calendar,
  Star,
  Flag,
} from "lucide-react";
import {
  CustomerPhoto,
  useCustomerPhotoShowcase,
} from "../../hooks/photo/useCustomerPhotoShowcase";

interface CustomerPhotoShowcaseProps {
  photos: CustomerPhoto[];
  showFilters?: boolean;
  showLightbox?: boolean;
  columnsDesktop?: number;
  columnsTablet?: number;
  columnsMobile?: number;
  maxPhotosToShow?: number;
  enableInfiniteScroll?: boolean;
  showSocialHandles?: boolean;
  allowReporting?: boolean;
  onPhotoSelect?: (photo: CustomerPhoto) => void;
  onLoadMore?: () => void;
}

interface PhotoFilters {
  dessertType: string;
  rating: number;
  platform: string;
  eventType: string;
  sortBy: "recent" | "popular" | "rating" | "comments";
  timeRange: "all" | "week" | "month" | "year";
}

const defaultFilters: PhotoFilters = {
  dessertType: "",
  rating: 0,
  platform: "",
  eventType: "",
  sortBy: "recent",
  timeRange: "all",
};

export const CustomerPhotoShowcase: React.FC<CustomerPhotoShowcaseProps> = ({
  photos,
  showFilters = true,
  showLightbox = true,
  columnsDesktop = 4,
  columnsTablet = 3,
  columnsMobile = 2,
  maxPhotosToShow = 20,
  showSocialHandles = true,
  allowReporting = true,
  onPhotoSelect,
}) => {
  const [filteredPhotos, setFilteredPhotos] = useState<CustomerPhoto[]>([]);
  const [filters, setFilters] = useState<PhotoFilters>(defaultFilters);
  const [selectedPhoto, setSelectedPhoto] = useState<CustomerPhoto | null>(
    null,
  );
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [likedPhotos, setLikedPhotos] = useState<Set<string>>(new Set());
  const [showReportModal, setShowReportModal] = useState(false);
  const [reportingPhoto, setReportingPhoto] = useState<CustomerPhoto | null>(
    null,
  );
  const [hoveredPhoto, setHoveredPhoto] = useState<string | null>(null);

  // Apply filters and sorting
  useEffect(() => {
    let filtered = [...photos];

    // Apply filters
    if (filters.dessertType) {
      filtered = filtered.filter((photo) =>
        photo.dessertTags.some((tag) =>
          tag.toLowerCase().includes(filters.dessertType.toLowerCase()),
        ),
      );
    }

    if (filters.rating > 0) {
      filtered = filtered.filter(
        (photo) => photo.rating && photo.rating >= filters.rating,
      );
    }

    if (filters.platform) {
      filtered = filtered.filter(
        (photo) => photo.socialPlatform === filters.platform,
      );
    }

    if (filters.eventType) {
      filtered = filtered.filter(
        (photo) => photo.eventType === filters.eventType,
      );
    }

    if (filters.timeRange !== "all") {
      const now = new Date();
      const timeLimit = new Date();

      switch (filters.timeRange) {
        case "week":
          timeLimit.setDate(now.getDate() - 7);
          break;
        case "month":
          timeLimit.setMonth(now.getMonth() - 1);
          break;
        case "year":
          timeLimit.setFullYear(now.getFullYear() - 1);
          break;
      }

      filtered = filtered.filter((photo) => photo.timestamp >= timeLimit);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case "popular":
          return b.likes - a.likes;
        case "rating":
          return (b.rating || 0) - (a.rating || 0);
        case "comments":
          return b.comments - a.comments;
        case "recent":
        default:
          return b.timestamp.getTime() - a.timestamp.getTime();
      }
    });

    // Limit results
    if (maxPhotosToShow) {
      filtered = filtered.slice(0, maxPhotosToShow);
    }

    setFilteredPhotos(filtered);
  }, [photos, filters, maxPhotosToShow]);

  const handlePhotoClick = (photo: CustomerPhoto, index: number) => {
    if (showLightbox) {
      setSelectedPhoto(photo);
      setLightboxIndex(index);
    }
    onPhotoSelect?.(photo);
  };

  const handleLike = (photoId: string) => {
    setLikedPhotos((prev) => {
      const updated = new Set(prev);
      if (updated.has(photoId)) {
        updated.delete(photoId);
      } else {
        updated.add(photoId);
      }
      return updated;
    });
  };

  const handleShare = async (photo: CustomerPhoto) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `¡Mira este delicioso ${photo.dessertTags.join(", ")}!`,
          text: photo.caption,
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share failed:", error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleReport = (photo: CustomerPhoto) => {
    setReportingPhoto(photo);
    setShowReportModal(true);
  };

  const closeLightbox = () => {
    setSelectedPhoto(null);
  };

  const navigateLightbox = (direction: "next" | "prev") => {
    const newIndex =
      direction === "next"
        ? (lightboxIndex + 1) % filteredPhotos.length
        : (lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length;

    setLightboxIndex(newIndex);
    setSelectedPhoto(filteredPhotos[newIndex]);
  };

  const formatTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - timestamp.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 60) {
      return `hace ${diffMins}m`;
    } else if (diffHours < 24) {
      return `hace ${diffHours}h`;
    } else if (diffDays < 7) {
      return `hace ${diffDays}d`;
    } else {
      return timestamp.toLocaleDateString("es-ES", {
        month: "short",
        day: "numeric",
      });
    }
  };

  const getSocialIcon = (platform: string) => {
    switch (platform) {
      case "instagram":
        return <Instagram className="w-4 h-4" />;
      case "facebook":
        return <span className="w-4 h-4 text-blue-600">f</span>;
      case "twitter":
        return <span className="w-4 h-4 text-blue-400">T</span>;
      case "tiktok":
        return <span className="w-4 h-4 text-black">♪</span>;
      default:
        return <User className="w-4 h-4" />;
    }
  };

  const getGridColumns = () => {
    return {
      "grid-cols-2": columnsMobile === 2,
      "grid-cols-3": columnsMobile === 3,
      "md:grid-cols-3": columnsTablet === 3,
      "md:grid-cols-4": columnsTablet === 4,
      "lg:grid-cols-4": columnsDesktop === 4,
      "lg:grid-cols-5": columnsDesktop === 5,
      "lg:grid-cols-6": columnsDesktop === 6,
    };
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              Galería de Clientes
            </h2>
            <p className="text-gray-600">
              Nuestros clientes comparten sus momentos especiales
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-600">
              <Camera className="w-5 h-5" />
              <span className="text-sm">{filteredPhotos.length} fotos</span>
            </div>
            <button className="bg-dusty-rose text-white px-4 py-2 rounded-lg hover:bg-dusty-rose/90 transition-colors">
              Compartir tu foto
            </button>
          </div>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tipo de Postre
                </label>
                <select
                  value={filters.dessertType}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      dessertType: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dusty-rose focus:border-dusty-rose"
                >
                  <option value="">Todos los postres</option>
                  <option value="tarta">Tartas</option>
                  <option value="macaron">Macarons</option>
                  <option value="cupcake">Cupcakes</option>
                  <option value="pastel">Pasteles</option>
                  <option value="galleta">Galletas</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plataforma
                </label>
                <select
                  value={filters.platform}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      platform: e.target.value,
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dusty-rose focus:border-dusty-rose"
                >
                  <option value="">Todas las plataformas</option>
                  <option value="instagram">Instagram</option>
                  <option value="facebook">Facebook</option>
                  <option value="twitter">Twitter</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ordenar por
                </label>
                <select
                  value={filters.sortBy}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      sortBy: e.target.value as
                        | "recent"
                        | "popular"
                        | "rating"
                        | "comments",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dusty-rose focus:border-dusty-rose"
                >
                  <option value="recent">Más reciente</option>
                  <option value="popular">Más popular</option>
                  <option value="rating">Mejor calificación</option>
                  <option value="comments">Más comentarios</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Período
                </label>
                <select
                  value={filters.timeRange}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      timeRange: e.target.value as
                        | "all"
                        | "week"
                        | "month"
                        | "year",
                    }))
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-dusty-rose focus:border-dusty-rose"
                >
                  <option value="all">Todo el tiempo</option>
                  <option value="week">Esta semana</option>
                  <option value="month">Este mes</option>
                  <option value="year">Este año</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Photo Grid */}
      <div
        className={`grid gap-4 ${Object.entries(getGridColumns())
          .filter(([, active]) => active)
          .map(([cls]) => cls)
          .join(" ")}`}
      >
        {filteredPhotos.map((photo, index) => (
          <div
            key={photo.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredPhoto(photo.id)}
            onMouseLeave={() => setHoveredPhoto(null)}
            onClick={() => handlePhotoClick(photo, index)}
          >
            {/* Image */}
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <img
                src={photo.thumbnailUrl}
                alt={photo.caption}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />

              {/* Hover Overlay */}
              {hoveredPhoto === photo.id && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="text-white text-center">
                    <div className="flex items-center justify-center space-x-4 mb-2">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-5 h-5" />
                        <span>{photo.likes}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <MessageCircle className="w-5 h-5" />
                        <span>{photo.comments}</span>
                      </div>
                    </div>
                    <p className="text-sm truncate max-w-[150px]">
                      {photo.caption}
                    </p>
                  </div>
                </div>
              )}

              {/* Platform Badge */}
              {photo.socialPlatform && (
                <div className="absolute top-2 right-2 p-2 bg-white/90 rounded-full">
                  {getSocialIcon(photo.socialPlatform)}
                </div>
              )}

              {/* Verified Badge */}
              {photo.isVerified && (
                <div className="absolute top-2 left-2 p-1 bg-blue-500 text-white rounded-full">
                  <Star className="w-3 h-3 fill-current" />
                </div>
              )}
            </div>

            {/* Photo Info */}
            <div className="mt-3">
              <div className="flex items-center space-x-2 mb-2">
                {photo.customerAvatar ? (
                  <img
                    src={photo.customerAvatar}
                    alt={photo.customerName}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-gray-400" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm font-medium text-gray-900 truncate">
                      {photo.customerName}
                    </span>
                    {showSocialHandles && photo.socialHandle && (
                      <span className="text-xs text-gray-500 truncate">
                        @{photo.socialHandle}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-1 text-xs text-gray-500">
                    <span>{formatTimeAgo(photo.timestamp)}</span>
                    {photo.customerLocation && (
                      <>
                        <span>•</span>
                        <MapPin className="w-3 h-3" />
                        <span className="truncate">
                          {photo.customerLocation}
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Caption */}
              <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                {photo.caption}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap gap-1 mb-2">
                {photo.dessertTags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-dusty-rose/20 text-dusty-rose text-xs rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>

              {/* Rating */}
              {photo.rating && (
                <div className="flex items-center space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= photo.rating!
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600">
                    ({photo.rating})
                  </span>
                </div>
              )}

              {/* Actions */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(photo.id);
                    }}
                    className="flex items-center space-x-1 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${likedPhotos.has(photo.id) ? "fill-current text-red-500" : ""}`}
                    />
                    <span className="text-sm">
                      {photo.likes + (likedPhotos.has(photo.id) ? 1 : 0)}
                    </span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleShare(photo);
                    }}
                    className="flex items-center space-x-1 text-gray-600 hover:text-dusty-rose transition-colors"
                  >
                    <Share2 className="w-4 h-4" />
                    <span className="text-sm">{photo.shares}</span>
                  </button>
                </div>

                {allowReporting && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReport(photo);
                    }}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Flag className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedPhoto && showLightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            {/* Navigation */}
            <button
              onClick={() => navigateLightbox("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => navigateLightbox("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>

            {/* Content */}
            <div className="bg-white rounded-lg overflow-hidden max-w-4xl max-h-[90vh] flex flex-col lg:flex-row">
              {/* Image */}
              <div className="flex-shrink-0 lg:w-2/3">
                <img
                  src={selectedPhoto.imageUrl}
                  alt={selectedPhoto.caption}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="flex-1 p-6 flex flex-col lg:w-1/3">
                {/* Customer Info */}
                <div className="flex items-center space-x-3 mb-4">
                  {selectedPhoto.customerAvatar ? (
                    <img
                      src={selectedPhoto.customerAvatar}
                      alt={selectedPhoto.customerName}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-gray-900">
                        {selectedPhoto.customerName}
                      </span>
                      {selectedPhoto.isVerified && (
                        <Star className="w-4 h-4 text-blue-500 fill-current" />
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-500">
                      {selectedPhoto.socialPlatform && (
                        <div className="flex items-center space-x-1">
                          {getSocialIcon(selectedPhoto.socialPlatform)}
                          {selectedPhoto.socialHandle && (
                            <span>@{selectedPhoto.socialHandle}</span>
                          )}
                        </div>
                      )}
                      <span>{formatTimeAgo(selectedPhoto.timestamp)}</span>
                    </div>
                  </div>
                </div>

                {/* Caption */}
                <p className="text-gray-800 mb-4">{selectedPhoto.caption}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {selectedPhoto.dessertTags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-dusty-rose/20 text-dusty-rose text-sm rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                {selectedPhoto.rating && (
                  <div className="flex items-center space-x-2 mb-4">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-5 h-5 ${
                            star <= selectedPhoto.rating!
                              ? "text-yellow-400 fill-current"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-gray-600">
                      ({selectedPhoto.rating}/5)
                    </span>
                  </div>
                )}

                {/* Location and Event */}
                <div className="space-y-2 mb-4">
                  {selectedPhoto.customerLocation && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span>{selectedPhoto.customerLocation}</span>
                    </div>
                  )}
                  {selectedPhoto.eventType && (
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <Calendar className="w-4 h-4" />
                      <span>{selectedPhoto.eventType}</span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center space-x-4 pt-4 border-t">
                  <button
                    onClick={() => handleLike(selectedPhoto.id)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors"
                  >
                    <Heart
                      className={`w-5 h-5 ${likedPhotos.has(selectedPhoto.id) ? "fill-current text-red-500" : ""}`}
                    />
                    <span>
                      {selectedPhoto.likes +
                        (likedPhotos.has(selectedPhoto.id) ? 1 : 0)}
                    </span>
                  </button>
                  <button
                    onClick={() => handleShare(selectedPhoto)}
                    className="flex items-center space-x-2 text-gray-600 hover:text-dusty-rose transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>{selectedPhoto.shares}</span>
                  </button>
                  <button className="flex items-center space-x-2 text-gray-600 hover:text-dusty-rose transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span>{selectedPhoto.comments}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {showReportModal && reportingPhoto && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Reportar contenido
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Por qué quieres reportar esta foto?
            </p>
            <div className="space-y-2 mb-6">
              {[
                "Contenido inapropiado",
                "Spam",
                "Información falsa",
                "Violación de derechos de autor",
                "Otro",
              ].map((reason) => (
                <label key={reason} className="flex items-center space-x-3">
                  <input
                    type="radio"
                    name="report-reason"
                    value={reason}
                    className="text-dusty-rose focus:ring-dusty-rose"
                  />
                  <span className="text-sm text-gray-700">{reason}</span>
                </label>
              ))}
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setShowReportModal(false)}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  // Handle report submission
                  setShowReportModal(false);
                  setReportingPhoto(null);
                }}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Reportar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
