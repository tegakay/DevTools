import { useState, useRef } from 'react';
import { formatFileSize } from '../../utils';

const ImageCompressor = () => {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [compressedImage, setCompressedImage] = useState<string | null>(null);
  const [compressionLevel, setCompressionLevel] = useState(0.8);
  const [originalSize, setOriginalSize] = useState<number | null>(null);
  const [compressedSize, setCompressedSize] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setOriginalImage(result);
      setOriginalSize(file.size);
      compressImage(result, compressionLevel);
    };
    reader.readAsDataURL(file);
  };

  const compressImage = (imageData: string, quality: number) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx?.drawImage(img, 0, 0);

      canvas.toBlob(
        (blob) => {
          if (blob) {
            const compressedDataUrl = URL.createObjectURL(blob);
            setCompressedImage(compressedDataUrl);
            setCompressedSize(blob.size);
          }
        },
        'image/jpeg',
        quality
      );
    };

    img.src = imageData;
  };

  const handleCompressionChange = (quality: number) => {
    setCompressionLevel(quality);
    if (originalImage) {
      compressImage(originalImage, quality);
    }
  };

  const downloadCompressed = () => {
    if (compressedImage) {
      const link = document.createElement('a');
      link.href = compressedImage;
      link.download = 'compressed-image.jpg';
      link.click();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">Image Compressor</h1>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Upload Image
          </label>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="block w-full text-sm text-gray-500 dark:text-gray-400
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              dark:file:bg-blue-900 dark:file:text-blue-200
              hover:file:bg-blue-100 dark:hover:file:bg-blue-800"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Compression Quality: {Math.round(compressionLevel * 100)}%
          </label>
          <input
            type="range"
            min="0.1"
            max="1"
            step="0.1"
            value={compressionLevel}
            onChange={(e) => handleCompressionChange(parseFloat(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>

      {(originalImage || compressedImage) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {originalImage && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Original</h3>
              <img
                src={originalImage}
                alt="Original"
                className="w-full h-auto rounded-lg shadow"
              />
              {originalSize && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Size: {formatFileSize(originalSize)}
                </p>
              )}
            </div>
          )}

          {compressedImage && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Compressed</h3>
              <img
                src={compressedImage}
                alt="Compressed"
                className="w-full h-auto rounded-lg shadow"
              />
              {compressedSize && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                  Size: {formatFileSize(compressedSize)}
                  {originalSize && (
                    <span className="ml-2 text-green-600 dark:text-green-400">
                      ({((1 - compressedSize / originalSize) * 100).toFixed(1)}% reduction)
                    </span>
                  )}
                </p>
              )}
              <button
                onClick={downloadCompressed}
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors"
              >
                Download Compressed Image
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ImageCompressor;