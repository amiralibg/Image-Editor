import { motion } from 'framer-motion';
import { Upload } from 'lucide-react';
import ImageCropper from './ImageCropper';
import { ImageTab } from '../types';

interface ImagePreviewProps {
  tab: ImageTab | undefined;
  updateTab: (updates: Partial<ImageTab>) => void;
  dropzoneProps: {
    getRootProps: () => unknown;
    getInputProps: () => unknown;
    isDragActive: boolean;
  };
}

export default function ImagePreview({
  tab,
  updateTab,
  dropzoneProps,
}: ImagePreviewProps) {
  const { getRootProps, getInputProps, isDragActive } = dropzoneProps;

  const handleCropComplete = (croppedImage: string) => {
    if (!tab) return;
    
    // Create a new image to get dimensions
    const img = new Image();
    img.onload = () => {
      updateTab({
        image: croppedImage,
        dimensions: {
          width: img.width,
          height: img.height
        },
        isCropping: false
      });
    };
    img.src = croppedImage;
  };

  // Get the current combined filter string
  const getCurrentFilter = () => {
    if (!tab) return '';
    return tab.activePreset?.filter || 
      `brightness(${tab.filters.brightness}%) contrast(${tab.filters.contrast}%) saturate(${tab.filters.saturation}%) blur(${tab.filters.blur}px)`;
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {!tab?.image ? (
        <div
          {...getRootProps()}
          className="w-full h-[500px] flex items-center justify-center"
        >
          <input {...getInputProps()} />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center p-8 w-full h-full flex flex-col items-center justify-center border-2 border-dashed border-gray-600 rounded-lg cursor-pointer hover:border-gray-500 transition-colors"
          >
            <Upload className="w-16 h-16 mb-4 text-gray-400" />
            <p className="text-xl font-medium text-gray-400 mb-2">
              {isDragActive ? "Drop your image here" : "Drag & drop an image"}
            </p>
            <p className="text-sm text-gray-500">
              or click to select from your computer
            </p>
          </motion.div>
        </div>
      ) : tab.isCropping ? (
        <ImageCropper
          image={tab.originalImage || tab.image}
          onCropComplete={handleCropComplete}
          onCancel={() => updateTab({ isCropping: false })}
        />
      ) : (
        <div 
          className="relative w-full h-[500px] flex items-center justify-center p-6"
          style={{ backgroundColor: tab.filters.backgroundColor }}
        >
          <motion.img
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            src={tab.image}
            alt="Uploaded image"
            className="max-h-full max-w-full object-contain rounded-lg"
            style={{
              filter: getCurrentFilter(),
              width: tab.dimensions.width,
              height: tab.dimensions.height
            }}
          />
        </div>
      )}
    </motion.div>
  );
}