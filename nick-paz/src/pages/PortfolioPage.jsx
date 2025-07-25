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
import p10 from '../assets/portfolio/p10.jpg';
import p11 from '../assets/portfolio/p11.jpg';

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
      title: "Addicted to Feeling",
      description: "The complexity of love broken down into eight stages on vinyl records using acrylic paint"
    },
    {
      id: 2,
      image: p2,
      title: "Mixed Media Album Reworks",
      description: "Acrylic paint on CD cases with a listening element"
    },
    {
      id: 3,
      image: p3,
      title: "Fragile Depths",
      description: "Oil painting addressing the dangers of deep sea mining to mass produce technology"
    },
    {
      id: 4,
      image: p4,
      title: "Crushed by Industry",
      description: "A collage tackling societal priorities of consumerism over wild life"
    },
    {
      id: 5,
      image: p5,
      title: "Side Effects May Vary",
      description: "Comparing similarities of social media and drugs through collage"
    },
    {
      id: 6,
      image: p6,
      title: "Drowning in Noise",
      description: "Pastel drawing portrait of overstimulation"
    },
    {
      id: 7,
      image: p7,
      title: "Having Fun! i guess.",
      description: "Oil painting portrait about trying to fit in"
    },
    {
      id: 8,
      image: p8,
      title: "what am i doing wrong.",
      description: "Charcoal drawing inspired by Euan Uglow that is about someone going through a hard time"
    },
    {
      id: 9,
      image: p9,
      title: "Resilience",
      description: "Charcoal drawing using a figure by Daniel Maidman of someone fighting in a tough situation"
    },
    {
      id: 10,
      image: p10,
      title: "Hand Recreation",
      description: "Charcoal drawing that recreates a hand from Daniel Maidman’s Manou Drawing series"
    },
    {
      id: 11,
      image: p11,
      title: "Five Figures",
      description: "Oil painting that recreates Jean Arp’s, Composition of Five Nudes"
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