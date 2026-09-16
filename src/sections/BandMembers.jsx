import React, { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import MemberDetailModal from '../components/MemberDetailModal';

gsap.registerPlugin(ScrollTrigger);

/**
 * BandMembers Section
 * "MEET STARX"
 *
 * Specifications:
 * - 7 real musicians:
 *     01 B. Prasad (Rhythm Pad)
 *     02 B. Joseph (Drum Kit)
 *     03 G. Perumalla Rao (Piano 1)
 *     04 N. Thirapatiyya (Lead Guitar)
 *     05 E. Chandra Mohan (Bass Guitar)
 *     06 K. Sudhakar (Singer)
 *     07 G. Vijay (Singer)
 * - 4 cards top row, 3 cards second row centered.
 * - Card width: 250px to 280px, aspect-ratio 4:5, radius 16px.
 * - Single click on member card or photo opens modal immediately.
 * - Subtle, smooth scroll reveal (no scroll-jacking, no pinned animation).
 * - Crew is NOT embedded here; Crew is in its dedicated view.
 */
export const BandMembers = () => {
  const { members } = siteData;
  const [modalMember, setModalMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      cardRefs.current.forEach((card) => {
        if (card) {
          gsap.set(card, { opacity: 1, y: 0, scale: 1 });
        }
      });
      return;
    }

    // Set initial subtle hidden state
    cardRefs.current.forEach((card) => {
      if (card) {
        gsap.set(card, { opacity: 0, y: 20, scale: 0.985 });
      }
    });

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 78%',
      once: true,
      onEnter: () => {
        cardRefs.current.forEach((card, idx) => {
          if (!card) return;
          gsap.to(card, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            delay: idx * 0.08,
            ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
          });
        });
      }
    });

    return () => {
      trigger.kill();
    };
  }, [members.length]);

  const handleOpenModal = (member) => {
    setModalMember(member);
    setIsModalOpen(true);
  };

  return (
    <section
      id="artists"
      ref={sectionRef}
      className="section-standard"
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        padding: 'clamp(4rem, 6vw, 5.5rem) 1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Anchor for backward compatibility */}
      <span id="members" style={{ position: 'absolute', top: 0 }} aria-hidden="true" />

      <style>{`
        /* Responsive Grid: 4 cards row 1, 3 cards row 2 centered */
        .artists-grid-flow {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.25rem;
          max-width: 1180px;
          margin: 0 auto;
          width: 100%;
        }

        .artist-card-wrapper {
          flex: 0 0 260px;
          max-width: 270px;
          width: 100%;
          aspect-ratio: 4 / 5;
          position: relative;
          border-radius: 16px;
          overflow: hidden;
          background-color: rgba(14, 14, 17, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.07);
          box-shadow: 0 14px 32px rgba(0, 0, 0, 0.4);
          cursor: pointer;
          transition: border-color 0.3s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
          user-select: none;
        }

        .artist-card-wrapper:hover {
          border-color: rgba(255, 255, 255, 0.16);
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(0, 0, 0, 0.55);
        }

        .artist-card-wrapper:hover .artist-portrait-img {
          transform: scale(1.02);
          filter: brightness(1.0);
        }

        .artist-portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.92);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s ease;
        }

        @media (max-width: 640px) {
          .artists-grid-flow {
            gap: 1.15rem;
          }
          .artist-card-wrapper {
            flex: 0 0 min(100%, 280px);
            max-width: min(100%, 280px);
          }
        }
      `}</style>

      {/* Section Header: Bodoni Moda (34px-44px desktop, 26px-32px mobile) */}
      <div
        className="container"
        style={{
          textAlign: 'center',
          marginBottom: '2.75rem'
        }}
      >
        <div className="label-accent" style={{ marginBottom: '0.65rem', fontSize: '12px' }}>
          <span className="label-accent-dot" />
          STARX MUSICIANS
        </div>

        <h2
          className="editorial-heading"
          style={{
            fontSize: 'clamp(28px, 3.4vw, 42px)',
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
            fontSize: 'clamp(14px, 1.1vw, 15px)',
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

      {/* Clean Card Grid: 4 cards row 1, 3 cards row 2 centered */}
      <div className="artists-grid-flow">
        {members.map((member, index) => {
          const formattedNumber = `0${index + 1}`.slice(-2);

          return (
            <div
              key={member.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="artist-card-wrapper"
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
                  fallbackTitle=""
                  fallbackSubtitle=""
                  variant="member"
                  objectFit="cover"
                  className="artist-portrait-img"
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

              {/* Bottom Card Content: Name 18-21px, Role 12-13px, Number 11-12px */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.15rem 1.15rem',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                {/* Number: 11px to 12px */}
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

                {/* Name: 18px to 21px */}
                <div
                  className="member-name"
                  style={{
                    fontSize: 'clamp(18px, 4.8vw, 20px)',
                    fontWeight: 600,
                    letterSpacing: '-0.015em',
                    color: '#F5F5F7',
                    lineHeight: 1.2,
                    marginBottom: '0.25rem'
                  }}
                >
                  {member.name}
                </div>

                {/* Role: 12px to 13px */}
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

      {/* Member Profile Modal */}
      <MemberDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        member={modalMember}
      />
    </section>
  );
};

export default BandMembers;
