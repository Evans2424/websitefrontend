"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface FlippableCardProps {
  frontContent: React.ReactNode
  backContent: React.ReactNode
  className?: string
}

const FlippableCard: React.FC<FlippableCardProps> = ({ frontContent, backContent, className = "" }) => {
  const [isFlipped, setIsFlipped] = useState(false)

  const toggleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div 
      className={`${className} cursor-pointer perspective w-full h-full`} 
      onClick={toggleFlip}
      style={{ perspective: '1000px' }}
    >
      <div 
        className="relative w-full h-full transition-transform duration-500"
        style={{ 
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'
        }}
      >
        {/* Front of card */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {frontContent}
        </div>

        {/* Back of card */}
        <div 
          className="absolute inset-0 w-full h-full backface-hidden"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          {backContent}
        </div>
      </div>
    </div>
  )
}

export default FlippableCard
