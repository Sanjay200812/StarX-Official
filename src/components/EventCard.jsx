import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import BrandedImage from './BrandedImage';

/**
 * EventCard Component
 * Horizontal cinematic card displaying past stage performances & festival appearances.
 * STRICT RULE: No ticket booking, no seat booking.
 */
export const EventCard = ({ event, onViewMedia }) => {
  return (
    <div
      className="stage-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '14px',
        overflow: 'hidden',
        border: '1px solid rgba(255, 255, 255, 0.08)'
      }}
    >
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          alignItems: 'center'
        }}
        className="event-grid"
      >
        {/* Left/Top Event Visual */}
        <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: '200px' }}>
          <BrandedImage
            src={event.image}
            alt={event.eventName}
            aspectRatio="16/9"
            fallbackTitle={event.eventName}
            fallbackSubtitle={`${event.venue} • ${event.location}`}
          />
        </div>

        {/* Right Event Content */}
        <div style={{ padding: '2rem' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: '0.75rem',
              marginBottom: '0.75rem'
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                padding: '0.25rem 0.65rem',
                background: 'rgba(229, 9, 20, 0.12)',
                border: '1px solid rgba(229, 9, 20, 0.3)',
                borderRadius: '4px',
                fontSize: '0.75rem',
                color: '#FF2A35',
                fontWeight: 700,
                letterSpacing: '1px'
              }}
            >
              <Calendar size={12} />
              {event.date || 'PAST PROGRAM'}
            </span>

            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.35rem',
                fontSize: '0.8rem',
                color: '#A0A0A0'
              }}
            >
              <MapPin size={13} color="#FF2A35" />
              {event.venue}, {event.location}
            </span>
          </div>

          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '2rem',
              letterSpacing: '1px',
              color: '#FFFFFF',
              marginBottom: '0.75rem',
              lineHeight: 1.1
            }}
          >
            {event.eventName}
          </h3>

          <p
            style={{
              fontSize: '0.9rem',
              color: '#A0A0A0',
              lineHeight: 1.6,
              marginBottom: '1.5rem'
            }}
          >
            {event.description}
          </p>

          <button
            onClick={() => onViewMedia(event)}
            className="btn btn-outline"
            style={{
              padding: '0.65rem 1.25rem',
              fontSize: '0.8rem'
            }}
          >
            <span>VIEW MOMENT</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .event-grid {
            grid-template-columns: 42% 58% !important;
          }
        }
      `}</style>
    </div>
  );
};

export default EventCard;
