import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarXIntro from './components/StarXIntro';
import SiteBackground from './components/SiteBackground';
import Navbar from './components/Navbar';
import VideoModal from './components/VideoModal';
import ImageLightbox from './components/ImageLightbox';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollProgress from './components/ScrollProgress';

// 4 Core Homepage Sections (Spec 1 & 2)
import Hero from './sections/Hero';
import BandMembers from './sections/BandMembers';
import FeaturedPerformances from './sections/FeaturedPerformances';
import BookingsContact from './sections/BookingsContact';
import Footer from './sections/Footer';

// 4 Dedicated Internal Views (Spec 3, 4, 31-36)
import AboutView from './views/AboutView';
import MediaView from './views/MediaView';
import EventsView from './views/EventsView';
import CrewView from './views/CrewView';

export function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(() => {
    try {
      return sessionStorage.getItem('starx_intro_seen') === 'true';
    } catch (e) {
      return false;
    }
  });
  const [isIntroTransitioning, setIsIntroTransitioning] = useState(() => {
    try {
      return sessionStorage.getItem('starx_intro_seen') === 'true';
    } catch (e) {
      return false;
    }
  });

  // Dedicated View routing state: 'home' | 'about' | 'media' | 'events' | 'crew'
  const [currentView, setCurrentView] = useState(() => {
    try {
      const path = window.location.pathname.replace(/^\//, '').toLowerCase();
      if (['about', 'media', 'events', 'crew'].includes(path)) {
        return path;
      }
    } catch (e) {
      // ignore
    }
    return 'home';
  });

  const [activeSection, setActiveSection] = useState('home');

  const handleStartTransition = useCallback(() => {
    setIsIntroTransitioning(true);
  }, []);

  const handleComplete = useCallback(() => {
    setIsIntroTransitioning(true);
    setIsIntroComplete(true);
    try {
      sessionStorage.setItem('starx_intro_seen', 'true');
    } catch (e) {
      // ignore
    }
  }, []);

  // Listen to browser Back/Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      try {
        const path = window.location.pathname.replace(/^\//, '').toLowerCase();
        if (['about', 'media', 'events', 'crew'].includes(path)) {
          setCurrentView(path);
        } else {
          setCurrentView('home');
        }
      } catch (e) {
        setCurrentView('home');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Track active section for coordinated background darkness transitions
  useEffect(() => {
    if (currentView !== 'home') {
      setActiveSection(currentView);
      return;
    }

    const handleScroll = () => {
      const sectionIds = ['home', 'artists', 'performances', 'contact'];
      for (const id of sectionIds) {
        const el = document.getElementById(id) || (id === 'artists' ? document.getElementById('members') : null);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight * 0.45 && rect.bottom >= window.innerHeight * 0.2) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  // Video Modal State
  const [activeVideo, setActiveVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Lightbox State
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const handlePlayVideo = (videoData) => {
    setActiveVideo(videoData);
    setIsVideoModalOpen(true);
  };

  const handleOpenPhoto = (items, index = 0) => {
    setLightboxItems(items);
    setLightboxIndex(index);
    setIsLightboxOpen(true);
  };

  // Central Navigation Handler (Specs 3 & 4)
  const handleNavigate = (target, type) => {
    if (type === 'view') {
      setCurrentView(target);
      try {
        window.history.pushState(null, '', `/${target}`);
      } catch (e) {}
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Navigating to a homepage section
      const wasNotHome = currentView !== 'home';
      if (wasNotHome) {
        setCurrentView('home');
        try {
          window.history.pushState(null, '', '/');
        } catch (e) {}
      }

      setTimeout(() => {
        if (target === 'home') {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
          const el =
            document.getElementById(target) ||
            (target === 'artists' ? document.getElementById('members') : null);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }, wasNotHome ? 120 : 0);
    }
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
      {/* 0. Single Global Fixed Background Layer (Continuous across full site) */}
      <SiteBackground activeSection={currentView !== 'home' ? currentView : activeSection} />

      {/* 1. Opening StarX Typography Cinematic Animation */}
      <AnimatePresence>
        {!isIntroComplete && (
          <StarXIntro
            onStartTransition={handleStartTransition}
            onComplete={handleComplete}
          />
        )}
      </AnimatePresence>

      {/* Sleek Top Scroll Progress Bar */}
      <ScrollProgress />

      {/* 2. Floating Island Smoked-Glass Top Navbar */}
      <Navbar
        isIntroActive={isIntroActive}
        currentView={currentView}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      <motion.main
        animate={{
          opacity: isIntroActive ? 0 : 1,
          y: isIntroActive ? 12 : 0
        }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div
              key="homepage-flow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* 1. Home / Hero (Spec 1 & 11) */}
              <Hero isIntroActive={isIntroActive} />

              {/* 2. Meet StarX / Artists (Spec 1 & 13) */}
              <BandMembers />

              {/* 3. Demo Performances (Spec 1 & 20) */}
              <FeaturedPerformances onPlayVideo={handlePlayVideo} />

              {/* 4. Bookings & Contact (Spec 1 & 23) */}
              <BookingsContact />
            </motion.div>
          )}

          {/* Dedicated Internal Views (Spec 3 & 4: 400-550ms transition) */}
          {currentView === 'about' && (
            <AboutView
              key="about-view"
              onBackHome={() => handleNavigate('home', 'section')}
            />
          )}

          {currentView === 'media' && (
            <MediaView
              key="media-view"
              onBackHome={() => handleNavigate('home', 'section')}
              onOpenPhoto={handleOpenPhoto}
            />
          )}

          {currentView === 'events' && (
            <EventsView
              key="events-view"
              onBackHome={() => handleNavigate('home', 'section')}
            />
          )}

          {currentView === 'crew' && (
            <CrewView
              key="crew-view"
              onBackHome={() => handleNavigate('home', 'section')}
            />
          )}
        </AnimatePresence>
      </motion.main>

      {/* Minimal Dark Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Floating WhatsApp Quick Contact Button */}
      <FloatingWhatsApp />

      {/* Smoked-Glass Video Modal */}
      <VideoModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        video={activeVideo}
      />

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
