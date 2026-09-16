import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarXIntro from './components/StarXIntro';
import SiteBackground from './components/SiteBackground';
import Navbar from './components/Navbar';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ImageLightbox from './components/ImageLightbox';

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
  // Intro State backed by sessionStorage (Spec 11 & 67)
  const [isIntroComplete, setIsIntroComplete] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.location.search.includes('intro')) {
        sessionStorage.removeItem('starxIntroPlayed');
        return false;
      }
      return sessionStorage.getItem('starxIntroPlayed') === 'true';
    } catch (e) {
      return false;
    }
  });

  const [isIntroTransitioning, setIsIntroTransitioning] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.location.search.includes('intro')) {
        return false;
      }
      return sessionStorage.getItem('starxIntroPlayed') === 'true';
    } catch (e) {
      return false;
    }
  });

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

  // Photo Lightbox State (for MediaView)
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handleOpenPhoto = (items, index = 0) => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  const handleStartTransition = useCallback(() => {
    setIsIntroTransitioning(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsIntroTransitioning(true);
    setIsIntroComplete(true);
    try {
      sessionStorage.setItem('starxIntroPlayed', 'true');
    } catch (e) {
      // ignore
    }
  }, []);

  // Listen to browser Back/Forward navigation (Spec 68)
  useEffect(() => {
    const handlePopState = () => {
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
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Central Direct Navigation Handler (Spec 14, 60, 69)
  const handleNavigate = (target) => {
    const route = target === 'home' ? '' : target;
    setCurrentView(target);

    try {
      window.history.pushState(null, '', `/${route}`);
    } catch (e) {
      // ignore
    }

    // Scroll restoration: always start at the top on navigation (Spec 69)
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const isIntroActive = !isIntroTransitioning && !isIntroComplete;

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: 'transparent',
        color: '#F5F5F7'
      }}
    >
      {/* 0. Single Global Fixed Background Layer (Spec 2 & 3) */}
      <SiteBackground currentView={currentView} />

      {/* 1. Fullscreen Intro Video Overlay (Spec 6-12) */}
      <AnimatePresence>
        {!isIntroComplete && (
          <StarXIntro
            onStartTransition={handleStartTransition}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>

      {/* 2. Floating Smoked-Glass Top Navbar (Spec 14 & 15) */}
      <Navbar
        isIntroActive={isIntroActive}
        currentView={currentView}
        onNavigate={handleNavigate}
      />

      <motion.main
        style={{
          position: 'relative',
          zIndex: 1
        }}
        animate={{
          opacity: isIntroActive ? 0 : 1,
          y: isIntroActive ? 8 : 0
        }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait">
          {/* =======================================================
              HOME PAGE: ONLY Hero, About Preview, Best Performance,
              Meet StarX, Behind StarX, and Footer (Spec 16 & 71)
             ======================================================= */}
          {currentView === 'home' && (
            <motion.div
              key="homepage-flow"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* 1. Hero / Home */}
              <Hero onNavigate={handleNavigate} isIntroActive={isIntroActive} />

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
      </motion.main>

      {/* Compact Professional StarX Footer (Spec 38-46) */}
      <Footer onNavigate={handleNavigate} />

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
