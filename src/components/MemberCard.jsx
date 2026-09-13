import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mic, Music, Disc } from 'lucide-react';
import BrandedImage from './BrandedImage';

/**
 * MemberCard Component
 * Portrait card displaying StarX musician with 3D tilt, red rim lighting,
 * and dark concert aesthetic.
 */
export const MemberCard = ({ member, onClick }) => {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 30, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -3,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
      }}
      style={{
        position: 'relative',
        cursor: 'pointer'
      }}
      className="stage-card"
    >
      {/* Portrait Image Container: Aspect Ratio 4:5 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '4/5',
          overflow: 'hidden'
        }}
      >
        <motion.div
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          style={{ width: '100%', height: '100%' }}
        >
          <BrandedImage
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            aspectRatio="4/5"
            fallbackTitle={member.name}
            fallbackSubtitle={member.role}
            variant="member"
          />
        </motion.div>

        {/* Heavy Bottom Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 50%, rgba(5, 5, 5, 0.9) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Role Tag Floating at Top */}
        <div
          style={{
            position: 'absolute',
            top: '14px',
            left: '14px',
            padding: '0.3rem 0.75rem',
            backgroundColor: 'rgba(5, 5, 5, 0.85)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(229, 9, 20, 0.4)',
            borderRadius: '4px',
            fontSize: '0.75rem',
            fontWeight: 800,
            letterSpacing: '1.5px',
            color: '#FF2A35',
            textTransform: 'uppercase'
          }}
        >
          {member.role}
        </div>
      </div>

      {/* Member Details */}
      <div
        style={{
          padding: '1.25rem',
          position: 'relative',
          zIndex: 2,
          marginTop: '-2rem'
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}
        >
          <h3
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.75rem',
              letterSpacing: '1.5px',
              color: '#FFFFFF',
              margin: 0
            }}
          >
            {member.name}
          </h3>

          {member.instagram && (
            <a
              href={member.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${member.name} Instagram`}
              style={{
                color: '#888',
                padding: '6px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.05)',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#FF2A35';
                e.currentTarget.style.background = 'rgba(229, 9, 20, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#888';
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              }}
            >
              <Instagram size={16} />
            </a>
          )}
        </div>

        <p
          style={{
            fontSize: '0.85rem',
            color: '#A0A0A0',
            lineHeight: 1.5,
            margin: 0
          }}
        >
          {member.bio || 'Artist information coming soon.'}
        </p>
      </div>
    </motion.div>
  );
};

export default MemberCard;
