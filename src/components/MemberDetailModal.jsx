import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, ArrowRight } from 'lucide-react';
import BrandedImage from './BrandedImage';

/**
 * MemberDetailModal Component (Specs 20–24)
 * Smoked black glass modal dialog:
 * - Overlay: rgba(0, 0, 0, 0.78) with backdrop-filter: blur(10px)
 * - Modal: rgba(15, 15, 17, 0.94) with blur(24px), border-radius 24px, 1px solid rgba(255, 255, 255, 0.08)
 * - Smooth entrance: opacity 0 -> 1, translateY 18px -> 0, scale 0.97 -> 1 (650ms, cubic-bezier(0.22, 1, 0.36, 1))
 * - Left: member image (4:5 ratio)
 * - Right: name, role, 4-5 line bio, Instagram link
 * - Mobile: image on top, text underneath
 * - Preserve exact scroll position when opening and closing
 */
export const MemberDetailModal = ({ isOpen, onClose, member }) => {
  const scrollPosRef = useRef(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    if (isOpen) {
      scrollPosRef.current = window.scrollY;
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      // Ensure scroll position is strictly preserved
      if (scrollPosRef.current) {
        window.scrollTo(0, scrollPosRef.current);
      }
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && member && (
        <motion.div
          key="member-detail-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          onClick={onClose}
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.76)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            zIndex: 99998,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1.25rem'
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.985, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.985, y: 12 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '820px',
              backgroundColor: 'rgba(15, 15, 17, 0.96)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '24px',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.65), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
              overflow: 'hidden',
              maxHeight: '90vh'
            }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              aria-label="Close details"
              style={{
                position: 'absolute',
                top: '1.15rem',
                right: '1.15rem',
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

            {/* Split Content (Desktop: Left Image / Right Text; Mobile: Stacked) */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr',
                alignItems: 'stretch',
                overflowY: 'auto',
                maxHeight: '90vh'
              }}
              className="member-modal-grid"
            >
              {/* Left: Artist / Crew Photo Canvas */}
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
                  aspectRatio="4/5"
                  fallbackTitle={member.name}
                  fallbackSubtitle={member.role}
                  variant="member"
                  objectFit="cover"
                  objectPosition="center"
                />
              </div>

              {/* Right: Artist / Crew Details */}
              <div className="member-modal-details-col">
                <div>
                  {/* 1. Member Name: Inter (24px to 28px desktop, 20px to 23px mobile) */}
                  <h3
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 'clamp(20px, 2.2vw, 26px)',
                      fontWeight: 650,
                      letterSpacing: '-0.02em',
                      color: '#F5F5F7',
                      margin: '0 0 0.35rem 0',
                      lineHeight: 1.15
                    }}
                  >
                    {member.name}
                  </h3>

                  {/* 2. Member Role: Inter */}
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 'clamp(12.5px, 1.1vw, 14px)',
                      fontWeight: 500,
                      letterSpacing: '0.01em',
                      color: '#B3131B',
                      marginBottom: '1.25rem',
                      lineHeight: 1.4,
                      overflowWrap: 'break-word',
                      wordBreak: 'normal'
                    }}
                  >
                    {member.role}
                  </div>

                  {/* 3. ABOUT Label */}
                  <span
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: '#737378',
                      textTransform: 'uppercase',
                      display: 'block',
                      marginBottom: '0.65rem'
                    }}
                  >
                    ABOUT
                  </span>

                  {/* 4. Biography (Two-paragraph structure preserved, unbolded, clean typography) */}
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                      color: '#C7C7CC',
                      lineHeight: 1.7,
                      fontWeight: 400
                    }}
                  >
                    {member.bio ? (
                      member.bio.split(/\n\s*\n/).map((paragraph, pIdx, arr) => (
                        <p
                          key={pIdx}
                          style={{
                            margin: 0,
                            marginBottom: pIdx < arr.length - 1 ? '14px' : '0',
                            fontSize: 'clamp(13.5px, 1.05vw, 15px)',
                            lineHeight: 1.7,
                            color: '#C7C7CC',
                            fontWeight: 400
                          }}
                        >
                          {paragraph.trim()}
                        </p>
                      ))
                    ) : (
                      <p style={{ margin: 0, fontSize: 'clamp(13.5px, 1.05vw, 15px)', lineHeight: 1.7, color: '#C7C7CC', fontWeight: 400 }}>
                        StarX Live Band member profile details will be updated soon. Artist background, performance information and additional profile details will be added here shortly.
                      </p>
                    )}
                  </div>
                </div>

                {/* Bottom Row: Badge & Optional Social link */}
                {(() => {
                  const rawIg = member.instagramUrl || member.instagram || '';
                  const instagramUrl = typeof rawIg === 'string' && rawIg.trim().length > 0 ? rawIg.trim() : '';
                  const instagramLabel = member.instagramLabel || (member.isCrew ? '@starxliveband' : '@starxliveband');
                  const hasInstagram = Boolean(instagramUrl);
                  const badgeText = member.badge || (member.isCrew ? 'StarX Production & Crew' : 'StarX Live Artist');

                  if (!badgeText && !hasInstagram) return null;

                  return (
                    <div
                      style={{
                        marginTop: '1.85rem',
                        paddingTop: '1.25rem',
                        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: hasInstagram ? 'space-between' : 'flex-start',
                        gap: '1rem',
                        flexWrap: 'wrap'
                      }}
                    >
                      {badgeText ? (
                        <span
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: '12px',
                            color: '#737378',
                            fontWeight: 500
                          }}
                        >
                          {badgeText}
                        </span>
                      ) : null}

                      {hasInstagram ? (
                        <a
                          href={instagramUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="member-modal-ig-btn"
                          aria-label={`Open Instagram profile for ${member.name}`}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                            <Instagram size={16} color="#B3131B" />
                            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.2 }}>
                              <span
                                style={{
                                  fontSize: '10px',
                                  textTransform: 'uppercase',
                                  letterSpacing: '0.06em',
                                  color: '#8E8E93',
                                  fontWeight: 600
                                }}
                              >
                                Instagram
                              </span>
                              <span
                                style={{
                                  fontSize: '12.5px',
                                  fontWeight: 500,
                                  color: '#F5F5F7'
                                }}
                              >
                                {instagramLabel}
                              </span>
                            </div>
                          </div>
                          <ArrowRight size={14} className="ig-btn-arrow" />
                        </a>
                      ) : null}
                    </div>
                  );
                })()}
              </div>
            </div>
          </motion.div>

          <style>{`
            .member-modal-details-col {
              padding: 2.5rem 2.25rem;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
            }
            .member-modal-ig-btn {
              display: inline-flex;
              align-items: center;
              gap: 0.75rem;
              padding: 0.5rem 0.85rem;
              border-radius: 12px;
              background-color: rgba(255, 255, 255, 0.03);
              border: 1px solid rgba(255, 255, 255, 0.08);
              text-decoration: none;
              color: #F5F5F7;
              transition: background-color 0.25s ease, border-color 0.25s ease;
              cursor: pointer;
            }
            .member-modal-ig-btn:hover {
              background-color: rgba(255, 255, 255, 0.05) !important;
              border-color: rgba(255, 255, 255, 0.16) !important;
            }
            .member-modal-ig-btn .ig-btn-arrow {
              color: #8E8E93;
              transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1), color 0.25s ease;
            }
            .member-modal-ig-btn:hover .ig-btn-arrow {
              transform: translateX(3px);
              color: #F5F5F7;
            }
            @media (min-width: 768px) {
              .member-modal-grid {
                grid-template-columns: 46% 54% !important;
              }
            }
            @media (max-width: 767px) {
              .member-modal-details-col {
                padding: 1.65rem 1.35rem;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MemberDetailModal;
