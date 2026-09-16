import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import BrandLogo from './BrandLogo';
import ContactPopover from './ContactPopover';
import { siteData } from '../data/siteData';

/**
 * Navbar Component
 * Compact, sticky, smoked-glass navigation bar.
 * Height: 60px to 64px desktop.
 * Font size: 13px to 14px (Inter).
 *
 * Direct Navigation:
 * - Home (/)
 * - About (/about)
 * - Artists (/artists)
 * - Performances (/performances)
 * - Media (/media)
 * - Events (/events)
 * - Crew (/crew)
 * - Contact (/contact)
 * - Contact StarX (Quick Contact Popup)
 */
export const Navbar = ({
  isReady = true,
  isIntroActive = false,
  currentView = 'home',
  onNavigate
}) => {
  const isVisible = isReady && !isIntroActive;
  const { brand } = siteData;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverWrapperRef = useRef(null);

  const navLinks = [
    { name: 'Home', target: 'home' },
    { name: 'About', target: 'about' },
    { name: 'Artists', target: 'artists' },
    { name: 'Performances', target: 'performances' },
    { name: 'Media', target: 'media' },
    { name: 'Events', target: 'events' },
    { name: 'Crew', target: 'crew' },
    { name: 'Contact', target: 'contact' }
  ];

  // Close popover on click outside, ESC key, or scroll
  useEffect(() => {
    if (!isPopoverOpen) return;

    const initialScroll = window.scrollY;

    const handleClickOutside = (e) => {
      if (popoverWrapperRef.current && !popoverWrapperRef.current.contains(e.target)) {
        setIsPopoverOpen(false);
      }
    };

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setIsPopoverOpen(false);
      }
    };

    const handleScrollClose = () => {
      if (Math.abs(window.scrollY - initialScroll) > 30) {
        setIsPopoverOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('click', handleClickOutside);
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('scroll', handleScrollClose, { passive: true });

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('scroll', handleScrollClose);
    };
  }, [isPopoverOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleItemClick = (e, target) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target, 'view');
    }
  };

  return (
    <>
      <header
        className="glass-navbar-header"
        style={{
          position: 'sticky',
          top: '12px',
          zIndex: 50,
          margin: '0 auto',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(-14px)',
          pointerEvents: isVisible ? 'auto' : 'none',
          height: isScrolled ? '60px' : '64px',
          borderRadius: '16px',
          backgroundColor: isScrolled ? 'rgba(10, 10, 12, 0.90)' : 'rgba(10, 10, 12, 0.75)',
          backdropFilter: 'blur(20px) saturate(115%)',
          WebkitBackdropFilter: 'blur(20px) saturate(115%)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          boxShadow: isScrolled
            ? '0 16px 36px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
            : '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
          transition:
            'opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), height 0.3s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '100%',
            padding: '0 1.25rem'
          }}
        >
          {/* LEFT: STARX LIVE Logo & Wordmark */}
          <a
            href="/"
            onClick={(e) => handleItemClick(e, 'home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none'
            }}
          >
            <BrandLogo size={30} className="navbar-logo-wrapper" priority />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
              <span
                className="navbar-brand-title"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '13.5px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#F5F5F7'
                }}
              >
                STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
              </span>
              <span
                className="navbar-brand-desc"
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.1em',
                  color: '#737378',
                  textTransform: 'uppercase'
                }}
              >
                ROCK BAND
              </span>
            </div>
          </a>

          {/* RIGHT: Navigation Links + Contact StarX Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
            <nav
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '1.15rem'
              }}
              className="desktop-navbar-links"
            >
              {navLinks.map((link) => {
                const isActive = currentView === link.target;

                return (
                  <a
                    key={link.name}
                    href={`/${link.target === 'home' ? '' : link.target}`}
                    onClick={(e) => handleItemClick(e, link.target)}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '13px',
                      fontWeight: isActive ? 600 : 500,
                      letterSpacing: '-0.01em',
                      color: isActive ? '#FFFFFF' : '#A1A1A6',
                      transition: 'color 0.2s ease',
                      position: 'relative',
                      padding: '0.35rem 0'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = isActive ? '#FFFFFF' : '#A1A1A6')
                    }
                  >
                    {link.name}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          bottom: 0,
                          left: '50%',
                          transform: 'translateX(-50%)',
                          width: '14px',
                          height: '2px',
                          borderRadius: '1px',
                          backgroundColor: '#B3131B'
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Pill Button: Contact StarX (Opens popup directly) */}
            <div
              ref={popoverWrapperRef}
              className="desktop-navbar-btn"
              style={{ display: 'none', position: 'relative' }}
            >
              <button
                type="button"
                id="navbar-contact-starx-btn"
                onClick={() => setIsPopoverOpen((prev) => !prev)}
                aria-expanded={isPopoverOpen}
                aria-haspopup="dialog"
                aria-controls="contact-starx-popover"
                className="btn btn-glass"
                style={{
                  height: '34px',
                  padding: '0 14px',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  borderRadius: '999px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  backgroundColor: isPopoverOpen ? 'rgba(255, 255, 255, 0.14)' : undefined
                }}
              >
                <span>Contact StarX</span>
              </button>

              <AnimatePresence>
                {isPopoverOpen && (
                  <ContactPopover onClose={() => setIsPopoverOpen(false)} />
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Hamburger Trigger */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open menu"
              className="mobile-hamburger-btn"
              style={{
                color: '#F5F5F7',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>

      <style>{`
        .glass-navbar-header {
          width: calc(100% - 28px);
          max-width: 1180px;
        }
        @media (min-width: 768px) {
          .glass-navbar-header {
            width: calc(100% - 48px);
          }
        }
        @media (max-width: 480px) {
          .glass-navbar-header {
            width: calc(100% - 24px);
          }
          .glass-navbar-header > div {
            padding: 0 0.85rem !important;
          }
          .navbar-brand-desc {
            display: none !important;
          }
        }
        @media (min-width: 980px) {
          .desktop-navbar-links {
            display: flex !important;
          }
          .desktop-navbar-btn {
            display: block !important;
          }
          .mobile-hamburger-btn {
            display: none !important;
          }
        }
      `}</style>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
        currentView={currentView}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default Navbar;
