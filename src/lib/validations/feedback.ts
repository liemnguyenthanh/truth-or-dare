import { z } from 'zod';

export const feedbackSchema = z.object({
  type: z.enum(['bug', 'feature', 'general', 'rating'], {
    required_error: 'Vui lòng chọn loại góp ý',
  }),
  title: z
    .string()
    .min(5, 'Tiêu đề phải có ít nhất 5 ký tự')
    .max(255, 'Tiêu đề không được vượt quá 255 ký tự'),
  description: z
    .string()
    .min(10, 'Mô tả phải có ít nhất 10 ký tự')
    .max(2000, 'Mô tả không được vượt quá 2000 ký tự'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  rating: z
    .number()
    .min(1, 'Đánh giá tối thiểu 1 sao')
    .max(5, 'Đánh giá tối đa 5 sao')
    .optional(),
  category: z
    .string()
    .max(100, 'Danh mục không được vượt quá 100 ký tự')
    .optional()
    .or(z.literal('')),
  priority: z.enum(['low', 'medium', 'high', 'critical']).default('medium'),
});

export const quickFeedbackSchema = z.object({
  type: z.enum(['rating']),
  rating: z.number().min(1).max(5),
  description: z.string().min(1, 'Vui lòng để lại nhận xét').max(500),
});

export const bugReportSchema = feedbackSchema.extend({
  type: z.literal('bug'),
  category: z.string().min(1, 'Vui lòng chọn danh mục lỗi'),
  priority: z.enum(['low', 'medium', 'high', 'critical']),
});

export const featureRequestSchema = feedbackSchema.extend({
  type: z.literal('feature'),
  category: z.string().min(1, 'Vui lòng chọn danh mục tính năng'),
});

export const commentSchema = z.object({
  content: z
    .string()
    .min(1, 'Nội dung bình luận không được để trống')
    .max(1000, 'Nội dung bình luận không được vượt quá 1000 ký tự'),
  author_name: z
    .string()
    .max(100, 'Tên không được vượt quá 100 ký tự')
    .optional()
    .default('Ẩn danh'),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
});

export type FeedbackFormData = z.infer<typeof feedbackSchema>;
export type QuickFeedbackData = z.infer<typeof quickFeedbackSchema>;
export type BugReportData = z.infer<typeof bugReportSchema>;
export type FeatureRequestData = z.infer<typeof featureRequestSchema>;
export type CommentFormData = z.infer<typeof commentSchema>;
