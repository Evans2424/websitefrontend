"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { FaArrowLeft, FaCalendarAlt, FaMapMarkerAlt } from "react-icons/fa"
import { useState } from "react"

// Performance data
interface Performance {
  id: number
  title: string
  date: string
  location: string
  summary: string
  image?: string
  content?: string
  tags?: string[]
}

const performances: Performance[] = [
  {
    id: 1,
    title: "Festival Internacional de Tunas",
    date: "15 de Maio, 2025",
    location: "Coimbra, Portugal",
    summary:
      "A TEUP participará no prestigiado Festival Internacional de Tunas em Coimbra, competindo com tunas de toda a Europa.",
    image: "/images/teup-flag-performance.png",
    content:
      "A TEUP tem a honra de participar no prestigiado Festival Internacional de Tunas em Coimbra, um dos eventos mais importantes do calendário tunante.",
    tags: ["Festival", "Competição", "Internacional"],
  },
  {
    id: 2,
    title: "Celebração do Aniversário da FEUP",
    date: "10 de Junho, 2025",
    location: "Auditório da FEUP, Porto",
    summary: "Concerto especial para celebrar o aniversário da Faculdade de Engenharia da Universidade do Porto.",
    image: "/images/teup-dance-performance.png",
    content:
      "A TEUP apresentará um concerto especial para celebrar o aniversário da Faculdade de Engenharia da Universidade do Porto.",
    tags: ["Concerto", "FEUP", "Aniversário", "Académico"],
  },
  {
    id: 3,
    title: "Intercâmbio Cultural em Nice",
    date: "22 de Julho, 2025",
    location: "Nice, França",
    summary: "A TEUP representará Portugal num intercâmbio cultural com grupos musicais universitários europeus.",
    image: "/images/teup-nice.png",
    content:
      "A TEUP terá a honra de representar Portugal num importante intercâmbio cultural com grupos musicais universitários europeus, a realizar-se em Nice, França.",
    tags: ["Internacional", "Intercâmbio", "Viagem"],
  },
  {
    id: 4,
    title: "Concerto Solidário no Teatro Rivoli",
    date: "18 de Agosto, 2025",
    location: "Teatro Rivoli, Porto",
    summary: "Concerto beneficente para arrecadar fundos para estudantes carenciados da Universidade do Porto.",
    image: "/images/teup-performance.png",
    content: "A TEUP realizará um concerto solidário no icónico Teatro Rivoli, com o objetivo de angariar fundos para bolsas de estudo.",
    tags: ["Solidário", "Concerto", "Porto"],
  },
  {
    id: 5,
    title: "Festival Tunae Mundi",
    date: "5 de Setembro, 2025",
    location: "Praça do Comércio, Lisboa",
    summary: "Participação no maior festival de tunas da Península Ibérica, reunindo mais de 30 tunas de Portugal e Espanha.",
    image: "/images/teup-jump-performance.png",
    content: "A TEUP foi convidada para participar no prestigiado Festival Tunae Mundi, que reúne anualmente as melhores tunas da Península Ibérica.",
    tags: ["Festival", "Lisboa", "Grande Evento"],
  },
  {
    id: 6,
    title: "Sarau Cultural da Universidade do Porto",
    date: "12 de Outubro, 2025",
    location: "Casa da Música, Porto",
    summary: "A TEUP participa no sarau anual da UP, apresentando um reportório que mistura tradição e inovação.",
    image: "/images/teup-outdoor.png",
    content: "O Sarau Cultural da Universidade do Porto é um evento anual que reúne diversos grupos culturais da universidade, e a TEUP é presença habitual.",
    tags: ["Sarau", "Universidade", "Porto", "Académico"],
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

export default function AllPerformances() {
  const [activeFilter, setActiveFilter] = useState<string>("all")
  const uniqueTags = Array.from(new Set(performances.flatMap(item => item.tags || [])))

  // Filter performances based on selected tag
  const filteredPerformances = activeFilter === "all"
    ? performances
    : performances.filter(item => item.tags && item.tags.includes(activeFilter))

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
            <h1 className="text-3xl md:text-5xl font-bold mb-6 font-['Cinzel',serif]">Próximas Atuações</h1>
            <p className="text-gray-400 mb-8 font-['Montserrat',sans-serif]">
              Confira onde e quando você poderá assistir às nossas performances ao vivo.
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

      {/* Performances Listing */}
      <section className="py-12 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredPerformances.map((performance) => (
              <motion.div
                key={performance.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10 transform hover:scale-[1.02]"
                variants={staggerItem}
              >
                {performance.image && (
                  <div className="overflow-hidden h-48">
                    <img
                      src={performance.image || "/placeholder.svg"}
                      alt={performance.title}
                      className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-red-500 text-sm mb-2 font-['Montserrat',sans-serif]">
                    <FaCalendarAlt className="mr-2" />
                    <span>{performance.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-['Playfair_Display',serif]">{performance.title}</h3>
                  <div className="flex items-center text-gray-400 mb-3 text-sm font-['Montserrat',sans-serif]">
                    <FaMapMarkerAlt className="mr-2" />
                    <span>{performance.location}</span>
                  </div>
                  <p className="text-gray-400 mb-4 font-['Montserrat',sans-serif] line-clamp-3">{performance.summary}</p>
                  
                  {/* Tags */}
                  {performance.tags && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {performance.tags.map((tag, index) => (
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
                    href={`/atuacoes/${performance.id}`}
                    className="text-red-500 hover:text-red-400 transition-all duration-300 flex items-center group font-['Montserrat',sans-serif]"
                  >
                    Ver detalhes{" "}
                    <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
                      →
                    </span>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
          
          {filteredPerformances.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-xl font-bold mb-2 font-['Montserrat',sans-serif]">Nenhuma atuação encontrada</h3>
              <p className="text-gray-400 font-['Montserrat',sans-serif]">
                Não foram encontradas atuações com o filtro selecionado.
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