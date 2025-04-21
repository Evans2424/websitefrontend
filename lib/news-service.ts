// Mock news database for TEUP website
export interface NewsItem {
  id: number;
  title: string;
  date: string; // ISO date string format
  summary: string;
  content: string;
  image?: string;
  published: boolean;
  slug?: string;
  author?: string;
  tags?: string[];
  views?: number; // For admin statistics
}

// Mock news items
const mockNews: NewsItem[] = [
  {
    id: 1,
    title: "TEUP vence Festival Internacional de Tunas",
    date: "2025-03-15",
    summary: "A Tuna de Engenharia da Universidade do Porto conquistou o primeiro lugar no prestigiado Festival Internacional de Tunas em Coimbra.",
    content: "A Tuna de Engenharia da Universidade do Porto (TEUP) conquistou o primeiro lugar no prestigiado Festival Internacional de Tunas em Coimbra. Após uma atuação memorável que incluiu clássicos do repertório tunante e algumas inovações musicais, o júri decidiu por unanimidade atribuir o prémio principal à nossa tuna.\n\nEste reconhecimento vem coroar meses de ensaios intensivos e dedicação de todos os membros. A competição contou com a participação de 12 tunas de diferentes países, incluindo Espanha, Brasil e Itália.\n\nAlém do prémio principal, a TEUP também arrecadou o prémio de 'Melhor Instrumental' e 'Melhor Solista' para o nosso bandolinista António Ferreira.\n\nA vitória neste festival abre portas para futuras participações em eventos internacionais e consolida a posição da TEUP como uma das melhores tunas académicas de Portugal.",
    image: "/images/teup-flag-performance.png",
    published: true,
    slug: "teup-vence-festival-internacional",
    author: "Comissão de Comunicação TEUP",
    tags: ["Festival", "Competição", "Prémios", "Internacional"],
    views: 423
  },
  {
    id: 2,
    title: "Novo CD 'Tradição Engenheira' já disponível",
    date: "2025-02-28",
    summary: "O mais recente trabalho da TEUP já está disponível em todas as plataformas digitais e na nossa loja online.",
    content: "É com grande orgulho que anunciamos o lançamento do nosso novo álbum 'Tradição Engenheira'. Este trabalho representa dois anos de dedicação e paixão pela música tradicional portuguesa, reinterpretada com o estilo único da TEUP.\n\nO álbum contém 12 faixas, incluindo clássicos do repertório tunante e três composições originais dos nossos membros. As gravações foram realizadas nos estúdios da Faculdade de Engenharia, com produção de João Silva, nosso atual Ensaiador.\n\n'Tradição Engenheira' já está disponível em todas as plataformas digitais como Spotify, Apple Music e YouTube Music. Também é possível adquirir a versão física do CD através da nossa loja online ou nos nossos concertos.\n\nParte das receitas das vendas será destinada ao fundo de bolsas para estudantes de Engenharia da UP. Agradecemos a todos que tornaram este projeto possível!",
    image: "/images/teup-musicians.png",
    published: true,
    slug: "novo-cd-tradicao-engenheira",
    author: "Comissão de Comunicação TEUP",
    tags: ["Música", "Lançamento", "CD", "Streaming"],
    views: 387
  },
  {
    id: 3,
    title: "Inscrições abertas para novos tunos",
    date: "2025-01-10",
    summary: "Estão abertas as inscrições para estudantes de Engenharia que queiram juntar-se à TEUP. As audições decorrerão durante o mês de Fevereiro.",
    content: "A Tuna de Engenharia da Universidade do Porto (TEUP) abre inscrições para novos membros. As vagas são direcionadas principalmente a estudantes dos diversos cursos de Engenharia da Universidade do Porto, mas também consideramos candidatos de outras áreas com especial talento musical.\n\nProcuramos candidatos com conhecimentos básicos em instrumentos como violão, bandolim, viola, cavaquinho, acordeão, flauta, percussão, contrabaixo e pandeireta. Também há vagas para vozes masculinas em todos os registos.\n\nAs audições serão realizadas durante o mês de Fevereiro, nas instalações da Faculdade de Engenharia. Não é necessário ter experiência prévia em tunas, apenas entusiasmo e compromisso com os ensaios regulares.\n\nOs candidatos selecionados passarão por um período de integração como caloiros, durante o qual aprenderão sobre as tradições, repertório e técnicas específicas da tuna.\n\nInscreva-se através do formulário online disponível no nosso site até 31 de Janeiro. Para mais informações, contacte-nos através do email teup@fe.up.pt.",
    image: "/images/teup-university.png",
    published: true,
    slug: "inscricoes-novos-tunos",
    author: "Comissão de Recrutamento TEUP",
    tags: ["Recrutamento", "Audições", "Novos Membros"],
    views: 512
  },
  {
    id: 4,
    title: "Parceria com a Faculdade de Belas Artes",
    date: "2025-04-05",
    summary: "Nova colaboração entre a TEUP e estudantes de Belas Artes para criação de materiais visuais.",
    content: "A TEUP tem o prazer de anunciar uma nova parceria com os estudantes da Faculdade de Belas Artes da Universidade do Porto. Este projeto inovador visa unir música e artes visuais, com os estudantes de Belas Artes criando cartazes, vídeos e outros materiais visuais para os eventos e apresentações da TEUP.\n\nA iniciativa surgiu após o sucesso da colaboração pontual para o nosso último festival e agora se torna um projeto contínuo. Os estudantes terão a oportunidade de desenvolver seu portfólio com trabalhos reais, enquanto a TEUP se beneficia de materiais promocionais de alta qualidade e artisticamente relevantes.\n\nO primeiro resultado desta parceria será o design da capa do nosso próximo EP digital, previsto para lançamento em junho. Agradecemos ao professor Manuel Oliveira por facilitar esta colaboração e aos talentosos estudantes que já estão trabalhando conosco.",
    image: "/images/teup-performance.png",
    published: true,
    slug: "parceria-belas-artes",
    author: "Comissão de Comunicação TEUP",
    tags: ["Parceria", "Design", "Belas Artes"],
    views: 245
  },
  {
    id: 5,
    title: "Workshop de Viola Braguesa",
    date: "2025-04-18",
    summary: "No próximo sábado, dia 26 de Abril, realizaremos um workshop de Viola Braguesa para todos os membros da TEUP.",
    content: "No próximo sábado, dia 26 de Abril, realizaremos um workshop de Viola Braguesa para todos os membros da TEUP. O workshop será ministrado pelo professor Carlos Silva, reconhecido especialista neste tradicional instrumento português, e é obrigatório para todos os elementos que tocam este instrumento.\n\nA Viola Braguesa, instrumento típico da região do Minho, tem vindo a ganhar maior destaque nas nossas apresentações, e este workshop visa aprimorar a técnica e conhecimento dos nossos instrumentistas.\n\nO workshop abordará aspectos como afinação específica, técnicas de rasgueado, dedilhado e os padrões rítmicos tradicionais do instrumento. Também serão estudadas adaptações de algumas peças do nosso repertório para melhor incorporar a sonoridade deste instrumento.\n\nO evento acontecerá na sala de ensaios da FEUP, das 14h às 18h. Os participantes devem trazer seus próprios instrumentos e material para anotações. A TEUP disponibilizará alguns instrumentos para os membros que ainda não possuem o seu próprio.",
    image: "/images/teup-meeting-room.png",
    published: true,
    slug: "workshop-viola-braguesa",
    author: "Miguel Costa",
    tags: ["Workshop", "Formação", "Instrumentos"],
    views: 178
  }
];

// Formatting functions
export const formatDateForDisplay = (dateString: string): string => {
  const date = new Date(dateString);
  // Format: "15 de Março, 2025"
  const day = date.getDate();
  const month = date.toLocaleString('pt-PT', { month: 'long' });
  const year = date.getFullYear();
  return `${day} de ${month}, ${year}`;
};

// Helper function to get news by ID
export const getNewsById = (id: number): NewsItem | undefined => {
  return mockNews.find(news => news.id === id);
};

// Mock API response interface
export interface NewsResponse {
  news: NewsItem[];
  error?: string;
}

// Fetch all published news
export const fetchPublishedNews = async (): Promise<NewsResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const publishedNews = mockNews.filter(news => news.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  return { news: publishedNews };
};

// Fetch homepage news (limited number)
export const fetchHomepageNews = async (limit: number = 3): Promise<NewsResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 400));
  
  const homepageNews = mockNews
    .filter(news => news.published)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, limit);
  
  return { news: homepageNews };
};

// Fetch news by ID
export const fetchNewsById = async (id: number): Promise<NewsItem | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  const news = mockNews.find(n => n.id === id) || null;
  
  // Simulate view count increment
  if (news) {
    news.views = (news.views || 0) + 1;
  }
  
  return news;
};

// Admin functions

// Fetch all news (for admin panel)
export const fetchAllNews = async (): Promise<NewsResponse> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return { news: [...mockNews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) };
};

// Add new news item
export const addNewsItem = async (newsItem: Omit<NewsItem, 'id' | 'views'>): Promise<NewsItem> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Generate a new ID
  const newId = Math.max(...mockNews.map(n => n.id)) + 1;
  
  // Generate slug if not provided
  let slug = newsItem.slug;
  if (!slug) {
    slug = newsItem.title
      .toLowerCase()
      .replace(/[^\w\s]/gi, '')
      .replace(/\s+/g, '-');
  }
  
  // Create new news item
  const newNews: NewsItem = {
    ...newsItem,
    id: newId,
    slug,
    views: 0
  };
  
  // In a real implementation this would be saved to a database
  // For now, we're just adding it to our mock array
  mockNews.push(newNews);
  
  return newNews;
};

// Update existing news item
export const updateNewsItem = async (id: number, updates: Partial<NewsItem>): Promise<NewsItem | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  const index = mockNews.findIndex(n => n.id === id);
  if (index === -1) return null;
  
  // Update the news item
  mockNews[index] = {
    ...mockNews[index],
    ...updates
  };
  
  return mockNews[index];
};

// Delete news item
export const deleteNewsItem = async (id: number): Promise<boolean> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  const index = mockNews.findIndex(n => n.id === id);
  if (index === -1) return false;
  
  // In a real implementation this would remove from database
  // Here we're just removing from our mock array
  mockNews.splice(index, 1);
  
  return true;
};