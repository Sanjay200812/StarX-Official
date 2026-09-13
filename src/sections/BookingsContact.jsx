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
      className="section-standard"
      style={{
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1120px' }}>
        <div
          style={{
            backgroundColor: 'rgba(15, 15, 17, 0.48)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '20px',
            padding: 'clamp(1.75rem, 3vw, 2.75rem)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.35)'
          }}
        >
        {/* Large Editorial Headline */}
        <div
          style={{
            marginBottom: '2.5rem'
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
              color: '#B3131B',
              textTransform: 'uppercase',
              marginBottom: '0.75rem'
            }}
          >
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: '#B3131B'
              }}
            />
            BOOKINGS & ENQUIRIES
          </div>

          <ScrollRevealHeading
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(30px, 3.6vw, 48px)',
              fontWeight: 750,
              letterSpacing: '-0.03em',
              color: '#F5F5F7',
              lineHeight: 1.08,
              margin: '0 0 0.85rem 0'
            }}
          >
            BRING STARX
            <br />
            <span style={{ color: '#B3131B' }}>TO YOUR STAGE.</span>
          </ScrollRevealHeading>

          <ScrollRevealParagraph
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(15px, 1.1vw, 17px)',
              color: '#A1A1A6',
              maxWidth: '600px',
              margin: 0,
              lineHeight: 1.6,
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
                    fontFamily: "var(--font-body)",
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
                    fontFamily: "var(--font-heading)",
                    fontSize: 'clamp(2rem, 3.8vw, 3rem)',
                    fontWeight: 750,
                    letterSpacing: '-0.03em',
                    color: '#F5F5F7',
                    lineHeight: 1.1
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
                fontFamily: "var(--font-body)",
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
                fontFamily: "var(--font-heading)",
                fontSize: '1.25rem',
                fontWeight: 600,
                letterSpacing: '-0.02em',
                color: '#F5F5F7',
                textDecoration: 'none',
                wordBreak: 'break-all',
                transition: 'color 0.25s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B3131B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#F5F5F7')}
            >
              {contact.email}
            </a>
          </div>

          {/* Location */}
          <div>
            <span
              style={{
                fontFamily: "var(--font-body)",
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
                fontFamily: "var(--font-heading)",
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
      </div>
    </section>
  );
};

export default BookingsContact;
