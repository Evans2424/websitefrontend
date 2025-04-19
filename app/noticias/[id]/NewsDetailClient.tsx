"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FaArrowLeft, FaCalendarAlt, FaShareAlt, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa"

type NewsItem = {
  id: number
  title: string
  date: string
  summary: string
  image: string
  content: string
  author: string
  tags?: string[]
}

type NewsDetailClientProps = {
  newsItem: NewsItem
}

export default function NewsDetailClient({ newsItem }: NewsDetailClientProps) {
  // Format content with paragraphs
  const formattedContent = newsItem.content.split("\n\n").map((paragraph, index) => (
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
          {newsItem.image && (
            <>
              <img
                src={newsItem.image || "/placeholder.svg"}
                alt={newsItem.title}
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
            <h1 className="text-3xl md:text-5xl font-bold mb-4 font-['Cinzel',serif]">{newsItem.title}</h1>
            <div className="flex items-center text-gray-400 mb-8 font-['Montserrat',sans-serif]">
              <FaCalendarAlt className="mr-2" />
              <span>{newsItem.date}</span>
              {newsItem.author && (
                <>
                  <span className="mx-2">•</span>
                  <span>{newsItem.author}</span>
                </>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-4xl mx-auto bg-gray-800 rounded-lg overflow-hidden"
          >
            {newsItem.image && (
              <img
                src={newsItem.image || "/placeholder.svg"}
                alt={newsItem.title}
                className="w-full h-[40vh] object-cover"
              />
            )}
            <div className="p-8">
              <div className="prose prose-lg prose-invert max-w-none font-['Montserrat',sans-serif] leading-relaxed">
                {formattedContent}
              </div>

              {newsItem.tags && (
                <div className="mt-8 pt-6 border-t border-gray-700">
                  <div className="flex flex-wrap gap-2">
                    {newsItem.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-gray-700 text-sm rounded-full text-gray-300 font-['Montserrat',sans-serif]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

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
        </div>
      </section>

      {/* Related News */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 font-['Cinzel',serif]">Outras Notícias</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* For related news, we would need to pass the newsItems data - for now just show a placeholder */}
            <div className="bg-gray-900 rounded-lg p-6">
              <p className="text-gray-400 font-['Montserrat',sans-serif]">
                Veja mais notícias na nossa página principal.
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