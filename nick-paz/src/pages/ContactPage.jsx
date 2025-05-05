// File: src/pages/ContactPage.jsx
import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import React from 'react';

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

  // Social links
  const socialLinks = [
    { name: 'Instagram', icon: '📸', link: 'https://instagram.com/nickpaz' },
    { name: 'LinkedIn', icon: '💼', link: 'https://linkedin.com/in/nickpaz' },
    { name: 'Behance', icon: '🎨', link: 'https://behance.net/nickpaz' },
    { name: 'Twitter', icon: '🐦', link: 'https://twitter.com/nickpaz' }
  ];

  return (
    <div 
      ref={containerRef}
      className="min-h-screen bg-black pt-24 pb-32 relative overflow-hidden"
    >
      {/* Subtle spotlight effect */}
      <div 
        className="absolute pointer-events-none w-96 h-96 rounded-full opacity-30"
        style={{
          background: `radial-gradient(circle, rgba(255,255,255,0.15) 0%, rgba(0,0,0,0) 70%)`,
          transform: `translate(${mousePosition.x - 192}px, ${mousePosition.y - 192}px)`,
          transition: 'transform 0.1s ease-out',
        }}
      ></div>
      
      <div className="max-w-5xl mx-auto px-4">
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
              <div className="p-4 bg-black">
                <img 
                  src="/api/placeholder/350/450" 
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
            <div className="bg-gray-900 border border-gray-800 p-6 mb-8">
              <h2 className="text-xl font-light mb-2 tracking-wide">NICK PAZ</h2>
              <p className="text-sm text-gray-400 italic mb-4">Contemporary Digital Artist</p>
              <p className="mb-4 text-sm leading-relaxed">
                Born in 1990, Nick Paz is a multidisciplinary artist whose work explores the intersection of digital technology and traditional artistic practice. His work has been exhibited in galleries across North America and Europe.
              </p>
              <p className="mb-4 text-sm leading-relaxed">
                Paz's distinctive style combines elements of minimalism with complex digital manipulations, creating pieces that challenge the viewer's perception of space and dimension.
              </p>
              <p className="text-sm leading-relaxed">
                Currently based in New York City, Paz continues to push the boundaries of digital art through experimental techniques and collaborative projects.
              </p>
            </div>
            
            {/* Contact information */}
            <div>
              <h3 className="text-lg font-light mb-4 tracking-wide">CONTACT INFORMATION</h3>
              
              <div className="mb-6">
                <p className="text-gray-300 mb-1">Email:</p>
                <a 
                  href="mailto:contact@nickpaz.com" 
                  className="text-white hover:text-gray-400 transition-colors"
                >
                  contact@nickpaz.com
                </a>
              </div>
              
              <div>
                <p className="text-gray-300 mb-3">Social:</p>
                <div className="flex flex-wrap gap-4">
                  {socialLinks.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.link}
                      className="flex items-center gap-2 bg-gray-900 px-4 py-2 hover:bg-gray-800 transition-colors"
                      whileHover={{ y: -3 }}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{social.icon}</span>
                      <span>{social.name}</span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;