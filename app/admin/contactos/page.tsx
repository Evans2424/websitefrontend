"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FaEye, FaTrash, FaStar, FaRegStar, FaSearch } from "react-icons/fa";

// Sample data for demonstration
const initialContacts = [
  { 
    id: "1", 
    name: "João Silva", 
    email: "joao.silva@example.com", 
    phone: "+351 912 345 678", 
    subject: "Informações sobre atuações", 
    message: "Olá, gostaria de saber mais sobre as vossas próximas atuações e se é possível contratá-los para um evento privado. Obrigado!",
    date: "2025-04-18T14:30:00",
    starred: true
  },
  { 
    id: "2", 
    name: "Maria Costa", 
    email: "maria.costa@example.com", 
    phone: "+351 923 456 789", 
    subject: "Possível colaboração", 
    message: "Bom dia, represento uma associação cultural e gostaria de saber se estão interessados numa colaboração para um evento no próximo mês.",
    date: "2025-04-16T09:15:00",
    starred: false
  },
  { 
    id: "3", 
    name: "André Santos", 
    email: "andre.santos@example.com", 
    phone: "+351 934 567 890", 
    subject: "Entrevista para jornal universitário",
    message: "Olá! Sou editor do jornal universitário e gostaria de fazer uma entrevista com algum membro da direção sobre a história da tuna e projetos futuros.",
    date: "2025-04-15T11:45:00",
    starred: false
  },
  { 
    id: "4", 
    name: "Carla Ferreira", 
    email: "carla.ferreira@example.com", 
    phone: "+351 945 678 901", 
    subject: "Aulas de guitarra", 
    message: "Boa tarde, gostaria de saber se dão aulas de guitarra ou se poderiam recomendar um professor.",
    date: "2025-04-14T16:20:00",
    starred: true
  },
  { 
    id: "5", 
    name: "Pedro Oliveira", 
    email: "pedro.oliveira@example.com", 
    phone: "+351 956 789 012", 
    subject: "CD's disponíveis", 
    message: "Olá, onde posso adquirir o vosso último CD? Obrigado!",
    date: "2025-04-12T10:30:00",
    starred: false
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedContact, setSelectedContact] = useState<(typeof initialContacts)[0] | null>(null);
  const [viewOpen, setViewOpen] = useState(false);
  
  const filteredContacts = contacts.filter(
    contact => 
      contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contact.subject.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStar = (id: string) => {
    setContacts(contacts.map(contact => 
      contact.id === id ? { ...contact, starred: !contact.starred } : contact
    ));
  };
  
  const handleDelete = (id: string) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };
  
  const handleView = (contact: typeof initialContacts[0]) => {
    setSelectedContact(contact);
    setViewOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Gerenciar Contatos</h2>
          <p className="text-gray-400">Visualize e gerencie os contatos recebidos</p>
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
          <Input
            placeholder="Pesquisar contatos..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-900 border-gray-800 text-white"
          />
        </div>
      </div>
      
      <div className="rounded-md border border-gray-800 overflow-hidden">
        <Table>
          <TableHeader className="bg-gray-900">
            <TableRow>
              <TableHead className="text-gray-400 w-10"></TableHead>
              <TableHead className="text-gray-400">Nome</TableHead>
              <TableHead className="text-gray-400">Email</TableHead>
              <TableHead className="text-gray-400">Telefone</TableHead>
              <TableHead className="text-gray-400">Assunto</TableHead>
              <TableHead className="text-gray-400">Data</TableHead>
              <TableHead className="text-gray-400 text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContacts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                  Nenhum contato encontrado.
                </TableCell>
              </TableRow>
            ) : (
              filteredContacts.map((contact) => (
                <TableRow key={contact.id} className="border-gray-800 hover:bg-gray-900/60">
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      onClick={() => handleToggleStar(contact.id)}
                      className="h-8 w-8"
                    >
                      {contact.starred ? 
                        <FaStar className="h-4 w-4 text-yellow-500" /> : 
                        <FaRegStar className="h-4 w-4 text-gray-500" />
                      }
                      <span className="sr-only">Destacar</span>
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium text-white">{contact.name}</TableCell>
                  <TableCell className="text-gray-300">{contact.email}</TableCell>
                  <TableCell className="text-gray-300">{contact.phone}</TableCell>
                  <TableCell className="text-gray-300">{contact.subject}</TableCell>
                  <TableCell className="text-gray-300">
                    {new Date(contact.date).toLocaleDateString('pt-PT')}
                  </TableCell>
                  <TableCell className="text-right space-x-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleView(contact)}
                      className="h-8 w-8 text-blue-500 hover:text-blue-600 hover:bg-blue-900/20"
                    >
                      <FaEye className="h-4 w-4" />
                      <span className="sr-only">Ver</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(contact.id)}
                      className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-900/20"
                    >
                      <FaTrash className="h-4 w-4" />
                      <span className="sr-only">Apagar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* View Contact Dialog */}
      <Dialog open={viewOpen} onOpenChange={setViewOpen}>
        <DialogContent className="bg-gray-950 text-white border-gray-800 sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle className="text-xl text-white">Detalhes do Contato</DialogTitle>
            <DialogDescription className="text-gray-400">
              Informações completas do contato selecionado.
            </DialogDescription>
          </DialogHeader>
          {selectedContact && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400">Nome</h4>
                <p className="text-white">{selectedContact.name}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Email</h4>
                <p className="text-white">{selectedContact.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Telefone</h4>
                <p className="text-white">{selectedContact.phone}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Assunto</h4>
                <p className="text-white">{selectedContact.subject}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Data</h4>
                <p className="text-white">
                  {new Date(selectedContact.date).toLocaleDateString('pt-PT', {
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400">Mensagem</h4>
                <p className="text-white whitespace-pre-wrap border border-gray-800 rounded-md p-3 bg-gray-900">
                  {selectedContact.message}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setViewOpen(false)}
              className="mt-2"
            >
              Fechar
            </Button>
            <Button
              variant="default"
              onClick={() => {
                // In a real application, this would open an email client or send a reply
                window.location.href = `mailto:${selectedContact?.email}?subject=Re: ${selectedContact?.subject}`;
                setViewOpen(false);
              }}
            >
              Responder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}