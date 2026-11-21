import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const cursorX = useSpring(-100, { stiffness: 500, damping: 28 });
  const cursorY = useSpring(-100, { stiffness: 500, damping: 28 });
  const trailX = useSpring(-100, { stiffness: 180, damping: 20 });
  const trailY = useSpring(-100, { stiffness: 180, damping: 20 });

  useEffect(() => {
    // Only enable on pointer-fine devices (desktop mice)
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return;

    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      trailX.set(e.clientX);
      trailY.set(e.clientY);
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (
        target?.closest('button') ||
        target?.closest('a') ||
        target?.closest('input') ||
        target?.closest('textarea') ||
        target?.closest('[data-magnetic]')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleElementHover);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [cursorX, cursorY, trailX, trailY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Center pinpoint */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] w-2 h-2 rounded-full bg-[#FF1744] -translate-x-1/2 -translate-y-1/2 shadow-glow-red"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      {/* Outer red ring / magnetic expansion */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99] rounded-full border border-[#FF1744]/60 -translate-x-1/2 -translate-y-1/2"
        style={{
          x: trailX,
          y: trailY,
        }}
        animate={{
          width: isHovered ? 48 : 26,
          height: isHovered ? 48 : 26,
          borderColor: isHovered ? '#FF1744' : 'rgba(255, 23, 68, 0.45)',
          backgroundColor: isHovered ? 'rgba(255, 23, 68, 0.12)' : 'transparent',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
      />
    </>
  );
}

