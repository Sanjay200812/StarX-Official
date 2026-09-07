import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteData } from '../data/siteData';

/**
 * OurSoundPinned Section (Section 3)
 * Apple/iQOO-style pinned scroll sequence:
 * Scrolling through the section brings forward CLASSIC -> ROCK -> WESTERN
 * as individual cinematic typographic moments with captions.
 */
export const OurSoundPinned = () => {
  const { sound } = siteData;
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Phase 1: CLASSIC (0 - 0.33)
  const opacityClassic = useTransform(scrollYProgress, [0.05, 0.15, 0.28, 0.36], [0, 1, 1, 0]);
  const yClassic = useTransform(scrollYProgress, [0.05, 0.15, 0.28, 0.36], [40, 0, 0, -40]);

  // Phase 2: ROCK (0.36 - 0.66)
  const opacityRock = useTransform(scrollYProgress, [0.38, 0.48, 0.62, 0.70], [0, 1, 1, 0]);
  const yRock = useTransform(scrollYProgress, [0.38, 0.48, 0.62, 0.70], [40, 0, 0, -40]);

  // Phase 3: WESTERN (0.70 - 1.0)
  const opacityWestern = useTransform(scrollYProgress, [0.72, 0.82, 0.94, 1.0], [0, 1, 1, 1]);
  const yWestern = useTransform(scrollYProgress, [0.72, 0.82, 0.94, 1.0], [40, 0, 0, 0]);

  return (
    <section
      ref={containerRef}
      id="sound"
      style={{
        position: 'relative',
        height: '320vh', // Generous pinned scroll range
        backgroundColor: '#000000'
      }}
    >
      {/* Sticky Viewport Stage */}
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
        {/* Top Section Header */}
        <div
          style={{
            position: 'absolute',
            top: '12vh',
            textAlign: 'center',
            zIndex: 5
          }}
        >
          <span className="label-pill" style={{ marginBottom: '0.5rem', display: 'inline-block' }}>
            SONIC IDENTITY
          </span>
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2rem, 4vw, 3rem)',
              letterSpacing: '3px',
              color: '#FFFFFF',
              margin: 0
            }}
          >
            {sound.heading}
          </h3>
        </div>

        {/* Center Stage: Pinned Individual Genre Moments */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1000px',
            textAlign: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '350px'
          }}
        >
          {/* 1. CLASSIC */}
          <motion.div
            style={{
              opacity: opacityClassic,
              y: yClassic,
              position: 'absolute',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '4px',
                color: '#8E8E8E',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              01 / GENRE
            </span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(4.5rem, 13vw, 10rem)',
                letterSpacing: '4px',
                color: '#FFFFFF',
                lineHeight: 0.9,
                margin: 0
              }}
            >
              CLASSIC
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: '#A0A0A0',
                marginTop: '1.5rem',
                maxWidth: '450px',
                lineHeight: 1.5,
                whiteSpace: 'pre-line'
              }}
            >
              Timeless melodies.
              Recreated live.
            </p>
          </motion.div>

          {/* 2. ROCK */}
          <motion.div
            style={{
              opacity: opacityRock,
              y: yRock,
              position: 'absolute',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '4px',
                color: '#FF2A35',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              02 / GENRE
            </span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(4.5rem, 13vw, 10rem)',
                letterSpacing: '4px',
                color: '#FF2A35',
                lineHeight: 0.9,
                margin: 0
              }}
            >
              ROCK
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: '#E0E0E0',
                marginTop: '1.5rem',
                maxWidth: '450px',
                lineHeight: 1.5
              }}
            >
              Energy built for the stage.
            </p>
          </motion.div>

          {/* 3. WESTERN */}
          <motion.div
            style={{
              opacity: opacityWestern,
              y: yWestern,
              position: 'absolute',
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <span
              style={{
                fontSize: '0.8rem',
                fontWeight: 700,
                letterSpacing: '4px',
                color: '#8E8E8E',
                textTransform: 'uppercase',
                marginBottom: '1rem'
              }}
            >
              03 / GENRE
            </span>
            <h2
              style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(4.5rem, 13vw, 10rem)',
                letterSpacing: '4px',
                color: '#FFFFFF',
                lineHeight: 0.9,
                margin: 0
              }}
            >
              WESTERN
            </h2>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(1.1rem, 2vw, 1.4rem)',
                color: '#A0A0A0',
                marginTop: '1.5rem',
                maxWidth: '450px',
                lineHeight: 1.5
              }}
            >
              Familiar sound. Live intensity.
            </p>
          </motion.div>
        </div>

        {/* Bottom Pinned Badge: Performed in Telugu & Hindi */}
        <div
          style={{
            position: 'absolute',
            bottom: '10vh',
            textAlign: 'center',
            zIndex: 5
          }}
        >
          <span
            style={{
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '3px',
              color: '#666',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.35rem'
            }}
          >
            {sound.languagesTag}
          </span>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 700,
              letterSpacing: '2px',
              color: '#FFFFFF'
            }}
          >
            {sound.languagesText}
          </span>
        </div>
      </div>
    </section>
  );
};

export default OurSoundPinned;
