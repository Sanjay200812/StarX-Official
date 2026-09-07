import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ExperienceReveal Section (Section 2)
 * Full-screen Apple-grade storytelling reveal:
 * "THE STARX EXPERIENCE" -> "LOST IN THE NOISE." -> shifts into "FOUND IN THE SOUND."
 */
export const ExperienceReveal = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Line 1 ("LOST IN THE NOISE."): fades in, stays, then dissolves
  const opacityLine1 = useTransform(scrollYProgress, [0.05, 0.25, 0.45, 0.55], [0, 1, 1, 0]);
  const yLine1 = useTransform(scrollYProgress, [0.05, 0.25, 0.45, 0.55], [30, 0, 0, -30]);

  // Line 2 ("FOUND IN THE SOUND."): enters as Line 1 dissolves
  const opacityLine2 = useTransform(scrollYProgress, [0.5, 0.65, 0.85, 0.95], [0, 1, 1, 0]);
  const yLine2 = useTransform(scrollYProgress, [0.5, 0.65, 0.85, 0.95], [30, 0, 0, -30]);

  return (
    <section
      ref={containerRef}
      id="experience"
      style={{
        position: 'relative',
        height: '220vh', // Extended scroll track for pinned slogan reveal
        backgroundColor: '#050505'
      }}
    >
      {/* Sticky Fullscreen Storytelling Canvas */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '0 2rem',
          overflow: 'hidden'
        }}
      >
        {/* Subtle Ambient Red Glow in Center */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(229, 9, 20, 0.1) 0%, transparent 70%)',
            pointerEvents: 'none',
            filter: 'blur(80px)'
          }}
        />

        {/* Small Section Subhead */}
        <div
          style={{
            position: 'absolute',
            top: '18vh',
            textAlign: 'center',
            zIndex: 5
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '4px',
              color: '#8E8E8E',
              textTransform: 'uppercase'
            }}
          >
            THE STARX EXPERIENCE
          </span>
        </div>

        {/* Dynamic Statement Reveal Container */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1100px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '260px'
          }}
        >
          {/* Phase 1: LOST IN THE NOISE. */}
          <motion.h2
            style={{
              opacity: opacityLine1,
              y: yLine1,
              position: 'absolute',
              fontFamily: "'Bebas Neue', 'Syne', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              letterSpacing: 'clamp(2px, 1vw, 6px)',
              color: '#FFFFFF',
              lineHeight: 0.95,
              margin: 0,
              textTransform: 'uppercase',
              width: '100%'
            }}
          >
            LOST IN THE NOISE.
          </motion.h2>

          {/* Phase 2: FOUND IN THE SOUND. */}
          <motion.h2
            style={{
              opacity: opacityLine2,
              y: yLine2,
              position: 'absolute',
              fontFamily: "'Bebas Neue', 'Syne', sans-serif",
              fontSize: 'clamp(3.5rem, 9vw, 8rem)',
              letterSpacing: 'clamp(2px, 1vw, 6px)',
              color: '#FFFFFF',
              lineHeight: 0.95,
              margin: 0,
              textTransform: 'uppercase',
              width: '100%'
            }}
          >
            FOUND IN THE <span style={{ color: '#FF2A35' }}>SOUND.</span>
          </motion.h2>
        </div>
      </div>
    </section>
  );
};

export default ExperienceReveal;
