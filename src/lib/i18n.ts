import type { TranslationKey, TranslationParams } from '@/i18n/types';

/**
 * Get translation from a loaded translations object
 * This is the synchronous version used in client components
 */
export function getTranslationSync(
  translations: any,
  key: TranslationKey,
  params?: TranslationParams
): string {
  const keys = key.split('.');
  let value: any = translations;

  for (const k of keys) {
    value = value?.[k];
    if (value === undefined) return key;
  }

  if (typeof value !== 'string') {
    return key;
  }

  if (params) {
    return value.replace(/\{\{(\w+)\}\}/g, (match, paramKey) => {
      return params[paramKey]?.toString() || match;
    });
  }

  return value;
}

/**
 * Get translation from multiple namespaces
 * Searches through namespaces in order until key is found
 */
export function getTranslationFromNamespaces(
  translations: Record<string, any>,
  key: TranslationKey,
  namespaces: string[],
  params?: TranslationParams
): string {
  for (const namespace of namespaces) {
    const namespaceTranslations = translations[namespace];
    if (namespaceTranslations) {
      const value = getTranslationSync(namespaceTranslations, key, params);
      if (value !== key) {
        return value;
      }
    }
  }
  return key;
}
