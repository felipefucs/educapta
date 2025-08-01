"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, Phone, MessageSquare, Users } from "lucide-react"
import { ResponsavelForm } from "@/components/forms/responsavel-form"
import { PageHeader } from "@/components/common/page-header"
import { SearchFilters } from "@/components/common/search-filters"
import { DataTable } from "@/components/common/data-table"
import { StatusBadge } from "@/components/common/status-badge"
import { StatsCards } from "@/components/common/stats-cards"

export default function ResponsaveisPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTipo, setSelectedTipo] = useState("todos")
  const [currentView, setCurrentView] = useState<"list" | "form">("list")

  // Dados mockados
  const responsaveis = [
    {
      id: "1",
      nome: "Maria Silva",
      cpf: "123.456.789-00",
      telefone: "(11) 99999-1234",
      email: "maria@email.com",
      profissao: "Advogada",
      tipo: "mae",
      alunos: ["João Silva Santos"],
      turmas: ["1º Ano A"],
    },
    {
      id: "2",
      nome: "Carlos Oliveira",
      cpf: "987.654.321-00",
      telefone: "(11) 88888-5678",
      email: "carlos@email.com",
      profissao: "Engenheiro",
      tipo: "pai",
      alunos: ["Ana Carolina Oliveira"],
      turmas: ["2º Ano A"],
    },
  ]

  const tipoConfig = {
    pai: { label: "Pai", variant: "default" as const },
    mae: { label: "Mãe", variant: "secondary" as const },
    responsavel_legal: { label: "Responsável Legal", variant: "outline" as const },
  }

  const statsCards = [
    {
      title: "Total de Responsáveis",
      value: responsaveis.length,
      description: "Cadastrados no sistema",
      icon: Users,
    },
    {
      title: "Pais",
      value: responsaveis.filter((r) => r.tipo === "pai").length,
      description: "Responsáveis do tipo pai",
      icon: Users,
      iconColor: "text-blue-600",
    },
    {
      title: "Mães",
      value: responsaveis.filter((r) => r.tipo === "mae").length,
      description: "Responsáveis do tipo mãe",
      icon: Users,
      iconColor: "text-pink-600",
    },
    {
      title: "Responsáveis Legais",
      value: responsaveis.filter((r) => r.tipo === "responsavel_legal").length,
      description: "Outros responsáveis",
      icon: Users,
      iconColor: "text-green-600",
    },
  ]

  const filteredResponsaveis = responsaveis.filter((responsavel) => {
    const matchesTipo = selectedTipo === "todos" || responsavel.tipo === selectedTipo
    const matchesSearch =
      responsavel.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      responsavel.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      responsavel.cpf.includes(searchTerm)
    return matchesTipo && matchesSearch
  })

  const columns = [
    {
      key: "nome",
      label: "Responsável",
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">CPF: {row.cpf}</div>
        </div>
      ),
    },
    {
      key: "tipo",
      label: "Tipo",
      render: (value: string) => <StatusBadge status={value} config={tipoConfig} />,
    },
    {
      key: "contato",
      label: "Contato",
      render: (_: any, row: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <Phone className="h-3 w-3" />
            {row.telefone}
          </div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
    { key: "profissao", label: "Profissão" },
    {
      key: "alunos",
      label: "Alunos",
      render: (_: any, row: any) => (
        <div className="space-y-1">
          {row.alunos.map((aluno: string, index: number) => (
            <div key={index} className="text-sm">
              {aluno}
              <span className="text-muted-foreground ml-1">({row.turmas[index]})</span>
            </div>
          ))}
        </div>
      ),
    },
  ]

  const actions = [
    { icon: Eye, onClick: (row: any) => console.log("Ver", row) },
    { icon: Edit, onClick: (row: any) => console.log("Editar", row) },
    { icon: Phone, onClick: (row: any) => console.log("Ligar", row) },
    { icon: MessageSquare, onClick: (row: any) => console.log("Mensagem", row) },
  ]

  const filterOptions = [
    {
      value: selectedTipo,
      onChange: setSelectedTipo,
      placeholder: "Tipo",
      options: [
        { value: "todos", label: "Todos os Tipos" },
        { value: "pai", label: "Pai" },
        { value: "mae", label: "Mãe" },
        { value: "responsavel_legal", label: "Responsável Legal" },
      ],
    },
  ]

  const handleSaveResponsavel = (data: any) => {
    console.log("Novo responsável:", data)
    setCurrentView("list")
  }

  const handleCloseForm = () => {
    setCurrentView("list")
  }

  if (currentView === "form") {
    return (
      <div className="space-y-6">
        <ResponsavelForm onClose={handleCloseForm} onSave={handleSaveResponsavel} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestão de Responsáveis"
        description="Cadastro e gerenciamento de responsáveis pelos alunos"
        buttonText="Novo Responsável"
        onButtonClick={() => setCurrentView("form")}
      />

      <StatsCards cards={statsCards} />

      <Card>
        <CardHeader>
          <CardTitle>Lista de Responsáveis</CardTitle>
          <CardDescription>Gerencie todos os responsáveis cadastrados</CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Buscar por nome, e-mail ou CPF..."
            filters={filterOptions}
          />
          <DataTable columns={columns} data={filteredResponsaveis} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}
