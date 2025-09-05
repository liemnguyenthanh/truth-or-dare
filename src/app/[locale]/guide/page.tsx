import { getTranslations, Locale } from '@/lib/translations';

import { LanguageSwitcher } from '@/components/shared';

interface GuidePageProps {
  params: { locale: Locale };
}

export async function generateStaticParams() {
  return [
    { locale: 'vi' },
    { locale: 'en' },
    { locale: 'es' },
    { locale: 'fr' },
    { locale: 'de' },
    { locale: 'pt' },
    { locale: 'ja' },
    { locale: 'ko' },
    { locale: 'zh' },
  ];
}

export async function generateMetadata({ params }: GuidePageProps) {
  const t = getTranslations(params.locale);

  return {
    title: t.guide.title,
    description: t.guide.description,
    keywords: [
      t.navigation.guide.toLowerCase(),
      'truth or dare',
      'game rules',
      'how to play',
      'party game',
      'group game',
    ],
    openGraph: {
      title: t.guide.title,
      description: t.guide.description,
    },
  };
}

export default function GuidePage({ params }: GuidePageProps) {
  const t = getTranslations(params.locale);

  return (
    <main className='container mx-auto px-4 py-8 max-w-4xl'>
      {/* Language Switcher */}
      <div className='flex justify-end mb-8'>
        <LanguageSwitcher currentLocale={params.locale} />
      </div>

      <article className='prose prose-lg mx-auto'>
        <h1 className='text-4xl font-bold text-center mb-8 text-gray-900 dark:text-white'>
          {t.guide.title}
        </h1>

        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
            {t.guide.whatIs}
          </h2>
          <p className='text-gray-700 dark:text-gray-300 mb-4'>
            <strong>Truth or Dare</strong> {t.guide.whatIsDescription}
          </p>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
            {t.guide.basicRules}
          </h2>
          <ol className='list-decimal list-inside space-y-3 text-gray-700 dark:text-gray-300'>
            <li>
              <strong>Number of players:</strong> 2 or more people (ideal is 4-8
              people)
            </li>
            <li>
              <strong>How to play:</strong> Players sit in a circle
            </li>
            <li>
              <strong>Turn:</strong> Each person will be asked "Truth or Dare?"
            </li>
            <li>
              <strong>Choose "Truth":</strong> Answer a question honestly
            </li>
            <li>
              <strong>Choose "Dare":</strong> Complete a challenge given to you
            </li>
            <li>
              <strong>Refuse:</strong> If you refuse, you might get a light
              penalty (like singing a song)
            </li>
          </ol>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
            {t.guide.tips}
          </h2>
          <ul className='list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300'>
            <li>Create a comfortable, pressure-free atmosphere</li>
            <li>Ask questions and challenges appropriate for the group</li>
            <li>Respect everyone's boundaries</li>
            <li>Keep personal information shared confidential</li>
            <li>Focus on having fun, don't make anyone uncomfortable</li>
          </ul>
        </div>

        <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg mb-8'>
          <h2 className='text-2xl font-semibold mb-4 text-gray-900 dark:text-white'>
            {t.guide.benefits}
          </h2>
          <div className='grid md:grid-cols-2 gap-4'>
            <div>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                {t.guide.social}
              </h3>
              <ul className='list-disc list-inside text-sm text-gray-700 dark:text-gray-300'>
                <li>Strengthen group bonding</li>
                <li>Break communication barriers</li>
                <li>Create beautiful memories</li>
              </ul>
            </div>
            <div>
              <h3 className='font-semibold text-gray-900 dark:text-white mb-2'>
                {t.guide.personal}
              </h3>
              <ul className='list-disc list-inside text-sm text-gray-700 dark:text-gray-300'>
                <li>Increase self-confidence</li>
                <li>Learn to share</li>
                <li>Develop communication skills</li>
              </ul>
            </div>
          </div>
        </div>

        <div className='bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 text-center'>
          <h2 className='text-2xl font-semibold mb-4 text-blue-900 dark:text-blue-100'>
            {t.guide.readyToPlay}
          </h2>
          <p className='text-blue-800 dark:text-blue-200 mb-4'>
            {t.guide.readyToPlayDescription}
          </p>
          <a
            href={`/${params.locale === 'vi' ? '' : params.locale}`}
            className='inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors'
          >
            {t.guide.playNow}
          </a>
        </div>
      </article>
    </main>
  );
}
