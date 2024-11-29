// Add Wand icon import
import {
  Sliders,
  Download,
  Palette,
  RotateCcw,
  Contrast,
  SunMedium,
  ImageIcon,
  Crop,
  RefreshCw,
  Wand
} from 'lucide-react';

// ... (keep existing imports)

// Update the handleFilterChange function in FilterPanel component
const handleFilterChange = (name: keyof FilterSettings, value: number | string) => {
  const newFilters = { ...tab.filters, [name]: value };
  
  // If we have an active preset, update its settings
  if (tab.activePreset) {
    const updatedPreset = {
      ...tab.activePreset,
      settings: {
        ...tab.activePreset.settings,
        [name]: value
      }
    };
    updateTab({
      filters: newFilters,
      activePreset: updatedPreset
    });
  } else {
    updateTab({
      filters: newFilters
    });
  }
};

// Add this section in the filters controls area, before the blur control
<div>
  <label className="flex items-center gap-2 text-sm mb-2">
    <Wand className="w-4 h-4" />
    Sharpness
  </label>
  <input
    type="range"
    min="-50"
    max="50"
    value={tab.filters.sharpness}
    onChange={(e) => handleFilterChange('sharpness', Number(e.target.value))}
    className="w-full accent-blue-500"
  />
</div>

// Update the FilterPresets component usage
<FilterPresets
  activePreset={tab.activePreset}
  onSelect={(preset) => {
    // Apply preset settings if available, otherwise keep current settings
    const newFilters = preset.settings
      ? { ...tab.filters, ...preset.settings }
      : tab.filters;
    
    updateTab({
      activePreset: preset,
      filters: newFilters
    });
  }}
  currentFilters={tab.filters}
/>

// Update the getCurrentFilter function in ImagePreview component
const getCurrentFilter = () => {
  if (!tab) return '';
  
  const filters = tab.filters;
  const baseFilter = tab.activePreset?.filter || '';
  
  // Combine preset filter with current settings
  return `${baseFilter} brightness(${filters.brightness}%) contrast(${filters.contrast}%) saturate(${filters.saturation}%) blur(${filters.blur}px) ${
    filters.sharpness !== 0 ? `contrast(${100 + Math.abs(filters.sharpness)}%) brightness(${100 + Math.abs(filters.sharpness)}%)` : ''
  }`.trim();
};