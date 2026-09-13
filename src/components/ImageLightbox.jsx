import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Download } from 'lucide-react';

/**
 * ImageLightbox Component
 * Fullscreen photo viewer (Requirements 13, 14, 15, 16, 17, 23):
 * - Background: rgba(0,0,0,0.92)
 * - Image: Full original asset, NO cropping, object-fit: contain, max-width: 90vw, max-height: 85vh (mobile: calc(100vw - 24px), max-height: 75vh)
 * - Download Button: Minimal glass pill button (height 46px, 999px radius, blur 12px)
 * - Clean sanitized generated download file names (e.g., StarX-Live-01.jpg)
 * - 44px+ touch targets for mobile accessibility
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
      if (e.key === 'ArrowRight' && items.length > 1)
        onNavigate((currentIndex + 1) % items.length);
      if (e.key === 'ArrowLeft' && items.length > 1)
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

  const currentItem = items && items.length > 0 ? items[currentIndex] || items[0] : null;

  const handlePrev = (e) => {
    e.stopPropagation();
    if (items && items.length > 1) {
      onNavigate((currentIndex - 1 + items.length) % items.length);
    }
  };

  const handleNext = (e) => {
    e.stopPropagation();
    if (items && items.length > 1) {
      onNavigate((currentIndex + 1) % items.length);
    }
  };

  // Requirement 24: Download original image with designated filenames
  const getDownloadFileName = (item, index) => {
    if (!item) return `StarX-Live-${String(index + 1).padStart(2, '0')}.png`;
    if (item.downloadFileName) return item.downloadFileName;
    const rawTitle = item.title || '';
    if (rawTitle.toLowerCase().includes('banner')) return 'StarX-Live-Banner.png';
    if (rawTitle.toLowerCase().includes('stage')) return 'StarX-Stage.jpg';
    if (rawTitle.toLowerCase().includes('member')) return 'StarX-Members.jpg';
    const sanitized = rawTitle
      .replace(/[^a-zA-Z0-9]/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    return sanitized ? `StarX-${sanitized}.jpg` : `StarX-Live-${String(index + 1).padStart(2, '0')}.jpg`;
  };

  const downloadFileName = currentItem ? getDownloadFileName(currentItem, currentIndex) : 'StarX-Live-Banner.png';

  const handleDownload = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!currentItem || !currentItem.image) return;

    try {
      const response = await fetch(currentItem.image);
      if (!response.ok) throw new Error('Fetch failed');
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = downloadFileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
    } catch (err) {
      const link = document.createElement('a');
      link.href = currentItem.image;
      link.download = downloadFileName;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && items && items.length > 0 && currentItem && (
        <motion.div
          key="image-lightbox-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.92)',
            backdropFilter: 'blur(20px) saturate(110%)',
            WebkitBackdropFilter: 'blur(20px) saturate(110%)',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem',
            userSelect: 'none'
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
              padding: '1.25rem 1.5rem',
              zIndex: 20
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Left: Indicator (Hide counter if only 1 item) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: '#F5F5F7',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase'
                }}
              >
                STARX ARCHIVE
              </span>
              {items.length > 1 && (
                <span style={{ color: '#737378', fontSize: '0.82rem' }}>
                  {currentIndex + 1} / {items.length}
                </span>
              )}
            </div>

            {/* Right: Download + Close Buttons (Requirements 18, 19, 20) */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              {/* Glass DOWNLOAD Button */}
              <button
                type="button"
                onClick={handleDownload}
                aria-label={`Download image ${downloadFileName}`}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  color: '#FFFFFF',
                  borderRadius: '999px',
                  height: '46px',
                  minWidth: '46px',
                  padding: '0 18px',
                  fontFamily: "var(--font-body)",
                  fontSize: '13px',
                  fontWeight: 500,
                  letterSpacing: '-0.01em',
                  textDecoration: 'none',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s ease',
                  boxShadow: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <Download size={17} />
                <span className="download-btn-text">Download</span>
              </button>

              {/* Close Button (44px+ touch target) */}
              <button
                onClick={onClose}
                aria-label="Close Lightbox"
                style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.10)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#F5F5F7',
                  cursor: 'pointer',
                  transition: 'background-color 0.25s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Previous Button */}
          {items.length > 1 && (
            <button
              onClick={handlePrev}
              aria-label="Previous image"
              style={{
                position: 'absolute',
                left: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5F5F7',
                cursor: 'pointer',
                zIndex: 20,
                transition: 'background-color 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {/* Center Image (Requirements 13 & 23: object-fit contain, no cropping, full original image) */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              maxWidth: '90vw',
              maxHeight: '85vh',
              position: 'relative'
            }}
            className="lightbox-image-stage"
          >
            <img
              src={currentItem.image}
              alt={currentItem.title || 'StarX Live'}
              className="lightbox-fitted-image"
              style={{
                maxWidth: '90vw',
                maxHeight: '82vh',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                borderRadius: '16px',
                boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8)',
                display: 'block'
              }}
            />
          </motion.div>

          {/* Next Button */}
          {items.length > 1 && (
            <button
              onClick={handleNext}
              aria-label="Next image"
              style={{
                position: 'absolute',
                right: '1.5rem',
                top: '50%',
                transform: 'translateY(-50%)',
                width: '46px',
                height: '46px',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.10)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5F5F7',
                cursor: 'pointer',
                zIndex: 20,
                transition: 'background-color 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.14)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.08)';
              }}
            >
              <ChevronRight size={22} />
            </button>
          )}

          {/* Bottom Caption Bar */}
          <div
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              right: '1.5rem',
              textAlign: 'center',
              color: '#F5F5F7',
              pointerEvents: 'none'
            }}
          >
            <h4
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                margin: 0
              }}
            >
              {currentItem.title}
            </h4>
            {currentItem.subtitle && (
              <p
                style={{
                  color: '#A1A1A6',
                  fontSize: '0.82rem',
                  marginTop: '0.25rem',
                  marginBottom: 0
                }}
              >
                {currentItem.subtitle}
              </p>
            )}
          </div>

          <style>{`
            @media (max-width: 768px) {
              .lightbox-fitted-image {
                max-width: calc(100vw - 24px) !important;
                max-height: 75vh !important;
                border-radius: 12px !important;
              }
              .download-btn-text {
                display: none;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
