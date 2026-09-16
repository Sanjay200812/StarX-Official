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
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.08 }}
          className="editorial-heading"
          style={{
            fontSize: 'clamp(26px, 3.2vw, 42px)',
            fontWeight: 600,
            letterSpacing: '-0.015em',
            color: '#F5F5F7',
            marginBottom: '0.65rem'
          }}
        >
          {title}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          style={{
            fontFamily: "var(--font-body)",
            fontSize: 'clamp(13.5px, 1.05vw, 15px)',
            color: '#A1A1A6',
            lineHeight: 1.6,
            letterSpacing: '-0.01em',
            margin: isCenter ? '0 auto' : '0'
          }}
        >
          {subtitle}
        </motion.p>
      )}

      {/* Subtle StarX Red Accent Line */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          width: '28px',
          height: '2px',
          backgroundColor: '#B3131B',
          marginTop: '1rem',
          borderRadius: '1px',
          transformOrigin: isCenter ? 'center' : 'left'
        }}
      />
    </div>
  );
};

export default SectionHeader;
