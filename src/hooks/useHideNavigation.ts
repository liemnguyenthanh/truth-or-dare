import { useEffect } from 'react';

/**
 * Hook để ẩn/hiện navigation khi vào/rời trang
 */
export function useHideNavigation() {
  useEffect(() => {
    // Ẩn navigation - sử dụng id selector để chắc chắn tìm đúng element
    const nav = document.querySelector('#navigation') as HTMLElement | null;
    const main = document.querySelector('main') as HTMLElement | null;

    if (nav) {
      nav.style.display = 'none';
    }
    if (main) {
      main.style.paddingTop = '0';
    }

    // Cleanup khi rời trang
    return () => {
      if (nav) {
        nav.style.display = '';
      }
      if (main) {
        main.style.paddingTop = '';
      }
    };
  }, []);
}
