import { useEffect } from 'react';
import { resetScroll } from '../lib/smoothScroll';

/**
 * useScrollToTop Hook
 * Enforces immediate scroll position reset to (0, 0) across all route navigations
 * and clears accidental URL hashes that cause unwanted browser jumps (Requirements 18, 19, 20).
 *
 * Applicable routes:
 * / (home)
 * /about
 * /artists
 * /performances
 * /media
 * /events
 * /crew
 * /contact
 */
export function useScrollToTop(currentView) {
  useEffect(() => {
    // 1. Force top scroll position immediately on view/route change
    resetScroll();

    // 2. Extra frame guarantee for dynamic layout reflow
    const rafId = requestAnimationFrame(() => {
      resetScroll();
    });

    // 3. Clear accidental hash if landing on the default Home route (Requirement 18)
    if (currentView === 'home' && typeof window !== 'undefined' && window.location.hash) {
      try {
        const cleanUrl = window.location.pathname + window.location.search;
        window.history.replaceState(null, '', cleanUrl);
      } catch (e) {
        // ignore
      }
    }

    return () => cancelAnimationFrame(rafId);
  }, [currentView]);
}

export default useScrollToTop;
