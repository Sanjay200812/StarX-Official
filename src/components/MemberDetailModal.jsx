import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram } from 'lucide-react';
import BrandedImage from './BrandedImage';

/**
 * MemberDetailModal Component
 * Glassy premium modal dialog (Section 27 & 28):
 * Overlay: rgba(0, 0, 0, 0.72) with blur(10px).
 * Modal: rgba(18, 18, 20, 0.88) with blur(28px), border-radius 30px.
 * Smooth 0.7s entrance: opacity 0 -> 1, translateY 24px -> 0, scale 0.96 -> 1.
 */
export const MemberDetailModal = ({ isOpen, onClose, member }) => {
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

  if (!isOpen || !member) return null;

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
          backgroundColor: 'rgba(0, 0, 0, 0.72)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          zIndex: 99998,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem'
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 24 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '860px',
            backgroundColor: 'rgba(18, 18, 20, 0.88)',
            backdropFilter: 'blur(28px) saturate(115%)',
            WebkitBackdropFilter: 'blur(28px) saturate(115%)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '28px',
            boxShadow: '0 30px 80px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
            overflow: 'hidden'
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#F5F5F7',
              cursor: 'pointer',
              zIndex: 10,
              transition: 'all 0.25s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.06)';
            }}
          >
            <X size={18} />
          </button>

          {/* Dialog Split Content */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              alignItems: 'stretch'
            }}
            className="member-modal-grid"
          >
            {/* Left: Artist Photo Canvas */}
            <div
              style={{
                position: 'relative',
                width: '100%',
                backgroundColor: '#0D0D0F',
                minHeight: '340px'
              }}
            >
              <BrandedImage
                src={member.image}
                alt={`${member.name} - ${member.role}`}
                aspectRatio="3/4"
                fallbackTitle={member.name}
                fallbackSubtitle={member.role}
                variant="member"
              />
            </div>

            {/* Right: Artist Details */}
            <div
              style={{
                padding: '3rem 2.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.8rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#C1121F',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.4rem'
                  }}
                >
                  {member.role}
                </span>

                <h3
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '2.3rem',
                    fontWeight: 750,
                    letterSpacing: '-0.035em',
                    color: '#F5F5F7',
                    margin: '0 0 1.5rem 0',
                    lineHeight: 1.15
                  }}
                >
                  {member.name}
                </h3>

                <span
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    color: '#737378',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.6rem'
                  }}
                >
                  ABOUT
                </span>

                {/* 4-5 line biography */}
                <p
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.98rem',
                    color: '#A1A1A6',
                    lineHeight: 1.68,
                    margin: 0
                  }}
                >
                  {member.bio}
                </p>
              </div>

              {/* Bottom Row: Instagram Link if available */}
              <div
                style={{
                  marginTop: '2.5rem',
                  paddingTop: '1.25rem',
                  borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.8rem',
                    color: '#737378',
                    fontWeight: 500
                  }}
                >
                  StarX Live Artist
                </span>

                {member.instagram && (
                  <a
                    href={member.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: "'Geist', 'Inter', sans-serif",
                      fontSize: '0.85rem',
                      fontWeight: 500,
                      color: '#F5F5F7',
                      textDecoration: 'none',
                      transition: 'color 0.25s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#C1121F')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                  >
                    <Instagram size={16} />
                    <span>Instagram</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        </motion.div>

        <style>{`
          @media (min-width: 768px) {
            .member-modal-grid {
              grid-template-columns: 45% 55% !important;
            }
          }
        `}</style>
      </motion.div>
    </AnimatePresence>
  );
};

export default MemberDetailModal;
