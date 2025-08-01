// Tipos para Turma
export interface Turma {
  id: string
  escolaId: string
  nome: string
  serie: string
  periodo: "matutino" | "vespertino" | "integral"
  capacidade: number
  vagasOcupadas: number
  vagasDisponiveis: number
  anoLetivo: number
  professor?: string
  sala?: string
  ativo: boolean
  createdAt: string
  updatedAt: string
  escolaNome?: string
  alunos?: Array<{
    id: string
    nome: string
    status: string
  }>
}

export interface CreateTurmaData {
  escolaId: string
  nome: string
  serie: string
  periodo: "matutino" | "vespertino" | "integral"
  capacidade: number
  anoLetivo: number
  professor?: string
  sala?: string
}

export interface UpdateTurmaData {
  nome?: string
  serie?: string
  periodo?: "matutino" | "vespertino" | "integral"
  capacidade?: number
  anoLetivo?: number
  professor?: string
  sala?: string
  ativo?: boolean
}

export interface TurmasResponse {
  data: Turma[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

export interface TurmasFilters {
  escolaId?: string
  search?: string
  periodo?: string
  serie?: string
  page?: number
  limit?: number
}

// Funções da API
export async function getTurmas(filters: TurmasFilters = {}): Promise<TurmasResponse> {
  const params = new URLSearchParams()
  
  if (filters.escolaId) params.append("escola_id", filters.escolaId)
  if (filters.search) params.append("search", filters.search)
  if (filters.periodo) params.append("periodo", filters.periodo)
  if (filters.serie) params.append("serie", filters.serie)
  if (filters.page) params.append("page", filters.page.toString())
  if (filters.limit) params.append("limit", filters.limit.toString())

  const response = await fetch(`/api/turmas?${params.toString()}`)
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro ao buscar turmas")
  }
  
  return response.json()
}

export async function getTurma(id: string): Promise<Turma> {
  const response = await fetch(`/api/turmas/${id}`)
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro ao buscar turma")
  }
  
  return response.json()
}

export async function createTurma(data: CreateTurmaData): Promise<Turma> {
  const response = await fetch("/api/turmas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro ao criar turma")
  }
  
  return response.json()
}

export async function updateTurma(id: string, data: UpdateTurmaData): Promise<Turma> {
  const response = await fetch(`/api/turmas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro ao atualizar turma")
  }
  
  return response.json()
}

export async function deleteTurma(id: string): Promise<void> {
  const response = await fetch(`/api/turmas/${id}`, {
    method: "DELETE",
  })
  
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.error || "Erro ao excluir turma")
  }
}

// Funções utilitárias
export function getTurmaStatusColor(vagasOcupadas: number, capacidade: number): string {
  const percentual = (vagasOcupadas / capacidade) * 100
  
  if (percentual >= 95) return "red"
  if (percentual >= 80) return "yellow"
  return "green"
}

export function formatPeriodo(periodo: string): string {
  const periodos = {
    matutino: "Matutino",
    vespertino: "Vespertino",
    integral: "Integral"
  }
  
  return periodos[periodo as keyof typeof periodos] || periodo
}

export function getTurmaOcupacaoPercentual(vagasOcupadas: number, capacidade: number): number {
  return Math.round((vagasOcupadas / capacidade) * 100)
}
