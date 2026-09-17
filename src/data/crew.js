/**
 * ====================================================================
 * STARX LIVE - CENTRAL CREW DATA STORE
 * ====================================================================
 * Single source of truth for StarX behind-the-scenes crew & production.
 * Used identically by:
 * - Home -> Behind StarX preview (CrewPreview.jsx)
 * - /crew page (CrewView.jsx)
 * - Crew member profile modal (MemberDetailModal.jsx)
 * ====================================================================
 */

export const crew = [
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
];

export default crew;
