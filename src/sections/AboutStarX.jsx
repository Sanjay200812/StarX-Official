import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../components/ScrollReveal';

/**
 * AboutStarX Section (Section 9, 21, 22)
 * Black background, generous whitespace, clean editorial split layout.
 * Left: "WE ARE STARX." with visible 3D perspective depth reveal + narrative & specs.
 * Right: Large real StarX stage performance photograph (gallery-02.jpg) with smooth scroll reveal.
 */
export const AboutStarX = () => {
  const { about } = siteData;
  const sectionRef = useRef(null);
  const imageRef = useRef(null);

  // Image scroll reveal (scale 0.93 -> 1, translateZ -80px -> 0, opacity 0.5 -> 1)
  const { scrollYProgress: imageProgress } = useScroll({
    target: imageRef,
    offset: ['start 92%', 'start 52%']
  });

  const imageScale = useTransform(imageProgress, [0, 1], [0.93, 1]);
  const imageZ = useTransform(imageProgress, [0, 1], [-80, 0]);
  const imageOpacity = useTransform(imageProgress, [0, 0.75], [0.5, 1]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-standard"
      style={{
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '3.5rem',
          alignItems: 'center'
        }}
        id="about-container-grid"
      >
        {/* Left Side: Label, 3D Title, Narrative & Specs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
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
                marginBottom: '1rem'
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
              ABOUT US
            </div>

            <ScrollRevealHeading
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 'clamp(34px, 3.8vw, 50px)',
                fontWeight: 750,
                letterSpacing: '-0.03em',
                lineHeight: 1.08,
                color: '#F5F5F7',
                margin: 0
              }}
            >
              WE ARE STARX
            </ScrollRevealHeading>
          </div>

          <ScrollRevealParagraph
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(15px, 1.1vw, 17px)',
              fontWeight: 400,
              color: '#A1A1A6',
              lineHeight: 1.6,
              margin: 0,
              letterSpacing: '-0.015em'
            }}
          >
            {about.description}
          </ScrollRevealParagraph>

          {/* Thin Hairline Divider */}
          <div
            style={{
              height: '1px',
              backgroundColor: 'rgba(255, 255, 255, 0.08)',
              width: '100%'
            }}
          />

          {/* Metadata Specs */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
              gap: '2rem'
            }}
          >
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: "var(--font-body)",
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#737378',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem'
                }}
              >
                GENRES
              </span>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#F5F5F7',
                  letterSpacing: '-0.015em'
                }}
              >
                {about.genresText}
              </span>
            </div>

            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: "var(--font-body)",
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#737378',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem'
                }}
              >
                LANGUAGES
              </span>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#B3131B',
                  letterSpacing: '-0.015em'
                }}
              >
                {about.languagesText}
              </span>
            </div>

            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: "var(--font-body)",
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#737378',
                  textTransform: 'uppercase',
                  marginBottom: '0.4rem'
                }}
              >
                BASE LOCATION
              </span>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: '1rem',
                  fontWeight: 600,
                  color: '#F5F5F7',
                  letterSpacing: '-0.015em'
                }}
              >
                {about.locationText}
              </span>
            </div>
          </div>
        </div>

        {/* Right Side: Real StarX Live Stage Photo (Section 9 & 22) */}
        <div
          ref={imageRef}
          style={{
            position: 'relative',
            perspective: '1400px',
            transformStyle: 'preserve-3d',
            maxWidth: '520px',
            width: '100%',
            margin: '0 auto'
          }}
        >
          <motion.div
            style={{
              position: 'relative',
              borderRadius: '20px',
              overflow: 'hidden',
              backgroundColor: '#0D0D0F',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.55)',
              border: '1px solid rgba(255, 255, 255, 0.07)',
              scale: imageScale,
              z: imageZ,
              opacity: imageOpacity,
              transformPerspective: 1400,
              willChange: 'transform, opacity'
            }}
          >
            <BrandedImage
              src={about.image}
              alt="StarX Live stage performance"
              aspectRatio="4/3"
              objectFit="cover"
              objectPosition="center 30%"
              fallbackTitle="STARX LIVE"
              fallbackSubtitle="STAGE PERFORMANCE • HYDERABAD"
            />

            {/* Subtle bottom gradient overlay */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, transparent 65%, rgba(5, 5, 5, 0.8) 100%)',
                pointerEvents: 'none'
              }}
            />

            {/* Stage Tag Overlay */}
            <div
              style={{
                position: 'absolute',
                bottom: '1.5rem',
                left: '1.75rem',
                zIndex: 2
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: '#F5F5F7',
                  textTransform: 'uppercase',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
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
                LIVE STAGE PERFORMANCE
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (min-width: 960px) {
          #about-container-grid {
            grid-template-columns: 50% 46% !important;
            gap: 4% !important;
          }
        }
      `}</style>
    </section>
  );
};

export default AboutStarX;
