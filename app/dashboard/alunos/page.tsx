"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, Edit, FileText, MessageSquare, Trash2 } from "lucide-react"
import { AlunoForm } from "@/components/forms/aluno-form"
import { PageHeader } from "@/components/common/page-header"
import { SearchFilters } from "@/components/common/search-filters"
import { DataTable } from "@/components/common/data-table"
import { StatusBadge } from "@/components/common/status-badge"
import { toast } from "sonner"
import { getAlunos, deleteAluno, type Aluno } from "@/lib/api/alunos"

export default function AlunosPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedStatus, setSelectedStatus] = useState("todos")
  const [currentView, setCurrentView] = useState<"list" | "form">("list")
  const [alunos, setAlunos] = useState<Aluno[]>([])
  const [loading, setLoading] = useState(true)
  const [editingAluno, setEditingAluno] = useState<Aluno | null>(null)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    pages: 0,
  })

  // Load students from API
  const loadAlunos = async () => {
    try {
      setLoading(true)
      const response = await getAlunos({
        escola_id: "cmdsw8c390000o1084nanq19w", // Using the actual school ID from database
        status: selectedStatus !== "todos" ? selectedStatus : undefined,
        search: searchTerm || undefined,
        page: pagination.page,
        limit: pagination.limit,
      })
      setAlunos(response.data)
      setPagination(response.pagination)
    } catch (error) {
      console.error("Error loading students:", error)
      toast.error("Erro ao carregar alunos")
    } finally {
      setLoading(false)
    }
  }

  // Load students on component mount and when filters change
  useEffect(() => {
    loadAlunos()
  }, [selectedStatus, searchTerm, pagination.page])

  // Handle student deletion
  const handleDeleteAluno = async (aluno: Aluno) => {
    if (!confirm(`Tem certeza que deseja excluir o aluno ${aluno.nome}?`)) {
      return
    }

    try {
      await deleteAluno(aluno.id)
      toast.success("Aluno excluído com sucesso")
      loadAlunos() // Reload the list
    } catch (error) {
      console.error("Error deleting student:", error)
      toast.error("Erro ao excluir aluno")
    }
  }

  const statusConfig = {
    captacao: { label: "Captação", variant: "secondary" as const },
    pre_matricula: { label: "Pré-matrícula", variant: "default" as const },
    matriculado: { label: "Matriculado", variant: "default" as const },
    inativo: { label: "Inativo", variant: "destructive" as const },
  }

  // Since filtering is now handled by the API, we use the alunos directly
  const filteredAlunos = alunos

  const columns = [
    {
      key: "nome",
      label: "Aluno",
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">
            Nascimento: {new Date(row.dataNascimento).toLocaleDateString("pt-BR")}
          </div>
        </div>
      ),
    },
    { key: "turma", label: "Turma" },
    {
      key: "status",
      label: "Status",
      render: (value: string) => <StatusBadge status={value} config={statusConfig} />,
    },
    { key: "responsavel", label: "Responsável" },
    {
      key: "contato",
      label: "Contato",
      render: (_: any, row: any) => (
        <div className="space-y-1">
          <div className="text-sm">{row.telefone}</div>
          <div className="text-sm text-muted-foreground">{row.email}</div>
        </div>
      ),
    },
  ]

  const actions = [
    { icon: Eye, onClick: (row: Aluno) => console.log("Ver", row) },
    { 
      icon: Edit, 
      onClick: (row: Aluno) => {
        setEditingAluno(row)
        setCurrentView("form")
      }
    },
    { icon: FileText, onClick: (row: Aluno) => console.log("Documentos", row) },
    { icon: MessageSquare, onClick: (row: Aluno) => console.log("Mensagem", row) },
    { 
      icon: Trash2, 
      onClick: (row: Aluno) => handleDeleteAluno(row),
      variant: "destructive" as const
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
        { value: "inativo", label: "Inativo" },
      ],
    },
  ]

  const handleSaveAluno = async (success: boolean) => {
    if (success) {
      await loadAlunos() // Reload the list to show the new/updated student
    }
    setCurrentView("list")
    setEditingAluno(null)
  }

  const handleCloseForm = () => {
    setCurrentView("list")
    setEditingAluno(null)
  }

  if (currentView === "form") {
    return (
      <div className="space-y-6">
        <AlunoForm 
          onClose={handleCloseForm} 
          onSave={handleSaveAluno}
          editingAluno={editingAluno}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestão de Alunos"
        description="Cadastro e gerenciamento de alunos da escola"
        buttonText="Novo Aluno"
        onButtonClick={() => setCurrentView("form")}
      />

      <Card>
        <CardHeader>
          <CardTitle>Lista de Alunos</CardTitle>
          <CardDescription>Gerencie todos os alunos cadastrados na escola</CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Buscar por nome do aluno ou responsável..."
            filters={filterOptions}
          />
          <DataTable columns={columns} data={filteredAlunos} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}
