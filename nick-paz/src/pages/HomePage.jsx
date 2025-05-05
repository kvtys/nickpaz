// File: src/pages/HomePage.jsx
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import React from 'react';

const HomePage = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      setDimensions({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight
      });
    }

    const handleResize = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight
        });
      }
    };

    const handleMouseMove = (e) => {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };

    window.addEventListener('resize', handleResize);
    if (containerRef.current) {
      containerRef.current.addEventListener('mousemove', handleMouseMove);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      if (containerRef.current) {
        containerRef.current.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, [containerRef]);

  return (
    <div 
      ref={containerRef}
      className="relative h-screen w-full flex justify-center items-center overflow-hidden bg-black"
    >
      <div 
        className="absolute pointer-events-none w-96 h-96 rounded-full"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0) 70%)`,
          transform: `translate(${mousePosition.x - 192}px, ${mousePosition.y - 192}px)`,
          transition: 'transform 0.05s ease-out',
        }}
      ></div>
      
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="text-8xl font-light tracking-widest z-10"
      >
        NICK PAZ
      </motion.h1>
      
      <div className="absolute bottom-10 w-full flex justify-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 2, duration: 1 }}
          className="text-sm tracking-widest"
        >
          INTERACTIVE PORTFOLIO
        </motion.p>
      </div>
    </div>
  );
};

export default HomePage;