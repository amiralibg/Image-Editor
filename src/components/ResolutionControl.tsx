import React from 'react';
import { ArrowUpCircle, Maximize2 } from 'lucide-react';
import { ImageDimensions } from '../types';

interface ResolutionControlProps {
  dimensions: ImageDimensions;
  setDimensions: (dimensions: ImageDimensions) => void;
  originalDimensions: ImageDimensions;
  maintainAspectRatio: boolean;
  setMaintainAspectRatio: (maintain: boolean) => void;
}

export default function ResolutionControl({
  dimensions,
  setDimensions,
  originalDimensions,
  maintainAspectRatio,
  setMaintainAspectRatio
}: ResolutionControlProps) {
  const handleDimensionChange = (dimension: 'width' | 'height', value: number) => {
    if (maintainAspectRatio) {
      const aspectRatio = originalDimensions.width / originalDimensions.height;
      if (dimension === 'width') {
        setDimensions({
          width: value,
          height: Math.round(value / aspectRatio)
        });
      } else {
        setDimensions({
          width: Math.round(value * aspectRatio),
          height: value
        });
      }
    } else {
      setDimensions(prev => ({
        ...prev,
        [dimension]: value
      }));
    }
  };

  const increaseResolution = () => {
    const scale = 1.5;
    setDimensions({
      width: Math.round(dimensions.width * scale),
      height: Math.round(dimensions.height * scale)
    });
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium flex items-center gap-2">
        <Maximize2 className="w-4 h-4" />
        Resolution Control
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs text-gray-400">Width (px)</label>
          <input
            type="number"
            value={dimensions.width}
            onChange={(e) => handleDimensionChange('width', Number(e.target.value))}
            className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
          />
        </div>
        <div>
          <label className="text-xs text-gray-400">Height (px)</label>
          <input
            type="number"
            value={dimensions.height}
            onChange={(e) => handleDimensionChange('height', Number(e.target.value))}
            className="w-full bg-gray-700 rounded px-2 py-1 text-sm"
          />
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="aspectRatio"
            checked={maintainAspectRatio}
            onChange={(e) => setMaintainAspectRatio(e.target.checked)}
            className="rounded text-blue-500"
          />
          <label htmlFor="aspectRatio" className="text-sm text-gray-400">
            Maintain aspect ratio
          </label>
        </div>
        <button
          onClick={increaseResolution}
          className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300"
          title="Increase resolution by 1.5x"
        >
          <ArrowUpCircle className="w-4 h-4" />
          Upscale
        </button>
      </div>
    </div>
  );
}