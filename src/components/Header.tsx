import '../assets/styles/components/Header.scss';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { useThemeStore } from '../stores/themeStore';
import LanguageSwitcher from './LanguageSwitcher';

const Header = () => {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__content">
          <Link to="/" className="header__logo">
            Eva
          </Link>

          {/* Desktop navigation */}
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
              <li className="header__nav-item">
                <Link
                  to="/articles"
                  className={`header__nav-link ${isActive('/articles') ? 'header__nav-link--active' : ''}`}
                  aria-current={isActive('/articles') ? 'page' : undefined}
                >
                  {t('navigation.articles')}
                </Link>
              </li>
            </ul>
          </nav>

          <div className="header__controls">
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

          {/* Mobile menu button */}
          <button
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-label={isMobileMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
            aria-expanded={isMobileMenuOpen}
            type="button"
          >
            <span
              className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </button>
        </div>

        {/* Mobile navigation overlay */}
        {isMobileMenuOpen && (
          <div className="header__mobile-overlay">
            {/* Mobile navigation */}
            <nav
              className="header__nav header__nav--mobile"
              role="navigation"
              aria-label="Mobile navigation"
            >
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
                <li className="header__nav-item">
                  <Link
                    to="/articles"
                    className={`header__nav-link ${isActive('/articles') ? 'header__nav-link--active' : ''}`}
                    aria-current={isActive('/articles') ? 'page' : undefined}
                  >
                    {t('navigation.articles')}
                  </Link>
                </li>
              </ul>

              {/* Mobile controls - vertically stacked */}
              <div className="header__mobile-controls">
                <button
                  className="header__theme-toggle"
                  onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                  aria-label={
                    theme === 'light' ? t('theme.switchToDark') : t('theme.switchToLight')
                  }
                  type="button"
                >
                  {theme === 'light' ? '🌙' : '☀️'}
                </button>
                <LanguageSwitcher />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
