"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Phone, Mail, Calendar, ArrowRight } from "lucide-react"
import { LeadForm } from "@/components/forms/lead-form"
import { PageHeader } from "@/components/common/page-header"
import { SearchFilters } from "@/components/common/search-filters"
import { DataTable } from "@/components/common/data-table"
import { MatriculaForm } from "@/components/forms/matricula-form"

export default function FunilPage() {
  const [selectedStatus, setSelectedStatus] = useState("todos")
  const [searchTerm, setSearchTerm] = useState("")
  const [currentView, setCurrentView] = useState<"list" | "form" | "matricula">("list")
  const [selectedLead, setSelectedLead] = useState<any>(null)

  // Dados mockados
  const leads = [
    {
      id: "1",
      nome: "Ana Silva",
      telefone: "(11) 99999-1234",
      email: "ana@email.com",
      status: "captacao",
      turmaInteresse: "1º Ano A",
      dataContato: "2024-01-15",
      ultimaInteracao: "Ligação telefônica",
    },
    {
      id: "2",
      nome: "Carlos Santos",
      telefone: "(11) 88888-5678",
      email: "carlos@email.com",
      status: "pre_matricula",
      turmaInteresse: "2º Ano A",
      dataContato: "2024-01-10",
      ultimaInteracao: "Visita à escola",
    },
  ]

  const statusConfig = {
    captacao: { label: "Captação", color: "bg-blue-500", count: 67 },
    pre_matricula: { label: "Pré-matrícula", color: "bg-yellow-500", count: 34 },
    matriculado: { label: "Matriculado", color: "bg-green-500", count: 198 },
  }

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = selectedStatus === "todos" || lead.status === selectedStatus
    const matchesSearch =
      lead.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lead.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesStatus && matchesSearch
  })

  const columns = [
    { key: "nome", label: "Nome" },
    {
      key: "contato",
      label: "Contato",
      render: (_: any, row: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <Phone className="h-3 w-3" />
            {row.telefone}
          </div>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Mail className="h-3 w-3" />
            {row.email}
          </div>
        </div>
      ),
    },
    {
      key: "status",
      label: "Status",
      render: (value: string) => (
        <Badge variant="secondary" className={`${statusConfig[value as keyof typeof statusConfig].color} text-white`}>
          {statusConfig[value as keyof typeof statusConfig].label}
        </Badge>
      ),
    },
    { key: "turmaInteresse", label: "Turma" },
    {
      key: "ultimaInteracao",
      label: "Última Interação",
      render: (value: string) => (
        <div className="flex items-center gap-1 text-sm">
          <Calendar className="h-3 w-3" />
          {value}
        </div>
      ),
    },
  ]

  const actions = [
    { icon: Phone, onClick: (row: any) => console.log("Ligar", row) },
    { icon: Mail, onClick: (row: any) => console.log("Email", row) },
    {
      icon: ArrowRight,
      onClick: (row: any) => {
        setSelectedLead(row)
        setCurrentView("matricula")
      },
      tooltip: "Matricular",
    },
  ]

  const filterOptions = [
    {
      value: selectedStatus,
      onChange: setSelectedStatus,
      placeholder: "Status",
      options: [
        { value: "todos", label: "Todos os Status" },
        { value: "captacao", label: "Captação" },
        { value: "pre_matricula", label: "Pré-matrícula" },
        { value: "matriculado", label: "Matriculado" },
      ],
    },
  ]

  const handleSaveLead = (data: any) => {
    console.log("Novo lead:", data)
    setCurrentView("list")
  }

  const handleSaveMatricula = (data: any) => {
    console.log("Nova matrícula:", data)
    setCurrentView("list")
    setSelectedLead(null)
  }

  const handleCloseForm = () => {
    setCurrentView("list")
    setSelectedLead(null)
  }

  if (currentView === "form") {
    return (
      <div className="space-y-6">
        <LeadForm onClose={handleCloseForm} onSave={handleSaveLead} />
      </div>
    )
  }

  if (currentView === "matricula" && selectedLead) {
    return (
      <div className="space-y-6">
        <MatriculaForm lead={selectedLead} onClose={handleCloseForm} onSave={handleSaveMatricula} />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Funil de Matrículas"
        description="Gerencie leads e acompanhe o processo de matrícula"
        buttonText="Novo Lead"
        onButtonClick={() => setCurrentView("form")}
      />

      {/* Contadores do Funil */}
      <div className="grid gap-4 md:grid-cols-3">
        {Object.entries(statusConfig).map(([key, config]) => (
          <Card key={key} className="cursor-pointer hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{config.label}</CardTitle>
              <div className={`w-3 h-3 rounded-full ${config.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{config.count}</div>
              <p className="text-xs text-muted-foreground">
                {key === "captacao" && "Novos contatos"}
                {key === "pre_matricula" && "Em processo"}
                {key === "matriculado" && "Finalizados"}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Leads</CardTitle>
          <CardDescription>Lista de todos os leads no funil de matrículas</CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Buscar por nome ou e-mail..."
            filters={filterOptions}
          />
          <DataTable columns={columns} data={filteredLeads} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}
