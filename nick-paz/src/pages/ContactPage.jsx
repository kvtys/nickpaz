// File: src/pages/ContactPage.jsx
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import React from 'react';
import nick from '../assets/nickpaz.jpg';

const ContactPage = () => {
  const containerRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  // Museum spotlight effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black pt-24 pb-32 relative overflow-hidden"
    >
      {/* Subtle spotlight effect */}
      <div 
        className="absolute pointer-events-none w-1000 h-1000 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 70%)`,
          transform: `translate(${mousePosition.x - 2000}px, ${mousePosition.y - 2100}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      ></div>
      
      <div className="max-w-5xl mx-auto px-4 justify-center items-center">
        <motion.h1 
          className="text-4xl md:text-6xl mb-16 text-center font-light tracking-widest"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          CONTACT
        </motion.h1>
        
        <div className="mt-16 flex flex-col md:flex-row items-center md:items-start gap-12">
          {/* Artist image with frame */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            <div className="bg-gray-900 p-1.5 shadow-xl" style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.1) inset' }}>
              <div className="p-12 bg-black">
                <img 
                  src={nick} 
                  alt="Nick Paz" 
                  className="w-full h-full object-cover"
                  style={{ width: '300px', height: '400px' }}
                />
              </div>
            </div>
          </motion.div>
          
          {/* Museum description card */}
          <motion.div 
            className="flex-1 max-w-md"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            <div className="border border-gray-800 p-6 mb-8">
              <h2 className="text-xl font-light mb-2 tracking-wide">NICK PAZ</h2>
              <p className="text-sm text-gray-400 italic mb-4">Contemporary Artist</p>
              <p className="mb-4 text-sm leading-relaxed">
                Born in 2002, Nick Paz is a multidisciplinary artist whose work explores graphic and visual art, typically working in paint, collage, and charcoal. The variety of mediums assists in the wide scale of human experience.
              </p>
              <p className="mb-4 text-sm leading-relaxed">
                Paz's distinctive style explores areas of emotional struggles, addiction, and environmental concerns. 
              </p>
              <p className="text-sm leading-relaxed">
                Currently based in Suffern NY, Paz continues to push the boundaries of art through experimental techniques and projects.
              </p>
            </div>
            
            {/* Contact information */}
            <div>
              <h3 className="text-lg font-light mb-4 tracking-wide">CONTACT INFORMATION</h3>
              
              <div className="mb-6 flex flex-row space-x-2">
                <p className="text-gray-300 mb-1">Email:</p>
                <a 
                  href="mailto:nm22paz@gmail.com" 
                  className="text-white hover:text-gray-400 transition-colors"
                >
                  nm22paz@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;