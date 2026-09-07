import React from 'react';
import { motion } from 'framer-motion';

/**
 * SectionHeader Component
 * Standardized concert heading layout with badge, rock title, and red underline.
 */
export const SectionHeader = ({
  badge = 'STARX LIVE',
  title,
  subtitle,
  align = 'center',
  className = ''
}) => {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-12 ${className}`}
      style={{
        textAlign: isCenter ? 'center' : 'left',
        display: 'flex',
        flexDirection: 'column',
        alignItems: isCenter ? 'center' : 'flex-start'
      }}
    >
      {badge && (
        <motion.span
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="red-badge"
          style={{ marginBottom: '0.85rem' }}
        >
          {badge}
        </motion.span>
      )}

      {title && (
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rock-title"
          style={{ marginBottom: '0.75rem' }}
        >
          {title}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rock-subtitle"
          style={{
            margin: isCenter ? '0 auto' : '0'
          }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Red Accent Underline */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.25 }}
        style={{
          width: '70px',
          height: '3px',
          background: 'linear-gradient(90deg, #FF2A35, #E50914)',
          marginTop: '1.25rem',
          borderRadius: '2px',
          boxShadow: '0 0 12px rgba(255, 42, 53, 0.7)',
          transformOrigin: isCenter ? 'center' : 'left'
        }}
      />
    </div>
  );
};

export default SectionHeader;
