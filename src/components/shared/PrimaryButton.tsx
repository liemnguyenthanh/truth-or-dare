'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

import { useTranslation } from '@/hooks/useTranslation';

interface PrimaryButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-base',
};

export function PrimaryButton({
  children,
  onClick,
  disabled = false,
  isLoading = false,
  loadingText,
  size = 'md',
  fullWidth = false,
  className = '',
  type = 'button',
}: PrimaryButtonProps) {
  const { t } = useTranslation({ namespaces: ['common'] });
  const isDisabled = disabled || isLoading;

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={isDisabled}
      className={`
        ${sizeClasses[size]}
        bg-gradient-to-r from-purple-600 to-pink-600
        hover:from-purple-700 hover:to-pink-700
        disabled:from-gray-400 disabled:to-gray-500
        text-white rounded-full shadow-lg
        font-bold
        transition-all duration-200
        transform hover:scale-105 disabled:scale-100
        disabled:cursor-not-allowed
        flex items-center justify-center space-x-2
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
      whileTap={isDisabled ? {} : { scale: 0.95 }}
    >
      {isLoading ? (
        <>
          <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin' />
          <span>{loadingText || t('buttons.processing')}</span>
        </>
      ) : (
        children
      )}
    </motion.button>
  );
}
