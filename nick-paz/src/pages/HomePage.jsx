import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

const EnhancedSpotlight = () => {
  const containerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Initialize mouse position in the center
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    // Set initial values for CSS variables
    container.style.setProperty('--mouse-x', '50%');
    container.style.setProperty('--mouse-y', '50%');
    
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      
      // Calculate position as percentage of container dimensions
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      
      // Update CSS variables directly for better performance
      container.style.setProperty('--mouse-x', `${x}%`);
      container.style.setProperty('--mouse-y', `${y}%`);
      
      // Also track the exact position for any JS calculations
      setMousePosition({ x, y });
    };
    
    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);
    
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseenter', handleMouseEnter);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);
  
  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black"
      style={{
        // CSS variables for spotlight position
        '--mouse-x': '50%',
        '--mouse-y': '50%',
      }}
    >
      {/* Primary spotlight effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-700"
        style={{
          opacity: isHovering ? 1 : 0.5,
          background: `
            radial-gradient(
              2000px circle at var(--mouse-x) var(--mouse-y), 
              rgba(255, 255, 255, 0.06), 
              transparent 40%
            )
          `,
        }}
      />
      
      {/* Secondary spotlight effect (more concentrated) */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0.7,
          background: `
            radial-gradient(
              1500px circle at var(--mouse-x) var(--mouse-y), 
              rgba(255, 255, 255, 0.1), 
              transparent 30%
            )
          `,
        }}
      />
      
      {/* Core spotlight effect */}
      <div 
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          opacity: isHovering ? 1 : 0.8,
          background: `
            radial-gradient(
              1000px circle at var(--mouse-x) var(--mouse-y), 
              rgba(255, 255, 255, 0.15), 
              transparent 20%
            )
          `,
        }}
      />
      
      {/* Content area - automatically interacts with spotlight */}
      <div className="z-10 flex flex-col items-center space-y-20 text-center">
        {/* Main heading with staggered animation */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="text-8xl font-light tracking-widest text-white"
        >
          NICK PAZ
        </motion.h1>
        
        {/* Subheading */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <div className="h-px w-24 bg-white opacity-30 mb-8" />
          <p className="text-xl tracking-widest text-white opacity-80">
            CONTEMPORARY ARTIST
          </p>
        </motion.div>
      </div>
      
      {/* Bottom text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 flex flex-col items-center space-y-3"
      >
        <div className="h-12 w-px bg-white opacity-20" />
        <p className="text-sm tracking-widest text-white opacity-60">
          INTERACTIVE PORTFOLIO
        </p>
      </motion.div>
    </div>
  );
};

export default EnhancedSpotlight;