import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';

/**
 * Hero Section (Section 18, 19, 20)
 * Premium dark background with subtle radial gradient, faint StarX silhouette,
 * massive Geist/Inter typography, scroll-driven depth scaling, and pill glass buttons.
 */
export const Hero = ({ isIntroActive = false }) => {
  const { brand } = siteData;
  const sectionRef = useRef(null);

  // Full hero storytelling scroll distance (Section 20: 100-130vh)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start']
  });

  // Hero title scroll interpolation: scale 1 -> 0.86, translateY 0 -> -50px, opacity 1 -> 0.15
  const headingScale = useTransform(scrollYProgress, [0, 0.7], [1, 0.86]);
  const headingY = useTransform(scrollYProgress, [0, 0.7], [0, -50]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0.15]);

  // Hero visual scroll interpolation: scale 0.92 -> 1, translateZ -80px -> 0
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [0.92, 1]);
  const imageZ = useTransform(scrollYProgress, [0, 0.8], [-80, 0]);

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.section
      id="home"
      ref={sectionRef}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'relative',
        minHeight: '115vh',
        backgroundColor: '#050505',
        backgroundImage:
          'radial-gradient(circle at 70% 40%, #18181b 0%, #080808 45%, #030303 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8rem 1.5rem 6rem 1.5rem',
        overflow: 'hidden',
        perspective: '1400px'
      }}
    >
      {/* Hero Atmospheric Background (Section 4, 17, 18) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(to bottom, rgba(5, 5, 5, 0.72) 0%, rgba(5, 5, 5, 0.55) 50%, rgba(5, 5, 5, 0.95) 100%), url(${siteData.hero.desktopImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 30%',
          opacity: 0.35,
          filter: 'brightness(0.5)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      {/* Faint StarX Star Silhouette (Section 19: opacity 0.04-0.08, NO particles/smoke) */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(90vw, 720px)',
          height: 'min(90vw, 720px)',
          opacity: 0.04,
          pointerEvents: 'none',
          zIndex: 1
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="#C1121F" strokeWidth="1">
          <polygon points="50,4 62,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 38,35" />
        </svg>
      </div>

      {/* Top Identity & Hero Typography */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '1100px',
          width: '100%',
          scale: headingScale,
          y: headingY,
          opacity: headingOpacity,
          transformPerspective: 1400,
          willChange: 'transform, opacity'
        }}
      >
        {/* Authentic StarX Brand Logo Emblem (Section 2 & 5) */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <img
            src="/assets/brand/starx-logo.png"
            alt="StarX Emblem"
            style={{
              width: '54px',
              height: 'auto',
              display: 'block',
              filter: 'drop-shadow(0 10px 25px rgba(0, 0, 0, 0.7))'
            }}
          />
        </div>

        {/* Descriptor Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '6px 18px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            fontSize: '0.8rem',
            fontWeight: 600,
            color: '#A1A1A6',
            letterSpacing: '0.08em',
            marginBottom: '1.75rem',
            textTransform: 'uppercase'
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              backgroundColor: '#C1121F'
            }}
          />
          ROCK BAND • HYDERABAD
        </div>

        {/* Real StarX Wordmark / Major Hero Title (Section 2 & 5) */}
        <div style={{ marginBottom: '1.25rem' }}>
          <h1
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: 'clamp(4rem, 8vw, 8rem)',
              fontWeight: 750,
              letterSpacing: '-0.045em',
              lineHeight: 0.96,
              color: '#F5F5F7',
              margin: '0 auto',
              maxWidth: '1080px'
            }}
          >
            STAR<span style={{ color: '#C1121F' }}>X</span> LIVE
          </h1>
          <div
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: 'clamp(0.9rem, 1.8vw, 1.25rem)',
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: '#737378',
              textTransform: 'uppercase',
              marginTop: '0.65rem'
            }}
          >
            ROCK BAND
          </div>
        </div>

        {/* Tagline (Section 5) */}
        <p
          style={{
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)',
            fontWeight: 400,
            letterSpacing: '-0.02em',
            color: '#A1A1A6',
            lineHeight: 1.45,
            maxWidth: '660px',
            margin: '0 auto 2.5rem auto'
          }}
        >
          {brand.tagline}
        </p>

        {/* Pill Action Buttons (Section 5: WATCH LIVE, CONTACT STARX) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          <button
            onClick={() => scrollToSection('#performances')}
            className="btn btn-primary"
          >
            <Play size={16} fill="#050505" />
            WATCH LIVE
          </button>

          <button
            onClick={() => scrollToSection('#contact')}
            className="btn btn-glass"
          >
            CONTACT STARX
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Sub-features: Genres & Languages in clean minimal typography (Section 5) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#737378',
            letterSpacing: '0.06em'
          }}
        >
          <div>CLASSIC • ROCK • WESTERN</div>
          <div>
            <span style={{ color: '#C1121F', fontWeight: 600 }}>TELUGU • HINDI</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.15)', margin: '0 0.5rem' }}>•</span>
            <span>HYDERABAD</span>
          </div>
        </div>
      </motion.div>

      {/* Hero Visual Container: scale: 0.90 -> 1, translateZ: -120px -> 0 (Section 4 & 24) */}
      <motion.div
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '4.5rem',
          width: '100%',
          maxWidth: '1100px',
          scale: imageScale,
          z: imageZ,
          transformPerspective: 1400,
          borderRadius: '26px',
          overflow: 'hidden',
          backgroundColor: '#0D0D0F',
          boxShadow: '0 30px 80px rgba(0, 0, 0, 0.65)',
          border: '1px solid rgba(255, 255, 255, 0.08)'
        }}
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <BrandedImage
            src={siteData.hero.desktopImage}
            alt="StarX Live Band - Concert Stage Performance"
            aspectRatio="16/9"
            objectFit="cover"
            objectPosition="center 35%"
            fallbackTitle="STARX LIVE"
            fallbackSubtitle="ROCK BAND • HYDERABAD"
          />

          {/* Dark Overlay (Section 4: linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.75))) */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(to bottom, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.4) 60%, rgba(0, 0, 0, 0.75) 100%)',
              pointerEvents: 'none'
            }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
