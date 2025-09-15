import type { Theme } from '../types/theme';

const THEME_STORAGE_KEY = 'personal-site-theme';
const USER_PREFERENCE_KEY = 'personal-site-user-preference';

// Internal helper functions
const getSystemTheme = (): Theme => {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

const hasUserPreference = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(USER_PREFERENCE_KEY) === 'true';
};

const setUserPreference = (hasPreference: boolean): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(USER_PREFERENCE_KEY, hasPreference.toString());
};

// Exported functions
export const getInitialTheme = (): {
  theme: Theme;
  isUserPreference: boolean;
} => {
  if (typeof window === 'undefined') return { theme: 'light', isUserPreference: false };

  const userHasPreference = hasUserPreference();

  if (userHasPreference) {
    // User has manually set a theme before, use stored theme
    const stored = localStorage.getItem(THEME_STORAGE_KEY);
    return {
      theme: stored === 'light' || stored === 'dark' ? stored : getSystemTheme(),
      isUserPreference: true,
    };
  } else {
    // First time visit or no user preference, use system theme
    return {
      theme: getSystemTheme(),
      isUserPreference: false,
    };
  }
};

export const setStorageTheme = (theme: Theme, isUserChoice = false): void => {
  if (typeof window === 'undefined') return;
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  if (isUserChoice) {
    setUserPreference(true);
  }
};

export const applyThemeToDocument = (theme: Theme): void => {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
};

export const createSystemThemeListener = (callback: (theme: Theme) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};

  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  const handleChange = (e: MediaQueryListEvent) => {
    const newTheme: Theme = e.matches ? 'dark' : 'light';
    callback(newTheme);
  };

  mediaQuery.addEventListener('change', handleChange);

  // Return cleanup function
  return () => {
    mediaQuery.removeEventListener('change', handleChange);
  };
};
