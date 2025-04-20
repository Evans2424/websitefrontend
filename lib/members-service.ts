// Mock members database
export type MemberRole =
  | "Violão"
  | "Bandolim"
  | "Viola"
  | "Cavaquinho"
  | "Acordeão"
  | "Flauta"
  | "Percussão"
  | "Contrabaixo"
  | "Pandeireta"
  | "Voz";

export type MemberHierarchy = 
  | "Mestre-Tuno" 
  | "Tuno" 
  | "Caloiro";

export type SpecialRole = 
  | "Magister" 
  | "Ensaiador" 
  | "Diretor Artístico" 
  | null;

export interface Member {
  id: number;
  name: string;
  nickname?: string;
  role: MemberRole;
  hierarchy: MemberHierarchy;
  specialRole?: SpecialRole;
  course?: string;
  image: string;
  isLeader?: boolean;
  isActive: boolean;
  tuneName?: string;    // Nome de Tuno - name given when becoming an official tuno
  godfather?: number;   // Padrinho - ID reference to another member who is the godfather
}

// Mock members (consolidated list)
const mockMembers: Member[] = [
  // Active Members (14+)
  {
    id: 1,
    name: "João Silva",
    nickname: "Maestro",
    role: "Violão",
    hierarchy: "Mestre-Tuno",
    specialRole: "Magister", // The only active Magister
    course: "Engenharia Informática",
    image: "/images/members/placeholder.png",
    isLeader: true,
    isActive: true,
    tuneName: "Nota Alta",
    godfather: 105
  },
  {
    id: 2,
    name: "Miguel Costa",
    nickname: "Poeta",
    role: "Bandolim",
    hierarchy: "Tuno",
    specialRole: "Ensaiador", // The only active Ensaiador
    course: "Engenharia Civil",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Melodia",
    godfather: 1
  },
  {
    id: 3,
    name: "Pedro Santos",
    nickname: "Baixinho",
    role: "Viola",
    hierarchy: "Tuno",
    specialRole: "Diretor Artístico", // The active Diretor Artístico
    course: "Engenharia Mecânica",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Harmonia",
    godfather: 108
  },
  {
    id: 4,
    name: "António Ferreira",
    nickname: "Maestro Júnior",
    role: "Violão",
    hierarchy: "Caloiro",
    specialRole: null,
    course: "Engenharia Eletrotécnica",
    image: "/images/members/placeholder.png",
    isActive: true,
    godfather: 1
  },
  {
    id: 5,
    name: "André Martins",
    nickname: "Cavaco",
    role: "Cavaquinho",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Química",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Tamboril",
    godfather: 110
  },
  {
    id: 6,
    name: "Ricardo Oliveira",
    nickname: "Fole",
    role: "Acordeão",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Ambiental",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Vento",
    godfather: 109
  },
  {
    id: 7,
    name: "Tiago Sousa",
    nickname: "Ritmo",
    role: "Percussão",
    hierarchy: "Caloiro",
    specialRole: null,
    course: "Engenharia de Materiais",
    image: "/images/members/placeholder.png",
    isActive: true,
    godfather: 2
  },
  {
    id: 8,
    name: "Rui Sousa",
    nickname: "Baixo",
    role: "Contrabaixo",
    hierarchy: "Caloiro",
    specialRole: null,
    course: "Engenharia Física",
    image: "/images/members/placeholder.png",
    isActive: true,
    godfather: 3
  },
  {
    id: 9,
    name: "Duarte Pereira",
    nickname: "Voz de Ouro",
    role: "Voz",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Civil",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Tenor",
    godfather: 1
  },
  {
    id: 10,
    name: "Gustavo Ribeiro",
    nickname: "Dedilhado",
    role: "Bandolim",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Mecânica",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Cordas",
    godfather: 2
  },
  {
    id: 11,
    name: "Henrique Fonseca",
    nickname: "Flautista",
    role: "Flauta",
    hierarchy: "Mestre-Tuno",
    specialRole: null,
    course: "Engenharia Informática",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Sopro",
    godfather: 117
  },
  {
    id: 12,
    name: "Lucas Moreira",
    nickname: "Pandeirola",
    role: "Pandeireta",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Eletrotécnica",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Compasso",
    godfather: 104
  },
  {
    id: 13,
    name: "Filipe Neves",
    nickname: "Violinista",
    role: "Viola",
    hierarchy: "Caloiro",
    specialRole: null,
    course: "Engenharia de Computadores",
    image: "/images/members/placeholder.png",
    isActive: true,
    godfather: 3
  },
  {
    id: 14,
    name: "Daniel Santos",
    nickname: "Cordas",
    role: "Violão",
    hierarchy: "Mestre-Tuno",
    specialRole: null,
    course: "Engenharia Química",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Trovador",
    godfather: 105
  },
  {
    id: 15,
    name: "Bernardo Lima",
    nickname: "Cavaquito",
    role: "Cavaquinho",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Ambiental",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Ponteio",
    godfather: 110
  },
  {
    id: 16,
    name: "Mateus Fernandes",
    nickname: "Baixista",
    role: "Contrabaixo",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia de Materiais",
    image: "/images/members/placeholder.png",
    isActive: true,
    tuneName: "Gravidade",
    godfather: 112
  },
  
  // Former Members (non-active) - 14+
  {
    id: 101,
    name: "Manuel Rodrigues",
    nickname: "Fundador",
    role: "Violão",
    hierarchy: "Mestre-Tuno",
    specialRole: "Diretor Artístico",
    course: "Engenharia Civil",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Pioneiro"
  },
  {
    id: 102,
    name: "Carlos Mendes",
    nickname: "Voz de Ouro",
    role: "Voz",
    hierarchy: "Mestre-Tuno",
    specialRole: null,
    course: "Engenharia Mecânica",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Barítono",
    godfather: 101
  },
  {
    id: 103,
    name: "Joaquim Almeida",
    nickname: "Mestre",
    role: "Bandolim",
    hierarchy: "Mestre-Tuno",
    specialRole: "Diretor Artístico",
    course: "Engenharia Informática",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Maestro",
    godfather: 101
  },
  {
    id: 104,
    name: "Fernando Castro",
    nickname: "Pandeiro",
    role: "Pandeireta",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Química",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Batuque",
    godfather: 101
  },
  {
    id: 105,
    name: "José Ferreira", 
    nickname: "Maestro Antigo",
    role: "Violão",
    hierarchy: "Mestre-Tuno",
    specialRole: "Magister",
    course: "Engenharia Civil",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Regente",
    godfather: 117
  },
  {
    id: 106,
    name: "António Costa",
    nickname: "Flautista",
    role: "Flauta",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Mecânica",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Melífluo",
    godfather: 103
  },
  {
    id: 107,
    name: "Miguel Santos",
    nickname: "Vozeirão",
    role: "Voz",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Informática",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Eco",
    godfather: 102
  },
  {
    id: 108,
    name: "Pedro Lima",
    nickname: "Compositor",
    role: "Viola",
    hierarchy: "Mestre-Tuno",
    specialRole: "Ensaiador",
    course: "Engenharia Eletrotécnica",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Partitura",
    godfather: 103
  },
  {
    id: 109,
    name: "Afonso Pires",
    nickname: "Acordeonista",
    role: "Acordeão",
    hierarchy: "Mestre-Tuno",
    specialRole: null,
    course: "Engenharia Civil",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Teclas",
    godfather: 105
  },
  {
    id: 110,
    name: "Roberto Dias",
    nickname: "Cavaquinho Dourado",
    role: "Cavaquinho",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Mecânica",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Braguinha",
    godfather: 103
  },
  {
    id: 111,
    name: "Leonardo Campos",
    nickname: "Ritmo Forte",
    role: "Percussão",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Informática",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Cadência",
    godfather: 104
  },
  {
    id: 112,
    name: "Gabriel Mota",
    nickname: "Contrabaixo Mestre",
    role: "Contrabaixo",
    hierarchy: "Mestre-Tuno",
    specialRole: null,
    course: "Engenharia Eletrotécnica",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Fundação",
    godfather: 105
  },
  {
    id: 113,
    name: "Alberto Vasconcelos",
    nickname: "Viola de Ouro",
    role: "Viola",
    hierarchy: "Caloiro",
    specialRole: null,
    course: "Engenharia Ambiental",
    image: "/images/members/placeholder.png",
    isActive: false,
    godfather: 108
  },
  {
    id: 114,
    name: "Victor Nogueira",
    nickname: "Bandolim de Prata",
    role: "Bandolim",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Química",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Dedilhado",
    godfather: 103
  },
  {
    id: 115,
    name: "Eduardo Lopes",
    nickname: "Flauta Mágica",
    role: "Flauta",
    hierarchy: "Tuno",
    specialRole: null,
    course: "Engenharia Civil",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Cantábile",
    godfather: 106
  },
  {
    id: 116,
    name: "Renato Faria",
    nickname: "Voz Clássica",
    role: "Voz",
    hierarchy: "Caloiro",
    specialRole: null,
    course: "Engenharia de Materiais",
    image: "/images/members/placeholder.png",
    isActive: false,
    godfather: 107
  },
  {
    id: 117,
    name: "Paulo Magalhães",
    nickname: "Violão Ancestral",
    role: "Violão",
    hierarchy: "Mestre-Tuno",
    specialRole: "Magister",
    course: "Engenharia Informática",
    image: "/images/members/placeholder.png",
    isActive: false,
    tuneName: "Patriarca"
  }
];

// Helper function to get member by ID
export const getMemberById = (id: number): Member | undefined => {
  return mockMembers.find(member => member.id === id);
};

// Function to get godfather information by godfather ID
export const getGodfatherInfo = (godfatherId: number | undefined): Member | undefined => {
  if (!godfatherId) return undefined;
  return getMemberById(godfatherId);
};

export interface MembersResponse {
  members: Member[];
  error?: string;
}

// Mock fetch functions for members
export const fetchActiveMembers = async (): Promise<MembersResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  const activeMembers = mockMembers.filter(member => member.isActive);
  return { members: activeMembers };
};

export const fetchFormerMembers = async (): Promise<MembersResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const formerMembers = mockMembers.filter(member => !member.isActive);
  return { members: formerMembers };
};

// Fetch a limited number of members for each category for the homepage
export const fetchHomepageMembers = async (): Promise<{
  activeMembers: Member[];
  formerMembers: Member[];
}> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  // First, get all members with special roles (they always appear)
  const activeSpecialMembers = mockMembers
    .filter(member => member.isActive && member.specialRole !== null);
    
  const activeRegularMembers = mockMembers
    .filter(member => member.isActive && member.specialRole === null);
  
  // Shuffle regular active members 
  const shuffledActiveMembers = [...activeRegularMembers]
    .sort(() => 0.5 - Math.random());
  
  // Calculate how many regular members we need to reach 8 in total
  const regularCount = Math.max(0, 8 - activeSpecialMembers.length);
  
  // Get the required number of regular members
  const selectedActiveRegularMembers = shuffledActiveMembers.slice(0, regularCount);
  
  // Combine special role members with randomly selected regular members
  const activeMembers = [...activeSpecialMembers, ...selectedActiveRegularMembers];
  
  // For former members, just get 8 random ones
  const formerMembers = mockMembers
    .filter(member => !member.isActive)
    .sort(() => 0.5 - Math.random())
    .slice(0, 8);
    
  return { activeMembers, formerMembers };
};

// Function to fetch member by ID
export const fetchMemberById = async (id: number): Promise<Member | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const member = mockMembers.find(m => m.id === id) || null;
  
  return member;
};