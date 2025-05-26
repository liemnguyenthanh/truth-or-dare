import { EighteenQuestions } from './18';
import { Category, Question } from '../types/game';

export const defaultCategories: Category[] = [
  {
    id: 'friends',
    name: 'Bạn Bè',
    description: 'Những câu hỏi dành cho bạn bè thân thiết',
    color: '#2ecc71',
  },
  {
    id: '18+',
    name: '18+',
    description: 'Những câu hỏi dành cho người trên 18 tuổi',
    color: '#9b59b6',
  },
];

// Default players
export const defaultPlayers: string[] = [];

export const defaultQuestions: Question[] = [...EighteenQuestions];
