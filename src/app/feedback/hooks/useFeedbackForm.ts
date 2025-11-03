import { useState } from 'react';

import { createFeedback } from '@/lib/feedback';
import { feedbackSchema } from '@/lib/validations/feedback';

interface FeedbackFormData {
  title: string;
  description: string;
  email: string;
}

interface UseFeedbackFormReturn {
  formData: FeedbackFormData;
  errors: Record<string, string>;
  isSubmitting: boolean;
  isSubmitted: boolean;
  setFormData: (data: Partial<FeedbackFormData>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

export function useFeedbackForm(onSuccess?: () => void): UseFeedbackFormReturn {
  const [formData, setFormDataState] = useState<FeedbackFormData>({
    title: '',
    description: '',
    email: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const setFormData = (data: Partial<FeedbackFormData>) => {
    setFormDataState((prev) => ({ ...prev, ...data }));
    // Clear error when user starts typing
    const field = Object.keys(data)[0];
    if (field && errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const resetForm = () => {
    setFormDataState({ title: '', description: '', email: '' });
    setErrors({});
    setIsSubmitted(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrors({});

    try {
      const validatedData = feedbackSchema.parse({
        type: 'general',
        title: formData.title,
        description: formData.description,
        email: formData.email || undefined,
        priority: 'medium',
      });

      const userAgent = navigator.userAgent;
      const result = await createFeedback({
        ...validatedData,
        userAgent,
        ipAddress: 'client-side',
      });

      if (result.success) {
        setIsSubmitted(true);
        resetForm();
        onSuccess?.();
        setTimeout(() => {
          setIsSubmitted(false);
        }, 2000);
      }
    } catch (error: any) {
      if (error?.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: { path: string[]; message: string }) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: 'Có lỗi xảy ra khi gửi góp ý. Vui lòng thử lại.' });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    setFormData,
    handleSubmit,
    resetForm,
  };
}

