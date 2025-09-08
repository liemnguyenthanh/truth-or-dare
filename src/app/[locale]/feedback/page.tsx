'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

import { type FeedbackFormData } from '@/lib/validations/feedback';

import FeedbackForm from './components/FeedbackForm';
import FeedbackSuccess from './components/FeedbackSuccess';
import QuickFeedback from './components/QuickFeedback';

type FeedbackMode = 'quick' | 'detailed' | 'success';

export default function FeedbackPage() {
  const [mode, setMode] = useState<FeedbackMode>('quick');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackType, setFeedbackType] = useState<string>('general');

  const handleQuickSubmit = async (data: {
    rating: number;
    description: string;
    emoji?: string;
  }) => {
    try {
      setIsSubmitting(true);

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'rating',
          title: `Đánh giá ${data.rating} sao`,
          description: data.description,
          rating: data.rating,
          priority: 'medium',
        }),
      });

      const result = await response.json();

      if (result.success) {
        setFeedbackType('rating');
        setMode('success');
      } else {
        console.error('Error submitting feedback:', result.error);
        alert('Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDetailedSubmit = async (data: FeedbackFormData) => {
    try {
      setIsSubmitting(true);

      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        setFeedbackType(data.type);
        setMode('success');
      } else {
        console.error('Error submitting feedback:', result.error);
        alert('Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại.');
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      alert('Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setMode('quick');
    setFeedbackType('general');
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8'>
      <div className='container mx-auto px-4 max-w-4xl'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-8'
        >
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Góp Ý & Phản Hồi 💬
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Chia sẻ ý kiến của bạn để giúp chúng tôi cải thiện trò chơi Thật Hay
            Thách
          </p>
        </motion.div>

        {/* Mode Selection */}
        {mode === 'quick' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className='bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg mb-8'
          >
            <div className='text-center mb-6'>
              <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-2'>
                Chọn cách góp ý
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Bạn muốn góp ý nhanh hay chi tiết?
              </p>
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              {/* Quick Feedback */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-700 cursor-pointer'
                onClick={() => setMode('quick')}
              >
                <div className='text-center'>
                  <div className='w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl'>⚡</span>
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                    Góp Ý Nhanh
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 mb-4'>
                    Đánh giá nhanh với emoji và nhận xét ngắn
                  </p>
                  <div className='text-sm text-blue-600 dark:text-blue-400 font-medium'>
                    ~2 phút
                  </div>
                </div>
              </motion.div>

              {/* Detailed Feedback */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-700 cursor-pointer'
                onClick={() => setMode('detailed')}
              >
                <div className='text-center'>
                  <div className='w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4'>
                    <span className='text-2xl'>📝</span>
                  </div>
                  <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
                    Góp Ý Chi Tiết
                  </h3>
                  <p className='text-gray-600 dark:text-gray-400 mb-4'>
                    Mô tả chi tiết về lỗi, tính năng hoặc góp ý
                  </p>
                  <div className='text-sm text-green-600 dark:text-green-400 font-medium'>
                    ~5 phút
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Quick Feedback Form */}
        {mode === 'quick' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg'
          >
            <div className='text-center mb-6'>
              <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-2'>
                Góp Ý Nhanh
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Chọn emoji và đánh giá để chia sẻ cảm nhận của bạn
              </p>
            </div>

            <QuickFeedback
              onSubmit={handleQuickSubmit}
              isSubmitting={isSubmitting}
            />

            <div className='mt-6 text-center'>
              <button
                onClick={() => setMode('detailed')}
                className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors'
              >
                Muốn góp ý chi tiết hơn? →
              </button>
            </div>
          </motion.div>
        )}

        {/* Detailed Feedback Form */}
        {mode === 'detailed' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg'
          >
            <div className='text-center mb-6'>
              <h2 className='text-2xl font-semibold text-gray-900 dark:text-white mb-2'>
                Góp Ý Chi Tiết
              </h2>
              <p className='text-gray-600 dark:text-gray-400'>
                Mô tả chi tiết để chúng tôi hiểu rõ hơn về vấn đề hoặc ý tưởng
              </p>
            </div>

            <FeedbackForm
              onSubmit={handleDetailedSubmit}
              isSubmitting={isSubmitting}
            />

            <div className='mt-6 text-center'>
              <button
                onClick={() => setMode('quick')}
                className='text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors'
              >
                ← Muốn góp ý nhanh hơn?
              </button>
            </div>
          </motion.div>
        )}

        {/* Success Page */}
        {mode === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className='bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg'
          >
            <FeedbackSuccess
              feedbackType={feedbackType}
              showShareButtons={true}
              onReset={handleReset}
            />
          </motion.div>
        )}

        {/* Additional Info */}
        {mode !== 'success' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className='mt-8 text-center'
          >
            <div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6'>
              <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
                💡 Mẹo góp ý hiệu quả
              </h3>
              <ul className='text-sm text-gray-600 dark:text-gray-400 space-y-1'>
                <li>• Mô tả rõ ràng vấn đề hoặc ý tưởng</li>
                <li>• Bao gồm các bước để tái tạo lỗi (nếu có)</li>
                <li>• Chia sẻ thiết bị và trình duyệt bạn đang sử dụng</li>
                <li>• Đề xuất giải pháp nếu bạn có ý tưởng</li>
              </ul>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
