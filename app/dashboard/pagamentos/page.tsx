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
import { Plus, Search, CreditCard, Download, Send, Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react"

export default function PagamentosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("todos")

  // Dados mockados
  const pagamentos = [
    {
      id: "1",
      aluno: "João Silva Santos",
      responsavel: "Maria Silva",
      tipo: "matricula",
      valor: 850.0,
      status: "pago",
      dataVencimento: "2024-01-20",
      dataPagamento: "2024-01-18",
      metodoPagamento: "PIX",
      referencia: "PIX-001234",
    },
    {
      id: "2",
      aluno: "Ana Carolina Oliveira",
      responsavel: "Carlos Oliveira",
      tipo: "matricula",
      valor: 850.0,
      status: "pendente",
      dataVencimento: "2024-01-25",
      dataPagamento: null,
      metodoPagamento: null,
      referencia: "BOL-005678",
    },
    {
      id: "3",
      aluno: "Pedro Henrique Costa",
      responsavel: "Fernanda Costa",
      tipo: "matricula",
      valor: 950.0,
      status: "vencido",
      dataVencimento: "2024-01-15",
      dataPagamento: null,
      metodoPagamento: null,
      referencia: "BOL-009012",
    },
    {
      id: "4",
      aluno: "Lucas Ferreira",
      responsavel: "Ana Ferreira",
      tipo: "mensalidade",
      valor: 750.0,
      status: "pago",
      dataVencimento: "2024-01-10",
      dataPagamento: "2024-01-09",
      metodoPagamento: "Cartão de Crédito",
      referencia: "CC-003456",
    },
  ]

  const statusConfig = {
    pendente: {
      label: "Pendente",
      variant: "secondary" as const,
      icon: Clock,
      color: "text-yellow-600",
    },
    pago: {
      label: "Pago",
      variant: "default" as const,
      icon: CheckCircle,
      color: "text-green-600",
    },
    vencido: {
      label: "Vencido",
      variant: "destructive" as const,
      icon: AlertCircle,
      color: "text-red-600",
    },
    cancelado: {
      label: "Cancelado",
      variant: "outline" as const,
      icon: XCircle,
      color: "text-gray-600",
    },
  }

  const tipoConfig = {
    matricula: "Matrícula",
    mensalidade: "Mensalidade",
    material: "Material Escolar",
    uniforme: "Uniforme",
  }

  const filteredPagamentos = pagamentos.filter((pagamento) => {
    const matchesStatus = selectedStatus === "todos" || pagamento.status === selectedStatus
    const matchesSearch =
      pagamento.aluno.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pagamento.responsavel.toLowerCase().includes(searchTerm.toLowerCase()) ||
      pagamento.referencia.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Gestão de Pagamentos</h2>
          <p className="text-muted-foreground">Gerencie cobranças, pagamentos e recibos</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Nova Cobrança
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Gerar Nova Cobrança</DialogTitle>
              <DialogDescription>Crie uma nova cobrança para um aluno</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="aluno">Aluno</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o aluno" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="joao">João Silva Santos</SelectItem>
                    <SelectItem value="ana">Ana Carolina Oliveira</SelectItem>
                    <SelectItem value="pedro">Pedro Henrique Costa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="tipo">Tipo de Cobrança</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="matricula">Matrícula</SelectItem>
                    <SelectItem value="mensalidade">Mensalidade</SelectItem>
                    <SelectItem value="material">Material Escolar</SelectItem>
                    <SelectItem value="uniforme">Uniforme</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="valor">Valor</Label>
                <Input id="valor" placeholder="R$ 850,00" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="vencimento">Data de Vencimento</Label>
                <Input id="vencimento" type="date" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="metodo">Método de Pagamento</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o método" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boleto">Boleto Bancário</SelectItem>
                    <SelectItem value="pix">PIX</SelectItem>
                    <SelectItem value="cartao">Cartão de Crédito</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline">Cancelar</Button>
              <Button>Gerar Cobrança</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Resumo dos Pagamentos */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Cobranças</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pagamentos.length}</div>
            <p className="text-xs text-muted-foreground">Este mês</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pagamentos Recebidos</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R${" "}
              {pagamentos
                .filter((p) => p.status === "pago")
                .reduce((acc, p) => acc + p.valor, 0)
                .toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">
              {pagamentos.filter((p) => p.status === "pago").length} pagamentos
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendentes</CardTitle>
            <Clock className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R${" "}
              {pagamentos
                .filter((p) => p.status === "pendente")
                .reduce((acc, p) => acc + p.valor, 0)
                .toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">
              {pagamentos.filter((p) => p.status === "pendente").length} cobranças
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vencidos</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              R${" "}
              {pagamentos
                .filter((p) => p.status === "vencido")
                .reduce((acc, p) => acc + p.valor, 0)
                .toLocaleString("pt-BR")}
            </div>
            <p className="text-xs text-muted-foreground">
              {pagamentos.filter((p) => p.status === "vencido").length} em atraso
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Pagamentos */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Pagamentos</CardTitle>
          <CardDescription>Gerencie todas as cobranças e pagamentos</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por aluno, responsável ou referência..."
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
                <SelectItem value="pago">Pago</SelectItem>
                <SelectItem value="vencido">Vencido</SelectItem>
                <SelectItem value="cancelado">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Aluno</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Valor</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Vencimento</TableHead>
                <TableHead>Pagamento</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPagamentos.map((pagamento) => {
                const status = statusConfig[pagamento.status as keyof typeof statusConfig]
                const StatusIcon = status.icon

                return (
                  <TableRow key={pagamento.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium">{pagamento.aluno}</div>
                        <div className="text-sm text-muted-foreground">{pagamento.responsavel}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{tipoConfig[pagamento.tipo as keyof typeof tipoConfig]}</Badge>
                    </TableCell>
                    <TableCell className="font-medium">
                      R$ {pagamento.valor.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </TableCell>
                    <TableCell>
                      <div className={`flex items-center gap-2 ${status.color}`}>
                        <StatusIcon className="h-4 w-4" />
                        <Badge variant={status.variant}>{status.label}</Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">{new Date(pagamento.dataVencimento).toLocaleDateString("pt-BR")}</div>
                    </TableCell>
                    <TableCell>
                      {pagamento.dataPagamento ? (
                        <div className="space-y-1">
                          <div className="text-sm text-green-600">
                            {new Date(pagamento.dataPagamento).toLocaleDateString("pt-BR")}
                          </div>
                          <div className="text-xs text-muted-foreground">{pagamento.metodoPagamento}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Download className="h-3 w-3" />
                        </Button>
                        {pagamento.status === "pendente" && (
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
