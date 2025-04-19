"use client"

import { useParams } from "next/navigation"
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

// Performance data
const performances = [
  {
    id: 1,
    title: "Festival Internacional de Tunas",
    date: "15 de Maio, 2025",
    location: "Coimbra, Portugal",
    venue: "Grande Auditório da Universidade de Coimbra",
    time: "21:00",
    ticketLink: "https://example.com/tickets/festival-tunas",
    summary:
      "A TEUP participará no prestigiado Festival Internacional de Tunas em Coimbra, competindo com tunas de toda a Europa.",
    image: "/images/teup-flag-performance.png",
    content:
      "A TEUP tem a honra de participar no prestigiado Festival Internacional de Tunas em Coimbra, um dos eventos mais importantes do calendário tunante. Este festival, que celebra a sua 25ª edição, reúne as melhores tunas académicas de Portugal, Espanha e outros países europeus.\n\nA competição decorrerá no Grande Auditório da Universidade de Coimbra, com capacidade para mais de 1000 espectadores. Cada tuna terá 15 minutos para apresentar o seu repertório, sendo avaliada por um júri composto por professores de música e antigos tunos de renome.\n\nA TEUP preparou um programa especial para esta ocasião, incluindo clássicas baladas portuguesas e uma surpresa musical que promete impressionar o júri e o público.\n\nOs bilhetes para o evento já estão à venda e podem ser adquiridos através do site do festival ou na bilheteira da Universidade de Coimbra. Venha apoiar a TEUP neste importante evento!",
    mapLink: "https://maps.google.com/?q=Universidade+de+Coimbra",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Celebração do Aniversário da FEUP",
    date: "10 de Junho, 2025",
    location: "Porto, Portugal",
    venue: "Auditório da FEUP",
    time: "21:00",
    ticketLink: "https://example.com/tickets/aniversario-feup",
    summary: "Concerto especial para celebrar o aniversário da Faculdade de Engenharia da Universidade do Porto.",
    image: "/images/teup-dance-performance.png",
    content:
      "A TEUP apresentará um concerto especial para celebrar o aniversário da Faculdade de Engenharia da Universidade do Porto. Este evento faz parte das comemorações oficiais da FEUP e contará com a presença de autoridades académicas, professores, alunos e ex-alunos.\n\nO concerto terá lugar no Auditório da FEUP, com início às 21h00. O programa incluirá um repertório que percorre a história da TEUP e da própria faculdade, com músicas que marcaram diferentes épocas ao longo das últimas décadas.\n\nHaverá também um momento especial de homenagem aos antigos membros da tuna, com a participação de alguns veteranos que se juntarão ao grupo para interpretar peças clássicas do repertório.\n\nA entrada é gratuita, mas sujeita à lotação da sala. Os interessados devem levantar o seu convite na Associação de Estudantes da FEUP a partir de 1 de Junho. Não perca esta oportunidade de celebrar connosco a história e as tradições da nossa faculdade!",
    mapLink: "https://maps.google.com/?q=FEUP+Porto",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Intercâmbio Cultural em Nice",
    date: "22 de Julho, 2025",
    location: "Nice, França",
    venue: "Place Masséna",
    time: "19:30",
    ticketLink: "https://example.com/tickets/nice-cultural",
    summary: "A TEUP representará Portugal num intercâmbio cultural com grupos musicais universitários europeus.",
    image: "/images/teup-nice.png",
    content:
      "A TEUP terá a honra de representar Portugal num importante intercâmbio cultural com grupos musicais universitários europeus, a realizar-se em Nice, França. Este evento, organizado pela Federação Europeia de Música Universitária, reúne anualmente grupos de diferentes tradições musicais académicas para promover o intercâmbio cultural e a amizade entre estudantes europeus.\n\nDurante uma semana, a TEUP participará em workshops, concertos conjuntos e apresentações individuais em vários locais emblemáticos da cidade francesa, incluindo a famosa Promenade des Anglais e a Place Masséna.\n\nAlém das atuações, o programa inclui visitas culturais e momentos de convívio com os outros grupos participantes, provenientes de países como França, Espanha, Itália, Alemanha e Polónia.\n\nEsta será uma oportunidade única para a TEUP divulgar a cultura musical académica portuguesa e estabelecer contactos para futuras colaborações internacionais. A participação da TEUP neste evento é parcialmente financiada pela Universidade do Porto e pelo Instituto Camões.",
    mapLink: "https://maps.google.com/?q=Place+Massena+Nice+France",
    isFeatured: false,
  },
]

export default function PerformanceDetail() {
  const params = useParams();
  const id = params.id;

  // Find the performance with the matching id
  const performance = performances.find((item) => item.id === Number(id))

  // If no matching performance is found or id is undefined, show loading or error
  if (!performance) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Atuação não encontrada</h1>
          <Link href="/" className="text-red-500 hover:text-red-400 flex items-center justify-center">
            <FaArrowLeft className="mr-2" /> Voltar à página inicial
          </Link>
        </div>
      </div>
    )
  }

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
            {performances
              .filter((item) => item.id !== Number(id))
              .slice(0, 3)
              .map((item) => (
                <motion.div
                  key={item.id}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10 transform hover:scale-[1.02]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.image && (
                    <div className="overflow-hidden">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <div className="flex items-center text-red-500 text-sm mb-2 font-['Montserrat',sans-serif]">
                      <FaCalendarAlt className="mr-2" />
                      <span>{item.date}</span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 font-['Playfair_Display',serif]">{item.title}</h3>
                    <p className="text-gray-400 mb-2 font-['Montserrat',sans-serif]">{item.location}</p>
                    <Link
                      href={`/atuacoes/${item.id}`}
                      className="text-red-500 hover:text-red-400 transition-all duration-300 flex items-center group font-['Montserrat',sans-serif] mt-4"
                    >
                      Ver detalhes{" "}
                      <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </motion.div>
              ))}
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
