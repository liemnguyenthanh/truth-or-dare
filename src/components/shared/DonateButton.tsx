'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

interface DonateButtonProps {
  /** Callback khi click vào button */
  onClick: () => void;
  /** Text hiển thị, mặc định là 'Donate' */
  label?: string;
  /** Custom className */
  className?: string;
}

export function DonateButton({
  onClick,
  label = 'Donate',
  className = '',
}: DonateButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white dark:bg-white text-purple-600 dark:text-purple-600 font-semibold border-2 border-purple-500 dark:border-purple-500 hover:bg-purple-50 dark:hover:bg-purple-50 shadow-lg hover:shadow-xl ${className}`}
      animate={{
        x: [0, -2, 2, -3, 3, -2, 2, -1, 1, 0],
        y: [0, -1, 1, -2, 2, -1, 1, -1, 1, 0],
        rotate: [0, -1, 1, -1, 1, 0, -1, 1, 0, 0],
      }}
      transition={{
        duration: 0.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 2,
      }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <Image
        src='/images/cashback.gif'
        alt='Donate icon'
        width={20}
        height={20}
        className='w-5 h-5'
        unoptimized
      />
      <span className='font-medium'>{label}</span>
    </motion.button>
  );
}
