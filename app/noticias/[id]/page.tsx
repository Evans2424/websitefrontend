"use client"

import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import { FaArrowLeft, FaCalendarAlt, FaShareAlt, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa"

// Animation variants for smoother transitions
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } }
}

// Related news animation variants
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
      when: "beforeChildren"
    },
  },
  exit: {
    opacity: 0, 
    transition: { 
      staggerChildren: 0.05,
      staggerDirection: -1,
      duration: 0.3,
      ease: [0.22, 1, 0.36, 1]
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
      "A Tuna de Engenharia da Universidade do Porto (TEUP) conquistou o primeiro lugar no prestigiado Festival Internacional de Tunas em Coimbra. Após uma atuação memorável que incluiu clássicos do repertório tunante e algumas inovações musicais, o júri decidiu por unanimidade atribuir o prémio principal à nossa tuna.\n\nEste reconhecimento vem coroar meses de ensaios intensivos e dedicação de todos os membros. A competição contou com a participação de 12 tunas de diferentes países, incluindo Espanha, Brasil e Itália.\n\nAlém do prémio principal, a TEUP também arrecadou o prémio de 'Melhor Instrumental' e 'Melhor Solista' para o nosso bandolinista António Ferreira.\n\nA vitória neste festival abre portas para futuras participações em eventos internacionais e consolida a posição da TEUP como uma das melhores tunas académicas de Portugal.",
    author: "Comissão de Comunicação TEUP",
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
      "É com grande orgulho que anunciamos o lançamento do nosso novo álbum 'Tradição Engenheira'. Este trabalho representa dois anos de dedicação e paixão pela música tradicional portuguesa, reinterpretada com o estilo único da TEUP.\n\nO álbum contém 12 faixas, incluindo clássicos do repertório tunante e três composições originais dos nossos membros. As gravações foram realizadas nos estúdios da Faculdade de Engenharia, com produção de João Silva, nosso atual Ensaiador.\n\n'Tradição Engenheira' já está disponível em todas as plataformas digitais como Spotify, Apple Music e YouTube Music. Também é possível adquirir a versão física do CD através da nossa loja online ou nos nossos concertos.\n\nParte das receitas das vendas será destinada ao fundo de bolsas para estudantes de Engenharia da UP. Agradecemos a todos que tornaram este projeto possível e esperamos que apreciem o resultado do nosso trabalho.",
    author: "Comissão de Comunicação TEUP",
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
      "A Tuna de Engenharia da Universidade do Porto (TEUP) anuncia a abertura de inscrições para novos membros. Convidamos todos os estudantes da Faculdade de Engenharia que tenham interesse em música e nas tradições académicas a candidatarem-se.\n\nProcuramos principalmente instrumentistas de cordas (violão, bandolim, viola, cavaquinho), mas também estamos abertos a outros instrumentos e vozes. Não é necessário ter experiência prévia ou formação musical formal - o mais importante é a vontade de aprender e o compromisso com o grupo.\n\nAs inscrições podem ser feitas através do formulário disponível no nosso site até 31 de Janeiro. As audições decorrerão durante o mês de Fevereiro, e os resultados serão anunciados até 15 de Março.\n\nOs selecionados passarão por um período de integração de seis meses antes de se tornarem membros efetivos. Junte-se a nós e faça parte desta tradição que já dura mais de três décadas!",
    author: "Comissão de Recrutamento TEUP",
    tags: ["Recrutamento", "Audições", "Novos Membros"],
  },
]

// NewsNotFound component
function NewsNotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Notícia não encontrada</h1>
        <Link href="/" className="text-red-500 hover:text-red-400 flex items-center justify-center">
          <FaArrowLeft className="mr-2" /> Voltar à página inicial
        </Link>
      </div>
    </div>
  )
}

export default function NewsDetail() {
  // Use useParams hook to get the id parameter from the URL
  const params = useParams();
  // Convert id to number
  const id = Number(params.id);
  
  // Find the matching news item
  const newsItem = newsItems.find((item) => item.id === id)
  
  // If news item not found, show the not found component
  if (!newsItem) {
    return <NewsNotFound />
  }

  // Get other news items (excluding the current one) to display as related news
  const otherNewsItems = newsItems.filter(item => item.id !== id);

  // Format content with paragraphs
  const formattedContent = newsItem.content.split("\n\n").map((paragraph, index) => (
    <p key={index} className="mb-4">
      {paragraph}
    </p>
  ))

  return (
    <div className="min-h-screen bg-black text-white font-['Playfair_Display',serif]">
      {/* Hero Section with proper spacing for fixed navbar */}
      <section className="pt-28 pb-12 relative">
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
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeInUp}
            className="max-w-4xl mx-auto"
          >
            <Link
              href="/noticias"
              className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors duration-300 font-['Montserrat',sans-serif]"
            >
              <FaArrowLeft className="mr-2" /> Voltar às notícias
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
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={fadeIn}
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
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {otherNewsItems.slice(0, 3).map((item) => (
              <motion.div
                key={item.id}
                className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10 transform hover:scale-[1.02]"
                variants={staggerItem}
              >
                {item.image && (
                  <div className="overflow-hidden h-48">
                    <img
                      src={item.image}
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
            
            {otherNewsItems.length === 0 && (
              <div className="bg-gray-900 rounded-lg p-6 col-span-3 text-center">
                <p className="text-gray-400 font-['Montserrat',sans-serif]">
                  Não há outras notícias disponíveis no momento.
                </p>
                <Link
                  href="/noticias"
                  className="text-red-500 hover:text-red-400 transition-all duration-300 flex items-center justify-center group font-['Montserrat',sans-serif] mt-4"
                >
                  Ver todas as notícias{" "}
                  <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            )}
          </motion.div>
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
