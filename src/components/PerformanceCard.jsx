import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, MapPin, Calendar, Clock } from 'lucide-react';
import BrandedImage from './BrandedImage';

/**
 * PerformanceCard Component
 * Displays live performance item with subtle 3D tilt, red glow sweep,
 * and click-to-play modal trigger.
 */
export const PerformanceCard = ({ performance, onPlay }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    // Only tilt on desktop hover
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isTouch) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle tilt: max 6 degrees
    setRotate({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 6
    });
  };

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 });
    setIsHovered(false);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      animate={{
        rotateX: rotate.x,
        rotateY: rotate.y,
        scale: isHovered ? 1.02 : 1
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 200, mass: 0.5 }}
      style={{
        transformStyle: 'preserve-3d',
        perspective: 1000
      }}
      className="stage-card"
    >
      {/* Media Thumbnail Container */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          cursor: 'pointer'
        }}
        onClick={() => onPlay(performance)}
      >
        <BrandedImage
          src={performance.thumbnail}
          alt={performance.title}
          aspectRatio="16/9"
          fallbackTitle={performance.title}
          fallbackSubtitle={performance.subtitle || 'LIVE STAGE SET'}
        />

        {/* Darkened Gradient Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, transparent 40%, rgba(10, 10, 10, 0.95) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Big Play Button Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none'
          }}
        >
          <motion.div
            animate={{
              scale: isHovered ? 1.15 : 1,
              backgroundColor: isHovered ? '#FF2A35' : 'rgba(15, 15, 15, 0.75)'
            }}
            transition={{ duration: 0.2 }}
            style={{
              width: '58px',
              height: '58px',
              borderRadius: '50%',
              border: '2px solid #FF2A35',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#FFFFFF',
              boxShadow: isHovered
                ? '0 0 25px rgba(255, 42, 53, 0.8)'
                : '0 4px 15px rgba(0, 0, 0, 0.6)'
            }}
          >
            <Play size={24} fill="#FFFFFF" style={{ marginLeft: '3px' }} />
          </motion.div>
        </div>

        {/* Live Duration Badge */}
        {performance.duration && (
          <div
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '0.25rem 0.6rem',
              backgroundColor: 'rgba(5, 5, 5, 0.85)',
              backdropFilter: 'blur(6px)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '4px',
              fontSize: '0.75rem',
              color: '#FFF',
              fontWeight: 600
            }}
          >
            <Clock size={12} color="#FF2A35" />
            {performance.duration}
          </div>
        )}
      </div>

      {/* Card Info Details */}
      <div style={{ padding: '1.5rem', position: 'relative', zIndex: 2 }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}
        >
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '1.5px',
              color: '#FF2A35',
              textTransform: 'uppercase'
            }}
          >
            STARX LIVE
          </span>
          <span style={{ color: '#444' }}>•</span>
          <span style={{ fontSize: '0.75rem', color: '#888' }}>
            {performance.date || 'Concert'}
          </span>
        </div>

        <h3
          style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: '1.6rem',
            color: '#FFFFFF',
            marginBottom: '0.4rem',
            letterSpacing: '1px'
          }}
        >
          {performance.title}
        </h3>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#A0A0A0',
            fontSize: '0.85rem',
            marginBottom: '1.25rem'
          }}
        >
          <MapPin size={14} color="#FF2A35" />
          <span>{performance.venue}</span>
        </div>

        {/* Watch Button */}
        <button
          onClick={() => onPlay(performance)}
          className="btn btn-outline"
          style={{
            width: '100%',
            padding: '0.7rem 1rem',
            fontSize: '0.8rem',
            borderColor: isHovered ? '#FF2A35' : 'rgba(255, 255, 255, 0.12)'
          }}
        >
          <Play size={14} fill="#FF2A35" color="#FF2A35" />
          WATCH PERFORMANCE
        </button>
      </div>
    </motion.div>
  );
};

export default PerformanceCard;
