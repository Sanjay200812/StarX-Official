import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Instagram, Facebook, Youtube, ChevronDown } from 'lucide-react';
import BrandLogo from './BrandLogo';
import ContactPopover from './ContactPopover';
import { siteData } from '../data/siteData';

/**
 * MobileMenu Component
 * Premium dark smoked-glass full-screen navigation drawer.
 */
export const MobileMenu = ({ isOpen, onClose, navLinks, activeSection }) => {
  const { social } = siteData;
  const [isContactPanelOpen, setIsContactPanelOpen] = useState(false);

  const handleLinkClick = (href) => {
    onClose();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(8, 8, 10, 0.95)',
            backdropFilter: 'blur(24px) saturate(120%)',
            WebkitBackdropFilter: 'blur(24px) saturate(120%)',
            zIndex: 99998,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2.5rem 2rem',
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
              paddingBottom: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <BrandLogo size="sm" />
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontWeight: 750,
                  fontSize: '1.15rem',
                  letterSpacing: '-0.03em',
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
                padding: '8px',
                cursor: 'pointer',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Links List */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              margin: '2rem 0'
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.substring(1);
              return (
                <button
                  key={link.name}
                  onClick={() => handleLinkClick(link.href)}
                  style={{
                    fontFamily: "var(--font-heading)",
                    fontSize: 'clamp(1.6rem, 5vw, 2.2rem)',
                    fontWeight: isActive ? 700 : 450,
                    letterSpacing: '-0.035em',
                    textAlign: 'left',
                    color: isActive ? '#FFFFFF' : '#A1A1A6',
                    cursor: 'pointer',
                    background: 'none',
                    border: 'none',
                    padding: '0.4rem 0',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    transition: 'color 0.2s ease'
                  }}
                >
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
                  <span>{link.name}</span>
                </button>
              );
            })}
          </div>

          {/* Contact StarX Action Button (Opens Popover Panel, does NOT navigate) */}
          <div style={{ margin: '0 0 1.5rem 0' }}>
            <button
              type="button"
              id="mobile-contact-starx-btn"
              onClick={() => setIsContactPanelOpen((prev) => !prev)}
              aria-expanded={isContactPanelOpen}
              aria-haspopup="dialog"
              className="btn btn-glass"
              style={{
                width: '100%',
                height: '46px',
                borderRadius: '14px',
                fontSize: '14px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                backgroundColor: isContactPanelOpen ? 'rgba(255, 255, 255, 0.12)' : 'rgba(255, 255, 255, 0.06)',
                borderColor: isContactPanelOpen ? 'rgba(255, 255, 255, 0.18)' : 'rgba(255, 255, 255, 0.10)',
                color: '#FFFFFF',
                cursor: 'pointer'
              }}
            >
              <span>Contact StarX</span>
              <ChevronDown
                size={16}
                style={{
                  transform: isContactPanelOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                  transition: 'transform 0.25s ease'
                }}
              />
            </button>

            <AnimatePresence>
              {isContactPanelOpen && (
                <div style={{ marginTop: '10px' }}>
                  <ContactPopover isMobile={true} onClose={onClose} />
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Bottom Socials & Location */}
          <div
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              paddingTop: '1.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {social.instagram.url && (
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  style={{ color: '#A1A1A6' }}
                >
                  <Instagram size={20} />
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
                  <Facebook size={20} />
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
                  <Youtube size={20} />
                </a>
              )}
            </div>

            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '0.75rem',
                fontWeight: 600,
                color: '#737378',
                letterSpacing: '0.06em'
              }}
            >
              HYDERABAD, INDIA
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default MobileMenu;
