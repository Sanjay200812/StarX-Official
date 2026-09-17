import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Music, MapPin, Globe } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';

/**
 * AboutView Component
 * Dedicated "/about" page view.
 * "ABOUT STARX"
 *
 * Specifications:
 * - Bodoni Moda for "ABOUT STARX"
 * - Clean editorial narrative: band background, genres, languages, and stage presence.
 * - Stage photograph.
 * - Back to Home button.
 */
export const AboutView = ({ onBackHome }) => {
  const { about, brand } = siteData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: 'clamp(6.5rem, 10vw, 8.5rem) 1.25rem clamp(4rem, 6vw, 6rem) 1.25rem',
        minHeight: '85vh'
      }}
    >
      <div className="container" style={{ maxWidth: '1080px' }}>
        {/* Back to Home Button */}
        <button
          onClick={onBackHome}
          className="btn btn-glass"
          style={{
            height: '36px',
            padding: '0 16px',
            fontSize: '12.5px',
            fontWeight: 500,
            marginBottom: '2rem',
            gap: '0.4rem'
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>

        {/* View Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="label-accent" style={{ marginBottom: '0.65rem', fontSize: '12px' }}>
            <span className="label-accent-dot" />
            BAND STORY & IDENTITY
          </div>

          <h1
            className="editorial-heading"
            style={{
              fontSize: 'clamp(32px, 4vw, 46px)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
              color: '#F5F5F7',
              lineHeight: 1.1,
              margin: '0 0 0.65rem 0'
            }}
          >
            ABOUT STARX
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(14px, 1.1vw, 15.5px)',
              color: '#A1A1A6',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            A premier live rock collective delivering raw musicianship and unforgettable concert energy.
          </p>
        </div>

        {/* Editorial Split Layout */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '3rem',
            alignItems: 'center',
            backgroundColor: 'rgba(14, 14, 18, 0.68)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '20px',
            padding: 'clamp(1.75rem, 3.5vw, 3rem)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)'
          }}
        >
          {/* Narrative Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#B3131B',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.4rem'
                }}
              >
                LIVE BAND EXPERIENCE
              </span>
              <h2
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 'clamp(22px, 2.8vw, 30px)',
                  fontWeight: 650,
                  letterSpacing: '-0.02em',
                  color: '#F5F5F7',
                  lineHeight: 1.2,
                  margin: 0
                }}
              >
                Lost in the Noise. Found in the Sound.
              </h2>
            </div>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '15px',
                color: '#C7C7CC',
                lineHeight: 1.7,
                margin: 0
              }}
            >
              {about.description}
            </p>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '14.5px',
                color: '#A1A1A6',
                lineHeight: 1.65,
                margin: 0
              }}
            >
              From soulful acoustic transitions to explosive guitar solos and thumping rhythm section grooves, StarX Live crafts sets tailored for large festivals, college arenas, and exclusive corporate galas across India.
            </p>

            {/* Spec Highlights */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1.25rem',
                paddingTop: '1rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B3131B', marginBottom: '0.25rem' }}>
                  <Music size={13} />
                  <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Genres</span>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 500, color: '#F5F5F7' }}>{brand.genresDisplay}</div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B3131B', marginBottom: '0.25rem' }}>
                  <Globe size={13} />
                  <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Languages</span>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 500, color: '#F5F5F7' }}>{brand.languagesDisplay}</div>
              </div>

              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#B3131B', marginBottom: '0.25rem' }}>
                  <MapPin size={13} />
                  <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Base</span>
                </div>
                <div style={{ fontSize: '13.5px', fontWeight: 500, color: '#F5F5F7' }}>Hyderabad, India</div>
              </div>
            </div>
          </div>

          {/* Stage Photo Column */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '4/3',
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55)'
            }}
          >
            <BrandedImage
              src="/assets/gallery/gallery-03.jpg"
              alt="StarX Live Stage Performance"
              aspectRatio="4/3"
              objectFit="cover"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutView;
