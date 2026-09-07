import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Music } from 'lucide-react';
import BrandedImage from './BrandedImage';

/**
 * ImageLightbox Component
 * Deep black fullscreen photo viewer with smoked-glass controls and Geist/Inter typography.
 */
export const ImageLightbox = ({
  isOpen,
  onClose,
  items = [],
  currentIndex = 0,
  onNavigate
}) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft')
        onNavigate((currentIndex - 1 + items.length) % items.length);
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, currentIndex, items.length, onNavigate]);

  if (!isOpen || !items.length) return null;

  const currentItem = items[currentIndex];

  const handlePrev = (e) => {
    e.stopPropagation();
    onNavigate((currentIndex - 1 + items.length) % items.length);
  };

  const handleNext = (e) => {
    e.stopPropagation();
    onNavigate((currentIndex + 1) % items.length);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.90)',
          backdropFilter: 'blur(24px) saturate(115%)',
          WebkitBackdropFilter: 'blur(24px) saturate(115%)',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1rem'
        }}
      >
        {/* Top Controls Bar */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.75rem 2.5rem',
            zIndex: 10
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 700,
                color: '#F5F5F7',
                letterSpacing: '0.06em',
                textTransform: 'uppercase'
              }}
            >
              STARX ARCHIVE
            </span>
            <span style={{ color: '#737378', fontSize: '0.85rem' }}>
              {currentIndex + 1} / {items.length}
            </span>
          </div>

          <button
            onClick={onClose}
            aria-label="Close Lightbox"
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F5F5F7',
              cursor: 'pointer',
              transition: 'background 0.35s ease, border-color 0.35s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Previous Button */}
        {items.length > 1 && (
          <button
            onClick={handlePrev}
            aria-label="Previous image"
            style={{
              position: 'absolute',
              left: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F5F5F7',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'background 0.35s ease, border-color 0.35s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            }}
          >
            <ChevronLeft size={22} />
          </button>
        )}

        {/* Main Image Container */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            maxWidth: '90vw',
            maxHeight: '75vh',
            borderRadius: '24px',
            overflow: 'hidden',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.7)',
            backgroundColor: '#0D0D0F'
          }}
        >
          <BrandedImage
            src={currentItem.image}
            alt={currentItem.title || 'StarX Live Stage'}
            aspectRatio="16/10"
            fallbackTitle={currentItem.title || 'STARX LIVE'}
            fallbackSubtitle={currentItem.subtitle || 'CONCERT MOMENT'}
            icon={Music}
            style={{ width: '840px', maxWidth: '88vw' }}
          />
        </motion.div>

        {/* Next Button */}
        {items.length > 1 && (
          <button
            onClick={handleNext}
            aria-label="Next image"
            style={{
              position: 'absolute',
              right: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.08)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              backdropFilter: 'blur(16px)',
              WebkitBackdropFilter: 'blur(16px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F5F5F7',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'background 0.35s ease, border-color 0.35s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.18)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
            }}
          >
            <ChevronRight size={22} />
          </button>
        )}

        {/* Bottom Caption Bar */}
        <div
          style={{
            position: 'absolute',
            bottom: '2rem',
            textAlign: 'center',
            color: '#F5F5F7'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <h4
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: '1.2rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              margin: 0
            }}
          >
            {currentItem.title}
          </h4>
          {currentItem.subtitle && (
            <p style={{ color: '#A1A1A6', fontSize: '0.85rem', marginTop: '0.3rem' }}>
              {currentItem.subtitle}
            </p>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ImageLightbox;
