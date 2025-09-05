import { Locale } from '@/lib/translations';

import { EighteenQuestions } from './questions/18';
import { EnglishQuestions } from './questions/en';
import { EnglishPartyQuestions } from './questions/en-party';
import { SpanishQuestions } from './questions/es';
import { SpanishPartyQuestions } from './questions/es-party';
import { PartyQuestions } from './questions/party';

import { Category, Question } from '@/types';

export const defaultCategories: Category[] = [
  {
    id: '18+',
    name: '18+',
    description: 'Những câu hỏi dành cho người trên 18 tuổi',
    color: '#9b59b6',
  },
  {
    id: 'party',
    name: 'Party',
    description: 'Những câu hỏi dành cho nhóm',
    color: '#3498db',
  },
];

// Default players
export const defaultPlayers: string[] = [];

// Questions by language
export const questionsByLanguage: Record<Locale, Question[]> = {
  vi: [...EighteenQuestions, ...PartyQuestions],
  en: [...EnglishQuestions, ...EnglishPartyQuestions],
  es: [...SpanishQuestions, ...SpanishPartyQuestions],
  fr: [...EnglishQuestions, ...EnglishPartyQuestions], // Fallback to English for now
  de: [...EnglishQuestions, ...EnglishPartyQuestions],
  pt: [...EnglishQuestions, ...EnglishPartyQuestions],
  ja: [...EnglishQuestions, ...EnglishPartyQuestions],
  ko: [...EnglishQuestions, ...EnglishPartyQuestions],
  zh: [...EnglishQuestions, ...EnglishPartyQuestions],
};

export const defaultQuestions: Question[] = [
  ...EighteenQuestions,
  ...PartyQuestions,
];

// Get questions for specific language
export function getQuestionsForLanguage(locale: Locale): Question[] {
  return questionsByLanguage[locale] || questionsByLanguage.vi;
}
