import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, ArrowRight } from 'lucide-react';
import { siteData, DEMO_PERFORMANCE_URL } from '../data/siteData';
import BrandLogo from '../components/BrandLogo';

/**
 * Hero Section
 * Fully restored editorial landing for StarX Live with clean GSAP timeline sequencing.
 *
 * Requirements:
 * 1. Restored full Hero content:
 *    - Top small StarX circular logo
 *    - Small glass pill: • ROCK BAND • HYDERABAD
 *    - Main title: STARX LIVE (STAR white, X red #B3131B, LIVE white)
 *    - Subtitle below: ROCK BAND
 *    - Tagline: Lost in the Noise. Found in the Sound.
 *    - Buttons: Watch Performance & Contact StarX →
 *    - Bottom metadata: CLASSIC • ROCK • WESTERN / TELUGU • HINDI / HYDERABAD
 * 2. Hero container is ALWAYS opacity: 1, visibility: visible (no permanent hiding)
 * 3. Individual child elements start at opacity: 0 and specific offsets
 * 4. Zero ScrollTrigger conflicts (Hero is above the fold)
 * 5. Single GSAP timeline (paused: true)
 * 6. Explicit resetHeroAnimation() and playHeroFromStart() using restart(true)
 * 7. Debug logging: "Hero reset", "Hero play from 0"
 */

export const Hero = ({ onNavigate, isReady = false, animationKey = 0 }) => {
  const { brand } = siteData;

  // Element refs for GSAP orchestration
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const pillRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonsRef = useRef(null);
  const metadataRef = useRef(null);
  const timelineRef = useRef(null);
  const isMountedRef = useRef(true);

  // Helper to reset Hero to exact initial state (Requirement 8)
  const resetHeroAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.pause(0);
    }

    // Explicit initial positions (Requirement 3 & 8)
    if (logoRef.current) gsap.set(logoRef.current, { opacity: 0, y: -12 });
    if (pillRef.current) gsap.set(pillRef.current, { opacity: 0, y: 12 });
    if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 24, scale: 0.985 });
    if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 0, y: 14 });
    if (taglineRef.current) gsap.set(taglineRef.current, { opacity: 0, y: 14 });
    if (buttonsRef.current) gsap.set(buttonsRef.current, { opacity: 0, y: 16 });
    if (metadataRef.current) gsap.set(metadataRef.current, { opacity: 0, y: 12 });
  };

  // Helper to play Hero animation from zero (Requirement 9)
  const playHeroFromStart = () => {
    resetHeroAnimation();

    requestAnimationFrame(() => {
      if (timelineRef.current && isMountedRef.current) {
        timelineRef.current.restart(true);
      }
    });
  };

  // Build the GSAP timeline on mount (Requirements 5, 6, 7)
  useEffect(() => {
    isMountedRef.current = true;

    // Build timeline with paused: true (Requirement 5)
    const tl = gsap.timeline({
      paused: true
    });

    // Sequence (Requirements 6 & 7):
    // 0.00s: logo starts (opacity 0 -> 1, y -12 -> 0)
    // 0.10s: small pill starts (opacity 0 -> 1, y 12 -> 0)
    // 0.20s: STARX LIVE starts (opacity 0 -> 1, y 24 -> 0, scale 0.985 -> 1)
    // 0.35s: ROCK BAND starts (opacity 0 -> 1, y 14 -> 0)
    // 0.48s: tagline starts (opacity 0 -> 1, y 14 -> 0)
    // 0.62s: buttons start (opacity 0 -> 1, y 16 -> 0)
    // 0.78s: metadata starts (opacity 0 -> 1, y 12 -> 0)
    if (logoRef.current) {
      tl.fromTo(logoRef.current, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.00);
    }
    if (pillRef.current) {
      tl.fromTo(pillRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.10);
    }
    if (titleRef.current) {
      tl.fromTo(titleRef.current, { opacity: 0, y: 24, scale: 0.985 }, { opacity: 1, y: 0, scale: 1, duration: 0.75, ease: 'power3.out' }, 0.20);
    }
    if (subtitleRef.current) {
      tl.fromTo(subtitleRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.35);
    }
    if (taglineRef.current) {
      tl.fromTo(taglineRef.current, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.70, ease: 'power3.out' }, 0.48);
    }
    if (buttonsRef.current) {
      tl.fromTo(buttonsRef.current, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.62);
    }
    if (metadataRef.current) {
      tl.fromTo(metadataRef.current, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.78);
    }

    timelineRef.current = tl;

    // Reset to start values immediately
    resetHeroAnimation();

    // If already ready on mount (e.g. session without intro), play immediately
    if (isReady) {
      playHeroFromStart();
    }

    return () => {
      isMountedRef.current = false;
      tl.kill();
    };
  }, []);

  // React to isReady or animationKey changes (Requirements 9, 10, 21, 22)
  useEffect(() => {
    if (!isReady) {
      resetHeroAnimation();
    } else {
      playHeroFromStart();
    }
  }, [isReady, animationKey]);

  const handleWatchPerformance = () => {
    if (DEMO_PERFORMANCE_URL) {
      window.open(DEMO_PERFORMANCE_URL, '_blank', 'noopener,noreferrer');
    }
  };

  const handleContactStarX = () => {
    if (onNavigate) {
      onNavigate('contact', 'view');
    }
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: 'relative',
        minHeight: 'calc(100dvh - 72px)',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4rem, 7vw, 6rem) 1.5rem clamp(3rem, 4vw, 4.5rem) 1.5rem',
        overflow: 'hidden',
        opacity: 1,
        visibility: 'visible'
      }}
    >
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          maxWidth: '860px',
          width: '100%',
          margin: '0 auto'
        }}
      >
        {/* 1. Authentic StarX Circular Logo */}
        <div
          ref={logoRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.25rem'
          }}
        >
          <BrandLogo
            size="md"
            style={{
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
            }}
          />
        </div>

        {/* 2. Glass Pill: • ROCK BAND • HYDERABAD */}
        <div
          ref={pillRef}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '4px 13px',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '999px',
            fontSize: '11px',
            fontWeight: 600,
            color: '#A1A1A6',
            letterSpacing: '0.1em',
            marginBottom: '1.25rem',
            textTransform: 'uppercase'
          }}
        >
          <span
            style={{
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#B3131B'
            }}
          />
          ROCK BAND • HYDERABAD
        </div>

        {/* 3. Main Headline: STARX LIVE & Subtitle: ROCK BAND */}
        <div style={{ marginBottom: '0.75rem' }}>
          <h1
            ref={titleRef}
            style={{
              fontFamily: 'var(--font-editorial)',
              fontSize: 'clamp(34px, 5.2vw, 54px)',
              fontWeight: 650,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: '#F5F5F7',
              margin: '0 auto',
              textTransform: 'uppercase'
            }}
          >
            STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
          </h1>

          <div
            ref={subtitleRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(12px, 1.2vw, 15px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#8E8E93',
              textTransform: 'uppercase',
              marginTop: '0.35rem'
            }}
          >
            ROCK BAND
          </div>
        </div>

        {/* 4. Tagline: Lost in the Noise. Found in the Sound. */}
        <p
          ref={taglineRef}
          style={{
            fontFamily: 'var(--font-editorial)',
            fontStyle: 'italic',
            fontSize: 'clamp(14px, 1.6vw, 16.5px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#D1D1D6',
            lineHeight: 1.45,
            maxWidth: '620px',
            margin: '0 auto 1.75rem auto'
          }}
        >
          “{brand.tagline || 'Lost in the Noise. Found in the Sound.'}”
        </p>

        {/* 5. Hero CTAs: Watch Performance & Contact StarX → */}
        <div
          ref={buttonsRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem'
          }}
        >
          {/* Watch Performance Button */}
          <button
            type="button"
            id="hero-watch-performance-btn"
            onClick={handleWatchPerformance}
            className="btn btn-primary"
            style={{
              height: '40px',
              padding: '0 20px',
              fontSize: '13px',
              fontWeight: 500,
              gap: '0.45rem'
            }}
          >
            <Play size={13} fill="#FFFFFF" />
            <span>Watch Performance</span>
          </button>

          {/* Contact StarX Button (Goes directly to /contact view) */}
          <button
            type="button"
            id="hero-contact-starx-btn"
            onClick={handleContactStarX}
            className="btn btn-glass"
            style={{
              height: '40px',
              padding: '0 20px',
              fontSize: '13px',
              fontWeight: 500,
              gap: '0.45rem'
            }}
          >
            <span>Contact StarX</span>
            <ArrowRight size={13} />
          </button>
        </div>

        {/* 6. Bottom Metadata: CLASSIC • ROCK • WESTERN / TELUGU • HINDI / HYDERABAD */}
        <div
          ref={metadataRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: 'clamp(11px, 1vw, 12.5px)',
            fontWeight: 500,
            color: '#8E8E93',
            letterSpacing: '0.08em',
            textTransform: 'uppercase'
          }}
        >
          <div style={{ color: '#A1A1A6' }}>{brand.genresDisplay || 'CLASSIC • ROCK • WESTERN'}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ color: '#B3131B', fontWeight: 600 }}>{brand.languagesDisplay || 'TELUGU • HINDI'}</span>
            <span>•</span>
            <span>HYDERABAD</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
