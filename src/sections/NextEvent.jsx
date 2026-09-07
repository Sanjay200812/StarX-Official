import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Calendar, Clock, ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import { ScrollRevealHeading } from '../components/ScrollReveal';

/**
 * NextEvent Section (Section 22 & 23)
 * Premium large event presentation on #090909.
 * Image expands on scroll: scale 0.92 -> 1, translateZ -80px -> 0, border-radius 30px -> 22px.
 * Bottom-left smoked-glass overlay panel reveals slightly after image begins (opacity 0 -> 1, translateY 35px -> 0).
 */
export const NextEvent = () => {
  const { nextEvent } = siteData;
  const sectionRef = useRef(null);

  // Scroll scrubbing for image & glass panel reveal
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 90%', 'center center']
  });

  // Image expansion: scale 0.92 -> 1, translateZ -80px -> 0, border-radius 30px -> 22px
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const imageZ = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const imageRadius = useTransform(scrollYProgress, [0, 1], ['30px', '22px']);

  // Glass info reveals slightly AFTER the image begins (Section 23)
  const glassOpacity = useTransform(scrollYProgress, [0.25, 0.9], [0, 1]);
  const glassY = useTransform(scrollYProgress, [0.25, 0.9], [35, 0]);

  const scrollToContact = () => {
    const el = document.querySelector('#contact');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="next-event"
      ref={sectionRef}
      style={{
        position: 'relative',
        backgroundColor: '#090909',
        padding: '12rem 2rem 10rem 2rem',
        overflow: 'hidden',
        perspective: '1400px'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px' }}>
        {/* Header Label & Title */}
        <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
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
            UPCOMING SHOWCASE
          </div>

          <ScrollRevealHeading
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              fontWeight: 750,
              letterSpacing: '-0.04em',
              color: '#F5F5F7',
              margin: 0
            }}
          >
            NEXT PERFORMANCE.
          </ScrollRevealHeading>
        </div>

        {nextEvent ? (
          <div style={{ position: 'relative', width: '100%', maxWidth: '1160px', margin: '0 auto' }}>
            {/* Expanding Product Showcase Visual */}
            <motion.div
              style={{
                width: '100%',
                scale: imageScale,
                z: imageZ,
                borderRadius: imageRadius,
                overflow: 'hidden',
                backgroundColor: '#0D0D0F',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.75)',
                transformPerspective: 1400,
                willChange: 'transform, border-radius',
                position: 'relative'
              }}
            >
              <BrandedImage
                src={nextEvent.image}
                alt="StarX Live concert performance"
                aspectRatio="16/9"
                objectFit="cover"
                objectPosition="center 30%"
                fallbackTitle={nextEvent.title}
                fallbackSubtitle={nextEvent.eventName}
              />

              {/* Ambient dark gradient overlay to ensure glass panel contrast */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background:
                    'linear-gradient(180deg, transparent 35%, rgba(5,5,5,0.85) 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Bottom-Left Smoked-Glass Information Overlay (Section 10 & 22) */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '2rem',
                  left: '2rem',
                  maxWidth: '520px',
                  width: 'calc(100% - 4rem)',
                  backgroundColor: 'rgba(16, 16, 18, 0.82)',
                  backdropFilter: 'blur(22px) saturate(120%)',
                  WebkitBackdropFilter: 'blur(22px) saturate(120%)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow:
                    '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
                  borderRadius: '24px',
                  padding: '2.25rem',
                  opacity: glassOpacity,
                  y: glassY,
                  zIndex: 10
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#C1121F',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem'
                  }}
                >
                  {nextEvent.title || 'NEXT PERFORMANCE'}
                </span>

                <h3
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: 'clamp(1.8rem, 3.2vw, 2.5rem)',
                    fontWeight: 750,
                    letterSpacing: '-0.03em',
                    color: '#F5F5F7',
                    margin: '0 0 0.85rem 0',
                    lineHeight: 1.15
                  }}
                >
                  {nextEvent.eventName || 'COMING SOON'}
                </h3>

                <p
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '1rem',
                    color: '#A1A1A6',
                    lineHeight: 1.55,
                    margin: '0 0 1.5rem 0'
                  }}
                >
                  {nextEvent.description || 'Follow StarX for updates.'}
                </p>

                {/* If venue/date provided later, display them cleanly */}
                {(nextEvent.venue || nextEvent.date) && (
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '1.25rem',
                      marginBottom: '1.5rem',
                      fontSize: '0.9rem',
                      color: '#A1A1A6'
                    }}
                  >
                    {nextEvent.venue && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <MapPin size={15} color="#C1121F" />
                        <span>
                          {nextEvent.venue}, {nextEvent.location}
                        </span>
                      </div>
                    )}

                    {nextEvent.date && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={15} color="#C1121F" />
                        <span>{nextEvent.date}</span>
                      </div>
                    )}
                  </div>
                )}

                {/* Contact StarX Button inside Glass Overlay */}
                <button
                  onClick={scrollToContact}
                  className="btn btn-primary"
                  style={{
                    height: '44px',
                    padding: '0 22px',
                    fontSize: '13px',
                    gap: '0.5rem'
                  }}
                >
                  <span>{nextEvent.ctaText || 'Contact StarX'}</span>
                  <ArrowRight size={15} />
                </button>
              </motion.div>
            </motion.div>
          </div>
        ) : (
          <div
            style={{
              padding: '5rem 2rem',
              textAlign: 'center',
              backgroundColor: '#0D0D0F',
              borderRadius: '26px',
              border: '1px solid rgba(255, 255, 255, 0.08)'
            }}
          >
            <h3
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: '1.8rem',
                fontWeight: 700,
                color: '#F5F5F7',
                margin: '0 0 0.5rem 0'
              }}
            >
              Next Performance Coming Soon
            </h3>
            <p style={{ color: '#A1A1A6', margin: 0 }}>
              Follow StarX on social media for upcoming concert dates and stage announcements.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default NextEvent;
