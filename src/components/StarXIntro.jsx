import React, { useState, useEffect, useRef, useCallback } from 'react';

/**
 * StarXIntro Component
 * High-reliability cinematic intro video system for StarX Live.
 *
 * Requirements (Specs 13-26):
 * - Clear states: 'loading' | 'playing' | 'exiting' | 'complete'
 * - Viewport-accurate source: width < 768 -> mobile, width >= 768 -> pc
 * - Branded loading frame: centered StarX logo + subtle pulse + minimal indicator (NO plain black screen)
 * - preload="auto", muted, playsInline, video.load()
 * - Real media events: canplay, playing, ended, error
 * - Play failure / 4.5s load timeout: graceful fallback transition to Home (no 15s wait)
 * - Cancel load timeout as soon as 'playing' fires
 * - sessionStorage.starxIntroPlayed is set ONLY when ended or skipped
 */
export const StarXIntro = ({ onStartExit, onFinishExit, onFinishIntro, onComplete }) => {
  // 1. Viewport-accurate source selection (Spec 17)
  const [videoSrc] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768
        ? '/assets/videos/starx-intro-mobile.mp4'
        : '/assets/videos/starx-intro-pc.mp4';
    }
    return '/assets/videos/starx-intro-pc.mp4';
  });

  // 2. Explicit state model (Spec 15)
  const [introState, setIntroState] = useState('loading'); // 'loading' | 'playing' | 'exiting' | 'complete'
  const videoRef = useRef(null);
  const exitCalledRef = useRef(false);
  const loadTimeoutRef = useRef(null);
  const exitTimerRef = useRef(null);

  // 3. Unified exit sequence (Specs 14, 21, 24, 25)
  const handleExit = useCallback((source = 'ended') => {
    if (exitCalledRef.current) return;
    exitCalledRef.current = true;

    // Clear safety timeout
    if (loadTimeoutRef.current) {
      clearTimeout(loadTimeoutRef.current);
      loadTimeoutRef.current = null;
    }

    // Pause video
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {
        // ignore
      }
    }

    // CRITICAL (Spec 14): Only set starxIntroPlayed if genuine play ended or user skipped
    if (source === 'ended' || source === 'skip') {
      try {
        sessionStorage.setItem('starxIntroPlayed', 'true');
      } catch (e) {
        // ignore
      }
    }

    // Notify transition start
    if (onStartExit) {
      onStartExit(source);
    }

    // Transition to exiting state (650ms smooth fade)
    setIntroState('exiting');

    exitTimerRef.current = setTimeout(() => {
      setIntroState('complete');
      if (onFinishExit) {
        onFinishExit(source);
      } else if (onFinishIntro) {
        onFinishIntro(source);
      } else if (onComplete) {
        onComplete(source);
      }
    }, 650);
  }, [onStartExit, onFinishExit, onFinishIntro, onComplete]);

  // Prevent scroll during intro (Spec 26)
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

  // Video initialization & playback handling (Specs 18-23)
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.muted = true;
    video.playsInline = true;

    // Call video.load() as per Spec 18
    try {
      video.load();
    } catch (e) {
      // ignore
    }

    // 4.5s load failure safety timeout ONLY (Spec 22: max 4-5s)
    loadTimeoutRef.current = setTimeout(() => {
      console.warn('[StarXIntro] Video buffering timed out at 4.5s, exiting gracefully to Home.');
      handleExit('timeout');
    }, 4500);

    const onCanPlay = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn('[StarXIntro] Autoplay rejected, exiting gracefully to Home:', err);
          handleExit('play_error');
        });
      }
    };

    const onPlaying = () => {
      // Spec 23: As soon as 'playing' fires, cancel failure timeout!
      if (loadTimeoutRef.current) {
        clearTimeout(loadTimeoutRef.current);
        loadTimeoutRef.current = null;
      }
      setIntroState('playing');
    };

    const onError = (e) => {
      console.warn('[StarXIntro] Video error event fired:', e);
      handleExit('error');
    };

    video.addEventListener('canplay', onCanPlay, { once: true });
    video.addEventListener('playing', onPlaying, { once: true });
    video.addEventListener('error', onError, { once: true });

    return () => {
      if (loadTimeoutRef.current) clearTimeout(loadTimeoutRef.current);
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
      video.removeEventListener('canplay', onCanPlay);
      video.removeEventListener('playing', onPlaying);
      video.removeEventListener('error', onError);
    };
  }, [videoSrc, handleExit]);

  const isExiting = introState === 'exiting' || introState === 'complete';
  const isLoading = introState === 'loading';

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
          font-size: 12px;
          font-weight: 600;
          letter-spacing: 0.08em;
          color: #F5F5F7;
          background: rgba(14, 14, 18, 0.65);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 999px;
          padding: 8px 18px;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          user-select: none;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.7);
        }

        .intro-skip-btn:hover {
          background: rgba(255, 255, 255, 0.18);
          border-color: rgba(255, 255, 255, 0.45);
          transform: scale(1.03);
        }

        @media (max-width: 767px) {
          .intro-skip-btn {
            top: max(16px, env(safe-area-inset-top));
            right: max(16px, env(safe-area-inset-right));
            font-size: 11.5px;
            padding: 7px 15px;
          }
        }

        @keyframes starxPulse {
          0%, 100% {
            opacity: 0.85;
            transform: scale(1);
          }
          50% {
            opacity: 1;
            transform: scale(1.025);
          }
        }

        @keyframes starxSpin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .starx-loader-ring {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-top-color: #B3131B;
          animation: starxSpin 0.9s linear infinite;
        }
      `}</style>

      {/* Intro Video Element (Specs 18-20) */}
      <video
        id="starx-intro-video"
        ref={videoRef}
        key={videoSrc}
        src={videoSrc}
        preload="auto"
        autoPlay
        muted
        playsInline
        onEnded={() => handleExit('ended')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          backgroundColor: '#000000',
          display: 'block',
          opacity: isLoading ? 0 : 1,
          transition: 'opacity 0.45s ease',
          visibility: 'visible'
        }}
      />

      {/* Branded Loading Frame (Spec 16: Zero plain black screen) */}
      <div
        id="starx-intro-loading-frame"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#000000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1005,
          opacity: isLoading ? 1 : 0,
          pointerEvents: isLoading ? 'auto' : 'none',
          transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        {/* Centered Circular StarX Logo with Subtle Glow & Pulse */}
        <div
          style={{
            position: 'relative',
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#050505',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 0 40px rgba(179, 19, 27, 0.28), 0 10px 30px rgba(0, 0, 0, 0.8)',
            marginBottom: '1.25rem',
            animation: 'starxPulse 2.2s ease-in-out infinite',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <img
            src="/assets/brand/starx-logo.png"
            alt="StarX Live"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block'
            }}
          />
        </div>

        {/* Brand Name & Loading Indicator */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.65rem'
          }}
        >
          <span
            style={{
              fontFamily: "'Bodoni Moda', serif",
              fontSize: '15px',
              fontWeight: 650,
              letterSpacing: '0.14em',
              color: '#F5F5F7',
              textTransform: 'uppercase'
            }}
          >
            STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
          </span>

          <div className="starx-loader-ring" aria-label="Loading..." />
        </div>
      </div>

      {/* Clean SKIP Button (Spec 25: Always visible on top) */}
      <button
        type="button"
        id="intro-skip-button"
        onClick={() => handleExit('skip')}
        className="intro-skip-btn"
        aria-label="Skip Intro Video"
      >
        SKIP
      </button>
    </div>
  );
};

export default StarXIntro;
