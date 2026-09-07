import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Zap, Flame, Radio, Music } from 'lucide-react';
import { siteData } from '../data/siteData';
import SectionHeader from '../components/SectionHeader';

/**
 * SoundSection Component
 * Showcases the 3 core genres (Classic, Rock, Western) with symbolic icons,
 * performed in Telugu & Hindi, with animated music waveforms.
 */
export const SoundSection = () => {
  const { sound } = siteData;
  const [activeGenre, setActiveGenre] = useState('rock');

  const getGenreIcon = (id) => {
    switch (id) {
      case 'classic':
        return <Music size={32} />;
      case 'rock':
        return <Zap size={32} />;
      case 'western':
        return <Flame size={32} />;
      default:
        return <Music size={32} />;
    }
  };

  return (
    <section id="sound" className="section" style={{ backgroundColor: '#0A0A0A' }}>
      <div className="container">
        <SectionHeader
          badge="SONIC PROFILE"
          title={sound.heading}
          subtitle={sound.subtitle}
          align="center"
        />

        {/* 3 Genre Panels */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.75rem',
            marginTop: '3rem'
          }}
        >
          {sound.genres.map((genre) => {
            const isCurrent = activeGenre === genre.id;
            return (
              <motion.div
                key={genre.id}
                whileHover={{ y: -6, transition: { duration: 0.25 } }}
                onClick={() => setActiveGenre(genre.id)}
                className="stage-card"
                style={{
                  padding: '2.25rem 1.75rem',
                  cursor: 'pointer',
                  borderColor: isCurrent ? 'rgba(255, 42, 53, 0.6)' : 'rgba(255, 255, 255, 0.08)',
                  boxShadow: isCurrent
                    ? '0 15px 35px rgba(0, 0, 0, 0.8), 0 0 25px rgba(229, 9, 20, 0.3)'
                    : 'none',
                  background: isCurrent
                    ? 'radial-gradient(circle at 50% 0%, rgba(229, 9, 20, 0.18) 0%, rgba(18, 18, 18, 0.9) 70%)'
                    : 'var(--bg-card)',
                  transition: 'all 0.3s ease'
                }}
              >
                {/* Icon Container */}
                <div
                  style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '12px',
                    background: isCurrent ? '#FF2A35' : 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: isCurrent ? '#FFFFFF' : '#FF2A35',
                    marginBottom: '1.5rem',
                    boxShadow: isCurrent ? '0 0 20px rgba(255, 42, 53, 0.6)' : 'none',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {getGenreIcon(genre.id)}
                </div>

                <span
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    letterSpacing: '2px',
                    color: '#888',
                    textTransform: 'uppercase',
                    display: 'block',
                    marginBottom: '0.35rem'
                  }}
                >
                  {genre.tag}
                </span>

                <h3
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    fontSize: '2.4rem',
                    letterSpacing: '2px',
                    color: '#FFFFFF',
                    marginBottom: '0.75rem'
                  }}
                >
                  {genre.name}
                </h3>

                <p
                  style={{
                    fontSize: '0.9rem',
                    color: '#A0A0A0',
                    lineHeight: 1.6,
                    margin: 0
                  }}
                >
                  {genre.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Performed in Telugu & Hindi section */}
        <div
          style={{
            marginTop: '4rem',
            padding: '2.5rem 1.5rem',
            background: 'radial-gradient(circle at 50% 50%, rgba(229, 9, 20, 0.12) 0%, rgba(10, 10, 10, 0.8) 75%)',
            border: '1px solid rgba(229, 9, 20, 0.25)',
            borderRadius: '16px',
            textAlign: 'center'
          }}
        >
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: '0.85rem',
              fontWeight: 800,
              letterSpacing: '4px',
              color: '#FF2A35',
              textTransform: 'uppercase',
              display: 'block',
              marginBottom: '0.85rem'
            }}
          >
            {sound.languagesText}
          </span>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'clamp(1rem, 3vw, 2.5rem)',
              flexWrap: 'wrap',
              marginBottom: '1.75rem'
            }}
          >
            {sound.languages.map((lang) => (
              <span
                key={lang}
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 'clamp(2rem, 5vw, 3.2rem)',
                  letterSpacing: '3px',
                  color: '#FFFFFF',
                  textShadow: '0 0 20px rgba(255, 42, 53, 0.4)'
                }}
              >
                {lang}
              </span>
            ))}
          </div>

          {/* Animated Music Waveform Visualizer */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '6px',
              height: '42px',
              margin: '1rem auto',
              maxWidth: '300px'
            }}
          >
            {[40, 75, 50, 95, 30, 85, 60, 100, 45, 90, 35, 70, 55, 80].map((height, i) => (
              <div
                key={i}
                className="waveform-bar"
                style={{
                  width: '5px',
                  height: `${height}%`,
                  backgroundColor: i % 2 === 0 ? '#FF2A35' : '#E50914',
                  borderRadius: '3px',
                  animationDelay: `${(i * 0.08).toFixed(2)}s`,
                  boxShadow: '0 0 6px rgba(255, 42, 53, 0.6)'
                }}
              />
            ))}
          </div>

          <p
            style={{
              fontSize: '0.85rem',
              color: '#888',
              maxWidth: '520px',
              margin: '1.25rem auto 0 auto',
              lineHeight: 1.5
            }}
          >
            {sound.note}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SoundSection;
