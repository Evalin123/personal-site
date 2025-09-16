import '@/assets/styles/components/Footer.scss';

import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>{t('footer.copyright', { year: currentYear })}</div>
      <div className="footer__icons">
        <a
          className="footer__icon"
          href="https://github.com"
          target="_blank"
          rel="noreferrer"
          aria-label={t('footer.links.github')}
        >
          <i className="fa-brands fa-github" />
        </a>
        <a
          className="footer__icon"
          href="https://linkedin.com"
          target="_blank"
          rel="noreferrer"
          aria-label={t('footer.links.linkedin')}
        >
          <i className="fa-brands fa-linkedin" />
        </a>
      </div>
    </footer>
  );
}
