'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Heading, PrimaryButton, Text } from '@/components/shared';

interface FeedbackFormProps {
  formData: {
    title: string;
    description: string;
    email: string;
  };
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  onInputChange: (field: string, value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export function FeedbackForm({
  formData,
  errors,
  isSubmitting,
  isSubmitted,
  onInputChange,
  onSubmit,
}: FeedbackFormProps) {
  return (
    <form onSubmit={onSubmit} className='space-y-3 sm:space-y-4'>
      <div>
        <label className='block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2'>
          Tiêu đề *
        </label>
        <input
          type='text'
          value={formData.title}
          onChange={(e) => onInputChange('title', e.target.value)}
          className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
          placeholder='Ví dụ: Tính năng mới, Lỗi gặp phải, Ý tưởng...'
          required
        />
        {errors.title && (
          <Text variant='small' className='text-red-500 dark:text-red-400 mt-1 text-xs'>
            {errors.title}
          </Text>
        )}
      </div>

      <div>
        <label className='block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2'>
          Nội dung góp ý *
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => onInputChange('description', e.target.value)}
          rows={4}
          className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none'
          placeholder='Viết góp ý của bạn một cách chi tiết...'
          required
        />
        {errors.description && (
          <Text variant='small' className='text-red-500 dark:text-red-400 mt-1 text-xs'>
            {errors.description}
          </Text>
        )}
      </div>

      <div>
        <label className='block text-xs sm:text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2'>
          Email (tùy chọn)
        </label>
        <input
          type='email'
          value={formData.email}
          onChange={(e) => onInputChange('email', e.target.value)}
          className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
          placeholder='your@email.com (để nhận phản hồi)'
        />
        {errors.email && (
          <Text variant='small' className='text-red-500 dark:text-red-400 mt-1 text-xs'>
            {errors.email}
          </Text>
        )}
      </div>

      <AnimatePresence>
        {errors.general && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-3 sm:p-4'
          >
            <Text variant='small' className='text-red-600 dark:text-red-400 !mb-0 text-xs sm:text-sm'>
              {errors.general}
            </Text>
          </motion.div>
        )}

        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className='bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3 sm:p-4'
          >
            <Text variant='small' className='text-green-600 dark:text-green-400 !mb-0 text-xs sm:text-sm'>
              ✅ Góp ý đã được gửi thành công!
            </Text>
          </motion.div>
        )}
      </AnimatePresence>

      <PrimaryButton
        type='submit'
        disabled={isSubmitting}
        fullWidth
        isLoading={isSubmitting}
        loadingText='Đang gửi...'
      >
        Gửi Góp Ý
      </PrimaryButton>
    </form>
  );
}

