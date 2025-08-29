import '../assets/styles/components/Header.scss';

import { Link, useLocation } from 'react-router-dom';

import { useTheme } from '../lib/useTheme';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
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
                  Home
                </Link>
              </li>
              <li className="header__nav-item">
                <Link
                  to="/about"
                  className={`header__nav-link ${isActive('/about') ? 'header__nav-link--active' : ''}`}
                  aria-current={isActive('/about') ? 'page' : undefined}
                >
                  About
                </Link>
              </li>
            </ul>
          </nav>

          <button
            className="header__theme-toggle"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            type="button"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
