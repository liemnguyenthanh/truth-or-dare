'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle, X } from 'lucide-react';
import { useState } from 'react';

interface AgeVerificationModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function AgeVerificationModal({
  isOpen,
  onConfirm,
  onCancel,
}: AgeVerificationModalProps) {
  const [isChecked, setIsChecked] = useState(false);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center p-4'
        style={{ zIndex: 99999 }}
        onClick={onCancel}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className='bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-2xl'
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <div className='flex items-center space-x-3'>
              <div className='w-12 h-12 bg-gradient-to-br from-red-500 to-orange-600 rounded-full flex items-center justify-center'>
                <AlertTriangle className='w-6 h-6 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                  Xác nhận độ tuổi
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  Nội dung chỉ dành cho người trên 18 tuổi
                </p>
              </div>
            </div>
            <button
              onClick={onCancel}
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
            >
              <X className='w-5 h-5 text-gray-400' />
            </button>
          </div>

          <div className='space-y-6'>
            <div className='bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800'>
              <p className='text-red-700 dark:text-red-300 font-medium'>
                Chế độ này chứa nội dung dành cho người lớn (18+)
              </p>
              <p className='text-red-600 dark:text-red-400 mt-1 text-sm'>
                Bạn phải xác nhận rằng bạn đã đủ 18 tuổi để tiếp tục.
              </p>
            </div>

            {/* Checkbox */}
            <div className='flex items-start space-x-3'>
              <input
                id='age-confirmation'
                type='checkbox'
                checked={isChecked}
                onChange={() => setIsChecked(!isChecked)}
                className='mt-1 w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500'
              />
              <label
                htmlFor='age-confirmation'
                className='text-sm text-gray-700 dark:text-gray-300'
              >
                Tôi xác nhận rằng tôi đã đủ 18 tuổi và hiểu rằng nội dung phía
                trước có thể chứa các hình ảnh gợi cảm dành cho người trưởng
                thành.
              </label>
            </div>

            {/* Buttons */}
            <div className='flex space-x-3 pt-4'>
              <button
                onClick={onCancel}
                className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium'
              >
                Hủy bỏ
              </button>
              <motion.button
                onClick={onConfirm}
                disabled={!isChecked}
                whileHover={isChecked ? { scale: 1.02 } : {}}
                whileTap={isChecked ? { scale: 0.98 } : {}}
                className={`flex-1 bg-gradient-to-r ${
                  isChecked
                    ? 'from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                    : 'from-gray-400 to-gray-500'
                } text-white font-medium py-2 px-4 rounded-lg transition-all shadow-lg`}
              >
                Tiếp tục
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
