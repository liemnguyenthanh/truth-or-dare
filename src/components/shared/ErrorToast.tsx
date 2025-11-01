'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface ErrorToastProps {
  message: string;
  onClose?: () => void;
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
  onClose,
  variant = 'error',
  className = '',
}: ErrorToastProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className={`fixed top-20 left-4 right-4 z-50 ${className}`}
      >
        <div
          className={`${variantClasses[variant]} backdrop-blur-sm rounded-lg px-4 py-2 text-white text-sm flex items-center justify-between gap-2`}
        >
          <span>{message}</span>
          {onClose && (
            <button
              onClick={onClose}
              className='text-white hover:text-white/80 transition-colors'
            >
              ✕
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

