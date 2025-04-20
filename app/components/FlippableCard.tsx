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
  
  // Fixed variants to work with latest framer-motion
  const variants = {
    front: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      },
      zIndex: 1
    },
    back: {
      opacity: 0,
      scale: 0.9,
      zIndex: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  const backVariants = {
    front: {
      opacity: 0,
      scale: 0.9,
      zIndex: 0,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    },
    back: {
      opacity: 1,
      scale: 1,
      zIndex: 1,
      transition: {
        duration: 0.5,
        ease: "easeInOut"
      }
    }
  };

  return (
    <div 
      className={`relative w-full h-full cursor-pointer ${className || ''}`}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div className="relative w-full h-full">
        {/* Front face */}
        <motion.div 
          className="absolute w-full h-full"
          animate={isFlipped ? "back" : "front"}
          variants={variants}
          initial="front"
        >
          {frontContent}
        </motion.div>
        
        {/* Back face */}
        <motion.div 
          className="absolute w-full h-full"
          animate={isFlipped ? "back" : "front"}
          variants={backVariants}
          initial="front"
        >
          {backContent}
        </motion.div>
      </div>
    </div>
  );
};

export default FlippableCard;
