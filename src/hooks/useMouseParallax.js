import { useState, useEffect } from 'react';

/**
 * useMouseParallax Hook
 * Calculates subtle normalized mouse offsets (-1 to 1) for 3D depth layers.
 * Completely disables on mobile / touch / reduced-motion.
 */
export const useMouseParallax = () => {
  const [offsets, setOffsets] = useState({
    bg: { x: 0, y: 0 },
    mid: { x: 0, y: 0 },
    fg: { x: 0, y: 0 }
  });

  useEffect(() => {
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isTouch || isReduced) return;

    const handleMouseMove = (e) => {
      const { innerWidth, innerHeight } = window;
      // Normalize from -1 to 1
      const normX = (e.clientX / innerWidth) * 2 - 1;
      const normY = (e.clientY / innerHeight) * 2 - 1;

      setOffsets({
        bg: { x: normX * 5, y: normY * 5 },     // 5px far background
        mid: { x: normX * 10, y: normY * 10 },  // 10px middle layer
        fg: { x: normX * 15, y: normY * 15 }    // 15px foreground
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return offsets;
};

export default useMouseParallax;
