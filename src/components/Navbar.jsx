import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
import BrandLogo from './BrandLogo';
import ContactPopover from './ContactPopover';
import { siteData } from '../data/siteData';

/**
 * Navbar Component (Section 7, 8, 19)
 * Floating island smoked-glass navigation bar.
 * Uses real StarX logo / wordmark.
 * Position: sticky, top: 12px, border-radius: 18px.
 * Background: rgba(10, 10, 12, 0.70) with 24px blur.
 */
export const Navbar = ({ isIntroActive = false }) => {
  const { brand } = siteData;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Members', href: '#members' },
    { name: 'Performances', href: '#performances' },
    { name: 'Media', href: '#media' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' }
  ];

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverWrapperRef = useRef(null);

  // Close popover on click outside, ESC key, or scroll movement
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
      if (Math.abs(window.scrollY - initialScroll) > 25) {
        setIsPopoverOpen(false);
      }
    };

    // Use mousedown and click to reliably intercept outside clicks
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
      setIsScrolled(window.scrollY > 40);

      const sectionIds = ['home', 'about', 'members', 'performances', 'media', 'events', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 240 && rect.bottom >= 200) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className="glass-navbar-header"
        style={{
          position: 'sticky',
          top: '12px',
          zIndex: 9000,
          margin: '0 auto',
          opacity: isIntroActive ? 0 : 1,
          transform: isIntroActive ? 'translateY(-16px)' : 'translateY(0)',
          pointerEvents: isIntroActive ? 'none' : 'auto',
          height: isScrolled ? '60px' : '64px',
          borderRadius: '16px',
          backgroundColor: isScrolled ? 'rgba(10, 10, 12, 0.88)' : 'rgba(10, 10, 12, 0.68)',
          backdropFilter: 'blur(20px) saturate(115%)',
          WebkitBackdropFilter: 'blur(20px) saturate(115%)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: isScrolled
            ? '0 18px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
            : '0 8px 24px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
          transition: 'opacity 0.95s cubic-bezier(0.22, 1, 0.36, 1), transform 0.95s cubic-bezier(0.22, 1, 0.36, 1), height 0.4s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.4s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.4s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
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
            padding: '0 1.5rem'
          }}
        >
          {/* LEFT: STARX LIVE Wordmark / Logo */}
          <a
            href="#home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.65rem',
              textDecoration: 'none'
            }}
          >
            <BrandLogo size={34} className="navbar-logo-wrapper" priority />
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.35rem' }}>
              <span
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: '15px',
                  fontWeight: 750,
                  letterSpacing: '-0.03em',
                  color: '#F5F5F7'
                }}
              >
                STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '9.5px',
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

          {/* RIGHT: Navigation Links + Contact Button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1.75rem' }}>
            <nav
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '1.75rem'
              }}
              className="desktop-navbar-links"
            >
              {navLinks.map((link) => {
                const isActive = activeSection === link.href.substring(1);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '13.5px',
                      fontWeight: 500,
                      letterSpacing: '-0.015em',
                      color: isActive ? '#FFFFFF' : '#A1A1A6',
                      transition: 'color 0.25s ease',
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
                          width: '16px',
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

            {/* Pill Button: Contact StarX (Opens popover, does NOT navigate) */}
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
                  height: '35px',
                  padding: '0 16px',
                  fontSize: '12px',
                  fontWeight: 500,
                  borderRadius: '999px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: isPopoverOpen ? 'rgba(255, 255, 255, 0.14)' : undefined,
                  borderColor: isPopoverOpen ? 'rgba(255, 255, 255, 0.18)' : undefined
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

            {/* Mobile Menu Trigger */}
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
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      <style>{`
        .glass-navbar-header {
          width: calc(100% - 28px);
          max-width: 1160px;
        }
        @media (min-width: 768px) {
          .glass-navbar-header {
            width: calc(100% - 48px);
          }
        }
        @media (min-width: 960px) {
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
        activeSection={activeSection}
      />
    </>
  );
};

export default Navbar;
