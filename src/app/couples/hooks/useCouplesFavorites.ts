import { useCallback, useState } from 'react';

import { CouplePosition } from '@/types';

interface UseCouplesFavoritesReturn {
  favorites: CouplePosition[];
  toggleFavorite: (position: CouplePosition) => void;
  isFavorite: (positionId: string) => boolean;
  clearFavorites: () => void;
}

export function useCouplesFavorites(): UseCouplesFavoritesReturn {
  const [favorites, setFavorites] = useState<CouplePosition[]>([]);

  // Toggle favorite status
  const toggleFavorite = useCallback((position: CouplePosition) => {
    setFavorites((prev) => {
      const isAlreadyFavorite = prev.some((fav) => fav.id === position.id);
      if (isAlreadyFavorite) {
        return prev.filter((fav) => fav.id !== position.id);
      } else {
        // Add haptic feedback if available
        if (typeof window !== 'undefined' && 'vibrate' in navigator) {
          navigator.vibrate([50, 50, 50]);
        }
        return [...prev, position];
      }
    });
  }, []);

  // Check if position is favorite
  const isFavorite = useCallback(
    (positionId: string) => {
      return favorites.some((fav) => fav.id === positionId);
    },
    [favorites]
  );

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    clearFavorites,
  };
}
