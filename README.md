# STARX LIVE – Official Rock Band Website

Welcome to the official web application for **STARX LIVE – ROCK BAND**, Hyderabad, India.

> *"Lost in the Noise. Found in the Sound."*

This website is a premium, minimal, cinematic web application built with **React**, **Vite**, and **Framer Motion**. It is designed with the restraint, typography, and spacing of high-end modern brands like Apple and iQOO, featuring calm transitions, large imagery, clean navigation, and natural, easy scrolling.

---

## Page Structure (Exact Sequence)

1. **Opening StarX Animation**: Calm 2.5–3s cinematic sequence (subtle red glow, logo scales 0.9 → 1 with light sweep, "LIVE", "ROCK BAND", tagline, "SKIP" button, single-session display via `sessionStorage`).
2. **Top Sticky Navbar**: 74px header, translucent black `rgba(0,0,0,0.75)` with backdrop blur, links to `HOME`, `ABOUT`, `MEMBERS`, `PERFORMANCES`, `MEDIA`, `EVENTS`, `CONTACT`, plus a clean `CONTACT STARX` button.
3. **Home / Hero (`#home`)**: Full-screen layout with large StarX visual, band title, descriptor, tagline, genres, languages, and `WATCH LIVE` & `CONTACT STARX` buttons.
4. **About Us (`#about`)**: Two-column layout immediately following the Hero (`WE ARE STARX.` heading, band story, genre and location badges).
5. **Next Event (`#next-event`)**: Dedicated upcoming concert presentation with large visual, venue, date, time, and `CONTACT US` button (strictly no ticket sales or payment gateways).
6. **Members (`#members`)**: `MEET STARX` artist portrait grid showing only Image, Name, and Role with a subtle 1.02x hover zoom.
7. **Member Detail Modal**: Clicking any musician opens a clean dialog displaying a large photo, Name, Role, 4–5 line biography, and Instagram link.
8. **Live Performances (`#performances`)**: Large 16:9 featured stage performance video + 2 secondary videos with fullscreen video modal (YouTube & MP4 support).
9. **Media Gallery (`#media`)**: Filter tabs (`ALL`, `PHOTOS`, `VIDEOS`) with editorial mixed composition and fullscreen lightbox viewer.
10. **Events / On The Stage (`#events`)**: Editorial showcase of past stage programs with `VIEW MEDIA`.
11. **Bookings & Enquiries (`#contact`)**: `BRING STARX TO YOUR STAGE.`, dual direct phone numbers `7337253898` and `9390754569` (direct CALL and WHATSAPP buttons), email `starxliveofficial@gmail.com`, and location `HYDERABAD, TS, AP - INDIA`.
12. **Connect With StarX (`#connect`)**: Flat scannable QR code alongside direct Instagram, Facebook, and YouTube links.
13. **Footer**: Minimal black footer with navigation links, social channels, copyright, and music recreation disclaimer.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Locally
```bash
npm run dev
```
Preview at `http://localhost:3000` or `http://localhost:3001`.

### 3. Production Build
```bash
npm run build
```
Generates an optimized static bundle in `dist/`.

---

## Centralized Content Store (`src/data/siteData.js`)

All website content and placeholder details are stored in:
📁 **`src/data/siteData.js`**

| What to Update | Section in `siteData.js` | Details |
| :--- | :--- | :--- |
| **Brand Info & Location** | `brand` | Name, descriptor, tagline, genres, languages, location. |
| **About Narrative** | `about` | Heading, description, and highlights. |
| **Next Upcoming Event** | `nextEvent` | Event name, venue, date, time, location, description. |
| **Band Members & Bios** | `members` | Artist names, roles, portrait images, 4–5 line bios, Instagram. |
| **Featured Videos** | `performances` | Video titles, venues, duration, thumbnails, YouTube/MP4 URLs. |
| **Media Gallery** | `gallery` | Concert photographs and video clips with filter tags. |
| **Past Programs** | `events` | Previous concert venues, dates, and descriptions. |
| **Contact Numbers & WhatsApp** | `contact.phoneNumbers` | Display number, call link, and WhatsApp link for both lines. |
| **Official Email** | `contact.email` | Official email address and mailto link. |
| **Social Links** | `social` | Instagram, Facebook, and YouTube URLs and handles. |
| **QR Code Connect** | `qr` | QR image path and direct link URL. |

---

## Asset Folders Guide (`public/assets/`)

- `public/assets/brand/`: Band logos (`starx-logo.svg`, `starx-symbol.svg`).
- `public/assets/hero/`: Hero backgrounds (`hero-desktop.jpg`, `hero-mobile.jpg`).
- `public/assets/artists/`: Musician portrait photos (`member-01.jpg` to `member-05.jpg`).
- `public/assets/performances/`: Featured concert thumbnails (`performance-01.jpg` to `03.jpg`).
- `public/assets/gallery/`: Live concert photography and video snapshots.
- `public/assets/events/`: Event posters or past gig photos (`event-01.jpg`, etc.).
- `public/assets/qr/`: Flat, scannable QR code (`starx-qr.svg` or `starx-qr.png`).
- `public/assets/videos/`: Local MP4 video clips.

If an asset is missing or still being prepared, the website automatically falls back to a branded dark concert silhouette card. Broken image icons will never be displayed.
