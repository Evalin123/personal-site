import '../assets/styles/components/Footer.scss';

import { useTranslation } from 'react-i18next';

const Footer = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__content">
          <div className="footer__info">
            <p className="footer__copyright">{t('footer.copyright', { year: currentYear })}</p>
          </div>

          <div className="footer__links">
            <a
              href="https://github.com"
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
            >
              {t('footer.links.github')}
            </a>
            <a
              href="https://linkedin.com"
              className="footer__link"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
            >
              {t('footer.links.linkedin')}
            </a>
            <a href="mailto:evalin8@gmail.com" className="footer__link" aria-label="Email Contact">
              {t('footer.links.email')}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
