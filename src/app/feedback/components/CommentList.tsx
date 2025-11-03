'use client';

import { MessageCircle } from 'lucide-react';

import { Heading, Text } from '@/components/shared';

import type { FeedbackComment } from '@/types/feedback';

import { CommentItem } from './CommentItem';

interface CommentListProps {
  comments: FeedbackComment[];
  loading: boolean;
  replyingTo: number | null;
  commentData: {
    content: string;
    author_name: string;
  };
  onReplyClick: (commentId: number) => void;
  onCommentSubmit: (e: React.FormEvent, parentId?: number) => void;
  onCommentDataChange: (field: string, value: string) => void;
  isSubmitting?: boolean;
}

export function CommentList({
  comments,
  loading,
  replyingTo,
  commentData,
  onReplyClick,
  onCommentSubmit,
  onCommentDataChange,
  isSubmitting = false,
}: CommentListProps) {
  if (loading) {
    return (
      <div className='text-center py-8'>
        <div className='animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 dark:border-purple-400 mx-auto mb-2'></div>
        <Text>Đang tải bình luận...</Text>
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className='text-center py-8'>
        <MessageCircle className='w-12 h-12 mx-auto mb-2 opacity-50 text-gray-400 dark:text-gray-600' />
        <Text>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</Text>
      </div>
    );
  }

  return (
    <div className='space-y-4'>
      {comments.map((comment) => (
        <CommentItem
          key={comment.id}
          comment={comment}
          replyingTo={replyingTo}
          commentData={commentData}
          onReplyClick={onReplyClick}
          onCommentSubmit={(e) => onCommentSubmit(e, comment.id)}
          onCommentDataChange={onCommentDataChange}
          isSubmitting={isSubmitting}
        />
      ))}
    </div>
  );
}

