import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EASE_OUT = 'expo.out';

/** Static film grain and a soft edge falloff over the whole site. */
export const RockAtmosphere = () => (
  <div className="rock-atmosphere" aria-hidden="true">
    <div className="rock-vignette" />
    <div className="rock-grain" />
  </div>
);

/** Thin red reading-progress line along the top edge. */
export const RockProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;
    const setScale = gsap.quickSetter(bar, 'scaleX');
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => setScale(self.progress)
    });
    return () => st.kill();
  }, []);

  return <div ref={barRef} className="rock-progress" style={{ transform: 'scaleX(0)' }} aria-hidden="true" />;
};

/**
 * Two crossing tape bands of oversized words: a red one and an outlined
 * ink one travelling the other way. Scroll speed eases them faster and
 * scroll direction flips them, without any jerk.
 */
export const RockMarquee = ({
  items = ['Western', 'Rock', 'Classic', 'Telugu', 'Hindi', 'Hyderabad'],
  altItems = ['Live', 'Loud', 'Electric', 'Unplugged', 'On Stage', 'StarX']
}) => {
  const rootRef = useRef(null);
  const rowARef = useRef(null);
  const rowBRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const loopA = gsap.to(rowARef.current, { xPercent: -50, ease: 'none', duration: 34, repeat: -1 });
      const loopB = gsap.fromTo(rowBRef.current, { xPercent: -50 }, { xPercent: 0, ease: 'none', duration: 40, repeat: -1 });
      const speed = { v: 1 };
      const apply = () => {
        loopA.timeScale(speed.v);
        loopB.timeScale(speed.v);
      };

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const dir = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 700, 4);
          gsap.to(speed, { v: boost * dir, duration: 0.5, ease: 'power3.out', overwrite: true, onUpdate: apply });
          gsap.to(speed, { v: dir, duration: 1.8, delay: 0.35, ease: 'power2.out', onUpdate: apply });
        }
      });

      // Bands swing into their angle as the section scrolls into view
      const swing = (sel, angle) =>
        gsap.fromTo(
          rootRef.current.querySelector(sel),
          { rotate: 0, scaleX: 0.92 },
          {
            rotate: angle,
            scaleX: 1,
            ease: 'none',
            scrollTrigger: { trigger: rootRef.current, start: 'top bottom', end: 'center center', scrub: 1 }
          }
        );
      swing('.rock-band.is-red', -3.5);
      swing('.rock-band.is-ink', 2.5);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const row = (list, outline) =>
    [...list, ...list, ...list, ...list].map((word, i) => (
      <span className={`rock-marquee-item ${outline ? 'is-outline' : ''}`} key={`${word}-${i}`}>
        {word}
        <span className="sep" />
      </span>
    ));

  return (
    <div ref={rootRef} className="rock-marquee" aria-hidden="true">
      <div className="rock-band is-red">
        <div ref={rowARef} className="rock-marquee-row">{row(items, false)}</div>
      </div>
      <div className="rock-band is-ink">
        <div ref={rowBRef} className="rock-marquee-row">{row(altItems, true)}</div>
      </div>
    </div>
  );
};

/**
 * Pinned manifesto. The outlined line drifts left, the solid line drifts right
 * and fills in as you scroll; a thin red rule tracks progress through the pin.
 */
export const RockStatement = ({ lineA = 'Lost in the noise', lineB = 'Found in the sound' }) => {
  const rootRef = useRef(null);
  const aRef = useRef(null);
  const bRef = useRef(null);
  const progressRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      if (bRef.current) bRef.current.style.backgroundPosition = '0% 0';
      return undefined;
    }
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=130%',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });
      tl.fromTo(aRef.current, { xPercent: 6 }, { xPercent: -38 }, 0)
        .fromTo(bRef.current, { xPercent: -40 }, { xPercent: 4 }, 0)
        .fromTo(bRef.current, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0' }, 0)
        .fromTo(progressRef.current, { scaleX: 0 }, { scaleX: 1 }, 0);
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="rock-statement" aria-label={`${lineA}. ${lineB}.`}>
      <div className="rock-statement-meta is-top" aria-hidden="true">
        <span>
          <b>●</b>&nbsp;&nbsp;Manifesto
        </span>
        <span>StarX Live — Hyderabad</span>
      </div>
      <div ref={aRef} className="rock-statement-line is-outline" aria-hidden="true">
        {lineA} — {lineA}
      </div>
      <div ref={bRef} className="rock-statement-line is-fill" aria-hidden="true">
        {lineB} — {lineB}
      </div>
      <div className="rock-statement-progress" aria-hidden="true">
        <i ref={progressRef} />
      </div>
    </section>
  );
};

/**
 * Curtain page transition: an ink panel rises from the bottom carrying the
 * destination name, then lifts away to reveal the new page.
 */
const VIEW_INDEX = ['home', 'about', 'artists', 'performances', 'media', 'events', 'crew', 'contact'];

export const RockPageTransition = ({ viewKey }) => {
  const rootRef = useRef(null);
  const wordRef = useRef(null);
  const prevKeyRef = useRef(viewKey);
  const [label, setLabel] = useState(viewKey);

  useEffect(() => {
    if (prevKeyRef.current === viewKey) return undefined;
    prevKeyRef.current = viewKey;
    setLabel(viewKey);
    if (prefersReducedMotion() || !rootRef.current) return undefined;

    const panel = rootRef.current;
    const word = wordRef.current ? wordRef.current.children : [];
    const tl = gsap.timeline();
    tl.set(panel, { autoAlpha: 1, yPercent: 100 })
      .set(word, { yPercent: 110 })
      .to(panel, { yPercent: 0, duration: 0.55, ease: 'power4.inOut' })
      .to(word, { yPercent: 0, duration: 0.6, ease: EASE_OUT, stagger: 0.04 }, '-=0.2')
      .to(panel, { yPercent: -100, duration: 0.75, ease: 'power4.inOut' }, '+=0.12')
      .set(panel, { autoAlpha: 0 });

    return () => {
      tl.kill();
      gsap.set(panel, { autoAlpha: 0 });
    };
  }, [viewKey]);

  const name = label === 'home' ? 'StarX' : label;
  const index = String(Math.max(0, VIEW_INDEX.indexOf(label)) + 1).padStart(2, '0');

  return (
    <div ref={rootRef} className="rock-curtain" aria-hidden="true">
      <div ref={wordRef} className="rock-curtain-word">
        <span>{String(name).toUpperCase()}</span>
        <span className="red">.</span>
      </div>
      <div className="rock-curtain-meta">
        ({index}) — StarX Live
      </div>
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Global scroll choreography                                        */
/* ------------------------------------------------------------------ */

/**
 * Wrap a heading's text in a mask so it can rise up from behind a line.
 * Works per word so lines wrap naturally on any screen size.
 */
const maskWords = (el) => {
  const simple = Array.from(el.childNodes).every(
    (n) => n.nodeType === 3 || (n.nodeType === 1 && n.childNodes.length === 1 && n.firstChild.nodeType === 3)
  );
  if (!simple) return [];

  const inners = [];
  Array.from(el.childNodes).forEach((node) => {
    const host = node.nodeType === 1 ? node : null;
    const frag = document.createDocumentFragment();
    node.textContent.split(/(\s+)/).forEach((chunk) => {
      if (!chunk) return;
      if (/^\s+$/.test(chunk)) {
        frag.appendChild(document.createTextNode(' '));
        return;
      }
      const mask = document.createElement('span');
      mask.className = 'rock-line';
      mask.style.display = 'inline-block';
      mask.style.verticalAlign = 'top';
      const inner = document.createElement('span');
      inner.className = 'rock-line-inner';
      inner.textContent = chunk;
      mask.appendChild(inner);
      frag.appendChild(mask);
      inners.push(inner);
    });
    if (host) {
      host.textContent = '';
      host.appendChild(frag);
    } else {
      el.replaceChild(frag, node);
    }
  });
  return inners;
};

const mark = (el) => {
  if (el.hasAttribute('data-rock-fx')) return false;
  el.setAttribute('data-rock-fx', '1');
  return true;
};

const applyScrollFX = (root) => {
  if (!root) return;

  // Headings: words rise out of a mask
  root.querySelectorAll('.editorial-heading').forEach((el) => {
    if (!mark(el) || el.closest('#home')) return;
    const inners = maskWords(el);
    if (!inners.length) {
      gsap.from(el, {
        y: 40,
        opacity: 0,
        duration: 1.2,
        ease: EASE_OUT,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true }
      });
      return;
    }
    gsap.from(inners, {
      yPercent: 105,
      duration: 1.25,
      ease: EASE_OUT,
      stagger: 0.07,
      scrollTrigger: { trigger: el, start: 'top 88%', once: true }
    });
  });

  // Kicker labels: rule draws, then text fades
  root.querySelectorAll('.label-accent, .red-badge').forEach((el) => {
    if (!mark(el) || el.closest('#home')) return;
    gsap.from(el, {
      opacity: 0,
      x: -16,
      duration: 1,
      ease: EASE_OUT,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true }
    });
  });

  // Body copy and link rows
  root.querySelectorAll('section p').forEach((el) => {
    if (!mark(el) || el.closest('#home') || el.closest('.rock-card')) return;
    gsap.from(el, {
      y: 28,
      opacity: 0,
      duration: 1.1,
      ease: EASE_OUT,
      delay: 0.1,
      scrollTrigger: { trigger: el, start: 'top 92%', once: true }
    });
  });

  // Large images: reveal upward from a clip, then a slow parallax drift
  root.querySelectorAll('section img').forEach((img) => {
    if (!mark(img)) return;
    if (img.closest('#home') || img.closest('.rock-card') || img.closest('.logo-wrapper') || img.closest('[role="dialog"]')) return;
    const frame = img.parentElement;
    if (!frame || frame.getBoundingClientRect().width < 280) return;
    gsap.fromTo(
      frame,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.5,
        ease: 'expo.inOut',
        clearProps: 'clipPath',
        scrollTrigger: { trigger: frame, start: 'top 85%', once: true }
      }
    );
    gsap.fromTo(
      img,
      { scale: 1.18, yPercent: -4 },
      {
        scale: 1.06,
        yPercent: 4,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
  });

  // Cards: rise in sequence as each row enters
  const cards = Array.from(root.querySelectorAll('.rock-card')).filter(mark);
  if (cards.length) {
    gsap.set(cards, { opacity: 0, y: 70 });
    ScrollTrigger.batch(cards, {
      start: 'top 90%',
      once: true,
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: EASE_OUT,
          stagger: 0.08,
          overwrite: true,
          clearProps: 'transform,opacity'
        })
    });
  }

  ScrollTrigger.refresh();
};

/**
 * Runs the choreography on the current view, and again whenever lazy-loaded
 * content appears inside <main>. Triggers are killed on view change.
 */
export const useRockScrollFX = (viewKey, enabled = true) => {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return undefined;
    const main = document.getElementById('main-content');
    if (!main) return undefined;

    let raf = 0;
    let timer = window.setTimeout(() => {
      raf = requestAnimationFrame(() => applyScrollFX(main));
    }, 420);

    const observer = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => applyScrollFX(main));
      }, 150);
    });
    observer.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach((st) => {
        const trg = st.trigger;
        if (
          trg &&
          trg.closest &&
          trg.closest('#main-content') &&
          !trg.closest('.rock-statement') &&
          !trg.closest('.rock-marquee') &&
          !trg.closest('#home')
        ) {
          st.kill();
        }
      });
    };
  }, [viewKey, enabled]);
};
