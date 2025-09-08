'use client';

import { motion } from 'framer-motion';
import {
  Bug,
  Calendar,
  Filter,
  Lightbulb,
  MessageSquare,
  Search,
  Star,
} from 'lucide-react';
import { useEffect, useState } from 'react';

import { Feedback } from '@/types';

const typeConfig = {
  bug: {
    icon: Bug,
    label: 'Báo Lỗi',
    color: 'text-red-500 bg-red-100 dark:bg-red-900/30',
  },
  feature: {
    icon: Lightbulb,
    label: 'Tính Năng',
    color: 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30',
  },
  general: {
    icon: MessageSquare,
    label: 'Góp Ý',
    color: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30',
  },
  rating: {
    icon: Star,
    label: 'Đánh Giá',
    color: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30',
  },
};

const priorityColors = {
  low: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300',
  medium:
    'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300',
  high: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
  critical: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300',
};

export default function FeedbackListPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 12;

  useEffect(() => {
    fetchFeedbacks();
  }, [currentPage, selectedType, searchTerm]);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: currentPage.toString(),
        limit: itemsPerPage.toString(),
        ...(selectedType !== 'all' && { type: selectedType }),
        ...(searchTerm && { search: searchTerm }),
      });

      const response = await fetch(`/api/feedback?${params}`);
      const data = await response.json();

      if (data.success) {
        setFeedbacks(data.feedbacks);
        setTotalPages(Math.ceil(data.total / itemsPerPage));
      }
    } catch (error) {
      console.error('Error fetching feedbacks:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const matchesSearch =
      !searchTerm ||
      feedback.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      feedback.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType =
      selectedType === 'all' || feedback.type === selectedType;

    return matchesSearch && matchesType;
  });

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-900 py-8'>
      <div className='container mx-auto px-4'>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className='text-center mb-8'
        >
          <h1 className='text-4xl font-bold text-gray-900 dark:text-white mb-4'>
            Góp Ý Từ Cộng Đồng 💬
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto'>
            Xem những góp ý và đánh giá từ người chơi khác về trò chơi Thật Hay
            Thách
          </p>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg mb-8'
        >
          <div className='flex flex-col md:flex-row gap-4'>
            {/* Search */}
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                placeholder='Tìm kiếm góp ý...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
              />
            </div>

            {/* Filter by Type */}
            <div className='relative'>
              <Filter className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className='pl-10 pr-8 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white appearance-none min-w-[150px]'
              >
                <option value='all'>Tất cả</option>
                <option value='rating'>Đánh giá</option>
                <option value='bug'>Báo lỗi</option>
                <option value='feature'>Tính năng</option>
                <option value='general'>Góp ý</option>
              </select>
            </div>
          </div>

          {/* Stats */}
          <div className='mt-4 pt-4 border-t border-gray-200 dark:border-gray-700'>
            <div className='flex items-center justify-between text-sm text-gray-600 dark:text-gray-400'>
              <span>Hiển thị {filteredFeedbacks.length} góp ý</span>
              <span>
                Trang {currentPage} / {totalPages}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Feedback Grid */}
        {loading ? (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className='bg-white dark:bg-gray-800 rounded-xl p-6 animate-pulse'
              >
                <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded mb-4'></div>
                <div className='h-20 bg-gray-300 dark:bg-gray-600 rounded mb-4'></div>
                <div className='h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4'></div>
              </div>
            ))}
          </div>
        ) : filteredFeedbacks.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className='text-center py-12'
          >
            <MessageSquare className='w-16 h-16 text-gray-400 mx-auto mb-4' />
            <h3 className='text-xl font-semibold text-gray-900 dark:text-white mb-2'>
              Chưa có góp ý nào
            </h3>
            <p className='text-gray-600 dark:text-gray-400'>
              {searchTerm || selectedType !== 'all'
                ? 'Không tìm thấy góp ý phù hợp với bộ lọc của bạn'
                : 'Hãy là người đầu tiên đóng góp ý kiến!'}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          >
            {filteredFeedbacks.map((feedback, index) => {
              const TypeIcon = typeConfig[feedback.type].icon;

              return (
                <motion.div
                  key={feedback.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className='bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700'
                >
                  {/* Header */}
                  <div className='flex items-start justify-between mb-4'>
                    <div className='flex items-center space-x-2'>
                      <div
                        className={`p-2 rounded-lg ${
                          typeConfig[feedback.type].color
                        }`}
                      >
                        <TypeIcon className='w-4 h-4' />
                      </div>
                      <span className='text-sm font-medium text-gray-600 dark:text-gray-400'>
                        {typeConfig[feedback.type].label}
                      </span>
                    </div>

                    {feedback.priority && feedback.priority !== 'medium' && (
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          priorityColors[
                            feedback.priority as keyof typeof priorityColors
                          ]
                        }`}
                      >
                        {feedback.priority === 'high'
                          ? 'Cao'
                          : feedback.priority === 'critical'
                          ? 'Khẩn cấp'
                          : 'Thấp'}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2'>
                    {feedback.title}
                  </h3>

                  {/* Description */}
                  <p className='text-gray-600 dark:text-gray-400 mb-4 line-clamp-3'>
                    {feedback.description}
                  </p>

                  {/* Rating */}
                  {feedback.rating && feedback.rating > 0 && (
                    <div className='flex items-center space-x-1 mb-4'>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-4 h-4 ${
                            star <= (feedback.rating || 0)
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300 dark:text-gray-600'
                          }`}
                        />
                      ))}
                      <span className='text-sm text-gray-600 dark:text-gray-400 ml-2'>
                        ({feedback.rating}/5)
                      </span>
                    </div>
                  )}

                  {/* Footer */}
                  <div className='flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 pt-4 border-t border-gray-200 dark:border-gray-700'>
                    <div className='flex items-center space-x-1'>
                      <Calendar className='w-4 h-4' />
                      <span>{formatDate(feedback.created_at)}</span>
                    </div>

                    {feedback.category && (
                      <span className='px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs'>
                        {feedback.category}
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className='flex justify-center mt-8'
          >
            <div className='flex space-x-2'>
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className='px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
              >
                Trước
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === i + 1
                      ? 'bg-blue-500 text-white'
                      : 'bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className='px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
              >
                Sau
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
