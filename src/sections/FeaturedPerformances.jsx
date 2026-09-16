import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';

/**
 * FeaturedPerformances Section
 * "DEMO PERFORMANCES"
 *
 * Specifications:
 * - Bodoni Moda for "DEMO PERFORMANCES" (34px to 42px desktop, 26px to 30px mobile).
 * - Compact layout: one main featured performance + up to two smaller previews.
 * - Mobile: stack vertically.
 * - Stage photo thumbnails with clearly marked "Video coming soon" placeholders.
 * - No fake YouTube links.
 */
export const FeaturedPerformances = ({ onPlayVideo }) => {
  const { performances } = siteData;
  const mainPerf = performances[0];
  const secondaryPerfs = performances.slice(1, 3);

  const featuredRef = useRef(null);

  const { scrollYProgress: videoProgress } = useScroll({
    target: featuredRef,
    offset: ['start 92%', 'center center']
  });

  const videoScale = useTransform(videoProgress, [0, 1], [0.96, 1]);
  const videoOpacity = useTransform(videoProgress, [0, 0.8], [0.75, 1]);

  return (
    <section
      id="performances"
      className="section-standard"
      style={{
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Section Header: Bodoni Moda (34px-42px desktop, 26px-30px mobile) */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '3rem'
          }}
        >
          <div className="label-accent" style={{ marginBottom: '0.65rem', fontSize: '12px' }}>
            <span className="label-accent-dot" />
            LIVE STAGE ARCHIVE
          </div>

          <h2
            className="editorial-heading"
            style={{
              fontSize: 'clamp(26px, 3.2vw, 40px)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
              lineHeight: 1.12,
              color: '#F5F5F7',
              margin: '0 0 0.5rem 0'
            }}
          >
            DEMO PERFORMANCES
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
            Raw sound and concert energy captured live on stage. Video mastering in progress.
          </p>
        </div>

        {/* 1. Large Main Featured Performance */}
        {mainPerf && (
          <div ref={featuredRef} style={{ position: 'relative', maxWidth: '920px', margin: '0 auto 2.5rem auto' }}>
            <motion.div
              onClick={() => {
                if (mainPerf.videoUrl && onPlayVideo) {
                  onPlayVideo(mainPerf);
                }
              }}
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: '18px',
                overflow: 'hidden',
                backgroundColor: '#0D0D0F',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 24px 60px rgba(0, 0, 0, 0.65)',
                cursor: mainPerf.videoUrl ? 'pointer' : 'default',
                scale: videoScale,
                opacity: videoOpacity
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                <BrandedImage
                  src={mainPerf.thumbnail}
                  alt="StarX Live concert performance"
                  aspectRatio="16/9"
                  objectFit="cover"
                  objectPosition="center 30%"
                  fallbackTitle={mainPerf.title}
                  fallbackSubtitle={mainPerf.venue}
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

                {/* Center Coming Soon Indicator */}
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
                      padding: '10px 20px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(15, 15, 18, 0.82)',
                      backdropFilter: 'blur(14px)',
                      WebkitBackdropFilter: 'blur(14px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      color: '#F5F5F7',
                      fontSize: '12.5px',
                      fontWeight: 500,
                      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.5)'
                    }}
                  >
                    <Play size={13} fill="#F5F5F7" />
                    <span>{mainPerf.videoUrl ? 'Play preview' : 'Video coming soon'}</span>
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
                      LIVE PERFORMANCE
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

                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '11.5px',
                      fontWeight: 500,
                      color: '#8E8E93',
                      letterSpacing: '0.04em'
                    }}
                  >
                    MASTERING IN PROGRESS
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2. Secondary Previews Grid (up to two smaller previews) */}
        {secondaryPerfs.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))',
              gap: '1.5rem',
              maxWidth: '920px',
              margin: '0 auto'
            }}
          >
            {secondaryPerfs.map((perf) => (
              <div
                key={perf.id}
                style={{
                  backgroundColor: 'rgba(14, 14, 18, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  transition: 'transform 0.35s ease, border-color 0.35s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                  <BrandedImage
                    src={perf.thumbnail}
                    alt="StarX Live stage performance"
                    aspectRatio="16/9"
                    objectFit="cover"
                    objectPosition="center 30%"
                    fallbackTitle={perf.title}
                    fallbackSubtitle={perf.venue}
                  />
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
                        padding: '6px 14px',
                        borderRadius: '999px',
                        backgroundColor: 'rgba(15, 15, 18, 0.82)',
                        backdropFilter: 'blur(10px)',
                        WebkitBackdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        color: '#F5F5F7',
                        fontSize: '11px',
                        fontWeight: 500
                      }}
                    >
                      <Play size={11} fill="#F5F5F7" />
                      <span>{perf.videoUrl ? 'Play' : 'Demo soon'}</span>
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
                    LIVE SET
                  </span>
                  <h4
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '16px',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      color: '#F5F5F7',
                      margin: '0 0 0.25rem 0',
                      lineHeight: 1.25
                    }}
                  >
                    {perf.title}
                  </h4>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: '13px', color: '#8E8E93', margin: 0 }}>
                    {perf.venue || 'Concert capture'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPerformances;
