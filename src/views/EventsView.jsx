import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Bell, Instagram } from 'lucide-react';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';

/**
 * EventsView Component
 * Dedicated "/events" page view.
 * "STAGE & EVENTS"
 *
 * Specifications:
 * - Bodoni Moda for heading
 * - NEXT PERFORMANCE: COMING SOON / Follow StarX for updates (no fake date/venue).
 * - Archive highlights of previous stage performances.
 * - Back to Home button.
 */
export const EventsView = ({ onBackHome }) => {
  const { events, social } = siteData;

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
            CONCERT SCHEDULE & SHOWCASES
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
            STAGE & EVENTS
          </h1>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(14px, 1.1vw, 15.5px)',
              color: '#A1A1A6',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6
            }}
          >
            Concert tour updates, live stage announcements, and highlights from recent performances.
          </p>
        </div>

        {/* 1. Next Performance Showcase: Coming Soon (Spec 35) */}
        <div
          style={{
            backgroundColor: 'rgba(14, 14, 18, 0.72)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: 'clamp(2rem, 4vw, 3.25rem)',
            textAlign: 'center',
            marginBottom: '4rem',
            boxShadow: '0 24px 60px rgba(0, 0, 0, 0.45)'
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '5px 14px',
              borderRadius: '999px',
              backgroundColor: 'rgba(179, 19, 27, 0.15)',
              border: '1px solid rgba(179, 19, 27, 0.35)',
              color: '#FFFFFF',
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              marginBottom: '1.25rem'
            }}
          >
            <Calendar size={12} style={{ color: '#B3131B' }} />
            <span>UPCOMING SHOWCASE</span>
          </div>

          <h2
            className="editorial-heading"
            style={{
              fontSize: 'clamp(28px, 3.6vw, 42px)',
              fontWeight: 600,
              letterSpacing: '-0.015em',
              color: '#F5F5F7',
              margin: '0 0 0.5rem 0',
              lineHeight: 1.15
            }}
          >
            NEXT PERFORMANCE
          </h2>

          <div
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(14px, 1.4vw, 17px)',
              fontWeight: 600,
              color: '#B3131B',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '1rem'
            }}
          >
            COMING SOON
          </div>

          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(14px, 1.05vw, 15px)',
              color: '#A1A1A6',
              maxWidth: '520px',
              margin: '0 auto 1.75rem auto',
              lineHeight: 1.6
            }}
          >
            Tour dates and venue announcements are currently being finalized. Follow StarX Live on official social channels for upcoming stage releases.
          </p>

          <a
            href={social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            style={{ height: '40px', padding: '0 20px', fontSize: '13px', display: 'inline-flex' }}
          >
            <Instagram size={14} />
            <span>Follow for Updates</span>
          </a>
        </div>

        {/* 2. Previous Stage Highlights */}
        <div>
          <h3
            style={{
              fontFamily: "var(--font-body)",
              fontSize: '18px',
              fontWeight: 650,
              letterSpacing: '-0.015em',
              color: '#F5F5F7',
              marginBottom: '1.5rem'
            }}
          >
            Recent Stage Highlights
          </h3>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {events.map((ev) => (
              <div
                key={ev.id}
                style={{
                  backgroundColor: 'rgba(14, 14, 18, 0.65)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px',
                  overflow: 'hidden'
                }}
              >
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10' }}>
                  <BrandedImage
                    src={ev.image}
                    alt={ev.eventName}
                    aspectRatio="16/10"
                    objectFit="cover"
                  />
                </div>

                <div style={{ padding: '1.25rem' }}>
                  <div
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.08em',
                      color: '#B3131B',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem'
                    }}
                  >
                    {ev.location}
                  </div>
                  <h4
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: '16px',
                      fontWeight: 600,
                      letterSpacing: '-0.015em',
                      color: '#F5F5F7',
                      margin: '0 0 0.35rem 0'
                    }}
                  >
                    {ev.eventName}
                  </h4>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: '13px', color: '#8E8E93', margin: 0, lineHeight: 1.5 }}>
                    {ev.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default EventsView;
