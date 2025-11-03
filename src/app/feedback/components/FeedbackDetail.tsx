'use client';

import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

import { Heading, PrimaryButton, Text } from '@/components/shared';

import type { Feedback, FeedbackComment } from '@/types/feedback';

import { formatDate } from '../utils/formatDate';
import { CommentForm } from './CommentForm';
import { CommentList } from './CommentList';

interface FeedbackDetailProps {
  feedback: Feedback;
  comments: FeedbackComment[];
  loadingComments: boolean;
  replyingTo: number | null;
  commentData: {
    content: string;
    author_name: string;
  };
  isSubmittingComment: boolean;
  onBack: () => void;
  onCommentContentChange: (value: string) => void;
  onCommentAuthorNameChange: (value: string) => void;
  onCommentSubmit: (e: React.FormEvent) => void;
  onReplyClick: (commentId: number) => void;
  onReplySubmit: (e: React.FormEvent, parentId: number) => void;
  onCommentDataChange: (field: string, value: string) => void;
}

export function FeedbackDetail({
  feedback,
  comments,
  loadingComments,
  replyingTo,
  commentData,
  isSubmittingComment,
  onBack,
  onCommentContentChange,
  onCommentAuthorNameChange,
  onCommentSubmit,
  onReplyClick,
  onReplySubmit,
  onCommentDataChange,
}: FeedbackDetailProps) {
  return (
    <div className='max-w-4xl mx-auto mt-4'>
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className='mb-4 flex items-center gap-2 text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors'
      >
        <ArrowLeft className='w-4 h-4' />
        <span>Quay lại</span>
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 sm:p-6 lg:p-8'
      >
        <div className='mb-6'>
          <Heading level={2} className='mb-3'>
            {feedback.title}
          </Heading>
          <Text className='mb-4 whitespace-pre-wrap'>{feedback.description}</Text>
          <div className='flex items-center gap-4 flex-wrap'>
            <Text variant='caption' className='!mb-0'>
              {formatDate(feedback.created_at)}
            </Text>
            {feedback.rating && (
              <div className='flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400'>
                <span>⭐</span>
                <span>{feedback.rating}/5</span>
              </div>
            )}
          </div>
        </div>

        <div className='border-t border-gray-200 dark:border-gray-700 pt-6'>
          <div className='flex items-center gap-2 mb-6'>
            <MessageCircle className='w-5 h-5 text-purple-600 dark:text-purple-400' />
            <Heading level={3} className='!mb-0'>
              Bình luận ({comments.length})
            </Heading>
          </div>

          <CommentForm
            content={commentData.content}
            authorName={commentData.author_name}
            isSubmitting={isSubmittingComment}
            onContentChange={onCommentContentChange}
            onAuthorNameChange={onCommentAuthorNameChange}
            onSubmit={onCommentSubmit}
          />

          <CommentList
            comments={comments}
            loading={loadingComments}
            replyingTo={replyingTo}
            commentData={commentData}
            onReplyClick={onReplyClick}
            onCommentSubmit={(e, parentId) => {
              if (parentId !== undefined) {
                onReplySubmit(e, parentId);
              }
            }}
            onCommentDataChange={onCommentDataChange}
            isSubmitting={isSubmittingComment}
          />
        </div>
      </motion.div>
    </div>
  );
}

