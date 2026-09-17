import React, { useState, useEffect, useCallback, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarXIntro from './components/StarXIntro';
import SiteBackground from './components/SiteBackground';
import Navbar from './components/Navbar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ImageLightbox from './components/ImageLightbox';
import MemberDetailModal from './components/MemberDetailModal';
import useScrollToTop from './hooks/useScrollToTop';

// 5 Core Homepage Components (Direct synchronous load for instant Hero render - Spec 39)
import Hero from './sections/Hero';
import AboutPreview from './sections/AboutPreview';
import FeaturedPerformances from './sections/FeaturedPerformances';
import BandMembers from './sections/BandMembers';
import CrewPreview from './sections/CrewPreview';
import Footer from './sections/Footer';

// Code-Split Dedicated Views with React.lazy (Spec 38)
const AboutView = lazy(() => import('./views/AboutView'));
const ArtistsView = lazy(() => import('./views/ArtistsView'));
const PerformancesView = lazy(() => import('./views/PerformancesView'));
const MediaView = lazy(() => import('./views/MediaView'));
const EventsView = lazy(() => import('./views/EventsView'));
const CrewView = lazy(() => import('./views/CrewView'));
const ContactView = lazy(() => import('./views/ContactView'));

// Lightweight view skeleton loader for seamless suspense transitions (Spec 38)
function ViewLoader() {
  return (
    <div
      style={{
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1rem'
      }}
    >
      <div
        style={{
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          border: '2px solid rgba(255, 255, 255, 0.08)',
          borderTopColor: '#B3131B',
          animation: 'starxSpin 0.8s linear infinite'
        }}
      />
    </div>
  );
}

export function App() {
  // Intro State backed by sessionStorage (Sections 21-29)
  const hasIntroPlayed = () => {
    try {
      if (typeof window !== 'undefined' && window.location.search.includes('nointro')) {
        return true;
      }
      if (typeof window !== 'undefined' && window.location.search.includes('intro')) {
        sessionStorage.removeItem('starxIntroPlayed');
        sessionStorage.removeItem('starxHeroEntryPlayed');
        return false;
      }
      return sessionStorage.getItem('starxIntroPlayed') === 'true';
    } catch (e) {
      return false;
    }
  };

  const hasHeroEntryPlayed = () => {
    try {
      if (typeof window !== 'undefined' && window.location.search.includes('nointro')) {
        return true;
      }
      if (typeof window !== 'undefined' && window.location.search.includes('intro')) {
        return false;
      }
      return sessionStorage.getItem('starxHeroEntryPlayed') === 'true';
    } catch (e) {
      return false;
    }
  };

  // Dedicated Route / View State (Sections 1-4)
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

  // Direct visit to non-home route (/artists, /crew, etc.) should never be blocked by intro (Specs 46-48)
  const isDirectNonHome = typeof window !== 'undefined' && (() => {
    const path = window.location.pathname.replace(/^\//, '').toLowerCase();
    const validViews = ['about', 'artists', 'performances', 'media', 'events', 'crew', 'contact'];
    return validViews.includes(path);
  })();

  const [introFinished, setIntroFinished] = useState(() => {
    if (isDirectNonHome) return true;
    return hasIntroPlayed();
  });
  const [showIntroOverlay, setShowIntroOverlay] = useState(() => {
    if (isDirectNonHome) return false;
    return !hasIntroPlayed();
  });
  const [heroEntryPlayed, setHeroEntryPlayed] = useState(hasHeroEntryPlayed);
  const isFinishingIntroRef = useRef(false);

  // Reusable routing scroll reset hook (Sections 52-54)
  useScrollToTop(currentView);

  // Photo Lightbox State (for MediaView)
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Modal & Mobile Menu History State (Sections 5-11, 47, 48)
  const [activeMemberModal, setActiveMemberModal] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const activeMemberModalRef = useRef(null);
  const isMobileMenuOpenRef = useRef(false);
  const isLightboxOpenRef = useRef(false);
  const isClosingViaUiRef = useRef(false);
  const hasModalHistoryRef = useRef(false);
  const hasMenuHistoryRef = useRef(false);

  // Keep refs synchronized for immediate synchronous access in popstate
  useEffect(() => {
    activeMemberModalRef.current = activeMemberModal;
  }, [activeMemberModal]);

  useEffect(() => {
    isMobileMenuOpenRef.current = isMobileMenuOpen;
  }, [isMobileMenuOpen]);

  useEffect(() => {
    isLightboxOpenRef.current = isLightboxOpen;
  }, [isLightboxOpen]);

  const handleOpenPhoto = (items, index = 0) => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Coordinated Member Modal Handlers (Sections 5-10, 48)
  const openMemberModal = useCallback((member) => {
    setActiveMemberModal(member);
    try {
      window.history.pushState({ starxModal: true }, '', window.location.href);
      hasModalHistoryRef.current = true;
    } catch (e) {
      // ignore
    }
  }, []);

  const closeMemberModal = useCallback(() => {
    if (hasModalHistoryRef.current) {
      hasModalHistoryRef.current = false;
      isClosingViaUiRef.current = true;
      window.history.back();
    }
    setActiveMemberModal(null);
  }, []);

  // Coordinated Mobile Menu Handlers (Section 47, 48)
  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);
    try {
      window.history.pushState({ starxMenu: true }, '', window.location.href);
      hasMenuHistoryRef.current = true;
    } catch (e) {
      // ignore
    }
  }, []);

  const closeMobileMenu = useCallback(() => {
    if (hasMenuHistoryRef.current) {
      hasMenuHistoryRef.current = false;
      isClosingViaUiRef.current = true;
      window.history.back();
    }
    setIsMobileMenuOpen(false);
  }, []);

  // Lock scroll while intro is visible
  useEffect(() => {
    if (showIntroOverlay) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'auto'
      });
      document.documentElement.classList.add('intro-active');
      document.body.classList.add('intro-active');
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
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

  // Unified intro exit sequence (Sections 20, 27, 28)
  const finishIntro = useCallback(() => {
    if (isFinishingIntroRef.current) return;
    isFinishingIntroRef.current = true;

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });

    setShowIntroOverlay(false);
    document.documentElement.classList.remove('intro-active');
    document.body.classList.remove('intro-active');
    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    try {
      sessionStorage.setItem('starxIntroPlayed', 'true');
    } catch (e) {
      // ignore
    }

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

      requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'auto'
        });

        // Reveal Home content
        setIntroFinished(true);
      });
    });
  }, []);

  const handleIntroStartExit = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'auto'
    });
  }, []);

  // Hero entrance completion callback (Section 27)
  const handleHeroEntryComplete = useCallback(() => {
    try {
      sessionStorage.setItem('starxHeroEntryPlayed', 'true');
    } catch (e) {
      // ignore
    }
    setHeroEntryPlayed(true);
  }, []);

  // Central Single popstate Listener (Priority: Modal > Menu > Lightbox > Route; Sections 47, 48, 53, 54)
  useEffect(() => {
    const handlePopState = () => {
      // 1. If programmatic close via UI button ("X", ESC, backdrop) triggered this back, consume and exit
      if (isClosingViaUiRef.current) {
        isClosingViaUiRef.current = false;
        return;
      }

      // 2. Priority 1: Open Member Modal -> Close it, stay on page, do NOT scroll!
      if (activeMemberModalRef.current) {
        hasModalHistoryRef.current = false;
        setActiveMemberModal(null);
        return;
      }

      // 3. Priority 2: Open Mobile Menu -> Close it, stay on page, do NOT scroll!
      if (isMobileMenuOpenRef.current) {
        hasMenuHistoryRef.current = false;
        setIsMobileMenuOpen(false);
        return;
      }

      // 4. Priority 3: Open Lightbox -> Close it, stay on page
      if (isLightboxOpenRef.current) {
        setIsLightboxOpen(false);
        return;
      }

      // 5. Otherwise: Normal Route Navigation!
      try {
        const path = window.location.pathname.replace(/^\//, '').toLowerCase();
        const validViews = ['about', 'artists', 'performances', 'media', 'events', 'crew', 'contact'];
        if (validViews.includes(path)) {
          setCurrentView(path);
        } else {
          setCurrentView('home');
        }
      } catch (e) {
        setCurrentView('home');
      }
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Central Direct Navigation Handler (Sections 1-4)
  const handleNavigate = useCallback((target) => {
    // If mobile menu was open when navigating, close it cleanly
    if (isMobileMenuOpenRef.current) {
      setIsMobileMenuOpen(false);
      hasMenuHistoryRef.current = false;
    }
    // If modal was open, close it
    if (activeMemberModalRef.current) {
      setActiveMemberModal(null);
      hasModalHistoryRef.current = false;
    }

    const currentPath = window.location.pathname.replace(/^\//, '').toLowerCase();
    const targetPath = target === 'home' ? '' : target;

    // If already on the requested route, don't push duplicate history entry
    if (currentPath === targetPath) {
      setCurrentView(target);
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    setCurrentView(target);
    try {
      window.history.pushState(null, '', `/${targetPath}`);
    } catch (e) {
      // ignore
    }

    // Scroll restoration: always start at the top on navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  const isHomeReady = introFinished && currentView === 'home';
  const isNavbarReady = introFinished;
  const isIntroActive = !introFinished;

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: 'transparent',
        color: '#F5F5F7'
      }}
    >
      {/* 0. Single Global Fixed Background Layer (Spec 29-32) */}
      <SiteBackground currentView={currentView} isIntroActive={isIntroActive} />

      {/* 
        Controlled Website Content Wrapper:
        Hero is mounted and measured underneath intro (Section 20).
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
        {/* 2. Floating Smoked-Glass Top Navbar */}
        <Navbar
          isReady={isNavbarReady}
          isIntroActive={isIntroActive}
          currentView={currentView}
          onNavigate={handleNavigate}
          isMobileMenuOpen={isMobileMenuOpen}
          onOpenMobileMenu={openMobileMenu}
          onCloseMobileMenu={closeMobileMenu}
        />

        <main id="main-content">
          <AnimatePresence mode="wait">
            {/* =======================================================
                HOME PAGE: ONLY Hero, About Preview, Best Performance,
                Meet StarX, Behind StarX, and Footer
               ======================================================= */}
            {currentView === 'home' && (
              <motion.div
                key="home-view"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div id="homepage-flow">
                  {/* 1. Hero / Home */}
                  <Hero
                    onNavigate={handleNavigate}
                    isReady={isHomeReady}
                    firstEntry={!heroEntryPlayed}
                    onEntryComplete={handleHeroEntryComplete}
                  />

                  {/* 2. About StarX Preview */}
                  <AboutPreview onNavigate={handleNavigate} />

                  {/* 3. Best Performance Preview */}
                  <FeaturedPerformances onNavigate={handleNavigate} />

                  {/* 4. Artists Preview (Meet StarX) */}
                  <BandMembers
                    onNavigate={handleNavigate}
                    onOpenModal={openMemberModal}
                  />

                  {/* 5. Crew Preview (Behind StarX) */}
                  <CrewPreview
                    onNavigate={handleNavigate}
                    onOpenModal={openMemberModal}
                  />
                </div>
              </motion.div>
            )}

            {/* =======================================================
                DEDICATED VIEWS: Direct navigation targets (Code-split with Suspense, Spec 38)
               ======================================================= */}
            {currentView === 'about' && (
              <motion.div
                key="about-view"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
              >
                <Suspense fallback={<ViewLoader />}>
                  <AboutView onBackHome={() => handleNavigate('home')} />
                </Suspense>
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
                <Suspense fallback={<ViewLoader />}>
                  <ArtistsView
                    onBackHome={() => handleNavigate('home')}
                    onOpenModal={openMemberModal}
                  />
                </Suspense>
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
                <Suspense fallback={<ViewLoader />}>
                  <PerformancesView onBackHome={() => handleNavigate('home')} />
                </Suspense>
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
                <Suspense fallback={<ViewLoader />}>
                  <MediaView
                    onBackHome={() => handleNavigate('home')}
                    onOpenPhoto={handleOpenPhoto}
                  />
                </Suspense>
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
                <Suspense fallback={<ViewLoader />}>
                  <EventsView onBackHome={() => handleNavigate('home')} />
                </Suspense>
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
                <Suspense fallback={<ViewLoader />}>
                  <CrewView
                    onBackHome={() => handleNavigate('home')}
                    onOpenModal={openMemberModal}
                  />
                </Suspense>
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
                <Suspense fallback={<ViewLoader />}>
                  <ContactView onBackHome={() => handleNavigate('home')} />
                </Suspense>
              </motion.div>
            )}
          </AnimatePresence>
        </main>

        {/* Compact Professional StarX Footer */}
        <Footer onNavigate={handleNavigate} />
      </div>

      {/* Central Root Member Detail Modal (Sections 5-11, 48, 53) */}
      <MemberDetailModal
        isOpen={Boolean(activeMemberModal)}
        onClose={closeMemberModal}
        member={activeMemberModal}
      />

      {/* Fullscreen Intro Video Overlay */}
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

      {/* Floating WhatsApp Quick Contact Button (Section 49) */}
      <FloatingWhatsApp />

      {/* Deep Black Photo Lightbox */}
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
