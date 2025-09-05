'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { gtmEvents } from '@/lib/gtm';

import { QuestionListPage } from '@/features/questions/pages/QuestionListPage';

export default function QuestionsPage() {
  const router = useRouter();

  // Track page view
  useEffect(() => {
    gtmEvents.pageView('questions');
  }, []);

  const handleBack = () => {
    gtmEvents.buttonClick('back_to_home', 'questions_page');
    router.push('/');
  };

  return (
    <main>
      <Head>
        <title>Danh Sách Câu Hỏi | Thật Hay Thách</title>
        <meta
          name='description'
          content='Xem danh sách tất cả các câu hỏi trong trò chơi Thật Hay Thách.'
        />
      </Head>
      <QuestionListPage onBack={handleBack} />
    </main>
  );
}
