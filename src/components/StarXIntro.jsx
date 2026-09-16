import React, { useState, useEffect, useRef } from 'react';
import { useIsMobile } from '../hooks/useIsMobile';
import { siteData } from '../data/siteData';

/**
 * StarXIntro Component
 * High-visibility fullscreen cinematic entry video system for StarX Live.
 *
 * Requirements:
 * - Direct root-level overlay (z-index: 1000, 100vw, 100dvh, #000)
 * - Video fills the screen: object-fit cover, object-position center, 100% width/height
 * - Clean SKIP button (z-index: 1010, always visible)
 * - AutoPlay, muted, playsInline
 * - Immediate failure detection (3.5s safety timer only for load failure, cancelled once playing)
 * - Single exit flow for video ended, Skip button, or playback failure
 */
export const StarXIntro = ({ onStartExit, onFinishExit, onFinishIntro, onComplete }) => {
  const isMobile = useIsMobile();
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);
  const exitCalledRef = useRef(false);
  const exitTimerRef = useRef(null);

  const { intro } = siteData;
  const currentVideoSrc = isMobile ? intro.mobileVideo : intro.desktopVideo;

  // Single unified intro finish function (Requirements 13 & 14)
  const handleExit = () => {
    if (exitCalledRef.current) return;
    exitCalledRef.current = true;

    // 1. Pause video immediately
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {
        // ignore
      }
    }

    // 2. Notify transition start (App keeps home hidden, resets scroll to 0, resets animations)
    if (onStartExit) {
      onStartExit();
    }

    // 3. Fade intro overlay smoothly (650ms)
    setIsExiting(true);

    // 4. Once overlay fade is complete, notify App to remove intro and reveal Home
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

  // Prevent scroll during intro (Requirement 17)
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

  // Video playback initialization & safety handling (Requirements 1, 9, 10, 11, 12)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    // Small 3.5s fallback timer ONLY to detect if loading completely hangs or fails (Requirement 12)
    // NEVER wait 15 seconds!
    let loadFailureTimeout = setTimeout(() => {
      console.warn('[StarXIntro] Video load timed out after 3.5s, exiting gracefully to Home.');
      handleExit();
    }, 3500);

    const onPlaying = () => {
      // Video successfully started playing: cancel the load-failure fallback timer!
      if (loadFailureTimeout) {
        clearTimeout(loadFailureTimeout);
        loadFailureTimeout = null;
      }
    };

    const onError = (e) => {
      console.warn('[StarXIntro] Video playback error detected, exiting immediately to Home.', e);
      if (loadFailureTimeout) clearTimeout(loadFailureTimeout);
      handleExit();
    };

    video.addEventListener('playing', onPlaying, { once: true });
    video.addEventListener('error', onError, { once: true });

    // Attempt autoplay
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        console.warn('[StarXIntro] Autoplay rejected, exiting immediately to Home:', err);
        if (loadFailureTimeout) clearTimeout(loadFailureTimeout);
        handleExit();
      });
    }

    return () => {
      if (loadFailureTimeout) clearTimeout(loadFailureTimeout);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
    };
  }, [currentVideoSrc]);

  return (
    <div
      id="starx-intro-overlay"
      className={isExiting ? 'intro-fading' : ''}
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
        visibility: 'visible',
        transition: 'opacity 0.65s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: isExiting ? 'none' : 'auto'
      }}
    >
      <style>{`
        .intro-skip-btn {
          position: absolute;
          top: 24px;
          right: 28px;
          z-index: 1010;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.06em;
          color: #F5F5F7;
          background: rgba(7, 7, 9, 0.55);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          border: 1px solid rgba(255, 255, 255, 0.22);
          border-radius: 999px;
          padding: 8px 16px;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.6);
        }

        .intro-skip-btn:hover {
          background: rgba(255, 255, 255, 0.16);
          border-color: rgba(255, 255, 255, 0.4);
          transform: scale(1.03);
        }

        @media (max-width: 767px) {
          .intro-skip-btn {
            top: max(16px, env(safe-area-inset-top));
            right: max(16px, env(safe-area-inset-right));
            font-size: 12px;
            padding: 7px 14px;
          }
        }
      `}</style>

      {/* Intro Video Element (Requirements 3 & 10) */}
      <video
        id="starx-intro-video"
        ref={videoRef}
        key={currentVideoSrc}
        src={currentVideoSrc}
        autoPlay
        muted
        playsInline
        onEnded={handleExit}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          backgroundColor: '#000000',
          display: 'block',
          opacity: 1,
          visibility: 'visible'
        }}
      />

      {/* Clean SKIP Button (Requirement 25: z-index 1010) */}
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
