'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Send, Star, X } from 'lucide-react';
import { useState } from 'react';

import { useTranslations } from '@/hooks/useTranslations';

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
  { emoji: '😍', value: 'love' },
  { emoji: '😊', value: 'happy' },
  { emoji: '😐', value: 'neutral' },
  { emoji: '😕', value: 'disappointed' },
  { emoji: '😠', value: 'angry' },
];

export default function RatingModal({
  isOpen,
  onClose,
  onSubmit,
  title,
  description,
  showEmoji = true,
}: RatingModalProps) {
  const t = useTranslations();
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
        love: t.ratingModal.defaultComments.love,
        happy: t.ratingModal.defaultComments.happy,
        neutral: t.ratingModal.defaultComments.neutral,
        disappointed: t.ratingModal.defaultComments.disappointed,
        angry: t.ratingModal.defaultComments.angry,
      };
      return comments[selectedEmoji] || t.ratingModal.defaultComments.thankYou;
    }

    if (rating >= 4) return t.ratingModal.defaultComments.excellent;
    if (rating === 3) return t.ratingModal.defaultComments.okay;
    if (rating >= 1) return t.ratingModal.defaultComments.needsImprovement;
    return t.ratingModal.defaultComments.thankYou;
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
                  {title || t.ratingModal.title}
                </h3>
                <p className='text-sm text-gray-600 dark:text-gray-400'>
                  {description || t.ratingModal.description}
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
                  {t.ratingModal.yourEmotion}
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
                      title={
                        t.ratingModal.emojiLabels[
                          option.value as keyof typeof t.ratingModal.emojiLabels
                        ]
                      }
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
                {t.ratingModal.starRating}
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
                  {rating} / 5 {t.ratingModal.stars}
                </p>
              )}
            </div>

            {/* Comment */}
            <div>
              <label className='block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2'>
                {t.ratingModal.commentLabel}
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={t.ratingModal.commentPlaceholder}
                rows={3}
                maxLength={500}
                className='w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white text-sm resize-none'
              />
              <p className='text-xs text-gray-500 dark:text-gray-400 mt-1'>
                {comment.length}/500 {t.ratingModal.characters}
              </p>
            </div>

            {/* Buttons */}
            <div className='flex space-x-3 pt-4'>
              <button
                type='button'
                onClick={handleClose}
                className='flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors'
              >
                {t.ratingModal.cancel}
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
                    <span>{t.ratingModal.submitting}</span>
                  </>
                ) : (
                  <>
                    <Send className='w-4 h-4' />
                    <span>{t.ratingModal.submit}</span>
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
