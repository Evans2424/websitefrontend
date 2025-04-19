"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa"

type Performance = {
  id: number
  title: string
  date: string
  location: string
  venue: string
  time: string
  ticketLink?: string
  summary: string
  image: string
  content: string
  mapLink?: string
  isFeatured: boolean
}

type PerformanceDetailClientProps = {
  performance: Performance
}

export default function PerformanceDetailClient({ performance }: PerformanceDetailClientProps) {
  // Format content with paragraphs
  const formattedContent = performance.content.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-4">
      {paragraph}
    </p>
  ))

  return (
    <div className="min-h-screen bg-black text-white font-['Playfair_Display',serif]">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center">
            <img src="/placeholder.svg?height=40&width=40" alt="TEUP Logo" className="h-10 w-10 mr-3" />
            <span className="font-['Cinzel',serif]">TEUP</span>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 pb-12 relative">
        <div className="absolute inset-0 z-0">
          {performance.image && (
            <>
              <img
                src={performance.image || "/placeholder.svg"}
                alt={performance.title}
                className="w-full h-[50vh] object-cover opacity-30"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black"></div>
            </>
          )}
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/"
              className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors duration-300 font-['Montserrat',sans-serif]"
            >
              <FaArrowLeft className="mr-2" /> Voltar à página inicial
            </Link>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-['Cinzel',serif]">{performance.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300 mb-8 font-['Montserrat',sans-serif]">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-2 text-red-500" />
                <span>
                  {performance.date} • {performance.time}
                </span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2 text-red-500" />
                <span>
                  {performance.venue}, {performance.location}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="md:col-span-2"
              >
                <div className="bg-gray-800 rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-4 font-['Cinzel',serif]">Sobre o Evento</h2>
                  <div className="prose prose-lg prose-invert max-w-none font-['Montserrat',sans-serif] leading-relaxed">
                    {formattedContent}
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-700">
                    <h3 className="text-xl font-bold mb-4 font-['Montserrat',sans-serif]">Partilhar</h3>
                    <div className="flex gap-4">
                      <motion.a
                        href="#"
                        className="bg-[#1877F2] p-3 rounded-full text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaFacebook />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="bg-[#1DA1F2] p-3 rounded-full text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTwitter />
                      </motion.a>
                      <motion.a
                        href="#"
                        className="bg-[#25D366] p-3 rounded-full text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaWhatsapp />
                      </motion.a>
                      <motion.button
                        className="bg-gray-700 p-3 rounded-full text-white"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => navigator.clipboard.writeText(window.location.href)}
                      >
                        <FaShareAlt />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-gray-800 rounded-lg p-8">
                  <h2 className="text-2xl font-bold mb-4 font-['Cinzel',serif]">Informações</h2>
                  <div className="space-y-4 font-['Montserrat',sans-serif]">
                    <div>
                      <h3 className="text-sm uppercase text-gray-400">Data e Hora</h3>
                      <p className="text-white">{performance.date}</p>
                      <p className="text-white">{performance.time}</p>
                    </div>
                    <div>
                      <h3 className="text-sm uppercase text-gray-400">Local</h3>
                      <p className="text-white">{performance.venue}</p>
                      <p className="text-gray-400">{performance.location}</p>
                      {performance.mapLink && (
                        <a
                          href={performance.mapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-red-500 hover:text-red-400 inline-flex items-center mt-2"
                        >
                          <FaMapMarkerAlt className="mr-1" /> Ver no mapa
                        </a>
                      )}
                    </div>
                    {performance.ticketLink && (
                      <div>
                        <h3 className="text-sm uppercase text-gray-400">Bilhetes</h3>
                        <motion.a
                          href={performance.ticketLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 inline-block px-6 py-3 bg-red-700 hover:bg-red-800 rounded-full font-medium transition-all duration-300 text-center w-full"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Comprar Bilhetes
                        </motion.a>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Performances */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 font-['Cinzel',serif]">Outras Atuações</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* For other performances we would need to pass all performances data. For now, just show a placeholder */}
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-gray-400 font-['Montserrat',sans-serif]">
                Veja mais atuações na nossa página principal.
              </p>
              <Link
                href="/"
                className="text-red-500 hover:text-red-400 transition-all duration-300 flex items-center group font-['Montserrat',sans-serif] mt-4"
              >
                Ir para a página principal{" "}
                <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-black border-t border-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center">
                <img src="/placeholder.svg?height=40&width=40" alt="TEUP Logo" className="h-10 w-10 mr-3" />
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