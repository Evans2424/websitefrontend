"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/app/context/auth-context";
import { Button } from "@/components/ui/button";
import { FaAddressBook, FaEnvelope, FaNewspaper, FaCalendarAlt, FaUsers, FaHome, FaSignOutAlt } from "react-icons/fa";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Redirect to home page if not authenticated and not still checking auth status
    if (!user && !isLoading) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="h-8 w-8 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
      </div>
    );
  }

  if (!user) {
    return null; // This will be replaced by the redirect
  }

  // Additional check to verify user is admin
  if (user.role !== 'admin') {
    router.push("/");
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 min-h-screen">
        <div className="p-4">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold text-white">Admin Portal</h1>
          </div>
          
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
              <FaHome className="mr-2" /> Dashboard
            </Link>
            <Link href="/admin/contactos" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
              <FaAddressBook className="mr-2" /> Contactos
            </Link>
            <Link href="/admin/emails" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
              <FaEnvelope className="mr-2" /> Emails
            </Link>
            <Link href="/admin/noticias" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
              <FaNewspaper className="mr-2" /> Notícias
            </Link>
            <Link href="/admin/atuacoes" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
              <FaCalendarAlt className="mr-2" /> Atuações
            </Link>
            <Link href="/admin/membros" className="flex items-center px-3 py-2 text-gray-300 hover:bg-gray-800 rounded-md transition-colors">
              <FaUsers className="mr-2" /> Membros
            </Link>
          </nav>
          
          <div className="absolute bottom-0 left-0 w-64 p-4 border-t border-gray-800">
            <div className="flex flex-col gap-2">
              <Link href="/" className="w-full">
                <Button variant="outline" className="w-full flex items-center justify-center">
                  <FaHome className="mr-2" /> Voltar ao Site
                </Button>
              </Link>
              <Button variant="ghost" onClick={() => logout()} className="w-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-800">
                <FaSignOutAlt className="mr-2" /> Sair
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-gray-950">
        <div className="p-8">
          {children}
        </div>
      </div>
    </div>
  );
}