import { EighteenQuestions } from '@/data/questions/18';
// Import existing question data as fallback
import {
  type DrinkCategoryId,
  type DrinkQuestion,
  DRINK_CATEGORIES,
  DRINK_QUESTIONS,
} from '@/data/questions/drink';
import { PartyQuestions } from '@/data/questions/party';

import { type Locale } from '@/i18n/config';
import categoriesEn from '@/i18n/locales/en/categories.json';
import drinkQuestionsEn from '@/i18n/locales/en/questions/drink.json';
import quickQuestionsEn from '@/i18n/locales/en/questions/quick.json';
import categoriesVi from '@/i18n/locales/vi/categories.json';
// Import translations
import drinkQuestionsVi from '@/i18n/locales/vi/questions/drink.json';
import quickQuestionsVi from '@/i18n/locales/vi/questions/quick.json';

import type { Question } from '@/types';

// Type for drink category
export type DrinkCategory = {
  id: DrinkCategoryId;
  name: string;
  description: string;
};

// Type for question loaders
export type QuestionLoader<T> = (locale: Locale) => T[];

/**
 * Load drink questions with locale support
 */
export function getDrinkQuestions(locale: Locale): DrinkQuestion[] {
  const questionsData = locale === 'en' ? drinkQuestionsEn : drinkQuestionsVi;
  const fallbackData = locale === 'en' ? drinkQuestionsVi : drinkQuestionsEn;
  const questions: DrinkQuestion[] = [];

  // Convert JSON structure to DrinkQuestion array
  Object.entries(questionsData).forEach(([category, texts]) => {
    if (Array.isArray(texts)) {
      const fallbackTexts = (fallbackData as any)[category] as
        | string[]
        | undefined;

      texts.forEach(
        (text: string | { vi?: string; en?: string }, index: number) => {
          const questionText =
            typeof text === 'string'
              ? text
              : (text as any).vi || (text as any).en || '';

          // If English text is empty, use Vietnamese fallback
          if (
            locale === 'en' &&
            !questionText &&
            fallbackTexts &&
            fallbackTexts[index]
          ) {
            const fallbackText =
              typeof fallbackTexts[index] === 'string'
                ? fallbackTexts[index]
                : (fallbackTexts[index] as any)?.vi || '';
            if (fallbackText) {
              questions.push({
                category,
                text: fallbackText,
              });
            }
          } else if (questionText) {
            questions.push({
              category,
              text: questionText,
            });
          }
        }
      );
    }
  });

  // Fallback to Vietnamese if no questions loaded
  return questions.length > 0 ? questions : DRINK_QUESTIONS;
}

/**
 * Get drink categories with locale support
 */
export function getDrinkCategories(locale: Locale): DrinkCategory[] {
  const categoriesData = locale === 'en' ? categoriesEn : categoriesVi;
  const drinkCategories = categoriesData.drink || {};

  return DRINK_CATEGORIES.map((cat) => {
    const translated = drinkCategories[cat.id];
    return {
      id: cat.id,
      name: translated?.name || cat.name,
      description: translated?.description || cat.description,
    };
  });
}

/**
 * Get quick mode categories (18+ and Party) with locale support
 */
export function getQuickCategories(locale: Locale): Array<{
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
}> {
  const categoriesData = locale === 'en' ? categoriesEn : categoriesVi;
  const quickCategories = categoriesData.quick || {};

  const baseCategories = [
    {
      id: '18',
      name: '18+',
      description: 'Câu hỏi dành cho người lớn',
      icon: '💜',
      color: '#9b59b6',
    },
    {
      id: 'party',
      name: 'Party',
      description: 'Câu hỏi vui nhộn cho bữa tiệc',
      icon: '🎉',
      color: '#3498db',
    },
  ];

  return baseCategories.map((cat) => {
    const translated = (quickCategories as any)[cat.id];
    return {
      ...cat,
      name: translated?.name || cat.name,
      description: translated?.description || cat.description,
    };
  });
}

/**
 * Load quick mode questions (18+ and Party)
 */
export function getQuickQuestions(
  category: '18' | 'party',
  locale: Locale
): Question[] {
  const questionsData = locale === 'en' ? quickQuestionsEn : quickQuestionsVi;
  const fallbackData = locale === 'en' ? quickQuestionsVi : quickQuestionsEn;
  const categoryKey = category === '18' ? '18' : 'party';
  const questions = questionsData[categoryKey] || [];
  const fallbackQuestions = fallbackData[categoryKey] || [];

  // Convert JSON structure to Question array
  const result: Question[] = questions
    .map((q: any, index: number) => {
      const text =
        typeof q.text === 'string'
          ? q.text
          : (q.text as any)?.vi || (q.text as any)?.en || '';
      const fallbackQ = fallbackQuestions[index] as any;

      // If English text is empty, use Vietnamese fallback
      let finalText = text;
      if (locale === 'en' && !text && fallbackQ) {
        const fallbackText =
          typeof fallbackQ.text === 'string'
            ? fallbackQ.text
            : (fallbackQ.text as any)?.vi || (fallbackQ.text as any)?.en || '';
        finalText = fallbackText || '';
      }

      return {
        type: q.type,
        text: finalText || '',
        category: q.category,
        id: q.id,
      };
    })
    .filter((q) => q.text); // Filter out questions with empty text

  // Fallback to Vietnamese if no questions loaded
  if (result.length === 0) {
    switch (category) {
      case '18':
        return EighteenQuestions;
      case 'party':
        return PartyQuestions;
      default:
        return [];
    }
  }

  return result;
}

/**
 * Get all questions for a specific category
 */
export function getQuestionsByCategory(
  type: 'drink' | 'quick',
  category: string,
  locale: Locale
): (DrinkQuestion | Question)[] {
  if (type === 'drink') {
    const questions = getDrinkQuestions(locale);
    return questions.filter((q) => q.category === category);
  } else {
    const questions = getQuickQuestions(category as '18' | 'party', locale);
    return questions.filter((q) => q.category === category);
  }
}
