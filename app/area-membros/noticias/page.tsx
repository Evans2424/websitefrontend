"use client";

import { useAuth } from "@/app/context/auth-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Calendar, User } from "lucide-react";
import Link from "next/link";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Badge } from "@/components/ui/badge";

// Mock news data
const mockNews = [
  {
    id: "1",
    title: "Abertura das Inscrições para Novos Membros",
    content: "A TEUP abre inscrições para novos membros. Se tens paixão pela música e queres fazer parte da nossa tuna, inscreve-te já! As audições serão realizadas entre 15 e 20 de Maio.",
    date: "2025-04-15T10:00:00",
    author: "João Tuno",
    authorId: "1",
    category: "inscricoes",
    image: "/images/teup-nice.png"
  },
  {
    id: "2",
    title: "TEUP Vence Festival Internacional de Tunas",
    content: "Com grande orgulho anunciamos que a TEUP foi premiada com o primeiro lugar no Festival Internacional de Tunas realizado em Salamanca, Espanha. O evento contou com a participação de 12 tunas de vários países europeus.",
    date: "2025-03-28T14:30:00",
    author: "Miguel Tuno",
    authorId: "2",
    category: "premios",
    image: "/images/teup-performance.png"
  },
  {
    id: "3",
    title: "Lançamento do Novo CD da TEUP",
    content: "É com grande entusiasmo que anunciamos o lançamento do nosso novo CD 'Tradições em Acorde', que estará disponível a partir de 10 de Maio. O CD inclui 15 faixas que representam o melhor do nosso repertório atual.",
    date: "2025-04-02T09:15:00",
    author: "João Tuno",
    authorId: "1",
    category: "lancamentos",
    image: "/images/teup-musicians.png"
  },
  {
    id: "4",
    title: "Workshop de Viola Braguesa",
    content: "No próximo sábado, dia 26 de Abril, realizaremos um workshop de Viola Braguesa para todos os membros da TEUP. O workshop será ministrado pelo professor Carlos Silva e é obrigatório para todos os elementos que tocam este instrumento.",
    date: "2025-04-18T16:45:00",
    author: "Miguel Tuno",
    authorId: "2",
    category: "eventos",
    image: "/images/teup-meeting-room.png"
  }
];

// Define category badge colors
const categoryColors: Record<string, string> = {
  "inscricoes": "bg-blue-500",
  "premios": "bg-green-500",
  "lancamentos": "bg-purple-500",
  "eventos": "bg-amber-500"
};

// Define category translations
const categoryNames: Record<string, string> = {
  "inscricoes": "Inscrições",
  "premios": "Prémios",
  "lancamentos": "Lançamentos",
  "eventos": "Eventos"
};

export default function NoticiasPage() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notícias</h1>
          <p className="text-muted-foreground mt-1">
            Últimas novidades da TEUP
          </p>
        </div>
        
        {user?.privileges?.canAddNews && (
          <Button asChild>
            <Link href="/area-membros/noticias/nova">
              <Plus className="w-4 h-4 mr-2" />
              Nova Notícia
            </Link>
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockNews.map(news => (
          <Card key={news.id} className="overflow-hidden flex flex-col h-full">
            <div className="aspect-video relative overflow-hidden">
              <img 
                src={news.image} 
                alt={news.title}
                className="object-cover w-full h-full"
              />
              <Badge className={`absolute top-3 left-3 ${categoryColors[news.category] || "bg-gray-500"}`}>
                {categoryNames[news.category] || news.category}
              </Badge>
            </div>
            <CardHeader className="pb-2">
              <CardTitle className="line-clamp-2">{news.title}</CardTitle>
              <CardDescription className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs">
                  <Calendar className="h-3 w-3" />
                  <span>{format(parseISO(news.date), "PP", { locale: ptBR })}</span>
                </div>
                <div className="flex items-center gap-1 text-xs">
                  <User className="h-3 w-3" />
                  <span>{news.author}</span>
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-4 flex-1">
              <p className="text-sm line-clamp-3">{news.content}</p>
            </CardContent>
            <CardFooter>
              <Button asChild variant="outline" size="sm" className="w-full">
                <Link href={`/area-membros/noticias/${news.id}`}>
                  Ler Mais
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}