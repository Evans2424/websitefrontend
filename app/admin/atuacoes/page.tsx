"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEye, FaCalendarAlt, FaImage, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Sample performances data for demonstration
interface Performance {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  address?: string;
  summary: string;
  content: string;
  image?: string;
  ticketPrice?: string;
  ticketLink?: string;
  published: boolean;
  slug?: string;
}

const initialPerformances: Performance[] = [
  {
    id: 1,
    title: "Festival Internacional de Tunas",
    date: "2025-05-15",
    time: "21:00",
    location: "Coimbra, Portugal",
    address: "Grande Auditório da Universidade de Coimbra, Coimbra",
    summary: "A TEUP participará no prestigiado Festival Internacional de Tunas em Coimbra, competindo com tunas de toda a Europa.",
    content: "A TEUP tem a honra de participar no prestigiado Festival Internacional de Tunas em Coimbra, um dos eventos mais importantes do calendário tunante. Este festival, que celebra a sua 25ª edição, reúne as melhores tunas académicas de Portugal, Espanha e outros países europeus. A competição decorrerá no Grande Auditório da Universidade de Coimbra, com capacidade para mais de 1000 espectadores. Cada tuna terá 15 minutos para apresentar o seu repertório, sendo avaliada por um júri composto por professores de música e antigos tunos de renome. A TEUP preparou um programa especial para esta ocasião, incluindo clássicas baladas portuguesas e uma surpresa musical que promete impressionar o júri e o público. Os bilhetes para o evento já estão à venda e podem ser adquiridos através do site do festival ou na bilheteira da Universidade de Coimbra. Venha apoiar a TEUP neste importante evento!",
    image: "/images/teup-flag-performance.png",
    ticketPrice: "10€ - 15€",
    ticketLink: "https://festivaltunascoimbra.pt/bilhetes",
    published: true,
    slug: "festival-internacional-tunas-coimbra"
  },
  {
    id: 2,
    title: "Celebração do Aniversário da FEUP",
    date: "2025-06-10",
    time: "21:00",
    location: "Auditório da FEUP, Porto",
    address: "Faculdade de Engenharia da Universidade do Porto, R. Dr. Roberto Frias, 4200-465 Porto",
    summary: "Concerto especial para celebrar o aniversário da Faculdade de Engenharia da Universidade do Porto.",
    content: "A TEUP apresentará um concerto especial para celebrar o aniversário da Faculdade de Engenharia da Universidade do Porto. Este evento faz parte das comemorações oficiais da FEUP e contará com a presença de autoridades académicas, professores, alunos e ex-alunos. O concerto terá lugar no Auditório da FEUP, com início às 21h00. O programa incluirá um repertório que percorre a história da TEUP e da própria faculdade, com músicas que marcaram diferentes épocas ao longo das últimas décadas. Haverá também um momento especial de homenagem aos antigos membros da tuna, com a participação de alguns veteranos que se juntarão ao grupo para interpretar peças clássicas do repertório. A entrada é gratuita, mas sujeita à lotação da sala. Os interessados devem levantar o seu convite na Associação de Estudantes da FEUP a partir de 1 de Junho. Não perca esta oportunidade de celebrar connosco a história e as tradições da nossa faculdade!",
    image: "/images/teup-dance-performance.png",
    ticketPrice: "Entrada gratuita (sujeita a lotação)",
    published: true,
    slug: "aniversario-feup"
  },
  {
    id: 3,
    title: "Intercâmbio Cultural em Nice",
    date: "2025-07-22",
    time: "19:30",
    location: "Nice, França",
    address: "Place Masséna, Nice, França",
    summary: "A TEUP representará Portugal num intercâmbio cultural com grupos musicais universitários europeus.",
    content: "A TEUP terá a honra de representar Portugal num importante intercâmbio cultural com grupos musicais universitários europeus, a realizar-se em Nice, França. Este evento, organizado pela Federação Europeia de Música Universitária, reúne anualmente grupos de diferentes tradições musicais académicas para promover o intercâmbio cultural e a amizade entre estudantes europeus. Durante uma semana, a TEUP participará em workshops, concertos conjuntos e apresentações individuais em vários locais emblemáticos da cidade francesa, incluindo a famosa Promenade des Anglais e a Place Masséna. Além das atuações, o programa inclui visitas culturais e momentos de convívio com os outros grupos participantes, provenientes de países como França, Espanha, Itália, Alemanha e Polónia. Esta será uma oportunidade única para a TEUP divulgar a cultura musical académica portuguesa e estabelecer contactos para futuras colaborações internacionais. A participação da TEUP neste evento é parcialmente financiada pela Universidade do Porto e pelo Instituto Camões.",
    image: "/images/teup-nice.png",
    published: true,
    slug: "intercambio-nice-franca"
  },
  {
    id: 4,
    title: "Concerto de Natal",
    date: "2025-12-18",
    time: "20:00",
    location: "Igreja da Lapa, Porto",
    address: "Igreja da Lapa, Porto, Portugal",
    summary: "Tradicional concerto natalício, com repertório especial e convidados.",
    content: "A Tuna de Engenharia da Universidade do Porto tem o prazer de convidar para o seu tradicional Concerto de Natal, a realizar-se na histórica Igreja da Lapa. Este evento especial contará com um repertório cuidadosamente selecionado que incluirá tanto peças tradicionais natalícias como obras clássicas do repertório tunante. Para tornar a noite ainda mais memorável, contaremos com a participação especial do Coro da Universidade do Porto e de alguns solistas convidados. O concerto terá início às 20h00 e a entrada é gratuita, estando sujeita à capacidade da igreja. Sugerimos a chegada com antecedência para garantir lugar. Este concerto é também uma ação de solidariedade, sendo que à entrada serão recolhidos alimentos não perecíveis para serem doados a instituições de caridade locais. Venha celebrar connosco esta quadra festiva e contribuir para uma causa nobre!",
    image: "/images/teup-performance.png",
    ticketPrice: "Entrada livre (Recolha de alimentos para caridade)",
    published: false,
    slug: "concerto-natal-2025"
  }
];

export default function PerformancesManagement() {
  const [performances, setPerformances] = useState<Performance[]>(initialPerformances);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPerformance, setCurrentPerformance] = useState<Performance | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for adding/editing performances
  const [formData, setFormData] = useState<Performance>({
    id: 0,
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    time: "19:00",
    location: "",
    address: "",
    summary: "",
    content: "",
    image: "",
    ticketPrice: "",
    ticketLink: "",
    published: false,
    slug: ""
  });

  const filteredPerformances = performances.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    format(new Date(item.date), "dd/MM/yyyy").includes(searchTerm)
  );

  const handleAddPerformance = () => {
    setIsLoading(true);
    
    // Generate slug from title if not provided
    if (!formData.slug) {
      formData.slug = formData.title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
    }
    
    // Simulate API call
    setTimeout(() => {
      const newId = Math.max(...performances.map(item => item.id), 0) + 1;
      setPerformances([...performances, { ...formData, id: newId }]);
      setFormData({
        id: 0,
        title: "",
        date: format(new Date(), "yyyy-MM-dd"),
        time: "19:00",
        location: "",
        address: "",
        summary: "",
        content: "",
        image: "",
        ticketPrice: "",
        ticketLink: "",
        published: false,
        slug: ""
      });
      setIsAddDialogOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdatePerformance = () => {
    if (currentPerformance) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setPerformances(performances.map(item => 
          item.id === currentPerformance.id ? currentPerformance : item
        ));
        setIsEditDialogOpen(false);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleDeletePerformance = () => {
    if (currentPerformance) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setPerformances(performances.filter(item => item.id !== currentPerformance.id));
        setIsDeleteDialogOpen(false);
        setIsLoading(false);
      }, 1000);
    }
  };

  const formatDisplayDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "d 'de' MMMM, yyyy", { locale: ptBR });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Gestão de Atuações</h2>
          <p className="text-gray-400">
            Gerencie informações sobre as atuações e eventos da TEUP.
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <FaPlus className="mr-1" /> Nova Atuação
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Atuação</DialogTitle>
              <DialogDescription className="text-gray-400">
                Preencha os detalhes da atuação para publicação no site.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Nome do Evento</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Festival, Concerto, etc."
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="date">Data</Label>
                    <Input 
                      id="date" 
                      type="date"
                      value={formData.date} 
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="time">Hora</Label>
                    <Input 
                      id="time" 
                      type="time"
                      value={formData.time} 
                      onChange={(e) => setFormData({...formData, time: e.target.value})}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Local</Label>
                  <Input 
                    id="location" 
                    value={formData.location} 
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Cidade ou venue principal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Endereço Completo</Label>
                  <Input 
                    id="address" 
                    value={formData.address || ""} 
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Rua, número, cidade, etc."
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="summary">Resumo</Label>
                <Textarea 
                  id="summary" 
                  value={formData.summary} 
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  className="bg-gray-800 border-gray-700 resize-none h-20"
                  placeholder="Breve descrição da atuação (será exibido na página inicial)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Descrição Completa</Label>
                <Textarea 
                  id="content" 
                  value={formData.content} 
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="bg-gray-800 border-gray-700 resize-none h-64"
                  placeholder="Detalhes completos sobre o evento, programa, etc."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="image" className="flex items-center gap-2">
                    <FaImage className="text-gray-400" />
                    Imagem (URL)
                  </Label>
                  <Input 
                    id="image" 
                    value={formData.image || ""} 
                    onChange={(e) => setFormData({...formData, image: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                    placeholder="/images/nome-da-imagem.jpg"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="slug">Slug (URL personalizada)</Label>
                  <Input 
                    id="slug" 
                    value={formData.slug || ""} 
                    onChange={(e) => setFormData({...formData, slug: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                    placeholder="nome-do-evento"
                  />
                  <p className="text-xs text-gray-500">
                    Deixe em branco para gerar automaticamente a partir do título
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="ticketPrice">Preço dos Bilhetes</Label>
                  <Input 
                    id="ticketPrice" 
                    value={formData.ticketPrice || ""} 
                    onChange={(e) => setFormData({...formData, ticketPrice: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Exemplo: 5€ - 10€ ou Entrada livre"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="ticketLink">Link para Compra de Bilhetes</Label>
                  <Input 
                    id="ticketLink" 
                    value={formData.ticketLink || ""} 
                    onChange={(e) => setFormData({...formData, ticketLink: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                    placeholder="https://..."
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="published" 
                  className="rounded text-red-600 focus:ring-red-500 bg-gray-800 border-gray-700"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                />
                <Label htmlFor="published">Publicar imediatamente</Label>
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsAddDialogOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleAddPerformance}
                disabled={!formData.title || !formData.location || !formData.summary || !formData.content || !formData.date || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white mr-2"></div>
                    Salvando...
                  </>
                ) : "Adicionar Atuação"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Lista de Atuações</CardTitle>
              <CardDescription className="text-gray-400">
                Total de {filteredPerformances.length} atuações.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Buscar atuações..."
                  className="pl-9 bg-gray-800 border-gray-700 w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-400">Evento</TableHead>
                  <TableHead className="text-gray-400">Data</TableHead>
                  <TableHead className="text-gray-400">Local</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPerformances.length > 0 ? (
                  filteredPerformances.map((item) => (
                    <TableRow key={item.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell className="font-medium text-white">{item.title}</TableCell>
                      <TableCell className="text-gray-300 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="flex items-center gap-2">
                            <FaCalendarAlt className="text-gray-500" />
                            {format(new Date(item.date), "dd/MM/yyyy")}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                            <FaClock className="text-gray-500" />
                            {item.time}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">
                        <div className="flex items-center gap-1">
                          <FaMapMarkerAlt className="text-gray-500 flex-shrink-0" />
                          <span>{item.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          item.published ? 'bg-green-900/20 text-green-500' : 'bg-amber-900/20 text-amber-500'
                        }`}>
                          {item.published ? 'Publicado' : 'Rascunho'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              setCurrentPerformance(item);
                              setIsViewDialogOpen(true);
                            }}
                            title="Visualizar"
                          >
                            <FaEye className="text-blue-500 hover:text-blue-400" />
                            <span className="sr-only">Visualizar</span>
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              setCurrentPerformance(item);
                              setIsEditDialogOpen(true);
                            }}
                            title="Editar"
                          >
                            <FaEdit className="text-gray-400 hover:text-white" />
                            <span className="sr-only">Editar</span>
                          </Button>
                          
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => {
                              setCurrentPerformance(item);
                              setIsDeleteDialogOpen(true);
                            }}
                            title="Excluir"
                          >
                            <FaTrash className="text-red-500 hover:text-red-400" />
                            <span className="sr-only">Excluir</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="h-24 text-center">
                      Nenhuma atuação encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* View Dialog */}
      {currentPerformance && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{currentPerformance.title}</DialogTitle>
              <DialogDescription className="text-gray-400 flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                <div className="flex items-center gap-2">
                  <FaCalendarAlt /> 
                  {formatDisplayDate(currentPerformance.date)} às {currentPerformance.time}
                </div>
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt /> 
                  {currentPerformance.location}
                </div>
              </DialogDescription>
            </DialogHeader>
            
            {currentPerformance.image && (
              <div className="rounded-md overflow-hidden mb-4 max-h-[300px]">
                <img 
                  src={currentPerformance.image} 
                  alt={currentPerformance.title}
                  className="w-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Resumo</h3>
                <p className="text-white bg-gray-800 p-3 rounded-md">{currentPerformance.summary}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Descrição Completa</h3>
                <div className="text-white bg-gray-800 p-3 rounded-md whitespace-pre-wrap">
                  {currentPerformance.content}
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentPerformance.address && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Endereço Completo</h3>
                    <p className="text-white bg-gray-800 p-3 rounded-md">{currentPerformance.address}</p>
                  </div>
                )}
                
                {currentPerformance.ticketPrice && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-1">Bilhetes</h3>
                    <div className="text-white bg-gray-800 p-3 rounded-md">
                      <p>{currentPerformance.ticketPrice}</p>
                      {currentPerformance.ticketLink && (
                        <a 
                          href={currentPerformance.ticketLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-red-500 hover:underline mt-1 inline-block"
                        >
                          Comprar bilhetes
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Status</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    currentPerformance.published ? 'bg-green-900/20 text-green-500' : 'bg-amber-900/20 text-amber-500'
                  }`}>
                    {currentPerformance.published ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">URL Personalizada</h3>
                  <p className="text-gray-300">{currentPerformance.slug || "Padrão (baseada no ID)"}</p>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setIsViewDialogOpen(false)}
              >
                Fechar
              </Button>
              <Button 
                onClick={() => {
                  setIsViewDialogOpen(false);
                  setIsEditDialogOpen(true);
                }}
              >
                Editar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Edit Dialog */}
      {currentPerformance && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>Editar Atuação</DialogTitle>
              <DialogDescription className="text-gray-400">
                Atualize os detalhes da atuação.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Nome do Evento</Label>
                  <Input 
                    id="edit-title" 
                    value={currentPerformance.title} 
                    onChange={(e) => setCurrentPerformance({...currentPerformance, title: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-2">
                    <Label htmlFor="edit-date">Data</Label>
                    <Input 
                      id="edit-date" 
                      type="date"
                      value={currentPerformance.date} 
                      onChange={(e) => setCurrentPerformance({...currentPerformance, date: e.target.value})}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="edit-time">Hora</Label>
                    <Input 
                      id="edit-time" 
                      type="time"
                      value={currentPerformance.time} 
                      onChange={(e) => setCurrentPerformance({...currentPerformance, time: e.target.value})}
                      className="bg-gray-800 border-gray-700"
                    />
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-location">Local</Label>
                  <Input 
                    id="edit-location" 
                    value={currentPerformance.location} 
                    onChange={(e) => setCurrentPerformance({...currentPerformance, location: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-address">Endereço Completo</Label>
                  <Input 
                    id="edit-address" 
                    value={currentPerformance.address || ""} 
                    onChange={(e) => setCurrentPerformance({...currentPerformance, address: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-summary">Resumo</Label>
                <Textarea 
                  id="edit-summary" 
                  value={currentPerformance.summary} 
                  onChange={(e) => setCurrentPerformance({...currentPerformance, summary: e.target.value})}
                  className="bg-gray-800 border-gray-700 resize-none h-20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-content">Descrição Completa</Label>
                <Textarea 
                  id="edit-content" 
                  value={currentPerformance.content} 
                  onChange={(e) => setCurrentPerformance({...currentPerformance, content: e.target.value})}
                  className="bg-gray-800 border-gray-700 resize-none h-64"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-image" className="flex items-center gap-2">
                    <FaImage className="text-gray-400" />
                    Imagem (URL)
                  </Label>
                  <Input 
                    id="edit-image" 
                    value={currentPerformance.image || ""} 
                    onChange={(e) => setCurrentPerformance({...currentPerformance, image: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-slug">Slug (URL personalizada)</Label>
                  <Input 
                    id="edit-slug" 
                    value={currentPerformance.slug || ""} 
                    onChange={(e) => setCurrentPerformance({...currentPerformance, slug: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-ticketPrice">Preço dos Bilhetes</Label>
                  <Input 
                    id="edit-ticketPrice" 
                    value={currentPerformance.ticketPrice || ""} 
                    onChange={(e) => setCurrentPerformance({...currentPerformance, ticketPrice: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-ticketLink">Link para Compra de Bilhetes</Label>
                  <Input 
                    id="edit-ticketLink" 
                    value={currentPerformance.ticketLink || ""} 
                    onChange={(e) => setCurrentPerformance({...currentPerformance, ticketLink: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="edit-published" 
                  className="rounded text-red-600 focus:ring-red-500 bg-gray-800 border-gray-700"
                  checked={currentPerformance.published}
                  onChange={(e) => setCurrentPerformance({...currentPerformance, published: e.target.checked})}
                />
                <Label htmlFor="edit-published">Publicado</Label>
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsEditDialogOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                onClick={handleUpdatePerformance}
                disabled={!currentPerformance.title || !currentPerformance.location || !currentPerformance.summary || !currentPerformance.content || !currentPerformance.date || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white mr-2"></div>
                    Salvando...
                  </>
                ) : "Salvar Alterações"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
      
      {/* Delete Dialog */}
      {currentPerformance && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription className="text-gray-400">
                Tem certeza que deseja excluir esta atuação? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <p className="text-white font-medium">{currentPerformance.title}</p>
              <div className="flex items-center gap-2 mt-1 text-gray-400">
                <FaCalendarAlt className="text-gray-500" />
                {format(new Date(currentPerformance.date), "dd/MM/yyyy")} - {currentPerformance.location}
              </div>
            </div>

            <DialogFooter>
              <Button 
                variant="outline" 
                onClick={() => setIsDeleteDialogOpen(false)}
                disabled={isLoading}
              >
                Cancelar
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeletePerformance}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white mr-2"></div>
                    Excluindo...
                  </>
                ) : "Excluir"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}