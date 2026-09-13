import React, { useState } from 'react';
import { siteData } from '../data/siteData';

/**
 * BrandLogo Component
 * Enforces a PERFECT 1:1 CIRCULAR shape across every device and section.
 * Wraps the logo in an overflow-hidden circular container with aspect-ratio: 1/1,
 * ensuring zero rectangular corners, zero distortion, and perfectly centered artwork.
 *
 * Sizes:
 * - 'xs': 32px
 * - 'sm': 40px (Mobile navbar: ~38-48px)
 * - 'md': 48px (Desktop navbar: ~44-56px)
 * - 'lg': 56px (Footer: ~48-64px)
 * - 'xl': 64px (Hero emblem: perfectly balanced 1:1 circle)
 * - 'intro': responsive clamp(110px, 24vw, 150px)
 */
const SIZE_MAP = {
  xs: '32px',
  sm: '40px',
  md: '48px',
  lg: '56px',
  xl: '64px',
  intro: 'clamp(110px, 24vw, 150px)'
};

export const BrandLogo = ({
  size = 'md',
  className = '',
  style = {},
  imgStyle = {},
  alt = 'StarX Live Official Logo',
  priority = false
}) => {
  const [hasError, setHasError] = useState(false);

  const dimension = typeof size === 'number' 
    ? `${size}px` 
    : (SIZE_MAP[size] || size);

  const logoSrc = siteData?.brand?.logo || '/assets/brand/starx-logo.png';

  return (
    <div
      className={`logo-wrapper logo-size-${typeof size === 'string' ? size : 'custom'} ${className}`}
      style={{
        width: dimension,
        height: dimension,
        minWidth: dimension,
        minHeight: dimension,
        maxWidth: dimension,
        maxHeight: dimension,
        aspectRatio: '1 / 1',
        borderRadius: '50%',
        overflow: 'hidden',
        flexShrink: 0,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        backgroundColor: '#050505',
        ...style
      }}
    >
      {!hasError ? (
        <img
          src={logoSrc}
          alt={alt}
          onError={() => setHasError(true)}
          className="logo-img"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            borderRadius: '50%',
            display: 'block',
            ...imgStyle
          }}
          loading={priority ? 'eager' : 'lazy'}
        />
      ) : (
        <div
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <svg viewBox="0 0 100 100" fill="#B3131B" style={{ width: '55%', height: '55%' }}>
            <polygon points="50,5 63,35 95,36 69,57 78,89 50,70 22,89 31,57 5,36 37,35" />
          </svg>
        </div>
      )}
    </div>
  );
};

export default BrandLogo;
