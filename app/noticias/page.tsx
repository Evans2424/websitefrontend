"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa"
import { useState } from "react"

// News data
const newsItems = [
  {
    id: 1,
    title: "TEUP vence Festival Internacional de Tunas",
    date: "15 de Março, 2025",
    summary:
      "A Tuna de Engenharia da Universidade do Porto conquistou o primeiro lugar no prestigiado Festival Internacional de Tunas em Coimbra.",
    image: "/images/teup-flag-performance.png",
    content:
      "A Tuna de Engenharia da Universidade do Porto (TEUP) conquistou o primeiro lugar no prestigiado Festival Internacional de Tunas em Coimbra. Após uma atuação memorável que incluiu clássicos do repertório tunante e algumas inovações musicais, o júri decidiu por unanimidade atribuir o prémio principal à nossa tuna.",
    tags: ["Festival", "Competição", "Prémios", "Internacional"],
  },
  {
    id: 2,
    title: "Novo CD 'Tradição Engenheira' já disponível",
    date: "28 de Fevereiro, 2025",
    summary:
      "O mais recente trabalho da TEUP já está disponível em todas as plataformas digitais e na nossa loja online.",
    image: "/images/teup-musicians.png",
    content:
      "É com grande orgulho que anunciamos o lançamento do nosso novo álbum 'Tradição Engenheira'. Este trabalho representa dois anos de dedicação e paixão pela música tradicional portuguesa, reinterpretada com o estilo único da TEUP.",
    tags: ["Música", "Lançamento", "CD", "Streaming"],
  },
  {
    id: 3,
    title: "Inscrições abertas para novos tunos",
    date: "10 de Janeiro, 2025",
    summary:
      "Estão abertas as inscrições para estudantes de Engenharia que queiram juntar-se à TEUP. As audições decorrerão durante o mês de Fevereiro.",
    image: "/images/teup-university.png",
    content:
      "A Tuna de Engenharia da Universidade do Porto (TEUP) anuncia a abertura de inscrições para novos membros. Convidamos todos os estudantes da Faculdade de Engenharia que tenham interesse em música e nas tradições académicas a candidatarem-se.",
    tags: ["Recrutamento", "Audições", "Novos Membros"],
  },
  {
    id: 4,
    title: "Workshop de técnicas vocais para tunos",
    date: "5 de Dezembro, 2024",
    summary: "A TEUP organizará um workshop de técnicas vocais, aberto a todos os tunos e interessados em canto tradicional.",
    image: "/images/teup-meeting-room.png",
    content: "Com o objetivo de aprimorar as habilidades vocais dos nossos membros, a TEUP organizará um workshop intensivo de técnicas vocais específicas para o canto tunante.",
    tags: ["Workshop", "Técnica Vocal", "Formação"],
  },
  {
    id: 5,
    title: "TEUP participa em festival solidário",
    date: "20 de Novembro, 2024",
    summary: "A nossa tuna vai participar num festival solidário para arrecadar fundos para o hospital pediátrico local.",
    image: "/images/teup-outdoor.png",
    content: "A TEUP junta-se a várias outras tunas e grupos musicais para um festival beneficente que visa arrecadar fundos para a compra de equipamentos para o hospital pediátrico local.",
    tags: ["Solidariedade", "Festival", "Comunidade"],
  },
  {
    id: 6,
    title: "Aniversário da TEUP: 35 anos de tradição",
    date: "15 de Outubro, 2024",
    summary: "A Tuna de Engenharia da Universidade do Porto celebra 35 anos de história com um concerto especial.",
    image: "/images/teup-performance.png",
    content: "Este mês marca o 35º aniversário da fundação da nossa tuna, e para comemorar esta data especial, organizaremos um concerto com a participação de atuais membros e antigos tunos.",
    tags: ["Aniversário", "História", "Celebração"],
  },
]

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

export default function AllNews() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const uniqueTags = Array.from(new Set(newsItems.flatMap(item => item.tags || [])))

  // Filter news items based on selected tag
  const filteredNews = activeFilter === "all" 
    ? newsItems 
    : newsItems.filter(item => item.tags && item.tags.includes(activeFilter))

  return (
    <div className="min-h-screen bg-black text-white font-['Playfair_Display',serif]">
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
                    <span>{item.date}</span>
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
          
          {filteredNews.length === 0 && (
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