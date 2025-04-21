"use client"

import { useState, useEffect, useRef } from "react"
import { FaShoppingCart, FaCalendarAlt, FaMusic, FaNewspaper } from "react-icons/fa"
import Link from "next/link"
import ImageCarousel from "./components/ImageCarousel"
import { motion, AnimatePresence } from "framer-motion"
import ScrollToTop from "./components/ScrollToTop"
import FlippableCard from "./components/FlippableCard"
import { Member, fetchHomepageMembers, getGodfatherInfo } from "@/lib/members-service"
import { NewsItem, fetchHomepageNews, formatDateForDisplay } from "@/lib/news-service"
import { Performance, fetchHomepagePerformances } from "@/lib/performances-service"

// Admin section features
interface AdminFeature {
  id: string;
  title: string;
  icon: JSX.Element;
  description: string;
  path: string;
}

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
  visible: { opacity: 1, transition: { duration: 0.8, ease: "easeOut" } },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
}

// Fade in/out effect for sections
const sectionFadeEffect = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 1.2, ease: "easeOut" } },
  scrollOut: { opacity: 0, transition: { duration: 1.2, ease: "easeIn" } }
}

// Smoother staggering animations for sections like News and Performances
const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
      duration: 0.6,
      ease: "easeOut",
    },
  },
}

const staggerItem = {
  hidden: { opacity: 0, y: 8 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { 
      duration: 0.9, 
      ease: [0.25, 0.1, 0.25, 1] // cubic-bezier curve for a smoother feel
    } 
  },
}

// Custom hook for intersection observer with options for improved performance
function useIntersectionObserver(options = {}): [React.RefObject<HTMLElement>, boolean] {
  const elementRef = useRef<HTMLElement>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      // Only update state if visibility actually changed
      setIsIntersecting(prev => {
        if (prev !== entry.isIntersecting) {
          return entry.isIntersecting;
        }
        return prev;
      });
    }, {
      rootMargin: '100px', // Load content a bit before it comes into view
      threshold: 0.1,      // Trigger earlier at 10% visibility
      ...options
    })

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
  const [activeMembers, setActiveMembers] = useState<Member[]>([]);
  const [formerMembers, setFormerMembers] = useState<Member[]>([]);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [performances, setPerformances] = useState<Performance[]>([]);
  const [isLoadingMembers, setIsLoadingMembers] = useState(true);
  const [isLoadingNews, setIsLoadingNews] = useState(true);
  const [isLoadingPerformances, setIsLoadingPerformances] = useState(true);
  const [activeTab, setActiveTab] = useState<"current" | "former">("current");
  const [activeGalleryFilter, setActiveGalleryFilter] = useState("all");
  const [godfatherInfo, setGodfatherInfo] = useState<Record<number, Member>>({});

  // Function to get priority and random members for display
  const getMembersToDisplay = (members: Member[]) => {
    // Filter out members with special roles (they always appear)
    const specialRoleMembers = members.filter(
      (member) => member.specialRole === 'Magister' || member.specialRole === 'Ensaiador' || member.specialRole === 'Diretor Artístico'
    );

    // Get regular members (Tuno and Mestre-Tuno only)
    const regularMembers = members.filter(
      (member) => 
        !specialRoleMembers.includes(member) && 
        (member.hierarchy === 'Tuno' || member.hierarchy === 'Mestre-Tuno')
    );

    // Shuffle and pick 8 - or fewer if not enough
    const shuffledMembers = [...regularMembers].sort(() => 0.5 - Math.random());
    const displayCount = Math.min(8 - specialRoleMembers.length, regularMembers.length);
    const randomMembers = shuffledMembers.slice(0, displayCount);

    // Combine with special role members and return
    return [...specialRoleMembers, ...randomMembers];
  }

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

  // Custom animation variants for smooth transitions between filtered items
  const galleryGridVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08,
        when: "beforeChildren" 
      }
    }
  };
  
  const galleryItemVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1] 
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.3
      }
    }
  };

  // Modify animation variants for tab switching
  const membersTabVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };
  
  // Refs for sections with animations
  const [aboutRef, aboutVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [newsRef, newsVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [membersRef, membersVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [discographyRef, discographyVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [performancesRef, performancesVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [galleryRef, galleryVisible] = useIntersectionObserver({ threshold: 0.2 })
  const [contactRef, contactVisible] = useIntersectionObserver({ threshold: 0.2 })

  // Fetch homepage data
  useEffect(() => {
    const loadHomepageData = async () => {
      // Load members
      setIsLoadingMembers(true);
      try {
        const { activeMembers, formerMembers } = await fetchHomepageMembers();
        setActiveMembers(activeMembers);
        setFormerMembers(formerMembers);
        
        // Load godfather information for all members
        const godfatherMap: Record<number, Member> = {};
        
        // Process active members
        for (const member of activeMembers) {
          if (member.godfather) {
            const godfather = getGodfatherInfo(member.godfather);
            if (godfather) {
              godfatherMap[member.id] = godfather;
            }
          }
        }
        
        // Process former members
        for (const member of formerMembers) {
          if (member.godfather) {
            const godfather = getGodfatherInfo(member.godfather);
            if (godfather) {
              godfatherMap[member.id] = godfather;
            }
          }
        }
        
        setGodfatherInfo(godfatherMap);
      } catch (error) {
        console.error("Error loading members:", error);
      } finally {
        setIsLoadingMembers(false);
      }

      // Load news
      setIsLoadingNews(true);
      try {
        const { news } = await fetchHomepageNews(3);
        setNewsItems(news);
      } catch (error) {
        console.error("Error loading news:", error);
      } finally {
        setIsLoadingNews(false);
      }

      // Load performances
      setIsLoadingPerformances(true);
      try {
        const { performances } = await fetchHomepagePerformances(3);
        setPerformances(performances);
      } catch (error) {
        console.error("Error loading performances:", error);
      } finally {
        setIsLoadingPerformances(false);
      }
    };

    loadHomepageData();
  }, []);
  
  // Function to handle godfather link clicks
  const handleGodfatherClick = (godfather: Member) => {
    // Create the search parameters for the godfather's name
    const searchName = godfather.nickname || godfather.name;
    
    // Set the display type based on whether the godfather is active or former
    const displayType = godfather.isActive ? 'active' : 'former';
    
    // Create the redirect URL with the appropriate parameters
    const redirectURL = `/membros?search=${encodeURIComponent(searchName)}&display=${displayType}`;
    
    // Redirect to the members page
    window.location.href = redirectURL;
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Playfair_Display',serif] overflow-x-hidden w-full">
      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0 h-full w-full">
          <ImageCarousel images={carouselImages} className="h-full" />
        </div>
        <motion.div
          className="container mx-auto px-4 z-10 text-center relative pointer-events-none"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4 tracking-tight font-['Cinzel',serif] text-shadow-lg pointer-events-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            TUNA DE ENGENHARIA
          </motion.h1>
          <motion.h2
            className="text-3xl md:text-4xl font-semibold mb-6 text-red-500 font-['Cinzel',serif] text-shadow-lg pointer-events-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            UNIVERSIDADE DO PORTO
          </motion.h2>
          <motion.p
            className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-white font-['Montserrat',sans-serif] text-shadow-lg pointer-events-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            Tradição, música e engenharia desde 1988
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pointer-events-auto"
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
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-10 pointer-events-none"
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

          {isLoadingNews ? (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="sr-only">Carregando...</span>
              </div>
              <p className="mt-4 text-gray-400">Carregando notícias...</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={newsVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {newsItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10 transform hover:scale-[1.02]"
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
                    <p className="text-red-500 text-sm mb-2 font-['Montserrat',sans-serif]">
                      {formatDateForDisplay(item.date)}
                    </p>
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
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

      {/* Members Section */}
      <motion.section 
        id="members" 
        className="py-20 bg-gradient-to-b from-gray-900 to-black" 
        ref={membersRef}
        variants={sectionFadeEffect}
        initial="hidden"
        animate={membersVisible ? "visible" : "hidden"}
        exit="scrollOut"
      >
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={membersVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-['Cinzel',serif] relative inline-block">
              Nossos Tunos
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-red-700"></span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-['Montserrat',sans-serif]">
              Conheça os membros que fazem a TEUP acontecer, trazendo música e tradição para cada apresentação.
            </p>
            <div className="flex justify-center mt-6 space-x-4">
              <motion.button
                onClick={() => setActiveTab("current")}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-['Montserrat',sans-serif] ${
                  activeTab === "current"
                    ? "bg-red-700 text-white"
                    : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Membros Atuais
              </motion.button>
              <motion.button
                onClick={() => setActiveTab("former")}
                className={`px-4 py-2 rounded-full transition-all duration-300 font-['Montserrat',sans-serif] ${
                  activeTab === "former"
                    ? "bg-red-700 text-white"
                    : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Antigos Membros
              </motion.button>
            </div>
            <div className="mt-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link 
                  href="/membros"
                  className="text-red-500 hover:text-red-400 transition-all duration-300 flex items-center group font-['Montserrat',sans-serif] mx-auto w-max"
                >
                  Ver todos os membros{" "}
                  <span className="ml-2 transform transition-transform duration-300 group-hover:translate-x-1">→</span>
                </Link>
              </motion.div>
            </div>
          </motion.div>

          {isLoadingMembers ? (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="sr-only">Carregando...</span>
              </div>
              <p className="mt-4 text-gray-400">Carregando membros...</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ 
                  duration: 0.5,
                  staggerChildren: 0.08
                }}
              >
                {/* Get selected members to display using our function */}
                {(activeTab === "current" ? activeMembers : formerMembers).map((member, index) => (
                  <motion.div 
                    key={member.id} 
                    className="h-[440px]" // Increased from 420px to 440px
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ 
                      duration: 0.5,
                      delay: index * 0.05,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                  >
                    <FlippableCard 
                      frontContent={
                        <div className="bg-gray-900 h-full rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:shadow-red-500/10">
                          <div className="overflow-hidden h-64">
                            <img
                              src={member.image || "/placeholder.svg"}
                              alt={member.nickname || member.name}
                              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                            />
                          </div>
                          <div className="p-6">
                            {/* Show nickname as primary name when available */}
                            <h3 className="text-xl font-bold mb-1 font-['Playfair_Display',serif]">
                              {member.nickname || member.name}
                            </h3>
                            
                            {/* Show real name as secondary when nickname exists */}
                            {member.nickname && (
                              <p className="text-gray-400 text-sm mb-2 font-['Montserrat',sans-serif]">
                                {member.name}
                              </p>
                            )}
                            
                            {member.tuneName && (
                              <p className="text-amber-400 text-sm mb-2 font-['Montserrat',sans-serif] italic">
                                {member.tuneName}
                              </p>
                            )}
                            
                            <p className="text-gray-400 mb-2 font-['Montserrat',sans-serif]">{member.role}</p>
                            {/* Display special role tags */}
                            {member.specialRole && (
                              <span className="inline-block bg-red-700/20 text-red-400 text-xs px-2 py-1 rounded-full mb-2 font-['Montserrat',sans-serif]">
                                {member.specialRole}
                              </span>
                            )}
                          </div>
                        </div>
                      }
                      backContent={
                        <div className="bg-gray-900 h-full rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 p-6 flex flex-col">
                          {/* Main title - nickname if available, otherwise name */}
                          <h3 className="text-xl font-bold mb-1 font-['Playfair_Display',serif]">
                            {member.nickname || member.name}
                          </h3>
                          
                          {/* Show real name as secondary when nickname exists */}
                          {member.nickname && (
                            <p className="text-gray-300 mb-2 font-['Montserrat',sans-serif]">
                              {member.name}
                            </p>
                          )}
                          
                          {member.tuneName && (
                            <p className="text-amber-400 text-sm mb-2 font-['Montserrat',sans-serif] italic">
                              <span className="text-gray-500 not-italic">Nome de Tuno:</span> {member.tuneName}
                            </p>
                          )}
                          
                          {/* Add special role display */}
                          {member.specialRole && (
                            <div className="bg-red-700/20 mb-3 px-3 py-2 rounded-lg inline-block">
                              <p className="text-red-400 font-semibold font-['Montserrat',sans-serif]">{member.specialRole}</p>
                            </div>
                          )}
                          <div className="flex flex-wrap gap-2 mb-4">
                            <div className="bg-gray-800 px-3 py-1 rounded-lg">
                              <p className="text-xs text-gray-400 font-['Montserrat',sans-serif]">Instrumento</p>
                              <p className="text-sm font-medium font-['Montserrat',sans-serif]">{member.role}</p>
                            </div>
                            <div className="bg-gray-800 px-3 py-1 rounded-lg">
                              <p className="text-xs text-gray-400 font-['Montserrat',sans-serif]">Hierarquia</p>
                              <p className="text-sm font-medium font-['Montserrat',sans-serif]">{member.hierarchy}</p>
                            </div>
                            {member.course && (
                              <div className="bg-gray-800 px-3 py-1 rounded-lg">
                                <p className="text-xs text-gray-400 font-['Montserrat',sans-serif]">Curso</p>
                                <p className="text-sm font-medium font-['Montserrat',sans-serif]">{member.course}</p>
                              </div>
                            )}
                          </div>

                          {/* Godfather information - compact version */}
                          {member.godfather && godfatherInfo[member.id] && (
                            <div className="mb-3">
                              <Link 
                                href={`/membros?search=${encodeURIComponent(godfatherInfo[member.id].nickname || godfatherInfo[member.id].name)}&display=${godfatherInfo[member.id].hierarchy === 'Tuno' || godfatherInfo[member.id].hierarchy === 'Mestre-Tuno' ? 'active' : 'former'}`}
                                className="godfather-link flex items-center gap-2 bg-gray-800 p-2 rounded-lg cursor-pointer hover:bg-gray-700 transition-colors"
                                onClick={(e) => {
                                  e.preventDefault();
                                  handleGodfatherClick(godfatherInfo[member.id]);
                                }}
                              >
                                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-700 flex-shrink-0">
                                  <img 
                                    src={godfatherInfo[member.id].image || "/placeholder.svg"} 
                                    alt="Padrinho"
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="flex-1 overflow-hidden">
                                  <p className="text-sm font-medium truncate text-gray-200">{godfatherInfo[member.id].nickname || godfatherInfo[member.id].name}</p>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                              </Link>
                            </div>
                          )}
                          
                          <div className="mt-auto text-center">
                            <span className="text-xs text-gray-500 font-['Montserrat',sans-serif]">Clique para voltar</span>
                          </div>
                        </div>
                      }
                    />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </motion.section>

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
            animate="visible"
          >
            {/* Com o porto da memória (2017) */}
            <motion.div
              className="flex flex-col items-center"
              variants={staggerItem}
              whileHover={{ 
                scale: 1.03, 
                transition: { duration: 0.5, ease: "easeOut" } 
              }}
            >
              <div className="w-full max-w-md">
                <motion.div 
                  className="aspect-square w-full mb-5 shadow-xl hover:shadow-red-500/20 transition-all duration-500 rounded-xl overflow-hidden bg-[#121212]"
                  initial={{ boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  whileHover={{ 
                    boxShadow: "0 20px 25px -5px rgba(220,38,38,0.25)", 
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.iframe
                    src="https://open.spotify.com/embed/album/3FaNaNyy7dhM8Kk9MmCq5e"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl"
                    title="Spotify embed: Com o porto da memória"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.3, duration: 0.8 } }}
                  ></motion.iframe>
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold text-center mb-1 font-['Playfair_Display',serif]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Com o porto da memória
                </motion.h3>
                <motion.p 
                  className="text-red-500 text-sm text-center mb-4 font-['Montserrat',sans-serif]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  2017
                </motion.p>
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <motion.a
                    href="https://open.spotify.com/album/3FaNaNyy7dhM8Kk9MmCq5e?si=36171f4b5b634613"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-['Montserrat',sans-serif] flex items-center"
                    whileHover={{ scale: 1.08, boxShadow: "0 10px 15px -3px rgba(29,185,84,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-5 h-5 mr-2"
                      animate={{ 
                        rotate: [0, 10, -10, 10, 0],
                        transition: { duration: 2, repeat: Infinity, repeatDelay: 3 }
                      }}
                    >
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406c-.183.307-.564.4-.87.217-2.383-1.455-5.381-1.783-8.916-.973-.34.08-.684-.136-.764-.476-.08-.341.136-.684.476-.765 3.868-.876 7.167-.5 9.856 1.127.308.183.4.564.218.87zm1.085-2.415c-.229.379-.72.5-1.1.27-2.73-1.678-6.894-2.165-10.122-1.183-.414.125-.854-.106-.98-.52-.123-.413.108-.852.52-.978 3.694-1.122 8.282-.573 11.412 1.312.38.23.5.72.27 1.1zm.094-2.514c-3.273-1.944-8.67-2.124-11.8-1.175-.496.15-1.02-.13-1.17-.624-.148-.495.13-1.02.625-1.167 3.57-1.082 9.502-.874 13.246 1.358.453.27.6.864.33 1.317-.272.452-.864.6-1.318.33l.087-.04z"/>
                    </motion.svg>
                    Ouvir no Spotify
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>

            {/* Para lá dos palcos (2007) */}
            <motion.div
              className="flex flex-col items-center"
              variants={staggerItem}
              whileHover={{ 
                scale: 1.03, 
                transition: { duration: 0.5, ease: "easeOut" } 
              }}
            >
              <div className="w-full max-w-md">
                <motion.div 
                  className="aspect-square w-full mb-5 shadow-xl hover:shadow-red-500/20 transition-all duration-500 rounded-xl overflow-hidden bg-[#121212]"
                  initial={{ boxShadow: "0 10px 15px -3px rgba(0,0,0,0.1)" }}
                  whileHover={{ 
                    boxShadow: "0 20px 25px -5px rgba(220,38,38,0.25)", 
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.iframe
                    src="https://open.spotify.com/embed/album/6DFtJko0k0BBDe8kFKdRLc"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    allowFullScreen
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    className="rounded-xl"
                    title="Spotify embed: Para lá dos palcos"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.5, duration: 0.8 } }}
                  ></motion.iframe>
                </motion.div>
                <motion.h3 
                  className="text-xl font-bold text-center mb-1 font-['Playfair_Display',serif]"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  Para lá dos palcos
                </motion.h3>
                <motion.p 
                  className="text-red-500 text-sm text-center mb-4 font-['Montserrat',sans-serif]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  2007
                </motion.p>
                <motion.div 
                  className="flex justify-center"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <motion.a
                    href="https://open.spotify.com/album/6DFtJko0k0BBDe8kFKdRLc?si=dxHO7gsmSruolOHHcoHE3Q"
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-[#1DB954] hover:bg-[#1ed760] text-black rounded-full font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg font-['Montserrat',sans-serif] flex items-center"
                    whileHover={{ scale: 1.08, boxShadow: "0 10px 15px -3px rgba(29,185,84,0.4)" }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 24 24" 
                      fill="currentColor" 
                      className="w-5 h-5 mr-2"
                      animate={{ 
                        rotate: [0, 10, -10, 10, 0],
                        transition: { duration: 2, repeat: Infinity, repeatDelay: 3.5 }
                      }}
                    >
                      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm4.059 14.406c-.183.307-.564.4-.87.217-2.383-1.455-5.381-1.783-8.916-.973-.34.08-.684-.136-.764-.476-.08-.341.136-.684.476-.765 3.868-.876 7.167-.5 9.856 1.127.308.183.4.564.218.87zm1.085-2.415c-.229.379-.72.5-1.1.27-2.73-1.678-6.894-2.165-10.122-1.183-.414.125-.854-.106-.98-.52-.123-.413.108-.852.52-.978 3.694-1.122 8.282-.573 11.412 1.312.38.23.5.72.27 1.1zm.094-2.514c-3.273-1.944-8.67-2.124-11.8-1.175-.496.15-1.02-.13-1.17-.624-.148-.495.13-1.02.625-1.167 3.57-1.082 9.502-.874 13.246 1.358.453.27.6.864.33 1.317-.272.452-.864.6-1.318.33l.087-.04z"/>
                    </motion.svg>
                    Ouvir no Spotify
                  </motion.a>
                </motion.div>
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

          {isLoadingPerformances ? (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="sr-only">Carregando...</span>
              </div>
              <p className="mt-4 text-gray-400">Carregando atuações...</p>
            </div>
          ) : (
            <motion.div
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial={{ opacity: 0 }}
              animate={performancesVisible ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              {performances.map((performance) => (
                <div
                  key={performance.id}
                  className="bg-gray-900 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10 transform hover:scale-[1.02]"
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
                      <span>{formatDateForDisplay(performance.date)}</span>
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
                </div>
              ))}
            </motion.div>
          )}
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
            variants={galleryGridVariants}
            initial="hidden"
            animate="visible"
            key={activeGalleryFilter} // This is important! It forces re-render on filter change
          >
            {filteredGalleryImages.map((image, index) => (
              <motion.div 
                key={index + image.src} 
                className="overflow-hidden rounded-lg aspect-square" 
                variants={galleryItemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
              >
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
