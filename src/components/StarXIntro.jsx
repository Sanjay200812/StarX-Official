import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { siteData } from '../data/siteData';

/**
 * StarXIntro Component
 * Responsive fullscreen cinematic entry video system for StarX Live.
 *
 * Requirements (Spec 1, 4, 5, 6, 8-13, 21, 32-34, 38):
 * - Desktop (>= 768px): /assets/videos/starx-intro-pc.mp4
 * - Mobile (<= 767px): /assets/videos/starx-intro-mobile.mp4
 * - Only downloads the selected responsive source
 * - Fullscreen fixed overlay (inset: 0, 100vw, 100dvh, #000, z-index: 1000, touch-action: none)
 * - autoPlay, muted, playsInline, zero browser controls
 * - object-fit: cover, object-position: center
 * - Clean SKIP button
 * - Smooth 650ms crossfade into website content
 * - Guaranteed single exit path for both Skip and natural video end (Requirement 5)
 */
export const StarXIntro = ({ onStartExit, onFinishExit, onFinishIntro, onComplete }) => {
  const isMobile = useIsMobile();
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);
  const exitCalledRef = useRef(false);
  const exitTimerRef = useRef(null);

  const { intro } = siteData;
  const currentVideoSrc = isMobile ? intro.mobileVideo : intro.desktopVideo;

  // Single unified intro finish function (Requirements 5 & 6)
  const handleExit = () => {
    if (exitCalledRef.current) return;
    exitCalledRef.current = true;

    // 1. Mark intro as played in session storage immediately
    try {
      sessionStorage.setItem('starxIntroPlayed', 'true');
    } catch (e) {
      // ignore
    }

    // 2. Pause intro video cleanly on exit
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {
        // ignore
      }
    }

    // 3. Notify transition start (keeps home hidden, resets scroll to 0, resets animations)
    if (onStartExit) {
      onStartExit();
    }

    // 4. Fade intro overlay smoothly (650ms)
    setIsExiting(true);

    // 5. Once overlay fade is complete, remove intro and start Home animation from 0
    exitTimerRef.current = setTimeout(() => {
      if (onFinishExit) {
        onFinishExit();
      } else if (onFinishIntro) {
        onFinishIntro();
      } else if (onComplete) {
        onComplete();
      }
    }, 650);
  };

  // Prevent scroll during intro (Requirement 2)
  useEffect(() => {
    const preventScroll = (e) => {
      e.preventDefault();
    };

    const preventKeyScroll = (e) => {
      // Space, PageUp, PageDown, End, Home, Left, Up, Right, Down
      if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) {
        e.preventDefault();
      }
    };

    window.addEventListener('wheel', preventScroll, { passive: false });
    window.addEventListener('touchmove', preventScroll, { passive: false });
    window.addEventListener('keydown', preventKeyScroll, { passive: false });

    return () => {
      window.removeEventListener('wheel', preventScroll);
      window.removeEventListener('touchmove', preventScroll);
      window.removeEventListener('keydown', preventKeyScroll);
    };
  }, []);

  // Autoplay attempt, fallback timer, and error handling
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.muted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks autoplay or video fails, gracefully reveal site
          handleExit();
        });
      }
    }

    // Safety timeout: PC intro is ~7.5s, Mobile is ~10s. 14s safety timer ensures user is never stuck.
    const safetyTimer = setTimeout(() => {
      handleExit();
    }, 14000);

    return () => {
      clearTimeout(safetyTimer);
      if (exitTimerRef.current) {
        clearTimeout(exitTimerRef.current);
      }
    };
  }, [currentVideoSrc]);

  return (
    <div
      id="starx-intro-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        backgroundColor: '#000000',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        touchAction: 'none',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: isExiting ? 'none' : 'auto'
      }}
    >
      <style>{`
        .intro-skip-btn {
          position: absolute;
          top: 24px;
          right: 28px;
          z-index: 10;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #F5F5F7;
          background: rgba(7, 7, 9, 0.42);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.16);
          border-radius: 999px;
          padding: 8px 14px;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          box-shadow: none;
        }

        .intro-skip-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
          transform: scale(1.02);
        }

        @media (max-width: 767px) {
          .intro-skip-btn {
            top: max(16px, env(safe-area-inset-top));
            right: max(16px, env(safe-area-inset-right));
            font-size: 12px;
            padding: 7px 12px;
          }
        }
      `}</style>

      {/* Intro Video Element (Spec 8 & 9) */}
      <video
        ref={videoRef}
        key={currentVideoSrc}
        src={currentVideoSrc}
        autoPlay
        muted
        playsInline
        onEnded={handleExit}
        onError={handleExit}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          backgroundColor: '#000000',
          display: 'block'
        }}
      />

      {/* Clean SKIP Button (Spec 10 & 11) */}
      <button
        type="button"
        id="intro-skip-button"
        onClick={handleExit}
        className="intro-skip-btn"
        aria-label="Skip Intro Video"
      >
        SKIP
      </button>
    </div>
  );
};

export default StarXIntro;
