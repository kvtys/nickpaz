// File: src/pages/TimelinePage.jsx
import { motion } from 'framer-motion';
import { 
  VerticalTimeline, 
  VerticalTimelineElement 
} from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { useEffect, useState } from 'react';
import React from 'react';

// Custom 3D timeline icon component
const CustomIcon = ({ phase }) => {
  const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
  
  useEffect(() => {
    const interval = setInterval(() => {
      setRotation({
        x: rotation.x + 0.5,
        y: rotation.y + 1,
        z: rotation.z + 0.2
      });
    }, 50);
    
    return () => clearInterval(interval);
  }, [rotation]);
  
  // Different shapes for different phases
  const shapes = {
    1: (
      <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-black font-bold">
        1
      </div>
    ),
    2: (
      <div className="w-full h-full bg-white rounded-md flex items-center justify-center text-black font-bold">
        2
      </div>
    ),
    3: (
      <div className="w-full h-full bg-white transform rotate-45 flex items-center justify-center">
        <span className="transform -rotate-45 text-black font-bold">3</span>
      </div>
    ),
    4: (
      <div className="w-full h-full bg-white clip-pentagon flex items-center justify-center text-black font-bold">
        4
      </div>
    ),
    5: (
      <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-black font-bold">
        ✓
      </div>
    )
  };
  
  return (
    <div 
      className="w-full h-full" 
      style={{ 
        transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg) rotateZ(${rotation.z}deg)`,
        transformStyle: 'preserve-3d'
      }}
    >
      {shapes[phase] || shapes[1]}
    </div>
  );
};

const TimelinePage = () => {
  // Sample timeline data
  const timelineData = [
    {
      phase: 1,
      date: "January 2023",
      title: "Concept Development",
      description: "Initial brainstorming and research phase. Explored various artistic directions and technical possibilities for the capstone project.",
      icon: "🔍",
      color: "#2A3A5A"
    },
    {
      phase: 2,
      date: "March 2023",
      title: "Design Exploration",
      description: "Created preliminary sketches and digital mockups. Established the core visual language and thematic elements that would guide the project.",
      icon: "✏️",
      color: "#3F598A"
    },
    {
      phase: 3,
      date: "June 2023",
      title: "Technical Prototyping",
      description: "Began experimenting with different media and techniques. Built several small-scale prototypes to test concepts and technical feasibility.",
      icon: "🛠️",
      color: "#5474A6"
    },
    {
      phase: 4,
      date: "October 2023",
      title: "Integration & Refinement",
      description: "Combined successful elements from earlier prototypes. Refined the artistic direction and technical implementation based on feedback.",
      icon: "🔄",
      color: "#7A98C2"
    },
    {
      phase: 5,
      date: "December 2023",
      title: "Final Implementation",
      description: "Completed the final version of the capstone project. Addressed technical challenges and made final aesthetic refinements.",
      icon: "✨",
      color: "#A1B9DE"
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
          CAPSTONE TIMELINE
        </motion.h1>
        
        <div className="py-8">
          <VerticalTimeline lineColor="rgba(255,255,255,0.2)">
            {timelineData.map((item, index) => (
              <VerticalTimelineElement
                key={index}
                className="vertical-timeline-element"
                contentStyle={{ 
                  background: 'rgba(30, 30, 30, 0.8)', 
                  color: '#fff',
                  boxShadow: '0 3px 15px rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)'
                }}
                contentArrowStyle={{ 
                  borderRight: '7px solid rgba(30, 30, 30, 0.8)' 
                }}
                date={item.date}
                iconStyle={{ 
                  background: item.color, 
                  color: '#fff',
                  boxShadow: `0 0 0 4px #000, inset 0 0 0 1px rgba(255,255,255,0.5), 0 0 0 8px rgba(255,255,255,0.1)`
                }}
                icon={<CustomIcon phase={item.phase} />}
              >
                <h3 className="vertical-timeline-element-title text-xl font-light tracking-wider">
                  {item.title}
                </h3>
                <p className="text-gray-300 mt-4">
                  {item.description}
                </p>
              </VerticalTimelineElement>
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </div>
  );
};

export default TimelinePage;