'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { getFeedbackList } from '@/lib/feedback';

import { Heading, PrimaryButton, SecondaryButton, Text } from '@/components/shared';

import type { Feedback } from '@/types/feedback';

import { formatDate } from '../utils/formatDate';

const typeLabels = {
  bug: { label: 'Báo lỗi', icon: '🐛', color: 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300' },
  feature: {
    label: 'Tính năng',
    icon: '💡',
    color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300',
  },
  general: {
    label: 'Góp ý chung',
    icon: '💬',
    color: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300',
  },
  rating: {
    label: 'Đánh giá',
    icon: '⭐',
    color: 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300',
  },
};

const priorityLabels = {
  low: { label: 'Thấp', color: 'text-green-600 dark:text-green-400' },
  medium: { label: 'Trung bình', color: 'text-yellow-600 dark:text-yellow-400' },
  high: { label: 'Cao', color: 'text-orange-600 dark:text-orange-400' },
  critical: { label: 'Nghiêm trọng', color: 'text-red-600 dark:text-red-400' },
};

export default function FeedbackListPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    type: 'all',
    search: '',
    page: 1,
  });
  const [searchInput, setSearchInput] = useState('');
  const [pagination, setPagination] = useState({
    total: 0,
    totalPages: 0,
    currentPage: 1,
  });

  const loadFeedbacks = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const result = await getFeedbackList({
        type: filters.type === 'all' ? undefined : filters.type,
        search: filters.search || undefined,
        page: filters.page,
        limit: 12,
      });

      if (result.success) {
        setFeedbacks(result.feedbacks);
        setPagination({
          total: result.total,
          totalPages: result.totalPages,
          currentPage: result.page,
        });
      } else {
        setError('Không thể tải danh sách góp ý');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tải danh sách góp ý');
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    loadFeedbacks();
  }, [filters, loadFeedbacks]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      page: 1,
    }));
  };

  const debouncedSearch = useCallback((value: string) => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: value,
        page: 1,
      }));
    }, 500);
    return () => clearTimeout(timeoutId);
  }, []);

  const handleSearchInputChange = (value: string) => {
    setSearchInput(value);
    debouncedSearch(value);
  };

  const handlePageChange = (page: number) => {
    setFilters((prev) => ({ ...prev, page }));
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 dark:border-purple-400 mx-auto mb-4'></div>
          <Text>Đang tải danh sách góp ý...</Text>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 transition-colors duration-200'>
      <div className='max-w-6xl mx-auto mt-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8'
        >
          <div className='text-center mb-8'>
            <Heading level={1} className='mb-3'>
              Danh Sách Góp Ý
            </Heading>
            <Text variant='large'>
              Tổng cộng {pagination.total} góp ý từ cộng đồng
            </Text>
          </div>

          {/* Filters */}
          <div className='mb-8 space-y-4'>
            <div className='flex flex-wrap gap-4'>
              <div className='flex-1 min-w-64'>
                <input
                  type='text'
                  placeholder='Tìm kiếm góp ý...'
                  value={searchInput}
                  onChange={(e) => handleSearchInputChange(e.target.value)}
                  className='w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
                />
              </div>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className='px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
              >
                <option value='all'>Tất cả loại</option>
                <option value='bug'>Báo lỗi</option>
                <option value='feature'>Tính năng</option>
                <option value='general'>Góp ý chung</option>
                <option value='rating'>Đánh giá</option>
              </select>
            </div>
          </div>

          {/* Error State */}
          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6'
              >
                <Text variant='small' className='text-red-600 dark:text-red-400 !mb-2'>
                  {error}
                </Text>
                <PrimaryButton onClick={loadFeedbacks} size='sm'>
                  Thử lại
                </PrimaryButton>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Feedback List */}
          {feedbacks.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-6xl mb-4'>📝</div>
              <Heading level={3} className='mb-2'>
                Chưa có góp ý nào
              </Heading>
              <Text>Hãy là người đầu tiên gửi góp ý cho chúng tôi!</Text>
            </div>
          ) : (
            <div className='space-y-6'>
              {feedbacks.map((feedback) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow bg-gray-50 dark:bg-gray-700/50'
                >
                  <div className='flex items-start justify-between mb-4 flex-wrap gap-3'>
                    <div className='flex items-center gap-3 flex-wrap'>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          typeLabels[feedback.type].color
                        }`}
                      >
                        {typeLabels[feedback.type].icon}{' '}
                        {typeLabels[feedback.type].label}
                      </span>
                      <span
                        className={`text-sm font-medium ${
                          priorityLabels[feedback.priority].color
                        }`}
                      >
                        {priorityLabels[feedback.priority].label}
                      </span>
                    </div>
                    <Text variant='caption' className='!mb-0'>
                      {formatDate(feedback.created_at)}
                    </Text>
                  </div>

                  <Heading level={3} className='mb-2'>
                    {feedback.title}
                  </Heading>

                  <Text className='mb-4 line-clamp-3'>{feedback.description}</Text>

                  <div className='flex items-center justify-between flex-wrap gap-4'>
                    <div className='flex items-center gap-4 text-sm'>
                      {feedback.rating && (
                        <div className='flex items-center gap-1 text-gray-600 dark:text-gray-400'>
                          <span>⭐</span>
                          <span>{feedback.rating}/5</span>
                        </div>
                      )}
                      {feedback.category && (
                        <div className='bg-gray-200 dark:bg-gray-600 px-2 py-1 rounded text-sm'>
                          {feedback.category}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {pagination.totalPages > 1 && (
            <div className='mt-8 flex justify-center'>
              <div className='flex gap-2'>
                <SecondaryButton
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  size='sm'
                >
                  Trước
                </SecondaryButton>

                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`px-3 py-2 border rounded-lg transition-colors ${
                        page === pagination.currentPage
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white border-transparent'
                          : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <SecondaryButton
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  size='sm'
                >
                  Sau
                </SecondaryButton>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
