"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaArrowLeft, FaCalendarAlt, FaFacebook } from "react-icons/fa"
import { fetchFacebookPhotos, fetchFacebookAlbums } from "@/lib/facebook-service"

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [photos, setPhotos] = useState<any[]>([])
  const [albums, setAlbums] = useState<any[]>([])
  const [selectedAlbum, setSelectedAlbum] = useState<string | undefined>()
  const [isLoading, setIsLoading] = useState(true)

  // Load photos on mount and when selectedAlbum changes
  useEffect(() => {
    const loadPhotos = async () => {
      setIsLoading(true)
      try {
        const photoData = await fetchFacebookPhotos(50, selectedAlbum)
        setPhotos(photoData)
      } catch (error) {
        console.error("Error loading photos:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadPhotos()
  }, [selectedAlbum])

  // Load albums on mount
  useEffect(() => {
    const loadAlbums = async () => {
      try {
        const albumData = await fetchFacebookAlbums(10)
        setAlbums(albumData)
      } catch (error) {
        console.error("Error loading albums:", error)
      }
    }

    loadAlbums()
  }, [])

  // Filter photos based on date (recent, older)
  const filteredPhotos = () => {
    if (activeFilter === "all") return photos
    
    const now = new Date()
    const threeMonthsAgo = new Date(now.setMonth(now.getMonth() - 3))
    
    return photos.filter(photo => {
      const photoDate = new Date(photo.created_time)
      if (activeFilter === "recent") {
        return photoDate > threeMonthsAgo
      } else {
        return photoDate <= threeMonthsAgo
      }
    })
  }

  // Format date to Portuguese format
  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-PT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-black text-white font-['Playfair_Display',serif]">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center">
            <img src="/images/teup-logo.png" alt="TEUP Logo" className="h-10 w-10 mr-3" />
            <span className="font-['Cinzel',serif]">TEUP</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors duration-300 font-['Montserrat',sans-serif]"
            >
              <FaArrowLeft className="mr-2" /> Voltar à página inicial
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-['Cinzel',serif]">Galeria de Fotos</h1>
            <p className="text-gray-400 mb-8 font-['Montserrat',sans-serif]">
              Momentos capturados das nossas atuações, viagens e convívios.
            </p>

            {/* Album Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => {
                  setSelectedAlbum(undefined)
                  setActiveFilter("all")
                }}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-['Montserrat',sans-serif] ${
                  !selectedAlbum && activeFilter === "all"
                    ? "bg-red-700 text-white"
                    : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                Todas as Fotos
              </button>
              <button
                onClick={() => {
                  setSelectedAlbum(undefined)
                  setActiveFilter("recent")
                }}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-['Montserrat',sans-serif] ${
                  !selectedAlbum && activeFilter === "recent"
                    ? "bg-red-700 text-white"
                    : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                Fotos Recentes
              </button>
              
              {/* Album buttons */}
              {albums.map(album => (
                <button
                  key={album.id}
                  onClick={() => {
                    setSelectedAlbum(album.id)
                    setActiveFilter("all")
                  }}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-['Montserrat',sans-serif] ${
                    selectedAlbum === album.id
                      ? "bg-red-700 text-white"
                      : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                  }`}
                >
                  {album.name}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Photos Section */}
      <section className="py-12 bg-gray-900 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Album title if selected */}
          {selectedAlbum && (
            <motion.h2 
              className="text-2xl md:text-3xl font-bold mb-6 font-['Cinzel',serif]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {albums.find(album => album.id === selectedAlbum)?.name}
            </motion.h2>
          )}
          
          {isLoading ? (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-red-700"></div>
            </div>
          ) : filteredPhotos().length > 0 ? (
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredPhotos().map((photo) => (
                <motion.div
                  key={photo.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10 transform hover:scale-[1.02]"
                  variants={staggerItem}
                >
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={photo.source}
                      alt={photo.alt_text || "Foto da TEUP"}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                  <div className="p-4">
                    <div className="flex items-center justify-between text-red-500 text-sm mb-2 font-['Montserrat',sans-serif]">
                      <div className="flex items-center">
                        <FaCalendarAlt className="mr-2" />
                        <span>{formatDate(photo.created_time)}</span>
                      </div>
                      <a 
                        href={photo.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <FaFacebook size={18} />
                      </a>
                    </div>
                    {photo.alt_text && (
                      <p className="text-gray-300 text-sm font-['Montserrat',sans-serif]">
                        {photo.alt_text}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2 font-['Montserrat',sans-serif]">Nenhuma foto encontrada</h3>
              <p className="text-gray-400 font-['Montserrat',sans-serif]">
                Não foram encontradas fotos com os filtros selecionados.
              </p>
            </div>
          )}

          {/* Facebook link */}
          <div className="text-center mt-12 pt-8 border-t border-gray-800">
            <a 
              href="https://www.facebook.com/teupofficial/photos"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-[#1877F2] hover:bg-[#1661c8] text-white px-6 py-3 rounded-full transition-all duration-300 font-['Montserrat',sans-serif] inline-flex"
            >
              <FaFacebook size={20} />
              <span>Ver mais fotos no Facebook</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center">
                <img src="/images/teup-logo.png" alt="TEUP Logo" className="h-10 w-10 mr-3" />
                <span className="font-['Cinzel',serif]">TEUP</span>
              </Link>
              <p className="text-gray-400 mt-2 font-['Montserrat',sans-serif]">
                © {new Date().getFullYear()} Tuna de Engenharia da Universidade do Porto. Todos os direitos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}