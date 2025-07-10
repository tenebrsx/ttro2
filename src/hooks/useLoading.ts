import { useState, useEffect } from 'react';

interface UseLoadingOptions {
  initialDelay?: number;
  minLoadingTime?: number;
}

interface LoadingState {
  isLoading: boolean;
  progress: number;
  message: string;
}

export const useLoading = (options: UseLoadingOptions = {}) => {
  const { initialDelay = 0, minLoadingTime = 1000 } = options;
  const [loadingState, setLoadingState] = useState<LoadingState>({
    isLoading: true,
    progress: 0,
    message: 'Preparando algo dulce...'
  });

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let timeoutId: NodeJS.Timeout;

    const startLoading = () => {
      setLoadingState(prev => ({ ...prev, isLoading: true, progress: 0 }));

      // Simulate progress
      progressInterval = setInterval(() => {
        setLoadingState(prev => {
          const increment = Math.random() * 15 + 5; // 5-20% increments
          const newProgress = Math.min(prev.progress + increment, 90);

          // Update message based on progress
          let message = 'Preparando algo dulce...';
          if (newProgress > 30) message = 'Mezclando ingredientes...';
          if (newProgress > 60) message = 'Horneando con amor...';
          if (newProgress > 80) message = 'Añadiendo toques finales...';

          return {
            ...prev,
            progress: newProgress,
            message
          };
        });
      }, 200);

      // Complete loading after minimum time
      timeoutId = setTimeout(() => {
        clearInterval(progressInterval);
        setLoadingState(prev => ({
          ...prev,
          progress: 100,
          message: '¡Listo para disfrutar!'
        }));

        // Hide loading after completion animation
        setTimeout(() => {
          setLoadingState(prev => ({ ...prev, isLoading: false }));
        }, 500);
      }, minLoadingTime);
    };

    if (initialDelay > 0) {
      setTimeout(startLoading, initialDelay);
    } else {
      startLoading();
    }

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timeoutId);
    };
  }, [initialDelay, minLoadingTime]);

  const setLoading = (loading: boolean, message?: string) => {
    setLoadingState(prev => ({
      ...prev,
      isLoading: loading,
      message: message || prev.message,
      progress: loading ? 0 : 100
    }));
  };

  return {
    ...loadingState,
    setLoading
  };
};

// Specific loading hooks for different scenarios
export const usePageLoading = () => {
  return useLoading({ minLoadingTime: 800 });
};

export const useFormSubmission = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const submitForm = async (submitFn: () => Promise<void>, successMessage = 'Enviado con éxito') => {
    setIsSubmitting(true);
    setSubmitMessage('Enviando...');

    try {
      await submitFn();
      setSubmitMessage(successMessage);
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitMessage('');
      }, 2000);
    } catch (error) {
      setSubmitMessage('Error al enviar');
      setTimeout(() => {
        setIsSubmitting(false);
        setSubmitMessage('');
      }, 3000);
    }
  };

  return {
    isSubmitting,
    submitMessage,
    submitForm
  };
};

export const useImageLoading = () => {
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set());
  const [failedImages, setFailedImages] = useState<Set<string>>(new Set());

  const handleImageLoad = (src: string) => {
    setLoadedImages(prev => new Set(prev).add(src));
  };

  const handleImageError = (src: string) => {
    setFailedImages(prev => new Set(prev).add(src));
  };

  const isImageLoaded = (src: string) => loadedImages.has(src);
  const hasImageFailed = (src: string) => failedImages.has(src);

  return {
    isImageLoaded,
    hasImageFailed,
    handleImageLoad,
    handleImageError
  };
};

// Preload images hook
export const useImagePreloader = (imageSources: string[]) => {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (imageSources.length === 0) {
      setIsComplete(true);
      return;
    }

    let loadedCount = 0;
    const totalImages = imageSources.length;

    const preloadImage = (src: string): Promise<void> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => {
          loadedCount++;
          setLoadingProgress((loadedCount / totalImages) * 100);
          resolve();
        };
        img.onerror = () => {
          loadedCount++;
          setLoadingProgress((loadedCount / totalImages) * 100);
          resolve();
        };
        img.src = src;
      });
    };

    Promise.all(imageSources.map(preloadImage)).then(() => {
      setIsComplete(true);
    });
  }, [imageSources]);

  return { loadingProgress, isComplete };
};

export default useLoading;
