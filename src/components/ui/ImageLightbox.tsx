import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Share2,
  Download,
  Heart,
  MessageCircle,
} from "lucide-react";

interface ImageData {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  tags?: string[];
  likes?: number;
  comments?: number;
}

interface ImageLightboxProps {
  images: ImageData[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
  showSocialActions?: boolean;
  showThumbnails?: boolean;
  autoPlayInterval?: number;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNext,
  onPrevious,
  showSocialActions = true,
  showThumbnails = true,
  autoPlayInterval = 0,
}) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [touchStart, setTouchStart] = useState({ x: 0, y: 0 });
  const [touchEnd, setTouchEnd] = useState({ x: 0, y: 0 });

  const imageRef = useRef<HTMLImageElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const autoPlayRef = useRef<NodeJS.Timeout>();
  const hideControlsRef = useRef<NodeJS.Timeout>();

  const currentImage = images[currentIndex];

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    if (showControls) {
      hideControlsRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
    return () => {
      if (hideControlsRef.current) {
        clearTimeout(hideControlsRef.current);
      }
    };
  }, [showControls]);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && autoPlayInterval > 0) {
      autoPlayRef.current = setInterval(() => {
        onNext();
      }, autoPlayInterval);
    } else {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    }
    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [isAutoPlaying, autoPlayInterval, onNext]);

  // Function definitions
  const handleZoomIn = useCallback(() => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 3));
    setIsZoomed(true);
  }, []);

  const handleZoomOut = useCallback(() => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 1));
    if (zoomLevel <= 1) {
      setIsZoomed(false);
    }
  }, [zoomLevel]);

  const handleRotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          onPrevious();
          break;
        case "ArrowRight":
          onNext();
          break;
        case "+":
        case "=":
          handleZoomIn();
          break;
        case "-":
          handleZoomOut();
          break;
        case "r":
          handleRotate();
          break;
        case " ":
          e.preventDefault();
          setIsAutoPlaying(!isAutoPlaying);
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [
    isOpen,
    onClose,
    onNext,
    onPrevious,
    isAutoPlaying,
    handleZoomIn,
    handleZoomOut,
    handleRotate,
  ]);

  // Reset image state when index changes
  useEffect(() => {
    setZoomLevel(1);
    setRotation(0);
    setIsZoomed(false);
    setImageLoaded(false);
  }, [currentIndex]);

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const deltaX = touchStart.x - touchEnd.x;
    const deltaY = touchStart.y - touchEnd.y;

    // Minimum swipe distance
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          onNext();
        } else {
          onPrevious();
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          // Swipe up - could be used for other actions
        } else {
          // Swipe down - could be used for other actions
        }
      }
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: currentImage.title || "Delicious Dessert",
          text: currentImage.description || "Check out this amazing dessert!",
          url: window.location.href,
        });
      } catch (error) {
        console.log("Share failed:", error);
      }
    } else {
      // Fallback to copying URL
      navigator.clipboard.writeText(window.location.href);
      // Show notification
    }
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = currentImage.src;
    link.download = currentImage.title || "dessert-image";
    link.click();
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    // Here you would typically send the like to your backend
  };

  const handleMouseMove = () => {
    setShowControls(true);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-95 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Main container */}
      <div
        ref={containerRef}
        className="relative w-full h-full flex flex-col"
        onMouseMove={handleMouseMove}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Top controls */}
        <div
          className={`absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
        >
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h3 className="text-white text-lg font-medium">
                {currentImage.title || "Dessert Gallery"}
              </h3>
              <span className="text-white/70 text-sm">
                {currentIndex + 1} / {images.length}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              {/* Zoom controls */}
              <button
                onClick={handleZoomOut}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                disabled={zoomLevel <= 1}
              >
                <ZoomOut className="w-5 h-5 text-white" />
              </button>
              <button
                onClick={handleZoomIn}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                disabled={zoomLevel >= 3}
              >
                <ZoomIn className="w-5 h-5 text-white" />
              </button>

              {/* Rotate */}
              <button
                onClick={handleRotate}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <RotateCw className="w-5 h-5 text-white" />
              </button>

              {/* Auto-play toggle */}
              {autoPlayInterval > 0 && (
                <button
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className={`p-2 rounded-full transition-colors ${
                    isAutoPlaying
                      ? "bg-sage/70 hover:bg-sage/80"
                      : "bg-white/20 hover:bg-white/30"
                  }`}
                >
                  <span className="text-white text-sm">
                    {isAutoPlaying ? "Pause" : "Play"}
                  </span>
                </button>
              )}

              {/* Close button */}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Main image area */}
        <div className="flex-1 relative flex items-center justify-center p-4">
          {/* Loading indicator */}
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-sage/30 border-t-sage rounded-full animate-spin"></div>
            </div>
          )}

          {/* Main image */}
          <img
            ref={imageRef}
            src={currentImage.src}
            alt={currentImage.alt}
            className={`max-w-full max-h-full object-contain transition-all duration-300 ${
              isZoomed ? "cursor-move" : "cursor-pointer"
            }`}
            style={{
              transform: `scale(${zoomLevel}) rotate(${rotation}deg)`,
              opacity: imageLoaded ? 1 : 0,
            }}
            onLoad={() => setImageLoaded(true)}
            onClick={() => {
              if (!isZoomed) {
                setIsZoomed(true);
                setZoomLevel(2);
              }
            }}
          />

          {/* Navigation arrows */}
          <button
            onClick={onPrevious}
            className={`absolute left-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            onClick={onNext}
            className={`absolute right-4 top-1/2 transform -translate-y-1/2 p-3 rounded-full bg-white/20 hover:bg-white/30 transition-all duration-300 ${
              showControls ? "opacity-100" : "opacity-0"
            }`}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Bottom controls */}
        <div
          className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0"}`}
        >
          {/* Image info */}
          <div className="mb-4">
            {currentImage.description && (
              <p className="text-white/90 text-sm mb-2">
                {currentImage.description}
              </p>
            )}

            {currentImage.tags && (
              <div className="flex flex-wrap gap-2 mb-2">
                {currentImage.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-sage/70 text-white text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Social actions */}
          {showSocialActions && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleLike}
                  className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${isLiked ? "fill-red-500 text-red-500" : ""}`}
                  />
                  <span className="text-sm">
                    {(currentImage.likes || 0) + (isLiked ? 1 : 0)}
                  </span>
                </button>

                <button className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors">
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-sm">{currentImage.comments || 0}</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Share2 className="w-5 h-5 text-white" />
                </button>

                <button
                  onClick={handleDownload}
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                >
                  <Download className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          )}

          {/* Thumbnail strip */}
          {showThumbnails && images.length > 1 && (
            <div className="mt-4 flex justify-center">
              <div className="flex space-x-2 overflow-x-auto max-w-full">
                {images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      // This would be handled by the parent component
                      // onCurrentIndexChange(index);
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      index === currentIndex
                        ? "border-sage ring-2 ring-sage/50"
                        : "border-white/20 hover:border-white/40"
                    }`}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Hook for managing lightbox state
export const useLightbox = (images: ImageData[]) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = "unset";
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return {
    isOpen,
    currentIndex,
    openLightbox,
    closeLightbox,
    goToNext,
    goToPrevious,
  };
};
