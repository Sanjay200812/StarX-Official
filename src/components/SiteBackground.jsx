import React, { Suspense, lazy } from 'react';

// three.js is heavy, so the 3D stage loads in its own chunk after first paint
const StageUniverse = lazy(() => import('./rock/StageUniverse'));

/**
 * Global fixed background.
 * The old looping stage video is gone; every route now sits on one shared
 * 3D stage (dust tunnel, vinyl, sound rings, guitar picks) that moves with
 * scroll. A dark stage gradient shows underneath while it loads, or if WebGL
 * is unavailable.
 */
export const SiteBackground = ({ currentView = 'home' }) => {
  const isHome = currentView === 'home' || currentView === '' || currentView === '/';

  return (
    <div
      className="site-background"
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100dvh',
        zIndex: -3,
        overflow: 'hidden',
        pointerEvents: 'none',
        background: 'radial-gradient(ellipse at 50% 110%, #2a0507 0%, #0a0606 55%, #050303 100%)'
      }}
    >
      <Suspense fallback={null}>
        <StageUniverse />
      </Suspense>

      {/* Readability veil: lighter on Home so the stage shows, darker on inner pages */}
      <div
        className="site-background-overlay"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          pointerEvents: 'none',
          background: isHome
            ? 'radial-gradient(ellipse at center, rgba(7,4,4,0.28) 30%, rgba(7,4,4,0.62) 100%)'
            : 'linear-gradient(180deg, rgba(7,4,4,0.55), rgba(7,4,4,0.7))',
          transition: 'background 0.6s ease'
        }}
      />
    </div>
  );
};

export default SiteBackground;
