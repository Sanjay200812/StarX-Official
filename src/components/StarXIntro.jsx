import React, { useState, useEffect, useRef } from 'react';

/**
 * StarXIntro Component
 * Replaces the old code-based glyph animation with the uploaded fullscreen intro video.
 *
 * Requirements:
 * - File: /assets/videos/StarX Intro.mov
 * - Fullscreen fixed overlay (inset: 0, 100vw, 100dvh, #000, z-index above site)
 * - autoPlay, muted, playsInline, no controls
 * - object-fit: contain with black background to ensure zero cropping of StarX intro text
 * - Clean SKIP button at top-right (desktop: top 28px/right 32px, mobile: top 18px/right 18px)
 * - Smooth 750ms exit fade on video finish or skip click
 * - Session storage guard: plays once per session
 * - Graceful fallback on load error / playback failure
 */
export const StarXIntro = ({ onComplete, onStartTransition }) => {
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef(null);
  const exitCalledRef = useRef(false);

  const handleExit = () => {
    if (exitCalledRef.current) return;
    exitCalledRef.current = true;

    try {
      sessionStorage.setItem('starxIntroPlayed', 'true');
    } catch (e) {
      // ignore
    }

    if (onStartTransition) {
      onStartTransition();
    }

    setIsExiting(true);

    setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 750);
  };

  // Autoplay attempt, fallback timer, and error handling
  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // If browser policy blocks autoplay even with muted, or video fails, gracefully exit
          handleExit();
        });
      }
    }

    // Safety timeout: If video takes longer than 25 seconds or gets stuck, smoothly reveal site
    const safetyTimer = setTimeout(() => {
      handleExit();
    }, 25000);

    return () => {
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div
      id="starx-intro-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        backgroundColor: '#000000',
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        opacity: isExiting ? 0 : 1,
        transition: 'opacity 0.75s cubic-bezier(0.22, 1, 0.36, 1)',
        pointerEvents: isExiting ? 'none' : 'auto'
      }}
    >
      <style>{`
        .intro-skip-btn {
          position: absolute;
          top: 28px;
          right: 32px;
          z-index: 100000;
          font-family: 'Inter', -apple-system, sans-serif;
          font-size: 12.5px;
          font-weight: 500;
          letter-spacing: 0.04em;
          color: #F5F5F7;
          background: rgba(10, 10, 10, 0.45);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.18);
          border-radius: 999px;
          padding: 9px 14px;
          cursor: pointer;
          transition: background-color 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          user-select: none;
        }

        .intro-skip-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.3);
          transform: scale(1.02);
        }

        @media (max-width: 767px) {
          .intro-skip-btn {
            top: 18px;
            right: 18px;
            font-size: 12px;
            padding: 8px 13px;
          }
        }
      `}</style>

      {/* Intro Video: contain fit with #000 background to avoid cropping StarX text */}
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        onEnded={handleExit}
        onError={handleExit}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          backgroundColor: '#000000',
          display: 'block'
        }}
      >
        <source src="/assets/videos/StarX%20Intro.mov" type="video/mp4" />
        <source src="/assets/videos/StarX%20Intro.mov" type="video/quicktime" />
        <source src="/assets/videos/StarX Intro.mov" type="video/mp4" />
      </video>

      {/* Top-Right SKIP Button */}
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
