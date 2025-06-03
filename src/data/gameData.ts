import { EighteenQuestions } from './questions/18';
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

export const defaultQuestions: Question[] = [
  ...EighteenQuestions,
  ...PartyQuestions,
];
