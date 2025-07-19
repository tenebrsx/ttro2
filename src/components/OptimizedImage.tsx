import React, { useState, useCallback } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  aspectRatio?: "square" | "portrait" | "landscape";
  priority?: boolean;
  onLoad?: () => void;
  onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
  fallbackSrc?: string;
  maxRetries?: number;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  className = "",
  aspectRatio = "landscape",
  priority = false,
  onLoad,
  onError,
  fallbackSrc,
  maxRetries = 2,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const [currentSrc, setCurrentSrc] = useState(src);

  const aspectRatioClasses = {
    square: "aspect-square",
    portrait: "aspect-[3/4]",
    landscape: "aspect-[4/3]",
  };

  const handleLoad = () => {
    setIsLoading(false);
    setHasError(false);
  };

  const handleRetry = useCallback(() => {
    if (retryCount < maxRetries) {
      setRetryCount((prev) => prev + 1);
      setIsLoading(true);
      setHasError(false);
      // Force reload by adding timestamp
      setCurrentSrc(`${src}?retry=${Date.now()}`);
    } else if (fallbackSrc && currentSrc !== fallbackSrc) {
      // Try fallback image
      setCurrentSrc(fallbackSrc);
      setIsLoading(true);
      setHasError(false);
      setRetryCount(0);
    } else {
      setHasError(true);
      setIsLoading(false);
    }
  }, [retryCount, maxRetries, src, fallbackSrc, currentSrc]);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setIsLoading(false);

    if (onError) {
      onError(e);
    }

    // Auto-retry logic
    handleRetry();
  };

  return (
    <div
      className={`relative overflow-hidden ${aspectRatioClasses[aspectRatio]} ${className}`}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-dusty-rose/10">
          <LoadingSpinner size="medium" />
        </div>
      )}

      {hasError ? (
        <div className="absolute inset-0 flex items-center justify-center bg-dusty-rose/10">
          <div className="text-center text-mocha/50 p-4">
            <p className="text-sm mb-2">Error al cargar imagen</p>
            {retryCount < maxRetries ||
            (fallbackSrc && currentSrc !== fallbackSrc) ? (
              <button
                onClick={handleRetry}
                className="text-xs text-sage-600 hover:text-sage-800 underline"
              >
                Intentar de nuevo
              </button>
            ) : (
              <p className="text-xs opacity-70">
                {alt || "Imagen no disponible"}
              </p>
            )}
          </div>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          loading={priority ? "eager" : "lazy"}
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
