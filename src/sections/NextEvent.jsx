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
      className="section-standard"
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        perspective: '1400px'
      }}
    >
      <div className="container">
        {/* Header Label & Title */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#B3131B',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#B3131B'
              }}
            />
            UPCOMING SHOWCASE
          </div>

          <ScrollRevealHeading
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(26px, 2.8vw, 40px)',
              fontWeight: 750,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              color: '#F5F5F7',
              margin: 0
            }}
          >
            NEXT PERFORMANCE
          </ScrollRevealHeading>
        </div>

        {nextEvent ? (
          <div style={{ position: 'relative', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
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

              {/* Bottom-Left Smoked-Glass Information Overlay */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: '1.75rem',
                  left: '1.75rem',
                  maxWidth: '480px',
                  width: 'calc(100% - 3.5rem)',
                  backgroundColor: 'rgba(15, 15, 17, 0.48)',
                  backdropFilter: 'blur(18px)',
                  WebkitBackdropFilter: 'blur(18px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  boxShadow:
                    '0 20px 50px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  borderRadius: '20px',
                  padding: '1.85rem',
                  opacity: glassOpacity,
                  y: glassY,
                  zIndex: 10
                }}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: "var(--font-body)",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#B3131B',
                    textTransform: 'uppercase',
                    marginBottom: '0.4rem'
                  }}
                >
                  {nextEvent.title || 'NEXT PERFORMANCE'}
                </span>

                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 'clamp(20px, 2.2vw, 26px)',
                    fontWeight: 750,
                    letterSpacing: '-0.025em',
                    color: '#F5F5F7',
                    margin: '0 0 0.65rem 0',
                    lineHeight: 1.15
                  }}
                >
                  {nextEvent.eventName || 'COMING SOON'}
                </h3>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 'clamp(14px, 1vw, 15.5px)',
                    color: '#A1A1A6',
                    lineHeight: 1.55,
                    margin: '0 0 1.25rem 0'
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
                        <MapPin size={15} color="#B3131B" />
                        <span>
                          {nextEvent.venue}, {nextEvent.location}
                        </span>
                      </div>
                    )}

                    {nextEvent.date && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Calendar size={15} color="#B3131B" />
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
                fontFamily: "var(--font-heading)",
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
