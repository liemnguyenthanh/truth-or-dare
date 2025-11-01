export interface Feedback {
  id: number;
  type: 'bug' | 'feature' | 'general' | 'rating';
  title: string;
  description: string;
  email?: string;
  rating?: number; // 1-5 stars
  category?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'pending' | 'reviewed' | 'resolved' | 'rejected';
  user_agent?: string;
  ip_address?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateFeedbackInput {
  type: 'bug' | 'feature' | 'general' | 'rating';
  title: string;
  description: string;
  email?: string;
  rating?: number;
  category?: string;
  priority?: 'low' | 'medium' | 'high' | 'critical';
}

export interface FeedbackStats {
  total: number;
  byType: Record<string, number>;
  byStatus: Record<string, number>;
  averageRating: number | null;
  totalRatings: number;
}

export interface FeedbackFilters {
  limit?: number;
  offset?: number;
  type?: string;
  status?: string;
  search?: string;
  page?: number;
}
