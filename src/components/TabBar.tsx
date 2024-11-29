import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { ImageTab } from '../types';

interface TabBarProps {
  tabs: ImageTab[];
  activeTabId: string | null;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  onNewTab: () => void;
}

export default function TabBar({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onNewTab
}: TabBarProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex items-center gap-2 mb-6 bg-gray-800 p-2 rounded-lg overflow-x-auto"
    >
      {tabs.map((tab) => (
        <motion.div
          key={tab.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer ${
            activeTabId === tab.id
              ? 'bg-blue-500 text-white'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
          onClick={() => onTabClick(tab.id)}
        >
          <span className="truncate max-w-[150px]">{tab.name}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onTabClose(tab.id);
            }}
            className="p-1 rounded-full hover:bg-gray-600"
          >
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      ))}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onNewTab}
        className="p-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600"
      >
        <Plus className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}