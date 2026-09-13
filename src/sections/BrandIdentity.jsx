import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { CreditCard, Eye } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../components/ScrollReveal';

/**
 * BrandIdentity Section (Section 14 & 15)
 * "THE STARX IDENTITY."
 * Dedicated showcase for 3 authentic StarX promotional artworks:
 * - starx-banner.png
 * - starx-post.png
 * - starx-long-banner.png
 * Slow scale (0.94 -> 1), depth (-80px -> 0), and opacity (0.45 -> 1) during scroll.
 * No childish floating cards. Subtle visiting card preview option.
 */
export const BrandIdentity = ({ onOpenPhoto }) => {
  const { brandArtwork, brand } = siteData;

  const handleArtworkClick = (item, index) => {
    if (onOpenPhoto) {
      onOpenPhoto(
        brandArtwork.map((art) => ({
          id: art.id,
          image: art.image,
          title: art.title,
          subtitle: art.subtitle
        })),
        index
      );
    }
  };

  const handleVisitingCardClick = () => {
    if (onOpenPhoto) {
      onOpenPhoto(
        [
          {
            id: 'visiting-card',
            image: brand.visitingCard,
            title: 'StarX Live Official Visiting Card',
            subtitle: 'BAND MANAGEMENT & DIRECT BOOKINGS'
          }
        ],
        0
      );
    }
  };

  return (
    <section
      id="identity"
      style={{
        backgroundColor: 'transparent',
        padding: '12rem 2rem 10rem 2rem',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px' }}>
        {/* Section Header */}
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
            BRAND SHOWCASE
          </div>

          <ScrollRevealHeading
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              fontWeight: 750,
              letterSpacing: '-0.04em',
              color: '#F5F5F7',
              margin: '0 0 0.85rem 0'
            }}
          >
            THE STARX IDENTITY.
          </ScrollRevealHeading>

          <ScrollRevealParagraph
            style={{
              fontFamily: "var(--font-body)",
              fontSize: '1.2rem',
              color: '#A1A1A6',
              letterSpacing: '-0.015em',
              margin: 0
            }}
          >
            Official promotional banners, social artwork, and concert identity.
          </ScrollRevealParagraph>
        </div>

        {/* Artwork Panels Grid (2-3 pieces per Section 14) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem',
            marginBottom: '4rem'
          }}
        >
          {brandArtwork.map((art, idx) => {
            // First panel: 7 columns, Second panel: 5 columns, Third: 12 columns wide
            let colSpan = 'span 6';
            let aspect = art.aspectRatio || '16/9';
            if (idx === 0) {
              colSpan = 'span 7';
            } else if (idx === 1) {
              colSpan = 'span 5';
              aspect = '1/1';
            } else if (idx === 2) {
              colSpan = 'span 12';
              aspect = '21/9';
            }

            return (
              <ArtworkPanel
                key={art.id}
                item={art}
                index={idx}
                colSpan={colSpan}
                aspectRatio={aspect}
                onClick={() => handleArtworkClick(art, idx)}
              />
            );
          })}
        </div>

        {/* Subtle Visiting Card Button / Pill (Section 15: subtle, near contact/brand showcase) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <button
            onClick={handleVisitingCardClick}
            className="btn btn-glass"
            style={{
              gap: '0.6rem',
              fontSize: '0.85rem',
              letterSpacing: '0.04em',
              padding: '12px 24px'
            }}
          >
            <CreditCard size={16} color="#B3131B" />
            <span>View Official Visiting Card</span>
            <Eye size={14} color="#737378" />
          </button>
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .artwork-panel-card {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
};

/**
 * ArtworkPanel Component (Section 14)
 * Slow scale, depth, and opacity scroll reveals without childish tilting.
 */
const ArtworkPanel = ({ item, colSpan, aspectRatio, onClick }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 92%', 'start 52%']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const z = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.45, 1]);

  return (
    <motion.div
      ref={cardRef}
      onClick={onClick}
      style={{
        position: 'relative',
        gridColumn: colSpan,
        perspective: '1400px',
        transformStyle: 'preserve-3d',
        cursor: 'pointer'
      }}
      className="artwork-panel-card"
    >
      <motion.div
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#0D0D0F',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.65)',
          scale,
          z,
          opacity,
          transformPerspective: 1400,
          willChange: 'transform, opacity'
        }}
        whileHover={{ y: -4, scale: 1.01 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio }}>
          <BrandedImage
            src={item.image}
            alt={item.title}
            aspectRatio={aspectRatio}
            objectFit="cover"
            objectPosition="center center"
            fallbackTitle={item.title}
            fallbackSubtitle={item.subtitle}
          />

          {/* Dark gradient overlay for typography readability */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, transparent 55%, rgba(5, 5, 5, 0.85) 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Bottom Smoked-Glass Label */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: '1.75rem 2rem',
              zIndex: 2
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
                marginBottom: '0.25rem'
              }}
            >
              {item.subtitle}
            </span>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: '1.35rem',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#F5F5F7',
                margin: 0
              }}
            >
              {item.title}
            </h3>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default BrandIdentity;
