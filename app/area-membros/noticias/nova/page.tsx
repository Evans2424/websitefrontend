"use client";

import { useAuth } from "@/app/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { ArrowLeft, ImageIcon, ImagePlus } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import Link from "next/link";

interface CategoryOption {
  id: string;
  name: string;
}

export default function NewNewsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "",
    imageUrl: ""
  });
  
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  
  const categories: CategoryOption[] = [
    { id: "inscricoes", name: "Inscrições" },
    { id: "premios", name: "Prémios" },
    { id: "lancamentos", name: "Lançamentos" },
    { id: "eventos", name: "Eventos" },
    { id: "outros", name: "Outros" }
  ];
  
  // Mock image options for demo
  const imageOptions = [
    { url: "/images/teup-nice.png", name: "Grupo TEUP" },
    { url: "/images/teup-performance.png", name: "Atuação" },
    { url: "/images/teup-musicians.png", name: "Músicos" },
    { url: "/images/teup-meeting-room.png", name: "Sala de Ensaios" },
    { url: "/images/teup-university.png", name: "Universidade" }
  ];
  
  // Check if user has privileges
  useEffect(() => {
    if (user && !user.privileges?.canAddNews) {
      toast({
        title: "Acesso negado",
        description: "Não tem permissão para aceder a esta página",
        variant: "destructive"
      });
      router.push("/area-membros/noticias");
    }
  }, [user, router, toast]);
  
  const handleChange = (field: string, value: string) => {
    setForm(prev => ({
      ...prev,
      [field]: value
    }));
    
    if (field === "imageUrl" && value) {
      setPreviewImage(value);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Form validation
    if (!form.title || !form.content || !form.category) {
      toast({
        title: "Campos em falta",
        description: "Por favor preencha todos os campos obrigatórios",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      
      toast({
        title: "Notícia publicada",
        description: "A notícia foi publicada com sucesso"
      });
      
      router.push("/area-membros/noticias");
    }, 1500);
  };
  
  // If user doesn't have privileges, show nothing while redirecting
  if (user && !user.privileges?.canAddNews) {
    return null;
  }
  
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon" asChild>
          <Link href="/area-membros/noticias">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">Nova Notícia</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle>Detalhes da Notícia</CardTitle>
              <CardDescription>
                Preencha os detalhes da nova notícia para publicar
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="title" className="text-sm font-medium">
                  Título *
                </label>
                <Input
                  id="title"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  placeholder="Título da notícia"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="content" className="text-sm font-medium">
                  Conteúdo *
                </label>
                <Textarea
                  id="content"
                  value={form.content}
                  onChange={(e) => handleChange("content", e.target.value)}
                  placeholder="Conteúdo da notícia"
                  rows={8}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="category" className="text-sm font-medium">
                  Categoria *
                </label>
                <Select 
                  value={form.category}
                  onValueChange={(value) => handleChange("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="image" className="text-sm font-medium">
                  Imagem
                </label>
                <Select 
                  value={form.imageUrl}
                  onValueChange={(value) => handleChange("imageUrl", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma imagem" />
                  </SelectTrigger>
                  <SelectContent>
                    {imageOptions.map(image => (
                      <SelectItem key={image.url} value={image.url}>
                        {image.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Escolha uma das imagens disponíveis para ilustrar a notícia
                </p>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/area-membros/noticias">Cancelar</Link>
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "A publicar..." : "Publicar Notícia"}
              </Button>
            </CardFooter>
          </form>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Pré-visualização</CardTitle>
            <CardDescription>
              Veja como a sua notícia irá aparecer
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {previewImage ? (
              <div className="aspect-video rounded-md overflow-hidden">
                <img 
                  src={previewImage} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-video rounded-md bg-muted flex items-center justify-center">
                <ImageIcon className="h-10 w-10 text-muted-foreground" />
              </div>
            )}
            
            <div>
              <h3 className="font-medium">
                {form.title || "Título da notícia"}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-3">
                {form.content || "O conteúdo da notícia aparecerá aqui..."}
              </p>
            </div>
            
            {form.category && (
              <div>
                <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full">
                  {categories.find(c => c.id === form.category)?.name || form.category}
                </span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}