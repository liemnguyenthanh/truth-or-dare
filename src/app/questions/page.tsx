'use client';

import React from 'react';
import { QuestionListPage } from '@/components/QuestionListPage';
import { useRouter } from 'next/navigation';
import { ThemeProvider } from '@/context/ThemeContext';
import Head from 'next/head';

export default function QuestionsPage() {
  const router = useRouter();
  
  const handleBack = () => {
    router.push('/');
  };
  
  return (
    <main>
      <Head>
        <title>Danh Sách Câu Hỏi | Thật Hay Thách</title>
        <meta name="description" content="Xem danh sách tất cả các câu hỏi trong trò chơi Thật Hay Thách." />
      </Head>
      <ThemeProvider>
        <QuestionListPage onBack={handleBack} />
      </ThemeProvider>
    </main>
  );
} 