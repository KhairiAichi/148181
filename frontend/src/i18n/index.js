import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import frTranslations from './i18n/fr/all.json';
import enTranslations from './i18n/en/all.json';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      fr: { translation: frTranslations },
      en: { translation: enTranslations },
    },
    lng: 'fr',
    fallbackLng: 'en',
    interpolation: { escapeValue: false },
  });

export default i18n;
