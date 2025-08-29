import { useEffect, useState } from 'react';

import type { Theme, ThemeContextType } from '../types/theme';
import { applyThemeToDocument, getStoredTheme, setStoredTheme } from '../utils/theme';
import { ThemeContext } from './themeContext';

type ThemeProviderProps = {
  children: React.ReactNode;
};

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(() => getStoredTheme());

  const toggleTheme = (): void => {
    const newTheme: Theme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    setStoredTheme(newTheme);
    applyThemeToDocument(newTheme);
  };

  useEffect(() => {
    applyThemeToDocument(theme);
  }, [theme]);

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
