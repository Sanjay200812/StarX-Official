import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import MemberDetailModal from '../components/MemberDetailModal';

/**
 * BandMembers Section (Home)
 * "MEET STARX"
 *
 * Requirements:
 * - 7 confirmed artists:
 *     1. B. Prasad (Rhythm Pad)
 *     2. B. Joseph (Drum Kit)
 *     3. G. Perumalla Rao (Piano 1)
 *     4. N. Thirapatiyya (Lead Guitar)
 *     5. E. Chandra Mohan (Bass Guitar)
 *     6. K. Sudhakar (Singer)
 *     7. G. Vijay (Singer)
 * - Compact card width: 230px to 270px, image ratio 4:5
 * - Name: 17px to 20px, Role: 11px to 13px
 * - Single click opens artist modal directly
 * - Link "View artist profiles →" navigates to /artists
 */
export const BandMembers = ({ onNavigate, onOpenModal }) => {
  const { members } = siteData;
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

  const handleViewAllArtists = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('artists', 'view');
    }
  };

  return (
    <section
      id="artists-preview"
      className="section-standard"
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        padding: 'clamp(3.5rem, 5.5vw, 5rem) 1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Section Header */}
      <div
        className="container"
        style={{
          textAlign: 'center',
          marginBottom: '2.5rem'
        }}
      >
        <div className="label-accent" style={{ marginBottom: '0.65rem', fontSize: '12px' }}>
          <span className="label-accent-dot" />
          STARX MUSICIANS
        </div>

        <h2
          className="editorial-heading"
          style={{
            fontSize: 'clamp(28px, 3.4vw, 38px)',
            fontWeight: 600,
            letterSpacing: '-0.015em',
            color: '#F5F5F7',
            margin: '0 0 0.5rem 0',
            lineHeight: 1.12
          }}
        >
          MEET STARX
        </h2>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 'clamp(13.5px, 1.05vw, 15px)',
            fontWeight: 400,
            color: '#A1A1A6',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.6,
            letterSpacing: '-0.01em'
          }}
        >
          Real musicians. Real energy. The core lineup behind the live sound.
        </p>
      </div>

      {/* Clean Compact Card Grid */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '1.25rem',
          maxWidth: '1180px',
          margin: '0 auto 2rem auto',
          width: '100%'
        }}
      >
        {members.map((member, index) => {
          const formattedNumber = `0${index + 1}`.slice(-2);

          return (
            <div
              key={member.id}
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
                flex: '0 0 240px',
                maxWidth: '260px',
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
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.55)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 14px 32px rgba(0, 0, 0, 0.4)';
              }}
            >
              {/* Photo Area (4:5 ratio) */}
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
                  priority={index < 3}
                  style={{
                    width: '100%',
                    height: '100%'
                  }}
                />

                {/* Bottom Vignette Gradient */}
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

              {/* Bottom Card Content */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1rem',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '10.5px',
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
                    fontSize: 'clamp(17px, 3.5vw, 19px)',
                    fontWeight: 600,
                    letterSpacing: '-0.015em',
                    color: '#F5F5F7',
                    lineHeight: 1.2,
                    marginBottom: '0.2rem'
                  }}
                >
                  {member.name}
                </div>

                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '12px',
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

      {/* Link to Full Artists Page */}
      <div style={{ textAlign: 'center' }}>
        <a
          href="/artists"
          onClick={handleViewAllArtists}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: '#F5F5F7',
            fontSize: '13.5px',
            fontWeight: 600,
            textDecoration: 'none',
            borderBottom: '1px solid rgba(179, 19, 27, 0.8)',
            paddingBottom: '2px',
            transition: 'color 0.2s ease, border-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#B3131B';
            e.currentTarget.style.borderColor = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#F5F5F7';
            e.currentTarget.style.borderColor = 'rgba(179, 19, 27, 0.8)';
          }}
        >
          <span>View artist profiles</span>
          <ArrowRight size={14} />
        </a>
      </div>

      {/* Fallback local modal if onOpenModal is not provided */}
      {!onOpenModal && (
        <MemberDetailModal
          isOpen={isLocalModalOpen}
          onClose={() => setIsLocalModalOpen(false)}
          member={localModalMember}
        />
      )}
    </section>
  );
};

export default BandMembers;
