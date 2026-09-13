import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/**
 * StarXIntro Component
 * 100% Typography-Based Cinematic Title Sequence
 *
 * Pacing & Sequence (Calibrated ~8.5s total duration):
 * - 0.0s – 0.7s: Near-black screen (#040404)
 * - 0.7s – 1.5s: S begins resolving through 3 transitional glyphs -> locks S at 1.5s
 * - 1.5s – 2.3s: T begins resolving through 3 transitional glyphs -> locks ST at 2.3s
 * - 2.3s – 3.1s: A begins resolving through 3 transitional glyphs -> locks STA at 3.1s
 * - 3.1s – 3.9s: R begins resolving through 3 transitional glyphs -> locks STAR at 3.9s
 * - 3.9s – 4.8s: X begins resolving through 3 transitional glyphs -> locks STARX at 4.8s
 * - 4.8s – 5.4s: X receives ONE subtle StarX red treatment (#B3131B) that settles back
 * - 4.8s – 5.6s: Completed STARX holds in cinematic isolation (~800ms)
 * - Staggered Lower Brand Identity (duration: 500ms, stagger: 250ms):
 *     5.60s: LIVE (#B3131B, 22px–28px, tracking 0.14em, weight 700)
 *     5.85s: ROCK BAND (#F5F5F7, 14px–17px, tracking 0.10em, weight 600)
 *     6.10s: CLASSIC • ROCK • WESTERN (#A1A1A6, 13px–14px)
 *     6.35s: TELUGU • HINDI (#8A8A90, 12px–14px)
 * - 6.85s – 7.90s: Final hold of complete identity stack (~1.05s)
 * - 7.90s: Handover begins (composition scales 1 -> 0.975, translateY 0 -> -14px, opacity 1 -> 0 over 900ms)
 * - 8.80s: Handover complete, onComplete callback fires, intro unmounts
 */

const TARGET_LETTERS = ['S', 'T', 'A', 'R', 'X'];

// Exactly 3 transitional glyphs per position inspired by Greek, Telugu, Devanagari, and Latin
const TRANSITIONAL_GLYPHS = [
  ['§', 'Σ', 'స'], // for S
  ['†', 'τ', 'త'], // for T
  ['Δ', 'అ', 'Λ'], // for A
  ['Γ', 'ర', 'Я'], // for R
  ['×', 'క్ష', 'χ']  // for X
];

export const StarXIntro = ({ onComplete, onStartTransition }) => {
  const [letters, setLetters] = useState([
    { active: false, char: '', locked: false },
    { active: false, char: '', locked: false },
    { active: false, char: '', locked: false },
    { active: false, char: '', locked: false },
    { active: false, char: '', locked: false }
  ]);

  const [xRedTreatment, setXRedTreatment] = useState(false);
  const [showLive, setShowLive] = useState(false);
  const [showRockBand, setShowRockBand] = useState(false);
  const [showGenres, setShowGenres] = useState(false);
  const [showLanguages, setShowLanguages] = useState(false);
  const [isHandover, setIsHandover] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const onStartTransitionRef = useRef(onStartTransition);
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onStartTransitionRef.current = onStartTransition;
    onCompleteRef.current = onComplete;
  });

  // Check prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mq.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    if (mq.addEventListener) {
      mq.addEventListener('change', handler);
      return () => mq.removeEventListener('change', handler);
    }
  }, []);

  useEffect(() => {
    // Reduced motion mode: simplified slow opacity transitions without transforms or blur
    if (prefersReducedMotion) {
      setLetters(
        TARGET_LETTERS.map((char) => ({ active: true, char, locked: true }))
      );
      setShowLive(true);
      setShowRockBand(true);
      setShowGenres(true);
      setShowLanguages(true);

      const t1 = setTimeout(() => {
        setIsHandover(true);
        if (onStartTransitionRef.current) onStartTransitionRef.current();
      }, 3500);

      const t2 = setTimeout(() => {
        if (onCompleteRef.current) onCompleteRef.current();
      }, 4400);

      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
      };
    }

    const setLetterState = (index, char, locked) => {
      setLetters((prev) => {
        const next = [...prev];
        next[index] = { active: true, char, locked };
        return next;
      });
    };

    // Orchestrated Cinematic Timeline
    const timers = [
      // ==========================================
      // 1. S (0.7s – 1.5s)
      // ==========================================
      setTimeout(() => setLetterState(0, TRANSITIONAL_GLYPHS[0][0], false), 700),
      setTimeout(() => setLetterState(0, TRANSITIONAL_GLYPHS[0][1], false), 950),
      setTimeout(() => setLetterState(0, TRANSITIONAL_GLYPHS[0][2], false), 1200),
      setTimeout(() => setLetterState(0, 'S', true), 1500),

      // ==========================================
      // 2. T (1.5s – 2.3s)
      // ==========================================
      setTimeout(() => setLetterState(1, TRANSITIONAL_GLYPHS[1][0], false), 1500),
      setTimeout(() => setLetterState(1, TRANSITIONAL_GLYPHS[1][1], false), 1750),
      setTimeout(() => setLetterState(1, TRANSITIONAL_GLYPHS[1][2], false), 2000),
      setTimeout(() => setLetterState(1, 'T', true), 2300),

      // ==========================================
      // 3. A (2.3s – 3.1s)
      // ==========================================
      setTimeout(() => setLetterState(2, TRANSITIONAL_GLYPHS[2][0], false), 2300),
      setTimeout(() => setLetterState(2, TRANSITIONAL_GLYPHS[2][1], false), 2550),
      setTimeout(() => setLetterState(2, TRANSITIONAL_GLYPHS[2][2], false), 2800),
      setTimeout(() => setLetterState(2, 'A', true), 3100),

      // ==========================================
      // 4. R (3.1s – 3.9s)
      // ==========================================
      setTimeout(() => setLetterState(3, TRANSITIONAL_GLYPHS[3][0], false), 3100),
      setTimeout(() => setLetterState(3, TRANSITIONAL_GLYPHS[3][1], false), 3350),
      setTimeout(() => setLetterState(3, TRANSITIONAL_GLYPHS[3][2], false), 3600),
      setTimeout(() => setLetterState(3, 'R', true), 3900),

      // ==========================================
      // 5. X (3.9s – 4.8s)
      // ==========================================
      setTimeout(() => setLetterState(4, TRANSITIONAL_GLYPHS[4][0], false), 3900),
      setTimeout(() => setLetterState(4, TRANSITIONAL_GLYPHS[4][1], false), 4150),
      setTimeout(() => setLetterState(4, TRANSITIONAL_GLYPHS[4][2], false), 4450),
      setTimeout(() => {
        setLetterState(4, 'X', true);
        setXRedTreatment(true);
      }, 4800),

      // ==========================================
      // 6. Lower Brand Identity Staggered Reveal
      // ==========================================
      // 5.60s: LIVE (#B3131B, 22px to 28px)
      setTimeout(() => setShowLive(true), 5600),

      // 5.85s: ROCK BAND (#F5F5F7, 14px to 17px)
      setTimeout(() => setShowRockBand(true), 5850),

      // 6.10s: CLASSIC • ROCK • WESTERN (#A1A1A6, 13px to 14px)
      setTimeout(() => setShowGenres(true), 6100),

      // 6.35s: TELUGU • HINDI (#8A8A90, 12px to 14px)
      setTimeout(() => setShowLanguages(true), 6350),

      // ==========================================
      // 7. Transition into Website (7.90s)
      // ==========================================
      setTimeout(() => {
        setIsHandover(true);
        if (onStartTransitionRef.current) onStartTransitionRef.current();
      }, 7900),

      // 8.80s: Total intro completion
      setTimeout(() => {
        if (onCompleteRef.current) onCompleteRef.current();
      }, 8800)
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [prefersReducedMotion]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{
        opacity: isHandover ? 0 : 1
      }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#040404',
        backgroundImage:
          'radial-gradient(ellipse at 50% 50%, rgba(18, 18, 22, 0.45) 0%, rgba(4, 4, 4, 0.98) 75%, #040404 100%)',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: isHandover ? 'none' : 'auto',
        userSelect: 'none',
        overflow: 'hidden'
      }}
    >
      <style>{`
        /* Soft lock illumination when STAR letters resolve (White/off-white #F5F5F7) */
        @keyframes letterLockHighlight {
          0% {
            filter: blur(0px) brightness(1.25);
            text-shadow: 0 0 16px rgba(245, 245, 247, 0.55);
          }
          100% {
            filter: blur(0px) brightness(1);
            text-shadow: 0 4px 18px rgba(0, 0, 0, 0.6);
          }
        }

        .char-locked {
          animation: letterLockHighlight 0.55s ease-out forwards;
        }

        /* X Letter Red Lock Treatment (StarX Red #B3131B - stays red) */
        @keyframes xRedLockHighlight {
          0% {
            filter: blur(0px) brightness(1.35);
            text-shadow: 0 0 22px rgba(179, 19, 27, 0.85);
          }
          100% {
            filter: blur(0px) brightness(1);
            text-shadow: 0 4px 18px rgba(179, 19, 27, 0.45);
          }
        }

        .char-x-locked {
          animation: xRedLockHighlight 0.65s cubic-bezier(0.22, 1, 0.36, 1) forwards;
        }
      `}</style>

      {/* Main Centered Intro Composition */}
      <motion.div
        animate={{
          scale: isHandover ? 0.975 : 1,
          y: isHandover ? -14 : 0,
          opacity: isHandover ? 0 : 1
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={{
          textAlign: 'center',
          padding: '0 1.5rem',
          width: '100%',
          maxWidth: '860px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2
        }}
      >
        {/* STARX Title: Centered, 72px–96px desktop, 48px–62px mobile */}
        <div
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
            fontSize: 'clamp(48px, 6.8vw, 96px)',
            fontWeight: 800,
            lineHeight: 1,
            letterSpacing: '-0.025em',
            margin: 0,
            padding: '0.12em 0.2em',
            whiteSpace: 'nowrap'
          }}
        >
          {letters.map((item, index) => {
            const isLetterX = index === 4;
            const isLocked = item.locked;
            const isActive = item.active;

            return (
              <span
                key={index}
                className={isLocked ? (isLetterX ? 'char-x-locked' : 'char-locked') : ''}
                style={{
                  display: 'inline-block',
                  position: 'relative',
                  width: '0.74em',
                  textAlign: 'center',
                  lineHeight: 1,
                  fontFamily: isLocked
                    ? "'Sora', 'Plus Jakarta Sans', sans-serif"
                    : "'Sora', 'Noto Sans Telugu', 'Segoe UI', sans-serif",
                  opacity: isActive ? (isLocked ? 1 : 0.68) : 0,
                  filter: isLocked
                    ? 'blur(0px)'
                    : isActive
                    ? 'blur(2.2px)'
                    : 'blur(5px)',
                  transform: isLocked
                    ? 'translateY(0px) scale(1)'
                    : isActive
                    ? 'translateY(3px) scale(0.985)'
                    : 'translateY(5px) scale(0.985)',
                  color: isLocked ? (isLetterX ? '#B3131B' : '#F5F5F7') : 'rgba(235, 235, 240, 0.72)',
                  transition:
                    'opacity 0.24s ease, filter 0.24s ease, transform 0.24s ease, color 0.24s ease'
                }}
              >
                {item.char || '\u00A0'}
              </span>
            );
          })}
        </div>

        {/* Lower Brand Identity Vertical Stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '1.5rem',
            width: '100%'
          }}
        >
          {/* 1. LIVE (StarX red #B3131B, 22px to 28px, font-weight 700, tracking 0.14em) */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
            animate={{
              opacity: showLive ? 1 : 0,
              y: showLive ? 0 : 10,
              filter: showLive ? 'blur(0px)' : 'blur(2px)'
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(22px, 2.5vw, 28px)',
              fontWeight: 700,
              letterSpacing: '0.14em',
              color: '#B3131B',
              lineHeight: 1.1,
              textTransform: 'uppercase'
            }}
          >
            LIVE
          </motion.div>

          {/* 2. ROCK BAND (#F5F5F7, 14px to 17px, font-weight 600, slight tracking) */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
            animate={{
              opacity: showRockBand ? 1 : 0,
              y: showRockBand ? 0 : 10,
              filter: showRockBand ? 'blur(0px)' : 'blur(2px)'
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Sora', 'Plus Jakarta Sans', sans-serif",
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              fontWeight: 600,
              letterSpacing: '0.10em',
              color: '#F5F5F7',
              marginTop: '0.5rem',
              lineHeight: 1.2,
              textTransform: 'uppercase'
            }}
          >
            ROCK BAND
          </motion.div>

          {/* 3. CLASSIC • ROCK • WESTERN (#A1A1A6, 13px to 14px) */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
            animate={{
              opacity: showGenres ? 1 : 0,
              y: showGenres ? 0 : 10,
              filter: showGenres ? 'blur(0px)' : 'blur(2px)'
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(13px, 1.2vw, 14px)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: '#A1A1A6',
              marginTop: '0.75rem',
              lineHeight: 1.25,
              textTransform: 'uppercase'
            }}
          >
            CLASSIC • ROCK • WESTERN
          </motion.div>

          {/* 4. TELUGU • HINDI (#8A8A90, 12px to 14px, mandatory) */}
          <motion.div
            initial={{ opacity: 0, y: 10, filter: 'blur(2px)' }}
            animate={{
              opacity: showLanguages ? 1 : 0,
              y: showLanguages ? 0 : 10,
              filter: showLanguages ? 'blur(0px)' : 'blur(2px)'
            }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(12px, 1.1vw, 14px)',
              fontWeight: 500,
              letterSpacing: '0.08em',
              color: '#8A8A90',
              marginTop: '0.4rem',
              lineHeight: 1.25,
              textTransform: 'uppercase'
            }}
          >
            TELUGU • HINDI
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default StarXIntro;
