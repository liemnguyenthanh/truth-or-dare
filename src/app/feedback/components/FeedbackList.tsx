'use client';

import { AnimatePresence, motion } from 'framer-motion';

import { Heading, Text } from '@/components/shared';

import type { Feedback, FeedbackComment } from '@/types/feedback';

import { FeedbackCard } from './FeedbackCard';

interface FeedbackListProps {
  feedbacks: Feedback[];
  loading: boolean;
  expandedFeedbackId: number | null;
  commentCounts: Record<number, number>;
  commentsMap: Record<number, FeedbackComment[]>;
  loadingCommentsMap: Record<number, boolean>;
  replyingToMap: Record<number, number | null>;
  commentDataMap: Record<number, { content: string; author_name: string }>;
  isSubmittingCommentMap: Record<number, boolean>;
  onFeedbackExpand: (feedbackId: number) => void;
  onCommentSubmit: (feedbackId: number) => (e: React.FormEvent) => void;
  onReplySubmit: (feedbackId: number) => (e: React.FormEvent, parentId: number) => void;
  onReplyClick: (feedbackId: number, commentId: number) => void;
  onCommentDataChange: (feedbackId: number, field: string, value: string) => void;
}

export function FeedbackList({
  feedbacks,
  loading,
  expandedFeedbackId,
  commentCounts,
  commentsMap,
  loadingCommentsMap,
  replyingToMap,
  commentDataMap,
  isSubmittingCommentMap,
  onFeedbackExpand,
  onCommentSubmit,
  onReplySubmit,
  onReplyClick,
  onCommentDataChange,
}: FeedbackListProps) {
  if (loading) {
    return (
      <div className='text-center py-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400 mx-auto mb-2'></div>
        <Text>Đang tải...</Text>
      </div>
    );
  }

  if (feedbacks.length === 0) {
    return (
      <div className='text-center py-8'>
        <Text>Chưa có góp ý nào. Hãy là người đầu tiên!</Text>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {feedbacks.map((feedback) => (
        <FeedbackCard
          key={feedback.id}
          feedback={feedback}
          isExpanded={expandedFeedbackId === feedback.id}
          commentCount={commentCounts[feedback.id] || 0}
          comments={commentsMap[feedback.id] || []}
          loadingComments={loadingCommentsMap[feedback.id] || false}
          replyingTo={replyingToMap[feedback.id] || null}
          commentData={commentDataMap[feedback.id] || { content: '', author_name: '' }}
          isSubmittingComment={isSubmittingCommentMap[feedback.id] || false}
          onToggle={() => onFeedbackExpand(feedback.id)}
          onCommentSubmit={onCommentSubmit(feedback.id)}
          onReplySubmit={onReplySubmit(feedback.id)}
          onReplyClick={(commentId) => onReplyClick(feedback.id, commentId)}
          onCommentDataChange={(field, value) =>
            onCommentDataChange(feedback.id, field, value)
          }
        />
      ))}
    </div>
  );
}
