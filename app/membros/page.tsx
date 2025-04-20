"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Member, MemberHierarchy, MemberRole, fetchActiveMembers, fetchFormerMembers } from "@/lib/members-service"

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
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

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayType, setDisplayType] = useState<"active" | "former">("active");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [hierarchyFilter, setHierarchyFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  
  // Load all members
  useEffect(() => {
    const loadMembers = async () => {
      setIsLoading(true);
      try {
        // Fetch appropriate members based on display type
        const response = displayType === "active" 
          ? await fetchActiveMembers()
          : await fetchFormerMembers();
          
        setMembers(response.members);
      } catch (error) {
        console.error("Error loading members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMembers();
  }, [displayType]);
  
  // Get all available roles for filtering
  const allRoles = Array.from(
    new Set(members.map((member) => member.role))
  );
  
  // Get all available hierarchies for filtering
  const allHierarchies = Array.from(
    new Set(members.map((member) => member.hierarchy))
  );

  // Apply filters to members
  const filteredMembers = members.filter((member) => {
    // Apply role filter
    if (roleFilter !== "all" && member.role !== roleFilter) return false;
    
    // Apply hierarchy filter
    if (hierarchyFilter !== "all" && member.hierarchy !== hierarchyFilter) return false;
    
    // Apply search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      return (
        member.name.toLowerCase().includes(query) ||
        (member.nickname && member.nickname.toLowerCase().includes(query)) ||
        member.role.toLowerCase().includes(query) ||
        (member.specialRole && member.specialRole.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

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
      <section className="pt-32 pb-16 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-['Cinzel',serif]">
              Membros da TEUP
            </h1>
            <p className="text-gray-400 max-w-2xl mx-auto font-['Montserrat',sans-serif]">
              Conheça todos os membros que fazem parte da história da nossa tuna, desde os veteranos Mestre-Tunos até os mais novos Caloiros.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div 
            className="bg-gray-800 rounded-lg p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Status Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2 font-['Montserrat',sans-serif]">
                  Status
                </label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setDisplayType("active")}
                    className={`px-4 py-2 rounded-full transition-all duration-300 text-sm flex-grow font-['Montserrat',sans-serif] ${
                      displayType === "active"
                        ? "bg-red-700 text-white"
                        : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                    }`}
                  >
                    Atuais
                  </button>
                  <button
                    onClick={() => setDisplayType("former")}
                    className={`px-4 py-2 rounded-full transition-all duration-300 text-sm flex-grow font-['Montserrat',sans-serif] ${
                      displayType === "former"
                        ? "bg-red-700 text-white"
                        : "bg-transparent text-gray-400 hover:text-white border border-gray-700"
                    }`}
                  >
                    Antigos
                  </button>
                </div>
              </div>
              
              {/* Role Filter */}
              <div>
                <label htmlFor="role-filter" className="block text-sm font-medium text-gray-400 mb-2 font-['Montserrat',sans-serif]">
                  Instrumento
                </label>
                <select
                  id="role-filter"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-['Montserrat',sans-serif]"
                >
                  <option value="all">Todos</option>
                  {allRoles.map((role) => (
                    <option key={role} value={role}>
                      {role}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Hierarchy Filter */}
              <div>
                <label htmlFor="hierarchy-filter" className="block text-sm font-medium text-gray-400 mb-2 font-['Montserrat',sans-serif]">
                  Hierarquia
                </label>
                <select
                  id="hierarchy-filter"
                  value={hierarchyFilter}
                  onChange={(e) => setHierarchyFilter(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-['Montserrat',sans-serif]"
                >
                  <option value="all">Todos</option>
                  {allHierarchies.map((hierarchy) => (
                    <option key={hierarchy} value={hierarchy}>
                      {hierarchy}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Search */}
              <div>
                <label htmlFor="search" className="block text-sm font-medium text-gray-400 mb-2 font-['Montserrat',sans-serif]">
                  Pesquisar
                </label>
                <input
                  id="search"
                  type="text"
                  placeholder="Buscar por nome, alcunha..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-['Montserrat',sans-serif]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Members Section */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-20">
              <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-red-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]" role="status">
                <span className="sr-only">Carregando...</span>
              </div>
              <p className="mt-4 text-gray-400">Carregando membros...</p>
            </div>
          ) : filteredMembers.length > 0 ? (
            <>
              <motion.div 
                className="text-sm text-gray-400 mb-6 font-['Montserrat',sans-serif]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
              >
                Exibindo {filteredMembers.length} membros
              </motion.div>
              
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {filteredMembers.map((member) => (
                  <motion.div
                    key={member.id}
                    className="bg-gray-800 rounded-lg overflow-hidden hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10 transform hover:scale-[1.02]"
                    variants={staggerItem}
                  >
                    <div className="overflow-hidden h-64">
                      <img
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-1 font-['Playfair_Display',serif]">{member.name}</h3>
                      {member.nickname && (
                        <p className="text-red-500 text-sm mb-2 font-['Montserrat',sans-serif]">"{member.nickname}"</p>
                      )}
                      
                      <div className="flex flex-wrap gap-2 mb-2">
                        {/* Instrument/Role */}
                        <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300 font-['Montserrat',sans-serif]">
                          {member.role}
                        </span>
                        
                        {/* Hierarchy */}
                        <span className="px-2 py-1 bg-gray-700 rounded-full text-xs text-gray-300 font-['Montserrat',sans-serif]">
                          {member.hierarchy}
                        </span>
                        
                        {/* Special role with highlighted styling */}
                        {member.specialRole && (
                          <span className="px-2 py-1 bg-red-700/20 text-red-400 rounded-full text-xs font-['Montserrat',sans-serif]">
                            {member.specialRole}
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-400 mb-4 font-['Montserrat',sans-serif]">
                        {member.course && <span>{member.course} • </span>}
                        <span>Desde {member.joinYear}</span>
                      </p>
                      
                      <p className="text-gray-500 line-clamp-3 mb-4 text-sm font-['Montserrat',sans-serif]">{member.bio}</p>
                      
                      <button
                        className="text-red-500 hover:text-red-400 transition-all duration-300 flex items-center group text-sm font-['Montserrat',sans-serif]"
                        onClick={() => {
                          // Could implement a modal to show full member details
                          alert(`Detalhes completos de ${member.name} seriam mostrados em um modal.`);
                        }}
                      >
                        Detalhes{" "}
                        <span className="ml-1 transform transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </>
          ) : (
            <motion.div 
              className="text-center py-12 bg-gray-800 rounded-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <svg 
                className="mx-auto h-12 w-12 text-gray-500" 
                fill="none" 
                viewBox="0 0 24 24"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
              <h3 className="mt-2 text-xl font-bold font-['Playfair_Display',serif]">Nenhum membro encontrado</h3>
              <p className="mt-1 text-gray-400 font-['Montserrat',sans-serif]">
                Tente ajustar os filtros para encontrar o que procura.
              </p>
              <button
                onClick={() => {
                  setRoleFilter("all");
                  setHierarchyFilter("all");
                  setSearchQuery("");
                }}
                className="mt-4 px-4 py-2 bg-red-700 hover:bg-red-800 rounded-full text-sm font-medium transition-all duration-300 font-['Montserrat',sans-serif]"
              >
                Limpar filtros
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer className="py-12 bg-black border-t border-gray-900">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm font-['Montserrat',sans-serif]">
            © {new Date().getFullYear()} Tuna de Engenharia da Universidade do Porto. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  )
}