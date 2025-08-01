"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Edit, Users, AlertCircle, CheckCircle, Trash2, Plus } from "lucide-react"
import { TurmaForm } from "@/components/forms/turma-form"
import { PageHeader } from "@/components/common/page-header"
import { SearchFilters } from "@/components/common/search-filters"
import { DataTable } from "@/components/common/data-table"
import { StatsCards } from "@/components/common/stats-cards"
import { toast } from "sonner"
import {
  getTurmas,
  deleteTurma,
  type Turma,
  type TurmasFilters,
  getTurmaStatusColor,
  formatPeriodo,
  getTurmaOcupacaoPercentual
} from "@/lib/api/turmas"

export default function TurmasPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPeriodo, setSelectedPeriodo] = useState("todos")
  const [currentView, setCurrentView] = useState<"list" | "form">("list")
  const [turmas, setTurmas] = useState<Turma[]>([])
  const [loading, setLoading] = useState(true)
  const [editingTurma, setEditingTurma] = useState<Turma | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [totalTurmas, setTotalTurmas] = useState(0)

  const periodos = {
    matutino: "Matutino",
    vespertino: "Vespertino",
    integral: "Integral",
  }

  const getOcupacaoStatus = (ocupadas: number, capacidade: number) => {
    const percentual = (ocupadas / capacidade) * 100
    if (percentual >= 100) return { status: "lotada", color: "text-red-600", icon: AlertCircle }
    if (percentual >= 80) return { status: "quase-lotada", color: "text-yellow-600", icon: AlertCircle }
    return { status: "disponivel", color: "text-green-600", icon: CheckCircle }
  }

  // Carregar dados das turmas
  const loadTurmas = async () => {
    try {
      setLoading(true)
      const filters: TurmasFilters = {
        escolaId: "escola123", // Por enquanto usando escola padrão
        search: searchTerm || undefined,
        periodo: selectedPeriodo !== "todos" ? selectedPeriodo : undefined,
        page: currentPage,
        limit: 10
      }
      
      const response = await getTurmas(filters)
      setTurmas(response.data)
      setTotalPages(response.pagination.pages)
      setTotalTurmas(response.pagination.total)
    } catch (error) {
      console.error("Erro ao carregar turmas:", error)
      toast.error("Erro ao carregar turmas")
    } finally {
      setLoading(false)
    }
  }

  // Carregar dados quando a página carrega ou filtros mudam
  useEffect(() => {
    loadTurmas()
  }, [searchTerm, selectedPeriodo, currentPage])

  // Funções CRUD
  const handleEdit = (turma: Turma) => {
    setEditingTurma(turma)
    setCurrentView("form")
  }

  const handleDelete = async (turma: Turma) => {
    if (!confirm(`Tem certeza que deseja excluir a turma "${turma.nome}"?`)) {
      return
    }

    try {
      await deleteTurma(turma.id)
      toast.success("Turma excluída com sucesso")
      loadTurmas()
    } catch (error) {
      console.error("Erro ao excluir turma:", error)
      toast.error("Erro ao excluir turma")
    }
  }

  const handleFormSuccess = () => {
    setCurrentView("list")
    setEditingTurma(null)
    loadTurmas()
    toast.success(editingTurma ? "Turma atualizada com sucesso" : "Turma criada com sucesso")
  }

  const handleFormCancel = () => {
    setCurrentView("list")
    setEditingTurma(null)
  }

  const stats = [
    {
      title: "Total de Turmas",
      value: totalTurmas,
      description: "Ano letivo 2024",
      icon: Users,
    },
    {
      title: "Vagas Totais",
      value: turmas.reduce((acc, turma) => acc + turma.capacidade, 0),
      description: "Capacidade máxima",
      icon: Users,
    },
    {
      title: "Vagas Ocupadas",
      value: turmas.reduce((acc, turma) => acc + turma.vagasOcupadas, 0),
      description: "Alunos matriculados",
      icon: CheckCircle,
    },
    {
      title: "Vagas Disponíveis",
      value: turmas.reduce((acc, turma) => acc + (turma.capacidade - turma.vagasOcupadas), 0),
      description: "Para novas matrículas",
      icon: AlertCircle,
    },
  ]

  const filteredTurmas = turmas.filter((turma) => {
    const matchesPeriodo = selectedPeriodo === "todos" || turma.periodo === selectedPeriodo
    const matchesSearch =
      turma.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      turma.serie.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (turma.professor && turma.professor.toLowerCase().includes(searchTerm.toLowerCase()))
    return matchesPeriodo && matchesSearch
  })

  const columns = [
    {
      key: "nome",
      label: "Turma",
      render: (value: string, row: any) => (
        <div>
          <div className="font-medium">{value}</div>
          <div className="text-sm text-muted-foreground">
            {row.serie} - {row.sala}
          </div>
        </div>
      ),
    },
    {
      key: "periodo",
      label: "Período",
      render: (value: string) => <Badge variant="outline">{periodos[value as keyof typeof periodos]}</Badge>,
    },
    { key: "professor", label: "Professor" },
    {
      key: "ocupacao",
      label: "Ocupação",
      render: (_: any, row: any) => {
        const percentualOcupacao = (row.vagasOcupadas / row.capacidade) * 100
        return (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>
                {row.vagasOcupadas}/{row.capacidade}
              </span>
              <span>{Math.round(percentualOcupacao)}%</span>
            </div>
            <Progress value={percentualOcupacao} className="h-2" />
          </div>
        )
      },
    },
    {
      key: "status",
      label: "Status",
      render: (_: any, row: any) => {
        const ocupacao = getOcupacaoStatus(row.vagasOcupadas, row.capacidade)
        const StatusIcon = ocupacao.icon
        return (
          <div className={`flex items-center gap-2 ${ocupacao.color}`}>
            <StatusIcon className="h-4 w-4" />
            <span className="text-sm font-medium">
              {ocupacao.status === "lotada" && "Lotada"}
              {ocupacao.status === "quase-lotada" && "Quase Lotada"}
              {ocupacao.status === "disponivel" && "Disponível"}
            </span>
          </div>
        )
      },
    },
  ]

  const actions = [
    { 
      icon: Edit, 
      onClick: (row: Turma) => handleEdit(row),
      tooltip: "Editar turma"
    },
    { 
      icon: Trash2, 
      onClick: (row: Turma) => handleDelete(row),
      tooltip: "Excluir turma",
      variant: "destructive" as const
    },
  ]

  const filterOptions = [
    {
      value: selectedPeriodo,
      onChange: setSelectedPeriodo,
      placeholder: "Período",
      options: [
        { value: "todos", label: "Todos os Períodos" },
        { value: "matutino", label: "Matutino" },
        { value: "vespertino", label: "Vespertino" },
        { value: "integral", label: "Integral" },
      ],
    },
  ]

  if (currentView === "form") {
    return (
      <div className="space-y-6">
        <TurmaForm 
          editingTurma={editingTurma}
          onSuccess={handleFormSuccess}
          onCancel={handleFormCancel}
        />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Gestão de Turmas"
        description="Gerencie turmas, vagas e alocação de alunos"
        buttonText="Nova Turma"
        onButtonClick={() => setCurrentView("form")}
      />

      <StatsCards cards={stats} />

      <Card>
        <CardHeader>
          <CardTitle>Lista de Turmas</CardTitle>
          <CardDescription>Gerencie todas as turmas da escola</CardDescription>
        </CardHeader>
        <CardContent>
          <SearchFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            searchPlaceholder="Buscar por turma, série ou professor..."
            filters={filterOptions}
          />
          <DataTable columns={columns} data={filteredTurmas} actions={actions} />
        </CardContent>
      </Card>
    </div>
  )
}
