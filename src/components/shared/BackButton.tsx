'use client';

import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

interface BackButtonProps {
  /** Route để quay lại, mặc định là '/' */
  href?: string;
  /** Text hiển thị, mặc định là 'Quay lại' */
  label?: string;
  /** Custom className */
  className?: string;
}

export function BackButton({ 
  href = '/', 
  label = 'Quay lại',
  className = ''
}: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    router.push(href);
  };

  return (
    <motion.button
      onClick={handleBack}
      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white/20 dark:bg-gray-800/50 backdrop-blur-sm text-gray-700 dark:text-gray-300 hover:bg-white/30 dark:hover:bg-gray-700/70 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 ${className}`}
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
          d='M15 19l-7-7 7-7'
        />
      </svg>
      <span className='font-medium'>{label}</span>
    </motion.button>
  );
}

