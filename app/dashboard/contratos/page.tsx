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
import { Plus, Search, FileText, Download, Send, Eye, Clock, CheckCircle, AlertCircle } from "lucide-react"

export default function ContratosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("todos")

  // Dados mockados
  const contratos = [
    {
      id: "1",
      numeroContrato: "CTR-2024-001",
      aluno: "João Silva Santos",
      responsavel: "Maria Silva",
      status: "assinado",
      dataGeracao: "2024-01-15",
      dataAssinatura: "2024-01-16",
      valor: 850.0,
      turma: "1º Ano A",
    },
    {
      id: "2",
      numeroContrato: "CTR-2024-002",
      aluno: "Ana Carolina Oliveira",
      responsavel: "Carlos Oliveira",
      status: "pendente",
      dataGeracao: "2024-01-18",
      dataAssinatura: null,
      valor: 850.0,
      turma: "2º Ano A",
    },
    {
      id: "3",
      numeroContrato: "CTR-2024-003",
      aluno: "Pedro Henrique Costa",
      responsavel: "Fernanda Costa",
      status: "enviado",
      dataGeracao: "2024-01-20",
      dataAssinatura: null,
      valor: 950.0,
      turma: "3º Ano A",
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
      icon: Send,
      color: "text-blue-600",
    },
    assinado: {
      label: "Assinado",
      variant: "default" as const,
      icon: CheckCircle,
      color: "text-green-600",
    },
    cancelado: {
      label: "Cancelado",
      variant: "destructive" as const,
      icon: AlertCircle,
      color: "text-red-600",
    },
  }

  const filteredContratos = contratos.filter((contrato) => {
    const matchesStatus = selectedStatus === "todos" || contrato.status === selectedStatus
    const matchesSearch =
      contrato.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contrato.numeroContrato.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Contratos</h2>
          <p className="text-muted-foreground">Gerencie contratos digitais e assinaturas eletrônicas</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Gerar Contrato
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Gerar Novo Contrato</DialogTitle>
              <DialogDescription>Selecione o aluno para gerar o contrato de matrícula</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="aluno">Aluno</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">João Silva Santos - 1º Ano A</SelectItem>
                    <SelectItem value="ana">Ana Carolina Oliveira - 2º Ano A</SelectItem>
                    <SelectItem value="pedro">Pedro Henrique Costa - 3º Ano A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="modelo">Modelo de Contrato</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o modelo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="padrao">Contrato Padrão 2024</SelectItem>
                    <SelectItem value="integral">Contrato Período Integral</SelectItem>
                    <SelectItem value="especial">Contrato Necessidades Especiais</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="valor">Valor da Matrícula</Label>
                <Input id="valor" placeholder="R$ 850,00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Textarea id="observacoes" placeholder="Observações adicionais para o contrato..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Gerar Contrato</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumo dos Contratos */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Contratos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contratos.length}</div>
            <p className="text-xs text-muted-foreground">Ano letivo 2024</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Contratos Assinados</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{contratos.filter((c) => c.status === "assinado").length}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((contratos.filter((c) => c.status === "assinado").length / contratos.length) * 100)}% do total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes de Assinatura</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {contratos.filter((c) => c.status === "pendente" || c.status === "enviado").length}
            </div>
            <p className="text-xs text-muted-foreground">Precisam de atenção</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Receita Contratos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R$ {contratos.reduce((acc, c) => acc + c.valor, 0).toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">Valor total dos contratos</p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Contratos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Contratos</CardTitle>
          <CardDescription>Gerencie todos os contratos de matrícula</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por aluno, responsável ou número do contrato..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos os Status</SelectItem>
                <SelectItem value="pendente">Pendente</SelectItem>
                <SelectItem value="enviado">Enviado</SelectItem>
                <SelectItem value="assinado">Assinado</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato</TableHead>
                <TableHead>Aluno</TableHead>
                <TableHead>Responsável</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Data</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContratos.map((contrato) => {
                const status = statusConfig[contrato.status as keyof typeof statusConfig]
                const StatusIcon = status.icon

                return (
                  <TableRow key={contrato.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{contrato.numeroContrato}</div>
                        <div className="text-sm text-muted-foreground">{contrato.turma}</div>
                      </div>
                    </TableCell>
                    <TableCell>{contrato.aluno}</TableCell>
                    <TableCell>{contrato.responsavel}</TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${status.color}`}>
                        <StatusIcon className="h-4 w-4" />
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>R$ {contrato.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">
                          Gerado: {new Date(contrato.dataGeracao).toLocaleDateString("pt-BR")}
                        </div>
                        {contrato.dataAssinatura && (
                          <div className="text-sm text-green-600">
                            Assinado: {new Date(contrato.dataAssinatura).toLocaleDateString("pt-BR")}
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                        {contrato.status === "pendente" && (
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
