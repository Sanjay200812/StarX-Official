import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Phone, MessageCircle, Mail, MapPin, Instagram, Facebook, Youtube, QrCode } from 'lucide-react';
import { siteData } from '../data/siteData';

/**
 * ContactView Component
 * Dedicated "/contact" page view.
 * Heading: "BOOKINGS & ENQUIRIES"
 * Provides direct calling and WhatsApp actions for both phone numbers,
 * email mailto, location, official social handles, and QR connect.
 * Note: WhatsApp prefilled query is encoded into URLs and NEVER visibly displayed on the page.
 */
export const ContactView = ({ onBackHome }) => {
  const { contact, social, qr } = siteData;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      style={{
        padding: 'clamp(6.5rem, 10vw, 8.5rem) 1.25rem clamp(4rem, 6vw, 6rem) 1.25rem',
        minHeight: '85vh'
      }}
    >
      <div className="container" style={{ maxWidth: '1080px' }}>
        {/* Back to Home Button */}
        <button
          onClick={onBackHome}
          className="btn btn-glass"
          style={{
            height: '36px',
            padding: '0 16px',
            fontSize: '12.5px',
            fontWeight: 500,
            marginBottom: '2rem',
            gap: '0.4rem'
          }}
        >
          <ArrowLeft size={14} />
          <span>Back to Home</span>
        </button>

        {/* View Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="label-accent" style={{ marginBottom: '0.65rem', fontSize: '12px' }}>
            <span className="label-accent-dot" />
            DIRECT MANAGEMENT & BOOKINGS
          </div>

          <h1
            className="editorial-heading"
            style={{
              fontSize: 'clamp(32px, 4vw, 46px)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
              color: '#F5F5F7',
              lineHeight: 1.1,
              margin: '0 0 0.65rem 0'
            }}
          >
            BOOKINGS & ENQUIRIES
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(14px, 1.1vw, 15.5px)',
              color: '#A1A1A6',
              maxWidth: '540px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Connect directly with StarX Live management for concert bookings, festival dates, college fests, corporate events, and private showcases.
          </p>
        </div>

        {/* Main Contact Card */}
        <div
          style={{
            backgroundColor: 'rgba(14, 14, 18, 0.72)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: 'clamp(1.75rem, 3.5vw, 3rem)',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)',
            marginBottom: '3rem'
          }}
        >
          {/* Direct Phone Lines */}
          <div style={{ marginBottom: '2.5rem' }}>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: '11.5px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                color: '#B3131B',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '1.25rem'
              }}
            >
              OFFICIAL CALL & WHATSAPP LINES
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {contact.phoneNumbers.map((phone, idx) => (
                <div
                  key={phone.id}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    padding: '1.25rem',
                    backgroundColor: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '14px'
                  }}
                >
                  <div>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: "var(--font-body)",
                        fontSize: '10.5px',
                        fontWeight: 600,
                        letterSpacing: '0.08em',
                        color: '#737378',
                        textTransform: 'uppercase',
                        marginBottom: '0.2rem'
                      }}
                    >
                      LINE 0{idx + 1}
                    </span>

                    <div
                      style={{
                        fontFamily: "var(--font-body)",
                        fontSize: 'clamp(20px, 2.5vw, 26px)',
                        fontWeight: 650,
                        letterSpacing: '-0.02em',
                        color: '#F5F5F7',
                        lineHeight: 1.2
                      }}
                    >
                      {phone.display}
                    </div>
                  </div>

                  {/* Actions (Prefilled message is NOT shown anywhere on screen) */}
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
          </div>

          {/* Email, Location, and Social Details */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '2rem',
              paddingTop: '2rem',
              borderTop: '1px solid rgba(255, 255, 255, 0.07)'
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
                  marginBottom: '0.4rem'
                }}
              >
                BOOKINGS EMAIL
              </span>
              <a
                href={contact.emailMailto}
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#F5F5F7',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'color 0.2s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#B3131B')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F7')}
              >
                <Mail size={16} style={{ color: '#B3131B' }} />
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
                  marginBottom: '0.4rem'
                }}
              >
                HEADQUARTERS
              </span>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: '15px',
                  fontWeight: 500,
                  color: '#F5F5F7',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
              >
                <MapPin size={16} style={{ color: '#B3131B' }} />
                <span>{contact.location}</span>
              </div>
            </div>

            {/* Official Channels */}
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
                  marginBottom: '0.6rem'
                }}
              >
                FOLLOW STARX LIVE
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <a
                  href={social.instagram.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
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
                  <Instagram size={17} />
                </a>

                <a
                  href={social.facebook.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
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
                  <Facebook size={17} />
                </a>

                <a
                  href={social.youtube.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="YouTube"
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
                  <Youtube size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Quick QR Connect Block */}
        {qr && qr.image && (
          <div
            style={{
              backgroundColor: 'rgba(14, 14, 18, 0.65)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderRadius: '18px',
              padding: 'clamp(1.5rem, 3vw, 2.25rem)',
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.75rem'
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', color: '#B3131B', marginBottom: '0.35rem' }}>
                <QrCode size={15} />
                <span style={{ fontSize: '11px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  INSTANT SCAN
                </span>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: 650, color: '#F5F5F7', margin: '0 0 0.35rem 0' }}>
                {qr.heading}
              </h3>
              <p style={{ fontSize: '13.5px', color: '#A1A1A6', margin: 0, maxWidth: '460px', lineHeight: 1.5 }}>
                {qr.subtitle}
              </p>
            </div>

            <div
              style={{
                width: '96px',
                height: '96px',
                backgroundColor: '#FFFFFF',
                borderRadius: '12px',
                padding: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.4)'
              }}
            >
              <img
                src={qr.image}
                alt="StarX WhatsApp & Contact QR Code"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactView;
