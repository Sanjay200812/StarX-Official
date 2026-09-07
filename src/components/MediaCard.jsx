import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon } from 'lucide-react';
import BrandedImage from './BrandedImage';

/**
 * MediaCard Component
 * Displays a concert photo or video thumbnail in the media masonry grid.
 */
export const MediaCard = ({ item, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isVideo = item.type === 'video';

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick(item)}
      className="stage-card"
      style={{
        cursor: 'pointer',
        position: 'relative',
        borderRadius: '12px',
        overflow: 'hidden'
      }}
    >
      <div style={{ position: 'relative', width: '100%' }}>
        <BrandedImage
          src={item.image}
          alt={item.title}
          aspectRatio="16/11"
          fallbackTitle={item.title}
          fallbackSubtitle={item.subtitle || (isVideo ? 'LIVE VIDEO CLIP' : 'STAGE PHOTOGRAPH')}
        />

        {/* Hover Dark Overlay & Red Glow */}
        <motion.div
          animate={{
            opacity: isHovered ? 1 : 0
          }}
          transition={{ duration: 0.25 }}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(180deg, rgba(229, 9, 20, 0.25) 0%, rgba(5, 5, 5, 0.9) 100%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '1.25rem',
            pointerEvents: 'none'
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
            {item.tag || (isVideo ? 'VIDEO' : 'PHOTO')}
          </span>
          <h4
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.4rem',
              letterSpacing: '1px',
              color: '#FFFFFF',
              margin: '0.2rem 0'
            }}
          >
            {item.title}
          </h4>
          <span style={{ fontSize: '0.8rem', color: '#B0B0B0' }}>
            {item.subtitle}
          </span>
        </motion.div>

        {/* Media Type Badge (Top Right) */}
        <div
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            width: '34px',
            height: '34px',
            borderRadius: '50%',
            background: isVideo ? '#FF2A35' : 'rgba(5, 5, 5, 0.75)',
            backdropFilter: 'blur(6px)',
            border: '1px solid rgba(255, 255, 255, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#FFFFFF',
            boxShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          {isVideo ? (
            <Play size={14} fill="#FFF" style={{ marginLeft: '2px' }} />
          ) : (
            <ImageIcon size={14} />
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default MediaCard;
