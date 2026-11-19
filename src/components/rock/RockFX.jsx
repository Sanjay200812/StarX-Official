import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Fixed film grain + scanlines + red stage vignette over the whole site. */
export const RockAtmosphere = () => (
  <div className="rock-atmosphere" aria-hidden="true">
    <div className="rock-vignette" />
    <div className="rock-scanlines" />
    <div className="rock-grain" />
  </div>
);

/** Red "guitar string" scroll progress bar that wobbles with scroll speed. */
export const RockProgress = () => {
  const barRef = useRef(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return undefined;
    const setScale = gsap.quickSetter(bar, 'scaleX');
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        setScale(self.progress);
        const v = Math.min(Math.abs(self.getVelocity()) / 1500, 1);
        bar.style.height = `${3 + v * 4}px`;
      }
    });
    return () => st.kill();
  }, []);

  return <div ref={barRef} className="rock-progress" style={{ transform: 'scaleX(0)' }} />;
};

/**
 * Two crossing tape bands of giant text. Speed follows scroll velocity,
 * direction flips when the visitor scrolls back up.
 */
export const RockMarquee = ({
  items = ['Western', 'Rock', 'Classic', 'Telugu', 'Hindi', 'Hyderabad'],
  altItems = ['Live', 'Loud', 'Unplugged', 'Electric', 'StarX', 'On Stage']
}) => {
  const rootRef = useRef(null);
  const rowARef = useRef(null);
  const rowBRef = useRef(null);

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return undefined;
    const ctx = gsap.context(() => {
      const loopA = gsap.to(rowARef.current, { xPercent: -50, ease: 'none', duration: 22, repeat: -1 });
      const loopB = gsap.fromTo(rowBRef.current, { xPercent: -50 }, { xPercent: 0, ease: 'none', duration: 26, repeat: -1 });
      let direction = 1;

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (self.direction !== direction) direction = self.direction;
          const boost = 1 + Math.min(Math.abs(self.getVelocity()) / 300, 6);
          gsap.to([loopA, loopB], { timeScale: boost * direction, duration: 0.2, overwrite: true });
          gsap.to([loopA, loopB], { timeScale: direction, duration: 1.2, delay: 0.25, ease: 'power2.out' });
        }
      });

      gsap.fromTo(
        rootRef.current.querySelectorAll('.rock-marquee-band'),
        { scaleX: 0.6, opacity: 0 },
        {
          scaleX: 1,
          opacity: 1,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.12,
          scrollTrigger: { trigger: rootRef.current, start: 'top 85%' }
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const renderRow = (list) =>
    [...list, ...list, ...list, ...list].map((word, i) => (
      <span className="rock-marquee-item" key={`${word}-${i}`}>
        {word}
        <span className="star">★</span>
      </span>
    ));

  return (
    <div ref={rootRef} className="rock-marquee" aria-hidden="true">
      <div className="rock-marquee-band is-red">
        <div ref={rowARef} className="rock-marquee-row">{renderRow(items)}</div>
      </div>
      <div className="rock-marquee-band is-black">
        <div ref={rowBRef} className="rock-marquee-row">{renderRow(altItems)}</div>
      </div>
    </div>
  );
};

/**
 * Pinned manifesto: outlined line slides one way, red-fill line slides the other
 * and floods with red as you scroll, while an equalizer pumps underneath.
 */
export const RockStatement = ({
  lineA = 'Lost in the noise',
  lineB = 'Found in the sound',
  scrawl = 'turn it up!'
}) => {
  const rootRef = useRef(null);
  const aRef = useRef(null);
  const bRef = useRef(null);
  const eqRef = useRef(null);
  const scrawlRef = useRef(null);
  const bars = 48;

  useLayoutEffect(() => {
    if (prefersReducedMotion()) {
      if (bRef.current) bRef.current.style.backgroundPosition = '0% 0';
      return undefined;
    }
    const ctx = gsap.context(() => {
      const eqBars = eqRef.current ? Array.from(eqRef.current.children) : [];
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: rootRef.current,
          start: 'top top',
          end: '+=140%',
          scrub: 0.6,
          pin: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            const energy = Math.min(Math.abs(self.getVelocity()) / 1200, 1);
            eqBars.forEach((bar, i) => {
              const wave = Math.abs(Math.sin(i * 0.45 + self.progress * 18));
              gsap.to(bar, { scaleY: 0.08 + wave * (0.25 + energy * 0.75), duration: 0.25, overwrite: true });
            });
          }
        }
      });
      tl.fromTo(aRef.current, { xPercent: 18 }, { xPercent: -42, ease: 'none' }, 0)
        .fromTo(bRef.current, { xPercent: -46 }, { xPercent: 8, ease: 'none' }, 0)
        .fromTo(bRef.current, { backgroundPosition: '100% 0' }, { backgroundPosition: '0% 0', ease: 'none' }, 0)
        .fromTo(
          scrawlRef.current,
          { opacity: 0, scale: 2.2, rotate: -20 },
          { opacity: 1, scale: 1, rotate: -6, ease: 'back.out(3)', duration: 0.25 },
          0.55
        );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={rootRef} className="rock-statement" aria-label={`${lineA}. ${lineB}.`}>
      <div ref={aRef} className="rock-statement-line is-outline" aria-hidden="true">
        {lineA} ★ {lineA}
      </div>
      <div ref={bRef} className="rock-statement-line is-fill" aria-hidden="true">
        {lineB} ★ {lineB}
      </div>
      <div ref={scrawlRef} className="rock-statement-scrawl" aria-hidden="true">
        {scrawl}
      </div>
      <div ref={eqRef} className="rock-statement-eq" aria-hidden="true">
        {Array.from({ length: bars }).map((_, i) => (
          <i key={i} />
        ))}
      </div>
    </section>
  );
};

/**
 * Slanted red / black / white bars slash across the screen on every page change.
 */
export const RockPageTransition = ({ viewKey }) => {
  const rootRef = useRef(null);
  const prevKeyRef = useRef(viewKey);
  const [label, setLabel] = useState(viewKey);

  useEffect(() => {
    if (prevKeyRef.current === viewKey) return undefined;
    prevKeyRef.current = viewKey;
    if (prefersReducedMotion() || !rootRef.current) return undefined;
    setLabel(viewKey);
    const barsEls = rootRef.current.querySelectorAll('.rock-transition-bar');
    const tl = gsap.timeline();
    tl.set(barsEls, { x: 0, xPercent: -170, skewX: -18, autoAlpha: 1 })
      .to(barsEls, {
        xPercent: 320,
        duration: 1.05,
        ease: 'power4.inOut',
        stagger: { each: 0.07, from: 'start' }
      })
      .set(barsEls, { autoAlpha: 0 });
    return () => {
      tl.kill();
      gsap.set(barsEls, { autoAlpha: 0 });
    };
  }, [viewKey]);

  const word = label === 'home' ? 'STARX' : label;

  return (
    <div ref={rootRef} className="rock-transition" aria-hidden="true">
      <div className="rock-transition-bar is-red" />
      <div className="rock-transition-bar is-black">
        <div className="rock-transition-word">
          {String(word).toUpperCase()}
          <span>.</span>
        </div>
      </div>
      <div className="rock-transition-bar is-white" />
      <div className="rock-transition-bar is-red" style={{ width: '24vw' }} />
    </div>
  );
};

/* ------------------------------------------------------------------ */
/*  Global scroll choreography                                        */
/* ------------------------------------------------------------------ */

const splitIntoChars = (el) => {
  // Only split headings made of plain text (and simple inline spans like STAR<span>X</span>)
  const isSimple = Array.from(el.childNodes).every(
    (n) => n.nodeType === 3 || (n.nodeType === 1 && n.childNodes.length === 1 && n.firstChild.nodeType === 3)
  );
  if (!isSimple) return [];

  const chars = [];
  const nodes = Array.from(el.childNodes);
  nodes.forEach((node) => {
    const text = node.textContent;
    const host = node.nodeType === 3 ? null : node;
    const frag = document.createDocumentFragment();
    text.split(/(\s+)/).forEach((chunk) => {
      if (!chunk) return;
      if (/^\s+$/.test(chunk)) {
        frag.appendChild(document.createTextNode(' '));
        return;
      }
      const word = document.createElement('span');
      word.className = 'rock-word';
      Array.from(chunk).forEach((c) => {
        const ch = document.createElement('span');
        ch.className = 'rock-char';
        ch.textContent = c;
        word.appendChild(ch);
        chars.push(ch);
      });
      frag.appendChild(word);
    });
    if (host) {
      host.textContent = '';
      host.appendChild(frag);
    } else {
      el.replaceChild(frag, node);
    }
  });
  return chars;
};

const applyScrollFX = (root) => {
  if (!root) return;

  // 1. Headings: letters slam up with a skew, like a riff hitting
  root.querySelectorAll('.editorial-heading:not([data-rock-fx])').forEach((el) => {
    el.setAttribute('data-rock-fx', '1');
    if (el.closest('#home')) return;
    const chars = splitIntoChars(el);
    const targets = chars.length ? chars : [el];
    gsap.fromTo(
      targets,
      { yPercent: 110, opacity: 0, rotate: 12, scaleY: 1.6 },
      {
        yPercent: 0,
        opacity: 1,
        rotate: 0,
        scaleY: 1,
        duration: 0.9,
        ease: 'expo.out',
        stagger: { each: 0.028, from: 'start' },
        scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // 2. Tape labels rip on from the left
  root.querySelectorAll('.label-accent:not([data-rock-fx]), .red-badge:not([data-rock-fx])').forEach((el) => {
    el.setAttribute('data-rock-fx', '1');
    gsap.fromTo(
      el,
      { clipPath: 'inset(0 100% 0 0)', x: -30, rotate: -8 },
      {
        clipPath: 'inset(0 0% 0 0)',
        x: 0,
        rotate: -2,
        duration: 0.7,
        ease: 'power4.out',
        clearProps: 'clipPath',
        scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // 3. Body copy: rise out of blur
  root.querySelectorAll('section p:not([data-rock-fx])').forEach((el) => {
    el.setAttribute('data-rock-fx', '1');
    if (el.closest('#home') || el.closest('.rock-statement')) return;
    gsap.fromTo(
      el,
      { y: 40, opacity: 0, filter: 'blur(8px)' },
      {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.9,
        ease: 'power3.out',
        clearProps: 'filter',
        scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'play none none reverse' }
      }
    );
  });

  // 4. Big media frames: shutter wipe + parallax drift
  root.querySelectorAll('section img:not([data-rock-fx])').forEach((img) => {
    img.setAttribute('data-rock-fx', '1');
    if (img.closest('#home') || img.closest('.rock-card') || img.closest('.logo-wrapper')) return;
    if (img.closest('[role="dialog"]')) return;
    const frame = img.parentElement;
    if (!frame || frame.getBoundingClientRect().width < 260) return;
    gsap.fromTo(
      frame,
      { clipPath: 'polygon(0 0, 0 0, 0 100%, 0 100%)' },
      {
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
        duration: 1.2,
        ease: 'expo.inOut',
        clearProps: 'clipPath',
        scrollTrigger: { trigger: frame, start: 'top 85%' }
      }
    );
    gsap.fromTo(
      img,
      { scale: 1.25, yPercent: -6 },
      {
        scale: 1.08,
        yPercent: 6,
        ease: 'none',
        scrollTrigger: { trigger: frame, start: 'top bottom', end: 'bottom top', scrub: true }
      }
    );
  });

  // 5. Cards: dealt onto the stage in a staggered, tilted batch
  const cards = Array.from(root.querySelectorAll('.rock-card:not([data-rock-fx])'));
  cards.forEach((c) => c.setAttribute('data-rock-fx', '1'));
  if (cards.length) {
    gsap.set(cards, { opacity: 0, y: 120, rotate: (i) => (i % 2 ? 6 : -6), scale: 0.86 });
    ScrollTrigger.batch(cards, {
      start: 'top 92%',
      onEnter: (batch) =>
        gsap.to(batch, {
          opacity: 1,
          y: 0,
          rotate: 0,
          scale: 1,
          duration: 0.9,
          ease: 'back.out(1.6)',
          stagger: 0.09,
          overwrite: true,
          clearProps: 'transform'
        })
    });
  }

  // 6. Sections drift in with a slight perspective tilt as they enter
  root.querySelectorAll('main section.section-standard:not([data-rock-fx])').forEach((sec) => {
    sec.setAttribute('data-rock-fx', '1');
    gsap.fromTo(
      sec,
      { '--rock-tilt': '6deg' },
      {
        '--rock-tilt': '0deg',
        ease: 'none',
        scrollTrigger: { trigger: sec, start: 'top bottom', end: 'top 40%', scrub: true }
      }
    );
  });

  ScrollTrigger.refresh();
};

/**
 * Hook: runs the scroll choreography on the current view, and again whenever
 * lazy-loaded content appears inside <main>. Everything is killed on view change.
 */
export const useRockScrollFX = (viewKey, enabled = true) => {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return undefined;
    const main = document.getElementById('main-content');
    if (!main) return undefined;

    let raf = 0;
    let timer = 0;
    const run = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => applyScrollFX(main));
    };

    // Wait for the route fade-in to settle before measuring
    timer = window.setTimeout(run, 380);

    const observer = new MutationObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(run, 120);
    });
    observer.observe(main, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
      cancelAnimationFrame(raf);
      ScrollTrigger.getAll().forEach((st) => {
        const trg = st.trigger;
        if (trg && trg.closest && trg.closest('#main-content') && !trg.closest('.rock-statement') && !trg.closest('.rock-marquee')) {
          st.kill();
        }
      });
    };
  }, [viewKey, enabled]);
};
