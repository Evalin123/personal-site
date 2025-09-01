import '../assets/styles/components/Header.scss';

import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { useThemeStore } from '../stores/themeStore';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const { t } = useTranslation();
  const location = useLocation();

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            Eva
          </Link>

          <nav className="header__nav" role="navigation" aria-label="Main navigation">
            <ul className="header__nav-list">
              <li className="header__nav-item">
                <Link
                  to="/"
                  className={`header__nav-link ${isActive('/') ? 'header__nav-link--active' : ''}`}
                  aria-current={isActive('/') ? 'page' : undefined}
                >
                  {t('navigation.home')}
                </Link>
              </li>
              <li className="header__nav-item">
                <Link
                  to="/about"
                  className={`header__nav-link ${isActive('/about') ? 'header__nav-link--active' : ''}`}
                  aria-current={isActive('/about') ? 'page' : undefined}
                >
                  {t('navigation.about')}
                </Link>
              </li>
              <li className="header__nav-item">
                <Link
                  to="/projects"
                  className={`header__nav-link ${isActive('/projects') ? 'header__nav-link--active' : ''}`}
                  aria-current={isActive('/projects') ? 'page' : undefined}
                >
                  {t('navigation.projects')}
                </Link>
              </li>
            </ul>
          </nav>

          <div>
            <button
              className="header__theme-toggle"
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              aria-label={theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight')}
              type="button"
            >
              {theme === 'light' ? '🌙' : '☀️'}
            </button>

            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
