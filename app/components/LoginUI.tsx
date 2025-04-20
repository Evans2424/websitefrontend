"use client";

import React, { useState } from 'react';
import { useAuth } from '../context/auth-context';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { motion } from 'framer-motion';

export default function LoginUI() {
  const { user, login, logout, isLoading, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      const success = await login({ username, password });
      if (success) {
        setUsername('');
        setPassword('');
        setIsLoginOpen(false);
      }
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  if (user) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center"
      >
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="rounded-full p-0 h-auto">
              <div className="flex items-center gap-2">
                <Avatar className="h-9 w-9 border-2 border-primary">
                  <AvatarImage src={user.photo} alt={user.name} />
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {user.name.substring(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium hidden sm:inline-block text-white">
                  {user.name}
                </span>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              Perfil
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              Configurações
            </DropdownMenuItem>
            {user.role === 'admin' && (
              <DropdownMenuItem className="cursor-pointer">
                Administração
              </DropdownMenuItem>
            )}
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-red-500">
              Sair
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center">
      <Popover open={isLoginOpen} onOpenChange={setIsLoginOpen}>
        <PopoverTrigger asChild>
          <Button 
            variant="outline" 
            size="sm"
            className="bg-transparent border-red-500 text-white hover:bg-red-500/20 hover:text-white"
          >
            Área Reservada
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4">
          <div className="space-y-4">
            <div className="space-y-2 text-center">
              <h3 className="text-lg font-medium">Área Reservada</h3>
              <p className="text-sm text-muted-foreground">
                Acesso apenas para membros da TEUP
              </p>
            </div>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Input
                  id="username"
                  placeholder="Nome de utilizador"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              <div className="space-y-2">
                <Input
                  id="password"
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>
              
              {error && (
                <p className="text-sm font-medium text-red-500">{error}</p>
              )}
              
              <Button 
                type="submit" 
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? "A entrar..." : "Entrar"}
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}