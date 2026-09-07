import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * ScrollRevealHeading
 * Unified 3D Scroll Reveal for major section headings:
 * Initial:
 *   opacity: 0
 *   translateY: 70px
 *   translateZ: -140px (mobile: -50px)
 *   rotateX: 8deg (mobile: 3.5deg)
 *   scale: 0.95
 *   blur: 5px
 * Final:
 *   opacity: 1
 *   translateY: 0
 *   translateZ: 0
 *   rotateX: 0
 *   scale: 1
 *   blur: 0
 *
 * Perspective: 1400px
 * ScrollTrigger offset: start: "top 92%", end: "top 48%"
 */
export const ScrollRevealHeading = ({
  children,
  as = 'h2',
  className = '',
  style = {},
  perspective = 1400
}) => {
  const containerRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 92%', 'start 48%']
  });

  const zDistance = isMobile ? -50 : -140;
  const rxDegrees = isMobile ? 3.5 : 8;

  const opacity = useTransform(scrollYProgress, [0, 0.75], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [70, 0]);
  const z = useTransform(scrollYProgress, [0, 1], [zDistance, 0]);
  const rotateX = useTransform(scrollYProgress, [0, 1], [rxDegrees, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);
  const blurNum = useTransform(scrollYProgress, [0, 0.85], [5, 0]);
  const filter = useTransform(blurNum, (v) => (v > 0.2 ? `blur(${v}px)` : 'none'));

  const MotionComponent = motion[as] || motion.h2;

  return (
    <div
      ref={containerRef}
      style={{
        perspective: `${perspective}px`,
        transformStyle: 'preserve-3d',
        display: 'inline-block',
        width: '100%',
        position: 'relative'
      }}
    >
      <MotionComponent
        className={className}
        style={{
          ...style,
          opacity,
          y,
          z,
          rotateX,
          scale,
          filter,
          transformPerspective: perspective,
          willChange: 'transform, opacity, filter'
        }}
      >
        {children}
      </MotionComponent>
    </div>
  );
};

/**
 * ScrollRevealParagraph
 * Simpler paragraph scroll reveal:
 * Initial:
 *   opacity: 0
 *   translateY: 28px
 * Final:
 *   opacity: 1
 *   translateY: 0
 */
export const ScrollRevealParagraph = ({
  children,
  className = '',
  style = {}
}) => {
  const pRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: pRef,
    offset: ['start 90%', 'start 52%']
  });

  const opacity = useTransform(scrollYProgress, [0, 0.8], [0, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [28, 0]);

  return (
    <motion.p
      ref={pRef}
      className={className}
      style={{
        ...style,
        position: 'relative',
        opacity,
        y,
        willChange: 'transform, opacity'
      }}
    >
      {children}
    </motion.p>
  );
};

export default ScrollRevealHeading;
