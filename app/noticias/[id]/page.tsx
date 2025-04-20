"use client"

import { useParams } from "next/navigation"
import NewsDetailClient from "./NewsDetailClient"
import NewsNotFound from "./NewsNotFound"

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

export default function NewsDetail() {
  // Use useParams hook to get the id parameter from the URL
  const params = useParams();
  // Convert id to number
  const id = Number(params.id);
  
  // Find the matching news item
  const newsItem = newsItems.find((item) => item.id === id)
  
  if (!newsItem) {
    return <NewsNotFound />
  }

  return <NewsDetailClient newsItem={newsItem} />
}
