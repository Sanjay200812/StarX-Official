import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * CustomCursor Component
 * Desktop-only custom red glow cursor.
 * Disabled on touch screens and prefers-reduced-motion.
 */
export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch or prefers reduced motion
    const touchQuery = window.matchMedia('(hover: none) and (pointer: coarse)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    if (touchQuery.matches || motionQuery.matches) {
      setIsTouch(true);
      return;
    }

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.getAttribute('role') === 'button'
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  return (
    <>
      {/* Outer subtle glow ring */}
      <motion.div
        animate={{
          x: position.x - (isHovered ? 20 : 14),
          y: position.y - (isHovered ? 20 : 14),
          width: isHovered ? 40 : 28,
          height: isHovered ? 40 : 28,
          borderColor: isHovered ? '#FF2A35' : 'rgba(255, 255, 255, 0.4)',
          backgroundColor: isHovered ? 'rgba(229, 9, 20, 0.15)' : 'transparent'
        }}
        transition={{
          type: 'spring',
          damping: 25,
          stiffness: 300,
          mass: 0.2
        }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          borderRadius: '50%',
          borderWidth: '1.5px',
          borderStyle: 'solid',
          pointerEvents: 'none',
          zIndex: 9998
        }}
      />
      {/* Inner precise dot */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          transform: `translate(${position.x - 3}px, ${position.y - 3}px)`,
          width: '6px',
          height: '6px',
          backgroundColor: '#FF2A35',
          borderRadius: '50%',
          boxShadow: '0 0 8px #FF2A35',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'transform 0.05s linear'
        }}
      />
    </>
  );
};

export default CustomCursor;
