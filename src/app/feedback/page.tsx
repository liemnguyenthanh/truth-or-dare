'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Zap } from 'lucide-react';
import { useState } from 'react';

import { type FeedbackFormData } from '@/lib/validations/feedback';

import FeedbackForm from './components/FeedbackForm';
import FeedbackSuccess from './components/FeedbackSuccess';
import QuickFeedback from './components/QuickFeedback';

type ViewState = 'form' | 'quick' | 'success';

const tabs = [
  {
    id: 'quick',
    name: 'Đánh Giá Nhanh',
    icon: Zap,
    description: 'Đánh giá nhanh với emoji và sao',
  },
  {
    id: 'form',
    name: 'Góp Ý Chi Tiết',
    icon: MessageSquare,
    description: 'Form góp ý đầy đủ với các tùy chọn',
  },
];

export default function FeedbackPage() {
  const [activeTab, setActiveTab] = useState<'form' | 'quick'>('quick');
  const [currentView, setCurrentView] = useState<ViewState>('form');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [lastFeedbackType, setLastFeedbackType] = useState<string>('general');

  const handleSubmitFeedback = async (data: FeedbackFormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Có lỗi xảy ra');
      }

      setLastFeedbackType(data.type);
      setCurrentView('success');
    } catch (error) {
      console.error('Submit error:', error);
      alert('Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại!');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleQuickFeedback = async (data: {
    rating: number;
    description: string;
    emoji?: string;
  }) => {
    setIsSubmitting(true);

    try {
      const feedbackData: FeedbackFormData = {
        type: 'rating',
        title: `Đánh giá ${data.rating} sao`,
        description: data.description,
        rating: data.rating,
        priority: 'medium',
      };

      await handleSubmitFeedback(feedbackData);
    } catch (error) {
      console.error('Quick feedback error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setCurrentView(activeTab);
  };

  if (currentView === 'success') {
    return (
      <main className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
        <div className='container mx-auto px-4'>
          <div className='max-w-4xl mx-auto'>
            <FeedbackSuccess
              feedbackType={lastFeedbackType}
              onReset={handleReset}
              showShareButtons={true}
            />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className='min-h-screen bg-gray-50 dark:bg-gray-900 py-12'>
      <div className='container mx-auto px-4'>
        <div className='max-w-4xl mx-auto'>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className='text-center mb-12'
          >
            <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
              Góp Ý & Phản Hồi
            </h1>
            <p className='text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto'>
              Ý kiến của bạn giúp chúng tôi cải thiện Truth or Dare Game. Hãy
              chia sẻ trải nghiệm và đề xuất tính năng mới!
            </p>
          </motion.div>

          {/* Tab Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className='flex justify-center mb-8'
          >
            <div className='bg-white dark:bg-gray-800 rounded-xl p-1 shadow-lg border border-gray-200 dark:border-gray-700'>
              <div className='flex space-x-1'>
                {tabs.map((tab) => {
                  const IconComponent = tab.icon;
                  const isActive = activeTab === tab.id;

                  return (
                    <motion.button
                      key={tab.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setActiveTab(tab.id as 'form' | 'quick');
                        setCurrentView(tab.id as 'form' | 'quick');
                      }}
                      className={`flex items-center space-x-3 px-6 py-3 rounded-lg transition-all relative ${
                        isActive
                          ? 'bg-blue-600 text-white shadow-lg'
                          : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                      }`}
                    >
                      <IconComponent className='w-5 h-5' />
                      <div className='text-left'>
                        <div className='font-medium'>{tab.name}</div>
                        <div
                          className={`text-sm ${
                            isActive
                              ? 'text-blue-100'
                              : 'text-gray-500 dark:text-gray-400'
                          }`}
                        >
                          {tab.description}
                        </div>
                      </div>

                      {isActive && (
                        <motion.div
                          layoutId='activeTab'
                          className='absolute inset-0 bg-blue-600 rounded-lg -z-10'
                          transition={{ type: 'spring', duration: 0.5 }}
                        />
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {activeTab === 'quick' ? (
              <QuickFeedback
                onSubmit={handleQuickFeedback}
                isSubmitting={isSubmitting}
              />
            ) : (
              <FeedbackForm
                onSubmit={handleSubmitFeedback}
                isSubmitting={isSubmitting}
              />
            )}
          </motion.div>

          {/* Additional Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className='mt-12 bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700'
          >
            <div className='grid md:grid-cols-2 gap-8'>
              <div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
                  <MessageSquare className='w-5 h-5 mr-2 text-blue-600' />
                  Tại sao góp ý quan trọng?
                </h3>
                <ul className='space-y-2 text-gray-600 dark:text-gray-400'>
                  <li className='flex items-start'>
                    <span className='text-green-500 mr-2'>✓</span>
                    Giúp cải thiện trải nghiệm người dùng
                  </li>
                  <li className='flex items-start'>
                    <span className='text-green-500 mr-2'>✓</span>
                    Phát triển tính năng mới hữu ích
                  </li>
                  <li className='flex items-start'>
                    <span className='text-green-500 mr-2'>✓</span>
                    Khắc phục lỗi và sự cố nhanh chóng
                  </li>
                  <li className='flex items-start'>
                    <span className='text-green-500 mr-2'>✓</span>
                    Xây dựng cộng đồng tích cực
                  </li>
                </ul>
              </div>

              <div>
                <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center'>
                  <MessageSquare className='w-5 h-5 mr-2 text-purple-600' />
                  Các loại góp ý
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center'>
                    <span className='text-red-500 mr-2'>🐞</span>
                    <span className='text-gray-600 dark:text-gray-400'>
                      <strong>Báo lỗi:</strong> Sự cố kỹ thuật, lỗi hiển thị
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-blue-500 mr-2'>⭐</span>
                    <span className='text-gray-600 dark:text-gray-400'>
                      <strong>Tính năng:</strong> Ý tưởng cải tiến, tính năng
                      mới
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-green-500 mr-2'>💬</span>
                    <span className='text-gray-600 dark:text-gray-400'>
                      <strong>Chung:</strong> Ý kiến, đề xuất cải thiện
                    </span>
                  </div>
                  <div className='flex items-center'>
                    <span className='text-yellow-500 mr-2'>⚡</span>
                    <span className='text-gray-600 dark:text-gray-400'>
                      <strong>Đánh giá:</strong> Chấm điểm trải nghiệm
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
