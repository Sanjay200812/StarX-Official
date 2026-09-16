import React from 'react';
import { siteData } from '../data/siteData';

/**
 * SiteBackground Component
 * Single fixed full-screen background layer behind the ENTIRE site.
 * Switches responsively between Desktop and Mobile StarX backgrounds:
 * - Desktop/Tablet (>= 768px): starx-pc-bg.jpeg
 * - Mobile (<= 767px): starx-mobile-bg.png
 * Features controlled dark overlay (desktop: 0.58, mobile: 0.62) for optimal readability.
 */
export const SiteBackground = () => {
  const desktopBg = siteData.background?.desktop || '/assets/brand/starx-pc-bg.jpeg';
  const mobileBg = siteData.background?.mobile || '/assets/brand/starx-mobile-bg.png';

  return (
    <div className="site-background" aria-hidden="true">
      <picture className="site-background-picture">
        <source media="(max-width: 767px)" srcSet={mobileBg} />
        <source media="(min-width: 768px)" srcSet={desktopBg} />
        <img
          src={desktopBg}
          alt="StarX Live Stage Background"
          className="site-background-image"
          loading="eager"
        />
      </picture>

      {/* Controlled dark overlay calibrated for desktop and mobile */}
      <div className="site-background-overlay" />
    </div>
  );
};

export default SiteBackground;
