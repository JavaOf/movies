import i18 from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import ru from './shared/i18n/locales/ru/ru.json';
import en from './shared/i18n/locales/en/en.json';

i18
  .use(HttpBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    debug: true,
    ns: ['translation'],
    defaultNS: 'translation',
    resources: {
      en: { translation: en },
      ru: { translation: ru },
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'], // 💡 сохраняем язык
    },
    interpolation: {
      escapeValue: false,
    },
  });


export default i18;