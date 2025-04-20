"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  
  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { name: "Início", path: "/" },
    { name: "Sobre", path: "/#about" },
    { name: "Tunos", path: "/#members" },
    { name: "Notícias", path: "/noticias" },
    { name: "Atuações", path: "/atuacoes" },
    { name: "Galeria", path: "/galeria" },
    { name: "Contacto", path: "/#contact" },
  ]

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    // Only handle scrolling for hash links on the home page
    if (path.startsWith('/#') && window.location.pathname === '/') {
      e.preventDefault()
      const sectionId = path.substring(2)
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
      if (isMenuOpen) setIsMenuOpen(false)
    } else if (isMenuOpen) {
      setIsMenuOpen(false)
    }
  }

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-black/90 backdrop-blur-sm py-2" : "bg-transparent py-4"
    }`}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tighter flex items-center"
          >
            <img src="/images/teup-logo.png" alt="TEUP Logo" className="h-10 w-10 mr-3" />
            <span className="font-medium text-white">TEUP</span>
          </Link>
        </motion.div>

        <div className="hidden md:flex space-x-8">
          {navLinks.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
            >
              <Link
                href={item.path}
                className="hover:text-red-500 transition-all duration-300 relative group font-inter font-medium text-white"
                onClick={(e) => scrollToSection(e, item.path)}
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.button
          className="md:hidden z-50 text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-6 w-6 transition-all duration-300 ${isMenuOpen ? "rotate-90" : "rotate-0"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </motion.button>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <motion.div
          className="fixed inset-0 bg-black/95 flex flex-col items-center justify-center z-40 md:hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex flex-col items-center space-y-6">
            {navLinks.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 * index }}
              >
                <Link
                  href={item.path}
                  className="text-2xl hover:text-red-500 transition-all duration-300 font-inter text-white"
                  onClick={(e) => scrollToSection(e, item.path)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </nav>
  )
}