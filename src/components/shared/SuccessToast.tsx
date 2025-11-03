'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle } from 'lucide-react';
import { useEffect } from 'react';

interface SuccessToastProps {
  message: string;
  onClose?: () => void;
  duration?: number; // Auto-close duration in ms (0 = no auto-close)
  className?: string;
}

export function SuccessToast({
  message,
  onClose,
  duration = 3000,
  className = '',
}: SuccessToastProps) {
  // Auto-close after duration
  useEffect(() => {
    if (onClose && duration > 0) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [onClose, duration]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-20 left-4 right-4 z-50 max-w-md mx-auto ${className}`}
      >
        <div className='bg-green-500/90 backdrop-blur-sm rounded-lg px-4 py-3 text-white text-sm flex items-center justify-between gap-3 shadow-lg'>
          <div className='flex items-center gap-3'>
            <CheckCircle className='w-5 h-5 flex-shrink-0' />
            <span className='font-medium'>{message}</span>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className='text-white hover:text-white/80 transition-colors flex-shrink-0'
              aria-label='Đóng'
            >
              ✕
            </button>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

