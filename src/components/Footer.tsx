import '@/assets/styles/components/Footer.scss';

import { useTranslation } from 'react-i18next';

import MailIcon from './shared/icons/MailIcon';

export default function Footer() {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div>{t('footer.copyright', { year: currentYear })}</div>
      <div className="footer__icons">
        <a
          className="footer__icon"
          href="mailto:evalin8@gmail.com"
          aria-label={t('footer.links.email')}
        >
          <MailIcon size={16} />
        </a>
      </div>
    </footer>
  );
}
