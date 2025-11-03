'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useState, useCallback, useEffect } from 'react';

import { Heading, PrimaryButton, Text } from '@/components/shared';

import { createComment, getCommentsByFeedbackId, getCommentCountsByFeedbackIds } from '@/lib/feedback';
import { commentSchema } from '@/lib/validations/feedback';

import type { Feedback, FeedbackComment } from '@/types/feedback';

import { FeedbackForm, FeedbackList } from './components';
import { useFeedbackForm, useFeedbackList } from './hooks';

export default function FeedbackPage() {
  const [showForm, setShowForm] = useState(false);
  const [expandedFeedbackId, setExpandedFeedbackId] = useState<number | null>(null);
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});
  const [commentsMap, setCommentsMap] = useState<Record<number, FeedbackComment[]>>({});
  const [loadingCommentsMap, setLoadingCommentsMap] = useState<Record<number, boolean>>({});
  const [replyingToMap, setReplyingToMap] = useState<Record<number, number | null>>({});
  const [commentDataMap, setCommentDataMap] = useState<
    Record<number, { content: string; author_name: string }>
  >({});
  const [isSubmittingCommentMap, setIsSubmittingCommentMap] = useState<
    Record<number, boolean>
  >({});

  // Hooks
  const feedbackList = useFeedbackList(50);
  const feedbackForm = useFeedbackForm(() => {
    feedbackList.loadFeedbacks();
    setTimeout(() => setShowForm(false), 2000);
  });

  // Sync comment counts from hook
  useEffect(() => {
    setCommentCounts(feedbackList.commentCounts);
  }, [feedbackList.commentCounts]);

  // Load comments for a feedback
  const loadComments = useCallback(async (feedbackId: number) => {
    setLoadingCommentsMap((prev) => ({ ...prev, [feedbackId]: true }));
    try {
      const result = await getCommentsByFeedbackId(feedbackId);
      if (result.success) {
        setCommentsMap((prev) => ({ ...prev, [feedbackId]: result.comments }));
      }
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoadingCommentsMap((prev) => ({ ...prev, [feedbackId]: false }));
    }
  }, []);

  // Initialize comment data for a feedback
  const initCommentData = useCallback((feedbackId: number) => {
    if (!commentDataMap[feedbackId]) {
      setCommentDataMap((prev) => ({
        ...prev,
        [feedbackId]: { content: '', author_name: '' },
      }));
    }
  }, [commentDataMap]);

  const handleFeedbackExpand = useCallback(
    (feedbackId: number) => {
      const willExpand = expandedFeedbackId !== feedbackId;
      setExpandedFeedbackId(willExpand ? feedbackId : null);
      
      if (willExpand) {
        initCommentData(feedbackId);
        if (!commentsMap[feedbackId] && !loadingCommentsMap[feedbackId]) {
          loadComments(feedbackId);
        }
      }
    },
    [expandedFeedbackId, commentsMap, loadingCommentsMap, loadComments, initCommentData]
  );

  const handleCommentSubmit = useCallback(
    (feedbackId: number) => async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmittingCommentMap((prev) => ({ ...prev, [feedbackId]: true }));

      try {
        const commentData = commentDataMap[feedbackId] || { content: '', author_name: '' };
        const validatedData = commentSchema.parse(commentData);
        const userAgent = navigator.userAgent;

        await createComment({
          feedback_id: feedbackId,
          content: validatedData.content,
          author_name: validatedData.author_name,
          email: validatedData.email || undefined,
          userAgent,
          ipAddress: 'client-side',
        });

        // Reset comment form
        setCommentDataMap((prev) => ({
          ...prev,
          [feedbackId]: { content: '', author_name: '' },
        }));

        // Reload comments
        await loadComments(feedbackId);
        
        // Update comment count for this feedback
        const counts = await getCommentCountsByFeedbackIds([feedbackId]);
        setCommentCounts((prev) => ({ ...prev, ...counts }));
      } catch (error) {
        console.error('Error submitting comment:', error);
      } finally {
        setIsSubmittingCommentMap((prev) => ({ ...prev, [feedbackId]: false }));
      }
    },
    [commentDataMap, loadComments]
  );

  const handleReplySubmit = useCallback(
    (feedbackId: number) => async (e: React.FormEvent, parentId: number) => {
      e.preventDefault();
      setIsSubmittingCommentMap((prev) => ({ ...prev, [feedbackId]: true }));

      try {
        const commentData = commentDataMap[feedbackId] || { content: '', author_name: '' };
        const validatedData = commentSchema.parse(commentData);
        const userAgent = navigator.userAgent;

        await createComment({
          feedback_id: feedbackId,
          parent_id: parentId,
          content: validatedData.content,
          author_name: validatedData.author_name,
          email: validatedData.email || undefined,
          userAgent,
          ipAddress: 'client-side',
        });

        // Reset comment form
        setCommentDataMap((prev) => ({
          ...prev,
          [feedbackId]: { content: '', author_name: '' },
        }));
        setReplyingToMap((prev) => ({ ...prev, [feedbackId]: null }));

        // Reload comments
        await loadComments(feedbackId);
        
        // Update comment count for this feedback
        const counts = await getCommentCountsByFeedbackIds([feedbackId]);
        setCommentCounts((prev) => ({ ...prev, ...counts }));
      } catch (error) {
        console.error('Error submitting reply:', error);
      } finally {
        setIsSubmittingCommentMap((prev) => ({ ...prev, [feedbackId]: false }));
      }
    },
    [commentDataMap, loadComments]
  );

  const handleReplyClick = useCallback(
    (feedbackId: number, commentId: number) => {
      setReplyingToMap((prev) => ({
        ...prev,
        [feedbackId]: prev[feedbackId] === commentId ? null : commentId,
      }));
      initCommentData(feedbackId);
    },
    [initCommentData]
  );

  const handleCommentDataChange = useCallback(
    (feedbackId: number, field: string, value: string) => {
      setCommentDataMap((prev) => ({
        ...prev,
        [feedbackId]: {
          ...(prev[feedbackId] || { content: '', author_name: '' }),
          [field]: value,
        },
      }));
    },
    []
  );

  return (
    <div className='min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-900 dark:to-gray-800 p-2 sm:p-4 transition-colors duration-200'>
      <div className='max-w-4xl mx-auto mt-2 sm:mt-4'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className='bg-white dark:bg-gray-800 rounded-xl shadow-lg p-3 sm:p-6 lg:p-8'
        >
          <div className='text-center mb-6 sm:mb-8'>
            <Heading level={1} className='mb-2 sm:mb-3 text-2xl sm:text-3xl'>
              💬 Góp Ý & Thảo Luận
            </Heading>
            <Text variant='large' className='text-sm sm:text-base'>
              Chia sẻ ý kiến của bạn hoặc tham gia thảo luận với cộng đồng
            </Text>
          </div>

          <AnimatePresence>
            {showForm && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className='mb-8 overflow-hidden'
              >
                <FeedbackForm
                  formData={feedbackForm.formData}
                  errors={feedbackForm.errors}
                  isSubmitting={feedbackForm.isSubmitting}
                  isSubmitted={feedbackForm.isSubmitted}
                  onInputChange={(field, value) =>
                    feedbackForm.setFormData({ [field]: value })
                  }
                  onSubmit={feedbackForm.handleSubmit}
                />
              </motion.div>
            )}
          </AnimatePresence>

          <div className='border-t border-gray-200 dark:border-gray-700 pt-4 sm:pt-6'>
            <div className='flex items-center justify-between mb-3 sm:mb-4 gap-2 flex-wrap'>
              <Heading level={2} className='!mb-0 text-lg sm:text-xl'>
                Các góp ý gần đây
              </Heading>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowForm(!showForm)}
                className='text-xs sm:text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 transition-colors whitespace-nowrap'
              >
                {showForm ? 'Ẩn form' : 'Gửi góp ý'}
              </motion.button>
            </div>

            <FeedbackList
              feedbacks={feedbackList.feedbacks}
              loading={feedbackList.loading}
              expandedFeedbackId={expandedFeedbackId}
              commentCounts={commentCounts}
              commentsMap={commentsMap}
              loadingCommentsMap={loadingCommentsMap}
              replyingToMap={replyingToMap}
              commentDataMap={commentDataMap}
              isSubmittingCommentMap={isSubmittingCommentMap}
              onFeedbackExpand={handleFeedbackExpand}
              onCommentSubmit={handleCommentSubmit}
              onReplySubmit={handleReplySubmit}
              onReplyClick={handleReplyClick}
              onCommentDataChange={handleCommentDataChange}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
