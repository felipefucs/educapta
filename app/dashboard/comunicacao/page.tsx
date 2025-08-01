"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Plus,
  Search,
  Send,
  Mail,
  MessageSquare,
  Phone,
  CheckCircle,
  Clock,
  AlertCircle,
  MessageCircle,
} from "lucide-react"

export default function ComunicacaoPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("todos")
  const [selectedTipo, setSelectedTipo] = useState("todos")

  // Dados mockados
  const comunicacoes = [
    {
      id: "1",
      destinatario: "Maria Silva",
      tipo: "email",
      assunto: "Confirmação de Matrícula",
      conteudo: "Prezada Maria, confirmamos a matrícula do João...",
      status: "enviado",
      dataEnvio: "2024-01-20T10:30:00",
      aluno: "João Silva Santos",
    },
    {
      id: "2",
      destinatario: "Carlos Oliveira",
      tipo: "whatsapp",
      assunto: "Lembrete de Pagamento",
      conteudo: "Olá Carlos! Lembramos que o vencimento da matrícula...",
      status: "pendente",
      dataEnvio: null,
      aluno: "Ana Carolina Oliveira",
    },
    {
      id: "3",
      destinatario: "Fernanda Costa",
      tipo: "email",
      assunto: "Reunião de Pais",
      conteudo: "Prezada Fernanda, convidamos para a reunião...",
      status: "erro",
      dataEnvio: "2024-01-19T15:45:00",
      aluno: "Pedro Henrique Costa",
    },
    {
      id: "4",
      destinatario: "Todos os Responsáveis - 1º Ano",
      tipo: "email",
      assunto: "Comunicado Geral",
      conteudo: "Prezados responsáveis, informamos sobre...",
      status: "enviado",
      dataEnvio: "2024-01-18T08:00:00",
      aluno: "Turma 1º Ano A",
    },
  ]

  const statusConfig = {
    pendente: {
      label: "Pendente",
      variant: "secondary" as const,
      icon: Clock,
      color: "text-yellow-600",
    },
    enviado: {
      label: "Enviado",
      variant: "default" as const,
      icon: CheckCircle,
      color: "text-green-600",
    },
    erro: {
      label: "Erro",
      variant: "destructive" as const,
      icon: AlertCircle,
      color: "text-red-600",
    },
  }

  const tipoConfig = {
    email: { label: "E-mail", icon: Mail, color: "text-blue-600" },
    whatsapp: { label: "WhatsApp", icon: MessageSquare, color: "text-green-600" },
    sms: { label: "SMS", icon: Phone, color: "text-purple-600" },
  }

  const filteredComunicacoes = comunicacoes.filter((comunicacao) => {
    const matchesStatus = selectedStatus === "todos" || comunicacao.status === selectedStatus
    const matchesTipo = selectedTipo === "todos" || comunicacao.tipo === selectedTipo
    const matchesSearch =
      comunicacao.destinatario.toLowerCase().includes(searchTerm.toLowerCase()) ||
      comunicacao.assunto.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesTipo && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Central de Comunicação</h2>
          <p className="text-muted-foreground">Gerencie comunicações por e-mail, WhatsApp e SMS</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Nova Comunicação
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Criar Nova Comunicação</DialogTitle>
              <DialogDescription>Envie mensagens para responsáveis e alunos</DialogDescription>
            </DialogHeader>
            <Tabs defaultValue="individual" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="individual">Individual</TabsTrigger>
                <TabsTrigger value="lote">Em Lote</TabsTrigger>
              </TabsList>

              <TabsContent value="individual" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="destinatario">Destinatário</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o destinatário" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="maria">Maria Silva (João Silva Santos)</SelectItem>
                        <SelectItem value="carlos">Carlos Oliveira (Ana Carolina)</SelectItem>
                        <SelectItem value="fernanda">Fernanda Costa (Pedro Henrique)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tipo">Tipo de Comunicação</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assunto">Assunto</Label>
                    <Input id="assunto" placeholder="Digite o assunto da mensagem" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="conteudo">Mensagem</Label>
                    <Textarea id="conteudo" placeholder="Digite sua mensagem aqui..." className="min-h-[120px]" />
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="lote" className="space-y-4">
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label>Destinatários</Label>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="todos" />
                        <Label htmlFor="todos">Todos os responsáveis</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="1ano" />
                        <Label htmlFor="1ano">Responsáveis do 1º Ano</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="2ano" />
                        <Label htmlFor="2ano">Responsáveis do 2º Ano</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="3ano" />
                        <Label htmlFor="3ano">Responsáveis do 3º Ano</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox id="pendentes" />
                        <Label htmlFor="pendentes">Apenas com pagamentos pendentes</Label>
                      </div>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="tipoLote">Tipo de Comunicação</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="email">E-mail</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp</SelectItem>
                        <SelectItem value="sms">SMS</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="assuntoLote">Assunto</Label>
                    <Input id="assuntoLote" placeholder="Digite o assunto da mensagem" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="conteudoLote">Mensagem</Label>
                    <Textarea id="conteudoLote" placeholder="Digite sua mensagem aqui..." className="min-h-[120px]" />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            <div className="flex justify-end gap-2 mt-6">
              <Button variant="outline">Cancelar</Button>
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Enviar
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumo das Comunicações */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Enviadas</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{comunicacoes.filter((c) => c.status === "enviado").length}</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">E-mails</CardTitle>
            <Mail className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{comunicacoes.filter((c) => c.tipo === "email").length}</div>
            <p className="text-xs text-muted-foreground">Comunicações por e-mail</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">WhatsApp</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{comunicacoes.filter((c) => c.tipo === "whatsapp").length}</div>
            <p className="text-xs text-muted-foreground">Mensagens WhatsApp</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{comunicacoes.filter((c) => c.status === "pendente").length}</div>
            <p className="text-xs text-muted-foreground">Aguardando envio</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Comunicações */}
      <Card>
        <CardHeader>
          <CardTitle>Histórico de Comunicações</CardTitle>
          <CardDescription>Acompanhe todas as comunicações enviadas</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por destinatário ou assunto..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedTipo} onValueChange={setSelectedTipo}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="whatsapp">WhatsApp</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="enviado">Enviado</SelectItem>
                <SelectItem value="erro">Erro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Destinatário</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Assunto</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredComunicacoes.map((comunicacao) => {
                const status = statusConfig[comunicacao.status as keyof typeof statusConfig]
                const tipo = tipoConfig[comunicacao.tipo as keyof typeof tipoConfig]
                const StatusIcon = status.icon
                const TipoIcon = tipo.icon

                return (
                  <TableRow key={comunicacao.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{comunicacao.destinatario}</div>
                        <div className="text-sm text-muted-foreground">{comunicacao.aluno}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${tipo.color}`}>
                        <TipoIcon className="h-4 w-4" />
                        <span className="text-sm">{tipo.label}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px]">
                        <div className="font-medium truncate">{comunicacao.assunto}</div>
                        <div className="text-sm text-muted-foreground truncate">{comunicacao.conteudo}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${status.color}`}>
                        <StatusIcon className="h-4 w-4" />
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      {comunicacao.dataEnvio ? (
                        <div className="text-sm">
                          {new Date(comunicacao.dataEnvio).toLocaleDateString("pt-BR")}
                          <br />
                          <span className="text-muted-foreground">
                            {new Date(comunicacao.dataEnvio).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {comunicacao.status === "pendente" && (
                          <Button size="sm" variant="outline">
                            <Send className="h-3 w-3" />
                          </Button>
                        )}
                        {comunicacao.status === "erro" && (
                          <Button size="sm" variant="outline">
                            <Send className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
