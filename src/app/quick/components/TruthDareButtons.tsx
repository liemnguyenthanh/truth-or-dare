'use client';

import { motion } from 'framer-motion';

import { QuestionType } from '@/types';
import { Text } from '@/components/shared/Typography';

interface TruthDareButtonsProps {
  selectedType: QuestionType | null;
  currentQuestion: unknown;
  isDrawingCard: boolean;
  onDrawCard: (type: QuestionType) => void;
  showInitialSelection?: boolean;
  disabledTruth?: boolean;
  disabledDare?: boolean;
}

export function TruthDareButtons({ 
  selectedType, 
  currentQuestion, 
  isDrawingCard, 
  onDrawCard,
  showInitialSelection = false,
  disabledTruth = false,
  disabledDare = false
}: TruthDareButtonsProps) {
  const shouldShow = showInitialSelection || (selectedType && currentQuestion);

  if (!shouldShow) return null;

  return (
    <div className='mt-4 sm:mt-6 md:mt-8 text-center'>
      <Text variant='large' className='mb-3 sm:mb-4 md:mb-6 text-sm sm:text-base'>
        {showInitialSelection ? 'Chọn Thật hoặc Thách để nhận câu hỏi ngẫu nhiên' : 'Chọn loại câu hỏi tiếp theo'}
      </Text>
      <div className='flex gap-3 sm:gap-4 md:gap-6 justify-center'>
        <motion.button
          onClick={() => onDrawCard('truth')}
          disabled={isDrawingCard || disabledTruth}
          className={`bg-purple-600 hover:bg-purple-700 text-white font-bold py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
            disabledTruth ? 'opacity-50 cursor-not-allowed disabled:scale-100' : ''
          }`}
          whileTap={{ scale: disabledTruth ? 1 : 0.95 }}
        >
          <span className='text-lg sm:text-xl md:text-2xl'>💭</span>
          <span>{disabledTruth ? 'Hết' : 'Thật'}</span>
        </motion.button>
        <motion.button
          onClick={() => onDrawCard('dare')}
          disabled={isDrawingCard || disabledDare}
          className={`bg-pink-600 hover:bg-pink-700 text-white font-bold py-2.5 sm:py-3 md:py-4 px-4 sm:px-6 md:px-8 rounded-full shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center gap-2 sm:gap-3 text-sm sm:text-base ${
            disabledDare ? 'opacity-50 cursor-not-allowed disabled:scale-100' : ''
          }`}
          whileTap={{ scale: disabledDare ? 1 : 0.95 }}
        >
          <span className='text-lg sm:text-xl md:text-2xl'>💖</span>
          <span>{disabledDare ? 'Hết' : 'Thách'}</span>
        </motion.button>
      </div>
    </div>
  );
}
