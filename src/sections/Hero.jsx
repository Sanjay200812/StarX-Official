import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight } from 'lucide-react';
import { siteData, DEMO_PERFORMANCE_URL } from '../data/siteData';
import BrandLogo from '../components/BrandLogo';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero Section — rock stage blast.
 *
 * Entry (first visit only, after the intro finishes):
 *   lights sweep up → tape label rips in → STARX letters drop from above and
 *   slam into place with a screen shake + red flash → LIVE strokes in →
 *   scrawled tagline appears and its underline draws → CTAs and meta pop.
 * Return visits render the final state instantly (no timeline).
 *
 * Scroll: the title block rushes toward the camera and dissolves, as if you
 * are flying into the 3D stage behind it.
 */
export const Hero = ({ onNavigate, isReady = false, firstEntry = false, onEntryComplete }) => {
  const { brand } = siteData;

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const beamsRef = useRef(null);
  const flashRef = useRef(null);
  const labelRef = useRef(null);
  const titleRef = useRef(null);
  const liveRef = useRef(null);
  const taglineRef = useRef(null);
  const scribbleRef = useRef(null);
  const buttonsRef = useRef(null);
  const metaRef = useRef(null);
  const cueRef = useRef(null);

  const isFinalState = !firstEntry;
  const letters = ['S', 'T', 'A', 'R', 'X'];

  // Entry timeline
  useEffect(() => {
    const chars = titleRef.current ? titleRef.current.querySelectorAll('.hero-char') : [];
    const pieces = [labelRef.current, liveRef.current, taglineRef.current, buttonsRef.current, metaRef.current, cueRef.current];
    const path = scribbleRef.current;
    const pathLen = path ? path.getTotalLength() : 0;

    if (isFinalState) {
      gsap.set([...chars, ...pieces, beamsRef.current], { clearProps: 'opacity,transform,clipPath,filter' });
      if (path) gsap.set(path, { strokeDasharray: pathLen, strokeDashoffset: 0 });
      return undefined;
    }

    gsap.set(beamsRef.current, { opacity: 0 });
    gsap.set(labelRef.current, { clipPath: 'inset(0 100% 0 0)' });
    gsap.set(chars, { yPercent: -160, opacity: 0, scale: 2.4, rotate: () => gsap.utils.random(-25, 25) });
    gsap.set(liveRef.current, { opacity: 0, scaleX: 1.8, filter: 'blur(12px)' });
    gsap.set(taglineRef.current, { opacity: 0, y: 20, rotate: -8 });
    gsap.set([buttonsRef.current, metaRef.current, cueRef.current], { opacity: 0, y: 26 });
    if (path) gsap.set(path, { strokeDasharray: pathLen, strokeDashoffset: pathLen });

    if (!isReady) return undefined;

    const tl = gsap.timeline({ paused: true, onComplete: () => onEntryComplete && onEntryComplete() });

    tl.to(beamsRef.current, { opacity: 1, duration: 0.8, ease: 'power2.out' }, 0)
      .to(labelRef.current, { clipPath: 'inset(0 0% 0 0)', duration: 0.55, ease: 'power4.out' }, 0.1)
      .to(
        chars,
        {
          yPercent: 0,
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.55,
          ease: 'power4.in',
          stagger: 0.08
        },
        0.25
      )
      // impact: shake + red flash
      .to(flashRef.current, { opacity: 0.55, duration: 0.06 }, 0.25 + 0.55 + 0.32)
      .to(flashRef.current, { opacity: 0, duration: 0.5, ease: 'power2.out' }, '>')
      .fromTo(
        stageRef.current,
        { x: 0, y: 0 },
        {
          keyframes: [
            { x: -10, y: 6, duration: 0.05 },
            { x: 9, y: -5, duration: 0.05 },
            { x: -6, y: 3, duration: 0.05 },
            { x: 4, y: -2, duration: 0.05 },
            { x: 0, y: 0, duration: 0.06 }
          ],
          clearProps: 'transform'
        },
        0.25 + 0.55 + 0.32
      )
      .to(liveRef.current, { opacity: 1, scaleX: 1, filter: 'blur(0px)', duration: 0.6, ease: 'expo.out', clearProps: 'filter' }, 1.15)
      .to(taglineRef.current, { opacity: 1, y: 0, rotate: -2, duration: 0.6, ease: 'back.out(2.5)' }, 1.35);

    if (path) tl.to(path, { strokeDashoffset: 0, duration: 0.7, ease: 'power2.inOut' }, 1.6);

    tl.to(buttonsRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'back.out(2)' }, 1.75)
      .to(metaRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 1.9)
      .to(cueRef.current, { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, 2.05);

    const frameId = requestAnimationFrame(() => tl.restart(true));
    return () => {
      cancelAnimationFrame(frameId);
      tl.kill();
    };
  }, [firstEntry, isReady, isFinalState, onEntryComplete]);

  // Scroll-scrubbed exit
  useLayoutEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 0.5 }
      });
      // Fly forward into the stage: the title rushes past the camera
      tl.to(titleRef.current, { letterSpacing: '0.2em', ease: 'none' }, 0)
        .to(stageRef.current, { scale: 1.9, opacity: 0, filter: 'blur(6px)', ease: 'power1.in' }, 0)
        .to(beamsRef.current, { yPercent: -25, opacity: 0.2, ease: 'none' }, 0)
        .to(cueRef.current, { opacity: 0, y: 30, ease: 'none' }, 0);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleWatchPerformance = () => {
    if (DEMO_PERFORMANCE_URL) window.open(DEMO_PERFORMANCE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleContactStarX = () => {
    if (onNavigate) onNavigate('contact', 'view');
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      style={{
        position: 'relative',
        minHeight: 'calc(100dvh - 76px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(3rem, 6vw, 5rem) 1rem clamp(5rem, 9vh, 7rem)',
        overflow: 'hidden',
        perspective: '1200px'
      }}
    >
      {/* Stage light beams */}
      <div ref={beamsRef} className="rock-beams" aria-hidden="true">
        <div className="rock-beam" />
        <div className="rock-beam is-red" />
        <div className="rock-beam" />
      </div>

      {/* Impact flash */}
      <div
        ref={flashRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 45%, #FF2A2F, rgba(232,20,28,0.4) 40%, transparent 70%)',
          opacity: 0,
          pointerEvents: 'none',
          zIndex: 1,
          mixBlendMode: 'screen'
        }}
      />

      <div
        ref={stageRef}
        style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          transformOrigin: '50% 30%'
        }}
      >
        {/* Tape label */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 'clamp(0.75rem, 2vw, 1.25rem)' }}>
          <div ref={labelRef} className="label-accent" data-rock-fx="1" style={{ alignItems: 'center', gap: '0.6rem' }}>
            <BrandLogo size={22} style={{ boxShadow: 'none' }} />
            Live Rock Band ★ Hyderabad
          </div>
        </div>

        {/* STARX */}
        <h1 ref={titleRef} className="rock-hero-title" aria-label="StarX Live — Rock Band">
          {letters.map((l, i) => (
            <span
              key={l + i}
              className={`hero-char rock-glitch ${l === 'X' ? 'is-x' : ''}`}
              data-text={l}
              style={{ display: 'inline-block' }}
              aria-hidden="true"
            >
              {l}
            </span>
          ))}
        </h1>

        {/* LIVE / ROCK BAND */}
        <div ref={liveRef} className="rock-hero-live" aria-hidden="true">
          <span className="rule" />
          <span className="live-word">LIVE</span>
          <span className="rule" />
        </div>
        <div className="rock-hero-live" style={{ marginTop: '0.5rem' }} aria-hidden="true">
          <span className="band-word">Rock Band</span>
        </div>

        {/* Scrawled tagline */}
        <div>
          <p ref={taglineRef} className="rock-hero-tagline">
            {brand.tagline || 'Lost in the Noise. Found in the Sound.'}
            <svg viewBox="0 0 400 24" preserveAspectRatio="none" aria-hidden="true">
              <path
                ref={scribbleRef}
                d="M4 14 C 60 4, 120 22, 190 10 S 320 4, 396 12"
                fill="none"
                stroke="#E8141C"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </p>
        </div>

        {/* CTAs */}
        <div
          ref={buttonsRef}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
            flexWrap: 'wrap',
            marginBottom: 'clamp(1.5rem, 3vw, 2.25rem)'
          }}
        >
          <button
            type="button"
            id="hero-watch-performance-btn"
            onClick={handleWatchPerformance}
            className="btn btn-primary hero-action-btn"
            style={{ height: '54px', padding: '0 30px', fontSize: '15px', gap: '0.6rem' }}
          >
            <Play size={15} fill="#FFFFFF" />
            <span>Watch Performance</span>
          </button>

          <button
            type="button"
            id="hero-contact-starx-btn"
            onClick={handleContactStarX}
            className="btn btn-glass hero-action-btn"
            style={{ height: '54px', padding: '0 28px', fontSize: '15px', gap: '0.6rem' }}
          >
            <span>Book StarX</span>
            <ArrowRight size={15} />
          </button>
        </div>

        {/* Meta */}
        <div ref={metaRef} className="rock-hero-meta">
          <span className="rock-eq" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          <span>{brand.genresDisplay || 'CLASSIC • ROCK • WESTERN'}</span>
          <b>{brand.languagesDisplay || 'TELUGU • HINDI'}</b>
          <span>Hyderabad</span>
        </div>
      </div>

      {/* Scroll cue */}
      <div ref={cueRef} className="rock-scroll-cue" aria-hidden="true">
        <span>Scroll to turn it up</span>
        <span className="pick" />
      </div>

      <style>{`
        @media (max-width: 420px) {
          .hero-action-btn { width: 100%; max-width: 300px; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
