import React, { useEffect, useRef } from 'react';

const CursorGlow = () => {
  const ringRef = useRef(null);
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    let mouseX = 0;
    let mouseY = 0;
    
    // Target positions for interpolation (spring/lag effect)
    let ringX = 0;
    let ringY = 0;
    let dotX = 0;
    let dotY = 0;
    let glowX = 0;
    let glowY = 0;

    let isVisible = false;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      
      if (!isVisible) {
        isVisible = true;
        if (ringRef.current) ringRef.current.style.opacity = '1';
        if (dotRef.current) dotRef.current.style.opacity = '1';
        if (glowRef.current) glowRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      isVisible = false;
      if (ringRef.current) ringRef.current.style.opacity = '0';
      if (dotRef.current) dotRef.current.style.opacity = '0';
      if (glowRef.current) glowRef.current.style.opacity = '0';
    };

    // Initialize initial opacity to 0 to avoid flashing at (0,0)
    if (ringRef.current) ringRef.current.style.opacity = '0';
    if (dotRef.current) dotRef.current.style.opacity = '0';
    if (glowRef.current) glowRef.current.style.opacity = '0';

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Smooth opacity transitions
    if (ringRef.current) ringRef.current.style.transition = 'opacity 0.3s ease';
    if (dotRef.current) dotRef.current.style.transition = 'opacity 0.3s ease';
    if (glowRef.current) glowRef.current.style.transition = 'opacity 0.3s ease';

    let animationFrameId;

    const tick = () => {
      // Linear interpolation (lerp) for smooth movement mimicking Framer Motion springs
      // dot: fast tracking
      dotX += (mouseX - dotX) * 0.35;
      dotY += (mouseY - dotY) * 0.35;

      // ring: slightly slower tracking for lag effect
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      // glow: smoother background tracking
      glowX += (mouseX - glowX) * 0.1;
      glowY += (mouseY - glowY) * 0.1;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX - 4}px, ${dotY - 4}px, 0)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX - 16}px, ${ringY - 16}px, 0)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate3d(${glowX - 200}px, ${glowY - 200}px, 0)`;
      }

      animationFrameId = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-cyber-blue pointer-events-none z-[9999] mix-blend-screen will-change-transform opacity-0"
      />
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-cyber-pink pointer-events-none z-[9999] shadow-[0_0_10px_rgba(255,0,255,0.8)] will-change-transform opacity-0"
      />
      
      {/* Glow behind cursor */}
      <div
        ref={glowRef}
        className="fixed top-0 left-0 w-[400px] h-[400px] rounded-full bg-cyber-blue/5 blur-[100px] pointer-events-none z-[1] will-change-transform opacity-0"
      />
    </>
  );
};

export default CursorGlow;

