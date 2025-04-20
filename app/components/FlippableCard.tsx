"use client"

import React, { useState } from "react";
import { motion } from "framer-motion";

interface FlippableCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
}

const FlippableCard: React.FC<FlippableCardProps> = ({ frontContent, backContent, className }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  
  // Use a more sophisticated animation that prevents "pop-in" effects
  const variants = {
    front: {
      rotateY: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    back: {
      rotateY: 180,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    hidden: {
      opacity: 0,
      transition: {
        duration: 0
      }
    }
  };

  return (
    <div 
      className={`perspective-1000 w-full h-full cursor-pointer ${className || ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="relative preserve-3d w-full h-full transition-transform duration-500">
        {/* Front face */}
        <motion.div 
          className="absolute backface-hidden w-full h-full"
          animate={isFlipped ? "hidden" : "front"}
          variants={variants}
        >
          {frontContent}
        </motion.div>
        
        {/* Back face */}
        <motion.div 
          className="absolute backface-hidden w-full h-full"
          style={{ rotateY: "180deg" }}
          animate={isFlipped ? "back" : "hidden"}
          variants={variants}
        >
          {backContent}
        </motion.div>
      </div>
    </div>
  );
};

export default FlippableCard;
