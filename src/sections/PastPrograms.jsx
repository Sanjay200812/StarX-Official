import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { siteData } from '../data/siteData';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../components/ScrollReveal';

/**
 * PastPrograms Section (Section 31)
 * "ON THE STAGE."
 * Minimal dark event list with thin dividers rgba(255, 255, 255, 0.10):
 * On hover: event title brightens, small red arrow appears.
 */
export const PastPrograms = ({ onOpenMoment }) => {
  const { events } = siteData;

  return (
    <section
      id="events"
      className="section-standard"
      style={{
        backgroundColor: 'transparent',
        overflow: 'hidden'
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            marginBottom: '3rem'
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
            PERFORMANCE ARCHIVE
          </div>

          <ScrollRevealHeading
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: 'clamp(26px, 2.8vw, 40px)',
              fontWeight: 750,
              letterSpacing: '-0.03em',
              lineHeight: 1.12,
              color: '#F5F5F7',
              margin: '0 0 0.65rem 0'
            }}
          >
            ON THE STAGE
          </ScrollRevealHeading>

          <ScrollRevealParagraph
            style={{
              fontFamily: "var(--font-body)",
              fontSize: 'clamp(14px, 1.05vw, 15.5px)',
              color: '#A1A1A6',
              letterSpacing: '-0.015em',
              margin: 0
            }}
          >
            Previous concerts, collegiate festivals, and public stage appearances.
          </ScrollRevealParagraph>
        </div>

        {/* Clean Minimal List Layout (Section 31) */}
        <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.10)' }}>
          {events.map((event, index) => (
            <EventRow
              key={event.id}
              event={event}
              index={index}
              onOpenMoment={onOpenMoment}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * EventRow Component (Section 31)
 * Thin divider rgba(255, 255, 255, 0.10).
 * On hover: title brightens, small red arrow appears.
 */
const EventRow = ({ event, index, onOpenMoment }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.10)',
        padding: '2.5rem 0',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1.75rem',
        transition: 'background-color 0.25s ease'
      }}
    >
      {/* Left: Index number + Event info */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2.5rem', flexWrap: 'wrap' }}>
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: '1rem',
            fontWeight: 700,
            color: isHovered ? '#B3131B' : '#737378',
            width: '28px',
            transition: 'color 0.25s ease'
          }}
        >
          0{index + 1}
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <div>
            <h3
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: 'clamp(1.5rem, 2.8vw, 2.1rem)',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: isHovered ? '#FFFFFF' : '#F5F5F7',
                margin: '0 0 0.35rem 0',
                lineHeight: 1.2,
                transition: 'color 0.25s ease'
              }}
            >
              {event.eventName}
            </h3>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                color: '#A1A1A6',
                fontSize: '0.92rem'
              }}
            >
              <MapPin size={14} color={isHovered ? '#B3131B' : '#737378'} />
              <span>
                {event.venue}, {event.location}
              </span>
            </div>
          </div>

          {/* Small Red Arrow on Hover (Section 31) */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: isHovered ? 1 : 0, x: isHovered ? 0 : -8 }}
            transition={{ duration: 0.25 }}
            style={{ color: '#B3131B' }}
          >
            <ArrowRight size={18} />
          </motion.div>
        </div>
      </div>

      {/* Right: Date + View Media pill button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            color: '#A1A1A6',
            fontSize: '0.92rem',
            fontWeight: 500
          }}
        >
          <Calendar size={15} color={isHovered ? '#B3131B' : '#737378'} />
          <span>{event.date}</span>
        </div>

        <button
          onClick={() => onOpenMoment(event)}
          className="btn btn-glass"
          style={{
            height: '42px',
            padding: '0 20px',
            fontSize: '13px',
            gap: '0.4rem',
            color: isHovered ? '#FFFFFF' : '#A1A1A6',
            textTransform: 'none'
          }}
        >
          <span>View media</span>
          <ArrowUpRight size={14} />
        </button>
      </div>
    </div>
  );
};

export default PastPrograms;
