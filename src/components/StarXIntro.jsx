import React, { useEffect, useLayoutEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';

/**
 * StarXIntro — "soundcheck" opening sequence (code-animated, no video).
 *
 *   1. A red guitar string draws across the dark screen and is plucked.
 *   2. A soundcheck counter runs 00 → 100 while equalizer bars warm up.
 *   3. The StarX logo drops in with a red flash, STARX LIVE slams in letter by letter.
 *   4. The screen splits open like a stage shutter: the top and bottom halves
 *      slide away to reveal the already-rendered home page and 3D stage.
 *
 * The home page is mounted underneath the whole time, so there's never a
 * black gap. `onStartExit` fires as the shutter starts opening (the hero starts
 * its entrance then); `onFinishExit` fires once the shutter is gone.
 * Skippable at any point; reduced-motion visitors get a short fade.
 */

const LETTERS = ['S', 'T', 'A', 'R', 'X'];

export const StarXIntro = ({ onStartExit, onFinishExit, onFinishIntro, onComplete }) => {
  const rootRef = useRef(null);
  const topRef = useRef(null);
  const bottomRef = useRef(null);
  const centerRef = useRef(null);
  const stringRef = useRef(null);
  const logoRef = useRef(null);
  const wordRef = useRef(null);
  const liveRef = useRef(null);
  const counterRef = useRef(null);
  const metaRef = useRef(null);
  const eqRef = useRef(null);
  const flashRef = useRef(null);
  const skipRef = useRef(null);
  const tlRef = useRef(null);
  const exitingRef = useRef(false);

  const finish = useCallback(
    (source) => {
      const cb = onFinishExit || onFinishIntro || onComplete;
      if (cb) cb(source);
    },
    [onFinishExit, onFinishIntro, onComplete]
  );

  const runExit = useCallback(
    (source = 'ended') => {
      if (exitingRef.current) return;
      exitingRef.current = true;
      if (tlRef.current) tlRef.current.kill();
      if (onStartExit) onStartExit(source);

      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced) {
        gsap.to(rootRef.current, { opacity: 0, duration: 0.35, onComplete: () => finish(source) });
        return;
      }

      gsap
        .timeline({ onComplete: () => finish(source) })
        .to(skipRef.current, { opacity: 0, duration: 0.2 }, 0)
        .to(centerRef.current, { scale: 1.12, opacity: 0, duration: 0.45, ease: 'power3.in' }, 0)
        .to(stringRef.current, { scaleX: 1.6, opacity: 0, duration: 0.4, ease: 'power2.in' }, 0)
        .to(topRef.current, { yPercent: -100, duration: 1.0, ease: 'expo.inOut' }, 0.2)
        .to(bottomRef.current, { yPercent: 100, duration: 1.0, ease: 'expo.inOut' }, 0.2);
    },
    [finish, onStartExit]
  );

  // Block page scrolling while the intro is up
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    const preventKeys = (e) => {
      if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) e.preventDefault();
      if (e.key === 'Escape' || e.key === 'Enter') runExit('skip');
    };
    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });
    window.addEventListener('keydown', preventKeys, { passive: false });
    return () => {
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
      window.removeEventListener('keydown', preventKeys);
    };
  }, [runExit]);

  useLayoutEffect(() => {
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const chars = wordRef.current ? wordRef.current.querySelectorAll('.intro-ch') : [];
    const bars = eqRef.current ? eqRef.current.children : [];
    const path = stringRef.current ? stringRef.current.querySelector('path') : null;
    const counter = { v: 0 };

    if (reduced) {
      const t = window.setTimeout(() => runExit('reduced'), 900);
      return () => window.clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      gsap.set(chars, { yPercent: 120, opacity: 0 });
      gsap.set(logoRef.current, { scale: 2.6, opacity: 0, rotate: -12 });
      gsap.set(liveRef.current, { opacity: 0, letterSpacing: '1.4em' });
      gsap.set([metaRef.current, skipRef.current], { opacity: 0 });
      gsap.set(bars, { scaleY: 0.05 });
      if (path) gsap.set(path, { strokeDasharray: 1000, strokeDashoffset: 1000 });

      const pluck = { a: 0 };
      const drawWave = () => {
        if (!path) return;
        const amp = pluck.a;
        let d = 'M0 50';
        for (let x = 0; x <= 1000; x += 20) {
          const env = Math.sin((x / 1000) * Math.PI);
          const y = 50 + Math.sin(x / 38 + performance.now() / 40) * amp * env;
          d += ` L${x} ${y.toFixed(2)}`;
        }
        path.setAttribute('d', d);
      };

      const tl = gsap.timeline({ onComplete: () => runExit('ended') });
      tlRef.current = tl;

      tl.to(skipRef.current, { opacity: 1, duration: 0.4 }, 0.2)
        .to(metaRef.current, { opacity: 1, duration: 0.5 }, 0.2)
        // 1. string draws across, then gets plucked
        .to(path, { strokeDashoffset: 0, duration: 0.7, ease: 'power3.inOut' }, 0.1)
        .to(pluck, { a: 22, duration: 0.08, ease: 'power2.out', onUpdate: drawWave }, 0.85)
        .to(pluck, { a: 0, duration: 1.6, ease: 'elastic.out(1, 0.25)', onUpdate: drawWave }, 0.93)
        // 2. soundcheck counter + EQ warm-up
        .to(
          counter,
          {
            v: 100,
            duration: 2.1,
            ease: 'power2.inOut',
            onUpdate: () => {
              if (counterRef.current) counterRef.current.textContent = String(Math.round(counter.v)).padStart(3, '0');
            }
          },
          0.3
        )
        .to(
          bars,
          {
            scaleY: () => 0.3 + Math.random() * 0.7,
            duration: 0.18,
            ease: 'power2.out',
            stagger: { each: 0.02, repeat: 9, yoyo: true }
          },
          0.6
        )
        // 3. logo drop + flash, wordmark slam
        .to(logoRef.current, { scale: 1, opacity: 1, rotate: 0, duration: 0.55, ease: 'back.out(2.2)' }, 1.15)
        .fromTo(flashRef.current, { opacity: 0 }, { opacity: 0.7, duration: 0.06 }, 1.5)
        .to(flashRef.current, { opacity: 0, duration: 0.6, ease: 'power2.out' }, 1.56)
        .to(chars, { yPercent: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.06 }, 1.4)
        .to(liveRef.current, { opacity: 1, letterSpacing: '0.6em', duration: 0.8, ease: 'expo.out' }, 1.8)
        .to(bars, { scaleY: 0.08, duration: 0.4, ease: 'power2.in', stagger: 0.01 }, 2.6)
        // 4. hold a beat, then open
        .to({}, { duration: 0.35 }, 2.75);
    }, rootRef);

    return () => ctx.revert();
  }, [runExit]);

  return (
    <div id="starx-intro" ref={rootRef} role="presentation">
      <div ref={topRef} className="intro-shutter is-top" />
      <div ref={bottomRef} className="intro-shutter is-bottom" />
      <div ref={flashRef} className="intro-flash" aria-hidden="true" />

      <svg ref={stringRef} className="intro-string" viewBox="0 0 1000 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 50 L1000 50" fill="none" stroke="#E8141C" strokeWidth="3" strokeLinecap="round" />
      </svg>

      <div ref={centerRef} className="intro-center">
        <img ref={logoRef} className="intro-logo" src="/assets/brand/starx-logo.png" alt="" width="120" height="120" />
        <div ref={wordRef} className="intro-word" aria-label="StarX Live">
          {LETTERS.map((l, i) => (
            <span className="intro-mask" key={l + i} aria-hidden="true">
              <span className={`intro-ch ${l === 'X' ? 'is-x' : ''}`}>{l}</span>
            </span>
          ))}
        </div>
        <div ref={liveRef} className="intro-live" aria-hidden="true">
          Live · Rock Band
        </div>
      </div>

      <div ref={metaRef} className="intro-meta" aria-hidden="true">
        <div className="intro-counter">
          <span ref={counterRef}>000</span>
          <small>%</small>
        </div>
        <div className="intro-label">Soundcheck — Hyderabad</div>
        <div ref={eqRef} className="intro-eq">
          {Array.from({ length: 16 }).map((_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>

      <button
        ref={skipRef}
        type="button"
        id="intro-skip-button"
        className="intro-skip"
        onClick={() => runExit('skip')}
        aria-label="Skip intro"
      >
        Skip intro →
      </button>
    </div>
  );
};

export default StarXIntro;
