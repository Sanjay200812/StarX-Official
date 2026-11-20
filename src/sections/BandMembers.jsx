import React, { useState, useLayoutEffect, useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { artists } from '../data/artists';
import BrandedImage from '../components/BrandedImage';
import MemberDetailModal from '../components/MemberDetailModal';
import { stageFocus } from '../lib/stageFocus';
import { scrollToY } from '../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * BandMembers (Home) — "MEET STARX" stage tour.
 *
 * The section pins to the screen and each scroll step flies the 3D stage
 * camera to one instrument, with the artist who plays it:
 *   01 Rhythm Pad — B. Prasad      02 Drum Kit — B. Joseph
 *   03 Piano — G. Perumalla Rao    04 Lead Guitar — N. Thirapatiyya
 *   05 Bass Guitar — E. Chandra Mohan
 *   06 Vocals — G. Sudhakar        07 Vocals — G. Vijay
 * The camera itself lives in StageUniverse; this section only reports where
 * the tour is through `stageFocus`. Clicking the photo opens the profile.
 */

// Order matches the camera shots in StageUniverse
const TOUR = [
  { id: 1, instrument: 'Rhythm Pad', note: 'Pads & percussion' },
  { id: 2, instrument: 'Drum Kit', note: 'Drums' },
  { id: 3, instrument: 'Piano', note: 'Keys' },
  { id: 4, instrument: 'Lead Guitar', note: 'Lead guitar' },
  { id: 5, instrument: 'Bass Guitar', note: 'Bass' },
  { id: 6, instrument: 'Vocals', note: 'Lead vocals' },
  { id: 7, instrument: 'Vocals', note: 'Lead vocals' }
].map((stop) => ({ ...stop, artist: artists.find((a) => a.id === stop.id) || artists[stop.id - 1] }));

const LAST = TOUR.length - 1;
// how much scroll each instrument gets, in viewport heights
const VH_PER_STOP = 0.9;

// Hold on each instrument for a while, then travel to the next
const holdEase = (x) => {
  const i = Math.floor(x);
  const f = x - i;
  const t = Math.min(1, Math.max(0, (f - 0.28) / 0.44));
  return i + t * t * (3 - 2 * t);
};

export const BandMembers = ({ onNavigate, onOpenModal }) => {
  const sectionRef = useRef(null);
  const panelRef = useRef(null);
  const slashRef = useRef(null);
  const triggerRef = useRef(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const [localModalMember, setLocalModalMember] = useState(null);
  const [isLocalModalOpen, setIsLocalModalOpen] = useState(false);

  // Pin the section and report the tour position to the 3D stage
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const updateWeight = () => {
      const top = section.getBoundingClientRect().top;
      const vh = window.innerHeight || 1;
      stageFocus.weight = Math.max(0, Math.min(1, 1 - Math.abs(top) / vh));
    };

    const ctx = gsap.context(() => {
      triggerRef.current = ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${Math.round(window.innerHeight * VH_PER_STOP * (TOUR.length - 0.4))}`,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const x = self.progress * LAST;
          stageFocus.pos = holdEase(x);
          const idx = Math.min(LAST, Math.max(0, Math.round(x)));
          if (idx !== activeRef.current) {
            activeRef.current = idx;
            setActive(idx);
          }
          updateWeight();
        }
      });
    }, section);

    window.addEventListener('scroll', updateWeight, { passive: true });
    window.addEventListener('resize', updateWeight);
    updateWeight();

    return () => {
      window.removeEventListener('scroll', updateWeight);
      window.removeEventListener('resize', updateWeight);
      ctx.revert();
      triggerRef.current = null;
      stageFocus.weight = 0;
      stageFocus.pos = 0;
    };
  }, []);

  // Artist change: a red slash sweeps the panel, the new name slams in
  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

    const chars = panel.querySelectorAll('.stage-tour-instrument .ch');
    const lines = panel.querySelectorAll('[data-tour-line]');
    const photo = panel.querySelector('.stage-tour-photo');

    const tl = gsap.timeline();
    tl.fromTo(
      slashRef.current,
      { xPercent: -120, skewX: -18, autoAlpha: 1 },
      { xPercent: 120, duration: 0.55, ease: 'power3.inOut' },
      0
    )
      .set(slashRef.current, { autoAlpha: 0 })
      .fromTo(
        chars,
        { yPercent: 115, rotate: 6, opacity: 0 },
        { yPercent: 0, rotate: 0, opacity: 1, duration: 0.5, ease: 'expo.out', stagger: 0.025 },
        0.12
      )
      .fromTo(lines, { y: 18, opacity: 0 }, { y: 0, opacity: 1, duration: 0.45, ease: 'power3.out', stagger: 0.06 }, 0.2)
      .fromTo(
        photo,
        { rotateY: -55, x: 40, opacity: 0, clipPath: 'inset(0 0 0 100%)' },
        { rotateY: 0, x: 0, opacity: 1, clipPath: 'inset(0 0 0 0%)', duration: 0.7, ease: 'expo.out' },
        0.1
      );
    return () => tl.kill();
  }, [active]);

  const handleOpenModal = useCallback(
    (member) => {
      if (onOpenModal) onOpenModal(member);
      else {
        setLocalModalMember(member);
        setIsLocalModalOpen(true);
      }
    },
    [onOpenModal]
  );

  const jumpTo = (i) => {
    const st = triggerRef.current;
    if (!st) return;
    scrollToY(st.start + ((st.end - st.start) * i) / LAST + 1);
  };

  const handleViewAllArtists = (e) => {
    e.preventDefault();
    if (onNavigate) onNavigate('artists', 'view');
  };

  const stop = TOUR[active];
  const member = stop.artist;
  const num = (n) => `0${n}`.slice(-2);

  return (
    <section ref={sectionRef} id="artists-preview" className="stage-tour" aria-label="Meet StarX: the band, one instrument at a time">
      <div className="stage-tour-shade" aria-hidden="true" />

      <header className="stage-tour-head">
        <div className="label-accent" data-rock-fx="1" style={{ fontSize: '12px' }}>
          <span className="label-accent-dot" />
          STARX MUSICIANS
        </div>
        <h2 className="stage-tour-title" data-rock-fx="1">
          MEET STARX
        </h2>
        <p className="stage-tour-sub" data-rock-fx="1">
          Scroll across the stage — one instrument, one artist.
        </p>
      </header>

      <div ref={panelRef} className="stage-tour-panel" key={active}>
        <div ref={slashRef} className="stage-tour-slash" aria-hidden="true" />

        <div className="stage-tour-count" data-tour-line>
          <b>{num(active + 1)}</b>
          <span>/ {num(TOUR.length)}</span>
          <i>{stop.note}</i>
        </div>

        <div className="stage-tour-instrument" aria-hidden="true">
          {stop.instrument.split('').map((c, i) => (
            <span className="mask" key={i}>
              <span className="ch">{c === ' ' ? ' ' : c}</span>
            </span>
          ))}
        </div>

        <div className="stage-tour-body">
          <button
            type="button"
            className="stage-tour-photo"
            onClick={() => handleOpenModal(member)}
            aria-label={`View profile for ${member.name} - ${stop.instrument}`}
          >
            <BrandedImage
              src={member.image}
              alt={`${member.name} - ${member.role}`}
              aspectRatio="4/5"
              fallbackTitle={member.name}
              fallbackSubtitle={member.role}
              variant="member"
              objectFit="cover"
              priority
              style={{ width: '100%', height: '100%' }}
            />
          </button>

          <div className="stage-tour-info">
            <span className="stage-tour-on" data-tour-line>
              On {stop.instrument.toLowerCase() === 'vocals' ? 'the mic' : stop.instrument}
            </span>
            <h3 className="stage-tour-name" data-tour-line>
              {member.name}
            </h3>
            <button type="button" className="stage-tour-profile" data-tour-line onClick={() => handleOpenModal(member)}>
              View profile <ArrowUpRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <nav className="stage-tour-rail" aria-label="Jump to an artist">
        {TOUR.map((s, i) => (
          <button
            type="button"
            key={s.id}
            className={i === active ? 'is-active' : ''}
            onClick={() => jumpTo(i)}
            aria-label={`${s.instrument}: ${s.artist.name}`}
            aria-current={i === active ? 'step' : undefined}
          >
            <span className="n">{num(i + 1)}</span>
            <span className="t">{s.instrument}</span>
          </button>
        ))}
      </nav>

      <a href="/artists" onClick={handleViewAllArtists} className="stage-tour-all">
        <span>View all artist profiles</span>
        <ArrowRight size={14} />
      </a>

      {!onOpenModal && (
        <MemberDetailModal isOpen={isLocalModalOpen} onClose={() => setIsLocalModalOpen(false)} member={localModalMember} />
      )}
    </section>
  );
};

export default BandMembers;
