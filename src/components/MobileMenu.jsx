import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Facebook, Youtube, ChevronDown } from 'lucide-react';
import BrandLogo from './BrandLogo';
import ContactPopover from './ContactPopover';
import { siteData } from '../data/siteData';

/**
 * MobileMenu Component
 * Compact, dark smoked-glass mobile navigation drawer.
 * Direct navigation for all 8 primary pages:
 * - Home, About, Artists, Performances, Media, Events, Crew, Contact
 * - Contact StarX quick panel
 */
export const MobileMenu = ({
  isOpen,
  onClose,
  navLinks,
  currentView = 'home',
  onNavigate
}) => {
  const { social } = siteData;
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(false);

  const handleItemClick = (target) => {
    onClose();
    if (onNavigate) {
      onNavigate(target, 'view');
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 8, 10, 0.96)',
            backdropFilter: 'blur(24px) saturate(120%)',
            WebkitBackdropFilter: 'blur(24px) saturate(120%)',
            zIndex: 60,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.5rem 1.25rem',
            overflowY: 'auto'
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
              paddingBottom: '0.85rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <BrandLogo size={28} />
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontWeight: 700,
                  fontSize: '14px',
                  letterSpacing: '-0.02em',
                  color: '#F5F5F7'
                }}
              >
                STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
              </span>
            </div>

            <button
              onClick={onClose}
              aria-label="Close navigation"
              style={{
                color: '#F5F5F7',
                padding: '6px',
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={18} />
            </button>
          </div>

          {/* Links List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.35rem',
              margin: '1.25rem 0'
            }}
          >
            {navLinks.map((link) => {
              const isActive = currentView === link.target;

              return (
                <button
                  key={link.name}
                  onClick={() => handleItemClick(link.target)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '14.5px',
                    fontWeight: isActive ? 600 : 450,
                    letterSpacing: '-0.01em',
                    textAlign: 'left',
                    color: isActive ? '#FFFFFF' : '#A1A1A6',
                    cursor: 'pointer',
                    background: isActive ? 'rgba(255, 255, 255, 0.06)' : 'none',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.6rem 0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.18s ease'
                  }}
                >
                  <span>{link.name}</span>
                  {isActive && (
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: '#B3131B',
                        display: 'inline-block'
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>

          {/* Contact StarX Action Button */}
          <div style={{ margin: '0 0 1rem 0' }}>
            <button
              type="button"
              id="mobile-contact-starx-btn"
              onClick={() => setIsContactPanelOpen((prev) => !prev)}
              aria-expanded={isContactPanelOpen}
              aria-haspopup="dialog"
              className="btn btn-glass"
              style={{
                width: '100%',
                height: '40px',
                borderRadius: '12px',
                fontSize: '13px',
                fontWeight: 500,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: isContactPanelOpen
                  ? 'rgba(255, 255, 255, 0.12)'
                  : 'rgba(255, 255, 255, 0.06)',
                borderColor: isContactPanelOpen
                  ? 'rgba(255, 255, 255, 0.18)'
                  : 'rgba(255, 255, 255, 0.10)',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <span>Contact StarX</span>
              <ChevronDown
                size={14}
                style={{
                  transform: isContactPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease'
                }}
              />
            </button>

            <AnimatePresence>
              {isContactPanelOpen && (
                <div style={{ marginTop: '8px' }}>
                  <ContactPopover isMobile={true} onClose={onClose} />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Socials & Location */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', gap: '0.85rem' }}>
              {social.instagram.url && (
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ color: '#A1A1A6' }}
                >
                  <Instagram size={16} />
                </a>
              )}
              {social.facebook.url && (
                <a
                  href={social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  style={{ color: '#A1A1A6' }}
                >
                  <Facebook size={16} />
                </a>
              )}
              {social.youtube.url && (
                <a
                  href={social.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
                  style={{ color: '#A1A1A6' }}
                >
                  <Youtube size={16} />
                </a>
              )}
            </div>

            <span style={{ fontSize: '11px', color: '#737378', letterSpacing: '0.04em' }}>
              HYDERABAD, INDIA
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
