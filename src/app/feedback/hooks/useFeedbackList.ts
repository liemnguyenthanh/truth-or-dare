import { useCallback, useEffect, useState } from 'react';

import { getFeedbackList, getCommentCountsByFeedbackIds } from '@/lib/feedback';

import type { Feedback } from '@/types/feedback';

interface UseFeedbackListReturn {
  feedbacks: Feedback[];
  loading: boolean;
  error: string | null;
  commentCounts: Record<number, number>;
  loadFeedbacks: () => Promise<void>;
}

export function useFeedbackList(limit = 50): UseFeedbackListReturn {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [commentCounts, setCommentCounts] = useState<Record<number, number>>({});

  const loadFeedbacks = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await getFeedbackList({ limit });
      if (result.success) {
        setFeedbacks(result.feedbacks);
        
        // Load comment counts for all feedbacks
        const feedbackIds = result.feedbacks.map((f) => f.id);
        if (feedbackIds.length > 0) {
          try {
            const counts = await getCommentCountsByFeedbackIds(feedbackIds);
            setCommentCounts(counts);
          } catch (err) {
            console.error('Error loading comment counts:', err);
            // Don't fail if comment counts fail to load
          }
        }
      } else {
        setError('Không thể tải danh sách góp ý');
      }
    } catch (err) {
      setError('Có lỗi xảy ra khi tải danh sách góp ý');
      console.error('Error loading feedbacks:', err);
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    loadFeedbacks();
  }, [loadFeedbacks]);

  return {
    feedbacks,
    loading,
    error,
    commentCounts,
    loadFeedbacks,
  };
}
