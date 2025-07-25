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
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  // Responsive animation values - simplified for mobile
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
    [0, 0, 0]  // Removed rotation entirely as it can cause issues on mobile
  );

  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    isMobile 
      ? [0.9, 1, 1, 0.9]  // Less extreme scale for mobile
      : [0.8, 1, 1, 0.8]
  );

  // Extracted ProgressBar to avoid re-creation
  const ProgressBar = () => {
    const { scrollYProgress } = useScroll();
    
    return (
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    );
  };

  // Check for mobile viewport with a more reliable breakpoint
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

  // Set fixed dimensions based on viewport size, regardless of image resolution
  useEffect(() => {
    // Get viewport dimensions
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Set dimensions based on screen size - prioritizing large display
    let width, height;
    
    if (viewportWidth < 640) {
      // Small mobile devices
      width = viewportWidth * 0.85; // 85% of viewport width
      height = viewportHeight * 0.6; // 60% of viewport height
    } else if (viewportWidth < 768) {
      // Larger mobile devices
      width = viewportWidth * 0.8;
      height = viewportHeight * 0.65;
    } else if (viewportWidth < 1280) {
      // Tablets and smaller desktops
      width = Math.min(viewportWidth * 0.7, 800);
      height = Math.min(viewportHeight * 0.75, 900);
    } else {
      // Large desktops - significantly larger display
      width = Math.min(viewportWidth * 0.6, 1100);
      height = Math.min(viewportHeight * 0.8, 1000);
    }
    
    // Apply the dimensions directly without checking image size
    setDimensions({ width, height });
  }, [isMobile]);

  return (
    <div className="w-full flex justify-center">
      <motion.div
        ref={ref}
        style={{ x, opacity, rotateY, scale }}
        className="my-20 sm:my-28 md:my-36 first:mt-8 sm:first:mt-16 last:mb-16 relative"
      >
        <div
          className="art-frame relative bg-gray-900 p-1 mx-auto shadow-2xl"
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
              className="w-full h-full object-cover"
            />
          </div>
        
          {/* Museum-style label - improved positioning for mobile */}
          <div className="absolute -bottom-16 left-0 w-full px-2 text-center">
            <h3 className="text-lg font-medium">{title}</h3>
            <p className="text-xs italic opacity-70">NICK PAZ</p>
          </div>
        
          {/* Description overlay - now toggles on tap/click for all devices */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-80 p-4 sm:p-6 flex items-center justify-center text-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: isDescriptionVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
          >
            <p className="text-sm leading-relaxed">{description}</p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

const PortfolioPage = () => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  // Progress bar at component level to avoid re-rendering
  const ProgressBar = () => {
    const { scrollYProgress } = useScroll();
    
    return (
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
        style={{ scaleX: scrollYProgress }}
      />
    );
  };

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

  // Don't render until client-side to avoid hydration issues
  if (!isMounted) return null;

  return (
    <div className="min-h-screen bg-black pt-16 sm:pt-24 pb-24 sm:pb-32">
      <ProgressBar />
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          className="text-3xl sm:text-4xl md:text-6xl mb-6 sm:mb-8 md:mb-16 text-center font-light tracking-widest"
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