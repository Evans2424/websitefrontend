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
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEye, FaCalendarAlt, FaImage } from "react-icons/fa";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Sample news data for demonstration
interface NewsItem {
  id: number;
  title: string;
  date: string;
  summary: string;
  content: string;
  image?: string;
  published: boolean;
  slug?: string;
}

const initialNews: NewsItem[] = [
  {
    id: 1,
    title: "TEUP vence Festival Internacional de Tunas",
    date: "2025-03-15",
    summary: "A Tuna de Engenharia da Universidade do Porto conquistou o primeiro lugar no prestigiado Festival Internacional de Tunas em Coimbra.",
    content: "A Tuna de Engenharia da Universidade do Porto (TEUP) conquistou o primeiro lugar no prestigiado Festival Internacional de Tunas em Coimbra. Após uma atuação memorável que incluiu clássicos do repertório tunante e algumas inovações musicais, o júri decidiu por unanimidade atribuir o prémio principal à nossa tuna. Este reconhecimento vem coroar meses de ensaios intensivos e dedicação de todos os membros. A competição contou com a participação de 12 tunas de diferentes países, incluindo Espanha, Brasil e Itália. Além do prémio principal, a TEUP também arrecadou o prémio de 'Melhor Instrumental' e 'Melhor Solista' para o nosso bandolinista António Ferreira. A vitória neste festival abre portas para futuras participações em eventos internacionais e consolida a posição da TEUP como uma das melhores tunas académicas de Portugal.",
    image: "/images/teup-flag-performance.png",
    published: true,
    slug: "teup-vence-festival-internacional"
  },
  {
    id: 2,
    title: "Novo CD 'Tradição Engenheira' já disponível",
    date: "2025-02-28",
    summary: "O mais recente trabalho da TEUP já está disponível em todas as plataformas digitais e na nossa loja online.",
    content: "É com grande orgulho que anunciamos o lançamento do nosso novo álbum 'Tradição Engenheira'. Este trabalho representa dois anos de dedicação e paixão pela música tradicional portuguesa, reinterpretada com o estilo único da TEUP. O álbum contém 12 faixas, incluindo clássicos do repertório tunante e três composições originais dos nossos membros. As gravações foram realizadas nos estúdios da Faculdade de Engenharia, com produção de João Silva, nosso atual Ensaiador. 'Tradição Engenheira' já está disponível em todas as plataformas digitais como Spotify, Apple Music e YouTube Music. Também é possível adquirir a versão física do CD através da nossa loja online ou nos nossos concertos. Parte das receitas das vendas será destinada ao fundo de bolsas para estudantes de Engenharia da UP. Agradecemos a todos que tornaram este projeto possível e esperamos que apreciem o resultado do nosso trabalho.",
    image: "/images/teup-musicians.png",
    published: true,
    slug: "novo-cd-tradicao-engenheira"
  },
  {
    id: 3,
    title: "Inscrições abertas para novos tunos",
    date: "2025-01-10",
    summary: "Estão abertas as inscrições para estudantes de Engenharia que queiram juntar-se à TEUP. As audições decorrerão durante o mês de Fevereiro.",
    content: "A Tuna de Engenharia da Universidade do Porto (TEUP) anuncia a abertura de inscrições para novos membros. Convidamos todos os estudantes da Faculdade de Engenharia que tenham interesse em música e nas tradições académicas a candidatarem-se. Procuramos principalmente instrumentistas de cordas (violão, bandolim, viola, cavaquinho), mas também estamos abertos a outros instrumentos e vozes. Não é necessário ter experiência prévia ou formação musical formal - o mais importante é a vontade de aprender e o compromisso com o grupo. As inscrições podem ser feitas através do formulário disponível no nosso site até 31 de Janeiro. As audições decorrerão durante o mês de Fevereiro, e os resultados serão anunciados até 15 de Março. Os selecionados passarão por um período de integração de seis meses antes de se tornarem membros efetivos. Junte-se a nós e faça parte desta tradição que já dura mais de três décadas!",
    image: "/images/teup-university.png",
    published: true,
    slug: "inscricoes-novos-tunos"
  },
  {
    id: 4,
    title: "Parceria com a Faculdade de Belas Artes",
    date: "2025-04-05",
    summary: "Nova colaboração entre a TEUP e estudantes de Belas Artes para criação de materiais visuais.",
    content: "A TEUP tem o prazer de anunciar uma nova parceria com os estudantes da Faculdade de Belas Artes da Universidade do Porto. Este projeto inovador visa unir música e artes visuais, com os estudantes de Belas Artes criando cartazes, vídeos e outros materiais visuais para os eventos e apresentações da TEUP. A iniciativa surgiu após o sucesso da colaboração pontual para o nosso último festival e agora se torna um projeto contínuo. Os estudantes terão a oportunidade de desenvolver seu portfólio com trabalhos reais, enquanto a TEUP se beneficia de materiais promocionais de alta qualidade e artisticamente relevantes. O primeiro resultado desta parceria será o design da capa do nosso próximo EP digital, previsto para lançamento em junho. Agradecemos ao professor Manuel Oliveira por facilitar esta colaboração e aos talentosos estudantes que já estão trabalhando conosco.",
    image: "/images/teup-performance.png",
    published: false,
    slug: "parceria-belas-artes"
  },
];

export default function NewsManagement() {
  const [newsItems, setNewsItems] = useState<NewsItem[]>(initialNews);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentNews, setCurrentNews] = useState<NewsItem | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for adding/editing news
  const [formData, setFormData] = useState<NewsItem>({
    id: 0,
    title: "",
    date: format(new Date(), "yyyy-MM-dd"),
    summary: "",
    content: "",
    image: "",
    published: false,
    slug: ""
  });

  const filteredNews = newsItems.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
    format(new Date(item.date), "dd/MM/yyyy").includes(searchTerm)
  );

  const handleAddNews = () => {
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
      const newId = Math.max(...newsItems.map(item => item.id), 0) + 1;
      setNewsItems([...newsItems, { ...formData, id: newId }]);
      setFormData({
        id: 0,
        title: "",
        date: format(new Date(), "yyyy-MM-dd"),
        summary: "",
        content: "",
        image: "",
        published: false,
        slug: ""
      });
      setIsAddDialogOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdateNews = () => {
    if (currentNews) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setNewsItems(newsItems.map(item => 
          item.id === currentNews.id ? currentNews : item
        ));
        setIsEditDialogOpen(false);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleDeleteNews = () => {
    if (currentNews) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setNewsItems(newsItems.filter(item => item.id !== currentNews.id));
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
          <h2 className="text-2xl font-bold text-white mb-2">Gestão de Notícias</h2>
          <p className="text-gray-400">
            Publique e gerencie as notícias e eventos que aparecem no site.
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <FaPlus className="mr-1" /> Nova Notícia
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>Adicionar Nova Notícia</DialogTitle>
              <DialogDescription className="text-gray-400">
                Preencha os detalhes da notícia para publicação no site.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Título</Label>
                  <Input 
                    id="title" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
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
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="summary">Resumo</Label>
                <Textarea 
                  id="summary" 
                  value={formData.summary} 
                  onChange={(e) => setFormData({...formData, summary: e.target.value})}
                  className="bg-gray-800 border-gray-700 resize-none h-20"
                  placeholder="Um breve resumo da notícia (será exibido na página inicial)"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="content">Conteúdo Completo</Label>
                <Textarea 
                  id="content" 
                  value={formData.content} 
                  onChange={(e) => setFormData({...formData, content: e.target.value})}
                  className="bg-gray-800 border-gray-700 resize-none h-64"
                  placeholder="Conteúdo completo da notícia"
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
                    placeholder="titulo-da-noticia"
                  />
                  <p className="text-xs text-gray-500">
                    Deixe em branco para gerar automaticamente a partir do título
                  </p>
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
                onClick={handleAddNews}
                disabled={!formData.title || !formData.summary || !formData.content || !formData.date || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white mr-2"></div>
                    Salvando...
                  </>
                ) : "Adicionar Notícia"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-white">Lista de Notícias</CardTitle>
              <CardDescription className="text-gray-400">
                Total de {filteredNews.length} notícias.
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Buscar notícias..."
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
                  <TableHead className="text-gray-400">Título</TableHead>
                  <TableHead className="text-gray-400">Data</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredNews.length > 0 ? (
                  filteredNews.map((item) => (
                    <TableRow key={item.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell className="font-medium text-white">{item.title}</TableCell>
                      <TableCell className="text-gray-300 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <FaCalendarAlt className="text-gray-500" />
                          {format(new Date(item.date), "dd/MM/yyyy")}
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
                              setCurrentNews(item);
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
                              setCurrentNews(item);
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
                              setCurrentNews(item);
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
                    <TableCell colSpan={4} className="h-24 text-center">
                      Nenhuma notícia encontrada.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* View Dialog */}
      {currentNews && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-xl">{currentNews.title}</DialogTitle>
              <DialogDescription className="text-gray-400 flex items-center gap-2">
                <FaCalendarAlt /> 
                {formatDisplayDate(currentNews.date)}
              </DialogDescription>
            </DialogHeader>
            
            {currentNews.image && (
              <div className="rounded-md overflow-hidden mb-4 max-h-[300px]">
                <img 
                  src={currentNews.image} 
                  alt={currentNews.title}
                  className="w-full object-cover"
                />
              </div>
            )}
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Resumo</h3>
                <p className="text-white bg-gray-800 p-3 rounded-md">{currentNews.summary}</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-400 mb-1">Conteúdo Completo</h3>
                <div className="text-white bg-gray-800 p-3 rounded-md whitespace-pre-wrap">
                  {currentNews.content}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">Status</h3>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    currentNews.published ? 'bg-green-900/20 text-green-500' : 'bg-amber-900/20 text-amber-500'
                  }`}>
                    {currentNews.published ? 'Publicado' : 'Rascunho'}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-1">URL Personalizada</h3>
                  <p className="text-gray-300">{currentNews.slug || "Padrão (baseada no ID)"}</p>
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
      {currentNews && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>Editar Notícia</DialogTitle>
              <DialogDescription className="text-gray-400">
                Atualize os detalhes da notícia.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Título</Label>
                  <Input 
                    id="edit-title" 
                    value={currentNews.title} 
                    onChange={(e) => setCurrentNews({...currentNews, title: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-date">Data</Label>
                  <Input 
                    id="edit-date" 
                    type="date"
                    value={currentNews.date} 
                    onChange={(e) => setCurrentNews({...currentNews, date: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-summary">Resumo</Label>
                <Textarea 
                  id="edit-summary" 
                  value={currentNews.summary} 
                  onChange={(e) => setCurrentNews({...currentNews, summary: e.target.value})}
                  className="bg-gray-800 border-gray-700 resize-none h-20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-content">Conteúdo Completo</Label>
                <Textarea 
                  id="edit-content" 
                  value={currentNews.content} 
                  onChange={(e) => setCurrentNews({...currentNews, content: e.target.value})}
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
                    value={currentNews.image || ""} 
                    onChange={(e) => setCurrentNews({...currentNews, image: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-slug">Slug (URL personalizada)</Label>
                  <Input 
                    id="edit-slug" 
                    value={currentNews.slug || ""} 
                    onChange={(e) => setCurrentNews({...currentNews, slug: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="edit-published" 
                  className="rounded text-red-600 focus:ring-red-500 bg-gray-800 border-gray-700"
                  checked={currentNews.published}
                  onChange={(e) => setCurrentNews({...currentNews, published: e.target.checked})}
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
                onClick={handleUpdateNews}
                disabled={!currentNews.title || !currentNews.summary || !currentNews.content || !currentNews.date || isLoading}
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
      {currentNews && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription className="text-gray-400">
                Tem certeza que deseja excluir esta notícia? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <p className="text-white font-medium">{currentNews.title}</p>
              <p className="text-gray-400 mt-1">{format(new Date(currentNews.date), "dd/MM/yyyy")}</p>
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
                onClick={handleDeleteNews}
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