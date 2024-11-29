import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import {
  Check,
  X,
  ZoomIn,
  ZoomOut,
  Move,
  RotateCcw,
  RotateCw,
  Maximize2,
  Square,
  RectangleHorizontal,
} from "lucide-react";
import { KeyboardShortcut } from "../types";
import { KEYBOARD_SHORTCUTS } from "../utils/platform";
import "react-image-crop/dist/ReactCrop.css";

interface ImageCropperProps {
  image: string;
  onCropComplete: (croppedImage: string) => void;
  onCancel: () => void;
  aspectRatio?: number;
}

interface Transform {
  scale: number;
  translateX: number;
  translateY: number;
  rotation: number;
}

const ASPECT_RATIO_PRESETS = [
  { label: "Free", value: undefined, icon: <Maximize2 className="w-4 h-4" /> },
  { label: "1:1", value: 1, icon: <Square className="w-4 h-4" /> },
  {
    label: "16:9",
    value: 16 / 9,
    icon: <RectangleHorizontal className="w-4 h-4" />,
  },
  {
    label: "4:3",
    value: 4 / 3,
    icon: <RectangleHorizontal className="w-4 h-4" />,
  },
  {
    label: "3:2",
    value: 3 / 2,
    icon: <RectangleHorizontal className="w-4 h-4" />,
  },
];

export default function ImageCropper({
  image,
  onCropComplete,
  onCancel,
  aspectRatio,
}: ImageCropperProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    x: 25,
    y: 25,
    width: 50,
    height: 50,
  });

  const [transform, setTransform] = useState<Transform>({
    scale: 1,
    translateX: 0,
    translateY: 0,
    rotation: 0,
  });

  const [selectedAspectRatio, setSelectedAspectRatio] = useState<
    number | undefined
  >(aspectRatio);
  
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);
  const [touchStartDistance, setTouchStartDistance] = useState<number>(0);
  const [initialScale, setInitialScale] = useState<number>(1);

  // Update crop when aspect ratio changes
  useEffect(() => {
    if (selectedAspectRatio !== undefined) {
      const imageAspect = imgRef.current ? imgRef.current.width / imgRef.current.height : 1;
      let width = 80;
      let height = width / selectedAspectRatio;
      
      if (height > 80) {
        height = 80;
        width = height * selectedAspectRatio;
      }

      setCrop({
        unit: "%",
        x: (100 - width) / 2,
        y: (100 - height) / 2,
        width,
        height
      });
    }
  }, [selectedAspectRatio]);

  // Rest of the ImageCropper component code remains the same...
  // (Keep all the existing handlers and JSX)

  return (
    <div className="relative w-full h-full" onContextMenu={(e) => e.preventDefault()}>
      {/* Help tooltip */}
      <div className="absolute top-4 right-4 z-10">
        <div className="bg-gray-800 rounded-lg p-4 text-sm">
          <h3 className="font-medium mb-2">Keyboard Shortcuts</h3>
          <ul className="space-y-1">
            {KEYBOARD_SHORTCUTS.filter(shortcut => 
              shortcut.isMac === undefined || shortcut.isMac === navigator.platform.toUpperCase().includes('MAC')
            ).map(({ key, action }) => (
              <li key={key} className="flex justify-between gap-4">
                <kbd className="bg-gray-700 px-2 py-0.5 rounded">{key}</kbd>
                <span className="text-gray-400">{action}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Rest of the component JSX remains the same... */}
    </div>
  );
}