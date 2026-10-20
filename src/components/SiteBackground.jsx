import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { siteData } from '../data/siteData';

/**
 * Global responsive background manager.
 * Home displays the looping background video.
 * Every route retains an underlying responsive stage photograph so there is ZERO black screen.
 * The video starts seamlessly with native autoPlay, muted, and playsInline,
 * fading in when ready and pausing when away from Home to conserve resources.
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

  const playHomeVideo = useCallback(() => {
    const video = videoRef.current;
    if (!video || !isHome || isIntroActive || isPrefersReducedMotion) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => setIsVideoLoaded(true))
        .catch((err) => {
          console.warn('[SiteBackground] Playback deferred or blocked:', err);
        });
    }
  }, [isHome, isIntroActive, isPrefersReducedMotion]);

  // Handle video playback across intro state, routes, and motion preferences
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    if (isIntroActive || isPrefersReducedMotion || !isHome) {
      video.pause();
    } else {
      playHomeVideo();
    }
  }, [currentVideoSrc, isHome, isIntroActive, isPrefersReducedMotion, playHomeVideo]);

  // Tab visibility: pause when hidden, resume when visible on Home
  useEffect(() => {
    const handleVisibilityChange = () => {
      const video = videoRef.current;
      if (!video) return;

      if (document.hidden) {
        video.pause();
      } else if (isHome && !isIntroActive && !isPrefersReducedMotion) {
        playHomeVideo();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isHome, isIntroActive, isPrefersReducedMotion, playHomeVideo]);

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
      {/* 1. Underlying Static Responsive Stage Image (Always present to eliminate any black screen) */}
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

      {/* 2. Home Video Layer */}
      {!isPrefersReducedMotion && (
        <video
          ref={videoRef}
          key={currentVideoSrc}
          src={currentVideoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onPlaying={() => setIsVideoLoaded(true)}
          onCanPlay={() => {
            setIsVideoLoaded(true);
            if (!isIntroActive && isHome) {
              playHomeVideo();
            }
          }}
          onLoadedData={() => setIsVideoLoaded(true)}
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
            transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
          }}
        />
      )}

      {/* 3. Dark Overlay for readability */}
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
