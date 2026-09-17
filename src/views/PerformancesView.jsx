import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, ExternalLink } from 'lucide-react';
import { siteData, DEMO_PERFORMANCE_URL } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';

/**
 * PerformancesView Component
 * Dedicated "/performances" page view.
 *
 * Rules (Sections 34-45):
 * - Navbar top spacing: clear clearance, heading never covered by sticky navbar.
 * - Heading: "BEST PERFORMANCES", mobile clamp(28px, 6vw, 36px), line-height: 1.02.
 * - Featured Card Structure:
 *   16:9 media area -> small label: CONCERT HIGHLIGHT -> title: LIVE STAGE PERFORMANCE
 *   -> location: Hyderabad Stage -> Watch Performance button in normal document flow.
 * - Single clean Watch action: no duplicate buttons, no text/CTA overlap.
 * - Mobile card width: calc(100% - 32px), max-width 560px, margin-inline auto, border-radius 20px.
 * - Section gap: 28px to 40px, card internal padding 18px to 22px.
 */
export const PerformancesView = ({ onBackHome }) => {
  const { performances } = siteData;

  const handleOpenPerformance = () => {
    if (DEMO_PERFORMANCE_URL) {
      window.open(DEMO_PERFORMANCE_URL, '_blank', 'noopener,noreferrer');
    }
  };

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
      <div className="container" style={{ maxWidth: '1080px', margin: '0 auto' }}>
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
            gap: '0.4rem',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>

        {/* View Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <div className="label-accent" style={{ marginBottom: '0.65rem', fontSize: '12px' }}>
            <span className="label-accent-dot" />
            CONCERT RECORDINGS & CLIPS
          </div>

          <h1
            className="editorial-heading"
            style={{
              fontSize: 'clamp(28px, 6vw, 38px)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
              color: '#F5F5F7',
              lineHeight: 1.05,
              margin: '0 0 0.65rem 0'
            }}
          >
            BEST PERFORMANCES
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(13.5px, 1.1vw, 15px)',
              color: '#A1A1A6',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            High-powered live concert captures, guitar solos, and arena anthems in Telugu and Hindi.
          </p>
        </div>

        {/* Featured Video Showcase Card (Sections 37-40) */}
        <div
          className="featured-performance-card"
          style={{
            backgroundColor: 'rgba(14, 14, 18, 0.76)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.55)'
          }}
        >
          {/* 16:9 Media Area */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
            <BrandedImage
              src="/assets/gallery/gallery-03.jpg"
              alt="StarX Live Stage Performance"
              aspectRatio="16/9"
              objectFit="cover"
              priority={true}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 55%, rgba(14, 14, 18, 0.95) 100%)',
                pointerEvents: 'none'
              }}
            />
          </div>

          {/* Clean Content Area Underneath Media in Normal Flow (Sections 38-40) */}
          <div
            style={{
              padding: 'clamp(1.25rem, 3vw, 1.85rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#B3131B',
                  textTransform: 'uppercase'
                }}
              >
                CONCERT HIGHLIGHT
              </span>

              <span style={{ fontSize: '11.5px', color: '#8E8E93', letterSpacing: '0.05em' }}>
                HYDERABAD STAGE ARENA
              </span>
            </div>

            <h2
              style={{
                fontFamily: "var(--font-editorial)",
                fontSize: 'clamp(20px, 3.2vw, 28px)',
                fontWeight: 650,
                letterSpacing: '-0.015em',
                color: '#F5F5F7',
                margin: 0,
                lineHeight: 1.2
              }}
            >
              LIVE STAGE PERFORMANCE
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '13.5px',
                color: '#A1A1A6',
                lineHeight: 1.55,
                margin: '0.25rem 0 0 0',
                maxWidth: '650px'
              }}
            >
              Mastered stage capture showcasing the live sound, percussion dynamics, and crowd energy of StarX Live.
            </p>

            {/* Single Primary Watch Action (Sections 39-40: Normal Flow, No Collision) */}
            <div style={{ marginTop: '14px' }}>
              <button
                type="button"
                id="featured-watch-youtube-btn"
                onClick={handleOpenPerformance}
                className="btn btn-primary performance-cta-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '13px 22px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(179, 19, 27, 0.95)',
                  color: '#FFFFFF',
                  fontSize: '14px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  boxShadow: '0 10px 28px rgba(179, 19, 27, 0.35)',
                  transition: 'transform 0.2s ease, background-color 0.2s ease'
                }}
              >
                <Play size={15} fill="#FFFFFF" />
                <span>Watch Performance on YouTube</span>
                <ExternalLink size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Other Sets Grid (Sections 41-45) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2rem)'
          }}
        >
          {performances.map((perf) => (
            <div
              key={perf.id}
              className="performance-grid-card"
              style={{
                backgroundColor: 'rgba(14, 14, 18, 0.68)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '18px',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 14px 32px rgba(0, 0, 0, 0.4)',
                transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.boxShadow = '0 14px 32px rgba(0, 0, 0, 0.4)';
              }}
            >
              {/* 16:9 Thumbnail Area */}
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                <BrandedImage
                  src={perf.thumbnail}
                  alt={perf.title}
                  aspectRatio="16/9"
                  objectFit="cover"
                />
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(180deg, transparent 50%, rgba(14, 14, 18, 0.9) 100%)',
                    pointerEvents: 'none'
                  }}
                />
              </div>

              {/* Card Information & Single Watch Action */}
              <div
                style={{
                  padding: '1.25rem',
                  display: 'flex',
                  flexDirection: 'column',
                  flex: 1,
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '10.5px',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      color: '#B3131B',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.25rem'
                    }}
                  >
                    CONCERT HIGHLIGHT
                  </span>

                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '16px',
                      fontWeight: 650,
                      letterSpacing: '-0.015em',
                      color: '#F5F5F7',
                      margin: '0 0 0.35rem 0',
                      lineHeight: 1.25
                    }}
                  >
                    {perf.title}
                  </h3>

                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '12.5px',
                      color: '#8E8E93',
                      margin: '0 0 1rem 0'
                    }}
                  >
                    {perf.venue} • {perf.location}
                  </p>
                </div>

                {/* Single clean Watch action */}
                <button
                  type="button"
                  onClick={handleOpenPerformance}
                  className="btn btn-glass"
                  style={{
                    width: '100%',
                    height: '38px',
                    borderRadius: '10px',
                    fontSize: '12.5px',
                    fontWeight: 500,
                    gap: '0.5rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Play size={13} fill="#B3131B" color="#B3131B" />
                  <span>Watch Performance</span>
                  <ExternalLink size={12} style={{ color: '#8E8E93' }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 580px) {
          .featured-performance-card {
            width: calc(100% - 24px) !important;
            max-width: 540px !important;
            margin-inline: auto !important;
          }
          .performance-grid-card {
            width: calc(100% - 24px) !important;
            max-width: 540px !important;
            margin-inline: auto !important;
          }
          .performance-cta-btn {
            width: 100% !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </motion.div>
  );
};

export default PerformancesView;
