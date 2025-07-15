import React, { useState } from 'react';
import { Upload, Image, Info, CheckCircle, AlertCircle } from 'lucide-react';
import {
  compressImage,
  validateImageSize,
  COMPRESSION_PRESETS,
  getImageDimensions,
  type CompressionOptions
} from '../utils/imageCompression';

interface CompressionResult {
  original: {
    size: number;
    dimensions: { width: number; height: number };
    dataUrl: string;
  };
  compressed: {
    size: number;
    dataUrl: string;
    isValid: boolean;
  };
  compressionRatio: number;
  preset: string;
}

const ImageCompressionTest: React.FC = () => {
  const [isCompressing, setIsCompressing] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [selectedPreset, setSelectedPreset] = useState<keyof typeof COMPRESSION_PRESETS>('medium');
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsCompressing(true);
    setError(null);
    setResult(null);

    try {
      // Get original file info
      const originalSize = file.size;
      const originalDimensions = await getImageDimensions(file);

      // Convert original to base64 for display
      const originalDataUrl = await new Promise<string>((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target?.result as string);
        reader.readAsDataURL(file);
      });

      // Compress the image
      const preset = COMPRESSION_PRESETS[selectedPreset];
      const compressedDataUrl = await compressImage(file, preset);

      // Validate compressed image
      const validation = validateImageSize(compressedDataUrl);
      const compressedSize = (compressedDataUrl.length * 3) / 4; // Approximate base64 size

      // Calculate compression ratio
      const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;

      setResult({
        original: {
          size: originalSize,
          dimensions: originalDimensions,
          dataUrl: originalDataUrl
        },
        compressed: {
          size: compressedSize,
          dataUrl: compressedDataUrl,
          isValid: validation.isValid
        },
        compressionRatio,
        preset: selectedPreset
      });

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al procesar la imagen');
    } finally {
      setIsCompressing(false);
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-cream-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-playfair text-mocha-800 mb-2">
            Test de Compresión de Imágenes
          </h1>
          <p className="text-mocha-600">
            Prueba la funcionalidad de compresión de imágenes para Firebase
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6 mb-6">
          <h2 className="text-xl font-playfair text-mocha-800 mb-4">
            Subir Imagen para Prueba
          </h2>

          {/* Preset Selection */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-mocha-700 mb-2">
              Preset de Compresión:
            </label>
            <select
              value={selectedPreset}
              onChange={(e) => setSelectedPreset(e.target.value as keyof typeof COMPRESSION_PRESETS)}
              className="w-full p-2 border border-cream-300 rounded-md focus:ring-2 focus:ring-dusty-rose-500 focus:border-transparent"
              disabled={isCompressing}
            >
              <option value="thumbnail">Thumbnail (300x300, max 100KB)</option>
              <option value="medium">Medium (600x600, max 400KB)</option>
              <option value="large">Large (1200x1200, max 800KB)</option>
            </select>
          </div>

          {/* File Upload */}
          <div className="border-2 border-dashed border-cream-300 rounded-lg p-8 text-center">
            <input
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              disabled={isCompressing}
              className="hidden"
              id="imageUpload"
            />
            <label
              htmlFor="imageUpload"
              className={`cursor-pointer flex flex-col items-center space-y-4 ${
                isCompressing ? 'opacity-50 pointer-events-none' : ''
              }`}
            >
              {isCompressing ? (
                <div className="w-12 h-12 border-4 border-dusty-rose-200 border-t-dusty-rose-600 rounded-full animate-spin" />
              ) : (
                <Upload className="w-12 h-12 text-dusty-rose-600" />
              )}
              <div>
                <p className="text-lg font-medium text-mocha-700">
                  {isCompressing ? 'Comprimiendo imagen...' : 'Haz clic para subir una imagen'}
                </p>
                <p className="text-sm text-mocha-500">
                  PNG, JPG, WebP hasta 10MB
                </p>
              </div>
            </label>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2">
              <AlertCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        {/* Results */}
        {result && (
          <div className="space-y-6">
            {/* Stats Summary */}
            <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6">
              <h3 className="text-lg font-playfair text-mocha-800 mb-4">
                Resultados de Compresión
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-cream-50 rounded-lg">
                  <p className="text-2xl font-bold text-mocha-800">
                    {formatFileSize(result.original.size)}
                  </p>
                  <p className="text-sm text-mocha-600">Tamaño Original</p>
                </div>

                <div className="text-center p-4 bg-cream-50 rounded-lg">
                  <p className="text-2xl font-bold text-dusty-rose-600">
                    {formatFileSize(result.compressed.size)}
                  </p>
                  <p className="text-sm text-mocha-600">Tamaño Comprimido</p>
                </div>

                <div className="text-center p-4 bg-cream-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">
                    {result.compressionRatio.toFixed(1)}%
                  </p>
                  <p className="text-sm text-mocha-600">Reducción</p>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-center space-x-2">
                {result.compressed.isValid ? (
                  <>
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-green-700 font-medium">
                      ✅ Imagen válida para Firebase (bajo 1MB)
                    </span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    <span className="text-red-700 font-medium">
                      ❌ Imagen aún muy grande para Firebase
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Image Comparison */}
            <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6">
              <h3 className="text-lg font-playfair text-mocha-800 mb-4">
                Comparación Visual
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Original */}
                <div>
                  <h4 className="font-medium text-mocha-700 mb-2">Original</h4>
                  <img
                    src={result.original.dataUrl}
                    alt="Original"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <div className="mt-2 text-sm text-mocha-600">
                    <p>Dimensiones: {result.original.dimensions.width} × {result.original.dimensions.height}</p>
                    <p>Tamaño: {formatFileSize(result.original.size)}</p>
                  </div>
                </div>

                {/* Compressed */}
                <div>
                  <h4 className="font-medium text-mocha-700 mb-2">Comprimida</h4>
                  <img
                    src={result.compressed.dataUrl}
                    alt="Compressed"
                    className="w-full h-64 object-cover rounded-lg border"
                  />
                  <div className="mt-2 text-sm text-mocha-600">
                    <p>Preset: {result.preset}</p>
                    <p>Tamaño: {formatFileSize(result.compressed.size)}</p>
                    <p>Reducción: {result.compressionRatio.toFixed(1)}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Details */}
            <div className="bg-white rounded-lg shadow-sm border border-cream-200 p-6">
              <h3 className="text-lg font-playfair text-mocha-800 mb-4">
                Detalles Técnicos
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <h5 className="font-medium text-mocha-700 mb-2">Configuración del Preset "{result.preset}":</h5>
                  <ul className="space-y-1 text-mocha-600">
                    <li>• Max Width: {COMPRESSION_PRESETS[selectedPreset].maxWidth}px</li>
                    <li>• Max Height: {COMPRESSION_PRESETS[selectedPreset].maxHeight}px</li>
                    <li>• Quality: {(COMPRESSION_PRESETS[selectedPreset].quality * 100).toFixed(0)}%</li>
                    <li>• Max Size: {COMPRESSION_PRESETS[selectedPreset].maxSizeKB}KB</li>
                  </ul>
                </div>

                <div>
                  <h5 className="font-medium text-mocha-700 mb-2">Estado de Firebase:</h5>
                  <ul className="space-y-1 text-mocha-600">
                    <li>• Límite por campo: 1MB (1,048,576 bytes)</li>
                    <li>• Tamaño actual: {formatFileSize(result.compressed.size)}</li>
                    <li>• Espacio restante: {formatFileSize(1048576 - result.compressed.size)}</li>
                    <li className={result.compressed.isValid ? 'text-green-600' : 'text-red-600'}>
                      • Estado: {result.compressed.isValid ? 'VÁLIDO' : 'INVÁLIDO'}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <div className="flex items-start space-x-3">
            <Info className="w-5 h-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-800 mb-2">Instrucciones de Uso</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Selecciona un preset de compresión según tus necesidades</li>
                <li>• Sube una imagen para ver cómo se comprime</li>
                <li>• Verifica que el resultado sea menor a 1MB para Firebase</li>
                <li>• Las imágenes grandes se redimensionan automáticamente</li>
                <li>• La calidad se ajusta dinámicamente si es necesario</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCompressionTest;
