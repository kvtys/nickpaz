// File: src/pages/PortfolioPage.jsx
import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import React from 'react';

// Art piece component
const ArtFrame = ({ image, title, description, index }) => {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const x = useTransform(
    scrollYProgress, 
    [0, 0.5, 1], 
    [index % 2 === 0 ? -200 : 200, 0, index % 2 === 0 ? 100 : -100]
  );
  
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0]
  );
  
  const rotateY = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [index % 2 === 0 ? 45 : -45, 0, index % 2 === 0 ? -15 : 15]
  );

  return (
    <motion.div
      ref={ref}
      style={{ x, opacity, rotateY }}
      className="my-64 first:mt-32 last:mb-32 relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className="art-frame relative bg-gray-900 p-1"
        style={{ 
          width: '400px',
          height: '500px',
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
        
        {/* Museum-style label */}
        <div className="absolute -bottom-20 left-0 w-full">
          <h3 className="text-lg font-medium">{title}</h3>
          <p className="text-xs italic opacity-70">NICK PAZ</p>
        </div>
        
        {/* Description overlay */}
        <motion.div 
          className="absolute inset-0 bg-black bg-opacity-80 p-6 flex items-center justify-center text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <p className="text-sm leading-relaxed">{description}</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

const PortfolioPage = () => {
  // Sample art data
  const artworks = [
    {
      id: 1,
      image: "/api/placeholder/400/500",
      title: "Echoes of Silence",
      description: "An exploration of negative space and minimalist expression, drawing inspiration from the Japanese concept of 'Ma' - the meaningful pause."
    },
    {
      id: 2,
      image: "/api/placeholder/400/500",
      title: "Fragments of Memory",
      description: "A multimedia piece combining traditional acrylic techniques with digital manipulation, representing the fragmented nature of human memory."
    },
    {
      id: 3,
      image: "/api/placeholder/400/500",
      title: "Urban Decay Series #7",
      description: "Part of an ongoing documentation of abandoned urban spaces, highlighting the beauty in deterioration and the passage of time."
    },
    {
      id: 4,
      image: "/api/placeholder/400/500",
      title: "Liminal Boundaries",
      description: "An abstract interpretation of transitional spaces, exploring the threshold between physical and metaphysical realms."
    },
    {
      id: 5,
      image: "/api/placeholder/400/500",
      title: "Chromatic Reverie",
      description: "An experiment in color theory and emotional response, using a controlled palette to evoke specific psychological states."
    }
  ];

  return (
    <div className="min-h-screen bg-black pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h1 
          className="text-4xl md:text-6xl mb-16 text-center font-light tracking-widest"
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