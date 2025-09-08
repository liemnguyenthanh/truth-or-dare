'use client';

import { motion } from 'framer-motion';
import { Bug, Lightbulb, MessageCircle, Send, Star } from 'lucide-react';
import { useState } from 'react';

import {
  type FeedbackFormData,
  feedbackSchema,
} from '@/lib/validations/feedback';

interface FeedbackFormProps {
  onSubmit: (data: FeedbackFormData) => Promise<void>;
  isSubmitting?: boolean;
}

const feedbackTypes = [
  {
    id: 'bug' as const,
    name: 'Báo Lỗi',
    icon: Bug,
    description: 'Báo cáo lỗi hoặc sự cố',
    color: 'red',
  },
  {
    id: 'feature' as const,
    name: 'Đề Xuất Tính Năng',
    icon: Lightbulb,
    description: 'Đề xuất tính năng mới',
    color: 'blue',
  },
  {
    id: 'general' as const,
    name: 'Góp Ý Chung',
    icon: MessageCircle,
    description: 'Ý kiến và góp ý khác',
    color: 'green',
  },
  {
    id: 'rating' as const,
    name: 'Đánh Giá',
    icon: Star,
    description: 'Đánh giá sản phẩm',
    color: 'yellow',
  },
];

const categories = {
  bug: ['UI/UX', 'Performance', 'Functionality', 'Compatibility', 'Security'],
  feature: [
    'Game Features',
    'UI Improvements',
    'Social Features',
    'Mobile App',
    'Accessibility',
  ],
  general: ['Content', 'Design', 'User Experience', 'Documentation', 'Other'],
  rating: ['Overall', 'Game Quality', 'User Interface', 'Performance'],
};

const priorities = [
  { id: 'low' as const, name: 'Thấp', color: 'gray' },
  { id: 'medium' as const, name: 'Trung Bình', color: 'blue' },
  { id: 'high' as const, name: 'Cao', color: 'orange' },
  { id: 'critical' as const, name: 'Khẩn Cấp', color: 'red' },
];

export default function FeedbackForm({
  onSubmit,
  isSubmitting = false,
}: FeedbackFormProps) {
  const [formData, setFormData] = useState<Partial<FeedbackFormData>>({
    type: 'general',
    priority: 'medium',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    try {
      const dataToValidate = {
        ...formData,
        ...(formData.type === 'rating' && { rating }),
      };

      const validatedData = feedbackSchema.parse(dataToValidate);
      await onSubmit(validatedData);

      // Reset form
      setFormData({ type: 'general', priority: 'medium' });
      setRating(0);
    } catch (error: any) {
      if (error.errors) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          newErrors[err.path[0]] = err.message;
        });
        setErrors(newErrors);
      }
    }
  };

  const selectedType = feedbackTypes.find((type) => type.id === formData.type);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className='max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6'
    >
      <form onSubmit={handleSubmit} className='space-y-6'>
        {/* Feedback Type Selection */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
            Loại góp ý
          </label>
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-3'>
            {feedbackTypes.map((type) => {
              const IconComponent = type.icon;
              const isSelected = formData.type === type.id;

              return (
                <motion.button
                  key={type.id}
                  type='button'
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setFormData({ ...formData, type: type.id })}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    isSelected
                      ? `border-${type.color}-500 bg-${type.color}-50 dark:bg-${type.color}-900/20`
                      : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                  }`}
                >
                  <div className='flex items-center space-x-3'>
                    <IconComponent
                      className={`w-5 h-5 ${
                        isSelected ? `text-${type.color}-600` : 'text-gray-500'
                      }`}
                    />
                    <div className='text-left'>
                      <div className='font-medium text-gray-900 dark:text-white'>
                        {type.name}
                      </div>
                      <div className='text-sm text-gray-500 dark:text-gray-400'>
                        {type.description}
                      </div>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </div>
          {errors.type && (
            <p className='mt-1 text-sm text-red-600'>{errors.type}</p>
          )}
        </div>

        {/* Title */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Tiêu đề *
          </label>
          <input
            type='text'
            value={formData.title || ''}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder='Mô tả ngắn gọn vấn đề hoặc ý tưởng của bạn'
            className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
          />
          {errors.title && (
            <p className='mt-1 text-sm text-red-600'>{errors.title}</p>
          )}
        </div>

        {/* Category */}
        {formData.type && (
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Danh mục
            </label>
            <select
              value={formData.category || ''}
              onChange={(e) =>
                setFormData({ ...formData, category: e.target.value })
              }
              className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
            >
              <option value=''>Chọn danh mục</option>
              {categories[formData.type]?.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Rating for rating type */}
        {formData.type === 'rating' && (
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Đánh giá *
            </label>
            <div className='flex items-center space-x-1'>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type='button'
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className='p-1'
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= (hoverRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300 dark:text-gray-600'
                    }`}
                  />
                </button>
              ))}
              <span className='ml-2 text-sm text-gray-600 dark:text-gray-400'>
                {rating > 0 && `${rating} sao`}
              </span>
            </div>
            {errors.rating && (
              <p className='mt-1 text-sm text-red-600'>{errors.rating}</p>
            )}
          </div>
        )}

        {/* Priority (for bug and feature) */}
        {(formData.type === 'bug' || formData.type === 'feature') && (
          <div>
            <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
              Mức độ ưu tiên
            </label>
            <div className='flex space-x-2'>
              {priorities.map((priority) => (
                <button
                  key={priority.id}
                  type='button'
                  onClick={() =>
                    setFormData({ ...formData, priority: priority.id })
                  }
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    formData.priority === priority.id
                      ? `bg-${priority.color}-100 text-${priority.color}-800 border-${priority.color}-300 border`
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-600'
                  }`}
                >
                  {priority.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Description */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Mô tả chi tiết *
          </label>
          <textarea
            value={formData.description || ''}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            rows={5}
            placeholder='Mô tả chi tiết vấn đề, ý tưởng hoặc góp ý của bạn...'
            className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none'
          />
          <div className='flex justify-between mt-1'>
            {errors.description && (
              <p className='text-sm text-red-600'>{errors.description}</p>
            )}
            <p className='text-sm text-gray-500 dark:text-gray-400'>
              {formData.description?.length || 0}/2000
            </p>
          </div>
        </div>

        {/* Email */}
        <div>
          <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
            Email (tùy chọn)
          </label>
          <input
            type='email'
            value={formData.email || ''}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            placeholder='email@example.com'
            className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
          />
          <p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
            Để lại email nếu bạn muốn nhận phản hồi
          </p>
          {errors.email && (
            <p className='mt-1 text-sm text-red-600'>{errors.email}</p>
          )}
        </div>

        {/* Submit Button */}
        <motion.button
          type='submit'
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className='w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2'
        >
          {isSubmitting ? (
            <>
              <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
              <span>Đang gửi...</span>
            </>
          ) : (
            <>
              <Send className='w-4 h-4' />
              <span>Gửi Góp Ý</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
}
