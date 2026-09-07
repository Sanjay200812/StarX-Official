import React, { useState, useEffect } from 'react';
import { Menu } from 'lucide-react';
import MobileMenu from './MobileMenu';
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
  const [logoError, setLogoError] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Members', href: '#members' },
    { name: 'Performances', href: '#performances' },
    { name: 'Media', href: '#media' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' }
  ];

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
        style={{
          position: 'sticky',
          top: '12px',
          zIndex: 9000,
          width: 'calc(100% - 32px)',
          maxWidth: '1360px',
          margin: '0 auto',
          height: isScrolled ? '60px' : '68px',
          borderRadius: isScrolled ? '16px' : '20px',
          backgroundColor: isScrolled ? 'rgba(12, 12, 14, 0.82)' : 'rgba(12, 12, 14, 0.52)',
          backdropFilter: 'blur(22px) saturate(115%)',
          WebkitBackdropFilter: 'blur(22px) saturate(115%)',
          border: '1px solid rgba(255, 255, 255, 0.07)',
          boxShadow: isScrolled
            ? '0 18px 45px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.06)'
            : '0 8px 25px rgba(0, 0, 0, 0.25), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
          transition: 'height 0.5s cubic-bezier(0.22, 1, 0.36, 1), background-color 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-radius 0.5s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
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
            padding: '0 1.75rem'
          }}
        >
          {/* LEFT: STARX LIVE Wordmark / Logo */}
          <a
            href="#home"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
              textDecoration: 'none'
            }}
          >
            {!logoError ? (
              <img
                src={brand.logo}
                alt="StarX Live Logo"
                onError={() => setLogoError(true)}
                style={{
                  height: '32px',
                  width: 'auto',
                  maxWidth: '38px',
                  objectFit: 'contain'
                }}
              />
            ) : (
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <svg viewBox="0 0 100 100" fill="#C1121F" style={{ width: '18px', height: '18px' }}>
                  <polygon points="50,5 63,35 95,36 69,57 78,89 50,70 22,89 31,57 5,36 37,35" />
                </svg>
              </div>
            )}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.4rem' }}>
              <span
                style={{
                  fontFamily: "'Geist', 'Inter', sans-serif",
                  fontSize: '17px',
                  fontWeight: 750,
                  letterSpacing: '-0.03em',
                  color: '#F5F5F7'
                }}
              >
                STAR<span style={{ color: '#C1121F' }}>X</span> LIVE
              </span>
              <span
                style={{
                  fontFamily: "'Geist', 'Inter', sans-serif",
                  fontSize: '10px',
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            <nav
              style={{
                display: 'none',
                alignItems: 'center',
                gap: '1.85rem'
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
                      fontFamily: "'Geist', 'Inter', sans-serif",
                      fontSize: '13.5px',
                      fontWeight: 500,
                      letterSpacing: '-0.015em',
                      color: isActive ? '#FFFFFF' : '#A1A1A6',
                      transition: 'color 0.25s ease',
                      position: 'relative',
                      padding: '0.4rem 0'
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
                          width: '4px',
                          height: '4px',
                          borderRadius: '50%',
                          backgroundColor: '#C1121F'
                        }}
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Pill Button: CONTACT STARX */}
            <div className="desktop-navbar-btn" style={{ display: 'none' }}>
              <a
                href="#contact"
                className="btn btn-glass"
                style={{
                  height: '38px',
                  padding: '0 18px',
                  fontSize: '12.5px',
                  fontWeight: 500,
                  borderRadius: '999px'
                }}
              >
                Contact StarX
              </a>
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
