import { useEffect, useLayoutEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Reusable React Router scroll restoration component.
 * Automatically resets scroll position to the absolute top (scrollY = 0)
 * whenever the route changes (including query changes and browser back/forward).
 * 
 * Works across all routes without duplicating scroll logic inside pages.
 */
export const ScrollToTop = () => {
  const { pathname, search, key } = useLocation();

  // Disable automatic browser scroll restoration so back/forward and route changes start cleanly at 0
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Synchronously reset scroll before paint
  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant',
    });
    if (document.documentElement) {
      document.documentElement.scrollTop = 0;
    }
    if (document.body) {
      document.body.scrollTop = 0;
    }
  }, [pathname, search, key]);

  return null;
};

export default ScrollToTop;

