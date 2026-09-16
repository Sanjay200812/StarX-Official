import React from 'react';
import { Instagram, Facebook, Youtube } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { siteData } from '../data/siteData';

/**
 * Footer Component
 * Minimal dark footer matching editorial brand guidelines.
 */
export const Footer = ({ onNavigate }) => {
  const { brand, social } = siteData;

  const navLinks = [
    { name: 'Home', type: 'section', target: 'home' },
    { name: 'Artists', type: 'section', target: 'artists' },
    { name: 'Performances', type: 'section', target: 'performances' },
    { name: 'About', type: 'view', target: 'about' },
    { name: 'Media', type: 'view', target: 'media' },
    { name: 'Events', type: 'view', target: 'events' },
    { name: 'Crew', type: 'view', target: 'crew' },
    { name: 'Contact', type: 'section', target: 'contact' }
  ];

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(link.target, link.type);
    }
  };

  return (
    <footer
      id="footer"
      style={{
        backgroundColor: 'rgba(6, 6, 8, 0.85)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: '3rem 0 2rem 0',
        position: 'relative'
      }}
    >
      <div className="container">
        {/* Main Footer Row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.75rem',
            paddingBottom: '2rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
          }}
        >
          {/* Left: Brand Identity */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <BrandLogo size={32} />
            <div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '15px',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#F5F5F7',
                  lineHeight: 1
                }}
              >
                STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
              </span>
              <span
                style={{
                  display: 'block',
                  fontFamily: "var(--font-body)",
                  fontSize: '9px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  color: '#737378',
                  marginTop: '0.2rem',
                  textTransform: 'uppercase'
                }}
              >
                ROCK BAND
              </span>
            </div>
          </div>

          {/* Center: Navigation Links */}
          <nav style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={`#${link.target}`}
                onClick={(e) => handleLinkClick(e, link)}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '13px',
                  fontWeight: 500,
                  color: '#A1A1A6',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A1A1A6')}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right: Minimal Social Links */}
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            {social.instagram.url && (
              <a
                href={social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                style={{ color: '#737378', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#737378')}
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
                style={{ color: '#737378', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#737378')}
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
                style={{ color: '#737378', transition: 'color 0.2s ease' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#FFFFFF')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#737378')}
              >
                <Youtube size={17} />
              </a>
            )}
          </div>
        </div>

        {/* Bottom Row: Tagline & Copyright */}
        <div
          style={{
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
            fontFamily: "var(--font-body)",
            fontSize: '12.5px',
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
            marginTop: '1rem',
            fontFamily: "var(--font-body)",
            fontSize: '11.5px',
            color: '#52525B',
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
