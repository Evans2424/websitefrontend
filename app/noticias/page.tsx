"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FaCalendarAlt } from "react-icons/fa"
import { useState, useEffect } from "react"
import { NewsItem, fetchPublishedNews, formatDateForDisplay } from "@/lib/news-service"

// Animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren"
    },
  },
  exit: {
    opacity: 0, 
    transition: { 
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
      when: "afterChildren"
    }
  }
}

const staggerItem = {
  hidden: { opacity: 0, y: 15 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.5, 
      ease: [0.22, 1, 0.36, 1] 
    } 
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: {
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
    }
  }
}

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
}

export default function AllNews() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const [newsItems, setNewsItems] = useState<NewsItem[]>([])
  const [isLoading, setIsLoading] = useState(true)
  
  // Get all unique tags from news
  const uniqueTags = Array.from(
    new Set(newsItems.flatMap(item => item.tags || []))
  )

  // Load news data
  useEffect(() => {
    const loadNews = async () => {
      setIsLoading(true);
      try {
        const { news } = await fetchPublishedNews();
        setNewsItems(news);
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadNews();
  }, []);

  // Filter news items based on selected tag
  const filteredNews = activeFilter === "all" 
    ? newsItems 
    : newsItems.filter(item => item.tags && item.tags.includes(activeFilter))

  return (
    <div className="min-h-screen bg-black text-white font-['Playfair_Display',serif]">
      {/* Hero Section with proper spacing for fixed navbar */}
      <section className="pt-28 pb-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-['Cinzel',serif]">Notícias e Eventos</h1>
            <p className="text-gray-400 mb-8 font-['Montserrat',sans-serif]">
              Mantenha-se atualizado sobre as últimas novidades, conquistas e eventos da TEUP.
            </p>

            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-2 mb-8">
              <button
                onClick={() => setActiveFilter("all")}
                className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-['Montserrat',sans-serif] ${
                  activeFilter === "all"
                    ? "bg-red-700 text-white"
                    : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                Todos
              </button>
              {uniqueTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveFilter(tag)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-['Montserrat',sans-serif] ${
                    activeFilter === tag
                      ? "bg-red-700 text-white"
                      : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* News Listing */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="sr-only">Carregando...</span>
              </div>
              <p className="mt-4 text-gray-400">Carregando notícias...</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              {filteredNews.map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10 transform hover:scale-[1.02]"
                  variants={staggerItem}
                >
                  {item.image && (
                    <div className="overflow-hidden h-48">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-red-500 text-sm mb-2 font-['Montserrat',sans-serif]">
                      <FaCalendarAlt className="mr-2" />
                      <span>{formatDateForDisplay(item.date)}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-3 font-['Playfair_Display',serif]">{item.title}</h3>
                    <p className="text-gray-400 mb-4 font-['Montserrat',sans-serif] line-clamp-3">{item.summary}</p>
                    
                    {/* Tags */}
                    {item.tags && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {item.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-700 text-xs rounded-full text-gray-300 font-['Montserrat',sans-serif]"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    <Link
                      href={`/noticias/${item.id}`}
                      className="text-red-500 hover:text-red-400 transition-all duration-300 flex items-center group font-['Montserrat',sans-serif]"
                    >
                      Ler mais{" "}
                      <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          
          {!isLoading && filteredNews.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2 font-['Montserrat',sans-serif]">Nenhuma notícia encontrada</h3>
              <p className="text-gray-400 font-['Montserrat',sans-serif]">
                Não foram encontradas notícias com o filtro selecionado.
              </p>
            </div>
          )}
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