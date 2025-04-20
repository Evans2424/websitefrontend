"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { AuthUser, LoginCredentials, login as apiLogin, logout as apiLogout, checkAuth } from '@/lib/auth-service';

interface AuthContextType {
  user: AuthUser | null;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Check for existing user session on mount
  useEffect(() => {
    const checkUserAuth = async () => {
      try {
        setIsLoading(true);
        const currentUser = await checkAuth();
        setUser(currentUser);
      } catch (err) {
        console.error("Auth check failed:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // Use setTimeout to ensure localStorage is available in client-side
    setTimeout(() => {
      checkUserAuth();
    }, 0);
  }, []);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await apiLogin(credentials);
      
      if (response.error) {
        setError(response.error);
        return false;
      }
      
      if (response.user) {
        // Store user in localStorage for persistence
        localStorage.setItem('teup_user', JSON.stringify(response.user));
        setUser(response.user);
        return true;
      }
      
      return false;
    } catch (err) {
      setError('Ocorreu um erro durante o login. Tente novamente.');
      console.error("Login error:", err);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await apiLogout();
      localStorage.removeItem('teup_user');
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    user,
    isLoading,
    error,
    login,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};