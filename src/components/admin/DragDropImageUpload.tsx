import * as React from "react";
import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Plus, X, Check, AlertCircle } from "lucide-react";
import {
  compressImage,
  validateImageSize,
  COMPRESSION_PRESETS,
} from "../../utils/imageCompression";

interface DragDropImageUploadProps {
  onImagesChange: (images: string[]) => void;
  maxFiles?: number;
  currentImages?: string[];
  label: string;
  description?: string;
  compressionPreset?: keyof typeof COMPRESSION_PRESETS;
  className?: string;
  required?: boolean;
}

export const DragDropImageUpload: React.FC<DragDropImageUploadProps> = ({
  onImagesChange,
  maxFiles = 1,
  currentImages = [],
  label,
  description,
  compressionPreset = "large",
  className = "",
  required = false,
}) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [processingCount, setProcessingCount] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dragCounter = useRef(0);

  const processFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);
      const validFiles = fileArray.filter((file) =>
        file.type.startsWith("image/"),
      );

      if (validFiles.length === 0) {
        setUploadStatus("error");
        setTimeout(() => setUploadStatus("idle"), 2000);
        return;
      }

      setIsProcessing(true);
      setProcessingCount(validFiles.length);

      const compressedImages: string[] = [];
      let hasError = false;

      for (const file of validFiles) {
        try {
          const compressedImage = await compressImage(
            file,
            COMPRESSION_PRESETS[compressionPreset],
          );
          const validation = validateImageSize(compressedImage);

          if (validation.isValid) {
            compressedImages.push(compressedImage);
          } else {
            console.error(`Image too large: ${validation.sizeKB} KB`);
            hasError = true;
          }
        } catch (error) {
          console.error("Error compressing image:", error);
          hasError = true;
        }
      }

      if (compressedImages.length > 0) {
        const newImages =
          maxFiles === 1
            ? compressedImages.slice(0, 1)
            : [...currentImages, ...compressedImages].slice(0, maxFiles);

        onImagesChange(newImages);
        setUploadStatus("success");
      } else if (hasError) {
        setUploadStatus("error");
      }

      setIsProcessing(false);
      setProcessingCount(0);

      setTimeout(() => setUploadStatus("idle"), 2000);
    },
    [currentImages, maxFiles, onImagesChange, compressionPreset],
  );

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current++;

    if (e.dataTransfer.types.includes("Files")) {
      setIsDragOver(true);
    }
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dragCounter.current--;

    if (dragCounter.current === 0) {
      setIsDragOver(false);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      dragCounter.current = 0;

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        processFiles(files);
      }
    },
    [processFiles],
  );

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files && files.length > 0) {
        processFiles(files);
      }
      // Reset input value to allow selecting the same file again
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [processFiles],
  );

  const removeImage = useCallback(
    (index: number) => {
      const newImages = currentImages.filter((_, i) => i !== index);
      onImagesChange(newImages);
    },
    [currentImages, onImagesChange],
  );

  const getStatusColor = () => {
    switch (uploadStatus) {
      case "success":
        return "border-green-400 bg-green-50";
      case "error":
        return "border-red-400 bg-red-50";
      default:
        return isDragOver
          ? "border-dusty-rose-500 bg-dusty-rose-50"
          : "border-dusty-rose-300";
    }
  };

  const getStatusIcon = () => {
    if (isProcessing) {
      return (
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-dusty-rose-600 border-t-transparent rounded-full"
        />
      );
    }

    switch (uploadStatus) {
      case "success":
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center"
          >
            <Check className="w-6 h-6 text-green-600" />
          </motion.div>
        );
      case "error":
        return (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center"
          >
            <AlertCircle className="w-6 h-6 text-red-600" />
          </motion.div>
        );
      default:
        return (
          <motion.div
            animate={isDragOver ? { scale: 1.1 } : { scale: 1 }}
            className="w-12 h-12 bg-dusty-rose-100 rounded-full flex items-center justify-center"
          >
            {isDragOver ? (
              <Upload className="w-6 h-6 text-dusty-rose-600" />
            ) : (
              <Plus className="w-6 h-6 text-dusty-rose-600" />
            )}
          </motion.div>
        );
    }
  };

  const getStatusText = () => {
    if (isProcessing) {
      return {
        primary: `Procesando ${processingCount} imagen${processingCount > 1 ? "es" : ""}...`,
        secondary: "Comprimiendo y optimizando para Firebase...",
      };
    }

    switch (uploadStatus) {
      case "success":
        return {
          primary: "¡Imagen(es) agregada(s) con éxito!",
          secondary: "Listo para continuar",
        };
      case "error":
        return {
          primary: "Error al procesar las imágenes",
          secondary: "Intenta con archivos más pequeños",
        };
      default:
        return {
          primary: isDragOver
            ? "¡Suelta las imágenes aquí!"
            : "Arrastra imágenes aquí o toca para seleccionar",
          secondary:
            description || "PNG, JPG hasta 5MB (se comprimirá automáticamente)",
        };
    }
  };

  const statusText = getStatusText();

  return (
    <div className={className}>
      <label className="block text-lg font-medium text-mocha/80 mb-3 font-sans">
        {label} {required && "*"}
      </label>

      <motion.div
        layout
        className={`relative border-2 border-dashed rounded-xl p-6 text-center transition-all duration-300 cursor-pointer ${getStatusColor()}`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple={maxFiles > 1}
          className="hidden"
          onChange={handleFileSelect}
        />

        <motion.div
          className="flex flex-col items-center space-y-4"
          animate={isDragOver ? { y: -5 } : { y: 0 }}
        >
          {getStatusIcon()}

          <div className="space-y-2">
            <motion.span
              className="text-sm font-playfair text-mocha-600 block"
              animate={isDragOver ? { scale: 1.05 } : { scale: 1 }}
            >
              {statusText.primary}
            </motion.span>
            <span className="text-xs text-mocha-400 block">
              {statusText.secondary}
            </span>
          </div>
        </motion.div>

        {/* Drag Overlay Animation */}
        <AnimatePresence>
          {isDragOver && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute inset-0 border-2 border-dusty-rose-500 rounded-xl bg-dusty-rose-100/50 flex items-center justify-center"
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="flex flex-col items-center space-y-2"
              >
                <Upload className="w-8 h-8 text-dusty-rose-600" />
                <span className="text-lg font-semibold text-dusty-rose-700">
                  Suelta aquí
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing Overlay */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-white/80 rounded-xl flex items-center justify-center"
            >
              <div className="flex flex-col items-center space-y-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-2 border-dusty-rose-600 border-t-transparent rounded-full"
                />
                <span className="text-sm font-medium text-mocha-600">
                  Procesando {processingCount} imagen
                  {processingCount > 1 ? "es" : ""}...
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Image Previews */}
      <AnimatePresence>
        {currentImages.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4"
          >
            <div
              className={`grid gap-3 ${maxFiles === 1 ? "grid-cols-1 max-w-32 mx-auto" : "grid-cols-3"}`}
            >
              {currentImages.map((image, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  layout
                  className="relative group"
                >
                  <div className="relative overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={image}
                      alt={`Preview ${index + 1}`}
                      className={`w-full object-cover ${maxFiles === 1 ? "h-24" : "h-20"}`}
                    />
                    <motion.button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <X className="w-3 h-3" />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DragDropImageUpload;
