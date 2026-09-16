import React from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { siteData, DEMO_PERFORMANCE_URL } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';

/**
 * FeaturedPerformances Section (Home)
 * "BEST PERFORMANCE"
 *
 * Requirements:
 * - Renamed to "BEST PERFORMANCE"
 * - Compact featured section: ONE main 16:9 preview
 * - Title and brief description
 * - "Watch Performance →" opens DEMO_PERFORMANCE_URL in new tab
 * - Link "All performances →" navigates to /performances
 */
export const FeaturedPerformances = ({ onNavigate }) => {
  const { performances } = siteData;
  const mainPerf = performances[0] || {
    title: "LIVE STAGE PERFORMANCE",
    venue: "Hyderabad Stage Arena",
    thumbnail: "/assets/gallery/gallery-03.jpg"
  };

  const handleWatchPerformance = () => {
    if (DEMO_PERFORMANCE_URL) {
      window.open(DEMO_PERFORMANCE_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const handleViewAllPerformances = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('performances', 'view');
    }
  };

  return (
    <section
      id="best-performance"
      className="section-standard"
      style={{
        backgroundColor: 'transparent',
        padding: 'clamp(3.5rem, 5.5vw, 5rem) 1.5rem',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '920px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="label-accent" style={{ marginBottom: '0.65rem', fontSize: '12px' }}>
            <span className="label-accent-dot" />
            LIVE STAGE RECORDING
          </div>

          <h2
            className="editorial-heading"
            style={{
              fontSize: 'clamp(28px, 3.4vw, 38px)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
              lineHeight: 1.12,
              color: '#F5F5F7',
              margin: '0 0 0.5rem 0'
            }}
          >
            BEST PERFORMANCE
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(13.5px, 1.05vw, 15px)',
              color: '#A1A1A6',
              letterSpacing: '-0.01em',
              margin: 0,
              lineHeight: 1.6
            }}
          >
            Concert capture showcasing live band energy, vocal arrangements, and guitar riffs.
          </p>
        </div>

        {/* ONE Main 16:9 Featured Performance Preview */}
        <div
          onClick={handleWatchPerformance}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleWatchPerformance();
            }
          }}
          style={{
            position: 'relative',
            width: '100%',
            borderRadius: '18px',
            overflow: 'hidden',
            backgroundColor: '#0D0D0F',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55)',
            cursor: 'pointer',
            transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-3px)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
            e.currentTarget.style.boxShadow = '0 24px 60px rgba(0, 0, 0, 0.65)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
            e.currentTarget.style.boxShadow = '0 20px 50px rgba(0, 0, 0, 0.55)';
          }}
        >
          <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
            <BrandedImage
              src={mainPerf.thumbnail || '/assets/gallery/gallery-03.jpg'}
              alt={mainPerf.title || 'StarX Live Stage Performance'}
              aspectRatio="16/9"
              objectFit="cover"
              objectPosition="center 30%"
            />

            {/* Dark gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 40%, rgba(5,5,8,0.7) 70%, rgba(5,5,8,0.92) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Center Play Button Overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none'
              }}
            >
              <div
                style={{
                  padding: '10px 22px',
                  borderRadius: '999px',
                  backgroundColor: 'rgba(15, 15, 18, 0.85)',
                  backdropFilter: 'blur(14px)',
                  WebkitBackdropFilter: 'blur(14px)',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: '#F5F5F7',
                  fontSize: '13px',
                  fontWeight: 500,
                  boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)'
                }}
              >
                <Play size={14} fill="#F5F5F7" />
                <span>Watch Performance</span>
              </div>
            </div>

            {/* Bottom Overlay Info */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                display: 'flex',
                alignItems: 'flex-end',
                justifyContent: 'space-between',
                gap: '1rem',
                flexWrap: 'wrap'
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
                    marginBottom: '0.2rem'
                  }}
                >
                  CONCERT HIGHLIGHT
                </span>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 'clamp(18px, 2.4vw, 24px)',
                    fontWeight: 650,
                    letterSpacing: '-0.02em',
                    color: '#F5F5F7',
                    margin: '0 0 0.25rem 0',
                    lineHeight: 1.2
                  }}
                >
                  {mainPerf.title}
                </h3>
                <span style={{ fontFamily: "var(--font-body)", fontSize: '13px', color: '#A1A1A6' }}>
                  {mainPerf.venue || 'Concert capture in Hyderabad'}
                </span>
              </div>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#F5F5F7',
                  fontSize: '13px',
                  fontWeight: 600
                }}
              >
                <span>Watch Performance</span>
                <ArrowRight size={13} style={{ color: '#B3131B' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Link to Full Performances Page */}
        <div style={{ textAlign: 'center', marginTop: '1.75rem' }}>
          <a
            href="/performances"
            onClick={handleViewAllPerformances}
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
            <span>View all performances</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPerformances;
