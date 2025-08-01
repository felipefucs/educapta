import { type NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { z } from "zod"

// Validation schema for student creation/update
const alunoSchema = z.object({
  escolaId: z.string().min(1, "Escola ID é obrigatório"),
  nome: z.string().min(1, "Nome é obrigatório"),
  dataNascimento: z.string().optional(),
  cpf: z.string().optional(),
  endereco: z.string().optional(),
  turmaId: z.string().optional(),
  turma: z.string().optional(),
  necessidadesEspeciais: z.string().optional(),
  medicamentos: z.string().optional(),
  alergias: z.string().optional(),
  contatoEmergencia: z.string().optional(),
  status: z.enum(["matriculado", "pre_matricula", "inativo"]).default("matriculado"),
  responsavel: z.string().optional(),
  telefone: z.string().optional(),
  email: z.string().email().optional().or(z.literal("")),
})

// GET /api/alunos - List all students with optional filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const escolaId = searchParams.get("escola_id")
    const status = searchParams.get("status")
    const search = searchParams.get("search")
    const page = parseInt(searchParams.get("page") || "1")
    const limit = parseInt(searchParams.get("limit") || "10")
    const skip = (page - 1) * limit

    // Build where clause
    const where: any = {}
    
    if (escolaId) {
      where.escolaId = escolaId
    }
    
    if (status && status !== "todos") {
      where.status = status
    }
    
    if (search) {
      where.OR = [
        { nome: { contains: search, mode: "insensitive" } },
        { responsavel: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
      ]
    }

    // Get students with pagination
    const [alunos, total] = await Promise.all([
      prisma.aluno.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.aluno.count({ where }),
    ])

    return NextResponse.json({
      data: alunos,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Erro ao buscar alunos:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}

// POST /api/alunos - Create a new student
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate request body
    const validatedData = alunoSchema.parse(body)
    
    // Convert date string to Date object if provided
    const data: any = {
      ...validatedData,
      dataNascimento: validatedData.dataNascimento 
        ? new Date(validatedData.dataNascimento) 
        : null,
    }

    // Create student
    const aluno = await prisma.aluno.create({
      data,
    })

    return NextResponse.json(aluno, { status: 201 })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Dados inválidos", details: error.errors },
        { status: 400 }
      )
    }
    
    console.error("Erro ao criar aluno:", error)
    return NextResponse.json(
      { error: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
