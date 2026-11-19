import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenis = null;
let tickerFn = null;

const reducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * One Lenis instance for the whole site, driven by GSAP's ticker so
 * ScrollTrigger scrubs, pins and Lenis inertia all share the same frame.
 */
export const initSmoothScroll = () => {
  if (lenis || typeof window === 'undefined' || reducedMotion()) return lenis;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
    // Let dialogs, menus and lightboxes scroll natively
    prevent: (node) =>
      Boolean(node.closest && node.closest('[role="dialog"], [data-lenis-prevent], .mobile-menu-panel'))
  });

  lenis.on('scroll', ScrollTrigger.update);
  tickerFn = (time) => lenis && lenis.raf(time * 1000);
  gsap.ticker.add(tickerFn);
  gsap.ticker.lagSmoothing(0);

  return lenis;
};

export const destroySmoothScroll = () => {
  if (tickerFn) gsap.ticker.remove(tickerFn);
  if (lenis) lenis.destroy();
  lenis = null;
  tickerFn = null;
};

export const getLenis = () => lenis;

export const stopSmoothScroll = () => lenis && lenis.stop();
export const startSmoothScroll = () => lenis && lenis.start();

/** Jump to top instantly (route changes) without fighting Lenis' target. */
export const resetScroll = () => {
  if (lenis) {
    lenis.scrollTo(0, { immediate: true, force: true });
  } else {
    window.scrollTo(0, 0);
  }
};
