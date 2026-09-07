import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { siteData } from '../data/siteData';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../components/ScrollReveal';

/**
 * BookingsContact Section (Section 32, 33, 34)
 * Premium dark ending section on #090909 with massive headline (80-120px desktop),
 * clean phone numbers, and smoked-glass pill buttons.
 */
export const BookingsContact = () => {
  const { contact } = siteData;

  return (
    <section
      id="contact"
      style={{
        backgroundColor: '#090909',
        padding: '12rem 2rem 10rem 2rem',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1200px' }}>
        {/* Large Editorial Headline */}
        <div
          style={{
            marginBottom: '6rem'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: '0.1em',
              color: '#C1121F',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#C1121F'
              }}
            />
            BOOKINGS & ENQUIRIES
          </div>

          <ScrollRevealHeading
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: 'clamp(3.8rem, 7.8vw, 7.5rem)',
              fontWeight: 750,
              letterSpacing: '-0.045em',
              color: '#F5F5F7',
              lineHeight: 0.98,
              margin: '0 0 1.5rem 0'
            }}
          >
            BRING STARX
            <br />
            <span style={{ color: '#C1121F' }}>TO YOUR STAGE.</span>
          </ScrollRevealHeading>

          <ScrollRevealParagraph
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: 'clamp(1.15rem, 2vw, 1.45rem)',
              color: '#A1A1A6',
              maxWidth: '660px',
              margin: 0,
              lineHeight: 1.55,
              letterSpacing: '-0.015em'
            }}
          >
            Available for live concerts, collegiate festivals, and private showcases across India.
          </ScrollRevealParagraph>
        </div>

        {/* Thin Hairline Divider */}
        <div style={{ height: '1px', backgroundColor: 'rgba(255, 255, 255, 0.08)', width: '100%' }} />

        {/* Dual Phone Numbers (Large Minimal Rows) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3.5rem', margin: '4.5rem 0' }}>
          {contact.phoneNumbers.map((phone, idx) => (
            <div
              key={phone.id}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '2rem',
                paddingBottom: '3rem',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    color: '#737378',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.5rem'
                  }}
                >
                  DIRECT LINE 0{idx + 1}
                </span>

                <div
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: 'clamp(2.6rem, 5.5vw, 4.2rem)',
                    fontWeight: 750,
                    letterSpacing: '-0.04em',
                    color: '#F5F5F7',
                    lineHeight: 1
                  }}
                >
                  {phone.display}
                </div>
              </div>

              {/* Clean Pill CALL & WHATSAPP Buttons (Section 33 & 34) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                <a
                  href={phone.call}
                  className="btn btn-primary"
                  style={{
                    height: '48px',
                    padding: '0 26px',
                    fontSize: '14px',
                    fontWeight: 600
                  }}
                >
                  <Phone size={16} />
                  <span>Call</span>
                </a>

                <a
                  href={phone.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-glass"
                  style={{
                    height: '48px',
                    padding: '0 26px',
                    fontSize: '14px',
                    fontWeight: 500
                  }}
                >
                  <MessageCircle size={16} color="#25D366" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Email & Location Minimal Bottom Split */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '3rem',
            paddingTop: '1rem'
          }}
        >
          {/* Email */}
          <div>
            <span
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#737378',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              EMAIL ENQUIRIES
            </span>
            <a
              href={contact.emailMailto}
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#F5F5F7',
                textDecoration: 'none',
                wordBreak: 'break-all',
                transition: 'color 0.25s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C1121F')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F7')}
            >
              {contact.email}
            </a>
          </div>

          {/* Location */}
          <div>
            <span
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: '0.75rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#737378',
                textTransform: 'uppercase',
                display: 'block',
                marginBottom: '0.5rem'
              }}
            >
              BAND BASE
            </span>
            <div
              style={{
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#F5F5F7'
              }}
            >
              {contact.location}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BookingsContact;
