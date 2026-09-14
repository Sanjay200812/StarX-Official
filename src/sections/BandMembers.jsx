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
 * - Clean card grid: 4 cards row 1, 3 cards row 2 centered.
 * - Normal document scrolling (no pinned sequence, no scroll-jacking).
 * - Scroll reveal: 2 members at a time (Pair 1, Pair 2, Pair 3, Final 1).
 * - Repeatable behavior:
 *     scroll down -> members reveal
 *     scroll back above section -> reset
 *     scroll down again -> reveal animation runs again.
 * - Randomized reveal order initialized once, while final card positions remain strictly stable.
 * - Reveal animation: opacity 0->1, translateY 24px->0, scale 0.985->1, blur 3px->0 (800ms, power3.out).
 * - Pair stagger: 130ms between the two cards in each pair.
 * - Click interaction:
 *     Direct single click on member card or photo opens profile modal immediately.
 * - Hover: image scale 1->1.015, brightness 0.9->1 (500ms).
 * - Behind StarX: Crew section placed immediately after Meet StarX with compact glass cards.
 */
export const BandMembers = () => {
  const { members, crew = [] } = siteData;
  const [modalMember, setModalMember] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const crewWrapperRef = useRef(null);
  const crewCardRefs = useRef([]);

  // Generate randomized reveal order ONCE on component mount:
  // e.g. [[m3, m6], [m1, m5], [m7, m2], [m4]]
  const revealBatchesRef = useRef(null);
  if (!revealBatchesRef.current) {
    const total = members.length;
    const indices = Array.from({ length: total }, (_, i) => i);
    // Fisher-Yates shuffle
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    // Group into pairs: 2, 2, 2, remaining 1
    revealBatchesRef.current = [
      [indices[0], indices[1]],
      [indices[2], indices[3]],
      [indices[4], indices[5]],
      [indices[6]]
    ];
  }

  // GSAP ScrollTrigger reveals 2 members at a time as user scrolls through section
  // Repeatable: scrolling back above section resets cards so scrolling down reveals again
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Initialize all cards to initial hidden state or visible if reduced motion
    cardRefs.current.forEach((card) => {
      if (!card) return;
      if (prefersReducedMotion) {
        gsap.set(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          pointerEvents: 'auto'
        });
      } else {
        gsap.set(card, {
          opacity: 0,
          y: 24,
          scale: 0.985,
          filter: 'blur(3px)',
          pointerEvents: 'none'
        });
      }
    });

    if (prefersReducedMotion) return;

    const batches = revealBatchesRef.current;
    const revealedIndices = new Set();

    const resetCards = () => {
      revealedIndices.clear();
      cardRefs.current.forEach((card) => {
        if (!card) return;
        gsap.killTweensOf(card);
        gsap.set(card, {
          opacity: 0,
          y: 24,
          scale: 0.985,
          filter: 'blur(3px)',
          pointerEvents: 'none'
        });
      });
    };

    const revealBatch = (batchIndex) => {
      const batch = batches[batchIndex];
      if (!batch) return;

      batch.forEach((memberIdx, i) => {
        if (revealedIndices.has(memberIdx)) return;
        revealedIndices.add(memberIdx);

        const card = cardRefs.current[memberIdx];
        if (!card) return;

        // 800ms, power3.out, 130ms stagger between the two cards in the pair
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: i * 0.13,
          ease: 'cubic-bezier(0.22, 1, 0.36, 1)',
          onComplete: () => {
            card.style.pointerEvents = 'auto';
          }
        });
      });
    };

    // 4 ScrollTriggers corresponding to progressive scroll positions:
    // Pair 1: section top reaches 82% viewport
    // Pair 2: top 66%
    // Pair 3: top 50%
    // Final member: top 34%
    const triggerThresholds = ['top 82%', 'top 66%', 'top 50%', 'top 34%'];

    const triggers = triggerThresholds.map((startPos, batchIdx) => {
      return ScrollTrigger.create({
        trigger: section,
        start: startPos,
        onEnter: () => {
          revealBatch(batchIdx);
        }
      });
    });

    // Reset trigger when user scrolls back above the section
    const resetTrigger = ScrollTrigger.create({
      trigger: section,
      start: 'top 88%',
      onLeaveBack: () => {
        resetCards();
      }
    });

    // Crew cards simple reveal animation (opacity 0->1, y 18->0, duration 700ms, small stagger)
    const crewWrapper = crewWrapperRef.current;
    let crewTrigger = null;

    if (crewWrapper && crewCardRefs.current.length > 0) {
      if (prefersReducedMotion) {
        crewCardRefs.current.forEach((card) => {
          if (card) gsap.set(card, { opacity: 1, y: 0 });
        });
      } else {
        crewCardRefs.current.forEach((card) => {
          if (card) gsap.set(card, { opacity: 0, y: 18 });
        });

        crewTrigger = ScrollTrigger.create({
          trigger: crewWrapper,
          start: 'top 85%',
          onEnter: () => {
            gsap.to(crewCardRefs.current, {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: 'cubic-bezier(0.22, 1, 0.36, 1)'
            });
          },
          onLeaveBack: () => {
            gsap.to(crewCardRefs.current, {
              opacity: 0,
              y: 18,
              duration: 0.4,
              ease: 'power2.in'
            });
          }
        });
      }
    }

    return () => {
      triggers.forEach((t) => t.kill());
      resetTrigger.kill();
      if (crewTrigger) crewTrigger.kill();
    };
  }, [members.length, crew.length]);

  // Click card handler:
  // Clicking puts card into selected state. Only 1 card selected at a time.
  // Open modal handler: uses real member data directly
  const handleOpenModal = (member) => {
    setModalMember(member);
    setIsModalOpen(true);
  };

  return (
    <section
      id="members"
      ref={sectionRef}
      className="section-standard"
      style={{
        position: 'relative',
        backgroundColor: 'transparent',
        padding: '5rem 1.5rem 6.5rem 1.5rem',
        overflow: 'hidden'
      }}
    >
      <style>{`
        /* Responsive Grid: 4 cards row 1, 3 cards row 2 centered */
        .members-grid-flow {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          max-width: 1240px;
          margin: 0 auto;
          width: 100%;
        }

        .member-card-wrapper {
          flex: 0 0 280px;
          max-width: 280px;
          width: 100%;
          aspect-ratio: 4 / 5;
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          background-color: rgba(14, 14, 17, 0.72);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.45);
          cursor: pointer;
          transition: border-color 0.35s ease, transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.35s ease;
          user-select: none;
        }

        /* Hover Behavior: subtle lift and image scale */
        .member-card-wrapper:hover {
          border-color: rgba(255, 255, 255, 0.14);
          transform: translateY(-3px);
          box-shadow: 0 20px 44px rgba(0, 0, 0, 0.55);
        }

        .member-card-wrapper:hover .member-portrait-img {
          transform: scale(1.02);
          filter: brightness(1.0);
        }

        .member-portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.92);
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        /* Mobile Viewport: clean compact grid */
        @media (max-width: 620px) {
          .members-grid-flow {
            gap: 1.25rem;
          }
          .member-card-wrapper {
            flex: 0 0 min(100%, 300px);
            max-width: min(100%, 300px);
          }
        }

        /* Crew Cards Hover & Responsive (Specs 3 & 4) */
        .crew-card {
          flex: 0 1 250px;
          max-width: 255px;
          width: 100%;
          background-color: rgba(15, 15, 17, 0.52);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          border: 1px solid rgba(255, 255, 255, 0.07);
          border-radius: 18px;
          padding: 12px;
          text-align: left;
          box-shadow: 0 16px 36px rgba(0, 0, 0, 0.35);
          transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.35s ease, box-shadow 0.35s ease;
          box-sizing: border-box;
          cursor: pointer;
          user-select: none;
        }

        .crew-card:hover {
          transform: translateY(-3px);
          border-color: rgba(255, 255, 255, 0.14) !important;
          box-shadow: 0 20px 44px rgba(0, 0, 0, 0.50) !important;
        }

        .crew-card:hover .crew-portrait-img {
          transform: scale(1.02);
          filter: brightness(1.0);
        }

        .crew-portrait-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          filter: brightness(0.94);
          border-radius: 16px;
          transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), filter 0.5s cubic-bezier(0.22, 1, 0.36, 1);
        }

        .crew-grid-flow {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 1.5rem;
          max-width: 860px;
          margin: 0 auto;
          width: 100%;
        }

        @media (max-width: 767px) {
          .crew-grid-flow {
            flex-direction: column;
            align-items: center;
            gap: 1.25rem;
          }
          .crew-card {
            flex: 0 0 min(100%, 280px) !important;
            max-width: min(100%, 280px) !important;
          }
          .crew-role-text {
            font-size: 12px !important;
            line-height: 1.35 !important;
          }
        }

        .crew-role-text {
          font-size: 13px;
          line-height: 1.38;
          word-break: normal;
          overflow-wrap: break-word;
        }
      `}</style>

      {/* Section Header: MEET STARX 36-46px */}
      <div
        className="container"
        style={{
          textAlign: 'center',
          marginBottom: '3rem'
        }}
      >
        <div className="label-accent" style={{ marginBottom: '0.75rem' }}>
          <span className="label-accent-dot" />
          BAND MEMBERS
        </div>

        <h2
          className="section-title"
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: 'clamp(34px, 3.6vw, 44px)',
            fontWeight: 700,
            letterSpacing: '-0.025em',
            color: '#F5F5F7',
            margin: '0 0 0.65rem 0',
            lineHeight: 1.15
          }}
        >
          MEET STARX
        </h2>

        <p
          className="section-subtitle"
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 'clamp(15px, 1.4vw, 17px)',
            fontWeight: 400,
            color: '#A1A1A6',
            maxWidth: '520px',
            margin: '0 auto',
            lineHeight: 1.5,
            letterSpacing: '-0.01em'
          }}
        >
          The musicians behind the sound.
        </p>
      </div>

      {/* Clean Card Grid: 4 cards row 1, 3 cards row 2 centered */}
      <div className="members-grid-flow">
        {members.map((member, index) => {
          const formattedNumber = `0${index + 1}`.slice(-2);

          return (
            <div
              key={member.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className="member-card-wrapper"
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
              {/* Photo Area (4:5 ratio, object-fit cover, center) */}
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
                  className="member-portrait-img"
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

              {/* Bottom Card Content: name 20-23px, number 12-13px, role 12-14px */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '1.25rem 1.25rem',
                  zIndex: 2,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end'
                }}
              >
                {/* Member Name: Sora, 20px-23px, font-weight: 600 */}
                <h3
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 'clamp(20px, 1.8vw, 22px)',
                    fontWeight: 600,
                    letterSpacing: '-0.02em',
                    color: '#F5F5F7',
                    margin: '0 0 0.35rem 0',
                    lineHeight: 1.2,
                    textTransform: 'none'
                  }}
                >
                  {member.name}
                </h3>

                {/* Member Number & Role: 01 • Rhythm Pad */}
                <div
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '13px',
                    fontWeight: 500,
                    letterSpacing: '0.01em',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    textTransform: 'none'
                  }}
                >
                  <span style={{ color: '#8E8E93', fontSize: '13px', fontWeight: 500 }}>
                    {formattedNumber}
                  </span>
                  <span style={{ color: '#55555B' }}>•</span>
                  <span style={{ color: '#A1A1A6', fontSize: '13px', fontWeight: 500 }}>
                    {member.role}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* BEHIND STARX (CREW) SECTION */}
      {crew && crew.length > 0 && (
        <div
          ref={crewWrapperRef}
          className="crew-section-wrapper"
          style={{
            marginTop: '5rem',
            paddingTop: '3.5rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            textAlign: 'center'
          }}
        >
          {/* Subheading */}
          <div style={{ marginBottom: '2.5rem' }}>
            <div className="label-accent" style={{ marginBottom: '0.65rem' }}>
              <span className="label-accent-dot" />
              CREW & PRODUCTION
            </div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 'clamp(24px, 2.5vw, 30px)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#F5F5F7',
                margin: '0 0 0.5rem 0'
              }}
            >
              BEHIND STARX
            </h3>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '14px',
                color: '#8E8E93',
                margin: 0
              }}
            >
              The people behind the stage.
            </p>
          </div>

          {/* Crew Cards: Desktop 2 horizontal compact glass cards, Mobile stacked (Specs 3, 4, 5) */}
          <div className="crew-grid-flow">
            {crew.map((member, cIdx) => (
              <div
                key={member.name}
                ref={(el) => (crewCardRefs.current[cIdx] = el)}
                className="crew-card"
                onClick={() => handleOpenModal({ ...member, isCrew: true })}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleOpenModal({ ...member, isCrew: true });
                  }
                }}
                aria-label={`View profile for ${member.name} - ${member.role}`}
              >
                {/* Crew Photo Container: aspect-ratio 4/5, border-radius 16px */}
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    aspectRatio: '4 / 5',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    marginBottom: '0.85rem',
                    backgroundColor: '#0D0D10'
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
                    objectPosition="center"
                    className="crew-portrait-img"
                    style={{
                      width: '100%',
                      height: '100%',
                      borderRadius: '16px'
                    }}
                  />
                </div>

                {/* Name and Role */}
                <div style={{ padding: '0 0.25rem 0.35rem 0.25rem' }}>
                  <div
                    style={{
                      fontFamily: "var(--font-heading)",
                      fontSize: 'clamp(17px, 1.4vw, 19px)',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      color: '#F5F5F7',
                      marginBottom: '0.25rem',
                      lineHeight: 1.2
                    }}
                  >
                    {member.name}
                  </div>
                  <div
                    className="crew-role-text"
                    style={{
                      fontFamily: "var(--font-body)",
                      fontWeight: 500,
                      color: '#A1A1A6'
                    }}
                  >
                    {member.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
