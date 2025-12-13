import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useState } from 'react';

import { getTranslationSync } from '@/lib/i18n';
import { loadTranslations } from '@/lib/i18n/loader';

import { getLocaleFromPath } from '@/i18n/config';

import { GameMode, GameModeOption } from '@/types';

// Base game mode configuration (without translations)
// Translations will be loaded dynamically
const BASE_GAME_MODE_OPTIONS: Omit<GameModeOption, 'name' | 'description'>[] = [
  {
    id: 'drink',
    icon: '🍺',
    isNew: true,
    hasNewQuestions: true,
  },
  {
    id: 'quick',
    icon: '⚡',
  },
  {
    id: 'group',
    icon: '👥',
  },
  {
    id: 'spin_wheel',
    icon: '🎡',
  },
];

interface UseGameModeSelectionProps {
  onModeSelected?: (mode: GameMode) => void;
}

export function useGameModeSelection({
  onModeSelected,
}: UseGameModeSelectionProps = {}) {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useMemo(() => getLocaleFromPath(pathname), [pathname]);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [gameModeTranslations, setGameModeTranslations] = useState<any>(null);

  // Load game mode translations
  useEffect(() => {
    let isMounted = true;

    loadTranslations(locale, ['gameModes'])
      .then((translations) => {
        if (isMounted) {
          setGameModeTranslations(translations['gameModes']);
        }
      })
      .catch((error) => {
        console.error('Failed to load game mode translations:', error);
      });

    return () => {
      isMounted = false;
    };
  }, [locale]);

  // Create translated game mode options
  const gameModeOptions = useMemo<GameModeOption[]>(() => {
    if (!gameModeTranslations) {
      // Return base options with fallback names if translations not loaded yet
      return BASE_GAME_MODE_OPTIONS.map((mode) => ({
        ...mode,
        name: mode.id,
        description: '',
      }));
    }

    return BASE_GAME_MODE_OPTIONS.map((mode) => {
      // Map spin_wheel to spinWheel for JSON key
      const modeKey = mode.id === 'spin_wheel' ? 'spinWheel' : mode.id;
      const modeTranslations = gameModeTranslations[modeKey];

      return {
        ...mode,
        name: modeTranslations?.name || mode.id,
        description: modeTranslations?.description || '',
      };
    });
  }, [gameModeTranslations]);

  const handleModeSelect = useCallback(
    (mode: GameMode) => {
      if (onModeSelected) {
        onModeSelected(mode);
      } else {
        // Navigate to the appropriate page with locale
        // Always use locale prefix to ensure proper route context
        let path = '';
        switch (mode) {
          case 'quick':
            path = '/quick';
            break;
          case 'group':
            path = '/group';
            break;
          case 'spin_wheel':
            path = '/spin-wheel';
            break;
          case 'drink':
            path = '/drink';
            break;
        }
        // Always navigate to route with locale prefix (even for default locale)
        // This ensures the route has proper locale context and avoids redirect loops
        const localizedPath = `/${locale}${path}`;
        router.push(localizedPath);
      }
    },
    [onModeSelected, router, locale]
  );

  const handleRatingSubmit = useCallback(
    async (data: { rating: number; comment: string; emoji?: string }) => {
      try {
        const { createFeedback } = await import('@/lib/feedback');
        const translations = await loadTranslations(locale, ['common']);
        const commonTranslations = translations['common'];
        const ratingTitle = getTranslationSync(
          commonTranslations,
          'rating.title',
          { rating: data.rating.toString() }
        );

        const result = await createFeedback({
          type: 'rating',
          title: ratingTitle,
          description: data.comment,
          rating: data.rating,
          category: 'homepage',
          priority: 'medium',
        });

        if (result.success) {
          // Rating submitted successfully
        }
      } catch (error) {
        // Error submitting rating - could add toast notification here
      }
    },
    [locale]
  );

  return {
    gameModeOptions,
    showRatingModal,
    setShowRatingModal,
    handleModeSelect,
    handleRatingSubmit,
  };
}
