"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface ImageCarouselProps {
  images: string[]
  interval?: number
  className?: string
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images, interval = 5000, className = "" }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    let timer: NodeJS.Timeout

    if (isAutoPlaying) {
      timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
      }, interval)
    }

    return () => {
      if (timer) clearInterval(timer)
    }
  }, [currentIndex, images.length, interval, isAutoPlaying])

  // Update the handlePrevious and handleNext functions to properly handle events
  const handlePrevious = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsAutoPlaying(false)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handleDotClick = (index: number) => {
    setIsAutoPlaying(false)
    setCurrentIndex(index)
  }

  return (
    <div className={`relative overflow-hidden rounded-xl h-full ${className}`}>
      <div className="relative h-full w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            {/* Ensure the images are properly displayed */}
            <img
              src={images[currentIndex] || "/placeholder.svg"}
              alt={`Slide ${currentIndex + 1}`}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-20"></div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-all hover:bg-white hover:text-black focus:outline-none"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 z-10 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-gray-800 shadow-md transition-all hover:bg-white hover:text-black focus:outline-none"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 transform space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`h-2.5 w-2.5 rounded-full transition-all ${
              index === currentIndex ? "bg-white scale-125" : "bg-white/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

export default ImageCarousel
