"use client";

import { useAuth } from "@/app/context/auth-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mail, Newspaper, Users } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function MembersHomePage() {
  const { user } = useAuth();
  
  if (!user) {
    return null; // Will be handled by the layout redirect
  }

  const quickActions = [
    {
      icon: <Mail className="h-6 w-6 text-blue-500" />,
      title: "Enviar Email",
      description: "Comunique com outros membros da tuna",
      href: "/area-membros/emails",
    },
    {
      icon: <Calendar className="h-6 w-6 text-green-500" />,
      title: "Atuações",
      description: "Consulte as próximas atuações",
      href: "/area-membros/atuacoes",
    },
    {
      icon: <Newspaper className="h-6 w-6 text-amber-500" />,
      title: "Notícias",
      description: "Veja as últimas novidades",
      href: "/area-membros/noticias",
    },
    {
      icon: <Users className="h-6 w-6 text-purple-500" />,
      title: "Contactos",
      description: "Lista de contactos dos tunos",
      href: "/area-membros/contactos",
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Bem-vindo, {user.name}</h1>
        <p className="text-muted-foreground mt-1">
          Este é o teu espaço pessoal como membro da TEUP.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Acesso Rápido</CardTitle>
          <CardDescription>
            Acede às principais funções da área de membros
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {quickActions.map((action, index) => (
              <Link href={action.href} key={index} className="block">
                <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
                  <CardContent className="pt-6 flex flex-col items-center text-center">
                    <div className="mb-4 p-3 bg-background rounded-full">
                      {action.icon}
                    </div>
                    <CardTitle className="text-lg mb-1">{action.title}</CardTitle>
                    <CardDescription>{action.description}</CardDescription>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>

      {user.privileges?.canAddNews || user.privileges?.canAddPerformances ? (
        <Card>
          <CardHeader>
            <CardTitle>Funções de Membro Privilegiado</CardTitle>
            <CardDescription>
              Estas funções estão disponíveis para ti como membro privilegiado
            </CardDescription>
          </CardHeader>
          <CardContent className="flex gap-4">
            {user.privileges?.canAddPerformances && (
              <Button asChild variant="default">
                <Link href="/area-membros/atuacoes/nova">
                  <Calendar className="w-4 h-4 mr-2" />
                  Nova Atuação
                </Link>
              </Button>
            )}
            {user.privileges?.canAddNews && (
              <Button asChild variant="default">
                <Link href="/area-membros/noticias/nova">
                  <Newspaper className="w-4 h-4 mr-2" />
                  Nova Notícia
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      ) : null}
    </div>
  );
}