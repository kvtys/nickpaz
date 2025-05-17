// File: src/pages/PortfolioPage.jsx
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';
import p1 from '../assets/portfolio/p1.jpg';
import p2 from '../assets/portfolio/p2.jpg';
import p3 from '../assets/portfolio/p3.jpg';
import p4 from '../assets/portfolio/p4.jpg';
import p5 from '../assets/portfolio/p5.jpg';
import p6 from '../assets/portfolio/p6.jpg';
import p7 from '../assets/portfolio/p7.jpg';
import p8 from '../assets/portfolio/p8.jpg';
import p9 from '../assets/portfolio/p9.jpg';


// Art piece component
const ArtFrame = ({ image, title, description, index }) => {
  const [dimensions, setDimensions] = useState({ width: 400, height: 500 });
  const [isMobile, setIsMobile] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Responsive animation values
  const x = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    isMobile 
      ? [0, 0, 0]  // No horizontal movement on mobile
      : [index % 2 === 0 ? -200 : 200, 0, index % 2 === 0 ? 100 : -100]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    isMobile
      ? [0, 0, 0]  // No rotation on mobile
      : [index % 2 === 0 ? 45 : -45, 0, index % 2 === 0 ? -15 : 15]
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );

  const ProgressBar = () => {
    const { scrollYProgress } = useScroll();
    
    return (
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    );
  };

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!image) return;
    
    const img = new Image();
    img.onload = () => {
      // Set max dimensions while maintaining aspect ratio
      const maxWidth = isMobile ? 320 : 600;
      const maxHeight = isMobile ? 400 : 800;
      
      let width = img.width;
      let height = img.height;
      
      // Scale down if necessary while preserving aspect ratio
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      if (height > maxHeight) {
        width = (width * maxHeight) / height;
        height = maxHeight;
      }
      
      // Ensure minimum dimensions
      width = Math.max(width, isMobile ? 280 : 400);
      height = Math.max(height, isMobile ? 350 : 500);
      
      setDimensions({ width, height });
    };
    
    img.src = image;
  }, [image, isMobile]);

  return (
    <div>
      <ProgressBar />
      <motion.div
        ref={ref}
        style={{ x, opacity, rotateY, scale }}
        className="my-32 md:my-16 first:mt-16 md:first:mt-32 last:mb-16 md:last:mb-32 relative"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          className="art-frame relative bg-gray-900 p-1 mx-auto"
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 10px rgba(255,255,255,0.1) inset'
          }}
        >
          <div className="w-full h-full p-4 bg-black">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-contain"
            />
          </div>
        
          {/* Museum-style label */}
          <div className="absolute -bottom-20 left-0 w-full">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-xs italic opacity-70">NICK PAZ</p>
          </div>
        
          {/* Description overlay - Use native touch events for mobile */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-80 p-6 flex items-center justify-center text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsHovered(!isHovered)} // Toggle on touch for mobile
          >
            <p className="text-sm leading-relaxed">{description}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const PortfolioPage = () => {
  // Sample art data
  const artworks = [
    {
      id: 1,
      image: p1,
      title: "Unfulfilment",
      description: "Punching the air n shii"
    },
    {
      id: 2,
      image: p2,
      title: "Hand Realism",
      description: "Ow, my finger hurts"
    },
    {
      id: 3,
      image: p3,
      title: "Pastel Screaming",
      description: "I'm tweaking"
    },
    {
      id: 4,
      image: p4,
      title: "Figure and environment",
      description: "Showering"
    },
    {
      id: 5,
      image: p5,
      title: "Concern Painting",
      description: "Something is up"
    },
    {
      id: 6,
      image: p6,
      title: "Environmental Awareness",
      description: "Turtles n shii bro"
    },
    {
      id: 7,
      image: p7,
      title: "Painterly Self Portrait",
      description: "Perfection"
    },
    {
      id: 8,
      image: p8,
      title: "CD Redesigns",
      description: "?????"
    },
    {
      id: 9,
      image: p9,
      title: "Connecting Addictions",
      description: "I LOVE ADDICTION"
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-6xl mb-8 md:mb-16 text-center font-light tracking-widest"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          PORTFOLIO
        </motion.h1>
        
        <div className="flex flex-col items-center">
          {artworks.map((artwork, index) => (
            <ArtFrame 
              key={artwork.id}
              image={artwork.image}
              title={artwork.title}
              description={artwork.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PortfolioPage;