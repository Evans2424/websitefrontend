"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Search, Mail, Phone, MapPin, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { 
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

interface Member {
  id: string;
  name: string;
  instrument: string;
  phone: string;
  email: string;
  address: string;
  joinDate: string;
  role: string;
}

// Mock members data
const mockMembers: Member[] = [
  {
    id: "1",
    name: "João Tuno",
    instrument: "Guitarra Clássica",
    phone: "912345678",
    email: "joao.tuno@teup.pt",
    address: "Rua da Alegria, 123, Porto",
    joinDate: "2018-09-01",
    role: "Presidente"
  },
  {
    id: "2",
    name: "Miguel Tuno",
    instrument: "Bandolim",
    phone: "923456789",
    email: "miguel.tuno@teup.pt",
    address: "Avenida da Boavista, 456, Porto",
    joinDate: "2019-10-15",
    role: "Vice-Presidente"
  },
  {
    id: "3",
    name: "António Silva",
    instrument: "Viola Baixo",
    phone: "934567890",
    email: "antonio.silva@teup.pt",
    address: "Rua de Santa Catarina, 789, Porto",
    joinDate: "2020-02-28",
    role: "Tesoureiro"
  },
  {
    id: "4",
    name: "Pedro Santos",
    instrument: "Cavaquinho",
    phone: "945678901",
    email: "pedro.santos@teup.pt",
    address: "Rua Miguel Bombarda, 234, Porto",
    joinDate: "2021-09-10",
    role: "Membro"
  },
  {
    id: "5",
    name: "Ricardo Pereira",
    instrument: "Voz",
    phone: "956789012",
    email: "ricardo.pereira@teup.pt",
    address: "Rua do Rosário, 567, Porto",
    joinDate: "2022-03-15",
    role: "Membro"
  },
  {
    id: "6",
    name: "Carlos Oliveira",
    instrument: "Viola Braguesa",
    phone: "967890123",
    email: "carlos.oliveira@teup.pt",
    address: "Rua Formosa, 890, Porto",
    joinDate: "2019-05-20",
    role: "Membro"
  },
  {
    id: "7",
    name: "Francisco Martins",
    instrument: "Pandeireta",
    phone: "978901234",
    email: "francisco.martins@teup.pt",
    address: "Rua das Flores, 123, Porto",
    joinDate: "2020-11-05",
    role: "Membro"
  },
  {
    id: "8",
    name: "André Costa",
    instrument: "Acordeão",
    phone: "989012345",
    email: "andre.costa@teup.pt",
    address: "Avenida dos Aliados, 456, Porto",
    joinDate: "2021-01-15",
    role: "Membro"
  }
];

export default function ContactosPage() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("todos");
  const [copiedField, setCopiedField] = useState<string | null>(null);
  
  // Filter members based on search query and active tab
  const filteredMembers = mockMembers.filter(member => {
    const matchesSearch = 
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.instrument.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.role.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === "todos") return matchesSearch;
    if (activeTab === "direcao") return matchesSearch && ["Presidente", "Vice-Presidente", "Tesoureiro"].includes(member.role);
    if (activeTab === "instrumentos") return matchesSearch && member.instrument !== "Voz";
    if (activeTab === "vozes") return matchesSearch && member.instrument === "Voz";
    
    return false;
  });
  
  const copyToClipboard = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    
    setTimeout(() => {
      setCopiedField(null);
    }, 2000);
    
    toast({
      description: "Copiado para a área de transferência",
      duration: 2000
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Contactos</h1>
        <p className="text-muted-foreground mt-1">
          Lista de contactos dos membros da TEUP
        </p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <CardTitle>Membros da Tuna</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Procurar por nome, instrumento..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4">
              <TabsTrigger value="todos">Todos</TabsTrigger>
              <TabsTrigger value="direcao">Direção</TabsTrigger>
              <TabsTrigger value="instrumentos">Instrumentistas</TabsTrigger>
              <TabsTrigger value="vozes">Vozes</TabsTrigger>
            </TabsList>
          </Tabs>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Instrumento</TableHead>
                  <TableHead className="hidden md:table-cell">Função</TableHead>
                  <TableHead>Contacto</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id}>
                      <TableCell className="font-medium">{member.name}</TableCell>
                      <TableCell>{member.instrument}</TableCell>
                      <TableCell className="hidden md:table-cell">{member.role}</TableCell>
                      <TableCell>
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center text-sm">
                            <Phone className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>{member.phone}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-1"
                              onClick={() => copyToClipboard(member.phone, `phone-${member.id}`)}
                            >
                              {copiedField === `phone-${member.id}` ? 
                                <Check className="h-3 w-3 text-green-500" /> : 
                                <Copy className="h-3 w-3" />
                              }
                            </Button>
                          </div>
                          <div className="flex items-center text-sm">
                            <Mail className="h-3.5 w-3.5 mr-1.5 text-muted-foreground" />
                            <span>{member.email}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 ml-1"
                              onClick={() => copyToClipboard(member.email, `email-${member.id}`)}
                            >
                              {copiedField === `email-${member.id}` ? 
                                <Check className="h-3 w-3 text-green-500" /> : 
                                <Copy className="h-3 w-3" />
                              }
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="h-24 text-center">
                      Nenhum membro encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}