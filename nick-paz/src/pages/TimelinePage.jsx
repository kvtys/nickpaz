// File: src/pages/TimelinePage.jsx
import { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, useAnimation } from 'framer-motion';
import React from 'react';
import s1 from '../assets/s1.jpg';
import s2 from '../assets/s2.jpg';
import s3 from '../assets/s3.jpg';
import s4 from '../assets/s4.jpg';
import s5 from '../assets/s5.jpg';
import s6 from '../assets/s6.jpg';
import s7 from '../assets/s7.jpg';
import s8 from '../assets/s8.jpg';
import s9 from '../assets/s9.jpg';
import s10 from '../assets/s10.jpg';
import s11 from '../assets/s11.jpg';
import s12 from '../assets/s12.jpg';
import s13 from '../assets/s13.jpg';
import s14 from '../assets/s14.jpg';
import s15 from '../assets/s15.jpg';
import s16 from '../assets/s16.jpg';
import s17 from '../assets/s17.jpg';
import s18 from '../assets/s18.jpg';
import s19 from '../assets/s19.jpg';
import s20 from '../assets/s20.jpg';
import s21 from '../assets/s21.jpg';
import s22 from '../assets/s22.jpg';
import s23 from '../assets/s23.jpg';
import s24 from '../assets/s24.jpg';
import s25 from '../assets/s25.jpg';
import s26 from '../assets/s26.jpg';
import s27 from '../assets/s27.jpg';
import s28 from '../assets/s28.jpg';
import s29 from '../assets/s29.jpg';
import s30 from '../assets/s30.jpg';

// Timeline Item Component
const TimelineItem = ({ item, index, isEven }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  const controls = useAnimation();
  const [isHovered, setIsHovered] = useState(false);

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
        {/* Date */}
        <motion.div 
          className={`absolute top-0 ${isEven ? 'left-0 -translate-x-1/2' : 'right-0 translate-x-1/2'} -translate-y-10 text-sm text-gray-400 font-light tracking-wider`}
        >
          {item.date}
        </motion.div>

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
          <h3 className="text-xl font-light tracking-wider">
            {item.title}
          </h3>
          <p className="text-gray-300 mt-4">
            {item.description}
          </p>
          <div className="flex flex-row space-x-10 items-center justify-center mt-4">
            <div className="flex-1 flex justify-center">
              <img 
                src={item.image} 
                alt="image" 
                className="max-h-[200px] max-w-full object-contain" 
              />
            </div>
            <div className="flex-1 flex justify-center">
              <img 
                src={item.image2} 
                alt="image" 
                className="max-h-[200px] max-w-full object-contain" 
              />
            </div>
          </div>
          {/* Interactive details button */}
        </motion.div>
      </motion.div>
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

const TimelinePage = () => {
  // Enhanced timeline data with more details
  const timelineData = [
    {
      phase: 1,
      date: "1/30/25 - 2/1/25",
      title: "Concept Development",
      description: 'This is my first portrayal of love through the song "There She Goes", by The La' + 's. In this finalized sketch I have depicted someone who is showing their love through addiction. Love can be addictive and overwhelming. In the drawing I used oversized needles piercing into someone' + 's heart through the arm and body of the figure.',
      image: s1,
      image2: s2,
      color: "#2A3A5A"
    },
    {
      phase: 2,
      date: "",
      title: "Design Exploration",
      description: `On the left is the start of my depiction on love. I'm experimenting with colors and how I want to  portray the skin. On the right is my look on heartbreak. I am set on the head structure, but i'm not sure about the colors I want to use.`,
      image: s3,
      image2: s4,
      color: "#3F598A"
    },
    {
      phase: 3,
      date: "2/5/25 -2/6/25",
      title: "Technical Prototyping",
      description: `The left image is the inclusion of addiction, and relayering of paint. I gave the substance in the needles a darker color to bring out the contrast. The right image is also the inclusion of addiction. I'm working through different ideas of colors through the figures head.`,
      image: s5,
      image2: s6,
      color: "#5474A6"
    },
    {
      phase: 4,
      date: "2/14/25",
      title: "Integration & Refinement",
      description: `The image on the left is the fleshed out version of my vision. I decided to give the skin a flayed look to show the complexity of what's happening. I like how the record on the right looks a lot with the contrast of these earth tones, and the substances.`,
      image: s7,
      image2: s8,
      color: "#7A98C2"
    },
    {
      phase: 5,
      date: "2/20/25 - 2/22/25",
      title: "[Unnamed]",
      description: `This is my second portrayal of love through the song "I Think", by Tyler The Creator. In this (mostly) finalized drawing I want to show someone going numb and letting go. I also want to incorporate lighter colors in the background. This is my second portrayal of heartbreak through the song "I Think About You All the Time", by The Maine. In this drawing i want to depict someone who looks defeated and upset. I also want to use this idea of rain falling on the figure, or some kind of weather element impacting him negatively. In these sketches I want to use full figures, because I believe in both of these stages of love and heartbreak, there is the strongest sense of emotion. This second stage of love and heartbreak is intensity.  People can easily relate to figure, so I think its more powerful to use this here.`,
      image: s9,
      image2: s10,
      color: "#A1B9DE"
    },
    {
      phase: 6,
      date: "2/26/25 - 3/2/25",
      title: "[Unnamed]",
      description: `This is my continued version of the woman falling on a larger scale to understand the figure better. I decided to make the faceline visible too. On the right is a more advanced version of my earlier drawing of heartbreak. I decided to add more depth to the figure by not including an entire side profile view.`,
      image: s11,
      image2: s12,
      color: "#A1B9DE"
    },
    {
      phase: 7,
      date: "3/6/25 - 3/8/25",
      title: "[Unnamed]",
      description: `I wasn't completely sold on my other idea for heartbreak, so this is a new design I used. I like both of these designs, and am conflicted on where I should go from here. 
I think it is important that i spent extra time sketching for this stage with figure, as it could prove to be the most challenging part of my project. Also, I decided to make a more chaotic background with the correlating figure being the girl falling. My idea behind this was to use the black of the record fade into the vibrant acrylic colors.`,
      image: s13,
      image2: s14,
      color: "#A1B9DE"
    },
    {
      phase: 8,
      date: "3/8/25 - 3/13/25",
      title: "Unnamed",
      description: `I was originally interested in using a green color rather than a blue, but after looking at both i decided the blue tones looked more connected to the message of my piece. I also matched this set by utilizing the paint fading into the records color..`,
      image: s15,
      image2: s16,
      color: "#A1B9DE"
    },
    {
      phase: 9,
      date: "3/16-3/19/25",
      title: "[Unnamed]",
      description: `This is the same idea as the previous one. My main difference was incorporating a more chaotic background and deciding to color in his hair.
Im happy with how these figures came out. I will define the girls hair more in my finished drawing, while for the guy I'm going to touch up some areas in the background. On the right, this is my third portrayal of love through the song "Feel Good", by Gryffin. The song is about using substances to cope and using their significant other to help get them out of this situation, so I decided to portray that in my finished design of two people holding hands.`,
      image: s17,
      image2: s18,
      color: "#A1B9DE"
    },
    {
      phase: 10,
      date: "3/19/25 - 3/21/25",
      title: "[Unnamed]",
      description: `This is my third portrayal of heartbreak through the song "The Night We Met", by Lord Huron. I am going to be using these looser figures to give a more carefree look to them. The theme of this song is about regret, so i'm using these simplistic figures to give a sense of wonder to what happened.
In these sketches i want to bring this lasting aspect of intensity from the last stage, but give more visual curiosity as to what is happening.`,
      image: s19,
      image2: s20,
      color: "#A1B9DE"
    },
    {
      phase: 11,
      date: "3/21/25 - 3/23/25",
      title: "[Unnamed]",
      description: `Here I wanted to give an eerie vibe to the background. using reminiscent colors that are seen with nostalgia. I also decided to fill in the figures holding hands using these cooler colored on top of this chaotic background, drawing attention to the center of the hand.`,
      image: s21,
      image2: s22,
      color: "#A1B9DE"
    },
    {
      phase: 12,
      date: "3/23/25 -3/26/25",
      title: "[Unnamed]",
      description: `I added these similar figures from the sketch and decided against filling in the figures, as it creates a sense of curiosity as to how empty looking it is now that this person is dealing with the loss of his partner. Both of these are nearly finished. I'm going to touch up the background and potentially work in different patterns in the arms of my take on love. While in heartbreak im going to work more mysterious elements involved. On the right is my fourth portrayal of love through the song "On Melancholy Hill", by Gorillaz. I went through a lot of sketches trying to figure out what I like the most. I landed on this sketch of a couple sharing a special moment, and i want to mirror what I worked on in the last vinyl. This song is important to showcase the simplicity of a relationship and how fragile it can be. `,
      image: s23,
      image2: s24,
      color: "#A1B9DE"
    },
    {
      phase: 13,
      date: "3/29/25 - 3/31/25",
      title: "[Unnamed]",
      description: `This is my fourth portrayal of heartbreak through the song Motorcycle Drive By, by Third Eye Blind. In this song there are themes about letting go and realizing its ok to move on. This is a rougher sketch, that is hard to depict in graphite, but it shows a person walking out of a door with a wave nearly crashing over him.
In these sketches i wanted to add figures in a more intense atmosphere. I want to create a cinematic value to them that creates visual interest. For the background here, I want to use warmer colors that have shades of violet giving a more welcoming and sensual feeling.`,
      image: s25,
      image2: s26,
      color: "#A1B9DE"
    },
    {
      phase: 14,
      date: "3/31/25 - 4/3/25",
      title: "[Unnamed]",
      description: `At this stage I am not entirely sure how i want to cast the wave in regards to color, but I am sure that the door that is currently covered in tape is going to be a light violet color that leads back into the first vinyl I painted. I added the figures and layered the background more. I made the male figure brighter, and the female figure darker to represent how they both feel about their relationship and what's to come. `,
      image: s27,
      image2: s28,
      color: "#A1B9DE"
    },
    {
      phase: 15,
      date: "4/7/25 - 4/10/25",
      title: "Final Implementation",
      description: `I added in a flayed figure walking through the door and decided to make the wave more abstract. I want to portray this figure as moving on with his life and exploring what's to come before its too late. 
Both of these are near completion and am happy with how eye grabbing they are. It occured to me that I never hung up my finished work all together. I am overall very happy with how it came out. I used an acrylic gloss medium varnish over half of them, but I want to detail a few more before I varnished the rest. I think it conveys the circular view of a relationship fairly well, and am relieved going into instillation. `,
      image: s29,
      image2: s30,
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
              CAPSTONE TIMELINE
            </motion.h1>
            
            <motion.p
              className="text-center text-gray-400 mt-6 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              A chronological journey through the development of acrylic paint on vinyl records that represent deep themes of love and heartbreak. 
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

export default TimelinePage;