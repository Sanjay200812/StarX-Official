import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import StarXIntro from './components/StarXIntro';
import SiteBackground from './components/SiteBackground';
import Navbar from './components/Navbar';
import VideoModal from './components/VideoModal';
import ImageLightbox from './components/ImageLightbox';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import ScrollProgress from './components/ScrollProgress';

// Sections in Exact Sequence (Section 45)
import Hero from './sections/Hero';
import AboutStarX from './sections/AboutStarX';
import NextEvent from './sections/NextEvent';
import BandMembers from './sections/BandMembers';
import FeaturedPerformances from './sections/FeaturedPerformances';
import MediaGallery from './sections/MediaGallery';
import PastPrograms from './sections/PastPrograms';
import BookingsContact from './sections/BookingsContact';
import QrConnect from './sections/QrConnect';
import Footer from './sections/Footer';

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

  // Track active section for coordinated darkness transitions & navigation
  useEffect(() => {
    const handleScroll = () => {
      const sectionIds = [
        'home',
        'about',
        'next-event',
        'members',
        'performances',
        'media',
        'events',
        'contact',
        'connect'
      ];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
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
  }, []);

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

  const handleOpenMoment = (eventData) => {
    handleOpenPhoto([
      {
        id: eventData.id,
        image: eventData.image,
        title: eventData.eventName,
        subtitle: `${eventData.venue} • ${eventData.location}`
      }
    ], 0);
  };

  const handleOpenBanner = () => {
    handleOpenPhoto([
      {
        id: 'starx-long-banner',
        image: '/assets/brand/starx-long-banner.png',
        title: 'STARX LIVE',
        subtitle: 'Official Long Banner',
        downloadFileName: 'StarX-Live-Banner.png'
      }
    ], 0);
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
      <SiteBackground activeSection={activeSection} />

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
      <Navbar isIntroActive={isIntroActive} />

      <motion.main
        animate={{
          opacity: isIntroActive ? 0 : 1,
          y: isIntroActive ? 12 : 0
        }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* 3. Home / Hero (#home) */}
        <Hero isIntroActive={isIntroActive} onOpenBanner={handleOpenBanner} />

        {/* 4. About Us (#about) */}
        <AboutStarX />

        {/* 5. Next Event (#next-event) */}
        <NextEvent />

        {/* 6. Meet StarX / Members (#members) */}
        <BandMembers />

        {/* 7. Live Performances (#performances) */}
        <FeaturedPerformances onPlayVideo={handlePlayVideo} />

        {/* 8. StarX in Action / Media (#media) */}
        <MediaGallery
          onOpenPhoto={handleOpenPhoto}
          onPlayVideo={handlePlayVideo}
        />

        {/* 9. On The Stage / Events (#events) */}
        <PastPrograms onOpenMoment={handleOpenMoment} />

        {/* 10. Bookings & Enquiries (#contact) */}
        <BookingsContact />

        {/* 11. Connect With StarX (#connect) */}
        <QrConnect />
      </motion.main>

      {/* 12. Minimal Dark Footer */}
      <Footer />

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
