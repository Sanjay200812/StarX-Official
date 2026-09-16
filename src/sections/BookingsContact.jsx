import React from 'react';
import { Phone, MessageCircle, Mail, MapPin, Instagram, Facebook, Youtube } from 'lucide-react';
import { siteData } from '../data/siteData';

/**
 * BookingsContact Section
 * "BOOKINGS & ENQUIRIES"
 *
 * Specifications:
 * - Last major section of homepage scroll.
 * - Bodoni Moda for major heading.
 * - Phone numbers: 7337253898, 9390754569.
 * - WhatsApp action with prefilled query (never visibly displayed).
 * - Location: HYDERABAD, TS, AP - INDIA.
 * - Email: starxliveofficial@gmail.com.
 * - Social handles: Instagram, Facebook, YouTube.
 */
export const BookingsContact = () => {
  const { contact, social } = siteData;

  return (
    <section
      id="contact"
      className="section-standard"
      style={{
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1080px' }}>
        <div
          style={{
            backgroundColor: 'rgba(14, 14, 17, 0.72)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.07)',
            borderRadius: '18px',
            padding: 'clamp(1.75rem, 3.2vw, 2.75rem)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)'
          }}
        >
          {/* Header */}
          <div style={{ marginBottom: '2.25rem' }}>
            <div className="label-accent" style={{ marginBottom: '0.65rem', fontSize: '12px' }}>
              <span className="label-accent-dot" />
              REACH THE BAND
            </div>

            <h2
              className="editorial-heading"
              style={{
                fontSize: 'clamp(28px, 3.5vw, 44px)',
                fontWeight: 600,
                letterSpacing: '-0.015em',
                color: '#F5F5F7',
                lineHeight: 1.1,
                margin: '0 0 0.65rem 0'
              }}
            >
              BOOKINGS & ENQUIRIES
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: 'clamp(14px, 1.05vw, 15px)',
                color: '#A1A1A6',
                maxWidth: '560px',
                margin: 0,
                lineHeight: 1.6,
                letterSpacing: '-0.01em'
              }}
            >
              Available for live concerts, festivals, corporate shows, college fests, and private showcases across India.
            </p>
          </div>

          {/* Direct Phone Lines */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '1.25rem',
              marginBottom: '2.5rem'
            }}
          >
            {contact.phoneNumbers.map((phone, idx) => (
              <div
                key={phone.id}
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem',
                  padding: '1.25rem 0',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.06)'
                }}
              >
                <div>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: "var(--font-body)",
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: '#737378',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem'
                    }}
                  >
                    DIRECT LINE 0{idx + 1}
                  </span>

                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: 'clamp(20px, 2.4vw, 26px)',
                      fontWeight: 650,
                      letterSpacing: '-0.02em',
                      color: '#F5F5F7',
                      lineHeight: 1.2
                    }}
                  >
                    {phone.display}
                  </div>
                </div>

                {/* Call & WhatsApp Actions (No prefilled text displayed) */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
                  <a
                    href={phone.call}
                    className="btn btn-primary"
                    style={{
                      height: '40px',
                      padding: '0 20px',
                      fontSize: '13px',
                      fontWeight: 500
                    }}
                  >
                    <Phone size={14} />
                    <span>Call</span>
                  </a>

                  <a
                    href={phone.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-glass"
                    style={{
                      height: '40px',
                      padding: '0 20px',
                      fontSize: '13px',
                      fontWeight: 500
                    }}
                  >
                    <MessageCircle size={15} color="#25D366" />
                    <span>WhatsApp</span>
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Email, Location & Social Handles Split */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '2rem',
              paddingTop: '0.5rem'
            }}
          >
            {/* Email */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#737378',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.35rem'
                }}
              >
                OFFICIAL EMAIL
              </span>
              <a
                href={contact.emailMailto}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#F5F5F7',
                  textDecoration: 'none',
                  wordBreak: 'break-all',
                  transition: 'color 0.2s ease',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#B3131B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F7')}
              >
                <Mail size={15} style={{ color: '#B3131B', flexShrink: 0 }} />
                <span>{contact.email}</span>
              </a>
            </div>

            {/* Location */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#737378',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.35rem'
                }}
              >
                BAND HEADQUARTERS
              </span>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#F5F5F7',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem'
                }}
              >
                <MapPin size={15} style={{ color: '#B3131B', flexShrink: 0 }} />
                <span>{contact.location}</span>
              </div>
            </div>

            {/* Social Channels */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#737378',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '0.5rem'
                }}
              >
                OFFICIAL CHANNELS
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="StarX Live Band Instagram"
                  style={{
                    color: '#A1A1A6',
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#A1A1A6';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <Instagram size={16} />
                </a>

                <a
                  href={social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="StarX Live Band Facebook"
                  style={{
                    color: '#A1A1A6',
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#A1A1A6';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <Facebook size={16} />
                </a>

                <a
                  href={social.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="StarX Live Band YouTube"
                  style={{
                    color: '#A1A1A6',
                    padding: '8px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#FFFFFF';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#A1A1A6';
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <Youtube size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingsContact;
