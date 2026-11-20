import React, { useEffect, useLayoutEffect, useRef, useCallback, useMemo } from 'react';
import gsap from 'gsap';

/**
 * StarXIntro — "lights down, show on".
 *
 * A realistic concert opening instead of a graphic animation:
 *   1. The arena is dark and hazy; the crowd is a silhouette in the
 *      foreground, phone lights coming on here and there.
 *   2. "Hyderabad · Tonight" — then the house goes quiet.
 *   3. The centre follow spot hits (with the little flicker a real lamp has),
 *      then the side beams, which start to sweep through the haze.
 *   4. The LED wall powers up line by line: STARX LIVE.
 *   5. Strobe hits, the crowd's hands go up.
 *   6. The camera pushes over the crowd and the darkness dissolves into
 *      the real site: hero + the 3D stage, already rendered underneath.
 *
 * The exit waits (briefly) for the 3D stage to report its first frame, so the
 * reveal never lands on an empty dark background. Skippable at any time.
 */

const seeded = (seed) => {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
};

// Procedural crowd silhouette: two rows of heads/shoulders, some hands up, some phones
const buildCrowd = () => {
  const rnd = seeded(7);
  const rows = [
    { count: 26, y: 300, scale: 0.72, fill: '#140b0c' },
    { count: 17, y: 360, scale: 1.05, fill: '#050303' }
  ];
  const people = [];
  const arms = [];
  const phones = [];
  rows.forEach((row, ri) => {
    const step = 1600 / row.count;
    for (let i = 0; i < row.count; i += 1) {
      const x = step * i + step * (0.2 + rnd() * 0.6);
      const s = row.scale * (0.85 + rnd() * 0.3);
      const y = row.y + rnd() * 18;
      const headR = 24 * s;
      const shoulderW = 70 * s;
      const top = y - headR * 2.2;
      // head + neck + shoulders as one path
      people.push({
        fill: row.fill,
        d: `M${x - shoulderW} 420 L${x - shoulderW} ${y + 26 * s} Q${x - shoulderW} ${y} ${x - 18 * s} ${y - 4 * s} L${x - 9 * s} ${y - 10 * s} A${headR} ${headR * 1.15} 0 1 1 ${x + 9 * s} ${y - 10 * s} L${x + 18 * s} ${y - 4 * s} Q${x + shoulderW} ${y} ${x + shoulderW} ${y + 26 * s} L${x + shoulderW} 420 Z`
      });
      const r = rnd();
      if (r < (ri ? 0.55 : 0.45)) {
        // raised arm from one shoulder
        const side = rnd() < 0.5 ? -1 : 1;
        const sx = x + side * shoulderW * 0.75;
        const sy = y + 6 * s;
        const hx = sx + side * (10 + rnd() * 30) * s;
        const hy = top - (60 + rnd() * 70) * s;
        const w = 13 * s;
        const phone = rnd() < 0.6;
        arms.push({
          fill: row.fill,
          d: `M${sx - w} ${sy + 20 * s} L${hx - w * 0.7} ${hy + 14 * s} Q${hx} ${hy - 12 * s} ${hx + w * 0.7} ${hy + 14 * s} L${sx + w} ${sy + 20 * s} Z`
        });
        if (phone) phones.push({ x: hx, y: hy - 6 * s, s, delay: rnd() * 2.2, front: ri === 1 });
      }
    }
  });
  return { people, arms, phones };
};

export const StarXIntro = ({ onStartExit, onFinishExit, onFinishIntro, onComplete }) => {
  const rootRef = useRef(null);
  const sceneRef = useRef(null);
  const bgRef = useRef(null);
  const hazeRef = useRef(null);
  const spotRef = useRef(null);
  const beamLRef = useRef(null);
  const beamRRef = useRef(null);
  const screenRef = useRef(null);
  const screenWipeRef = useRef(null);
  const crowdRef = useRef(null);
  const armsRef = useRef(null);
  const phonesRef = useRef(null);
  const captionRef = useRef(null);
  const strobeRef = useRef(null);
  const skipRef = useRef(null);
  const tlRef = useRef(null);
  const exitingRef = useRef(false);
  const waitRef = useRef(null);

  const crowd = useMemo(buildCrowd, []);

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
      if (waitRef.current) waitRef.current();
      if (onStartExit) onStartExit(source);

      const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      if (reduced || source === 'skip') {
        gsap.to(rootRef.current, { opacity: 0, duration: reduced ? 0.35 : 0.6, ease: 'power2.inOut', onComplete: () => finish(source) });
        return;
      }

      // Push in over the crowd; the dark arena dissolves into the real site
      gsap
        .timeline({ onComplete: () => finish(source) })
        .to(skipRef.current, { opacity: 0, duration: 0.25 }, 0)
        .to(captionRef.current, { opacity: 0, duration: 0.3 }, 0)
        .to(sceneRef.current, { scale: 1.18, duration: 1.4, ease: 'power2.inOut' }, 0)
        .to(crowdRef.current, { yPercent: 55, duration: 1.3, ease: 'power3.in' }, 0.05)
        .to(screenRef.current, { opacity: 0, scale: 1.1, filter: 'blur(6px)', duration: 0.8, ease: 'power2.in' }, 0.25)
        .to([spotRef.current, beamLRef.current, beamRRef.current], { opacity: 0, duration: 0.9, ease: 'power2.in' }, 0.35)
        .to(bgRef.current, { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 0.35)
        .to(hazeRef.current, { opacity: 0, duration: 1.0, ease: 'power2.inOut' }, 0.45);
    },
    [finish, onStartExit]
  );

  // Exit only once the 3D stage has painted (or after a short grace period)
  const exitWhenStageReady = useCallback(() => {
    if (window.__starxStageReady) {
      runExit('ended');
      return;
    }
    const go = () => runExit('ended');
    const timer = window.setTimeout(go, 3000);
    window.addEventListener('starx:stage-ready', go, { once: true });
    waitRef.current = () => {
      window.clearTimeout(timer);
      window.removeEventListener('starx:stage-ready', go);
    };
  }, [runExit]);

  // Block page scrolling while the intro is up; Esc / Enter skip
  useEffect(() => {
    const prevent = (e) => e.preventDefault();
    const onKey = (e) => {
      if ([32, 33, 34, 35, 36, 37, 38, 39, 40].includes(e.keyCode)) e.preventDefault();
      if (e.key === 'Escape' || e.key === 'Enter') runExit('skip');
    };
    window.addEventListener('wheel', prevent, { passive: false });
    window.addEventListener('touchmove', prevent, { passive: false });
    window.addEventListener('keydown', onKey, { passive: false });
    return () => {
      window.removeEventListener('wheel', prevent);
      window.removeEventListener('touchmove', prevent);
      window.removeEventListener('keydown', onKey);
      if (waitRef.current) waitRef.current();
    };
  }, [runExit]);

  useLayoutEffect(() => {
    const reduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      const t = window.setTimeout(() => runExit('reduced'), 900);
      return () => window.clearTimeout(t);
    }

    const ctx = gsap.context(() => {
      const phones = phonesRef.current ? phonesRef.current.children : [];
      const lines = screenRef.current ? screenRef.current.querySelectorAll('[data-led]') : [];

      gsap.set([spotRef.current, beamLRef.current, beamRRef.current], { opacity: 0 });
      gsap.set(screenRef.current, { opacity: 0 });
      gsap.set(screenWipeRef.current, { scaleY: 1 });
      gsap.set(lines, { opacity: 0 });
      gsap.set(phones, { opacity: 0, scale: 0.4, transformOrigin: '50% 50%' });
      gsap.set(armsRef.current, { y: 70 });
      gsap.set(crowdRef.current, { yPercent: 6 });
      gsap.set(captionRef.current, { opacity: 0, y: 10 });
      gsap.set(skipRef.current, { opacity: 0 });

      // a real lamp striking: hit, dip, catch, settle
      const strike = (peak = 1) => [
        { opacity: peak, duration: 0.05 },
        { opacity: peak * 0.25, duration: 0.06 },
        { opacity: peak * 0.9, duration: 0.05 },
        { opacity: peak * 0.55, duration: 0.07 },
        { opacity: peak, duration: 0.12 }
      ];

      const tl = gsap.timeline({ onComplete: exitWhenStageReady });
      tlRef.current = tl;

      tl.to(skipRef.current, { opacity: 1, duration: 0.5 }, 0.3)
        .to(crowdRef.current, { yPercent: 0, duration: 3.4, ease: 'power1.out' }, 0)
        // 1. phone lights come on across the crowd
        .to(phones, { opacity: 1, scale: 1, duration: 0.4, ease: 'power2.out', stagger: { each: 0.05, from: 'random' } }, 0.2)
        .to(captionRef.current, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, 0.35)
        // 2. centre follow spot strikes
        .to(spotRef.current, { keyframes: strike(1) }, 1.0)
        // 3. side beams strike
        .to(beamLRef.current, { keyframes: strike(0.85) }, 1.45)
        .to(beamRRef.current, { keyframes: strike(0.85) }, 1.55)
        // 4. LED wall powers up line by line
        .to(screenRef.current, { opacity: 1, duration: 0.15 }, 1.7)
        .to(screenWipeRef.current, { scaleY: 0, duration: 0.55, ease: 'steps(12)' }, 1.72)
        .to(lines, { keyframes: [{ opacity: 1, duration: 0.04 }, { opacity: 0.3, duration: 0.05 }, { opacity: 1, duration: 0.08 }], stagger: 0.12 }, 1.85)
        .to(captionRef.current, { opacity: 0.55, duration: 0.4 }, 2.0)
        // 5. strobe hits, hands go up
        .fromTo(strobeRef.current, { opacity: 0 }, { keyframes: [{ opacity: 0.55, duration: 0.04 }, { opacity: 0, duration: 0.09 }, { opacity: 0.45, duration: 0.04 }, { opacity: 0, duration: 0.2 }] }, 2.6)
        .to(armsRef.current, { y: 0, duration: 0.5, ease: 'back.out(1.6)' }, 2.62)
        .to(phones, { scale: 1.25, duration: 0.3, ease: 'power2.out', stagger: { each: 0.02, from: 'random' } }, 2.65)
        // hold the moment
        .to({}, { duration: 0.6 }, 3.0);
    }, rootRef);

    return () => ctx.revert();
  }, [runExit, exitWhenStageReady]);

  return (
    <div id="starx-intro" ref={rootRef} role="presentation">
      <div ref={bgRef} className="ri-bg" />
      <div ref={sceneRef} className="ri-scene">
        <div ref={hazeRef} className="ri-haze" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>

        <div ref={beamLRef} className="ri-beam is-left" aria-hidden="true" />
        <div ref={beamRRef} className="ri-beam is-right" aria-hidden="true" />
        <div ref={spotRef} className="ri-spot" aria-hidden="true" />

        <div ref={screenRef} className="ri-screen" aria-label="StarX Live">
          <img data-led src="/assets/brand/starx-logo.png" alt="" width="96" height="96" className="ri-screen-logo" />
          <div data-led className="ri-screen-word" aria-hidden="true">
            STAR<span>X</span>
          </div>
          <div data-led className="ri-screen-live" aria-hidden="true">
            Live · Rock Band
          </div>
          <div className="ri-screen-dots" aria-hidden="true" />
          <div ref={screenWipeRef} className="ri-screen-wipe" aria-hidden="true" />
        </div>

        <svg ref={crowdRef} className="ri-crowd" viewBox="0 0 1600 420" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
          <defs>
            <radialGradient id="ri-phone-glow">
              <stop offset="0" stopColor="#fff6e8" stopOpacity="1" />
              <stop offset="0.35" stopColor="#ffe2b8" stopOpacity="0.55" />
              <stop offset="1" stopColor="#ffd39a" stopOpacity="0" />
            </radialGradient>
          </defs>
          <g ref={armsRef}>
            {crowd.arms.map((a, i) => (
              <path key={i} d={a.d} fill={a.fill} />
            ))}
          </g>
          {crowd.people.map((p, i) => (
            <path key={i} d={p.d} fill={p.fill} />
          ))}
          <g ref={phonesRef}>
            {crowd.phones.map((ph, i) => (
              <g key={i}>
                <circle cx={ph.x} cy={ph.y} r={34 * ph.s} fill="url(#ri-phone-glow)" className="ri-phone-glow" style={{ animationDelay: `${ph.delay}s` }} />
                <rect x={ph.x - 7 * ph.s} y={ph.y - 11 * ph.s} width={14 * ph.s} height={22 * ph.s} rx={2.5 * ph.s} fill="#fffaf2" />
              </g>
            ))}
          </g>
        </svg>

        <div ref={strobeRef} className="ri-strobe" aria-hidden="true" />
      </div>

      <div ref={captionRef} className="ri-caption" aria-hidden="true">
        <span className="dot" />
        Hyderabad · Tonight
      </div>

      <button ref={skipRef} type="button" id="intro-skip-button" className="intro-skip" onClick={() => runExit('skip')} aria-label="Skip intro">
        Skip intro →
      </button>
    </div>
  );
};

export default StarXIntro;
