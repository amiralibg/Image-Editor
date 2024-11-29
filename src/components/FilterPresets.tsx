import { useRef } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { PresetFilter, FilterSettings } from "../types";

interface FilterPresetsProps {
  activePreset: PresetFilter | null;
  onSelect: (preset: PresetFilter) => void;
  currentFilters: FilterSettings;
}

const presets: PresetFilter[] = [
  { 
    name: "None", 
    filter: "none",
    settings: {
      brightness: 100,
      contrast: 100,
      saturation: 100,
      blur: 0,
      sharpness: 0
    }
  },
  
  // Black & White Variations
  { 
    name: "B&W Classic", 
    filter: "grayscale(100%)",
    settings: {
      brightness: 100,
      contrast: 100,
      saturation: 0,
      blur: 0,
      sharpness: 10
    }
  },
  { 
    name: "B&W High Contrast", 
    filter: "grayscale(100%)",
    settings: {
      brightness: 90,
      contrast: 150,
      saturation: 0,
      blur: 0,
      sharpness: 20
    }
  },
  
  // Sepia & Vintage
  { 
    name: "Sepia", 
    filter: "sepia(100%)",
    settings: {
      brightness: 105,
      contrast: 110,
      saturation: 90,
      blur: 0,
      sharpness: 5
    }
  },
  
  // Color Modifications
  { 
    name: "Cool", 
    filter: "hue-rotate(30deg)",
    settings: {
      brightness: 100,
      contrast: 110,
      saturation: 150,
      blur: 0,
      sharpness: 10
    }
  },
  { 
    name: "Warm", 
    filter: "hue-rotate(-30deg)",
    settings: {
      brightness: 105,
      contrast: 110,
      saturation: 150,
      blur: 0,
      sharpness: 10
    }
  },
  
  // Dramatic Effects
  { 
    name: "High Contrast", 
    filter: "",
    settings: {
      brightness: 90,
      contrast: 150,
      saturation: 120,
      blur: 0,
      sharpness: 30
    }
  },
  
  // Soft Effects
  { 
    name: "Dreamy", 
    filter: "",
    settings: {
      brightness: 105,
      contrast: 95,
      saturation: 95,
      blur: 0.5,
      sharpness: -10
    }
  }
];

const PREVIEW_IMAGE =
  "https://images.unsplash.com/photo-1490730141103-6cac27aaab94?w=200&h=200&fit=crop&q=80";

export default function FilterPresets({
  activePreset,
  onSelect,
  currentFilters
}: FilterPresetsProps) {
  const sliderRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (sliderRef.current) {
      const scrollAmount = 200;
      sliderRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const getFilterStyle = (preset: PresetFilter) => {
    const settings = preset.settings || currentFilters;
    return `${preset.filter} brightness(${settings.brightness}%) contrast(${settings.contrast}%) saturate(${settings.saturation}%) blur(${settings.blur}px)`;
  };

  return (
    <div className="relative group">
      <div
        ref={sliderRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {presets.map((preset) => (
          <motion.button
            key={preset.name}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(preset)}
            className={`flex-shrink-0 focus:outline-none ${
              activePreset?.name === preset.name 
                ? "ring-2 ring-blue-500" 
                : "hover:ring-1 hover:ring-blue-300"
            }`}
          >
            <div className="w-24 space-y-2">
              <div className="relative rounded-lg overflow-hidden aspect-square shadow-sm">
                <img
                  src={PREVIEW_IMAGE}
                  alt={preset.name}
                  className="w-full h-full object-cover"
                  style={{ filter: getFilterStyle(preset) }}
                />
                {activePreset?.name === preset.name && (
                  <div className="absolute inset-0 bg-blue-500 bg-opacity-20" />
                )}
              </div>
              <p
                className={`text-xs text-center font-medium truncate px-1 ${
                  activePreset?.name === preset.name
                    ? "text-blue-500"
                    : "text-gray-300"
                }`}
              >
                {preset.name}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <button
        onClick={() => scroll("left")}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Scroll left"
      >
        <ChevronLeft className="w-6 h-6 text-white bg-gray-900 bg-opacity-50 rounded-full p-1" />
      </button>
      <button
        onClick={() => scroll("right")}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 opacity-0 group-hover:opacity-100 transition-opacity"
        aria-label="Scroll right"
      >
        <ChevronRight className="w-6 h-6 text-white bg-gray-900 bg-opacity-50 rounded-full p-1" />
      </button>
    </div>
  );
}