import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * IntroScreen Component
 * 2.5s cinematic concert intro sequence:
 * Black screen -> deep red glow -> star outline -> STARX LIVE ROCK BAND -> tagline.
 * Includes "SKIP INTRO" and stores completion in sessionStorage.
 */
export const IntroScreen = ({ onComplete }) => {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    // Check if user previously completed intro in this session
    const hasSeenIntro = sessionStorage.getItem('starx_intro_seen');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro || prefersReducedMotion) {
      onComplete();
      return;
    }

    const t1 = setTimeout(() => setStage(1), 300);  // red light & star
    const t2 = setTimeout(() => setStage(2), 800);  // STARX LIVE
    const t3 = setTimeout(() => setStage(3), 1400); // ROCK BAND & Tagline
    const t4 = setTimeout(() => {
      handleFinish();
    }, 2800); // end intro

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  const handleFinish = () => {
    sessionStorage.setItem('starx_intro_seen', 'true');
    onComplete();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 0.8, ease: 'easeInOut' } }}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: '#050505',
          zIndex: 999999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          userSelect: 'none'
        }}
      >
        {/* Background Deep Red Concert Aura */}
        <motion.div
          animate={{
            scale: stage >= 1 ? [1, 1.25, 1.1] : 0.8,
            opacity: stage >= 1 ? 0.35 : 0
          }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #FF2A35 0%, #8B0000 50%, transparent 75%)',
            filter: 'blur(80px)',
            pointerEvents: 'none'
          }}
        />

        {/* Large Faint Star Outline */}
        <motion.div
          animate={{
            scale: stage >= 1 ? 1 : 0.85,
            opacity: stage >= 1 ? 0.15 : 0,
            rotate: stage >= 1 ? [0, 4] : 0
          }}
          transition={{ duration: 2, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            width: '380px',
            height: '380px',
            pointerEvents: 'none'
          }}
        >
          <svg viewBox="0 0 100 100" fill="none" stroke="#FF2A35" strokeWidth="1.5">
            <polygon points="50,5 62,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 38,35" />
          </svg>
        </motion.div>

        {/* Cinematic Content Reveal */}
        <div
          style={{
            position: 'relative',
            zIndex: 10,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          {/* STARX LIVE */}
          <motion.div
            initial={{ opacity: 0, y: 25, letterSpacing: '8px' }}
            animate={{
              opacity: stage >= 2 ? 1 : 0,
              y: stage >= 2 ? 0 : 25,
              letterSpacing: stage >= 2 ? '4px' : '8px'
            }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Bebas Neue', 'Syne', sans-serif",
              fontSize: 'clamp(3.5rem, 10vw, 6.5rem)',
              color: '#FFFFFF',
              lineHeight: 0.9,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textShadow: '0 0 30px rgba(255, 42, 53, 0.6)'
            }}
          >
            <span>STAR</span>
            <span style={{ color: '#FF2A35' }}>X</span>
            <span
              style={{
                fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
                padding: '0.2rem 0.6rem',
                background: '#E50914',
                color: '#FFF',
                borderRadius: '4px',
                marginLeft: '0.4rem',
                letterSpacing: '2px'
              }}
            >
              LIVE
            </span>
          </motion.div>

          {/* ROCK BAND */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{
              opacity: stage >= 3 ? 1 : 0,
              y: stage >= 3 ? 0 : 15
            }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.9rem',
              fontWeight: 800,
              letterSpacing: '10px',
              color: '#B0B0B0',
              textTransform: 'uppercase',
              marginTop: '0.75rem'
            }}
          >
            ROCK BAND
          </motion.div>

          {/* Official Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage >= 3 ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{
              fontSize: '0.95rem',
              color: '#888888',
              letterSpacing: '1px',
              marginTop: '1.25rem',
              fontStyle: 'italic'
            }}
          >
            Lost in the Noise. Found in the Sound.
          </motion.div>
        </div>

        {/* SKIP INTRO Button */}
        <button
          onClick={handleFinish}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            padding: '0.5rem 1.25rem',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '9999px',
            color: '#888',
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 20
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#FFF';
            e.currentTarget.style.borderColor = '#FF2A35';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#888';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
          }}
        >
          SKIP INTRO →
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default IntroScreen;
