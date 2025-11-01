import { useEffect } from 'react';

/**
 * Hook để ẩn/hiện navigation khi vào/rời trang
 */
export function useHideNavigation() {
  useEffect(() => {
    // Ẩn navigation
    const nav = document.querySelector('nav');
    const main = document.querySelector('main');
    
    if (nav) nav.style.display = 'none';
    if (main) main.style.paddingTop = '0';

    // Cleanup khi rời trang
    return () => {
      if (nav) nav.style.display = '';
      if (main) main.style.paddingTop = '';
    };
  }, []);
}

