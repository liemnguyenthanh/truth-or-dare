import { useEffect } from 'react';

/**
 * Hook để ẩn/hiện navigation dựa trên điều kiện
 * @param shouldHide - Boolean để điều khiển việc ẩn/hiện navigation
 */
export function useHideNavigation(shouldHide: boolean) {
  useEffect(() => {
    const nav = document.querySelector('#navigation') as HTMLElement | null;
    const main = document.querySelector('main') as HTMLElement | null;

    if (shouldHide) {
      // Ẩn navigation khi shouldHide = true
      if (nav) {
        nav.style.display = 'none';
      }
      if (main) {
        main.style.paddingTop = '0';
      }
    } else {
      // Hiện navigation khi shouldHide = false
      if (nav) {
        nav.style.display = '';
      }
      if (main) {
        main.style.paddingTop = '';
      }
    }

    // Cleanup khi rời trang hoặc shouldHide thay đổi
    return () => {
      if (nav) {
        nav.style.display = '';
      }
      if (main) {
        main.style.paddingTop = '';
      }
    };
  }, [shouldHide]);
}
