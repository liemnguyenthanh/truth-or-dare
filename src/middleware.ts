import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { defaultLocale, isValidLocale, locales } from '@/i18n/config';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  // If pathname already has locale, continue
  if (pathnameHasLocale) {
    return NextResponse.next();
  }

  // Detect locale from Accept-Language header or use default
  const locale = getLocaleFromRequest(request) || defaultLocale;

  // Redirect to locale-prefixed path
  const newUrl = new URL(`/${locale}${pathname}`, request.url);
  return NextResponse.redirect(newUrl);
}

function getLocaleFromRequest(request: NextRequest): string | null {
  const acceptLanguage = request.headers.get('accept-language');
  if (!acceptLanguage) return null;

  // Parse Accept-Language header
  const languages = acceptLanguage
    .split(',')
    .map((lang) => lang.split(';')[0].trim().toLowerCase());

  // Check if any supported locale matches
  for (const lang of languages) {
    if (isValidLocale(lang)) {
      return lang;
    }
    // Check language prefix (e.g., 'en-US' -> 'en')
    const langPrefix = lang.split('-')[0];
    if (isValidLocale(langPrefix)) {
      return langPrefix;
    }
  }

  return null;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images (public images)
     * - fonts (public fonts)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|images|fonts).*)',
  ],
};
