import { neon } from "@neondatabase/serverless"

// Criar um mock do banco de dados quando DATABASE_URL não estiver definido
// Esta função retorna um proxy que simula as chamadas SQL básicas
const createMockSql = () => {
  console.log("ATENÇÃO: Usando mock do banco de dados para ambiente de teste!")
  
  // Um proxy para simular as operações SQL
  return new Proxy({}, {
    get: (target, prop) => {
      // Função que retorna Promise resolvida com array vazio para simular consultas
      return (...args: any[]) => {
        console.log(`Mock SQL: Chamada para ${String(prop)} com argumentos:`, args)
        return Promise.resolve([])
      }
    }
  })
}

// Usar o banco de dados real ou o mock dependendo da disponibilidade da variável
export const sql = process.env.DATABASE_URL 
  ? neon(process.env.DATABASE_URL)
  : createMockSql()

// Tipos TypeScript para as tabelas
export interface Escola {
  id: string
  nome: string
  cnpj?: string
  endereco?: string
  telefone?: string
  email?: string
  logo_url?: string
  ativo: boolean
  created_at: Date
  updated_at: Date
}

export interface Usuario {
  id: string
  escola_id: string
  nome: string
  email: string
  senha_hash: string
  tipo: "secretaria" | "direcao"
  ativo: boolean
  created_at: Date
}

export interface Aluno {
  id: string
  escola_id: string
  nome: string
  data_nascimento?: Date
  cpf?: string
  rg?: string
  endereco?: string
  telefone?: string
  email?: string
  necessidades_especiais?: string
  medicamentos?: string
  alergias?: string
  contato_emergencia?: string
  turma_id?: string
  status: "captacao" | "pre_matricula" | "matriculado" | "inativo"
  created_at: Date
  updated_at: Date
}

export interface Turma {
  id: string
  escola_id: string
  nome: string
  serie: string
  periodo: "matutino" | "vespertino" | "integral"
  capacidade: number
  vagas_ocupadas: number
  ano_letivo: number
  ativo: boolean
  created_at: Date
}

export interface Responsavel {
  id: string
  escola_id: string
  nome: string
  cpf?: string
  rg?: string
  telefone?: string
  email?: string
  endereco?: string
  profissao?: string
  created_at: Date
}

export interface Contrato {
  id: string
  escola_id: string
  aluno_id: string
  numero_contrato: string
  conteudo?: string
  status: "pendente" | "assinado" | "cancelado"
  url_assinatura?: string
  data_assinatura?: Date
  created_at: Date
}

export interface Pagamento {
  id: string
  escola_id: string
  aluno_id: string
  tipo: "matricula" | "mensalidade"
  valor: number
  status: "pendente" | "pago" | "vencido" | "cancelado"
  data_vencimento: Date
  data_pagamento?: Date
  metodo_pagamento?: string
  referencia_externa?: string
  created_at: Date
}
