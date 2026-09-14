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
        padding: 'clamp(4.25rem, 6.5vw, 5.25rem) 1.25rem clamp(2.5rem, 4vw, 3.5rem) 1.25rem',
        overflow: 'hidden',
        perspective: '1400px'
      }}
    >
      <style>{`
        .starx-banner-preview-wrapper {
          position: relative;
          z-index: 2;
          width: min(100%, 560px);
          max-width: 560px;
          margin: 3rem auto 0 auto;
          background-color: transparent !important;
          border-radius: 16px;
        }
        .starx-banner-preview-wrapper:hover .starx-long-banner-img {
          transform: scale(1.015);
          filter: brightness(1.0);
          box-shadow: 0 25px 60px rgba(0, 0, 0, 0.65);
        }
        .starx-banner-preview-wrapper:hover .banner-hover-badge {
          opacity: 1;
          transform: translateY(0);
        }
        .starx-long-banner-img {
          width: 100%;
          height: auto;
          max-height: 75vh;
          object-fit: contain;
          object-position: center;
          display: block;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.55);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease, box-shadow 0.5s ease;
        }
        @media (max-width: 768px) {
          .starx-banner-preview-wrapper {
            width: 100% !important;
            max-width: 100% !important;
            margin: 2.25rem auto 0 auto !important;
            border-radius: 12px !important;
          }
          .starx-long-banner-img {
            max-height: none !important;
            width: 100% !important;
            height: auto !important;
            border-radius: 12px !important;
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

        {/* Real StarX Wordmark / Major Hero Title (34px-56px clamp) */}
        <div style={{ marginBottom: '0.85rem' }}>
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(34px, 4.4vw, 56px)',
              fontWeight: 750,
              letterSpacing: '-0.035em',
              lineHeight: 1.05,
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
              fontSize: 'clamp(13px, 1.3vw, 15px)',
              fontWeight: 600,
              letterSpacing: '0.16em',
              color: '#737378',
              textTransform: 'uppercase',
              marginTop: '0.5rem'
            }}
          >
            ROCK BAND
          </div>
        </div>

        {/* Tagline */}
        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 'clamp(14px, 1.05vw, 15.5px)',
            fontWeight: 400,
            letterSpacing: '-0.015em',
            color: '#A1A1A6',
            lineHeight: 1.55,
            maxWidth: '600px',
            margin: '0 auto 2rem auto'
          }}
        >
          {brand.tagline}
        </p>

        {/* Pill Action Buttons (Height 44-46px, normal casing) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.85rem',
            flexWrap: 'wrap',
            marginBottom: '2.25rem'
          }}
        >
          <button
            onClick={() => scrollToSection('#performances')}
            className="btn btn-primary"
            style={{ height: '44px', fontSize: '13.5px', textTransform: 'none' }}
          >
            <Play size={14} fill="#050505" />
            Watch performance
          </button>

          <button
            onClick={() => scrollToSection('#contact')}
            className="btn btn-glass"
            style={{ height: '44px', fontSize: '13.5px', textTransform: 'none' }}
          >
            Contact StarX
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Sub-features: Genres & Languages */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: '0.82rem',
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

      {/* StarX Long Banner Container: Transparent wrapper naturally sizing around the portrait poster */}
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
        aria-label="View StarX Live promotional banner full size"
        style={{
          position: 'relative',
          zIndex: 2,
          scale: imageScale,
          z: imageZ,
          transformPerspective: 1400,
          backgroundColor: 'transparent',
          cursor: 'pointer',
          userSelect: 'none'
        }}
      >
        <div style={{ position: 'relative', width: '100%', overflow: 'hidden' }}>
          <img
            src="/assets/brand/starx-long-banner.png"
            alt="StarX Live Official Banner"
            className="starx-long-banner-img"
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
