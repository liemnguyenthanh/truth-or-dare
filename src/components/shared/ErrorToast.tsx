'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, RefreshCw, X } from 'lucide-react';

interface ErrorToastProps {
  message: string;
  suggestion?: string;
  onClose?: () => void;
  onRetry?: () => void;
  variant?: 'error' | 'warning' | 'info';
  className?: string;
}

const variantClasses = {
  error: 'bg-red-500/90',
  warning: 'bg-yellow-500/90',
  info: 'bg-blue-500/90',
};

export function ErrorToast({
  message,
  suggestion,
  onClose,
  onRetry,
  variant = 'error',
  className = '',
}: ErrorToastProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-20 left-4 right-4 z-50 max-w-md mx-auto ${className}`}
      >
        <div
          className={`${variantClasses[variant]} backdrop-blur-sm rounded-lg px-4 py-3 text-white text-sm shadow-lg ${suggestion || onRetry ? 'space-y-2' : ''}`}
        >
          <div className='flex items-start justify-between gap-3'>
            <div className='flex items-start gap-2 flex-1'>
              <AlertCircle className='w-5 h-5 flex-shrink-0 mt-0.5' />
              <div className='flex-1'>
                <p className='font-medium'>{message}</p>
                {suggestion && (
                  <p className='text-xs mt-1 opacity-90'>{suggestion}</p>
                )}
              </div>
            </div>
            {onClose && (
              <button
                onClick={onClose}
                className='text-white hover:text-white/80 transition-colors flex-shrink-0'
                aria-label='Đóng'
              >
                <X className='w-4 h-4' />
              </button>
            )}
          </div>
          {onRetry && (
            <div className='flex justify-end pt-1'>
              <button
                onClick={onRetry}
                className='text-xs font-medium bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5'
              >
                <RefreshCw className='w-3 h-3' />
                Thử lại
              </button>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

