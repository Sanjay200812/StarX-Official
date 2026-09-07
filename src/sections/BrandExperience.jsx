import React from 'react';
import { motion } from 'framer-motion';
import { Flame, Radio, Zap } from 'lucide-react';
import { siteData } from '../data/siteData';

/**
 * BrandExperience Section
 * High-impact cinematic typography and 3D floating experience cards.
 */
export const BrandExperience = () => {
  const { experience } = siteData;

  const icons = [<Flame size={28} />, <Zap size={28} />, <Radio size={28} />];

  return (
    <section
      className="section"
      style={{
        backgroundColor: '#090909',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Giant Red Star Glow */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '700px',
          height: '700px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(229, 9, 20, 0.18) 0%, transparent 70%)',
          pointerEvents: 'none',
          filter: 'blur(70px)'
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 2 }}>
        <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 4rem auto' }}>
          <span className="red-badge" style={{ marginBottom: '1rem' }}>
            THE STARX EXPERIENCE
          </span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
              letterSpacing: '3px',
              color: '#FFFFFF',
              lineHeight: 0.95,
              marginBottom: '1.5rem',
              textShadow: '0 0 30px rgba(229, 9, 20, 0.4)'
            }}
          >
            LOUD MUSIC.<br />
            <span style={{ color: '#FF2A35' }}>LASTING MEMORIES.</span>
          </motion.h2>

          <p
            style={{
              fontSize: '1.15rem',
              color: '#D0D0D0',
              lineHeight: 1.7,
              maxWidth: '680px',
              margin: '0 auto'
            }}
          >
            "{experience.statement}"
          </p>
        </div>

        {/* 3 Layered Poster Cards with 3D Depth */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '2rem'
          }}
        >
          {experience.posters.map((poster, index) => (
            <motion.div
              key={poster.title}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.15 }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="stage-card"
              style={{
                padding: '2.5rem 2rem',
                border: '1px solid rgba(229, 9, 20, 0.25)',
                background: 'radial-gradient(circle at 50% 0%, rgba(229, 9, 20, 0.12) 0%, rgba(18, 18, 18, 0.95) 75%)',
                position: 'relative'
              }}
            >
              {/* Icon Container */}
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '12px',
                  background: 'rgba(255, 42, 53, 0.15)',
                  border: '1px solid rgba(255, 42, 53, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FF2A35',
                  marginBottom: '1.5rem',
                  boxShadow: '0 0 15px rgba(229, 9, 20, 0.3)'
                }}
              >
                {icons[index % icons.length]}
              </div>

              <h3
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: '1.8rem',
                  letterSpacing: '1.5px',
                  color: '#FFFFFF',
                  marginBottom: '0.75rem'
                }}
              >
                {poster.title}
              </h3>

              <p style={{ fontSize: '0.9rem', color: '#A0A0A0', lineHeight: 1.6, margin: 0 }}>
                {poster.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandExperience;
