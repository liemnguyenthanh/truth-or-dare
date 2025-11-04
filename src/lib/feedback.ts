import { createClient } from '@supabase/supabase-js';

import {
  CreateFeedbackInput,
  FeedbackFilters,
  FeedbackStats,
} from '@/types/feedback';

// Hardcoded Supabase config for static export
const supabaseUrl = 'https://qixucipfehjbdhwzrhfq.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpeHVjaXBmZWhqYmRod3pyaGZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA2MDUxMTMsImV4cCI6MjA3NjE4MTExM30.Wn-q3l7lyeLwOqsneO9VveBUykkimvP9TGJAdrubBuc';

const supabase = createClient(supabaseUrl, supabaseKey);

// Create feedback using Supabase client directly
export async function createFeedback(
  data: CreateFeedbackInput & {
    userAgent?: string;
    ipAddress?: string;
  }
) {
  // Only include ip_address if it's a valid IP address, otherwise set to null
  // INET type doesn't accept strings like "client-side"
  const insertData: any = {
    type: data.type,
    title: data.title,
    description: data.description,
    email: data.email || null,
    rating: data.rating || null,
    category: data.category || null,
    priority: data.priority || 'medium',
    user_agent: data.userAgent || null,
  };

  // Only add ip_address if it's a valid IP address format
  // INET type requires valid IP address format
  if (data.ipAddress && data.ipAddress !== 'client-side') {
    // Basic IP validation - check if it looks like an IP
    const ipRegex =
      /^(\d{1,3}\.){3}\d{1,3}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    if (ipRegex.test(data.ipAddress)) {
      insertData.ip_address = data.ipAddress;
    } else {
      insertData.ip_address = null;
    }
  } else {
    insertData.ip_address = null;
  }

  const { data: feedback, error } = await supabase
    .from('feedback')
    .insert([insertData])
    .select()
    .single();

  if (error) throw error;

  return {
    success: true,
    feedback,
    message: 'Cảm ơn bạn đã gửi góp ý!',
  };
}

// Get feedback list using Supabase client directly
export async function getFeedbackList(filters: FeedbackFilters = {}) {
  const page = filters.page || 1;
  const limit = filters.limit || 12;
  const offset = (page - 1) * limit;

  // Build query
  let query = supabase
    .from('feedback')
    .select('*', { count: 'exact' })
    .eq('status', 'pending') // Only show pending feedbacks for public
    .order('created_at', { ascending: false });

  // Apply type filter
  if (filters.type) {
    query = query.eq('type', filters.type);
  }

  // Apply search filter using Supabase text search
  if (filters.search) {
    query = query.or(
      `title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`
    );
  }

  // Apply pagination
  query = query.range(offset, offset + limit - 1);

  const { data: feedbacks, error, count } = await query;

  if (error) throw error;

  return {
    success: true,
    feedbacks: feedbacks || [],
    total: count || 0,
    page,
    limit,
    totalPages: Math.ceil((count || 0) / limit),
  };
}

// Get feedback stats using Supabase client directly
export async function getFeedbackStats(): Promise<FeedbackStats> {
  // Get total count
  const { count: total, error: totalError } = await supabase
    .from('feedback')
    .select('*', { count: 'exact', head: true });

  if (totalError) throw totalError;

  // Get type statistics
  const { data: typeStats, error: typeError } = await supabase
    .from('feedback')
    .select('type')
    .not('type', 'is', null);

  if (typeError) throw typeError;

  const byType = typeStats.reduce((acc: Record<string, number>, item) => {
    acc[item.type] = (acc[item.type] || 0) + 1;
    return acc;
  }, {});

  // Get status statistics
  const { data: statusStats, error: statusError } = await supabase
    .from('feedback')
    .select('status')
    .not('status', 'is', null);

  if (statusError) throw statusError;

  const byStatus = statusStats.reduce((acc: Record<string, number>, item) => {
    acc[item.status] = (acc[item.status] || 0) + 1;
    return acc;
  }, {});

  // Get rating statistics
  const { data: ratingStats, error: ratingError } = await supabase
    .from('feedback')
    .select('rating')
    .not('rating', 'is', null);

  if (ratingError) throw ratingError;

  const ratings = ratingStats
    .map((item) => item.rating)
    .filter((r) => r !== null);
  const averageRating =
    ratings.length > 0
      ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
      : null;

  return {
    total: total || 0,
    byType,
    byStatus,
    averageRating: averageRating ? Math.round(averageRating * 100) / 100 : null,
    totalRatings: ratings.length,
  };
}

// Direct Supabase operations (for admin use)
export async function getAllFeedbackDirect(
  filters: {
    limit?: number;
    offset?: number;
    type?: string;
    status?: string;
  } = {}
) {
  let query = supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false });

  if (filters.type) {
    query = query.eq('type', filters.type);
  }
  if (filters.status) {
    query = query.eq('status', filters.status);
  }
  if (filters.limit) {
    query = query.limit(filters.limit);
  }
  if (filters.offset) {
    query = query.range(
      filters.offset,
      filters.offset + (filters.limit || 50) - 1
    );
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

export async function updateFeedbackStatus(
  id: number,
  status: 'pending' | 'reviewed' | 'resolved' | 'rejected'
) {
  const { data, error } = await supabase
    .from('feedback')
    .update({
      status,
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

export async function getFeedbackById(id: number) {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

// Comments functions
export async function createComment(data: {
  feedback_id: number;
  parent_id?: number;
  content: string;
  author_name?: string;
  email?: string;
  userAgent?: string;
  ipAddress?: string;
}) {
  // Only include ip_address if it's a valid IP address, otherwise set to null
  // INET type doesn't accept strings like "client-side"
  const insertData: any = {
    feedback_id: data.feedback_id,
    parent_id: data.parent_id || null,
    content: data.content,
    author_name: data.author_name || 'Ẩn danh',
    email: data.email || null,
    user_agent: data.userAgent || null,
  };

  // Only add ip_address if it's a valid IP address format
  // INET type requires valid IP address format
  if (data.ipAddress && data.ipAddress !== 'client-side') {
    // Basic IP validation - check if it looks like an IP
    const ipRegex =
      /^(\d{1,3}\.){3}\d{1,3}$|^([0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/;
    if (ipRegex.test(data.ipAddress)) {
      insertData.ip_address = data.ipAddress;
    } else {
      insertData.ip_address = null;
    }
  } else {
    insertData.ip_address = null;
  }

  const { data: comment, error } = await supabase
    .from('feedback_comments')
    .insert([insertData])
    .select()
    .single();

  if (error) throw error;

  return {
    success: true,
    comment,
    message: 'Bình luận đã được gửi thành công!',
  };
}

export async function getCommentsByFeedbackId(feedbackId: number) {
  const { data: comments, error } = await supabase
    .from('feedback_comments')
    .select('*')
    .eq('feedback_id', feedbackId)
    .order('created_at', { ascending: true });

  if (error) throw error;

  // Organize comments into nested structure
  const commentsMap = new Map<number, any>();
  const rootComments: any[] = [];

  // First pass: create map of all comments
  comments?.forEach((comment) => {
    commentsMap.set(comment.id, { ...comment, replies: [] });
  });

  // Second pass: organize into nested structure
  comments?.forEach((comment) => {
    const commentWithReplies = commentsMap.get(comment.id);
    if (comment.parent_id) {
      const parent = commentsMap.get(comment.parent_id);
      if (parent) {
        parent.replies.push(commentWithReplies);
      }
    } else {
      rootComments.push(commentWithReplies);
    }
  });

  return {
    success: true,
    comments: rootComments,
  };
}

// Get comment count for multiple feedbacks
export async function getCommentCountsByFeedbackIds(feedbackIds: number[]) {
  if (feedbackIds.length === 0) return {};

  const { data, error } = await supabase
    .from('feedback_comments')
    .select('feedback_id')
    .in('feedback_id', feedbackIds);

  if (error) throw error;

  // Count comments per feedback_id
  const counts: Record<number, number> = {};
  data?.forEach((item) => {
    counts[item.feedback_id] = (counts[item.feedback_id] || 0) + 1;
  });

  return counts;
}
