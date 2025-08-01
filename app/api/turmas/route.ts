import { type NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/prisma"

// Schema de validação para criação de turma
const createTurmaSchema = z.object({
  escolaId: z.string().min(1, "ID da escola é obrigatório"),
  nome: z.string().min(1, "Nome da turma é obrigatório").max(100),
  serie: z.string().min(1, "Série é obrigatória").max(50),
  periodo: z.enum(["matutino", "vespertino", "integral"], {
    errorMap: () => ({ message: "Período deve ser matutino, vespertino ou integral" })
  }),
  capacidade: z.number().int().min(1, "Capacidade deve ser pelo menos 1").max(100),
  anoLetivo: z.number().int().min(2020).max(2030),
  professor: z.string().optional(),
  sala: z.string().optional()
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const escolaId = searchParams.get("escola_id")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const search = searchParams.get("search") || ""
    const periodo = searchParams.get("periodo")
    const serie = searchParams.get("serie")

    const skip = (page - 1) * limit

    // Construir filtros
    const where: any = {
      ativo: true
    }

    if (escolaId) {
      where.escolaId = escolaId
    }

    if (search) {
      where.OR = [
        { nome: { contains: search, mode: "insensitive" } },
        { serie: { contains: search, mode: "insensitive" } },
        { professor: { contains: search, mode: "insensitive" } }
      ]
    }

    if (periodo && periodo !== "todos") {
      where.periodo = periodo
    }

    if (serie && serie !== "todas") {
      where.serie = serie
    }

    // Buscar turmas com contagem de alunos
    const [turmas, total] = await Promise.all([
      prisma.turma.findMany({
        where,
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
          }
        },
        orderBy: [
          { serie: "asc" },
          { nome: "asc" }
        ],
        skip,
        take: limit
      }),
      prisma.turma.count({ where })
    ])

    // Transformar dados para incluir informações calculadas
    const turmasWithStats = turmas.map(turma => ({
      ...turma,
      vagasOcupadas: turma._count.alunoTurmas,
      vagasDisponiveis: turma.capacidade - turma._count.alunoTurmas,
      escolaNome: turma.escola.nome,
      _count: undefined, // Remove _count do resultado
      escola: undefined // Remove escola do resultado
    }))

    return NextResponse.json({
      data: turmasWithStats,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error("Erro ao buscar turmas:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar dados de entrada
    const validatedData = createTurmaSchema.parse(body)

    // Verificar se a escola existe
    const escola = await prisma.escola.findUnique({
      where: { id: validatedData.escolaId }
    })

    if (!escola) {
      return NextResponse.json(
        { error: "Escola não encontrada" },
        { status: 404 }
      )
    }

    // Verificar se já existe uma turma com o mesmo nome na escola
    const existingTurma = await prisma.turma.findFirst({
      where: {
        escolaId: validatedData.escolaId,
        nome: validatedData.nome,
        anoLetivo: validatedData.anoLetivo
      }
    })

    if (existingTurma) {
      return NextResponse.json(
        { error: "Já existe uma turma com este nome nesta escola" },
        { status: 400 }
      )
    }

    // Criar a turma
    const turma = await prisma.turma.create({
      data: {
        escolaId: validatedData.escolaId,
        nome: validatedData.nome,
        serie: validatedData.serie,
        periodo: validatedData.periodo,
        capacidade: validatedData.capacidade,
        anoLetivo: validatedData.anoLetivo,
        professor: validatedData.professor,
        sala: validatedData.sala
      },
      include: {
        escola: {
          select: {
            nome: true
          }
        }
      }
    })

    return NextResponse.json(turma, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      )
    }

    console.error("Erro ao criar turma:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
