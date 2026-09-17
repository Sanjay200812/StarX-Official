import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { artists } from '../data/artists';
import BrandedImage from '../components/BrandedImage';
import MemberDetailModal from '../components/MemberDetailModal';

/**
 * ArtistsView Component
 * Dedicated "/artists" page view.
 * Displays all 7 StarX live musicians in a clean, spacious layout.
 *
 * Rules:
 * - Preloads first-row visible images (priority={index < 4}).
 * - Safe top padding clearance from sticky navbar.
 * - Central modal opening coordination for mobile back gesture.
 */
export const ArtistsView = ({ onBackHome, onOpenModal }) => {
  const members = artists;
  const [localModalMember, setLocalModalMember] = useState(null);
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);

  const handleOpenModal = (member) => {
    if (onOpenModal) {
      onOpenModal(member);
    } else {
      setLocalModalMember(member);
      setIsLocalModalOpen(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: 'clamp(6.5rem, 10vw, 8.5rem) 1.25rem clamp(4rem, 6vw, 6rem) 1.25rem',
        minHeight: '85vh'
      }}
    >
      <div className="container" style={{ maxWidth: '1180px', margin: '0 auto' }}>
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
            gap: '0.4rem',
            cursor: 'pointer'
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>

        {/* View Header */}
        <div style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 3.5rem)' }}>
          <div className="label-accent" style={{ marginBottom: '0.65rem', fontSize: '12px' }}>
            <span className="label-accent-dot" />
            CORE LIVE LINEUP
          </div>

          <h1
            className="editorial-heading"
            style={{
              fontSize: 'clamp(28px, 6vw, 42px)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
              color: '#F5F5F7',
              lineHeight: 1.08,
              margin: '0 0 0.65rem 0'
            }}
          >
            MEET STARX
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(13.5px, 1.1vw, 15px)',
              color: '#A1A1A6',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Seven dedicated musicians driving the live rock arrangements, percussion grooves, and vocal melodies of StarX Live.
          </p>
        </div>

        {/* Artists Grid */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '1.5rem',
            maxWidth: '1180px',
            margin: '0 auto'
          }}
        >
          {members.map((member, index) => {
            const formattedNumber = `0${index + 1}`.slice(-2);

            return (
              <div
                key={member.id}
                id={`artist-card-${member.id}`}
                className="artist-card"
                onClick={() => handleOpenModal(member)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenModal(member);
                  }
                }}
                aria-label={`View profile for ${member.name} - ${member.role}`}
                style={{
                  flex: '0 0 260px',
                  maxWidth: '270px',
                  width: '100%',
                  aspectRatio: '4 / 5',
                  position: 'relative',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  backgroundColor: 'rgba(14, 14, 17, 0.75)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  boxShadow: '0 14px 32px rgba(0, 0, 0, 0.4)',
                  cursor: 'pointer',
                  transition:
                    'border-color 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease',
                  userSelect: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.18)';
                  e.currentTarget.style.transform = 'translateY(-3px)';
                  e.currentTarget.style.boxShadow = '0 20px 44px rgba(0, 0, 0, 0.55)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 14px 32px rgba(0, 0, 0, 0.4)';
                }}
              >
                {/* Photo Area */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    width: '100%',
                    height: '100%',
                    overflow: 'hidden'
                  }}
                >
                  <BrandedImage
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    aspectRatio="4/5"
                    fallbackTitle={member.name}
                    fallbackSubtitle={member.role}
                    variant="member"
                    objectFit="cover"
                    priority={index < 4}
                    style={{ width: '100%', height: '100%' }}
                  />

                  {/* Vignette Gradient */}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(180deg, transparent 40%, rgba(5, 5, 8, 0.65) 68%, rgba(5, 5, 8, 0.94) 100%)',
                      pointerEvents: 'none'
                    }}
                  />
                </div>

                {/* Bottom Content */}
                <div
                  style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '1.15rem',
                    zIndex: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end'
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: '#B3131B',
                      marginBottom: '0.2rem',
                      textTransform: 'uppercase'
                    }}
                  >
                    {formattedNumber}
                  </span>

                  <div
                    style={{
                      fontSize: 'clamp(18px, 4vw, 20px)',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      color: '#F5F5F7',
                      lineHeight: 1.2,
                      marginBottom: '0.25rem'
                    }}
                  >
                    {member.name}
                  </div>

                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '12.5px',
                      fontWeight: 400,
                      letterSpacing: '0.01em',
                      color: '#A1A1A6',
                      lineHeight: 1.35
                    }}
                  >
                    {member.role}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fallback local modal if onOpenModal is not passed */}
      {!onOpenModal && (
        <MemberDetailModal
          isOpen={isLocalModalOpen}
          onClose={() => setIsLocalModalOpen(false)}
          member={localModalMember}
        />
      )}
    </motion.div>
  );
};

export default ArtistsView;
