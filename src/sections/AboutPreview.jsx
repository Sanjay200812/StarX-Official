import React from 'react';
import { ArrowRight, Music } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';

/**
 * AboutPreview Section (Home)
 * Short, clean editorial preview of StarX.
 * Uses confirmed safe copy only, with "Learn more →" linking to /about.
 */
export const AboutPreview = ({ onNavigate }) => {
  const { brand, about } = siteData;

  const handleLearnMore = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('about', 'view');
    }
  };

  return (
    <section
      id="about-preview"
      className="section-standard"
      style={{
        backgroundColor: 'transparent',
        padding: 'clamp(3.5rem, 5.5vw, 5rem) 1.5rem',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '1080px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'clamp(2rem, 4vw, 3.5rem)',
            alignItems: 'center',
            backgroundColor: 'rgba(14, 14, 18, 0.65)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '20px',
            padding: 'clamp(1.75rem, 3.5vw, 2.75rem)',
            boxShadow: '0 20px 48px rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* Left: Stage Visual */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              aspectRatio: '16/11',
              borderRadius: '14px',
              overflow: 'hidden',
              boxShadow: '0 16px 36px rgba(0, 0, 0, 0.5)'
            }}
          >
            <BrandedImage
              src={about.image || '/assets/gallery/gallery-03.jpg'}
              alt={about.imageAlt || 'StarX Live stage performance'}
              aspectRatio="16/11"
              objectFit="cover"
            />
          </div>

          {/* Right: Short Narrative */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="label-accent" style={{ fontSize: '11.5px', marginBottom: '0.2rem' }}>
              <span className="label-accent-dot" />
              ABOUT STARX
            </div>

            <h2
              className="editorial-heading"
              style={{
                fontSize: 'clamp(26px, 3.2vw, 36px)',
                fontWeight: 600,
                letterSpacing: '-0.015em',
                color: '#F5F5F7',
                lineHeight: 1.15,
                margin: 0
              }}
            >
              Lost in the Noise. Found in the Sound.
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 'clamp(14px, 1.05vw, 15px)',
                color: '#A1A1A6',
                lineHeight: 1.65,
                margin: 0
              }}
            >
              StarX Live is a Hyderabad-based live rock band performing Classic, Rock and Western music in Telugu and Hindi. The band focuses on live musicianship, energetic performances and recreating familiar music for live audiences.
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                fontSize: '12px',
                fontWeight: 500,
                color: '#8E8E93',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                paddingTop: '0.5rem'
              }}
            >
              <Music size={13} style={{ color: '#B3131B' }} />
              <span>{brand.genresDisplay}</span>
              <span>•</span>
              <span style={{ color: '#B3131B', fontWeight: 600 }}>{brand.languagesDisplay}</span>
            </div>

            <div style={{ paddingTop: '0.75rem' }}>
              <a
                href="/about"
                onClick={handleLearnMore}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#F5F5F7',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(179, 19, 27, 0.8)',
                  paddingBottom: '2px',
                  transition: 'color 0.2s ease, border-color 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#B3131B';
                  e.currentTarget.style.borderColor = '#FFFFFF';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#F5F5F7';
                  e.currentTarget.style.borderColor = 'rgba(179, 19, 27, 0.8)';
                }}
              >
                <span>Learn more</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreview;
