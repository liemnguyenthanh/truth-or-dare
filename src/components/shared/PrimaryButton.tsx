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
        disabled:from-gray-300 disabled:to-gray-400
        disabled:hover:from-gray-300 disabled:hover:to-gray-400
        text-white rounded-xl shadow-lg hover:shadow-xl
        font-bold
        transition-all duration-300
        transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100
        disabled:cursor-not-allowed disabled:opacity-60
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
