import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { siteData } from '../data/siteData';

/**
 * SiteBackground Component
 * Central responsive background manager for StarX Live.
 *
 * Rules (Spec 1, 2, 3, 6-18, 20, 21, 25, 26, 30, 31):
 * 1. HOME ONLY:
 *    - Desktop: /assets/videos/starx-bg-pc.mp4 (looping video, 0.58 dark overlay)
 *    - Mobile: /assets/videos/starx-bg-mobile.mp4 (looping video, 0.64 dark overlay)
 *    - Pauses video immediately when leaving Home to eliminate GPU/battery usage
 * 2. ALL OTHER PAGES (/about, /artists, /performances, /media, /events, /crew, /contact):
 *    - Desktop: /assets/brand/starx-pc-bg.jpeg (static responsive image, 0.62 dark overlay)
 *    - Mobile: /assets/brand/starx-mobile-bg.png (static responsive image, 0.66 dark overlay)
 *    - Zero video playback on non-Home pages
 * 3. ROUTE TRANSITIONS:
 *    - Smooth 450ms opacity crossfade between video and static image
 *    - Static image sits underneath Home video during load/crossfade for zero black or white flash
 *    - Moving between non-Home pages keeps static background completely stable without reload
 *    - Respects prefers-reduced-motion
 *    - Visibilitychange handling (pause when tab hidden, resume when visible on Home)
 */
export const SiteBackground = ({ currentView = 'home', isIntroActive = false }) => {
  const isMobile = useIsMobile();
  const isHome = currentView === 'home' || currentView === '' || currentView === '/';

  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [hasVisitedHome, setHasVisitedHome] = useState(isHome && !isIntroActive);
  const [isPrefersReducedMotion, setIsPrefersReducedMotion] = useState(false);

  const { background } = siteData;
  const currentVideoSrc = isMobile ? background.mobileVideo : background.desktopVideo;
  const staticImageSrc = isMobile ? background.mobileFallback : background.desktopFallback;

  // Mount video only after intro has completed or if user is genuinely on Home without intro blocking
  useEffect(() => {
    if (isHome && !isIntroActive) {
      setHasVisitedHome(true);
    }
  }, [isHome, isIntroActive]);

  // Check prefers-reduced-motion (Spec 30)
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsPrefersReducedMotion(mediaQuery.matches);

    const handler = (e) => setIsPrefersReducedMotion(e.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  // Manage Home Video Playback (Spec 11, 12, 15, 16, 29-32)
  useEffect(() => {
    const video = videoRef.current;
    if (!video || isPrefersReducedMotion) return;

    if (isHome && !isIntroActive) {
      video.muted = true;
      video.currentTime = 0; // Restart cleanly on return to Home (Spec 16)
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => setIsVideoLoaded(true))
          .catch(() => {});
      }
    } else {
      // Pause immediately when leaving Home or during intro to save GPU/CPU/bandwidth (Spec 11, 15, 29)
      video.pause();
    }
  }, [isHome, isIntroActive, currentVideoSrc, isPrefersReducedMotion]);

  // Tab visibility: pause when tab is hidden, resume when tab is visible IF on Home (Spec 15 & 29)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
      } else if (isHome && !isPrefersReducedMotion) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isHome, isPrefersReducedMotion]);

  // Dark overlay calculation (Spec 8, 10):
  // Home overlay: desktop 0.58, mobile 0.64
  // Non-Home static overlay: desktop 0.62, mobile 0.66
  const overlayColor = isHome
    ? (isMobile ? 'rgba(0, 0, 0, 0.64)' : 'rgba(0, 0, 0, 0.58)')
    : (isMobile ? 'rgba(0, 0, 0, 0.66)' : 'rgba(0, 0, 0, 0.62)');

  return (
    <div
      className="site-video-background site-background"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: -3,
        overflow: 'hidden',
        pointerEvents: 'none',
        backgroundColor: '#050505'
      }}
    >
      {/* 1. Persistent Static Responsive Background Image Layer (Always stable, no flash) */}
      <img
        src={staticImageSrc}
        alt=""
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          display: 'block',
          zIndex: 1
        }}
        loading="eager"
      />

      {/* 2. Home Video Layer (Only mounts when Home is visited; fades in/out cleanly; Spec 6, 7, 11, 12, 17, 18, 29-32) */}
      {!isPrefersReducedMotion && hasVisitedHome && isHome && (
        <video
          ref={videoRef}
          key={currentVideoSrc}
          src={currentVideoSrc}
          preload="metadata"
          autoPlay
          muted
          loop
          playsInline
          onCanPlay={() => setIsVideoLoaded(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            zIndex: 2,
            opacity: isHome && isVideoLoaded && !isIntroActive ? 1 : 0,
            transition: 'opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        />
      )}

      {/* 3. Controlled Dark Readability Overlay (Spec 8, 10, 27) */}
      <div
        className="site-background-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: overlayColor,
          zIndex: 3,
          pointerEvents: 'none',
          transition: 'background-color 0.4s ease'
        }}
      />
    </div>
  );
};

export default SiteBackground;
