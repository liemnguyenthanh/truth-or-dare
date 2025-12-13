import { type Locale, defaultLocale } from '@/i18n/config';

// Define all available translation namespaces
export type TranslationNamespace =
  | 'common'
  | 'pages'
  | 'gameModes'
  | 'categories'
  | 'questions/drink'
  | 'questions/quick'
  | 'seo';

// Cache for loaded translations
const translationCache: Record<
  Locale,
  Partial<Record<TranslationNamespace, any>>
> = {
  vi: {},
  en: {},
};

/**
 * Load translations for a specific locale and namespaces
 * Uses caching to avoid reloading the same translations
 */
export async function loadTranslations(
  locale: Locale,
  namespaces: TranslationNamespace[]
): Promise<Record<TranslationNamespace, any>> {
  const cached = translationCache[locale];
  const result: Record<string, any> = {};

  // Load all requested namespaces
  await Promise.all(
    namespaces.map(async (namespace) => {
      // Check cache first
      if (cached[namespace]) {
        result[namespace] = cached[namespace];
        return;
      }

      try {
        // Dynamic import based on namespace
        const translationModule = await import(
          `@/i18n/locales/${locale}/${namespace}.json`
        );
        const translations = translationModule.default || translationModule;
        cached[namespace] = translations;
        result[namespace] = translations;
      } catch (error) {
        console.warn(
          `Failed to load translations for ${locale}/${namespace}:`,
          error
        );

        // Fallback to default locale if not already using it
        if (locale !== defaultLocale) {
          try {
            const fallbackTranslationModule = await import(
              `@/i18n/locales/${defaultLocale}/${namespace}.json`
            );
            const fallbackTranslations =
              fallbackTranslationModule.default || fallbackTranslationModule;
            cached[namespace] = fallbackTranslations;
            result[namespace] = fallbackTranslations;
          } catch (fallbackError) {
            console.error(
              `Failed to load fallback translations for ${defaultLocale}/${namespace}:`,
              fallbackError
            );
            result[namespace] = {};
          }
        } else {
          result[namespace] = {};
        }
      }
    })
  );

  return result as Record<TranslationNamespace, any>;
}

/**
 * Preload translations for a locale (useful for SSR or prefetching)
 */
export async function preloadTranslations(
  locale: Locale,
  namespaces: TranslationNamespace[]
): Promise<void> {
  await loadTranslations(locale, namespaces);
}

/**
 * Clear translation cache (useful for testing or hot reloading)
 */
export function clearTranslationCache(locale?: Locale): void {
  if (locale) {
    translationCache[locale] = {};
  } else {
    Object.keys(translationCache).forEach((key) => {
      translationCache[key as Locale] = {};
    });
  }
}
