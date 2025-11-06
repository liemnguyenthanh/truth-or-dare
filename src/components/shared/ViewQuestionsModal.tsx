'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Eye, X } from 'lucide-react';

interface Question {
  text: string;
  category?: string;
}

interface ViewQuestionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryName: string;
  questions: Question[];
  onSelectCategory?: () => void;
}

export function ViewQuestionsModal({
  isOpen,
  onClose,
  categoryName,
  questions,
  onSelectCategory,
}: ViewQuestionsModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='fixed inset-0 bg-black/60 backdrop-blur-sm z-50'
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className='fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none'
          >
            <motion.div
              className='bg-white dark:bg-gray-900 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] flex flex-col pointer-events-auto'
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header - Always Visible */}
              <div className='flex-shrink-0 flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-800'>
                <div className='flex items-center gap-3'>
                  <div className='w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center'>
                    <Eye className='w-5 h-5 text-white' />
                  </div>
                  <div>
                    <h2 className='text-xl font-bold text-gray-900 dark:text-white'>
                      Xem trước: {categoryName}
                    </h2>
                    <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                      {questions.length} câu hỏi
                    </p>
                  </div>
                </div>
                <button
                  onClick={onClose}
                  className='p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors'
                  aria-label='Đóng'
                >
                  <X className='w-5 h-5 text-gray-500 dark:text-gray-400' />
                </button>
              </div>

              {/* Content - Scrollable */}
              <div className='flex-1 overflow-y-auto p-6'>
                <div className='space-y-3'>
                  {questions.map((question, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.02 }}
                      className='bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-colors'
                    >
                      <div className='flex items-start gap-3'>
                        <div className='flex-shrink-0 w-6 h-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold mt-0.5'>
                          {index + 1}
                        </div>
                        <p className='flex-1 text-gray-800 dark:text-gray-200 leading-relaxed'>
                          {question.text}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer - Always Visible */}
              <div className='flex-shrink-0 p-6 border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 rounded-b-3xl'>
                <div className='flex gap-3'>
                  {onSelectCategory && (
                    <button
                      onClick={() => {
                        onSelectCategory();
                        onClose();
                      }}
                      className='flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95'
                    >
                      Chọn category này
                    </button>
                  )}
                  <button
                    onClick={onClose}
                    className='flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 font-semibold py-3 px-4 rounded-xl transition-all duration-200 active:scale-95'
                  >
                    Đóng
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
