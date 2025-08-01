-- CreateTable
CREATE TABLE "public"."alunos" (
    "id" TEXT NOT NULL,
    "escola_id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data_nascimento" TIMESTAMP(3),
    "cpf" TEXT,
    "endereco" TEXT,
    "turma_id" TEXT,
    "turma" TEXT,
    "necessidades_especiais" TEXT,
    "medicamentos" TEXT,
    "alergias" TEXT,
    "contato_emergencia" TEXT,
    "status" TEXT NOT NULL DEFAULT 'matriculado',
    "responsavel" TEXT,
    "telefone" TEXT,
    "email" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "alunos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "alunos_cpf_key" ON "public"."alunos"("cpf");
