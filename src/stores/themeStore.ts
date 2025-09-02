import { create } from 'zustand';

import type { Theme } from '../types/theme';
import {
  applyThemeToDocument,
  createSystemThemeListener,
  getInitialTheme,
  setStorageTheme,
} from '../utils/theme';

type ThemeStore = {
  theme: Theme;
  isUserPreference: boolean;
  setTheme: (theme: Theme) => void;
  initializeSystemThemeListener: () => void;
  cleanup: (() => void) | null;
};

const initialThemeData = getInitialTheme();

export const useThemeStore = create<ThemeStore>((set, get) => ({
  theme: initialThemeData.theme,
  isUserPreference: initialThemeData.isUserPreference,
  cleanup: null,

  setTheme: (theme: Theme) => {
    set({ theme, isUserPreference: true });
    setStorageTheme(theme, true); // Mark as user choice
    applyThemeToDocument(theme);
  },

  initializeSystemThemeListener: () => {
    const store = get();

    // Clean up existing listener
    if (store.cleanup) {
      store.cleanup();
    }

    // Create new listener
    const cleanup = createSystemThemeListener((systemTheme: Theme) => {
      const currentState = get();

      // Only follow system theme if user hasn't manually set a preference
      if (!currentState.isUserPreference) {
        set({ theme: systemTheme });
        setStorageTheme(systemTheme, false); // Not a user choice
        applyThemeToDocument(systemTheme);
      }
    });

    set({ cleanup });
  },
}));

// Initialize theme and listener on app load
const themeStore = useThemeStore.getState();
applyThemeToDocument(themeStore.theme);

// Set up system theme listener if user hasn't set a preference
if (!themeStore.isUserPreference) {
  themeStore.initializeSystemThemeListener();
}
