import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, ExternalLink } from 'lucide-react';
import { siteData, DEMO_PERFORMANCE_URL } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';

/**
 * PerformancesView Component
 * Dedicated "/performances" page view.
 * Heading: "BEST PERFORMANCES"
 * Shows performance previews with direct link to DEMO_PERFORMANCE_URL.
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
        padding: 'clamp(5rem, 8vw, 7rem) 1.5rem clamp(4rem, 6vw, 6rem) 1.5rem',
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
            CONCERT RECORDINGS & CLIPS
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
            BEST PERFORMANCES
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
            High-powered live concert captures, guitar solos, and arena anthems in Telugu and Hindi.
          </p>
        </div>

        {/* Featured Video Showcase */}
        <div
          style={{
            backgroundColor: 'rgba(14, 14, 18, 0.72)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            overflow: 'hidden',
            marginBottom: '3rem',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
            <BrandedImage
              src="/assets/gallery/gallery-03.jpg"
              alt="StarX Live Stage Performance"
              aspectRatio="16/9"
              objectFit="cover"
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 40%, rgba(5,5,8,0.7) 70%, rgba(5,5,8,0.94) 100%)',
                pointerEvents: 'none'
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <button
                type="button"
                onClick={handleOpenPerformance}
                style={{
                  padding: '12px 24px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(179, 19, 27, 0.90)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  color: '#FFFFFF',
                  fontSize: '13.5px',
                  fontWeight: 600,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  cursor: 'pointer',
                  boxShadow: '0 12px 32px rgba(179, 19, 27, 0.4)',
                  transition: 'all 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#C91620';
                  e.currentTarget.style.transform = 'scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(179, 19, 27, 0.90)';
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Play size={16} fill="#FFFFFF" />
                <span>Watch Performance on YouTube</span>
                <ExternalLink size={14} />
              </button>
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 'clamp(1.25rem, 3vw, 2rem)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-end',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '11px',
                    fontWeight: 600,
                    letterSpacing: '0.1em',
                    color: '#B3131B',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.25rem'
                  }}
                >
                  FEATURED ARENA SET
                </span>
                <h2
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 'clamp(20px, 2.6vw, 26px)',
                    fontWeight: 650,
                    color: '#F5F5F7',
                    margin: 0
                  }}
                >
                  StarX Live Stage Concert
                </h2>
              </div>

              <span style={{ fontSize: '12px', color: '#8E8E93', letterSpacing: '0.04em' }}>
                HYDERABAD STAGE ARENA
              </span>
            </div>
          </div>
        </div>

        {/* Other Sets Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {performances.map((perf) => (
            <div
              key={perf.id}
              onClick={handleOpenPerformance}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenPerformance();
                }
              }}
              style={{
                backgroundColor: 'rgba(14, 14, 18, 0.65)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.45)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
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
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'rgba(0, 0, 0, 0.25)'
                  }}
                >
                  <div
                    style={{
                      padding: '8px 16px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(15, 15, 18, 0.85)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#F5F5F7',
                      fontSize: '11.5px',
                      fontWeight: 500,
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem'
                    }}
                  >
                    <Play size={12} fill="#F5F5F7" />
                    <span>Watch Performance</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.25rem' }}>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '10.5px',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#B3131B',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.2rem'
                  }}
                >
                  CONCERT HIGHLIGHT
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '16.5px',
                    fontWeight: 650,
                    letterSpacing: '-0.015em',
                    color: '#F5F5F7',
                    margin: '0 0 0.35rem 0'
                  }}
                >
                  {perf.title}
                </h3>
                <p style={{ fontFamily: "var(--font-body)", fontSize: '13px', color: '#8E8E93', margin: 0 }}>
                  {perf.venue}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default PerformancesView;
