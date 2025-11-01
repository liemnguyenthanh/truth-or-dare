'use client';

import { motion } from 'framer-motion';

interface ViewCodesButtonProps {
  /** Callback khi click vào button */
  onClick: () => void;
  /** Text hiển thị, mặc định là 'Mã codes' */
  label?: string;
  /** Custom className */
  className?: string;
}

export function ViewCodesButton({ 
  onClick, 
  label = 'Mã codes',
  className = ''
}: ViewCodesButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 dark:bg-blue-500/30 backdrop-blur-sm text-blue-700 dark:text-blue-300 hover:bg-blue-500/30 dark:hover:bg-blue-500/40 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${className}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <svg
        className='w-5 h-5'
        fill='none'
        stroke='currentColor'
        viewBox='0 0 24 24'
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={2}
          d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
        />
      </svg>
      <span className='font-medium'>{label}</span>
    </motion.button>
  );
}

