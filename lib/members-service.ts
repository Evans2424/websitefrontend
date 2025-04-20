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
  joinYear: number;
  course?: string;
  bio: string;
  image: string;
  isLeader?: boolean;
  isActive: boolean;
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
    joinYear: 2018,
    course: "Engenharia Informática",
    bio: "João é o líder musical da tuna desde 2020. Com mais de 10 anos de experiência em violão clássico, tem sido fundamental na preparação dos novos arranjos musicais.",
    image: "/images/members/placeholder.png",
    isLeader: true,
    isActive: true
  },
  {
    id: 2,
    name: "Miguel Costa",
    nickname: "Poeta",
    role: "Bandolim",
    hierarchy: "Tuno",
    specialRole: "Ensaiador", // The only active Ensaiador
    joinYear: 2019,
    course: "Engenharia Civil",
    bio: "Miguel é conhecido por criar letras originais para as músicas da tuna. O seu bandolim e criatividade são distintivos no som do grupo.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 3,
    name: "Pedro Santos",
    nickname: "Baixinho",
    role: "Viola",
    hierarchy: "Tuno",
    specialRole: "Diretor Artístico", // The active Diretor Artístico
    joinYear: 2017,
    course: "Engenharia Mecânica",
    bio: "Apesar do apelido 'Baixinho', Pedro é um dos membros mais altos da tuna. Um especialista em viola que traz uma visão artística para todas as apresentações da tuna.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 4,
    name: "António Ferreira",
    nickname: "Maestro Júnior",
    role: "Violão",
    hierarchy: "Caloiro",
    specialRole: null,
    joinYear: 2020,
    course: "Engenharia Eletrotécnica",
    bio: "António é o mais recente talento da TEUP. Como assistente do Maestro, ajuda a coordenar os ensaios e a preparar novos membros.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 5,
    name: "André Martins",
    nickname: "Cavaco",
    role: "Cavaquinho",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2018,
    course: "Engenharia Química",
    bio: "O som inconfundível do cavaquinho de André dá um toque autêntico às músicas tradicionais. Também é o responsável pela manutenção dos instrumentos.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 6,
    name: "Ricardo Oliveira",
    nickname: "Fole",
    role: "Acordeão",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2019,
    course: "Engenharia Ambiental",
    bio: "Ricardo aprendeu a tocar acordeão com o avô e traz esse legado familiar à TEUP. É também o encarregado da logística nas viagens internacionais.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 7,
    name: "Tiago Sousa",
    nickname: "Ritmo",
    role: "Percussão",
    hierarchy: "Caloiro",
    specialRole: null,
    joinYear: 2021,
    course: "Engenharia de Materiais",
    bio: "Tiago mantém o ritmo com as suas habilidades de percussão. Também é responsável por organizar muitas das nossas atuações.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 8,
    name: "Rui Sousa",
    nickname: "Baixo",
    role: "Contrabaixo",
    hierarchy: "Caloiro",
    specialRole: null,
    joinYear: 2020,
    course: "Engenharia Física",
    bio: "Rui fornece a base do nosso som com o seu contrabaixo. O seu conhecimento de teoria musical ajuda a arranjar as nossas peças tradicionais.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 9,
    name: "Duarte Pereira",
    nickname: "Voz de Ouro",
    role: "Voz",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2017,
    course: "Engenharia Civil",
    bio: "Duarte é conhecido pela sua voz potente e expressiva. Frequentemente interpreta os solos vocais mais complexos e é responsável pelos ensaios de canto em grupo.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 10,
    name: "Gustavo Ribeiro",
    nickname: "Dedilhado",
    role: "Bandolim",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2019,
    course: "Engenharia Mecânica",
    bio: "Gustavo é reconhecido pela sua técnica refinada no bandolim. Participa ativamente na criação de novos arranjos e adaptações para o repertório da tuna.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 11,
    name: "Henrique Fonseca",
    nickname: "Flautista",
    role: "Flauta",
    hierarchy: "Mestre-Tuno",
    specialRole: null,
    joinYear: 2016,
    course: "Engenharia Informática",
    bio: "Henrique traz um toque de elegância às nossas músicas com sua flauta. Com formação clássica, introduz elementos que enriquecem o som tradicional da tuna.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 12,
    name: "Lucas Moreira",
    nickname: "Pandeirola",
    role: "Pandeireta",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2018,
    course: "Engenharia Eletrotécnica",
    bio: "Lucas é o mestre da pandeireta, criando ritmos intrincados que complementam perfeitamente as melodias da tuna. Também é um excelente dançarino.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 13,
    name: "Filipe Neves",
    nickname: "Violinista",
    role: "Viola",
    hierarchy: "Caloiro",
    specialRole: null,
    joinYear: 2022,
    course: "Engenharia de Computadores",
    bio: "Filipe entrou recentemente na tuna, mas já demonstra grande talento com a viola. Vem de uma família de músicos e traz novas ideias para o grupo.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 14,
    name: "Daniel Santos",
    nickname: "Cordas",
    role: "Violão",
    hierarchy: "Mestre-Tuno",
    specialRole: null,
    joinYear: 2015,
    course: "Engenharia Química",
    bio: "Daniel é um dos membros mais experientes da tuna. Seu domínio do violão e conhecimento das tradições tunantes são essenciais para manter a autenticidade do grupo.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 15,
    name: "Bernardo Lima",
    nickname: "Cavaquito",
    role: "Cavaquinho",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2018,
    course: "Engenharia Ambiental",
    bio: "Bernardo toca o cavaquinho com uma energia contagiante. Sua presença no palco sempre anima o público e os outros membros da tuna.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  {
    id: 16,
    name: "Mateus Fernandes",
    nickname: "Baixista",
    role: "Contrabaixo",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2019,
    course: "Engenharia de Materiais",
    bio: "Mateus é o segundo contrabaixista da tuna, trazendo profundidade ao som do grupo. Também tem talento para arranjos e composição musical.",
    image: "/images/members/placeholder.png",
    isActive: true
  },
  
  // Former Members (non-active) - 14+
  {
    id: 101,
    name: "Manuel Rodrigues",
    nickname: "Fundador",
    role: "Violão",
    hierarchy: "Mestre-Tuno",
    specialRole: "Diretor Artístico",
    joinYear: 2000,
    course: "Engenharia Civil",
    bio: "Manuel foi um dos membros fundadores da TEUP em 1990. Continuou como membro honorário até 2015, sempre presente nos eventos mais importantes.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 102,
    name: "Carlos Mendes",
    nickname: "Voz de Ouro",
    role: "Voz",
    hierarchy: "Mestre-Tuno",
    specialRole: null,
    joinYear: 2005,
    course: "Engenharia Mecânica",
    bio: "A voz tenor de Carlos foi elemento central na TEUP durante mais de uma década. Participou em todas as gravações dos álbuns do grupo.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 103,
    name: "Joaquim Almeida",
    nickname: "Mestre",
    role: "Bandolim",
    hierarchy: "Mestre-Tuno",
    specialRole: "Diretor Artístico",
    joinYear: 2008,
    course: "Engenharia Informática",
    bio: "Joaquim revolucionou o som da tuna com seu bandolim virtuoso. Foi diretor musical de 2010 a 2017 e compôs várias músicas originais.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 104,
    name: "Fernando Castro",
    nickname: "Pandeiro",
    role: "Pandeireta",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2012,
    course: "Engenharia Química",
    bio: "Fernando era conhecido por suas habilidades impressionantes com a pandeireta. Também foi tesoureiro da TEUP por vários anos.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 105,
    name: "José Ferreira", 
    nickname: "Maestro Antigo",
    role: "Violão",
    hierarchy: "Mestre-Tuno",
    specialRole: "Magister",
    joinYear: 2002,
    course: "Engenharia Civil",
    bio: "José liderou a tuna por mais de 8 anos, estabelecendo muitas das tradições que seguimos até hoje. Foi um dos primeiros a levar a TEUP para festivais internacionais.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 106,
    name: "António Costa",
    nickname: "Flautista",
    role: "Flauta",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2010,
    course: "Engenharia Mecânica",
    bio: "António trouxe elegância às apresentações com sua flauta transversal. Era conhecido por seus solos impressionantes que cativavam o público.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 107,
    name: "Miguel Santos",
    nickname: "Vozeirão",
    role: "Voz",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2009,
    course: "Engenharia Informática",
    bio: "A voz barítono de Miguel era inconfundível. Durante sua passagem pela TEUP, foi responsável por muitos dos arranjos vocais que ainda usamos.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 108,
    name: "Pedro Lima",
    nickname: "Compositor",
    role: "Viola",
    hierarchy: "Mestre-Tuno",
    specialRole: "Ensaiador",
    joinYear: 2007,
    course: "Engenharia Eletrotécnica",
    bio: "Pedro compôs várias músicas originais que se tornaram parte do repertório permanente da TEUP. Foi um pioneiro em mesclar estilos tradicionais com influências contemporâneas.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 109,
    name: "Afonso Pires",
    nickname: "Acordeonista",
    role: "Acordeão",
    hierarchy: "Mestre-Tuno",
    specialRole: null,
    joinYear: 2006,
    course: "Engenharia Civil",
    bio: "Afonso foi um virtuoso do acordeão, trazendo um som único e autêntico à tuna. Participou em diversas digressões internacionais, representando a TEUP.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 110,
    name: "Roberto Dias",
    nickname: "Cavaquinho Dourado",
    role: "Cavaquinho",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2011,
    course: "Engenharia Mecânica",
    bio: "Roberto era conhecido pela sua técnica excepcional no cavaquinho, criando melodias que se tornaram marca registrada de várias apresentações da TEUP.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 111,
    name: "Leonardo Campos",
    nickname: "Ritmo Forte",
    role: "Percussão",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2010,
    course: "Engenharia Informática",
    bio: "Leonardo trazia energia e precisão rítmica às performances da tuna. Seu talento com diversos instrumentos de percussão ampliou as possibilidades musicais do grupo.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 112,
    name: "Gabriel Mota",
    nickname: "Contrabaixo Mestre",
    role: "Contrabaixo",
    hierarchy: "Mestre-Tuno",
    specialRole: null,
    joinYear: 2004,
    course: "Engenharia Eletrotécnica",
    bio: "Gabriel foi responsável por estabelecer o papel do contrabaixo na TEUP. Sua abordagem inovadora influencia até hoje o som característico da tuna.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 113,
    name: "Alberto Vasconcelos",
    nickname: "Viola de Ouro",
    role: "Viola",
    hierarchy: "Caloiro",
    specialRole: null,
    joinYear: 2015,
    course: "Engenharia Ambiental",
    bio: "Alberto, apesar de ter permanecido pouco tempo na tuna como caloiro, deixou sua marca com performances memoráveis e contribuições valiosas ao repertório.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 114,
    name: "Victor Nogueira",
    nickname: "Bandolim de Prata",
    role: "Bandolim",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2008,
    course: "Engenharia Química",
    bio: "Victor era admirado pela sua técnica refinada no bandolim. Participou ativamente em concursos nacionais, representando a TEUP com distinção.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 115,
    name: "Eduardo Lopes",
    nickname: "Flauta Mágica",
    role: "Flauta",
    hierarchy: "Tuno",
    specialRole: null,
    joinYear: 2009,
    course: "Engenharia Civil",
    bio: "Eduardo trouxe um toque de sofisticação à tuna com sua flauta. Foi responsável por introduzir novos gêneros musicais ao repertório tradicional.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 116,
    name: "Renato Faria",
    nickname: "Voz Clássica",
    role: "Voz",
    hierarchy: "Caloiro",
    specialRole: null,
    joinYear: 2013,
    course: "Engenharia de Materiais",
    bio: "Renato tinha formação em canto lírico, o que trouxe uma dimensão diferente às interpretações vocais da tuna durante seu breve período como membro.",
    image: "/images/members/placeholder.png",
    isActive: false
  },
  {
    id: 117,
    name: "Paulo Magalhães",
    nickname: "Violão Ancestral",
    role: "Violão",
    hierarchy: "Mestre-Tuno",
    specialRole: "Magister",
    joinYear: 1998,
    course: "Engenharia Informática",
    bio: "Paulo foi um dos primeiros Magisters da TEUP, estabelecendo muitas das tradições e rituais que são seguidos até hoje. Seu estilo de liderança inspirou gerações de tunos.",
    image: "/images/members/placeholder.png",
    isActive: false
  }
];

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