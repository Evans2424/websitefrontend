// Mock performances database for TEUP website
export interface Performance {
  id: number;
  title: string;
  date: string; // ISO date string format
  time: string;
  location: string;
  venue?: string;
  address?: string;
  summary: string;
  content?: string;
  image?: string;
  tags?: string[];
  published: boolean;
  slug?: string;
  ticketPrice?: string;
  ticketLink?: string;
  mapLink?: string;
  status?: 'upcoming' | 'past' | 'cancelled';
}

// Mock performances data
const mockPerformances: Performance[] = [
  {
    id: 1,
    title: "Festival Internacional de Tunas",
    date: "2025-05-15",
    time: "21:00",
    location: "Coimbra, Portugal",
    venue: "Grande Auditório da Universidade de Coimbra",
    address: "Praça D. Dinis, 3000-104 Coimbra",
    summary: "A TEUP participará no prestigiado Festival Internacional de Tunas em Coimbra, competindo com tunas de toda a Europa.",
    content: "A TEUP tem a honra de participar no prestigiado Festival Internacional de Tunas em Coimbra, um dos eventos mais importantes do calendário tunante.\n\nO festival, que reúne anualmente as melhores tunas académicas de Portugal, Espanha e outros países europeus, acontecerá no Grande Auditório da Universidade de Coimbra, um espaço histórico e acusticamente privilegiado.\n\nNossa apresentação incluirá um repertório cuidadosamente selecionado, combinando peças tradicionais do cancioneiro tunante com algumas inovações e arranjos exclusivos desenvolvidos pelo nosso Ensaiador.\n\nAlém da competição principal, o festival contará com diversas atividades paralelas, incluindo workshops, momentos de convívio entre as tunas participantes e a tradicional serenata noturna nas ruas históricas de Coimbra.\n\nEsta é uma oportunidade única para ver a TEUP em ação num dos palcos mais prestigiados do mundo tunante, competindo pelo reconhecimento como uma das melhores tunas académicas da Europa.",
    image: "/images/teup-flag-performance.png",
    tags: ["Festival", "Competição", "Internacional"],
    published: true,
    slug: "festival-internacional-tunas-coimbra",
    ticketPrice: "10€ - 15€",
    ticketLink: "https://example.com/tickets/festival-tunas",
    mapLink: "https://maps.google.com/?q=Universidade+de+Coimbra",
    status: "upcoming"
  },
  {
    id: 2,
    title: "Celebração do Aniversário da FEUP",
    date: "2025-06-20",
    time: "18:30",
    location: "Porto, Portugal",
    venue: "Auditório da FEUP",
    address: "Rua Dr. Roberto Frias, 4200-465 Porto",
    summary: "A TEUP fará uma apresentação especial como parte das comemorações do aniversário da Faculdade de Engenharia.",
    content: "No âmbito das comemorações do aniversário da Faculdade de Engenharia da Universidade do Porto, a TEUP realizará uma apresentação especial, relembrando a história e tradição da nossa instituição.\n\nO evento, que acontecerá no Auditório da FEUP, contará com a presença de atuais alunos, professores, funcionários e alumni da faculdade. A nossa atuação será um dos pontos altos da celebração, representando o espírito académico que caracteriza a nossa instituição.\n\nO repertório para esta ocasião especial incluirá canções tradicionais da tuna, bem como composições dedicadas à FEUP e à engenharia portuguesa. Teremos também algumas surpresas preparadas especialmente para esta celebração.\n\nA entrada é livre para toda a comunidade académica, mas sujeita à lotação da sala. Recomendamos a chegada com antecedência para garantir lugar.",
    image: "/images/teup-performance.png",
    tags: ["FEUP", "Aniversário", "Académico"],
    published: true,
    slug: "aniversario-feup",
    status: "upcoming"
  },
  {
    id: 3,
    title: "Intercâmbio Cultural em Nice",
    date: "2025-07-15",
    time: "20:00",
    location: "Nice, França",
    venue: "Théâtre de la Photographie et de l'Image",
    address: "27 Boulevard Dubouchage, 06000 Nice, France",
    summary: "A TEUP representará Portugal num intercâmbio cultural com grupos musicais universitários europeus em Nice, França.",
    content: "A TEUP terá a honra de representar Portugal num importante intercâmbio cultural com grupos musicais universitários europeus, a realizar-se em Nice, França. Este evento, organizado pela Federação Europeia de Música Universitária, reúne anualmente grupos de diferentes tradições musicais académicas para promover o intercâmbio cultural e a amizade entre estudantes europeus.\n\nDurante uma semana, a TEUP participará em workshops, concertos conjuntos e apresentações individuais em vários locais emblemáticos da cidade francesa, incluindo a famosa Promenade des Anglais e a Place Masséna.\n\nAlém das atuações, o programa inclui visitas culturais e momentos de convívio com os outros grupos participantes, provenientes de países como França, Espanha, Itália, Alemanha e Polónia.\n\nEsta será uma oportunidade única para a TEUP divulgar a cultura musical académica portuguesa no exterior e estabelecer contactos internacionais que poderão resultar em futuros intercâmbios e colaborações.",
    image: "/images/teup-nice.png",
    tags: ["Internacional", "Intercâmbio", "França"],
    published: true,
    slug: "intercambio-nice",
    ticketPrice: "Entrada livre",
    mapLink: "https://maps.google.com/?q=Theatre+de+la+Photographie+et+de+l'Image+Nice",
    status: "upcoming"
  },
  {
    id: 4,
    title: "Serenata ao Luar",
    date: "2025-08-30",
    time: "22:00",
    location: "Porto, Portugal",
    venue: "Jardins do Palácio de Cristal",
    address: "Rua de Dom Manuel II, 4050-346 Porto",
    summary: "Uma serenata ao luar nos românticos Jardins do Palácio de Cristal, com vista para o rio Douro.",
    content: "A TEUP convida todos para uma noite especial de música e romance nos belos Jardins do Palácio de Cristal, com vista privilegiada para o rio Douro. A tradicional Serenata ao Luar é um dos eventos mais aguardados do nosso calendário anual.\n\nSob o céu estrelado e à luz da lua, interpretaremos um repertório especialmente selecionado de baladas e canções românticas que fazem parte da tradição tunante portuguesa. Este ambiente único cria uma experiência musical inesquecível, onde a música se funde com a beleza natural dos jardins e a vista noturna da cidade.\n\nA serenata terá início às 22h, mas recomendamos que chegue com antecedência para garantir um bom lugar e apreciar o pôr do sol sobre o Douro antes da atuação. Sugerimos trazer uma manta para sentar no relvado e, quem sabe, uma garrafa de vinho para complementar a experiência.\n\nEste é um evento ideal para um serão romântico, um encontro entre amigos ou simplesmente para quem aprecia boa música num ambiente excepcional. A entrada é livre, mas estaremos a aceitar contribuições voluntárias para apoiar as atividades da tuna.",
    image: "/images/teup-night-view.png",
    tags: ["Serenata", "Romântico", "Porto"],
    published: true,
    slug: "serenata-ao-luar",
    ticketPrice: "Entrada livre",
    mapLink: "https://maps.google.com/?q=Jardins+do+Palácio+de+Cristal+Porto",
    status: "upcoming"
  },
  {
    id: 5,
    title: "Festival Tunae Mundi",
    date: "2025-09-05",
    time: "19:30",
    location: "Lisboa, Portugal",
    venue: "Praça do Comércio",
    address: "Praça do Comércio, 1100-148 Lisboa",
    summary: "Participação no maior festival de tunas da Península Ibérica, reunindo mais de 30 tunas de Portugal e Espanha.",
    content: "A TEUP foi convidada para participar no prestigiado Festival Tunae Mundi, que reúne anualmente as melhores tunas da Península Ibérica. Este ano, o festival decorrerá num dos locais mais emblemáticos de Lisboa: a monumental Praça do Comércio.\n\nCom mais de 30 tunas participantes de Portugal e Espanha, este é um dos maiores eventos do género na Europa, atraindo milhares de espectadores durante os três dias de festival. A TEUP terá a honra de atuar no palco principal no dia de abertura, representando a tradição académica do Porto.\n\nO Festival Tunae Mundi é também uma competição, com diversos prémios atribuídos por um júri composto por personalidades do mundo da música e da cultura. Entre as categorias a concurso estão 'Melhor Tuna', 'Melhor Instrumental', 'Melhor Voz' e 'Melhor Originalidade'.\n\nA entrada para o público é gratuita, permitindo que todos possam desfrutar deste espetáculo único de música académica tradicional em pleno coração de Lisboa.",
    image: "/images/teup-jump-performance.png",
    tags: ["Festival", "Lisboa", "Grande Evento"],
    published: true,
    slug: "festival-tunae-mundi",
    ticketPrice: "Entrada livre",
    mapLink: "https://maps.google.com/?q=Praça+do+Comércio+Lisboa",
    status: "upcoming"
  },
  {
    id: 6,
    title: "Sarau Cultural da Universidade do Porto",
    date: "2025-10-12",
    time: "20:30",
    location: "Porto, Portugal",
    venue: "Casa da Música",
    address: "Av. da Boavista 604-610, 4149-071 Porto",
    summary: "A TEUP participa no sarau anual da UP, apresentando um reportório que mistura tradição e inovação.",
    content: "A Universidade do Porto realiza anualmente um Sarau Cultural que reúne os diversos talentos artísticos da comunidade académica, e a TEUP terá novamente a honra de participar neste evento prestigiado.\n\nO sarau deste ano terá lugar no icónico edifício da Casa da Música, proporcionando um palco de excelência para as apresentações. A TEUP preparou um programa especial que combina o repertório tradicional tunante com algumas inovações e arranjos exclusivos.\n\nAlém da nossa tuna, o evento contará com apresentações de outros grupos culturais da universidade, incluindo o Orfeão Universitário do Porto, o Grupo de Teatro da UP e os grupos de dança contemporânea e folclórica.\n\nEste sarau é uma oportunidade única para assistir, num só evento, à diversidade cultural que a Universidade do Porto tem para oferecer, num ambiente elegante e numa das salas de espetáculo mais aclamadas da Europa.\n\nOs bilhetes para estudantes têm um desconto especial, e toda a receita reverte para projetos de ação social da universidade.",
    image: "/images/teup-dance-performance.png",
    tags: ["Universidade", "Sarau", "Cultural"],
    published: true,
    slug: "sarau-cultural-up",
    ticketPrice: "8€ (estudantes), 15€ (público geral)",
    ticketLink: "https://example.com/tickets/sarau-up",
    mapLink: "https://maps.google.com/?q=Casa+da+Música+Porto",
    status: "upcoming"
  }
];

// Formatting functions
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  // Format: "15 de Maio, 2025"
  const day = date.getDate();
  const month = date.toLocaleString('pt-PT', { month: 'long' });
  const year = date.getFullYear();
  return `${day} de ${month}, ${year}`;
};

// Helper function to get performance by ID
export const getPerformanceById = (id: number): Performance | undefined => {
  return mockPerformances.find(performance => performance.id === id);
};

// Mock API response interface
export interface PerformancesResponse {
  performances: Performance[];
  error?: string;
}

// Fetch all published performances
export const fetchPublishedPerformances = async (): Promise<PerformancesResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const publishedPerformances = mockPerformances.filter(performance => performance.published)
    .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime());
  
  return { performances: publishedPerformances };
};

// Fetch homepage performances (limited number)
export const fetchHomepagePerformances = async (limit: number = 3): Promise<PerformancesResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  // Get only upcoming performances for homepage
  const now = new Date();
  const upcomingPerformances = mockPerformances
    .filter(performance => performance.published && new Date(performance.date) >= now)
    .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime())
    .slice(0, limit);
  
  return { performances: upcomingPerformances };
};

// Fetch performance by ID
export const fetchPerformanceById = async (id: number): Promise<Performance | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const performance = mockPerformances.find(p => p.id === id) || null;
  
  return performance;
};

// Fetch upcoming performances
export const fetchUpcomingPerformances = async (): Promise<PerformancesResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const now = new Date();
  const upcomingPerformances = mockPerformances
    .filter(performance => performance.published && new Date(performance.date) >= now)
    .sort((a, b) => new Date(a.date + 'T' + a.time).getTime() - new Date(b.date + 'T' + b.time).getTime());
  
  return { performances: upcomingPerformances };
};

// Fetch past performances
export const fetchPastPerformances = async (): Promise<PerformancesResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  const now = new Date();
  const pastPerformances = mockPerformances
    .filter(performance => performance.published && new Date(performance.date) < now)
    .sort((a, b) => new Date(b.date + 'T' + b.time).getTime() - new Date(a.date + 'T' + a.time).getTime());
  
  return { performances: pastPerformances };
};

// Admin functions

// Fetch all performances (for admin panel)
export const fetchAllPerformances = async (): Promise<PerformancesResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { performances: [...mockPerformances].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) };
};

// Add new performance
export const addPerformance = async (performance: Omit<Performance, 'id'>): Promise<Performance> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate a new ID
  const newId = Math.max(...mockPerformances.map(p => p.id)) + 1;
  
  // Generate slug if not provided
  let slug = performance.slug;
  if (!slug) {
    slug = performance.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }
  
  // Determine status based on date
  const now = new Date();
  const performanceDate = new Date(performance.date);
  let status: 'upcoming' | 'past' = performanceDate >= now ? 'upcoming' : 'past';
  
  // Create new performance
  const newPerformance: Performance = {
    ...performance,
    id: newId,
    slug,
    status
  };
  
  // In a real implementation this would be saved to a database
  // For now, we're just adding it to our mock array
  mockPerformances.push(newPerformance);
  
  return newPerformance;
};

// Update existing performance
export const updatePerformance = async (id: number, updates: Partial<Performance>): Promise<Performance | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const index = mockPerformances.findIndex(p => p.id === id);
  if (index === -1) return null;
  
  // Update the performance
  mockPerformances[index] = {
    ...mockPerformances[index],
    ...updates
  };
  
  // Update status based on date if date is changed
  if (updates.date) {
    const now = new Date();
    const performanceDate = new Date(updates.date);
    mockPerformances[index].status = performanceDate >= now ? 'upcoming' : 'past';
  }
  
  return mockPerformances[index];
};

// Delete performance
export const deletePerformance = async (id: number): Promise<boolean> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const index = mockPerformances.findIndex(p => p.id === id);
  if (index === -1) return false;
  
  // In a real implementation this would remove from database
  // Here we're just removing from our mock array
  mockPerformances.splice(index, 1);
  
  return true;
};