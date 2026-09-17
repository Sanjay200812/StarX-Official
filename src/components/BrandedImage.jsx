import React, { useState } from 'react';

/**
 * BrandedImage Component (Section 12, 23, 27)
 * Premium dark visual container (#0D0D0F).
 * Renders real photograph when present, or an ultra-clean smoked dark surface with
 * the StarX emblem, subtle border, and Geist/Inter typography.
 * Supports member placeholder variant with dark charcoal background, subtle glass effect,
 * large faint StarX star, and clean silhouette/symbol.
 */
export const BrandedImage = ({
  src,
  alt = 'StarX Live',
  aspectRatio = '16/9',
  fallbackTitle = 'STARX LIVE',
  fallbackSubtitle = 'STAGE ARCHIVE • HYDERABAD',
  className = '',
  style = {},
  objectFit = 'cover',
  objectPosition = 'center center',
  variant = 'default', // 'default' | 'member'
  priority = false
}) => {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [hasError, setHasError] = useState(!src);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = React.useRef(null);

  React.useEffect(() => {
    setCurrentSrc(src);
    setHasError(!src);

    if (!src) {
      setIsLoaded(false);
      return;
    }

    // Check if image is already cached/complete in DOM
    if (imgRef.current && imgRef.current.complete && imgRef.current.naturalWidth > 0) {
      setIsLoaded(true);
    } else {
      setIsLoaded(false);
    }
  }, [src]);

  const handleImageError = () => {
    setHasError(true);
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${className}`}
      style={{
        aspectRatio,
        backgroundColor: '#0D0D0F',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        position: 'relative',
        ...style
      }}
    >
      {/* Underlying Clean StarX Placeholder */}
      {(hasError || variant === 'member') && (
        variant === 'member' ? (
        /* Member Specific Placeholder (Section 12): dark charcoal, glass, large faint star, clean silhouette */
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0D0D10',
            backgroundImage:
              'radial-gradient(circle at 50% 35%, #18181D 0%, #0D0D10 70%, #08080A 100%)',
            padding: '2rem 1.5rem',
            textAlign: 'center',
            color: '#F5F5F7',
            overflow: 'hidden'
          }}
        >
          {/* Large faint StarX star in background (Section 12) */}
          <div
            style={{
              position: 'absolute',
              top: '42%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '85%',
              height: '85%',
              opacity: 0.04,
              pointerEvents: 'none'
            }}
          >
            <svg viewBox="0 0 100 100" fill="#B3131B">
              <polygon points="50,4 62,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 38,35" />
            </svg>
          </div>

          {/* Clean Glass Silhouette Shape (Section 12) */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              width: '84px',
              height: '84px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1.5rem',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5)'
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="#A1A1A6"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              style={{ width: '38px', height: '38px', opacity: 0.7 }}
            >
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
          </div>

          {/* Member Name / Number */}
          {fallbackTitle ? (
            <span
              style={{
                position: 'relative',
                zIndex: 2,
                fontFamily: "var(--font-heading)",
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#F5F5F7',
                marginBottom: '0.35rem'
              }}
            >
              {fallbackTitle}
            </span>
          ) : null}

          {/* Member Role */}
          {fallbackSubtitle ? (
            <span
              style={{
                position: 'relative',
                zIndex: 2,
                fontFamily: "var(--font-body)",
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.08em',
                color: '#B3131B',
                textTransform: 'uppercase'
              }}
            >
              {fallbackSubtitle}
            </span>
          ) : null}
        </div>
      ) : (
        /* Premium Smoked Dark Surface Placeholder (Section 27) */
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0D0D0F',
            backgroundImage:
              'radial-gradient(circle at 50% 40%, #161619 0%, #0D0D0F 65%, #08080A 100%)',
            padding: '2rem',
            textAlign: 'center',
            color: '#F5F5F7'
          }}
        >
          {/* Subtle StarX Symbol (Rock-solid inline SVG) */}
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              backgroundColor: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '1rem'
            }}
          >
            <svg viewBox="0 0 100 100" fill="#B3131B" style={{ width: '22px', height: '22px' }}>
              <polygon points="50,5 63,35 95,36 69,57 78,89 50,70 22,89 31,57 5,36 37,35" />
            </svg>
          </div>

          <span
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: '0.95rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: '#F5F5F7',
              marginBottom: '0.3rem'
            }}
          >
            {fallbackTitle}
          </span>

          <span
            style={{
              fontFamily: "var(--font-body)",
              fontSize: '0.75rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              color: '#737378',
              textTransform: 'uppercase'
            }}
          >
            {fallbackSubtitle}
          </span>
        </div>
      ))}

      {/* Real Image Layer */}
      {!hasError && currentSrc ? (
        <img
          ref={imgRef}
          src={currentSrc}
          alt={alt}
          decoding="async"
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setIsLoaded(true)}
          onError={handleImageError}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit,
            objectPosition,
            display: 'block',
            zIndex: 2,
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }}
        />
      ) : null}
    </div>
  );
};

export default BrandedImage;

