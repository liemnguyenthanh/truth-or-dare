// Note: Server-side imports removed for App Router compatibility

// Import all translation files
import enTranslations from '@/locales/en.json';
import esTranslations from '@/locales/es.json';
import viTranslations from '@/locales/vi.json';

export type Locale =
  | 'vi'
  | 'en'
  | 'es'
  | 'fr'
  | 'de'
  | 'pt'
  | 'ja'
  | 'ko'
  | 'zh';

export const locales: Locale[] = [
  'vi',
  'en',
  'es',
  'fr',
  'de',
  'pt',
  'ja',
  'ko',
  'zh',
];

export const defaultLocale: Locale = 'vi';

// Translation files mapping
const translations = {
  vi: viTranslations,
  en: enTranslations,
  es: esTranslations,
  // Add more languages as you create them
  fr: enTranslations, // Fallback to English for now
  de: enTranslations,
  pt: enTranslations,
  ja: enTranslations,
  ko: enTranslations,
  zh: enTranslations,
};

export type TranslationKeys = typeof viTranslations;

// Get translations for a specific locale
export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] || translations[defaultLocale];
}

// Note: For client-side components, use the useTranslations hook from @/hooks/useTranslations

// Note: Static generation functions removed for App Router compatibility

// Language metadata for SEO
export const languageMetadata = {
  vi: {
    name: 'Tiếng Việt',
    nativeName: 'Tiếng Việt',
    code: 'vi',
    hreflang: 'vi-VN',
    direction: 'ltr',
  },
  en: {
    name: 'English',
    nativeName: 'English',
    code: 'en',
    hreflang: 'en-US',
    direction: 'ltr',
  },
  es: {
    name: 'Spanish',
    nativeName: 'Español',
    code: 'es',
    hreflang: 'es-ES',
    direction: 'ltr',
  },
  fr: {
    name: 'French',
    nativeName: 'Français',
    code: 'fr',
    hreflang: 'fr-FR',
    direction: 'ltr',
  },
  de: {
    name: 'German',
    nativeName: 'Deutsch',
    code: 'de',
    hreflang: 'de-DE',
    direction: 'ltr',
  },
  pt: {
    name: 'Portuguese',
    nativeName: 'Português',
    code: 'pt',
    hreflang: 'pt-BR',
    direction: 'ltr',
  },
  ja: {
    name: 'Japanese',
    nativeName: '日本語',
    code: 'ja',
    hreflang: 'ja-JP',
    direction: 'ltr',
  },
  ko: {
    name: 'Korean',
    nativeName: '한국어',
    code: 'ko',
    hreflang: 'ko-KR',
    direction: 'ltr',
  },
  zh: {
    name: 'Chinese',
    nativeName: '中文',
    code: 'zh',
    hreflang: 'zh-CN',
    direction: 'ltr',
  },
};

// Get language info
export function getLanguageInfo(locale: Locale) {
  return languageMetadata[locale] || languageMetadata[defaultLocale];
}

// Generate hreflang tags for SEO
export function generateHreflangTags(currentPath: string) {
  const baseUrl = 'https://www.truthordaregame.xyz';

  return locales.map((locale) => ({
    rel: 'alternate',
    hrefLang: languageMetadata[locale].hreflang,
    href: `${baseUrl}/${locale}${currentPath}`,
  }));
}
