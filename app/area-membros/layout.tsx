"use client";

import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Sidebar, SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Home, Mail, Calendar, Newspaper, Users, LogOut } from "lucide-react";
import Link from "next/link";

export default function MembersAreaLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, logout } = useAuth();
  const router = useRouter();

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user) {
      router.push('/');
    }
  }, [user, router]);

  // If no user, show nothing while redirecting
  if (!user || user.role !== 'member') {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar className="w-64 border-r">
          <div className="p-4 space-y-6">
            <div className="flex items-center gap-3 mb-8">
              <img 
                src="/images/teup-logo.png" 
                alt="TEUP Logo" 
                className="w-10 h-10 rounded-full"
              />
              <div>
                <h2 className="text-lg font-bold">Área de Membros</h2>
                <p className="text-sm text-muted-foreground">TEUP</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-1">
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/area-membros">
                  <Home className="w-4 h-4 mr-2" />
                  Início
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/area-membros/emails">
                  <Mail className="w-4 h-4 mr-2" />
                  Emails
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/area-membros/atuacoes">
                  <Calendar className="w-4 h-4 mr-2" />
                  Atuações
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/area-membros/noticias">
                  <Newspaper className="w-4 h-4 mr-2" />
                  Notícias
                </Link>
              </Button>
              
              <Button variant="ghost" asChild className="justify-start">
                <Link href="/area-membros/contactos">
                  <Users className="w-4 h-4 mr-2" />
                  Contactos
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="mt-auto p-4 border-t">
            <div className="flex items-center gap-3 mb-3">
              <img 
                src={user.photo} 
                alt={user.name} 
                className="w-8 h-8 rounded-full"
              />
              <div>
                <p className="font-medium text-sm">{user.name}</p>
                <p className="text-xs text-muted-foreground">
                  {user.privileges?.canAddNews ? "Membro Privilegiado" : "Membro"}
                </p>
              </div>
            </div>
            <Button variant="outline" className="w-full justify-start" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              Terminar Sessão
            </Button>
          </div>
        </Sidebar>
        
        <div className="flex-1 p-6 overflow-auto">
          {children}
        </div>
      </div>
    </SidebarProvider>
  );
}