"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { FaPaperPlane, FaInbox, FaTimes, FaBook, FaUsers } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";

// Dummy data for demonstration
const contactsList = [
  { id: "1", name: "João Silva", email: "joao.silva@up.pt", category: "Universidade" },
  { id: "2", name: "Ana Ferreira", email: "ana.ferreira@cm-porto.pt", category: "Governo Local" },
  { id: "3", name: "Carlos Martins", email: "carlos.martins@rtp.pt", category: "Média" },
  { id: "4", name: "Beatriz Santos", email: "beatriz@festivaltunaspt.com", category: "Eventos" },
];

const membersList = [
  { id: "1", name: "António Silva", email: "antonio.silva@teup.pt", instrument: "Bandolim" },
  { id: "2", name: "Miguel Santos", email: "miguel.santos@teup.pt", instrument: "Guitarra" },
  { id: "3", name: "Pedro Costa", email: "pedro.costa@teup.pt", instrument: "Viola" },
  { id: "4", name: "Sofia Almeida", email: "sofia.almeida@teup.pt", instrument: "Voz" },
];

const newsletterSubscribers = [
  { id: "1", email: "subscriber1@example.com" },
  { id: "2", email: "subscriber2@example.com" },
  { id: "3", email: "subscriber3@example.com" },
];

// Sample email templates
const emailTemplates = [
  { 
    id: "1", 
    name: "Convite para Evento", 
    subject: "Convite Especial: Atuação da TEUP",
    content: "Prezado(a) [NOME],\n\nTemos o prazer de convidá-lo(a) para prestigiar a próxima atuação da Tuna de Engenharia da Universidade do Porto (TEUP), que acontecerá no dia [DATA] às [HORA] em [LOCAL].\n\nSeria uma honra contar com sua presença neste evento especial.\n\nAtenciosamente,\nTEUP - Tuna de Engenharia da Universidade do Porto"
  },
  { 
    id: "2", 
    name: "Agradecimento", 
    subject: "Agradecimento pela Participação",
    content: "Caro(a) [NOME],\n\nGostaríamos de expressar nossos sinceros agradecimentos pela sua participação/apoio no evento [EVENTO] realizado em [DATA].\n\nSua contribuição foi fundamental para o sucesso do evento.\n\nCordialmente,\nTEUP - Tuna de Engenharia da Universidade do Porto"
  },
  { 
    id: "3", 
    name: "Newsletter", 
    subject: "TEUP - Novidades do Mês",
    content: "Olá,\n\nCompartilhamos as principais novidades da Tuna de Engenharia da Universidade do Porto deste mês:\n\n- [NOVIDADE 1]\n- [NOVIDADE 2]\n- [NOVIDADE 3]\n\nPara mais informações, visite nosso site ou siga-nos nas redes sociais.\n\nAtenciosamente,\nTEUP - Tuna de Engenharia da Universidade do Porto"
  },
];

// Sample email history for demonstration
const emailHistory = [
  { 
    id: "1", 
    sentAt: "2025-04-18T14:30:00", 
    subject: "Convite: Festival de Tunas",
    recipients: ["joao.silva@up.pt", "ana.ferreira@cm-porto.pt"], 
    recipientCount: 2,
    status: "delivered" 
  },
  { 
    id: "2", 
    sentAt: "2025-04-15T10:15:00", 
    subject: "Newsletter TEUP - Abril 2025",
    recipients: ["subscriber1@example.com", "subscriber2@example.com", "subscriber3@example.com"],
    recipientCount: 24,
    status: "delivered" 
  },
  { 
    id: "3", 
    sentAt: "2025-04-10T16:45:00", 
    subject: "Confirmação de ensaio extraordinário",
    recipients: ["antonio.silva@teup.pt", "miguel.santos@teup.pt", "pedro.costa@teup.pt", "sofia.almeida@teup.pt"],
    recipientCount: 12,
    status: "delivered" 
  },
];

export default function EmailPage() {
  const searchParams = useSearchParams();
  const prefilledEmail = searchParams.get('to');
  
  const [selectedTab, setSelectedTab] = useState("compose");
  const [recipients, setRecipients] = useState<string[]>(prefilledEmail ? [prefilledEmail] : []);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // For recipient selection dialogs
  const [showContactsSelection, setShowContactsSelection] = useState(false);
  const [showMembersSelection, setShowMembersSelection] = useState(false);
  const [showSubscribersSelection, setShowSubscribersSelection] = useState(false);
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [selectedSubscribers, setSelectedSubscribers] = useState<string[]>([]);
  const [recipientChips, setRecipientChips] = useState<{email: string, label?: string}[]>([]);

  // Update recipients when prefilledEmail changes
  useEffect(() => {
    if (prefilledEmail) {
      setRecipients([prefilledEmail]);
      setRecipientChips([{ email: prefilledEmail }]);
    }
  }, [prefilledEmail]);

  // Handle template selection
  useEffect(() => {
    if (selectedTemplate && selectedTemplate !== "none") {
      const template = emailTemplates.find(t => t.id === selectedTemplate);
      if (template) {
        setSubject(template.subject);
        setMessage(template.content);
      }
    } else if (selectedTemplate === "none") {
      // Clear the form when "none" is selected
      setSubject("");
      setMessage("");
    }
  }, [selectedTemplate]);

  const handleSendEmail = async () => {
    if (!subject || !message || recipients.length === 0) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    setIsLoading(true);
    
    // Simulate sending email
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setSuccessMessage(`Email enviado com sucesso para ${recipients.length} destinatário(s).`);
    
    // Reset form after success
    setTimeout(() => {
      setSubject("");
      setMessage("");
      setRecipients([]);
      setRecipientChips([]);
      setSelectedTemplate("");
      setSuccessMessage("");
    }, 3000);
  };

  const handleAddSelectedRecipients = (type: 'contacts' | 'members' | 'subscribers') => {
    let newRecipients: string[] = [];
    let newChips: {email: string, label?: string}[] = [];
    
    if (type === 'contacts') {
      const selectedContactItems = contactsList.filter(c => selectedContacts.includes(c.id));
      newRecipients = selectedContactItems.map(c => c.email);
      newChips = selectedContactItems.map(c => ({ email: c.email, label: c.name }));
      setShowContactsSelection(false);
    } else if (type === 'members') {
      const selectedMemberItems = membersList.filter(m => selectedMembers.includes(m.id));
      newRecipients = selectedMemberItems.map(m => m.email);
      newChips = selectedMemberItems.map(m => ({ email: m.email, label: m.name }));
      setShowMembersSelection(false);
    } else {
      const selectedSubscriberItems = newsletterSubscribers.filter(s => selectedSubscribers.includes(s.id));
      newRecipients = selectedSubscriberItems.map(s => s.email);
      newChips = selectedSubscriberItems.map(s => ({ email: s.email }));
      setShowSubscribersSelection(false);
    }
    
    setRecipients(prev => [...prev, ...newRecipients]);
    setRecipientChips(prev => [...prev, ...newChips]);
  };

  const removeRecipient = (email: string) => {
    setRecipients(prev => prev.filter(r => r !== email));
    setRecipientChips(prev => prev.filter(r => r.email !== email));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white mb-2">Gestor de Emails</h2>
        <p className="text-gray-400">
          Envie emails para contatos, membros ou inscritos na newsletter.
        </p>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="compose" className="flex items-center gap-2">
            <FaPaperPlane className="h-4 w-4" />
            Compor Email
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <FaInbox className="h-4 w-4" />
            Histórico de Envios
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Novo Email</CardTitle>
              <CardDescription className="text-gray-400">
                Preencha os campos abaixo para enviar um novo email.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Success Message */}
              {successMessage && (
                <div className="bg-green-900/20 text-green-500 p-4 rounded-md mb-4 flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {successMessage}
                  </div>
                  <button onClick={() => setSuccessMessage("")} className="text-green-500 hover:text-green-400">
                    <FaTimes />
                  </button>
                </div>
              )}
            
              {/* Recipients */}
              <div className="space-y-2">
                <Label htmlFor="recipients">Destinatários</Label>
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <div className="bg-gray-800 border border-gray-700 rounded-md p-2 min-h-10 flex flex-wrap gap-2">
                      {recipientChips.map((recipient, index) => (
                        <div 
                          key={index} 
                          className="bg-gray-700 text-white px-2 py-1 rounded-md flex items-center gap-1 text-sm"
                        >
                          {recipient.label ? `${recipient.label} <${recipient.email}>` : recipient.email}
                          <button 
                            onClick={() => removeRecipient(recipient.email)}
                            className="text-gray-400 hover:text-white ml-1"
                          >
                            <FaTimes size={12} />
                          </button>
                        </div>
                      ))}
                      <Input 
                        id="recipients"
                        className="flex-1 min-w-[120px] bg-transparent border-none focus:ring-0 p-0"
                        placeholder={recipientChips.length ? "" : "Digite endereços de email..."}
                        value=""
                        onChange={(e) => {
                          if (e.target.value.endsWith(',') || e.target.value.endsWith(' ')) {
                            const email = e.target.value.replace(/[, ]$/, '').trim();
                            if (email && !recipients.includes(email)) {
                              setRecipients(prev => [...prev, email]);
                              setRecipientChips(prev => [...prev, { email }]);
                            }
                            e.target.value = '';
                          }
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === 'Tab') {
                            e.preventDefault();
                            const input = e.currentTarget;
                            const email = input.value.trim();
                            if (email && !recipients.includes(email)) {
                              setRecipients(prev => [...prev, email]);
                              setRecipientChips(prev => [...prev, { email }]);
                              input.value = '';
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                  <Button 
                    variant="secondary" 
                    className="flex items-center gap-1"
                    onClick={() => setShowContactsSelection(true)}
                  >
                    <FaBook className="h-4 w-4" />
                    Contactos
                  </Button>
                  <Button 
                    variant="secondary" 
                    className="flex items-center gap-1"
                    onClick={() => setShowMembersSelection(true)}
                  >
                    <FaUsers className="h-4 w-4" />
                    Membros
                  </Button>
                </div>
                <p className="text-xs text-gray-500">
                  {recipients.length} destinatário(s) selecionado(s)
                </p>
              </div>

              {/* Template Selection */}
              <div className="space-y-2">
                <Label htmlFor="template">Modelo de Email</Label>
                <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione um modelo..." />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="none">Nenhum (em branco)</SelectItem>
                    {emailTemplates.map(template => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <Label htmlFor="subject">Assunto</Label>
                <Input 
                  id="subject"
                  className="bg-gray-800 border-gray-700"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                />
              </div>
              
              {/* Message */}
              <div className="space-y-2">
                <Label htmlFor="message">Mensagem</Label>
                <Textarea 
                  id="message"
                  className="bg-gray-800 border-gray-700 min-h-[200px]"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </div>

              {/* Send Button */}
              <Button 
                className="w-full mt-4 flex items-center justify-center gap-2" 
                disabled={isLoading || !subject || !message || recipients.length === 0}
                onClick={handleSendEmail}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white"></div>
                    Enviando...
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="h-4 w-4" />
                    Enviar Email
                  </>
                )}
              </Button>
            </CardContent>
          </Card>
          
          {/* Contact Selection Dialog */}
          {showContactsSelection && (
            <Card className="border-gray-800 bg-gray-900 mt-4">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-lg">Selecionar Contactos</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowContactsSelection(false)}
                  >
                    <FaTimes />
                    <span className="sr-only">Fechar</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Buscar contactos..."
                      className="bg-gray-800 border-gray-700 pl-9"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto space-y-2">
                    {contactsList.map(contact => (
                      <div key={contact.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`contact-${contact.id}`} 
                          checked={selectedContacts.includes(contact.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedContacts(prev => [...prev, contact.id]);
                            } else {
                              setSelectedContacts(prev => prev.filter(id => id !== contact.id));
                            }
                          }}
                        />
                        <Label htmlFor={`contact-${contact.id}`} className="text-white">
                          {contact.name} <span className="text-gray-400 text-sm">({contact.email})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between pt-2 border-t border-gray-800">
                    <Button variant="outline" onClick={() => setShowContactsSelection(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => handleAddSelectedRecipients('contacts')}>
                      Adicionar Selecionados ({selectedContacts.length})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
          
          {/* Members Selection Dialog */}
          {showMembersSelection && (
            <Card className="border-gray-800 bg-gray-900 mt-4">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-white text-lg">Selecionar Membros</CardTitle>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowMembersSelection(false)}
                  >
                    <FaTimes />
                    <span className="sr-only">Fechar</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-4">
                  <div className="relative">
                    <Input
                      placeholder="Buscar membros..."
                      className="bg-gray-800 border-gray-700 pl-9"
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  </div>
                  
                  <div className="max-h-[300px] overflow-y-auto space-y-2">
                    {membersList.map(member => (
                      <div key={member.id} className="flex items-center space-x-2">
                        <Checkbox 
                          id={`member-${member.id}`} 
                          checked={selectedMembers.includes(member.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedMembers(prev => [...prev, member.id]);
                            } else {
                              setSelectedMembers(prev => prev.filter(id => id !== member.id));
                            }
                          }}
                        />
                        <Label htmlFor={`member-${member.id}`} className="text-white">
                          {member.name} <span className="text-gray-400 text-sm">({member.email})</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex justify-between pt-2 border-t border-gray-800">
                    <Button variant="outline" onClick={() => setShowMembersSelection(false)}>
                      Cancelar
                    </Button>
                    <Button onClick={() => handleAddSelectedRecipients('members')}>
                      Adicionar Selecionados ({selectedMembers.length})
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="border-gray-800 bg-gray-900">
            <CardHeader>
              <CardTitle className="text-white">Histórico de Emails</CardTitle>
              <CardDescription className="text-gray-400">
                Visualize os emails enviados recentemente.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {emailHistory.map(email => (
                  <div 
                    key={email.id} 
                    className="border border-gray-800 rounded-lg p-4 hover:bg-gray-800/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-white">{email.subject}</h3>
                      <span className="text-sm text-gray-400">{formatDate(email.sentAt)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-400">
                        Enviado para {email.recipientCount} destinatário(s)
                      </div>
                      <span 
                        className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          email.status === 'delivered' ? 'bg-green-900/20 text-green-500' : 'bg-amber-900/20 text-amber-500'
                        }`}
                      >
                        {email.status === 'delivered' ? 'Entregue' : 'Pendente'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}