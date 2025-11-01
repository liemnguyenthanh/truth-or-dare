'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { createFeedback } from '@/lib/feedback';
import {
  type FeedbackFormData,
  feedbackSchema,
} from '@/lib/validations/feedback';

const feedbackTypes = [
  {
    value: 'bug',
    label: 'Báo lỗi',
    icon: '🐛',
    description: 'Báo cáo lỗi hoặc sự cố',
  },
  {
    value: 'feature',
    label: 'Tính năng',
    icon: '💡',
    description: 'Đề xuất tính năng mới',
  },
  {
    value: 'general',
    label: 'Góp ý chung',
    icon: '💬',
    description: 'Góp ý và phản hồi chung',
  },
  {
    value: 'rating',
    label: 'Đánh giá',
    icon: '⭐',
    description: 'Đánh giá ứng dụng',
  },
];

const priorityOptions = [
  { value: 'low', label: 'Thấp', color: 'text-green-600' },
  { value: 'medium', label: 'Trung bình', color: 'text-yellow-600' },
  { value: 'high', label: 'Cao', color: 'text-orange-600' },
  { value: 'critical', label: 'Nghiêm trọng', color: 'text-red-600' },
];

export default function FeedbackPage() {
  const [formData, setFormData] = useState<FeedbackFormData>({
    type: 'general',
    title: '',
    description: '',
    email: '',
    rating: undefined,
    category: '',
    priority: 'medium',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (field: keyof FeedbackFormData, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      // Validate form data
      const validatedData = feedbackSchema.parse(formData);

      // Get user agent and IP (simplified for client-side)
      const userAgent = navigator.userAgent;
      const ipAddress = 'client-side'; // IP will be handled by Supabase RLS

      // Submit feedback
      const result = await createFeedback({
        ...validatedData,
        userAgent,
        ipAddress,
      });

      if (result.success) {
        setIsSubmitted(true);
        setFormData({
          type: 'general',
          title: '',
          description: '',
          email: '',
          rating: undefined,
          category: '',
          priority: 'medium',
        });
      } else {
        throw new Error('Failed to submit feedback');
      }
    } catch (error: unknown) {
      if (error && typeof error === 'object' && 'errors' in error) {
        // Zod validation errors
        const fieldErrors: Record<string, string> = {};
        (
          error as { errors: { path: string[]; message: string }[] }
        ).errors.forEach((err: { path: string[]; message: string }) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Error submitting feedback
        setErrors({
          general: 'Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại.',
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center p-4'>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className='bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center'
        >
          <div className='text-6xl mb-4'>✅</div>
          <h1 className='text-2xl font-bold text-gray-900 mb-2'>Cảm ơn bạn!</h1>
          <p className='text-gray-600 mb-6'>
            Góp ý của bạn đã được gửi thành công. Chúng tôi sẽ xem xét và phản
            hồi sớm nhất có thể.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className='bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors'
          >
            Gửi góp ý khác
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4'>
      <div className='max-w-2xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white rounded-2xl shadow-xl p-8'
        >
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>Gửi Góp Ý</h1>
            <p className='text-gray-600'>
              Chúng tôi rất mong nhận được phản hồi từ bạn để cải thiện ứng dụng
            </p>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Feedback Type */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-3'>
                Loại góp ý *
              </label>
              <div className='grid grid-cols-2 gap-3'>
                {feedbackTypes.map((type) => (
                  <button
                    key={type.value}
                    type='button'
                    onClick={() => handleInputChange('type', type.value)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      formData.type === type.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className='text-2xl mb-1'>{type.icon}</div>
                    <div className='font-medium text-sm'>{type.label}</div>
                    <div className='text-xs text-gray-500'>
                      {type.description}
                    </div>
                  </button>
                ))}
              </div>
              {errors.type && (
                <p className='text-red-500 text-sm mt-1'>{errors.type}</p>
              )}
            </div>

            {/* Title */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Tiêu đề *
              </label>
              <input
                type='text'
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                placeholder='Mô tả ngắn gọn về góp ý của bạn'
              />
              {errors.title && (
                <p className='text-red-500 text-sm mt-1'>{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Mô tả chi tiết *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange('description', e.target.value)
                }
                rows={4}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                placeholder='Mô tả chi tiết về góp ý của bạn...'
              />
              {errors.description && (
                <p className='text-red-500 text-sm mt-1'>
                  {errors.description}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Email (tùy chọn)
              </label>
              <input
                type='email'
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                placeholder='your@email.com'
              />
              {errors.email && (
                <p className='text-red-500 text-sm mt-1'>{errors.email}</p>
              )}
            </div>

            {/* Rating (only for rating type) */}
            {formData.type === 'rating' && (
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-2'>
                  Đánh giá *
                </label>
                <div className='flex space-x-2'>
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <button
                      key={rating}
                      type='button'
                      onClick={() => handleInputChange('rating', rating)}
                      className={`text-2xl ${
                        formData.rating && formData.rating >= rating
                          ? 'text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    >
                      ⭐
                    </button>
                  ))}
                </div>
                {errors.rating && (
                  <p className='text-red-500 text-sm mt-1'>{errors.rating}</p>
                )}
              </div>
            )}

            {/* Category */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Danh mục (tùy chọn)
              </label>
              <input
                type='text'
                value={formData.category}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                placeholder='Ví dụ: UI/UX, Performance, Bug...'
              />
              {errors.category && (
                <p className='text-red-500 text-sm mt-1'>{errors.category}</p>
              )}
            </div>

            {/* Priority */}
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>
                Mức độ ưu tiên
              </label>
              <div className='flex space-x-2'>
                {priorityOptions.map((priority) => (
                  <button
                    key={priority.value}
                    type='button'
                    onClick={() =>
                      handleInputChange('priority', priority.value)
                    }
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      formData.priority === priority.value
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className={priority.color}>{priority.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* General Error */}
            {errors.general && (
              <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
                <p className='text-red-600 text-sm'>{errors.general}</p>
              </div>
            )}

            {/* Submit Button */}
            <button
              type='submit'
              disabled={isSubmitting}
              className='w-full bg-purple-600 text-white py-3 px-6 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
            >
              {isSubmitting ? 'Đang gửi...' : 'Gửi Góp Ý'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
