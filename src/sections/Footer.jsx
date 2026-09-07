import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import { siteData } from '../data/siteData';

/**
 * Footer Component (Section 36)
 * Near-black #050505 footer with thin divider rgba(255, 255, 255, 0.08):
 * Left: STARX LIVE / ROCK BAND
 * Center: Clean navigation links
 * Right: Minimal social links
 * Bottom: Tagline, copyright, and music recreation legal disclaimer.
 */
export const Footer = () => {
  const { brand, social } = siteData;

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Members', href: '#members' },
    { name: 'Performances', href: '#performances' },
    { name: 'Media', href: '#media' },
    { name: 'Events', href: '#events' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer
      style={{
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '6rem 0 3.5rem 0',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px' }}>
        {/* Main Footer Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '2.5rem',
            paddingBottom: '3.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          {/* Left: Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <img
              src={brand.logo}
              alt="StarX Logo"
              style={{ width: '28px', height: '28px', objectFit: 'contain' }}
            />
            <div>
              <span
                style={{
                  fontFamily: "'Geist', 'Inter', sans-serif",
                  fontSize: '1.2rem',
                  fontWeight: 750,
                  letterSpacing: '-0.03em',
                  color: '#F5F5F7',
                  lineHeight: 1
                }}
              >
                STAR<span style={{ color: '#C1121F' }}>X</span> LIVE
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: "'Geist', 'Inter', sans-serif",
                  fontSize: '0.68rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#737378',
                  marginTop: '0.2rem'
                }}
              >
                ROCK BAND
              </span>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <nav style={{ display: 'flex', gap: '1.85rem', flexWrap: 'wrap' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                style={{
                  fontFamily: "'Geist', 'Inter', sans-serif",
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  color: '#A1A1A6',
                  textDecoration: 'none',
                  transition: 'color 0.25s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A6')}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Minimal Social Links */}
          <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'center' }}>
            {social.instagram.url && (
              <a
                href={social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: '#737378', transition: 'color 0.25s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C1121F')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#737378')}
              >
                <Instagram size={19} />
              </a>
            )}
            {social.facebook.url && (
              <a
                href={social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                style={{ color: '#737378', transition: 'color 0.25s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C1121F')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#737378')}
              >
                <Facebook size={19} />
              </a>
            )}
            {social.youtube.url && (
              <a
                href={social.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
                style={{ color: '#737378', transition: 'color 0.25s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#C1121F')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#737378')}
              >
                <Youtube size={19} />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Row: Tagline & Copyright */}
        <div
          style={{
            paddingTop: '2.5rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontSize: '0.85rem',
            color: '#737378'
          }}
        >
          <div>
            <span>{brand.tagline}</span>
          </div>

          <div style={{ textAlign: 'right' }}>
            <span>© {new Date().getFullYear()} STARX LIVE. All Rights Reserved.</span>
          </div>
        </div>

        {/* Music Recreation Legal Note */}
        <div
          style={{
            marginTop: '1.25rem',
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontSize: '0.75rem',
            color: '#55555A',
            lineHeight: 1.5
          }}
        >
          StarX Live performs and recreates live music arrangements. Original compositions remain the intellectual property of their original creators.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
