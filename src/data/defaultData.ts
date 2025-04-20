import { Category, Question } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const defaultCategories: Category[] = [
  {
    id: 'casual',
    name: 'Thường',
    description: 'Những câu hỏi nhẹ nhàng và vui vẻ cho mọi người',
    color: '#3498db',
  },
  {
    id: 'party',
    name: 'Tiệc Tùng',
    description: 'Những câu hỏi thú vị cho không khí tiệc tùng',
    color: '#e74c3c',
  },
  {
    id: 'friends',
    name: 'Bạn Bè',
    description: 'Những câu hỏi dành cho bạn bè thân thiết',
    color: '#2ecc71',
  },
  {
    id: 'couples',
    name: 'Cặp Đôi',
    description: 'Những câu hỏi dành cho cặp đôi hoặc người yêu',
    color: '#9b59b6',
  },
];

export const defaultQuestions: Question[] = [
  // Casual - Truth
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What is your biggest pet peeve?',
    category: 'casual',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What was the last lie you told?',
    category: 'casual',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What is your most embarrassing childhood memory?',
    category: 'casual',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What is your guilty pleasure?',
    category: 'casual',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What is the weirdest dream you\'ve ever had?',
    category: 'casual',
  },
  
  // Casual - Dare
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Do your best impression of another player.',
    category: 'casual',
  },
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Speak in an accent for the next three rounds.',
    category: 'casual',
  },
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Show the most embarrassing photo on your phone.',
    category: 'casual',
  },
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Let another player post a status on your social media.',
    category: 'casual',
  },
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Do 10 push-ups.',
    category: 'casual',
  },
  
  // Party - Truth
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What\'s the wildest thing you\'ve done at a party?',
    category: 'party',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What\'s your go-to karaoke song?',
    category: 'party',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What\'s the most embarrassing thing you\'ve done while drunk?',
    category: 'party',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What\'s your most awkward party moment?',
    category: 'party',
  },
  
  // Party - Dare
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Dance to a song chosen by the group.',
    category: 'party',
  },
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Take a selfie with everyone in the room and post it.',
    category: 'party',
  },
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Let someone draw on your face.',
    category: 'party',
  },
  
  // Friends - Truth
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What\'s something you\'ve never told anyone in this room?',
    category: 'friends',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'Who in this room would you trust with your biggest secret?',
    category: 'friends',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What do you admire most about the person to your left?',
    category: 'friends',
  },
  
  // Friends - Dare
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Swap clothes with the person opposite you for the next three rounds.',
    category: 'friends',
  },
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Let your friends go through your phone for 1 minute.',
    category: 'friends',
  },
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Text your crush or an ex something the group decides.',
    category: 'friends',
  },
  
  // Couples - Truth
  {
    id: uuidv4(),
    type: 'truth',
    text: 'When did you know you were in love with your partner?',
    category: 'couples',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What\'s one thing you\'d like to change about your relationship?',
    category: 'couples',
  },
  {
    id: uuidv4(),
    type: 'truth',
    text: 'What was your first impression of your partner?',
    category: 'couples',
  },
  
  // Couples - Dare
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Write a short poem for your partner and read it aloud.',
    category: 'couples',
  },
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Do your best impression of how your partner acts when they\'re upset.',
    category: 'couples',
  },
  {
    id: uuidv4(),
    type: 'dare',
    text: 'Let your partner do your makeup/hair.',
    category: 'couples',
  },
]; 