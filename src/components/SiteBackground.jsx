import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { siteData } from '../data/siteData';

/**
 * Section darkness mapping (Section 21 exact calibration):
 * Hero: 0.55
 * About: 0.65
 * Next-Event: 0.60
 * Members: 0.68
 * Performances: 0.62
 * Media: 0.56
 * Events: 0.62
 * Contact: 0.70
 * Connect: 0.68
 * Footer: 0.72
 */
const SECTION_DARKNESS = {
  home: 0.55,
  hero: 0.55,
  about: 0.65,
  'next-event': 0.60,
  members: 0.72,
  performances: 0.62,
  media: 0.56,
  events: 0.62,
  contact: 0.70,
  connect: 0.68,
  footer: 0.72
};

/**
 * SiteBackground Component
 * Single fixed global background layer for the ENTIRE website.
 * Content scrolls above it. Uses the authentic StarX banner image with subtle scroll depth scaling (1.02 -> 1.07),
 * and smoothly evolves the overlay darkness between sections without physically altering the background image.
 */
export const SiteBackground = ({ activeSection = 'home' }) => {
  // Page-level scroll progress for subtle, cinematic depth scaling
  const { scrollYProgress } = useScroll();
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.07]);

  // Dynamic darkness tint calculated from the current in-view section
  const dynamicDarkness = useMemo(() => {
    return SECTION_DARKNESS[activeSection] ?? 0.60;
  }, [activeSection]);

  const bgImage = siteData.hero.desktopImage || '/assets/brand/starx-banner.png';

  return (
    <div className="site-background" aria-hidden="true">
      {/* 1. Global Responsive StarX Concert Image */}
      <motion.img
        src={bgImage}
        alt="StarX Live Concert Background"
        className="site-background-image"
        style={{ scale: backgroundScale }}
      />

      {/* 2. Global Dark Overlay transitioning smoothly across sections (Section 20 & 21) */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: `rgba(0, 0, 0, ${dynamicDarkness})`,
          transition: 'background-color 0.8s cubic-bezier(0.22, 1, 0.36, 1)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
};

export default SiteBackground;
