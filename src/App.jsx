import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarXIntro from './components/StarXIntro';
import SiteBackground from './components/SiteBackground';
import Navbar from './components/Navbar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ImageLightbox from './components/ImageLightbox';
import useScrollToTop from './hooks/useScrollToTop';

// 5 Core Homepage Components (Spec 16 & 71)
import Hero from './sections/Hero';
import AboutPreview from './sections/AboutPreview';
import FeaturedPerformances from './sections/FeaturedPerformances';
import BandMembers from './sections/BandMembers';
import CrewPreview from './sections/CrewPreview';
import Footer from './sections/Footer';

// Dedicated Direct Views (Spec 13, 14, 60)
import AboutView from './views/AboutView';
import ArtistsView from './views/ArtistsView';
import PerformancesView from './views/PerformancesView';
import MediaView from './views/MediaView';
import EventsView from './views/EventsView';
import CrewView from './views/CrewView';
import ContactView from './views/ContactView';

export function App() {
  // Intro State backed by sessionStorage (Requirements 1, 8, 21, 22)
  const hasIntroPlayed = () => {
    try {
      if (typeof window !== 'undefined' && window.location.search.includes('intro')) {
        sessionStorage.removeItem('starxIntroPlayed');
        return false;
      }
      return sessionStorage.getItem('starxIntroPlayed') === 'true';
    } catch (e) {
      return false;
    }
  };

  const [introFinished, setIntroFinished] = useState(hasIntroPlayed);
  const [showIntroOverlay, setShowIntroOverlay] = useState(() => !hasIntroPlayed());
  const [homeAnimationKey, setHomeAnimationKey] = useState(0);
  const isFinishingIntroRef = useRef(false);

  // Dedicated Route / View State (Spec 13 & 68)
  const [currentView, setCurrentView] = useState(() => {
    try {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      const validViews = ['about', 'artists', 'performances', 'media', 'events', 'crew', 'contact'];
      if (validViews.includes(path)) {
        return path;
      }
    } catch (e) {
      // fallback
    }
    return 'home';
  });

  // Reusable routing scroll reset and hash clearing hook (Requirements 18, 19, 20)
  useScrollToTop(currentView);

  // Photo Lightbox State (for MediaView)
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOpenPhoto = (items, index = 0) => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Lock scroll while intro is visible (Requirement 2 & 3)
  useEffect(() => {
    if (showIntroOverlay) {
      // 1. Force top scroll position immediately before intro starts (Requirement 3)
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });

      // 2. Lock page scroll (Requirement 2)
      document.documentElement.classList.add('intro-active');
      document.body.classList.add('intro-active');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      // Unlock page scroll when intro is not active
      document.documentElement.classList.remove('intro-active');
      document.body.classList.remove('intro-active');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }

    return () => {
      document.documentElement.classList.remove('intro-active');
      document.body.classList.remove('intro-active');
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [showIntroOverlay]);

  // Unified intro exit sequence (Requirements 4, 5, 6, 14, 21-25)
  const finishIntro = useCallback(() => {
    if (isFinishingIntroRef.current) return;
    isFinishingIntroRef.current = true;

    // 1. Force top scroll position immediately before removing overlay (Requirement 4)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    // 2. Hide intro overlay
    setShowIntroOverlay(false);

    // 3. Unlock page scroll
    document.documentElement.classList.remove('intro-active');
    document.body.classList.remove('intro-active');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    try {
      sessionStorage.setItem('starxIntroPlayed', 'true');
    } catch (e) {
      // ignore
    }

    // 4. Force top again after overlay removal (Requirement 4)
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    // 5. Nested requestAnimationFrame guarantees layout is fully calculated and top is maintained
    requestAnimationFrame(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto'
        });

        // Refresh GSAP ScrollTrigger if available (Requirement 14)
        if (typeof window !== 'undefined' && window.ScrollTrigger) {
          try {
            window.ScrollTrigger.refresh();
          } catch (e) {}
        }

        // 6. Reveal Home content (Requirement 6 & 25)
        setIntroFinished(true);

        // 7. Trigger Home entrance animation from time 0 (Requirement 11)
        setHomeAnimationKey((prev) => prev + 1);
      });
    });
  }, []);

  // While intro overlay is fading out, keep home top position stable
  const handleIntroStartExit = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, []);

  // Listen to browser Back/Forward navigation (Spec 68 & 19)
  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname.replace(/^\//, '').toLowerCase();
        const validViews = ['about', 'artists', 'performances', 'media', 'events', 'crew', 'contact'];
        if (validViews.includes(path)) {
          setCurrentView(path);
        } else {
          setCurrentView('home');
          setHomeAnimationKey((prev) => prev + 1);
        }
      } catch (e) {
        setCurrentView('home');
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Central Direct Navigation Handler (Spec 14, 19, 60, 69, Requirements 19 & 20)
  const handleNavigate = (target) => {
    const route = target === 'home' ? '' : target;
    setCurrentView(target);

    // When returning to Home, restart Home animation cleanly from 0 (Requirements 19 & 20)
    if (target === 'home') {
      setHomeAnimationKey((prev) => prev + 1);
    }

    try {
      window.history.pushState(null, '', `/${route}`);
    } catch (e) {
      // ignore
    }

    // Scroll restoration: always start at the top on navigation (Requirement 19)
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  };

  const isHomeReady = introFinished && currentView === 'home';
  const isNavbarReady = introFinished;
  const isIntroActive = !introFinished;

  return (
    <div
      className={`relative min-h-screen ${introFinished ? 'home-ready' : 'home-waiting'}`}
      style={{
        backgroundColor: 'transparent',
        color: '#F5F5F7'
      }}
    >
      {/* 0. Single Global Fixed Background Layer (Spec 2 & 3, Requirement 26 & 27) */}
      <SiteBackground currentView={currentView} />

      {/* 1. Fullscreen Intro Video Overlay (Spec 6-12, Requirements 1-6) */}
      <AnimatePresence>
        {showIntroOverlay && (
          <StarXIntro
            onStartExit={handleIntroStartExit}
            onFinishExit={finishIntro}
            onFinishIntro={finishIntro}
            onComplete={finishIntro}
          />
        )}
      </AnimatePresence>

      {/* 
        Controlled Website Content Wrapper (Requirements 25 & 30):
        Holds both the Navbar, Main Content, and Footer in a unified layout.
        While intro is active: opacity is 0 and pointerEvents none, keeping full layout
        established with Hero at Y=0 and Footer at the bottom, eliminating layout jumps.
      */}
      <div
        id="site-content"
        className={introFinished ? 'home-ready' : 'home-waiting'}
        style={{
          position: 'relative',
          zIndex: 1,
          opacity: introFinished ? 1 : 0,
          pointerEvents: introFinished ? 'auto' : 'none',
          transition: 'opacity 0.45s cubic-bezier(0.22, 1, 0.36, 1)'
        }}
      >
        {/* 2. Floating Smoked-Glass Top Navbar (Spec 14 & 15) */}
        <Navbar
          isReady={isNavbarReady}
          isIntroActive={isIntroActive}
          currentView={currentView}
          onNavigate={handleNavigate}
        />

        <main id="main-content">
          <AnimatePresence mode="wait">
            {/* =======================================================
                HOME PAGE: ONLY Hero, About Preview, Best Performance,
                Meet StarX, Behind StarX, and Footer (Spec 16 & 71)
               ======================================================= */}
            {currentView === 'home' && (
              <motion.div
                key={`homepage-flow-${homeAnimationKey}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              >
                {/* 1. Hero / Home */}
                <Hero
                  onNavigate={handleNavigate}
                  isReady={isHomeReady}
                  animationKey={homeAnimationKey}
                />

                {/* 2. About StarX Preview */}
                <AboutPreview onNavigate={handleNavigate} />

                {/* 3. Best Performance Preview */}
                <FeaturedPerformances onNavigate={handleNavigate} />

                {/* 4. Artists Preview (Meet StarX) */}
                <BandMembers onNavigate={handleNavigate} />

                {/* 5. Crew Preview (Behind StarX) */}
                <CrewPreview onNavigate={handleNavigate} />
              </motion.div>
            )}

            {/* =======================================================
                DEDICATED VIEWS: Direct navigation targets (Spec 13, 14, 26, 60)
               ======================================================= */}
            {currentView === 'about' && (
              <motion.div
                key="about-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <AboutView onBackHome={() => handleNavigate('home')} />
              </motion.div>
            )}

            {currentView === 'artists' && (
              <motion.div
                key="artists-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <ArtistsView onBackHome={() => handleNavigate('home')} />
              </motion.div>
            )}

            {currentView === 'performances' && (
              <motion.div
                key="performances-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <PerformancesView onBackHome={() => handleNavigate('home')} />
              </motion.div>
            )}

            {currentView === 'media' && (
              <motion.div
                key="media-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <MediaView
                  onBackHome={() => handleNavigate('home')}
                  onOpenPhoto={handleOpenPhoto}
                />
              </motion.div>
            )}

            {currentView === 'events' && (
              <motion.div
                key="events-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <EventsView onBackHome={() => handleNavigate('home')} />
              </motion.div>
            )}

            {currentView === 'crew' && (
              <motion.div
                key="crew-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <CrewView onBackHome={() => handleNavigate('home')} />
              </motion.div>
            )}

            {currentView === 'contact' && (
              <motion.div
                key="contact-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <ContactView onBackHome={() => handleNavigate('home')} />
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Compact Professional StarX Footer (Spec 38-46, inside controlled site-content) */}
        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Floating WhatsApp Quick Contact Button (Spec 58) */}
      <FloatingWhatsApp />

      {/* Deep Black Photo Lightbox (Spec 51) */}
      <ImageLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        items={lightboxItems}
        currentIndex={lightboxIndex}
        onNavigate={(newIdx) => setLightboxIndex(newIdx)}
      />
    </div>
  );
}

export default App;
