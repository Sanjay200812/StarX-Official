import React from 'react';
import { motion } from 'framer-motion';
import { Play, ArrowRight } from 'lucide-react';
import { siteData, DEMO_PERFORMANCE_URL } from '../data/siteData';
import BrandLogo from '../components/BrandLogo';

/**
 * Hero Section
 * Refined, clean editorial landing.
 *
 * Requirements:
 * - Logo at top/center
 * - Small pill: • ROCK BAND • HYDERABAD
 * - STARX LIVE (desktop: 48px-58px max, mobile: 34px-42px)
 * - ROCK BAND (desktop: 14px-16px, mobile: 12px-14px)
 * - "Lost in the Noise. Found in the Sound." (desktop: 15px-17px, mobile: 14px-15px)
 * - Buttons:
 *     1. "Watch Performance" -> opens DEMO_PERFORMANCE_URL in new tab (target="_blank" rel="noopener noreferrer")
 *     2. "Contact StarX" -> navigates directly to /contact view
 * - Bottom metadata:
 *     CLASSIC • ROCK • WESTERN
 *     TELUGU • HINDI
 *     HYDERABAD
 */
export const Hero = ({ onNavigate, isIntroActive = false }) => {
  const { brand } = siteData;

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
    <motion.section
      id="home"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
      <div
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(80vw, 620px)',
          height: 'min(80vw, 620px)',
          opacity: 0.03,
          pointerEvents: 'none',
          zIndex: 1
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="#B3131B" strokeWidth="1">
          <polygon points="50,4 62,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 38,35" />
        </svg>
      </div>

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
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.15rem' }}>
          <BrandLogo
            size="md"
            style={{
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
            }}
          />
        </div>

        {/* Pill: • ROCK BAND • HYDERABAD */}
        <div
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
        </div>

        {/* Main Headline: STARX LIVE (48px-58px desktop, 34px-42px mobile) */}
        <div style={{ marginBottom: '0.75rem' }}>
          <h1
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
          </h1>
          <div
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
          </div>
        </div>

        {/* Tagline: 15px-17px desktop, 14px-15px mobile */}
        <p
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
        </p>

        {/* Hero CTAs */}
        <div
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
        </div>

        {/* Bottom Metadata: 12px-13px desktop, 11px-12px mobile */}
        <div
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
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
