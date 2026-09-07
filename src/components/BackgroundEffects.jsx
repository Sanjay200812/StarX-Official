import React from 'react';

/**
 * BackgroundEffects Component
 * Renders concert atmosphere: ambient red glow spots, slow sweeping light beams,
 * and subtle floating dust/embers.
 */
export const BackgroundEffects = () => {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0
      }}
    >
      {/* Top Center Concert Spot */}
      <div
        className="spotlight-glow spotlight-red animate-pulse-red"
        style={{
          top: '-15%',
          left: '25%',
          width: '50vw',
          height: '50vw',
          maxHeight: '600px',
          maxWidth: '600px'
        }}
      />

      {/* Subtle Right Beam */}
      <div
        className="stage-beam"
        style={{
          top: '10%',
          right: '5%'
        }}
      />

      {/* Mid-Page Ambient Red Core */}
      <div
        className="spotlight-glow spotlight-red"
        style={{
          top: '55%',
          left: '-10%',
          width: '45vw',
          height: '45vw',
          opacity: 0.12
        }}
      />

      {/* Subtle Stage Dust / Embers Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(1px 1px at 20px 30px, rgba(255, 42, 53, 0.4), rgba(0, 0, 0, 0)), ' +
            'radial-gradient(1.5px 1.5px at 40px 70px, rgba(255, 255, 255, 0.25), rgba(0, 0, 0, 0)), ' +
            'radial-gradient(1px 1px at 90px 40px, rgba(255, 42, 53, 0.3), rgba(0, 0, 0, 0)), ' +
            'radial-gradient(1.5px 1.5px at 160px 120px, rgba(255, 255, 255, 0.2), rgba(0, 0, 0, 0))',
          backgroundRepeat: 'repeat',
          backgroundSize: '240px 240px',
          opacity: 0.45
        }}
      />
    </div>
  );
};

export default BackgroundEffects;
