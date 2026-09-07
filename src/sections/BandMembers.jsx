import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteData } from '../data/siteData';
import BrandedImage from '../components/BrandedImage';
import { ScrollRevealHeading, ScrollRevealParagraph } from '../components/ScrollReveal';

/**
 * BandMembers Section
 * "MEET STARX."
 * Large photography portrait cards with 24px border radius.
 * Staggered scroll reveals: translateY(50px -> 0), translateZ(-70px -> 0), scale(0.96 -> 1), opacity(0 -> 1).
 * Smooth 650ms hover zoom (1.025x) and subtle card translate (0 -> -4px).
 */
export const BandMembers = ({ onSelectMember }) => {
  const { members } = siteData;

  return (
    <section
      id="members"
      style={{
        backgroundColor: '#050505',
        padding: '12rem 2rem 10rem 2rem',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '5.5rem' }}>
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
            THE BAND
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
            MEET STARX.
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
            The musicians behind the sound.
          </ScrollRevealParagraph>
        </div>

        {/* Responsive Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2.5rem'
          }}
        >
          {members.map((member, idx) => (
            <MemberCard
              key={member.id}
              member={member}
              index={idx}
              onClick={() => onSelectMember(member)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

/**
 * MemberCard Component
 * Staggered scroll reveal: translateY(50px -> 0), translateZ(-70px -> 0), scale(0.96 -> 1), opacity(0 -> 1)
 * Desktop hover: image scale 1 -> 1.025 over 650ms, card translate upward 0 -> -4px
 */
const MemberCard = ({ member, index, onClick }) => {
  const cardRef = useRef(null);

  // Subtle stagger across cards
  const offsetStart = 92 - index * 3;
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: [`start ${offsetStart}%`, 'start 50%']
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [50, 0]);
  const imageZ = useTransform(scrollYProgress, [0, 1], [-70, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [0.96, 1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.75], [0, 1]);

  // Name & role emergence
  const nameY = useTransform(scrollYProgress, [0.18, 1], [30, 0]);
  const nameOpacity = useTransform(scrollYProgress, [0.18, 0.85], [0, 1]);
  const roleOpacity = useTransform(scrollYProgress, [0.28, 0.95], [0, 1]);

  return (
    <div
      ref={cardRef}
      onClick={onClick}
      style={{
        position: 'relative',
        perspective: '1400px',
        transformStyle: 'preserve-3d',
        cursor: 'pointer'
      }}
    >
      {/* Portrait Image Canvas */}
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        style={{
          width: '100%',
          aspectRatio: '3/4',
          borderRadius: '24px',
          overflow: 'hidden',
          backgroundColor: '#0D0D0F',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.55)',
          y: imageY,
          z: imageZ,
          scale: imageScale,
          opacity: imageOpacity,
          transformPerspective: 1400,
          willChange: 'transform, opacity',
          position: 'relative'
        }}
      >
        <motion.div
          whileHover={{ scale: 1.025 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%' }}
        >
          <BrandedImage
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            aspectRatio="3/4"
            fallbackTitle={member.name}
            fallbackSubtitle={member.role}
            variant="member"
            objectPosition="center top"
          />
        </motion.div>

        {/* Subtle dark gradient overlay at bottom for optimal contrast (Section 25) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 60%, rgba(5, 5, 5, 0.85) 100%)',
            pointerEvents: 'none'
          }}
        />
      </motion.div>

      {/* Card Details: Name & Role (Section 25) */}
      <div style={{ padding: '1.25rem 0.5rem 0 0.5rem' }}>
        <motion.h3
          style={{
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontSize: '1.45rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: '#F5F5F7',
            margin: '0 0 0.3rem 0',
            y: nameY,
            opacity: nameOpacity,
            willChange: 'transform, opacity'
          }}
        >
          {member.name}
        </motion.h3>

        <motion.span
          style={{
            display: 'block',
            fontFamily: "'Geist', 'Inter', sans-serif",
            fontSize: '0.85rem',
            fontWeight: 500,
            letterSpacing: '0.06em',
            color: '#A1A1A6',
            textTransform: 'uppercase',
            opacity: roleOpacity
          }}
        >
          {member.role}
        </motion.span>
      </div>
    </div>
  );
};

export default BandMembers;
