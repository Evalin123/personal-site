import '../assets/styles/components/LanguageSwitcher.scss';

import { useTranslation } from 'react-i18next';

import type { Language } from '../types/i18n';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const currentLanguage = i18n.language as Language;

  const toggleLanguage = () => {
    const newLanguage: Language = currentLanguage === 'en' ? 'zh' : 'en';
    i18n.changeLanguage(newLanguage);
  };

  const getLanguageLabel = () => {
    return currentLanguage === 'en' ? t('language.switchToZh') : t('language.switchToEn');
  };

  const getLanguageFlag = () => {
    return currentLanguage === 'en' ? '🇹🇼' : '🇺🇸';
  };

  return (
    <button
      className="language-switcher"
      onClick={toggleLanguage}
      aria-label={`Switch to ${currentLanguage === 'en' ? 'Chinese' : 'English'}`}
      type="button"
    >
      <span className="language-switcher__flag" aria-hidden="true">
        {getLanguageFlag()}
      </span>
      <span className="language-switcher__text">{getLanguageLabel()}</span>
    </button>
  );
};

export default LanguageSwitcher;
