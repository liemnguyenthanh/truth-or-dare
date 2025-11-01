'use client';

import { motion } from 'framer-motion';

interface PaymentProgressProps {
  cardsDrawn: number;
  maxCards: number;
  onCodeInputClick: () => void;
}

export function PaymentProgress({
  cardsDrawn,
  maxCards,
  onCodeInputClick,
}: PaymentProgressProps) {
  const progressPercentage = (cardsDrawn / maxCards) * 100;
  const remaining = maxCards - cardsDrawn;

  return (
    <div className='mt-6 w-full max-w-md'>
      <div className='bg-black/60 backdrop-blur-sm rounded-full px-4 py-2'>
        <div className='flex items-center justify-between text-white text-sm'>
          <span>Đã rút: {cardsDrawn}/{maxCards}</span>
          <div className='flex-1 mx-3'>
            <div className='w-full bg-white/20 rounded-full h-2'>
              <motion.div
                className='bg-gradient-to-r from-purple-400 to-pink-500 rounded-full h-2'
                animate={{
                  width: `${progressPercentage}%`,
                }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
          <div className='flex items-center space-x-2'>
            {cardsDrawn >= maxCards ? (
              <button
                onClick={onCodeInputClick}
                className='text-xs text-blue-400 hover:text-blue-300 underline'
              >
                Có mã code?
              </button>
            ) : (
              <>
                <span className='text-xs'>Còn {remaining}</span>
                <button
                  onClick={onCodeInputClick}
                  className='text-xs text-blue-400 hover:text-blue-300 underline'
                >
                  Có mã code?
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

