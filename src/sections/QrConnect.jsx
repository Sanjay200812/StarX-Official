import React, { useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../components/ScrollReveal';

/**
 * QrConnect Section (Section 35)
 * Black background #050505.
 * Left: Clean white container for QR code (no glass over QR, flat and scannable).
 * Right: Large clean social links with subtle 3D scroll depth reveals.
 */
export const QrConnect = () => {
  const { qr, social } = siteData;
  const [hasQrError, setHasQrError] = useState(false);

  return (
    <section
      id="connect"
      style={{
        backgroundColor: '#050505',
        padding: '12rem 2rem 10rem 2rem',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1160px' }}>
        {/* Section Header */}
        <div
          style={{
            marginBottom: '5.5rem'
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
              marginBottom: '0.75rem'
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
            OFFICIAL CHANNELS
          </div>

          <ScrollRevealHeading
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)',
              fontWeight: 750,
              letterSpacing: '-0.04em',
              color: '#F5F5F7',
              margin: '0 0 0.85rem 0'
            }}
          >
            CONNECT WITH STARX.
          </ScrollRevealHeading>

          <ScrollRevealParagraph
            style={{
              fontFamily: "'Geist', 'Inter', sans-serif",
              fontSize: '1.2rem',
              color: '#A1A1A6',
              letterSpacing: '-0.015em',
              margin: 0
            }}
          >
            Instant access to all official StarX channels, live updates, and tour dates.
          </ScrollRevealParagraph>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '4rem',
            alignItems: 'center'
          }}
          className="connect-grid"
        >
          {/* Left: Clean White Container for QR Code (Section 35: No glass over QR, flat and scannable) */}
          <div>
            <div
              style={{
                backgroundColor: '#FFFFFF',
                padding: '2rem',
                borderRadius: '24px',
                display: 'inline-block',
                boxShadow: '0 16px 45px rgba(0, 0, 0, 0.6)'
              }}
            >
              {!hasQrError ? (
                <img
                  src={qr.image}
                  alt="Scan StarX Live Official QR"
                  onError={() => setHasQrError(true)}
                  style={{
                    width: '200px',
                    height: '200px',
                    display: 'block',
                    objectFit: 'contain'
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '200px',
                    height: '200px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#050505',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    textAlign: 'center'
                  }}
                >
                  QR Code Coming Soon
                </div>
              )}
            </div>

            <span
              style={{
                display: 'block',
                fontFamily: "'Geist', 'Inter', sans-serif",
                fontSize: '0.8rem',
                letterSpacing: '0.06em',
                color: '#737378',
                marginTop: '1.25rem',
                textTransform: 'uppercase',
                fontWeight: 600
              }}
            >
              Scan with camera to connect
            </span>
          </div>

          {/* Right: Clean Large Social Links (Section 35) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Instagram */}
            <a
              href={social.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.85rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                textDecoration: 'none',
                transition: 'color 0.25s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C1121F')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#737378',
                    textTransform: 'uppercase'
                  }}
                >
                  INSTAGRAM
                </span>
                <div
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: '#F5F5F7',
                    marginTop: '0.2rem'
                  }}
                >
                  {social.instagram.label}
                </div>
              </div>
              <ArrowUpRight size={22} color="#737378" />
            </a>

            {/* Facebook */}
            <a
              href={social.facebook.url || 'https://www.facebook.com/starxliveband'}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.85rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                textDecoration: 'none',
                transition: 'color 0.25s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C1121F')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#737378',
                    textTransform: 'uppercase'
                  }}
                >
                  FACEBOOK
                </span>
                <div
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: '#F5F5F7',
                    marginTop: '0.2rem'
                  }}
                >
                  {social.facebook.label}
                </div>
              </div>
              <ArrowUpRight size={22} color="#737378" />
            </a>

            {/* YouTube */}
            <a
              href={social.youtube.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '1.85rem 0',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                textDecoration: 'none',
                transition: 'color 0.25s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#C1121F')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'inherit')}
            >
              <div>
                <span
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    color: '#737378',
                    textTransform: 'uppercase'
                  }}
                >
                  YOUTUBE
                </span>
                <div
                  style={{
                    fontFamily: "'Geist', 'Inter', sans-serif",
                    fontSize: '1.75rem',
                    fontWeight: 700,
                    letterSpacing: '-0.025em',
                    color: '#F5F5F7',
                    marginTop: '0.2rem'
                  }}
                >
                  {social.youtube.label}
                </div>
              </div>
              <ArrowUpRight size={22} color="#737378" />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .connect-grid {
            grid-template-columns: 1fr 1.4fr !important;
            gap: 5rem !important;
          }
        }
      `}</style>
    </section>
  );
};

export default QrConnect;
