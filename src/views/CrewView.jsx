import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Instagram } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import MemberDetailModal from '../components/MemberDetailModal';

/**
 * CrewView Component
 * Dedicated "/crew" page view.
 * "BEHIND STARX"
 *
 * Specifications:
 * - Bodoni Moda for "BEHIND STARX"
 * - B. Josh (Manager & Event Organizer | Primary Contact)
 * - B. Sanjay (Digital Media & Creative Director)
 * - B. Balu (Producer)
 * - Real bios, Instagram links, and single-click modal.
 */
export const CrewView = ({ onBackHome, onOpenModal }) => {
  const { crew } = siteData;
  const [localModalMember, setLocalModalMember] = useState(null);
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);

  const handleOpenModal = (person) => {
    if (onOpenModal) {
      onOpenModal(person);
    } else {
      setLocalModalMember(person);
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
      <div className="container" style={{ maxWidth: '1080px' }}>
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
            ORGANIZATION & MANAGEMENT
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
            BEHIND STARX
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
            The dedicated management, creative direction, and production team driving every live performance.
          </p>
        </div>

        {/* Crew Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            justifyContent: 'center'
          }}
        >
          {crew.map((person) => (
            <div
              key={person.id}
              id={`crew-card-${person.id}`}
              className="crew-card"
              onClick={() => handleOpenModal(person)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleOpenModal(person);
                }
              }}
              style={{
                backgroundColor: 'rgba(14, 14, 17, 0.72)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.07)',
                borderRadius: '16px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.boxShadow = '0 20px 44px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Photo */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4/5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '1.15rem'
                }}
              >
                <BrandedImage
                  src={person.image}
                  alt={`${person.name} - ${person.role}`}
                  aspectRatio="4/5"
                  fallbackTitle={person.name}
                  fallbackSubtitle={person.role}
                  variant="member"
                  objectFit="cover"
                  priority={true}
                />
              </div>

              {/* Information */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '19px',
                    fontWeight: 650,
                    letterSpacing: '-0.015em',
                    color: '#F5F5F7',
                    margin: '0 0 0.35rem 0',
                    lineHeight: 1.25
                  }}
                >
                  {person.name}
                </h3>

                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '12.5px',
                    fontWeight: 500,
                    color: '#B3131B',
                    lineHeight: 1.35,
                    marginBottom: '0.85rem'
                  }}
                >
                  {person.role}
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '13px',
                    color: '#A1A1A6',
                    lineHeight: 1.6,
                    margin: '0 0 1rem 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {person.bio}
                </p>

                {person.instagramUrl && (
                  <div style={{ marginTop: 'auto', paddingTop: '0.75rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <a
                      href={person.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '12px',
                        color: '#737378',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#737378')}
                    >
                      <Instagram size={13} />
                      <span>{person.instagramLabel || '@starxliveband'}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fallback local modal if onOpenModal is not provided */}
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

export default CrewView;
