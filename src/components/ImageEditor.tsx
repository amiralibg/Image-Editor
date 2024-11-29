import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import { ImageDown } from "lucide-react";
import { nanoid } from 'nanoid';
import ImagePreview from "./ImagePreview";
import FilterPanel from "./FilterPanel";
import TabBar from "./TabBar";
import { FilterSettings, PresetFilter, ImageDimensions, ImageTab } from "../types";

const DEFAULT_FILTERS: FilterSettings = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  blur: 0,
  backgroundColor: "#ffffff",
  sharpness: 0
};

export default function ImageEditor() {
  const [tabs, setTabs] = useState<ImageTab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string | null>(null);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  const createNewTab = (image?: string) => {
    const newTab: ImageTab = {
      id: nanoid(),
      name: `Image ${tabs.length + 1}`,
      image: image || null,
      originalImage: image || null,
      filters: { ...DEFAULT_FILTERS },
      activePreset: null,
      dimensions: { width: 0, height: 0 },
      originalDimensions: { width: 0, height: 0 },
      isCropping: false
    };

    setTabs(prev => [...prev, newTab]);
    setActiveTabId(newTab.id);

    if (image) {
      const img = new Image();
      img.onload = () => {
        updateTab({
          dimensions: { width: img.width, height: img.height },
          originalDimensions: { width: img.width, height: img.height }
        });
      };
      img.src = image;
    }

    return newTab.id;
  };

  const updateTab = (updates: Partial<ImageTab>) => {
    if (!activeTabId) return;

    setTabs(prev => prev.map(tab => 
      tab.id === activeTabId ? { ...tab, ...updates } : tab
    ));
  };

  const closeTab = (tabId: string) => {
    setTabs(prev => prev.filter(tab => tab.id !== tabId));
    if (activeTabId === tabId) {
      const remainingTabs = tabs.filter(tab => tab.id !== tabId);
      setActiveTabId(remainingTabs.length > 0 ? remainingTabs[remainingTabs.length - 1].id : null);
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageDataUrl = reader.result as string;
        if (!activeTabId || activeTab?.image) {
          createNewTab(imageDataUrl);
        } else {
          const img = new Image();
          img.onload = () => {
            updateTab({
              image: imageDataUrl,
              originalImage: imageDataUrl,
              dimensions: { width: img.width, height: img.height },
              originalDimensions: { width: img.width, height: img.height }
            });
          };
          img.src = imageDataUrl;
        }
      };
      reader.readAsDataURL(file);
    }
  }, [activeTabId, activeTab]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  });

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'w') {
        e.preventDefault();
        if (activeTabId) {
          closeTab(activeTabId);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [activeTabId]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center gap-2">
            <ImageDown className="w-8 h-8" />
            Sleek Image Editor
          </h1>
          <p className="text-gray-400">
            Transform your images with powerful editing tools
          </p>
        </motion.div>

        <AnimatePresence>
          {tabs.length > 0 && (
            <TabBar
              tabs={tabs}
              activeTabId={activeTabId}
              onTabClick={setActiveTabId}
              onTabClose={closeTab}
              onNewTab={() => createNewTab()}
            />
          )}
        </AnimatePresence>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ImagePreview
              tab={activeTab}
              updateTab={updateTab}
              dropzoneProps={{
                getRootProps,
                getInputProps,
                isDragActive
              }}
            />
          </div>

          {activeTab && (
            <FilterPanel
              tab={activeTab}
              updateTab={updateTab}
              onClose={() => closeTab(activeTab.id)}
            />
          )}
        </div>
      </div>
    </div>
  );
}