import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Play, ArrowRight } from 'lucide-react';
import { siteData, DEMO_PERFORMANCE_URL } from '../data/siteData';

gsap.registerPlugin(ScrollTrigger);

/**
 * Hero — the stage.
 *
 * First visit (after the intro): lights come up, the kicker fades in, the
 * STARX letters rise out of a mask one by one, the red X lands with a single
 * flash of stage light, then the sub-line, copy, buttons and footer settle in.
 * Return visits render the final state instantly.
 *
 * On scroll the title block eases back and fades while the lights drift up,
 * scrubbed through Lenis so it stays perfectly smooth.
 */
export const Hero = ({ onNavigate, isReady = false, firstEntry = false, onEntryComplete }) => {
  const { brand } = siteData;

  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const beamsRef = useRef(null);
  const glowRef = useRef(null);
  const kickerRef = useRef(null);
  const titleRef = useRef(null);
  const subRef = useRef(null);
  const taglineRef = useRef(null);
  const actionsRef = useRef(null);
  const footerRef = useRef(null);

  const isFinalState = !firstEntry;
  const letters = ['S', 'T', 'A', 'R', 'X'];

  useEffect(() => {
    const chars = titleRef.current ? titleRef.current.querySelectorAll('.ch') : [];
    const rules = subRef.current ? subRef.current.querySelectorAll('.rule') : [];
    const fades = [kickerRef.current, subRef.current, taglineRef.current, actionsRef.current, footerRef.current];

    if (isFinalState) {
      gsap.set([...chars, ...rules, ...fades, beamsRef.current, glowRef.current], {
        clearProps: 'opacity,transform,visibility'
      });
      return undefined;
    }

    gsap.set([beamsRef.current, glowRef.current], { opacity: 0 });
    gsap.set(chars, { yPercent: 110 });
    gsap.set(rules, { scaleX: 0 });
    gsap.set(fades, { opacity: 0, y: 24 });

    if (!isReady) return undefined;

    const tl = gsap.timeline({
      paused: true,
      defaults: { ease: 'expo.out' },
      onComplete: () => onEntryComplete && onEntryComplete()
    });

    tl.to(beamsRef.current, { opacity: 1, duration: 1.6, ease: 'power2.out' }, 0)
      .to(kickerRef.current, { opacity: 1, y: 0, duration: 1 }, 0.15)
      .to(chars, { yPercent: 0, duration: 1.3, stagger: 0.075 }, 0.25)
      // the X lands: one warm flash of red light
      .fromTo(glowRef.current, { opacity: 0, scale: 0.7 }, { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }, 0.75)
      .to(subRef.current, { opacity: 1, y: 0, duration: 1 }, 0.85)
      .to(rules, { scaleX: 1, duration: 1.2, ease: 'power4.inOut' }, 0.85)
      .to(taglineRef.current, { opacity: 1, y: 0, duration: 1 }, 1.0)
      .to(actionsRef.current, { opacity: 1, y: 0, duration: 1 }, 1.12)
      .to(footerRef.current, { opacity: 1, y: 0, duration: 1 }, 1.3);

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
      gsap
        .timeline({
          defaults: { ease: 'none' },
          scrollTrigger: { trigger: sectionRef.current, start: 'top top', end: 'bottom top', scrub: 1 }
        })
        .to(stageRef.current, { yPercent: 18, scale: 0.92, autoAlpha: 0.1 }, 0)
        .to(titleRef.current, { letterSpacing: '0.06em' }, 0)
        .to(beamsRef.current, { yPercent: -20 }, 0)
        .to(footerRef.current, { autoAlpha: 0, y: 30 }, 0);
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
    <section ref={sectionRef} id="home" className="rock-hero">
      <div ref={beamsRef} className="rock-beams" aria-hidden="true">
        <div className="rock-beam" />
        <div className="rock-beam is-red" />
        <div className="rock-beam" />
      </div>
      <div ref={glowRef} className="rock-hero-glow" aria-hidden="true" />

      <div ref={stageRef} className="rock-hero-stage">
        <div ref={kickerRef} className="rock-hero-kicker">
          <span className="dot" aria-hidden="true" />
          <span>Live rock band — Hyderabad</span>
        </div>

        <h1 ref={titleRef} className="rock-hero-title" aria-label="StarX Live, rock band">
          {letters.map((l, i) => (
            <span className="mask" key={l + i} aria-hidden="true">
              <span className={`ch ${l === 'X' ? 'is-x' : ''}`}>{l}</span>
            </span>
          ))}
        </h1>

        <div ref={subRef} className="rock-hero-sub" aria-hidden="true">
          <span className="rule" style={{ transformOrigin: 'right' }} />
          <span>Live · Rock Band</span>
          <span className="rule" style={{ transformOrigin: 'left' }} />
        </div>

        <p ref={taglineRef} className="rock-hero-tagline">
          <em>{brand.tagline || 'Lost in the Noise. Found in the Sound.'}</em> Classic, rock and western
          anthems played live, loud and by real musicians.
        </p>

        <div ref={actionsRef} className="rock-hero-actions">
          <button
            type="button"
            id="hero-watch-performance-btn"
            onClick={handleWatchPerformance}
            className="btn btn-primary hero-action-btn"
            style={{ gap: '0.6rem' }}
          >
            <Play size={14} />
            <span>Watch performance</span>
          </button>
          <button
            type="button"
            id="hero-contact-starx-btn"
            onClick={handleContactStarX}
            className="btn btn-glass hero-action-btn"
            style={{ gap: '0.6rem' }}
          >
            <span>Book StarX</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      <div ref={footerRef} className="rock-hero-footer">
        <span>
          <span className="rock-eq" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
          &nbsp;&nbsp;On air
        </span>
        <span>{brand.genresDisplay || 'Classic • Rock • Western'}</span>
        <span>{brand.languagesDisplay || 'Telugu • Hindi'}</span>
        <span>
          Scroll
          <span className="rock-scroll-line" aria-hidden="true" />
        </span>
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
