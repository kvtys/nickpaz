import React, { useState, useRef } from 'react';
import { motion, useScroll, useInView, AnimatePresence } from 'framer-motion';

import a1 from '../assets/newartforms/a1.jpg'
import a2 from '../assets/newartforms/a2.jpg'
import b1 from '../assets/newartforms/b1.jpg'
import b2 from '../assets/newartforms/b2.jpg'
import c1 from '../assets/newartforms/c1.jpg'
import c2 from '../assets/newartforms/c2.jpg'
import d1 from '../assets/newartforms/d1.jpg'
import d2 from '../assets/newartforms/d2.jpg'
import e1 from '../assets/newartforms/e1.jpg'
import e2 from '../assets/newartforms/e2.jpg'
import e3 from '../assets/newartforms/e3.jpg'
import e4 from '../assets/newartforms/e4.jpg'
import e5 from '../assets/newartforms/e5.jpg'
import e6 from '../assets/newartforms/e6.jpg'

const NewArtFormsPage = () => {

  return (
    <div className="min-h-screen bg-black pt-24 pb-32 relative overflow-hidden">
      <ProgressBar />

    <div className="">
        <motion.h1 
          className="text-4xl md:text-6xl mb-16 text-center font-light tracking-widest"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          NEW ART FORMS
        </motion.h1>  
    </div>
      
      {sectionData.map((section, index) => (
        <div key={index} id={`section-${index}`}>
          <Section data={section} index={index} />
        </div>
      ))}
    </div>
  );
};

const ImageModal = ({ src, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <AnimatePresence>
      <motion.div 
        className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.5, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative max-w-5xl max-h-screen p-4"
        >
          <img 
            src={src} 
            alt="Enlarged view" 
            className="max-h-screen object-contain"
          />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 rounded-full w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Section component
const Section = ({ data, index }) => {
  const ref = useRef(null);
  // Reduced amount threshold and set once to false to always check visibility
  const isInView = useInView(ref, { once: false, amount: 0.1 });
  const [selectedImage, setSelectedImage] = useState(null);
  // Track if this section has ever been in view
  const [hasBeenInView, setHasBeenInView] = useState(false);
  
  // Update hasBeenInView whenever isInView becomes true
  React.useEffect(() => {
    if (isInView && !hasBeenInView) {
      setHasBeenInView(true);
    }
  }, [isInView, hasBeenInView]);
  
  // Use either current inView status or if it has ever been in view for animation
  const shouldAnimate = isInView || hasBeenInView;
  
  return (
    <div 
      ref={ref}
      className={`flex items-center justify-center p-8`}
    >
      <motion.div
        className="max-w-6xl w-full"
        initial={{ opacity: 0, y: 100 }}
        animate={shouldAnimate ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2 
          className="text-4xl font-bold mb-6 text-center"
          initial={{ opacity: 0, x: -50 }}
          animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {data.title}
        </motion.h2>
        
        <motion.p 
          className="text-lg mb-8 text-center max-w-5xl mx-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={shouldAnimate ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          {data.description}
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          initial={{ opacity: 0 }}
          animate={shouldAnimate ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5, staggerChildren: 0.1 }}
        >
          {data.images.map((img, imgIndex) => (
            <motion.div
              key={imgIndex}
              className="overflow-hidden rounded-lg shadow-lg cursor-pointer"
              onClick={() => setSelectedImage(img)}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={shouldAnimate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5, delay: 0.5 + (imgIndex * 0.1) }}
              whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
            >
              <img 
                src={img} 
                alt={`Image ${imgIndex + 1} in ${data.title}`} 
                className="w-full h-64 object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      <ImageModal 
        src={selectedImage} 
        isOpen={!!selectedImage} 
        onClose={() => setSelectedImage(null)} 
      />
    </div>
  );
};

const ProgressBar = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <motion.div 
      className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 origin-left z-50"
      style={{ scaleX: scrollYProgress }}
    />
  );
};

const sectionData = [
  {
    title: "Site Specific Project",
    description: `For the site specific topic I wanted to tackle issues of cell phone usage and how pollution is tied to cell phones and how it impacts sea life. The manufacturing process of a smartphone accounts for up to 85% of its carbon footprint, which makes it one of the most harmful aspects to nature and especially sea life. Deep sea mining for materials like cobalt platinum and molybdenum, destroy sealife biomes, and copper mines contaminate the surrounding waters with a reddish orange color that affects the wildlife around the area. I decided to make two collages of different kinds of cell phones into the shape of two sea creatures, that show the effects of obtaining the minerals for your cell phone. I decided to use printed pictures of cellphones and put that on a large sheet of paper. The location on campus that I think would be the best is this wall in between two buildings. There is a lot of foot traffic in this area and it fits nicely on the wall.`,
    images: [
        a1, a2
    ]
  },
  {
    title: "Social Practice Project",
    description: `Following the site specific project I wanted to stay on the topic of smartphone use. For the social practice project i decided to tackle disturbing topics with the same correlation to smartphone use, addiction. Many people don't think about their addiction to technology the same ways people look at drugs, so I wanted to portray that in another collage. The image on the left are some earlier ideas and the image on the right is the finished work. The finished Work talks about three different ideas, overstimulation, (top) addiction, (left) and brokenness (right). Overstimulation is shown through the limited space that the brain has, and it is being taken up by apps. Addiction follows someone putting needles into their arm that are filled with popular apps like youtube, spotify, and facebook. Broken is a representation of how powerful apps are and how they break something that is meant to keep them contained (wine bottle). The collage is on a large piece of paper and the project is magazine cut outs that were glued onto it. The apps that I used in each one are printed pieces of paper.`,
    images: [
      b1, b2
    ]
  },
  {
    title: "Presentation Project",
    description: `For the 60 second project I took a different approach to what art truly is. My hair is an important way that i reflect myself, so i wanted to put this on a sheet of paper and explore different ideas. The image on the top represents chaos in which my hair is going in a bunch of different directions. The image on the bottom is a representation of my hair exploring human concepts such as love as seen with my hair making small hearts in a symmetrical way on the paper. I decided to portray my hair not showing my face to emphasize how impactful and expressive hair can be. `,
    images: [
      c1, c2
    ]
  },
  {
    title: "Environmental Project",
    description: `For my environmental project I decided to explore collages more deeply. The imagine on the left is a Tumi, which is a ceremonial knife and a symbol for good luck. I made the collage out of pine needles from dead pine branches. The image on the right is the logo for Peru which is made out of sticks. I decided to explore these different ideas for the environmental project because of my heritage and spread more awareness towards Peruvian culture.`,
    images: [
      d1, d2
    ]
  },
  {
    title: "Self Directed Project",
    description: ` [NICK MAKE UR SUMMARY SHORTER DAWG] `,
    images: [
      e1, e2, e3, e4, e5, e6
    ]
  }
];

export default NewArtFormsPage;