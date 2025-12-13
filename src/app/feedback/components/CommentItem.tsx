'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

import { useTranslation } from '@/hooks/useTranslation';

import { SecondaryButton, Text } from '@/components/shared';

import { formatDate } from '../utils/formatDate';

import type { FeedbackComment } from '@/types/feedback';

interface CommentItemProps {
  comment: FeedbackComment;
  depth?: number;
  replyingTo: number | null;
  commentData: {
    content: string;
    author_name: string;
  };
  onReplyClick: (commentId: number) => void;
  onCommentSubmit: (e: React.FormEvent, parentId: number) => void;
  onCommentDataChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

export function CommentItem({
  comment,
  depth = 0,
  replyingTo,
  commentData,
  onReplyClick,
  onCommentSubmit,
  onCommentDataChange,
  isSubmitting = false,
}: CommentItemProps) {
  const { t } = useTranslation({ namespaces: ['common'] });
  const isReplying = replyingTo === comment.id;

  return (
    <motion.div
      initial={{ opacity: 0, x: depth > 0 ? -10 : 0 }}
      animate={{ opacity: 1, x: 0 }}
      className={
        depth > 0 ? 'ml-3 sm:ml-6 md:ml-8 mt-3 sm:mt-4' : 'mt-3 sm:mt-4'
      }
    >
      <div className='bg-gray-50 dark:bg-gray-700/50 rounded-lg sm:rounded-xl p-3 sm:p-4 border border-gray-200 dark:border-gray-600'>
        <div className='flex items-start justify-between mb-2 gap-2'>
          <div className='flex items-center gap-2 flex-wrap'>
            <span className='font-semibold text-sm sm:text-base text-gray-900 dark:text-white'>
              {comment.author_name}
            </span>
            <Text variant='caption' className='!mb-0 text-xs'>
              {formatDate(comment.created_at)}
            </Text>
          </div>
        </div>
        <Text className='mb-2 sm:mb-3 text-sm sm:text-base whitespace-pre-wrap !text-gray-700 dark:!text-gray-300 break-words'>
          {comment.content}
        </Text>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => onReplyClick(comment.id)}
          className='text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-1 transition-colors py-1'
        >
          <MessageCircle className='w-3 h-3 sm:w-4 sm:h-4' />
          <span>{isReplying ? t('comments.cancel') : t('comments.reply')}</span>
        </motion.button>

        <AnimatePresence>
          {isReplying && (
            <motion.form
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              onSubmit={(e) => onCommentSubmit(e, comment.id)}
              className='mt-3 space-y-2 overflow-hidden'
            >
              <textarea
                value={commentData.content}
                onChange={(e) => onCommentDataChange('content', e.target.value)}
                placeholder={t('comments.writeComment')}
                rows={2}
                className='w-full px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white resize-none'
                required
              />
              <div className='flex flex-col sm:flex-row gap-2'>
                <input
                  type='text'
                  value={commentData.author_name}
                  onChange={(e) =>
                    onCommentDataChange('author_name', e.target.value)
                  }
                  placeholder={t('comments.yourName')}
                  className='flex-1 px-2 sm:px-3 py-2 text-xs sm:text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white'
                />
                <SecondaryButton
                  type='submit'
                  disabled={isSubmitting || !commentData.content.trim()}
                  size='sm'
                  className='w-full sm:w-auto'
                >
                  <MessageCircle className='w-3 h-3 sm:w-4 sm:h-4 inline mr-1' />
                  <span className='text-xs sm:text-sm'>
                    {t('comments.submit')}
                  </span>
                </SecondaryButton>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {comment.replies && comment.replies.length > 0 && (
          <div className='mt-3 sm:mt-4'>
            {comment.replies.map((reply) => (
              <CommentItem
                key={reply.id}
                comment={reply}
                depth={depth + 1}
                replyingTo={replyingTo}
                commentData={commentData}
                onReplyClick={onReplyClick}
                onCommentSubmit={onCommentSubmit}
                onCommentDataChange={onCommentDataChange}
                isSubmitting={isSubmitting}
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}
