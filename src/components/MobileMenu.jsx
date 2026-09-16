import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Facebook, Youtube, ChevronDown } from 'lucide-react';
import BrandLogo from './BrandLogo';
import ContactPopover from './ContactPopover';
import { siteData } from '../data/siteData';

/**
 * MobileMenu Component
 * Compact, dark smoked-glass mobile navigation drawer.
 * Reduced font sizes (14px-16px in Inter) to prevent oversized text.
 */
export const MobileMenu = ({
  isOpen,
  onClose,
  navLinks,
  currentView = 'home',
  activeSection = 'home',
  onNavigate
}) => {
  const { social } = siteData;
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(false);

  const handleItemClick = (link) => {
    onClose();
    if (onNavigate) {
      onNavigate(link.target, link.type);
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
            zIndex: 99998,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '1.75rem 1.5rem',
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
              paddingBottom: '1rem'
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

          {/* Links List - Clean, compact, fits without overwhelming the screen */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              margin: '1.5rem 0'
            }}
          >
            {navLinks.map((link) => {
              const isActive =
                link.type === 'view'
                  ? currentView === link.target
                  : currentView === 'home' &&
                    (activeSection === link.target || (link.target === 'artists' && activeSection === 'members'));

              return (
                <button
                  key={link.name}
                  onClick={() => handleItemClick(link)}
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '15px',
                    fontWeight: isActive ? 600 : 450,
                    letterSpacing: '-0.01em',
                    textAlign: 'left',
                    color: isActive ? '#FFFFFF' : '#A1A1A6',
                    cursor: 'pointer',
                    background: isActive ? 'rgba(255, 255, 255, 0.05)' : 'none',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.65rem 0.75rem',
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
          <div style={{ margin: '0 0 1.25rem 0' }}>
            <button
              type="button"
              id="mobile-contact-starx-btn"
              onClick={() => setIsContactPanelOpen((prev) => !prev)}
              aria-expanded={isContactPanelOpen}
              aria-haspopup="dialog"
              className="btn btn-glass"
              style={{
                width: '100%',
                height: '42px',
                borderRadius: '12px',
                fontSize: '13.5px',
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
              paddingTop: '1.25rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              {social.instagram.url && (
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ color: '#A1A1A6' }}
                >
                  <Instagram size={17} />
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
                  <Facebook size={17} />
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
                  <Youtube size={17} />
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
