export const isMac = typeof window !== 'undefined' && navigator.platform.toUpperCase().indexOf('MAC') >= 0;

export const getModifierKey = () => isMac ? '⌘' : 'Ctrl';

export const KEYBOARD_SHORTCUTS: KeyboardShortcut[] = [
  { key: `${getModifierKey()} + Plus`, action: "Zoom in" },
  { key: `${getModifierKey()} + Minus`, action: "Zoom out" },
  { key: `${getModifierKey()} + 0`, action: "Reset view" },
  { key: `${getModifierKey()} + ←`, action: "Rotate left" },
  { key: `${getModifierKey()} + →`, action: "Rotate right" },
  { key: `${getModifierKey()} + W`, action: "Close tab", isMac: true },
  { key: "Ctrl + W", action: "Close tab", isMac: false }
];