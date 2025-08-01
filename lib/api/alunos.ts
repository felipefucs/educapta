// API utilities for student (aluno) operations

export interface Aluno {
  id: string
  escolaId: string
  nome: string
  dataNascimento?: Date | string | null
  cpf?: string | null
  endereco?: string | null
  turmaId?: string | null
  turma?: string | null
  necessidadesEspeciais?: string | null
  medicamentos?: string | null
  alergias?: string | null
  contatoEmergencia?: string | null
  status: string
  responsavel?: string | null
  telefone?: string | null
  email?: string | null
  createdAt: Date | string
  updatedAt: Date | string
}

export interface CreateAlunoData {
  escolaId: string
  nome: string
  dataNascimento?: string
  cpf?: string
  endereco?: string
  turmaId?: string
  turma?: string
  necessidadesEspeciais?: string
  medicamentos?: string
  alergias?: string
  contatoEmergencia?: string
  status?: string
  responsavel?: string
  telefone?: string
  email?: string
}

export interface UpdateAlunoData extends Partial<CreateAlunoData> {}

export interface AlunosResponse {
  data: Aluno[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

const API_BASE_URL = '/api/alunos'

// Get all students with optional filters
export async function getAlunos(params?: {
  escola_id?: string
  status?: string
  search?: string
  page?: number
  limit?: number
}): Promise<AlunosResponse> {
  const searchParams = new URLSearchParams()
  
  if (params?.escola_id) searchParams.append('escola_id', params.escola_id)
  if (params?.status) searchParams.append('status', params.status)
  if (params?.search) searchParams.append('search', params.search)
  if (params?.page) searchParams.append('page', params.page.toString())
  if (params?.limit) searchParams.append('limit', params.limit.toString())

  const url = searchParams.toString() 
    ? `${API_BASE_URL}?${searchParams.toString()}`
    : API_BASE_URL

  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch students: ${response.statusText}`)
  }

  return response.json()
}

// Get a specific student by ID
export async function getAluno(id: string): Promise<Aluno> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch student: ${response.statusText}`)
  }

  return response.json()
}

// Create a new student
export async function createAluno(data: CreateAlunoData): Promise<Aluno> {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to create student: ${response.statusText}`)
  }

  return response.json()
}

// Update a student
export async function updateAluno(id: string, data: UpdateAlunoData): Promise<Aluno> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to update student: ${response.statusText}`)
  }

  return response.json()
}

// Delete a student
export async function deleteAluno(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (!response.ok) {
    const errorData = await response.json()
    throw new Error(errorData.error || `Failed to delete student: ${response.statusText}`)
  }
}
