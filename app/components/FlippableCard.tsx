"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'

interface FlippableCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  onGodfatherClick?: (godfatherId: number) => void;
}

const FlippableCard: React.FC<FlippableCardProps> = ({ 
  frontContent, 
  backContent, 
  className,
  onGodfatherClick 
}) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const handleClick = (e: React.MouseEvent) => {
    // Don't flip if the click was on a godfather link
    if ((e.target as HTMLElement).closest('.godfather-link')) {
      return;
    }
    
    setIsFlipped(!isFlipped)
  }

  return (
    <div 
      className={`h-full w-full perspective-1000 ${className || ''}`} 
      onClick={handleClick}
    >
      <motion.div
        className="h-full w-full relative preserve-3d cursor-pointer"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.6,
          type: "spring",
          stiffness: 200,
          damping: 20
        }}
      >
        <div className="backface-hidden absolute h-full w-full">
          {frontContent}
        </div>
        <div 
          className="backface-hidden absolute h-full w-full rotate-y-180"
          style={{ transform: "rotateY(180deg)" }}
        >
          {backContent}
        </div>
      </motion.div>
    </div>
  )
}

export default FlippableCard
