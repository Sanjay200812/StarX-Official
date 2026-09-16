import { useState, useEffect } from 'react';

/**
 * useIsMobile Hook
 * Consistent breakpoint across StarX Live (Spec 4):
 * Mobile: <= 767px (max-width: 767px)
 * Desktop/Tablet: >= 768px (min-width: 768px)
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia('(max-width: 767px)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(max-width: 767px)');
    const updateMatch = (e) => {
      setIsMobile(e.matches);
    };

    // Initial check
    setIsMobile(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', updateMatch);
      return () => mediaQuery.removeEventListener('change', updateMatch);
    } else {
      mediaQuery.addListener(updateMatch);
      return () => mediaQuery.removeListener(updateMatch);
    }
  }, []);

  return isMobile;
}

export default useIsMobile;
