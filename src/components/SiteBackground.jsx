import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { siteData } from '../data/siteData';

/**
 * Global responsive background manager.
 * Home owns the looping video. Every other route owns the static band image.
 * The Home video is mounted during the intro only so it can preload; it is
 * explicitly paused at 0 until the intro has fully exited.
 */
export const SiteBackground = ({ currentView = 'home', isIntroActive = false }) => {
  const isMobile = useIsMobile();
  const isHome = currentView === 'home' || currentView === '' || currentView === '/';
  const videoRef = useRef(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [isPrefersReducedMotion, setIsPrefersReducedMotion] = useState(false);

  const { background } = siteData;
  const currentVideoSrc = isMobile ? background.mobileVideo : background.desktopVideo;
  const staticImageSrc = isMobile ? background.mobileFallback : background.desktopFallback;

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsPrefersReducedMotion(mediaQuery.matches);

    const handler = (event) => setIsPrefersReducedMotion(event.matches);
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }

    mediaQuery.addListener(handler);
    return () => mediaQuery.removeListener(handler);
  }, []);

  const playHomeFromStart = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isHome || isIntroActive || isPrefersReducedMotion) return;

    video.muted = true;
    video.playsInline = true;

    try {
      video.pause();
      video.currentTime = 0;
    } catch (e) {
      // Some browsers can briefly reject seeking before metadata is ready.
    }

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsVideoLoaded(true))
        .catch(() => {
          // Muted inline autoplay should normally succeed; keep the black
          // fallback if a browser policy still blocks playback.
        });
    }
  }, [isHome, isIntroActive, isPrefersReducedMotion]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    setIsVideoLoaded(false);
    video.muted = true;
    video.playsInline = true;

    if (isIntroActive || isPrefersReducedMotion) {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) {
        // ignore until metadata exists
      }
      return;
    }

    if (video.readyState >= 2) {
      playHomeFromStart();
    } else {
      try {
        video.load();
      } catch (e) {
        // ignore
      }
    }
  }, [currentVideoSrc, isIntroActive, isPrefersReducedMotion, playHomeFromStart]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        video.pause();
      } else if (isHome && !isIntroActive && !isPrefersReducedMotion) {
        video.play().catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isHome, isIntroActive, isPrefersReducedMotion]);

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
      {!isHome && (
        <img
          src={staticImageSrc}
          alt=""
          width="1920"
          height="1080"
          decoding="async"
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
      )}

      {isHome && !isPrefersReducedMotion && (
        <video
          ref={videoRef}
          key={currentVideoSrc}
          src={currentVideoSrc}
          preload="metadata"
          muted
          loop
          playsInline
          onLoadedMetadata={() => {
            const video = videoRef.current;
            if (video && isIntroActive) {
              video.pause();
              try {
                video.currentTime = 0;
              } catch (e) {
                // ignore
              }
            }
          }}
          onCanPlay={() => {
            setIsVideoLoaded(true);
            if (!isIntroActive) {
              playHomeFromStart();
            }
          }}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            display: 'block',
            zIndex: 2,
            opacity: isVideoLoaded && !isIntroActive ? 1 : 0,
            transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        />
      )}

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
