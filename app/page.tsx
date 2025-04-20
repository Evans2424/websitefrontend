"use client"

import { useState, useEffect, useRef } from "react"
import { FaShoppingCart, FaCalendarAlt, FaMusic, FaNewspaper } from "react-icons/fa"
import Link from "next/link"
import ImageCarousel from "./components/ImageCarousel"
import { motion } from "framer-motion"
import ScrollToTop from "./components/ScrollToTop"
import FlippableCard from "./components/FlippableCard"

// Member data types
type MemberRole =
  | "Violão"
  | "Bandolim"
  | "Viola"
  | "Cavaquinho"
  | "Acordeão"
  | "Flauta"
  | "Percussão"
  | "Contrabaixo"
  | "Pandeireta"
  | "Voz"

interface Member {
  id: number
  name: string
  nickname?: string
  role: MemberRole
  joinYear: number
  course?: string
  bio: string
  image: string
  isLeader?: boolean
}

// Sample data for current members
const currentMembers: Member[] = [
  {
    id: 1,
    name: "João Silva",
    nickname: "Maestro",
    role: "Violão",
    joinYear: 2018,
    course: "Engenharia Informática",
    bio: "João é o atual Ensaiador da TEUP. Entrou para a Tuna em 2018 e desde então tem sido uma peça fundamental no grupo. Especialista em violão clássico, tem mais de 10 anos de experiência musical.",
    image: "/placeholder.svg?height=300&width=300",
    isLeader: true,
  },
  {
    id: 2,
    name: "Miguel Costa",
    nickname: "Tenor",
    role: "Voz",
    joinYear: 2019,
    course: "Engenharia Mecânica",
    bio: "Miguel é o nosso vocalista principal com uma poderosa voz de tenor. Canta desde criança e entrou para a TEUP no seu segundo ano de faculdade.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 3,
    name: "António Ferreira",
    nickname: "Bandolas",
    role: "Bandolim",
    joinYear: 2020,
    course: "Engenharia Civil",
    bio: "António é um dos nossos talentosos bandolinistas. Traz energia e precisão a cada atuação da TEUP.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 4,
    name: "Francisco Oliveira",
    nickname: "Presidente",
    role: "Viola",
    joinYear: 2017,
    course: "Engenharia Eletrotécnica",
    bio: "Francisco é o nosso membro mais experiente e serve como Presidente da TEUP. A sua liderança tem guiado a Tuna através de muitas atuações bem-sucedidas.",
    image: "/placeholder.svg?height=300&width=300",
    isLeader: true,
  },
  {
    id: 5,
    name: "Pedro Santos",
    nickname: "Cavaco",
    role: "Cavaquinho",
    joinYear: 2019,
    course: "Engenharia Química",
    bio: "Pedro traz o som tradicional do cavaquinho às nossas atuações. Os seus dedos ágeis e conhecimento musical são inestimáveis para o grupo.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 6,
    name: "Diogo Martins",
    nickname: "Acordes",
    role: "Acordeão",
    joinYear: 2021,
    course: "Engenharia Ambiental",
    bio: "O nosso membro mais recente, Diogo, rapidamente se tornou essencial com as suas habilidades no acordeão que adicionam profundidade ao nosso som tradicional.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 7,
    name: "Tiago Almeida",
    nickname: "Ritmo",
    role: "Percussão",
    joinYear: 2018,
    course: "Engenharia de Materiais",
    bio: "Tiago mantém o ritmo com as suas habilidades de percussão. Também é responsável por organizar muitas das nossas atuações.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 8,
    name: "Rui Sousa",
    nickname: "Baixo",
    role: "Contrabaixo",
    joinYear: 2020,
    course: "Engenharia Física",
    bio: "Rui fornece a base do nosso som com o seu contrabaixo. O seu conhecimento de teoria musical ajuda a arranjar as nossas peças tradicionais.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

// Sample data for former members
const formerMembers: Member[] = [
  {
    id: 101,
    name: "Manuel Rodrigues",
    nickname: "Fundador",
    role: "Violão",
    joinYear: 2000,
    bio: "Manuel esteve na TEUP durante 8 anos e foi fundamental no estabelecimento do nosso repertório atual. Agora trabalha como professor de música.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 102,
    name: "José Pereira",
    nickname: "Voz de Ouro",
    role: "Voz",
    joinYear: 2005,
    bio: "A poderosa voz de José liderou muitas das nossas atuações até à sua formatura em 2010. Ainda se junta a nós para eventos especiais de antigos alunos.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 103,
    name: "Carlos Nunes",
    nickname: "Virtuoso",
    role: "Bandolim",
    joinYear: 2008,
    bio: "Carlos era conhecido pelas suas técnicas inovadoras de bandolim que trouxeram um som único à TEUP de 2008 a 2012.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    id: 104,
    name: "André Lopes",
    nickname: "Flautista",
    role: "Flauta",
    joinYear: 2010,
    bio: "A flauta de André adicionou uma camada melódica às nossas atuações durante 5 anos. Agora atua com um conjunto folclórico profissional.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

// News/Events data
interface NewsItem {
  id: number
  title: string
  date: string
  summary: string
  image?: string
  content?: string
}

const newsItems: NewsItem[] = [
  {
    id: 1,
    title: "TEUP vence Festival Internacional de Tunas",
    date: "15 de Março, 2025",
    summary:
      "A Tuna de Engenharia da Universidade do Porto conquistou o primeiro lugar no prestigiado Festival Internacional de Tunas em Coimbra.",
    image: "/images/teup-flag-performance.png",
    content:
      "A Tuna de Engenharia da Universidade do Porto (TEUP) conquistou o primeiro lugar no prestigiado Festival Internacional de Tunas em Coimbra. Após uma atuação memorável que incluiu clássicos do repertório tunante e algumas inovações musicais, o júri decidiu por unanimidade atribuir o prémio principal à nossa tuna. Este reconhecimento vem coroar meses de ensaios intensivos e dedicação de todos os membros. A competição contou com a participação de 12 tunas de diferentes países, incluindo Espanha, Brasil e Itália. Além do prémio principal, a TEUP também arrecadou o prémio de 'Melhor Instrumental' e 'Melhor Solista' para o nosso bandolinista António Ferreira. A vitória neste festival abre portas para futuras participações em eventos internacionais e consolida a posição da TEUP como uma das melhores tunas académicas de Portugal.",
  },
  {
    id: 2,
    title: "Novo CD 'Tradição Engenheira' já disponível",
    date: "28 de Fevereiro, 2025",
    summary:
      "O mais recente trabalho da TEUP já está disponível em todas as plataformas digitais e na nossa loja online.",
    image: "/images/teup-musicians.png",
    content:
      "É com grande orgulho que anunciamos o lançamento do nosso novo álbum 'Tradição Engenheira'. Este trabalho representa dois anos de dedicação e paixão pela música tradicional portuguesa, reinterpretada com o estilo único da TEUP. O álbum contém 12 faixas, incluindo clássicos do repertório tunante e três composições originais dos nossos membros. As gravações foram realizadas nos estúdios da Faculdade de Engenharia, com produção de João Silva, nosso atual Ensaiador. 'Tradição Engenheira' já está disponível em todas as plataformas digitais como Spotify, Apple Music e YouTube Music. Também é possível adquirir a versão física do CD através da nossa loja online ou nos nossos concertos. Parte das receitas das vendas será destinada ao fundo de bolsas para estudantes de Engenharia da UP. Agradecemos a todos que tornaram este projeto possível e esperamos que apreciem o resultado do nosso trabalho.",
  },
  {
    id: 3,
    title: "Inscrições abertas para novos tunos",
    date: "10 de Janeiro, 2025",
    summary:
      "Estão abertas as inscrições para estudantes de Engenharia que queiram juntar-se à TEUP. As audições decorrerão durante o mês de Fevereiro.",
    image: "/images/teup-university.png",
    content:
      "A Tuna de Engenharia da Universidade do Porto (TEUP) anuncia a abertura de inscrições para novos membros. Convidamos todos os estudantes da Faculdade de Engenharia que tenham interesse em música e nas tradições académicas a candidatarem-se. Procuramos principalmente instrumentistas de cordas (violão, bandolim, viola, cavaquinho), mas também estamos abertos a outros instrumentos e vozes. Não é necessário ter experiência prévia ou formação musical formal - o mais importante é a vontade de aprender e o compromisso com o grupo. As inscrições podem ser feitas através do formulário disponível no nosso site até 31 de Janeiro. As audições decorrerão durante o mês de Fevereiro, e os resultados serão anunciados até 15 de Março. Os selecionados passarão por um período de integração de seis meses antes de se tornarem membros efetivos. Junte-se a nós e faça parte desta tradição que já dura mais de três décadas!",
  },
]

// Performance data
interface Performance {
  id: number
  title: string
  date: string
  location: string
  summary: string
  image?: string
  content?: string
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
      "A TEUP tem a honra de participar no prestigiado Festival Internacional de Tunas em Coimbra, um dos eventos mais importantes do calendário tunante. Este festival, que celebra a sua 25ª edição, reúne as melhores tunas académicas de Portugal, Espanha e outros países europeus. A competição decorrerá no Grande Auditório da Universidade de Coimbra, com capacidade para mais de 1000 espectadores. Cada tuna terá 15 minutos para apresentar o seu repertório, sendo avaliada por um júri composto por professores de música e antigos tunos de renome. A TEUP preparou um programa especial para esta ocasião, incluindo clássicas baladas portuguesas e uma surpresa musical que promete impressionar o júri e o público. Os bilhetes para o evento já estão à venda e podem ser adquiridos através do site do festival ou na bilheteira da Universidade de Coimbra. Venha apoiar a TEUP neste importante evento!",
  },
  {
    id: 2,
    title: "Celebração do Aniversário da FEUP",
    date: "10 de Junho, 2025",
    location: "Auditório da FEUP, Porto",
    summary: "Concerto especial para celebrar o aniversário da Faculdade de Engenharia da Universidade do Porto.",
    image: "/images/teup-dance-performance.png",
    content:
      "A TEUP apresentará um concerto especial para celebrar o aniversário da Faculdade de Engenharia da Universidade do Porto. Este evento faz parte das comemorações oficiais da FEUP e contará com a presença de autoridades académicas, professores, alunos e ex-alunos. O concerto terá lugar no Auditório da FEUP, com início às 21h00. O programa incluirá um repertório que percorre a história da TEUP e da própria faculdade, com músicas que marcaram diferentes épocas ao longo das últimas décadas. Haverá também um momento especial de homenagem aos antigos membros da tuna, com a participação de alguns veteranos que se juntarão ao grupo para interpretar peças clássicas do repertório. A entrada é gratuita, mas sujeita à lotação da sala. Os interessados devem levantar o seu convite na Associação de Estudantes da FEUP a partir de 1 de Junho. Não perca esta oportunidade de celebrar connosco a história e as tradições da nossa faculdade!",
  },
  {
    id: 3,
    title: "Intercâmbio Cultural em Nice",
    date: "22 de Julho, 2025",
    location: "Nice, França",
    summary: "A TEUP representará Portugal num intercâmbio cultural com grupos musicais universitários europeus.",
    image: "/images/teup-nice.png",
    content:
      "A TEUP terá a honra de representar Portugal num importante intercâmbio cultural com grupos musicais universitários europeus, a realizar-se em Nice, França. Este evento, organizado pela Federação Europeia de Música Universitária, reúne anualmente grupos de diferentes tradições musicais académicas para promover o intercâmbio cultural e a amizade entre estudantes europeus. Durante uma semana, a TEUP participará em workshops, concertos conjuntos e apresentações individuais em vários locais emblemáticos da cidade francesa, incluindo a famosa Promenade des Anglais e a Place Masséna. Além das atuações, o programa inclui visitas culturais e momentos de convívio com os outros grupos participantes, provenientes de países como França, Espanha, Itália, Alemanha e Polónia. Esta será uma oportunidade única para a TEUP divulgar a cultura musical académica portuguesa e estabelecer contactos para futuras colaborações internacionais. A participação da TEUP neste evento é parcialmente financiada pela Universidade do Porto e pelo Instituto Camões.",
  },
]

// Carousel images
const carouselImages = [
  "/images/teup-nice.png",
  "/images/teup-performance.png",
  "/images/teup-meeting-room.png",
  "/images/teup-night-view.png",
  "/images/teup-jump-performance.png",
  "/images/teup-flag-performance.png",
]

// Animation variants - Make animations more subtle
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
}

// Custom hook for intersection observer
function useIntersectionObserver(options = {}): [React.RefObject<HTMLElement>, boolean] {
  const elementRef = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)

    if (elementRef.current) {
      observer.observe(elementRef.current)
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current)
      }
    }
  }, [options])

  return [elementRef, isIntersecting]
}

export default function LandingPage() {
  const [activeTab, setActiveTab] = useState<"current" | "former">("current")
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("all")

  // Gallery images with categories
  const galleryImages = [
    {
      src: "/images/teup-jump-performance.png",
      alt: "TEUP member jumping during performance",
      category: "performance",
    },
    {
      src: "/images/teup-musicians.png",
      alt: "TEUP musicians playing instruments",
      category: "performance",
    },
    {
      src: "/images/teup-outdoor.png",
      alt: "TEUP group photo outdoors",
      category: "group",
    },
    {
      src: "/images/teup-university.png",
      alt: "TEUP in front of university building",
      category: "group",
    },
    {
      src: "/images/teup-casual.png",
      alt: "TEUP members in casual setting",
      category: "group",
    },
    {
      src: "/images/teup-flag-performance.png",
      alt: "TEUP performance with flag",
      category: "performance",
    },
    {
      src: "/images/teup-dance-performance.png",
      alt: "TEUP dance performance",
      category: "performance",
    },
    {
      src: "/images/teup-nice.png",
      alt: "TEUP in Nice, France",
      category: "travel",
    },
    {
      src: "/images/teup-night-view.png",
      alt: "TEUP at night with city view",
      category: "travel",
    },
  ]

  // Filter gallery images based on active filter
  const filteredGalleryImages =
    activeGalleryFilter === "all" ? galleryImages : galleryImages.filter((img) => img.category === activeGalleryFilter)

  // Refs for sections with animations
  const [aboutRef, aboutVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [newsRef, newsVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [membersRef, membersVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [discographyRef, discographyVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [performancesRef, performancesVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [galleryRef, galleryVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [contactRef, contactVisible] = useIntersectionObserver({ threshold: 0.2 })

  return (
    <div className="min-h-screen bg-black text-white font-['Playfair_Display',serif] overflow-x-hidden w-full">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full">
          <ImageCarousel images={carouselImages} className="h-full" />
        </div>
        <motion.div
          className="container mx-auto px-4 z-10 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight font-['Cinzel',serif] text-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            TUNA DE ENGENHARIA
          </motion.h1>
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mb-6 text-red-500 font-['Cinzel',serif] text-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            UNIVERSIDADE DO PORTO
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white font-['Montserrat',sans-serif] text-shadow-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Tradição, música e engenharia desde 1988
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
          >
            <motion.a
              href="#performances"
              className="px-8 py-3 bg-red-700 hover:bg-red-800 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-['Montserrat',sans-serif]"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById("performances")?.scrollIntoView({ behavior: "smooth" })
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Próximas Atuações
            </motion.a>
            <motion.a
              href="#about"
              className="px-8 py-3 border border-white hover:bg-white hover:text-black rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-['Montserrat',sans-serif]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              A Nossa História
            </motion.a>
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        >
          <svg className="w-6 h-10" viewBox="0 0 24 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="22" height="38" rx="11" stroke="white" strokeWidth="2" />
            <motion.circle
              cx="12"
              cy="10"
              r="4"
              fill="white"
              initial={{ y: 0 }}
              animate={{ y: 20 }}
              transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
            />
          </svg>
        </motion.div>
      </section>

      {/* Quick Links Section */}
      <motion.section
        className="py-10 bg-gradient-to-r from-red-900 to-red-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {[
              { icon: <FaNewspaper className="text-4xl mb-2" />, text: "Notícias", target: "news" },
              { icon: <FaMusic className="text-4xl mb-2" />, text: "Membros", target: "members" },
              { icon: <FaCalendarAlt className="text-4xl mb-2" />, text: "Agenda", target: "performances" },
              { icon: <FaMusic className="text-4xl mb-2" />, text: "Discografia", target: "discography" },
            ].map((item, index) => (
              <motion.a
                key={index}
                href={item.target.startsWith("http") ? item.target : `#${item.target}`}
                className="flex flex-col items-center p-4 bg-black/20 rounded-lg hover:bg-black/30 transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                onClick={(e) => {
                  if (!item.target.startsWith("http")) {
                    e.preventDefault()
                    document.getElementById(item.target)?.scrollIntoView({ behavior: "smooth" })
                  }
                }}
                variants={staggerItem}
              >
                {item.icon}
                <span className="font-medium font-['Montserrat',sans-serif]">{item.text}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gradient-to-b from-black to-gray-900" ref={aboutRef}>
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={aboutVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <img
                src="/images/teup-meeting-room.png"
                alt="TEUP group photo in traditional capes"
                className="rounded-lg shadow-2xl transform transition-all duration-500 hover:scale-[1.02] hover:shadow-red-500/20 hover:shadow-2xl"
              />
            </motion.div>
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              animate={aboutVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-6 font-['Cinzel',serif] relative inline-block">
                Sobre a TEUP
                <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-700"></span>
              </h2>
              <p className="text-gray-300 mb-6 font-['Montserrat',sans-serif] leading-relaxed">
                Fundada em 1990, a Tuna de Engenharia da Universidade do Porto (TEUP) é um grupo musical académico
                dedicado a preservar e apresentar o rico património musical português. Combinamos instrumentos clássicos
                com canções tradicionais portuguesas para criar uma experiência musical única.
              </p>
              <p className="text-gray-300 mb-6 font-['Montserrat',sans-serif] leading-relaxed">
                Os nossos membros, conhecidos como "tunos", vestem o traje académico tradicional composto por capas e
                fatos pretos, representando as cores e tradições da nossa universidade. Atuamos em eventos
                universitários, festivais e celebrações culturais por todo Portugal e internacionalmente.
              </p>
              <p className="text-gray-300 mb-6 font-['Montserrat',sans-serif] leading-relaxed">
                A TEUP é composta exclusivamente por estudantes e ex-estudantes da Faculdade de Engenharia da
                Universidade do Porto, mantendo viva a tradição tunante enquanto nos adaptamos aos tempos e públicos
                modernos.
              </p>
              <div className="flex gap-4">
                <motion.a
                  href="#members"
                  className="px-6 py-2 bg-red-700 hover:bg-red-800 rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-['Montserrat',sans-serif]"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("members")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Conhecer os Tunos
                </motion.a>
                <motion.a
                  href="#history"
                  className="px-6 py-2 border border-white hover:bg-white hover:text-black rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-['Montserrat',sans-serif]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  História Completa
                </motion.a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section id="news" className="py-20 bg-black" ref={newsRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={newsVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-['Cinzel',serif] relative inline-block">
              Notícias e Eventos
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-700"></span>
            </h2>
            <a
              href="/noticias"
              className="text-red-500 hover:text-red-400 transition-all duration-300 flex items-center group font-['Montserrat',sans-serif]"
            >
              Ver todas{" "}
              <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={newsVisible ? "visible" : "hidden"}
          >
            {newsItems.map((item) => (
              <motion.div
                key={item.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10 transform hover:scale-[1.02]"
                variants={staggerItem}
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
                  <p className="text-red-500 text-sm mb-2 font-['Montserrat',sans-serif]">{item.date}</p>
                  <h3 className="text-xl font-bold mb-2 font-['Playfair_Display',serif]">{item.title}</h3>
                  <p className="text-gray-400 mb-4 font-['Montserrat',sans-serif]">{item.summary}</p>
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
        </div>
      </section>

      {/* Members Section */}
      <section id="members" className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={membersRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={membersVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Cinzel',serif] relative inline-block">
              Nossos Tunos
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-700"></span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-['Montserrat',sans-serif]">
              Conheça os membros que fazem a TEUP acontecer, trazendo música e tradição para cada apresentação.
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <button
                onClick={() => setActiveTab("current")}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-['Montserrat',sans-serif] ${
                  activeTab === "current"
                    ? "bg-red-700 text-white"
                    : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                Membros Atuais
              </button>
              <button
                onClick={() => setActiveTab("former")}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-['Montserrat',sans-serif] ${
                  activeTab === "former"
                    ? "bg-red-700 text-white"
                    : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                }`}
              >
                Antigos Membros
              </button>
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
            initial="hidden"
            animate={membersVisible ? "visible" : "hidden"}
          >
            {(activeTab === "current" ? currentMembers : formerMembers).map((member) => (
              <motion.div
                key={member.id}
                className="h-[420px]"
                variants={staggerItem}
              >
                <FlippableCard 
                  frontContent={
                    <div className="bg-gray-900 h-full rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:shadow-red-500/10">
                      <div className="overflow-hidden h-64">
                        <img
                          src={member.image || "/placeholder.svg"}
                          alt={member.name}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold mb-1 font-['Playfair_Display',serif]">{member.name}</h3>
                        {member.nickname && (
                          <p className="text-red-500 text-sm mb-2 font-['Montserrat',sans-serif]">"{member.nickname}"</p>
                        )}
                        <p className="text-gray-400 mb-2 font-['Montserrat',sans-serif]">{member.role}</p>
                        {member.isLeader && (
                          <span className="inline-block bg-red-700/20 text-red-400 text-xs px-2 py-1 rounded-full mb-2 font-['Montserrat',sans-serif]">
                            Direção
                          </span>
                        )}
                        <p className="text-gray-500 text-sm font-['Montserrat',sans-serif]">Desde {member.joinYear}</p>
                      </div>
                    </div>
                  }
                  backContent={
                    <div className="bg-gray-900 h-full rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 p-6 flex flex-col">
                      <h3 className="text-xl font-bold mb-2 font-['Playfair_Display',serif]">{member.name}</h3>
                      {member.nickname && (
                        <p className="text-red-500 text-lg mb-2 font-['Montserrat',sans-serif]">
                          "{member.nickname}"
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <div className="bg-gray-800 px-3 py-1 rounded-lg">
                          <p className="text-xs text-gray-400 font-['Montserrat',sans-serif]">Instrumento</p>
                          <p className="text-sm font-medium font-['Montserrat',sans-serif]">{member.role}</p>
                        </div>
                        <div className="bg-gray-800 px-3 py-1 rounded-lg">
                          <p className="text-xs text-gray-400 font-['Montserrat',sans-serif]">Desde</p>
                          <p className="text-sm font-medium font-['Montserrat',sans-serif]">{member.joinYear}</p>
                        </div>
                        {member.course && (
                          <div className="bg-gray-800 px-3 py-1 rounded-lg">
                            <p className="text-xs text-gray-400 font-['Montserrat',sans-serif]">Curso</p>
                            <p className="text-sm font-medium font-['Montserrat',sans-serif]">{member.course}</p>
                          </div>
                        )}
                      </div>
                      <div className="prose prose-sm prose-invert max-w-none font-['Montserrat',sans-serif] flex-grow overflow-y-auto">
                        <p className="text-gray-300 text-sm">{member.bio}</p>
                      </div>
                      <div className="mt-4 text-center">
                        <span className="text-xs text-gray-500 font-['Montserrat',sans-serif]">Clique para voltar</span>
                      </div>
                    </div>
                  }
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Discography Section */}
      <section id="discography" className="py-20 bg-black" ref={discographyRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={discographyVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Cinzel',serif] relative inline-block">
              Discografia
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-700"></span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-['Montserrat',sans-serif] mb-8">
              Explore os álbuns oficiais da TEUP disponíveis no Spotify.
            </p>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto"
            variants={staggerContainer}
            initial="hidden"
            animate={discographyVisible ? "visible" : "hidden"}
          >
            {/* Com o porto da memória (2017) */}
            <motion.div
              className="flex flex-col items-center"
              variants={staggerItem}
            >
              <div className="w-full max-w-md">
                <div className="aspect-square w-full mb-5 shadow-xl hover:shadow-red-500/20 transition-all duration-500 rounded-xl overflow-hidden bg-[#121212]">
                  <iframe
                    src="https://open.spotify.com/embed/album/3FaNaNyy7dhM8Kk9MmCq5e"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl"
                    title="Spotify embed: Com o porto da memória"
                  ></iframe>
                </div>
                <h3 className="text-xl font-bold text-center mb-1 font-['Playfair_Display',serif]">Com o porto da memória</h3>
                <p className="text-red-500 text-sm text-center mb-4 font-['Montserrat',sans-serif]">2017</p>
                <div className="flex justify-center">
                  <a
                    href="https://open.spotify.com/album/3FaNaNyy7dhM8Kk9MmCq5e?si=36171f4b5b634613"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-['Montserrat',sans-serif] flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406c-.183.307-.564.4-.87.217-2.383-1.455-5.381-1.783-8.916-.973-.34.08-.684-.136-.764-.476-.08-.341.136-.684.476-.765 3.868-.876 7.167-.5 9.856 1.127.308.183.4.564.218.87zm1.085-2.415c-.229.379-.72.5-1.1.27-2.73-1.678-6.894-2.165-10.122-1.183-.414.125-.854-.106-.98-.52-.123-.413.108-.852.52-.978 3.694-1.122 8.282-.573 11.412 1.312.38.23.5.72.27 1.1zm.094-2.514c-3.273-1.944-8.67-2.124-11.8-1.175-.496.15-1.02-.13-1.17-.624-.148-.495.13-1.02.625-1.167 3.57-1.082 9.502-.874 13.246 1.358.453.27.6.864.33 1.317-.272.452-.864.6-1.318.33l.087-.04z"/>
                    </svg>
                    Ouvir no Spotify
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Para lá dos palcos (2007) */}
            <motion.div
              className="flex flex-col items-center"
              variants={staggerItem}
            >
              <div className="w-full max-w-md">
                <div className="aspect-square w-full mb-5 shadow-xl hover:shadow-red-500/20 transition-all duration-500 rounded-xl overflow-hidden bg-[#121212]">
                  <iframe
                    src="https://open.spotify.com/embed/album/6DFtJko0k0BBDe8kFKdRLc"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl"
                    title="Spotify embed: Para lá dos palcos"
                  ></iframe>
                </div>
                <h3 className="text-xl font-bold text-center mb-1 font-['Playfair_Display',serif]">Para lá dos palcos</h3>
                <p className="text-red-500 text-sm text-center mb-4 font-['Montserrat',sans-serif]">2007</p>
                <div className="flex justify-center">
                  <a
                    href="https://open.spotify.com/album/6DFtJko0k0BBDe8kFKdRLc?si=dxHO7gsmSruolOHHcoHE3Q"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-['Montserrat',sans-serif] flex items-center"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406c-.183.307-.564.4-.87.217-2.383-1.455-5.381-1.783-8.916-.973-.34.08-.684-.136-.764-.476-.08-.341.136-.684.476-.765 3.868-.876 7.167-.5 9.856 1.127.308.183.4.564.218.87zm1.085-2.415c-.229.379-.72.5-1.1.27-2.73-1.678-6.894-2.165-10.122-1.183-.414.125-.854-.106-.98-.52-.123-.413.108-.852.52-.978 3.694-1.122 8.282-.573 11.412 1.312.38.23.5.72.27 1.1zm.094-2.514c-3.273-1.944-8.67-2.124-11.8-1.175-.496.15-1.02-.13-1.17-.624-.148-.495.13-1.02.625-1.167 3.57-1.082 9.502-.874 13.246 1.358.453.27.6.864.33 1.317-.272.452-.864.6-1.318.33l.087-.04z"/>
                    </svg>
                    Ouvir no Spotify
                  </a>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Performances Section */}
      <section id="performances" className="py-20 bg-gradient-to-b from-black to-gray-900" ref={performancesRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="flex items-center justify-between mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={performancesVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold font-['Cinzel',serif] relative inline-block">
              Próximas Atuações
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-700"></span>
            </h2>
            <a
              href="/atuacoes"
              className="text-red-500 hover:text-red-400 transition-all duration-300 flex items-center group font-['Montserrat',sans-serif]"
            >
              Ver todas{" "}
              <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
            </a>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={performancesVisible ? "visible" : "hidden"}
          >
            {performances.map((performance) => (
              <motion.div
                key={performance.id}
                className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10 transform hover:scale-[1.02]"
                variants={staggerItem}
              >
                {performance.image && (
                  <div className="overflow-hidden">
                    <img
                      src={performance.image || "/placeholder.svg"}
                      alt={performance.title}
                      className="w-full h-48 object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center text-red-500 text-sm mb-2 font-['Montserrat',sans-serif]">
                    <FaCalendarAlt className="mr-2" />
                    <span>{performance.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 font-['Playfair_Display',serif]">{performance.title}</h3>
                  <p className="text-gray-400 mb-2 font-['Montserrat',sans-serif]">{performance.location}</p>
                  <p className="text-gray-500 mb-4 font-['Montserrat',sans-serif]">{performance.summary}</p>
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
        </div>
      </section>

      {/* Gallery Section */}
      <section id="gallery" className="py-20 bg-black" ref={galleryRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={galleryVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Cinzel',serif] relative inline-block">
              Galeria
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-700"></span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto mb-8 font-['Montserrat',sans-serif]">
              Momentos capturados das nossas atuações, viagens e convívios.
            </p>
            <div className="flex justify-center flex-wrap gap-2 mb-8">
              {["all", "performance", "group", "travel"].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveGalleryFilter(filter)}
                  className={`px-4 py-2 rounded-full transition-all duration-300 text-sm font-['Montserrat',sans-serif] ${
                    activeGalleryFilter === filter
                      ? "bg-red-700 text-white"
                      : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                  }`}
                >
                  {filter === "all"
                    ? "Todos"
                    : filter === "performance"
                      ? "Atuações"
                      : filter === "group"
                        ? "Grupo"
                        : "Viagens"}
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            className="grid grid-cols-2 md:grid-cols-3 gap-4"
            variants={staggerContainer}
            initial="hidden"
            animate={galleryVisible ? "visible" : "hidden"}
          >
            {filteredGalleryImages.map((image, index) => (
              <motion.div key={index} className="overflow-hidden rounded-lg aspect-square" variants={staggerItem}>
                <img
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                />
              </motion.div>
            ))}
          </motion.div>

          <motion.div
            className="text-center mt-10"
            initial={{ opacity: 0 }}
            animate={galleryVisible ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="/galeria"
              className="inline-block px-6 py-3 border border-white hover:bg-white hover:text-black rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-['Montserrat',sans-serif]"
            >
              Ver mais fotos
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gradient-to-b from-gray-900 to-black" ref={contactRef}>
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={contactVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Cinzel',serif] relative inline-block">
              Contacto
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-700"></span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-['Montserrat',sans-serif]">
              Tem interesse em contratar a TEUP para um evento? Entre em contacto connosco.
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-8"
              initial={{ opacity: 0, y: 30 }}
              animate={contactVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-gray-900 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 font-['Playfair_Display',serif]">Informações de Contacto</h3>
                <div className="space-y-4 font-['Montserrat',sans-serif]">
                  <div className="flex items-start">
                    <div className="bg-red-700/20 p-3 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Email</h4>
                      <a href="mailto:info@teup.pt" className="text-gray-400 hover:text-white transition-colors">
                        info@teup.pt
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-700/20 p-3 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Telefone</h4>
                      <a href="tel:+351222000000" className="text-gray-400 hover:text-white transition-colors">
                        +351 222 000 000
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-red-700/20 p-3 rounded-full mr-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 text-red-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold">Endereço</h4>
                      <p className="text-gray-400">
                        Faculdade de Engenharia da Universidade do Porto
                        <br />
                        Rua Dr. Roberto Frias, s/n
                        <br />
                        4200-465 Porto, Portugal
                      </p>
                    </div>
                  </div>
                </div>

                <h3 className="text-2xl font-bold mt-8 mb-4 font-['Playfair_Display',serif]">Redes Sociais</h3>
                <div className="flex space-x-4">
                  {[
                    { icon: "facebook", url: "#" },
                    { icon: "instagram", url: "#" },
                    { icon: "youtube", url: "#" },
                    { icon: "spotify", url: "#" },
                  ].map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.url}
                      className="bg-gray-800 p-3 rounded-full text-white hover:bg-red-700 transition-all duration-300"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
                        />
                      </svg>
                    </motion.a>
                  ))}
                </div>
              </div>

              <div className="bg-gray-900 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-4 font-['Playfair_Display',serif]">Envie-nos uma Mensagem</h3>
                <form className="space-y-4 font-['Montserrat',sans-serif]">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">
                      Nome
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Seu email"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-400 mb-1">
                      Assunto
                    </label>
                    <input
                      type="text"
                      id="subject"
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Assunto da mensagem"
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">
                      Mensagem
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      placeholder="Sua mensagem"
                    ></textarea>
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full px-6 py-3 bg-red-700 hover:bg-red-800 rounded-full font-medium transition-all duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Enviar Mensagem
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <a href="#" className="text-2xl font-bold tracking-tighter flex items-center mb-4">
                <img src="/images/teup-logo.png" alt="TEUP Logo" className="h-10 w-10 mr-3" />
                <span className="font-['Cinzel',serif]">TEUP</span>
              </a>
              <p className="text-gray-400 mb-4 font-['Montserrat',sans-serif]">
                Tuna de Engenharia da Universidade do Porto, mantendo vivas as tradições académicas desde 1990.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 font-['Playfair_Display',serif]">Links Rápidos</h3>
              <ul className="space-y-2 font-['Montserrat',sans-serif]">
                <li>
                  <a href="#about" className="text-gray-400 hover:text-white transition-colors">
                    Sobre Nós
                  </a>
                </li>
                <li>
                  <a href="#members" className="text-gray-400 hover:text-white transition-colors">
                    Tunos
                  </a>
                </li>
                <li>
                  <a href="#news" className="text-gray-400 hover:text-white transition-colors">
                    Notícias
                  </a>
                </li>
                <li>
                  <a href="#performances" className="text-gray-400 hover:text-white transition-colors">
                    Atuações
                  </a>
                </li>
                <li>
                  <a href="#gallery" className="text-gray-400 hover:text-white transition-colors">
                    Galeria
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contacto
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 font-['Playfair_Display',serif]">Recursos</h3>
              <ul className="space-y-2 font-['Montserrat',sans-serif]">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Loja Online
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Área de Imprensa
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Política de Privacidade
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    Termos de Uso
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 font-['Playfair_Display',serif]">Newsletter</h3>
              <p className="text-gray-400 mb-4 font-['Montserrat',sans-serif]">
                Subscreva a nossa newsletter para receber as últimas notícias e atualizações.
              </p>
              <form className="flex">
                <input
                  type="email"
                  placeholder="Seu email"
                  className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent flex-grow"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-red-700 hover:bg-red-800 rounded-r-lg transition-colors duration-300"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <div className="border-t border-gray-900 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 text-sm font-['Montserrat',sans-serif] mb-4 md:mb-0">
              © {new Date().getFullYear()} Tuna de Engenharia da Universidade do Porto. Todos os direitos reservados.
            </p>
            <div className="flex space-x-4">
              {[
                { icon: "facebook", url: "https://www.facebook.com/teupofficial/" },
                { icon: "instagram", url: "#" },
                { icon: "youtube", url: "#" },
                { icon: "spotify", url: "#" },
              ].map((social, index) => (
                <a key={index} href={social.url} className="text-gray-500 hover:text-white transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.172 13.828a4 4 0 015.656 0l4 4a4 4 0 01-5.656 5.656l-1.102-1.101"
                    />
                  </svg>
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll to Top Button */}
      <ScrollToTop />
    </div>
  )
}
