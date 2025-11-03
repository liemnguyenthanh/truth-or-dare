import { useCallback, useEffect, useState } from 'react';

import { createComment, getCommentsByFeedbackId } from '@/lib/feedback';
import { commentSchema } from '@/lib/validations/feedback';

import type { FeedbackComment } from '@/types/feedback';

interface CommentFormData {
  content: string;
  author_name: string;
  email: string;
}

interface UseCommentsReturn {
  comments: FeedbackComment[];
  loading: boolean;
  replyingTo: number | null;
  commentData: CommentFormData;
  setReplyingTo: (id: number | null) => void;
  setCommentData: (data: Partial<CommentFormData>) => void;
  handleCommentSubmit: (feedbackId: number, parentId?: number) => Promise<void>;
  loadComments: (feedbackId: number) => Promise<void>;
  resetCommentForm: () => void;
}

export function useComments(feedbackId: number | null): UseCommentsReturn {
  const [comments, setComments] = useState<FeedbackComment[]>([]);
  const [loading, setLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [commentData, setCommentDataState] = useState<CommentFormData>({
    content: '',
    author_name: '',
    email: '',
  });

  const loadComments = useCallback(async (id: number) => {
    setLoading(true);
    try {
      const result = await getCommentsByFeedbackId(id);
      if (result.success) {
        setComments(result.comments);
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (feedbackId) {
      loadComments(feedbackId);
    }
  }, [feedbackId, loadComments]);

  const resetCommentForm = () => {
    setCommentDataState({ content: '', author_name: '', email: '' });
    setReplyingTo(null);
  };

  const setCommentData = (data: Partial<CommentFormData>) => {
    setCommentDataState((prev) => ({ ...prev, ...data }));
  };

  const handleCommentSubmit = useCallback(
    async (id: number, parentId?: number) => {
      try {
        const validatedData = commentSchema.parse(commentData);
        const userAgent = navigator.userAgent;

        await createComment({
          feedback_id: id,
          parent_id: parentId,
          content: validatedData.content,
          author_name: validatedData.author_name,
          email: validatedData.email || undefined,
          userAgent,
          ipAddress: 'client-side',
        });

        resetCommentForm();
        await loadComments(id);
      } catch (error: any) {
        console.error('Error submitting comment:', error);
      }
    },
    [commentData, loadComments]
  );

  return {
    comments,
    loading,
    replyingTo,
    commentData,
    setReplyingTo,
    setCommentData,
    handleCommentSubmit,
    loadComments,
    resetCommentForm,
  };
}

