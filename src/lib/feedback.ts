import { createClient } from '@supabase/supabase-js';

import {
  CreateFeedbackInput,
  FeedbackFilters,
  FeedbackStats,
} from '@/types/feedback';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}
const supabase = createClient(supabaseUrl as string, supabaseKey as string);

// Create feedback using Supabase client directly
export async function createFeedback(
  data: CreateFeedbackInput & {
    userAgent?: string;
    ipAddress?: string;
  }
) {
  const { data: feedback, error } = await supabase
    .from('feedback')
    .insert([
      {
        type: data.type,
        title: data.title,
        description: data.description,
        email: data.email || null,
        rating: data.rating || null,
        category: data.category || null,
        priority: data.priority || 'medium',
        user_agent: data.userAgent,
        ip_address: data.ipAddress,
      },
    ])
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
