'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, MessageCircle } from 'lucide-react';

import { Heading, PrimaryButton, Text } from '@/components/shared';

import type { Feedback, FeedbackComment } from '@/types/feedback';

import { formatDate } from '../utils/formatDate';
import { CommentForm } from './CommentForm';
import { CommentItem } from './CommentItem';

interface FeedbackCardProps {
  feedback: Feedback;
  isExpanded: boolean;
  commentCount?: number;
  comments?: FeedbackComment[];
  loadingComments?: boolean;
  replyingTo: number | null;
  commentData: {
    content: string;
    author_name: string;
  };
  isSubmittingComment?: boolean;
  onToggle: () => void;
  onCommentSubmit: (e: React.FormEvent) => void;
  onReplySubmit: (e: React.FormEvent, parentId: number) => void;
  onReplyClick: (commentId: number) => void;
  onCommentDataChange: (field: string, value: string) => void;
}

export function FeedbackCard({
  feedback,
  isExpanded,
  commentCount = 0,
  comments = [],
  loadingComments = false,
  replyingTo,
  commentData,
  isSubmittingComment = false,
  onToggle,
  onCommentSubmit,
  onReplySubmit,
  onReplyClick,
  onCommentDataChange,
}: FeedbackCardProps) {
  // Calculate total comments including replies
  const totalComments = comments.reduce((acc, comment) => {
    const repliesCount = comment.replies?.length || 0;
    return acc + 1 + repliesCount; // 1 for comment itself + replies
  }, 0);

  // Use commentCount from props if available, otherwise calculate from loaded comments
  const displayCount = commentCount || totalComments;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className='border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden bg-white dark:bg-gray-800 hover:shadow-lg transition-all'
    >
      {/* Feedback Header - Always visible */}
      <motion.button
        onClick={onToggle}
        className='w-full text-left p-3 sm:p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors'
      >
        <div className='flex items-start justify-between mb-2 gap-2 sm:gap-4'>
          <Heading level={3} className='!mb-0 flex-1 text-base sm:text-lg'>
            {feedback.title}
          </Heading>
          <div className='flex items-center gap-2 sm:gap-3 flex-shrink-0'>
            <Text variant='caption' className='!mb-0 whitespace-nowrap text-xs'>
              {formatDate(feedback.created_at)}
            </Text>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChevronDown className='w-4 h-4 sm:w-5 sm:h-5 text-gray-400' />
            </motion.div>
          </div>
        </div>
        <Text className='mb-2 sm:mb-3 text-sm sm:text-base line-clamp-2'>{feedback.description}</Text>
        <div className='flex items-center gap-3 sm:gap-4 text-xs sm:text-sm flex-wrap'>
          <span className='flex items-center gap-1.5 text-purple-600 dark:text-purple-400'>
            <MessageCircle className='w-3 h-3 sm:w-4 sm:h-4' />
            <span className='hidden sm:inline'>Bình luận</span>
            <span className='sm:hidden'>BL</span>
            {displayCount > 0 && (
              <span className='ml-1 px-1.5 py-0.5 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-full text-[10px] sm:text-xs font-medium'>
                {displayCount}
              </span>
            )}
          </span>
          {feedback.rating && (
            <span className='flex items-center gap-1 text-gray-600 dark:text-gray-400'>
              <span>⭐</span>
              <span>{feedback.rating}/5</span>
            </span>
          )}
        </div>
      </motion.button>

      {/* Expanded Comments Section */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className='border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 overflow-hidden'
          >
            <div className='p-3 sm:p-4 space-y-3 sm:space-y-4'>
              {/* Comment Form */}
              <div className='bg-white dark:bg-gray-800 rounded-lg p-2 sm:p-3'>
                <CommentForm
                  content={commentData.content}
                  authorName={commentData.author_name}
                  isSubmitting={isSubmittingComment}
                  onContentChange={(value) => onCommentDataChange('content', value)}
                  onAuthorNameChange={(value) => onCommentDataChange('author_name', value)}
                  onSubmit={onCommentSubmit}
                />
              </div>

              {/* Comments List */}
              {loadingComments ? (
                <div className='text-center py-6 sm:py-8'>
                  <div className='animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600 dark:border-purple-400 mx-auto mb-2'></div>
                  <Text variant='small' className='text-xs sm:text-sm'>Đang tải bình luận...</Text>
                </div>
              ) : comments.length === 0 ? (
                <div className='text-center py-4 sm:py-6'>
                  <MessageCircle className='w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 opacity-50 text-gray-400 dark:text-gray-600' />
                  <Text variant='small' className='text-xs sm:text-sm'>Chưa có bình luận nào. Hãy là người đầu tiên!</Text>
                </div>
              ) : (
                <div className='space-y-2 sm:space-y-3'>
                  {comments.map((comment) => (
                    <CommentItem
                      key={comment.id}
                      comment={comment}
                      replyingTo={replyingTo}
                      commentData={commentData}
                      onReplyClick={onReplyClick}
                      onCommentSubmit={(e) => onReplySubmit(e, comment.id)}
                      onCommentDataChange={onCommentDataChange}
                      isSubmitting={isSubmittingComment}
                    />
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
