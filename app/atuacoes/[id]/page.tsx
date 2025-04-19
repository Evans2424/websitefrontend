import { useParams } from "next/navigation"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  FaArrowLeft,
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa"
import PerformanceDetailClient from "./PerformanceDetailClient"
import PerformanceNotFound from "./PerformanceNotFound"

// Performance data
const performances = [
  {
    id: 1,
    title: "Festival Internacional de Tunas",
    date: "15 de Maio, 2025",
    location: "Coimbra, Portugal",
    venue: "Grande Auditório da Universidade de Coimbra",
    time: "21:00",
    ticketLink: "https://example.com/tickets/festival-tunas",
    summary:
      "A TEUP participará no prestigiado Festival Internacional de Tunas em Coimbra, competindo com tunas de toda a Europa.",
    image: "/images/teup-flag-performance.png",
    content:
      "A TEUP tem a honra de participar no prestigiado Festival Internacional de Tunas em Coimbra, um dos eventos mais importantes do calendário tunante. Este festival, que celebra a sua 25ª edição, reúne as melhores tunas académicas de Portugal, Espanha e outros países europeus.\n\nA competição decorrerá no Grande Auditório da Universidade de Coimbra, com capacidade para mais de 1000 espectadores. Cada tuna terá 15 minutos para apresentar o seu repertório, sendo avaliada por um júri composto por professores de música e antigos tunos de renome.\n\nA TEUP preparou um programa especial para esta ocasião, incluindo clássicas baladas portuguesas e uma surpresa musical que promete impressionar o júri e o público.\n\nOs bilhetes para o evento já estão à venda e podem ser adquiridos através do site do festival ou na bilheteira da Universidade de Coimbra. Venha apoiar a TEUP neste importante evento!",
    mapLink: "https://maps.google.com/?q=Universidade+de+Coimbra",
    isFeatured: true,
  },
  {
    id: 2,
    title: "Celebração do Aniversário da FEUP",
    date: "10 de Junho, 2025",
    location: "Porto, Portugal",
    venue: "Auditório da FEUP",
    time: "21:00",
    ticketLink: "https://example.com/tickets/aniversario-feup",
    summary: "Concerto especial para celebrar o aniversário da Faculdade de Engenharia da Universidade do Porto.",
    image: "/images/teup-dance-performance.png",
    content:
      "A TEUP apresentará um concerto especial para celebrar o aniversário da Faculdade de Engenharia da Universidade do Porto. Este evento faz parte das comemorações oficiais da FEUP e contará com a presença de autoridades académicas, professores, alunos e ex-alunos.\n\nO concerto terá lugar no Auditório da FEUP, com início às 21h00. O programa incluirá um repertório que percorre a história da TEUP e da própria faculdade, com músicas que marcaram diferentes épocas ao longo das últimas décadas.\n\nHaverá também um momento especial de homenagem aos antigos membros da tuna, com a participação de alguns veteranos que se juntarão ao grupo para interpretar peças clássicas do repertório.\n\nA entrada é gratuita, mas sujeita à lotação da sala. Os interessados devem levantar o seu convite na Associação de Estudantes da FEUP a partir de 1 de Junho. Não perca esta oportunidade de celebrar connosco a história e as tradições da nossa faculdade!",
    mapLink: "https://maps.google.com/?q=FEUP+Porto",
    isFeatured: true,
  },
  {
    id: 3,
    title: "Intercâmbio Cultural em Nice",
    date: "22 de Julho, 2025",
    location: "Nice, França",
    venue: "Place Masséna",
    time: "19:30",
    ticketLink: "https://example.com/tickets/nice-cultural",
    summary: "A TEUP representará Portugal num intercâmbio cultural com grupos musicais universitários europeus.",
    image: "/images/teup-nice.png",
    content:
      "A TEUP terá a honra de representar Portugal num importante intercâmbio cultural com grupos musicais universitários europeus, a realizar-se em Nice, França. Este evento, organizado pela Federação Europeia de Música Universitária, reúne anualmente grupos de diferentes tradições musicais académicas para promover o intercâmbio cultural e a amizade entre estudantes europeus.\n\nDurante uma semana, a TEUP participará em workshops, concertos conjuntos e apresentações individuais em vários locais emblemáticos da cidade francesa, incluindo a famosa Promenade des Anglais e a Place Masséna.\n\nAlém das atuações, o programa inclui visitas culturais e momentos de convívio com os outros grupos participantes, provenientes de países como França, Espanha, Itália, Alemanha e Polónia.\n\nEsta será uma oportunidade única para a TEUP divulgar a cultura musical académica portuguesa e estabelecer contactos para futuras colaborações internacionais. A participação da TEUP neste evento é parcialmente financiada pela Universidade do Porto e pelo Instituto Camões.",
    mapLink: "https://maps.google.com/?q=Place+Massena+Nice+France",
    isFeatured: false,
  },
]

// Generate static params for all performances
export async function generateStaticParams() {
  return performances.map((performance) => ({
    id: String(performance.id)
  }))
}

// Find the performance with the matching id
export default async function PerformanceDetail({ params }: { params: { id: string } }) {
  // Convert params.id to number after ensuring it's resolved
  const id = Number(params.id)
  
  // Find the matching performance
  const performance = performances.find((item) => item.id === id)
  
  if (!performance) {
    return <PerformanceNotFound />
  }

  return <PerformanceDetailClient performance={performance} />
}
