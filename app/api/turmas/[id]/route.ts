import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

// Schema de validação para atualização de turma
const updateTurmaSchema = z.object({
  nome: z.string().min(1, "Nome da turma é obrigatório").max(100).optional(),
  serie: z.string().min(1, "Série é obrigatória").max(50).optional(),
  periodo: z.enum(["matutino", "vespertino", "integral"], {
    errorMap: () => ({ message: "Período deve ser matutino, vespertino ou integral" })
  }).optional(),
  capacidade: z.number().int().min(1, "Capacidade deve ser pelo menos 1").max(100).optional(),
  anoLetivo: z.number().int().min(2020).max(2030).optional(),
  professor: z.string().optional(),
  sala: z.string().optional(),
  ativo: z.boolean().optional()
})

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const turma = await prisma.turma.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            alunoTurmas: {
              where: {
                aluno: {
                  status: "matriculado"
                }
              }
            }
          }
        },
        escola: {
          select: {
            nome: true
          }
        },
        alunoTurmas: {
          include: {
            aluno: {
              select: {
                id: true,
                nome: true,
                status: true
              }
            }
          }
        }
      }
    })

    if (!turma) {
      return NextResponse.json(
        { error: "Turma não encontrada" },
        { status: 404 }
      )
    }

    // Transformar dados para incluir informações calculadas
    const turmaWithStats = {
      ...turma,
      vagasOcupadas: turma._count.alunoTurmas,
      vagasDisponiveis: turma.capacidade - turma._count.alunoTurmas,
      escolaNome: turma.escola.nome,
      alunos: turma.alunoTurmas.map(at => at.aluno),
      _count: undefined, // Remove _count do resultado
      escola: undefined, // Remove escola do resultado
      alunoTurmas: undefined // Remove alunoTurmas do resultado
    }

    return NextResponse.json(turmaWithStats)
  } catch (error) {
    console.error("Erro ao buscar turma:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validar dados de entrada
    const validatedData = updateTurmaSchema.parse(body)

    // Verificar se a turma existe
    const existingTurma = await prisma.turma.findUnique({
      where: { id: params.id }
    })

    if (!existingTurma) {
      return NextResponse.json(
        { error: "Turma não encontrada" },
        { status: 404 }
      )
    }

    // Se o nome está sendo alterado, verificar se não existe outra turma com o mesmo nome
    if (validatedData.nome && validatedData.nome !== existingTurma.nome) {
      const duplicateTurma = await prisma.turma.findFirst({
        where: {
          escolaId: existingTurma.escolaId,
          nome: validatedData.nome,
          anoLetivo: validatedData.anoLetivo || existingTurma.anoLetivo,
          id: { not: params.id }
        }
      })

      if (duplicateTurma) {
        return NextResponse.json(
          { error: "Já existe uma turma com este nome nesta escola" },
          { status: 400 }
        )
      }
    }

    // Atualizar a turma
    const turma = await prisma.turma.update({
      where: { id: params.id },
      data: validatedData,
      include: {
        escola: {
          select: {
            nome: true
          }
        }
      }
    })

    return NextResponse.json(turma)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Erro ao atualizar turma:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Verificar se a turma existe
    const existingTurma = await prisma.turma.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: {
            alunoTurmas: true
          }
        }
      }
    })

    if (!existingTurma) {
      return NextResponse.json(
        { error: "Turma não encontrada" },
        { status: 404 }
      )
    }

    // Verificar se há alunos matriculados na turma
    if (existingTurma._count.alunoTurmas > 0) {
      return NextResponse.json(
        { error: "Não é possível excluir uma turma com alunos matriculados" },
        { status: 400 }
      )
    }

    // Excluir a turma (soft delete)
    await prisma.turma.update({
      where: { id: params.id },
      data: { ativo: false }
    })

    return NextResponse.json({ message: "Turma excluída com sucesso" })
  } catch (error) {
    console.error("Erro ao excluir turma:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
