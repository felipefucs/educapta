import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// Validation schema for student update
const updateAlunoSchema = z.object({
  nome: z.string().min(1, "Nome é obrigatório").optional(),
  dataNascimento: z.string().optional(),
  cpf: z.string().optional(),
  endereco: z.string().optional(),
  turmaId: z.string().optional(),
  turma: z.string().optional(),
  necessidadesEspeciais: z.string().optional(),
  medicamentos: z.string().optional(),
  alergias: z.string().optional(),
  contatoEmergencia: z.string().optional(),
  status: z.enum(["matriculado", "pre_matricula", "inativo"]).optional(),
  responsavel: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
})

// GET /api/alunos/[id] - Get a specific student
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const aluno = await prisma.aluno.findUnique({
      where: { id },
    })

    if (!aluno) {
      return NextResponse.json(
        { error: "Aluno não encontrado" },
        { status: 404 }
      )
    }

    return NextResponse.json(aluno)
  } catch (error) {
    console.error("Erro ao buscar aluno:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// PUT /api/alunos/[id] - Update a specific student
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    // Validate request body
    const validatedData = updateAlunoSchema.parse(body)

    // Check if student exists
    const existingAluno = await prisma.aluno.findUnique({
      where: { id },
    })

    if (!existingAluno) {
      return NextResponse.json(
        { error: "Aluno não encontrado" },
        { status: 404 }
      )
    }

    // Convert date string to Date object if provided
    const data: any = {
      ...validatedData,
      dataNascimento: validatedData.dataNascimento 
        ? new Date(validatedData.dataNascimento) 
        : undefined,
    }

    // Remove undefined values
    Object.keys(data).forEach(key => {
      if (data[key] === undefined) {
        delete data[key]
      }
    })

    // Update student
    const updatedAluno = await prisma.aluno.update({
      where: { id },
      data,
    })

    return NextResponse.json(updatedAluno)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Erro ao atualizar aluno:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// DELETE /api/alunos/[id] - Delete a specific student
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Check if student exists
    const existingAluno = await prisma.aluno.findUnique({
      where: { id },
    })

    if (!existingAluno) {
      return NextResponse.json(
        { error: "Aluno não encontrado" },
        { status: 404 }
      )
    }

    // Delete student
    await prisma.aluno.delete({
      where: { id },
    })

    return NextResponse.json(
      { message: "Aluno excluído com sucesso" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Erro ao excluir aluno:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
