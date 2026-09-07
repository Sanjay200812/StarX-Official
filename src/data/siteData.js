/**
 * ====================================================================
 * STARX LIVE - CENTRAL WEBSITE DATA STORE
 * ====================================================================
 * All real StarX brand assets, gallery photography, placeholders,
 * and band contact information.
 * ====================================================================
 */

export const siteData = {
  // ==========================================
  // 1. BRAND IDENTITY
  // ==========================================
  brand: {
    name: "STARX LIVE",
    shortName: "STARX",
    descriptor: "ROCK BAND",
    tagline: "Lost in the Noise. Found in the Sound.",
    location: "HYDERABAD, TS, AP - INDIA",

    // Real Brand Asset Paths
    logo: "/assets/brand/starx-logo.png",
    wordmark: "/assets/brand/starx-wordmark.png",
    banner: "/assets/brand/starx-banner.png",
    longBanner: "/assets/brand/starx-long-banner.png",
    post: "/assets/brand/starx-post.png",
    visitingCard: "/assets/brand/starx-visiting-card.png",

    genres: [
      "CLASSIC",
      "ROCK",
      "WESTERN"
    ],

    languages: [
      "TELUGU",
      "HINDI"
    ],

    genresDisplay: "CLASSIC • ROCK • WESTERN",
    languagesDisplay: "TELUGU • HINDI"
  },

  // ==========================================
  // 1.1 HERO PRESENTATION ASSETS
  // ==========================================
  hero: {
    desktopImage: "/assets/brand/starx-banner.png",
    mobileImage: "/assets/brand/starx-post.png",
    stageImage: "/assets/gallery/gallery-01.jpg"
  },

  // ==========================================
  // 2. ABOUT US
  // ==========================================
  about: {
    title: "WE ARE STARX.",
    description:
      "StarX Live is a Hyderabad-based live rock band performing Classic, Rock and Western music in Telugu and Hindi. Our focus is simple: real musicians, real energy and memorable live performances.",
    genresText: "CLASSIC • ROCK • WESTERN",
    languagesText: "TELUGU • HINDI",
    locationText: "HYDERABAD",
    image: "/assets/gallery/gallery-02.jpg",
    imageAlt: "StarX Live stage performance"
  },

  // ==========================================
  // 3. NEXT EVENT (UPCOMING SHOWCASE)
  // Section 10: Temporary image with "COMING SOON"
  // Do NOT invent fake dates, venues, or times.
  // ==========================================
  nextEvent: {
    status: "COMING SOON",
    title: "NEXT PERFORMANCE",
    eventName: "STAGE ANNOUNCEMENT PENDING",
    venue: "Hyderabad",
    location: "TS, AP - India",
    date: "Coming Soon",
    time: "To Be Announced",
    image: "/assets/gallery/gallery-01.jpg",
    imageAlt: "StarX live concert atmosphere",
    description:
      "Next performance details and concert dates are being finalized. Follow StarX Live on official social channels for upcoming stage announcements and tour schedules.",
    ctaText: "CONTACT STARX"
  },

  // ==========================================
  // 4. MEMBERS (ARTISTS)
  // Section 11 & 12: Premium placeholders
  // DO NOT use current group photos as fake individual portraits.
  // ==========================================
  members: [
    {
      id: 1,
      name: "MEMBER 01",
      role: "VOCALS",
      image: "/assets/artists/member-01.jpg",
      bio: "Artist profile and musician introduction will be updated soon. This section will feature their musical background, performance role in StarX, and vocal style.",
      instagram: "https://www.instagram.com/starxliveband"
    },
    {
      id: 2,
      name: "MEMBER 02",
      role: "LEAD GUITAR",
      image: "/assets/artists/member-02.jpg",
      bio: "Artist profile and musician introduction will be updated soon. This section will feature their guitar influences, riff crafting, and stage performance contribution.",
      instagram: "https://www.instagram.com/starxliveband"
    },
    {
      id: 3,
      name: "MEMBER 03",
      role: "KEYBOARD",
      image: "/assets/artists/member-03.jpg",
      bio: "Artist profile and musician introduction will be updated soon. This section will feature their synthesizer arrangements, soundscapes, and keyboard solos.",
      instagram: "https://www.instagram.com/starxliveband"
    },
    {
      id: 4,
      name: "MEMBER 04",
      role: "BASS",
      image: "/assets/artists/member-04.jpg",
      bio: "Artist profile and musician introduction will be updated soon. This section will feature their low-end groove, rhythm foundation, and live performance energy.",
      instagram: "https://www.instagram.com/starxliveband"
    },
    {
      id: 5,
      name: "MEMBER 05",
      role: "DRUMS",
      image: "/assets/artists/member-05.jpg",
      bio: "Artist profile and musician introduction will be updated soon. This section will feature their percussive drive, dynamic rhythm sections, and drum breakdowns.",
      instagram: "https://www.instagram.com/starxliveband"
    }
  ],

  // ==========================================
  // 5. LIVE PERFORMANCES
  // Section 13: Real stage photos as thumbnails.
  // Clear notice: "Performance video coming soon."
  // ==========================================
  performances: [
    {
      id: "perf-1",
      title: "LIVE STAGE PERFORMANCE",
      subtitle: "Live Concert Energy",
      venue: "Hyderabad Stage",
      location: "Hyderabad",
      date: "Concert Capture",
      thumbnail: "/assets/gallery/gallery-03.jpg",
      videoUrl: "", // Empty: triggers "VIDEO COMING SOON"
      videoType: "coming-soon",
      duration: "Video Coming Soon",
      description: "Live concert video footage is currently being mastered and will be uploaded here shortly."
    },
    {
      id: "perf-2",
      title: "TELUGU & HINDI ROCK SET",
      subtitle: "Live Arena Medley",
      venue: "Live Stage Arena",
      location: "Hyderabad",
      date: "Festival Set",
      thumbnail: "/assets/gallery/gallery-04.jpg",
      videoUrl: "",
      videoType: "coming-soon",
      duration: "Video Coming Soon",
      description: "Full stage rock arrangements capturing StarX live energy before crowd audiences."
    },
    {
      id: "perf-3",
      title: "WESTERN CLASSIC ROCK ANTHEMS",
      subtitle: "Guitar & Rhythm Section",
      venue: "Concert Showcase",
      location: "Hyderabad",
      date: "Special Showcase",
      thumbnail: "/assets/gallery/gallery-05.jpg",
      videoUrl: "",
      videoType: "coming-soon",
      duration: "Video Coming Soon",
      description: "Guitar solos and drum breakdowns under concert spotlights."
    }
  ],

  // ==========================================
  // 6. MEDIA GALLERY (STARX IN ACTION)
  // Section 6 & 7: Uses all real gallery photos 01 to 06
  // ==========================================
  gallery: [
    {
      id: "gal-1",
      type: "photo",
      title: "StarX Live Stage Performance",
      subtitle: "Live Concert Stage • Hyderabad",
      image: "/assets/gallery/gallery-01.jpg",
      alt: "StarX Live stage performance"
    },
    {
      id: "gal-2",
      type: "photo",
      title: "StarX Live Concert",
      subtitle: "Stage Spotlight & Atmosphere",
      image: "/assets/gallery/gallery-02.jpg",
      alt: "StarX live concert"
    },
    {
      id: "gal-3",
      type: "photo",
      title: "StarX Program Performance",
      subtitle: "Concert Lights & Crowd Energy",
      image: "/assets/gallery/gallery-03.jpg",
      alt: "StarX program performance"
    },
    {
      id: "gal-4",
      type: "photo",
      title: "StarX Live Stage Performance",
      subtitle: "Musicians Under Stage Spotlights",
      image: "/assets/gallery/gallery-04.jpg",
      alt: "StarX Live stage performance"
    },
    {
      id: "gal-5",
      type: "photo",
      title: "StarX Live Concert",
      subtitle: "Band Arena Showcase",
      image: "/assets/gallery/gallery-05.jpg",
      alt: "StarX live concert"
    },
    {
      id: "gal-6",
      type: "photo",
      title: "StarX Program Performance",
      subtitle: "Live Rock Recreations",
      image: "/assets/gallery/gallery-06.jpg",
      alt: "StarX program performance"
    }
  ],

  // ==========================================
  // 7. BRAND ARTWORK (Section 14)
  // Real promotional artwork panels
  // ==========================================
  brandArtwork: [
    {
      id: "art-1",
      title: "STARX LIVE OFFICIAL BANNER",
      subtitle: "Stage Identity & Rock Band Crest",
      image: "/assets/brand/starx-banner.png",
      alt: "StarX Live Official Banner"
    },
    {
      id: "art-2",
      title: "STARX PROMOTIONAL POST",
      subtitle: "Tour & Gig Promotional Artwork",
      image: "/assets/brand/starx-post.png",
      alt: "StarX Promotional Poster"
    },
    {
      id: "art-3",
      title: "STARX PANORAMIC BANNER",
      subtitle: "Concert Backdrop Identity",
      image: "/assets/brand/starx-long-banner.png",
      alt: "StarX Panoramic Banner"
    }
  ],

  // ==========================================
  // 8. EVENTS / ON THE STAGE
  // Real archive representation
  // ==========================================
  events: [
    {
      id: "ev-1",
      eventName: "STARX LIVE STAGE CONCERT",
      venue: "Hyderabad Stage Arena",
      location: "Hyderabad",
      date: "Live Stage Concert",
      image: "/assets/gallery/gallery-01.jpg",
      description: "An evening of high-powered classic rock and crowd-favorite Telugu and Hindi anthems."
    },
    {
      id: "ev-2",
      eventName: "STARX LIVE FESTIVAL SET",
      venue: "Hitex Arena Grounds",
      location: "Hyderabad",
      date: "Festival Appearance",
      image: "/assets/gallery/gallery-02.jpg",
      description: "High-energy open-air live rock performance connecting classic riffs with modern crowd melodies."
    },
    {
      id: "ev-3",
      eventName: "ANNUAL LIVE SHOWCASE",
      venue: "Concert Stage",
      location: "Hyderabad",
      date: "Special Showcase",
      image: "/assets/gallery/gallery-03.jpg",
      description: "Special showcase celebrating live musicianship and energetic rock band recreations."
    }
  ],

  // ==========================================
  // 9. CONTACT & BOOKINGS
  // ==========================================
  contact: {
    phoneNumbers: [
      {
        id: "phone-1",
        number: "7337253898",
        display: "7337253898",
        call: "tel:+917337253898",
        whatsapp: "https://wa.me/917337253898?text=Hello%20StarX%20Live,%20I%20would%20like%20to%20enquire%20about%20booking%20the%20band%20for%20an%20event."
      },
      {
        id: "phone-2",
        number: "9390754569",
        display: "9390754569",
        call: "tel:+919390754569",
        whatsapp: "https://wa.me/919390754569?text=Hello%20StarX%20Live,%20I%20would%20like%20to%20enquire%20about%20booking%20the%20band%20for%20an%20event."
      }
    ],

    email: "starxliveofficial@gmail.com",
    emailMailto: "mailto:starxliveofficial@gmail.com?subject=StarX%20Live%20Booking%20Enquiry",

    location: "HYDERABAD, TS, AP - INDIA",
    availabilityNote: "Available for Live Concerts, Festivals, Corporate Galas, College Fests & Private Showcases across India.",
    visitingCard: "/assets/brand/starx-visiting-card.png"
  },

  // ==========================================
  // 10. SOCIAL CHANNELS
  // ==========================================
  social: {
    instagram: {
      label: "@starxliveband",
      url: "https://www.instagram.com/starxliveband",
      handle: "@starxliveband"
    },
    facebook: {
      label: "@starxliveband",
      url: "https://www.facebook.com/starxliveband",
      handle: "@starxliveband"
    },
    youtube: {
      label: "StarX Live",
      url: "https://youtube.com/@starxlive",
      handle: "@starxlive"
    }
  },

  // ==========================================
  // 11. CONNECT WITH STARX / QR
  // Section 16: /assets/qr/starx-qr.png
  // ==========================================
  qr: {
    heading: "CONNECT WITH STARX",
    subtitle: "Scan with your smartphone camera to immediately reach StarX on WhatsApp or save official contacts.",
    image: "/assets/qr/starx-qr.png"
  }
};

export default siteData;
