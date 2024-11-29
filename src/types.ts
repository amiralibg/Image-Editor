export interface FilterSettings {
  brightness: number;
  contrast: number;
  saturation: number;
  blur: number;
  backgroundColor: string;
  sharpness: number;
}

export interface PresetFilter {
  name: string;
  filter: string;
  settings?: Partial<FilterSettings>;
}

export interface ImageDimensions {
  width: number;
  height: number;
}

export interface ImageTab {
  id: string;
  name: string;
  image: string | null;
  originalImage: string | null;
  filters: FilterSettings;
  activePreset: PresetFilter | null;
  dimensions: ImageDimensions;
  originalDimensions: ImageDimensions;
  isCropping: boolean;
}

export interface KeyboardShortcut {
  key: string;
  action: string;
  isMac?: boolean;
}