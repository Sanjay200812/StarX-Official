import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import { ScrollRevealHeading } from '../components/ScrollReveal';

/**
 * MediaGallery Section (Section 30)
 * Premium dark editorial photography portfolio on #090909 with 26px radius,
 * subtle smoked-glass captions, and clean text filter tabs.
 */
export const MediaGallery = ({ onOpenPhoto, onPlayVideo }) => {
  const { gallery } = siteData;
  const [filter, setFilter] = useState('all');

  const filteredItems = gallery.filter((item) => {
    if (filter === 'photos') return item.type === 'photo';
    if (filter === 'videos') return item.type === 'video';
    return true;
  });

  const handleCardClick = (item) => {
    if (item.type === 'video') {
      onPlayVideo(item);
    } else {
      const photos = gallery.filter((g) => g.type === 'photo');
      const idx = photos.findIndex((p) => p.id === item.id);
      onOpenPhoto(photos, idx >= 0 ? idx : 0);
    }
  };

  return (
    <section
      id="media"
      style={{
        backgroundColor: '#090909',
        padding: '12rem 2rem 10rem 2rem',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px' }}>
        {/* Header & Minimal Text Filter Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: '2rem',
            marginBottom: '5rem'
          }}
        >
          <div>
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
              VISUAL ARCHIVE
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
              STARX IN ACTION.
            </ScrollRevealHeading>
          </div>

          {/* Simple Text Tabs with Red Underline */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {['all', 'photos', 'videos'].map((f) => {
              const isActive = filter === f;
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.88rem',
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: isActive ? '#FFFFFF' : '#737378',
                    position: 'relative',
                    paddingBottom: '0.5rem',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    transition: 'color 0.25s ease'
                  }}
                >
                  {f}
                  {isActive && (
                    <motion.span
                      layoutId="activeFilterUnderline"
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: '2px',
                        backgroundColor: '#C1121F',
                        borderRadius: '2px'
                      }}
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Mixed-Composition Grid (Section 7: 1 large, 2 medium, 1 wide, 2 smaller) */}
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(12, 1fr)',
            gap: '2.5rem'
          }}
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => {
              let colSpan = 'span 6';
              let aspectRatio = '4/3';

              if (idx === 0) {
                // 1. One large landscape image
                colSpan = 'span 12';
                aspectRatio = '16/9';
              } else if (idx === 1 || idx === 2) {
                // 2 & 3. Two medium images
                colSpan = 'span 6';
                aspectRatio = '4/3';
              } else if (idx === 3) {
                // 4. One wide image
                colSpan = 'span 12';
                aspectRatio = '21/9';
              } else if (idx === 4 || idx === 5) {
                // 5 & 6. Two smaller images
                colSpan = 'span 6';
                aspectRatio = '4/3';
              }

              return (
                <EditorialCard
                  key={item.id}
                  item={item}
                  colSpan={colSpan}
                  aspectRatio={aspectRatio}
                  onClick={() => handleCardClick(item)}
                />
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .editorial-media-card {
            grid-column: span 12 !important;
          }
        }
      `}</style>
    </section>
  );
};

/**
 * EditorialCard Component (Section 7 & 8)
 * Scale: 0.94 -> 1, translateZ: -80px -> 0, opacity: 0.4 -> 1
 * border-radius: 24px (20-28px), no 3D tilting.
 */
const EditorialCard = ({ item, colSpan, aspectRatio, onClick }) => {
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 92%', 'start 55%']
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const z = useTransform(scrollYProgress, [0, 1], [-80, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [0.4, 1]);

  const isVideo = item.type === 'video';

  return (
    <motion.div
      ref={cardRef}
      layout
      onClick={onClick}
      style={{
        position: 'relative',
        gridColumn: colSpan,
        perspective: '1400px',
        transformStyle: 'preserve-3d',
        cursor: 'pointer'
      }}
      className="editorial-media-card"
    >
      <motion.div
        style={{
          position: 'relative',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#0D0D0F',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55)',
          scale,
          z,
          opacity,
          transformPerspective: 1400,
          willChange: 'transform, opacity'
        }}
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      >
        <div style={{ position: 'relative', width: '100%', aspectRatio, overflow: 'hidden' }}>
          <motion.div
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: '100%', height: '100%' }}
          >
            <BrandedImage
              src={item.image}
              alt={item.title || 'StarX Live stage performance'}
              aspectRatio={aspectRatio}
              objectFit="cover"
              objectPosition="center 30%"
              fallbackTitle={item.title}
              fallbackSubtitle={item.subtitle}
            />
          </motion.div>

          {/* Dark gradient overlay */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'linear-gradient(180deg, transparent 50%, rgba(5, 5, 5, 0.85) 100%)',
              pointerEvents: 'none'
            }}
          />

          {/* Play Badge if Video */}
          {isVideo && (
            <div
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                backgroundColor: 'rgba(20, 20, 24, 0.75)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5F5F7',
                boxShadow: '0 4px 15px rgba(0,0,0,0.4)'
              }}
            >
              <Play size={18} fill="#F5F5F7" style={{ marginLeft: '2px' }} />
            </div>
          )}

          {/* Bottom Smoked-Glass Caption Overlay */}
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
            <h4
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: '1.35rem',
                fontWeight: 700,
                letterSpacing: '-0.025em',
                color: '#F5F5F7',
                margin: '0 0 0.25rem 0'
              }}
            >
              {item.title}
            </h4>
            <span style={{ fontSize: '0.85rem', color: '#A1A1A6' }}>
              {item.subtitle}
            </span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MediaGallery;
