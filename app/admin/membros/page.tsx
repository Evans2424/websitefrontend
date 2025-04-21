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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaPlus, FaEdit, FaTrash, FaSearch, FaEye, FaStar, FaImage } from "react-icons/fa";
import { Checkbox } from "@/components/ui/checkbox";

// Sample members data for demonstration
interface Member {
  id: string;
  name: string;
  nickname?: string;
  role: string;
  instrument: string;
  course?: string;
  yearJoined: number;
  bio?: string;
  photo?: string;
  isActive: boolean;
  isDirector: boolean;
  socialMedia?: {
    instagram?: string;
    facebook?: string;
    linkedin?: string;
  }
}

const initialMembers: Member[] = [
  {
    id: "1",
    name: "António Silva",
    nickname: "Tó",
    role: "Ensaiador",
    instrument: "Bandolim",
    course: "Engenharia Informática",
    yearJoined: 2019,
    bio: "António juntou-se à TEUP em 2019 e rapidamente se destacou pelo seu talento no bandolim. Atualmente, é o Ensaiador da tuna, responsável por coordenar os ensaios e arranjos musicais. É conhecido pela sua dedicação e rigor musical, contribuindo significativamente para a qualidade das performances da tuna.",
    photo: "/images/members/placeholder.png",
    isActive: true,
    isDirector: true,
    socialMedia: {
      instagram: "antonio.silva",
      facebook: "antoniosilva",
      linkedin: "antonio-silva-12345"
    }
  },
  {
    id: "2",
    name: "Miguel Santos",
    nickname: "Mike",
    role: "Presidente",
    instrument: "Guitarra",
    course: "Engenharia Civil",
    yearJoined: 2018,
    bio: "Miguel é o atual Presidente da TEUP, tendo ingressado em 2018. Além de ser um excelente guitarrista, é um líder natural, responsável pela gestão administrativa da tuna e representação institucional. Sob a sua liderança, a TEUP tem participado em diversos festivais internacionais e estabelecido parcerias importantes.",
    photo: "/images/members/placeholder.png",
    isActive: true,
    isDirector: true,
    socialMedia: {
      instagram: "miguel.santos",
      facebook: "miguelsantos",
    }
  },
  {
    id: "3",
    name: "Pedro Costa",
    role: "Tunante",
    instrument: "Viola",
    course: "Engenharia Mecânica",
    yearJoined: 2020,
    bio: "Pedro é um dos membros mais recentes da TEUP, tendo-se juntado em 2020. Apesar do pouco tempo na tuna, já demonstrou grande aptidão para a viola e um forte espírito tunante. É conhecido pelo seu entusiasmo contagiante e por ser sempre o primeiro a voluntariar-se para novas iniciativas.",
    photo: "/images/members/placeholder.png",
    isActive: true,
    isDirector: false,
    socialMedia: {
      instagram: "pedro.costa",
    }
  },
  {
    id: "4",
    name: "Sofia Almeida",
    role: "Tesoureira",
    instrument: "Voz",
    course: "Engenharia Química",
    yearJoined: 2019,
    bio: "Sofia é a vocalista principal da TEUP e atual Tesoureira. Com uma voz excepcional e uma presença carismática, é uma das figuras mais reconhecíveis da tuna. Como tesoureira, gerencia as finanças da tuna com rigor e transparência. Além disso, é frequentemente a solista em apresentações importantes.",
    photo: "/images/members/placeholder.png",
    isActive: true,
    isDirector: true,
    socialMedia: {
      instagram: "sofia.almeida",
      linkedin: "sofia-almeida"
    }
  },
  {
    id: "5",
    name: "Carlos Ferreira",
    nickname: "Carlitos",
    role: "Tunante Veterano",
    instrument: "Bandolim",
    course: "Engenharia Eletrotécnica",
    yearJoined: 2010,
    bio: "Carlos é um dos membros mais antigos da tuna, tendo ingressado em 2010. Apesar de não participar tão ativamente nos eventos devido à sua carreira profissional, continua ligado à tuna como tunante veterano, comparecendo em ocasiões especiais e servindo como mentor para os novos membros. Sua experiência e conhecimento são valiosos para manter as tradições da TEUP.",
    photo: "/images/members/placeholder.png",
    isActive: false,
    isDirector: false,
    socialMedia: {
      linkedin: "carlos-ferreira-eng"
    }
  }
];

// Role options
const roleOptions = [
  "Tunante", 
  "Presidente", 
  "Vice-Presidente", 
  "Tesoureiro", 
  "Secretário", 
  "Ensaiador", 
  "Relações Públicas",
  "Tunante Veterano"
];

// Instrument options
const instrumentOptions = [
  "Bandolim",
  "Guitarra",
  "Viola",
  "Violão",
  "Cavaquinho",
  "Violino",
  "Acordeão",
  "Flauta",
  "Voz",
  "Contrabaixo",
  "Pandeireta",
  "Outro"
];

// Course options
const courseOptions = [
  "Engenharia Civil",
  "Engenharia Eletrotécnica",
  "Engenharia Informática",
  "Engenharia Mecânica",
  "Engenharia Química",
  "Engenharia Biomédica",
  "Engenharia do Ambiente",
  "Engenharia Industrial",
  "Outro"
];

export default function MembersManagement() {
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [instrumentFilter, setInstrumentFilter] = useState<string | null>(null);
  const [currentMember, setCurrentMember] = useState<Member | null>(null);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form state for adding new members
  const [formData, setFormData] = useState<Member>({
    id: "",
    name: "",
    nickname: "",
    role: "Tunante",
    instrument: "",
    course: "",
    yearJoined: new Date().getFullYear(),
    bio: "",
    photo: "",
    isActive: true,
    isDirector: false,
    socialMedia: {
      instagram: "",
      facebook: "",
      linkedin: ""
    }
  });

  // Filter members based on search term and filters
  const filteredMembers = members.filter((member) => {
    const matchesSearch = member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (member.nickname && member.nickname.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          member.instrument.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          member.role.toLowerCase().includes(searchTerm.toLowerCase());
                       
    const matchesStatus = statusFilter === null || 
                          (statusFilter === "active" && member.isActive) || 
                          (statusFilter === "inactive" && !member.isActive);
                          
    const matchesInstrument = instrumentFilter === null || member.instrument === instrumentFilter;
    
    return matchesSearch && matchesStatus && matchesInstrument;
  });

  const handleAddMember = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newId = Math.random().toString(36).substring(2, 9);
      setMembers([...members, { ...formData, id: newId }]);
      setFormData({
        id: "",
        name: "",
        nickname: "",
        role: "Tunante",
        instrument: "",
        course: "",
        yearJoined: new Date().getFullYear(),
        bio: "",
        photo: "",
        isActive: true,
        isDirector: false,
        socialMedia: {
          instagram: "",
          facebook: "",
          linkedin: ""
        }
      });
      setIsAddDialogOpen(false);
      setIsLoading(false);
    }, 1000);
  };

  const handleUpdateMember = () => {
    if (currentMember) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setMembers(members.map(member => 
          member.id === currentMember.id ? currentMember : member
        ));
        setIsEditDialogOpen(false);
        setIsLoading(false);
      }, 1000);
    }
  };

  const handleDeleteMember = () => {
    if (currentMember) {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        setMembers(members.filter(member => member.id !== currentMember.id));
        setIsDeleteDialogOpen(false);
        setIsLoading(false);
      }, 1000);
    }
  };
  
  // Generate unique instruments for filter
  const uniqueInstruments = Array.from(new Set(members.map(member => member.instrument)));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Gestão de Membros</h2>
          <p className="text-gray-400">
            Adicione, edite ou remova membros da tuna no site.
          </p>
        </div>
        
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-1">
              <FaPlus className="mr-1" /> Novo Membro
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>Adicionar Novo Membro</DialogTitle>
              <DialogDescription className="text-gray-400">
                Preencha os detalhes do membro para adicionar ao site.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="required">Nome Completo</Label>
                  <Input 
                    id="name" 
                    value={formData.name} 
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nickname">Apelido</Label>
                  <Input 
                    id="nickname" 
                    value={formData.nickname || ""}
                    onChange={(e) => setFormData({...formData, nickname: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Opcional"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="role" className="required">Cargo</Label>
                  <Select 
                    value={formData.role} 
                    onValueChange={(value) => setFormData({...formData, role: value})}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione um cargo" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {roleOptions.map(role => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="instrument" className="required">Instrumento</Label>
                  <Select 
                    value={formData.instrument} 
                    onValueChange={(value) => setFormData({...formData, instrument: value})}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione um instrumento" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {instrumentOptions.map(instrument => (
                        <SelectItem key={instrument} value={instrument}>
                          {instrument}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearJoined" className="required">Ano de Entrada</Label>
                  <Input 
                    id="yearJoined"
                    type="number"
                    min={1980}
                    max={new Date().getFullYear()}
                    value={formData.yearJoined} 
                    onChange={(e) => setFormData({...formData, yearJoined: parseInt(e.target.value)})}
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="course">Curso</Label>
                <Select 
                  value={formData.course || ""} 
                  onValueChange={(value) => setFormData({...formData, course: value})}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione um curso" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {courseOptions.map(course => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="bio">Biografia</Label>
                <Textarea 
                  id="bio" 
                  value={formData.bio || ""}
                  onChange={(e) => setFormData({...formData, bio: e.target.value})}
                  className="bg-gray-800 border-gray-700 resize-none h-20"
                  placeholder="Breve biografia do membro"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="photo" className="flex items-center gap-2">
                  <FaImage className="text-gray-400" />
                  Foto (URL)
                </Label>
                <Input 
                  id="photo" 
                  value={formData.photo || ""}
                  onChange={(e) => setFormData({...formData, photo: e.target.value})}
                  className="bg-gray-800 border-gray-700"
                  placeholder="/images/members/nome-do-membro.jpg"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input 
                    id="instagram" 
                    value={formData.socialMedia?.instagram || ""}
                    onChange={(e) => setFormData({
                      ...formData, 
                      socialMedia: {...formData.socialMedia, instagram: e.target.value}
                    })}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Nome de usuário (sem @)"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="facebook">Facebook</Label>
                  <Input 
                    id="facebook" 
                    value={formData.socialMedia?.facebook || ""}
                    onChange={(e) => setFormData({
                      ...formData, 
                      socialMedia: {...formData.socialMedia, facebook: e.target.value}
                    })}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Nome de usuário ou ID"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="linkedin">LinkedIn</Label>
                  <Input 
                    id="linkedin" 
                    value={formData.socialMedia?.linkedin || ""}
                    onChange={(e) => setFormData({
                      ...formData, 
                      socialMedia: {...formData.socialMedia, linkedin: e.target.value}
                    })}
                    className="bg-gray-800 border-gray-700"
                    placeholder="Nome de usuário"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isActive" 
                    checked={formData.isActive}
                    onCheckedChange={(checked) => setFormData({
                      ...formData, 
                      isActive: checked === true
                    })}
                  />
                  <Label htmlFor="isActive">Membro Ativo</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="isDirector" 
                    checked={formData.isDirector}
                    onCheckedChange={(checked) => setFormData({
                      ...formData, 
                      isDirector: checked === true
                    })}
                  />
                  <Label htmlFor="isDirector">Faz parte da direção</Label>
                </div>
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
                onClick={handleAddMember}
                disabled={!formData.name || !formData.instrument || !formData.role || !formData.yearJoined || isLoading}
              >
                {isLoading ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-b-2 border-t-2 border-white mr-2"></div>
                    Salvando...
                  </>
                ) : "Adicionar Membro"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      
      <Card className="border-gray-800 bg-gray-900">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
            <div>
              <CardTitle className="text-white">Membros da Tuna</CardTitle>
              <CardDescription className="text-gray-400">
                Total de {filteredMembers.length} membros.
              </CardDescription>
            </div>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input 
                  placeholder="Buscar membros..."
                  className="pl-9 bg-gray-800 border-gray-700 w-full md:w-[250px]"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <Select 
                  value={statusFilter || "all"}
                  onValueChange={(value) => setStatusFilter(value === "all" ? null : value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-full md:w-[150px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">Todos os Status</SelectItem>
                    <SelectItem value="active">Ativos</SelectItem>
                    <SelectItem value="inactive">Inativos</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select 
                  value={instrumentFilter || "all"}
                  onValueChange={(value) => setInstrumentFilter(value === "all" ? null : value)}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white w-full md:w-[150px]">
                    <SelectValue placeholder="Instrumento" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    <SelectItem value="all">Todos os Instrumentos</SelectItem>
                    {uniqueInstruments.map(instrument => (
                      <SelectItem key={instrument} value={instrument}>
                        {instrument}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border border-gray-800">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-800 hover:bg-gray-800/50">
                  <TableHead className="text-gray-400">Nome</TableHead>
                  <TableHead className="text-gray-400">Cargo</TableHead>
                  <TableHead className="text-gray-400">Instrumento</TableHead>
                  <TableHead className="text-gray-400">Status</TableHead>
                  <TableHead className="text-gray-400">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <TableRow key={member.id} className="border-gray-800 hover:bg-gray-800/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-800">
                            {member.photo ? (
                              <img 
                                src={member.photo} 
                                alt={member.name} 
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="h-full w-full flex items-center justify-center text-gray-600">
                                {member.name.charAt(0)}
                              </div>
                            )}
                          </div>
                          <div>
                            <div className="font-medium text-white flex items-center gap-1">
                              {member.name}
                              {member.isDirector && (
                                <FaStar className="text-amber-500 ml-1 h-3 w-3" title="Membro da direção" />
                              )}
                            </div>
                            {member.nickname && (
                              <div className="text-sm text-gray-400">"{member.nickname}"</div>
                            )}
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-gray-300">{member.role}</TableCell>
                      <TableCell className="text-gray-300">{member.instrument}</TableCell>
                      <TableCell>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          member.isActive ? 'bg-green-900/20 text-green-500' : 'bg-gray-700/20 text-gray-400'
                        }`}>
                          {member.isActive ? 'Ativo' : 'Inativo'}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => {
                              setCurrentMember(member);
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
                              setCurrentMember(member);
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
                              setCurrentMember(member);
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
                      Nenhum membro encontrado.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
      
      {/* View Dialog */}
      {currentMember && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-3xl">
            <DialogHeader>
              <DialogTitle className="text-xl flex items-center gap-2">
                {currentMember.name}
                {currentMember.isDirector && (
                  <FaStar className="text-amber-500 h-4 w-4" title="Membro da direção" />
                )}
              </DialogTitle>
              <DialogDescription className="text-gray-400">
                {currentMember.role} - {currentMember.instrument}
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="col-span-1">
                <div className="rounded-md overflow-hidden bg-gray-800 aspect-square">
                  {currentMember.photo ? (
                    <img 
                      src={currentMember.photo} 
                      alt={currentMember.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-600 text-5xl">
                      {currentMember.name.charAt(0)}
                    </div>
                  )}
                </div>
                
                <div className="mt-4 space-y-3">
                  {currentMember.nickname && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Apelido</h3>
                      <p className="text-white">{currentMember.nickname}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Membro desde</h3>
                    <p className="text-white">{currentMember.yearJoined}</p>
                  </div>
                  {currentMember.course && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-400">Curso</h3>
                      <p className="text-white">{currentMember.course}</p>
                    </div>
                  )}
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">Status</h3>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      currentMember.isActive ? 'bg-green-900/20 text-green-500' : 'bg-gray-700/20 text-gray-400'
                    }`}>
                      {currentMember.isActive ? 'Ativo' : 'Inativo'}
                    </span>
                  </div>
                </div>
                
                {(currentMember.socialMedia?.instagram || currentMember.socialMedia?.facebook || currentMember.socialMedia?.linkedin) && (
                  <div className="mt-4">
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Redes Sociais</h3>
                    <div className="flex gap-2">
                      {currentMember.socialMedia?.instagram && (
                        <a 
                          href={`https://instagram.com/${currentMember.socialMedia.instagram}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-gray-800 hover:bg-gray-700 p-2 rounded-md text-gray-400 hover:text-white transition-colors"
                          title="Instagram"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                          </svg>
                        </a>
                      )}
                      {currentMember.socialMedia?.facebook && (
                        <a 
                          href={`https://facebook.com/${currentMember.socialMedia.facebook}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-gray-800 hover:bg-gray-700 p-2 rounded-md text-gray-400 hover:text-white transition-colors"
                          title="Facebook"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                          </svg>
                        </a>
                      )}
                      {currentMember.socialMedia?.linkedin && (
                        <a 
                          href={`https://linkedin.com/in/${currentMember.socialMedia.linkedin}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="bg-gray-800 hover:bg-gray-700 p-2 rounded-md text-gray-400 hover:text-white transition-colors"
                          title="LinkedIn"
                        >
                          <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="col-span-2">
                {currentMember.bio && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-400 mb-2">Biografia</h3>
                    <div className="text-white bg-gray-800 p-3 rounded-md whitespace-pre-wrap">
                      {currentMember.bio}
                    </div>
                  </div>
                )}
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
      {currentMember && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white max-w-4xl">
            <DialogHeader>
              <DialogTitle>Editar Membro</DialogTitle>
              <DialogDescription className="text-gray-400">
                Atualize os detalhes do membro.
              </DialogDescription>
            </DialogHeader>
            
            <div className="grid gap-6 py-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-name" className="required">Nome Completo</Label>
                  <Input 
                    id="edit-name" 
                    value={currentMember.name} 
                    onChange={(e) => setCurrentMember({...currentMember, name: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-nickname">Apelido</Label>
                  <Input 
                    id="edit-nickname" 
                    value={currentMember.nickname || ""}
                    onChange={(e) => setCurrentMember({...currentMember, nickname: e.target.value})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-role" className="required">Cargo</Label>
                  <Select 
                    value={currentMember.role} 
                    onValueChange={(value) => setCurrentMember({...currentMember, role: value})}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione um cargo" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {roleOptions.map(role => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-instrument" className="required">Instrumento</Label>
                  <Select 
                    value={currentMember.instrument} 
                    onValueChange={(value) => setCurrentMember({...currentMember, instrument: value})}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                      <SelectValue placeholder="Selecione um instrumento" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-gray-700">
                      {instrumentOptions.map(instrument => (
                        <SelectItem key={instrument} value={instrument}>
                          {instrument}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-yearJoined" className="required">Ano de Entrada</Label>
                  <Input 
                    id="edit-yearJoined"
                    type="number"
                    min={1980}
                    max={new Date().getFullYear()}
                    value={currentMember.yearJoined} 
                    onChange={(e) => setCurrentMember({...currentMember, yearJoined: parseInt(e.target.value)})}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-course">Curso</Label>
                <Select 
                  value={currentMember.course || ""}
                  onValueChange={(value) => setCurrentMember({...currentMember, course: value})}
                >
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Selecione um curso" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700">
                    {courseOptions.map(course => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-bio">Biografia</Label>
                <Textarea 
                  id="edit-bio" 
                  value={currentMember.bio || ""}
                  onChange={(e) => setCurrentMember({...currentMember, bio: e.target.value})}
                  className="bg-gray-800 border-gray-700 resize-none h-20"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="edit-photo" className="flex items-center gap-2">
                  <FaImage className="text-gray-400" />
                  Foto (URL)
                </Label>
                <Input 
                  id="edit-photo" 
                  value={currentMember.photo || ""}
                  onChange={(e) => setCurrentMember({...currentMember, photo: e.target.value})}
                  className="bg-gray-800 border-gray-700"
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-instagram">Instagram</Label>
                  <Input 
                    id="edit-instagram" 
                    value={currentMember.socialMedia?.instagram || ""}
                    onChange={(e) => setCurrentMember({
                      ...currentMember, 
                      socialMedia: {...currentMember.socialMedia, instagram: e.target.value}
                    })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-facebook">Facebook</Label>
                  <Input 
                    id="edit-facebook" 
                    value={currentMember.socialMedia?.facebook || ""}
                    onChange={(e) => setCurrentMember({
                      ...currentMember, 
                      socialMedia: {...currentMember.socialMedia, facebook: e.target.value}
                    })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-linkedin">LinkedIn</Label>
                  <Input 
                    id="edit-linkedin" 
                    value={currentMember.socialMedia?.linkedin || ""}
                    onChange={(e) => setCurrentMember({
                      ...currentMember, 
                      socialMedia: {...currentMember.socialMedia, linkedin: e.target.value}
                    })}
                    className="bg-gray-800 border-gray-700"
                  />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="edit-isActive" 
                    checked={currentMember.isActive}
                    onCheckedChange={(checked) => setCurrentMember({
                      ...currentMember, 
                      isActive: checked === true
                    })}
                  />
                  <Label htmlFor="edit-isActive">Membro Ativo</Label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="edit-isDirector" 
                    checked={currentMember.isDirector}
                    onCheckedChange={(checked) => setCurrentMember({
                      ...currentMember, 
                      isDirector: checked === true
                    })}
                  />
                  <Label htmlFor="edit-isDirector">Faz parte da direção</Label>
                </div>
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
                onClick={handleUpdateMember}
                disabled={!currentMember.name || !currentMember.instrument || !currentMember.role || !currentMember.yearJoined || isLoading}
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
      {currentMember && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="bg-gray-900 border-gray-800 text-white">
            <DialogHeader>
              <DialogTitle>Confirmar Exclusão</DialogTitle>
              <DialogDescription className="text-gray-400">
                Tem certeza que deseja excluir este membro? Esta ação não pode ser desfeita.
              </DialogDescription>
            </DialogHeader>
            
            <div className="py-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-800">
                  {currentMember.photo ? (
                    <img 
                      src={currentMember.photo} 
                      alt={currentMember.name} 
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center text-gray-600">
                      {currentMember.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-white font-medium">{currentMember.name}</p>
                  <p className="text-gray-400">{currentMember.role} - {currentMember.instrument}</p>
                </div>
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
                onClick={handleDeleteMember}
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