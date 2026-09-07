import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

/**
 * StarXIntro Component
 * Premium Dark Cinematic Opening Experience (Section 3).
 * Uses real /assets/brand/starx-logo.png.
 * Animation:
 * opacity: 0 -> 1
 * scale: 0.90 -> 1
 * translateZ: -160px -> 0
 * blur: 8px -> 0
 * Total duration: ~3.0-3.2 seconds.
 */
export const StarXIntro = ({ onComplete, onStartTransition }) => {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    // Deliberate, noticeable timing: Total intro ~3.2-3.5s
    const t1 = setTimeout(() => setPhase(1), 100);   // Logo emerges from depth (0.88 -> 1, z: -180 -> 0, blur: 8px -> 0 over 1.5s)
    const t2 = setTimeout(() => setPhase(2), 1500);  // STARX LIVE appears
    const t3 = setTimeout(() => setPhase(3), 1950);  // ROCK BAND & Tagline emerge
    const t4 = setTimeout(() => {
      setPhase(4); // Start seamless transition (scale 1 -> 0.95, y: -25px, opacity 1 -> 0 over 900ms)
      if (onStartTransition) onStartTransition();
    }, 2800);
    const t5 = setTimeout(() => {
      handleComplete();
    }, 3700); // Complete

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, []);

  const handleComplete = () => {
    onComplete();
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: phase >= 4 ? 0 : 1
      }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#050505',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        perspective: '1400px',
        transformStyle: 'preserve-3d',
        pointerEvents: phase >= 4 ? 'none' : 'auto',
        userSelect: 'none'
      }}
    >
        {/* Skip in Top-Right Corner */}
        <button
          onClick={handleComplete}
          style={{
            position: 'absolute',
            top: '2.5rem',
            right: '2.5rem',
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: '#737378',
            cursor: 'pointer',
            padding: '0.5rem 1rem',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            transition: 'all 0.3s ease',
            zIndex: 10
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#F5F5F7';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#737378';
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
          }}
        >
          SKIP
        </button>

        {/* Center Presentation */}
        <motion.div
          animate={{
            y: phase >= 4 ? -25 : 0,
            scale: phase >= 4 ? 0.95 : 1
          }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          style={{ textAlign: 'center', padding: '0 2rem' }}
        >
          {/* Centered StarX Logo from Depth (Section 3: /assets/brand/starx-logo.png) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, z: -180, filter: 'blur(8px)' }}
            animate={{
              opacity: phase >= 1 ? 1 : 0,
              scale: phase >= 1 ? 1 : 0.88,
              z: phase >= 1 ? 0 : -180,
              filter: phase >= 1 ? 'blur(0px)' : 'blur(8px)'
            }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ marginBottom: '1.75rem' }}
          >
            <img
              src="/assets/brand/starx-logo.png"
              alt="StarX Live Official Logo"
              style={{
                width: '120px',
                height: 'auto',
                margin: '0 auto',
                display: 'block',
                filter: 'drop-shadow(0 15px 35px rgba(0, 0, 0, 0.85))'
              }}
            />
          </motion.div>

          {/* STARX LIVE Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: phase >= 2 ? 1 : 0,
              y: phase >= 2 ? 0 : 20
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: 'clamp(36px, 5.5vw, 56px)',
                fontWeight: 750,
                letterSpacing: '-0.04em',
                color: '#F5F5F7',
                lineHeight: 1.1,
                margin: 0
              }}
            >
              STAR<span style={{ color: '#C1121F' }}>X</span> LIVE
            </h1>
          </motion.div>

          {/* ROCK BAND & Tagline */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: phase >= 3 ? 1 : 0,
              y: phase >= 3 ? 0 : 15
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                color: '#A1A1A6',
                textTransform: 'uppercase',
                marginTop: '0.6rem'
              }}
            >
              ROCK BAND
            </div>

            <p
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: '16px',
                fontWeight: 400,
                color: '#737378',
                letterSpacing: '-0.015em',
                marginTop: '1.4rem'
              }}
            >
              Lost in the Noise. Found in the Sound.
            </p>
          </motion.div>
        </motion.div>
      </motion.div>
  );
};

export default StarXIntro;
