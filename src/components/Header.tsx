import '../assets/styles/components/Header.scss';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useLocation } from 'react-router-dom';

import { useThemeStore } from '../stores/themeStore';
import Button from './Button';
import LanguageSwitcher from './LanguageSwitcher';

export default function Header() {
  const theme = useThemeStore((state) => state.theme);
  const setTheme = useThemeStore((state) => state.setTheme);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t } = useTranslation();

  const location = useLocation();
  const isActive = (path: string): boolean => {
    return location.pathname === path;
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="header__top-bar">
          <div className="header__window-controls" aria-hidden={true}>
            <div className="header__ctrl-btn" title="Minimize">
              _
            </div>
            <div className="header__ctrl-btn" title="Maximize">
              ▢
            </div>

            <div className="header__ctrl-btn" title="Close">
              X
            </div>
          </div>
        </div>
        <div className="header__bottom-bar">
          <div className="header__logo">
            <Link to="/" aria-current={isActive('/') ? 'page' : undefined}>
              EVA
            </Link>
          </div>
          <nav className="header__nav" aria-label="Primary Navigation">
            <Link
              to="/about"
              className="header__nav-item"
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              <span className="header__nav-underline">{t('navigation.about').charAt(0)}</span>
              {t('navigation.about').slice(1)}
            </Link>
            <Link
              to="/projects"
              className="header__nav-item"
              aria-current={isActive('/projects') ? 'page' : undefined}
            >
              <span className="header__nav-underline">{t('navigation.projects').charAt(0)}</span>
              {t('navigation.projects').slice(1)}
            </Link>
            <Link
              to="/articles"
              className="header__nav-item"
              aria-current={isActive('/articles') ? 'page' : undefined}
            >
              <span className="header__nav-underline">{t('navigation.articles').charAt(0)}</span>
              {t('navigation.articles').slice(1)}
            </Link>
          </nav>
          <div className="header__aux-actions">
            <Button
              label={theme === 'light' ? '🌙' : '☀️'}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="header__theme-button"
            />
            <div className="header__language-button">
              <LanguageSwitcher />
            </div>
          </div>

          <div
            className="header__mobile-toggle"
            onClick={toggleMobileMenu}
            aria-controls="mobile-menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span
              className={`header__hamburger ${isMobileMenuOpen ? 'header__hamburger--open' : ''}`}
            >
              <span></span>
              <span></span>
              <span></span>
            </span>
          </div>
        </div>

        <div
          className={`header__mobile-overlay ${
            isMobileMenuOpen ? 'header__mobile-overlay--open' : ''
          }`}
        >
          <nav className="header__nav header__mobile-nav" aria-label="Mobile Navigation">
            <Link
              to="/about"
              className="header__mobile-nav-item"
              aria-current={isActive('/about') ? 'page' : undefined}
            >
              {t('navigation.about')}
            </Link>
            <Link
              to="/projects"
              className="header__mobile-nav-item"
              aria-current={isActive('/projects') ? 'page' : undefined}
            >
              {t('navigation.projects')}
            </Link>
            <Link
              to="/articles"
              className="header__mobile-nav-item"
              aria-current={isActive('/articles') ? 'page' : undefined}
            >
              {t('navigation.articles')}
            </Link>
          </nav>
          <div className="header__divider" />
          <div className="header__mobile-actions">
            <Button
              label={theme === 'light' ? '🌙 Dark Mode' : '☀️ Light Mode'}
              onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
              className="header__theme-button"
            />
            <div className="header__language-button">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
