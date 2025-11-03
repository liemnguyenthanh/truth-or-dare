'use client';

import { Send } from 'lucide-react';

import { PrimaryButton } from '@/components/shared';

interface CommentFormProps {
  content: string;
  authorName: string;
  isSubmitting: boolean;
  onContentChange: (value: string) => void;
  onAuthorNameChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function CommentForm({
  content,
  authorName,
  isSubmitting,
  onContentChange,
  onAuthorNameChange,
  onSubmit,
}: CommentFormProps) {
  return (
    <form onSubmit={onSubmit} className='space-y-2 sm:space-y-3'>
      <textarea
        value={content}
        onChange={(e) => onContentChange(e.target.value)}
        placeholder='Viết bình luận của bạn...'
        rows={3}
        className='w-full px-3 sm:px-4 py-2 sm:py-3 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none'
        required
      />
      <div className='flex flex-col sm:flex-row gap-2 sm:gap-3'>
        <input
          type='text'
          value={authorName}
          onChange={(e) => onAuthorNameChange(e.target.value)}
          placeholder='Tên của bạn (tùy chọn)'
          className='flex-1 px-3 sm:px-4 py-2 text-sm sm:text-base border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white'
        />
        <PrimaryButton
          type='submit'
          disabled={isSubmitting || !content.trim()}
          size='md'
          fullWidth
          className='sm:!w-auto'
        >
          <Send className='w-4 h-4 inline mr-2' />
          <span className='hidden sm:inline'>Gửi bình luận</span>
          <span className='sm:hidden'>Gửi</span>
        </PrimaryButton>
      </div>
    </form>
  );
}
