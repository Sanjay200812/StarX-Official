import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, ArrowRight } from 'lucide-react';
import { siteData, DEMO_PERFORMANCE_URL } from '../data/siteData';
import BrandLogo from '../components/BrandLogo';

/**
 * Hero Section
 * Fully restored editorial landing for StarX Live with clean GSAP timeline sequencing.
 *
 * Rules (Sections 19-33):
 * 1. Mounted and laid out before intro ends (zero layout pop).
 * 2. FIRST ENTRY ONLY:
 *    - Starting offsets:
 *      logo: opacity 0, y -10
 *      pill: opacity 0, y 10
 *      title: opacity 0, y 20
 *      subtitle: opacity 0, y 12
 *      tagline: opacity 0, y 12
 *      buttons: opacity 0, y 14
 *      metadata: opacity 0, y 10
 *    - Plays GSAP timeline from 0 once intro finishes or skip is pressed.
 *    - On complete: triggers onEntryComplete() which marks starxHeroEntryPlayed = true.
 * 3. RETURN VISITS (starxHeroEntryPlayed === true):
 *    - Immediately renders all elements in final state (opacity: 1, transform: none).
 *    - ZERO GSAP timeline is created or played. Instant display.
 * 4. Refined mobile typography & compact button styling.
 */
export const Hero = ({
  onNavigate,
  isReady = false,
  firstEntry = false,
  onEntryComplete
}) => {
  const { brand } = siteData;

  // Element refs
  const sectionRef = useRef(null);
  const logoRef = useRef(null);
  const pillRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonsRef = useRef(null);
  const metadataRef = useRef(null);
  const timelineRef = useRef(null);

  // If returning to home (not first entry), elements are immediately final
  const isFinalState = !firstEntry;

  useEffect(() => {
    // If not first entry, do NOT build or run timeline
    if (isFinalState) {
      const elements = [
        logoRef.current,
        pillRef.current,
        titleRef.current,
        subtitleRef.current,
        taglineRef.current,
        buttonsRef.current,
        metadataRef.current
      ];
      elements.forEach((el) => {
        if (el) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
      return;
    }

    // FIRST ENTRY:
    // Set explicit starting state
    if (logoRef.current) gsap.set(logoRef.current, { opacity: 0, y: -10 });
    if (pillRef.current) gsap.set(pillRef.current, { opacity: 0, y: 10 });
    if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 20 });
    if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 0, y: 12 });
    if (taglineRef.current) gsap.set(taglineRef.current, { opacity: 0, y: 12 });
    if (buttonsRef.current) gsap.set(buttonsRef.current, { opacity: 0, y: 14 });
    if (metadataRef.current) gsap.set(metadataRef.current, { opacity: 0, y: 10 });

    // Only start timeline once intro has finished/skipped
    if (!isReady) return;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        if (onEntryComplete) {
          onEntryComplete();
        }
      }
    });

    if (logoRef.current) {
      tl.to(logoRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.00);
    }
    if (pillRef.current) {
      tl.to(pillRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.10);
    }
    if (titleRef.current) {
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.20);
    }
    if (subtitleRef.current) {
      tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.32);
    }
    if (taglineRef.current) {
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.60, ease: 'power3.out' }, 0.44);
    }
    if (buttonsRef.current) {
      tl.to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.58);
    }
    if (metadataRef.current) {
      tl.to(metadataRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' }, 0.72);
    }

    timelineRef.current = tl;

    // Small delay to ensure intro fade starts smoothly
    const frameId = requestAnimationFrame(() => {
      tl.restart(true);
    });

    return () => {
      cancelAnimationFrame(frameId);
      tl.kill();
    };
  }, [firstEntry, isReady, isFinalState, onEntryComplete]);

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

  // Base style for initial state vs final state
  const getInitialStyle = () => ({
    opacity: isFinalState ? 1 : 0,
    transform: isFinalState ? 'none' : undefined,
    willChange: isFinalState ? 'auto' : 'transform, opacity'
  });

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
        padding: 'clamp(4.5rem, 8vw, 6.5rem) 1.25rem clamp(2.5rem, 4vw, 4rem) 1.25rem',
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
            marginBottom: '1rem',
            ...getInitialStyle()
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
            marginBottom: '1.15rem',
            textTransform: 'uppercase',
            ...getInitialStyle()
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
              fontSize: 'clamp(38px, 10vw, 52px)',
              fontWeight: 650,
              letterSpacing: '-0.02em',
              lineHeight: 1.05,
              color: '#F5F5F7',
              margin: '0 auto',
              textTransform: 'uppercase',
              ...getInitialStyle()
            }}
          >
            STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
          </h1>

          <div
            ref={subtitleRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(12px, 1.2vw, 13px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#8E8E93',
              textTransform: 'uppercase',
              marginTop: '0.35rem',
              ...getInitialStyle()
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
            fontSize: 'clamp(14px, 1.6vw, 16px)',
            fontWeight: 400,
            letterSpacing: '-0.01em',
            color: '#D1D1D6',
            lineHeight: 1.45,
            maxWidth: '600px',
            margin: '0 auto 1.65rem auto',
            ...getInitialStyle()
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
            marginBottom: '2.25rem',
            ...getInitialStyle()
          }}
        >
          {/* Watch Performance Button */}
          <button
            type="button"
            id="hero-watch-performance-btn"
            onClick={handleWatchPerformance}
            className="btn btn-primary hero-action-btn"
            style={{
              padding: '14px 20px',
              fontSize: 'clamp(14px, 1vw, 15px)',
              fontWeight: 500,
              gap: '0.5rem',
              borderRadius: '999px'
            }}
          >
            <Play size={14} fill="#FFFFFF" />
            <span>Watch Performance</span>
          </button>

          {/* Contact StarX Button (Goes directly to /contact view) */}
          <button
            type="button"
            id="hero-contact-starx-btn"
            onClick={handleContactStarX}
            className="btn btn-glass hero-action-btn"
            style={{
              padding: '14px 18px',
              fontSize: 'clamp(14px, 1vw, 15px)',
              fontWeight: 500,
              gap: '0.5rem',
              borderRadius: '999px'
            }}
          >
            <span>Contact StarX</span>
            <ArrowRight size={14} />
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
            fontSize: 'clamp(11px, 1vw, 12px)',
            fontWeight: 500,
            color: '#8E8E93',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            ...getInitialStyle()
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

      <style>{`
        @media (max-width: 420px) {
          .hero-action-btn {
            width: 100%;
            max-width: 280px;
            justify-content: center;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero;
