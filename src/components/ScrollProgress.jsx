import React from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgress Component
 * Shows a subtle, sleek red progress bar at the very top of the window.
 */
export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <motion.div
      style={{
        scaleX,
        transformOrigin: '0%',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: '3px',
        background: 'linear-gradient(90deg, #E50914 0%, #FF2A35 70%, #FFFFFF 100%)',
        boxShadow: '0 0 10px rgba(255, 42, 53, 0.8), 0 0 20px rgba(229, 9, 20, 0.4)',
        zIndex: 9999,
        pointerEvents: 'none'
      }}
    />
  );
};

export default ScrollProgress;
