/**
 * ====================================================================
 * STARX LIVE - CENTRAL WEBSITE DATA STORE
 * ====================================================================
 * All real StarX brand assets, gallery photography, placeholders,
 * and band contact information.
 * ====================================================================
 */

export const DEMO_PERFORMANCE_URL = "https://www.youtube.com/@starxliveband";

export const WHATSAPP_PREFILLED_MESSAGE =
  "Hi StarX Live, I would like to enquire about booking the band for an event. Please share your availability and booking details.";

const ENCODED_WA_MESSAGE = encodeURIComponent(WHATSAPP_PREFILLED_MESSAGE);

export const siteData = {
  // ==========================================
  // 0. RESPONSIVE SITE BACKGROUND & INTRO VIDEOS (Spec 1, 5, 6, 17)
  // ==========================================
  background: {
    desktopVideo: "/assets/videos/starx-bg-pc.mp4",
    mobileVideo: "/assets/videos/starx-bg-mobile.mp4",
    desktopFallback: "/assets/brand/starx-pc-bg.jpeg",
    mobileFallback: "/assets/brand/starx-mobile-bg.png"
  },
  intro: {
    desktopVideo: "/assets/videos/starx-intro-pc.mp4",
    mobileVideo: "/assets/videos/starx-intro-mobile.mp4"
  },

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
    desktopImage: "/assets/brand/starx-pc-bg.jpeg",
    mobileImage: "/assets/brand/starx-mobile-bg.png",
    stageImage: "/assets/gallery/gallery-01.jpg"
  },

  // ==========================================
  // 2. ABOUT US
  // ==========================================
  about: {
    title: "ABOUT STARX",
    description:
      "StarX Live is a Hyderabad-based live rock band performing Classic, Rock and Western music in Telugu and Hindi. The band focuses on live musicianship, energetic performances and recreating familiar music for live audiences.",
    genresText: "CLASSIC • ROCK • WESTERN",
    languagesText: "TELUGU • HINDI",
    locationText: "HYDERABAD",
    image: "/assets/gallery/gallery-03.jpg",
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
  // 4. MEMBERS (ARTISTS) - REAL STARX LINEUP
  // ==========================================
  members: [
    {
      id: 1,
      name: "B. Prasad",
      role: "Rhythm Pad",
      image: "/assets/artists/b-prasad.jpg",
      bio: "Profile details will be updated soon.",
      instagram: ""
    },
    {
      id: 2,
      name: "B. Joseph",
      role: "Drum Kit",
      image: "/assets/artists/b-joseph.jpg",
      bio: "Profile details will be updated soon.",
      instagram: ""
    },
    {
      id: 3,
      name: "G. Perumalla Rao",
      role: "Piano 1",
      image: "/assets/artists/g-perumalla-rao.jpg",
      bio: "Profile details will be updated soon.",
      instagram: ""
    },
    {
      id: 4,
      name: "N. Thirapatiyya",
      role: "Lead Guitar",
      image: null,
      bio: "Profile details will be updated soon.",
      instagram: ""
    },
    {
      id: 5,
      name: "E. Chandra Mohan",
      role: "Bass Guitar",
      image: null,
      bio: "Profile details will be updated soon.",
      instagram: ""
    },
    {
      id: 6,
      name: "K. Sudhakar",
      role: "Singer",
      image: "/assets/artists/k-sudhakar.jpg",
      bio: "Profile details will be updated soon.",
      instagram: ""
    },
    {
      id: 7,
      name: "G. Vijay",
      role: "Singer",
      image: "/assets/artists/g-vijay.jpg",
      bio: "Profile details will be updated soon.",
      instagram: ""
    }
  ],

  // ==========================================
  // 4.1 BEHIND STARX (CREW & PRODUCTION)
  // ==========================================
  crew: [
    {
      id: 1,
      name: "B. Josh",
      role: "Manager & Event Organizer | Primary Contact",
      image: "/assets/crew/b-josh.jpeg",
      bio: `Josh is the Manager and Event Organizer of StarX Live, handling programs, bookings, and event coordination. He manages communication with clients and organizers and coordinates the team for every performance.

He is the Primary Contact for StarX Live, handling event inquiries, bookings, and program-related communication to ensure everything runs smoothly.`,
      instagramLabel: "@starxliveband",
      instagramUrl: "https://www.instagram.com/starxliveband",
      isCrew: true
    },
    {
      id: 2,
      name: "B. Sanjay",
      role: "Digital Media & Creative Director",
      image: "/assets/crew/b-sanjay.jpg",
      bio: `B. Sanjay is the Digital Media & Creative Director of StarX Live, handling the band’s digital presence and creative work. He manages video editing, social media content, and digital branding across Instagram, Facebook, and YouTube.

He also manages and maintains the StarX Live website and online platforms, helping present the band’s music, performances, and events in a modern and engaging way.`,
      instagramLabel: "@s_a_n_j_u_7__",
      instagramUrl: "https://www.instagram.com/s_a_n_j_u_7__/",
      isCrew: true
    },
    {
      id: 3,
      name: "B. Balu",
      role: "Producer",
      image: "/assets/crew/b-balu.jpg",
      bio: `B. Balu is a Producer at StarX Live, supporting the planning and production of the band’s programs and events. He works with the team to manage production activities and helps ensure every performance is well organized and delivered smoothly.`,
      instagramLabel: "",
      instagramUrl: "",
      isCrew: true
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
      thumbnail: "/assets/gallery/gallery-06.jpg",
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
      id: "gal-stage",
      type: "photo",
      title: "StarX Stage",
      subtitle: "Live Stage Setup • Hyderabad",
      image: "/assets/gallery/gallery-01.jpg",
      alt: "StarX Stage - Live Stage Setup Hyderabad",
      downloadFileName: "StarX-Stage.jpg"
    },
    {
      id: "gal-members",
      type: "photo",
      title: "StarX Members",
      subtitle: "StarX Live Band",
      image: "/assets/gallery/gallery-05.jpg",
      alt: "StarX Members - StarX Live Band",
      downloadFileName: "StarX-Members.jpg"
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
      image: "/assets/gallery/gallery-05.jpg",
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
        whatsapp: `https://wa.me/917337253898?text=${ENCODED_WA_MESSAGE}`
      },
      {
        id: "phone-2",
        number: "9390754569",
        display: "9390754569",
        call: "tel:+919390754569",
        whatsapp: `https://wa.me/919390754569?text=${ENCODED_WA_MESSAGE}`
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
      platform: "INSTAGRAM",
      name: "StarX Live Band",
      handle: "@starxliveband",
      url: "https://www.instagram.com/starxliveband"
    },
    facebook: {
      platform: "FACEBOOK",
      name: "Starx LiveBand",
      handle: "@starxliveband",
      url: "https://www.facebook.com/starxliveband?__tn__=%2Cd-UC*F"
    },
    youtube: {
      platform: "YOUTUBE",
      name: "StarX Live Band",
      handle: "@starxliveband",
      url: "https://www.youtube.com/@starxliveband"
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
