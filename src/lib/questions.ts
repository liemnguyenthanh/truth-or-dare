import { type Locale } from '@/i18n/config';
import categoriesEn from '@/i18n/locales/en/categories.json';
// Static imports - Next.js will code-split automatically
import drinkEn from '@/i18n/locales/en/questions/drink.json';
import quickEn from '@/i18n/locales/en/questions/quick.json';
import categoriesEs from '@/i18n/locales/es/categories.json';
import drinkEs from '@/i18n/locales/es/questions/drink.json';
import quickEs from '@/i18n/locales/es/questions/quick.json';
import categoriesVi from '@/i18n/locales/vi/categories.json';
import drinkVi from '@/i18n/locales/vi/questions/drink.json';
import quickVi from '@/i18n/locales/vi/questions/quick.json';

import type { Question, QuestionType } from '@/types';

export type DrinkCategory = {
  id: string;
  name: string;
  description: string;
};

type DrinkQuestion = {
  category: string;
  text: string;
};

type DefaultCategories = Array<{
  id: string;
  name: string;
  description: string;
}>;

const DRINK_DEFAULT_CATEGORIES: DefaultCategories = [
  { id: '18+', name: '18+', description: 'Questions for adults' },
  {
    id: '18+_tao_bao',
    name: 'Bold',
    description: 'More intense and bold questions',
  },
  {
    id: 'tinh_ban',
    name: 'Friendship',
    description: 'Fun questions to bond with friends',
  },
  {
    id: 'cong_so',
    name: 'Office',
    description: 'Fun office drinking questions',
  },
];

const QUICK_DEFAULT_CATEGORIES = [
  {
    id: '18',
    name: '18+',
    description: 'Questions for adults',
    icon: '💜',
    color: '#9b59b6',
  },
  {
    id: 'party',
    name: 'Party',
    description: 'Fun party questions',
    icon: '🎉',
    color: '#3498db',
  },
];

const drinkDataMap = {
  en: drinkEn,
  vi: drinkVi,
  es: drinkEs,
};

const quickDataMap = {
  en: quickEn,
  vi: quickVi,
  es: quickEs,
};

const categoriesDataMap = {
  en: categoriesEn,
  vi: categoriesVi,
  es: categoriesEs,
};

/**
 * Get drink questions for a specific locale
 * Returns empty array if no translation exists
 */
export function getDrinkQuestions(locale: Locale): DrinkQuestion[] {
  const data = drinkDataMap[locale];
  if (!data) return [];

  const questions: DrinkQuestion[] = [];

  Object.entries(data).forEach(([category, texts]) => {
    if (Array.isArray(texts)) {
      texts.forEach((text: string) => {
        if (text) {
          questions.push({ category, text });
        }
      });
    }
  });

  return questions;
}

/**
 * Get drink categories for a specific locale
 */
export function getDrinkCategories(locale: Locale): DrinkCategory[] {
  const data = categoriesDataMap[locale];
  if (!data) return DRINK_DEFAULT_CATEGORIES;

  const drinkCategories = data.drink || {};

  return DRINK_DEFAULT_CATEGORIES.map((cat) => {
    const translated = drinkCategories[cat.id as keyof typeof drinkCategories];
    return {
      id: cat.id,
      name: translated?.name || cat.name,
      description: translated?.description || cat.description,
    };
  });
}

/**
 * Get quick mode categories for a specific locale
 */
export function getQuickCategories(locale: Locale): Array<{
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}> {
  const data = categoriesDataMap[locale];
  if (!data) return QUICK_DEFAULT_CATEGORIES;

  const quickCategories = data.quick || {};

  return QUICK_DEFAULT_CATEGORIES.map((cat) => ({
    ...cat,
    name:
      (
        quickCategories as Record<
          string,
          { name?: string; description?: string }
        >
      )[cat.id]?.name || cat.name,
    description:
      (
        quickCategories as Record<
          string,
          { name?: string; description?: string }
        >
      )[cat.id]?.description || cat.description,
  }));
}

/**
 * Get quick questions for a specific category and locale
 */
export function getQuickQuestions(
  category: '18' | 'party',
  locale: Locale
): Question[] {
  const data = quickDataMap[locale];
  if (!data) return [];

  const categoryKey = category === '18' ? '18' : 'party';
  const questions = data[categoryKey] || [];

  return questions
    .filter((q: { text?: string }) => q.text)
    .map((q: { type: string; text: string; category: string; id: string }) => ({
      type: q.type as QuestionType,
      text: q.text,
      category: q.category,
      id: q.id,
    }));
}

/**
 * Get questions by category
 */
export function getQuestionsByCategory(
  type: 'drink' | 'quick',
  category: string,
  locale: Locale
): Question[] | DrinkQuestion[] {
  if (type === 'drink') {
    const questions = getDrinkQuestions(locale);
    return questions.filter((q) => q.category === category);
  } else {
    const questions = getQuickQuestions(category as '18' | 'party', locale);
    return questions.filter((q) => q.category === category);
  }
}
