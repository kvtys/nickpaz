// File: src/pages/ContemporaryCritiquePage.jsx
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import React from 'react';
import p1 from '../assets/contemporarycritique/p1.jpg'
import p2 from '../assets/contemporarycritique/p2.jpg'
import p3 from '../assets/contemporarycritique/p3.jpg'
import p4 from '../assets/contemporarycritique/p4.jpg'
import p5 from '../assets/contemporarycritique/p5.jpg'
import p6 from '../assets/contemporarycritique/p6.jpg'
import p7 from '../assets/contemporarycritique/p7.jpg'
import p8 from '../assets/contemporarycritique/p8.jpg'
import p9 from '../assets/contemporarycritique/p9.jpg'
import p10 from '../assets/contemporarycritique/p10.jpg'
import p11 from '../assets/contemporarycritique/p11.jpg'
import p12 from '../assets/contemporarycritique/p12.jpg'
import p13 from '../assets/contemporarycritique/p13.jpg'
import p14 from '../assets/contemporarycritique/p14.jpg'
import p15 from '../assets/contemporarycritique/p15.jpg'
import p16 from '../assets/contemporarycritique/p16.jpg'
import p17 from '../assets/contemporarycritique/p17.jpg'
import p18 from '../assets/contemporarycritique/p18.jpg'
import p19 from '../assets/contemporarycritique/p19.jpg'

// Image Modal Component
const ImageModal = ({ imageUrl, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <motion.div 
      className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="relative max-w-4xl max-h-[80vh] p-2"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        transition={{ type: "spring", damping: 15 }}
      >
        <img 
          src={imageUrl} 
          alt="Enlarged view" 
          className="max-h-[80vh] max-w-full object-contain"
        />
        <button 
          className="absolute top-4 right-4 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center"
          onClick={onClose}
        >
          ✕
        </button>
      </motion.div>
    </motion.div>
  );
};

// Timeline Item Component
const TimelineItem = ({ item, index, isEven }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [isInView, controls]);

  const variants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? 100 : -100 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.8,
        delay: 0.2,
        type: "spring",
        stiffness: 80
      }
    }
  };

  const iconVariants = {
    initial: { 
      scale: 1,
      rotate: 0,
      boxShadow: `0 0 0 4px #000, inset 0 0 0 1px rgba(255,255,255,0.5), 0 0 0 4px rgba(255,255,255,0.1)`
    },
    hover: { 
      scale: 1.2,
      rotate: 360,
      boxShadow: `0 0 0 4px #000, inset 0 0 0 1px rgba(255,255,255,1), 0 0 0 8px rgba(255,255,255,0.3)`,
      transition: { duration: 0.8 }
    }
  };

  const contentVariants = {
    initial: { 
      backgroundColor: 'rgba(30, 30, 30, 0.8)',
      boxShadow: '0 3px 15px rgba(255,255,255,0.1)'
    },
    hover: { 
      backgroundColor: 'rgba(40, 40, 40, 0.9)',
      boxShadow: '0 5px 25px rgba(255,255,255,0.2)',
      transition: { duration: 0.3 }
    }
  };

  const handleImageClick = (imageUrl) => {
    setModalImage(imageUrl);
  };

  const closeModal = () => {
    setModalImage(null);
  };

  return (
    <div
      ref={ref}
      className={`flex items-center mb-24 w-full ${isEven ? 'justify-start' : 'justify-end'}`}
    >
      <motion.div
        className={`relative flex ${isEven ? 'flex-row' : 'flex-row-reverse'} items-center w-full md:w-5/6 max-w-5xl`}
        initial="hidden"
        animate={controls}
        variants={variants}
      >
        {/* Icon */}
        <motion.div
          className="relative flex-shrink-0 w-16 h-16 z-10 rounded-full flex items-center justify-center"
          style={{ background: item.color }}
          variants={iconVariants}
          initial="initial"
          whileHover="hover"
          animate={isHovered ? "hover" : "initial"}
        >
          <CustomIcon phase={item.phase} isActive={isHovered} />
        </motion.div>
        {/* Line */}
        <div className={`absolute top-1/2 h-px w-full bg-gradient-to-r ${isEven ? 'from-transparent to-gray-700' : 'from-gray-700 to-transparent'} z-0`}></div>
        {/* Content */}
        <motion.div
          className={`relative flex-grow mx-6 p-6 rounded-lg z-10`}
          style={{
            background: 'rgba(30, 30, 30, 0.8)',
            color: '#fff',
            boxShadow: '0 3px 15px rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(8px)',
            maxWidth: '70%'
          }}
          variants={contentVariants}
          initial="initial"
          whileHover="hover"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          {/* Date - Moved inside the content div at the top */}
          <div className="text-sm text-gray-400 font-light tracking-wider mb-2">
            {item.date}
          </div>
          
          <h3 className="text-xl font-light tracking-wider">
            {item.title}
          </h3>
          <p className="text-gray-300 mt-4">
            {item.description}
          </p>
          
          {/* Image section - now works with just one image or two images */}
          <div className="mt-4 flex justify-center">
            {item.image && (
              <div className={item.image2 ? "flex-1 flex justify-center" : "flex justify-center"}>
                <img
                  src={item.image}
                  alt="Timeline image"
                  className="max-h-[200px] max-w-full object-contain cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleImageClick(item.image)}
                />
              </div>
            )}
            
            {item.image2 && (
              <div className="flex-1 flex justify-center">
                <img
                  src={item.image2}
                  alt="Timeline image"
                  className="max-h-[200px] max-w-full object-contain cursor-pointer transition-transform hover:scale-105"
                  onClick={() => handleImageClick(item.image2)}
                />
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
      
      {/* Image Modal */}
      <ImageModal 
        imageUrl={modalImage} 
        isOpen={!!modalImage} 
        onClose={closeModal} 
      />
    </div>
  );
};

// Enhanced 3D custom icon component
const CustomIcon = ({ phase, isActive }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  const intervalRef = useRef(null);
  
  useEffect(() => {
    if (isActive) {
      intervalRef.current = setInterval(() => {
        setRotation(prev => ({
          x: prev.x + 1,
          y: prev.y + 2,
          z: prev.z + 0.5
        }));
      }, 20);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        setRotation({ x: 0, y: 0, z: 0 });
      }
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive]);
  
  // Different shapes for different phases with enhanced designs
  const shapes = {
    1: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">1</span>
      </motion.div>
    ),
    2: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-md flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">2</span>
      </motion.div>
    ),
    3: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 transform rotate-45 flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="transform -rotate-45 text-black font-bold text-lg">3</span>
      </motion.div>
    ),
    4: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 hexagon flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">4</span>
      </motion.div>
    ),
    5: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset",
          scale: isActive ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">5</span>
      </motion.div>
    ),
    6: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">6</span>
      </motion.div>
    ),
    7: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-md flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">7</span>
      </motion.div>
    ),
    8: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 transform rotate-45 flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="transform -rotate-45 text-black font-bold text-lg">8</span>
      </motion.div>
    ),
    9: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 hexagon flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">9</span>
      </motion.div>
    ),
    10: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset",
          scale: isActive ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">10</span>
      </motion.div>
    ),  
    11: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">11</span>
      </motion.div>
    ),
    12: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-md flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">12</span>
      </motion.div>
    ),
    13: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 transform rotate-45 flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="transform -rotate-45 text-black font-bold text-lg">13</span>
      </motion.div>
    ),
    14: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 hexagon flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset"
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">14</span>
      </motion.div>
    ),
    15: (
      <motion.div 
        className="w-full h-full bg-gradient-to-br from-white to-gray-300 rounded-full flex items-center justify-center"
        animate={{ 
          boxShadow: isActive 
            ? [
                "0 0 10px 2px rgba(255,255,255,0.8) inset",
                "0 0 20px 5px rgba(255,255,255,0.4) inset", 
                "0 0 10px 2px rgba(255,255,255,0.8) inset"
              ] 
            : "0 0 5px 1px rgba(255,255,255,0.3) inset",
          scale: isActive ? [1, 1.1, 1] : 1
        }}
        transition={{ duration: 1.5, repeat: isActive ? Infinity : 0, repeatType: "reverse" }}
      >
        <span className="text-black font-bold text-lg">15</span>
      </motion.div>
    )
  };
  
  return (
    <div 
      className="w-full h-full" 
      style={{ 
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.3s ease-out'
      }}
    >
      {shapes[phase] || shapes[1]}
    </div>
  );
};

// Parallax Background Elements
const ParallaxElements = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div 
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 opacity-30 blur-xl"
        style={{ y: y1 }}
      />
      <motion.div 
        className="absolute top-40 right-40 w-48 h-48 rounded-full bg-gradient-to-r from-pink-500 to-red-500 opacity-20 blur-xl"
        style={{ y: y2 }}
      />
      <motion.div 
        className="absolute bottom-60 left-1/3 w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-teal-500 opacity-20 blur-xl"
        style={{ y: y3 }}
      />
    </div>
  );
};

// Progress Bar
const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const ContemporaryCritiquePage = () => {
  // Enhanced timeline data with more details
  const timelineData = [
    {
      phase: 1,
      date: "10/4",
      title: "[Unnamed]",
      description: "The first draft of Kanye West's  808's and Heartbreak, and Pink Floyd's Dark Side of the Moon. Both of these drafts are too similar to the original, but I want to see how i can utilize colors and shapes to make something unique.",
      image: p1,
      image2: p2,
      color: "#2A3A5A"
    },
    {
      phase: 2,
      date: "10/9",
      title: "[Unnamed]",
      description: `I thought about what kind of portrayal of these albums that I wanted to get to.
                    I decided to go for a more archaic approach for 808's.
                    I decided to utilize different colors and show a different perspective of what the light side of the moon could look like.
                    making these shapes were a bit challenging as I was not too sure on where they should go.`,
      image: p3,
      image2: p4,
      color: "#3F598A"
    },
    {
      phase: 3,
      date: "10/16",
      title: "[Unnamed]",
      description: `Both of my drafts were finalized and painted on the front of the cd cases. my work is 75% complete. both of these portrayals are coming together nicely. and will be put on the cd case very soon.
                    The painting on the left went pretty smoothly, while the one on the right has stressed me out a lot trying to get these lines straight and the overlapping has been troubling putting on extra layers of paint.`,
      image: p5,
      image2: p6,
      color: "#5474A6"
    },
    {
      phase: 4,
      date: "10/20",
      title: "[Unnamed]",
      description: `These last two photos are the final product of my redesign for album covers. Both of these redesigns are painted on a cd case.
                    On the left is a redesign of Kanye West's 808's and Heartbreak, and on the right is a redesign of Pink Floyd's Dark side of the Moon.
                    It was fun to do something like this an seeing both of these come together is very satisfying. `,
      image: p7,
      image2: p8,
      color: "#7A98C2"
    },
    {
      phase: 5,
      date: "10/30",
      title: "[Unnamed]",
      description: `This is the first set of designs that I had sketched out with colored pencils. 
                    The first one would be displayed on a yellow background and this redesign is of Marvin Gaye's album "What's Going On". It depicts four sections in a peace sign that depict life.
                    The second sketch that I worked on is a redesign of the album "Plastic Beach" by Gorillaz. This would be a top down view of a polluted beach.`,
      image: p9,
      image2: p9,
      color: "#A1B9DE"
    },
    {
      phase: 6,
      date: "11/1",
      title: "[Unnamed]",
      description: `I decided to start painting with these two designs. 
                    I edited the beach to have more layers of water to show different depths, and I want to keep a simplistic design to not overcomplicate this as well. I added boats leaving this beach to show how people are avoiding such a prevalent issue with the world.
                    I started working on the other painting a little but I started getting challenged with how I want to truly represent my work on this yellow background.`,
      image: p10,
      image2: p11,
      color: "#A1B9DE"
    },
    {
      phase: 7,
      date: "11/7",
      title: "[Unnamed]",
      description: `This past 2 days I have been struggling trying to figure out what i want to depict exactly for the third redesign. I put two other background ideas to see if I would get any inspiration and completely redid the "Plastic Beach" redesign trying to keep it a more simple for the background.
                    The image on the left if my take on the album "Ghost Stories" by Coldplay. these 6 different ghosts all represent different emotions that come from a different backgrounds. This is my only album redesign that I decided to keep a very similar color to the original album. I think the blue contrasts with the mystery of the Ghosts where it is subtly white aswell.`,
      image: p12,
      image2: p13,
      color: "#A1B9DE"
    },
    {
      phase: 8,
      date: "11/11",
      title: "Unnamed",
      description: `On the left is a finished version of my redesign for Marvin Gaye's album "What's going on". This scene was annoying to portray because i wasn't sure about how much I liked it as I went. but it turned out pretty well as i think the colors were utilized well. 
                    The right Album that I redesigned is a take on "Plastic Beach" by the Gorillaz. Here there are themes of pollution and neglect that show how our world is dealing with pollution.`,
      image: p14,
      image2: p15,
      color: "#A1B9DE"
    },
    {
      phase: 9,
      date: "11/12",
      title: "[Unnamed]",
      description: `I made a last minute change to this redesign. I wanted the pollution to be more prevalent as it was the theme I was trying to emphasize and I like how this looks a lot better.`,
      image: p16,
      image2: p16,
      color: "#A1B9DE"
    },
    {
      phase: 10,
      date: "11/13, 11/17-11/26",
      title: "[Unnamed]",
      description: `This was the result of my second critique and I am very happy with how it turned out. There are still some last minute touch ups on some of the CD's that I need to accomplish before the final exhibition. I put up two different ideas for displaying the original design, but I am leaning towards keeping the original design smaller to highlight my redesign more.
                    During the second stretch of time I made some small adjustments to make the redesigns look the slightest bit better and did the most work to my redesign on the bottom left of my redesigns. `,
      image: p17,
      image2: p17,
      color: "#A1B9DE"
    },
    {
      phase: 11,
      date: "11/30-12/5",
      title: "[Unnamed]",
      description: `This was probably the most time consuming part of my entire project. The last stretch working on very final touch ups' until my installation process. I learned how to properly mount and put up the original albums, and how to mount my CDs. I have also decided to put the CDs in their cases next to the player for people to be able to see the vision that I see. I decided to order my work based how they looked color wise and I am still deciding how I would like to properly label my work.`,
      image: p18,
      image2: p18,
      color: "#A1B9DE"
    },
    {
      phase: 12,
      date: "12/6",
      title: "[Unnamed]",
      description: `This is the finished project of my work for contemporary critique. I decided to only include one tag that does not tell the viewer what the exact album is or what I am trying to portray as I feel like they should find that out for themselves and explore the music. `,
      image: p19,
      image2: p19,
      color: "#A1B9DE"
    }
  ];

  // Custom cursor with trailing effect
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVisible, setCursorVisible] = useState(false);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY
      });
      setCursorVisible(true);
    };

    const mouseLeave = () => {
      setCursorVisible(false);
    };

    window.addEventListener("mousemove", mouseMove);
    document.addEventListener("mouseleave", mouseLeave);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
      document.removeEventListener("mouseleave", mouseLeave);
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      opacity: cursorVisible ? 0.3 : 0
    }
  };

  return (
    <>
      <motion.div 
        className="w-8 h-8 fixed rounded-full pointer-events-none z-50 mix-blend-difference"
        variants={variants}
        animate="default"
      >
        <div className="w-full h-full bg-white rounded-full" />
      </motion.div>
      
      <ProgressBar />
      <ParallaxElements />
      
      <div className="min-h-screen bg-black pt-24 pb-32 relative">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="mb-24"
          >
            <motion.h1 
              className="text-4xl md:text-6xl text-center font-light tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              CONTEMPORARY CRITIQUE
            </motion.h1>
            
            <motion.p
              className="text-center text-gray-400 mt-6 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              critique of the contemporary
            </motion.p>
          </motion.div>
          
          <div className="py-8 relative">
            {/* Central timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-gray-700 to-transparent transform -translate-x-1/2"></div>
            
            {/* Timeline items */}
            {timelineData.map((item, index) => (
              <TimelineItem 
                key={index}
                item={item}
                index={index}
                isEven={index % 2 === 0}
              />
            ))}
            
            {/* Timeline end indicator */}
            <motion.div 
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full flex flex-col items-center"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="w-4 h-4 rounded-full bg-white"></div>
              <p className="mt-4 text-gray-400">Journey Continues</p>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Add custom styles for special shapes */}
      <style jsx>{`
        .hexagon {
          clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(255,255,255,0.3); }
          50% { box-shadow: 0 0 20px rgba(255,255,255,0.7); }
          100% { box-shadow: 0 0 5px rgba(255,255,255,0.3); }
        }
        
        .glow {
          animation: glow 2s infinite;
        }
      `}</style>
    </>
  );
};

export default ContemporaryCritiquePage;