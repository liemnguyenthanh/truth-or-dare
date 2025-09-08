# Multi-Language Implementation Guide

## 🌍 Overview

This project now supports multiple languages with SEO optimization. The implementation uses Next.js built-in internationalization (i18n) for the best SEO performance.

## 🚀 Supported Languages

### Currently Implemented

- **Vietnamese (vi)** - Default language
- **English (en)** - Global reach
- **Spanish (es)** - 500M+ speakers

### Planned Languages

- **French (fr)** - 280M+ speakers
- **German (de)** - High purchasing power
- **Portuguese (pt)** - Brazil market (200M+ people)
- **Japanese (ja)** - Gaming culture
- **Korean (ko)** - Strong gaming community
- **Chinese (zh)** - Huge market potential

## 📁 File Structure

```
src/
├── locales/
│   ├── vi.json          # Vietnamese translations
│   ├── en.json          # English translations
│   └── es.json          # Spanish translations
├── lib/
│   ├── translations.ts  # Translation utilities
│   └── metadata.ts      # Dynamic metadata generation
├── data/
│   └── questions/
│       ├── 18.ts        # Vietnamese 18+ questions
│       ├── party.ts     # Vietnamese party questions
│       ├── en.ts        # English questions
│       └── es.ts        # Spanish questions
└── app/
    ├── [locale]/        # Localized pages
    │   ├── layout.tsx
    │   └── page.tsx
    └── layout.tsx       # Root layout
```

## 🔧 Configuration

### Next.js i18n Configuration

```javascript
// next.config.js
i18n: {
  locales: ['vi', 'en', 'es', 'fr', 'de', 'pt', 'ja', 'ko', 'zh'],
  defaultLocale: 'vi',
  localeDetection: true,
}
```

### URL Structure

- Vietnamese (default): `truthordaregame.xyz/`
- English: `truthordaregame.xyz/en/`
- Spanish: `truthordaregame.xyz/es/`
- French: `truthordaregame.xyz/fr/`
- etc.

## 🎯 SEO Features

### 1. Automatic hreflang Tags

Each page automatically includes hreflang tags for all supported languages.

### 2. Localized Metadata

- Dynamic titles and descriptions
- Language-specific keywords
- Proper Open Graph tags
- Twitter Card optimization

### 3. Multilingual Sitemap

- Separate URLs for each language
- Proper priority and change frequency
- Language alternates

### 4. Structured Data

- JSON-LD schema in multiple languages
- Proper locale information

## 💻 Usage

### Using Translations in Components

```tsx
import { useTranslations } from '@/lib/translations';

function MyComponent() {
  const t = useTranslations();

  return (
    <div>
      <h1>{t.metadata.title}</h1>
      <p>{t.game.truth}</p>
    </div>
  );
}
```

### Server-Side Translation

```tsx
import { getTranslations } from '@/lib/translations';

export default function Page({ params }) {
  const t = getTranslations(params.locale);

  return <h1>{t.metadata.title}</h1>;
}
```

### Language Switcher Component

```tsx
import { LanguageSwitcher } from '@/components/shared';

function Navigation() {
  return (
    <nav>
      <LanguageSwitcher currentLocale='en' />
    </nav>
  );
}
```

## 📊 SEO Benefits

### 1. Search Engine Visibility

- Each language gets its own URL
- Proper hreflang implementation
- Language-specific sitemaps

### 2. User Experience

- Automatic language detection
- Easy language switching
- Consistent navigation

### 3. Performance

- Server-side rendering for all languages
- Optimized bundle splitting
- Fast page loads

## 🚀 Deployment Considerations

### 1. Domain Strategy

- **Recommended**: Subdirectory approach (`/en/`, `/es/`)
- **Alternative**: Subdomain approach (`en.truthordaregame.xyz`)

### 2. CDN Configuration

- Cache by language
- Proper cache headers
- Geographic distribution

### 3. Analytics

- Track language-specific metrics
- Monitor conversion rates by language
- A/B test different languages

## 📈 Marketing Strategy

### 1. Content Localization

- Translate all questions and content
- Adapt cultural references
- Localize images and graphics

### 2. SEO Strategy

- Research keywords for each language
- Create language-specific landing pages
- Build backlinks in target languages

### 3. Social Media

- Language-specific social accounts
- Localized social media content
- Regional hashtag strategies

## 🔄 Adding New Languages

### 1. Add Translation File

```bash
# Create new translation file
touch src/locales/fr.json
```

### 2. Update Configuration

```javascript
// next.config.js
locales: ['vi', 'en', 'es', 'fr', ...]
```

### 3. Add Questions

```bash
# Create language-specific questions
touch src/data/questions/fr.ts
```

### 4. Update Language Metadata

```typescript
// src/lib/translations.ts
export const languageMetadata = {
  fr: {
    name: 'French',
    nativeName: 'Français',
    code: 'fr',
    hreflang: 'fr-FR',
    direction: 'ltr',
  },
  // ...
};
```

## 🎯 Next Steps

1. **Complete Translation Files**: Add remaining languages (fr, de, pt, ja, ko, zh)
2. **Translate Questions**: Create localized versions of all questions
3. **Cultural Adaptation**: Adapt content for different cultures
4. **Testing**: Test all language combinations
5. **Analytics**: Set up language-specific tracking
6. **Marketing**: Launch language-specific campaigns

## 📞 Support

For questions about the multi-language implementation, refer to:

- Next.js i18n documentation
- Google's international SEO guidelines
- Translation best practices
