import type { Locale } from '@/i18n/config';
import { defaultLocale, locales } from '@/i18n/config';

interface HreflangTagsProps {
  locale: Locale;
  pathname: string;
}

export function HreflangTags({ locale, pathname }: HreflangTagsProps) {
  const baseUrl = 'https://www.truthordaregame.xyz';

  // Remove locale from pathname if present
  const cleanPath = pathname.replace(/^\/(vi|en)/, '') || '/';

  return (
    <>
      {locales.map((loc) => {
        const url =
          loc === defaultLocale
            ? `${baseUrl}${cleanPath}`
            : `${baseUrl}/${loc}${cleanPath}`;
        return <link key={loc} rel='alternate' hrefLang={loc} href={url} />;
      })}
      <link
        rel='alternate'
        hrefLang='x-default'
        href={`${baseUrl}${cleanPath}`}
      />
    </>
  );
}
