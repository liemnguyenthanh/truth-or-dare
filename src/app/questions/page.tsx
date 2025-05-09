'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React from 'react';

import { QuestionListPage } from '@/modules/questions/components/QuestionListPage';

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
      <QuestionListPage onBack={handleBack} />
    </main>
  );
} 