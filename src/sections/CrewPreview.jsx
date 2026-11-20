import React, { useState, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Instagram } from 'lucide-react';
import { crew } from '../data/crew';
import BrandedImage from '../components/BrandedImage';
import MemberDetailModal from '../components/MemberDetailModal';

gsap.registerPlugin(ScrollTrigger);

/**
 * CrewPreview Section (Home)
 * "BEHIND STARX"
 * Compact crew preview sourced from the central roster.
 * Single click opens member detail modal.
 * Link "View full crew →" navigates to /crew.
 *
 * Desktop: the crew stand in a 3D ring that spins as you scroll past (pinned),
 * so each person gets a turn at the front. Phones/tablets keep the card grid.
 */
export const CrewPreview = ({ onNavigate, onOpenModal }) => {
  const sectionRef = useRef(null);
  const ringRef = useRef(null);

  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const mm = gsap.matchMedia();
    mm.add('(min-width: 1000px)', () => {
      const ring = ringRef.current;
      if (!ring) return undefined;
      const slots = Array.from(ring.querySelectorAll('.rock-ring-slot'));
      if (slots.length < 2) return undefined;
      const step = 360 / slots.length;
      const radius = Math.max(340, Math.round((300 * slots.length) / (2 * Math.PI)) + 60);

      slots.forEach((slot, i) => {
        slot.style.transform = `rotateY(${i * step}deg) translateZ(${radius}px)`;
      });
      gsap.set(ring, { rotationX: -6, z: -radius });

      const shade = () => {
        const current = gsap.getProperty(ring, 'rotationY');
        slots.forEach((slot, i) => {
          let a = (((i * step + current) % 360) + 360) % 360;
          if (a > 180) a = 360 - a; // 0 = facing front, 180 = at the back
          const front = 1 - a / 180;
          slot.style.opacity = String(0.2 + front * 0.8);
          slot.style.filter = `brightness(${(0.4 + front * 0.6).toFixed(3)})`;
          slot.style.pointerEvents = front > 0.8 ? 'auto' : 'none';
        });
      };
      shade();

      const tween = gsap.to(ring, {
        rotationY: -(360 - step),
        ease: 'none',
        onUpdate: shade,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: () => (sectionRef.current.offsetHeight > window.innerHeight - 70 ? 'top top' : 'center center'),
          end: `+=${slots.length * 55}%`,
          scrub: 0.8,
          pin: true,
          anticipatePin: 1
        }
      });

      return () => {
        if (tween.scrollTrigger) tween.scrollTrigger.kill();
        tween.kill();
        gsap.set(ring, { clearProps: 'transform' });
        slots.forEach((slot) => {
          slot.style.transform = '';
          slot.style.opacity = '';
          slot.style.filter = '';
          slot.style.pointerEvents = '';
        });
      };
    });
    return () => mm.revert();
  }, []);

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

  const handleViewFullCrew = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('crew', 'view');
    }
  };

  return (
    <section
      ref={sectionRef}
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

        {/* Card grid (phones/tablets) / 3D spinning ring (desktop) */}
        <div className="rock-ring-stage rock-ring-stage--crew">
        <div
          ref={ringRef}
          className="rock-ring rock-ring--crew"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))',
            gap: '1.5rem',
            maxWidth: '960px',
            margin: '0 auto 2rem auto'
          }}
        >
          {crew.map((person) => (
            <div className="rock-ring-slot" key={person.id}>
            <div
              onClick={() => handleOpenModal(person)}
              className="rock-card rock-card--panel"
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
                borderRadius: '4px',
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
                  borderRadius: '4px',
                  overflow: 'hidden',
                  marginBottom: '1rem'
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
                  priority={false}
                />
              </div>

              {/* Information */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3
                  className="rock-card-name"
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
                  className="rock-card-role"
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '12px',
                    fontWeight: 500,
                    color: '#E8141C',
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
            </div>
          ))}
        </div>
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
              borderBottom: '1px solid rgba(232, 20, 28, 0.8)',
              paddingBottom: '2px',
              transition: 'color 0.2s ease, border-color 0.2s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.color = '#E8141C';
              e.currentTarget.style.borderColor = '#FFFFFF';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = '#F5F5F7';
              e.currentTarget.style.borderColor = 'rgba(232, 20, 28, 0.8)';
            }}
          >
            <span>View team details</span>
            <ArrowRight size={14} />
          </a>
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
    </section>
  );
};

export default CrewPreview;
