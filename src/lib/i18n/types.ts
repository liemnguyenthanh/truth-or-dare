import type { TranslationNamespace } from './loader';

// Type for translation parameters
export type TranslationParams = Record<string, string | number>;

// Base translation structure
export interface Translations {
  [key: string]: string | Translations;
}

// Type helper to extract keys from a nested object
type NestedKeys<T> = T extends object
  ? {
      [K in keyof T]: K extends string
        ? T[K] extends object
          ? `${K}.${NestedKeys<T[K]>}`
          : K
        : never;
    }[keyof T]
  : never;

// Import translation types (we'll generate these from actual JSON files)
// For now, we use a generic approach
export type TranslationKey = string;

// Type for translation function
export type TranslationFunction = (
  key: TranslationKey,
  params?: TranslationParams
) => string;

// Type for loaded translations
export type LoadedTranslations = Partial<
  Record<TranslationNamespace, Translations>
>;
