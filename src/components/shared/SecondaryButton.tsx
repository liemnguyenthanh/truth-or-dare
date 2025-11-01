'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface SecondaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  variant?: 'gray' | 'outline';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-5 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base',
  lg: 'px-6 py-3 text-base',
};

const variantClasses = {
  gray: 'bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-500 text-white',
  outline:
    'bg-transparent border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500',
};

export function SecondaryButton({
  children,
  onClick,
  disabled = false,
  size = 'md',
  fullWidth = false,
  variant = 'gray',
  className = '',
  type = 'button',
}: SecondaryButtonProps) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${sizeClasses[size]}
        ${variantClasses[variant]}
        rounded-lg shadow-md
        font-medium
        transition-colors duration-200
        disabled:bg-gray-400 disabled:cursor-not-allowed
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      whileTap={disabled ? {} : { scale: 0.98 }}
    >
      {children}
    </motion.button>
  );
}

