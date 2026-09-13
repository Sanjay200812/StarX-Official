import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Eye, Download } from 'lucide-react';
import BrandedImage from '../components/BrandedImage';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../components/ScrollReveal';

/**
 * MediaGallery Section
 * "STARX IN ACTION"
 * Standard In-Page 2-Card Grid.
 *
 * Requirements:
 * - Single section: STARX IN ACTION
 * - Normal in-page layout (no sticky, no 1-by-1 scroll scene)
 * - 2 images side-by-side on desktop (StarX Stage, StarX Members)
 * - Mobile: 1 image per row
 * - Card max-width: ~520px each
 * - Image ratio: 16:10 (height ~320px–380px)
 * - Same visual design, radius, typography (Title 18–22px, Subtitle 13–14px)
 * - Hover: image scale 1.02, card translateY -3px
 * - Lightbox with original file download (StarX-Stage.jpg, StarX-Members.jpg)
 */
export const MediaGallery = ({ onOpenPhoto }) => {
  const [isMobile, setIsMobile] = useState(false);

  // Exact 2 featured media items requested (no duplicate / repeated stage images)
  const mediaItems = [
    {
      id: 'gal-stage',
      title: 'StarX Stage',
      subtitle: 'Live Stage Setup • Hyderabad',
      image: '/assets/gallery/gallery-01.jpg',
      alt: 'StarX Stage - Live Stage Setup Hyderabad',
      objectPosition: '55% 45%',
      downloadFileName: 'StarX-Stage.jpg'
    },
    {
      id: 'gal-members',
      title: 'StarX Members',
      subtitle: 'StarX Live Band',
      image: '/assets/gallery/gallery-05.jpg',
      alt: 'StarX Members - StarX Live Band',
      objectPosition: 'center 32%',
      downloadFileName: 'StarX-Members.jpg'
    }
  ];

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < 768);
    checkScreen();
    window.addEventListener('resize', checkScreen);
    return () => window.removeEventListener('resize', checkScreen);
  }, []);

  const handleCardClick = (index) => {
    if (onOpenPhoto) {
      onOpenPhoto(mediaItems, index);
    }
  };

  return (
    <section
      id="media"
      className="section-standard"
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      <style>{`
        .media-grid-container {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 520px));
          gap: 2rem;
          justify-content: center;
          margin: 0 auto;
        }

        @media (max-width: 820px) {
          .media-grid-container {
            grid-template-columns: minmax(0, 520px);
            gap: 1.75rem;
          }
        }

        .media-card-item {
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .media-card-item:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 40px rgba(0, 0, 0, 0.45);
        }

        .media-image-zoom {
          transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .media-card-item:hover .media-image-zoom {
          transform: scale(1.02);
        }
      `}</style>

      {/* Top Header */}
      <div
        className="container"
        style={{
          textAlign: 'center',
          marginBottom: isMobile ? '2.5rem' : '3.5rem'
        }}
      >
        <div className="label-accent" style={{ marginBottom: '0.75rem' }}>
          <span className="label-accent-dot" />
          VISUAL ARCHIVE
        </div>

        <ScrollRevealHeading
          className="section-title"
          style={{ margin: '0 0 0.65rem 0' }}
        >
          STARX IN ACTION
        </ScrollRevealHeading>

        <ScrollRevealParagraph
          className="section-subtitle"
          style={{ maxWidth: '520px', margin: '0 auto' }}
        >
          Moments from live stages and sound checks across Hyderabad.
        </ScrollRevealParagraph>
      </div>

      {/* 2-Card In-Page Media Grid */}
      <div className="container">
        <div className="media-grid-container">
          {mediaItems.map((item, index) => (
            <motion.div
              key={item.id}
              className="media-card-item"
              initial={{ opacity: 0, y: 22, scale: 0.99 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                duration: 0.75,
                delay: index * 0.12,
                ease: [0.22, 1, 0.36, 1]
              }}
              onClick={() => handleCardClick(index)}
              style={{
                backgroundColor: 'rgba(14, 14, 16, 0.44)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.06)',
                borderRadius: '18px',
                overflow: 'hidden',
                cursor: 'pointer',
                width: '100%',
                maxWidth: '520px',
                justifySelf: 'center',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)'
              }}
            >
              {/* Image Container (Ratio 16:10, cover) */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 10',
                  overflow: 'hidden',
                  backgroundColor: '#0D0D10'
                }}
              >
                <div className="media-image-zoom" style={{ width: '100%', height: '100%' }}>
                  <BrandedImage
                    src={item.image}
                    alt={item.alt || item.title}
                    aspectRatio="16/10"
                    objectFit="cover"
                    objectPosition={item.objectPosition}
                    fallbackTitle={item.title}
                    fallbackSubtitle={item.subtitle}
                    style={{ width: '100%', height: '100%' }}
                  />
                </div>

                {/* Subtle bottom gradient */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(180deg, transparent 55%, rgba(5, 5, 5, 0.82) 100%)',
                    pointerEvents: 'none'
                  }}
                />

                {/* Minimal Top-Right Action Controls (View & Download) */}
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    zIndex: 10
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => handleCardClick(index)}
                    aria-label="View fullscreen"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      height: '32px',
                      padding: '0 12px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(15, 15, 18, 0.85)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.12)',
                      color: '#F5F5F7',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.16)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(15, 15, 18, 0.85)')}
                  >
                    <Eye size={12} />
                    <span>View</span>
                  </button>

                  <a
                    href={item.image}
                    download={item.downloadFileName || 'StarX.jpg'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Download ${item.downloadFileName}`}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      height: '32px',
                      padding: '0 12px',
                      borderRadius: '999px',
                      backgroundColor: 'rgba(255, 255, 255, 0.10)',
                      backdropFilter: 'blur(12px)',
                      WebkitBackdropFilter: 'blur(12px)',
                      border: '1px solid rgba(255, 255, 255, 0.14)',
                      color: '#FFFFFF',
                      fontSize: '11.5px',
                      fontWeight: 600,
                      textDecoration: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.18)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.10)')}
                  >
                    <Download size={12} />
                    <span>Download</span>
                  </a>
                </div>

                {/* Bottom Overlay Info (Title: 18px-22px, Subtitle: 13px-14px) */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1rem 1.25rem',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.15rem'
                  }}
                >
                  <h4
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: 'clamp(18px, 1.8vw, 21px)',
                      fontWeight: 700,
                      letterSpacing: '-0.025em',
                      color: '#F5F5F7',
                      margin: 0,
                      lineHeight: 1.2
                    }}
                  >
                    {item.title}
                  </h4>
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '13px',
                      fontWeight: 400,
                      color: '#A1A1A6',
                      letterSpacing: '-0.01em'
                    }}
                  >
                    {item.subtitle}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MediaGallery;
