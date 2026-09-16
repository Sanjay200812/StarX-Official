import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Play, ArrowRight } from 'lucide-react';
import { siteData, DEMO_PERFORMANCE_URL } from '../data/siteData';
import BrandLogo from '../components/BrandLogo';

/**
 * Hero Section
 * Refined, clean editorial landing with orchestrated GSAP & Framer Motion entrance animations.
 *
 * Sequence specs (Spec 3, 4, 5, 12, 15):
 * 0ms   - Navbar starts appearing
 * 100ms - Hero main title starts (y: 24 -> 0, opacity: 0 -> 1)
 * 100ms - Star crest background motif starts (opacity: 0 -> 0.03, scale: 0.94 -> 1)
 * 150ms - Authentic circular logo starts (y: 18 -> 0, scale: 0.94 -> 1)
 * 250ms - ROCK BAND pill & sub-label start (y: 16 -> 0)
 * 400ms - Tagline starts (y: 16 -> 0)
 * 550ms - CTA buttons start (y: 14 -> 0)
 * 700ms - Genres / languages / location start (y: 12 -> 0)
 * Total duration: ~1.4s
 *
 * Requirements (9, 10, 11, 12, 13, 21-25):
 * - Main timeline created with paused: true
 * - resetHomeAnimation() resets every element to starting coordinates & opacity 0
 * - playHomeAnimationFromStart() restarts the timeline cleanly from 0 (restart(true))
 * - Holds all elements at 0 while isReady is false
 */

export const Hero = ({ onNavigate, isReady = false, animationKey = 0 }) => {
  const { brand } = siteData;

  // DOM element refs for GSAP orchestration
  const sectionRef = useRef(null);
  const crestRef = useRef(null);
  const logoRef = useRef(null);
  const pillRef = useRef(null);
  const titleRef = useRef(null);
  const subLabelRef = useRef(null);
  const taglineRef = useRef(null);
  const buttonsRef = useRef(null);
  const metaRef = useRef(null);
  const timelineRef = useRef(null);
  const isMountedRef = useRef(true);

  // Helper to reset all Hero elements to exact start state (Requirement 10)
  const resetHomeAnimation = () => {
    if (timelineRef.current) {
      timelineRef.current.pause(0);
    }

    const targets = [
      crestRef.current,
      logoRef.current,
      pillRef.current,
      titleRef.current,
      subLabelRef.current,
      taglineRef.current,
      buttonsRef.current,
      metaRef.current
    ].filter(Boolean);

    if (targets.length > 0) {
      gsap.killTweensOf(targets);
    }

    if (crestRef.current) gsap.set(crestRef.current, { opacity: 0, scale: 0.94 });
    if (logoRef.current) gsap.set(logoRef.current, { opacity: 0, y: 18, scale: 0.94 });
    if (pillRef.current) gsap.set(pillRef.current, { opacity: 0, y: 16 });
    if (titleRef.current) gsap.set(titleRef.current, { opacity: 0, y: 24 });
    if (subLabelRef.current) gsap.set(subLabelRef.current, { opacity: 0, y: 16 });
    if (taglineRef.current) gsap.set(taglineRef.current, { opacity: 0, y: 16 });
    if (buttonsRef.current) gsap.set(buttonsRef.current, { opacity: 0, y: 14 });
    if (metaRef.current) gsap.set(metaRef.current, { opacity: 0, y: 12 });
  };

  // Build the GSAP timeline (paused: true, Requirement 9)
  useEffect(() => {
    isMountedRef.current = true;

    // Build timeline
    const tl = gsap.timeline({
      paused: true
    });

    if (crestRef.current) {
      tl.to(crestRef.current, { opacity: 0.03, scale: 1, duration: 1.0, ease: 'power2.out' }, 0.10);
    }
    if (titleRef.current) {
      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out' }, 0.10);
    }
    if (logoRef.current) {
      tl.to(logoRef.current, { opacity: 1, y: 0, scale: 1, duration: 0.65, ease: 'power3.out' }, 0.15);
    }
    if (pillRef.current) {
      tl.to(pillRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.25);
    }
    if (subLabelRef.current) {
      tl.to(subLabelRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.25);
    }
    if (taglineRef.current) {
      tl.to(taglineRef.current, { opacity: 1, y: 0, duration: 0.70, ease: 'power3.out' }, 0.40);
    }
    if (buttonsRef.current) {
      tl.to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.55);
    }
    if (metaRef.current) {
      tl.to(metaRef.current, { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' }, 0.70);
    }

    timelineRef.current = tl;

    // Immediately reset to initial hidden state
    resetHomeAnimation();

    return () => {
      isMountedRef.current = false;
      tl.kill();
    };
  }, []);

  // Orchestrate play / reset according to isReady & animationKey (Requirements 8, 10, 11)
  useEffect(() => {
    if (!isReady) {
      // While intro is active, hold all elements in reset state
      resetHomeAnimation();
    } else {
      // When ready: reset first to guarantee time 0, then restart timeline from 0
      resetHomeAnimation();
      const rafId = requestAnimationFrame(() => {
        if (isMountedRef.current && timelineRef.current) {
          timelineRef.current.restart(true);
        }
      });
      return () => cancelAnimationFrame(rafId);
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
      className={isReady ? 'home-ready' : 'home-waiting'}
      style={{
        position: 'relative',
        minHeight: '80vh',
        backgroundColor: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(4.5rem, 8vw, 6.5rem) 1.5rem clamp(3.5rem, 5vw, 5rem) 1.5rem',
        overflow: 'hidden'
      }}
    >
      {/* Subtle Star Crest Background Motif */}
      <div
        ref={crestRef}
        style={{
          position: 'absolute',
          top: '48%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 'min(80vw, 620px)',
          height: 'min(80vw, 620px)',
          pointerEvents: 'none',
          zIndex: 1,
          opacity: 0
        }}
        aria-hidden="true"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="#B3131B" strokeWidth="1">
          <polygon points="50,4 62,35 95,35 68,55 78,88 50,68 22,88 32,55 5,35 38,35" />
        </svg>
      </div>

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
        {/* Authentic StarX Circular Logo */}
        <div
          ref={logoRef}
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginBottom: '1.15rem',
            opacity: 0
          }}
        >
          <BrandLogo
            size="md"
            style={{
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.6)'
            }}
          />
        </div>

        {/* Pill: • ROCK BAND • HYDERABAD */}
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
            textTransform: 'uppercase',
            opacity: 0
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

        {/* Main Headline: STARX LIVE (48px-58px desktop, 34px-42px mobile) */}
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
              textTransform: 'uppercase',
              opacity: 0
            }}
          >
            STAR<span style={{ color: '#B3131B' }}>X</span> LIVE
          </h1>

          <div
            ref={subLabelRef}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(12px, 1.2vw, 15px)',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#8E8E93',
              textTransform: 'uppercase',
              marginTop: '0.35rem',
              opacity: 0
            }}
          >
            ROCK BAND
          </div>
        </div>

        {/* Tagline: 15px-17px desktop, 14px-15px mobile */}
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
            margin: '0 auto 1.75rem auto',
            opacity: 0
          }}
        >
          “{brand.tagline}”
        </p>

        {/* Hero CTAs */}
        <div
          ref={buttonsRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            flexWrap: 'wrap',
            marginBottom: '2.5rem',
            opacity: 0
          }}
        >
          {/* Watch Performance Button */}
          <button
            type="button"
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

          {/* Contact StarX Button (Navigates directly to /contact view) */}
          <button
            type="button"
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

        {/* Bottom Metadata: 12px-13px desktop, 11px-12px mobile */}
        <div
          ref={metaRef}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.35rem',
            fontSize: 'clamp(11px, 1vw, 12.5px)',
            fontWeight: 500,
            color: '#8E8E93',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            opacity: 0
          }}
        >
          <div style={{ color: '#A1A1A6' }}>{brand.genresDisplay}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <span style={{ color: '#B3131B', fontWeight: 600 }}>{brand.languagesDisplay}</span>
            <span>•</span>
            <span>HYDERABAD</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
