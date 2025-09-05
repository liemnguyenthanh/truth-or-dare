'use client';

import Head from 'next/head';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

import { gtmEvents } from '@/lib/gtm';
import { useTranslations } from '@/hooks/useTranslations';

import { QuestionListPage } from '@/features/questions/pages/QuestionListPage';

interface QuestionsPageProps {
  params: { locale: string };
}

export default function QuestionsPage({ params }: QuestionsPageProps) {
  const router = useRouter();
  const t = useTranslations();

  // Track page view
  useEffect(() => {
    gtmEvents.pageView('questions');
  }, []);

  const handleBack = () => {
    gtmEvents.buttonClick('back_to_home', 'questions_page');
    router.push(`/${params.locale === 'vi' ? '' : params.locale}`);
  };

  return (
    <main>
      <Head>
        <title>
          {t.navigation.questions} | {t.metadata.title}
        </title>
        <meta name='description' content={t.metadata.description} />
      </Head>
      <QuestionListPage onBack={handleBack} />
    </main>
  );
}
