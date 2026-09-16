import React from 'react';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin, ArrowRight, MessageCircle } from 'lucide-react';
import BrandLogo from '../components/BrandLogo';
import { siteData } from '../data/siteData';

/**
 * Footer Component
 * Compact, professional StarX footer inspired by the structural reference:
 * - Left CTA: "BRING STARX TO YOUR STAGE" with button to /contact
 * - Link Columns: EXPLORE, STARX, CONNECT, BOOKINGS
 * - Modest social icons (32px-38px)
 * - Premium StarX dark styling (#050505 bg, #B3131B accent)
 */
export const Footer = ({ onNavigate }) => {
  const { brand, social, contact } = siteData;

  const exploreLinks = [
    { name: 'Home', target: 'home', type: 'view' },
    { name: 'About', target: 'about', type: 'view' },
    { name: 'Artists', target: 'artists', type: 'view' },
    { name: 'Performances', target: 'performances', type: 'view' }
  ];

  const starxLinks = [
    { name: 'Media', target: 'media', type: 'view' },
    { name: 'Events', target: 'events', type: 'view' },
    { name: 'Crew', target: 'crew', type: 'view' },
    { name: 'Contact', target: 'contact', type: 'view' }
  ];

  const handleLinkClick = (e, target, type) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate(target, type);
    }
  };

  return (
    <footer
      id="site-footer"
      style={{
        backgroundColor: '#050505',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        padding: 'clamp(2.5rem, 4.5vw, 3.75rem) 1.5rem 2rem 1.5rem',
        position: 'relative',
        zIndex: 10
      }}
    >
      <div className="container" style={{ maxWidth: '1180px', margin: '0 auto' }}>
        {/* Main Grid: Left CTA + Columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '2.5rem',
            paddingBottom: '2.5rem',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          {/* 1. Left Booking CTA */}
          <div style={{ maxWidth: '340px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', marginBottom: '1rem' }}>
              <BrandLogo size={30} />
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: '14.5px',
                    fontWeight: 700,
                    letterSpacing: '-0.02em',
                    color: '#F5F5F7'
                  }}
                >
                  STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
                </span>
                <span
                  style={{
                    display: 'block',
                    fontSize: '9px',
                    fontWeight: 600,
                    letterSpacing: '0.12em',
                    color: '#8F8F95',
                    textTransform: 'uppercase'
                  }}
                >
                  ROCK BAND
                </span>
              </div>
            </div>

            <h3
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '13.5px',
                fontWeight: 700,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#B3131B',
                margin: '0 0 0.45rem 0'
              }}
            >
              BRING STARX TO YOUR STAGE
            </h3>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '13px',
                color: '#8F8F95',
                lineHeight: 1.55,
                margin: '0 0 1.25rem 0'
              }}
            >
              Planning an event or live program? Connect with StarX Live for concert bookings and enquiries across India.
            </p>

            <button
              type="button"
              onClick={(e) => handleLinkClick(e, 'contact', 'view')}
              className="btn btn-primary"
              style={{
                height: '38px',
                padding: '0 18px',
                fontSize: '12.5px',
                fontWeight: 600,
                gap: '0.4rem'
              }}
            >
              <span>Contact StarX</span>
              <ArrowRight size={13} />
            </button>
          </div>

          {/* 2. Column: EXPLORE */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '13px',
                fontWeight: 650,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#F5F5F7',
                marginBottom: '1rem'
              }}
            >
              EXPLORE
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {exploreLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={`/${link.target === 'home' ? '' : link.target}`}
                    onClick={(e) => handleLinkClick(e, link.target, link.type)}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '12.5px',
                      fontWeight: 500,
                      color: '#8F8F95',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8F8F95')}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Column: STARX */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '13px',
                fontWeight: 650,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#F5F5F7',
                marginBottom: '1rem'
              }}
            >
              STARX
            </h4>

            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
              {starxLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={`/${link.target}`}
                    onClick={(e) => handleLinkClick(e, link.target, link.type)}
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '12.5px',
                      fontWeight: 500,
                      color: '#8F8F95',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease'
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = '#8F8F95')}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. Column: BOOKINGS & CONTACT */}
          <div>
            <h4
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '13px',
                fontWeight: 650,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color: '#F5F5F7',
                marginBottom: '1rem'
              }}
            >
              BOOKINGS
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.55rem', fontSize: '12.5px', color: '#8F8F95' }}>
              <a
                href="tel:+917337253898"
                style={{ color: '#F5F5F7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#B3131B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F7')}
              >
                <Phone size={13} style={{ color: '#B3131B' }} />
                <span>7337253898</span>
              </a>

              <a
                href="tel:+919390754569"
                style={{ color: '#F5F5F7', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#B3131B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F7')}
              >
                <Phone size={13} style={{ color: '#B3131B' }} />
                <span>9390754569</span>
              </a>

              <a
                href="mailto:starxliveofficial@gmail.com"
                style={{ color: '#8F8F95', textDecoration: 'none', wordBreak: 'break-all', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#F5F5F7')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#8F8F95')}
              >
                <Mail size={13} style={{ color: '#B3131B' }} />
                <span>starxliveofficial@gmail.com</span>
              </a>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.2rem' }}>
                <MapPin size={13} style={{ color: '#B3131B', flexShrink: 0 }} />
                <span>HYDERABAD, TS, AP - INDIA</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Social Icons & Copyright */}
        <div
          style={{
            paddingTop: '1.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1.25rem'
          }}
        >
          {/* Social Icons (Modest 32px to 38px max) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            {social.instagram.url && (
              <a
                href={social.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StarX Live Instagram"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8F8F95',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#8F8F95';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <Instagram size={15} />
              </a>
            )}

            {social.facebook.url && (
              <a
                href={social.facebook.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StarX Live Facebook"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8F8F95',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#8F8F95';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <Facebook size={15} />
              </a>
            )}

            {social.youtube.url && (
              <a
                href={social.youtube.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StarX Live YouTube"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8F8F95',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#FFFFFF';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#8F8F95';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <Youtube size={15} />
              </a>
            )}

            {contact.phoneNumbers?.[0]?.whatsapp && (
              <a
                href={contact.phoneNumbers[0].whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="StarX Live WhatsApp"
                style={{
                  width: '34px',
                  height: '34px',
                  borderRadius: '50%',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#8F8F95',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#25D366';
                  e.currentTarget.style.backgroundColor = 'rgba(37, 211, 102, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(37, 211, 102, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#8F8F95';
                  e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                }}
              >
                <MessageCircle size={15} />
              </a>
            )}
          </div>

          {/* Legal / Copyright */}
          <div style={{ fontSize: '12px', color: '#8F8F95' }}>
            <span>© {new Date().getFullYear()} STARX LIVE. All Rights Reserved.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
