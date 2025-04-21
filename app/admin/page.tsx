"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { FaAddressBook, FaEnvelope, FaNewspaper, FaCalendarAlt, FaUsers, FaEye, FaEdit } from "react-icons/fa";
import { Button } from "@/components/ui/button";

// Sample data for demonstration
const recentContacts = [
  { id: "1", name: "João Silva", email: "joao.silva@example.com", subject: "Informações sobre atuações", date: "2025-04-18T14:30:00" },
  { id: "2", name: "Maria Costa", email: "maria.costa@example.com", subject: "Possível colaboração", date: "2025-04-16T09:15:00" },
  { id: "3", name: "André Santos", email: "andre.santos@example.com", subject: "Entrevista para jornal universitário", date: "2025-04-15T11:45:00" },
];

const upcomingEvents = [
  { id: "1", title: "Festival de Tunas", location: "Aula Magna", date: "2025-05-15T19:00:00", confirmed: true },
  { id: "2", title: "Serenata Académica", location: "Praça do Município", date: "2025-04-28T21:30:00", confirmed: true },
  { id: "3", title: "Gala de Final de Ano", location: "Teatro Municipal", date: "2025-06-10T20:00:00", confirmed: false },
];

const recentNews = [
  { id: "1", title: "TEUP vence Festival Internacional", date: "2025-04-10T09:00:00", views: 342 },
  { id: "2", title: "Nova direção assume comando da tuna", date: "2025-03-20T14:30:00", views: 256 },
  { id: "3", title: "Abertos castings para novos elementos", date: "2025-03-15T10:00:00", views: 198 },
];

export default function AdminDashboard() {
  const [currentDate, setCurrentDate] = useState<string>("");
  
  useEffect(() => {
    // Format current date in Portuguese
    const now = new Date();
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    setCurrentDate(now.toLocaleDateString('pt-PT', options));
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Dashboard</h2>
        <p className="text-gray-400">{currentDate}</p>
      </div>

      {/* Quick actions */}
      <div>
        <h3 className="text-lg font-medium text-white mb-4">Ações Rápidas</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <Link href="/admin/contactos">
            <Card className="border-gray-800 bg-gray-900 hover:bg-gray-800 transition-colors h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <FaAddressBook className="h-8 w-8 text-blue-500 mb-2" />
                <p className="text-white">Gerir Contactos</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/emails">
            <Card className="border-gray-800 bg-gray-900 hover:bg-gray-800 transition-colors h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <FaEnvelope className="h-8 w-8 text-green-500 mb-2" />
                <p className="text-white">Enviar Email</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/noticias">
            <Card className="border-gray-800 bg-gray-900 hover:bg-gray-800 transition-colors h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <FaNewspaper className="h-8 w-8 text-yellow-500 mb-2" />
                <p className="text-white">Nova Notícia</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/atuacoes">
            <Card className="border-gray-800 bg-gray-900 hover:bg-gray-800 transition-colors h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <FaCalendarAlt className="h-8 w-8 text-purple-500 mb-2" />
                <p className="text-white">Nova Atuação</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/admin/membros">
            <Card className="border-gray-800 bg-gray-900 hover:bg-gray-800 transition-colors h-full">
              <CardContent className="p-4 flex flex-col items-center justify-center text-center h-full">
                <FaUsers className="h-8 w-8 text-red-500 mb-2" />
                <p className="text-white">Gerir Membros</p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
      
      {/* Quick stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Contatos Recentes</CardTitle>
            <CardDescription className="text-gray-400">
              Últimas mensagens recebidas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between border-b border-gray-800 pb-2 last:border-0">
                  <div>
                    <p className="text-white font-medium">{contact.name}</p>
                    <p className="text-sm text-gray-400">{contact.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {new Date(contact.date).toLocaleDateString('pt-PT')}
                    </p>
                    <Button size="sm" variant="ghost" className="h-8">
                      <FaEye className="h-3 w-3 text-blue-500" />
                      <span className="sr-only">Ver</span>
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link href="/admin/contactos">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver todos os contatos
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Próximas Atuações</CardTitle>
            <CardDescription className="text-gray-400">
              Atuações agendadas
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {upcomingEvents.map((event) => (
                <div key={event.id} className="flex items-center justify-between border-b border-gray-800 pb-2 last:border-0">
                  <div>
                    <p className="text-white font-medium">{event.title}</p>
                    <p className="text-sm text-gray-400">{event.location}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {new Date(event.date).toLocaleDateString('pt-PT')}
                    </p>
                    <span className={`inline-flex items-center px-1.5 py-0.5 rounded-full text-xs ${
                      event.confirmed ? 'bg-green-900/20 text-green-500' : 'bg-yellow-900/20 text-yellow-500'
                    }`}>
                      {event.confirmed ? 'Confirmado' : 'Pendente'}
                    </span>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link href="/admin/atuacoes">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver todas as atuações
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-800 bg-gray-900">
          <CardHeader className="pb-2">
            <CardTitle className="text-white text-lg">Notícias Recentes</CardTitle>
            <CardDescription className="text-gray-400">
              Últimas publicações
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNews.map((news) => (
                <div key={news.id} className="flex items-center justify-between border-b border-gray-800 pb-2 last:border-0">
                  <div>
                    <p className="text-white font-medium">{news.title}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(news.date).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">
                      {news.views} visualizações
                    </p>
                    <Button size="sm" variant="ghost" className="h-8">
                      <FaEdit className="h-3 w-3 text-yellow-500" />
                      <span className="sr-only">Editar</span>
                    </Button>
                  </div>
                </div>
              ))}
              <div className="pt-2">
                <Link href="/admin/noticias">
                  <Button variant="outline" size="sm" className="w-full">
                    Ver todas as notícias
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}