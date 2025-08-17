// File: src/pages/PortfolioPage.jsx
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_PAGE } from '../Constants';
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

  return (
    <div className="w-full flex justify-center">
      <motion.div
        ref={ref}
        style={{ x, opacity, rotateY, scale }}
        className="my-20 sm:my-28 md:my-36 first:mt-8 sm:first:mt-16 last:mb-16 relative"
      >
        <div className="art-frame relative bg-gray-900 p-1 mx-auto shadow-2xl h-[65%] w-[100%]">
          <div className="w-full h-full p-4 bg-black">
            <img
              src={image}
              alt={title}
              className="w-full h-full"
            />
          </div>
        
          {/* Museum-style label - improved positioning for mobile */}
          <div className="absolute -bottom-16 left-0 w-full px-2 text-center">
            <h3 className="lg:text-3xl sm:text-lg font-medium">{title}</h3>
            <p className="lg:text-lg sm:text-sm italic opacity-70">NICK PAZ</p>
          </div>
        
          {/* Description overlay - now toggles on tap/click for all devices */}
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-80 p-4 sm:p-6 flex items-center justify-center text-center cursor-pointer"
            initial={{ opacity: 0 }}
            animate={{ opacity: isDescriptionVisible ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsDescriptionVisible(!isDescriptionVisible)}
          >
            <p className="lg:text-3xl sm:text-lg leading-relaxed">{description}</p>
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
      title: PORTFOLIO_PAGE.ARTWORKS[0].title,
      description: PORTFOLIO_PAGE.ARTWORKS[0].description
    },
    {
      id: 2,
      image: p2,
      title: PORTFOLIO_PAGE.ARTWORKS[1].title,
      description: PORTFOLIO_PAGE.ARTWORKS[1].description
    },
    {
      id: 3,
      image: p3,
      title: PORTFOLIO_PAGE.ARTWORKS[2].title,
      description: PORTFOLIO_PAGE.ARTWORKS[2].description
    },
    {
      id: 4,
      image: p4,
      title: PORTFOLIO_PAGE.ARTWORKS[3].title,
      description: PORTFOLIO_PAGE.ARTWORKS[3].description
    },
    {
      id: 5,
      image: p5,
      title: PORTFOLIO_PAGE.ARTWORKS[4].title,
      description: PORTFOLIO_PAGE.ARTWORKS[4].description
    },
    {
      id: 6,
      image: p6,
      title: PORTFOLIO_PAGE.ARTWORKS[5].title,  
      description: PORTFOLIO_PAGE.ARTWORKS[5].description
    },
    {
      id: 7,
      image: p7,
      title: PORTFOLIO_PAGE.ARTWORKS[6].title,
      description: PORTFOLIO_PAGE.ARTWORKS[6].description
    },
    {
      id: 8,
      image: p8,
      title: PORTFOLIO_PAGE.ARTWORKS[7].title,
      description: PORTFOLIO_PAGE.ARTWORKS[7].description
    },
    {
      id: 9,
      image: p9,
      title: PORTFOLIO_PAGE.ARTWORKS[8].title,
      description: PORTFOLIO_PAGE.ARTWORKS[8].description
    },
    {
      id: 10,
      image: p10,
      title: PORTFOLIO_PAGE.ARTWORKS[9].title,  
      description: PORTFOLIO_PAGE.ARTWORKS[9].description
    },
    {
      id: 11,
      image: p11,
      title: PORTFOLIO_PAGE.ARTWORKS[10].title,
      description: PORTFOLIO_PAGE.ARTWORKS[10].description
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
          {PORTFOLIO_PAGE.TITLE}
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