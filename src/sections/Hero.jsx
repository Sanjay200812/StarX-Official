import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandLogo from '../components/BrandLogo';

/**
 * Hero Section
 * Clean, uncluttered, premium editorial landing.
 * Specifications:
 * - STARX LIVE
 * - ROCK BAND
 * - "Lost in the Noise. Found in the Sound." (Bodoni Moda)
 * - CLASSIC • ROCK • WESTERN
 * - TELUGU • HINDI
 * - Small refined CTA controls
 * - Generous negative space (no oversized banners dominating the hero)
 */
export const Hero = ({ isIntroActive = false }) => {
  const { brand } = siteData;

  const scrollToSection = (id) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
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
        minHeight: '82vh',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(5rem, 9vw, 7.5rem) 1.5rem clamp(4rem, 6vw, 5.5rem) 1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Faint StarX Star Silhouette in Background */}
      <div
        style={{
          position: 'absolute',
          top: '45%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(85vw, 680px)',
          height: 'min(85vw, 680px)',
          opacity: 0.035,
          pointerEvents: 'none',
          zIndex: 1
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="#B3131B" strokeWidth="1">
          <polygon points="50,4 62,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 38,35" />
        </svg>
      </div>

      {/* Hero Typography & Presentation */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '960px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {/* Authentic StarX Brand Logo Emblem */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.25rem' }}>
          <BrandLogo
            size="lg"
            style={{
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
            }}
          />
        </div>

        {/* Descriptor Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '5px 14px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '999px',
            fontSize: '11.5px',
            fontWeight: 600,
            color: '#A1A1A6',
            letterSpacing: '0.08em',
            marginBottom: '1.25rem',
            textTransform: 'uppercase'
          }}
        >
          <span
            style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              backgroundColor: '#B3131B'
            }}
          />
          HYDERABAD, INDIA
        </div>

        {/* StarX Brand Headline */}
        <div style={{ marginBottom: '1rem' }}>
          <h1
            style={{
              fontFamily: "var(--font-editorial)",
              fontSize: 'clamp(36px, 5.2vw, 54px)',
              fontWeight: 600,
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
              fontSize: 'clamp(12px, 1.1vw, 13.5px)',
              fontWeight: 600,
              letterSpacing: '0.2em',
              color: '#8E8E93',
              textTransform: 'uppercase',
              marginTop: '0.4rem'
            }}
          >
            ROCK BAND
          </div>
        </div>

        {/* Editorial Tagline in Bodoni Moda */}
        <p
          style={{
            fontFamily: "var(--font-editorial)",
            fontStyle: 'italic',
            fontSize: 'clamp(18px, 2.4vw, 24px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#D1D1D6',
            lineHeight: 1.45,
            maxWidth: '680px',
            margin: '0 auto 1.75rem auto'
          }}
        >
          “{brand.tagline}”
        </p>

        {/* Music Genres & Languages Stack */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: '12px',
            fontWeight: 500,
            color: '#8E8E93',
            letterSpacing: '0.08em',
            marginBottom: '2.5rem'
          }}
        >
          <div style={{ color: '#A1A1A6' }}>{brand.genresDisplay}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ color: '#B3131B', fontWeight: 600 }}>{brand.languagesDisplay}</span>
          </div>
        </div>

        {/* Compact Clean CTA Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() => scrollToSection('#artists')}
            className="btn btn-primary"
            style={{
              height: '42px',
              padding: '0 20px',
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            <Users size={14} />
            <span>Meet StarX</span>
          </button>

          <button
            onClick={() => scrollToSection('#contact')}
            className="btn btn-glass"
            style={{
              height: '42px',
              padding: '0 20px',
              fontSize: '13px',
              fontWeight: 500
            }}
          >
            <span>Bookings & Enquiries</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>
    </motion.section>
  );
};

export default Hero;
