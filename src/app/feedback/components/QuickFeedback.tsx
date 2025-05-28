'use client';

import { motion } from 'framer-motion';
import { Send, Star } from 'lucide-react';
import { useState } from 'react';

interface QuickFeedbackProps {
  onSubmit: (data: {
    rating: number;
    description: string;
    emoji?: string;
  }) => Promise<void>;
  isSubmitting?: boolean;
}

const emojiReactions = [
  { emoji: '😍', label: 'Tuyệt vời', value: 'love' },
  { emoji: '😊', label: 'Hài lòng', value: 'happy' },
  { emoji: '😐', label: 'Tạm được', value: 'neutral' },
  { emoji: '😕', label: 'Không ổn', value: 'disappointed' },
  { emoji: '😠', label: 'Tệ', value: 'angry' },
];

export default function QuickFeedback({
  onSubmit,
  isSubmitting = false,
}: QuickFeedbackProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedEmoji, setSelectedEmoji] = useState<string>('');
  const [comment, setComment] = useState('');
  const [showForm, setShowForm] = useState(false);

  const handleEmojiClick = (emoji: string) => {
    setSelectedEmoji(emoji);
    setComment(getDefaultComment(emoji, 0)); // Pre-fill with default comment
    setShowForm(true);
  };

  const handleStarClick = (star: number) => {
    setRating(star);
    setComment(getDefaultComment('', star)); // Pre-fill with default comment
    setShowForm(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 && !selectedEmoji) return;

    const finalComment =
      comment.trim() || getDefaultComment(selectedEmoji, rating);

    await onSubmit({
      rating: rating || (selectedEmoji ? getEmojiRating(selectedEmoji) : 3),
      description: finalComment,
      emoji: selectedEmoji,
    });

    // Reset form
    setRating(0);
    setSelectedEmoji('');
    setComment('');
    setShowForm(false);
  };

  const getEmojiRating = (emoji: string): number => {
    const ratings: Record<string, number> = {
      love: 5,
      happy: 4,
      neutral: 3,
      disappointed: 2,
      angry: 1,
    };
    return ratings[emoji] || 3;
  };

  const getDefaultComment = (emoji: string, rating: number): string => {
    if (emoji) {
      const comments: Record<string, string> = {
        love: 'Tuyệt vời! Tôi rất yêu thích trò chơi này!',
        happy: 'Khá tốt, tôi hài lòng với trải nghiệm chơi game',
        neutral: 'Bình thường, có thể cải thiện thêm một chút',
        disappointed: 'Không như mong đợi, cần cải thiện',
        angry: 'Rất tệ, cần cải thiện ngay lập tức',
      };
      return comments[emoji] || 'Cảm ơn bạn đã phản hồi về trò chơi!';
    }

    if (rating >= 4) return 'Trải nghiệm chơi game rất tuyệt vời!';
    if (rating === 3) return 'Trải nghiệm chơi game tạm ổn, có thể cải thiện';
    if (rating >= 1) return 'Trò chơi cần cải thiện thêm nhiều';
    return 'Cảm ơn bạn đã đánh giá trò chơi của chúng tôi!';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className='bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-6 border border-blue-200 dark:border-gray-600'
    >
      <div className='text-center'>
        <h3 className='text-lg font-semibold text-gray-900 dark:text-white mb-2'>
          Bạn cảm thấy thế nào?
        </h3>
        <p className='text-gray-600 dark:text-gray-400 mb-6'>
          Đánh giá nhanh trải nghiệm của bạn
        </p>

        {!showForm ? (
          <div className='space-y-6'>
            {/* Emoji Reactions */}
            <div>
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
                Cảm xúc của bạn
              </p>
              <div className='flex justify-center space-x-3'>
                {emojiReactions.map((reaction) => (
                  <motion.button
                    key={reaction.value}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleEmojiClick(reaction.value)}
                    className={`w-12 h-12 rounded-full border-2 transition-all hover:shadow-lg ${
                      selectedEmoji === reaction.value
                        ? 'border-blue-500 bg-blue-100 dark:bg-blue-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                    }`}
                    title={reaction.label}
                  >
                    <span className='text-2xl'>{reaction.emoji}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <p className='text-sm font-medium text-gray-700 dark:text-gray-300 mb-3'>
                Hoặc đánh giá sao
              </p>
              <div className='flex justify-center items-center space-x-1'>
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => handleStarClick(star)}
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
            </div>
          </div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className='space-y-4'
          >
            {/* Selected feedback display */}
            <div className='flex items-center justify-center space-x-2 mb-4'>
              {selectedEmoji && (
                <span className='text-2xl'>
                  {emojiReactions.find((r) => r.value === selectedEmoji)?.emoji}
                </span>
              )}
              {rating > 0 && (
                <div className='flex'>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= rating
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Comment */}
            <div>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Chia sẻ thêm về trải nghiệm của bạn (tùy chọn)'
                rows={3}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm resize-none'
              />
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                {comment.length}/500 ký tự
              </p>
            </div>

            {/* Buttons */}
            <div className='flex space-x-3'>
              <button
                type='button'
                onClick={() => {
                  setShowForm(false);
                  setSelectedEmoji('');
                  setRating(0);
                  setComment('');
                }}
                className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors'
              >
                Hủy
              </button>
              <motion.button
                type='submit'
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className='flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2'
              >
                {isSubmitting ? (
                  <>
                    <div className='w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                    <span>Gửi...</span>
                  </>
                ) : (
                  <>
                    <Send className='w-4 h-4' />
                    <span>Gửi</span>
                  </>
                )}
              </motion.button>
            </div>
          </motion.form>
        )}
      </div>
    </motion.div>
  );
}
