import { create } from 'zustand';

import type { Theme } from '../types/theme';
import { applyThemeToDocument, getStorageTheme, setStorageTheme } from '../utils/theme';

type ThemeStore = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  theme: getStorageTheme(),

  setTheme: (theme: Theme) => {
    set({ theme });
    setStorageTheme(theme);
    applyThemeToDocument(theme);
  },
}));

// Initialize theme on app load
applyThemeToDocument(useThemeStore.getState().theme);
