import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import BrandLogo from '../components/BrandLogo';

/**
 * Hero Section (Section 18, 19, 20)
 * Premium dark background with subtle radial gradient, faint StarX silhouette,
 * massive Geist/Inter typography, scroll-driven depth scaling, and pill glass buttons.
 */
export const Hero = ({ isIntroActive = false, onOpenBanner }) => {
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
        minHeight: '78vh',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5.5rem 1.5rem 3.5rem 1.5rem',
        overflow: 'hidden',
        perspective: '1400px'
      }}
    >
      <style>{`
        .starx-banner-preview-wrapper:hover .starx-long-banner-img {
          transform: scale(1.01);
          filter: brightness(1.0);
        }
        .starx-banner-preview-wrapper:hover .banner-hover-badge {
          opacity: 1;
          transform: translateY(0);
        }
        .starx-long-banner-img {
          width: 100%;
          height: auto;
          max-height: 76vh;
          object-fit: contain;
          object-position: center;
        }
        @media (max-width: 768px) {
          .starx-long-banner-img {
            max-height: none !important;
            width: 100% !important;
            height: auto !important;
          }
        }
      `}</style>

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
        <svg viewBox="0 0 100 100" fill="none" stroke="#B3131B" strokeWidth="1">
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
        {/* Authentic StarX Brand Logo Emblem */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
          <BrandLogo
            size="xl"
            style={{
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.7)'
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
              backgroundColor: '#B3131B'
            }}
          />
          ROCK BAND • HYDERABAD
        </div>

        {/* Real StarX Wordmark / Major Hero Title (48px to 68px desktop) */}
        <div style={{ marginBottom: '1rem' }}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(48px, 5.2vw, 68px)',
              fontWeight: 750,
              letterSpacing: '-0.04em',
              lineHeight: 1.04,
              color: '#F5F5F7',
              margin: '0 auto',
              maxWidth: '1050px'
            }}
          >
            STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
          </h1>
          <div
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(14px, 1.6vw, 17px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#737378',
              textTransform: 'uppercase',
              marginTop: '0.65rem'
            }}
          >
            ROCK BAND
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 'clamp(15px, 1.1vw, 17px)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            color: '#A1A1A6',
            lineHeight: 1.5,
            maxWidth: '620px',
            margin: '0 auto 2.25rem auto'
          }}
        >
          {brand.tagline}
        </p>

        {/* Pill Action Buttons (Height 44-48px, normal casing) */}
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
            style={{ height: '46px', textTransform: 'none' }}
          >
            <Play size={15} fill="#050505" />
            Watch performance
          </button>

          <button
            onClick={() => scrollToSection('#contact')}
            className="btn btn-glass"
            style={{ height: '46px', textTransform: 'none' }}
          >
            Contact StarX
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Sub-features: Genres & Languages */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.45rem',
            fontSize: '0.85rem',
            fontWeight: 500,
            color: '#737378',
            letterSpacing: '0.06em'
          }}
        >
          <div>CLASSIC • ROCK • WESTERN</div>
          <div>
            <span style={{ color: '#B3131B', fontWeight: 600 }}>TELUGU • HINDI</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.15)', margin: '0 0.5rem' }}>•</span>
            <span>HYDERABAD</span>
          </div>
        </div>
      </motion.div>

      {/* StarX Long Banner Container (Requirements 13-22): max-width 1160px, radius 20px, contain, clickable */}
      <motion.div
        className="starx-banner-preview-wrapper"
        onClick={() => onOpenBanner && onOpenBanner()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (onOpenBanner) onOpenBanner();
          }
        }}
        aria-label="View StarX Live banner full size"
        style={{
          position: 'relative',
          zIndex: 2,
          marginTop: '3.5rem',
          width: '100%',
          maxWidth: '1160px',
          margin: '3.5rem auto 0 auto',
          scale: imageScale,
          z: imageZ,
          transformPerspective: 1400,
          borderRadius: '20px',
          overflow: 'hidden',
          backgroundColor: '#0D0D0F',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img
            src="/assets/brand/starx-long-banner.png"
            alt="StarX Live Official Banner"
            className="starx-long-banner-img"
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              objectFit: 'contain',
              objectPosition: 'center',
              filter: 'brightness(0.96)',
              transition: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease'
            }}
          />

          {/* Subtle Hover Badge (Requirement 21) */}
          <div
            className="banner-hover-badge"
            style={{
              position: 'absolute',
              bottom: '16px',
              right: '16px',
              backgroundColor: 'rgba(15, 15, 18, 0.88)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid rgba(255, 255, 255, 0.14)',
              borderRadius: '999px',
              padding: '6px 14px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#F5F5F7',
              fontSize: '12px',
              fontWeight: 500,
              opacity: 0,
              transform: 'translateY(4px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
              pointerEvents: 'none'
            }}
          >
            <span>View banner</span>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;
