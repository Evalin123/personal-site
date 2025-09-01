export type Language = 'en' | 'zh';

export type LanguageContextType = {
  language: Language;
  changeLanguage: (lng: Language) => void;
};
