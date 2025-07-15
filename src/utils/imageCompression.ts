/**
 * Image compression utility for Firebase storage
 * Compresses images to stay under Firebase's 1MB document field limit
 */

export interface CompressionOptions {
  maxWidth?: number;
  maxHeight?: number;
  quality?: number;
  maxSizeKB?: number;
  format?: 'image/jpeg' | 'image/webp' | 'image/png';
}

const DEFAULT_OPTIONS: Required<CompressionOptions> = {
  maxWidth: 800,
  maxHeight: 800,
  quality: 0.8,
  maxSizeKB: 900, // Leave some buffer under the 1MB limit
  format: 'image/jpeg'
};

/**
 * Compresses an image file to reduce its size for Firebase storage
 * @param file - The image file to compress
 * @param options - Compression options
 * @returns Promise that resolves to compressed base64 string
 */
export const compressImage = async (
  file: File,
  options: CompressionOptions = {}
): Promise<string> => {
  const opts = { ...DEFAULT_OPTIONS, ...options };

  return new Promise((resolve, reject) => {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      reject(new Error('File must be an image'));
      return;
    }

    // Check initial file size
    const fileSizeKB = file.size / 1024;
    console.log(`🖼️  Original image size: ${fileSizeKB.toFixed(2)} KB`);

    const img = new Image();
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          reject(new Error('Failed to get canvas context'));
          return;
        }

        // Calculate new dimensions while maintaining aspect ratio
        let { width, height } = img;
        const aspectRatio = width / height;

        if (width > opts.maxWidth) {
          width = opts.maxWidth;
          height = width / aspectRatio;
        }

        if (height > opts.maxHeight) {
          height = opts.maxHeight;
          width = height * aspectRatio;
        }

        // Set canvas dimensions
        canvas.width = width;
        canvas.height = height;

        // Draw and compress the image
        ctx.drawImage(img, 0, 0, width, height);

        // Start with the specified quality and reduce if needed
        let quality = opts.quality;
        let compressedDataUrl: string;
        let attempts = 0;
        const maxAttempts = 5;

        do {
          compressedDataUrl = canvas.toDataURL(opts.format, quality);
          const sizeKB = (compressedDataUrl.length * 3) / 4 / 1024; // Approximate base64 size

          console.log(`🖼️  Compression attempt ${attempts + 1}: ${sizeKB.toFixed(2)} KB (quality: ${quality})`);

          if (sizeKB <= opts.maxSizeKB || attempts >= maxAttempts) {
            break;
          }

          // Reduce quality for next attempt
          quality *= 0.8;
          attempts++;
        } while (quality > 0.1);

        const finalSizeKB = (compressedDataUrl.length * 3) / 4 / 1024;
        console.log(`🖼️  Final compressed size: ${finalSizeKB.toFixed(2)} KB`);

        if (finalSizeKB > opts.maxSizeKB) {
          console.warn(`⚠️  Image still too large: ${finalSizeKB.toFixed(2)} KB`);
        }

        resolve(compressedDataUrl);
      } catch (error) {
        reject(new Error(`Image compression failed: ${error}`));
      }
    };

    img.onerror = () => {
      reject(new Error('Failed to load image'));
    };

    // Load the image
    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };
    reader.readAsDataURL(file);
  });
};

/**
 * Validates if a base64 string is within size limits
 * @param base64String - The base64 string to validate
 * @param maxSizeKB - Maximum size in KB (default: 900KB)
 * @returns Object with validation result and size info
 */
export const validateImageSize = (
  base64String: string,
  maxSizeKB: number = 900
): { isValid: boolean; sizeKB: number; maxSizeKB: number } => {
  const sizeKB = (base64String.length * 3) / 4 / 1024;
  return {
    isValid: sizeKB <= maxSizeKB,
    sizeKB: Math.round(sizeKB * 100) / 100,
    maxSizeKB
  };
};

/**
 * Converts a data URL to a Blob
 * @param dataUrl - The data URL to convert
 * @returns Blob object
 */
export const dataUrlToBlob = (dataUrl: string): Blob => {
  const arr = dataUrl.split(',');
  const mime = arr[0].match(/:(.*?);/)?.[1] || 'image/jpeg';
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }

  return new Blob([u8arr], { type: mime });
};

/**
 * Gets image dimensions from a file
 * @param file - The image file
 * @returns Promise that resolves to width and height
 */
export const getImageDimensions = (file: File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.onerror = () => {
      reject(new Error('Failed to load image for dimension calculation'));
    };

    const reader = new FileReader();
    reader.onload = (e) => {
      img.src = e.target?.result as string;
    };
    reader.onerror = () => {
      reject(new Error('Failed to read file for dimension calculation'));
    };
    reader.readAsDataURL(file);
  });
};

// Export compression presets for common use cases
export const COMPRESSION_PRESETS = {
  thumbnail: {
    maxWidth: 300,
    maxHeight: 300,
    quality: 0.7,
    maxSizeKB: 100
  },
  medium: {
    maxWidth: 600,
    maxHeight: 600,
    quality: 0.8,
    maxSizeKB: 400
  },
  large: {
    maxWidth: 1200,
    maxHeight: 1200,
    quality: 0.85,
    maxSizeKB: 800
  }
} as const;
