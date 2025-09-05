'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Send, Star, X } from 'lucide-react';
import { useState } from 'react';

interface RatingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (data: {
    rating: number;
    comment: string;
    emoji?: string;
  }) => Promise<void>;
  title?: string;
  description?: string;
  showEmoji?: boolean;
}

const emojiOptions = [
  { emoji: '😍', label: 'Tuyệt vời', value: 'love' },
  { emoji: '😊', label: 'Hài lòng', value: 'happy' },
  { emoji: '😐', label: 'Tạm được', value: 'neutral' },
  { emoji: '😕', label: 'Không ổn', value: 'disappointed' },
  { emoji: '😠', label: 'Tệ', value: 'angry' },
];

export default function RatingModal({
  isOpen,
  onClose,
  onSubmit,
  title = 'Đánh giá trải nghiệm',
  description = 'Chia sẻ cảm nhận của bạn về trò chơi',
  showEmoji = true,
}: RatingModalProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    try {
      const defaultComment = comment.trim() || getDefaultComment();

      if (onSubmit) {
        await onSubmit({
          rating,
          comment: defaultComment,
          emoji: selectedEmoji,
        });
      }

      // Reset form
      setRating(0);
      setComment('');
      setSelectedEmoji('');
      onClose();
    } catch (error) {
      console.error('Error submitting rating:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getDefaultComment = () => {
    if (selectedEmoji) {
      const comments: Record<string, string> = {
        love: 'Tuyệt vời! Tôi rất yêu thích trò chơi này!',
        happy: 'Khá tốt, tôi hài lòng với trải nghiệm chơi game',
        neutral: 'Bình thường, có thể cải thiện thêm một chút',
        disappointed: 'Không như mong đợi, cần cải thiện',
        angry: 'Rất tệ, cần cải thiện ngay lập tức',
      };
      return comments[selectedEmoji] || 'Cảm ơn bạn đã phản hồi về trò chơi!';
    }

    if (rating >= 4) return 'Trải nghiệm chơi game rất tuyệt vời!';
    if (rating === 3) return 'Trải nghiệm chơi game tạm ổn, có thể cải thiện';
    if (rating >= 1) return 'Trò chơi cần cải thiện thêm nhiều';
    return 'Cảm ơn bạn đã đánh giá trò chơi của chúng tôi!';
  };

  const handleClose = () => {
    setRating(0);
    setComment('');
    setSelectedEmoji('');
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4'
        onClick={handleClose}
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
              <div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center'>
                <Heart className='w-6 h-6 text-white' />
              </div>
              <div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white'>
                  {title}
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {description}
                </p>
              </div>
            </div>
            <button
              onClick={handleClose}
              className='p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors'
            >
              <X className='w-5 h-5 text-gray-400' />
            </button>
          </div>

          <form onSubmit={handleSubmit} className='space-y-6'>
            {/* Emoji Selection */}
            {showEmoji && (
              <div>
                <p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
                  Cảm xúc của bạn
                </p>
                <div className='flex justify-center space-x-2'>
                  {emojiOptions.map((option) => (
                    <motion.button
                      key={option.value}
                      type='button'
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() =>
                        setSelectedEmoji(
                          selectedEmoji === option.value ? '' : option.value
                        )
                      }
                      className={`w-12 h-12 rounded-full border-2 transition-all ${
                        selectedEmoji === option.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30 scale-110'
                          : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                      }`}
                      title={option.label}
                    >
                      <span className='text-2xl'>{option.emoji}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Star Rating */}
            <div>
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
                Đánh giá sao (bắt buộc)
              </p>
              <div className='flex justify-center items-center space-x-1'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type='button'
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setRating(star)}
                    className='p-1 hover:scale-110 transition-transform'
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
              </div>
              {rating > 0 && (
                <p className='text-center text-sm text-gray-600 dark:text-gray-400 mt-2'>
                  {rating} / 5 sao
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                Nhận xét (tùy chọn)
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Chia sẻ thêm về trải nghiệm của bạn...'
                rows={3}
                maxLength={500}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm resize-none'
              />
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                {comment.length}/500 ký tự
              </p>
            </div>

            {/* Buttons */}
            <div className='flex space-x-3 pt-4'>
              <button
                type='button'
                onClick={handleClose}
                className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
              >
                Hủy
              </button>
              <motion.button
                type='submit'
                disabled={rating === 0 || isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-all flex items-center justify-center space-x-2 shadow-lg'
              >
                {isSubmitting ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    <span>Gửi...</span>
                  </>
                ) : (
                  <>
                    <Send className='w-4 h-4' />
                    <span>Gửi đánh giá</span>
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
