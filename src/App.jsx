import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import StarXIntro from './components/StarXIntro';
import Navbar from './components/Navbar';
import VideoModal from './components/VideoModal';
import ImageLightbox from './components/ImageLightbox';
import MemberDetailModal from './components/MemberDetailModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';

// Sections in Exact Sequence (Section 45)
import Hero from './sections/Hero';
import AboutStarX from './sections/AboutStarX';
import NextEvent from './sections/NextEvent';
import BandMembers from './sections/BandMembers';
import FeaturedPerformances from './sections/FeaturedPerformances';
import MediaGallery from './sections/MediaGallery';
import BrandIdentity from './sections/BrandIdentity';
import PastPrograms from './sections/PastPrograms';
import BookingsContact from './sections/BookingsContact';
import QrConnect from './sections/QrConnect';
import Footer from './sections/Footer';

export function App() {
  const [isIntroComplete, setIsIntroComplete] = useState(false);
  const [isIntroTransitioning, setIsIntroTransitioning] = useState(false);

  // Member Modal State
  const [selectedMember, setSelectedMember] = useState(null);
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);

  // Video Modal State
  const [activeVideo, setActiveVideo] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Lightbox State
  const [lightboxItems, setLightboxItems] = useState([]);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Handlers
  const handleSelectMember = (member) => {
    setSelectedMember(member);
    setIsMemberModalOpen(true);
  };

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

  const isIntroActive = !isIntroTransitioning && !isIntroComplete;

  return (
    <div
      className="relative min-h-screen"
      style={{
        backgroundColor: '#050505',
        color: '#F5F5F7',
        overflowX: 'hidden'
      }}
    >
      {/* 1. Opening StarX Animation (3.2-3.5s pure black cinematic brand reveal) */}
      <AnimatePresence>
        {!isIntroComplete && (
          <StarXIntro
            onStartTransition={() => setIsIntroTransitioning(true)}
            onComplete={() => {
              setIsIntroTransitioning(true);
              setIsIntroComplete(true);
            }}
          />
        )}
      </AnimatePresence>

      {/* 2. Floating Island Smoked-Glass Top Navbar */}
      <Navbar />

      <main>
        {/* 3. Home / Hero (#home) */}
        <Hero />

        {/* 4. About Us (#about) */}
        <AboutStarX />

        {/* 5. Next Event (#next-event) */}
        <NextEvent />

        {/* 6. Meet StarX / Members (#members) */}
        <BandMembers onSelectMember={handleSelectMember} />

        {/* 7. Live Performances (#performances) */}
        <FeaturedPerformances onPlayVideo={handlePlayVideo} />

        {/* 8. StarX in Action / Media (#media) */}
        <MediaGallery
          onOpenPhoto={handleOpenPhoto}
          onPlayVideo={handlePlayVideo}
        />

        {/* 9. The StarX Identity / Brand Artwork (#identity) */}
        <BrandIdentity onOpenPhoto={handleOpenPhoto} />

        {/* 10. On The Stage / Events (#events) */}
        <PastPrograms onOpenMoment={handleOpenMoment} />

        {/* 10. Bookings & Enquiries (#contact) */}
        <BookingsContact />

        {/* 11. Connect With StarX (#connect) */}
        <QrConnect />
      </main>

      {/* 12. Minimal Dark Footer */}
      <Footer />

      {/* Floating WhatsApp Quick Contact Button */}
      <FloatingWhatsApp />

      {/* Smoked-Glass Member Detail Modal */}
      <MemberDetailModal
        isOpen={isMemberModalOpen}
        onClose={() => setIsMemberModalOpen(false)}
        member={selectedMember}
      />

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
