"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Send } from "lucide-react";

interface Member {
  id: string;
  name: string;
  email: string;
}

// Mock member data
const mockMembers: Member[] = [
  { id: "1", name: "João Tuno", email: "joao.tuno@teup.pt" },
  { id: "2", name: "Miguel Tuno", email: "miguel.tuno@teup.pt" },
  { id: "3", name: "António Silva", email: "antonio.silva@teup.pt" },
  { id: "4", name: "Pedro Santos", email: "pedro.santos@teup.pt" },
  { id: "5", name: "Ricardo Pereira", email: "ricardo.pereira@teup.pt" },
];

const groupOptions = [
  { id: "all", name: "Todos os Membros" },
  { id: "musicians", name: "Músicos" },
  { id: "vocals", name: "Vozes" },
  { id: "direction", name: "Direção" },
];

export default function EmailsPage() {
  const { toast } = useToast();
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [recipient, setRecipient] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!recipient || !subject || !message) {
      toast({
        title: "Campos em falta",
        description: "Por favor preencha todos os campos necessários.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSending(true);
    
    // Simulate sending email
    setTimeout(() => {
      setIsSending(false);
      setShowSuccess(true);
      
      setSubject("");
      setMessage("");
      setRecipient("");
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setShowSuccess(false);
      }, 3000);
      
      toast({
        title: "Email enviado",
        description: "O seu email foi enviado com sucesso.",
      });
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Emails</h1>
        <p className="text-muted-foreground mt-1">
          Comunique com outros membros da TEUP
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Enviar Email</CardTitle>
            <CardDescription>
              Envie um email para um membro ou grupo de membros
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="recipient" className="text-sm font-medium">
                  Destinatário
                </label>
                <Select
                  value={recipient}
                  onValueChange={setRecipient}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um destinatário" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="group">-- Grupos --</SelectItem>
                    {groupOptions.map(group => (
                      <SelectItem key={group.id} value={`group-${group.id}`}>
                        {group.name}
                      </SelectItem>
                    ))}
                    <SelectItem value="individual">-- Membros Individuais --</SelectItem>
                    {mockMembers.map(member => (
                      <SelectItem key={member.id} value={member.id}>
                        {member.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Assunto
                </label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Assunto do email"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Mensagem
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Escreva a sua mensagem aqui..."
                  rows={8}
                />
              </div>
            </CardContent>
            <CardFooter>
              {!showSuccess ? (
                <Button type="submit" disabled={isSending}>
                  {isSending ? (
                    "A enviar..."
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Enviar Email
                    </>
                  )}
                </Button>
              ) : (
                <Button variant="outline" className="text-green-600 border-green-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Email enviado com sucesso!
                </Button>
              )}
            </CardFooter>
          </form>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Contactos Recentes</CardTitle>
            <CardDescription>
              Membros com quem comunicou recentemente
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {mockMembers.slice(0, 4).map(member => (
                <li key={member.id} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-sm font-medium">
                    {member.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{member.name}</p>
                    <p className="text-xs text-muted-foreground truncate">{member.email}</p>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => {
                      setRecipient(member.id);
                      document.getElementById("subject")?.focus();
                    }}
                    title="Enviar email"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}