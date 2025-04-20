"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useRouter, useSearchParams } from "next/navigation"
import { Member, MemberHierarchy, MemberRole, fetchActiveMembers, fetchFormerMembers, getGodfatherInfo } from "@/lib/members-service"
import FlippableCard from "../components/FlippableCard"

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

// Helper function to check if member has a special role
const hasSpecialRole = (member: Member): boolean => {
  const specialRoles = ['Magister', 'Ensaiador', 'Diretor Artístico'];
  return member.specialRole !== undefined && specialRoles.includes(member.specialRole);
};

export default function MembersPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [displayType, setDisplayType] = useState<"active" | "former">("active");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [hierarchyFilter, setHierarchyFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [godfatherInfo, setGodfatherInfo] = useState<{[key: number]: Member | undefined}>({});
  
  // Handle URL search parameters
  useEffect(() => {
    const urlSearchParam = searchParams.get('search');
    if (urlSearchParam) {
      setSearchQuery(urlSearchParam);
    }
  }, [searchParams]);

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
        
        // Load godfather information for all members
        const godfatherIds = response.members
          .filter(m => m.godfather)
          .map(m => m.godfather as number);
          
        const uniqueGodfatherIds = [...new Set(godfatherIds)];
        const godfathersMap: {[key: number]: Member | undefined} = {};
        
        for (const id of uniqueGodfatherIds) {
          godfathersMap[id] = getGodfatherInfo(id);
        }
        
        setGodfatherInfo(godfathersMap);
        
      } catch (error) {
        console.error("Error loading members:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMembers();
  }, [displayType]);
  
  // Handler for godfather click
  const handleGodfatherClick = (godfatherId: number) => {
    // Get the godfather info
    const godfather = godfatherInfo[godfatherId];
    if (godfather) {
      // Create a search string with the godfather's name or ID for exact matching
      const searchName = godfather.nickname || godfather.name;
      
      // Check if the godfather is a former member and update display type accordingly
      if (!godfather.isActive && displayType !== "former") {
        setDisplayType("former");
        
        // We need to wait for the members to load before we can search
        setTimeout(() => {
          setSearchQuery(searchName);
          // Update URL with search param and display type
          const newParams = new URLSearchParams();
          newParams.set('search', searchName);
          newParams.set('display', 'former');
          const newPathname = `/membros?${newParams.toString()}`;
          router.push(newPathname, { scroll: false });
        }, 500);
      } else {
        // Just update search if we're already on the correct display type
        setSearchQuery(searchName);
        // Update URL with search param and keep display type
        const newParams = new URLSearchParams();
        newParams.set('search', searchName);
        if (displayType === "former") {
          newParams.set('display', 'former');
        }
        const newPathname = `/membros?${newParams.toString()}`;
        router.push(newPathname, { scroll: false });
      }
    }
  };
  
  // Get all available roles for filtering
  const allRoles = Array.from(
    new Set(members.map((member) => member.role))
  );
  
  // Get all available hierarchies for filtering
  const allHierarchies = Array.from(
    new Set(members.map((member) => member.hierarchy))
  );

  // Apply filters to members and sort special roles to the top
  const filteredMembers = members.filter((member) => {
    // Apply role filter
    if (roleFilter !== "all" && member.role !== roleFilter) return false;
    
    // Apply hierarchy filter
    if (hierarchyFilter !== "all" && member.hierarchy !== hierarchyFilter) return false;
    
    // Apply search query - exact match for ID, nickname or name
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      
      // Check for exact match on ID (if the search is a number)
      if (!isNaN(Number(query)) && member.id === Number(query)) {
        return true;
      }
      
      // Check for exact match on name or nickname
      if (
        member.name.toLowerCase() === query || 
        (member.nickname && member.nickname.toLowerCase() === query)
      ) {
        return true;
      }
      
      // If no exact match is found, return false
      return false;
    }
    
    return true;
  }).sort((a, b) => {
    // Sort special roles to the top
    const aHasSpecialRole = hasSpecialRole(a);
    const bHasSpecialRole = hasSpecialRole(b);
    
    if (aHasSpecialRole && !bHasSpecialRole) return -1;
    if (!aHasSpecialRole && bHasSpecialRole) return 1;
    return 0;
  });

  return (
    <div className="min-h-screen bg-black text-white font-['Playfair_Display',serif]">
      {/* Hero Section with proper spacing for fixed navbar */}
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
              Conheça todos os membros que fazem parte da história da nossa tuna, desde os Mestre-Tunos até os mais novos Caloiros.
            </p>
            <p className="text-sm text-gray-500 mt-4 font-['Montserrat',sans-serif]">
              Clique nos cartões para ver mais detalhes sobre cada membro
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
                <div className="relative">
                  <input
                    id="search"
                    type="text"
                    placeholder="Buscar por nome, alcunha..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      // Update URL with search param without reload
                      const newParams = new URLSearchParams(searchParams.toString());
                      if (e.target.value) {
                        newParams.set('search', e.target.value);
                      } else {
                        newParams.delete('search');
                      }
                      const newPathname = `/membros${newParams.toString() ? `?${newParams.toString()}` : ''}`;
                      router.push(newPathname, { scroll: false });
                    }}
                    className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-sm font-['Montserrat',sans-serif] pr-10"
                  />
                  {searchQuery && (
                    <button 
                      onClick={() => {
                        setSearchQuery('');
                        // Remove search param from URL
                        const newParams = new URLSearchParams(searchParams.toString());
                        newParams.delete('search');
                        const newPathname = `/membros${newParams.toString() ? `?${newParams.toString()}` : ''}`;
                        router.push(newPathname, { scroll: false });
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                    </button>
                  )}
                </div>
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
                {filteredMembers.map((member) => {
                  const isSpecialRole = hasSpecialRole(member);
                  const godfather = member.godfather ? godfatherInfo[member.godfather] : undefined;
                  
                  return (
                  <motion.div
                    key={member.id}
                    className={`h-[480px] ${isSpecialRole ? 'col-span-1 sm:col-span-2 md:col-span-1' : ''}`}
                    variants={staggerItem}
                  >
                    <FlippableCard
                      frontContent={
                        <div 
                          className={`${
                            isSpecialRole 
                              ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-red-900/40 rounded-lg overflow-hidden h-full hover:shadow-xl transition-all duration-500 hover:shadow-red-500/30 border-2 border-red-900/40' 
                              : 'bg-gray-800 rounded-lg overflow-hidden h-full hover:shadow-xl transition-all duration-500 hover:shadow-red-500/10'
                          }`}
                        >
                          <div className="overflow-hidden h-64 relative">
                            {isSpecialRole && (
                              <div className="absolute top-0 right-0 bg-red-700 px-3 py-1 rounded-bl-lg z-10 shadow-lg">
                                <p className="text-white text-xs font-bold font-['Montserrat',sans-serif]">
                                  {member.specialRole}
                                </p>
                              </div>
                            )}
                            <img
                              src={member.image || "/placeholder.svg"}
                              alt={member.name}
                              className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                            />
                          </div>
                          <div className={`p-6 ${isSpecialRole ? 'bg-gradient-to-b from-transparent to-red-900/10' : ''}`}>
                            {/* Show nickname as main title when available, else show name */}
                            <h3 className={`text-2xl font-bold mb-1 font-['Playfair_Display',serif] ${isSpecialRole ? 'text-red-100' : ''}`}>
                              {member.nickname || member.name}
                            </h3>
                            
                            {/* Show real name as secondary when nickname exists */}
                            {member.nickname && (
                              <p className="text-gray-400 mb-2 font-['Montserrat',sans-serif] text-sm">
                                {member.name}
                              </p>
                            )}
                            
                            {member.tuneName && (
                              <p className="text-amber-400 text-sm mb-2 font-['Montserrat',sans-serif] italic">
                                {member.tuneName}
                              </p>
                            )}
                            
                            <div className="flex flex-wrap gap-2 mb-2">
                              {/* Instrument/Role */}
                              <span className={`px-2 py-1 ${isSpecialRole ? 'bg-red-900/30' : 'bg-gray-700'} rounded-full text-xs ${isSpecialRole ? 'text-red-100' : 'text-gray-300'} font-['Montserrat',sans-serif]`}>
                                {member.role}
                              </span>
                              
                              {/* Hierarchy */}
                              <span className={`px-2 py-1 ${isSpecialRole ? 'bg-red-900/30' : 'bg-gray-700'} rounded-full text-xs ${isSpecialRole ? 'text-red-100' : 'text-gray-300'} font-['Montserrat',sans-serif]`}>
                                {member.hierarchy}
                              </span>
                              
                              {/* Special role with highlighted styling */}
                              {member.specialRole && !isSpecialRole && (
                                <span className="px-2 py-1 bg-red-700/20 text-red-400 rounded-full text-xs font-['Montserrat',sans-serif]">
                                  {member.specialRole}
                                </span>
                              )}
                            </div>
                            
                            {/* Course */}
                            <p className={`${isSpecialRole ? 'text-gray-300' : 'text-gray-400'} mb-4 font-['Montserrat',sans-serif]`}>
                              {member.course && <span>{member.course}</span>}
                            </p>
                            
                            <p className={`text-sm text-center ${isSpecialRole ? 'text-red-200/70' : 'text-gray-400'} italic mt-3 font-['Montserrat',sans-serif]`}>
                              Clique para mais detalhes
                            </p>
                          </div>
                        </div>
                      }
                      backContent={
                        <div className={`${
                            isSpecialRole 
                              ? 'bg-gradient-to-br from-gray-800 via-gray-800 to-red-900/40 rounded-lg p-6 h-full flex flex-col border-2 border-red-900/40' 
                              : 'bg-gray-800 rounded-lg p-6 h-full flex flex-col'
                          }`}>
                          {/* Main title - nickname if available, otherwise name */}
                          <h3 className={`text-xl font-bold mb-1 font-['Playfair_Display',serif] ${isSpecialRole ? 'text-red-100' : ''}`}>
                            {member.nickname || member.name}
                          </h3>
                          
                          {/* Show real name as secondary when nickname exists */}
                          {member.nickname && (
                            <p className="text-gray-300 mb-2 font-['Montserrat',sans-serif]">
                              {member.name}
                            </p>
                          )}
                          
                          {member.tuneName && (
                            <p className="text-amber-400 text-md mb-3 font-['Montserrat',sans-serif] italic">
                              <span className="text-gray-500 not-italic">Nome de Tuno:</span> {member.tuneName}
                            </p>
                          )}
                          
                          {/* Special role with more prominence */}
                          {member.specialRole && (
                            <div className={`${isSpecialRole ? 'bg-red-700/30 border border-red-700/50' : 'bg-red-700/20'} mb-3 px-3 py-2 rounded-lg inline-block`}>
                              <p className={`${isSpecialRole ? 'text-red-200' : 'text-red-400'} font-semibold font-['Montserrat',sans-serif]`}>
                                {member.specialRole}
                              </p>
                            </div>
                          )}
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <div className={`${isSpecialRole ? 'bg-red-900/30 border border-red-900/50' : 'bg-gray-700'} px-3 py-2 rounded-lg`}>
                              <p className={`text-xs ${isSpecialRole ? 'text-red-200/80' : 'text-gray-400'} font-['Montserrat',sans-serif]`}>Instrumento</p>
                              <p className={`text-sm font-medium font-['Montserrat',sans-serif] ${isSpecialRole ? 'text-red-100' : ''}`}>{member.role}</p>
                            </div>
                            
                            <div className={`${isSpecialRole ? 'bg-red-900/30 border border-red-900/50' : 'bg-gray-700'} px-3 py-2 rounded-lg`}>
                              <p className={`text-xs ${isSpecialRole ? 'text-red-200/80' : 'text-gray-400'} font-['Montserrat',sans-serif]`}>Hierarquia</p>
                              <p className={`text-sm font-medium font-['Montserrat',sans-serif] ${isSpecialRole ? 'text-red-100' : ''}`}>{member.hierarchy}</p>
                            </div>
                            
                            {member.course && (
                              <div className={`${isSpecialRole ? 'bg-red-900/30 border border-red-900/50' : 'bg-gray-700'} px-3 py-2 rounded-lg`}>
                                <p className={`text-xs ${isSpecialRole ? 'text-red-200/80' : 'text-gray-400'} font-['Montserrat',sans-serif]`}>Curso</p>
                                <p className={`text-sm font-medium font-['Montserrat',sans-serif] ${isSpecialRole ? 'text-red-100' : ''}`}>{member.course}</p>
                              </div>
                            )}
                          </div>
                          
                          {/* Compact Godfather section - only on back */}
                          {godfather && (
                            <div 
                              className={`godfather-link flex items-center gap-2 ${isSpecialRole ? 'bg-red-900/30 border border-red-900/50' : 'bg-gray-700'} p-2 rounded-lg cursor-pointer hover:bg-opacity-80 transition-colors mt-2 mb-4`}
                              onClick={() => handleGodfatherClick(member.godfather as number)}
                            >
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-800 flex-shrink-0">
                                <img 
                                  src={godfather.image || "/placeholder.svg"} 
                                  alt={godfather.nickname || godfather.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex-1 overflow-hidden">
                                <p className={`text-sm font-medium truncate ${isSpecialRole ? 'text-white' : 'text-gray-200'}`}>
                                  Padrinho: {godfather.nickname || godfather.name}
                                </p>
                              </div>
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          )}
                          
                          <div className="flex-grow"></div>
                          
                          <div className="mt-4 text-center">
                            <span className={`text-xs ${isSpecialRole ? 'text-red-200/60' : 'text-gray-500'} font-['Montserrat',sans-serif]`}>
                              Clique para voltar
                            </span>
                          </div>
                        </div>
                      }
                    />
                  </motion.div>
                )})}
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