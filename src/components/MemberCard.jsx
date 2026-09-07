import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, Mic, Music, Disc } from 'lucide-react';
import BrandedImage from './BrandedImage';

/**
 * MemberCard Component
 * Portrait card displaying StarX musician with 3D tilt, red rim lighting,
 * and dark concert aesthetic.
 */
export const MemberCard = ({ member }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle 3D tilt
    setRotate({
      x: -(y / (rect.height / 2)) * 7,
      y: (x / (rect.width / 2)) * 7
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const getRoleIcon = (role = '') => {
    const r = role.toUpperCase();
    if (r.includes('VOCAL')) return Mic;
    if (r.includes('DRUM')) return Disc;
    return Music;
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: isHovered ? 1.03 : 1
      }}
      transition={{ type: 'spring', damping: 22, stiffness: 220, mass: 0.5 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className="stage-card"
    >
      {/* Portrait Image Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '3/4',
          overflow: 'hidden'
        }}
      >
        <BrandedImage
          src={member.image}
          alt={`${member.name} - ${member.role}`}
          aspectRatio="3/4"
          fallbackTitle={member.name}
          fallbackSubtitle={member.role}
          icon={getRoleIcon(member.role)}
        />

        {/* Red Rim Light along top/side edges on hover */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            border: isHovered
              ? '2px solid rgba(255, 42, 53, 0.6)'
              : '2px solid transparent',
            borderRadius: '12px',
            pointerEvents: 'none',
            transition: 'border 0.3s ease'
          }}
        />

        {/* Heavy Bottom Vignette */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 30%, rgba(5, 5, 5, 0.95) 90%)',
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
