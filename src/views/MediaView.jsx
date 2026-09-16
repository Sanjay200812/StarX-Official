import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Download, Eye, Maximize2 } from 'lucide-react';
import BrandedImage from '../components/BrandedImage';

/**
 * MediaView Component
 * Dedicated "/media" page view.
 *
 * Specifications:
 * - Bodoni Moda for "LIVE IN ACTION" / "MEDIA ARCHIVE"
 * - High-res gallery photography with lightbox & download
 * - StarX official long banner / poster (fully viewable, uncropped, downloadable)
 * - Clean "Back to Home" navigation
 */
export const MediaView = ({ onBackHome, onOpenPhoto }) => {
  const mediaPhotos = [
    {
      id: 'gal-stage-1',
      title: 'StarX Stage Arena',
      subtitle: 'Live Concert Setup • Hyderabad',
      image: '/assets/gallery/gallery-01.jpg',
      alt: 'StarX Stage Arena - Live Concert Setup',
      downloadFileName: 'StarX-Stage-Arena.jpg'
    },
    {
      id: 'gal-stage-3',
      title: 'Live Concert Atmosphere',
      subtitle: 'Spotlight & Sound Energy',
      image: '/assets/gallery/gallery-03.jpg',
      alt: 'Live Concert Atmosphere',
      downloadFileName: 'StarX-Concert-Atmosphere.jpg'
    },
    {
      id: 'gal-members-5',
      title: 'StarX Members on Stage',
      subtitle: 'Band Ensemble Live',
      image: '/assets/gallery/gallery-05.jpg',
      alt: 'StarX Members on Stage',
      downloadFileName: 'StarX-Band-Live.jpg'
    },
    {
      id: 'gal-stage-6',
      title: 'Festival Stage Performance',
      subtitle: 'Telugu & Hindi Rock Set',
      image: '/assets/gallery/gallery-06.jpg',
      alt: 'Festival Stage Performance',
      downloadFileName: 'StarX-Festival-Set.jpg'
    }
  ];

  const handlePhotoClick = (index) => {
    if (onOpenPhoto) {
      onOpenPhoto(mediaPhotos, index);
    }
  };

  const handleOpenBanner = () => {
    if (onOpenPhoto) {
      onOpenPhoto(
        [
          {
            id: 'starx-long-banner',
            image: '/assets/brand/starx-long-banner.png',
            title: 'STARX LIVE',
            subtitle: 'Official Promotional Banner',
            downloadFileName: 'StarX-Live-Banner.png'
          }
        ],
        0
      );
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
      <div className="container" style={{ maxWidth: '1120px' }}>
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
            MEDIA ARCHIVE
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
            LIVE IN ACTION
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
            Concert captures, stage moments, and downloadable high-resolution StarX brand assets.
          </p>
        </div>

        {/* 1. Official Stage Photo Gallery */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginBottom: '4.5rem'
          }}
        >
          {mediaPhotos.map((item, index) => (
            <div
              key={item.id}
              onClick={() => handlePhotoClick(index)}
              style={{
                backgroundColor: 'rgba(14, 14, 18, 0.72)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
                <BrandedImage
                  src={item.image}
                  alt={item.alt}
                  aspectRatio="16/10"
                  objectFit="cover"
                />
                <div
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    padding: '6px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(10, 10, 12, 0.75)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: '#F5F5F7',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Eye size={13} />
                </div>
              </div>

              <div style={{ padding: '1.15rem' }}>
                <h4
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '16px',
                    fontWeight: 650,
                    letterSpacing: '-0.015em',
                    color: '#F5F5F7',
                    margin: '0 0 0.25rem 0',
                    lineHeight: 1.25
                  }}
                >
                  {item.title}
                </h4>
                <p style={{ fontFamily: "var(--font-body)", fontSize: '13px', color: '#8E8E93', margin: 0 }}>
                  {item.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* 2. StarX Official Promotional Poster / Banner (Spec 36) */}
        <div
          style={{
            backgroundColor: 'rgba(14, 14, 18, 0.68)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: 'clamp(1.5rem, 3vw, 2.5rem)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              paddingBottom: '1rem'
            }}
          >
            <div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#B3131B',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.25rem'
                }}
              >
                OFFICIAL PROMOTIONAL BANNER
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: 'clamp(18px, 2.2vw, 22px)',
                  fontWeight: 650,
                  color: '#F5F5F7',
                  margin: 0
                }}
              >
                StarX Live Band Panoramic Poster
              </h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <button
                onClick={handleOpenBanner}
                className="btn btn-glass"
                style={{ height: '38px', padding: '0 16px', fontSize: '12.5px' }}
              >
                <Maximize2 size={13} />
                <span>Full View</span>
              </button>

              <a
                href="/assets/brand/starx-long-banner.png"
                download="StarX-Live-Banner.png"
                className="btn btn-primary"
                style={{ height: '38px', padding: '0 18px', fontSize: '12.5px' }}
              >
                <Download size={13} />
                <span>Download</span>
              </a>
            </div>
          </div>

          {/* Full Uncropped Banner View */}
          <div
            onClick={handleOpenBanner}
            style={{
              position: 'relative',
              width: '100%',
              backgroundColor: '#08080A',
              borderRadius: '14px',
              overflow: 'hidden',
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '1rem'
            }}
          >
            <img
              src="/assets/brand/starx-long-banner.png"
              alt="StarX Live Official Long Banner"
              style={{
                width: '100%',
                height: 'auto',
                maxHeight: '65vh',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MediaView;
