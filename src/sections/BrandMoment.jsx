import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteData } from '../data/siteData';
import BrandLogo from '../components/BrandLogo';

/**
 * BrandMoment Section (Section 9)
 * Full-viewport cinematic brand end-frame (Apple/iQOO style):
 * As user scrolls, central STARX logo slowly enlarges, background faint star expands,
 * and the official tagline reveals smoothly beneath it.
 */
export const BrandMoment = () => {
  const { brand } = siteData;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Logo slowly enlarges (0.85 -> 1.15)
  const logoScale = useTransform(scrollYProgress, [0.2, 0.7], [0.88, 1.12]);
  // Star expands behind it (0.7 -> 1.3)
  const starScale = useTransform(scrollYProgress, [0.1, 0.8], [0.75, 1.3]);
  const starOpacity = useTransform(scrollYProgress, [0.1, 0.4, 0.7, 0.9], [0, 0.18, 0.18, 0]);
  // Tagline enters smoothly
  const taglineOpacity = useTransform(scrollYProgress, [0.35, 0.6], [0, 1]);
  const taglineY = useTransform(scrollYProgress, [0.35, 0.6], [20, 0]);

  return (
    <section
      ref={containerRef}
      style={{
        position: 'relative',
        minHeight: '120vh',
        backgroundColor: '#000000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden'
      }}
    >
      {/* Background Expanding Faint Star */}
      <motion.div
        style={{
          scale: starScale,
          opacity: starOpacity,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 750px)',
          height: 'min(90vw, 750px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="#FF2A35" strokeWidth="1">
          <polygon points="50,4 62,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 38,35" />
        </svg>
      </motion.div>

      {/* Center Cinematic Brand Composition */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          textAlign: 'center',
          padding: '0 2rem',
          maxWidth: '900px'
        }}
      >
        {/* Slowly Enlarging STARX Logo Mark */}
        <motion.div style={{ scale: logoScale, marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <BrandLogo size="xl" />
          </div>

          <h2
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(4rem, 12vw, 8.5rem)',
              letterSpacing: 'clamp(4px, 1.5vw, 10px)',
              color: '#FFFFFF',
              lineHeight: 0.9,
              margin: 0
            }}
          >
            STAR<span style={{ color: '#FF2A35' }}>X</span> LIVE
          </h2>

          <div
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 'clamp(0.85rem, 1.5vw, 1.1rem)',
              fontWeight: 700,
              letterSpacing: '8px',
              color: '#777',
              textTransform: 'uppercase',
              marginTop: '0.75rem'
            }}
          >
            ROCK BAND
          </div>
        </motion.div>

        {/* Revealing Tagline */}
        <motion.p
          style={{
            opacity: taglineOpacity,
            y: taglineY,
            fontFamily: "'Inter', sans-serif",
            fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)',
            color: '#E0E0E0',
            letterSpacing: '0.5px',
            margin: 0
          }}
        >
          {brand.tagline}
        </motion.p>
      </div>
    </section>
  );
};

export default BrandMoment;
