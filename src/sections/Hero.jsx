import React, { useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { siteData, DEMO_PERFORMANCE_URL } from '../data/siteData';
import BrandLogo from '../components/BrandLogo';

/**
 * Hero Section
 * Refined, clean editorial landing with orchestrated entrance animations.
 *
 * Sequence specs (Spec 3, 4, 5, 12, 15):
 * 0ms   - Navbar starts appearing
 * 100ms - Hero main title starts (y: 24 -> 0, opacity: 0 -> 1)
 * 150ms - Authentic circular logo starts
 * 250ms - ROCK BAND pill & sub-label start (y: 16 -> 0)
 * 400ms - Tagline starts (y: 16 -> 0)
 * 550ms - CTA buttons start (y: 14 -> 0)
 * 700ms - Genres / languages / location start (y: 12 -> 0)
 * Total duration: ~1.4s (well within 1.2 - 1.8s)
 */

const easePremium = [0.22, 1, 0.36, 1];

const crestVariants = {
  hidden: { opacity: 0, scale: 0.94 },
  visible: {
    opacity: 0.03,
    scale: 1,
    transition: { duration: 1.0, delay: 0.10, ease: easePremium }
  }
};

const logoVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.94 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.65, delay: 0.15, ease: easePremium }
  }
};

const pillVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.25, ease: easePremium }
  }
};

const titleVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, delay: 0.10, ease: easePremium }
  }
};

const subLabelVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.25, ease: easePremium }
  }
};

const taglineVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.70, delay: 0.40, ease: easePremium }
  }
};

const buttonsVariants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.55, ease: easePremium }
  }
};

const metaVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, delay: 0.70, ease: easePremium }
  }
};

export const Hero = ({ onNavigate, isReady = false, animationKey = 0 }) => {
  const { brand } = siteData;
  const controls = useAnimation();
  const isMountedRef = useRef(true);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  // Control Home animation sequence (Spec 1, 3, 4, 12, 18, 19, 20)
  useEffect(() => {
    if (!isReady) {
      // 1. While intro is playing or exiting, hold all elements in reset state
      controls.set('hidden');
    } else {
      // 2. Reset to hidden first to guarantee time 0, then start visible sequence
      controls.set('hidden');
      const rafId = requestAnimationFrame(() => {
        if (isMountedRef.current) {
          controls.start('visible');
        }
      });
      return () => cancelAnimationFrame(rafId);
    }
  }, [isReady, animationKey, controls]);

  const handleWatchPerformance = () => {
    if (DEMO_PERFORMANCE_URL) {
      window.open(DEMO_PERFORMANCE_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const handleContactStarX = () => {
    if (onNavigate) {
      onNavigate('contact', 'view');
    }
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '80vh',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4.5rem, 8vw, 6.5rem) 1.5rem clamp(3.5rem, 5vw, 5rem) 1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Star Crest Background Motif */}
      <motion.div
        variants={crestVariants}
        initial="hidden"
        animate={controls}
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(80vw, 620px)',
          height: 'min(80vw, 620px)',
          pointerEvents: 'none',
          zIndex: 1
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="#B3131B" strokeWidth="1">
          <polygon points="50,4 62,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 38,35" />
        </svg>
      </motion.div>

      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {/* Authentic StarX Circular Logo */}
        <motion.div
          variants={logoVariants}
          initial="hidden"
          animate={controls}
          style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.15rem' }}
        >
          <BrandLogo
            size="md"
            style={{
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
            }}
          />
        </motion.div>

        {/* Pill: • ROCK BAND • HYDERABAD */}
        <motion.div
          variants={pillVariants}
          initial="hidden"
          animate={controls}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '4px 13px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#A1A1A6',
            letterSpacing: '0.1em',
            marginBottom: '1.25rem',
            textTransform: 'uppercase'
          }}
        >
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#B3131B'
            }}
          />
          ROCK BAND • HYDERABAD
        </motion.div>

        {/* Main Headline: STARX LIVE (48px-58px desktop, 34px-42px mobile) */}
        <div style={{ marginBottom: '0.75rem' }}>
          <motion.h1
            variants={titleVariants}
            initial="hidden"
            animate={controls}
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: 'clamp(34px, 5.2vw, 54px)',
              fontWeight: 650,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: '#F5F5F7',
              margin: '0 auto',
              textTransform: 'uppercase'
            }}
          >
            STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
          </motion.h1>

          <motion.div
            variants={subLabelVariants}
            initial="hidden"
            animate={controls}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(12px, 1.2vw, 15px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#8E8E93',
              textTransform: 'uppercase',
              marginTop: '0.35rem'
            }}
          >
            ROCK BAND
          </motion.div>
        </div>

        {/* Tagline: 15px-17px desktop, 14px-15px mobile */}
        <motion.p
          variants={taglineVariants}
          initial="hidden"
          animate={controls}
          style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: 'italic',
            fontSize: 'clamp(14px, 1.6vw, 16.5px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#D1D1D6',
            lineHeight: 1.45,
            maxWidth: '620px',
            margin: '0 auto 1.75rem auto'
          }}
        >
          “{brand.tagline}”
        </motion.p>

        {/* Hero CTAs */}
        <motion.div
          variants={buttonsVariants}
          initial="hidden"
          animate={controls}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {/* Watch Performance Button */}
          <button
            type="button"
            onClick={handleWatchPerformance}
            className="btn btn-primary"
            style={{
              height: '40px',
              padding: '0 20px',
              fontSize: '13px',
              fontWeight: 500,
              gap: '0.45rem'
            }}
          >
            <Play size={13} fill="#FFFFFF" />
            <span>Watch Performance</span>
          </button>

          {/* Contact StarX Button (Navigates directly to /contact view) */}
          <button
            type="button"
            onClick={handleContactStarX}
            className="btn btn-glass"
            style={{
              height: '40px',
              padding: '0 20px',
              fontSize: '13px',
              fontWeight: 500,
              gap: '0.45rem'
            }}
          >
            <span>Contact StarX</span>
            <ArrowRight size={13} />
          </button>
        </motion.div>

        {/* Bottom Metadata: 12px-13px desktop, 11px-12px mobile */}
        <motion.div
          variants={metaVariants}
          initial="hidden"
          animate={controls}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: 'clamp(11px, 1vw, 12.5px)',
            fontWeight: 500,
            color: '#8E8E93',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          <div style={{ color: '#A1A1A6' }}>{brand.genresDisplay}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ color: '#B3131B', fontWeight: 600 }}>{brand.languagesDisplay}</span>
            <span>•</span>
            <span>HYDERABAD</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
