"use client";

import { useAuth } from "@/app/context/auth-context";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, MapPin, Clock, Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, parseISO, isFuture, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

// Mock performances data
const mockPerformances = [
  {
    id: "1",
    title: "Festival de Tunas",
    date: "2025-05-15T19:00:00",
    location: "Faculdade de Engenharia da UP",
    description: "Festival anual de tunas académicas com participação de várias tunas nacionais.",
    status: "confirmed",
    notes: "Levar instrumentos e trajes completos."
  },
  {
    id: "2",
    title: "Serenata ao Reitor",
    date: "2025-06-10T21:00:00",
    location: "Reitoria da Universidade do Porto",
    description: "Serenata tradicional ao reitor para celebrar o final do ano letivo.",
    status: "pending",
    notes: "Confirmar presença até 30 de Maio."
  },
  {
    id: "3",
    title: "Cortejo Académico",
    date: "2025-05-05T10:00:00",
    location: "Avenida dos Aliados, Porto",
    description: "Participação no tradicional cortejo académico das Queimas das Fitas.",
    status: "confirmed",
    notes: "Ponto de encontro às 9h na Faculdade de Engenharia."
  },
  {
    id: "4",
    title: "Apadrinhamento de Caloiros",
    date: "2025-04-15T18:30:00",
    location: "Campus da FEUP",
    description: "Participação na cerimónia de apadrinhamento dos novos estudantes.",
    status: "confirmed",
    notes: "Presença obrigatória para todos os membros."
  },
  {
    id: "5",
    title: "Convívio com Alumni",
    date: "2025-03-21T20:00:00",
    location: "Casa da Música, Porto",
    description: "Encontro anual com antigos tunos e alumni da faculdade.",
    status: "concluded",
    notes: "Evento já realizado com sucesso."
  }
];

export default function AtuacoesPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("upcoming");
  
  const upcomingPerformances = mockPerformances.filter(
    p => isFuture(parseISO(p.date))
  ).sort((a, b) => 
    parseISO(a.date).getTime() - parseISO(b.date).getTime()
  );
  
  const pastPerformances = mockPerformances.filter(
    p => isPast(parseISO(p.date))
  ).sort((a, b) => 
    parseISO(b.date).getTime() - parseISO(a.date).getTime()
  );

  const statusBadge = (status: string) => {
    switch(status) {
      case "confirmed":
        return <Badge className="bg-green-500">Confirmada</Badge>;
      case "pending":
        return <Badge className="bg-yellow-500">Pendente</Badge>;
      case "concluded":
        return <Badge className="bg-blue-500">Concluída</Badge>;
      default:
        return <Badge>Desconhecido</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Atuações</h1>
          <p className="text-muted-foreground mt-1">
            Consulta e gerência das atuações da TEUP
          </p>
        </div>
        
        {user?.privileges?.canAddPerformances && (
          <Button asChild>
            <Link href="/area-membros/atuacoes/nova">
              <Plus className="w-4 h-4 mr-2" />
              Nova Atuação
            </Link>
          </Button>
        )}
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="upcoming">Próximas</TabsTrigger>
          <TabsTrigger value="past">Anteriores</TabsTrigger>
        </TabsList>
        
        <TabsContent value="upcoming" className="mt-4">
          {upcomingPerformances.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                Não existem atuações agendadas no futuro próximo.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {upcomingPerformances.map(performance => (
                <Card key={performance.id}>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{performance.title}</CardTitle>
                        <CardDescription>{performance.description}</CardDescription>
                      </div>
                      {statusBadge(performance.status)}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {format(parseISO(performance.date), "PPPP 'às' HH:mm", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{performance.location}</span>
                      </div>
                    </div>
                    <div className="mt-4 p-3 bg-muted/50 rounded-md text-sm">
                      <strong>Notas:</strong> {performance.notes}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="past" className="mt-4">
          {pastPerformances.length === 0 ? (
            <Card>
              <CardContent className="py-10 text-center text-muted-foreground">
                Não existem registos de atuações passadas.
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {pastPerformances.map(performance => (
                <Card key={performance.id} className="bg-muted/30">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle>{performance.title}</CardTitle>
                        <CardDescription>{performance.description}</CardDescription>
                      </div>
                      <Badge className="bg-blue-500">Concluída</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>
                          {format(parseISO(performance.date), "PPPP 'às' HH:mm", { locale: ptBR })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{performance.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}