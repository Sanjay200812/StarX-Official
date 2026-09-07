import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play } from 'lucide-react';

/**
 * VideoModal Component
 * Smoked-glass video player modal dialog with 28px blur and 28px corners.
 */
export const VideoModal = ({ isOpen, onClose, video }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
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
  }, [isOpen, onClose]);

  if (!isOpen || !video) return null;

  const isYouTube =
    video.videoType === 'youtube' ||
    (video.videoUrl && (video.videoUrl.includes('youtube') || video.videoUrl.includes('youtu.be')));

  // Normalize YouTube URL for embed
  let embedUrl = video.videoUrl || '';
  if (isYouTube && embedUrl) {
    if (embedUrl.includes('watch?v=')) {
      embedUrl = embedUrl.replace('watch?v=', 'embed/');
    } else if (embedUrl.includes('youtu.be/')) {
      embedUrl = embedUrl.replace('youtu.be/', 'www.youtube.com/embed/');
    }
  }

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
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          zIndex: 99999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0, y: 24 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.96, opacity: 0, y: 24 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '960px',
            backgroundColor: 'rgba(15, 15, 17, 0.90)',
            backdropFilter: 'blur(28px) saturate(120%)',
            WebkitBackdropFilter: 'blur(28px) saturate(120%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '28px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            overflow: 'hidden'
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '1.25rem 1.75rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.02)'
            }}
          >
            <div>
              <span
                style={{
                  display: 'inline-block',
                  color: '#C1121F',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontFamily: "'Geist', 'Inter', sans-serif"
                }}
              >
                STARX LIVE STAGE
              </span>
              <h3
                style={{
                  fontFamily: "'Geist', 'Inter', sans-serif",
                  fontSize: '1.25rem',
                  fontWeight: 700,
                  color: '#F5F5F7',
                  margin: '0.2rem 0 0 0',
                  letterSpacing: '-0.025em'
                }}
              >
                {video.title || 'Live Performance'}
              </h3>
            </div>

            <button
              onClick={onClose}
              aria-label="Close video"
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5F5F7',
                cursor: 'pointer',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Video Player Area */}
          <div
            style={{
              position: 'relative',
              width: '100%',
              paddingTop: '56.25%', // 16:9 Aspect Ratio
              background: '#000000'
            }}
          >
            {embedUrl ? (
              isYouTube ? (
                <iframe
                  src={`${embedUrl}?autoplay=1&rel=0`}
                  title={video.title || 'StarX Live Performance'}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    border: 'none'
                  }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <video
                  src={video.videoUrl}
                  controls
                  autoPlay
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              )
            ) : (
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#737378',
                  padding: '2rem',
                  textAlign: 'center'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#F5F5F7',
                    marginBottom: '1rem'
                  }}
                >
                  <Play size={24} />
                </div>
                <h4 style={{ color: '#F5F5F7', fontSize: '1.15rem', fontWeight: 600, marginBottom: '0.4rem' }}>
                  Performance Coming Soon
                </h4>
                <p style={{ fontSize: '0.9rem', maxWidth: '420px', margin: 0 }}>
                  High-definition concert video capture is being edited and will be published here shortly.
                </p>
              </div>
            )}
          </div>

          {/* Description Footer */}
          {video.description && (
            <div
              style={{
                padding: '1.25rem 1.75rem',
                background: 'rgba(0, 0, 0, 0.4)',
                borderTop: '1px solid rgba(255, 255, 255, 0.06)'
              }}
            >
              <p style={{ color: '#A1A1A6', fontSize: '0.9rem', margin: 0, lineHeight: 1.55 }}>
                {video.description}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default VideoModal;
