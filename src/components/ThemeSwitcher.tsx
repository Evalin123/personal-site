import '@/assets/styles/components/ThemeSwitcher.scss';

import { useThemeStore } from '../stores/themeStore';
import MoonIcon from './shared/icons/MoonIcon';
import SunIcon from './shared/icons/SunIcon';

const ThemeSwitcher = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  return (
    <button
      className="theme-switcher"
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      type="button"
    >
      <span className="theme-switcher__icon" aria-hidden="true">
        {theme === 'light' ? <SunIcon size={16} /> : <MoonIcon size={16} />}
      </span>
    </button>
  );
};

export default ThemeSwitcher;
