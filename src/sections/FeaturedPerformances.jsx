import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../components/ScrollReveal';

/**
 * FeaturedPerformances Section
 * One large featured video on #050505 that expands on scroll (scale 0.92 -> 1, border-radius 30px -> 22px, opacity 0.6 -> 1)
 * with smoked-glass information overlay and sleek controls.
 */
export const FeaturedPerformances = ({ onPlayVideo }) => {
  const { performances } = siteData;
  const mainPerf = performances[0];
  const secondaryPerfs = performances.slice(1);

  const featuredRef = useRef(null);

  // Featured video expansion on scroll: scale 0.92 -> 1, border-radius 30px -> 22px
  const { scrollYProgress: videoProgress } = useScroll({
    target: featuredRef,
    offset: ['start 90%', 'center center']
  });

  const videoScale = useTransform(videoProgress, [0, 1], [0.92, 1]);
  const videoRadius = useTransform(videoProgress, [0, 1], ['30px', '22px']);
  const videoOpacity = useTransform(videoProgress, [0, 0.8], [0.6, 1]);

  return (
    <section
      id="performances"
      style={{
        backgroundColor: '#050505',
        padding: '12rem 2rem 10rem 2rem',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px' }}>
        {/* Section Header with Depth Reveal */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '5.5rem'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#C1121F',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#C1121F'
              }}
            />
            LIVE CONCERTS
          </div>

          <ScrollRevealHeading
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              fontWeight: 750,
              letterSpacing: '-0.04em',
              color: '#F5F5F7',
              margin: '0 0 0.85rem 0'
            }}
          >
            LIVE PERFORMANCES.
          </ScrollRevealHeading>

          <ScrollRevealParagraph
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: '1.2rem',
              color: '#A1A1A6',
              letterSpacing: '-0.015em',
              margin: 0
            }}
          >
            Raw sound. Real energy. Captured live on stage.
          </ScrollRevealParagraph>
        </div>

        {/* 1. Large Main Featured Performance (16:9 Canvas) */}
        {mainPerf && (
          <div ref={featuredRef} style={{ position: 'relative', marginBottom: '5rem' }}>
            <motion.div
              onClick={() => {
                if (mainPerf.videoUrl) {
                  onPlayVideo(mainPerf);
                }
              }}
              style={{
                position: 'relative',
                width: '100%',
                borderRadius: videoRadius,
                overflow: 'hidden',
                backgroundColor: '#0D0D0F',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.75)',
                cursor: mainPerf.videoUrl ? 'pointer' : 'default',
                scale: videoScale,
                opacity: videoOpacity,
                willChange: 'transform, opacity, border-radius'
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
                      'linear-gradient(180deg, transparent 40%, rgba(5,5,5,0.85) 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Center Indicator (Section 13) */}
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
                      padding: '12px 24px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(20, 20, 24, 0.85)',
                      backdropFilter: 'blur(16px)',
                      WebkitBackdropFilter: 'blur(16px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      color: '#F5F5F7',
                      boxShadow: '0 16px 40px rgba(0,0,0,0.5)',
                      fontSize: '0.85rem',
                      fontWeight: 600,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase'
                    }}
                  >
                    <Play size={16} fill="#F5F5F7" />
                    <span>{mainPerf.videoUrl ? 'Watch Live' : 'Video Coming Soon'}</span>
                  </div>
                </div>

                {/* Bottom Smoked-Glass Metadata & Button */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '2.5rem 3rem',
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: '1.5rem',
                    zIndex: 2
                  }}
                >
                  <div>
                    <span
                      style={{
                        fontFamily: "'Geist', 'Inter', sans-serif",
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        letterSpacing: '0.08em',
                        color: '#C1121F',
                        textTransform: 'uppercase'
                      }}
                    >
                      LIVE PERFORMANCE
                    </span>
                    <h3
                      style={{
                        fontFamily: "'Geist', 'Inter', sans-serif",
                        fontSize: 'clamp(1.8rem, 3.5vw, 2.6rem)',
                        fontWeight: 750,
                        letterSpacing: '-0.03em',
                        color: '#F5F5F7',
                        margin: '0.3rem 0 0.4rem 0'
                      }}
                    >
                      {mainPerf.title}
                    </h3>
                    <span style={{ fontSize: '0.95rem', color: '#A1A1A6' }}>
                      {mainPerf.venue || 'Performance video coming soon.'}
                    </span>
                  </div>

                  <button
                    className={mainPerf.videoUrl ? 'btn btn-primary' : 'btn btn-glass'}
                    style={{
                      height: '44px',
                      padding: '0 24px',
                      fontSize: '13.5px',
                      opacity: mainPerf.videoUrl ? 1 : 0.8,
                      cursor: mainPerf.videoUrl ? 'pointer' : 'default'
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (mainPerf.videoUrl) {
                        onPlayVideo(mainPerf);
                      }
                    }}
                  >
                    <Play size={15} fill={mainPerf.videoUrl ? '#050505' : '#F5F5F7'} />
                    {mainPerf.videoUrl ? 'Watch Video' : 'VIDEO COMING SOON'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {/* 2. Secondary Performances Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {secondaryPerfs.map((perf) => (
            <div
              key={perf.id}
              onClick={() => {
                if (perf.videoUrl) {
                  onPlayVideo(perf);
                }
              }}
              style={{
                backgroundColor: '#0D0D0F',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '22px',
                overflow: 'hidden',
                cursor: perf.videoUrl ? 'pointer' : 'default',
                transition: 'all 0.35s cubic-bezier(0.22, 1, 0.36, 1)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.06)';
                e.currentTarget.style.boxShadow = 'none';
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
                      padding: '8px 16px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(20, 20, 24, 0.8)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                      color: '#F5F5F7',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.04em'
                    }}
                  >
                    <Play size={13} fill="#F5F5F7" />
                    <span>{perf.videoUrl ? 'Play' : 'COMING SOON'}</span>
                  </div>
                </div>
              </div>

              <div style={{ padding: '1.75rem' }}>
                <span
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#C1121F',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.35rem'
                  }}
                >
                  LIVE PERFORMANCE
                </span>
                <h4
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '1.25rem',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: '#F5F5F7',
                    margin: '0 0 0.4rem 0'
                  }}
                >
                  {perf.title}
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#A1A1A6', margin: 0 }}>
                  {perf.venue || 'Performance video coming soon.'}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPerformances;
