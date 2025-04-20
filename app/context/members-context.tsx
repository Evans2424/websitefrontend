"use client";

import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  Member,
  fetchActiveMembers,
  fetchFormerMembers,
  fetchHomepageMembers
} from '@/lib/members-service';

interface MembersContextType {
  currentMembers: Member[];
  formerMembers: Member[];
  isLoading: boolean;
  error: string | null;
  refreshMembers: () => Promise<void>;
}

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export const MembersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);
  const [formerMembers, setFormerMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadMembers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const [currentResponse, formerResponse] = await Promise.all([
        fetchActiveMembers(),
        fetchFormerMembers()
      ]);
      
      if (currentResponse.error) {
        setError(currentResponse.error);
        return;
      }
      
      if (formerResponse.error) {
        setError(formerResponse.error);
        return;
      }
      
      setCurrentMembers(currentResponse.members);
      setFormerMembers(formerResponse.members);
    } catch (err) {
      setError('Erro ao carregar os membros. Por favor, tente novamente mais tarde.');
      console.error("Error loading members:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Load members when the component mounts
  useEffect(() => {
    loadMembers();
  }, []);

  const refreshMembers = async (): Promise<void> => {
    await loadMembers();
  };

  const value = {
    currentMembers,
    formerMembers,
    isLoading,
    error,
    refreshMembers
  };

  return <MembersContext.Provider value={value}>{children}</MembersContext.Provider>;
};

export const useMembers = (): MembersContextType => {
  const context = useContext(MembersContext);
  if (context === undefined) {
    throw new Error('useMembers must be used within a MembersProvider');
  }
  return context;
};