'use client';

import { motion } from 'framer-motion';
import { useCallback, useEffect, useState } from 'react';

import { getFeedbackList } from '@/lib/feedback';

import { Feedback } from '@/types/feedback';

const typeLabels = {
  bug: { label: 'Báo lỗi', icon: '🐛', color: 'bg-red-100 text-red-800' },
  feature: {
    label: 'Tính năng',
    icon: '💡',
    color: 'bg-blue-100 text-blue-800',
  },
  general: {
    label: 'Góp ý chung',
    icon: '💬',
    color: 'bg-gray-100 text-gray-800',
  },
  rating: {
    label: 'Đánh giá',
    icon: '⭐',
    color: 'bg-yellow-100 text-yellow-800',
  },
};

const priorityLabels = {
  low: { label: 'Thấp', color: 'text-green-600' },
  medium: { label: 'Trung bình', color: 'text-yellow-600' },
  high: { label: 'Cao', color: 'text-orange-600' },
  critical: { label: 'Nghiêm trọng', color: 'text-red-600' },
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
      // Error loading feedbacks
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
      page: 1, // Reset to first page when filtering
    }));
  };

  // Debounced search
  const debouncedSearch = useCallback((value: string) => {
    const timeoutId = setTimeout(() => {
      setFilters((prev) => ({
        ...prev,
        search: value,
        page: 1, // Reset to first page when searching
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 flex items-center justify-center'>
        <div className='text-center'>
          <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4'></div>
          <p className='text-gray-600'>Đang tải danh sách góp ý...</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8 px-4'>
      <div className='max-w-6xl mx-auto'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white rounded-2xl shadow-xl p-8'
        >
          <div className='text-center mb-8'>
            <h1 className='text-3xl font-bold text-gray-900 mb-2'>
              Danh Sách Góp Ý
            </h1>
            <p className='text-gray-600'>
              Tổng cộng {pagination.total} góp ý từ cộng đồng
            </p>
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
                  className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
                />
              </div>
              <select
                value={filters.type}
                onChange={(e) => handleFilterChange('type', e.target.value)}
                className='px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent'
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
          {error && (
            <div className='bg-red-50 border border-red-200 rounded-lg p-4 mb-6'>
              <p className='text-red-600'>{error}</p>
              <button
                onClick={loadFeedbacks}
                className='mt-2 text-red-600 hover:text-red-700 underline'
              >
                Thử lại
              </button>
            </div>
          )}

          {/* Feedback List */}
          {feedbacks.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-6xl mb-4'>📝</div>
              <h3 className='text-xl font-semibold text-gray-900 mb-2'>
                Chưa có góp ý nào
              </h3>
              <p className='text-gray-600'>
                Hãy là người đầu tiên gửi góp ý cho chúng tôi!
              </p>
            </div>
          ) : (
            <div className='space-y-6'>
              {feedbacks.map((feedback) => (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className='border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow'
                >
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center space-x-3'>
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
                    <span className='text-sm text-gray-500'>
                      {formatDate(feedback.created_at)}
                    </span>
                  </div>

                  <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                    {feedback.title}
                  </h3>

                  <p className='text-gray-700 mb-4 line-clamp-3'>
                    {feedback.description}
                  </p>

                  <div className='flex items-center justify-between'>
                    <div className='flex items-center space-x-4 text-sm text-gray-500'>
                      {feedback.rating && (
                        <div className='flex items-center'>
                          <span className='mr-1'>⭐</span>
                          <span>{feedback.rating}/5</span>
                        </div>
                      )}
                      {feedback.category && (
                        <div className='bg-gray-100 px-2 py-1 rounded'>
                          {feedback.category}
                        </div>
                      )}
                      {feedback.email && (
                        <div className='text-gray-500'>{feedback.email}</div>
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
              <div className='flex space-x-2'>
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1}
                  className='px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
                >
                  Trước
                </button>

                {Array.from(
                  { length: pagination.totalPages },
                  (_, i) => i + 1
                ).map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 border rounded-lg ${
                      page === pagination.currentPage
                        ? 'bg-purple-600 text-white border-purple-600'
                        : 'border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages}
                  className='px-3 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50'
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
