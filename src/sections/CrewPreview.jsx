import React, { useState } from 'react';
import { ArrowRight, Instagram } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import MemberDetailModal from '../components/MemberDetailModal';

/**
 * CrewPreview Section (Home)
 * "BEHIND STARX"
 * Compact 3-card preview: Josh, Sanjay, Balu.
 * Single click opens member detail modal.
 * Link "View full crew →" navigates to /crew.
 */
export const CrewPreview = ({ onNavigate }) => {
  const { crew } = siteData;
  const [modalMember, setModalMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (person) => {
    setModalMember(person);
    setIsModalOpen(true);
  };

  const handleViewFullCrew = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('crew', 'view');
    }
  };

  return (
    <section
      id="crew-preview"
      className="section-standard"
      style={{
        backgroundColor: 'transparent',
        padding: 'clamp(3.5rem, 5.5vw, 5rem) 1.5rem',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '1080px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <div className="label-accent" style={{ marginBottom: '0.65rem', fontSize: '12px' }}>
            <span className="label-accent-dot" />
            MANAGEMENT & PRODUCTION
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
            BEHIND STARX
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(13.5px, 1.05vw, 15px)',
              color: '#A1A1A6',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            The dedicated team managing programs, digital creative direction, and production behind every stage performance.
          </p>
        </div>

        {/* 3-Card Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: '1.5rem',
            maxWidth: '960px',
            margin: '0 auto 2rem auto'
          }}
        >
          {crew.map((person) => (
            <div
              key={person.id}
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
                padding: '1.15rem',
                cursor: 'pointer',
                transition: 'transform 0.35s ease, border-color 0.35s ease, box-shadow 0.35s ease',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-3px)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.16)';
                e.currentTarget.style.boxShadow = '0 18px 40px rgba(0, 0, 0, 0.5)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Photo (4:5 ratio) */}
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '4 / 5',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  marginBottom: '1rem'
                }}
              >
                <BrandedImage
                  src={person.image}
                  alt={`${person.name} - ${person.role}`}
                  aspectRatio="4/5"
                  fallbackTitle=""
                  fallbackSubtitle=""
                  variant="member"
                  objectFit="cover"
                />
              </div>

              {/* Information */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '18px',
                    fontWeight: 650,
                    letterSpacing: '-0.015em',
                    color: '#F5F5F7',
                    margin: '0 0 0.25rem 0',
                    lineHeight: 1.25
                  }}
                >
                  {person.name}
                </h3>

                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#B3131B',
                    lineHeight: 1.35,
                    marginBottom: '0.65rem'
                  }}
                >
                  {person.role}
                </div>

                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '12.5px',
                    color: '#A1A1A6',
                    lineHeight: 1.55,
                    margin: '0 0 0.85rem 0',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {person.bio}
                </p>

                {person.instagramUrl && (
                  <div style={{ marginTop: 'auto', paddingTop: '0.65rem', borderTop: '1px solid rgba(255, 255, 255, 0.06)' }}>
                    <a
                      href={person.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.35rem',
                        fontSize: '11.5px',
                        color: '#737378',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#737378')}
                    >
                      <Instagram size={12} />
                      <span>{person.instagramLabel || '@starxliveband'}</span>
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View Full Crew Navigation Link */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="/crew"
            onClick={handleViewFullCrew}
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
            <span>View team details</span>
            <ArrowRight size={14} />
          </a>
        </div>
      </div>

      {/* Member Detail Modal */}
      <MemberDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={modalMember}
      />
    </section>
  );
};

export default CrewPreview;
